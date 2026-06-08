import { createClient } from '@supabase/supabase-js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { SignJWT } from 'jose';

// Load environment variables
dotenv.config();

const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase URL or Key is missing in .env!');
  process.exit(1);
}

if (!firebaseServiceAccount) {
  console.error('❌ FIREBASE_SERVICE_ACCOUNT is missing in .env!');
  process.exit(1);
}

// Initialize Firebase Admin
let serviceAccount;
try {
  serviceAccount = JSON.parse(firebaseServiceAccount);
} catch (e) {
  console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT JSON!');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateCurriculum() {
  console.log('⏳ Starting curriculum migration...');
  const curriculumRef = firestore.collection('curriculum');
  const snapshot = await curriculumRef.get();

  if (snapshot.empty) {
    console.log('⚠️ No curriculum documents found in Firestore.');
    return;
  }

  console.log(`📋 Found ${snapshot.size} level documents in Firestore.`);

  for (const doc of snapshot.docs) {
    const level = doc.data();
    console.log(`Level: ${level.id} - ${level.title}`);

    // 1. Insert Level
    const { error: lvlErr } = await supabase
      .from('levels')
      .upsert({
        id: level.id,
        title: level.title,
        description: level.description,
        access_mode: level.accessMode || 'auto',
        locked: level.locked || false
      });

    if (lvlErr) {
      console.error(`❌ Error inserting level ${level.id}:`, lvlErr);
      continue;
    }

    // 2. Insert Modules
    if (level.modules && Array.isArray(level.modules)) {
      for (let mIdx = 0; mIdx < level.modules.length; mIdx++) {
        const mod = level.modules[mIdx];
        const { error: modErr } = await supabase
          .from('modules')
          .upsert({
            id: mod.id,
            level_id: level.id,
            title: mod.title,
            sort_order: mIdx
          });

        if (modErr) {
          console.error(`❌ Error inserting module ${mod.id}:`, modErr);
          continue;
        }

        // 3. Insert Lessons
        if (mod.lessons && Array.isArray(mod.lessons)) {
          for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
            const lesson = mod.lessons[lIdx];
            const { error: lesErr } = await supabase
              .from('lessons')
              .upsert({
                id: lesson.id,
                module_id: mod.id,
                title: lesson.title,
                explanation: lesson.explanation,
                code_example: lesson.codeExample || '',
                initial_code: lesson.initialCode || '',
                solution: lesson.solution || '',
                hint: lesson.hint || null,
                quiz: lesson.quiz || {},
                test_cases: lesson.testCases || [],
                validation_rules: lesson.validationRules || [],
                sort_order: lIdx
              });

            if (lesErr) {
              console.error(`❌ Error inserting lesson ${lesson.id}:`, lesErr);
            }
          }
        }
      }
    }
  }
  console.log('✅ Curriculum migration completed.');
}

async function migrateGameQuestions() {
  console.log('⏳ Starting game questions migration...');
  const questionsRef = firestore.collection('game_questions');
  const snapshot = await questionsRef.get();

  if (snapshot.empty) {
    console.log('⚠️ No game questions found in Firestore.');
    return;
  }

  console.log(`📋 Found ${snapshot.size} game questions in Firestore.`);

  const formatted = snapshot.docs.map(doc => {
    const q = doc.data();
    return {
      language: q.language,
      difficulty: q.difficulty,
      title: q.title,
      code: q.code,
      bug_line: q.bugLine !== undefined ? q.bugLine : q.bug_line,
      explanation: q.explanation
    };
  });

  // Bulk delete existing game questions to prevent duplicates
  const { data: existingData } = await supabase.from('game_questions').select('id');
  if (existingData && existingData.length > 0) {
    const ids = existingData.map(d => d.id);
    await supabase.from('game_questions').delete().in('id', ids);
  }

  // Bulk insert to Supabase
  const { error: insertErr } = await supabase
    .from('game_questions')
    .insert(formatted);

  if (insertErr) {
    console.error('❌ Error inserting game questions into Supabase:', insertErr);
  } else {
    console.log(`✅ Successfully migrated ${formatted.length} game questions.`);
  }
}

async function run() {
  try {
    const jwtSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || '';
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY && jwtSecret) {
      console.log('🔑 SUPABASE_SERVICE_ROLE_KEY not found. Generating an admin JWT token using JWT_SECRET...');
      try {
        const key = Buffer.from(jwtSecret, 'base64');
        const token = await new SignJWT({
          nim: '202211083', // kordas/admin NIM
          nama: 'SYSTEM MIGRATION',
          kelas: 'SYSTEM',
          role: 'authenticated',
          user_role: 'admin',
          email: 'admin@e-learning.internal'
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(key);
        
        (supabase as any).rest.headers['Authorization'] = `Bearer ${token}`;
        console.log('✅ Admin JWT successfully injected.');
      } catch (err: any) {
        console.warn('⚠️ Failed to generate admin JWT:', err.message);
      }
    }

    await migrateCurriculum();
    await migrateGameQuestions();
    console.log('🎉 Migration finished successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

run();
