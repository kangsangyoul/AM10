import os, secrets
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from db import SessionLocal, init_db
from models import PolicyIn, PolicyOut, KeyIn, AgentIn
from dotenv import load_dotenv
load_dotenv()

MANAGER_JWT = os.getenv("MANAGER_JWT", "dev-secret")

app = FastAPI(title="DXT Manager API", version="0.1")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)
init_db()

def auth(token: str | None):
    if token != MANAGER_JWT:
        raise HTTPException(status_code=401, detail="unauthorized")

@app.get("/health")
def health(): return {"ok": True}

# --- Policies ---
@app.post("/policies", response_model=PolicyOut)
def upsert_policy(p: PolicyIn, authorization: str = Header(None)):
    auth(authorization)
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
    auth(authorization)
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
    auth(authorization)
    token = secrets.token_hex(24)
    db = SessionLocal()
    db.execute(text("""
      INSERT INTO agents(id, token) VALUES(:id,:t)
      ON CONFLICT (id) DO UPDATE SET token=:t
    """), {"id": a.id, "t": token})
    db.commit(); db.close()
    return {"id": a.id, "token": token}
