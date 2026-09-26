# Rencana: latihan flowchart drag & drop bercabang (modul m9)

Disetujui pemilik produk. Prinsip: **pembedaannya eksplisit, bukan urutan slot.**

## Masalah desain

`FlowchartPuzzle` sekarang satu kolom slot datar, divalidasi "urutan persis".
Itu cukup untuk alur lurus, tapi **tidak cukup untuk percabangan**: setelah
`decision` ada dua jalur sejajar (Ya/Tidak), sehingga urutan menjadi ambigu dan
jawaban benar/salah bisa diperdebatkan.

Solusi yang dipakai: **cabang ditentukan oleh pembedaan yang DIPILIH siswa**,
bukan oleh urutan penempatan. Decision selalu punya 2 slot cabang tetap
(Ya = atas/utamanya, Tidak = samping), masing-masing dengan kolom sendiri.

## Model data (versi 2)

`solution` tetap JSON, tapi bentuknya berubah:

```json
{
  "version": 2,
  "flow": [
    { "at": "main", "shape": "terminator", "label": "Mulai" },
    { "at": "main", "shape": "process",    "label": "Inisialisasi" },
    { "at": "main", "shape": "decision",   "label": "Kondisi?" },
    { "at": "yes",  "shape": "process",    "label": "Proses Data" },
    { "at": "no",   "shape": "io",         "label": "Cetak Peringatan" },
    { "at": "main", "shape": "terminator", "label": "Selesai" }
  ]
}
```

- `at`: `main` (alur utama) | `yes` (cabang Ya) | `no` (cabang Tidak)
- Bentuk lama (array datar) tetap didukung -> diperlakukan sebagai `main`.
  Rinso: pembaca `main` memakai `Array.isArray(parsed) ? {flow: parsed} : parsed`
- Cabang non-kosong hanya boleh muncul setelah `decision` pada `main`.
- Setiap cabang boleh punya `decision` lagi (bersarang).

## Perubahan komponen `FlowchartPuzzle`

1. Parse: terima bentuk lama (array) dan baru (`{version, flow}`).
2. Slot: kolom `main` + kolom per cabang (`yes`/`no`) untuk tiap decision.
3. Setiap kartu decision di slot utama diberi dua slot cabang (Ya / Tidak).
4. Validasi per kolom: urutan di dalam kolom harus tepat, dan isi tiap kolom
   harus cocok dengan `at` yang bersangkutan.
5. Slot cabang hanya boleh diisi kartu yang tersisa di bank (tanpa pindah kolom).

## Lesson (modul m9, tetap satu modul)

| urutan | pelajaran | jenis | gambar / data |
|---|---|---|---|
| 1 | Garis Besar & Simbol Flowchart | teori | `simbol_*.svg` (tanpa dokumen) |
| 2 | Flowchart Sederhana | latihan drag-drop | `flowchart_sederhana.svg` |
| 3 | Flowchart Percabangan | latihan drag-drop (bercabang) | `flowchart_percabangan.svg` |
| 4 | Flowchart Perulangan | latihan drag-drop | `flowchart_perulangan.svg` |

Latihan **bukan koding**: `exercise_type = 'flowchart'`, `initial_code` = kode C
kecil yang divisualkan (read-only), `solution` = JSON di atas.

## Prasyarat

- Jalankan `docs/migration-flowchart-exercise.sql` (tambah `exercise_type`,
  `flowchart_distractors`, perbarui view `student_lessons`).
- Buang `simbol_dokumen.svg` (tidak ada di modul).
- Ganti SVG buatanku (`flowchart-dasar`, `struktur-kontrol`, `simbol-flowchart`)
  dengan SVG milik pemilik produk.
- Progress siswa di m9: 0 baris -> id `m9-l1/l2/l3` aman dipakai ulang.
