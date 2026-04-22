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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const aiCurriculumService = {
  async generateCurriculum(material: string, fileData?: string, onProgress?: (msg: string) => void): Promise<Level[]> {
    const selectedModel = useStore.getState().selectedModel || "gemini-3-flash-preview";

    if (onProgress) onProgress("Menganalisis materi & menyusun kerangka (Skeleton)...");

    // Phase 1: Generate Structure (Skeleton)
    const skeletonText = await callAiApi({
      prompt: this._getSkeletonPrompt(material),
      model: selectedModel,
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

    // Phase 2: Batch Processing Modules (2 modules at a time)
    const allModuleTasks: { level: Level, module: Module }[] = [];
    levels.forEach(level => {
      level.modules.forEach(module => {
        allModuleTasks.push({ level, module });
      });
    });

    const totalModules = allModuleTasks.length;
    let completedModules = 0;

    // Process in chunks of 2 to stay safe with rate limits and timeouts
    for (let i = 0; i < allModuleTasks.length; i += 2) {
      const chunk = allModuleTasks.slice(i, i + 2);
      
      if (onProgress) {
        const titles = chunk.map(t => t.module.title).join(", ");
        onProgress(`Menyusun konten: ${titles} (${completedModules + 1}-${Math.min(completedModules + chunk.length, totalModules)} dari ${totalModules})...`);
      }

      // Add a small delay between requests to stay under 15 RPM
      if (i > 0) await sleep(3000);

      // Attempt with retry logic
      let success = false;
      let retries = 1;
      
      while (!success && retries >= 0) {
        try {
          const batchPrompt = this._getBatchModuleContentPrompt(chunk, material);
          const moduleContentText = await callAiApi({
            prompt: batchPrompt,
            model: selectedModel,
            responseMimeType: "application/json",
            responseSchema: this._getBatchModuleContentSchema(),
            fileData
          });

          const result = JSON.parse(moduleContentText);
          const batchResults = result.modules || [];

          chunk.forEach((task, idx) => {
            if (batchResults[idx]) {
              task.module.lessons = batchResults[idx].lessons;
            }
          });
          success = true;
        } catch (e) {
          console.warn(`Retry attempt ${1 - retries} for batch starting at ${i}`, e);
          retries--;
          if (retries >= 0) await sleep(5000); // Wait longer on error
        }
      }
      
      completedModules += chunk.length;
    }

    return levels;
  },

  _getSkeletonPrompt(material: string): string {
    return `Anda adalah pakar kurikulum. Berdasarkan materi yang diberikan (PDF/Teks), buatlah KERANGKA (SKELETON) Kurikulum 6 Level.
    
    STRUKTUR WAJIB (6 LEVEL):
    1. Bahasa C Dasar (id: c-level-1)
    2. Bahasa C Menengah (id: c-level-2)
    3. Bahasa C Lanjutan (id: c-level-3)
    4. Python Dasar (id: py-level-1)
    5. Python Menengah (id: py-level-2)
    6. Python Lanjutan (id: py-level-3)
    
    INSTRUKSI:
    1. Setiap level harus memiliki TEPAT 3 Module/Bab.
    2. Setiap Module harus memiliki TEPAT 2 Lesson titles (Judul saja).
    3. Output harus berupa objek JSON berisi array "levels".
    
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

  _getBatchModuleContentPrompt(chunk: { level: Level, module: Module }[], material: string): string {
    const targetModules = chunk.map(c => `[Level: ${c.level.title}, Module: ${c.module.title}]`).join(", ");
    return `Anda adalah pakar kurikulum. Lengkapi detail untuk MODUL-MODUL di bawah ini:
    
    TARGET MODUL:
    ${targetModules}
    
    MATERI SUMBER:
    ${material || "Berdasarkan file PDF."}
    
    INSTRUKSI:
    1. Untuk SETIAP modul di atas, hasilkan detail untuk 2 Lesson yang judulnya sudah ada di skeleton.
    2. Setiap lesson wajib memiliki: explanation (min 3 paragraf), codeExample, initialCode, solution, hint, kuis, testCases, dan validationRules (regex).
    3. Gunakan bahasa pemrograman yang sesuai dengan levelnya (C atau Python).
    
    Format: { "modules": [ { "title": "...", "lessons": [...] }, { "title": "...", "lessons": [...] } ] }`;
  },

  _getBatchModuleContentSchema(): any {
    return {
      type: "object",
      properties: {
        modules: {
          type: "array",
          items: {
            type: "object",
            properties: {
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
          }
        }
      },
      required: ["modules"]
    };
  },
  
  async generateSingleModule(context: string, levelName: string, levelLanguage: string): Promise<Module> {
    const selectedModel = useStore.getState().selectedModel || "gemini-3-flash-preview";
    const text = await callAiApi({
      prompt: `Anda adalah pakar pembuat kurikulum programming. Buatkan 1 (SATU) struktur Module lengkap untuk disisipkan ke Level bernama "${levelName}" (Bahasa di level ini: ${levelLanguage}).
Konteks/Topik Spesifik Permintaan: "${context}"

Instruksi WAJIB:
1. Buat 1 objek Module saja.
2. Di dalam module tersebut, harus ada minimal 2 Lesson dan maksimal 4 Lesson yang relevan secara logis dengan Topik spesifik yang diminta.
3. Struktur setiap Lesson sangat DIBUTUHKAN: title, explanation (mendalam), codeExample, initialCode (soal praktik), solution, hint, quiz (question, options, correctAnswer 0-3), testCases, dan validationRules (regex validation).
4. Pastikan ID unik (acak) untuk module dan lessons.
5. Kembalikan secara langsung objek JSON Module tersebut.`,
      model: selectedModel,
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
    const selectedModel = useStore.getState().selectedModel || "gemini-3-flash-preview";
    const text = await callAiApi({
      prompt: `Anda adalah pakar kurikulum. Buatkan 1 (SATU) materi pelajaran (Lesson) lengkap untuk modul bernama "${moduleName}" (Bahasa: ${levelLanguage}).
Konteks Pelajaran: "${context}"

Instruksi:
1. Berikan penjelasan (explanation) dalam format Markdown yang mendalam (minimal 3 paragraf).
2. Sertakan codeExample yang relevan.
3. Sertakan initialCode sebagai latihan (soal praktik).
4. Hasilkan solusi dan petunjuk (hint).
5. Buat kuis dengan 1 pertanyaan pilihan ganda.
6. Hasilkan testCases yang logis untuk kode solusinya.
7. Hasilkan validationRules (array of regex pattern, message, shouldExist) untuk mencegah siswa melakukan hardcode.
8. Beri ID yang valid (string acak kecil/huruf).`,
      model: selectedModel,
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
