# Product Requirement Document (PRD)
## Sistem E-Learning Praktikum — Kondisi Aktual

| Atribut | Detail |
|---|---|
| **Versi** | Aktual (Implemented) |
| **Tech Stack** | React 19 + Vite 6 + TypeScript 5.8 + Supabase PostgreSQL |
| **Target Pengguna** | Praktikan, Asisten, Koordinator Asisten (Kordas), Admin |
| **Model Evaluasi** | AI-Powered Grading (Gemini API + Ollama/GPT-OS lokal) — Batch per attempt |
| **Deployment** | Vercel (frontend + serverless API), Supabase (database + realtime + auth) |

---

## 1. Gambaran Umum

Sistem E-Learning Praktikum adalah aplikasi web Single-Page Application (SPA) berbasis React yang dirancang untuk mendukung kegiatan belajar-mengajar praktikum. Sistem ini terintegrasi dengan **Web Utama** (sistem login kampus terpisah) sebagai sumber autentikasi. Token JWT dari Web Utama di-verify dan di-sign ulang agar kompatibel dengan RLS Supabase.

**Fitur utama yang sudah berjalan:**
- Kurikulum interaktif dengan code editor (C & Python) langsung di browser via WASM
- Sistem gamifikasi: XP, level, streak, achievement badge, leaderboard
- Minigame **Bug Hunt**: menemukan bug pada kode C/Python
- 4 jenis asesmen dengan AI grading berbasis batch
- Dashboard monitoring realtime aktivitas mahasiswa
- Audit log seluruh aktivitas sistem
- Panel admin: kelola user, kurikulum (manual / import dokumen / AI-generate), bank soal, token ujian

---

## 2. Matriks Peran & Hak Akses (RBAC)

Sistem memiliki 4 role pengguna. Role diambil dari JWT claim `user_role` dan dipetakan:
- `koordinator` (dari Web Utama) → `kordas`
- `user` (dari Web Utama) → `praktikan`

| Hak Akses / Fitur | Praktikan | Asisten | Kordas | Admin |
|---|:---:|:---:|:---:|:---:|
| Belajar materi & menjalankan kode | ✅ | ❌ | ❌ | ❌ |
| Mengerjakan asesmen yang terbuka | ✅ | ❌ | ❌ | ❌ |
| Auto-save jawaban berkala | ✅ | ❌ | ❌ | ❌ |
| Memasukkan token akses ujian praktik | ✅ | ❌ | ❌ | ❌ |
| Melihat nilai & riwayat sendiri | ✅ | ❌ | ❌ | ❌ |
| Meminta hint AI saat belajar | ✅ | ❌ | ❌ | ❌ |
| Bermain Bug Hunt | ✅ | ❌ | ❌ | ❌ |
| Memonitor mahasiswa aktif (realtime) | ❌ | ✅ | ✅ | ✅ |
| Melihat rekap jawaban mahasiswa | ❌ | ✅ | ✅ | ✅ |
| Memicu AI grading (single / bulk) | ❌ | ✅ | ✅ | ✅ |
| Melihat audit log aktivitas | ❌ | ✅ | ✅ | ✅ |
| Membuka/mengunci akses asesmen mahasiswa | ❌ | ❌ | ✅ | ✅ |
| Mengelola bank soal asesmen (CRUD) | ❌ | ❌ | ✅ | ✅ |
| Generate & simpan set soal | ❌ | ❌ | ✅ | ✅ |
| Membuat & mengelola token ujian praktik | ❌ | ❌ | ✅ | ✅ |
| Mengelola kurikulum (CRUD, import, AI-gen) | ❌ | ❌ | ✅ | ✅ |
| Mengelola user & role | ❌ | ❌ | ❌ | ✅ |
| Konfigurasi aturan penilaian AI dinamis | ❌ | ❌ | ❌ | ✅ |
| Konfigurasi setting Bug Hunt | ❌ | ❌ | ❌ | ✅ |

---

## 3. Halaman & Fitur yang Diimplementasikan

### A. LandingPage (`/` — unauthenticated)
Halaman publik yang menampilkan informasi kurikulum dan tombol login via redirect ke Web Utama.

### B. Dashboard (`/` — authenticated)
Overview XP, level, streak mahasiswa. Menampilkan progress per level kurikulum.

### C. LessonPage (`/lesson`)
Halaman belajar interaktif per pelajaran:
- Konten materi dalam format **Rich Text** (TipTap) atau **Markdown** dengan dukungan KaTeX (rumus matematika)
- **Code Editor** Monaco dengan syntax highlighting C/Python
- **Eksekusi Kode** langsung di browser via WASM: Pyodide (Python), Clang (C)
- **Quiz** pilihan ganda terintegrasi per lesson
- **Test Case Runner** validasi output kode
- **AI Hint**: meminta bantuan AI (Gemini) bila mahasiswa stuck — rate-limited 10 req/menit

### D. Playground (`/playground`)
Editor bebas C & Python dengan output langsung, tanpa batasan kurikulum.

### E. CourseExplorer (`/courses`)
Menjelajahi seluruh level → modul → lesson dengan indikator progress visual.

### F. Leaderboard (`/leaderboard`)
Papan peringkat berdasarkan total XP, menampilkan nama, kelas, level.

### G. Profile (`/profile`)
Profil mahasiswa: statistik XP, level, streak, daftar achievement yang sudah dibuka.

### H. AdminDashboard (`/admin`) — Kordas & Admin
Panel manajemen:
- Kelola data user (CRUD, ubah role)
- Kelola kurikulum: tambah/edit/hapus level, modul, lesson
  - Import dari dokumen (.docx / PDF via AI parsing)
  - Generate seluruh kurikulum atau modul individual via AI (Gemini)
- Kelola soal Bug Hunt: CRUD manual atau generate via AI
- Konfigurasi setting Bug Hunt (aktif/nonaktif per bahasa, batas mingguan)

### I. AssessmentPage (`/assessments`) — Kordas & Admin
- Manajemen bank soal: CRUD per menu_type (pre_test / post_test / program_keterampilan / ujian_praktik)
- Generate & simpan set soal (pre-generated sets) per modul / kode paket
- Buat & kelola token akses ujian praktik (6-digit alphanumeric, batas waktu, kelas target)
- Buka/kunci akses asesmen per mahasiswa
- Monitoring status pengerjaan, rekap jawaban per soal
- Trigger AI grading: single attempt atau bulk untuk semua yang sudah `submitted`
- Konfigurasi aturan penilaian AI dinamis via `assessment_grading_rules`

### J. StudentMonitoring (`/monitoring`) — Asisten, Kordas, Admin
- Daftar mahasiswa yang sedang online (realtime heartbeat via Supabase Realtime)
- Detail sesi aktif: NIM, nama, kelas, aktivitas saat ini, attempt yang sedang dikerjakan

### K. AuditLogPage (`/auditlog`) — Kordas & Admin
Tabel seluruh aktivitas sistem dengan filter: tipe event, waktu, NIM.

### L. TerminalDemo (`/terminal-demo`)
Demo terminal interaktif menggunakan xterm.js.

---

## 4. Fitur Auto-Save Jawaban

Implementasi di `src/hooks/useAutoSave.ts`:

1. **Pemicu sinkronisasi:**
   - **Interval waktu**: Setiap 30 detik selama ujian berjalan
   - **Event**: Saat berpindah soal, `onbeforeunload`, `visibilitychange` (tab tidak aktif)

2. **Endpoint**: `assessmentService.updateAttemptAnswers(attemptId, answers)` → update kolom `answers` JSONB di `assessment_attempts` (hanya jika status masih `in_progress`)

3. **Indikator UI** di pojok editor:
   - `Menyimpan draf...` — sedang sinkronisasi
   - `Draf disimpan pukul HH:MM:SS` — sukses
   - `Gagal menyimpan, mencoba kembali...` — koneksi error

4. **Struktur jawaban** yang disimpan per soal:
   ```typescript
   Record<questionId, {
     answerText?: string;       // jawaban teks / essay
     codeSubmitted?: string;    // kode program
     outputStandard?: string;   // stdout dari sandbox
     errors?: string;           // stderr dari sandbox
   }>
   ```

---

## 5. Spesifikasi 4 Menu Asesmen

### A. Pre-Test
- **Soal**: 5 soal — 1 Easy, 2 Medium, 2 Hard (random dari bank soal)
- **Durasi**: 15 menit (bisa dikonfigurasi via `assessment_grading_rules.duration_minutes`)
- **Rubrik default** (overridable via `assessment_grading_rules`):
  - Easy: Benar = 20, Salah = 8, Kosong = 0
  - Medium: Benar + penjelasan = 15, Benar singkat = 10, Salah + logis = 7, Salah = 3, Kosong = 0
  - Hard: Benar + penjelasan = 25, Benar singkat = 15, Salah + logis = 10, Salah = 5, Kosong = 0
- **Total maks**: 100 poin

### B. Post-Test
- **Soal**: 3 soal — 1 Easy, 1 Medium, 1 Hard Coding (random dari bank soal per modul)
- **Durasi**: 15 menit
- **Rubrik default:**
  - Easy: Benar = 20, Salah = 8, Kosong = 0
  - Medium: Benar + penjelasan = 35, Benar singkat = 20, Salah + logis = 15, Salah = 10, Kosong = 0
  - Hard Coding: Berjalan tanpa error = 7, Sesuai petunjuk = 25, Selesai/output terpenuhi = 13, Belum selesai = 3
- **Total maks**: 100 poin

### C. Program Keterampilan
- **Soal**: 1 soal studi kasus coding
- **Durasi**: 90 menit
- **Rubrik default:**
  - Berjalan tanpa error (sempurna = 30, sebagian = 15): maks 30 poin
  - Kesesuaian sintaks & petunjuk: 35 poin
  - Selesai tepat waktu = 20, Belum selesai = 10
- **Total maks**: 85 poin

### D. Ujian Praktik
- **Akses**: Wajib verifikasi token 6-digit alphanumeric dari Admin/Kordas
- **Soal**: 6 soal dengan pemetaan per modul:
  - Soal 1: Modul 1
  - Soal 2: Modul 2
  - Soal 3: Modul 3
  - Soal 4: Modul 4 atau 5
  - Soal 5: Modul 6
  - Soal 6: Flowchart Translation (menerjemahkan flowchart ke kode C/Python)
- **Mode Paket**: 
  - `[Kode X]` — paket soal bertanda kode spesifik (A, B, C, dst.)
  - `MIX` — mengambil soal dinamis dari bank post_test coding per modul + flowchart
- **Durasi**: 120 menit
- **Rubrik default** (soal 1–6 sama):
  - Berjalan tanpa error = 7, Sesuai petunjuk = 25, Selesai/output terpenuhi = 13, Belum selesai = 3
  - Soal 6 (flowchart): Berjalan tanpa error = 7, Kesesuaian alur & logika = 25, Selesai = 13, Belum selesai = 3
- **Total maks**: 45 × 6 = **270 poin**

---

## 6. Sistem AI Grading (Batch Evaluation Engine)

Implementasi di `api/grade.ts`:

```
Asisten/Kordas → trigger bulk grading (attemptIds[])
    ↓
api/grade.ts (Vercel Serverless)
    ↓ verifikasi JWT + cek role (asisten/kordas/admin)
    ↓ concurrency limit 3 attempt sekaligus
    ↓ per attempt:
       - load attempt + student name + dynamic grading rules
       - load detail semua soal (selected_questions IDs)
       - build single prompt batch (semua soal + jawaban + rubrik)
       - call AI:
           if VITE_CUSTOM_AI_ENDPOINT set → Ollama API (model: gpt-oss:120b-cloud)
           else → Gemini API (key rotation random, max 3 keys, fallback chain)
       - parse JSON response → { grades: {[qId]: {scores, total, feedback}}, total_overall_score, overall_feedback }
       - update assessment_attempts: ai_grades, final_score, status='graded', graded_at
    ↓
response: { gradedCount, results[] }
```

**Model yang tersedia:**
- `gemini-2.5-flash` — model Gemini premium
- `gemini-2.0-flash-exp` — default fallback Gemini
- `gpt-os-120b` — Ollama lokal via `VITE_CUSTOM_AI_ENDPOINT` (OLLAMA_MODEL dapat dikonfigurasi)

**Keunggulan batch:** 1 request API per mahasiswa (bukan per soal). Untuk 15 mahasiswa → 15 API call, bukan 75.

**Rubrik dinamis:** Rules bisa dioverride via tabel `assessment_grading_rules` (JSONB), tanpa perlu deploy ulang.

---

## 7. Sistem Gamifikasi

| Komponen | Detail |
|---|---|
| **XP** | Diperoleh dari menyelesaikan lesson, quiz, game Bug Hunt |
| **Level** | Dihitung otomatis: `floor(sqrt(xp/50)) + 1` |
| **Streak** | Harian, reset jika tidak aktif >24 jam |
| **Achievement** | Badge berbasis `requirement_type` & `requirement_value` di tabel `achievements` |
| **Leaderboard** | Ranking berdasarkan total XP semua praktikan |
| **Level Up Popup** | Animasi confetti saat naik level |
| **Achievement Popup** | Queue notifikasi saat badge baru terbuka |

---

## 8. Minigame Bug Hunt

- Mahasiswa disajikan kode C atau Python yang mengandung 1 bug
- Harus mengidentifikasi baris yang salah dan menjelaskan alasannya
- Soal dari tabel `game_questions` (140+ soal default dari `gameQuestions.json`)
- AI dapat generate soal baru via `gameService.generateBugHuntQuestion()`
- Setting: aktif/nonaktif per bahasa, batas bermain per minggu (`game_settings`)
- XP diperoleh sesuai difficulty (batas maks 300 XP per sesi game)

---

## 9. Kurikulum & Code Execution

**Struktur**: Level → Modul → Lesson (hierarki 3 level, semua di Supabase)

**Pengelolaan kurikulum** (Admin/Kordas):
- Manual via form di AdminDashboard
- Import dari dokumen .docx / PDF (parsing via `documentImportService`)
- AI-generate: kirim PDF/teks ke Gemini → generate struktur 2-fase (skeleton → fill content)

**Code Execution** (sepenuhnya di browser, tanpa server):
- **Python**: Pyodide v0.29 (WASM) via Web Worker
- **C**: Clang LLVM (WASM) via Web Worker, dengan virtual filesystem (memfs)

**Level Access**: tiap level bisa di-set `auto` (unlock otomatis saat level cukup), `unlocked`, atau `locked`. Admin bisa override per-user via `levelAccessOverrides`.

---

## 10. Arsitektur & Infrastruktur

```
Browser (React SPA)
  ├── Pyodide Worker (Python WASM)
  ├── Clang Worker (C WASM)
  └── Supabase JS SDK (realtime + RLS)
        ↓
Vercel (Serverless Functions)
  ├── /api/auth    — JWT verify & resign
  ├── /api/ai      — Proxy AI hint (Gemini, RBAC)
  ├── /api/grade   — Batch AI grading engine
  ├── /api/report  — Laporan nilai
  └── /api/verify  — Token ujian verification
        ↓
Supabase (PostgreSQL + Realtime)
  └── RLS via custom JWT claims (nim, user_role)
        ↓
Web Utama (https://web-lab-ap.vercel.app)
  └── Source of auth JWT token
```

**Environment Variables yang Dibutuhkan:**
```env
GEMINI_API_KEY            # Comma-separated multi-key untuk rotasi
VITE_GEMINI_API_KEY       # Untuk client-side dev
VITE_SUPABASE_URL         # URL project Supabase
VITE_SUPABASE_ANON_KEY    # Anon key Supabase
JWT_SECRET                # Secret JWT Web Utama (untuk verify)
SUPABASE_JWT_SECRET       # Secret JWT Supabase (untuk sign ulang RLS)
VITE_WEB_UTAMA_URL        # URL Web Utama (redirect unauthenticated)
VITE_CUSTOM_AI_ENDPOINT   # (Opsional) Endpoint Ollama lokal
OLLAMA_API_KEY            # (Opsional) API key Ollama
OLLAMA_MODEL              # (Opsional) Nama model Ollama
SUPABASE_SERVICE_ROLE_KEY # (Opsional) Service role key untuk admin ops
```

---

## 11. Progressive Web App (PWA)

Aplikasi dikonfigurasi sebagai PWA via `vite-plugin-pwa` dengan Workbox, memungkinkan instalasi ke homescreen dan caching asset untuk akses offline terbatas.
