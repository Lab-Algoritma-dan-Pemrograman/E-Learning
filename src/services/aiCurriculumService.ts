import { GoogleGenAI, Type } from "@google/genai";
import { Level } from "../data/curriculum";

const apiKey = process.env.GEMINI_API_KEY || '';

export const aiCurriculumService = {
  async generateCurriculum(material: string, fileData?: string): Promise<Level[]> {
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }

    const ai = new GoogleGenAI({ apiKey });
    const parts: any[] = [
      {
        text: `Anda adalah seorang ahli pendidikan Python. Berdasarkan materi yang diberikan (Teks dan/atau PDF), susunlah kurikulum pembelajaran Python yang lengkap dan terstruktur.
        
        PENTING: Kurikulum ini HARUS didasarkan pada materi yang saya berikan. Jika materi tersebut spesifik (misalnya: Python untuk Akuntansi), maka kurikulumnya harus mencerminkan hal tersebut.
        
        Materi Teks:
        ${material || "Tidak ada materi teks tambahan."}
        
        Instruksi:
        1. Buatlah minimal 3 Level baru yang mencakup seluruh materi yang diberikan.
        2. Setiap Level harus memiliki minimal 2 Module.
        3. Setiap Module harus memiliki minimal 2 Lesson.
        4. Setiap Lesson harus memiliki:
           - Penjelasan (explanation) dalam format Markdown yang mendalam berdasarkan materi.
           - Contoh kode (codeExample) yang relevan.
           - Kode awal untuk latihan (initialCode) yang menantang.
           - Solusi kode (solution) yang benar.
           - Petunjuk (hint) yang membantu.
           - Satu pertanyaan kuis pilihan ganda (quiz) untuk menguji pemahaman.
           - Minimal satu test case untuk memvalidasi kode latihan (testCases).
        5. Gunakan Bahasa Indonesia yang profesional namun mudah dipahami.
        6. Pastikan ID unik untuk setiap level, module, dan lesson (misal: level-ai-1, module-ai-1, lesson-ai-1).
        7. Output HARUS dalam format JSON sesuai dengan struktur data yang saya berikan.
        8. JANGAN gunakan contoh soal atau materi standar jika materi yang saya berikan berbeda.`
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
      model: "gemini-3.1-pro-preview",
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
