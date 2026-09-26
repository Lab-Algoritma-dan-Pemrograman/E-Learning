import { createClient } from '@supabase/supabase-js';
import { verifyToken } from './auth.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Authenticate user
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const token = authHeader.substring(7);
    const tokenPayload = await verifyToken(token);
    if (!tokenPayload || !tokenPayload.nim) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // 2. Validate payload
    const { lessonId, selectedOption } = req.body;
    if (!lessonId || typeof selectedOption === 'undefined') {
      return res.status(400).json({ error: 'Missing required fields (lessonId, selectedOption)' });
    }

    // 3. Query lesson quiz from database
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('quiz')
      .eq('id', lessonId)
      .single();

    // Bedakan "soal tidak ada" dari "backend salah konfigurasi". Sebelumnya
    // keduanya mengembalikan 404 'Lesson not found', sehingga env var Supabase
    // yang hilang di Vercel menyamar sebagai soal yang tidak ditemukan.
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      console.error('[validate-quiz] query lesson gagal:', error.code, error.message);
      return res.status(500).json({
        error: 'Server tidak dapat membaca bank soal. Periksa konfigurasi Supabase di server.',
        code: error.code,
      });
    }
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const quiz = lesson.quiz as any;
    if (!quiz || typeof quiz.correctAnswer === 'undefined') {
      return res.status(400).json({ error: 'Lesson does not have a quiz configured' });
    }

    const correctAnswer = Number(quiz.correctAnswer);
    const isCorrect = Number(selectedOption) === correctAnswer;

    return res.status(200).json({
      isCorrect,
      correctAnswer
    });
  } catch (error: any) {
    console.error('Quiz validation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
