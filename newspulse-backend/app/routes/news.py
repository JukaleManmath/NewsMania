import requests
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config import NEWS_API_KEY
from app.database import get_database
from app.models import NewsArticles
from app.services.nlp import categorize_articles

router = APIRouter()

NEWS_API_URL = "https://newsapi.org/v2/top-headlines"

def save_news_database(news_list , db: Session):
    for article in news_list:
        existing_article = db.query(NewsArticles).filter(NewsArticles.url == article["url"]).first()
        if not existing_article:
            category = categorize_articles(article["title"],article["description"])
            db_article = NewsArticles(
                title = article["title"],
                description = article["description"][:500],
                url = article["url"],
                category = category,
            )
            db.add(db_article)
            
    db.commit()

@router.get("/news/")
def get_news(country: str = "us" , category :str = None, db: Session = Depends(get_database)):
    params = {
        "apikey": NEWS_API_KEY,
        "country": country,
        "category": category,
    }
    response = requests.get(NEWS_API_URL, params=params)
    if response.status_code == 200:
        news_data = response.json().get("articles",[])
        save_news_database(news_list=news_data , db=db)
        return {"message": "News Stored successfully"}
    return {"error": "Failed to fetch news"}