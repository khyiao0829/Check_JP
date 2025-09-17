import React, { useState } from "react";
import { analyzeText } from "../services/api";

export default function Analyzer() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState([]);
  const [corrections, setCorrections] = useState([]);

  const handleAnalyze = async () => {
    try {
      const result = await analyzeText(input);
      setTokens(result.tokens);
      setCorrections(result.corrections);
    } catch (err) {
      console.error(err);
      alert("API 요청 실패 😢");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">日本語 文法チェッカー</h2>

      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="日本語の文を入力してください"
      />

      <button
        onClick={handleAnalyze}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        分析する
      </button>

      {/* Tokens 표시 */}
      <div className="mt-4">
        <h3 className="font-bold">形態素解析 (Tokens)</h3>
        <ul className="list-disc pl-6">
          {tokens.map((t, idx) => (
            <li key={idx}>
              {t.surface} ({t.reading}) - {t.pos.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Corrections 표시 */}
      <div className="mt-4">
        <h3 className="font-bold">教正提案 (Corrections)</h3>
        {corrections.length === 0 ? (
          <p>問題なし ✅</p>
        ) : (
          <ul className="list-disc pl-6 text-red-600">
            {corrections.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
