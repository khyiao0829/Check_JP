from sudachipy import tokenizer, dictionary

# Sudachi 사전 로드 (core dict)
_tokenizer = dictionary.Dictionary().create()
_mode = tokenizer.Tokenizer.SplitMode.C

def analyze_tokens(text: str):
    ms = _tokenizer.tokenize(text, _mode)
    return [
        {
            "surface": m.surface(),
            "reading": m.reading_form() or None,
            "pos": list(m.part_of_speech()),
        }
        for m in ms
    ]
