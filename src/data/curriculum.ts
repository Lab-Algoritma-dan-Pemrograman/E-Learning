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
    modules: [
      {
        id: "py4-m1",
        title: "Pendahuluan & Sintaksis Python",
        lessons: [
          {
            id: "py4-l1",
            title: "Pendahuluan & Sintaksis Dasar",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python adalah bahasa tingkat tinggi yang dirancang untuk keterbacaan kode.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perbedaan radikal C vs Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Typeless/Dinamis</strong>: Tidak perlu mendeklarasikan tipe data di awal variabel.</li>\n  <li><strong>Sederhana</strong>: Tanpa file header (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code>), tanpa blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main()</code>, dan tanpa akhiran titik koma (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code>).</li>\n  <li>Untuk mencetak teks, cukup panggil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"teks\")</code>.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(\"HALLO SEMUA\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">HALLO SEMUA</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "print(\"HALLO SEMUA\")",
            initialCode: "# Tulis print untuk menampilkan kalimat \"HALLO SEMUA\" di Python\n",
            solution: "print(\"HALLO SEMUA\")",
            hint: "Ketik print(\"HALLO SEMUA\")",
            quiz: {
              question: "Manakah perbedaan utama penulisan Hello World di Python dibandingkan di C?",
              options: [
                "Python mewajibkan file header stdio.h",
                "Python tidak membutuhkan blok main() dan include header, melainkan langsung menggunakan fungsi print()",
                "Python mewajibkan titik koma di akhir baris",
                "Python hanya jalan di platform macOS"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "HALLO SEMUA\n",
                description: "Cetak hello world Python"
              }
            ]
          },
          {
            id: "py4-l2",
            title: "Variabel & Deklarasi Dynamic",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Mendeklarasikan variabel di Python sangat sederhana:</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">Nama_variabel = <nilai></code></p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Ketentuan variabel Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>Tipe data otomatis dideteksi dari nilainya (<strong>Dynamic Typing</strong>).</li>\n  <li>Nama variabel case-sensitive dan harus diawali huruf/underscore.</li>\n  <li>Tidak boleh dipisah spasi. Gunakan underscore (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">_</code>) jika terdiri dari 2 kata.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = \"Soekarno Hatta\"\nusia = 55\nprint(nama, usia)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Soekarno Hatta 55</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = \"Soekarno Hatta\"\nusia = 55\nprint(nama, usia)",
            initialCode: "# Buat variabel nama_lengkap berisi \"Soekarno Hatta\"\n# Cetak variabel tersebut\n",
            solution: "nama_lengkap = \"Soekarno Hatta\"\nprint(nama_lengkap)",
            hint: "Tulis nama_lengkap = \"Soekarno Hatta\" lalu print(nama_lengkap)",
            quiz: {
              question: "Apakah yang dimaksud dengan fitur Dynamic Typing pada variabel Python?",
              options: [
                "Variabel harus terus diganti nilainya",
                "Tipe data variabel dideteksi otomatis secara dinamis oleh interpreter sesuai nilai yang diisi",
                "Variabel hanya bisa menyimpan data String",
                "Variabel tidak menggunakan alokasi RAM"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Soekarno Hatta\n",
                description: "Variabel string Python"
              }
            ]
          }
        ]
      },
      {
        id: "py4-m2",
        title: "Tipe Data & Casting Python",
        lessons: [
          {
            id: "py4-l3",
            title: "Tipe Data & Casting",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data Python meliputi: <strong>Number</strong> (int, float), <strong>String</strong>, dan <strong>Boolean</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><em>Penting</em>: Nilai boolean di Python bersifat Case-Sensitive dan wajib diawali huruf kapital: <strong>True</strong> dan <strong>False</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk konversi tipe data, gunakan fungsi casting:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>int()</strong>: Mengubah data ke bilangan bulat.</li>\n  <li><strong>float()</strong>: Mengubah data ke bilangan pecahan.</li>\n  <li><strong>str()</strong>: Mengubah data ke string/teks.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>bilangan_pertama = 15\nbilangan_kedua = 4\nhasil = float(bilangan_pertama) / float(bilangan_kedua)\nprint(hasil)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">3.75</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "bilangan_pertama = 15\nbilangan_kedua = 4\nhasil = float(bilangan_pertama) / float(bilangan_kedua)\nprint(hasil)",
            initialCode: "angka_str = \"15\"\n# Lakukan casting ke float() dan cetak hasil pembagian (angka_str / 2)\n",
            solution: "angka_str = \"15\"\nprint(float(angka_str) / 2)",
            hint: "Tulis print(float(angka_str) / 2)",
            quiz: {
              question: "Manakah dari nilai boolean berikut yang penulisan sintaksnya valid di Python?",
              options: [
                "true",
                "false",
                "True",
                "TRUE"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "7.5\n",
                description: "Casting float division"
              }
            ],
            validationRules: [
              {
                pattern: "float\\s*\\(",
                message: "Gunakan fungsi float() untuk casting",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m3",
        title: "Operator & Input/Output",
        lessons: [
          {
            id: "py4-l4",
            title: "Operator Aritmatika, Perbandingan & Logika",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator di Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Aritmatika</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code> (modulo), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><strong></code> (Pemangkatan khusus, contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">10 </strong> 2</code> hasil 100).</li>\n  <li><strong>Perbandingan</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">></code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">>=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><=</code>.</li>\n  <li><strong>Logika</strong>: Menggunakan kata bahasa Inggris murni: <strong>and</strong>, <strong>or</strong>, dan <strong>not</strong>.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(10 ** 2)\nprint((5 &lt;= 10) and (5 == 5))</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">100\nTrue</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "print(10 ** 2)\nprint((5 <= 10) and (5 == 5))",
            initialCode: "# Cetak hasil pemangkatan dari 2 pangkat 4 menggunakan operator **\n",
            solution: "print(2 ** 4)",
            hint: "Ketik print(2 ** 4)",
            quiz: {
              question: "Berapakah hasil keluaran dari operasi pemangkatan 10 ** 2 di Python?",
              options: [
                "20",
                "100",
                "1000",
                "10"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "16\n",
                description: "Hasil 2 pangkat 4"
              }
            ]
          },
          {
            id: "py4-l5",
            title: "Interaksi I/O (input, print, f-string)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operasi I/O di Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>input()</strong>: Membaca input keyboard. <em>Penting</em>: Secara default selalu menghasilkan tipe data <strong>String</strong>.</li>\n  <li><strong>print()</strong>: Menampilkan output. Variabel dipanggil menggunakan koma (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">,</code>) atau operator penggabungan string (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>).</li>\n  <li><strong>f-string</strong>: String dinamis menggunakan huruf awalan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f</code> di depan petik, lalu memanggil variabel dalam kurung kurawal (contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"Usia: {usia}\"</code>).</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = input(\"Siapa Namamu : \")\nprint(\"Terdaftar Bos: \" + nama)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Siapa Namamu : Budi\nTerdaftar Bos: Budi</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = \"Budi\"\nprint(\"Terdaftar Bos: \" + nama)",
            initialCode: "# Minta input teks dari user dengan prompt \"Masukkan nama: \" ke variabel 'nama'\n# Cetak variabel tersebut\n",
            solution: "nama = input(\"Masukkan nama: \")\nprint(nama)",
            hint: "Tulis nama = input(\"Masukkan nama: \") dilanjutkan print(nama)",
            quiz: {
              question: "Apakah tipe data default yang dikembalikan dari hasil pembacaan fungsi input() di Python?",
              options: [
                "Integer",
                "Boolean",
                "String",
                "Float"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                input: "Budi",
                expectedOutput: "Masukkan nama: Budi\n",
                description: "Input output basic"
              }
            ],
            validationRules: [
              {
                pattern: "input\\s*\\(",
                message: "Gunakan fungsi input()",
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
