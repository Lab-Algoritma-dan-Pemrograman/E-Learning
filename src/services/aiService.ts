import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getCodeHint = async (
  lessonTitle: string,
  explanation: string,
  userCode: string,
  error: string,
  expectedOutput?: string
) => {
  if (!apiKey) {
    console.error("GEMINI_API_KEY or VITE_GEMINI_API_KEY is not configured.");
    return "Maaf, kunci API AI belum dikonfigurasi. Silakan hubungi admin.";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a Python tutor. A student is stuck on a lesson.
      
Lesson: ${lessonTitle}
Context: ${explanation}
Expected Output: ${expectedOutput || "N/A"}
User's Code:
\`\`\`python
${userCode}
\`\`\`
Error/Output:
${error}

Provide a short, encouraging hint in Indonesian to help the student fix their code. 
Do NOT give the full solution immediately, but point out the logical or syntax error.
Keep it under 3 sentences.`,
    });

    return response.text;
  } catch (err) {
    console.error("AI Hint Error:", err);
    return "Maaf, saya tidak bisa memberikan petunjuk saat ini. Coba periksa kembali sintaks Anda.";
  }
};
