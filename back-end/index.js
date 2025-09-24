const express = require("express");
const cors = require("cors");
const db = require("./models");
const vocabRoutes = require("./app/routers/vocab");

const app = express();
app.use(cors());
app.use(express.json());


//레벨별로 가져오기
app.use("/api/vocab", vocabRoutes);

app.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});
// 회원가입 API
app.post("/signup", async (req, res) => {
  try {
    const { email, password, jlpt_level } = req.body;
    const newUser = await db.User.create({
      email,
      password,
      jlpt_level,
      premium_flag: false,
      streak_days: 0
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단어 목록 조회 API
app.get("/api/vocab", async (req, res) => {
  try {
    const vocabList = await db.Vocabulary.findAll();
    res.json(vocabList);  // ✅ JSON으로 응답
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/", (req, res) => {
  res.send("JLPT 학습 앱 서버 정상 실행 중 ✅");
});


app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
