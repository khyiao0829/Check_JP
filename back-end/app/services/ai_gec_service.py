import os
from openai import OpenAI
from dotenv import load_dotenv

# .env 로드
load_dotenv()

# 클라이언트 초기화
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def correct_with_ai(text: str) -> str:
    """
    OpenAI API를 사용해 일본어 문장을 교정하는 함수
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=[
            {
                "role": "system",
                "content": "あなたは日本語の文法チェックアシスタントです。入力文を自然で正しい日本語に直してください。"
            },
            {"role": "user", "content": text},
        ],
    )
    return response.choices[0].message.content.strip()
