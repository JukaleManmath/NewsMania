from pydantic import BaseModel
from typing import Optional

class SaveArticleRequest(BaseModel):
    title: str
    url: str
    urlToImage: Optional[str] = None
    category: Optional[str] = None
    published_at: Optional[str] = None
    

class RemoveArticleRequest(BaseModel):
    url:str