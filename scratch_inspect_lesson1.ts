import fs from 'fs';

// Copy the exact parseWithRegex logic and check what it outputs for Lesson 1's initialCode and solution
const markdownText = fs.readFileSync("C:\\Users\\MyBook Hype AMD\\Downloads\\Level1_Materi_Kuis_Latihan.md", 'utf-8');

// Let's use the parseWithRegex function from scratch_test_parser.ts
import { parseWithRegex } from './scratch_test_parser';

const result = parseWithRegex(markdownText.split(/\r?\n/));
const lesson1 = result.levels[0].modules[0].lessons[0];

console.log("=== LESSON 1 ===");
console.log("Title:", lesson1.title);
console.log("Initial Code:\n", JSON.stringify(lesson1.initialCode));
console.log("Solution:\n", JSON.stringify(lesson1.solution));
console.log("Explanation:\n", JSON.stringify(lesson1.explanation));
console.log("Test Cases:\n", JSON.stringify(lesson1.testCases));
