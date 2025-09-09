#!/usr/bin/env python3
import os, errno, json, time, threading, stat
from datetime import datetime
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

HEADERS = {"Authorization": JWT}

class KeyCache:
    def __init__(self):
        self.cur_ver = None
        self.keymap = {}
        self.enabled = True
        self.lock = threading.Lock()

    def poll(self):
        while True:
            try:
                pol = requests.get(f"{MANAGER}/policies/{POLICY_ID}", headers=HEADERS, timeout=5).json()
                key_ver = pol["key_version"]; self.enabled = pol["enabled"]
                k = requests.get(f"{MANAGER}/keys/active", params={"policy_id": POLICY_ID, "version": key_ver},
                                 headers=HEADERS, timeout=5).json()
                with self.lock:
                    self.cur_ver = k["version"]
                    self.keymap[self.cur_ver] = bytes.fromhex(k["key_hex"])
            except Exception as e:
                # 보수적 허용: 키 갱신 실패 시 기존값 유지
                pass
            time.sleep(POLL)

KEYS = KeyCache()

def enc_bytes(plain: bytes, key: bytes) -> bytes:
    aes = AESGCM(key)
    nonce = os.urandom(12)
    ct = aes.encrypt(nonce, plain, None)
    return b"DXT1" + nonce + ct  # 헤더+nonce+ct

def dec_bytes(blob: bytes, key: bytes) -> bytes:
    if not blob.startswith(b"DXT1"):
        return blob  # 미암호화 파일
    nonce = blob[4:16]
    ct = blob[16:]
    aes = AESGCM(key)
    return aes.decrypt(nonce, ct, None)

class EncFS(Operations):
    def __init__(self, root):
        self.root = root

    def _full(self, path): return os.path.join(self.root, path.lstrip("/"))

    # 기본 파일시스템 메서드
    def getattr(self, path, fh=None):
        st = os.lstat(self._full(path))
        return dict((key, getattr(st, key)) for key in ("st_mode","st_ino","st_dev","st_nlink","st_uid","st_gid","st_size","st_atime","st_mtime","st_ctime"))

    def readdir(self, path, fh):
        yield "."
        yield ".."
        full = self._full(path)
        for name in os.listdir(full): yield name

    def open(self, path, flags):
        return os.open(self._full(path), flags)

    def create(self, path, mode, fi=None):
        return os.open(self._full(path), os.O_WRONLY | os.O_CREAT, mode)

    def read(self, path, size, offset, fh):
        with KEYS.lock:
            key = KEYS.keymap.get(KEYS.cur_ver)
        os.lseek(fh, 0, os.SEEK_SET)
        blob = os.read(fh, os.path.getsize(self._full(path)))
        if KEYS.enabled and key:
            try:
                data = dec_bytes(blob, key)
            except Exception:
                data = blob  # 실패 시 원본
        else:
            data = blob
        return data[offset:offset+size]

    def write(self, path, data, offset, fh):
        # Crash-safe 간단 구현: 전체 파일 재작성 (PoC)
        with KEYS.lock:
            key = KEYS.keymap.get(KEYS.cur_ver)
        full = self._full(path)
        os.lseek(fh, 0, os.SEEK_SET)
        prev = os.read(fh, os.path.getsize(full)) if os.path.exists(full) else b""
        new = prev[:offset] + data + prev[offset+len(data):]
        blob = enc_bytes(new, key) if (KEYS.enabled and key) else new
        tmp = full + ".dxt.tmp"
        with open(tmp, "wb") as f: f.write(blob); f.flush(); os.fsync(f.fileno())
        os.replace(tmp, full)
        return len(data)

    def unlink(self, path): return os.unlink(self._full(path))
    def mkdir(self, path, mode): return os.mkdir(self._full(path), mode)
    def rmdir(self, path): return os.rmdir(self._full(path))
    def rename(self, old, new): return os.rename(self._full(old), self._full(new))
    def truncate(self, path, length, fh=None):
        with open(self._full(path), "r+b") as f: f.truncate(length)

def main():
    os.makedirs(SRC, exist_ok=True)
    os.makedirs(MNT, exist_ok=True)
    t = threading.Thread(target=KEYS.poll, daemon=True); t.start()
    FUSE(EncFS(SRC), MNT, nothreads=True, foreground=True)

if __name__ == "__main__":
    main()
