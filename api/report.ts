import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { token, payload: progressData } = await req.json();
    
    if (!token || !progressData) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    // 1. Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const tokenPayload = payload as any;

    // 2. Validate that the NIM in the token matches the NIM in the report
    if (tokenPayload.nim !== progressData.nim) {
      return new Response(JSON.stringify({ error: 'UNAUTHORIZED: Identity mismatch' }), { status: 403 });
    }

    // 3. Initialize Supabase with SERVICE ROLE to bypass RLS for this system report
    const supabaseUrl = process.env.VITE_SUPABASE_URL || ''; // Can use VITE_ on server too, but process.env is safer
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''; 

    if (!supabaseUrl || !supabaseServiceKey) {
       return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const percentage = progressData.totalLessons > 0
      ? Math.round((progressData.completedLessons / progressData.totalLessons) * 10000) / 100
      : 0;

    const { error } = await supabase
      .from('elearning_progress')
      .upsert({
        nim: progressData.nim,
        student_name: progressData.studentName,
        lessons_completed: progressData.completedLessons,
        total_lessons: progressData.totalLessons,
        completion_percentage: percentage,
        is_completed: progressData.isCompleted,
        completed_levels: progressData.completedLevels,
        current_level: progressData.currentLevel,
        last_accessed_at: new Date().toISOString(),
      }, {
        onConflict: 'nim',
      });

    if (error) {
       console.error('Supabase update error:', error);
       return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Report error:', error);
    return new Response(JSON.stringify({ error: 'Auth failed or internal error' }), { status: 401 });
  }
}
