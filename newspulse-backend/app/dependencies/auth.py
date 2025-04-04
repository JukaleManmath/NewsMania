from fastapi import Request, HTTPException, status, Depends
from jose import jwt, JWTError
from typing import Optional, Dict
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
print("🔐 SECRET_KEY used:", SECRET_KEY)

def get_token_from_header(request: Request) -> str:
    auth_header: Optional[str] = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return auth_header.split(" ")[1]


async def get_current_user(request: Request) -> Dict:
    token = get_token_from_header(request)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = {
            "email": payload.get("sub"),
            "name": payload.get("name"),
            "picture": payload.get("picture"),
        }

        if not user["email"]:
            raise HTTPException(status_code=401, detail="Invalid token: no email found")

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
