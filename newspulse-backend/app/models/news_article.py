from sqlalchemy import Column , Integer ,String , Text
from app.database import Base

class NewsArticles(Base):
    __tablename__ = "news_articles"

    id = Column(Integer , primary_key=True , index=True)
    title = Column(String(255), index=True)
    description = Column(Text)
    url = Column(String, unique=True)
    category = Column(String(50), index=True)
