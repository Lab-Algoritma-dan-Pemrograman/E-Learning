import { Level, Module, Lesson } from '../data/curriculum';
import { useStore } from '../store/useStore';
import { getSavedToken } from './tokenService';

export interface ParseResult {
  levels: Level[];
}

/**
 * AI-assisted parsing using the backend AI proxy.
 */
async function parseWithAi(text: string): Promise<ParseResult> {
  const token = getSavedToken();
  if (!token) {
    throw new Error('Unauthorized: Sesi Anda telah berakhir. Silakan masuk kembali melalui Web Utama.');
  }

  const selectedModel = useStore.getState().selectedModel || 'gemini-3-flash-preview';

  const schema = {
    type: 'OBJECT',
    properties: {
      levels: {
        type: 'ARRAY',
        description: 'Daftar Level yang diekstrak dari dokumen',
        items: {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING', description: 'Judul Level (kapital)' },
            description: { type: 'STRING', description: 'Deskripsi Level' },
            modules: {
              type: 'ARRAY',
              description: 'Modul / Subbab di dalam level ini',
              items: {
                type: 'OBJECT',
                properties: {
                  title: { type: 'STRING', description: 'Judul Modul / Subbab' },
                  lessons: {
                    type: 'ARRAY',
                    description: 'Daftar pelajaran di dalam modul',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        title: { type: 'STRING', description: 'Judul Pelajaran' },
                        explanation: { type: 'STRING', description: 'Penjelasan teori pelajaran (format HTML)' },
                        codeExample: { type: 'STRING', description: 'Contoh kode bahasa C' },
                        initialCode: { type: 'STRING', description: 'Kode awal untuk latihan praktikan' },
                        solution: { type: 'STRING', description: 'Kode solusi lengkap untuk latihan' },
                        hint: { type: 'STRING', description: 'Petunjuk penyelesaian latihan' },
                        quiz: {
                          type: 'OBJECT',
                          properties: {
                            question: { type: 'STRING', description: 'Soal pilihan ganda' },
                            options: {
                              type: 'ARRAY',
                              items: { type: 'STRING' },
                              description: 'Pilihan jawaban (minimal 2, biasanya 4)'
                            },
                            correctAnswer: { type: 'INTEGER', description: 'Indeks jawaban yang benar (0-indexed)' }
                          },
                          required: ['question', 'options', 'correctAnswer']
                        },
                        testCases: {
                          type: 'ARRAY',
                          items: {
                            type: 'OBJECT',
                            properties: {
                              input: { type: 'STRING', description: 'Input masukan untuk program (opsional)' },
                              expectedOutput: { type: 'STRING', description: 'Output yang diharapkan di terminal' },
                              description: { type: 'STRING', description: 'Deskripsi singkat test case ini' }
                            },
                            required: ['expectedOutput', 'description']
                          }
                        }
                      },
                      required: ['title']
                    }
                  }
                },
                required: ['title', 'lessons']
              }
            }
          },
          required: ['title', 'modules']
        }
      }
    },
    required: ['levels']
  };

  const prompt = `Anda adalah parser dokumen kurikulum E-Learning C profesional.
Tugas Anda adalah mengekstrak data kurikulum secara terstruktur sesuai schema JSON dari teks dokumen berikut.

Dokumen ini bisa berisi satu atau beberapa Level, Modul (Subbab), dan Pelajaran.
Penting:
1. Pastikan explanation (Penjelasan teori) diformat dengan HTML yang rapi, menggunakan tag seperti <p>, <ul>, <li>, <strong>, dan <code>.
2. Untuk kuis, petakan opsi pilihan ganda dan pastikan correctAnswer adalah indeks angka 0-indexed (0 untuk A, 1 untuk B, dst).
3. Untuk latihan, pastikan expectedOutput diisi dengan output terminal yang diharapkan dari eksekusi kode solusi.
4. Jika salah satu field (misalnya initialCode atau testCases) tidak ada, isilah dengan nilai default yang wajar tetapi usahakan mengekstraknya secara maksimal dari dokumen.
5. Pertahankan indentasi dan baris baru di dalam string kode (codeExample, initialCode, solution).

Berikut dokumen teks yang akan di-parse:
---
${text}
---`;

  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      model: selectedModel,
      responseMimeType: 'application/json',
      responseSchema: schema,
      token
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Gagal parse dengan AI (Status: ${response.status})`);
  }

  const resultData = await response.json();
  const parsed: ParseResult = JSON.parse(resultData.text);
  return parsed;
}

/**
 * Standard rule-based parsing for offline or fast preprocessing.
 */
export function parseWithRegex(paragraphs: string[]): ParseResult {
  const levels: Level[] = [];
  let currentLevel: Level | null = null;
  let currentModule: Module | null = null;
  let currentLesson: Lesson | null = null;
  let currentSection: 'none' | 'explanation' | 'codeExample' | 'quiz' | 'latihan_deskripsi' | 'latihan_petunjuk' | 'latihan_initial' | 'latihan_solusi' | 'latihan_expected' = 'none';

  let tempQuizOptions: string[] = [];
  let tempQuizAnswerStr = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const rawLine = paragraphs[i];
    const line = rawLine.trim();

    if (!line) {
      // If we are in code block sections, keep the empty line for layout
      if (currentLesson) {
        if (currentSection === 'explanation') {
          currentLesson.explanation += '<p>&nbsp;</p>';
        } else if (currentSection === 'codeExample') {
          currentLesson.codeExample += '\n';
        } else if (currentSection === 'latihan_initial') {
          currentLesson.initialCode += '\n';
        } else if (currentSection === 'latihan_solusi') {
          currentLesson.solution += '\n';
        }
      }
      continue;
    }

    // 1. Detect Level
    const levelMatch = line.match(/^(?:Level|Tingkat)\s*(\d+)[:\-]?\s*(.*)/i);
    if (levelMatch) {
      const levelId = `c-level-${levelMatch[1]}`;
      currentLevel = {
        id: levelId,
        title: levelMatch[2].trim() || `Level ${levelMatch[1]}`,
        description: `Materi Level ${levelMatch[1]}`,
        modules: []
      };
      levels.push(currentLevel);
      currentModule = null;
      currentLesson = null;
      currentSection = 'none';
      continue;
    }

    // 2. Detect Module / Subbab
    const moduleMatch = line.match(/^(?:Subbab|Modul)\s*(\d*)[:\-]?\s*(.*)/i) || line.match(/^##\s*(.*)/);
    if (moduleMatch && currentLevel) {
      const modTitle = moduleMatch[1] ? moduleMatch[2].trim() : moduleMatch[0].replace(/^##\s*/, '').trim();
      const modId = `${currentLevel.id}-m${currentLevel.modules.length + 1}`;
      currentModule = {
        id: modId,
        title: modTitle || `Subbab Baru`,
        lessons: []
      };
      currentLevel.modules.push(currentModule);
      currentLesson = null;
      currentSection = 'none';
      continue;
    }

    // 3. Detect Lesson / Pelajaran
    const lessonMatch = line.match(/^(?:Pelajaran|Judul Pelajaran|Materi Pelajaran)\s*[:\-]?\s*(.*)/i) || line.match(/^###\s*(.*)/);
    if (lessonMatch && currentModule) {
      const lesTitle = lessonMatch[1] ? lessonMatch[1].trim() : lessonMatch[0].replace(/^###\s*/, '').trim();
      const lesId = `${currentModule.id}-l${currentModule.lessons.length + 1}`;
      currentLesson = {
        id: lesId,
        title: lesTitle || `Pelajaran Baru`,
        explanation: '',
        codeExample: '',
        initialCode: '',
        solution: '',
        hint: '',
        quiz: { question: '', options: [], correctAnswer: 0 },
        testCases: []
      };
      currentModule.lessons.push(currentLesson);
      currentSection = 'none';
      tempQuizOptions = [];
      tempQuizAnswerStr = '';
      continue;
    }

    // If no lesson is currently active, skip lesson content parsing
    if (!currentLesson) continue;

    // 4. Detect Section switches within a Lesson
    if (line.match(/^(?:Materi|Teori|Penjelasan|Explanation)\s*:/i)) {
      currentSection = 'explanation';
      continue;
    }
    if (line.match(/^(?:Contoh Kode|Code Example)\s*:/i)) {
      currentSection = 'codeExample';
      continue;
    }
    if (line.match(/^(?:Kuis|Quiz|Pertanyaan Kuis|Soal Kuis)\s*:/i)) {
      currentSection = 'quiz';
      // If there's content after "Kuis:", treat it as the question
      const questionText = line.replace(/^(?:Kuis|Quiz|Pertanyaan Kuis|Soal Kuis)\s*:/i, '').trim();
      if (questionText) {
        currentLesson.quiz.question = questionText;
      }
      continue;
    }
    if (line.match(/^(?:Latihan|Practice|Tugas|Task)\s*:/i)) {
      currentSection = 'latihan_deskripsi';
      continue;
    }
    if (line.match(/^(?:Deskripsi Tugas|Deskripsi|Task Description)\s*:/i)) {
      currentSection = 'latihan_deskripsi';
      continue;
    }
    if (line.match(/^(?:Petunjuk|Hint|Tips)\s*:/i)) {
      currentSection = 'latihan_petunjuk';
      continue;
    }
    if (line.match(/^(?:Kode Awal|Initial Code)\s*:/i)) {
      currentSection = 'latihan_initial';
      continue;
    }
    if (line.match(/^(?:Solusi|Solution|Kunci Solusi)\s*:/i)) {
      currentSection = 'latihan_solusi';
      continue;
    }
    if (line.match(/^(?:Expected Output|Output)\s*:/i)) {
      currentSection = 'latihan_expected';
      continue;
    }

    // 5. Append content depending on the active section
    switch (currentSection) {
      case 'explanation':
        currentLesson.explanation += `<p class="mb-4 text-zinc-700 leading-relaxed">${line}</p>`;
        break;
      case 'codeExample':
        currentLesson.codeExample += rawLine + '\n';
        break;
      case 'quiz':
        // Check for options (e.g., A. Option, B. Option, or A) Option)
        const optionMatch = line.match(/^([A-E])[\.\)]\s*(.*)/i);
        if (optionMatch) {
          const optionText = optionMatch[2].trim();
          tempQuizOptions.push(optionText);
          currentLesson.quiz.options = [...tempQuizOptions];
        } else if (line.toLowerCase().startsWith('kunci jawaban:') || line.toLowerCase().startsWith('jawaban:')) {
          tempQuizAnswerStr = line.replace(/^(?:kunci\s+jawaban|jawaban)\s*:\s*/i, '').trim().toUpperCase();
          // Map option letter (A, B, C, D, E) to index (0, 1, 2, 3, 4)
          const letters = ['A', 'B', 'C', 'D', 'E'];
          const idx = letters.indexOf(tempQuizAnswerStr);
          if (idx !== -1) {
            currentLesson.quiz.correctAnswer = idx;
          } else {
            const numVal = parseInt(tempQuizAnswerStr, 10);
            if (!isNaN(numVal)) {
              currentLesson.quiz.correctAnswer = numVal;
            }
          }
        } else {
          // If no option and not the answer, append to question text
          if (currentLesson.quiz.question) {
            currentLesson.quiz.question += '\n' + line;
          } else {
            currentLesson.quiz.question = line;
          }
        }
        break;
      case 'latihan_deskripsi':
        // For lesson explanation in HTML, we will format it.
        // Wait, standard curriculum lessons have explanation, and latihan is actually inside explanation or represented in testCases.
        // Let's format the task description and append it or keep it.
        // Standard E-learning lesson schema has:
        // - explanation: HTML explanation of the lesson
        // - codeExample: example code
        // - initialCode: initial code template
        // - solution: solution code
        // - hint: hint text
        // - quiz: quiz object
        // - testCases: test cases array
        // We will combine task description into the lesson's explanation or just use it to populate initial content.
        // Let's append task description to the explanation inside a stylized block!
        if (!currentLesson.explanation.includes('id="practice-assignment"')) {
          currentLesson.explanation += `
            <div id="practice-assignment" class="mt-6 border-t border-zinc-200 pt-6">
              <h4 class="text-sm font-bold text-zinc-900 mb-2">Latihan Praktik</h4>
              <p class="text-zinc-700 leading-relaxed">${line}</p>
            </div>`;
        } else {
          // Append to the block
          currentLesson.explanation = currentLesson.explanation.replace(
            /<\/div>$/,
            `<p class="text-zinc-700 leading-relaxed mt-2">${line}</p></div>`
          );
        }
        break;
      case 'latihan_petunjuk':
        if (currentLesson.hint) {
          currentLesson.hint += '\n' + line;
        } else {
          currentLesson.hint = line;
        }
        break;
      case 'latihan_initial':
        currentLesson.initialCode += rawLine + '\n';
        break;
      case 'latihan_solusi':
        currentLesson.solution += rawLine + '\n';
        break;
      case 'latihan_expected':
        // Populate test cases
        if (currentLesson.testCases.length === 0) {
          currentLesson.testCases.push({
            expectedOutput: line + '\n',
            description: 'Verifikasi Output Terminal'
          });
        } else {
          currentLesson.testCases[0].expectedOutput += line + '\n';
        }
        break;
    }
  }

  // Post-processing cleanup (trimming newlines from code blocks)
  levels.forEach(level => {
    level.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        les.codeExample = les.codeExample.trim();
        les.initialCode = les.initialCode.trim();
        les.solution = les.solution.trim();
        les.hint = les.hint.trim();
        // Ensure expected output has correct newline termination
        les.testCases.forEach(tc => {
          if (tc.expectedOutput && !tc.expectedOutput.endsWith('\n')) {
            tc.expectedOutput += '\n';
          }
        });
      });
    });
  });

  return { levels };
}

/**
 * Merge imported Levels, Modules, and Lessons into the existing Curriculum array.
 * If names match (fuzzy matching), we update the existing elements (and merge lesson fields).
 * If they don't match, we append them.
 */
export function mergeCurriculum(original: Level[], imported: Level[]): Level[] {
  const updated = [...original];

  imported.forEach(impLvl => {
    // 1. Find or create Level
    const cleanImpLvlTitle = impLvl.title.trim().toLowerCase();
    let lvlIndex = updated.findIndex(l => l.title.trim().toLowerCase() === cleanImpLvlTitle || l.id === impLvl.id);

    if (lvlIndex === -1) {
      // Create new level
      const newLvlId = impLvl.id || `c-level-${updated.length + 1}`;
      const newLvl: Level = {
        id: newLvlId,
        title: impLvl.title,
        description: impLvl.description || `Materi ${impLvl.title}`,
        accessMode: impLvl.accessMode || 'auto',
        locked: impLvl.locked || false,
        modules: []
      };
      updated.push(newLvl);
      lvlIndex = updated.length - 1;
    } else {
      // Update existing level properties if provided
      if (impLvl.description) updated[lvlIndex].description = impLvl.description;
      if (impLvl.accessMode) updated[lvlIndex].accessMode = impLvl.accessMode;
    }

    const currentLvl = updated[lvlIndex];

    // 2. Process Modules within Level
    impLvl.modules.forEach(impMod => {
      const cleanImpModTitle = impMod.title.trim().toLowerCase();
      let modIndex = currentLvl.modules.findIndex(m => m.title.trim().toLowerCase() === cleanImpModTitle || m.id === impMod.id);

      if (modIndex === -1) {
        // Create new module
        const newModId = impMod.id || `${currentLvl.id}-m${currentLvl.modules.length + 1}`;
        const newMod: Module = {
          id: newModId,
          title: impMod.title,
          lessons: []
        };
        currentLvl.modules.push(newMod);
        modIndex = currentLvl.modules.length - 1;
      }

      const currentMod = currentLvl.modules[modIndex];

      // 3. Process Lessons within Module
      impMod.lessons.forEach(impLes => {
        const cleanImpLesTitle = impLes.title.trim().toLowerCase();
        let lesIndex = currentMod.lessons.findIndex(l => l.title.trim().toLowerCase() === cleanImpLesTitle || l.id === impLes.id);

        if (lesIndex === -1) {
          // Create new lesson
          const newLesId = impLes.id || `${currentMod.id}-l${currentMod.lessons.length + 1}`;
          const newLes: Lesson = {
            id: newLesId,
            title: impLes.title,
            explanation: impLes.explanation || '',
            codeExample: impLes.codeExample || '',
            initialCode: impLes.initialCode || '',
            solution: impLes.solution || '',
            hint: impLes.hint || '',
            quiz: impLes.quiz || { question: '', options: [], correctAnswer: 0 },
            testCases: impLes.testCases || [],
            validationRules: impLes.validationRules || []
          };
          currentMod.lessons.push(newLes);
        } else {
          // Merge lesson properties (only overwrite if the imported lesson has non-empty values)
          const targetLes = currentMod.lessons[lesIndex];
          if (impLes.explanation) targetLes.explanation = impLes.explanation;
          if (impLes.codeExample) targetLes.codeExample = impLes.codeExample;
          if (impLes.initialCode) targetLes.initialCode = impLes.initialCode;
          if (impLes.solution) targetLes.solution = impLes.solution;
          if (impLes.hint) targetLes.hint = impLes.hint;
          
          if (impLes.quiz && impLes.quiz.question) {
            targetLes.quiz = impLes.quiz;
          }
          if (impLes.testCases && impLes.testCases.length > 0) {
            targetLes.testCases = impLes.testCases;
          }
          if (impLes.validationRules && impLes.validationRules.length > 0) {
            targetLes.validationRules = impLes.validationRules;
          }
        }
      });
    });
  });

  return updated;
}

export const documentImportService = {
  async importFromText(text: string, useAi: boolean = false): Promise<ParseResult> {
    if (useAi) {
      try {
        return await parseWithAi(text);
      } catch (e) {
        console.warn('AI Parsing failed, falling back to Regex-based parsing:', e);
        // Fallback to regex
        const paragraphs = text.split(/\r?\n/);
        return parseWithRegex(paragraphs);
      }
    } else {
      const paragraphs = text.split(/\r?\n/);
      return parseWithRegex(paragraphs);
    }
  }
};
