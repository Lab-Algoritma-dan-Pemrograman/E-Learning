# Product Requirement Document (PRD)
## Fitur Asesmen (Pre-Test, Post-Test, Program Keterampilan, Ujian Praktik), Monitoring Aktivitas, & Migrasi Supabase

| Dokumen | Product Requirement Document (PRD) |
|---|---|
| **Fitur** | Menu Asesmen, Monitoring Dashboard, & Arsitektur Supabase |
| **Status** | Draft (Planning Mode - Updated) |
| **Target Pengguna** | Mahasiswa (Student), Asisten Laboratorium (Assistant), Koordinator Asisten (Kordas), Admin |
| **Model Evaluasi** | AI-Powered Grading (Gemini 3.5 Flash / 3-flash-preview) - Triggered by Assistant |

---

## 1. Latar Belakang & Tujuan
Untuk mengukur dan mengevaluasi pemahaman mahasiswa secara berkala dan objektif, sistem E-Learning memerlukan fitur asesmen terstruktur yang terpisah dari alur belajar mandiri biasa. Terdapat empat jenis asesmen baru yang dirancang dengan karakteristik jumlah soal, tingkat kesulitan, dan kriteria penilaian yang spesifik.

Penilaian seluruh asesmen ini akan diotomatisasi menggunakan kecerdasan buatan (AI) untuk menganalisis kebenaran logika, kualitas penjelasan, serta fungsionalitas kode program. 

**Perubahan Utama Alur Penilaian (AI Grading)**: 
Untuk menghemat kuota API Gemini dan memberikan kendali penuh ke staf pengajar, **mahasiswa tidak memicu penilaian AI secara langsung**. Mahasiswa hanya melakukan submit hasil pengerjaan (status berubah menjadi `submitted`). Proses penilaian AI dipicu secara manual oleh **Asisten, Kordas, atau Admin** melalui dashboard, baik satu per satu (single grading) maupun secara serentak (bulk grading).

**Migrasi Database**: 
Untuk meningkatkan performa query relasional dan kemudahan integrasi, sistem berpindah sepenuhnya dari **Firebase Firestore** ke **Supabase PostgreSQL**.

---

## 2. Matriks Peran & Hak Akses (Role-Based Access Control)
Sistem memiliki 4 peran pengguna dengan kewenangan sebagai berikut:

| Hak Akses / Fitur | Student (`user`) | Assistant (`asisten`) | Kordas (`kordas`) | Admin (`admin`) |
|---|:---:|:---:|:---:|:---:|
| Mengerjakan Asesmen yang Terbuka | ✅ | ❌ | ❌ | ❌ |
| Memasukkan Token Ujian Praktik | ✅ | ❌ | ❌ | ❌ |
| Melihat Nilai & Riwayat Sendiri | ✅ | ❌ | ❌ | ❌ |
| Memonitor Aktivitas Mahasiswa Real-Time | ❌ | ✅ | ✅ | ✅ |
| Memicu Penilaian AI Mahasiswa (Single / Bulk Choice) | ❌ | ✅ | ✅ | ✅ |
| Melihat Log Aktivitas Pengguna | ❌ | ✅ | ✅ | ✅ |
| Membuka/Mengunci Menu Asesmen Mahasiswa | ❌ | ✅ | ✅ | ✅ |
| Mengelola Bank Soal Asesmen (CRUD) | ❌ | ❌ | ✅ | ✅ |
| Membuat & Mengelola Token Ujian Praktik | ❌ | ❌ | ✅ | ✅ |
| Konfigurasi Aturan Global / Model AI | ❌ | ❌ | ❌ | ✅ |

---

## 3. Spesifikasi 4 Menu Asesmen
Setiap menu asesmen memiliki struktur, distribusi soal, dan sistem penilaian yang khas.

### A. Pre-Test
* **Tujuan**: Mengukur pemahaman awal mahasiswa sebelum memasuki materi utama.
* **Jumlah Soal**: 5 Soal (1 Easy, 2 Medium, 2 Hard).
* **Alur Pemilihan Soal**: Soal diambil secara acak (randomized) dari bank soal khusus Pre-Test sesuai dengan kriteria kesulitan yang ditentukan.
* **Format Soal & Rubrik Penilaian**:
  1. **Easy (1 Soal - Pilihan Ganda / Jawaban Singkat)**:
     - *Jawaban Benar*: +20 Poin
     - *Jawaban Salah*: +8 Poin
     - *Jawaban Kosong/Tidak Diisi*: 0 Poin
  2. **Medium (2 Soal - Jawaban Singkat + Penjelasan Logika)**:
     - *Jawaban Benar Singkat (Tanpa Penjelasan)*: +10 Poin per soal
     - *Jawaban Benar + Penjelasan Tepat*: +15 Poin per soal
     - *Jawaban Salah + Penjelasan Logis*: +7 Poin per soal
     - *Jawaban Salah*: +3 Poin per soal
     - *Jawaban Kosong*: 0 Poin
  3. **Hard (2 Soal - Analisis Logika + Coding Sederhana / Penjelasan Mendalam)**:
     - *Jawaban Benar Singkat*: +15 Poin per soal
     - *Jawaban Benar + Penjelasan*: +25 Poin per soal
     - *Jawaban Salah + Penjelasan Logis*: +10 Poin per soal
     - *Jawaban Salah*: +5 Poin per soal
     - *Jawaban Kosong*: 0 Poin
* **Total Maksimal Poin**: 20 + (2 * 15) + (2 * 25) = **100 Poin**.

---

### B. Post-Test
* **Tujuan**: Mengukur tingkat penguasaan materi setelah menyelesaikan level tertentu.
* **Jumlah Soal**: 3 Soal (1 Easy, 1 Medium, 1 Hard Coding).
* **Alur Pemilihan Soal**: Diambil acak dari bank soal khusus Post-Test sesuai dengan materi level yang bersangkutan.
* **Format Soal & Rubrik Penilaian**:
  1. **Easy (1 Soal - Pemahaman Teori/Sintaks Dasar)**:
     - *Jawaban Benar*: +20 Poin
     - *Jawaban Salah*: +8 Poin
     - *Jawaban Kosong*: 0 Poin
  2. **Medium (1 Soal - Analisis Kode / Penulisan Logika)**:
     - *Jawaban Benar Singkat*: +20 Poin
     - *Jawaban Benar + Penjelasan*: +35 Poin
     - *Jawaban Salah + Penjelasan Logis*: +15 Poin
     - *Jawaban Salah*: +10 Poin
     - *Jawaban Kosong*: 0 Poin
  3. **Hard Coding (1 Soal - Pembuatan Program Wajib Coding)**:
     - Kode ditulis langsung pada editor terintegrasi (Wandbox / Pyodide).
     - *Dapat Berjalan Tanpa Error (Compiles & Runs)*: +7 Poin
     - *Sesuai dengan Petunjuk / Instruksi Soal*: +25 Poin
     - *Tepat Waktu / Selesai (Memenuhi Kriteria Output)*: +13 Poin
     - *Belum Selesai*: +3 Poin
* **Total Maksimal Poin**: 20 + 35 + 45 = **100 Poin**.

---

### C. Program Keterampilan
* **Tujuan**: Menguji kemampuan mahasiwa dalam membangun sebuah program terstruktur berukuran menengah berdasarkan studi kasus atau petunjuk teknis.
* **Jumlah Soal**: 1 Soal Studi Kasus Coding.
* **Format Soal & Rubrik Penilaian (Total 85 Poin)**:
  1. **Dapat Berjalan Tanpa Error**: Maksimal 30 Poin.
     - *Berjalan Sempurna (Lolos semua test case)*: 30 Poin.
     - *Berjalan Sebagian (Beberapa test case gagal / error logika minor)*: 15 Poin.
  2. **Kesesuaian Sintaks & Petunjuk**: Maksimal 35 Poin.
     - Mengevaluasi apakah penulisan sintaks program sesuai dengan best practices instruksi.
  3. **Waktu Pengerjaan & Penyelesaian**:
     - *Selesai Penuh / Tepat Waktu*: +20 Poin.
     - *Belum Selesai (Kriteria fungsional dasar belum terpenuhi)*: +10 Poin.

---

### D. Ujian Praktik
* **Tujuan**: Evaluasi komprehensif akhir praktikum.
* **Akses Keamanan**: Wajib memasukkan token/kode akses (6-digit alphanumeric) yang diberikan oleh Admin/Kordas untuk memulai tes.
* **Jumlah Soal**: 6 Soal, dengan pemetaan materi wajib:
  - **Soal 1**: Modul 1
  - **Soal 2**: Modul 2
  - **Soal 3**: Modul 3
  - **Soal 4**: Modul 4 & 5
  - **Soal 5**: Modul 6
  - **Soal 6**: Menerjemahkan Flowchart ke Program C/Python (FC to Program).
* **Rubrik Penilaian**:
  1. **Soal 1 s.d. Soal 5 (Maksimal 45 Poin per Soal)**:
     - *Dapat Berjalan Tanpa Error*: +7 Poin
     - *Sesuai dengan Petunjuk*: +25 Poin
     - *Tepat Waktu / Selesai*: +13 Poin
     - *Belum Selesai*: +3 Poin
  2. **Soal 6 (Flowchart to Program - Maksimal 45 Poin)**:
     - *Dapat Berjalan Tanpa Error*: +7 Poin
     - *Kesesuaian Alur & Logika Flowchart*: +25 Poin
     - *Tepat Waktu / Selesai*: +13 Poin
     - *Belum Selesai*: +3 Poin
* **Total Maksimal Poin**: (5 * 45) + 45 = **270 Poin**.

---

## 4. Sistem Manajemen Aturan & Bank Soal (CRUD)
Disediakan dashboard bagi **Admin/Kordas** di Supabase untuk mengelola aturan asesmen dan konten soal:
1. **Aturan Asesmen**:
   - Menghidupkan/mematikan asesmen tertentu.
   - Durasi waktu pengerjaan masing-masing menu.
   - Skema bobot nilai.
2. **Manajemen Soal**:
   - CRUD soal yang dikelompokkan berdasarkan menu asesmen (`pre_test`, `post_test`, `skill_program`, `ujian_praktik`).
   - Penentuan tipe soal (`essay`, `short_answer`, `coding`, `flowchart_translation`).
   - Kolom isian soal lengkap: Pertanyaan, Tingkat Kesulitan, Modul Asosiasi, Kode Awal, Kode Solusi Referensi, Input/Output Test Cases, dan Parameter Kriteria AI.

---

## 5. Sistem Evaluasi & Penilaian Berbasis AI (AI Grading Engine)
Penilaian jawaban dilakukan dengan alur terkontrol (triggered by assistant):

```mermaid
sequenceDiagram
    actor M as Mahasiswa
    actor A as Asisten / Kordas
    participant C as Client App
    participant S as Supabase DB
    participant AI as AI Grading Service (Gemini)

    M->>C: Klik "Submit Asesmen"
    C->>S: Simpan Jawaban (status = 'submitted')
    A->>C: Masuk Dashboard, Pilih Mahasiswa (Single/Bulk)
    A->>C: Klik "Mulai Penilaian AI"
    C->>AI: Kirim Jawaban, Kode, & Kunci ke AI (Concurrently)
    AI-->>C: Response Hasil Evaluasi JSON & Skor
    C->>S: Simpan Hasil Penilaian & Update status = 'graded'
```

### Prompt AI & Skema Output JSON
AI (Gemini) bertindak sebagai evaluator yang objektif. Prompts yang dikirim ke AI wajib melampirkan parameter rubrik detail yang diisi oleh dosen/kordas. AI akan mengembalikan data terstruktur dalam format JSON agar dapat diparsing langsung oleh backend/client untuk masuk ke database.

**Contoh Skema Respons JSON dari AI**:
```json
{
  "scores": {
    "syntax_ok": 7,
    "instruction_adherence": 25,
    "completion": 13
  },
  "total_score": 45,
  "feedback": "Kode program berjalan dengan baik tanpa error. Seluruh instruksi variabel dan kontrol alur terpenuhi sesuai petunjuk.",
  "analysis": {
    "logic_errors": [],
    "good_points": ["Menggunakan pointer secara tepat"],
    "suggestions": []
  }
}
```

---

## 6. Dashboard Monitoring & Log Aktivitas (Real-Time)
Halaman khusus bagi Admin, Kordas, dan Asisten untuk mengawasi jalannya asesmen secara real-time.

### A. Monitoring Aktivitas Real-Time
1. **Siapa yang sedang Login (Active Users)**:
   - Menampilkan daftar nama mahasiswa yang saat ini online (berdasarkan tracking status detak jantung/heartbeat login).
2. **Siapa yang sedang Mengerjakan**:
   - Detail pengerjaan: NIM, Nama, Kelas, Menu Asesmen yang sedang dikerjakan, Waktu Mulai, Sisa Waktu, dan status kemajuan pengerjaan (misal: Soal 3/6).
3. **Belum Mengumpulkan (Unsubmitted Tracker)**:
   - Daftar mahasiswa yang memiliki sesi aktif namun waktu pengerjaan hampir habis atau belum menekan tombol Submit.
   - Pilihan bagi Kordas/Admin untuk memaksa pengumpulan (Force Submit) jika durasi ujian telah habis.
4. **Penilaian Serentak (Bulk AI Grading)**:
   - Asisten dapat menandai beberapa baris mahasiswa dengan status `submitted`.
   - Mengklik tombol "Penilaian Massal (AI)" untuk menilai seluruh baris yang dipilih secara paralel dan otomatis.

### B. Audit Log Activity
Menyimpan dan menampilkan histori tindakan penting dalam sistem:
- `[Login/Logout] NIM - Nama berhasil masuk/keluar sistem.`
- `[Start Test] NIM - Nama memulai pengerjaan Pre-Test.`
- `[Submit Test] NIM - Nama mengumpulkan pengerjaan Post-Test.`
- `[AI Grading Complete] Asisten menilai pengerjaan NIM - Nama via AI. Nilai akhir: 85.`
- `[Token Generated] Kordas/Admin menghasilkan Token 'A7B2C9' untuk Ujian Praktik.`
- `[Token Used] NIM - Nama menggunakan Token 'A7B2C9' untuk membuka Ujian Praktik.`

---

## 7. Transisi & Migrasi Supabase
Untuk memindahkan backend data secara penuh dari Firebase ke Supabase:
1. **Supabase Auth**: Menggantikan Firebase Authentication. Integrasi JWT custom dari web utama dilakukan dengan melakukan validasi token JWT di API serverless, lalu menggunakan data payload untuk menyinkronkan status user atau sign-in ke Supabase.
2. **Supabase Database (PostgreSQL)**: Menggantikan Firestore NoSQL. Seluruh koleksi dokumen dikonversikan ke dalam tabel relasional dengan integritas data (Foreign Keys, Constraints) dan aturan Row Level Security (RLS) PostgreSQL.
3. **Supabase Realtime**: Menggantikan Firestore real-time snapshot (`onSnapshot`) untuk monitoring detak jantung/aktifnya mahasiswa dan logs aktivitas.
