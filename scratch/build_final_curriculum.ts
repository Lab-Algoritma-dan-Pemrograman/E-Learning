import fs from 'fs';
import path from 'path';

function formatInlineStyles(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">$1</code>');
}

function convertMarkdownToHtml(md: string): string {
  const lines = md.split('\n');
  let result = '';
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        inList = false;
        listType = null;
      }
      continue;
    }
    
    // Check if list item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        if (inList) {
          result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        }
        result += '<ul class="list-disc pl-5 space-y-1 my-2 text-zinc-700">\n';
        inList = true;
        listType = 'ul';
      }
      const itemContent = trimmed.substring(2);
      result += `  <li>${formatInlineStyles(itemContent)}</li>\n`;
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        if (inList) {
          result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        }
        result += '<ol class="list-decimal pl-5 space-y-1 my-2 text-zinc-700">\n';
        inList = true;
        listType = 'ol';
      }
      const itemContent = trimmed.replace(/^\d+\.\s/, '');
      result += `  <li>${formatInlineStyles(itemContent)}</li>\n`;
    } else {
      if (inList) {
        result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        inList = false;
        listType = null;
      }
      result += `<p class="mb-4 text-zinc-700 leading-relaxed">${formatInlineStyles(trimmed)}</p>\n`;
    }
  }
  
  if (inList) {
    result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
  }
  
  return result;
}

function makeExplanation(materi: string, code: string, command: string, output: string): string {
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  return `
    <div class="space-y-4">
      ${materi}
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Contoh Penggunaan Kode:</div>
        <pre class="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800"><code>${escapedCode}</code></pre>
      </div>
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Output Terminal (Mac):</div>
        <div class="bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl">
          <div class="flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
            <span class="ml-2 text-[10px] font-bold text-zinc-400">macbook-pro — ~user/workspace</span>
          </div>
          <div class="whitespace-pre-wrap font-semibold leading-relaxed">
            <span class="text-zinc-500">$ ${command}</span>
            <span class="block mt-1 text-zinc-100">${output}</span>
          </div>
        </div>
      </div>
    </div>
  `.trim();
}

// Full curriculum definition mirroring the PDF layout
const curriculumData = [
  // ============================================================
  // LEVEL 1: BAHASA C DASAR (MODUL I PDF)
  // ============================================================
  {
    id: 'c-level-1',
    title: 'DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C',
    description: 'Memahami alur flowchart, struktur penulisan program C, tipe data dasar, konstanta, input/output dasar, dan operator.',
    modules: [
      {
        id: 'c1-m1',
        title: 'Logika Flowchart & Struktur C',
        lessons: [
          {
            id: 'c1-l1',
            title: 'Logika & Flowchart',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Algoritma adalah urutan langkah logis untuk menyelesaikan masalah.\nSebelum diubah menjadi kode program Bahasa C, alur logika ini biasanya divisualisasikan menggunakan **Flowchart** (Bagan Alir).\n\nSimbol-simbol utama dalam flowchart meliputi:\n- **Oval (Terminal)**: Titik awal (Start) atau akhir (End) program.\n- **Persegi Panjang (Process)**: Proses pengolahan data atau perhitungan rumus.\n- **Belah Ketupat (Decision)**: Percabangan kondisi (Yes/No).\n- **Jajar Genjang (Input/Output)**: Pembacaan data masukan atau pencetakan keluaran.`
              ),
              `// Contoh flowchart algoritma kehidupan nyata:
1. Start (Mulai)
2. Masukkan air & kopi (Input)
3. Panaskan air (Process)
4. Kopi siap (Output)
5. End (Selesai)`,
              'cat algoritma.txt',
              `1. Start\n2. Masukkan air & kopi\n3. Panaskan air\n4. Kopi siap\n5. End`
            ),
            codeExample: `// Contoh implementasi langkah Flowchart:
// 1. Start
// 2. Masukkan air & kopi
// 3. Panaskan air
// 4. Kopi siap
// 5. End`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Tulis print simulasi langkah Flowchart: "1. Start\\n"\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    printf("1. Start\\n");\n    return 0;\n}`,
            hint: `Ketik printf("1. Start\\n");`,
            quiz: {
              question: `Simbol belah ketupat dalam diagram flowchart melambangkan apa?`,
              options: [`Terminal (Awal/Akhir)`, `Proses Perhitungan`, `Keputusan/Kondisi (Decision)`, `Input/Output`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '1. Start\n', description: 'Cetak 1. Start' }]
          },
          {
            id: 'c1-l2',
            title: 'Struktur Program & Header C',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Struktur dasar program C terdiri dari header dan fungsi utama.\n\n- **#include <stdio.h>** adalah bagian yang berfungsi mengimpor fungsi standard input-output (seperti \`printf\` dan \`scanf\`).\n- **int main()** adalah entry point utama tempat jalannya program pertama kali.\n- **return 0;** menandakan akhir program ditutup secara wajar.\nSetiap instruksi di dalam C wajib diakhiri dengan Titik Koma (\`;\`)!`
              ),
              `#include <stdio.h>\n\nint main() {\n    printf("Hallo Semua\\n");\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Hallo Semua'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    printf("Hallo Semua\\n");\n    return 0;\n}`,
            initialCode: `// Lengkapi library header dan fungsi main\n\n    printf("Hello World\\n");\n    return 0;\n}`,
            solution: `#include <stdio.h>\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}`,
            hint: `Tulis #include <stdio.h> dan int main() {`,
            quiz: {
              question: `File header stdio.h di bahasa C digunakan untuk apa?`,
              options: [`Operasi Matematika Pow/Sin/Cos`, `Standard Input/Output (seperti printf dan scanf)`, `Manipulasi String`, `Struktur data dinamis`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Hello World\n', description: 'Cetak Hello World' }],
            validationRules: [
              { pattern: `;`, message: `Setiap statement wajib diakhiri titik koma`, shouldExist: true },
              { pattern: `main`, message: `Harus mendeteksi fungsi main()`, shouldExist: true },
              { pattern: `#include\\s*<stdio.h>`, message: `Wajib menyertakan library stdio.h`, shouldExist: true }
            ]
          }
        ]
      },
      {
        id: 'c1-m2',
        title: 'Tipe Data, Variabel & Konstanta',
        lessons: [
          {
            id: 'c1-l3',
            title: 'Tipe Data Dasar & Pengaturan Desimal',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Bahasa C mendukung beberapa tipe data dasar:\n- **char**: Karakter tunggal (\`'A'\`, \`'B'\` dll, format \`%c\` atau \`%s\` untuk teks).\n- **int**: Bilangan bulat (format \`%d\` / \`%i\`).\n- **float**: Pecahan (desimal, format \`%f\`).\n- **double**: Pecahan presisi ganda (format \`%lf\`).\n\nPengaturan cetak desimal menggunakan format **%m.nf** di mana **n** menyatakan batas maksimum digit di belakang koma (contoh: \`%.2f\` membatasi pecahan hingga 2 angka).`
              ),
              `#include <stdio.h>\n\nint main() {\n    printf("%4.2f\\n", 3.5);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              '3.50'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    printf("%4.2f\\n", 3.5);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Cetak angka desimal 3.5 dibatasi 2 angka di belakang koma\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    printf("%.2f\\n", 3.5);\n    return 0;\n}`,
            hint: `Gunakan format %.2f di dalam printf`,
            quiz: {
              question: `Berapa jumlah digit di belakang koma yang dicetak jika menggunakan format %4.2f pada angka 3.5?`,
              options: [`4 digit`, `2 digit`, `1 digit`, `Semua digit`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '3.50\n', description: 'Cetak desimal dengan 2 angka belakang koma' }]
          },
          {
            id: 'c1-l4',
            title: 'Deklarasi Konstanta',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Konstanta adalah penampung data yang nilainya **tetap** dan tidak dapat dirubah setelah diinisialisasi.\n\nDalam bahasa C, konstanta dapat dibuat menggunakan:\n1. **#define**: Deklarasi preprocessor di luar fungsi main (contoh: \`#define PHI 3.14\`).\n2. **const**: Deklarasi variabel konstan menggunakan tipe data (contoh: \`const float PI = 3.14;\`).`
              ),
              `#include <stdio.h>\n#define PHI 3.14\n\nint main() {\n    printf("Konstanta PHI: %.2f\\n", PHI);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Konstanta PHI: 3.14'
            ),
            codeExample: `#include <stdio.h>\n#define PHI 3.14\n\nint main() {\n    printf("Konstanta PHI: %.2f\\n", PHI);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n// Deklarasikan PHI bernilai 3.14 menggunakan preprocessor #define\n\nint main() {\n    printf("PHI: %.2f\\n", PHI);\n    return 0;\n}`,
            solution: `#include <stdio.h>\n#define PHI 3.14\n\nint main() {\n    printf("PHI: %.2f\\n", PHI);\n    return 0;\n}`,
            hint: `Tulis #define PHI 3.14 di paling atas program`,
            quiz: {
              question: `Manakah dari sifat berikut yang membedakan Konstanta dari Variabel biasa?`,
              options: [`Konstanta memerlukan RAM 10x lebih banyak`, `Nilai konstanta bersifat mutlak/tetap dan tidak dapat dimodifikasi selama runtime`, `Konstanta hanya dapat digunakan dalam file header`, `Konstanta tidak memiliki tipe data`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'PHI: 3.14\n', description: 'Cetak konstanta PHI' }],
            validationRules: [
              { pattern: `#define\\s+PHI\\s+3\\.14|const\\s+float\\s+PHI\\s*=\\s*3\\.14`, message: `Gunakan #define PHI 3.14 atau const float PHI = 3.14`, shouldExist: true }
            ]
          }
        ]
      },
      {
        id: 'c1-m3',
        title: 'Fungsi I/O Lengkap & Operator',
        lessons: [
          {
            id: 'c1-l5',
            title: 'Memasukkan Data (scanf, gets, getchar, getch)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Bahasa C memiliki beberapa fungsi untuk membaca masukan:\n- **scanf()**: Membaca input terformat. Menggunakan operator alamat \`&\` untuk mereferensikan variabel tujuan (contoh: \`&usia\`).\n- **gets()**: Membaca satu baris string utuh beserta spasi hingga tombol Enter ditekan.\n- **getchar()**: Membaca karakter tunggal.\n- **getch()**: Membaca input karakter tanpa menampilkannya ke layar (biasa untuk sandi/password).`
              ),
              `#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf("Ketik nama: ");\n    scanf("%[^\\n]", nama);\n    printf("Nama: %s\\n", nama);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Ketik nama: Budi Santoso\nNama: Budi Santoso'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf("Ketik nama: ");\n    scanf("%[^\\n]", nama);\n    printf("Nama: %s\\n", nama);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf("Ketik nama: ");\n    // Gunakan scanf untuk membaca input berspasi %[^\n]\n    \n    printf("Nama: %s\\n", nama);\n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf("Ketik nama: ");\n    scanf("%[^\\n]", nama);\n    printf("Nama: %s\\n", nama);\n    return 0;\n}`,
            hint: `Tulis scanf("%[^\\n]", nama);`,
            quiz: {
              question: `Operator alamat manakah yang wajib disertakan pada argumen variabel target di fungsi scanf()?`,
              options: [`Operator Bintang (*)`, `Operator Ampersand (&)`, `Operator Persen (%)`, `Operator Tilde (~)`],
              correctAnswer: 1
            },
            testCases: [{ input: 'Budi Santoso', expectedOutput: 'Ketik nama: Nama: Budi Santoso\n', description: 'Membaca nama berspasi' }],
            validationRules: [
              { pattern: `scanf\\s*\\(\\s*["'].*["']\\s*,\\s*&?nama\\s*\\)`, message: `Gunakan scanf dengan parameter nama`, shouldExist: true }
            ]
          },
          {
            id: 'c1-l6',
            title: 'Menampilkan Data (printf, puts, putchar)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Fungsi untuk menampilkan keluaran di C:\n- **printf()**: Sangat fleksibel, mencetak teks terformat tetapi tidak otomatis berganti baris.\n- **puts()**: Hanya mencetak string dan otomatis menambahkan baris baru (\`\\n\`) di ujung keluaran.\n- **putchar()**: Mencetak satu karakter saja ke layar.`
              ),
              `#include <stdio.h>\n\nint main() {\n    puts("Halo Dunia");\n    putchar('Z');\n    putchar('\\n');\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Halo Dunia\nZ'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    puts("Halo Dunia");\n    putchar('Z');\n    putchar('\\n');\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Gunakan puts() untuk mencetak teks "Halo Dunia"\n    // Gunakan putchar() untuk mencetak karakter tunggal 'Z'\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    puts("Halo Dunia");\n    putchar('Z');\n    putchar('\\n');\n    return 0;\n}`,
            hint: `Tulis puts("Halo Dunia"); dilanjutkan putchar('Z');`,
            quiz: {
              question: `Apakah keuntungan utama menggunakan fungsi puts() dibanding printf()?`,
              options: [`Dapat memproses kalkulasi matematika`, `Otomatis mencetak baris baru (newline) di akhir output`, `Mendukung format pecahan %f`, `Program berjalan 2x lebih cepat`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Halo Dunia\nZ\n', description: 'Pencetakan puts dan putchar' }]
          },
          {
            id: 'c1-l7',
            title: 'Operator Unary, Aritmatika & Logika',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Operator di C meliputi:\n- **Unary**: Pre-increment (\`++x\`, nilai diubah sebelum dibaca) vs Post-increment (\`x++\`, nilai dibaca baru diubah).\n- **Aritmatika**: \`+\`, \`-\`, \`*\`, \`/\`, dan \`%\` (Modulo/sisa pembagian).\n- **Relasi & Logika**: \`==\`, \`!=\`, \`&&\` (AND), \`||\` (OR), \`!\` (NOT).`
              ),
              `#include <stdio.h>\n\nint main() {\n    int a = 10 % 3;\n    int x = 5;\n    printf("Modulo: %d, ++x: %d\\n", a, ++x);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Modulo: 1, ++x: 6'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    int a = 10 % 3;\n    int x = 5;\n    printf("Modulo: %d, ++x: %d\\n", a, ++x);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Tampilkan hasil modulo 10 % 3 dan pre-increment ++x (nilai awal x = 5)\n    int x = 5;\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    int x = 5;\n    printf("Modulo: %d, ++x: %d\\n", 10 % 3, ++x);\n    return 0;\n}`,
            hint: `Tulis modulo 10 % 3 dan ++x dalam satu printf`,
            quiz: {
              question: `Berapakah sisa pembagian dari operasi modulo 10 % 3?`,
              options: [`3`, `1`, `0`, `3.33`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Modulo: 1, ++x: 6\n', description: 'Output modulo & pre-increment C' }]
          }
        ]
      }
    ]
  },
  // ============================================================
  // LEVEL 2: STRUKTUR KONTROL BAHASA C (MODUL II PDF)
  // ============================================================
  {
    id: 'c-level-2',
    title: 'STRUKTUR KONTROL DALAM BAHASA C',
    description: 'Mengatur alur kontrol program menggunakan percabangan (if-else), switch-case, loop (while, for), dan jumps.',
    modules: [
      {
        id: 'c2-m1',
        title: 'Percabangan (Decisions)',
        lessons: [
          {
            id: 'c2-l1',
            title: 'Kontrol Kondisi (If & If-Else)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Percabangan memandu rute program berdasarkan kebenaran suatu kondisi.\n- **if**: Menjalankan blok jika kondisi True.\n- **else**: Blok alternatif bila kondisi False.\n\n*Penting*: Jangan menaruh titik koma tepat setelah tanda kurung kondisi if (\`if(x > 0);\`). Hal ini akan dianggap sebagai statement kosong dan blok di bawahnya akan dieksekusi tanpa mempedulikan kondisi!`
              ),
              `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    if (x > 0) {\n        printf("Positif\\n");\n    } else {\n        printf("Negatif\\n");\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Positif'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    if (x > 0) {\n        printf("Positif\\n");\n    } else {\n        printf("Negatif\\n");\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    int x = -5;\n    // Cek jika x > 0 cetak "Positif", jika tidak cetak "Negatif"\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    int x = -5;\n    if (x > 0) {\n        printf("Positif\\n");\n    } else {\n        printf("Negatif\\n");\n    }\n    return 0;\n}`,
            hint: `Gunakan struktur: if (x > 0) { ... } else { ... }`,
            quiz: {
              question: `Apa yang terjadi jika Anda meletakkan semicolon setelah kurung kondisi if, seperti: if (x > 10); ?`,
              options: [`Program langsung mematikan PC`, `Semicolon membatalkan seleksi kondisi sehingga baris berikutnya selalu jalan`, `Kompiler langsung melempar Syntax Error`, `Program berjalan 2x lebih lambat`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Negatif\n', description: 'Cek bilangan negatif' }]
          },
          {
            id: 'c2-l2',
            title: 'Percabangan Bertingkat (If-Else If-Else)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Ketika ada lebih dari dua rute keputusan, gunakan **else if**.\nKondisi dievaluasi dari atas ke bawah secara berantai. Ranting pertama yang memicu True akan dijalankan dan seluruh ranting di bawahnya dilewati otomatis.\n\n*Praktik Baik*: Tempatkan kondisi dengan syarat paling ketat/berat di bagian paling atas untuk menghindari bypass kondisi.`
              ),
              `#include <stdio.h>\n\nint main() {\n    int skor = 85;\n    if (skor >= 90) {\n        printf("A\\n");\n    } else if (skor >= 80) {\n        printf("B\\n");\n    } else {\n        printf("C\\n");\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'B'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    int skor = 85;\n    if (skor >= 90) {\n        printf("A\\n");\n    } else if (skor >= 80) {\n        printf("B\\n");\n    } else {\n        printf("C\\n");\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    int skor = 75;\n    // Cek beranting: >= 90 (A), >= 80 (B), selain itu (C)\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    int skor = 75;\n    if (skor >= 90) {\n        printf("A\\n");\n    } else if (skor >= 80) {\n        printf("B\\n");\n    } else {\n        printf("C\\n");\n    }\n    return 0;\n}`,
            hint: `Tulis ranting if (skor >= 90) ... else if (skor >= 80) ... else ...`,
            quiz: {
              question: `Pada rangkaian if-else if bertingkat, ranting manakah yang akan dieksekusi jika kondisi teratas sudah terpenuhi (True)?`,
              options: [`Semua ranting di bawahnya ikut dieksekusi`, `Hanya ranting teratas saja, sisa ranting bawahnya dilewati otomatis`, `Hanya ranting else di paling akhir`, `Kompiler crash`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'C\n', description: 'Skor 75 bernilai C' }]
          },
          {
            id: 'c2-l3',
            title: 'Pilihan Konstan (Switch-Case)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Switch-case memandu pemilihan berdasarkan nilai konstan (integer atau char).\n- **case [nilai]:** Menandakan target nilai.\n- **break;** Wajib digunakan untuk mengakhiri case. Jika lupa, eksekusi akan merembes ke case bawahnya (**Fallthrough**).\n- **default:** Berperan seperti else (tong sampah akhir jika tidak ada case yang cocok).`
              ),
              `#include <stdio.h>\n\nint main() {\n    char op = '+';\n    switch(op) {\n        case '+':\n            printf("Tambah\\n");\n            break;\n        default:\n            printf("Default\\n");\n            break;\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Tambah'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    char op = '+';\n    switch(op) {\n        case '+':\n            printf("Tambah\\n");\n            break;\n        default:\n            printf("Default\\n");\n            break;\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    char op = '-';\n    // Buat switch untuk op, case '+': cetak "Tambah\n", case '-': cetak "Kurang\n", default: "Default\n"\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    char op = '-';\n    switch(op) {\n        case '+': printf("Tambah\\n"); break;\n        case '-': printf("Kurang\\n"); break;\n        default: printf("Default\\n"); break;\n    }\n    return 0;\n}`,
            hint: `Tulis switch(op) { case '+': ... break; case '-': ... break; default: ... }`,
            quiz: {
              question: `Apakah fenomena yang terjadi jika Anda lupa meletakkan perintah break; di setiap akhir blok case pada switch-case?`,
              options: [`Kompiler langsung melemparkan Syntax Error`, `Program memicu infinite loop`, `Terjadi Fallthrough, di mana case di bawahnya langsung kesapu ikut berjalan`, `Data memory leak`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: 'Kurang\n', description: 'Operasi kurang switch case' }],
            validationRules: [
              { pattern: `switch\\s*\\(`, message: `Gunakan keyword switch`, shouldExist: true },
              { pattern: `break\\s*;`, message: `Sertakan perintah break;`, shouldExist: true }
            ]
          }
        ]
      },
      {
        id: 'c2-m2',
        title: 'Perulangan & Peloncatan (Loops & Jumps)',
        lessons: [
          {
            id: 'c2-l4',
            title: 'Perulangan Bersyarat (While & Do-While)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Perulangan berdasarkan kondisi boolean:\n- **while**: Evaluasi kondisi di awal. Jika kondisi awal False, blok loop tidak akan pernah dieksekusi.\n- **do-while**: Evaluasi di akhir. Menjamin blok kode di atasnya dijalankan **minimal 1 kali** sebelum pengecekan kondisi.`
              ),
              `#include <stdio.h>\n\nint main() {\n    int x = 3;\n    do {\n        printf("%d\\n", x);\n        x--;\n    } while (x > 0);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              '3\n2\n1'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    int x = 3;\n    do {\n        printf("%d\\n", x);\n        x--;\n    } while (x > 0);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    int x = 2;\n    // Gunakan do-while untuk mencetak nilai x kemudian kurangi x-- selama x > 0\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    int x = 2;\n    do {\n        printf("%d\\n", x);\n        x--;\n    } while (x > 0);\n    return 0;\n}`,
            hint: `Ketik do { printf("%d\\n", x); x--; } while(x > 0);`,
            quiz: {
              question: `Di manakah letak pengecekan kondisi pada struktur perulangan do-while?`,
              options: [`Di paling awal sebelum blok dimulai`, `Di dalam library header`, `Di paling akhir setelah tanda kurung penutup blok`, `Tidak memiliki pengecekan kondisi`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '2\n1\n', description: 'Perulangan do-while mundur' }]
          },
          {
            id: 'c2-l5',
            title: 'Perulangan Pasti (For Loop)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `For loop mengendalikan iterasi terukur dalam 3 bagian instrumen utama:\n\`for (inisialisasi; kondisi_batas; step) { ... }\`\n\n- **Inisialisasi**: Set nilai awal variabel pencatat.\n- **Kondisi batas**: Loop berputar selama kondisi bernilai True.\n- **Step**: Modifikasi pencatat (increment/decrement) di akhir setiap putaran.`
              ),
              `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              '1\n2\n3'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Bikin for loop untuk mencetak angka 1 s.d. 3 secara berurutan\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
            hint: `Tulis for (int i = 1; i <= 3; i++) { printf("%d\\n", i); }`,
            quiz: {
              question: `Simbol pemisah apakah yang digunakan di dalam kurung parameter loop for?`,
              options: [`Koma (,)`, `Titik Dua (:)`, `Titik Koma (;)`, `Persen (%)`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '1\n2\n3\n', description: 'For loop 1-3' }]
          },
          {
            id: 'c2-l6',
            title: 'Statemen Peloncatan (goto, break, continue)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Instruksi pelompatan alur:\n- **break**: Keluar dari loop saat itu juga.\n- **continue**: Melewati sisa baris kode loop saat itu dan langsung melompat ke putaran berikutnya.\n- **goto [label];**: Melompat langsung ke label tertentu di dalam fungsi. *Sangat dihindari* karena merusak struktur program.`
              ),
              `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0) continue;\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              '1\n3\n5'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0) continue;\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        // Lewati cetakan jika i bernilai 2 menggunakan continue\n        \n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        if (i == 2) continue;\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
            hint: `Bikin if (i == 2) continue; sebelum printf`,
            quiz: {
              question: `Mengapa penggunaan goto sangat dihindari dalam pemrograman modern (Clean Code)?`,
              options: [`Membuat ukuran file compile menjadi 10x lebih besar`, `Memicu spaghetti code yang sangat sulit dibaca dan dilacak alurnya`, `Menghapus memori RAM secara permanen`, `Hanya bisa jalan di OS lama`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '1\n3\n', description: 'Melompati angka 2' }]
          }
        ]
      }
    ]
  },
  // ============================================================
  // LEVEL 3: ARRAY, STRUCT & FILE C (MODUL III PDF)
  // ============================================================
  {
    id: 'c-level-3',
    title: 'ARRAY, STRUCT, DAN OPERASI FILE (C)',
    description: 'Membahas array dimensi banyak, string C purba, arsitektur composite Struct, dan pengarsipan stream File I/O.',
    modules: [
      {
        id: 'c3-m1',
        title: 'Array Dimensi Banyak',
        lessons: [
          {
            id: 'c3-l1',
            title: 'Array Satu Dimensi & Karakter Array',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Array adalah koleksi data bertipe homogen yang diletakkan pada memori berurutan (kontigu). Indeks array di C selalu dimulai dari **0**.\n\n**Konsep String C**: C tidak memiliki tipe data string bawaan. String direpresentasikan sebagai array karakter (\`char str[10]\`). String C wajib diakhiri oleh karakter khusus **Null Terminator (\\\\0)** di ujungnya agar kompiler tahu batas akhir string.`
              ),
              `#include <stdio.h>\n\nint main() {\n    char kata[] = {'H', 'a', 'l', 'o', '\\\\0'};\n    printf("%s\\n", kata);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Halo'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    char kata[] = {'H', 'a', 'l', 'o', '\\\\0'};\n    printf("%s\\n", kata);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Buat array int data berisi {10, 20, 30}\n    // Cetak nilai elemen kedua (indeks 1) menggunakan printf %d\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    int data[] = {10, 20, 30};\n    printf("%d\\n", data[1]);\n    return 0;\n}`,
            hint: `Akses elemen menggunakan index data[1]`,
            quiz: {
              question: `Karakter penanda akhir string (Null Terminator) pada array karakter bahasa C direpresentasikan dengan simbol...`,
              options: [`\\\\n`, `\\\\0`, `%s`, `#EOF`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '20\n', description: 'Mengakses indeks ke-1' }]
          },
          {
            id: 'c3-l2',
            title: 'Array Dua Dimensi (Matrix)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Array Dua Dimensi (Matrix) memiliki sumbu baris dan kolom yang merepresentasikan koordinat data.\nFormat deklarasinya: \`tipe_data nama_var[baris][kolom];\`\n\nUntuk mengakses nilainya, letakkan indeks baris diikuti indeks kolom secara spesifik (contoh: \`data[0][1]\` mengambil baris ke-0 pilar ke-1).`
              ),
              `#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    printf("Baris 0 Kolom 1: %d\\n", matrix[0][1]);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Baris 0 Kolom 1: 22'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    printf("Baris 0 Kolom 1: %d\\n", matrix[0][1]);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    // Cetak elemen baris ke-1 kolom ke-0 (nilainya 33)\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    int matrix[2][2] = {{11, 22}, {33, 44}};\n    printf("%d\\n", matrix[1][0]);\n    return 0;\n}`,
            hint: `Gunakan matrix[1][0] untuk baris 1 kolom 0`,
            quiz: {
              question: `Bagaimanakah cara mengakses sel baris pertama (indeks 0) kolom kedua (indeks 1) dari matrix 2D?`,
              options: [`matrix[0, 1]`, `matrix[0][1]`, `matrix[1][0]`, `matrix[0]->[1]`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '33\n', description: 'Cetak nilai baris 1 kolom 0' }]
          }
        ]
      },
      {
        id: 'c3-m2',
        title: 'Struct (Object Oriented C)',
        lessons: [
          {
            id: 'c3-l3',
            title: 'Arsitektur Struct & Dot Operator',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Array hanya bisa menyimpan data yang homogen. Untuk membuat tipe data campuran (heterogen), gunakan **Struct**.\n\nStruct bertindak sebagai blueprint objek custom. Variabel internal di dalamnya disebut **Field**. Pengaksesan field objek struct dilakukan secara murni menggunakan **Operator Titik (.)**.`
              ),
              `#include <stdio.h>\n\nstruct Mahasiswa {\n    char nama[20];\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m = {"Budi", 3.85};\n    printf("%s IPK %.2f\\n", m.nama, m.ipk);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Budi IPK 3.85'
            ),
            codeExample: `#include <stdio.h>\n\nstruct Mahasiswa {\n    char nama[20];\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m = {"Budi", 3.85};\n    printf("%s IPK %.2f\\n", m.nama, m.ipk);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nstruct Mahasiswa {\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m;\n    // Set field ipk milik m ke nilai 3.50, lalu cetak nilainya dengan %.2f\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nstruct Mahasiswa {\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa m;\n    m.ipk = 3.50;\n    printf("%.2f\\n", m.ipk);\n    return 0;\n}`,
            hint: `Tulis m.ipk = 3.50; lalu panggil di printf`,
            quiz: {
              question: `Operator apakah yang digunakan untuk menjangkau properti field internal dari sebuah objek struct di C?`,
              options: [`Tanda Panah (->)`, `Tanda Dollar ($)`, `Tanda Titik (.)`, `Double Ampersand (&&)`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '3.50\n', description: 'Setting ipk struct' }]
          },
          {
            id: 'c3-l4',
            title: 'Array of Struct',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Untuk menampung banyak data objek secara massal, kita dapat menyatukan konsep array dengan struct.\n\nContoh deklarasi:\n\`struct Mahasiswa listMhs[3];\`\nIni membuat laci array berkapasitas 3 slot di mana setiap indeks laci menampung data objek dengan field lengkap.`
              ),
              `#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    arr[0].id = 101;\n    printf("Node 0: %d\\n", arr[0].id);\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Node 0: 101'
            ),
            codeExample: `#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    arr[0].id = 101;\n    printf("Node 0: %d\\n", arr[0].id);\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    // Set id pada elemen indeks ke-1 menjadi 202, lalu cetak nilainya\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nstruct Node {\n    int id;\n};\n\nint main() {\n    struct Node arr[2];\n    arr[1].id = 202;\n    printf("%d\\n", arr[1].id);\n    return 0;\n}`,
            hint: `Ketik arr[1].id = 202;`,
            quiz: {
              question: `Apakah manfaat utama dari implementasi penggabungan Array of Struct?`,
              options: [`Mempercepat koneksi internet database`, `Mampu mengoleksi kumpulan data objek massal terstruktur secara rapi dalam indeks memori`, `Menghapus file secara otomatis`, `Mencegah syntax error compile`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '202\n', description: 'Akses array of struct index 1' }]
          }
        ]
      },
      {
        id: 'c3-m3',
        title: 'Operasi File Eksternal (FS Stream)',
        lessons: [
          {
            id: 'c3-l5',
            title: 'Pointer File & Mode Operasi (r, w, a)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Akses file disk drive di C menggunakan pointer khusus \`FILE *\` dan fungsi \`fopen("file.txt", "mode")\`.\n\nSandi perizinan mode file:\n- **"r" (Read)**: Membuka file untuk dibaca (Error jika file fiktif).\n- **"w" (Write)**: Membuat file baru untuk ditulis. *Destruktif*: Jika file sudah ada, isinya langsung dihapus total (di-overwrite).\n- **"a" (Append)**: Menambahkan tulisan di ujung/ekor akhir file.\nSetiap file yang dibuka wajib ditutup kembali menggunakan \`fclose(pointer_file);\`!`
              ),
              `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("test.txt", "w");\n    if (f != NULL) {\n        printf("File Terbuka\\n");\n        fclose(f);\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'File Terbuka'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("test.txt", "w");\n    if (f != NULL) {\n        printf("File Terbuka\\n");\n        fclose(f);\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Buka file "data.txt" dengan mode "w" menggunakan fopen dan segera tutup dengan fclose\n    FILE *fl;\n    \n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    FILE *fl = fopen("data.txt", "w");\n    if (fl != NULL) {\n        fclose(fl);\n    }\n    return 0;\n}`,
            hint: `Tulis fl = fopen("data.txt", "w"); diikuti fclose(fl);`,
            quiz: {
              question: `Manakah mode fopen() yang berbahaya bersifat destruktif menghapus seluruh teks lama di file saat dibuka?`,
              options: [`Mode Read "r"`, `Mode Append "a"`, `Mode Write "w"`, `Mode Read-Write "+r"`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '', description: 'Membuka dan menutup file' }],
            validationRules: [
              { pattern: `fopen\\s*\\(`, message: `Panggil fopen()`, shouldExist: true },
              { pattern: `fclose\\s*\\(`, message: `Gunakan fclose()`, shouldExist: true }
            ]
          },
          {
            id: 'c3-l6',
            title: 'Menulis & Membaca File (fprintf, fputs, fscanf, fgets)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Manipulasi data file:\n- **fprintf()**: Menulis teks terformat ke file (persis printf tapi argumen pertama adalah pointer file).\n- **fputs()**: Menulis string biasa ke file.\n- **fgets()**: Membaca data per baris dari file.\n- **rewind()**: Mengembalikan posisi kursor pembacaan file kembali ke titik awal.`
              ),
              `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("data.txt", "w");\n    if (f != NULL) {\n        fprintf(f, "Nilai: %d\\n", 100);\n        fclose(f);\n        printf("Tersimpan\\n");\n    }\n    return 0;\n}`,
              'gcc program.c -o program && ./program',
              'Tersimpan'
            ),
            codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("data.txt", "w");\n    if (f != NULL) {\n        fprintf(f, "Nilai: %d\\n", 100);\n        fclose(f);\n        printf("Tersimpan\\n");\n    }\n    return 0;\n}`,
            initialCode: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("data.txt", "w");\n    // Tulis ke file menggunakan fprintf teks "Skor: 95\n"\n    if (f != NULL) {\n        \n        fclose(f);\n    }\n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("data.txt", "w");\n    if (f != NULL) {\n        fprintf(f, "Skor: 95\\n");\n        fclose(f);\n    }\n    return 0;\n}`,
            hint: `Tulis fprintf(f, "Skor: 95\\n");`,
            quiz: {
              question: `Apakah perbedaan utama fungsi fprintf() dibandingkan dengan printf() biasa?`,
              options: [`fprintf() hanya bisa menulis data numerik pecahan`, `printf() mencetak ke layar monitor, sedangkan fprintf() menulis output ke stream file eksternal`, `fprintf() otomatis mengenkripsi data`, `fprintf() tidak memerlukan format specifier`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '', description: 'fprintf writing' }]
          }
        ]
      }
    ]
  },
  // ============================================================
  // LEVEL 4: PENGENALAN DASAR PYTHON (MODUL IV PDF)
  // ============================================================
  {
    id: 'py-level-1',
    title: 'PENGENALAN DASAR BAHASA PYTHON',
    description: 'Beralih ke sintaksis dinamis Python, pengenalan variabel dynamic typing, boolean case-sensitive, casting, dan I/O.',
    modules: [
      {
        id: 'py4-m1',
        title: 'Pendahuluan & Sintaksis Python',
        lessons: [
          {
            id: 'py4-l1',
            title: 'Pendahuluan & Sintaksis Dasar',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Python adalah bahasa tingkat tinggi yang dirancang untuk keterbacaan kode.\n\nPerbedaan radikal C vs Python:\n- **Typeless/Dinamis**: Tidak perlu mendeklarasikan tipe data di awal variabel.\n- **Sederhana**: Tanpa file header (\`#include\`), tanpa blok \`int main()\`, dan tanpa akhiran titik koma (\`;\`).\n- Untuk mencetak teks, cukup panggil \`print("teks")\`.`
              ),
              `print("HALLO SEMUA")`,
              'python3 program.py',
              'HALLO SEMUA'
            ),
            codeExample: `print("HALLO SEMUA")`,
            initialCode: `# Tulis print untuk menampilkan kalimat "HALLO SEMUA" di Python\n`,
            solution: `print("HALLO SEMUA")`,
            hint: `Ketik print("HALLO SEMUA")`,
            quiz: {
              question: `Manakah perbedaan utama penulisan Hello World di Python dibandingkan di C?`,
              options: [`Python mewajibkan file header stdio.h`, `Python tidak membutuhkan blok main() dan include header, melainkan langsung menggunakan fungsi print()`, `Python mewajibkan titik koma di akhir baris`, `Python hanya jalan di platform macOS`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'HALLO SEMUA\n', description: 'Cetak hello world Python' }]
          },
          {
            id: 'py4-l2',
            title: 'Variabel & Deklarasi Dynamic',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Mendeklarasikan variabel di Python sangat sederhana:\n\`Nama_variabel = <nilai>\`\n\nKetentuan variabel Python:\n- Tipe data otomatis dideteksi dari nilainya (**Dynamic Typing**).\n- Nama variabel case-sensitive dan harus diawali huruf/underscore.\n- Tidak boleh dipisah spasi. Gunakan underscore (\`_\`) jika terdiri dari 2 kata.`
              ),
              `nama = "Soekarno Hatta"\nusia = 55\nprint(nama, usia)`,
              'python3 program.py',
              'Soekarno Hatta 55'
            ),
            codeExample: `nama = "Soekarno Hatta"\nusia = 55\nprint(nama, usia)`,
            initialCode: `# Buat variabel nama_lengkap berisi "Soekarno Hatta"\n# Cetak variabel tersebut\n`,
            solution: `nama_lengkap = "Soekarno Hatta"\nprint(nama_lengkap)`,
            hint: `Tulis nama_lengkap = "Soekarno Hatta" lalu print(nama_lengkap)`,
            quiz: {
              question: `Apakah yang dimaksud dengan fitur Dynamic Typing pada variabel Python?`,
              options: [`Variabel harus terus diganti nilainya`, `Tipe data variabel dideteksi otomatis secara dinamis oleh interpreter sesuai nilai yang diisi`, `Variabel hanya bisa menyimpan data String`, `Variabel tidak menggunakan alokasi RAM`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Soekarno Hatta\n', description: 'Variabel string Python' }]
          }
        ]
      },
      {
        id: 'py4-m2',
        title: 'Tipe Data & Casting Python',
        lessons: [
          {
            id: 'py4-l3',
            title: 'Tipe Data & Casting',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Tipe data Python meliputi: **Number** (int, float), **String**, dan **Boolean**.\n\n*Penting*: Nilai boolean di Python bersifat Case-Sensitive dan wajib diawali huruf kapital: **True** dan **False**.\n\nUntuk konversi tipe data, gunakan fungsi casting:\n- **int()**: Mengubah data ke bilangan bulat.\n- **float()**: Mengubah data ke bilangan pecahan.\n- **str()**: Mengubah data ke string/teks.`
              ),
              `bilangan_pertama = 15\nbilangan_kedua = 4\nhasil = float(bilangan_pertama) / float(bilangan_kedua)\nprint(hasil)`,
              'python3 program.py',
              '3.75'
            ),
            codeExample: `bilangan_pertama = 15\nbilangan_kedua = 4\nhasil = float(bilangan_pertama) / float(bilangan_kedua)\nprint(hasil)`,
            initialCode: `angka_str = "15"\n# Lakukan casting ke float() dan cetak hasil pembagian (angka_str / 2)\n`,
            solution: `angka_str = "15"\nprint(float(angka_str) / 2)`,
            hint: `Tulis print(float(angka_str) / 2)`,
            quiz: {
              question: `Manakah dari nilai boolean berikut yang penulisan sintaksnya valid di Python?`,
              options: [`true`, `false`, `True`, `TRUE`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '7.5\n', description: 'Casting float division' }],
            validationRules: [
              { pattern: `float\\s*\\(`, message: `Gunakan fungsi float() untuk casting`, shouldExist: true }
            ]
          }
        ]
      },
      {
        id: 'py4-m3',
        title: 'Operator & Input/Output',
        lessons: [
          {
            id: 'py4-l4',
            title: 'Operator Aritmatika, Perbandingan & Logika',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Operator di Python:\n- **Aritmatika**: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulo), dan \`**\` (Pemangkatan khusus, contoh: \`10 ** 2\` hasil 100).\n- **Perbandingan**: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.\n- **Logika**: Menggunakan kata bahasa Inggris murni: **and**, **or**, dan **not**.`
              ),
              `print(10 ** 2)\nprint((5 <= 10) and (5 == 5))`,
              'python3 program.py',
              '100\nTrue'
            ),
            codeExample: `print(10 ** 2)\nprint((5 <= 10) and (5 == 5))`,
            initialCode: `# Cetak hasil pemangkatan dari 2 pangkat 4 menggunakan operator **\n`,
            solution: `print(2 ** 4)`,
            hint: `Ketik print(2 ** 4)`,
            quiz: {
              question: `Berapakah hasil keluaran dari operasi pemangkatan 10 ** 2 di Python?`,
              options: [`20`, `100`, `1000`, `10`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '16\n', description: 'Hasil 2 pangkat 4' }]
          },
          {
            id: 'py4-l5',
            title: 'Interaksi I/O (input, print, f-string)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Operasi I/O di Python:\n- **input()**: Membaca input keyboard. *Penting*: Secara default selalu menghasilkan tipe data **String**.\n- **print()**: Menampilkan output. Variabel dipanggil menggunakan koma (\`,\`) atau operator penggabungan string (\`+\`).\n- **f-string**: String dinamis menggunakan huruf awalan \`f\` di depan petik, lalu memanggil variabel dalam kurung kurawal (contoh: \`f"Usia: {usia}"\`).`
              ),
              `nama = input("Siapa Namamu : ")\nprint("Terdaftar Bos: " + nama)`,
              'python3 program.py',
              'Siapa Namamu : Budi\nTerdaftar Bos: Budi'
            ),
            codeExample: `nama = "Budi"\nprint("Terdaftar Bos: " + nama)`,
            initialCode: `# Minta input teks dari user dengan prompt "Masukkan nama: " ke variabel 'nama'\n# Cetak variabel tersebut\n`,
            solution: `nama = input("Masukkan nama: ")\nprint(nama)`,
            hint: `Tulis nama = input("Masukkan nama: ") dilanjutkan print(nama)`,
            quiz: {
              question: `Apakah tipe data default yang dikembalikan dari hasil pembacaan fungsi input() di Python?`,
              options: [`Integer`, `Boolean`, `String`, `Float`],
              correctAnswer: 2
            },
            testCases: [{ input: 'Budi', expectedOutput: 'Masukkan nama: Budi\n', description: 'Input output basic' }],
            validationRules: [
              { pattern: `input\\s*\\(`, message: `Gunakan fungsi input()`, shouldExist: true }
            ]
          }
        ]
      }
    ]
  },
  // ============================================================
  // LEVEL 5: PERCABANGAN & PERULANGAN PYTHON (MODUL V PDF)
  // ============================================================
  {
    id: 'py-level-2',
    title: 'PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON',
    description: 'Mengendalikan alur rute percabangan (if-elif-else) dengan hukum indentasi, loop for/while, dan deklarasi fungsi kustom.',
    modules: [
      {
        id: 'py5-m1',
        title: 'Kontrol Rute Percabangan',
        lessons: [
          {
            id: 'py5-l1',
            title: 'Percabangan Kondisional',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Percabangan di Python memiliki aturan penulisan yang ketat:\n- Menggunakan tanda **titik dua (:)** di akhir baris kondisi untuk membuka blok.\n- Menggunakan **Hukum Indentasi**: Semua baris kode di dalam blok percabangan harus digeser masuk (Tab / 4 spasi) untuk menandakan kelompok scope.\n- **elif** digunakan sebagai pengganti else-if berantai.\n- Kondisi komparasi tidak wajib diapit tanda kurung \`()\`.`
              ),
              `nilai = 80\nif nilai >= 90:\n    grade = "A"\nelif nilai >= 70:\n    grade = "B"\nelse:\n    grade = "C"\nprint(grade)`,
              'python3 program.py',
              'B'
            ),
            codeExample: `nilai = 80\nif nilai >= 90:\n    grade = "A"\nelif nilai >= 70:\n    grade = "B"\nelse:\n    grade = "C"\nprint(grade)`,
            initialCode: `debit = 30\n# Cek debit: jika > 50 cetak "Tinggi", jika 20 s.d 50 cetak "Sedang", selain itu cetak "Rendah"\n`,
            solution: `debit = 30\nif debit > 50:\n    print("Tinggi")\nelif debit >= 20:\n    print("Sedang")\nelse:\n    print("Rendah")`,
            hint: `Tulis if debit > 50: -> indent print("Tinggi") -> elif debit >= 20: -> indent print("Sedang") -> else: ...`,
            quiz: {
              question: `Apakah fungsi dari pengaturan indentasi spasi/tab yang menjorok ke kanan pada program Python?`,
              options: [`Hanya sebagai hiasan agar kode rapi`, `Mengelompokkan baris statement ke dalam satu blok kode cakupan (scope)`, `Menghemat penggunaan memori RAM`, `Mempercepat waktu kompilasi`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Sedang\n', description: 'Debit 30 sedang' }],
            validationRules: [
              { pattern: `if\\s+debit`, message: `Gunakan if`, shouldExist: true },
              { pattern: `elif\\s+debit`, message: `Gunakan elif`, shouldExist: true },
              { pattern: `else\\s*:`, message: `Gunakan else`, shouldExist: true }
            ]
          }
        ]
      },
      {
        id: 'py5-m2',
        title: 'Putaran Iterasi (Loops)',
        lessons: [
          {
            id: 'py5-l2',
            title: 'Perulangan Terukur (For Loop)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Perulangan **for** di Python dikategorikan sebagai *Counted Loop* (jumlah perulangan terukur pasti).\nFormulasi parameter: \`range(start, stop, step)\`\n\n- **start**: Indeks mulai (inklusif, default 0).\n- **stop**: Indeks rem henti (eksklusif, perulangan berhenti tepat satu langkah sebelum menyentuh angka stop).\n- **step**: Besarnya increment/decrement lompatan nilai (default +1).`
              ),
              `for a in range(1, 4):\n    print("Iterasi ke-", a)`,
              'python3 program.py',
              'Iterasi ke- 1\nIterasi ke- 2\nIterasi ke- 3'
            ),
            codeExample: `for a in range(1, 4):\n    print("Iterasi ke-", a)`,
            initialCode: `# Buat perulangan for menggunakan range untuk mencetak kata "Loop" sebanyak 3 kali\n`,
            solution: `for i in range(3):\n    print("Loop")`,
            hint: `Gunakan range(3) atau range(0, 3)`,
            quiz: {
              question: `Jika parameter parameter range(1, 11) dipanggil pada for loop, pada pencapaian nilai angka indeks berapakah loop akan ter-rem berhenti dieksekusi?`,
              options: [`Indeks ke-11`, `Indeks ke-10`, `Indeks ke-9`, `Indeks ke-12`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: 'Loop\nLoop\nLoop\n', description: 'Mengulang 3x' }]
          },
          {
            id: 'py5-l3',
            title: 'Perulangan Bersyarat (While Loop)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Perulangan **while** adalah *Uncounted Loop* (jumlah putaran tidak diketahui sebelumnya).\nLoop akan terus memutar bloknya selama kondisi boolean bernilai **True**.\n\n*Peringatan*: Wajib menyertakan statement increment/decrement (contoh: \`x += 1\`) di dalam blok loop agar kondisi bisa bernilai False dan program terhindar dari crash **Infinite Loop**!`
              ),
              `x = 1\nwhile x <= 3:\n    print("While ke-", x)\n    x += 1`,
              'python3 program.py',
              'While ke- 1\nWhile ke- 2\nWhile ke- 3'
            ),
            codeExample: `x = 1\nwhile x <= 3:\n    print("While ke-", x)\n    x += 1`,
            initialCode: `x = 1\n# Lengkapi perulangan while untuk mencetak x selama x <= 2, jangan lupa increment x += 1\nwhile x <= 2:\n`,
            solution: `x = 1\nwhile x <= 2:\n    print(x)\n    x += 1`,
            hint: `Tulis print(x) lalu tambahkan x += 1 di dalam blok while`,
            quiz: {
              question: `Apakah dampak terburuk jika Anda lupa menuliskan increment/decrement pengubah nilai kondisi di dalam blok loop while?`,
              options: [`Kompiler langsung memberikan error syntax`, `Program terjebak dalam Infinite Loop yang menyebabkan CPU/RAM overload hingga crash`, `Program berhenti secara wajar`, `Akurasi kalkulasi menurun`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '1\n2\n', description: 'Loop while 1-2' }],
            validationRules: [
              { pattern: `\\+=\\s*1`, message: `Gunakan increment += 1`, shouldExist: true }
            ]
          }
        ]
      },
      {
        id: 'py5-m3',
        title: 'Fungsi Custom Python',
        lessons: [
          {
            id: 'py5-l4',
            title: 'Deklarasi Fungsi (Def & Return)',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Fungsi adalah blok kode modular yang dapat dipanggil berulang kali.\n\nStruktur penulisan fungsi di Python:\n- **def** adalah kata kunci untuk memulai deklarasi fungsi.\n- Diikuti nama fungsi dan tanda kurung parameter, lalu ditutup titik dua (\`:\`).\n- **return** digunakan untuk melempar/mengembalikan nilai hasil pemrosesan keluar dari scope fungsi.`
              ),
              `def luas_segitiga(alas, tinggi):\n    hasil = 0.5 * alas * tinggi\n    return hasil\n\nprint(luas_segitiga(10, 5))`,
              'python3 program.py',
              '25.0'
            ),
            codeExample: `def luas_segitiga(alas, tinggi):\n    hasil = 0.5 * alas * tinggi\n    return hasil\n\nprint(luas_segitiga(10, 5))`,
            initialCode: `# Deklarasikan fungsi bernama hitung_kali dengan parameter (a, b) yang mengembalikan hasil kali keduanya\n`,
            solution: `def hitung_kali(a, b):\n    return a * b`,
            hint: `Ketik def hitung_kali(a, b): lalu kembalikan return a * b`,
            quiz: {
              question: `Kata kunci (keyword) apakah yang digunakan untuk mendeklarasikan pembuatan fungsi kustom di Python?`,
              options: [`function`, `def`, `void`, `define`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '', description: 'Custom function validation' }],
            validationRules: [
              { pattern: `def\\s+hitung_kali`, message: `Definisikan fungsi hitung_kali`, shouldExist: true },
              { pattern: `return`, message: `Gunakan keyword return`, shouldExist: true }
            ]
          }
        ]
      }
    ]
  },
  // ============================================================
  // LEVEL 6: LIST, DICTIONARY & FILE HANDLING PYTHON (MODUL VI PDF)
  // ============================================================
  {
    id: 'py-level-3',
    title: 'LIST, DICTIONARY, DAN OPERASI FILE (PYTHON)',
    description: 'Mengelola list mutable dinamis, pemetaan data dictionary key-value, dan operasi file (with open).',
    modules: [
      {
        id: 'py6-m1',
        title: 'Tipe Data Koleksi Python',
        lessons: [
          {
            id: 'py6-l1',
            title: 'List Dinamis & Manipulasi Elemen',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `**List** adalah tipe data array dinamis yang bersifat **mutable** (isinya dapat diganti, ditambah, atau dihapus secara bebas).\nList dibuat dengan tanda kurung siku \`[ ]\`.\n\nFungsi manipulasi list utama:\n- **insert(i, item)**: Menyisipkan elemen di posisi indeks ke-i.\n- **append(item)**: Menambahkan elemen di paling ujung akhir list.\n- **pop(i)**: Menghapus dan mengembalikan elemen di indeks ke-i.`
              ),
              `myList = [1, 2, 3]\nmyList.insert(len(myList), 4)\nprint(myList)`,
              'python3 program.py',
              '[1, 2, 3, 4]'
            ),
            codeExample: `myList = [1, 2, 3]\nmyList.insert(len(myList), 4)\nprint(myList)`,
            initialCode: `angka = [1, 2, 3]\n# Tambahkan angka 4 ke bagian paling belakang menggunakan metode append()\n# Cetak variabel tersebut\n`,
            solution: `angka = [1, 2, 3]\nangka.append(4)\nprint(angka)`,
            hint: `Tulis angka.append(4) lalu print(angka)`,
            quiz: {
              question: `Fungsi list manakah yang bertugas untuk menyisipkan elemen baru pada posisi indeks tertentu?`,
              options: [`add()`, `insert()`, `push()`, `append()`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '[1, 2, 3, 4]\n', description: 'Append list' }]
          },
          {
            id: 'py6-l2',
            title: 'Dictionary Key-Value',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `**Dictionary** menyimpan data dalam bentuk pasangan kunci-nilai (key-value pairs) mirip struktur JSON.\nDictionary dibatasi tanda kurung kurawal \`{ }\` di mana kunci dan nilai dipisahkan titik dua (\`key: value\`).\n\nUntuk mengakses nilainya, kita menggunakan key (kunci) sebagai pengganti indeks numerik (contoh: \`data["nama"]\`).`
              ),
              `mahasiswa = {\n    "nama": "Naufal",\n    "umur": 20\n}\nprint(mahasiswa["nama"])`,
              'python3 program.py',
              'Naufal'
            ),
            codeExample: `mahasiswa = {\n    "nama": "Naufal",\n    "umur": 20\n}\nprint(mahasiswa["nama"])`,
            initialCode: `mahasiswa = {\n    "nama": "Naufal",\n    "umur": 20\n}\n# Cetak nilai umur dari dictionary mahasiswa\n`,
            solution: `mahasiswa = {\n    "nama": "Naufal",\n    "umur": 20\n}\nprint(mahasiswa["umur"])`,
            hint: `Tulis print(mahasiswa["umur"])`,
            quiz: {
              question: `Simbol apakah yang digunakan untuk memisahkan antara Kunci (Key) dengan Nilai (Value) pada dictionary Python?`,
              options: [`Koma (,)`, `Titik Koma (;)`, `Titik Dua (:)`, `Tanda Sama Dengan (=)`],
              correctAnswer: 2
            },
            testCases: [{ expectedOutput: '20\n', description: 'Akses dictionary key' }]
          }
        ]
      },
      {
        id: 'py6-m2',
        title: 'File Handling Python',
        lessons: [
          {
            id: 'py6-l3',
            title: 'Operasi File Python & Context Manager',
            explanation: makeExplanation(
              convertMarkdownToHtml(
                `Struktur operasi file paling aman di Python menggunakan block **with open() as file:**.\n\nKeuntungan utama \`with\`:\n- File ditutup otomatis secara aman setelah keluar dari lekukan blok kode, sehingga tidak membutuhkan penutupan manual (\`fclose\`).\n- Mendukung mode perizinan file standar: \`"r"\` (read), \`"w"\` (write/overwrite), dan \`"a"\` (append).`
              ),
              `with open("dummy.txt", "w") as file:\n    file.write("Kelass King\\n")\nprint("Sukses")`,
              'python3 program.py',
              'Sukses'
            ),
            codeExample: `with open("dummy.txt", "w") as file:\n    file.write("Kelass King\\n")\nprint("Sukses")`,
            initialCode: `# Gunakan context manager 'with open' untuk membuka file "dummy.txt" dengan mode write "w" sebagai 'f'\n# Tulis teks "Beres" ke dalamnya menggunakan f.write()\n`,
            solution: `with open("dummy.txt", "w") as f:\n    f.write("Beres")`,
            hint: `Tulis: with open("dummy.txt", "w") as f: -> indent f.write("Beres")`,
            quiz: {
              question: `Apakah keuntungan utama menggunakan blok context manager 'with open()' dibanding membuka file biasa di Python?`,
              options: [`File diproses 10x lebih cepat`, `File akan otomatis ditutup secara aman oleh sistem setelah keluar dari scope blok kode`, `File dienkripsi otomatis`, `Bebas dari virus komputer`],
              correctAnswer: 1
            },
            testCases: [{ expectedOutput: '', description: 'Write file with open context' }],
            validationRules: [
              { pattern: `with\\s+open\\s*\\(`, message: `Gunakan syntax with open()`, shouldExist: true },
              { pattern: `\\.write\\s*\\(`, message: `Gunakan method .write()`, shouldExist: true }
            ]
          }
        ]
      }
    ]
  }
];

async function run() {
  const outputFilePath = path.join(process.cwd(), './src/data/curriculum.ts');
  
  const fileHeader = `export interface ValidationRule {
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

`;

  function customStringify(val: any, indent: number = 0): string {
    const spaces = ' '.repeat(indent);
    if (typeof val === 'string') {
      return JSON.stringify(val);
    }
    if (typeof val === 'number' || typeof val === 'boolean' || val === null || val === undefined) {
      return String(val);
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return '[]';
      const items = val.map(item => customStringify(item, indent + 2)).join(',\n' + ' '.repeat(indent + 2));
      return `[\n${' '.repeat(indent + 2)}${items}\n${spaces}]`;
    }
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (keys.length === 0) return '{}';
      const fields = keys.map(key => {
        const isSafeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
        const formattedKey = isSafeKey ? key : `"${key}"`;
        return `${formattedKey}: ${customStringify(val[key], indent + 2)}`;
      }).join(',\n' + ' '.repeat(indent + 2));
      return `{\n${' '.repeat(indent + 2)}${fields}\n${spaces}}`;
    }
    return 'null';
  }

  const serializedCurriculum = `export const curriculum: Level[] = ${customStringify(curriculumData, 0)};\n`;
  
  fs.writeFileSync(outputFilePath, fileHeader + serializedCurriculum, 'utf8');
  console.log("✅ Curriculum successfully rebuilt and written to src/data/curriculum.ts");
}

run().catch(console.error);
