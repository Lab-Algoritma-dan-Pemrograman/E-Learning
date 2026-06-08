import { supabase } from '../lib/supabase';

export interface AssessmentQuestion {
  id?: string;
  menu_type: 'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik';
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'essay' | 'short_answer' | 'coding' | 'flowchart_translation';
  title: string;
  instruction: string;
  module_association?: number | null;
  initial_code?: string;
  reference_solution?: string;
  test_cases?: any[] | string;
  validation_rules?: any[] | string;
  flowchart_url?: string;
  created_at?: string;
  created_by?: string;
}

export interface AssessmentAttempt {
  id?: string;
  nim: string;
  menu_type: string;
  token_used?: string | null;
  selected_questions: string[];
  answers: Record<string, { answerText?: string; codeSubmitted?: string; outputStandard?: string; errors?: string }>;
  ai_grades?: Record<string, any>;
  final_score?: number | null;
  status: 'in_progress' | 'submitted' | 'graded';
  started_at: string;
  submitted_at?: string | null;
  graded_at?: string | null;
  duration_minutes: number;
  tab_switch_count?: number;
}

export const assessmentService = {
  // =========================================================================
  // QUESTIONS MANAGEMENT (CRUD)
  // =========================================================================
  async getQuestions(menuType?: string): Promise<AssessmentQuestion[]> {
    let query = supabase.from('assessment_questions').select('*').order('created_at', { ascending: false });
    if (menuType) {
      query = query.eq('menu_type', menuType);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async saveQuestion(question: AssessmentQuestion): Promise<AssessmentQuestion> {
    // Standardize JSON fields
    const formatted = {
      ...question,
      test_cases: typeof question.test_cases === 'string' ? JSON.parse(question.test_cases) : (question.test_cases || []),
      validation_rules: typeof question.validation_rules === 'string' ? JSON.parse(question.validation_rules) : (question.validation_rules || []),
      module_association: question.module_association ? Number(question.module_association) : null
    };

    if (formatted.id) {
      const { data, error } = await supabase
        .from('assessment_questions')
        .update(formatted)
        .eq('id', formatted.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('assessment_questions')
        .insert([formatted])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  async deleteQuestion(id: string): Promise<void> {
    const { error } = await supabase
      .from('assessment_questions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // =========================================================================
  // ASSESSMENT ATTEMPTS (STUDENT FLOW)
  // =========================================================================
  
  /**
   * Start a new attempt, selecting random questions matching the rules
   */
  async startAttempt(
    nim: string,
    menuType: 'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik',
    tokenUsed: string | null = null
  ): Promise<AssessmentAttempt> {
    // 1. Fetch available questions for this menuType
    const { data: allQuestions, error: qError } = await supabase
      .from('assessment_questions')
      .select('*')
      .eq('menu_type', menuType);

    if (qError) throw qError;
    if (!allQuestions || allQuestions.length === 0) {
      throw new Error(`Tidak ada soal yang tersedia untuk menu ${menuType}.`);
    }

    // 2. Select randomized questions based on rubric constraints
    const selectedIds: string[] = [];
    const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

    if (menuType === 'pre_test') {
      // pre test: 5 soal, 1 (easy), 2(medium) 2 (hard)
      const easyQs = allQuestions.filter(q => q.difficulty === 'easy');
      const medQs = allQuestions.filter(q => q.difficulty === 'medium');
      const hardQs = allQuestions.filter(q => q.difficulty === 'hard');

      if (easyQs.length < 1 || medQs.length < 2 || hardQs.length < 2) {
        throw new Error("Bank soal Pre-Test belum lengkap (minimal harus ada 1 Easy, 2 Medium, 2 Hard).");
      }

      selectedIds.push(shuffle(easyQs)[0].id);
      selectedIds.push(shuffle(medQs)[0].id, shuffle(medQs)[1].id);
      selectedIds.push(shuffle(hardQs)[0].id, shuffle(hardQs)[1].id);

    } else if (menuType === 'post_test') {
      // post test: 3 soal, 1 easy, 1 medium dan 1 hard
      const easyQs = allQuestions.filter(q => q.difficulty === 'easy');
      const medQs = allQuestions.filter(q => q.difficulty === 'medium');
      const hardQs = allQuestions.filter(q => q.difficulty === 'hard');

      if (easyQs.length < 1 || medQs.length < 1 || hardQs.length < 1) {
        throw new Error("Bank soal Post-Test belum lengkap (minimal harus ada 1 Easy, 1 Medium, 1 Hard).");
      }

      selectedIds.push(shuffle(easyQs)[0].id);
      selectedIds.push(shuffle(medQs)[0].id);
      selectedIds.push(shuffle(hardQs)[0].id);

    } else if (menuType === 'program_keterampilan') {
      // program keterampilan: 1 soal berdasarkan instruksi
      selectedIds.push(shuffle(allQuestions)[0].id);

    } else if (menuType === 'ujian_praktik') {
      // ujian praktik: 6 soal. soal 1(modul 1), soal 2(modul 2), soal 3 (modul 3), soal 4 (modul 4&5), soal 5 (modul 6), soal 6 translate flowchart 2 program
      const q1 = allQuestions.filter(q => q.module_association === 1);
      const q2 = allQuestions.filter(q => q.module_association === 2);
      const q3 = allQuestions.filter(q => q.module_association === 3);
      const q4 = allQuestions.filter(q => q.module_association === 4 || q.module_association === 5);
      const q5 = allQuestions.filter(q => q.module_association === 6);
      const q6 = allQuestions.filter(q => q.type === 'flowchart_translation');

      if (q1.length < 1 || q2.length < 1 || q3.length < 1 || q4.length < 1 || q5.length < 1 || q6.length < 1) {
        throw new Error("Bank soal Ujian Praktik belum lengkap. Harus terisi minimal 1 soal untuk masing-masing kriteria Modul 1, 2, 3, 4/5, 6, dan Flowchart Translation.");
      }

      selectedIds.push(shuffle(q1)[0].id);
      selectedIds.push(shuffle(q2)[0].id);
      selectedIds.push(shuffle(q3)[0].id);
      selectedIds.push(shuffle(q4)[0].id);
      selectedIds.push(shuffle(q5)[0].id);
      selectedIds.push(shuffle(q6)[0].id);
    }

    // 3. Define time limits in minutes
    let duration = 60;
    try {
      const { data: rulesData } = await supabase
        .from('assessment_grading_rules')
        .select('rules')
        .eq('id', menuType)
        .single();
      
      if (rulesData && rulesData.rules && (rulesData.rules as any).duration_minutes) {
        duration = Number((rulesData.rules as any).duration_minutes);
      } else {
        if (menuType === 'pre_test') duration = 15;
        else if (menuType === 'post_test') duration = 15;
        else if (menuType === 'program_keterampilan') duration = 90;
        else if (menuType === 'ujian_praktik') duration = 120;
      }
    } catch (err) {
      if (menuType === 'pre_test') duration = 15;
      else if (menuType === 'post_test') duration = 15;
      else if (menuType === 'program_keterampilan') duration = 90;
      else if (menuType === 'ujian_praktik') duration = 120;
    }

    // 4. Create attempt in Supabase
    const newAttempt: AssessmentAttempt = {
      nim,
      menu_type: menuType,
      token_used: tokenUsed,
      selected_questions: selectedIds,
      answers: {},
      status: 'in_progress',
      started_at: new Date().toISOString(),
      duration_minutes: duration
    };

    const { data, error: insertError } = await supabase
      .from('assessment_attempts')
      .insert([newAttempt])
      .select()
      .single();

    if (insertError) throw insertError;
    return data;
  },

  async getActiveAttempt(nim: string, menuType: string): Promise<AssessmentAttempt | null> {
    const { data, error } = await supabase
      .from('assessment_attempts')
      .select('*')
      .eq('nim', nim)
      .eq('menu_type', menuType)
      .eq('status', 'in_progress')
      .order('started_at', { ascending: false });

    if (error) return null;
    return data && data.length > 0 ? data[0] : null;
  },

  async getAttemptById(attemptId: string): Promise<AssessmentAttempt | null> {
    const { data, error } = await supabase
      .from('assessment_attempts')
      .select('*')
      .eq('id', attemptId)
      .single();

    if (error) return null;
    return data;
  },

  async updateAttemptAnswers(
    attemptId: string,
    answers: Record<string, { answerText?: string; codeSubmitted?: string; outputStandard?: string; errors?: string }>
  ): Promise<void> {
    const { error } = await supabase
      .from('assessment_attempts')
      .update({ answers })
      .eq('id', attemptId)
      .eq('status', 'in_progress');
    if (error) throw error;
  },

  async submitAttempt(attemptId: string): Promise<void> {
    const { error } = await supabase
      .from('assessment_attempts')
      .update({
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .eq('id', attemptId)
      .eq('status', 'in_progress');
    if (error) throw error;
  },

  // =========================================================================
  // GRADER FLOW (AI RUNNER CALLS)
  // =========================================================================
  
  /**
   * Triggers the backend AI evaluation for a list of attempt IDs
   */
  async triggerAIGrading(attemptIds: string[], model: string = 'gemini-3-flash-preview'): Promise<any> {
    const sessionToken = sessionStorage.getItem('elearning_token') || '';
    const response = await fetch('/api/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ attemptIds, requestedModel: model })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Error status: ${response.status}`);
    }

    return await response.json();
  },

  /**
   * Fetches all attempts for reporting and monitoring dashboard
   */
  async getAllAttempts(menuType?: string): Promise<any[]> {
    let query = supabase
      .from('assessment_attempts')
      .select('*, users(nama, kelas)')
      .order('submitted_at', { ascending: false });

    if (menuType) {
      query = query.eq('menu_type', menuType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
};
