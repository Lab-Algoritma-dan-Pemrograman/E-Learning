import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function findQuestion() {
  try {
    const { data: questions, error } = await supabase
      .from('assessment_questions')
      .select('id, title, instruction')
      .ilike('title', '%Biodata%');
      
    if (error) {
      console.error("Error fetching questions:", error.message);
      return;
    }

    console.log(`Found ${questions.length} questions matching 'Biodata':`);
    for (const q of questions) {
      console.log(`\nID: ${q.id}`);
      console.log(`Title: ${q.title}`);
      console.log(`Instruction:\n${q.instruction}`);
      console.log("-".repeat(40));
    }
  } catch (err: any) {
    console.error("Exception:", err.message);
  }
}

findQuestion();
