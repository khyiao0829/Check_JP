from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 라우터 import
from app.routers.analyze import router as analyze_router
from app.routers import gec

# FastAPI 앱 객체 생성
app = FastAPI(title="JP Checker API")

# CORS 설정 (프론트엔드 개발 도메인 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(analyze_router, prefix="", tags=["analyze"])
app.include_router(gec.router, prefix="", tags=["gec"])

# 헬스 체크 엔드포인트
@app.get("/health")
def health():
    return {"status": "ok"}
