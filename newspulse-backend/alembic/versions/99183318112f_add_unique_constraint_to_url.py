"""Add unique constraint to url

Revision ID: 99183318112f
Revises: 4a9ef2c948d9
Create Date: 2025-03-14 01:56:49.518002

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '99183318112f'
down_revision: Union[str, None] = '4a9ef2c948d9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'news_articles', ['url'])
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'news_articles', type_='unique')
    # ### end Alembic commands ###
