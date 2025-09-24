import { useEffect, useState } from "react";

export default function VocabList() {
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/vocab")
      .then(res => res.json())
      .then(data => setVocab(data))
      .catch(err => console.error("API 에러:", err));
  }, []);

  return (
    <div>
      <h2>단어 목록</h2>
      <ul>
  {vocab.map(item => (
    <li key={item.id}>
      {item.word} ({item.reading}) - {item.meaning}
    </li>
  ))}
</ul>
    </div>
  );
}
