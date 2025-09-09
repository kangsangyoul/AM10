# PoC Demo

```bash
cd deploy
sudo bash install.sh --demo  # 설치 및 벤치 데모 자동 실행
```

수동 테스트:

```bash
systemctl status dxtenc-manager dxtenc-agent  # 서비스 확인

echo "hello" > /secure_mnt/a.txt            # 파일 쓰기
cat /secure_mnt/a.txt                       # 평문 확인
hexdump -C /secure_src/a.txt | head          # 암호문 확인(DXT1 헤더)
cat /secure_mnt/demo.txt                    # --demo 생성 파일 확인
hexdump -C /secure_src/demo.txt | head      # 암호문 확인
echo "HTML report at" /opt/dxt/bench/report-*.html
```

## 키 롤오버
```bash
KEYS=$(grep MANAGER_JWT_KEYS /opt/dxt/manager-api/.env | cut -d= -f2 | tr -d '"')
JWT=$(python3 - <<'PY'
import os,jwt
keys=os.getenv('KEYS').split(',')[0]
print(jwt.encode({'role':'admin'}, keys, algorithm='HS256'))
PY
)
NEWKEY=$(python3 - <<'PY'
from kms.kms import new_aes256_hex
print(new_aes256_hex())
PY
)
curl -s -X POST http://127.0.0.1:8080/keys -H "Authorization: $JWT" -H "Content-Type: application/json" \
  -d "{\"policy_id\":\"pol-main\",\"version\":2,\"key_hex\":\"${NEWKEY}\",\"state\":\"ACTIVE\"}"
curl -s -X POST http://127.0.0.1:8080/policies -H "Authorization: $JWT" -H "Content-Type: application/json" \
  -d '{"id":"pol-main","path":"/secure_src","enabled":true,"key_version":2}'
```

30초 내 agent 반영 후 신규 파일은 새 키로 암호화됩니다.

```bash
dmesg | grep dxtenc  # 커널 로그 확인
```
