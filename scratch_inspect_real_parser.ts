import fs from 'fs';
import { parseWithRegex } from './src/services/documentImportService';

const markdownText = fs.readFileSync("C:\\Users\\MyBook Hype AMD\\Downloads\\Level1_Materi_Kuis_Latihan.md", 'utf-8');
const result = parseWithRegex(markdownText.split(/\r?\n/));
const lesson1 = result.levels[0].modules[0].lessons[0];

console.log("=== LESSON 1 REAL PARSER ===");
console.log("Title:", lesson1.title);
console.log("Initial Code:\n", JSON.stringify(lesson1.initialCode));
console.log("Solution:\n", JSON.stringify(lesson1.solution));
console.log("Explanation:\n", JSON.stringify(lesson1.explanation));
console.log("Test Cases:\n", JSON.stringify(lesson1.testCases));
