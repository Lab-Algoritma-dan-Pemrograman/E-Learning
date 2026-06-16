/**
 * strip_backticks.ts
 * 
 * Menghapus semua backtick (`) dari field kurikulum di Supabase:
 * - lessons: initial_code, solution, hint, quiz (JSONB), code_example
 * - assessment_questions: instruction, initial_code, reference_solution
 * 
 * Jalankan: npx tsx scratch/strip_backticks.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/** Strip semua backtick dari string */
function stripBackticks(val: unknown): unknown {
  if (typeof val === 'string') {
    return val.replace(/`/g, '');
  }
  if (Array.isArray(val)) {
    return val.map(stripBackticks);
  }
  if (val !== null && typeof val === 'object') {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      result[k] = stripBackticks(v);
    }
    return result;
  }
  return val;
}

function hasBacktick(val: unknown): boolean {
  if (typeof val === 'string') return val.includes('`');
  if (Array.isArray(val)) return val.some(hasBacktick);
  if (val !== null && typeof val === 'object') {
    return Object.values(val as Record<string, unknown>).some(hasBacktick);
  }
  return false;
}

async function stripLessons() {
  console.log('\n📚 Memproses tabel: lessons');
  const { data, error } = await supabase
    .from('lessons')
    .select('id, initial_code, solution, hint, quiz, code_example');

  if (error) { console.error('  ❌ Gagal fetch lessons:', error.message); return; }
  if (!data || data.length === 0) { console.log('  ℹ️  Tidak ada data lessons.'); return; }

  let updated = 0;
  for (const row of data) {
    const fields: Record<string, unknown> = {
      initial_code: row.initial_code,
      solution: row.solution,
      hint: row.hint,
      quiz: row.quiz,
      code_example: row.code_example,
    };

    if (!Object.values(fields).some(hasBacktick)) continue;

    const patch: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(fields)) {
      if (hasBacktick(val)) {
        patch[key] = stripBackticks(val);
      }
    }

    const { error: updateErr } = await supabase
      .from('lessons')
      .update(patch)
      .eq('id', row.id);

    if (updateErr) {
      console.error(`  ❌ Gagal update lesson ${row.id}:`, updateErr.message);
    } else {
      updated++;
      console.log(`  ✅ lesson ${row.id} — kolom: ${Object.keys(patch).join(', ')}`);
    }
  }

  console.log(`  📊 Total lessons diupdate: ${updated}/${data.length}`);
}

async function stripAssessmentQuestions() {
  console.log('\n📝 Memproses tabel: assessment_questions');
  const { data, error } = await supabase
    .from('assessment_questions')
    .select('id, instruction, initial_code, reference_solution');

  if (error) { console.error('  ❌ Gagal fetch assessment_questions:', error.message); return; }
  if (!data || data.length === 0) { console.log('  ℹ️  Tidak ada data assessment_questions.'); return; }

  let updated = 0;
  for (const row of data) {
    const fields: Record<string, unknown> = {
      instruction: row.instruction,
      initial_code: row.initial_code,
      reference_solution: row.reference_solution,
    };

    if (!Object.values(fields).some(hasBacktick)) continue;

    const patch: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(fields)) {
      if (hasBacktick(val)) {
        patch[key] = stripBackticks(val);
      }
    }

    const { error: updateErr } = await supabase
      .from('assessment_questions')
      .update(patch)
      .eq('id', row.id);

    if (updateErr) {
      console.error(`  ❌ Gagal update question ${row.id}:`, updateErr.message);
    } else {
      updated++;
      console.log(`  ✅ question ${row.id} — kolom: ${Object.keys(patch).join(', ')}`);
    }
  }

  console.log(`  📊 Total assessment_questions diupdate: ${updated}/${data.length}`);
}

async function main() {
  console.log('🔧 Strip Backtick dari Kurikulum Supabase');
  console.log('==========================================');
  console.log(`🔗 URL: ${supabaseUrl}`);

  await stripLessons();
  await stripAssessmentQuestions();

  console.log('\n✅ Selesai!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
