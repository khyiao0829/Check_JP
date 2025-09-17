# 📌 JP Checker 프로젝트 정리

## 1️⃣ FastAPI + 서버 기본
- `uvicorn main:app --reload --port 8000` → 서버 실행
- `main.py` 구조
  - `app = FastAPI()` 로 앱 객체 생성
  - `CORS` 설정 → 프론트엔드(React/Vite)와 연동 허용
  - `app.include_router(...)` 로 라우터 등록
  - `/health` 같은 헬스체크 엔드포인트 두면 확인 편리함

-----------------------------------------------------------

## 2️⃣ 라우터 구조
- `routers/analyze.py` → 형태소 분석, 규칙 기반 교정
- `routers/gec.py` → AI 교정 (GPT API 연동)
- 라우터는 `router = APIRouter()` 로 선언 → `main.py`에서 `include_router`

-----------------------------------------------------------

## 3️⃣ 서비스 계층
- **SudachiPy** → 일본어 형태소 분석기 (후리가나, 품사 태깅)
- **grammar_service.py** → 규칙 기반 교정 (예: 조사 오류 체크)
- **ai_gec_service.py** → OpenAI API 연결
  ```python
  from dotenv import load_dotenv
  import os
  from openai import OpenAI

  load_dotenv()
  client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
  ```

-----------------------------------------------------------

## 4️⃣ 환경 변수 관리 (.env)
- `back-end/.env` 파일 생성  
  ```
  OPENAI_API_KEY=sk-xxxx
  ```
- `python-dotenv`으로 불러오기  
  ```python
  from dotenv import load_dotenv
  load_dotenv()
  ```
- API 키는 `.env`에 두기

-----------------------------------------------------------

## 5️⃣ OpenAI API 교정
- `client.chat.completions.create(...)` 로 교정 결과 받음
- 사용 모델: **gpt-4o-mini**
- 비용 구조: 토큰 단위 과금 (1,000문장 교정해도 수십 엔 정도)

-----------------------------------------------------------

## 6️⃣ 디버깅 포인트
- `NameError: app is not defined` → `app = FastAPI()` 위치 확인
- `ImportError` → 파일 구조 / `__init__.py` 확인
- `500 Internal Server Error` → 서버 로그 확인 (대부분 API 키 문제, quota 문제)
- `RateLimitError (429)` → 무료 크레딧 소진 → 결제 등록 필요

-----------------------------------------------------------

## 7️⃣ 현재 상태
✅ JP Checker는 다음을 지원:
- 일본어 문장 입력 → AI 교정 결과 반환  
- FastAPI API 형태로 동작  
- 프론트엔드 연동 준비 완료  

❌ 아직 없는 기능:
- 교정 이력 저장 (DB 필요)  
- UI/UX 개선 (문장 비교, 색상 표시)  
- 사용자 맞춤 학습 기능  

-----------------------------------------------------------

# 정리
- 지금까지는 OpenAI를 연동한 일본어 문법 교정 기능 
- 이 상태로도 프론트엔드랑 연결해서 학습 도구로 활용 가능  
- 향후 확장은 >>학습 기능 + 서비스화<< 로 발전 가능  
- API 키와 환경 관리, 라우터/서비스 분리 구조 
