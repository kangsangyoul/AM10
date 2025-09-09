1) systemctl status dxtenc-manager dxtenc-agent
2) echo "hello" > /secure_mnt/a.txt
3) cat /secure_mnt/a.txt   # 평문
4) hexdump -C /secure_src/a.txt | head  # 암호문(DXT1 헤더)
5) 키 롤오버:
   JWT=$(grep MANAGER_JWT /opt/dxt/manager-api/.env | cut -d= -f2 | tr -d '"')
   NEWKEY=$(python3 - <<'PY'
from kms.kms import new_aes256_hex
print(new_aes256_hex())
PY
)
   curl -s -X POST http://127.0.0.1:8080/keys -H "Authorization: $JWT" -H "Content-Type: application/json" \
     -d "{\"policy_id\":\"pol-main\",\"version\":2,\"key_hex\":\"${NEWKEY}\",\"state\":\"ACTIVE\"}"
   curl -s -X POST http://127.0.0.1:8080/policies -H "Authorization: $JWT" -H "Content-Type: application/json" \
     -d '{"id":"pol-main","path":"/secure_src","enabled":true,"key_version":2}'
6) 30초 내 agent 반영 확인 후 신규 파일은 새 키로 쓰기.
7) 커널 알파 로그:  dmesg | grep dxtenc

시작 방법(요약)

RHEL/Rocky 9 VM에서 위 구조로 파일 생성

cd repo/deploy && sudo bash install.sh

/secure_mnt에 파일을 쓰고 읽어보면 → 마운트 경로는 평문, /secure_src는 암호문이 보입니다.
