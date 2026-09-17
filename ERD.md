# Entity Relationship Diagram (ERD) & Skema Database
## Arsitektur Relasional Supabase PostgreSQL — Kondisi Aktual

Dokumen ini mendefinisikan skema tabel aktual yang digunakan di production, lengkap dengan tipe data, kunci primer/asing, dan kebijakan Row Level Security (RLS).

---

## 1. Diagram Relasional (ERD)

```mermaid
erDiagram
    users ||--o{ student_progress : "menyelesaikan"
    users ||--o{ game_history : "bermain"
    users ||--o{ unlocked_achievements : "membuka"
    users ||--o{ assessment_attempts : "mengerjakan"
    users ||--o{ assessment_tokens : "membuat"
    users ||--o{ activity_logs : "mencatat"
    users ||--o{ active_sessions : "memiliki sesi"
    users ||--o{ assessment_questions : "membuat soal"

    levels ||--o{ modules : "memiliki"
    modules ||--o{ lessons : "memiliki"
    lessons ||--o{ student_progress : "dicatat di"

    assessment_questions ||--o{ assessment_attempts : "digunakan di"
    assessment_tokens ||--o{ assessment_attempts : "digunakan di"
    assessment_grading_rules ||--o{ assessment_attempts : "rubrik penilaian"
    achievements ||--o{ unlocked_achievements : "diraih"

    users {
        text nim PK
        text nama
        text kelas
        text jurusan "nullable"
        text email "nullable"
        text role "admin | kordas | asisten | praktikan"
        integer xp "default 0"
        integer level "default 1"
        integer streak "default 0"
        timestamp last_active
        timestamp created_at
        jsonb assessment_access "per menu_type: boolean"
        text division "nullable"
        jsonb levelAccessOverrides "nullable"
        integer studyTime "nullable, dalam detik"
    }

    levels {
        text id PK
        text title
        text description
        text access_mode "auto | unlocked | locked"
        boolean locked "default false"
    }

    modules {
        text id PK
        text level_id FK
        text title
        integer sort_order
    }

    lessons {
        text id PK
        text module_id FK
        text title
        text explanation "rich text HTML atau markdown"
        text code_example
        text initial_code
        text solution
        text hint "nullable"
        jsonb quiz
        jsonb test_cases
        jsonb validation_rules
        integer sort_order
    }

    assessment_questions {
        uuid id PK
        text menu_type "pre_test | post_test | program_keterampilan | ujian_praktik"
        text difficulty "easy | medium | hard"
        text type "essay | short_answer | coding | flowchart_translation"
        text title "format [Kode X] judul untuk ujian_praktik"
        text instruction
        integer module_association "1–6, nullable"
        text initial_code "nullable"
        text reference_solution "nullable"
        jsonb test_cases "default []"
        jsonb validation_rules "default []"
        text flowchart_url "nullable"
        timestamp created_at
        text created_by FK "users.nim, nullable"
    }

    assessment_grading_rules {
        text id PK "pre_test | post_test | program_keterampilan | ujian_praktik"
        jsonb rules "rubrik + generated_sets + duration_minutes"
    }

    assessment_tokens {
        text token PK "6-digit alphanumeric"
        text created_by FK "users.nim, nullable"
        timestamp created_at
        timestamp expired_at
        text status "active | expired | used"
        integer usage_limit "default 1"
        integer usage_count "default 0"
        jsonb target_classes "array kelas"
    }

    assessment_attempts {
        uuid id PK
        text nim FK "users.nim"
        text menu_type
        text token_used FK "assessment_tokens.token, nullable"
        jsonb selected_questions "array of question UUIDs"
        jsonb answers "questionId -> {answerText, codeSubmitted, outputStandard, errors}"
        jsonb ai_grades "questionId -> {scores, total_score, feedback}"
        integer final_score "nullable"
        text status "in_progress | submitted | graded"
        timestamp started_at
        timestamp submitted_at "nullable"
        timestamp graded_at "nullable"
        integer duration_minutes
        integer tab_switch_count "nullable, deteksi kecurangan"
    }

    activity_logs {
        uuid id PK
        text nim FK "users.nim, nullable"
        text nama
        text event_type
        timestamp timestamp
        text details
        text ip_address "nullable"
    }

    active_sessions {
        text nim PK FK "users.nim"
        text nama
        text kelas
        timestamp last_heartbeat
        text current_activity
        uuid attempt_id FK "assessment_attempts.id, nullable"
    }

    achievements {
        text id PK
        text title
        text description
        text icon "nullable"
        text requirement_type
        text requirement_value
    }

    unlocked_achievements {
        uuid id PK
        text nim FK "users.nim"
        text achievement_id FK "achievements.id"
        timestamp unlocked_at
    }

    student_progress {
        uuid id PK
        text nim FK "users.nim"
        text lesson_id FK "lessons.id"
        boolean completed "default true"
        timestamp completed_at
    }

    game_history {
        uuid id PK
        text nim FK "users.nim"
        text game_type
        integer xp_earned "maks 300"
        timestamp played_at
    }

    game_settings {
        text id PK "default: 'default'"
        boolean bug_hunt_active "default true"
        boolean bug_hunt_c_active "default true"
        boolean bug_hunt_python_active "default true"
        integer bug_hunt_weekly_limit "default 3"
    }

    game_questions {
        uuid id PK
        text language "c | python"
        text difficulty "easy | medium | hard"
        text title
        text code "kode dengan bug"
        integer bug_line "nomor baris yang mengandung bug"
        text explanation "penjelasan bug"
    }
```

---

## 2. Detail Tabel

### `users`
Profil pengguna. Sumber auth dari Web Utama (JWT), disinkronisasi ke tabel ini.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `nim` | TEXT PK | Nomor Induk Mahasiswa, identitas unik |
| `nama` | TEXT | Nama lengkap |
| `kelas` | TEXT | Kelas/grup praktikum |
| `jurusan` | TEXT | Nullable |
| `email` | TEXT | Email kampus, nullable |
| `role` | TEXT | `admin` / `kordas` / `asisten` / `praktikan` |
| `xp` | INTEGER | Total experience points |
| `level` | INTEGER | Dihitung: `floor(sqrt(xp/50)) + 1` |
| `streak` | INTEGER | Hari aktif berturut-turut |
| `last_active` | TIMESTAMPTZ | Timestamp aktivitas terakhir |
| `assessment_access` | JSONB | `{"pre_test": bool, "post_test": bool, ...}` |
| `levelAccessOverrides` | JSONB | Override akses level per-user |
| `studyTime` | INTEGER | Total waktu belajar (detik) |

---

### `levels`, `modules`, `lessons`
Hierarki konten kurikulum.

**`levels`**: Level belajar utama (contoh: Level 1 — Dasar C, Level 2 — Fungsi, dst.)
- `access_mode`: `auto` (unlock otomatis), `unlocked`, `locked`

**`modules`**: Modul dalam tiap level, memiliki `sort_order` untuk urutan tampilan.

**`lessons`**: Materi per modul. Field utama:
- `explanation`: HTML rich text (TipTap) atau Markdown
- `initial_code`: Template kode awal untuk editor
- `solution`: Kunci jawaban tersembunyi
- `quiz`: JSONB — soal pilihan ganda in-lesson
- `test_cases`: JSONB — kasus uji untuk validasi kode mahasiswa
- `validation_rules`: JSONB — aturan validasi tambahan

---

### `assessment_grading_rules` ⭐ (Tabel Baru)
Tabel ini **tidak ada di ERD lama**. Menyimpan rubrik penilaian dinamis dan set soal yang sudah di-generate.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | TEXT PK | `pre_test` / `post_test` / `program_keterampilan` / `ujian_praktik` |
| `rules` | JSONB | Rubrik + generated_sets + duration_minutes |

**Struktur `rules` JSONB:**
```json
{
  "duration_minutes": 120,
  "difficulties": {
    "easy":   { "criteria": { "correct": 20, "wrong": 8, "empty": 0 } },
    "medium": { "criteria": { "correct_with_explanation": 15, ... } },
    "hard":   { "criteria": { "correct_with_explanation": 25, ... } }
  },
  "generated_sets": {
    "modul_1": ["uuid-soal-1", "uuid-soal-2", ...],
    "kode_A":  ["uuid-soal-a1", "uuid-soal-a2", ...],
    "kode_MIX": [...]
  },
  "last_generated_at": {
    "modul_1": "2025-01-15T08:00:00Z",
    "kode_A":  "2025-01-15T09:00:00Z"
  }
}
```

---

### `assessment_questions`
Bank soal. Field `title` untuk `ujian_praktik` menggunakan format `[Kode X] Judul Soal` agar bisa dikelompokkan per paket.

Tipe soal (`type`):
- `essay` — jawaban teks panjang
- `short_answer` — jawaban singkat + opsional penjelasan
- `coding` — tulis kode di Monaco Editor, dieksekusi di sandbox
- `flowchart_translation` — menerjemahkan flowchart (via `flowchart_url`) ke kode

---

### `assessment_attempts`
Record pengerjaan ujian mahasiswa. Field penting:

- `selected_questions`: Array UUID soal yang dipilih random saat `startAttempt()`
- `answers`: JSONB per-soal — `{ [questionId]: { answerText, codeSubmitted, outputStandard, errors } }`
- `ai_grades`: JSONB hasil evaluasi AI — `{ [questionId]: { scores, total_score, feedback } }`
- `tab_switch_count`: Deteksi potensi kecurangan (berpindah tab selama ujian)
- `status` flow: `in_progress` → `submitted` → `graded`

---

### `assessment_tokens`
Token akses ujian praktik. Dibuat oleh Admin/Kordas.

- `target_classes`: Array kelas yang boleh menggunakan token ini
- `usage_limit`: Berapa kali token bisa dipakai (default 1)
- `status`: Berubah otomatis ke `expired` bila `expired_at` terlewat atau `usage_count >= usage_limit`

---

### `active_sessions`
Realtime heartbeat mahasiswa. Di-update setiap ~30 detik via Supabase Realtime.

- `current_activity`: Teks deskripsi aktivitas saat ini (contoh: "Mengerjakan Pre-Test Modul 1")
- `attempt_id`: FK ke `assessment_attempts` jika sedang mengerjakan ujian

---

### `game_questions`
Bank soal Bug Hunt. Berisi kode (C/Python) yang sengaja mengandung bug, beserta nomor baris dan penjelasan.

---

## 3. Kebijakan Row Level Security (RLS)

Auth menggunakan JWT custom dari Web Utama yang di-sign ulang dengan `SUPABASE_JWT_SECRET`. Klaim JWT yang dipakai:
- `nim` — identitas pengguna
- `user_role` — role pengguna (dipetakan: `koordinator` → `kordas`, `user` → `praktikan`)

### Helper Functions
```sql
-- Mendapatkan NIM dari JWT claims
CREATE OR REPLACE FUNCTION public.auth_nim() RETURNS TEXT AS $$
  SELECT COALESCE(
    nullif(current_setting('request.jwt.claims', true)::json->>'nim', ''),
    current_setting('request.jwt.claims', true)::json->>'sub'
  )::text;
$$ LANGUAGE sql STABLE;

-- Mendapatkan role dari JWT claims (dengan mapping koordinator → kordas, user → praktikan)
CREATE OR REPLACE FUNCTION public.auth_role() RETURNS TEXT AS $$
  SELECT COALESCE(
    CASE 
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'koordinator' THEN 'kordas'
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'user' THEN 'praktikan'
      ELSE current_setting('request.jwt.claims', true)::json->>'user_role'
    END,
    'praktikan'
  )::text;
$$ LANGUAGE sql STABLE;
```

### Ringkasan Kebijakan RLS per Tabel

| Tabel | RLS | Ringkasan Kebijakan |
|---|:---:|---|
| `users` | ✅ | Praktikan: baca & ubah data sendiri. Asisten+: baca semua. Kordas/Admin: modifikasi semua. |
| `student_progress` | ✅ | Praktikan: CRUD progress sendiri. Asisten+: baca semua. |
| `assessment_attempts` | ✅ | Praktikan: CRUD attempt sendiri. Asisten+: baca semua. Asisten+: UPDATE (grading). |
| `assessment_questions` | ✅ | Semua auth: SELECT. Kordas/Admin: CRUD. |
| `assessment_tokens` | ✅ | Semua auth: SELECT. Kordas/Admin: CRUD. |
| `active_sessions` | ✅ | Praktikan: CRUD sesi sendiri. Asisten+: SELECT semua. |
| `activity_logs` | ✅ | Semua auth: INSERT log sendiri. Asisten+: SELECT semua. |
| `levels`, `modules`, `lessons` | ❌ | Public read (diakses semua user auth) |
| `game_questions`, `game_settings` | ❌ | Public read |
| `assessment_grading_rules` | ❌ | Public read; write hanya via service role (admin ops) |

---

## 4. SQL DDL Lengkap

```sql
-- =========================================================================
-- EXTENSIONS
-- =========================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- USERS & SETTINGS
-- =========================================================================
CREATE TABLE users (
    nim TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    kelas TEXT NOT NULL,
    jurusan TEXT,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'praktikan' 
        CHECK (role IN ('admin', 'kordas', 'asisten', 'praktikan')),
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
    streak INTEGER NOT NULL DEFAULT 0 CHECK (streak >= 0),
    last_active TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    assessment_access JSONB NOT NULL DEFAULT 
        '{"pre_test": false, "post_test": false, "program_keterampilan": false, "ujian_praktik": false}'::jsonb,
    division TEXT,
    "levelAccessOverrides" JSONB,
    "studyTime" INTEGER
);

CREATE TABLE game_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    bug_hunt_active BOOLEAN NOT NULL DEFAULT TRUE,
    bug_hunt_c_active BOOLEAN NOT NULL DEFAULT TRUE,
    bug_hunt_python_active BOOLEAN NOT NULL DEFAULT TRUE,
    bug_hunt_weekly_limit INTEGER NOT NULL DEFAULT 3 CHECK (bug_hunt_weekly_limit >= 0)
);

-- =========================================================================
-- KURIKULUM
-- =========================================================================
CREATE TABLE levels (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    access_mode TEXT NOT NULL DEFAULT 'auto' 
        CHECK (access_mode IN ('auto', 'unlocked', 'locked')),
    locked BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE modules (
    id TEXT PRIMARY KEY,
    level_id TEXT REFERENCES levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    explanation TEXT NOT NULL,
    code_example TEXT NOT NULL,
    initial_code TEXT NOT NULL,
    solution TEXT NOT NULL,
    hint TEXT,
    quiz JSONB NOT NULL DEFAULT '{}'::jsonb,
    test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    validation_rules JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- =========================================================================
-- PROGRESS & GAMIFIKASI
-- =========================================================================
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nim TEXT REFERENCES users(nim) ON DELETE CASCADE,
    lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT TRUE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_nim_lesson UNIQUE (nim, lesson_id)
);

CREATE TABLE achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    requirement_type TEXT NOT NULL,
    requirement_value TEXT NOT NULL
);

CREATE TABLE unlocked_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nim TEXT REFERENCES users(nim) ON DELETE CASCADE,
    achievement_id TEXT REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_nim_achievement UNIQUE (nim, achievement_id)
);

CREATE TABLE game_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nim TEXT REFERENCES users(nim) ON DELETE CASCADE,
    game_type TEXT NOT NULL,
    xp_earned INTEGER NOT NULL CHECK (xp_earned <= 300),
    played_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE game_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language TEXT NOT NULL CHECK (language IN ('c', 'python')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    bug_line INTEGER NOT NULL,
    explanation TEXT NOT NULL
);

-- =========================================================================
-- ASESMEN
-- =========================================================================
CREATE TABLE assessment_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_type TEXT NOT NULL 
        CHECK (menu_type IN ('pre_test', 'post_test', 'program_keterampilan', 'ujian_praktik')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    type TEXT NOT NULL 
        CHECK (type IN ('essay', 'short_answer', 'coding', 'flowchart_translation')),
    title TEXT NOT NULL,
    instruction TEXT NOT NULL,
    module_association INTEGER CHECK (module_association BETWEEN 1 AND 6),
    initial_code TEXT,
    reference_solution TEXT,
    test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    validation_rules JSONB NOT NULL DEFAULT '[]'::jsonb,
    flowchart_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by TEXT REFERENCES users(nim) ON DELETE SET NULL
);

-- Rubrik penilaian dinamis + generated sets soal
CREATE TABLE assessment_grading_rules (
    id TEXT PRIMARY KEY,  -- 'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik'
    rules JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE assessment_tokens (
    token TEXT PRIMARY KEY,
    created_by TEXT REFERENCES users(nim) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expired_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'used')),
    usage_limit INTEGER NOT NULL DEFAULT 1 CHECK (usage_limit >= 1),
    usage_count INTEGER NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
    target_classes JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE TABLE assessment_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nim TEXT REFERENCES users(nim) ON DELETE CASCADE,
    menu_type TEXT NOT NULL,
    token_used TEXT REFERENCES assessment_tokens(token) ON DELETE SET NULL,
    selected_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    ai_grades JSONB NOT NULL DEFAULT '{}'::jsonb,
    final_score INTEGER DEFAULT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress' 
        CHECK (status IN ('in_progress', 'submitted', 'graded')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    graded_at TIMESTAMPTZ,
    duration_minutes INTEGER NOT NULL,
    tab_switch_count INTEGER DEFAULT 0
);

-- =========================================================================
-- MONITORING & AUDIT
-- =========================================================================
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nim TEXT REFERENCES users(nim) ON DELETE SET NULL,
    nama TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    details TEXT NOT NULL,
    ip_address TEXT
);

CREATE TABLE active_sessions (
    nim TEXT PRIMARY KEY REFERENCES users(nim) ON DELETE CASCADE,
    nama TEXT NOT NULL,
    kelas TEXT NOT NULL,
    last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
    current_activity TEXT NOT NULL,
    attempt_id UUID REFERENCES assessment_attempts(id) ON DELETE SET NULL
);

-- =========================================================================
-- RLS: ENABLE
-- =========================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- RLS: HELPER FUNCTIONS
-- =========================================================================
CREATE OR REPLACE FUNCTION public.auth_nim() RETURNS TEXT AS $$
  SELECT COALESCE(
    nullif(current_setting('request.jwt.claims', true)::json->>'nim', ''),
    current_setting('request.jwt.claims', true)::json->>'sub'
  )::text;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.auth_role() RETURNS TEXT AS $$
  SELECT COALESCE(
    CASE 
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'koordinator' THEN 'kordas'
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'user' THEN 'praktikan'
      ELSE current_setting('request.jwt.claims', true)::json->>'user_role'
    END,
    'praktikan'
  )::text;
$$ LANGUAGE sql STABLE;

-- =========================================================================
-- RLS: POLICIES
-- =========================================================================

-- users
CREATE POLICY "users_self" ON users FOR ALL USING (nim = public.auth_nim());
CREATE POLICY "users_read_staff" ON users FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
CREATE POLICY "users_write_admin" ON users FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- student_progress
CREATE POLICY "progress_self" ON student_progress FOR ALL USING (nim = public.auth_nim());
CREATE POLICY "progress_read_staff" ON student_progress FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- assessment_attempts
CREATE POLICY "attempts_self" ON assessment_attempts FOR ALL USING (nim = public.auth_nim());
CREATE POLICY "attempts_read_staff" ON assessment_attempts FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
CREATE POLICY "attempts_grade_staff" ON assessment_attempts FOR UPDATE USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- assessment_questions
CREATE POLICY "questions_read_all" ON assessment_questions FOR SELECT USING (public.auth_role() IS NOT NULL);
CREATE POLICY "questions_write_admin" ON assessment_questions FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- assessment_tokens
CREATE POLICY "tokens_read_all" ON assessment_tokens FOR SELECT USING (public.auth_role() IS NOT NULL);
CREATE POLICY "tokens_write_admin" ON assessment_tokens FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- active_sessions
CREATE POLICY "sessions_self" ON active_sessions FOR ALL USING (nim = public.auth_nim());
CREATE POLICY "sessions_read_staff" ON active_sessions FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- activity_logs
CREATE POLICY "logs_insert_self" ON activity_logs FOR INSERT WITH CHECK (nim = public.auth_nim());
CREATE POLICY "logs_read_staff" ON activity_logs FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
```

---

## 5. Perbedaan dari ERD Versi Sebelumnya

| Perubahan | Keterangan |
|---|---|
| ➕ Tabel `assessment_grading_rules` | Tabel baru — menyimpan rubrik penilaian dinamis + pre-generated sets soal per modul/kode |
| ➕ Kolom `tab_switch_count` di `assessment_attempts` | Deteksi perpindahan tab selama ujian (indikasi kecurangan) |
| ➕ Kolom `jurusan`, `division`, `levelAccessOverrides`, `studyTime` di `users` | Kolom tambahan sesuai interface `UserProfile` aktual |
| ➕ Tabel `game_questions` | Bank soal Bug Hunt (terpisah dari `assessment_questions`) |
| 🔄 Mode paket `MIX` di ujian praktik | Mode dinamis yang mengambil soal dari post_test coding per modul |
| 🔄 Durasi ujian dari DB | Bisa dikonfigurasi via `assessment_grading_rules.rules.duration_minutes`, bukan hardcoded |
| ❌ `achievements.xp_required` dihapus | Diganti dengan `requirement_type` + `requirement_value` yang lebih fleksibel |
