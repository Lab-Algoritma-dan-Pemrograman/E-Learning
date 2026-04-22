import { GoogleGenAI } from "@google/genai";
import { jwtVerify } from 'jose';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { 
      prompt, 
      model: requestedModel, 
      token, 
      responseMimeType, 
      responseSchema,
      fileData,
      fileMimeType = "application/pdf"
    } = await req.json();

    const rawKeys = process.env.GEMINI_API_KEY || "";
    const apiKeys = rawKeys.split(",").map(k => k.trim()).filter(Boolean);

    if (apiKeys.length === 0) {
      return new Response(JSON.stringify({ error: 'AI Keys not configured on server' }), { status: 500 });
    }

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Missing token' }), { status: 401 });
    }

    // 1. Verify JWT token from Web Utama
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let tokenPayload: any;
    try {
      const { payload } = await jwtVerify(token, secret);
      tokenPayload = payload;
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }

    const nim = tokenPayload.nim;

    // 2. Fetch role from Firestore via REST API (Edge friendly)
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) {
      return new Response(JSON.stringify({ error: 'Server configuration error (projectId missing)' }), { status: 500 });
    }

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${nim}`;
    const firestoreRes = await fetch(firestoreUrl);
    
    if (!firestoreRes.ok) {
       return new Response(JSON.stringify({ error: 'Unauthorized: User not found in database' }), { status: 403 });
    }

    const userData = await firestoreRes.json();
    const role = userData.fields?.role?.stringValue || 'user';

    // 3. SECURE RBAC: Only admin and editor allowed to use AI
    if (role !== 'admin' && role !== 'editor') {
       return new Response(JSON.stringify({ error: 'Akses Ditolak: Fitur AI ini hanya tersedia untuk Admin atau Editor.' }), { status: 403 });
    }

    // 4. Configure Gemini Model with Rotation Logic
    const allowedModels = ["gemini-3-flash-preview", "gemini-2.5-flash"];
    const modelId = allowedModels.includes(requestedModel) ? requestedModel : "gemini-3-flash-preview";

    // Attempt generation with key rotation
    let lastError: any = null;
    const maxAttempts = Math.min(apiKeys.length, 3); 
    const shuffledKeys = [...apiKeys].sort(() => Math.random() - 0.5);

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const currentApiKey = shuffledKeys[attempt];
      try {
        const genAI = new GoogleGenAI({ apiKey: currentApiKey });
        const generationConfig: any = {};
        if (responseMimeType) generationConfig.responseMimeType = responseMimeType;
        if (responseSchema) generationConfig.responseSchema = responseSchema;

        const model = genAI.getGenerativeModel({ model: modelId, generationConfig });
        const contentParts: any[] = [{ text: prompt }];

        if (fileData) {
          contentParts.push({ inlineData: { mimeType: fileMimeType, data: fileData } });
        }

        const result = await model.generateContent({
          contents: [{ role: "user", parts: contentParts }]
        });

        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ text }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        lastError = error;
        console.error(`Attempt ${attempt + 1} with key ${currentApiKey.substring(0, 5)}... failed:`, error.message);
        continue; 
      }
    }

    return new Response(JSON.stringify({ 
      error: `All AI key attempts failed. Last error: ${lastError?.message || 'Unknown error'}` 
    }), { status: 500 });

  } catch (error: any) {
    console.error('AI Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
