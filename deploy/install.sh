#!/usr/bin/env bash
set -euo pipefail

DEMO=0
if [[ "${1:-}" == "--demo" ]]; then DEMO=1; fi

# 패키지 준비
dnf groupinstall -y "Development Tools"
dnf install -y python3-pip postgresql-server postgresql-devel \
  openssl openssl-devel libffi-devel fuse3 fuse3-devel \
  kernel-devel-$(uname -r) dkms

# Postgres
systemctl enable --now postgresql || true
sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='dxt'" | grep -q 1 || sudo -u postgres psql -c "CREATE USER dxt WITH PASSWORD 'dxtpass';"
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='dxt'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE dxt OWNER dxt;"

# 사용자
id dxtsvc &>/dev/null || useradd --system --no-create-home dxtsvc

# 디렉토리
mkdir -p /opt/dxt
cp -r ../manager-api /opt/dxt/
cp -r ../agent-fuse /opt/dxt/
cp -r ../agent-kernel /opt/dxt/
cp -r ../bench /opt/dxt/ || true
chown -R dxtsvc:dxtsvc /opt/dxt

# 파이썬 의존성
pip3 install -r /opt/dxt/manager-api/requirements.txt
pip3 install -r /opt/dxt/agent-fuse/requirements.txt

# .env 준비(기본값 생성)
[ -f /opt/dxt/manager-api/.env ] || cp /opt/dxt/manager-api/.env.example /opt/dxt/manager-api/.env
[ -f /opt/dxt/agent-fuse/.env ] || cp /opt/dxt/agent-fuse/.env.example /opt/dxt/agent-fuse/.env

# 서비스 설치
cp ./dxtenc-manager.service /etc/systemd/system/
cp ./dxtenc-agent.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable dxtenc-manager.service
systemctl enable dxtenc-agent.service

# 데이터 디렉토리
mkdir -p /secure_src /secure_mnt
chown dxtsvc:dxtsvc /secure_src /secure_mnt
chmod 700 /secure_src

# DKMS (커널 알파)
dkms remove dxtenc/0.1.0 --all || true
dkms add /opt/dxt/agent-kernel
dkms build dxtenc/0.1.0
dkms install dxtenc/0.1.0

echo "=== Start services ==="
systemctl restart dxtenc-manager.service
systemctl restart dxtenc-agent.service

echo "=== Create initial policy/key ==="
KEYS=$(grep MANAGER_JWT_KEYS /opt/dxt/manager-api/.env | cut -d= -f2 | tr -d '"')
JWT=$(python3 - <<'PY'
import os,jwt
keys=os.getenv('KEYS').split(',')[0]
print(jwt.encode({'role':'admin'}, keys, algorithm='HS256'))
PY
)
curl -s -X POST "http://127.0.0.1:8080/policies" \
  -H "Authorization: ${JWT}" -H "Content-Type: application/json" \
  -d '{"id":"pol-main","path":"/secure_src","enabled":true,"key_version":1}'

KEY=$(python3 - <<'PY'
from kms.kms import new_aes256_hex
print(new_aes256_hex())
PY
)

curl -s -X POST "http://127.0.0.1:8080/keys" \
  -H "Authorization: ${JWT}" -H "Content-Type: application/json" \
  -d "{\"policy_id\":\"pol-main\",\"version\":1,\"key_hex\":\"${KEY}\",\"state\":\"ACTIVE\"}"

if [[ $DEMO -eq 1 ]]; then
  echo "Demo mode: creating sample file and running bench"
  sudo -u dxtsvc bash -c 'echo demo > /secure_mnt/demo.txt'
  python3 /opt/dxt/bench/run.py
  REPORT=$(ls /opt/dxt/bench/report-*.html | tail -n1)
  echo "Report generated at $REPORT"
fi

echo "All set. Try:  echo hello > /secure_mnt/a.txt  ; cat /secure_src/a.txt ; cat /secure_mnt/a.txt"
