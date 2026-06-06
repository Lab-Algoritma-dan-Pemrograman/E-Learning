import { supabase } from '../lib/supabase';
import { Level } from '../data/curriculum';

export const curriculumService = {
  async getCurriculum(): Promise<Level[]> {
    try {
      const { data: levelsData, error: levelsError } = await supabase
        .from('levels')
        .select('*')
        .order('id');

      if (levelsError || !levelsData || levelsData.length === 0) {
        return [];
      }

      const { data: modulesData } = await supabase
        .from('modules')
        .select('*')
        .order('sort_order');

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .order('sort_order');

      return levelsData.map(level => {
        const levelModules = (modulesData || [])
          .filter(m => m.level_id === level.id)
          .map(mod => {
            const modLessons = (lessonsData || [])
              .filter(l => l.module_id === mod.id)
              .map(les => ({
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
              }));
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
      return [];
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
      // 1. Insert levels
      for (const level of levels) {
        await supabase
          .from('levels')
          .upsert({
            id: level.id,
            title: level.title,
            description: level.description,
            access_mode: level.accessMode || 'auto',
            locked: level.locked || false
          });

        // 2. Insert modules
        if (level.modules) {
          for (let mIdx = 0; mIdx < level.modules.length; mIdx++) {
            const mod = level.modules[mIdx];
            await supabase
              .from('modules')
              .upsert({
                id: mod.id,
                level_id: level.id,
                title: mod.title,
                sort_order: mIdx
              });

            // 3. Insert lessons
            if (mod.lessons) {
              for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
                const lesson = mod.lessons[lIdx];
                await supabase
                  .from('lessons')
                  .upsert({
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
                    sort_order: lIdx
                  });
              }
            }
          }
        }
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
          locked: level.locked
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
