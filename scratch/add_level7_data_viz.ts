import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { Level } from '../src/data/curriculum';

const url = process.env.VITE_SUPABASE_URL || '';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const level7Data: Level = {
  id: "py-level-7",
  title: "PENGOLAHAN DAN VISUALISASI DATA PYTHON",
  description: "Mempelajari statistik deskriptif (pemusatan, penyebaran, posisi & korelasi) dan teknik visualisasi data grafik interaktif menggunakan Matplotlib.",
  accessMode: "auto",
  locked: false,
  modules: [
    {
      id: "py7-m1",
      title: "Statistik Deskriptif & Analisis Data",
      lessons: [
        {
          id: "py7-l1",
          title: "Ukuran Pemusatan Data (Mean, Median, Mode)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Ukuran pemusatan data digunakan untuk menemukan titik sentral atau nilai yang paling representatif dari suatu kelompok data numerik.</p>
  <ul class="list-disc pl-5 space-y-2 text-zinc-700">
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">statistics.mean()</code>: Menghitung nilai rata-rata aritmatika seluruh elemen.</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">statistics.median()</code>: Mencari nilai tengah dari data yang telah terurut. Lebih tahan terhadap nilai anomali (outlier).</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">statistics.mode()</code>: Mencari modus atau nilai yang paling sering muncul (frekuensi tertinggi).</li>
  </ul>
</div>`,
          codeExample: `import statistics

data = [80, 90, 85, 70, 90, 100]

rata_rata = statistics.mean(data)
nilai_tengah = statistics.median(data)
modus = statistics.mode(data)

print(f"Mean: {rata_rata:.2f}")
print(f"Median: {nilai_tengah}")
print(f"Modus: {modus}")`,
          initialCode: `import statistics

nilai = [75, 80, 85, 80, 95]

# TODO: Lengkapi kode rumpang di bawah ini
rata = statistics.____(nilai)       # Panggil fungsi rata-rata
tengah = statistics.____(nilai)     # Panggil fungsi nilai tengah
modus = statistics.____(nilai)      # Panggil fungsi modus

print(f"Rata-rata: {rata:.1f}")
print(f"Nilai Tengah: {tengah}")
print(f"Modus: {modus}")`,
          solution: `import statistics

nilai = [75, 80, 85, 80, 95]

rata = statistics.mean(nilai)
tengah = statistics.median(nilai)
modus = statistics.mode(nilai)

print(f"Rata-rata: {rata:.1f}")
print(f"Nilai Tengah: {tengah}")
print(f"Modus: {modus}")`,
          hint: "Ganti garis bawah ____ dengan mean, median, dan mode.",
          quiz: {
            question: "Fungsi pemusatan data apakah yang paling tahan terhadap kehadiran anomali (outlier) data yang sangat besar/kecil?",
            options: [
              "mean()",
              "median()",
              "mode()",
              "sum()"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Rata-rata: 83.0\nNilai Tengah: 80\nModus: 80\n",
              description: "Menghitung mean, median, dan mode dari list nilai"
            }
          ]
        },
        {
          id: "py7-l2",
          title: "Ukuran Penyebaran Data (Min, Max, Variance, Stdev)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Fungsi penyebaran data mengukur seberapa jauh atau lebar sebaran titik data dari titik pusatnya.</p>
  <ul class="list-disc pl-5 space-y-2 text-zinc-700">
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">min()</code> & <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">max()</code>: Menemukan nilai terendah dan tertinggi di kelompok data.</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">statistics.variance()</code>: Menghitung varians sampel (rata-rata kuadrat selisih tiap data terhadap rata-rata).</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">statistics.stdev()</code>: Menghitung standar deviasi (simpangan baku), metrik penyimpangan data pada skala aslinya.</li>
  </ul>
</div>`,
          codeExample: `import statistics

suhu = [28.5, 30.1, 29.0, 31.5, 27.8]

terendah = min(suhu)
tertinggi = max(suhu)
varians = statistics.variance(suhu)
std_dev = statistics.stdev(suhu)

print(f"Min: {terendah}, Max: {tertinggi}")
print(f"Varians: {varians:.4f}")
print(f"Stdev: {std_dev:.4f}")`,
          initialCode: `import statistics

sampel = [10, 12, 15, 18, 20]

# TODO: Lengkapi kode rumpang penyebaran data di bawah ini
n_min = ____(sampel)                  # Fungsi nilai minimum
n_max = ____(sampel)                  # Fungsi nilai maksimum
var = statistics.____(sampel)         # Fungsi varians
std = statistics.____(sampel)         # Fungsi standar deviasi

print(f"Min: {n_min}")
print(f"Max: {n_max}")
print(f"Varians: {var:.2f}")
print(f"Stdev: {std:.2f}")`,
          solution: `import statistics

sampel = [10, 12, 15, 18, 20]

n_min = min(sampel)
n_max = max(sampel)
var = statistics.variance(sampel)
std = statistics.stdev(sampel)

print(f"Min: {n_min}")
print(f"Max: {n_max}")
print(f"Varians: {var:.2f}")
print(f"Stdev: {std:.2f}")`,
          hint: "Isi garis bawah ____ berturut-turut dengan min, max, variance, dan stdev.",
          quiz: {
            question: "Metrik statistik apakah yang dihitung dari akar kuadrat nilai varians?",
            options: [
              "Median",
              "Standar Deviasi (stdev)",
              "Modus",
              "Kuartil"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Min: 10\nMax: 20\nVarians: 17.00\nStdev: 4.12\n",
              description: "Menghitung min, max, varians, dan stdev data sampel"
            }
          ]
        },
        {
          id: "py7-l3",
          title: "Posisi & Hubungan Variabel (Quantiles & Correlation)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Fungsi posisi dan hubungan variabel digunakan untuk membagi interval data dan mengukur keterkaitan antar himpunan data.</p>
  <ul class="list-disc pl-5 space-y-2 text-zinc-700">
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">quantiles(n=4)</code>: Membagi data terurut ke dalam interval probabilitas yang sama (kuartil Q1, Q2, Q3).</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">correlation(x, y)</code>: Menghitung koefisien korelasi Pearson antara dua variabel (rentang -1 hingga 1).</li>
  </ul>
</div>`,
          codeExample: `import statistics

# Kuartil (n=4)
data = [10, 20, 30, 40, 50, 60, 70, 80]
kuartil = statistics.quantiles(data, n=4)
print(f"Kuartil: {kuartil}")

# Korelasi
jam = [2, 4, 6, 8]
nilai = [50, 65, 80, 95]
kor = statistics.correlation(jam, nilai)
print(f"Korelasi: {kor:.2f}")`,
          initialCode: `import statistics

data = [12, 24, 36, 48, 60, 72, 84]

# TODO: Lengkapi fungsi kuartil untuk membagi menjadi 4 bagian
q = statistics.____(data, n=4)

print(f"Q1, Q2, Q3: {[round(x, 1) for x in q]}")`,
          solution: `import statistics

data = [12, 24, 36, 48, 60, 72, 84]

q = statistics.quantiles(data, n=4)

print(f"Q1, Q2, Q3: {[round(x, 1) for x in q]}")`,
          hint: "Ganti garis bawah ____ dengan quantiles.",
          quiz: {
            question: "Berapakah rentang nilai koefisien korelasi Pearson yang dihasilkan oleh fungsi correlation()?",
            options: [
              "0 hingga 100",
              "-1 hingga 1",
              "0 hingga 1",
              "-100 hingga 100"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Q1, Q2, Q3: [24.0, 48.0, 72.0]\n",
              description: "Membagi interval kuartil data"
            }
          ]
        }
      ]
    },
    {
      id: "py7-m2",
      title: "Visualisasi Data Dasar dengan Matplotlib",
      lessons: [
        {
          id: "py7-l4",
          title: "Konfigurasi & Pelengkap Grafik (Title, Label, Grid, Show)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Sebelum merender grafik, kita menggunakan modul <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">matplotlib.pyplot</code> untuk mengatur tata letak pelengkap grafik:</p>
  <ul class="list-disc pl-5 space-y-2 text-zinc-700">
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.title("...")</code>: Menisipkan judul utama di bagian atas bingkai grafik.</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.xlabel("...")</code> & <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.ylabel("...")</code>: Memberikan label keterangan pada sumbu X dan Y.</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.grid(True)</code>: Menampilkan garis pembantu kisi di latar belakang.</li>
    <li><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.show()</code>: Perintah wajib untuk merender dan menampilkan seluruh bingkai grafik ke layar.</li>
  </ul>
</div>`,
          codeExample: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [10, 20, 30])
plt.title("Grafik Sederhana")
plt.xlabel("Sumbu X")
plt.ylabel("Sumbu Y")
plt.grid(True)
plt.show()`,
          initialCode: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [5, 10, 15, 20]

plt.plot(x, y)

# TODO: Lengkapi konfigurasi grafik di bawah ini
plt.____("Grafik Perkembangan")   # Fungsi Judul
plt.____("Waktu")                 # Fungsi Label Sumbu X
plt.____("Nilai")                 # Fungsi Label Sumbu Y
plt.grid(True)

plt.____()                         # Perintah wajib penampil grafik

print("Konfigurasi grafik selesai!")`,
          solution: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [5, 10, 15, 20]

plt.plot(x, y)

plt.title("Grafik Perkembangan")
plt.xlabel("Waktu")
plt.ylabel("Nilai")
plt.grid(True)

plt.show()

print("Konfigurasi grafik selesai!")`,
          hint: "Ganti garis bawah ____ dengan title, xlabel, ylabel, dan show.",
          quiz: {
            question: "Fungsi Matplotlib manakah yang digunakan untuk memberi nama label pada garis sumbu vertikal (tegak)?",
            options: [
              "plt.xlabel()",
              "plt.ylabel()",
              "plt.title()",
              "plt.grid()"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Konfigurasi grafik selesai!\n",
              description: "Melengkapi judul, label sumbu X/Y, dan plt.show()"
            }
          ]
        },
        {
          id: "py7-l5",
          title: "Visualisasi Grafik Garis - Line Chart (plot)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Grafik garis atau Line Chart dibentuk menggunakan perintah <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.plot(x, y)</code>.</p>
  <p class="mb-4 text-zinc-700 leading-relaxed">Grafik ini paling optimal diterapkan untuk memvisualisasikan kumpulan data berkelanjutan (kontinu) untuk melacak <strong>tren pergerakan nilai seiring waktu</strong> (deret waktu).</p>
</div>`,
          codeExample: `import matplotlib.pyplot as plt

bulan = ["Jan", "Feb", "Mar", "Apr"]
penjualan = [10, 25, 18, 30]

plt.plot(bulan, penjualan, marker='o', color='maroon')
plt.title("Tren Penjualan Bulanan")
plt.show()`,
          initialCode: `import matplotlib.pyplot as plt

hari = ["Sen", "Sel", "Rab", "Kam", "Jum"]
suhu = [28, 29, 31, 30, 32]

# TODO: Gunakan fungsi plot() untuk membuat grafik garis
plt.____(hari, suhu, color='blue')
plt.title("Tren Suhu Harian")

plt.show()
print("Line chart berhasil dibuat!")`,
          solution: `import matplotlib.pyplot as plt

hari = ["Sen", "Sel", "Rab", "Kam", "Jum"]
suhu = [28, 29, 31, 30, 32]

plt.plot(hari, suhu, color='blue')
plt.title("Tren Suhu Harian")

plt.show()
print("Line chart berhasil dibuat!")`,
          hint: "Ganti garis bawah ____ dengan plot.",
          quiz: {
            question: "Fungsi Matplotlib manakah yang digunakan untuk membuat grafik garis (line chart)?",
            options: [
              "plt.bar()",
              "plt.plot()",
              "plt.pie()",
              "plt.scatter()"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Line chart berhasil dibuat!\n",
              description: "Membuat Grafik Garis (Line Chart) dengan plt.plot()"
            }
          ]
        },
        {
          id: "py7-l6",
          title: "Visualisasi Grafik Batang - Bar Chart (bar)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Grafik batang atau Bar Chart dibuat menggunakan fungsi <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.bar(kategori, nilai)</code>.</p>
  <p class="mb-4 text-zinc-700 leading-relaxed">Plot pilar ini biasa diandalkan dalam skenario penganalisisan komparatif antar kategori (diskrit) untuk <strong>membandingkan kuantitas dari setiap kelompok variabel</strong>.</p>
</div>`,
          codeExample: `import matplotlib.pyplot as plt

produk = ["Laptop", "Mouse", "Keyboard"]
stok = [15, 50, 30]

plt.bar(produk, stok, color='maroon')
plt.title("Stok Produk")
plt.show()`,
          initialCode: `import matplotlib.pyplot as plt

buah = ["Apel", "Jeruk", "Mangga"]
jumlah = [40, 60, 35]

# TODO: Gunakan fungsi bar() untuk membuat grafik batang
plt.____(buah, jumlah, color='orange')
plt.title("Penjualan Buah")

plt.show()
print("Bar chart berhasil dibuat!")`,
          solution: `import matplotlib.pyplot as plt

buah = ["Apel", "Jeruk", "Mangga"]
jumlah = [40, 60, 35]

plt.bar(buah, jumlah, color='orange')
plt.title("Penjualan Buah")

plt.show()
print("Bar chart berhasil dibuat!")`,
          hint: "Ganti garis bawah ____ dengan bar.",
          quiz: {
            question: "Kapan penggunaan grafik batang (bar chart) paling tepat diterapkan?",
            options: [
              "Membandingkan kuantitas antar kategori diskrit",
              "Melacak tren kontinu deret waktu",
              "Membagi interval kuartil data",
              "Menghitung varians sampel"
            ],
            correctAnswer: 0
          },
          testCases: [
            {
              expectedOutput: "Bar chart berhasil dibuat!\n",
              description: "Membuat Grafik Batang (Bar Chart) dengan plt.bar()"
            }
          ]
        },
        {
          id: "py7-l7",
          title: "Visualisasi Grafik Lingkaran - Pie Chart (pie)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Grafik lingkaran atau Pie Chart dibuat menggunakan fungsi <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.pie(nilai, labels=kategori)</code>.</p>
  <p class="mb-4 text-zinc-700 leading-relaxed">Visualisasi sirkuler ini digunakan untuk menampilkan <strong>proporsi relatif atau persentase pecahan kategori</strong> dari suatu total nilai populasi.</p>
</div>`,
          codeExample: `import matplotlib.pyplot as plt

kategori = ["Pendidikan", "Kesehatan", "Transportasi"]
pengeluaran = [40, 35, 25]

plt.pie(pengeluaran, labels=kategori, autopct='%1.1f%%')
plt.title("Proporsi Pengeluaran")
plt.show()`,
          initialCode: `import matplotlib.pyplot as plt

bahasa = ["Python", "C", "Java", "JS"]
porsi = [40, 25, 20, 15]

# TODO: Gunakan fungsi pie() untuk membuat grafik lingkaran
plt.____(porsi, labels=bahasa, autopct='%1.1f%%')
plt.title("Bahasa Pemrograman Populer")

plt.show()
print("Pie chart berhasil dibuat!")`,
          solution: `import matplotlib.pyplot as plt

bahasa = ["Python", "C", "Java", "JS"]
porsi = [40, 25, 20, 15]

plt.pie(porsi, labels=bahasa, autopct='%1.1f%%')
plt.title("Bahasa Pemrograman Populer")

plt.show()
print("Pie chart berhasil dibuat!")`,
          hint: "Ganti garis bawah ____ dengan pie.",
          quiz: {
            question: "Fungsi Matplotlib manakah yang digunakan untuk membuat grafik lingkaran (pie chart)?",
            options: [
              "plt.circle()",
              "plt.pie()",
              "plt.bar()",
              "plt.scatter()"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Pie chart berhasil dibuat!\n",
              description: "Membuat Grafik Lingkaran (Pie Chart) dengan plt.pie()"
            }
          ]
        },
        {
          id: "py7-l8",
          title: "Visualisasi Diagram Pencar - Scatter Plot (scatter)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Diagram pencar atau Scatter Plot dibangun menggunakan fungsi <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.scatter(x, y)</code>.</p>
  <p class="mb-4 text-zinc-700 leading-relaxed">Grafik ini menampilkan sebaran titik koordinat data mentah yang independen pada pertemuan sumbu X dan Y. Sangat berguna untuk membuktikan ada/tidaknya <strong>korelasi empiris antar dua variabel</strong>.</p>
</div>`,
          codeExample: `import matplotlib.pyplot as plt

jam_belajar = [1, 2, 3, 4, 5]
nilai_ujian = [55, 60, 75, 80, 95]

plt.scatter(jam_belajar, nilai_ujian, color='blue', marker='o')
plt.title("Hubungan Jam Belajar vs Nilai Ujian")
plt.xlabel("Jam Belajar")
plt.ylabel("Nilai Ujian")
plt.show()`,
          initialCode: `import matplotlib.pyplot as plt

x = [2, 4, 6, 8, 10]
y = [10, 25, 45, 65, 85]

# TODO: Gunakan fungsi scatter() untuk membuat diagram pencar
plt.____(x, y, color='green')
plt.title("Scatter Plot Korelasi")

plt.show()
print("Scatter plot berhasil dibuat!")`,
          solution: `import matplotlib.pyplot as plt

x = [2, 4, 6, 8, 10]
y = [10, 25, 45, 65, 85]

plt.scatter(x, y, color='green')
plt.title("Scatter Plot Korelasi")

plt.show()
print("Scatter plot berhasil dibuat!")`,
          hint: "Ganti garis bawah ____ dengan scatter.",
          quiz: {
            question: "Fungsi visualisasi Matplotlib apakah yang paling tepat untuk membuktikan ada atau tidaknya korelasi antar dua variabel independen?",
            options: [
              "plt.hist()",
              "plt.scatter()",
              "plt.bar()",
              "plt.pie()"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Scatter plot berhasil dibuat!\n",
              description: "Membuat Diagram Pencar (Scatter Plot) dengan plt.scatter()"
            }
          ]
        },
        {
          id: "py7-l9",
          title: "Distribusi Frekuensi dengan Histogram (hist)",
          explanation: `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Histogram dibentuk menggunakan fungsi <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">plt.hist(data, bins=n)</code>.</p>
  <p class="mb-4 text-zinc-700 leading-relaxed">Histogram menerapkan kalkulasi internal untuk meringkas distribusi himpunan numerik dengan cara menyortirnya dalam rentang selang tertentu (<em>bins/interval</em>) lalu menggambarkan frekuensi volumenya secara berurutan tanpa celah spasi antar batang.</p>
</div>`,
          codeExample: `import matplotlib.pyplot as plt

usia = [18, 19, 19, 20, 20, 20, 21, 21, 22, 23, 25, 25, 30]

plt.hist(usia, bins=5, color='green', edgecolor='black')
plt.title("Distribusi Usia Pengguna")
plt.xlabel("Rentang Usia")
plt.ylabel("Frekuensi")
plt.show()`,
          initialCode: `import matplotlib.pyplot as plt

skor = [65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]

# TODO: Gunakan fungsi hist() untuk membuat histogram
plt.____(skor, bins=4, color='purple', edgecolor='black')
plt.title("Distribusi Skor Ujian")

plt.show()
print("Histogram berhasil dibuat!")`,
          solution: `import matplotlib.pyplot as plt

skor = [65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]

plt.hist(skor, bins=4, color='purple', edgecolor='black')
plt.title("Distribusi Skor Ujian")

plt.show()
print("Histogram berhasil dibuat!")`,
          hint: "Ganti garis bawah ____ dengan hist.",
          quiz: {
            question: "Apakah nama interval selang pengelompokan rentang data numerik pada grafik Histogram?",
            options: [
              "Labels",
              "Bins",
              "Grid",
              "Ticks"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Histogram berhasil dibuat!\n",
              description: "Membuat Histogram sebaran frekuensi dengan plt.hist()"
            }
          ]
        }
      ]
    }
  ]
};

async function addLevel7() {
  console.log("🚀 Seed Script: Adding Level 7 with Kode Rumpang and 6 Dedicated Chart Lessons...");

  // 1. Load current static curriculum
  const curriculumPath = path.resolve(process.cwd(), 'src/data/curriculum.ts');
  const { curriculum } = await import('../src/data/curriculum');

  // Filter out existing Level 7 if re-running
  const filteredCurriculum = curriculum.filter(lvl => lvl.id !== 'py-level-7');
  filteredCurriculum.push(level7Data);

  // Write updated curriculum.ts
  const codeContent = `// Auto-generated curriculum file with Level 7
export interface ValidationRule {
  pattern: string;
  message: string;
  shouldExist: boolean;
  flags?: string;
  stripStrings?: boolean;
  presetId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  codeExample: string;
  initialCode: string;
  solution: string;
  hint: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  testCases: {
    input?: string;
    expectedOutput: string;
    description: string;
  }[];
  validationRules?: ValidationRule[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  title: string;
  description: string;
  locked?: boolean;
  accessMode?: 'auto' | 'unlocked' | 'locked'; 
  modules: Module[];
}

export const curriculum: Level[] = ${JSON.stringify(filteredCurriculum, null, 2)};
`;

  fs.writeFileSync(curriculumPath, codeContent, 'utf8');
  console.log(`✅ Updated ${curriculumPath} with Level 7!`);

  // Count totals
  let totalModules = 0;
  let totalLessons = 0;
  filteredCurriculum.forEach(lvl => {
    (lvl.modules || []).forEach(m => {
      totalModules++;
      totalLessons += (m.lessons || []).length;
    });
  });
  console.log(`📊 Local Curriculum Totals -> Levels: ${filteredCurriculum.length}, Subbab (Modules): ${totalModules}, Pelajaran (Lessons): ${totalLessons}`);

  // 2. Sync to Supabase Production Database if credentials available
  if (url && key) {
    console.log("☁️ Syncing Level 7 to Supabase Database...");
    const supabase = createClient(url, key);

    // Upsert Level
    const { error: lvlErr } = await supabase.from('levels').upsert({
      id: level7Data.id,
      title: level7Data.title,
      description: level7Data.description,
      access_mode: level7Data.accessMode || 'auto',
      locked: level7Data.locked || false,
      sort_order: 6
    });

    if (lvlErr) console.error("❌ Level Upsert Error:", lvlErr);

    // Upsert Modules & Lessons
    for (let mIdx = 0; mIdx < level7Data.modules.length; mIdx++) {
      const mod = level7Data.modules[mIdx];
      const { error: modErr } = await supabase.from('modules').upsert({
        id: mod.id,
        level_id: level7Data.id,
        title: mod.title,
        sort_order: mIdx
      });

      if (modErr) console.error(`❌ Module ${mod.id} Upsert Error:`, modErr);

      for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
        const les = mod.lessons[lIdx];
        
        // Upsert to lessons (staff view)
        const { error: lesErr } = await supabase.from('lessons').upsert({
          id: les.id,
          module_id: mod.id,
          title: les.title,
          explanation: les.explanation,
          code_example: les.codeExample,
          initial_code: les.initialCode,
          solution: les.solution,
          hint: les.hint,
          quiz: les.quiz,
          test_cases: les.testCases,
          sort_order: lIdx
        });
        if (lesErr) console.error(`❌ Lesson ${les.id} Upsert Error:`, lesErr);

        // Upsert to student_lessons (student view)
        const { error: sLesErr } = await supabase.from('student_lessons').upsert({
          id: les.id,
          module_id: mod.id,
          title: les.title,
          explanation: les.explanation,
          code_example: les.codeExample,
          initial_code: les.initialCode,
          hint: les.hint,
          quiz: les.quiz,
          test_cases: les.testCases,
          sort_order: lIdx
        });
        if (sLesErr) console.error(`❌ Student Lesson ${les.id} Upsert Error:`, sLesErr);
      }
    }

    console.log("🎉 Level 7 successfully synced to Supabase Database!");
  }
}

addLevel7();
