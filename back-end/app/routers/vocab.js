// back-end/routes/vocab.js
const express = require("express");
const router = express.Router();
const db = require("../../models");

// JLPT 레벨별 단어 가져오기
router.get("/:level", async (req, res) => {
  try {
    const level = req.params.level.toUpperCase();
    const vocabularies = await db.Vocabulary.findAll({
      where: { jlpt_level: level },
      limit: 50
    });
    res.json(vocabularies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단어 하나 상세 보기
router.get("/:level/:id", async (req, res) => {
  try {
    const { level, id } = req.params;
    const vocab = await db.Vocabulary.findOne({
      where: { id: id, jlpt_level: level.toUpperCase() }
    });
    if (!vocab) return res.status(404).json({ error: "단어 없음" });
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
