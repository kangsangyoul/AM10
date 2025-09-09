import os, secrets, time, json
from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import text
from db import SessionLocal, init_db
from models import PolicyIn, PolicyOut, KeyIn, AgentIn, AuditIn
from dotenv import load_dotenv
import jwt
from typing import Dict, Tuple
load_dotenv()

JWT_KEYS = os.getenv("MANAGER_JWT_KEYS", "dev-secret").split(",")
RATE_LIMIT = 60  # req/min per token+IP
_rate_cache: Dict[str, Tuple[int, float]] = {}
A_LOG = "/opt/dxt/logs/manager-audit.log"
os.makedirs(os.path.dirname(A_LOG), exist_ok=True)

app = FastAPI(title="DXT Manager API", version="0.1")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)
init_db()

def decode_token(token: str | None) -> dict:
    if not token:
        raise HTTPException(status_code=401, detail="unauthorized")
    for k in JWT_KEYS:
        try:
            return jwt.decode(token, k, algorithms=["HS256"])
        except jwt.InvalidTokenError:
            continue
    raise HTTPException(status_code=401, detail="unauthorized")

def require_admin(payload: dict):
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="forbidden")

@app.middleware("http")
async def limit(request: Request, call_next):
    token = request.headers.get("Authorization", "")
    key = f"{request.client.host}:{token}"
    now = time.time()
    count, start = _rate_cache.get(key, (0, now))
    if now - start > 60:
        count, start = 0, now
    if count >= RATE_LIMIT:
        return JSONResponse(status_code=429, content={"detail": "rate limit exceeded"})
    _rate_cache[key] = (count + 1, start)
    response = await call_next(request)
    actor = "?"
    token = request.headers.get("Authorization")
    try:
        actor = decode_token(token).get("role", "?")
    except Exception:
        pass
    line = {
        "ts": int(time.time()),
        "ip": request.client.host,
        "method": request.method,
        "path": request.url.path,
        "status": response.status_code,
        "actor": actor,
        "bytes": response.headers.get("content-length", "0"),
    }
    with open(A_LOG, "a") as f:
        f.write(json.dumps(line) + "\n")
    return response

def auth(token: str | None):
    return decode_token(token)

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/ready")
def ready():
    db = SessionLocal()
    try:
        db.execute(text("SELECT 1"))
        ok = True
    except Exception:
        ok = False
    finally:
        db.close()
    if not ok:
        raise HTTPException(status_code=503, detail="db unavailable")
    return {"ok": True}

# --- Policies ---
@app.post("/policies", response_model=PolicyOut)
def upsert_policy(p: PolicyIn, authorization: str = Header(None)):
    payload = auth(authorization)
    require_admin(payload)
    db = SessionLocal()
    db.execute(text("""
      INSERT INTO policies(id, path, enabled, key_version)
      VALUES(:id, :path, :enabled, :kv)
      ON CONFLICT (id) DO UPDATE SET path=:path, enabled=:enabled, key_version=:kv, updated_at=NOW()
    """), {"id": p.id, "path": p.path, "enabled": p.enabled, "kv": p.key_version})
    db.commit(); db.close()
    return p

@app.get("/policies/{policy_id}", response_model=PolicyOut)
def get_policy(policy_id: str, authorization: str = Header(None)):
    auth(authorization)
    db = SessionLocal()
    r = db.execute(text("SELECT id, path, enabled, key_version FROM policies WHERE id=:id"),
                   {"id": policy_id}).mappings().first()
    db.close()
    if not r: raise HTTPException(404, "policy not found")
    return PolicyOut(**r)

# agent pull by path (PoC 단순화)
@app.get("/policy-by-path")
def policy_by_path(path: str, authorization: str = Header(None)):
    auth(authorization)
    db = SessionLocal()
    r = db.execute(text("SELECT id, path, enabled, key_version FROM policies WHERE path=:p"),
                   {"p": path}).mappings().first()
    db.close()
    if not r: raise HTTPException(404, "policy not found")
    return r

# --- Keys ---
@app.post("/keys")
def put_key(k: KeyIn, authorization: str = Header(None)):
    payload = auth(authorization)
    require_admin(payload)
    db = SessionLocal()
    db.execute(text("""
      INSERT INTO keys(policy_id, version, key_hex, state)
      VALUES(:pid, :ver, :key, :st)
      ON CONFLICT (policy_id, version) DO UPDATE SET key_hex=:key, state=:st
    """), {"pid": k.policy_id, "ver": k.version, "key": k.key_hex, "st": k.state})
    db.commit(); db.close()
    return {"ok": True}

@app.get("/keys/active")
def get_active_key(policy_id: str, version: int | None = None, authorization: str = Header(None)):
    auth(authorization)
    db = SessionLocal()
    if version is None:
        r = db.execute(text("""
          SELECT k.version, k.key_hex FROM keys k
          JOIN policies p ON p.id=k.policy_id
          WHERE k.policy_id=:pid AND k.state IN ('ACTIVE','PREVIOUS') AND k.version=p.key_version
        """), {"pid": policy_id}).mappings().first()
    else:
        r = db.execute(text("""
          SELECT version, key_hex FROM keys WHERE policy_id=:pid AND version=:v
        """), {"pid": policy_id, "v": version}).mappings().first()
    db.close()
    if not r: raise HTTPException(404, "key not found")
    return r

# --- Agents ---
@app.post("/agents/register")
def register_agent(a: AgentIn, authorization: str = Header(None)):
    payload = auth(authorization)
    require_admin(payload)
    token = secrets.token_hex(24)
    db = SessionLocal()
    db.execute(text("""
      INSERT INTO agents(id, token) VALUES(:id,:t)
      ON CONFLICT (id) DO UPDATE SET token=:t
    """), {"id": a.id, "t": token})
    db.commit(); db.close()
    return {"id": a.id, "token": token}

# --- Audits ---
@app.post("/audit")
def post_audit(a: AuditIn, authorization: str = Header(None)):
    auth(authorization)
    db = SessionLocal()
    db.execute(text("""
      INSERT INTO audits(agent_id, policy_id, path, op, result)
      VALUES(:aid,:pid,:path,:op,:res)
    """), {"aid": a.agent_id, "pid": a.policy_id, "path": a.path, "op": a.op, "res": a.result})
    db.commit(); db.close()
    return {"ok": True}

@app.get("/audit")
def get_audit(policy_id: str | None = None, authorization: str = Header(None)):
    auth(authorization)
    db = SessionLocal()
    if policy_id:
        rows = db.execute(text("SELECT id, ts, agent_id, policy_id, path, op, result FROM audits WHERE policy_id=:p ORDER BY ts DESC"), {"p": policy_id}).mappings().all()
    else:
        rows = db.execute(text("SELECT id, ts, agent_id, policy_id, path, op, result FROM audits ORDER BY ts DESC")).mappings().all()
    db.close()
    return rows
