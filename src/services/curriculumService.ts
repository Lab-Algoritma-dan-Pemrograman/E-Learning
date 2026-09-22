import { supabase } from '../lib/supabase';
import { Level } from '../data/curriculum';

export const curriculumService = {
  async getCurriculum(): Promise<Level[]> {
    try {
      let levelsData: any[] | null = null;
      let levelsError: any = null;

      // Try fetching ordered by sort_order
      const res = await supabase
        .from('levels')
        .select('*')
        .order('sort_order');
      levelsData = res.data;
      levelsError = res.error;

      // Fallback if sort_order column does not exist yet
      if (levelsError && levelsError.code === '42703') {
        console.warn("levels.sort_order column not found, falling back to in-memory sort by ID");
        const fallbackRes = await supabase
          .from('levels')
          .select('*');
        levelsData = fallbackRes.data;
        levelsError = fallbackRes.error;
        if (levelsData) {
          levelsData.sort((a, b) => a.id.localeCompare(b.id));
        }
      }

      if (levelsError || !levelsData || levelsData.length === 0) {
        console.warn("No curriculum in database or failed to fetch. Falling back to local static curriculum...");
        const { curriculum: defaultCurriculum } = await import('../data/curriculum');
        return defaultCurriculum;
      }

      const { data: modulesData } = await supabase
        .from('modules')
        .select('*')
        .order('sort_order');

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .order('sort_order');

function parseJsonField<T>(val: any, fallback: T): T {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'object') return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return (parsed !== null && parsed !== undefined) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

      return levelsData.map(level => {
        const levelModules = (modulesData || [])
          .filter(m => m.level_id === level.id)
          .map(mod => {
            const modLessons = (lessonsData || [])
              .filter(l => l.module_id === mod.id)
              .map(les => {
                const rawQuiz = parseJsonField<any>(les.quiz, null);
                const quiz = (rawQuiz && typeof rawQuiz === 'object' && (rawQuiz.question || (Array.isArray(rawQuiz.options) && rawQuiz.options.length > 0))) ? {
                  question: rawQuiz.question || '',
                  options: Array.isArray(rawQuiz.options) ? rawQuiz.options : [],
                  correctAnswer: typeof rawQuiz.correctAnswer === 'number' ? rawQuiz.correctAnswer : (typeof rawQuiz.correct_answer === 'number' ? rawQuiz.correct_answer : 0)
                } : null;
                const rawTestCases = parseJsonField<any>(les.test_cases, []);
                const testCases = (Array.isArray(rawTestCases) ? rawTestCases : []).map((tc: any) => ({
                  expectedOutput: tc.expectedOutput ?? tc.expected_output ?? '',
                  description: tc.description ?? '',
                  input: tc.input
                }));
                const rawValidation = parseJsonField<any>(les.validation_rules, []);
                const validationRules = Array.isArray(rawValidation) ? rawValidation : [];

                return {
                  id: les.id,
                  title: les.title,
                  explanation: les.explanation,
                  codeExample: les.code_example,
                  initialCode: les.initial_code,
                  solution: les.solution,
                  hint: les.hint,
                  quiz,
                  testCases,
                  validationRules,
                  xpReward: les.xp_reward ?? 60
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
          accessMode: level.access_mode,
          locked: level.locked,
          modules: levelModules
        };
      });
    } catch (error) {
      console.error("Failed to load curriculum:", error);
      const { curriculum: defaultCurriculum } = await import('../data/curriculum');
      return defaultCurriculum;
    }
  },

  subscribeToCurriculum(onUpdate: (levels: Level[]) => void): () => void {
    const fetchAndPublish = async () => {
      const curriculum = await this.getCurriculum();
      onUpdate(curriculum);
    };

    fetchAndPublish();

    const channel = supabase
      .channel('realtime:curriculum')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'levels' }, fetchAndPublish)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'modules' }, fetchAndPublish)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lessons' }, fetchAndPublish)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  async saveFullCurriculum(levels: Level[]): Promise<void> {
    try {
      // 1. Gather all incoming IDs to preserve
      const incomingLevelIds = levels.map(l => l.id);
      const incomingModuleIds: string[] = [];
      const incomingLessonIds: string[] = [];

      for (const level of levels) {
        if (level.modules) {
          for (const mod of level.modules) {
            incomingModuleIds.push(mod.id);
            if (mod.lessons) {
              for (const lesson of mod.lessons) {
                incomingLessonIds.push(lesson.id);
              }
            }
          }
        }
      }

      // 2. Fetch existing IDs in database to compare
      const { data: dbLevels, error: levelsErr } = await supabase.from('levels').select('id');
      if (levelsErr) throw levelsErr;
      const { data: dbModules, error: modulesErr } = await supabase.from('modules').select('id');
      if (modulesErr) throw modulesErr;
      const { data: dbLessons, error: lessonsErr } = await supabase.from('lessons').select('id');
      if (lessonsErr) throw lessonsErr;

      const dbLevelIds = (dbLevels || []).map(l => l.id);
      const dbModuleIds = (dbModules || []).map(m => m.id);
      const dbLessonIds = (dbLessons || []).map(l => l.id);

      // 3. Determine which ones to delete
      const levelsToDelete = dbLevelIds.filter(id => !incomingLevelIds.includes(id));
      const modulesToDelete = dbModuleIds.filter(id => !incomingModuleIds.includes(id));
      const lessonsToDelete = dbLessonIds.filter(id => !incomingLessonIds.includes(id));

      // 4. Perform deletions (lessons first, then modules, then levels)
      if (lessonsToDelete.length > 0) {
        const { error: deleteLessonsError } = await supabase
          .from('lessons')
          .delete()
          .in('id', lessonsToDelete);
        if (deleteLessonsError) throw deleteLessonsError;
      }

      if (modulesToDelete.length > 0) {
        const { error: deleteModulesError } = await supabase
          .from('modules')
          .delete()
          .in('id', modulesToDelete);
        if (deleteModulesError) throw deleteModulesError;
      }

      if (levelsToDelete.length > 0) {
        const { error: deleteLevelsError } = await supabase
          .from('levels')
          .delete()
          .in('id', levelsToDelete);
        if (deleteLevelsError) throw deleteLevelsError;
      }

      // 5. Batch / Bulk Upsert (3 requests instead of 132 sequential requests)
      const levelsToUpsert: any[] = [];
      const modulesToUpsert: any[] = [];
      const lessonsToUpsert: any[] = [];

      for (let lIdx = 0; lIdx < levels.length; lIdx++) {
        const level = levels[lIdx];
        levelsToUpsert.push({
          id: level.id,
          title: level.title,
          description: level.description,
          access_mode: level.accessMode || 'auto',
          locked: level.locked || false,
          sort_order: lIdx
        });

        if (level.modules) {
          for (let mIdx = 0; mIdx < level.modules.length; mIdx++) {
            const mod = level.modules[mIdx];
            modulesToUpsert.push({
              id: mod.id,
              level_id: level.id,
              title: mod.title,
              sort_order: mIdx
            });

            if (mod.lessons) {
              for (let lesIdx = 0; lesIdx < mod.lessons.length; lesIdx++) {
                const lesson = mod.lessons[lesIdx];
                lessonsToUpsert.push({
                  id: lesson.id,
                  module_id: mod.id,
                  title: lesson.title,
                  explanation: lesson.explanation,
                  code_example: lesson.codeExample,
                  initial_code: lesson.initialCode,
                  solution: lesson.solution,
                  hint: lesson.hint,
                  quiz: lesson.quiz || {},
                  test_cases: lesson.testCases || [],
                  validation_rules: lesson.validationRules || [],
                  sort_order: lesIdx
                });
              }
            }
          }
        }
      }

      if (levelsToUpsert.length > 0) {
        const { error: err1 } = await supabase.from('levels').upsert(levelsToUpsert);
        if (err1) throw err1;
      }
      if (modulesToUpsert.length > 0) {
        const { error: err2 } = await supabase.from('modules').upsert(modulesToUpsert);
        if (err2) throw err2;
      }
      if (lessonsToUpsert.length > 0) {
        const { error: err3 } = await supabase.from('lessons').upsert(lessonsToUpsert);
        if (err3) throw err3;
      }
    } catch (error) {
      console.error("Failed to save full curriculum:", error);
      throw error;
    }
  },

  async updateLevel(level: Level): Promise<void> {
    try {
      const { error } = await supabase
        .from('levels')
        .update({
          access_mode: level.accessMode,
          locked: level.locked,
          title: level.title,
          description: level.description
        })
        .eq('id', level.id);

      if (error) throw error;
    } catch (error) {
      console.error("Failed to update level:", error);
      throw error;
    }
  },

  async clearCurriculum(): Promise<void> {
    try {
      // CASCADE delete on levels table will automatically clear modules & lessons
      const { data } = await supabase.from('levels').select('id');
      if (data && data.length > 0) {
        const ids = data.map(d => d.id);
        const { error } = await supabase.from('levels').delete().in('id', ids);
        if (error) throw error;
      }
    } catch (error) {
      console.error("Failed to clear curriculum:", error);
      throw error;
    }
  }
};
