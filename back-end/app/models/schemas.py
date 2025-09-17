from pydantic import BaseModel
from typing import List, Optional

class AnalyzeRequest(BaseModel):
    text: str

class TokenOut(BaseModel):
    surface: str
    reading: Optional[str]
    pos: List[str]

class AnalyzeResponse(BaseModel):
    tokens: List[TokenOut]
    corrections: List[str]
