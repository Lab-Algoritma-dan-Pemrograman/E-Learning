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
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatInlineMarkdown(text: string): string {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/`(.*?)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">$1</code>');
  return text;
}

function parseMarkdownList(text: string): string {
  const lines = text.split('\n');
  const itemsHtml = lines.map(line => {
    let clean = line.replace(/^[-*]\s*/, '').trim();
    return `<li>${formatInlineMarkdown(clean)}</li>`;
  }).join('\n  ');
  return `<ul class="list-disc pl-5 space-y-1 my-2 text-zinc-700">\n  ${itemsHtml}\n</ul>`;
}

function parseMarkdownTable(text: string): string {
  const lines = text.split('\n');
  if (lines.length < 2) return '';
  
  const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
  const rows = lines.slice(2).map(line => {
    return line.split('|').map(s => s.trim()).filter(Boolean);
  }).filter(row => row.length > 0);
  
  const headHtml = headers.map(h => `<th class="border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left">${formatInlineMarkdown(h)}</th>`).join('');
  const rowsHtml = rows.map(row => {
    const cells = row.map(c => `<td class="border border-zinc-200 px-3 py-1.5">${formatInlineMarkdown(c)}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('\n    ');
  
  return `
  <div class="my-4 overflow-x-auto">
    <table class="w-full border-collapse border border-zinc-200 text-xs">
      <thead>
        <tr>${headHtml}</tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  </div>`;
}

function formatExplanationMarkdown(text: string): string {
  text = text.trim();
  if (!text) return '';
  
  const blocks = text.split(/```/);
  let htmlParts: string[] = [];
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (i % 2 === 1) {
      const firstLineEnd = block.indexOf('\n');
      const lang = firstLineEnd !== -1 ? block.substring(0, firstLineEnd).trim().toLowerCase() : '';
      const code = firstLineEnd !== -1 ? block.substring(firstLineEnd).trim() : block.trim();
      
      if (lang === 'python' || lang === 'c' || lang === 'cpp' || lang === 'js' || lang === 'javascript') {
        htmlParts.push(`
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Contoh Penggunaan Kode:</div>
        <pre class="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800"><code>${escapeHtml(code)}</code></pre>
      </div>`);
      } else {
        const lines = code.split('\n');
        let cmd = "python3 program.py";
        let outputLines: string[] = [];
        for (let line of lines) {
          if (line.startsWith('$')) {
            cmd = line.substring(1).trim();
          } else {
            outputLines.push(line);
          }
        }
        htmlParts.push(`
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Output Terminal:</div>
        <div class="bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl">
          <div class="flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
            <span class="ml-2 text-[10px] font-bold text-zinc-400">terminal — workspace</span>
          </div>
          <div class="whitespace-pre-wrap font-semibold leading-relaxed">
            <span class="text-zinc-500">$ ${escapeHtml(cmd)}</span>
            <span class="block mt-1 text-zinc-100">${escapeHtml(outputLines.join('\n'))}</span>
          </div>
        </div>
      </div>`);
      }
    } else {
      let textHtml = block.trim();
      if (!textHtml) continue;
      
      const paragraphs = textHtml.split(/\r?\n\r?\n/);
      for (let p of paragraphs) {
        p = p.trim();
        if (!p) continue;
        
        if (p.startsWith('|')) {
          htmlParts.push(parseMarkdownTable(p));
        } else if (p.startsWith('-') || p.startsWith('*')) {
          htmlParts.push(parseMarkdownList(p));
        } else if (p.startsWith('Output Terminal:')) {
          continue;
        } else {
          let formatted = formatInlineMarkdown(p);
          htmlParts.push(`<p class="mb-4 text-zinc-700 leading-relaxed">${formatted}</p>`);
        }
      }
    }
  }
  
  return `<div class="space-y-4">\n      ${htmlParts.join('\n').trim()}\n    </div>`;
}

export function parseWithRegex(paragraphs: string[]): ParseResult {
  const levels: Level[] = [];
  let currentLevel: Level | null = null;
  let currentModule: Module | null = null;
  let currentLesson: Lesson | null = null;
  let currentSection: 'none' | 'explanation' | 'codeExample' | 'quiz' | 'latihan_deskripsi' | 'latihan_petunjuk' | 'latihan_initial' | 'latihan_solusi' | 'latihan_expected' | 'validation_rules' | 'latihan_input' = 'none';

  let tempQuizOptions: string[] = [];
  let tempQuizAnswerStr = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const rawLine = paragraphs[i];
    const line = rawLine.trim();

    if (!line) {
      if (currentLesson) {
        if (currentSection === 'explanation') {
          currentLesson.explanation += '\n';
        } else if (currentSection === 'codeExample') {
          currentLesson.codeExample += '\n';
        } else if (currentSection === 'latihan_initial') {
          currentLesson.initialCode += '\n';
        } else if (currentSection === 'latihan_solusi') {
          currentLesson.solution += '\n';
        } else if (currentSection === 'latihan_petunjuk') {
          currentLesson.hint += '\n';
        }
      }
      continue;
    }

    // 0. Detect Section switches (if current lesson is active)
    let sectionSwitched = false;
    if (currentLesson) {
      if (line.match(/^(?:##\s*)?(?:Materi|Teori|Penjelasan|Explanation)\s*:/i)) {
        currentSection = 'explanation';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Contoh Kode|Code Example)\s*:/i)) {
        currentSection = 'codeExample';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Kuis|Quiz|Pertanyaan Kuis|Soal Kuis)\s*:/i)) {
        currentSection = 'quiz';
        const questionText = line.replace(/^(?:##\s*)?(?:Kuis|Quiz|Pertanyaan Kuis|Soal Kuis)\s*:/i, '').trim();
        if (questionText) {
          currentLesson.quiz.question = questionText;
        }
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Latihan|Practice|Tugas|Task|Deskripsi Tugas|Deskripsi|Task Description)\s*:/i)) {
        currentSection = 'latihan_deskripsi';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Petunjuk|Hint|Tips)\s*:/i)) {
        currentSection = 'latihan_petunjuk';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Kode Awal|Initial Code)\s*:/i)) {
        currentSection = 'latihan_initial';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Solusi|Solution|Kunci Solusi)\s*:/i)) {
        currentSection = 'latihan_solusi';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Expected Output|Output Diharapkan|Output)\s*:/i)) {
        currentSection = 'latihan_expected';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Validasi Kode Statis|Validasi Kode|Validation Rules|ValidationRule)\s*:/i)) {
        currentSection = 'validation_rules';
        sectionSwitched = true;
      } else if (line.match(/^(?:##\s*)?(?:Input \(opsional\)|Input)\s*:/i)) {
        currentSection = 'latihan_input';
        sectionSwitched = true;
      }
    }

    if (sectionSwitched) {
      continue;
    }

    // 1. Detect Level
    const levelMatch = line.match(/^(?:#\s*)?(?:Level|Tingkat)\s*(\d+)\s*[:\-—]?\s*(.*)/i);
    if (levelMatch) {
      const levelId = `py-level-${levelMatch[1]}`;
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
    const moduleMatch = line.match(/^(?:Subbab|Modul)\b\s*(\d*)[:\-]?\s*(.*)/i) || line.match(/^##(?![#])\s*(?:SUBBAB:\s*)?(.*)/i);
    if (moduleMatch) {
      if (!currentLevel) {
        currentLevel = {
          id: 'temp-level',
          title: 'Temp Level',
          description: '',
          modules: []
        };
        levels.push(currentLevel);
      }
      let modTitle = '';
      if (line.match(/^##/)) {
        modTitle = moduleMatch[1] ? moduleMatch[1].trim() : '';
      } else {
        modTitle = moduleMatch[2] ? moduleMatch[2].trim() : moduleMatch[0].trim();
      }
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
    const lessonMatch = line.match(/^(?:Pelajaran|Judul Pelajaran|Materi Pelajaran)\b\s*[:\-]?\s*(.*)/i) || line.match(/^###(?![#])\s*(?:Pelajaran:\s*)?(.*)/i);
    if (lessonMatch) {
      if (!currentLevel) {
        currentLevel = {
          id: 'temp-level',
          title: 'Temp Level',
          description: '',
          modules: []
        };
        levels.push(currentLevel);
      }
      if (!currentModule) {
        currentModule = {
          id: `${currentLevel.id}-m1`,
          title: 'Pendahuluan',
          lessons: []
        };
        currentLevel.modules.push(currentModule);
      }
      const lesTitle = lessonMatch[1] ? lessonMatch[1].trim() : lessonMatch[0].trim();
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

    if (!currentLesson) continue;

    // 5. Append content depending on the active section
    if (currentSection === 'explanation') {
      currentLesson.explanation += rawLine + '\n';
    } else if (currentSection === 'codeExample') {
      currentLesson.codeExample += rawLine + '\n';
    } else if (currentSection === 'quiz') {
      const optionMatch = line.match(/^([A-E])[\.\)]\s*(.*)/i);
      if (optionMatch) {
        let optionText = optionMatch[2].trim();
        if (optionText.includes('**Benar**')) {
          optionText = optionText.replace('**Benar**', '').trim();
          const idx = ['A', 'B', 'C', 'D', 'E'].indexOf(optionMatch[1].toUpperCase());
          if (idx !== -1) {
            currentLesson.quiz.correctAnswer = idx;
          }
        }
        tempQuizOptions.push(optionText);
        currentLesson.quiz.options = [...tempQuizOptions];
      } else if (line.toLowerCase().startsWith('kunci jawaban:') || line.toLowerCase().startsWith('jawaban:')) {
        tempQuizAnswerStr = line.replace(/^(?:kunci\s+jawaban|jawaban)\s*:\s*/i, '').trim().toUpperCase();
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
        if (currentLesson.quiz.question) {
          currentLesson.quiz.question += '\n' + line;
        } else {
          currentLesson.quiz.question = line;
        }
      }
    } else if (currentSection === 'latihan_deskripsi') {
      if (!currentLesson.explanation.includes('[PRACTICE_START]')) {
        currentLesson.explanation += `\n[PRACTICE_START]\n${line}\n`;
      } else {
        currentLesson.explanation += `${line}\n`;
      }
    } else if (currentSection === 'latihan_petunjuk') {
      currentLesson.hint += rawLine + '\n';
    } else if (currentSection === 'latihan_initial') {
      currentLesson.initialCode += rawLine + '\n';
    } else if (currentSection === 'latihan_solusi') {
      currentLesson.solution += rawLine + '\n';
    } else if (currentSection === 'latihan_expected') {
      if (currentLesson.testCases.length === 0) {
        currentLesson.testCases.push({
          expectedOutput: line + '\n',
          description: 'Verifikasi Output Terminal'
        });
      } else {
        currentLesson.testCases[0].expectedOutput += line + '\n';
      }
    } else if (currentSection === 'latihan_input') {
      if (line !== '-' && line !== '') {
        if (currentLesson.testCases.length === 0) {
          currentLesson.testCases.push({
            input: line,
            expectedOutput: '',
            description: 'Verifikasi Output Terminal'
          });
        } else {
          currentLesson.testCases[0].input = line;
        }
      }
    } else if (currentSection === 'validation_rules') {
      if (line.startsWith('```')) continue;
      if (!currentLesson.validationRules) {
        currentLesson.validationRules = [];
      }
      if (line.startsWith('regex pattern =')) {
        const patternVal = line.replace('regex pattern =', '').trim();
        currentLesson.validationRules.push({
          pattern: patternVal,
          message: '',
          shouldExist: true
        });
      } else if (line.startsWith('pesan error =') && currentLesson.validationRules.length > 0) {
        const lastRule = currentLesson.validationRules[currentLesson.validationRules.length - 1];
        lastRule.message = line.replace('pesan error =', '').trim();
      }
    }
  }

  // Post-processing cleanup and formatting
  levels.forEach(level => {
    level.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        let cleanExplanation = les.explanation;
        const practiceIdx = cleanExplanation.indexOf('[PRACTICE_START]');
        let practiceDesc = '';
        if (practiceIdx !== -1) {
          practiceDesc = cleanExplanation.substring(practiceIdx + '[PRACTICE_START]'.length).trim();
          cleanExplanation = cleanExplanation.substring(0, practiceIdx).trim();
        }

        const stripFences = (codeStr: string) => {
          return codeStr
            .split('\n')
            .filter(line => {
              const trimmed = line.trim();
              return !trimmed.startsWith('```') && !trimmed.startsWith("'''");
            })
            .join('\n')
            .trim();
        };

        // Auto-extract code example from explanation/materi if codeExample is empty
        if (!les.codeExample && cleanExplanation.includes('```')) {
          const blocks = cleanExplanation.split('```');
          for (let i = 1; i < blocks.length; i += 2) {
            const block = blocks[i];
            const firstLineEnd = block.indexOf('\n');
            const code = firstLineEnd !== -1 ? block.substring(firstLineEnd).trim() : block.trim();
            if (code) {
              les.codeExample = code;
              break;
            }
          }
        }

        les.explanation = formatExplanationMarkdown(cleanExplanation);
        
        if (practiceDesc) {
          const formattedDesc = formatInlineMarkdown(practiceDesc).replace(/\n/g, '<br/>');
          les.explanation += `
            <div id="practice-assignment" class="mt-6 border-t border-zinc-200 pt-6">
              <h4 class="text-sm font-bold text-zinc-900 mb-2">Latihan Praktik</h4>
              <p class="text-zinc-700 leading-relaxed">${formattedDesc}</p>
            </div>`;
        }

        les.codeExample = stripFences(les.codeExample);
        les.initialCode = stripFences(les.initialCode);
        les.solution = stripFences(les.solution);
        les.hint = les.hint.trim();
        
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
