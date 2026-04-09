import { GoogleGenAI, Type } from "@google/genai";
import { Level } from "../data/curriculum";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

export const aiCurriculumService = {
  async generateCurriculum(material: string, fileData?: string): Promise<Level[]> {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY or VITE_GEMINI_API_KEY is not configured.');
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
        
        DETEKSI BAHASA PEMROGRAMAN:
        - Analisis materi PDF untuk menentukan bahasa pemrograman yang digunakan (Python, C, C++, atau lainnya).
        - Jika materi menggunakan bahasa C/C++, SEMUA kode dalam kurikulum HARUS menggunakan syntax C yang valid:
          * Gunakan #include <stdio.h> di awal setiap program
          * Gunakan printf() untuk output, scanf() untuk input
          * Gunakan int main() sebagai fungsi utama
          * Akhiri dengan return 0;
          * Deklarasi variabel dengan tipe data (int, float, char, dll)
          * Gunakan format specifier yang benar (%d, %f, %s, %c, dll)
        - Jika materi menggunakan Python, gunakan syntax Python standar (print, input, def, dll).
        - JANGAN mencampur bahasa. Gunakan satu bahasa secara konsisten.
        
        Materi Teks:
        ${material || "Tidak ada materi teks tambahan. Fokus pada isi file PDF."}
        
        Instruksi WAJIB:
        1. Buatlah Level berdasarkan bab/bagian utama dalam materi PDF. Minimal 3 Level, maksimal disesuaikan dengan isi PDF.
        2. Setiap Level WAJIB memiliki minimal 3-5 Module yang mencakup sub-topik dalam bab tersebut.
        3. Setiap Level WAJIB memiliki MINIMAL 10 LESSON secara total (tersebar di module-modulenya).
        4. Setiap Lesson harus memiliki:
           - Penjelasan (explanation) dalam format Markdown yang SANGAT MENDALAM dan DETAIL berdasarkan materi PDF. Minimal 3 paragraf penjelasan.
           - Contoh kode (codeExample) yang relevan, bisa dijalankan, dan SESUAI bahasa pemrograman dalam materi.
           - Kode awal untuk latihan (initialCode) yang menantang siswa. Untuk C, sertakan #include dan int main().
           - Solusi kode (solution) yang benar dan lengkap.
           - Petunjuk (hint) yang membantu tanpa memberikan jawaban langsung.
           - Satu pertanyaan kuis pilihan ganda (quiz) untuk menguji pemahaman konsep dari materi.
           - Minimal satu test case untuk memvalidasi kode latihan (testCases). expectedOutput harus sesuai output program.
        5. Gunakan Bahasa Indonesia yang profesional namun mudah dipahami.
        6. Pastikan ID unik untuk setiap level, module, dan lesson (misal: level-ai-1, module-ai-1, lesson-ai-1).
        7. Output HARUS dalam format JSON sesuai dengan struktur data yang diberikan.
        8. JANGAN gunakan contoh soal atau materi generik. SEMUA konten harus berdasarkan isi PDF/materi yang diberikan.
        9. Pastikan urutan lesson mengikuti alur logis dari materi PDF (dari dasar ke lanjutan).
        10. Setiap lesson harus saling berkaitan dan membangun pemahaman secara bertahap.`
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
