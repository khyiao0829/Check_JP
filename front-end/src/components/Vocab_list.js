import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function VocabularyList({ level }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/vocab/${level}`)
      .then(res => res.json())
      .then(data => setWords(data))
      .catch(err => console.error(err));
  }, [level]);

  return (
    <div>
      <h2>JLPT {level} 단어</h2>
      <ul>
        {words.map(v => (
          <li key={v.id}>
            <Link to={`/vocab/${level}/${v.id}`}>
              <strong>{v.word}</strong> ({v.reading}) - {v.meaning_ko || v.meaning}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
