import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class SavedArticle(Base):
    __tablename__ = "saved_articles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(String, nullable= False)
    title = Column(String, nullable=False)
    url = Column(String, nullable=False)
    urlToImage = Column(String)
    category = Column(String)
    published_at = Column(String)
