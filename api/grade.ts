import { verifyToken } from './auth.js';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from "@google/genai";

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Concurrency Limiter: Runs tasks with a maximum concurrency factor
 */
async function runBatchWithLimit(concurrency: number, items: any[], fn: (item: any) => Promise<any>) {
  const results: any[] = [];
  const executing = new Set<Promise<any>>();
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean, clean);
    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : req.body.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    // 1. Verify JWT token
    let tokenPayload: any;
    try {
      tokenPayload = await verifyToken(token);
    } catch (e) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const graderNim = tokenPayload.nim;

    // 2. Fetch grader role from Supabase to enforce RBAC
    const { data: graderProfile, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('nim', graderNim)
      .single();

    if (roleError || !graderProfile) {
      return res.status(403).json({ error: 'Akses Ditolak: Profil Anda tidak ditemukan.' });
    }

    if (graderProfile.role !== 'admin' && graderProfile.role !== 'kordas' && graderProfile.role !== 'asisten') {
      return res.status(403).json({ error: 'Akses Ditolak: Hanya Asisten, Kordas, atau Admin yang bisa menilai.' });
    }

    const { attemptIds, requestedModel = 'gemini-3-flash-preview' } = req.body;

    if (!attemptIds || !Array.isArray(attemptIds) || attemptIds.length === 0) {
      return res.status(400).json({ error: 'Invalid payload: attemptIds array is required' });
    }

    // 3. Setup AI Client / Credentials
    const rawKeys = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    const apiKeys = rawKeys.split(",").map(k => k.trim()).filter(Boolean);
    const customAiEndpoint = process.env.VITE_CUSTOM_AI_ENDPOINT || "";

    // 4. Batch Grade Function per Attempt (Single-Call for all questions of the attempt)
    const gradeSingleAttempt = async (attemptId: string) => {
      try {
        // A. Load attempt details
        const { data: attempt, error: attemptError } = await supabase
          .from('assessment_attempts')
          .select('*')
          .eq('id', attemptId)
          .single();

        if (attemptError || !attempt) {
          return { attemptId, success: false, error: `Attempt tidak ditemukan: ${attemptError?.message}` };
        }

        if (attempt.status !== 'submitted') {
          return { attemptId, success: false, error: `Attempt status bukan 'submitted' (status saat ini: ${attempt.status})` };
        }

        // B. Load student profile name
        const { data: student } = await supabase
          .from('users')
          .select('nama')
          .eq('nim', attempt.nim)
          .single();

        const studentName = student?.nama || 'Mahasiswa';

        // C. Fetch dynamic grading rules from DB
        const { data: gradingRulesData } = await supabase
          .from('assessment_grading_rules')
          .select('rules')
          .eq('id', attempt.menu_type)
          .single();
        const dynamicRules = gradingRulesData?.rules || null;

        // D. Fetch all questions details associated with this attempt
        const questionIds = attempt.selected_questions || [];
        if (questionIds.length === 0) {
          return { attemptId, success: false, error: 'Attempt tidak memiliki soal terasosiasi.' };
        }

        const { data: questions, error: questionsError } = await supabase
          .from('assessment_questions')
          .select('*')
          .in('id', questionIds);

        if (questionsError || !questions || questions.length === 0) {
          return { attemptId, success: false, error: `Gagal memuat soal: ${questionsError?.message}` };
        }

        // E. Build Batch Prompt containing all questions and student answers
        let promptHeader = `Anda adalah Asisten Praktikum AI. Anda ditugaskan menilai pengerjaan ujian mahasiswa bernama "${studentName}" (NIM: ${attempt.nim}).
Tipe Asesmen: ${attempt.menu_type.toUpperCase()}
Evaluasi seluruh soal berikut dan berikan skor sesuai kriteria penilaian.

Berikut adalah daftar soal dan jawaban draf mahasiswa:
======================================================\n`;

        let promptBody = '';
        const questionsMap: Record<string, any> = {};

        questions.forEach((q, idx) => {
          questionsMap[q.id] = q;
          const answer = attempt.answers?.[q.id] || {};
          promptBody += `SOAL ${idx + 1} (ID Soal: ${q.id}):
- Judul Soal: ${q.title}
- Instruksi Soal: ${q.instruction}
- Tipe Soal: ${q.type}
- Kriteria Kesulitan: ${q.difficulty}
- Modul Terkait: Modul ${q.module_association || 'N/A'}
- Kode Awal / Template: 
\`\`\`
${q.initial_code || ''}
\`\`\`
- Kunci Jawaban Referensi / Solusi:
\`\`\`
${q.reference_solution || ''}
\`\`\`

JAWABAN MAHASISWA (SOAL ${idx + 1}):
- Teks Jawaban / Penjelasan: "${answer.answerText || 'KOSONG'}"
- Kode yang Dikirim:
\`\`\`
${answer.codeSubmitted || 'KOSONG'}
\`\`\`
- Hasil Output Sandbox (Stdout): "${answer.outputStandard || ''}"
- Error Sandbox (Stderr): "${answer.errors || ''}"

KRITERIA SCORING KHUSUS UNTUK SOAL INI:
`;

          // Add Rubric text based on type & difficulty (using dynamic rules if available)
          if (dynamicRules && attempt.menu_type === 'pre_test' && dynamicRules.difficulties?.[q.difficulty]) {
            const diffRules = dynamicRules.difficulties[q.difficulty];
            const criteriaStr = Object.entries(diffRules.criteria || {}).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v} poin`).join(', ');
            promptBody += `- ${q.difficulty.toUpperCase()}: ${criteriaStr}\n`;
          } else if (dynamicRules && attempt.menu_type === 'post_test' && dynamicRules.difficulties?.[q.difficulty]) {
            const diffRules = dynamicRules.difficulties[q.difficulty];
            const criteriaStr = Object.entries(diffRules.criteria || {}).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v} poin`).join(', ');
            promptBody += `- ${q.difficulty.toUpperCase()}: ${criteriaStr}\n`;
          } else if (dynamicRules && attempt.menu_type === 'program_keterampilan' && dynamicRules.criteria) {
            const criteriaStr = dynamicRules.criteria.map((c: any) => `${c.label}: ${c.nilai} poin`).join(', ');
            promptBody += `- Program Keterampilan: ${criteriaStr} (Total ${dynamicRules.total_max_score || 85}).\n`;
          } else if (dynamicRules && attempt.menu_type === 'ujian_praktik') {
            if (q.type === 'flowchart_translation' && dynamicRules.soal_6_flowchart) {
              const criteriaStr = Object.entries(dynamicRules.soal_6_flowchart.criteria || {}).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v} poin`).join(', ');
              promptBody += `- Flowchart to Program: ${criteriaStr}.\n`;
            } else if (dynamicRules.soal_1_5) {
              const criteriaStr = Object.entries(dynamicRules.soal_1_5.criteria || {}).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v} poin`).join(', ');
              promptBody += `- Ujian Praktik Soal 1-5: ${criteriaStr}.\n`;
            }
          } else if (attempt.menu_type === 'pre_test') {
            if (q.difficulty === 'easy') {
              promptBody += `- Pilihan Ganda / Jawaban Singkat Easy: Jawaban Benar = 20 poin, Jawaban Salah = 8 poin, Kosong = 0 poin.\n`;
            } else if (q.difficulty === 'medium') {
              promptBody += `- Jawaban Singkat + Penjelasan Medium: Jawaban Benar Singkat = 10 poin, Jawaban Benar + Penjelasan Tepat = 15 poin, Jawaban Salah + Penjelasan Logis = 7 poin, Jawaban Salah = 3 poin, Kosong = 0 poin.\n`;
            } else if (q.difficulty === 'hard') {
              promptBody += `- Jawaban Singkat + Penjelasan Hard: Jawaban Benar Singkat = 15 poin, Jawaban Benar + Penjelasan Tepat = 25 poin, Jawaban Salah + Penjelasan Logis = 10 poin, Jawaban Salah = 5 poin, Kosong = 0 poin.\n`;
            }
          } else if (attempt.menu_type === 'post_test') {
            if (q.difficulty === 'easy') {
              promptBody += `- Easy: Jawaban Benar = 20 poin, Jawaban Salah = 8 poin, Kosong = 0 poin.\n`;
            } else if (q.difficulty === 'medium') {
              promptBody += `- Medium: Jawaban Benar Singkat = 20 poin, Jawaban Benar + Penjelasan = 35 poin, Jawaban Salah + Penjelasan Logis = 15 poin, Jawaban Salah = 10 poin, Kosong = 0 poin.\n`;
            } else if (q.difficulty === 'hard') {
              promptBody += `- Hard Coding: Dapat Berjalan Tanpa Error = 7 poin, Sesuai Petunjuk = 25 poin, Selesai/Kriteria output terpenuhi = 13 poin, Belum Selesai = 3 poin.\n`;
            }
          } else if (attempt.menu_type === 'program_keterampilan') {
            promptBody += `- Program Keterampilan: Dapat Berjalan Tanpa Error = 30 poin (jika berjalan sebagian = 15), Sesuai Petunjuk/Instruksi Sintaks = 35 poin, Selesai/Tepat Waktu = 20 poin, Belum Selesai = 10 poin (Total 85).\n`;
          } else if (attempt.menu_type === 'ujian_praktik') {
            if (q.type === 'flowchart_translation') {
              promptBody += `- Flowchart to Program: Dapat Berjalan Tanpa Error = 7 poin, Kesesuaian Alur & Logika Flowchart = 25 poin, Selesai/Tepat Waktu = 13 poin, Belum Selesai = 3 poin.\n`;
            } else {
              promptBody += `- Ujian Praktik Soal 1-5 (Hard Coding): Dapat Berjalan Tanpa Error = 7 poin, Sesuai Petunjuk = 25 poin, Selesai/Tepat Waktu = 13 poin, Belum Selesai = 3 poin.\n`;
            }
          }

          promptBody += `======================================================\n\n`;
        });

        let promptFooter = `TUGAS ANDA:
1. Evaluasi masing-masing jawaban soal di atas berdasarkan kriteria rubrik yang diberikan.
2. Berikan analisis logis, poin positif, saran perbaikan, dan feedback ringkas dalam bahasa Indonesia.
3. Kembalikan respons Anda hanya dalam bentuk format JSON terstruktur yang valid, tanpa teks penjelasan tambahan di luar JSON.

Format respons JSON yang harus Anda hasilkan:
{
  "grades": {
    "[soalId_1]": {
      "scores": {
        "correctness_or_compilation": 0, // Nilai berdasarkan rubrik
        "explanation_or_instruction": 0,
        "completion_or_timing": 0
      },
      "total_score": 0, // Jumlah dari sub-scores
      "feedback": "Komentar spesifik soal ini..."
    },
    "[soalId_2]": {
      ...
    }
  },
  "total_overall_score": 0, // Total nilai dari seluruh soal asesmen
  "overall_feedback": "Komentar umum pengerjaan asesmen mahasiswa ini..."
}`;

        const fullPrompt = promptHeader + promptBody + promptFooter;

        // F. Call AI (Gemini or Custom Model)
        let aiResponseText = "";

        if (requestedModel === 'gpt-os-120b' && customAiEndpoint) {
          // Send request to Ollama via custom host (local tunnel or cloud endpoint)
          console.log(`Calling Ollama API: ${customAiEndpoint} for attempt ${attemptId}`);
          
          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
          if (process.env.OLLAMA_API_KEY) {
            headers['Authorization'] = `Bearer ${process.env.OLLAMA_API_KEY}`;
          }

          const ollamaModel = process.env.OLLAMA_MODEL || 'gpt-oss:120b-cloud';

          const response = await fetch(`${customAiEndpoint}/api/chat`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model: ollamaModel,
              messages: [{ role: 'user', content: fullPrompt }],
              stream: false,
              format: 'json'
            })
          });

          if (!response.ok) {
            throw new Error(`Ollama API returned status: ${response.status}`);
          }
          const resJson = await response.json();
          aiResponseText = resJson.message?.content || resJson.response || JSON.stringify(resJson);
        } else {
          // Gemini API with key rotation
          if (apiKeys.length === 0) {
            throw new Error("API Keys Gemini tidak dikonfigurasi di server.");
          }

          let lastError: any = null;
          const maxAttempts = Math.min(apiKeys.length, 3);
          const shuffledKeys = [...apiKeys].sort(() => Math.random() - 0.5);

          for (let attemptIdx = 0; attemptIdx < maxAttempts; attemptIdx++) {
            const currentApiKey = shuffledKeys[attemptIdx];
            try {
              const client = new GoogleGenAI({ apiKey: currentApiKey });
              const modelName = requestedModel === 'gemini-2.5-flash' ? 'gemini-2.5-flash' : 'gemini-2.0-flash-exp'; // fallbacks

              const result = await client.models.generateContent({
                model: modelName,
                contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
                config: {
                  responseMimeType: "application/json"
                }
              });

              aiResponseText = result.text || "";
              break;
            } catch (err: any) {
              lastError = err;
              console.error(`Gemini key rotation attempt ${attemptIdx + 1} failed:`, err.message);
              continue;
            }
          }

          if (!aiResponseText && lastError) {
            throw lastError;
          }
        }

        // G. Parse JSON result and write to DB
        const cleanJsonText = aiResponseText.trim().replace(/^```json/, '').replace(/```$/, '').trim();
        const gradingResult = JSON.parse(cleanJsonText);

        const aiGradesMap = gradingResult.grades || {};
        const finalScore = gradingResult.total_overall_score || 0;

        const { error: updateError } = await supabase
          .from('assessment_attempts')
          .update({
            ai_grades: aiGradesMap,
            final_score: finalScore,
            status: 'graded',
            graded_at: new Date().toISOString()
          })
          .eq('id', attemptId);

        if (updateError) {
          throw updateError;
        }

        return { attemptId, success: true, finalScore, studentName };
      } catch (err: any) {
        console.error(`Gagal menilai attempt ${attemptId}:`, err);
        return { attemptId, success: false, error: err.message || 'Error internal penilaian AI' };
      }
    };

    // 5. Run the grading tasks with a concurrency limit of 3
    const results = await runBatchWithLimit(3, attemptIds, gradeSingleAttempt);

    return res.status(200).json({
      success: true,
      gradedCount: results.filter(r => r.success).length,
      results
    });

  } catch (error: any) {
    console.error('Server error in API Grade:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
