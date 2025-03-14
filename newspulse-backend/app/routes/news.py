import requests
from fastapi import APIRouter
from app.config import NEWS_API_KEY

router = APIRouter()

NEWS_API_URL = "https://newsapi.org/v2/top-headlines"

@router.get("/news/")
def get_news(country: str = "us" , category :str = None):
    params = {
        "apikey": NEWS_API_KEY,
        "country": country,
        "category": category,
    }
    response = requests.get(NEWS_API_URL, params=params)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch news"}