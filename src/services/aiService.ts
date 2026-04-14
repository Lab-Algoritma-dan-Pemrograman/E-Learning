import { checkRateLimit } from '../lib/securityUtils';
import { useStore } from '../store/useStore';

/**
 * Get a code hint from the AI via a secure server-side proxy.
 * This keeps the API Key hidden from the browser.
 */
export const getCodeHint = async (
  lessonTitle: string,
  explanation: string,
  userCode: string,
  error: string,
  expectedOutput?: string
) => {
  // Rate Limiting: Max 10 requests per minute for hints
  if (!checkRateLimit('ai_hint', 10, 60000)) {
    return "Anda meminta petunjuk terlalu cepat. Silakan tunggu sesaat sebelum mencoba lagi.";
  }

  try {
    const prompt = `You are a Python tutor. A student is stuck on a lesson.
      
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
Keep it under 3 sentences.`;

    const { selectedModel } = useStore.getState();

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model: selectedModel }),
    });

    if (!response.ok) {
      console.warn('AI proxy request failed');
      return "Maaf, saya tidak bisa memberikan petunjuk saat ini. Coba periksa kembali sintaks Anda.";
    }

    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error("AI Hint Error:", err);
    return "Maaf, saya tidak bisa memberikan petunjuk saat ini. Coba periksa kembali sintaks Anda.";
  }
};
