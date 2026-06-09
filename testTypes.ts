import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function check() {
  const { data, error } = await supabase.rpc('query_check_constraints');
  if (error) {
    // try direct raw query using rest if possible, but we don't have direct access.
    console.error("RPC failed, let's just insert one by one to see which fail.");
    const types = ['essay', 'short_answer', 'coding', 'flowchart_translation', 'multiple_choice'];
    for(const t of types) {
        const res = await supabase.from('assessment_questions').insert({
            menu_type: 'pre_test',
            difficulty: 'easy',
            type: t,
            title: 'test ' + t,
            instruction: 'test'
        });
        if(res.error) {
            console.log(t, "FAILED:", res.error.message);
        } else {
            console.log(t, "SUCCESS");
            // clean up
            await supabase.from('assessment_questions').delete().eq('title', 'test ' + t);
        }
    }
  }
}
check();
