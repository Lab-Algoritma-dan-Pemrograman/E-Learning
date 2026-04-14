import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { prompt, model: requestedModel } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI Key not configured' }), { status: 500 });
    }

    // Default to gemini-3-flash, only allow gemini-3-flash or gemini-2.5-flash
    const allowedModels = ["gemini-3-flash", "gemini-2.5-flash"];
    const modelId = allowedModels.includes(requestedModel) ? requestedModel : "gemini-3-flash";

    const genAI = new GoogleGenAI({ apiKey });
    const result = await genAI.models.generateContent({
      model: modelId,
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = result.text;

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('AI Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
