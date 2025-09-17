# 매우 간단한 규칙 기반 교정 예시 (MVP)
# 실제 품질 업은 나중에 T5 모델(/gec) 붙이면 됩니다.

from typing import List

def suggest_corrections(text: str) -> List[str]:
    suggestions = []

    # 1) 경어 흔한 교정: 送ってもらえますか → 送っていただけますか
    if "送ってもらえますか" in text or "送ってもらっていいですか" in text:
        suggestions.append("「送っていただけますか」の方が丁寧です。")

    # 2) ‘〜てくれる/もらう’ → 교사/윗사람에는 ‘〜ていただく’ 권장
    if "〜てくれる" in text or "てもらう" in text:
        suggestions.append("目上には「〜ていただく」を使うと丁寧です。")

    # 3) 흔한 오탈자/표기(예시)
    if "ベドミントン" in text:
        suggestions.append("「バドミントン」が正しい表記です。")

    return suggestions
