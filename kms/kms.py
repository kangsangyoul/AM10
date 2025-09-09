import os
from Crypto.Random import get_random_bytes

def new_aes256_hex() -> str:
    return get_random_bytes(32).hex()

# 마스터키 래핑은 PoC에서 생략(환경변수/OS 키링 권장)
