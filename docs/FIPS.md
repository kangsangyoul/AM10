# FIPS Mode

DXTENC components can run in a FIPS 140-3 compatible mode. This mode forces the
underlying OpenSSL library to use a FIPS approved provider and exposes the flag
via the API health check.

## Enabling

Set `DXT_FIPS_MODE=1` in the environment of the Manager API, agent services and
benchmark tooling. The services will load the OpenSSL FIPS provider and the
Manager API `/health` endpoint will report `fips_mode: true`.

## Verification

Run `curl http://localhost:8080/health` and confirm `"fips_mode": true` in the
response. Benchmarks executed with `DXT_FIPS_MODE=1 python bench/run.py` embed the
mode in the generated HTML report.

## Notes

- Only AES‑256‑GCM is exercised in this PoC and is FIPS approved.
- The container running the services must have the OpenSSL FIPS provider
  installed and configured for full compliance.
