import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const pre_test = {
  "duration_minutes": 15,
  "total_max_score": 100,
  "difficulties": {
    "easy": {
      "max_score": 20,
      "question_count": 1,
      "total_points": 20,
      "criteria": {
        "jawaban_benar": 20,
        "jawaban_salah": 8,
        "jawaban_kosong": 0
      }
    },
    "medium": {
      "max_score": 15,
      "question_count": 2,
      "total_points": 30,
      "criteria": {
        "jawaban_benar_singkat": 10,
        "jawaban_benar_penjelasan": 15,
        "jawaban_salah_penjelasan_logis": 7,
        "jawaban_salah": 3,
        "jawaban_kosong": 0
      }
    },
    "hard": {
      "max_score": 25,
      "question_count": 2,
      "total_points": 50,
      "criteria": {
        "jawaban_benar_singkat": 15,
        "jawaban_benar_penjelasan": 25,
        "jawaban_salah_penjelasan_logis": 10,
        "jawaban_salah": 5,
        "jawaban_kosong": 0
      }
    }
  }
};

const post_test = {
  "duration_minutes": 15,
  "total_max_score": 100,
  "difficulties": {
    "easy": {
      "max_score": 20,
      "question_count": 1,
      "total_points": 20,
      "criteria": {
        "jawaban_benar": 20,
        "jawaban_salah": 8,
        "jawaban_kosong": 0
      }
    },
    "medium": {
      "max_score": 35,
      "question_count": 1,
      "total_points": 35,
      "criteria": {
        "jawaban_benar_singkat": 20,
        "jawaban_benar_penjelasan": 35,
        "jawaban_salah_penjelasan_logis": 15,
        "jawaban_salah": 5,
        "jawaban_kosong": 0
      }
    },
    "hard": {
      "max_score": 45,
      "question_count": 1,
      "total_points": 45,
      "criteria": {
        "jawaban_benar_singkat": 25,
        "jawaban_benar_penjelasan": 45,
        "jawaban_salah_penjelasan_logis": 18,
        "jawaban_salah": 8,
        "jawaban_kosong": 0
      }
    }
  }
};

const program_keterampilan = {
  "duration_minutes": 90,
  "total_max_score": 85,
  "criteria": [
    { "no": 1, "label": "Kesesuaian sintaks", "nilai": 5 },
    { "no": 1, "label": "Berjalan Sebagian", "nilai": 15 },
    { "no": 1, "label": "Berjalan Sempurna", "nilai": 10 },
    { "no": 1, "label": "Dapat berjalan tanpa error", "nilai": 30 },
    { "no": 2, "label": "Sesuai dengan petunjuk", "nilai": 35 },
    { "no": 3, "label": "Tepat Waktu/selesai", "nilai": 20 },
    { "no": 4, "label": "Belum Selesai", "nilai": 10 }
  ]
};

const ujian_praktik = {
  "duration_minutes": 120,
  "total_max_score": 100,
  "requires_token": true,
  "soal_1": {
    "max_score": 15,
    "criteria": {
      "kesesuaian_sintaks": 2,
      "dapat_berjalan_tanpa_error": 5,
      "sesuai_petunjuk": 5,
      "tepat_waktu": 3
    }
  },
  "soal_2": {
    "max_score": 15,
    "criteria": {
      "kesesuaian_sintaks": 2,
      "dapat_berjalan_tanpa_error": 5,
      "sesuai_petunjuk": 5,
      "tepat_waktu": 3
    }
  },
  "soal_3": {
    "max_score": 15,
    "criteria": {
      "kesesuaian_sintaks": 2,
      "dapat_berjalan_tanpa_error": 5,
      "sesuai_petunjuk": 5,
      "tepat_waktu": 3
    }
  },
  "soal_4": {
    "max_score": 15,
    "criteria": {
      "kesesuaian_sintaks": 2,
      "dapat_berjalan_tanpa_error": 5,
      "sesuai_petunjuk": 5,
      "tepat_waktu": 3
    }
  },
  "soal_5": {
    "max_score": 15,
    "criteria": {
      "kesesuaian_sintaks": 2,
      "dapat_berjalan_tanpa_error": 5,
      "sesuai_petunjuk": 5,
      "tepat_waktu": 3
    }
  },
  "soal_6": {
    "max_score": 25,
    "criteria": {
      "kesesuaian_sintaks": 5,
      "dapat_berjalan_tanpa_error": 8,
      "sesuai_petunjuk": 7,
      "tepat_waktu": 5
    }
  }
};

async function seed() {
  try {
    let headers: Record<string, string> = {};
    const jwtSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || '';
    if (jwtSecret) {
      try {
        // Try UTF-8 encoding first, as standard plain-text secret
        const key = new TextEncoder().encode(jwtSecret);
        const token = await new SignJWT({
          aud: 'authenticated',
          role: 'authenticated',
          nim: '202211083',
          nama: 'SYSTEM SEED',
          kelas: 'SYSTEM',
          user_role: 'admin',
          email: 'admin@e-learning.internal'
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(key);
        
        headers['Authorization'] = `Bearer ${token}`;
        console.log('✅ Admin JWT successfully generated with UTF-8 secret.');
      } catch (err: any) {
        console.warn('⚠️ Failed to generate admin JWT with UTF-8 secret:', err.message);
      }
    }

    // Initialize Supabase Client with global headers
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers }
    });

    const rows = [
      { id: 'pre_test', rules: pre_test },
      { id: 'post_test', rules: post_test },
      { id: 'program_keterampilan', rules: program_keterampilan },
      { id: 'ujian_praktik', rules: ujian_praktik }
    ];

    for (const row of rows) {
      const { error } = await supabase.from('assessment_grading_rules').upsert(row, { onConflict: 'id' });
      if (error) {
        // If it fails, let's try with base64 key decoding just in case
        console.log(`⚠️ UTF-8 JWT upsert failed for ${row.id}: ${error.message}. Trying base64 key...`);
        
        if (jwtSecret) {
          try {
            const keyBase64 = Buffer.from(jwtSecret, 'base64');
            const tokenBase64 = await new SignJWT({
              aud: 'authenticated',
              role: 'authenticated',
              nim: '202211083',
              nama: 'SYSTEM SEED',
              kelas: 'SYSTEM',
              user_role: 'admin',
              email: 'admin@e-learning.internal'
            })
              .setProtectedHeader({ alg: 'HS256' })
              .setIssuedAt()
              .setExpirationTime('1h')
              .sign(keyBase64);
            
            const supabaseBase64 = createClient(supabaseUrl, supabaseAnonKey, {
              global: {
                headers: {
                  'Authorization': `Bearer ${tokenBase64}`
                }
              }
            });
            const { error: errorBase64 } = await supabaseBase64.from('assessment_grading_rules').upsert(row, { onConflict: 'id' });
            if (errorBase64) {
              console.error(`❌ Both UTF-8 and base64 key failed for ${row.id}:`, errorBase64.message);
            } else {
              console.log(`✅ Seeded rules for ${row.id} using base64 key`);
            }
          } catch (e: any) {
            console.error(`❌ Exception during base64 fallback for ${row.id}:`, e.message);
          }
        }
      } else {
        console.log(`✅ Seeded rules for ${row.id} using UTF-8 key`);
      }
    }
  } catch (err: any) {
    console.error("❌ Exception during seeding:", err.message);
  }
}

seed();
