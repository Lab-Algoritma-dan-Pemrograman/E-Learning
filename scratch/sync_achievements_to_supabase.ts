import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import achievements from '../src/data/achievements.json';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase URL or Key missing in env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncAchievements() {
  console.log(`⏳ Syncing ${achievements.length} achievements to Supabase database...`);

  const records = achievements.map(ach => ({
    id: ach.id,
    title: ach.title,
    description: ach.description,
    icon: ach.icon,
    requirement_type: ach.requirementType,
    requirement_value: String(ach.requirementValue)
  }));

  const { data, error } = await supabase
    .from('achievements')
    .upsert(records, { onConflict: 'id' });

  if (error) {
    console.error("❌ Error upserting achievements to Supabase:", error);
    process.exit(1);
  }

  console.log(`✅ Successfully synced ${records.length} achievements to Supabase!`);
}

syncAchievements();
