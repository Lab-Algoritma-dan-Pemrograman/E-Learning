import { GoogleGenAI } from "@google/genai";
import { jwtVerify } from 'jose';


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

    // 1. Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let tokenPayload: any;
    try {
      const { payload } = await jwtVerify(token, secret);
      tokenPayload = payload;
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }

    const nim = tokenPayload.nim;

    // 2. Fetch role from Firestore via REST API
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

    // 3. SECURE RBAC
    if (role !== 'admin' && role !== 'editor') {
       return new Response(JSON.stringify({ error: 'Akses Ditolak: Fitur AI ini hanya tersedia untuk Admin atau Editor.' }), { status: 403 });
    }

    // 4. Configure Gemini Model with Rotation Logic
    const allowedModels = ["gemini-3-flash-preview", "gemini-2.5-flash"];
    const modelId = allowedModels.includes(requestedModel) ? requestedModel : "gemini-3-flash-preview";

    // Attempt generation with key rotation (Unified SDK @google/genai syntax)
    let lastError: any = null;
    const maxAttempts = Math.min(apiKeys.length, 3); 
    const shuffledKeys = [...apiKeys].sort(() => Math.random() - 0.5);

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const currentApiKey = shuffledKeys[attempt];
      try {
        const client = new GoogleGenAI({ apiKey: currentApiKey });
        
        // Prepare parts
        const parts: any[] = [{ text: prompt }];
        if (fileData) {
          parts.push({ inlineData: { mimeType: fileMimeType, data: fileData } });
        }

        // Generate content using modern Unified SDK syntax
        const result = await client.models.generateContent({
          model: modelId,
          contents: [{ role: "user", parts }],
          config: {
            responseMimeType: responseMimeType || "text/plain",
            responseSchema: responseSchema
          }
        });

        const text = result.text;

        return new Response(JSON.stringify({ text }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });

      } catch (error: any) {
        lastError = error;
        const errorMessage = error.message || 'Unknown error';
        console.error(`Attempt ${attempt + 1} with key ${currentApiKey.substring(0, 5)}... failed:`, errorMessage);
        
        // If it's a safety filter or invalid model error, don't bother retrying with other keys
        if (errorMessage.includes("safety") || errorMessage.includes("not found") || errorMessage.includes("404")) {
           break;
        }
        continue; 
      }
    }

    return new Response(JSON.stringify({ 
      error: `Gagal memproses AI. Detail: ${lastError?.message || 'Unknown error'}` 
    }), { status: 500 });

  } catch (error: any) {
    console.error('AI Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
