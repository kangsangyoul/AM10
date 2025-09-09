#!/usr/bin/env python3
import os, errno, time, threading, stat, struct, signal, zlib
from dotenv import load_dotenv
import requests
from fuse import FUSE, Operations, FuseOSError
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

load_dotenv()
SRC = os.getenv("SRC_DIR", "/secure_src")
MNT = os.getenv("MNT_DIR", "/secure_mnt")
MANAGER_URLS = os.getenv("MANAGER_URL", "http://127.0.0.1:8080").split(",")
JWT = os.getenv("MANAGER_JWT", "dev-secret")
POLICY_ID = os.getenv("POLICY_ID", "pol-main")
POLL = int(os.getenv("POLL_INTERVAL", "30"))
CA_BUNDLE = os.getenv("MANAGER_CA_BUNDLE")
HEADERS = {"Authorization": JWT}
MAX_BACKOFF = 300

MAGIC_V1 = b"DXT1"
MAGIC_V2 = b"DXT2"
HEADER_V1 = struct.Struct(">4sBIIQ")
HEADER_V2 = struct.Struct(">4sBIIQB")  # +flags
CHUNK_META = 12  # nonce
TAG = 16
ZSTD = os.getenv("DXT_ZSTD") == "1"

try:
    import zstandard as zstd

    def zstd_compress(b: bytes) -> bytes:
        return zstd.ZstdCompressor().compress(b)

    def zstd_decompress(b: bytes) -> bytes:
        return zstd.ZstdDecompressor().decompress(b)
except Exception:

    def zstd_compress(b: bytes) -> bytes:
        return zlib.compress(b)

    def zstd_decompress(b: bytes) -> bytes:
        return zlib.decompress(b)

class KeyCache:
    def __init__(self):
        self.cur_ver = None
        self.keymap = {}
        self.enabled = True
        self.lock = threading.Lock()
        self.stop = False

    def poll(self):
        backoff = POLL
        idx = 0
        while not self.stop:
            url = MANAGER_URLS[idx % len(MANAGER_URLS)]
            verify = CA_BUNDLE if url.startswith("https") else True
            try:
                pol = requests.get(f"{url}/policies/{POLICY_ID}", headers=HEADERS, timeout=3, verify=verify).json()
                key_ver = pol["key_version"]
                self.enabled = pol["enabled"]
                k = requests.get(f"{url}/keys/active", params={"policy_id": POLICY_ID, "version": key_ver},
                                 headers=HEADERS, timeout=3, verify=verify).json()
                with self.lock:
                    self.cur_ver = k["version"]
                    self.keymap[self.cur_ver] = bytearray.fromhex(k["key_hex"])
                backoff = POLL
                idx += 1  # round-robin on success
                time.sleep(backoff)
                continue
            except Exception:
                idx += 1  # try next URL immediately
                if idx % len(MANAGER_URLS) != 0:
                    continue
                backoff = min(backoff * 2, MAX_BACKOFF)
            time.sleep(backoff)

    def zeroize(self):
        with self.lock:
            for k in self.keymap.values():
                for i in range(len(k)):
                    k[i] = 0
            self.keymap.clear()
            self.cur_ver = None
        print("agent: key zeroized")

KEYS = KeyCache()


def enc_chunk(data: bytes, key: bytes, flags: int) -> bytes:
    if flags & 1:
        data = zstd_compress(data)
    aes = AESGCM(key)
    nonce = os.urandom(12)
    ct = aes.encrypt(nonce, data, None)
    return nonce + ct


def dec_chunk(blob: bytes, key: bytes, flags: int) -> bytes:
    nonce = blob[:12]
    ct = blob[12:]
    aes = AESGCM(key)
    data = aes.decrypt(nonce, ct, None)
    if flags & 1:
        data = zstd_decompress(data)
    return data


def read_header(f):
    f.seek(0)
    prefix = f.read(5)
    if len(prefix) != 5:
        raise FuseOSError(errno.EIO)
    magic, ver = prefix[:4], prefix[4]
    if magic == MAGIC_V1 and ver == 1:
        rest = f.read(HEADER_V1.size - 5)
        keyver, csize, fsize = struct.unpack(">IIQ", rest)
        return {"ver": 1, "keyver": keyver, "csize": csize, "size": fsize, "flags": 0}
    if magic == MAGIC_V2 and ver == 2:
        rest = f.read(HEADER_V2.size - 5)
        keyver, csize, flags, fsize = struct.unpack(">IIBQ", rest)
        return {"ver": 2, "keyver": keyver, "csize": csize, "size": fsize, "flags": flags}
    raise FuseOSError(errno.EIO)


def write_header(f, keyver, csize, fsize, flags=0, ver=2):
    f.seek(0)
    if ver == 1:
        f.write(HEADER_V1.pack(MAGIC_V1, 1, keyver, csize, fsize))
    else:
        f.write(HEADER_V2.pack(MAGIC_V2, 2, keyver, csize, flags, fsize))


class EncFS(Operations):
    def __init__(self, root):
        self.root = root

    def _full(self, path):
        return os.path.join(self.root, path.lstrip("/"))

    def getattr(self, path, fh=None):
        st = os.lstat(self._full(path))
        if stat.S_ISREG(st.st_mode):
            try:
                with open(self._full(path), "rb") as f:
                    h = read_header(f)
                    size = h["size"]
            except Exception:
                size = st.st_size
            return dict((k, getattr(st, k)) for k in ("st_mode","st_ino","st_dev","st_nlink","st_uid","st_gid","st_atime","st_mtime","st_ctime")) | {"st_size": size}
        return dict((k, getattr(st, k)) for k in ("st_mode","st_ino","st_dev","st_nlink","st_uid","st_gid","st_size","st_atime","st_mtime","st_ctime"))

    def readdir(self, path, fh):
        yield "."; yield ".."
        for n in os.listdir(self._full(path)):
            yield n

    def open(self, path, flags):
        return os.open(self._full(path), flags)

    def create(self, path, mode, fi=None):
        fh = os.open(self._full(path), os.O_WRONLY | os.O_CREAT, mode)
        with KEYS.lock:
            keyver = KEYS.cur_ver or 1
        flags = 1 if ZSTD else 0
        with os.fdopen(os.dup(fh), "wb") as f:
            write_header(f, keyver, 4096, 0, flags=flags, ver=2)
        return fh

    def _chunk_offset(self, idx, csize, ver):
        hsize = HEADER_V2.size if ver == 2 else HEADER_V1.size
        return hsize + idx * (csize + CHUNK_META + TAG)

    def read(self, path, size, offset, fh):
        full = self._full(path)
        with open(full, "rb") as f:
            h = read_header(f)
            csize = h["csize"]; fsize = h["size"]; keyver = h["keyver"]; flags = h["flags"]; ver = h["ver"]
            with KEYS.lock:
                key = bytes(KEYS.keymap.get(keyver, b""))
            if not key:
                f.seek(0)
                raw = f.read()
                return raw[offset:offset+size]
            if offset >= fsize:
                return b""
            end = min(offset + size, fsize)
            out = bytearray()
            while offset < end:
                idx = offset // csize
                inside = offset % csize
                f.seek(self._chunk_offset(idx, csize, ver))
                blob = f.read(csize + CHUNK_META + TAG)
                plen = min(csize, fsize - idx * csize)
                plain = dec_chunk(blob[:CHUNK_META + plen + TAG], key, flags)
                take = min(end - offset, csize - inside)
                out.extend(plain[inside:inside+take])
                offset += take
            return bytes(out)

    def write(self, path, data, offset, fh):
        full = self._full(path)
        with KEYS.lock:
            keyver = KEYS.cur_ver
            key = bytes(KEYS.keymap.get(keyver, b""))
            enabled = KEYS.enabled
        if not enabled:
            raise FuseOSError(errno.EPERM)
        if not key:
            print("agent: no key, deny write")
            raise FuseOSError(errno.EIO)
        with open(full, "r+b") as f:
            h = read_header(f)
            csize = h["csize"]; fsize = h["size"]; flags = h["flags"]; ver = h["ver"]
            chunk_unit = csize + CHUNK_META + TAG
            if keyver != h["keyver"]:
                h["keyver"] = keyver
            pos = offset
            w = 0
            while w < len(data):
                idx = pos // csize
                inside = pos % csize
                f.seek(self._chunk_offset(idx, csize, ver))
                if idx * csize < fsize:
                    blob = f.read(chunk_unit)
                    plen = min(csize, fsize - idx * csize)
                    plain = dec_chunk(blob[:CHUNK_META + plen + TAG], key, flags)
                else:
                    plain = b"\x00" * csize
                buf = bytearray(plain)
                take = min(len(data) - w, csize - inside)
                buf[inside:inside+take] = data[w:w+take]
                f.seek(self._chunk_offset(idx, csize, ver))
                f.write(enc_chunk(bytes(buf), key, flags))
                pos += take
                w += take
            new_size = max(fsize, offset + len(data))
            write_header(f, h["keyver"], csize, new_size, flags=flags, ver=ver)
        return len(data)

    def truncate(self, path, length, fh=None):
        full = self._full(path)
        with open(full, "r+b") as f:
            h = read_header(f)
            csize = h["csize"]; ver = h["ver"]; flags = h["flags"]
            write_header(f, h["keyver"], csize, length, flags=flags, ver=ver)
            f.truncate(self._chunk_offset((length + csize -1)//csize, csize, ver))

    def unlink(self, path): return os.unlink(self._full(path))
    def mkdir(self, path, mode): return os.mkdir(self._full(path), mode)
    def rmdir(self, path): return os.rmdir(self._full(path))
    def rename(self, old, new): return os.rename(self._full(old), self._full(new))
    def utimens(self, path, times=None): return os.utime(self._full(path), times)
    def chown(self, path, uid, gid): return os.chown(self._full(path), uid, gid)
    def chmod(self, path, mode): return os.chmod(self._full(path), mode)


def main():
    os.makedirs(SRC, exist_ok=True)
    os.makedirs(MNT, exist_ok=True)
    t = threading.Thread(target=KEYS.poll, daemon=True)
    t.start()
    def term(signum, frame):
        KEYS.zeroize()
        raise SystemExit
    signal.signal(signal.SIGTERM, term)
    FUSE(EncFS(SRC), MNT, nothreads=True, foreground=True)

if __name__ == "__main__":
    main()
