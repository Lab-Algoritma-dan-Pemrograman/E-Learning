import { GoogleGenAI, Type } from "@google/genai";
import { Level } from "../data/curriculum";
import { checkRateLimit } from '../lib/securityUtils';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

export const aiCurriculumService = {
  async generateCurriculum(material: string, fileData?: string): Promise<Level[]> {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY or VITE_GEMINI_API_KEY is not configured.');
    }

    // Rate Limiting: Max 2 requests per minute for curriculum generation (heavy operation)
    if (!checkRateLimit('ai_curriculum', 2, 60000)) {
      throw new Error("Anda meminta generasi kurikulum terlalu cepat. Tunggu sebentar.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const parts: any[] = [
      {
        text: `Anda adalah seorang ahli pendidikan dan perancang kurikulum profesional. Berdasarkan materi yang diberikan (Teks dan/atau file PDF), susunlah kurikulum pembelajaran yang SANGAT LENGKAP, MENDALAM, dan TERSTRUKTUR.
        
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
        11. TOTAL output: 6 Level, minimal 30 Module, minimal 60 Lesson.`
      }
    ];

    if (fileData) {
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: fileData
        }
      });
    }

    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: parts
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              modules: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    lessons: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          title: { type: Type.STRING },
                          explanation: { type: Type.STRING },
                          codeExample: { type: Type.STRING },
                          initialCode: { type: Type.STRING },
                          solution: { type: Type.STRING },
                          hint: { type: Type.STRING },
                          quiz: {
                            type: Type.OBJECT,
                            properties: {
                              question: { type: Type.STRING },
                              options: { type: Type.ARRAY, items: { type: Type.STRING } },
                              correctAnswer: { type: Type.NUMBER }
                            },
                            required: ["question", "options", "correctAnswer"]
                          },
                          testCases: {
                            type: Type.ARRAY,
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                input: { type: Type.STRING },
                                expectedOutput: { type: Type.STRING },
                                description: { type: Type.STRING }
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
        }
      }
    });

    const response = await model;
    const text = response.text;
    if (!text) {
      throw new Error('AI failed to generate curriculum.');
    }

    try {
      return JSON.parse(text) as Level[];
    } catch (e) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid JSON format from AI.');
    }
  }
};
