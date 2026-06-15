import { GoogleGenAI } from "@google/genai";
import { verifyToken } from './auth.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    let tokenPayload: any;
    try {
      tokenPayload = await verifyToken(token);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }

    const nim = tokenPayload.nim;

    // 2. Fetch role from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('nim', nim)
      .single();
    
    if (userError || !userData) {
       return new Response(JSON.stringify({ error: 'Unauthorized: User not found in database' }), { status: 403 });
    }

    const role = userData.role || 'praktikan';

    // 3. SECURE RBAC
    if (role !== 'admin' && role !== 'editor' && role !== 'kordas') {
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
