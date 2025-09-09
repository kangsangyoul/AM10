from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os

DB_URL = os.getenv("DB_URL", "postgresql+psycopg2://dxt:dxtpass@localhost:5432/dxt")
engine = create_engine(DB_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine)

def init_db():
    with engine.begin() as conn:
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS orgs(
          id VARCHAR(64) PRIMARY KEY,
          name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS projects(
          id VARCHAR(64) PRIMARY KEY,
          org_id VARCHAR(64) REFERENCES orgs(id),
          name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS users(
          id VARCHAR(64) PRIMARY KEY,
          org_id VARCHAR(64) REFERENCES orgs(id),
          role VARCHAR(16) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS policies(
          id VARCHAR(64) NOT NULL,
          project_id VARCHAR(64) NOT NULL DEFAULT 'default',
          path TEXT NOT NULL,
          enabled BOOLEAN NOT NULL DEFAULT TRUE,
          key_version INTEGER NOT NULL DEFAULT 1,
          updated_at TIMESTAMP DEFAULT NOW(),
          PRIMARY KEY(id, project_id)
        );
        CREATE TABLE IF NOT EXISTS keys(
          policy_id VARCHAR(64) NOT NULL,
          project_id VARCHAR(64) NOT NULL DEFAULT 'default',
          version INTEGER NOT NULL,
          key_hex VARCHAR(128) NOT NULL,
          state VARCHAR(16) NOT NULL DEFAULT 'ACTIVE',
          created_at TIMESTAMP DEFAULT NOW(),
          PRIMARY KEY(policy_id, project_id, version)
        );
        CREATE TABLE IF NOT EXISTS agents(
          id VARCHAR(64) PRIMARY KEY,
          token VARCHAR(256) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS audits(
          id SERIAL PRIMARY KEY,
          ts TIMESTAMP DEFAULT NOW(),
          agent_id VARCHAR(64),
          policy_id VARCHAR(64),
          path TEXT,
          op VARCHAR(16),
          result VARCHAR(16)
        );
        ALTER TABLE policies ADD COLUMN IF NOT EXISTS project_id VARCHAR(64) NOT NULL DEFAULT 'default';
        ALTER TABLE keys ADD COLUMN IF NOT EXISTS project_id VARCHAR(64) NOT NULL DEFAULT 'default';
        CREATE INDEX IF NOT EXISTS idx_policies_project ON policies(project_id);
        CREATE INDEX IF NOT EXISTS idx_keys_project ON keys(project_id);
        """))
