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

export const curriculum: Level[] = [
  {
    id: "c-level-1",
    title: "DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C",
    description: "Memahami alur flowchart, struktur penulisan program C, tipe data dasar, konstanta, input/output dasar, dan operator.",
    modules: [
      {
        id: "c1-m1",
        title: "Logika Flowchart & Struktur C",
        lessons: [
          {
            id: "c1-l1",
            title: "Logika & Flowchart",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Algoritma adalah urutan langkah logis untuk menyelesaikan masalah.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sebelum diubah menjadi kode program Bahasa C, alur logika ini biasanya divisualisasikan menggunakan <strong>Flowchart</strong> (Bagan Alir).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Simbol-simbol utama dalam flowchart meliputi:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Oval (Terminal)</strong>: Titik awal (Start) atau akhir (End) program.</li>\n  <li><strong>Persegi Panjang (Process)</strong>: Proses pengolahan data atau perhitungan rumus.</li>\n  <li><strong>Belah Ketupat (Decision)</strong>: Percabangan kondisi (Yes/No).</li>\n  <li><strong>Jajar Genjang (Input/Output)</strong>: Pembacaan data masukan atau pencetakan keluaran.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>// Contoh flowchart algoritma kehidupan nyata:\n1. Start (Mulai)\n2. Masukkan air &amp; kopi (Input)\n3. Panaskan air (Process)\n4. Kopi siap (Output)\n5. End (Selesai)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ cat algoritma.txt</span>\n            <span class=\"block mt-1 text-zinc-100\">1. Start\n2. Masukkan air & kopi\n3. Panaskan air\n4. Kopi siap\n5. End</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "// Contoh implementasi langkah Flowchart:\n// 1. Start\n// 2. Masukkan air & kopi\n// 3. Panaskan air\n// 4. Kopi siap\n// 5. End",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Tulis print simulasi langkah Flowchart: \"1. Start\\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    printf(\"1. Start\\n\");\n    return 0;\n}",
            hint: "Ketik printf(\"1. Start\\n\");",
            quiz: {
              question: "Simbol belah ketupat dalam diagram flowchart melambangkan apa?",
              options: [
                "Terminal (Awal/Akhir)",
                "Proses Perhitungan",
                "Keputusan/Kondisi (Decision)",
                "Input/Output"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "1. Start\n",
                description: "Cetak 1. Start"
              }
            ]
          },
          {
            id: "c1-l2",
            title: "Struktur Program & Header C",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur dasar program C terdiri dari header dan fungsi utama.</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>#include <stdio.h></strong> adalah bagian yang berfungsi mengimpor fungsi standard input-output (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf</code>).</li>\n  <li><strong>int main()</strong> adalah entry point utama tempat jalannya program pertama kali.</li>\n  <li><strong>return 0;</strong> menandakan akhir program ditutup secara wajar.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap instruksi di dalam C wajib diakhiri dengan Titik Koma (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code>)!</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    printf(\"Hallo Semua\\n\");\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Hallo Semua</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    printf(\"Hallo Semua\\n\");\n    return 0;\n}",
            initialCode: "// Lengkapi library header dan fungsi main\n\n    printf(\"Hello World\\n\");\n    return 0;\n}",
            solution: "#include <stdio.h>\nint main() {\n    printf(\"Hello World\\n\");\n    return 0;\n}",
            hint: "Tulis #include <stdio.h> dan int main() {",
            quiz: {
              question: "File header stdio.h di bahasa C digunakan untuk apa?",
              options: [
                "Operasi Matematika Pow/Sin/Cos",
                "Standard Input/Output (seperti printf dan scanf)",
                "Manipulasi String",
                "Struktur data dinamis"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Hello World\n",
                description: "Cetak Hello World"
              }
            ],
            validationRules: [
              {
                pattern: ";",
                message: "Setiap statement wajib diakhiri titik koma",
                shouldExist: true
              },
              {
                pattern: "main",
                message: "Harus mendeteksi fungsi main()",
                shouldExist: true
              },
              {
                pattern: "#include\\s*<stdio.h>",
                message: "Wajib menyertakan library stdio.h",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "c1-m2",
        title: "Tipe Data, Variabel & Konstanta",
        lessons: [
          {
            id: "c1-l3",
            title: "Tipe Data Dasar & Pengaturan Desimal",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Bahasa C mendukung beberapa tipe data dasar:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>char</strong>: Karakter tunggal (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'A'</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'B'</code> dll, format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%c</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%s</code> untuk teks).</li>\n  <li><strong>int</strong>: Bilangan bulat (format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%d</code> / <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%i</code>).</li>\n  <li><strong>float</strong>: Pecahan (desimal, format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code>).</li>\n  <li><strong>double</strong>: Pecahan presisi ganda (format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%lf</code>).</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pengaturan cetak desimal menggunakan format <strong>%m.nf</strong> di mana <strong>n</strong> menyatakan batas maksimum digit di belakang koma (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%.2f</code> membatasi pecahan hingga 2 angka).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    printf(\"%4.2f\\n\", 3.5);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">3.50</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    printf(\"%4.2f\\n\", 3.5);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Cetak angka desimal 3.5 dibatasi 2 angka di belakang koma\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    printf(\"%.2f\\n\", 3.5);\n    return 0;\n}",
            hint: "Gunakan format %.2f di dalam printf",
            quiz: {
              question: "Berapa jumlah digit di belakang koma yang dicetak jika menggunakan format %4.2f pada angka 3.5?",
              options: [
                "4 digit",
                "2 digit",
                "1 digit",
                "Semua digit"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "3.50\n",
                description: "Cetak desimal dengan 2 angka belakang koma"
              }
            ]
          },
          {
            id: "c1-l4",
            title: "Deklarasi Konstanta",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Konstanta adalah penampung data yang nilainya <strong>tetap</strong> dan tidak dapat dirubah setelah diinisialisasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dalam bahasa C, konstanta dapat dibuat menggunakan:</p>\n<ol class=\"list-decimal pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>#define</strong>: Deklarasi preprocessor di luar fungsi main (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define PHI 3.14</code>).</li>\n  <li><strong>const</strong>: Deklarasi variabel konstan menggunakan tipe data (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const float PI = 3.14;</code>).</li>\n</ol>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n#define PHI 3.14\n\nint main() {\n    printf(\"Konstanta PHI: %.2f\\n\", PHI);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Konstanta PHI: 3.14</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n#define PHI 3.14\n\nint main() {\n    printf(\"Konstanta PHI: %.2f\\n\", PHI);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n// Deklarasikan PHI bernilai 3.14 menggunakan preprocessor #define\n\nint main() {\n    printf(\"PHI: %.2f\\n\", PHI);\n    return 0;\n}",
            solution: "#include <stdio.h>\n#define PHI 3.14\n\nint main() {\n    printf(\"PHI: %.2f\\n\", PHI);\n    return 0;\n}",
            hint: "Tulis #define PHI 3.14 di paling atas program",
            quiz: {
              question: "Manakah dari sifat berikut yang membedakan Konstanta dari Variabel biasa?",
              options: [
                "Konstanta memerlukan RAM 10x lebih banyak",
                "Nilai konstanta bersifat mutlak/tetap dan tidak dapat dimodifikasi selama runtime",
                "Konstanta hanya dapat digunakan dalam file header",
                "Konstanta tidak memiliki tipe data"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "PHI: 3.14\n",
                description: "Cetak konstanta PHI"
              }
            ],
            validationRules: [
              {
                pattern: "#define\\s+PHI\\s+3\\.14|const\\s+float\\s+PHI\\s*=\\s*3\\.14",
                message: "Gunakan #define PHI 3.14 atau const float PHI = 3.14",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "c1-m3",
        title: "Fungsi I/O Lengkap & Operator",
        lessons: [
          {
            id: "c1-l5",
            title: "Memasukkan Data (scanf, gets, getchar, getch)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Bahasa C memiliki beberapa fungsi untuk membaca masukan:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>scanf()</strong>: Membaca input terformat. Menggunakan operator alamat <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code> untuk mereferensikan variabel tujuan (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&usia</code>).</li>\n  <li><strong>gets()</strong>: Membaca satu baris string utuh beserta spasi hingga tombol Enter ditekan.</li>\n  <li><strong>getchar()</strong>: Membaca karakter tunggal.</li>\n  <li><strong>getch()</strong>: Membaca input karakter tanpa menampilkannya ke layar (biasa untuk sandi/password).</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char nama[50];\n    printf(\"Ketik nama: \");\n    scanf(\"%[^\\n]\", nama);\n    printf(\"Nama: %s\\n\", nama);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Ketik nama: Budi Santoso\nNama: Budi Santoso</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf(\"Ketik nama: \");\n    scanf(\"%[^\\n]\", nama);\n    printf(\"Nama: %s\\n\", nama);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf(\"Ketik nama: \");\n    // Gunakan scanf untuk membaca input berspasi %[^\n]\n    \n    printf(\"Nama: %s\\n\", nama);\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf(\"Ketik nama: \");\n    scanf(\"%[^\\n]\", nama);\n    printf(\"Nama: %s\\n\", nama);\n    return 0;\n}",
            hint: "Tulis scanf(\"%[^\\n]\", nama);",
            quiz: {
              question: "Operator alamat manakah yang wajib disertakan pada argumen variabel target di fungsi scanf()?",
              options: [
                "Operator Bintang (*)",
                "Operator Ampersand (&)",
                "Operator Persen (%)",
                "Operator Tilde (~)"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                input: "Budi Santoso",
                expectedOutput: "Ketik nama: Nama: Budi Santoso\n",
                description: "Membaca nama berspasi"
              }
            ],
            validationRules: [
              {
                pattern: "scanf\\s*\\(\\s*[\"'].*[\"']\\s*,\\s*&?nama\\s*\\)",
                message: "Gunakan scanf dengan parameter nama",
                shouldExist: true
              }
            ]
          },
          {
            id: "c1-l6",
            title: "Menampilkan Data (printf, puts, putchar)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi untuk menampilkan keluaran di C:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>printf()</strong>: Sangat fleksibel, mencetak teks terformat tetapi tidak otomatis berganti baris.</li>\n  <li><strong>puts()</strong>: Hanya mencetak string dan otomatis menambahkan baris baru (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code>) di ujung keluaran.</li>\n  <li><strong>putchar()</strong>: Mencetak satu karakter saja ke layar.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    puts(\"Halo Dunia\");\n    putchar('Z');\n    putchar('\\n');\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo Dunia\nZ</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    puts(\"Halo Dunia\");\n    putchar('Z');\n    putchar('\\n');\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Gunakan puts() untuk mencetak teks \"Halo Dunia\"\n    // Gunakan putchar() untuk mencetak karakter tunggal 'Z'\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    puts(\"Halo Dunia\");\n    putchar('Z');\n    putchar('\\n');\n    return 0;\n}",
            hint: "Tulis puts(\"Halo Dunia\"); dilanjutkan putchar('Z');",
            quiz: {
              question: "Apakah keuntungan utama menggunakan fungsi puts() dibanding printf()?",
              options: [
                "Dapat memproses kalkulasi matematika",
                "Otomatis mencetak baris baru (newline) di akhir output",
                "Mendukung format pecahan %f",
                "Program berjalan 2x lebih cepat"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Halo Dunia\nZ\n",
                description: "Pencetakan puts dan putchar"
              }
            ]
          },
          {
            id: "c1-l7",
            title: "Operator Unary, Aritmatika & Logika",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator di C meliputi:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Unary</strong>: Pre-increment (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">++x</code>, nilai diubah sebelum dibaca) vs Post-increment (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x++</code>, nilai dibaca baru diubah).</li>\n  <li><strong>Aritmatika</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code> (Modulo/sisa pembagian).</li>\n  <li><strong>Relasi & Logika</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code> (AND), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code> (OR), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> (NOT).</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int a = 10 % 3;\n    int x = 5;\n    printf(\"Modulo: %d, ++x: %d\\n\", a, ++x);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Modulo: 1, ++x: 6</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int a = 10 % 3;\n    int x = 5;\n    printf(\"Modulo: %d, ++x: %d\\n\", a, ++x);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Tampilkan hasil modulo 10 % 3 dan pre-increment ++x (nilai awal x = 5)\n    int x = 5;\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    printf(\"Modulo: %d, ++x: %d\\n\", 10 % 3, ++x);\n    return 0;\n}",
            hint: "Tulis modulo 10 % 3 dan ++x dalam satu printf",
            quiz: {
              question: "Berapakah sisa pembagian dari operasi modulo 10 % 3?",
              options: [
                "3",
                "1",
                "0",
                "3.33"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Modulo: 1, ++x: 6\n",
                description: "Output modulo & pre-increment C"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c-level-2",
    title: "STRUKTUR KONTROL DALAM BAHASA C",
    description: "Mengatur alur kontrol program menggunakan percabangan (if-else), switch-case, loop (while, for), dan jumps.",
    modules: [
      {
        id: "c2-m1",
        title: "Percabangan (Decisions)",
        lessons: [
          {
            id: "c2-l1",
            title: "Kontrol Kondisi (If & If-Else)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan memandu rute program berdasarkan kebenaran suatu kondisi.</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>if</strong>: Menjalankan blok jika kondisi True.</li>\n  <li><strong>else</strong>: Blok alternatif bila kondisi False.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><em>Penting</em>: Jangan menaruh titik koma tepat setelah tanda kurung kondisi if (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if(x > 0);</code>). Hal ini akan dianggap sebagai statement kosong dan blok di bawahnya akan dieksekusi tanpa mempedulikan kondisi!</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int x = 10;\n    if (x &gt; 0) {\n        printf(\"Positif\\n\");\n    } else {\n        printf(\"Negatif\\n\");\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Positif</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    if (x > 0) {\n        printf(\"Positif\\n\");\n    } else {\n        printf(\"Negatif\\n\");\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int x = -5;\n    // Cek jika x > 0 cetak \"Positif\", jika tidak cetak \"Negatif\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int x = -5;\n    if (x > 0) {\n        printf(\"Positif\\n\");\n    } else {\n        printf(\"Negatif\\n\");\n    }\n    return 0;\n}",
            hint: "Gunakan struktur: if (x > 0) { ... } else { ... }",
            quiz: {
              question: "Apa yang terjadi jika Anda meletakkan semicolon setelah kurung kondisi if, seperti: if (x > 10); ?",
              options: [
                "Program langsung mematikan PC",
                "Semicolon membatalkan seleksi kondisi sehingga baris berikutnya selalu jalan",
                "Kompiler langsung melempar Syntax Error",
                "Program berjalan 2x lebih lambat"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Negatif\n",
                description: "Cek bilangan negatif"
              }
            ]
          },
          {
            id: "c2-l2",
            title: "Percabangan Bertingkat (If-Else If-Else)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Ketika ada lebih dari dua rute keputusan, gunakan <strong>else if</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Kondisi dievaluasi dari atas ke bawah secara berantai. Ranting pertama yang memicu True akan dijalankan dan seluruh ranting di bawahnya dilewati otomatis.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><em>Praktik Baik</em>: Tempatkan kondisi dengan syarat paling ketat/berat di bagian paling atas untuk menghindari bypass kondisi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int skor = 85;\n    if (skor &gt;= 90) {\n        printf(\"A\\n\");\n    } else if (skor &gt;= 80) {\n        printf(\"B\\n\");\n    } else {\n        printf(\"C\\n\");\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">B</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int skor = 85;\n    if (skor >= 90) {\n        printf(\"A\\n\");\n    } else if (skor >= 80) {\n        printf(\"B\\n\");\n    } else {\n        printf(\"C\\n\");\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int skor = 75;\n    // Cek beranting: >= 90 (A), >= 80 (B), selain itu (C)\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int skor = 75;\n    if (skor >= 90) {\n        printf(\"A\\n\");\n    } else if (skor >= 80) {\n        printf(\"B\\n\");\n    } else {\n        printf(\"C\\n\");\n    }\n    return 0;\n}",
            hint: "Tulis ranting if (skor >= 90) ... else if (skor >= 80) ... else ...",
            quiz: {
              question: "Pada rangkaian if-else if bertingkat, ranting manakah yang akan dieksekusi jika kondisi teratas sudah terpenuhi (True)?",
              options: [
                "Semua ranting di bawahnya ikut dieksekusi",
                "Hanya ranting teratas saja, sisa ranting bawahnya dilewati otomatis",
                "Hanya ranting else di paling akhir",
                "Kompiler crash"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "C\n",
                description: "Skor 75 bernilai C"
              }
            ]
          },
          {
            id: "c2-l3",
            title: "Pilihan Konstan (Switch-Case)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Switch-case memandu pemilihan berdasarkan nilai konstan (integer atau char).</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>case [nilai]:</strong> Menandakan target nilai.</li>\n  <li><strong>break;</strong> Wajib digunakan untuk mengakhiri case. Jika lupa, eksekusi akan merembes ke case bawahnya (<strong>Fallthrough</strong>).</li>\n  <li><strong>default:</strong> Berperan seperti else (tong sampah akhir jika tidak ada case yang cocok).</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char op = '+';\n    switch(op) {\n        case '+':\n            printf(\"Tambah\\n\");\n            break;\n        default:\n            printf(\"Default\\n\");\n            break;\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Tambah</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    char op = '+';\n    switch(op) {\n        case '+':\n            printf(\"Tambah\\n\");\n            break;\n        default:\n            printf(\"Default\\n\");\n            break;\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    char op = '-';\n    // Buat switch untuk op, case '+': cetak \"Tambah\n\", case '-': cetak \"Kurang\n\", default: \"Default\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    char op = '-';\n    switch(op) {\n        case '+': printf(\"Tambah\\n\"); break;\n        case '-': printf(\"Kurang\\n\"); break;\n        default: printf(\"Default\\n\"); break;\n    }\n    return 0;\n}",
            hint: "Tulis switch(op) { case '+': ... break; case '-': ... break; default: ... }",
            quiz: {
              question: "Apakah fenomena yang terjadi jika Anda lupa meletakkan perintah break; di setiap akhir blok case pada switch-case?",
              options: [
                "Kompiler langsung melemparkan Syntax Error",
                "Program memicu infinite loop",
                "Terjadi Fallthrough, di mana case di bawahnya langsung kesapu ikut berjalan",
                "Data memory leak"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Kurang\n",
                description: "Operasi kurang switch case"
              }
            ],
            validationRules: [
              {
                pattern: "switch\\s*\\(",
                message: "Gunakan keyword switch",
                shouldExist: true
              },
              {
                pattern: "break\\s*;",
                message: "Sertakan perintah break;",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "c2-m2",
        title: "Perulangan & Peloncatan (Loops & Jumps)",
        lessons: [
          {
            id: "c2-l4",
            title: "Perulangan Bersyarat (While & Do-While)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan berdasarkan kondisi boolean:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>while</strong>: Evaluasi kondisi di awal. Jika kondisi awal False, blok loop tidak akan pernah dieksekusi.</li>\n  <li><strong>do-while</strong>: Evaluasi di akhir. Menjamin blok kode di atasnya dijalankan <strong>minimal 1 kali</strong> sebelum pengecekan kondisi.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int x = 3;\n    do {\n        printf(\"%d\\n\", x);\n        x--;\n    } while (x &gt; 0);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">3\n2\n1</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int x = 3;\n    do {\n        printf(\"%d\\n\", x);\n        x--;\n    } while (x > 0);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int x = 2;\n    // Gunakan do-while untuk mencetak nilai x kemudian kurangi x-- selama x > 0\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int x = 2;\n    do {\n        printf(\"%d\\n\", x);\n        x--;\n    } while (x > 0);\n    return 0;\n}",
            hint: "Ketik do { printf(\"%d\\n\", x); x--; } while(x > 0);",
            quiz: {
              question: "Di manakah letak pengecekan kondisi pada struktur perulangan do-while?",
              options: [
                "Di paling awal sebelum blok dimulai",
                "Di dalam library header",
                "Di paling akhir setelah tanda kurung penutup blok",
                "Tidak memiliki pengecekan kondisi"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "2\n1\n",
                description: "Perulangan do-while mundur"
              }
            ]
          },
          {
            id: "c2-l5",
            title: "Perulangan Pasti (For Loop)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">For loop mengendalikan iterasi terukur dalam 3 bagian instrumen utama:</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for (inisialisasi; kondisi_batas; step) { ... }</code></p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Inisialisasi</strong>: Set nilai awal variabel pencatat.</li>\n  <li><strong>Kondisi batas</strong>: Loop berputar selama kondisi bernilai True.</li>\n  <li><strong>Step</strong>: Modifikasi pencatat (increment/decrement) di akhir setiap putaran.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 3; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">1\n2\n3</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Bikin for loop untuk mencetak angka 1 s.d. 3 secara berurutan\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            hint: "Tulis for (int i = 1; i <= 3; i++) { printf(\"%d\\n\", i); }",
            quiz: {
              question: "Simbol pemisah apakah yang digunakan di dalam kurung parameter loop for?",
              options: [
                "Koma (,)",
                "Titik Dua (:)",
                "Titik Koma (;)",
                "Persen (%)"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "1\n2\n3\n",
                description: "For loop 1-3"
              }
            ]
          },
          {
            id: "c2-l6",
            title: "Statemen Peloncatan (goto, break, continue)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Instruksi pelompatan alur:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>break</strong>: Keluar dari loop saat itu juga.</li>\n  <li><strong>continue</strong>: Melewati sisa baris kode loop saat itu dan langsung melompat ke putaran berikutnya.</li>\n  <li><strong>goto [label];</strong>: Melompat langsung ke label tertentu di dalam fungsi. <em>Sangat dihindari</em> karena merusak struktur program.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 5; i++) {\n        if (i % 2 == 0) continue;\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">1\n3\n5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0) continue;\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        // Lewati cetakan jika i bernilai 2 menggunakan continue\n        \n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        if (i == 2) continue;\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            hint: "Bikin if (i == 2) continue; sebelum printf",
            quiz: {
              question: "Mengapa penggunaan goto sangat dihindari dalam pemrograman modern (Clean Code)?",
              options: [
                "Membuat ukuran file compile menjadi 10x lebih besar",
                "Memicu spaghetti code yang sangat sulit dibaca dan dilacak alurnya",
                "Menghapus memori RAM secara permanen",
                "Hanya bisa jalan di OS lama"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "1\n3\n",
                description: "Melompati angka 2"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c-level-3",
    title: "ARRAY, STRUCT, DAN OPERASI FILE (C)",
    description: "Membahas array dimensi banyak, string C purba, arsitektur composite Struct, dan pengarsipan stream File I/O.",
    modules: [
      {
        id: "c3-m1",
        title: "Array Dimensi Banyak",
        lessons: [
          {
            id: "c3-l1",
            title: "Array Satu Dimensi & Karakter Array",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Array adalah koleksi data bertipe homogen yang diletakkan pada memori berurutan (kontigu). Indeks array di C selalu dimulai dari <strong>0</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Konsep String C</strong>: C tidak memiliki tipe data string bawaan. String direpresentasikan sebagai array karakter (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char str[10]</code>). String C wajib diakhiri oleh karakter khusus <strong>Null Terminator (\\\\0)</strong> di ujungnya agar kompiler tahu batas akhir string.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char kata[] = {'H', 'a', 'l', 'o', '\\\\0'};\n    printf(\"%s\\n\", kata);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    char kata[] = {'H', 'a', 'l', 'o', '\\\\0'};\n    printf(\"%s\\n\", kata);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Buat array int data berisi {10, 20, 30}\n    // Cetak nilai elemen kedua (indeks 1) menggunakan printf %d\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int data[] = {10, 20, 30};\n    printf(\"%d\\n\", data[1]);\n    return 0;\n}",
            hint: "Akses elemen menggunakan index data[1]",
            quiz: {
              question: "Karakter penanda akhir string (Null Terminator) pada array karakter bahasa C direpresentasikan dengan simbol...",
              options: [
                "\\\\n",
                "\\\\0",
                "%s",
                "#EOF"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "20\n",
                description: "Mengakses indeks ke-1"
              }
            ]
          },
          {
            id: "c3-l2",
            title: "Array Dua Dimensi (Matrix)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Array Dua Dimensi (Matrix) memiliki sumbu baris dan kolom yang merepresentasikan koordinat data.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Format deklarasinya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_data nama_var[baris][kolom];</code></p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mengakses nilainya, letakkan indeks baris diikuti indeks kolom secara spesifik (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">data[0][1]</code> mengambil baris ke-0 pilar ke-1).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    printf(\"Baris 0 Kolom 1: %d\\n\", matrix[0][1]);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Baris 0 Kolom 1: 22</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    printf(\"Baris 0 Kolom 1: %d\\n\", matrix[0][1]);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    // Cetak elemen baris ke-1 kolom ke-0 (nilainya 33)\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    printf(\"%d\\n\", matrix[1][0]);\n    return 0;\n}",
            hint: "Gunakan matrix[1][0] untuk baris 1 kolom 0",
            quiz: {
              question: "Bagaimanakah cara mengakses sel baris pertama (indeks 0) kolom kedua (indeks 1) dari matrix 2D?",
              options: [
                "matrix[0, 1]",
                "matrix[0][1]",
                "matrix[1][0]",
                "matrix[0]->[1]"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "33\n",
                description: "Cetak nilai baris 1 kolom 0"
              }
            ]
          }
        ]
      },
      {
        id: "c3-m2",
        title: "Struct (Object Oriented C)",
        lessons: [
          {
            id: "c3-l3",
            title: "Arsitektur Struct & Dot Operator",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Array hanya bisa menyimpan data yang homogen. Untuk membuat tipe data campuran (heterogen), gunakan <strong>Struct</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struct bertindak sebagai blueprint objek custom. Variabel internal di dalamnya disebut <strong>Field</strong>. Pengaksesan field objek struct dilakukan secara murni menggunakan <strong>Operator Titik (.)</strong>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nstruct Mahasiswa {\n    char nama[20];\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m = {\"Budi\", 3.85};\n    printf(\"%s IPK %.2f\\n\", m.nama, m.ipk);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Budi IPK 3.85</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nstruct Mahasiswa {\n    char nama[20];\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m = {\"Budi\", 3.85};\n    printf(\"%s IPK %.2f\\n\", m.nama, m.ipk);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nstruct Mahasiswa {\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m;\n    // Set field ipk milik m ke nilai 3.50, lalu cetak nilainya dengan %.2f\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nstruct Mahasiswa {\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m;\n    m.ipk = 3.50;\n    printf(\"%.2f\\n\", m.ipk);\n    return 0;\n}",
            hint: "Tulis m.ipk = 3.50; lalu panggil di printf",
            quiz: {
              question: "Operator apakah yang digunakan untuk menjangkau properti field internal dari sebuah objek struct di C?",
              options: [
                "Tanda Panah (->)",
                "Tanda Dollar ($)",
                "Tanda Titik (.)",
                "Double Ampersand (&&)"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "3.50\n",
                description: "Setting ipk struct"
              }
            ]
          },
          {
            id: "c3-l4",
            title: "Array of Struct",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menampung banyak data objek secara massal, kita dapat menyatukan konsep array dengan struct.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Contoh deklarasi:</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">struct Mahasiswa listMhs[3];</code></p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Ini membuat laci array berkapasitas 3 slot di mana setiap indeks laci menampung data objek dengan field lengkap.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    arr[0].id = 101;\n    printf(\"Node 0: %d\\n\", arr[0].id);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Node 0: 101</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    arr[0].id = 101;\n    printf(\"Node 0: %d\\n\", arr[0].id);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    // Set id pada elemen indeks ke-1 menjadi 202, lalu cetak nilainya\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    arr[1].id = 202;\n    printf(\"%d\\n\", arr[1].id);\n    return 0;\n}",
            hint: "Ketik arr[1].id = 202;",
            quiz: {
              question: "Apakah manfaat utama dari implementasi penggabungan Array of Struct?",
              options: [
                "Mempercepat koneksi internet database",
                "Mampu mengoleksi kumpulan data objek massal terstruktur secara rapi dalam indeks memori",
                "Menghapus file secara otomatis",
                "Mencegah syntax error compile"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "202\n",
                description: "Akses array of struct index 1"
              }
            ]
          }
        ]
      },
      {
        id: "c3-m3",
        title: "Operasi File Eksternal (FS Stream)",
        lessons: [
          {
            id: "c3-l5",
            title: "Pointer File & Mode Operasi (r, w, a)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Akses file disk drive di C menggunakan pointer khusus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">FILE *</code> dan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fopen(\"file.txt\", \"mode\")</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sandi perizinan mode file:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>\"r\" (Read)</strong>: Membuka file untuk dibaca (Error jika file fiktif).</li>\n  <li><strong>\"w\" (Write)</strong>: Membuat file baru untuk ditulis. <em>Destruktif</em>: Jika file sudah ada, isinya langsung dihapus total (di-overwrite).</li>\n  <li><strong>\"a\" (Append)</strong>: Menambahkan tulisan di ujung/ekor akhir file.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap file yang dibuka wajib ditutup kembali menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fclose(pointer_file);</code>!</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    FILE *f = fopen(\"test.txt\", \"w\");\n    if (f != NULL) {\n        printf(\"File Terbuka\\n\");\n        fclose(f);\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">File Terbuka</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"test.txt\", \"w\");\n    if (f != NULL) {\n        printf(\"File Terbuka\\n\");\n        fclose(f);\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Buka file \"data.txt\" dengan mode \"w\" menggunakan fopen dan segera tutup dengan fclose\n    FILE *fl;\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    FILE *fl = fopen(\"data.txt\", \"w\");\n    if (fl != NULL) {\n        fclose(fl);\n    }\n    return 0;\n}",
            hint: "Tulis fl = fopen(\"data.txt\", \"w\"); diikuti fclose(fl);",
            quiz: {
              question: "Manakah mode fopen() yang berbahaya bersifat destruktif menghapus seluruh teks lama di file saat dibuka?",
              options: [
                "Mode Read \"r\"",
                "Mode Append \"a\"",
                "Mode Write \"w\"",
                "Mode Read-Write \"+r\""
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "",
                description: "Membuka dan menutup file"
              }
            ],
            validationRules: [
              {
                pattern: "fopen\\s*\\(",
                message: "Panggil fopen()",
                shouldExist: true
              },
              {
                pattern: "fclose\\s*\\(",
                message: "Gunakan fclose()",
                shouldExist: true
              }
            ]
          },
          {
            id: "c3-l6",
            title: "Menulis & Membaca File (fprintf, fputs, fscanf, fgets)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Manipulasi data file:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>fprintf()</strong>: Menulis teks terformat ke file (persis printf tapi argumen pertama adalah pointer file).</li>\n  <li><strong>fputs()</strong>: Menulis string biasa ke file.</li>\n  <li><strong>fgets()</strong>: Membaca data per baris dari file.</li>\n  <li><strong>rewind()</strong>: Mengembalikan posisi kursor pembacaan file kembali ke titik awal.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    FILE *f = fopen(\"data.txt\", \"w\");\n    if (f != NULL) {\n        fprintf(f, \"Nilai: %d\\n\", 100);\n        fclose(f);\n        printf(\"Tersimpan\\n\");\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program && ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Tersimpan</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"data.txt\", \"w\");\n    if (f != NULL) {\n        fprintf(f, \"Nilai: %d\\n\", 100);\n        fclose(f);\n        printf(\"Tersimpan\\n\");\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"data.txt\", \"w\");\n    // Tulis ke file menggunakan fprintf teks \"Skor: 95\n\"\n    if (f != NULL) {\n        \n        fclose(f);\n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"data.txt\", \"w\");\n    if (f != NULL) {\n        fprintf(f, \"Skor: 95\\n\");\n        fclose(f);\n    }\n    return 0;\n}",
            hint: "Tulis fprintf(f, \"Skor: 95\\n\");",
            quiz: {
              question: "Apakah perbedaan utama fungsi fprintf() dibandingkan dengan printf() biasa?",
              options: [
                "fprintf() hanya bisa menulis data numerik pecahan",
                "printf() mencetak ke layar monitor, sedangkan fprintf() menulis output ke stream file eksternal",
                "fprintf() otomatis mengenkripsi data",
                "fprintf() tidak memerlukan format specifier"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "",
                description: "fprintf writing"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "py-level-1",
    title: "PENGENALAN DASAR BAHASA PYTHON",
    description: "Beralih ke sintaksis dinamis Python, pengenalan variabel dynamic typing, boolean case-sensitive, casting, dan I/O.",
    locked: false,
    accessMode: "auto",
    modules: [
      {
        id: "py4-m1",
        title: "Pendahuluan Python",
        lessons: [
          {
            id: "py4-l1",
            title: "Pengenalan Bahasa Python",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python adalah bahasa pemrograman <strong>tingkat tinggi (high-level)</strong> yang dikenal karena sintaksnya yang <strong>sederhana dan mudah dibaca</strong>, hampir seperti bahasa Inggris biasa. Python bersifat <strong>interpreted</strong> — kode dijalankan baris per baris oleh interpreter, <strong>bukan dikompilasi</strong> terlebih dahulu menjadi file <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.exe</code> seperti C. Hal ini membuat Python mudah untuk eksperimen cepat (rapid prototyping), tetapi umumnya lebih lambat dalam eksekusi dibandingkan bahasa terkompilasi seperti C.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python digunakan secara luas untuk berbagai bidang: pengembangan web, data science, machine learning, otomatisasi, dan scripting. Salah satu ciri khas Python adalah <strong>tidak membutuhkan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code></strong> untuk blok kode — sebagai gantinya, Python menggunakan <strong>indentasi (spasi/tab)</strong> untuk menentukan struktur blok. File Python berekstensi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.py</code> dan dijalankan menggunakan perintah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">python nama_file.py</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Program Python pertama\nprint(&quot;Halo, Dunia!&quot;)\nprint(&quot;Selamat belajar Python.&quot;)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Dunia!\nSelamat belajar Python.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Program Python pertama\nprint(\"Halo, Dunia!\")\nprint(\"Selamat belajar Python.\")",
            initialCode: "# Tampilkan tiga baris informasi menggunakan print()\n",
            solution: "print(\"Bahasa: Python\")\nprint(\"Alasan: Mudah dipelajari\")\nprint(\"Target: Membuat program sederhana\")\n",
            hint: "Gunakan `print()` tiga kali, masing-masing untuk satu baris teks.",
            quiz: {
              question: "Bagaimana Python menentukan struktur blok kode (misalnya isi dari sebuah fungsi atau kondisi)?",
              options: [
                "Menggunakan tanda kurung kurawal `{}`",
                "Menggunakan kata kunci `begin` dan `end`",
                "Menggunakan indentasi (spasi/tab)",
                "Menggunakan titik koma di setiap baris"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Bahasa: Python\nAlasan: Mudah dipelajari\nTarget: Membuat program sederhana\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Bahasa: Python[\"']\\s*\\)",
                message: "Tampilkan baris pertama dengan: print(\"Bahasa: Python\")",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Target: Membuat program sederhana[\"']\\s*\\)",
                message: "Tampilkan baris ketiga dengan: print(\"Target: Membuat program sederhana\")",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l2",
            title: "Perbandingan Sintaks Python dan C",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Meskipun konsep dasar pemrograman (variabel, percabangan, perulangan) sama di Python dan C, <strong>sintaksnya sangat berbeda</strong>. Python tidak membutuhkan deklarasi tipe data eksplisit (Python bersifat <strong>dynamically typed</strong>), tidak membutuhkan titik koma di akhir statement, tidak membutuhkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code>, dan tidak membutuhkan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> sebagai titik masuk wajib — kode di luar fungsi dieksekusi langsung dari atas ke bawah.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Aspek</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Bahasa C</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Python</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Deklarasi tipe</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int x = 5;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = 5</code> (tipe otomatis)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Akhir statement</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code> (wajib)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak perlu</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Blok kode</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Indentasi</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Cetak ke layar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%d\", x);</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(x)</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Komentar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">// atau /* */</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Titik masuk</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main() { ... }</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak wajib, jalan dari atas</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Python: tidak perlu tipe data, titik koma, atau main()\nnama = &quot;Andi&quot;\nusia = 20\nprint(&quot;Nama:&quot;, nama)\nprint(&quot;Usia:&quot;, usia)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama: Andi\nUsia: 20</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Python: tidak perlu tipe data, titik koma, atau main()\nnama = \"Andi\"\nusia = 20\nprint(\"Nama:\", nama)\nprint(\"Usia:\", usia)",
            initialCode: "# Kode C: \n# int panjang = 10;\n# int lebar = 4;\n# printf(\"Luas: %d\\n\", panjang * lebar);\n\n# Tulis versi Python-nya di sini\n",
            solution: "panjang = 10\nlebar = 4\nprint(\"Luas:\", panjang * lebar)\n",
            hint: "Python tidak membutuhkan tipe data atau titik koma. Gunakan `print(\"Luas:\", panjang * lebar)`.",
            quiz: {
              question: "Manakah pernyataan yang <strong>benar</strong> mengenai perbedaan Python dan C?",
              options: [
                "Python wajib memiliki fungsi `main()` seperti C",
                "Python membutuhkan tipe data dideklarasikan secara eksplisit seperti C",
                "Python tidak membutuhkan titik koma di akhir statement dan menggunakan indentasi untuk blok kode",
                "C menggunakan indentasi untuk blok kode seperti Python"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Luas: 40\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "panjang\\s*=\\s*10",
                message: "Deklarasikan variabel dengan: panjang = 10 (tanpa tipe data dan titik koma)",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Luas:[\"']\\s*,\\s*panjang\\s*\\*\\s*lebar\\s*\\)",
                message: "Tampilkan hasil dengan: print(\"Luas:\", panjang * lebar)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m2",
        title: "Variabel",
        lessons: [
          {
            id: "py4-l3",
            title: "Ketentuan Deklarasi Variabel",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dengan C, Python <strong>tidak memerlukan deklarasi tipe data</strong> sama sekali — variabel langsung dibuat saat kamu <strong>memberikan nilai pertama kali</strong> menggunakan tanda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code>. Python bersifat <strong>dynamically typed</strong>, artinya tipe data sebuah variabel ditentukan secara otomatis berdasarkan nilai yang diberikan, dan <strong>bisa berubah</strong> di tengah program jika diberi nilai bertipe lain.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Aturan penamaan variabel di Python mirip dengan C: hanya boleh mengandung huruf, angka, dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">_</code>), tidak boleh diawali angka, bersifat <strong>case-sensitive</strong>, dan tidak boleh sama dengan keyword Python (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>, dll). Konvensi penamaan standar Python adalah <strong>snake_case</strong> (huruf kecil dengan garis bawah), sesuai PEP 8 (panduan gaya resmi Python).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Tipe data ditentukan otomatis\nnama = &quot;Budi&quot;      # str (string)\nusia = 20          # int (integer)\ntinggi = 170.5     # float\n\nprint(nama, usia, tinggi)\n\n# Variabel bisa berubah tipe\nnilai = 100        # int\nnilai = &quot;Seratus&quot;  # sekarang jadi str\nprint(nilai)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Budi 20 170.5\nSeratus</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Tipe data ditentukan otomatis\nnama = \"Budi\"      # str (string)\nusia = 20          # int (integer)\ntinggi = 170.5     # float\n\nprint(nama, usia, tinggi)\n\n# Variabel bisa berubah tipe\nnilai = 100        # int\nnilai = \"Seratus\"  # sekarang jadi str\nprint(nilai)",
            initialCode: "kota = \"Surabaya\"\n# Tampilkan \"Kota awal: Surabaya\"\n\n# Ubah nilai kota menjadi \"Jakarta\"\n\n# Tampilkan \"Kota sekarang: Jakarta\"\n",
            solution: "kota = \"Surabaya\"\nprint(\"Kota awal:\", kota)\n\nkota = \"Jakarta\"\nprint(\"Kota sekarang:\", kota)\n",
            hint: "Buat variabel, cetak nilainya, lalu beri nilai baru menggunakan `=` lagi, lalu cetak kembali.",
            quiz: {
              question: "Mengapa Python disebut sebagai bahasa yang <strong>dynamically typed</strong>?",
              options: [
                "Karena Python hanya bisa menyimpan satu tipe data per program",
                "Karena tipe data variabel ditentukan otomatis dan bisa berubah selama program berjalan",
                "Karena Python membutuhkan deklarasi tipe data eksplisit seperti C",
                "Karena Python tidak mendukung variabel sama sekali"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Kota awal: Surabaya\nKota sekarang: Jakarta\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Kota awal:[\"']\\s*,\\s*kota\\s*\\)",
                message: "Tampilkan dengan: print(\"Kota awal:\", kota)",
                shouldExist: true
              },
              {
                pattern: "kota\\s*=\\s*[\"']Jakarta[\"']",
                message: "Ubah nilai kota dengan: kota = \"Jakarta\"",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l4",
            title: "Format Penulisan Variabel",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Penulisan variabel di Python mengikuti konvensi <strong>PEP 8</strong> sebagai standar resmi gaya kode Python. Beberapa aturan format penting: nama variabel sebaiknya <strong>deskriptif</strong> dan menggunakan <strong>snake_case</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">jumlah_siswa</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">JumlahSiswa</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">js</code>); konstanta (nilai yang tidak diubah) ditulis dengan <strong>HURUF KAPITAL SEMUA</strong> dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">PI = 3.14159</code>), meskipun Python tidak memiliki keyword <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code> sungguhan — ini hanya konvensi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung <strong>multiple assignment</strong> — memberi nilai ke beberapa variabel dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a, b, c = 1, 2, 3</code>. Selain itu, Python mendukung <strong>chained assignment</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = y = z = 0</code> memberikan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> ke ketiga variabel sekaligus. Kedua fitur ini tidak ada di C dan membuat kode Python lebih ringkas.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Multiple assignment\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Chained assignment\nx = y = z = 0\nprint(x, y, z)\n\n# Konstanta (konvensi huruf kapital)\nPI = 3.14159\nprint(&quot;Nilai PI:&quot;, PI)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">1 2 3\n0 0 0\nNilai PI: 3.14159</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Multiple assignment\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Chained assignment\nx = y = z = 0\nprint(x, y, z)\n\n# Konstanta (konvensi huruf kapital)\nPI = 3.14159\nprint(\"Nilai PI:\", PI)",
            initialCode: "# Deklarasikan panjang, lebar, tinggi dengan multiple assignment\n\n# Hitung dan tampilkan volume\n",
            solution: "panjang, lebar, tinggi = 5, 3, 2\nprint(\"Volume:\", panjang * lebar * tinggi)\n",
            hint: "Gunakan `panjang, lebar, tinggi = 5, 3, 2` lalu `print(\"Volume:\", panjang * lebar * tinggi)`.",
            quiz: {
              question: "Apa hasil dari kode Python <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = y = z = 5</code> lalu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(x, y, z)</code>?",
              options: [
                "`5 0 0`",
                "`5 5 5`",
                "Error karena tidak valid",
                "`x y z`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Volume: 30\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "panjang\\s*,\\s*lebar\\s*,\\s*tinggi\\s*=\\s*5\\s*,\\s*3\\s*,\\s*2",
                message: "Gunakan multiple assignment: panjang, lebar, tinggi = 5, 3, 2",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Volume:[\"']\\s*,\\s*panjang\\s*\\*\\s*lebar\\s*\\*\\s*tinggi\\s*\\)",
                message: "Tampilkan dengan: print(\"Volume:\", panjang * lebar * tinggi)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m3",
        title: "Tipe Data",
        lessons: [
          {
            id: "py4-l5",
            title: "Tipe Data Number (int, float)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python memiliki dua tipe data numerik utama yang sering dipakai: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (integer/bilangan bulat, <strong>tanpa batas ukuran</strong> secara teori — berbeda dengan C yang punya batas 32-bit) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> (bilangan pecahan/desimal, presisi ganda mirip <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> di C). Python juga mendukung tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">complex</code> untuk bilangan kompleks, tapi jarang dipakai pemula.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operasi aritmatika di Python mirip C, dengan satu perbedaan penting: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code> di Python <strong>selalu menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code></strong>, bahkan jika kedua operand <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> = <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code> seperti di C). Untuk pembagian integer (hasil dibuang desimalnya), Python punya operator khusus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code> (floor division). Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">type()</code> digunakan untuk memeriksa tipe data sebuah nilai.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pembagian (selalu float)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Floor division (integer)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 // 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 % 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 ** 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>a = 17\nb = 5\n\nprint(a / b)    # Pembagian biasa -&gt; float\nprint(a // b)   # Floor division -&gt; int\nprint(a % b)    # Modulus\nprint(a ** 2)   # Pangkat\nprint(type(a))  # Tipe data a</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">3.4\n3\n2\n289\n&lt;class &#039;int&#039;&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "a = 17\nb = 5\n\nprint(a / b)    # Pembagian biasa -> float\nprint(a // b)   # Floor division -> int\nprint(a % b)    # Modulus\nprint(a ** 2)   # Pangkat\nprint(type(a))  # Tipe data a",
            initialCode: "a = 29\nb = 4\n# Tampilkan a / b dengan label \"Pembagian:\"\n\n# Tampilkan a // b dengan label \"Floor division:\"\n\n# Tampilkan a % b dengan label \"Modulus:\"\n",
            solution: "a = 29\nb = 4\nprint(\"Pembagian:\", a / b)\nprint(\"Floor division:\", a // b)\nprint(\"Modulus:\", a % b)\n",
            hint: "Gunakan operator `/`, `//`, dan `%` masing-masing dalam `print()`.",
            quiz: {
              question: "Apa hasil dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> di Python (operator pembagian biasa, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code>)?",
              options: [
                "`3`",
                "`3.5`",
                "`1`",
                "Error"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Pembagian: 7.25\nFloor division: 7\nModulus: 1\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Pembagian:[\"']\\s*,\\s*a\\s*/\\s*b\\s*\\)",
                message: "Tampilkan dengan: print(\"Pembagian:\", a / b)",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Floor division:[\"']\\s*,\\s*a\\s*//\\s*b\\s*\\)",
                message: "Tampilkan dengan: print(\"Floor division:\", a // b)",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l6",
            title: "Tipe Data String",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">String di Python adalah <strong>tipe data bawaan</strong> untuk teks (berbeda dengan C yang menggunakan array <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code>). String bisa ditulis menggunakan tanda petik <strong>tunggal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'...'</code></strong> atau <strong>ganda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code></strong> — keduanya setara dan bisa dipilih sesuai kebutuhan (misalnya gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code> jika teks mengandung petik tunggal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'</code>). String juga bisa ditulis multi-baris menggunakan <strong>triple quotes</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'''...'''</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"\"...\"\"\"</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">String di Python bersifat <strong>immutable</strong> (tidak bisa diubah elemennya secara langsung setelah dibuat) tetapi mendukung banyak operasi: <strong>slicing</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">s[0:3]</code> mengambil sebagian string), <strong>concatenation</strong> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <strong>repetisi</strong> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ab\" * 3</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ababab\"</code>), serta fungsi panjang <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">len(s)</code>. Indeks string juga dimulai dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, dan mendukung <strong>indeks negatif</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">s[-1]</code> mengambil karakter terakhir).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = &quot;Python&quot;\nprint(nama[0])       # Karakter pertama\nprint(nama[-1])      # Karakter terakhir\nprint(nama[0:3])     # Slicing: 3 karakter pertama\nprint(len(nama))     # Panjang string\nprint(nama * 2)      # Repetisi string\nprint(nama + &quot; Programming&quot;)  # Concatenation</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">P\nn\nPyt\n6\nPythonPython\nPython Programming</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = \"Python\"\nprint(nama[0])       # Karakter pertama\nprint(nama[-1])      # Karakter terakhir\nprint(nama[0:3])     # Slicing: 3 karakter pertama\nprint(len(nama))     # Panjang string\nprint(nama * 2)      # Repetisi string\nprint(nama + \" Programming\")  # Concatenation",
            initialCode: "kata = \"Algoritma\"\n# Tampilkan panjang kata\n\n# Tampilkan 4 karakter pertama\n\n# Tampilkan karakter terakhir\n",
            solution: "kata = \"Algoritma\"\nprint(\"Panjang:\", len(kata))\nprint(\"4 huruf pertama:\", kata[0:4])\nprint(\"Huruf terakhir:\", kata[-1])\n",
            hint: "Gunakan `len(kata)`, `kata[0:4]`, dan `kata[-1]`.",
            quiz: {
              question: "Apa hasil dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"abc\"[-1]</code> di Python?",
              options: [
                "`'a'`",
                "`'c'`",
                "Error, indeks negatif tidak valid",
                "`'abc'`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Panjang: 9\n4 huruf pertama: Algo\nHuruf terakhir: a\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Panjang:[\"']\\s*,\\s*len\\s*\\(\\s*kata\\s*\\)\\s*\\)",
                message: "Tampilkan dengan: print(\"Panjang:\", len(kata))",
                shouldExist: true
              },
              {
                pattern: "kata\\s*\\[\\s*0\\s*:\\s*4\\s*\\]",
                message: "Ambil 4 karakter pertama dengan slicing: kata[0:4]",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l7",
            title: "Tipe Data Boolean",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> di Python hanya memiliki dua nilai: <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code></strong> dan <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code></strong> (perhatikan huruf besar di awal — berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code> di C). <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> sebenarnya adalah <strong>subclass dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code></strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code> setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code> setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, sehingga keduanya bisa digunakan dalam operasi aritmatika.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">></code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">>=</code>) dan operator logika (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code>) di Python mengembalikan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code>. Perlu diperhatikan: Python menggunakan kata <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code> (kata dalam bahasa Inggris), <strong>bukan</strong> simbol <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> seperti di C. Selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, nilai-nilai seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0.0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"</code> (string kosong), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[]</code> (list kosong), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code> juga dianggap \"falsy\" (setara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>) dalam konteks boolean.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>status_aktif = True\nsaldo = 50000\n\nprint(status_aktif)\nprint(type(status_aktif))\nprint(saldo &gt; 0 and status_aktif)  # and -&gt; butuh keduanya True\nprint(saldo &gt; 100000 or status_aktif)  # or -&gt; salah satu True cukup\nprint(not status_aktif)  # not -&gt; membalik nilai</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\n&lt;class &#039;bool&#039;&gt;\nTrue\nTrue\nFalse</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "status_aktif = True\nsaldo = 50000\n\nprint(status_aktif)\nprint(type(status_aktif))\nprint(saldo > 0 and status_aktif)  # and -> butuh keduanya True\nprint(saldo > 100000 or status_aktif)  # or -> salah satu True cukup\nprint(not status_aktif)  # not -> membalik nilai",
            initialCode: "usia = 17\npunya_izin = True\n# Tampilkan \"Boleh masuk:\" dengan kondisi usia >= 17 and punya_izin\n\n# Tampilkan \"Boleh tanpa pendamping:\" dengan kondisi usia >= 18 or punya_izin\n",
            solution: "usia = 17\npunya_izin = True\nprint(\"Boleh masuk:\", usia >= 17 and punya_izin)\nprint(\"Boleh tanpa pendamping:\", usia >= 18 or punya_izin)\n",
            hint: "Gunakan operator `and` dan `or` sesuai konvensi Python.",
            quiz: {
              question: "Operator logika apa yang digunakan di Python sebagai pengganti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code> pada bahasa C?",
              options: [
                "`&`",
                "`and`",
                "`AND`",
                "`&&`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Boleh masuk: True\nBoleh tanpa pendamping: True\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "usia\\s*>=\\s*17\\s+and\\s+punya_izin",
                message: "Gunakan operator and: usia >= 17 and punya_izin",
                shouldExist: true
              },
              {
                pattern: "usia\\s*>=\\s*18\\s+or\\s+punya_izin",
                message: "Gunakan operator or: usia >= 18 or punya_izin",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l8",
            title: "Konversi Tipe Data",
            explanation: "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>*Konversi tipe data (type casting)** adalah proses mengubah nilai dari satu tipe ke tipe lainnya. Python menyediakan fungsi bawaan untuk ini: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int(x)</code> mengonversi ke integer (membuang desimal jika dari float, atau mengonversi string angka), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float(x)</code> mengonversi ke desimal, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str(x)</code> mengonversi ke string, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool(x)</code> mengonversi ke boolean.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Konversi sangat penting saat menggabungkan tipe data berbeda — misalnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + 20)</code> akan <strong>error</strong> karena Python tidak bisa menggabungkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> secara langsung dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>. Solusinya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + str(20))</code>. Begitu pula, input dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> selalu berupa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>, sehingga jika ingin melakukan operasi matematika, harus dikonversi dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float()</code> terlebih dahulu.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka_str = &quot;100&quot;\nangka_int = int(angka_str)   # str -&gt; int\nangka_float = float(angka_int)  # int -&gt; float\nhasil_str = str(angka_int)   # int -&gt; str\n\nprint(angka_int + 50)        # Operasi matematika setelah konversi\nprint(angka_float)\nprint(&quot;Nilai: &quot; + hasil_str) # Concatenation setelah konversi\nprint(bool(0), bool(1), bool(&quot;&quot;))</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">150\n100.0\nNilai: 100\nFalse True False</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "angka_str = \"100\"\nangka_int = int(angka_str)   # str -> int\nangka_float = float(angka_int)  # int -> float\nhasil_str = str(angka_int)   # int -> str\n\nprint(angka_int + 50)        # Operasi matematika setelah konversi\nprint(angka_float)\nprint(\"Nilai: \" + hasil_str) # Concatenation setelah konversi\nprint(bool(0), bool(1), bool(\"\"))",
            initialCode: "umur_str = \"25\"\numur = int(umur_str)\n# Tampilkan \"Umur sekarang: \" digabung dengan str(umur)\n\n# Hitung umur + 5 dan tampilkan \"Umur 5 tahun lagi: \" digabung dengan hasilnya\n",
            solution: "umur_str = \"25\"\numur = int(umur_str)\nprint(\"Umur sekarang: \" + str(umur))\nprint(\"Umur 5 tahun lagi: \" + str(umur + 5))\n",
            hint: "Gunakan `int(umur_str)` untuk konversi, dan `str(...)` saat menggabungkan dengan `+`.",
            quiz: {
              question: "Mengapa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + 20)</code> menghasilkan error di Python?",
              options: [
                "Karena angka 20 terlalu besar",
                "Karena Python tidak bisa menggabungkan tipe `str` dan `int` secara langsung dengan operator `+`",
                "Karena `print()` hanya menerima satu argumen",
                "Karena tanda `+` hanya untuk operasi matematika di Python"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Umur sekarang: 25\nUmur 5 tahun lagi: 30\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "umur\\s*=\\s*int\\s*\\(\\s*umur_str\\s*\\)",
                message: "Konversi string ke int dengan: umur = int(umur_str)",
                shouldExist: true
              },
              {
                pattern: "str\\s*\\(\\s*umur\\s*\\+\\s*5\\s*\\)",
                message: "Konversi hasil penjumlahan dengan: str(umur + 5)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m4",
        title: "Operator",
        lessons: [
          {
            id: "py4-l9",
            title: "Operator Aritmatika",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator aritmatika di Python sebagian besar sama dengan C (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>), dengan tambahan operator <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"></strong></code><strong> untuk </strong>pangkat<strong> dan </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code><strong> untuk </strong>floor division<strong> yang tidak ada di C. Python juga mendukung </strong>operator assignment gabungan<strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"></strong>=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%=</code>) yang berfungsi sama seperti di C — menyingkat <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = x + 5</code> menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 5</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Urutan operasi (precedence) di Python mengikuti aturan matematika standar: pangkat (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code>) memiliki prioritas tertinggi, diikuti perkalian/pembagian/modulus/floor division (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code>), dan terakhir penjumlahan/pengurangan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>). Tanda kurung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">()</code> selalu bisa digunakan untuk mengubah urutan evaluasi.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Dasar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 + 3 * 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 ** 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Floor division</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">17 // 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">17 % 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-=</code> dst</td><td class=\"border border-zinc-200 px-3 py-1.5\">Assignment gabungan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = x + 5</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 10\nnilai += 5   # nilai = 15\nnilai *= 2   # nilai = 30\nprint(&quot;Nilai:&quot;, nilai)\n\nprint(&quot;2 pangkat 5:&quot;, 2 ** 5)\nprint(&quot;17 // 5:&quot;, 17 // 5)\nprint(&quot;Urutan operasi:&quot;, 2 + 3 * 2)  # * dulu, lalu +</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nilai: 30\n2 pangkat 5: 32\n17 // 5: 3\nUrutan operasi: 8</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nilai = 10\nnilai += 5   # nilai = 15\nnilai *= 2   # nilai = 30\nprint(\"Nilai:\", nilai)\n\nprint(\"2 pangkat 5:\", 2 ** 5)\nprint(\"17 // 5:\", 17 // 5)\nprint(\"Urutan operasi:\", 2 + 3 * 2)  # * dulu, lalu +",
            initialCode: "skor = 50\n# Tambahkan 20 menggunakan +=\n\n# Kalikan 2 menggunakan *=\n\nprint(\"Skor akhir:\", skor)\nprint(\"5 pangkat 3:\", 5 ** 3)\n",
            solution: "skor = 50\nskor += 20\nskor *= 2\nprint(\"Skor akhir:\", skor)\nprint(\"5 pangkat 3:\", 5 ** 3)\n",
            hint: "Gunakan `skor += 20` lalu `skor *= 2`.",
            quiz: {
              question: "Operator apa di Python yang digunakan untuk operasi <strong>pangkat</strong> (eksponen)?",
              options: [
                "`^`",
                "`**`",
                "`pow`",
                "`exp`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Skor akhir: 140\n5 pangkat 3: 125\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "skor\\s*\\+=\\s*20",
                message: "Gunakan operator assignment gabungan: skor += 20",
                shouldExist: true
              },
              {
                pattern: "skor\\s*\\*=\\s*2",
                message: "Gunakan operator assignment gabungan: skor *= 2",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l10",
            title: "Operator Perbandingan",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan di Python (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">></code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">>=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><=</code>) memiliki <strong>simbol yang identik</strong> dengan C dan menghasilkan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>), bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> seperti tampilan di C (meskipun secara internal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> adalah subclass <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>). Sama seperti C, kesalahan umum pemula adalah tertukar antara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code> (assignment) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code> (perbandingan).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fitur unik Python yang tidak ada di C adalah <strong>chained comparison</strong> — kamu bisa menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0 < x < 10</code> yang secara otomatis berarti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(0 < x) and (x < 10)</code>, tanpa perlu operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code> secara eksplisit. Ini membuat pengecekan rentang nilai jauh lebih ringkas dibanding C yang harus menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(x > 0) && (x < 10)</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>x = 5\n\nprint(x == 5)         # True\nprint(x != 10)        # True\nprint(0 &lt; x &lt; 10)     # Chained comparison -&gt; True\nprint(10 &lt; x &lt; 20)    # False, karena x = 5 tidak &gt; 10</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\nTrue\nTrue\nFalse</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "x = 5\n\nprint(x == 5)         # True\nprint(x != 10)        # True\nprint(0 < x < 10)     # Chained comparison -> True\nprint(10 < x < 20)    # False, karena x = 5 tidak > 10",
            initialCode: "nilai = 75\n# Tampilkan \"Dalam rentang lulus:\" dengan chained comparison 60 <= nilai <= 100\n",
            solution: "nilai = 75\nprint(\"Dalam rentang lulus:\", 60 <= nilai <= 100)\n",
            hint: "Gunakan `60 <= nilai <= 100`.",
            quiz: {
              question: "Apa yang dimaksud dengan <strong>chained comparison</strong> seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0 < x < 10</code> di Python?",
              options: [
                "Python akan error karena tidak bisa membandingkan tiga nilai sekaligus",
                "Setara dengan `(0 < x) and (x < 10)`",
                "Setara dengan `(0 < x) or (x < 10)`",
                "Hanya membandingkan `x < 10`, nilai `0` diabaikan"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Dalam rentang lulus: True\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "60\\s*<=\\s*nilai\\s*<=\\s*100",
                message: "Gunakan chained comparison: 60 <= nilai <= 100",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Dalam rentang lulus:[\"']",
                message: "Tampilkan dengan label \"Dalam rentang lulus:\"",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l11",
            title: "Operator Logika",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menggunakan kata kunci <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code></strong>, <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code></strong>, dan <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code></strong> sebagai operator logika, <strong>bukan</strong> simbol <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> seperti C. Cara kerjanya identik secara konseptual: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code> true jika kedua operand true, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code> true jika salah satu true, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code> membalik nilai boolean.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga menerapkan <strong>short-circuit evaluation</strong> sama seperti C: pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a and b</code>, jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">b</code> tidak akan dievaluasi (hasilnya pasti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>). Selain konteks boolean murni, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code> di Python sebenarnya mengembalikan salah satu <strong>operand itu sendiri</strong> (bukan selalu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>), sebuah perilaku yang sering dimanfaatkan untuk memberi nilai default: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama = input_user or \"Tamu\"</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>usia = 25\npunya_ktp = True\nsudah_daftar = False\n\nprint(usia &gt;= 17 and punya_ktp)          # and\nprint(sudah_daftar or usia &gt;= 18)        # or\nprint(not sudah_daftar)                  # not\n\n# Penggunaan unik: memberi nilai default\ninput_user = &quot;&quot;\nnama = input_user or &quot;Tamu&quot;\nprint(&quot;Nama:&quot;, nama)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\nTrue\nTrue\nNama: Tamu</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "usia = 25\npunya_ktp = True\nsudah_daftar = False\n\nprint(usia >= 17 and punya_ktp)          # and\nprint(sudah_daftar or usia >= 18)        # or\nprint(not sudah_daftar)                  # not\n\n# Penggunaan unik: memberi nilai default\ninput_user = \"\"\nnama = input_user or \"Tamu\"\nprint(\"Nama:\", nama)",
            initialCode: "hujan = True\nbawa_payung = False\n# Tampilkan \"Kena hujan:\" dengan kondisi hujan and not bawa_payung\n",
            solution: "hujan = True\nbawa_payung = False\nprint(\"Kena hujan:\", hujan and not bawa_payung)\n",
            hint: "Gunakan `hujan and not bawa_payung`.",
            quiz: {
              question: "Apakah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> bisa digunakan sebagai operator logika di Python?",
              options: [
                "Ya, identik dengan C",
                "Tidak, Python menggunakan `and`, `or`, dan `not`",
                "Hanya `!` yang bisa digunakan",
                "Hanya `&&` yang bisa digunakan"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Kena hujan: True\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "hujan\\s+and\\s+not\\s+bawa_payung",
                message: "Gunakan: hujan and not bawa_payung",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Kena hujan:[\"']",
                message: "Tampilkan dengan label \"Kena hujan:\"",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m5",
        title: "Menginput / Memasukkan Data",
        lessons: [
          {
            id: "py4-l12",
            title: "Fungsi `input()`",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> adalah fungsi bawaan Python untuk <strong>membaca input dari pengguna</strong> melalui keyboard. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> di C yang membutuhkan format specifier dan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> sangat sederhana: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">variabel = input(\"Pesan prompt: \")</code> — teks di dalam tanda kurung akan ditampilkan sebagai prompt sebelum pengguna mengetik.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hal terpenting yang harus diingat: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> <strong>selalu mengembalikan tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> (string)</strong>, <strong>apapun</strong> yang diketik pengguna — bahkan jika pengguna mengetik angka. Jika kamu langsung menggunakan hasil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> dalam operasi matematika tanpa konversi, akan terjadi error atau hasil yang tidak diharapkan (concatenation string, bukan penjumlahan angka).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = input(&quot;Masukkan nama Anda: &quot;)\nprint(&quot;Halo, &quot; + nama + &quot;!&quot;)\n\nangka_str = input(&quot;Masukkan sebuah angka: &quot;)\nprint(&quot;Tipe data input:&quot;, type(angka_str))  # Selalu &lt;class &#039;str&#039;&gt;</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan nama Anda: Sinta\nHalo, Sinta!\nMasukkan sebuah angka: 25\nTipe data input: &lt;class &#039;str&#039;&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = input(\"Masukkan nama Anda: \")\nprint(\"Halo, \" + nama + \"!\")\n\nangka_str = input(\"Masukkan sebuah angka: \")\nprint(\"Tipe data input:\", type(angka_str))  # Selalu <class 'str'>",
            initialCode: "# Baca nama hewan peliharaan dengan input()\n\n# Tampilkan sapaan menggunakan nama tersebut\n",
            solution: "nama_hewan = input(\"Masukkan nama hewan peliharaanmu: \")\nprint(\"Halo \" + nama_hewan + \", semoga harimu menyenangkan!\")\n",
            hint: "Gunakan `input(\"Masukkan nama hewan peliharaanmu: \")` dan gabungkan dengan `print()`.",
            quiz: {
              question: "Apa tipe data yang <strong>selalu</strong> dikembalikan oleh fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code>, terlepas dari apa yang diketik pengguna?",
              options: [
                "`int`",
                "`float`",
                "`str`",
                "`bool`"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Masukkan nama hewan peliharaanmu: Milo\nHalo Milo, semoga harimu menyenangkan!\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "input\\s*\\(\\s*[\"']Masukkan nama hewan peliharaanmu: [\"']\\s*\\)",
                message: "Gunakan: input(\"Masukkan nama hewan peliharaanmu: \")",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Halo\\s*[\"']\\s*\\+\\s*nama_hewan",
                message: "Gabungkan teks sapaan dengan variabel nama hewan menggunakan +",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l13",
            title: "Mengubah Input Menjadi Integer",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> selalu mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>, untuk melakukan <strong>operasi matematika</strong> terhadap input pengguna, hasilnya harus dikonversi menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> (untuk bilangan bulat) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float()</code> (untuk bilangan desimal). Pola yang sangat umum digunakan adalah <strong>konversi langsung</strong> dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">angka = int(input(\"Masukkan angka: \"))</code> — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> dijalankan dulu, hasilnya (str) langsung dibungkus oleh <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Jika pengguna memasukkan teks yang <strong>tidak bisa dikonversi</strong> ke angka (misalnya huruf), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> akan menghasilkan <strong>error <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">ValueError</code></strong>. Pada level pemula, hal ini diterima sebagai keterbatasan; penanganan error menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">try-except</code> akan dibahas pada level lebih lanjut.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Konversi langsung dalam satu baris\numur = int(input(&quot;Masukkan umur Anda: &quot;))\ntahun_depan = umur + 1\nprint(&quot;Tahun depan usia Anda:&quot;, tahun_depan)\n\nberat = float(input(&quot;Masukkan berat badan (kg): &quot;))\nprint(&quot;Berat dalam gram:&quot;, berat * 1000)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan umur Anda: 20\nTahun depan usia Anda: 21\nMasukkan berat badan (kg): 65.5\nBerat dalam gram: 65500.0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Konversi langsung dalam satu baris\numur = int(input(\"Masukkan umur Anda: \"))\ntahun_depan = umur + 1\nprint(\"Tahun depan usia Anda:\", tahun_depan)\n\nberat = float(input(\"Masukkan berat badan (kg): \"))\nprint(\"Berat dalam gram:\", berat * 1000)",
            initialCode: "# Baca angka pertama dan kedua sebagai int\n\n# Tampilkan hasil penjumlahan\n",
            solution: "angka1 = int(input(\"Masukkan angka pertama: \"))\nangka2 = int(input(\"Masukkan angka kedua: \"))\nprint(\"Hasil penjumlahan:\", angka1 + angka2)\n",
            hint: "Gunakan `int(input(\"...\"))` untuk masing-masing variabel, lalu jumlahkan dengan `+`.",
            quiz: {
              question: "Apa yang terjadi jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int(input(\"Masukkan angka: \"))</code> dijalankan tetapi pengguna mengetik <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"abc\"</code>?",
              options: [
                "Hasilnya otomatis menjadi `0`",
                "Python akan menghasilkan error `ValueError`",
                "Python akan mengabaikan input dan meminta input lagi secara otomatis",
                "Hasilnya menjadi string `\"abc\"`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Masukkan angka pertama: 12\nMasukkan angka kedua: 8\nHasil penjumlahan: 20\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "int\\s*\\(\\s*input\\s*\\(\\s*[\"']Masukkan angka pertama: [\"']\\s*\\)\\s*\\)",
                message: "Gunakan: int(input(\"Masukkan angka pertama: \"))",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Hasil penjumlahan:[\"']\\s*,\\s*angka1\\s*\\+\\s*angka2\\s*\\)",
                message: "Tampilkan dengan: print(\"Hasil penjumlahan:\", angka1 + angka2)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m6",
        title: "Menampilkan Data",
        lessons: [
          {
            id: "py4-l14",
            title: "Fungsi `print()`",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> adalah fungsi paling dasar untuk <strong>menampilkan output</strong> ke layar di Python. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> di C yang membutuhkan format specifier, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> bisa langsung menerima <strong>banyak argumen</strong> dipisahkan koma, dan secara otomatis menambahkan <strong>spasi</strong> di antara argumen serta <strong>newline</strong> di akhir.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> memiliki beberapa parameter opsional yang berguna: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sep</code> (separator/pemisah antar argumen, default spasi) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">end</code> (karakter di akhir, default <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code>). Contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"A\", \"B\", \"C\", sep=\"-\")</code> menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">A-B-C</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Tanpa newline\", end=\"\")</code> mencegah pindah baris setelahnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(&quot;Halo&quot;, &quot;Dunia&quot;)              # Pemisah default: spasi\nprint(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, sep=&quot;-&quot;)       # Pemisah custom: -\nprint(&quot;Tidak ada newline&quot;, end=&quot; &quot;) # Tidak pindah baris\nprint(&quot;lanjut di baris yang sama&quot;)\nprint(1, 2, 3, sep=&quot;, &quot;, end=&quot;!\\n&quot;) # Kombinasi sep dan end</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo Dunia\nA-B-C\nTidak ada newline lanjut di baris yang sama\n1, 2, 3!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "print(\"Halo\", \"Dunia\")              # Pemisah default: spasi\nprint(\"A\", \"B\", \"C\", sep=\"-\")       # Pemisah custom: -\nprint(\"Tidak ada newline\", end=\" \") # Tidak pindah baris\nprint(\"lanjut di baris yang sama\")\nprint(1, 2, 3, sep=\", \", end=\"!\\n\") # Kombinasi sep dan end",
            initialCode: "hari = 17\nbulan = 8\ntahun = 1945\n# Tampilkan tanggal dengan format DD/MM/YYYY menggunakan sep\n",
            solution: "hari = 17\nbulan = 8\ntahun = 1945\nprint(f\"{hari:02d}\", f\"{bulan:02d}\", tahun, sep=\"/\")\n",
            hint: "Gunakan `print(hari, bulan, tahun, sep=\"/\")`. Perhatikan agar `bulan` tampil sebagai \"08\" — gunakan format string atau f-string jika diperlukan.",
            quiz: {
              question: "Apa nilai default dari parameter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sep</code> pada fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> jika tidak dituliskan?",
              options: [
                "Tanpa karakter apapun (kosong)",
                "Koma `,`",
                "Spasi `\" \"`",
                "Newline `\\n`"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "17/08/1945\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "sep\\s*=\\s*[\"']/[\"']",
                message: "Gunakan parameter sep=\"/\" pada print() untuk format DD/MM/YYYY",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(.*hari.*bulan.*tahun",
                message: "Tampilkan ketiga variabel hari, bulan, dan tahun dalam satu print()",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l15",
            title: "Menampilkan String dan Variabel (f-string)",
            explanation: "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>*f-string<strong> (formatted string literal), diperkenalkan di Python 3.6, adalah cara modern dan paling direkomendasikan untuk </strong>menyisipkan nilai variabel ke dalam string**. Caranya: tambahkan huruf <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f</code> sebelum tanda petik, lalu tulis nama variabel di dalam kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"Nama saya {nama}\"</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">f-string juga mendukung <strong>ekspresi</strong> di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> (tidak hanya variabel tunggal, tapi juga operasi matematika atau pemanggilan fungsi), dan mendukung <strong>format specifier</strong> mirip C menggunakan tanda titik dua, contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"{nilai:.2f}\"</code> untuk 2 angka desimal, atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"{angka:05d}\"</code> untuk padding angka dengan nol di depan hingga 5 digit. f-string jauh lebih ringkas dan mudah dibaca dibandingkan concatenation <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> atau metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.format()</code> yang lebih lama.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = &quot;Maya&quot;\nusia = 21\nipk = 3.78912\n\nprint(f&quot;Nama saya {nama}, usia {usia} tahun.&quot;)\nprint(f&quot;IPK: {ipk:.2f}&quot;)          # 2 angka desimal\nprint(f&quot;Tahun depan: {usia + 1}&quot;)  # ekspresi di dalam {}\nprint(f&quot;Kode: {7:03d}&quot;)            # padding nol, lebar 3</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama saya Maya, usia 21 tahun.\nIPK: 3.79\nTahun depan: 22\nKode: 007</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = \"Maya\"\nusia = 21\nipk = 3.78912\n\nprint(f\"Nama saya {nama}, usia {usia} tahun.\")\nprint(f\"IPK: {ipk:.2f}\")          # 2 angka desimal\nprint(f\"Tahun depan: {usia + 1}\")  # ekspresi di dalam {}\nprint(f\"Kode: {7:03d}\")            # padding nol, lebar 3",
            initialCode: "nama_produk = \"Laptop\"\nharga = 7500000.5\n# Tampilkan menggunakan f-string dengan format 2 desimal untuk harga\n",
            solution: "nama_produk = \"Laptop\"\nharga = 7500000.5\nprint(f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\")\n",
            hint: "Gunakan `f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\"`.",
            quiz: {
              question: "Bagaimana cara menyisipkan nilai variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">harga</code> ke dalam string menggunakan f-string?",
              options: [
                "`print(\"Harga: \" % harga)`",
                "`print(f\"Harga: {harga}\")`",
                "`print(\"Harga: \" . harga)`",
                "`print(\"Harga: ${harga}\")`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Produk: Laptop, Harga: Rp7500000.50\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "f[\"'].*\\{nama_produk\\}.*\\{harga:\\.2f\\}",
                message: "Gunakan f-string dengan format: f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\"",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*f[\"']",
                message: "Gunakan print() dengan f-string (diawali huruf f sebelum tanda petik)",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l16",
            title: "Menggabungkan (Concatenate) String",
            explanation: "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>*Concatenation<strong> (penggabungan string) di Python bisa dilakukan dengan beberapa cara: operator </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code><strong> (menggabungkan string secara langsung, kedua operand harus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>), operator </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code><strong> (mengulang string sejumlah angka, misal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ab\" * 3</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ababab\"</code>), dan </strong>f-string** (cara paling fleksibel, sudah dibahas sebelumnya). Untuk menggabungkan banyak string dengan separator yang konsisten, Python menyediakan metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.join()</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"-\".join([\"2024\", \"01\", \"15\"])</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"2024-01-15\"</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perlu diingat kembali: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> untuk concatenation <strong>hanya bekerja antar <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code></strong> — menggabungkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> langsung akan menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">TypeError</code>, sehingga perlu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str()</code> untuk konversi (sudah dibahas di pelajaran konversi tipe data). f-string umumnya lebih disukai karena menghindari masalah konversi tipe ini sepenuhnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>depan = &quot;Selamat&quot;\nbelakang = &quot;Pagi&quot;\n\n# Penggabungan dengan +\nprint(depan + &quot; &quot; + belakang)\n\n# Repetisi dengan *\nprint(&quot;=&quot; * 10)\n\n# Penggabungan dengan join\ntanggal = &quot;-&quot;.join([&quot;2024&quot;, &quot;01&quot;, &quot;15&quot;])\nprint(tanggal)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat Pagi\n==========\n2024-01-15</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "depan = \"Selamat\"\nbelakang = \"Pagi\"\n\n# Penggabungan dengan +\nprint(depan + \" \" + belakang)\n\n# Repetisi dengan *\nprint(\"=\" * 10)\n\n# Penggabungan dengan join\ntanggal = \"-\".join([\"2024\", \"01\", \"15\"])\nprint(tanggal)",
            initialCode: "judul = \"BAB 1\"\nsubjudul = \"Pengenalan\"\n# Tampilkan gabungan judul dan subjudul dengan pemisah \" - \"\n\n# Tampilkan garis \"=\" sepanjang 15 karakter\n",
            solution: "judul = \"BAB 1\"\nsubjudul = \"Pengenalan\"\nprint(judul + \" - \" + subjudul)\nprint(\"=\" * 15)\n",
            hint: "Gunakan `judul + \" - \" + subjudul` dan `\"=\" * 15`.",
            quiz: {
              question: "Apa hasil dari ekspresi Python <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"-\" * 5</code>?",
              options: [
                "`\"-5\"`",
                "Error, operator `*` tidak bisa digunakan untuk string",
                "`\"-----\"`",
                "`5`"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "BAB 1 - Pengenalan\n===============\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "judul\\s*\\+\\s*[\"']\\s*-\\s*[\"']\\s*\\+\\s*subjudul",
                message: "Gabungkan dengan: judul + \" - \" + subjudul",
                shouldExist: true
              },
              {
                pattern: "[\"']=[\"']\\s*\\*\\s*15",
                message: "Tampilkan garis dengan: \"=\" * 15",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "py-level-2",
    title: "PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON",
    description: "Mengendalikan alur rute percabangan (if-elif-else) dengan hukum indentasi, loop for/while, dan deklarasi fungsi kustom.",
    modules: [
      {
        id: "py5-m1",
        title: "Kontrol Rute Percabangan",
        lessons: [
          {
            id: "py5-l1",
            title: "Percabangan Kondisional",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan di Python memiliki aturan penulisan yang ketat:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>Menggunakan tanda <strong>titik dua (:)</strong> di akhir baris kondisi untuk membuka blok.</li>\n  <li>Menggunakan <strong>Hukum Indentasi</strong>: Semua baris kode di dalam blok percabangan harus digeser masuk (Tab / 4 spasi) untuk menandakan kelompok scope.</li>\n  <li><strong>elif</strong> digunakan sebagai pengganti else-if berantai.</li>\n  <li>Kondisi komparasi tidak wajib diapit tanda kurung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">()</code>.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 80\nif nilai &gt;= 90:\n    grade = \"A\"\nelif nilai &gt;= 70:\n    grade = \"B\"\nelse:\n    grade = \"C\"\nprint(grade)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">B</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nilai = 80\nif nilai >= 90:\n    grade = \"A\"\nelif nilai >= 70:\n    grade = \"B\"\nelse:\n    grade = \"C\"\nprint(grade)",
            initialCode: "debit = 30\n# Cek debit: jika > 50 cetak \"Tinggi\", jika 20 s.d 50 cetak \"Sedang\", selain itu cetak \"Rendah\"\n",
            solution: "debit = 30\nif debit > 50:\n    print(\"Tinggi\")\nelif debit >= 20:\n    print(\"Sedang\")\nelse:\n    print(\"Rendah\")",
            hint: "Tulis if debit > 50: -> indent print(\"Tinggi\") -> elif debit >= 20: -> indent print(\"Sedang\") -> else: ...",
            quiz: {
              question: "Apakah fungsi dari pengaturan indentasi spasi/tab yang menjorok ke kanan pada program Python?",
              options: [
                "Hanya sebagai hiasan agar kode rapi",
                "Mengelompokkan baris statement ke dalam satu blok kode cakupan (scope)",
                "Menghemat penggunaan memori RAM",
                "Mempercepat waktu kompilasi"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Sedang\n",
                description: "Debit 30 sedang"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s+debit",
                message: "Gunakan if",
                shouldExist: true
              },
              {
                pattern: "elif\\s+debit",
                message: "Gunakan elif",
                shouldExist: true
              },
              {
                pattern: "else\\s*:",
                message: "Gunakan else",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py5-m2",
        title: "Putaran Iterasi (Loops)",
        lessons: [
          {
            id: "py5-l2",
            title: "Perulangan Terukur (For Loop)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <strong>for</strong> di Python dikategorikan sebagai <em>Counted Loop</em> (jumlah perulangan terukur pasti).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Formulasi parameter: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(start, stop, step)</code></p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>start</strong>: Indeks mulai (inklusif, default 0).</li>\n  <li><strong>stop</strong>: Indeks rem henti (eksklusif, perulangan berhenti tepat satu langkah sebelum menyentuh angka stop).</li>\n  <li><strong>step</strong>: Besarnya increment/decrement lompatan nilai (default +1).</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>for a in range(1, 4):\n    print(\"Iterasi ke-\", a)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Iterasi ke- 1\nIterasi ke- 2\nIterasi ke- 3</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "for a in range(1, 4):\n    print(\"Iterasi ke-\", a)",
            initialCode: "# Buat perulangan for menggunakan range untuk mencetak kata \"Loop\" sebanyak 3 kali\n",
            solution: "for i in range(3):\n    print(\"Loop\")",
            hint: "Gunakan range(3) atau range(0, 3)",
            quiz: {
              question: "Jika parameter parameter range(1, 11) dipanggil pada for loop, pada pencapaian nilai angka indeks berapakah loop akan ter-rem berhenti dieksekusi?",
              options: [
                "Indeks ke-11",
                "Indeks ke-10",
                "Indeks ke-9",
                "Indeks ke-12"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Loop\nLoop\nLoop\n",
                description: "Mengulang 3x"
              }
            ]
          },
          {
            id: "py5-l3",
            title: "Perulangan Bersyarat (While Loop)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <strong>while</strong> adalah <em>Uncounted Loop</em> (jumlah putaran tidak diketahui sebelumnya).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Loop akan terus memutar bloknya selama kondisi boolean bernilai <strong>True</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><em>Peringatan</em>: Wajib menyertakan statement increment/decrement (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 1</code>) di dalam blok loop agar kondisi bisa bernilai False dan program terhindar dari crash <strong>Infinite Loop</strong>!</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>x = 1\nwhile x &lt;= 3:\n    print(\"While ke-\", x)\n    x += 1</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">While ke- 1\nWhile ke- 2\nWhile ke- 3</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "x = 1\nwhile x <= 3:\n    print(\"While ke-\", x)\n    x += 1",
            initialCode: "x = 1\n# Lengkapi perulangan while untuk mencetak x selama x <= 2, jangan lupa increment x += 1\nwhile x <= 2:\n",
            solution: "x = 1\nwhile x <= 2:\n    print(x)\n    x += 1",
            hint: "Tulis print(x) lalu tambahkan x += 1 di dalam blok while",
            quiz: {
              question: "Apakah dampak terburuk jika Anda lupa menuliskan increment/decrement pengubah nilai kondisi di dalam blok loop while?",
              options: [
                "Kompiler langsung memberikan error syntax",
                "Program terjebak dalam Infinite Loop yang menyebabkan CPU/RAM overload hingga crash",
                "Program berhenti secara wajar",
                "Akurasi kalkulasi menurun"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "1\n2\n",
                description: "Loop while 1-2"
              }
            ],
            validationRules: [
              {
                pattern: "\\+=\\s*1",
                message: "Gunakan increment += 1",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py5-m3",
        title: "Fungsi Custom Python",
        lessons: [
          {
            id: "py5-l4",
            title: "Deklarasi Fungsi (Def & Return)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi adalah blok kode modular yang dapat dipanggil berulang kali.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur penulisan fungsi di Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>def</strong> adalah kata kunci untuk memulai deklarasi fungsi.</li>\n  <li>Diikuti nama fungsi dan tanda kurung parameter, lalu ditutup titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>).</li>\n  <li><strong>return</strong> digunakan untuk melempar/mengembalikan nilai hasil pemrosesan keluar dari scope fungsi.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def luas_segitiga(alas, tinggi):\n    hasil = 0.5 * alas * tinggi\n    return hasil\n\nprint(luas_segitiga(10, 5))</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">25.0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "def luas_segitiga(alas, tinggi):\n    hasil = 0.5 * alas * tinggi\n    return hasil\n\nprint(luas_segitiga(10, 5))",
            initialCode: "# Deklarasikan fungsi bernama hitung_kali dengan parameter (a, b) yang mengembalikan hasil kali keduanya\n",
            solution: "def hitung_kali(a, b):\n    return a * b",
            hint: "Ketik def hitung_kali(a, b): lalu kembalikan return a * b",
            quiz: {
              question: "Kata kunci (keyword) apakah yang digunakan untuk mendeklarasikan pembuatan fungsi kustom di Python?",
              options: [
                "function",
                "def",
                "void",
                "define"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "",
                description: "Custom function validation"
              }
            ],
            validationRules: [
              {
                pattern: "def\\s+hitung_kali",
                message: "Definisikan fungsi hitung_kali",
                shouldExist: true
              },
              {
                pattern: "return",
                message: "Gunakan keyword return",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "py-level-3",
    title: "LIST, DICTIONARY, DAN OPERASI FILE (PYTHON)",
    description: "Mengelola list mutable dinamis, pemetaan data dictionary key-value, dan operasi file (with open).",
    modules: [
      {
        id: "py6-m1",
        title: "Tipe Data Koleksi Python",
        lessons: [
          {
            id: "py6-l1",
            title: "List Dinamis & Manipulasi Elemen",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>List</strong> adalah tipe data array dinamis yang bersifat <strong>mutable</strong> (isinya dapat diganti, ditambah, atau dihapus secara bebas).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">List dibuat dengan tanda kurung siku <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[ ]</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi manipulasi list utama:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>insert(i, item)</strong>: Menyisipkan elemen di posisi indeks ke-i.</li>\n  <li><strong>append(item)</strong>: Menambahkan elemen di paling ujung akhir list.</li>\n  <li><strong>pop(i)</strong>: Menghapus dan mengembalikan elemen di indeks ke-i.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>myList = [1, 2, 3]\nmyList.insert(len(myList), 4)\nprint(myList)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">[1, 2, 3, 4]</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "myList = [1, 2, 3]\nmyList.insert(len(myList), 4)\nprint(myList)",
            initialCode: "angka = [1, 2, 3]\n# Tambahkan angka 4 ke bagian paling belakang menggunakan metode append()\n# Cetak variabel tersebut\n",
            solution: "angka = [1, 2, 3]\nangka.append(4)\nprint(angka)",
            hint: "Tulis angka.append(4) lalu print(angka)",
            quiz: {
              question: "Fungsi list manakah yang bertugas untuk menyisipkan elemen baru pada posisi indeks tertentu?",
              options: [
                "add()",
                "insert()",
                "push()",
                "append()"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "[1, 2, 3, 4]\n",
                description: "Append list"
              }
            ]
          },
          {
            id: "py6-l2",
            title: "Dictionary Key-Value",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Dictionary</strong> menyimpan data dalam bentuk pasangan kunci-nilai (key-value pairs) mirip struktur JSON.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dictionary dibatasi tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code> di mana kunci dan nilai dipisahkan titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">key: value</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mengakses nilainya, kita menggunakan key (kunci) sebagai pengganti indeks numerik (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">data[\"nama\"]</code>).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20\n}\nprint(mahasiswa[\"nama\"])</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Naufal</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20\n}\nprint(mahasiswa[\"nama\"])",
            initialCode: "mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20\n}\n# Cetak nilai umur dari dictionary mahasiswa\n",
            solution: "mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20\n}\nprint(mahasiswa[\"umur\"])",
            hint: "Tulis print(mahasiswa[\"umur\"])",
            quiz: {
              question: "Simbol apakah yang digunakan untuk memisahkan antara Kunci (Key) dengan Nilai (Value) pada dictionary Python?",
              options: [
                "Koma (,)",
                "Titik Koma (;)",
                "Titik Dua (:)",
                "Tanda Sama Dengan (=)"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "20\n",
                description: "Akses dictionary key"
              }
            ]
          }
        ]
      },
      {
        id: "py6-m2",
        title: "File Handling Python",
        lessons: [
          {
            id: "py6-l3",
            title: "Operasi File Python & Context Manager",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur operasi file paling aman di Python menggunakan block <strong>with open() as file:</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Keuntungan utama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">with</code>:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>File ditutup otomatis secara aman setelah keluar dari lekukan blok kode, sehingga tidak membutuhkan penutupan manual (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fclose</code>).</li>\n  <li>Mendukung mode perizinan file standar: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"r\"</code> (read), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"w\"</code> (write/overwrite), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"a\"</code> (append).</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>with open(\"dummy.txt\", \"w\") as file:\n    file.write(\"Kelass King\\n\")\nprint(\"Sukses\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Sukses</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "with open(\"dummy.txt\", \"w\") as file:\n    file.write(\"Kelass King\\n\")\nprint(\"Sukses\")",
            initialCode: "# Gunakan context manager 'with open' untuk membuka file \"dummy.txt\" dengan mode write \"w\" sebagai 'f'\n# Tulis teks \"Beres\" ke dalamnya menggunakan f.write()\n",
            solution: "with open(\"dummy.txt\", \"w\") as f:\n    f.write(\"Beres\")",
            hint: "Tulis: with open(\"dummy.txt\", \"w\") as f: -> indent f.write(\"Beres\")",
            quiz: {
              question: "Apakah keuntungan utama menggunakan blok context manager 'with open()' dibanding membuka file biasa di Python?",
              options: [
                "File diproses 10x lebih cepat",
                "File akan otomatis ditutup secara aman oleh sistem setelah keluar dari scope blok kode",
                "File dienkripsi otomatis",
                "Bebas dari virus komputer"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "",
                description: "Write file with open context"
              }
            ],
            validationRules: [
              {
                pattern: "with\\s+open\\s*\\(",
                message: "Gunakan syntax with open()",
                shouldExist: true
              },
              {
                pattern: "\\.write\\s*\\(",
                message: "Gunakan method .write()",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  }
];
