import { Level, Module, Lesson } from "../data/curriculum";
import { checkRateLimit } from '../lib/securityUtils';
import { useStore } from "../store/useStore";
import { getSavedToken } from "./tokenService";

/**
 * AI Curriculum Service - Refactored to use secure backend proxy.
 * No API keys are stored or used on the client.
 */

async function callAiApi(params: {
  prompt: string;
  model: string;
  responseMimeType?: string;
  responseSchema?: any;
  fileData?: string;
  fileMimeType?: string;
}): Promise<string> {
  const token = getSavedToken();
  if (!token) {
    throw new Error('Unauthorized: Sesi Anda telah berakhir. Silakan masuk kembali melalui Web Utama.');
  }

  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...params,
      token
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.text;
}

export const aiCurriculumService = {
  async generateCurriculum(material: string, fileData?: string, onProgress?: (levelIdx: number, levelTitle: string) => void): Promise<Level[]> {
    // Rate Limiting: Max 2 requests per minute for starting curriculum generation
    if (!checkRateLimit('ai_curriculum_start', 2, 60000)) {
      throw new Error("Pencarian AI terlalu cepat. Tunggu sebentar.");
    }

    const levels: Level[] = [];
    const levelConfigs = [
      { id: "c-level-1", title: "Bahasa C Dasar", lang: "Bahasa C" },
      { id: "c-level-2", title: "Bahasa C Menengah", lang: "Bahasa C" },
      { id: "c-level-3", title: "Bahasa C Lanjutan", lang: "Bahasa C" },
      { id: "py-level-1", title: "Python Dasar", lang: "Python" },
      { id: "py-level-2", title: "Python Menengah", lang: "Python" },
      { id: "py-level-3", title: "Python Lanjutan", lang: "Python" },
    ];

    for (let i = 0; i < levelConfigs.length; i++) {
      const config = levelConfigs[i];
      if (onProgress) onProgress(i, config.title);

      const previousTitles = levels.map(l => l.title).join(", ");
      const prompt = this._getStepPrompt(i + 1, config, material, previousTitles);

      const text = await callAiApi({
        prompt: prompt,
        model: useStore.getState().selectedModel,
        responseMimeType: "application/json",
        responseSchema: this._getLevelSchema(),
        fileData
      });

      try {
        const levelData = JSON.parse(text) as Level;
        levels.push(levelData);
      } catch (e) {
        console.error(`Failed to parse AI response for level ${i + 1}:`, text);
        throw new Error(`Gagal memproses JSON pada Level ${i + 1}.`);
      }
    }

    return levels;
  },

  _getStepPrompt(step: number, config: { id: string, title: string, lang: string }, material: string, previousTitles: string): string {
    return `Anda adalah pakar kurikulum. Buatlah TEPAT 1 Level kurikulum untuk kursus pemrograman.
    
    KONTEKS UTAMA:
    - Target Level: Level ${step} - "${config.title}"
    - Bahasa Pemrograman: ${config.lang}
    - Level yang sudah dibuat sebelumnya (JANGAN DIULANG): ${previousTitles || "Belum ada"}
    
    MATERI SUMBER (MANDATORY):
    ${material || "Gunakan isi file PDF yang diunggah."}
    
    INSTRUKSI TEKNIS:
    1. Fokus HANYA pada topik "${config.title}" dalam bahasa ${config.lang}.
    2. Minimal 3 Module, maksimal 5 Module.
    3. Setiap Module minimal 2 Lesson.
    4. Penjelasan Lesson harus mendalam (min 3 paragraf markdown).
    5. Masukkan contoh kode, initial code (soal), solusi, kuis, dan test case.
    6. Gunakan ID "${config.id}" untuk level ini. Module ID gunakan prefix "${config.id.replace('level-', '')}m". Lesson ID gunakan prefix "${config.id.replace('level-', '')}l".
    7. SELURUH KONTEN HARUS BERDASARKAN MATERI PDF/TEKS YANG DIBERIKAN.
    8. Pastikan syntax kode valid untuk ${config.lang}. Untuk C sertakan #include <stdio.h>.
    
    Format output: 1 objek JSON Level.`;
  },

  _getLevelSchema(): any {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        modules: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              lessons: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                    explanation: { type: "string" },
                    codeExample: { type: "string" },
                    initialCode: { type: "string" },
                    solution: { type: "string" },
                    hint: { type: "string" },
                    quiz: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        options: { type: "array", items: { type: "string" } },
                        correctAnswer: { type: "number" }
                      },
                      required: ["question", "options", "correctAnswer"]
                    },
                    testCases: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          input: { type: "string" },
                          expectedOutput: { type: "string" },
                          description: { type: "string" }
                        },
                        required: ["expectedOutput", "description"]
                      }
                    },
                    validationRules: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          pattern: { type: "string" },
                          message: { type: "string" },
                          shouldExist: { type: "boolean" }
                        },
                        required: ["pattern", "message", "shouldExist"]
                      }
                    }
                  },
                  required: ["id", "title", "explanation", "codeExample", "initialCode", "solution", "hint", "quiz", "testCases"]
                }
              }
            },
            required: ["id", "title", "lessons"]
          }
        }
      },
      required: ["id", "title", "description", "modules"]
    };
  },

  async generateSingleModule(context: string, levelName: string, levelLanguage: string): Promise<Module> {
    // Reuse rate limit checker for module generation, allow 5 per minute
    if (!checkRateLimit('ai_module_gen', 5, 60000)) {
      throw new Error("Pencarian AI terlalu cepat. Tunggu sebentar sebelum mencoba lagi.");
    }

    const text = await callAiApi({
      prompt: `Anda adalah pakar pembuat kurikulum programming. Buatkan 1 (SATU) struktur Module lengkap untuk disisipkan ke Level bernama "${levelName}" (Bahasa di level ini: ${levelLanguage}).
Konteks/Topik Spesifik Permintaan: "${context}"

Instruksi WAJIB:
1. Buat 1 objek Module saja.
2. Di dalam module tersebut, harus ada minimal 2 Lesson dan maksimal 4 Lesson yang relevan secara logis dengan Topik spesifik yang diminta.
3. Struktur setiap Lesson sangat DIBUTUHKAN: title, explanation (mendalam), codeExample, initialCode (soal praktik), solution, hint, quiz (question, options, correctAnswer 0-3), testCases, dan validationRules (regex validation).
4. Pastikan ID unik (acak) untuk module dan lessons.
5. Kembalikan secara langsung objek JSON Module tersebut.`,
      model: useStore.getState().selectedModel,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          lessons: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                explanation: { type: "string" },
                codeExample: { type: "string" },
                initialCode: { type: "string" },
                solution: { type: "string" },
                hint: { type: "string" },
                quiz: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    options: { type: "array", items: { type: "string" } },
                    correctAnswer: { type: "number" }
                  },
                  required: ["question", "options", "correctAnswer"]
                },
                testCases: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      input: { type: "string" },
                      expectedOutput: { type: "string" },
                      description: { type: "string" }
                    },
                    required: ["expectedOutput", "description"]
                  }
                },
                validationRules: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      pattern: { type: "string" },
                      message: { type: "string" },
                      shouldExist: { type: "boolean" }
                    },
                    required: ["pattern", "message", "shouldExist"]
                  }
                }
              },
              required: ["id", "title", "explanation", "codeExample", "initialCode", "solution", "hint", "quiz", "testCases"]
            }
          }
        },
        required: ["id", "title", "lessons"]
      }
    });
    
    try {
      return JSON.parse(text) as Module;
    } catch (e) {
      throw new Error('Invalid JSON format from AI.');
    }
  },

  async generateSingleLesson(context: string, moduleName: string, levelLanguage: string): Promise<Lesson> {
    // Reuse rate limit checker for lesson generation, allow 10 per minute
    if (!checkRateLimit('ai_lesson_gen', 10, 60000)) {
      throw new Error("Pencarian AI terlalu cepat. Tunggu sebentar sebelum mencoba lagi.");
    }

    const text = await callAiApi({
      prompt: `Anda adalah pendidik pemrograman ahli. Buatkan 1 struktur Lesson/Pelajaran spesifik.
Pelajaran ini akan dimasukkan ke Modul "${moduleName}" (Fokus Bahasa: ${levelLanguage}).
Topik yang Diminta User: "${context}"

Instruksi WAJIB:
1. Kembalikan 1 objek Lesson dengan properti-propertinya.
2. Panjang explanation harus minimal 2 paragraf, menggunakan markdown.
3. Pastikan format syntax codeExample dan initialCode valid untuk ${levelLanguage}.
4. Hasilkan testCases yang logis untuk kode solusinya.
5. Hasilkan validationRules (array of regex pattern, message, shouldExist) untuk mencegah siswa melakukan hardcode.
6. Beri ID yang valid (string acak kecil/huruf).`,
      model: "gemini-3-flash-preview",
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          explanation: { type: "string" },
          codeExample: { type: "string" },
          initialCode: { type: "string" },
          solution: { type: "string" },
          hint: { type: "string" },
          quiz: {
            type: "object",
            properties: {
              question: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              correctAnswer: { type: "number" }
            },
            required: ["question", "options", "correctAnswer"]
          },
          testCases: {
            type: "array",
            items: {
              type: "object",
              properties: {
                input: { type: "string" },
                expectedOutput: { type: "string" },
                description: { type: "string" }
              },
              required: ["expectedOutput", "description"]
            }
          },
          validationRules: {
            type: "array",
            items: {
              type: "object",
              properties: {
                pattern: { type: "string" },
                message: { type: "string" },
                shouldExist: { type: "boolean" }
              },
              required: ["pattern", "message", "shouldExist"]
            }
          }
        },
        required: ["id", "title", "explanation", "codeExample", "initialCode", "solution", "hint", "quiz", "testCases"]
      }
    });

    try {
      return JSON.parse(text) as Lesson;
    } catch (e) {
      throw new Error('Invalid JSON format from AI.');
    }
  }
};
