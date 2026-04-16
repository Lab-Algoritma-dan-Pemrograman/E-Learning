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
  async generateCurriculum(material: string, fileData?: string): Promise<Level[]> {
    // Rate Limiting: Max 2 requests per minute for curriculum generation (heavy operation)
    if (!checkRateLimit('ai_curriculum', 2, 60000)) {
      throw new Error("Anda meminta generasi kurikulum terlalu cepat. Tunggu sebentar.");
    }

    const prompt = `Anda adalah seorang ahli pendidikan dan perancang kurikulum profesional. Berdasarkan materi yang diberikan (Teks dan/atau file PDF), susunlah kurikulum pembelajaran yang SANGAT LENGKAP, MENDALAM, dan TERSTRUKTUR.
        
        PENTING: 
        - Kurikulum ini WAJIB didasarkan SEPENUHNYAN pada isi materi/PDF yang diberikan.
        - Baca dan analisis SELURUH isi PDF/materi secara mendalam sebelum menyusun kurikulum.
        ... [Full Prompt Restored below] ...`;

    const text = await callAiApi({
      prompt: aiCurriculumService._getCurriculumPrompt(material),
      model: useStore.getState().selectedModel,
      responseMimeType: "application/json",
      responseSchema: aiCurriculumService._getCurriculumSchema(),
      fileData
    });

    try {
      return JSON.parse(text) as Level[];
    } catch (e) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid JSON format from AI.');
    }
  },

  _getCurriculumPrompt(material: string): string {
    return `Anda adalah seorang ahli pendidikan dan perancang kurikulum profesional. Berdasarkan materi yang diberikan (Teks dan/atau file PDF), susunlah kurikulum pembelajaran yang SANGAT LENGKAP, MENDALAM, dan TERSTRUKTUR.
        
        PENTING: 
        - Kurikulum ini WAJIB didasarkan SEPENUHNYA pada isi materi/PDF yang diberikan.
        - Baca dan analisis SELURUH isi PDF/materi secara mendalam sebelum menyusun kurikulum.
        - Setiap topik, sub-topik, dan contoh dalam PDF HARUS tercakup dalam kurikulum.
        - Jika materi bersifat spesifik (misalnya: Python untuk Akuntansi, Data Science, Web Development), maka seluruh kurikulum harus mencerminkan konteks tersebut.
        
        STRUKTUR KURIKULUM WAJIB — 6 LEVEL:
        Anda HARUS menghasilkan TEPAT 6 Level dalam urutan berikut:

        === BAHASA C (3 Level) ===
        Level 1: "Bahasa C Dasar" (id: "c-level-1")
          - Fokus: Fondasi C — struktur program, #include, main(), printf/scanf, variabel, tipe data, operator, I/O.
          - WAJIB minimal 5 Module/Subbab.
          - Setiap module minimal 2 lesson.
        Level 2: "Bahasa C Menengah" (id: "c-level-2")
          - Fokus: Alur kontrol — if/else, switch-case, for loop, while loop, do-while, fungsi, array, string.
          - WAJIB minimal 5 Module/Subbab.
          - Setiap module minimal 2 lesson.
        Level 3: "Bahasa C Lanjutan" (id: "c-level-3")
          - Fokus: Topik lanjutan — pointer, struct, memory management (malloc/free), file I/O, proyek akhir.
          - WAJIB minimal 5 Module/Subbab.
          - Setiap module minimal 2 lesson.

        === BAHASA PYTHON (3 Level) ===
        Level 4: "Python Dasar" (id: "py-level-1")
          - Fokus: Fondasi Python — print, variabel, tipe data, operator, input/output, f-string, komentar.
          - WAJIB minimal 5 Module/Subbab.
          - Setiap module minimal 2 lesson.
        Level 5: "Python Menengah" (id: "py-level-2")
          - Fokus: Alur kontrol — if/elif/else, for loop, while loop, fungsi, parameter, return, list, tuple.
          - WAJIB minimal 5 Module/Subbab.
          - Setiap module minimal 2 lesson.
        Level 6: "Python Lanjutan" (id: "py-level-3")
          - Fokus: Topik lanjutan — dictionary, string methods, file handling, error handling (try/except), proyek akhir.
          - WAJIB minimal 5 Module/Subbab.
          - Setiap module minimal 2 lesson.

        ATURAN KODE PER BAHASA:
        - Untuk Level 1-3 (Bahasa C), SEMUA kode HARUS menggunakan syntax C yang valid:
          * Gunakan #include <stdio.h> di awal setiap program
          * Gunakan printf() untuk output, scanf() untuk input
          * Gunakan int main() sebagai fungsi utama
          * Akhiri dengan return 0;
          * Deklarasi variabel dengan tipe data (int, float, char, dll)
          * Gunakan format specifier yang benar (%d, %f, %s, %c, dll)
        - Untuk Level 4-6 (Python), SEMUA kode HARUS menggunakan syntax Python standar:
          * Gunakan print() untuk output, input() untuk input
          * Gunakan def untuk fungsi
          * Tidak perlu deklarasi tipe variabel
        - JANGAN mencampur bahasa dalam satu level. Setiap level hanya menggunakan satu bahasa.

        CARA MEMBAGI MATERI PDF:
        - Analisis isi PDF secara menyeluruh. Ekstrak semua konsep, topik, dan contoh.
        - Petakan setiap konsep ke level yang sesuai dalam KEDUA bahasa (C dan Python).
        - Jika PDF hanya berisi satu bahasa, KONVERSIKAN konsep yang sama ke bahasa lainnya.
        - Pastikan konten di level C dan level Python saling melengkapi dan konsisten.
        - Materi dari PDF harus tersebar merata di semua 6 level.
        
        Materi Teks:
        ${material || "Tidak ada materi teks tambahan. Fokus pada isi file PDF."}
        
        Instruksi WAJIB:
        1. Hasilkan TEPAT 6 Level sesuai struktur di atas. Urutan: C Dasar, C Menengah, C Lanjutan, Python Dasar, Python Menengah, Python Lanjutan.
        2. Setiap Level WAJIB memiliki MINIMAL 5 Module/Subbab yang mencakup sub-topik sesuai fokus level.
        3. Setiap Level WAJIB memiliki MINIMAL 10 LESSON secara total (tersebar di module-modulenya, rata-rata 2 lesson per module).
        4. Setiap Lesson harus memiliki:
           - Penjelasan (explanation) dalam format Markdown yang SANGAT MENDALAM dan DETAIL berdasarkan materi PDF. Minimal 3 paragraf penjelasan.
           - Contoh kode (codeExample) yang relevan, bisa dijalankan, dan SESUAI bahasa pemrograman level tersebut.
           - Kode awal untuk latihan (initialCode) yang menantang siswa. Untuk C, sertakan #include dan int main().
           - Solusi kode (solution) yang benar dan lengkap.
           - Petunjuk (hint) yang membantu tanpa memberikan jawaban langsung.
           - Satu pertanyaan kuis pilihan ganda (quiz) untuk menguji pemahaman konsep dari materi.
           - Minimal satu test case untuk memvalidasi kode latihan (testCases). expectedOutput harus sesuai output program.
        5. Gunakan Bahasa Indonesia yang profesional namun mudah dipahami.
        6. Pastikan ID unik untuk setiap level, module, dan lesson. Gunakan prefix "c-" atau "c1-", "c2-", "c3-" untuk level C dan "py-" atau "py1-", "py2-", "py3-" untuk level Python.
        7. Output HARUS dalam format JSON sesuai dengan struktur data yang diberikan.
        8. JANGAN gunakan contoh soal atau materi generik. SEMUA konten harus berdasarkan isi PDF/materi yang diberikan.
        9. Pastikan urutan lesson mengikuti alur logis dari materi PDF (dari dasar ke lanjutan) dalam setiap level.
        10. Setiap lesson harus saling berkaitan dan membangun pemahaman secara bertahap.
        11. TOTAL output: 6 Level, minimal 30 Module, minimal 60 Lesson.`;
  },

  _getCurriculumSchema(): any {
    return {
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
      }
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
3. Struktur setiap Lesson sangat DIBUTUHKAN: title, explanation (mendalam), codeExample, initialCode (soal praktik), solution, hint, quiz (question, options, correctAnswer 0-3), dan testCases.
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
5. Beri ID yang valid (string acak kecil/huruf).`,
      model: "gemini-3-flash",
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
