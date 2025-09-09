#!/usr/bin/env bash
set -e
dnf install -y fio
echo "== MNT (plaintext view through FUSE) =="
fio --name=randrw --directory=/secure_mnt --rw=randrw --bs=4k --size=256M --iodepth=32 --numjobs=2 --runtime=30 --time_based=1
echo "== SRC (ciphertext at rest) =="
fio --name=randrw --directory=/secure_src --rw=randrw --bs=4k --size=256M --iodepth=32 --numjobs=2 --runtime=30 --time_based=1
