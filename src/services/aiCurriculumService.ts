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
  async generateCurriculum(material: string, fileData?: string, onProgress?: (msg: string) => void): Promise<Level[]> {
    const model = "gemini-1.5-flash"; // Force use Flash for high-granularity speed

    if (onProgress) onProgress("Menganalisis materi & menyusun kerangka (Skeleton)...");

    // Phase 1: Generate Structure (Skeleton)
    const skeletonText = await callAiApi({
      prompt: this._getSkeletonPrompt(material),
      model,
      responseMimeType: "application/json",
      responseSchema: this._getSkeletonSchema(),
      fileData
    });

    let levels: Level[];
    try {
      levels = JSON.parse(skeletonText).levels;
    } catch (e) {
      console.error("Failed to parse skeleton:", skeletonText);
      throw new Error("Gagal menyusun kerangka kurikulum.");
    }

    // Phase 2: Iterate through levels and modules to fill them
    let totalModules = 0;
    levels.forEach(l => totalModules += l.modules.length);
    let currentModuleIdx = 0;

    for (const level of levels) {
      for (const module of level.modules) {
        currentModuleIdx++;
        if (onProgress) onProgress(`Menyusun konten: ${level.title} - ${module.title} (${currentModuleIdx} dari ${totalModules})...`);

        const moduleContentText = await callAiApi({
          prompt: this._getModuleContentPrompt(level.title, module.title, material),
          model,
          responseMimeType: "application/json",
          responseSchema: this._getModuleContentSchema(),
          fileData // Pass file data in each module request for context
        });

        try {
          const fullModule = JSON.parse(moduleContentText) as Module;
          module.lessons = fullModule.lessons;
          // Ensure IDs are consistent with level IDs if possible (fallback logic)
          if (!module.id) module.id = `${level.id}-m${currentModuleIdx}`;
        } catch (e) {
          console.warn(`Failed to fill content for module: ${module.title}`, moduleContentText);
          // Don't crash the whole process, just keep empty lessons or retry (simple fallback: empty)
          module.lessons = [];
        }
      }
    }

    return levels;
  },

  _getSkeletonPrompt(material: string): string {
    return `Anda adalah pakar kurikulum. Berdasarkan materi yang diberikan (PDF/Teks), buatlah KERANGKA (SKELETON) Kurikulum 6 Level.
    
    STRUKTUR WAJIB (6 LEVEL):
    1. Bahasa C Dasar
    2. Bahasa C Menengah
    3. Bahasa C Lanjutan
    4. Python Dasar
    5. Python Menengah
    6. Python Lanjutan
    
    INSTRUKSI:
    1. Setiap level harus memiliki 3-4 Module/Bab.
    2. Setiap Module harus memiliki 2 Lesson titles (Judul saja).
    3. Output harus berupa objek JSON berisi array "levels".
    4. JANGAN menghasilkan penjelasan panjang, cukup ID, Title, dan struktur modul/lesson saja.
    
    MATERI:
    ${material || "Gunakan file PDF."}
    
    Format output: { "levels": [ { "id": "...", "title": "...", "description": "...", "modules": [ { "id": "...", "title": "...", "lessons": [ { "id": "...", "title": "..." } ] } ] } ] }`;
  },

  _getSkeletonSchema(): any {
    return {
      type: "object",
      properties: {
        levels: {
          type: "array",
          items: {
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
                          title: { type: "string" }
                        },
                        required: ["id", "title"]
                      }
                    }
                  },
                  required: ["id", "title", "lessons"]
                }
              }
            },
            required: ["id", "title", "description", "modules"]
          }
        }
      },
      required: ["levels"]
    };
  },

  _getModuleContentPrompt(levelTitle: string, moduleTitle: string, material: string): string {
    return `Anda adalah pakar kurikulum. Lengkapi MODUL CURRICULUM di bawah ini dengan materi MENDALAM.
    
    KONTEKS:
    - Level: ${levelTitle}
    - Module: ${moduleTitle}
    
    MATERI SUMBER:
    ${material || "Berdasarkan file PDF."}
    
    INSTRUKSI:
    1. Hasilkan TEPAT 2 Lesson untuk modul ini.
    2. Setiap lesson harus memiliki: 
       - explanation (min 3 paragraf markdown, mendalam).
       - codeExample (syntax sesuai bahasa level).
       - initialCode (soal praktik).
       - solution.
       - hint.
       - quiz (1 soal).
       - testCases (min 1).
       - validationRules (regex check).
    3. Pastikan kode valid. Jika Bahasa C, gunakan #include <stdio.h>.
    
    Format: Objek JSON Module (title, lessons).`;
  },

  _getModuleContentSchema(): any {
    return {
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
      required: ["title", "lessons"]
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
