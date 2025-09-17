from fastapi import APIRouter
from app.services.ai_gec_service import correct_with_ai

router = APIRouter()

@router.post("/gec")
async def gec_endpoint(payload: dict):
    text = payload.get("text", "")
    suggestion = correct_with_ai(text)
    return {"input": text, "suggestion": suggestion}
