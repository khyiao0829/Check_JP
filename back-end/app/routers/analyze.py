from fastapi import APIRouter
from app.models.schemas import AnalyzeRequest, AnalyzeResponse, TokenOut
from app.services.furigana_service import analyze_tokens
from app.services.grammar_service import suggest_corrections

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    tokens_raw = analyze_tokens(req.text)
    tokens = [TokenOut(**t) for t in tokens_raw]

    corrections = suggest_corrections(req.text)  # 규칙 기반 간단 교정
    return AnalyzeResponse(tokens=tokens, corrections=corrections)
