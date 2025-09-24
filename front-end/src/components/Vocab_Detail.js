import { useState, useEffect } from "react";

export default function VocabularyDetail({ level, id }) {
  const [vocab, setVocab] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/vocab/${level}/${id}`)
      .then(res => res.json())
      .then(data => setVocab(data))
      .catch(err => console.error(err));
  }, [level, id]);

  if (!vocab) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>{vocab.word}</h2>
      <p><b>읽는 법:</b> {vocab.reading}</p>
      <p><b>뜻:</b> {vocab.meaning_ko || vocab.meaning}</p>
      <p><b>JLPT 레벨:</b> {vocab.jlpt_level}</p>
      <p><b>예문:</b> {vocab.example_sentence || "예문 없음"}</p>
    </div>
  );
}
