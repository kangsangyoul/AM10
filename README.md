
# AuditMind IR Dashboard

## DXTENC PoC Starter Pack

### Build & Install RPM
```bash
rpmbuild -ba deploy/dxtenc-all.spec      # build meta package
sudo rpm -i RPMS/x86_64/dxtenc-all-*.rpm
dxtenc-cli status                        # check services
```

### Demo
```bash
cd deploy
sudo bash install.sh --demo              # creates policy/key, sample file, bench report
cat /secure_mnt/demo.txt                 # plaintext
hexdump -C /secure_src/demo.txt | head   # ciphertext
```

### CLI Usage
```bash
dxtenc-cli policy ls
dxtenc-cli key rotate
dxtenc-cli log tail
```

### Notes
- .env files are installed with 600 permissions.
- Services run under dedicated user `dxtsvc` with strict systemd hardening.
