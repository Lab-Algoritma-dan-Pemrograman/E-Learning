import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

// Load env variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const jwtSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const newInstruction = `### 🖥️ Tugas: Biodata Diri Praktikan (Bahasa C)

Tulis program C yang meminta input biodata diri praktikan dan menampilkannya kembali dalam format yang rapi.

#### 📋 Petunjuk Pengerjaan & Rubrik Nilai:
1. **Header File**: Mulailah program dengan menyertakan header file yang dibutuhkan untuk operasi input-output (\`<stdio.h>\`). *(2 poin)*
2. **Fungsi Utama**: Buatlah fungsi utama \`int main()\`. *(4 poin)*
3. **Deklarasi Variabel**: Deklarasikan variabel-variabel yang dibutuhkan untuk menyimpan data berikut: *(8 poin)*
   * Nama Lengkap (gunakan array of char / string).
   * NIM (gunakan tipe data \`int\`).
   * Kelas Praktikum (gunakan masukan satu \`char\`).
   * Nilai Test Awal (gunakan tipe data \`float\`).
4. **Judul Program**: Gunakan fungsi \`printf()\` untuk menampilkan judul program (\`=== Biodata Diri ===\`). *(4 poin)*
5. **Input Nama Lengkap**: Gunakan \`printf()\` untuk meminta pengguna memasukkan Nama Lengkap, lalu gunakan \`scanf()\` untuk menyimpan input ke dalam variabel nama. *(6 poin)*
   * *Petunjuk*: Gunakan format specifier \`%[^\\n]\` agar dapat membaca karakter spasi.
6. **Input Data Lainnya**: Lakukan hal yang sama untuk input NIM, Kelas, dan Nilai Test Awal. Pastikan menggunakan format specifier yang sesuai. *(6 poin)*
   * *Tips*: Beri spasi sebelum \`%c\` pada \`scanf\` (seperti \`" %c"\`) untuk menghindari bug pembacaan karakter newline sisa dari input sebelumnya.
7. **Tampilkan Hasil**: Setelah semua data diterima, tampilkan kembali semua data yang telah diinput dalam format yang rapi menggunakan \`printf()\`. Beri label jelas pada setiap data yang ditampilkan. *(2 poin)*
8. **Akhir Program**: Akhiri program dengan \`return 0;\`. *(1 poin)*

---CONTOH_OUTPUT---
Masukkan Nama Lengkap: Muhammad Fulan
Masukkan NIM: 202515009
Masukkan Kelas Praktikum: B
Masukkan Nilai Test Awal: 85.5

=== Biodata Diri ===
Nama Lengkap    : Muhammad Fulan
NIM             : 202515009
Kelas           : B
Nilai Test Awal : 85.50`;

async function fixQuestion() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    if (jwtSecret) {
      console.log('Generating admin JWT token...');
      try {
        const key = new TextEncoder().encode(jwtSecret.trim());
        const token = await new SignJWT({
          nim: '202211083', // kordas/admin NIM
          nama: 'SYSTEM MIGRATION',
          kelas: 'SYSTEM',
          role: 'authenticated',
          user_role: 'admin',
          email: 'admin@e-learning.internal'
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(key);
        
        (supabase as any).rest.headers['Authorization'] = `Bearer ${token}`;
        console.log('Admin JWT successfully injected.');
      } catch (err: any) {
        console.warn('Failed to generate admin JWT:', err.message);
      }
    }

    const { data, error } = await supabase
      .from('assessment_questions')
      .update({ instruction: newInstruction })
      .eq('id', '38d320d8-0c2d-43f8-be84-cec3c0dfe1c7')
      .select();

    if (error) {
      console.error("Error updating question:", error.message);
      return;
    }

    console.log("Successfully updated question!");
    console.log("Updated data count:", data ? data.length : 0);
    if (data && data.length > 0) {
      console.log("Updated title:", data[0].title);
    }
  } catch (err: any) {
    console.error("Exception:", err.message);
  }
}

fixQuestion();
