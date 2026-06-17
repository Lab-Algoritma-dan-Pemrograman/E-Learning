import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { SignJWT, jwtVerify } from 'jose';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase URL or Key is missing in .env!');
  process.exit(1);
}

const achievements = [
  {
    id: 'salam-kenal-dunia',
    title: '"Salam Kenal, Dunia!" 👋',
    description: 'Selesaikan pelajaran pertama',
    icon: 'Trophy',
    requirement_type: 'xp',
    requirement_value: 60
  },
  {
    id: 'arsitek-kode-pemula',
    title: '"Arsitek Kode Pemula!" 🧱',
    description: 'Selesaikan Subbab Struktur Penulisan',
    icon: 'Layout',
    requirement_type: 'xp',
    requirement_value: 240
  },
  {
    id: 'sang-pawang-data',
    title: '"Sang Pawang Data!" 🗂️',
    description: 'Selesaikan Subbab Tipe Data',
    icon: 'Database',
    requirement_type: 'xp',
    requirement_value: 600
  },
  {
    id: 'penakluk-level-1',
    title: '"Penakluk Level 1!" 🚀',
    description: 'Selesaikan semua 34 pelajaran Level 1',
    icon: 'Rocket',
    requirement_type: 'xp',
    requirement_value: 2040
  },
  {
    id: 'pemegang-kendali',
    title: '"Pemegang Kendali!" 🎮',
    description: 'Selesaikan pelajaran pertama Level 2',
    icon: 'Sliders',
    requirement_type: 'xp',
    requirement_value: 2100
  },
  {
    id: 'makin-jago-aja-nih',
    title: '"Makin Jago Aja Nih!" ✨',
    description: 'Selesaikan semua 10 pelajaran Level 2',
    icon: 'Sparkles',
    requirement_type: 'xp',
    requirement_value: 2640
  },
  {
    id: 'master-c-sejati',
    title: '"Master C Sejati!" 👑',
    description: 'Selesaikan Level 1, 2, 3',
    icon: 'Crown',
    requirement_type: 'xp',
    requirement_value: 3840
  },
  {
    id: 'halo-ular-baik-hati',
    title: '"Halo, Ular Baik Hati!" 🐍',
    description: 'Selesaikan pelajaran pertama Level 4',
    icon: 'Code',
    requirement_type: 'xp',
    requirement_value: 3900
  },
  {
    id: 'petualang-python',
    title: '"Petualang Python!" 🏕️',
    description: 'Selesaikan semua 16 pelajaran Level 4',
    icon: 'Compass',
    requirement_type: 'xp',
    requirement_value: 4800
  },
  {
    id: 'penyihir-python-berbakat',
    title: '"Penyihir Python Berbakat!" 🧙‍♂️',
    description: 'Selesaikan Level 4, 5, 6',
    icon: 'Wand2',
    requirement_type: 'xp',
    requirement_value: 5160
  },
  {
    id: 'legenda-koding-sang-juara',
    title: '"Legenda Koding Sang Juara!" 🏆',
    description: 'Selesaikan 86 pelajaran',
    icon: 'Award',
    requirement_type: 'xp',
    requirement_value: 5160
  }
];

async function detectSupabaseSecretBytes(secretStr: string, anonKey: string): Promise<Uint8Array | null> {
  const clean = secretStr.trim();
  try {
    const rawBytes = new TextEncoder().encode(clean);
    await jwtVerify(anonKey, rawBytes);
    return rawBytes;
  } catch {}

  try {
    const b64Bytes = Buffer.from(clean, 'base64');
    await jwtVerify(anonKey, b64Bytes);
    return b64Bytes;
  } catch {}

  return null;
}

async function seed() {
  let customAuthToken: string | null = null;
  const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (hasServiceRole) {
    console.log('🔑 SUPABASE_SERVICE_ROLE_KEY detected. Using it directly for seeding.');
  } else {
    // Generate custom token if service key not configured
    const jwtSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || '';
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
    
    if (jwtSecret && anonKey) {
      console.log('🔑 Detecting correct JWT secret encoding to generate admin token...');
      try {
        const keyBytes = await detectSupabaseSecretBytes(jwtSecret, anonKey);
        if (keyBytes) {
          const token = await new SignJWT({
            nim: '202211083',
            nama: 'SYSTEM MIGRATION',
            kelas: 'SYSTEM',
            role: 'authenticated',
            user_role: 'admin',
            email: 'admin@e-learning.internal'
          })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(keyBytes);
          
          customAuthToken = token;
          console.log('✅ admin JWT successfully generated.');
        }
      } catch (err: any) {
        console.warn('⚠️ Failed to generate admin JWT:', err.message);
      }
    }
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    global: {
      fetch: (url, init) => {
        const headers = new Headers(init?.headers);
        if (customAuthToken) {
          headers.set('Authorization', `Bearer ${customAuthToken}`);
        }
        return fetch(url, { ...init, headers });
      }
    }
  });

  console.log('⏳ Seeding achievements into Supabase...');

  // 1. Delete all existing achievements (which will cascade-delete unlocked_achievements if configured, or we delete them first)
  console.log('🧹 Clearing old achievements data...');
  
  const { error: deleteUnlockErr } = await supabase
    .from('unlocked_achievements')
    .delete()
    .neq('nim', 'dummy_value_to_delete_all');
  if (deleteUnlockErr) {
    console.warn('⚠️ Warning clearing unlocked_achievements:', deleteUnlockErr.message);
  }

  const { error: deleteAchErr } = await supabase
    .from('achievements')
    .delete()
    .neq('id', 'dummy_value_to_delete_all');
  if (deleteAchErr) {
    console.error('❌ Failed to clear achievements table:', deleteAchErr);
    process.exit(1);
  }

  // 2. Insert new achievements
  console.log('📥 Inserting new achievements list...');
  const { data, error } = await supabase
    .from('achievements')
    .insert(achievements)
    .select();

  if (error) {
    console.error('❌ Failed to insert achievements:', error);
    process.exit(1);
  }

  console.log(`✅ Success! Seeded ${data.length} achievements.`);
}

seed();
