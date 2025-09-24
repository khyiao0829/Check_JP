import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import VocabularyList from "./components/Vocab_list";
import VocabularyDetail from "./components/Vocab_Detail";

function App() {
  return (
    <Router>
      <div>
        <h1>JLPT 단어장</h1>

        {/* JLPT 레벨 버튼 */}
        {["N1", "N2", "N3", "N4", "N5"].map(lvl => (
          <Link key={lvl} to={`/vocab/${lvl}`}>
            <button>{lvl}</button>
          </Link>
        ))}

        <Routes>
          <Route path="/" element={<p>레벨을 선택하세요 👆</p>} />
          <Route path="/vocab/:level" element={<VocabularyListWrapper />} />
          <Route path="/vocab/:level/:id" element={<VocabularyDetailWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// 리스트 페이지
function VocabularyListWrapper() {
  const { level } = useParams();
  return <VocabularyList level={level} />;
}

// 상세 페이지
function VocabularyDetailWrapper() {
  const { level, id } = useParams();
  return <VocabularyDetail level={level} id={id} />;
}

export default App;
