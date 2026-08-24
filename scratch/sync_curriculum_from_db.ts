import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || '';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!url || !key) {
  console.error("Missing Supabase credentials!");
  process.exit(1);
}

const supabase = createClient(url, key);

async function syncCurriculum() {
  console.log("Fetching full curriculum from Supabase DB...");

  // Fetch levels
  let { data: levelsData, error: levelsError } = await supabase
    .from('levels')
    .select('*')
    .order('sort_order');

  if (levelsError && levelsError.code === '42703') {
    const fallbackRes = await supabase.from('levels').select('*');
    levelsData = fallbackRes.data;
    if (levelsData) {
      levelsData.sort((a, b) => a.id.localeCompare(b.id));
    }
  }

  if (!levelsData || levelsData.length === 0) {
    console.error("No levels found in DB!");
    return;
  }

  // Fetch modules
  const { data: modulesData } = await supabase
    .from('modules')
    .select('*')
    .order('sort_order');

  // Fetch lessons
  const { data: lessonsData } = await supabase
    .from('lessons')
    .select('*')
    .order('sort_order');

  let totalModules = 0;
  let totalLessons = 0;

  const resolvedLevels = levelsData.map(level => {
    const levelModules = (modulesData || [])
      .filter(m => m.level_id === level.id)
      .map(mod => {
        totalModules++;
        const modLessons = (lessonsData || [])
          .filter(l => l.module_id === mod.id)
          .map(les => {
            totalLessons++;
            return {
              id: les.id,
              title: les.title,
              explanation: les.explanation,
              codeExample: les.code_example,
              initialCode: les.initial_code,
              solution: les.solution,
              hint: les.hint,
              quiz: les.quiz,
              testCases: les.test_cases,
              validationRules: les.validation_rules
            };
          });
        return {
          id: mod.id,
          title: mod.title,
          lessons: modLessons
        };
      });

    return {
      id: level.id,
      title: level.title,
      description: level.description,
      accessMode: level.access_mode || 'auto',
      locked: level.locked || false,
      modules: levelModules
    };
  });

  console.log(`Fetched -> Levels: ${resolvedLevels.length}, Modules: ${totalModules}, Lessons: ${totalLessons}`);

  // Write to src/data/curriculum.ts
  const codeContent = `// Auto-generated curriculum file synced from Supabase DB
export interface ValidationRule {
  pattern: string;
  message: string;
  shouldExist: boolean;
  flags?: string;
  stripStrings?: boolean;
  presetId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  codeExample: string;
  initialCode: string;
  solution: string;
  hint: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  testCases: {
    input?: string;
    expectedOutput: string;
    description: string;
  }[];
  validationRules?: ValidationRule[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  title: string;
  description: string;
  locked?: boolean;
  accessMode?: 'auto' | 'unlocked' | 'locked'; 
  modules: Module[];
}

export const curriculum: Level[] = ${JSON.stringify(resolvedLevels, null, 2)};
`;

  const targetPath = path.resolve(process.cwd(), 'src/data/curriculum.ts');
  fs.writeFileSync(targetPath, codeContent, 'utf8');
  console.log(`Successfully updated ${targetPath}!`);
}

syncCurriculum();
