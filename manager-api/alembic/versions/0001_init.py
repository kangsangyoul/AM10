from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.execute(
        """
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
        CREATE TABLE IF NOT EXISTS audits(
          id SERIAL PRIMARY KEY,
          ts TIMESTAMP DEFAULT NOW(),
          agent_id VARCHAR(64),
          policy_id VARCHAR(64),
          path TEXT,
          op VARCHAR(16),
          result VARCHAR(16)
        );
        """
    )


def downgrade():
    op.execute(
        """
        DROP TABLE IF EXISTS audits;
        DROP TABLE IF EXISTS agents;
        DROP TABLE IF EXISTS keys;
        DROP TABLE IF EXISTS policies;
        """
    )
