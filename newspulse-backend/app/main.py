from fastapi import FastAPI
from app.routes import news

app = FastAPI()

app.include_router(news.router, prefix="/api")