from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.database import get_database
from app.schemas.saved_article import SaveArticleRequest, RemoveArticleRequest
from app.models.saved_article import SavedArticle
import uuid
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/articles", tags=["Saved Articles"])


@router.post("/save")
def save_article(
    article: SaveArticleRequest,
    db: Session = Depends(get_database),
    user: dict = Depends(get_current_user) 
):
    user_id = user["email"] 

    existing = db.query(SavedArticle).filter_by(user_id=user_id, url=article.url).first()
    if existing:
        raise HTTPException(status_code=409, detail="Article already saved")

    new_article = SavedArticle(
        id=uuid.uuid4(),
        user_id=user_id,
        title=article.title,
        url=article.url,
        urlToImage=article.urlToImage,
        category=article.category,
        published_at=article.published_at,
    )

    db.add(new_article)
    db.commit()
    db.refresh(new_article)

    return {"message": "Article saved successfully"}

@router.get("/saved")
def get_saved_articles(
    db: Session = Depends(get_database),
    user: dict = Depends(get_current_user)
):
    user_id = user["email"]
    saved = db.query(SavedArticle).filter_by(user_id=user_id).all()
    return saved

@router.delete("/remove")
def remove_article(
    req: RemoveArticleRequest,
    db: Session = Depends(get_database),
    user: dict = Depends(get_current_user)
):
    user_id = user["email"]
    article = db.query(SavedArticle).filter_by(user_id=user_id, url=req.url).first()

    if not article:
        raise HTTPException(status_code=404, detail = "Article not found")
    db.delete(article)
    db.commit()

    return {"message": "Article removed"}