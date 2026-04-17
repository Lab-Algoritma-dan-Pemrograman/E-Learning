import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';
import admin from 'firebase-admin';

// Initialize Firebase Admin (Only once)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase Admin init error:', error);
  }
}

const db = admin.firestore();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, nim } = req.body;
    
    if (!token || !nim) {
      return res.status(400).json({ error: 'Missing token or nim' });
    }

    // 1. Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const tokenPayload = payload as any;

    if (tokenPayload.nim !== nim) {
      return res.status(403).json({ error: 'Identity mismatch' });
    }

    // 2. Fetch DATA from Firestore (Source of Truth)
    // A. Get Total Lessons from Curriculum
    const curriculumSnap = await db.collection('curriculum').get();
    let totalLessons = 0;
    const allLevelIds: string[] = [];
    
    curriculumSnap.forEach(doc => {
      const data = doc.data();
      allLevelIds.push(doc.id);
      (data.modules || []).forEach((mod: any) => {
        totalLessons += (mod.lessons || []).length;
      });
    });

    // B. Get User Progress
    const progressSnap = await db.collection('users').doc(nim).collection('progress').get();
    const completedLessonIds = progressSnap.docs.map(d => d.id);
    const completedCount = completedLessonIds.length;

    // C. Calculate which levels are fully completed
    const completedLevels: string[] = [];
    let currentLevelTitle = '';

    curriculumSnap.forEach(doc => {
      const data = doc.data();
      let levelTotal = 0;
      let levelDone = 0;
      
      (data.modules || []).forEach((mod: any) => {
        (mod.lessons || []).forEach((lsn: any) => {
          levelTotal++;
          if (completedLessonIds.includes(lsn.id)) {
            levelDone++;
          }
        });
      });

      if (levelTotal > 0 && levelDone >= levelTotal) {
        completedLevels.push(data.title);
      } else if (levelDone > 0 && !currentLevelTitle) {
        currentLevelTitle = data.title;
      }
    });

    // 3. Sync to Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''; 
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 10000) / 100 : 0;

    const { error: supabaseError } = await supabase
      .from('elearning_progress')
      .upsert({
        nim: nim,
        student_name: tokenPayload.nama || tokenPayload.full_name || 'Student',
        lessons_completed: completedCount,
        total_lessons: totalLessons,
        completion_percentage: percentage,
        is_completed: totalLessons > 0 && completedCount >= totalLessons,
        completed_levels: completedLevels,
        current_level: currentLevelTitle || 'Introduction',
        last_accessed_at: new Date().toISOString(),
      }, {
        onConflict: 'nim',
      });

    if (supabaseError) throw supabaseError;

    return res.status(200).json({ 
      success: true, 
      recalculated: { 
        completed: completedCount, 
        total: totalLessons,
        percentage 
      } 
    });

  } catch (error: any) {
    console.error('Report error:', error);
    return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
}
