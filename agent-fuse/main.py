#!/usr/bin/env python3
import os, errno, time, threading, stat, struct, signal
from dotenv import load_dotenv
import requests
from fuse import FUSE, Operations, FuseOSError
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

load_dotenv()
SRC = os.getenv("SRC_DIR", "/secure_src")
MNT = os.getenv("MNT_DIR", "/secure_mnt")
MANAGER = os.getenv("MANAGER_URL", "http://127.0.0.1:8080")
JWT = os.getenv("MANAGER_JWT", "dev-secret")
POLICY_ID = os.getenv("POLICY_ID", "pol-main")
POLL = int(os.getenv("POLL_INTERVAL", "30"))
CA_BUNDLE = os.getenv("MANAGER_CA_BUNDLE")
HEADERS = {"Authorization": JWT}
MAX_BACKOFF = 300

MAGIC = b"DXT1"
HEADER = struct.Struct(">4sBIIQ")  # magic, ver, keyver, chunk, size
CHUNK_META = 12  # nonce
TAG = 16

class KeyCache:
    def __init__(self):
        self.cur_ver = None
        self.keymap = {}
        self.enabled = True
        self.lock = threading.Lock()
        self.stop = False

    def poll(self):
        backoff = POLL
        verify = CA_BUNDLE if MANAGER.startswith("https") else True
        while not self.stop:
            try:
                pol = requests.get(f"{MANAGER}/policies/{POLICY_ID}", headers=HEADERS, timeout=3, verify=verify).json()
                key_ver = pol["key_version"]
                self.enabled = pol["enabled"]
                k = requests.get(f"{MANAGER}/keys/active", params={"policy_id": POLICY_ID, "version": key_ver},
                                 headers=HEADERS, timeout=3, verify=verify).json()
                with self.lock:
                    self.cur_ver = k["version"]
                    self.keymap[self.cur_ver] = bytearray.fromhex(k["key_hex"])
                backoff = POLL
            except Exception:
                backoff = min(backoff * 2, MAX_BACKOFF)
            time.sleep(backoff)

    def zeroize(self):
        with self.lock:
            for k in self.keymap.values():
                for i in range(len(k)):
                    k[i] = 0
            self.keymap.clear()
            self.cur_ver = None

KEYS = KeyCache()


def enc_chunk(data: bytes, key: bytes) -> bytes:
    aes = AESGCM(key)
    nonce = os.urandom(12)
    ct = aes.encrypt(nonce, data, None)
    return nonce + ct


def dec_chunk(blob: bytes, key: bytes) -> bytes:
    nonce = blob[:12]
    ct = blob[12:]
    aes = AESGCM(key)
    return aes.decrypt(nonce, ct, None)


def read_header(f):
    f.seek(0)
    h = f.read(HEADER.size)
    if len(h) != HEADER.size or not h.startswith(MAGIC):
        raise FuseOSError(errno.EIO)
    magic, ver, keyver, csize, fsize = HEADER.unpack(h)
    return {"keyver": keyver, "csize": csize, "size": fsize}


def write_header(f, keyver, csize, fsize):
    f.seek(0)
    f.write(HEADER.pack(MAGIC, 1, keyver, csize, fsize))


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
        with os.fdopen(os.dup(fh), "wb") as f:
            write_header(f, keyver, 4096, 0)
        return fh

    def _chunk_offset(self, idx, csize):
        return HEADER.size + idx * (csize + CHUNK_META + TAG)

    def read(self, path, size, offset, fh):
        full = self._full(path)
        with open(full, "rb") as f:
            h = read_header(f)
            csize = h["csize"]; fsize = h["size"]; keyver = h["keyver"]
            with KEYS.lock:
                key = bytes(KEYS.keymap.get(keyver, b""))
        if not key:
            raise FuseOSError(errno.EIO)
        if offset >= fsize:
            return b""
        end = min(offset + size, fsize)
        out = bytearray()
        while offset < end:
            idx = offset // csize
            inside = offset % csize
            f.seek(self._chunk_offset(idx, csize))
            blob = f.read(csize + CHUNK_META + TAG)
            plain = dec_chunk(blob[:CHUNK_META + min(csize, fsize - idx*csize) + TAG], key)
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
            raise FuseOSError(errno.EIO)
        with open(full, "r+b") as f:
            h = read_header(f)
            csize = h["csize"]; fsize = h["size"]
            chunk_unit = csize + CHUNK_META + TAG
            if keyver != h["keyver"]:
                h["keyver"] = keyver
            pos = offset
            w = 0
            while w < len(data):
                idx = pos // csize
                inside = pos % csize
                f.seek(self._chunk_offset(idx, csize))
                if idx * csize < fsize:
                    blob = f.read(chunk_unit)
                    plen = min(csize, fsize - idx*csize)
                    plain = dec_chunk(blob[:CHUNK_META + plen + TAG], key)
                else:
                    plain = b"\x00" * csize
                buf = bytearray(plain)
                take = min(len(data) - w, csize - inside)
                buf[inside:inside+take] = data[w:w+take]
                f.seek(self._chunk_offset(idx, csize))
                f.write(enc_chunk(bytes(buf), key))
                pos += take
                w += take
            new_size = max(fsize, offset + len(data))
            write_header(f, h["keyver"], csize, new_size)
        return len(data)

    def truncate(self, path, length, fh=None):
        full = self._full(path)
        with open(full, "r+b") as f:
            h = read_header(f)
            csize = h["csize"]
            write_header(f, h["keyver"], csize, length)
            f.truncate(self._chunk_offset((length + csize -1)//csize, csize))

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
