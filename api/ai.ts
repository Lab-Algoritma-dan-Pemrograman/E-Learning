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

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI Key not configured on server' }), { status: 500 });
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

    // 4. Configure Gemini Model
    const allowedModels = ["gemini-3-flash", "gemini-2.5-flash"];
    const modelId = allowedModels.includes(requestedModel) ? requestedModel : "gemini-3-flash";

    const genAI = new GoogleGenAI({ apiKey });
    
    // Prepare contents
    const contents: any[] = [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ];

    // Add inline data (file) if provided
    if (fileData) {
      contents[0].parts.push({
        inlineData: {
          mimeType: fileMimeType,
          data: fileData
        }
      });
    }

    // AI Generation config
    const aiConfig: any = {};
    if (responseMimeType) aiConfig.responseMimeType = responseMimeType;
    if (responseSchema) aiConfig.responseSchema = responseSchema;

    const model = genAI.models.generateContent({
      model: modelId,
      contents: contents,
      config: aiConfig
    });

    const result = await model;
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
