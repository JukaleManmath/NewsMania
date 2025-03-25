from fastapi import APIRouter , Request, HTTPException
from fastapi.responses import RedirectResponse , JSONResponse
import httpx
import os
from jose import JWTError, jwt
from datetime import datetime, timedelta , timezone
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI  = "http://localhost:8000/auth/google/callback"
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"



router = APIRouter()

@router.get("/google/login")
async def login_with_google():
    google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }
    request_url = f"{google_auth_url}?{urlencode(params)}"

    return RedirectResponse(request_url)

@router.get("/google/callback")
async def google_callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Missing authorization code")

    # Exchange code for access token
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI
    }

    try:
        async with httpx.AsyncClient() as client:
            token_resp = await client.post(token_url, data=token_data)
            token_resp.raise_for_status()  # will raise if status code is not 2xx
            token_json = token_resp.json()
            access_token = token_json.get("access_token")

            if not access_token:
                print("❌ Access token not found in token response:", token_json)
                raise HTTPException(status_code=400, detail="Access token not found")

            # Use access token to get user info
            userinfo_resp = await client.get(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            userinfo_resp.raise_for_status()
            userinfo = userinfo_resp.json()

    except httpx.HTTPStatusError as http_err:
        print("❌ HTTP error while exchanging code for token:", http_err)
        print("↪️ Full response text:", http_err.response.text)
        raise HTTPException(status_code=500, detail="Failed to exchange code for token")

    except Exception as e:
        print("❌ Unexpected error during token exchange or userinfo fetch:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    # Generate JWT token
    payload = {
        "sub": userinfo["email"],
        "name": userinfo.get("name"),
        "picture": userinfo.get("picture"),
        "exp": datetime.utcnow() + timedelta(hours=1)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    # Redirect to frontend with token
    redirect_to = f"http://localhost:5173/auth/callback?token={token}"
    return RedirectResponse(redirect_to)
