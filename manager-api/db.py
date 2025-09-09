from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os

DB_URL = os.getenv("DB_URL", "postgresql+psycopg2://dxt:dxtpass@localhost:5432/dxt")
engine = create_engine(DB_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine)

def init_db():
    with engine.begin() as conn:
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS policies(
          id VARCHAR(64) PRIMARY KEY,
          path TEXT NOT NULL,
          enabled BOOLEAN NOT NULL DEFAULT TRUE,
          key_version INTEGER NOT NULL DEFAULT 1,
          updated_at TIMESTAMP DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS keys(
          policy_id VARCHAR(64) NOT NULL,
          version INTEGER NOT NULL,
          key_hex VARCHAR(128) NOT NULL,
          state VARCHAR(16) NOT NULL DEFAULT 'ACTIVE',
          created_at TIMESTAMP DEFAULT NOW(),
          PRIMARY KEY(policy_id, version)
        );
        CREATE TABLE IF NOT EXISTS agents(
          id VARCHAR(64) PRIMARY KEY,
          token VARCHAR(256) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
        """))
