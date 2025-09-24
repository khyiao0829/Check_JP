//git clone에서 불러온 단어 DB에 집어넣는 과정
'use strict';
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync"); // 동기 파서
const db = require("./models");

async function seedAllVocab() {
  try {
    const levels = ["1", "2", "3", "4", "5"]; // JLPT 레벨

    for (const lvl of levels) {
      const filePath = path.join(__dirname, `./jlpt-word-list/src/n${lvl}.csv`);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ 파일 없음: ${filePath}`);
        continue;
      }

      // CSV 파일 읽기 & 파싱
      const fileContent = fs.readFileSync(filePath, "utf8");
      const records = parse(fileContent, {
        columns: false,    // 헤더 없음
        skip_empty_lines: true,
      });

      // records = [ [word, reading, meaning, jlpt_level], ... ]
      // 첫 줄이 헤더라면 제거
      if (records[0][0] === "word") {
        records.shift();
      }

      const data = records.map(r => ({
        word: r[0]?.trim() || "",
        reading: r[1]?.trim() || "",
        meaning: r[2]?.trim() || "",
        jlpt_level: r[3]?.replace("JLPT_", "N").trim() || "",
        example_sentence: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      if (data.length > 0) {
        await db.Vocabulary.bulkCreate(data);
        console.log(`✅ JLPT N${lvl} 단어 삽입 완료: ${data.length} 개`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ 에러 발생:", err);
    process.exit(1);
  }
}

seedAllVocab();
