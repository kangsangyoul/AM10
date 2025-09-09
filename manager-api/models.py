from pydantic import BaseModel
from typing import Optional

class PolicyIn(BaseModel):
    id: str
    path: str
    enabled: bool = True
    key_version: int = 1

class PolicyOut(PolicyIn):
    pass

class KeyIn(BaseModel):
    policy_id: str
    version: int
    key_hex: str           # 64 hex chars for AES-256
    state: str = "ACTIVE"  # ACTIVE | PREVIOUS | RETIRED

class AgentIn(BaseModel):
    id: str
