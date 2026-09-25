import { Level } from '../types';

// Re-export supaya import lama dari '../data/curriculum' tetap jalan.
export type { Level, Module, Lesson, Quiz, TestCase, ValidationRule } from '../types';

export const curriculum: Level[] = [
  {
    "id": "level-1",
    "title": "DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C",
    "description": "Materi Level 1",
    "accessMode": "auto",
    "locked": false,
    "modules": [
      {
        "id": "c-level-1-m1",
        "title": "Struktur Penulisan Program Bahasa C",
        "lessons": [
          {
            "id": "c-level-1-m1-l1",
            "title": "Penggunaan `#include` dan Header File",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap program C dimulai dengan menyertakan <strong>header file</strong> menggunakan direktif preprocessor <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code>. Header file adalah berkas berekstensi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.h</code> yang berisi deklarasi fungsi dan konstanta siap pakai dari pustaka standar C. Direktif <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code> ditulis di baris paling atas program, sebelum fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code>, dan tidak diakhiri titik koma.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Ada dua bentuk penulisan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code>: menggunakan tanda kurung sudut <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;nama.h&gt;</code> untuk header pustaka standar bawaan compiler (misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdio.h&gt;</code> untuk fungsi input/output), dan menggunakan tanda petik <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"nama.h\"</code> untuk header file yang kamu buat sendiri dan disimpan di folder proyek. Tanpa menyertakan header yang tepat, fungsi seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> tidak akan dikenali oleh compiler.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Header File</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi Utama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh Fungsi</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdio.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Input / Output standar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Utilitas umum</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">malloc()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">exit()</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;string.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Manipulasi string</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strlen()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcpy()</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;math.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Operasi matematika</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sqrt()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">pow()</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;ctype.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Klasifikasi karakter</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">isdigit()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">toupper()</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n#include &lt;stdlib.h&gt;\n\nint main() {\n    printf(&quot;Header file berhasil disertakan!\\n&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Header file berhasil disertakan!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    printf(\"Header file berhasil disertakan!\\n\");\n    return 0;\n}",
            "initialCode": "#include <__>\n#include <__>\n\nint main() {\n    printf(\"Program siap dijalankan!\\n\");\n    return 0;\n}",
            "solution": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    printf(\"Program siap dijalankan!\\n\");\n    return 0;\n}",
            "hint": "1. Pada baris 1, lengkapi nama header untuk fungsi printf().\n   - Nama header yang dibutuhkan: stdio.h\n   - Tanda kurung sudut < > sudah disediakan, tinggal isi nama filenya.\n\n2. Pada baris 2, lengkapi nama header kedua sesuai instruksi di atas.\n   - Nama header yang dibutuhkan: stdlib.h",
            "quiz": {
              "question": "Penulisan #include manakah yang digunakan untuk menyertakan header file **pustaka standar** bawaan compiler?",
              "options": [
                "#include \"stdio.h\"",
                "#include [stdio.h]",
                "#include <stdio.h>",
                "include <stdio.h>"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Program siap dijalankan!\n",
                "description": "<span>Lengkapi program C dengan menyertakan dua header file yang dibutuhkan: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdio.h&gt;</code> untuk fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Baris 1 harus: #include <stdio.h>",
                "pattern": "^\\s*#include\\s*<\\s*stdio\\.h\\s*>",
                "shouldExist": true
              },
              {
                "message": "Baris 2 harus: #include <stdlib.h>",
                "pattern": "^\\s*#include\\s*<\\s*stdlib\\.h\\s*>",
                "shouldExist": true
              },
              {
                "message": "Urutan header salah — stdio.h harus ditulis sebelum stdlib.h",
                "pattern": "#include\\s*<\\s*stdio\\.h\\s*>[\\s\\S]*#include\\s*<\\s*stdlib\\.h\\s*>",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m1-l3",
            "title": "Penggunaan `int main()` dan `return 0`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> adalah <strong>titik masuk wajib</strong> dari setiap program C — compiler akan mencari dan menjalankan fungsi ini pertama kali. Penulisan standar adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main()</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main(void)</code>, di mana kata <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> menandakan fungsi ini mengembalikan nilai bertipe integer ke sistem operasi setelah program selesai berjalan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pernyataan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return 0;</code> di akhir fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> adalah sinyal kepada sistem operasi bahwa program <strong>berakhir dengan sukses tanpa error</strong>. Nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> secara universal berarti \"berhasil\", sedangkan nilai selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> (misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return 1;</code>) menandakan program berakhir dengan kondisi error. Menghilangkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return 0;</code> pada beberapa compiler akan memunculkan peringatan, meskipun program tetap berjalan.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    printf(&quot;Program berjalan dengan sukses.\\n&quot;);\n    return 0; /* Sinyal sukses ke sistem operasi */\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Program berjalan dengan sukses.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    printf(\"Program berjalan dengan sukses.\\n\");\n    return 0; /* Sinyal sukses ke sistem operasi */\n}",
            "initialCode": "#include <stdio.h>\n\n__ main() {\n    printf(\"__\\n\");\n    return __;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    printf(\"Belajar C Dimulai!\\n\");\n    return 0;\n}",
            "hint": "1. Lengkapi tipe kembalian fungsi utama. Fungsi utama program C\n   selalu mengembalikan tipe: int\n\n2. Lengkapi isi teks yang ditampilkan oleh printf() sesuai output\n   yang diharapkan. Perhatikan tanda baca \"!\" dan karakter baris\n   baru \\n di akhir teks.\n\n3. Lengkapi nilai yang dikembalikan oleh fungsi main() untuk\n   menandakan program berakhir sukses (satu digit angka).",
            "quiz": {
              "question": "Apa arti nilai return 0; yang ditulis di akhir fungsi main() dalam program C?",
              "options": [
                "Menghentikan paksa program saat terjadi error",
                "Mengulang program dari awal sebanyak 0 kali",
                "Memberitahu sistem operasi bahwa program berakhir dengan sukses",
                "Mengembalikan nilai 0 ke variabel pertama dalam program"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Belajar C Dimulai!\n",
                "description": "<span>Lengkapi struktur dasar program C dengan menulis fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> yang menampilkan teks \"Belajar C Dimulai!\" dan diakhiri dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return 0</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Tipe kembalian fungsi main() harus: int main() {",
                "pattern": "int\\s+main\\s*\\(\\s*\\)\\s*\\{",
                "shouldExist": true
              },
              {
                "message": "Tampilkan teks dengan: printf(\"Belajar C Dimulai!\\n\");",
                "pattern": "printf\\s*\\(\\s*\"Belajar C Dimulai!\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Fungsi main() harus diakhiri dengan: return 0; sebelum tanda kurung kurawal penutup",
                "pattern": "return\\s+0\\s*;\\s*\\n?\\s*\\}",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m1-l4",
            "title": "Penggunaan Statement dan Titik Koma (`;`)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Dalam bahasa C, setiap <strong>statement</strong> (pernyataan/instruksi) harus diakhiri dengan <strong>titik koma (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code>)</strong>. Statement adalah satu unit instruksi lengkap yang diperintahkan kepada program, seperti memanggil fungsi, mendeklarasikan variabel, atau mengembalikan nilai. Titik koma berfungsi sebagai \"tanda titik\" di akhir kalimat — tanpanya, compiler tidak tahu di mana sebuah instruksi berakhir dan akan menghasilkan error kompilasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perlu dibedakan antara statement dan <strong>blok kode</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ ... }</code>). Blok kode seperti yang mengikuti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, atau definisi fungsi <strong>tidak membutuhkan</strong> titik koma setelah kurung kurawal penutupnya. Kesalahan umum pemula adalah melupakan titik koma setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> atau deklarasi variabel, atau sebaliknya, salah meletakkan titik koma setelah kurung kurawal.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int umur = 20;            /* Statement deklarasi variabel — wajib ada ; */\n    printf(&quot;Umur: %d\\n&quot;, umur); /* Statement pemanggilan fungsi — wajib ada ; */\n    return 0;                  /* Statement return — wajib ada ; */\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Umur: 20</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int umur = 20;            /* Statement deklarasi variabel — wajib ada ; */\n    printf(\"Umur: %d\\n\", umur); /* Statement pemanggilan fungsi — wajib ada ; */\n    return 0;                  /* Statement return — wajib ada ; */\n}",
            "initialCode": "#include <stdio.h>\n\nint main()__\n{\n    int nilai = 75__\n    printf(\"Nilai: %d\\n\", nilai);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main()\n{\n    int nilai = 75;\n    printf(\"Nilai: %d\\n\", nilai);\n    return 0;\n}",
            "hint": "1. Pada baris \"int main()\", terdapat tanda __ setelah tanda kurung\n   tutup. Tentukan apakah tanda titik koma (;) di posisi tersebut\n   diperlukan atau tidak, lalu isi blank dengan tanda yang benar\n   (boleh dikosongkan/hapus jika memang tidak diperlukan).\n\n2. Pada baris \"int nilai = 75\", terdapat tanda __ di akhir baris.\n   Tentukan apakah tanda titik koma (;) diperlukan di posisi tersebut,\n   lalu isi blank dengan tanda yang benar.\n\n3. Baris printf() dan return sudah benar — jangan diubah.",
            "quiz": {
              "question": "Di baris kode mana terjadi kesalahan penulisan titik koma?",
              "options": [
                "int nilai = 100;",
                "printf(\"Halo\\n\");",
                "int main() {",
                "return 0;"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Nilai: 75\n",
                "description": "<span>Perbaiki kode berikut yang memiliki titik koma yang salah tempat atau hilang agar bisa dikompilasi dengan benar.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Setelah int main() tidak boleh ada titik koma sebelum tanda kurung kurawal pembuka {",
                "pattern": "int\\s+main\\s*\\(\\s*\\)\\s*\\n?\\s*\\{",
                "shouldExist": true
              },
              {
                "message": "Baris deklarasi variabel harus diakhiri titik koma: int nilai = 75;",
                "pattern": "int\\s+nilai\\s*=\\s*75\\s*;",
                "shouldExist": true
              },
              {
                "message": "Periksa kembali urutan kode: int main() { lalu int nilai = 75; lalu printf(...)",
                "pattern": "main\\s*\\(\\s*\\)\\s*\\n?\\s*\\{[\\s\\S]*int\\s+nilai\\s*=\\s*75\\s*;[\\s\\S]*printf",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m2",
        "title": "Tipe Data Dasar",
        "lessons": [
          {
            "id": "c-level-1-m2-l1",
            "title": "Tipe Data `char`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> digunakan untuk menyimpan <strong>satu karakter</strong> tunggal, seperti huruf, angka sebagai karakter, atau simbol. Di memori, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> menyimpan bilangan bulat 8-bit (1 byte) yang merepresentasikan kode ASCII dari karakter tersebut. Nilainya ditulis dengan tanda petik tunggal: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'A'</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'z'</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'5'</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'@'</code>. Tanda petik ganda (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code>) digunakan untuk string (rangkaian karakter), bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> tunggal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> dapat bersifat <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">signed char</code> (rentang -128 hingga 127) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">unsigned char</code> (rentang 0 hingga 255). Format specifier untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%c</code>. Karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> pada dasarnya adalah integer, kamu bisa melakukan operasi aritmatika padanya — misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'A' + 1</code> menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'B'</code> (ASCII 65 + 1 = 66).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char huruf = &#039;C&#039;;\n    char simbol = &#039;@&#039;;\n    printf(&quot;Huruf: %c\\n&quot;, huruf);\n    printf(&quot;Simbol: %c\\n&quot;, simbol);\n    printf(&quot;Kode ASCII dari &#039;%c&#039; adalah: %d\\n&quot;, huruf, huruf);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Huruf: C\nSimbol: @\nKode ASCII dari &#039;C&#039; adalah: 67</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    char huruf = 'C';\n    char simbol = '@';\n    printf(\"Huruf: %c\\n\", huruf);\n    printf(\"Simbol: %c\\n\", simbol);\n    printf(\"Kode ASCII dari '%c' adalah: %d\\n\", huruf, huruf);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    __ inisial = __;\n    printf(\"Inisial saya: __\\n\", inisial);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    char inisial = 'A';\n    printf(\"Inisial saya: %c\\n\", inisial);\n    return 0;\n}",
            "hint": "1. Lengkapi tipe data variabel \"inisial\" (sesuai topik pelajaran ini).\n\n2. Lengkapi nilai inisial menggunakan tanda petik tunggal '...'\n   (bukan petik ganda), isi dengan satu huruf kapital pilihanmu.\n\n3. Pada printf(), lengkapi format specifier yang sesuai untuk\n   menampilkan sebuah karakter tunggal.",
            "quiz": {
              "question": "Manakah cara penulisan nilai yang **benar** untuk menginisialisasi variabel char dalam bahasa C?",
              "options": [
                "char huruf = \"A\";",
                "char huruf = 'A';",
                "char huruf = A;",
                "char huruf = (A);"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Inisial saya: A\n",
                "description": "<span>Deklarasikan variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">inisial</code> dengan nilai huruf pertama namamu, lalu tampilkan menggunakan format specifier yang tepat.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Deklarasikan dengan tipe char dan nilai petik tunggal: char inisial = 'A';",
                "pattern": "char\\s+inisial\\s*=\\s*'[A-Za-z]'\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan format specifier %c: printf(\"Inisial saya: %c\\n\", inisial);",
                "pattern": "printf\\s*\\(\\s*\"Inisial saya:\\s*%c\\\\n\"\\s*,\\s*inisial\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m2-l2",
            "title": "Tipe Data `int`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> adalah tipe paling sering digunakan dalam bahasa C untuk menyimpan <strong>bilangan bulat</strong> (tanpa koma desimal). Ukuran <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> umumnya 4 byte (32-bit) pada sistem modern, dengan rentang nilai -2.147.483.648 hingga 2.147.483.647. Format specifier untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%d</code>. Terdapat beberapa varian <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> yang disesuaikan dengan kebutuhan rentang nilai dan memori.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Tipe</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Ukuran</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Rentang Nilai</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">short int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">2 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">-32,768 s/d 32,767</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">4 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">-2,147,483,648 s/d 2,147,483,647</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">long int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">4–8 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tergantung sistem</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">unsigned int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">4 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">0 s/d 4,294,967,295</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int jumlah = 100;\n    int suhu = -15;\n    unsigned int populasi = 4000000000U;\n    printf(&quot;Jumlah: %d\\n&quot;, jumlah);\n    printf(&quot;Suhu: %d derajat\\n&quot;, suhu);\n    printf(&quot;Populasi: %u\\n&quot;, populasi);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Jumlah: 100\nSuhu: -15 derajat\nPopulasi: 4000000000</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int jumlah = 100;\n    int suhu = -15;\n    unsigned int populasi = 4000000000U;\n    printf(\"Jumlah: %d\\n\", jumlah);\n    printf(\"Suhu: %d derajat\\n\", suhu);\n    printf(\"Populasi: %u\\n\", populasi);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    __ panjang = __;\n    __ lebar = __;\n    __ luas = __ __ __;\n\n    printf(\"Panjang: __\\n\", panjang);\n    printf(\"Lebar: __\\n\", lebar);\n    printf(\"Luas: __\\n\", luas);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int panjang = 8;\n    int lebar = 5;\n    int luas = panjang * lebar;\n\n    printf(\"Panjang: %d\\n\", panjang);\n    printf(\"Lebar: %d\\n\", lebar);\n    printf(\"Luas: %d\\n\", luas);\n    return 0;\n}",
            "hint": "1. Lengkapi tipe data dan nilai untuk variabel \"panjang\" (nilai = 8).\n\n2. Lengkapi tipe data dan nilai untuk variabel \"lebar\" (nilai = 5).\n\n3. Lengkapi tipe data variabel \"luas\", dan lengkapi rumus\n   perhitungannya menggunakan operator perkalian antara\n   variabel panjang dan lebar.\n\n4. Lengkapi format specifier yang tepat pada ketiga printf()\n   untuk menampilkan nilai bertipe int.",
            "quiz": {
              "question": "Format specifier yang tepat untuk menampilkan nilai bertipe int menggunakan printf() adalah...",
              "options": [
                "%f",
                "%c",
                "%s",
                "%d"
              ],
              "correctAnswer": 3
            },
            "testCases": [
              {
                "expectedOutput": "Panjang: 8\nLebar: 5\nLuas: 40\n",
                "description": "<span>Deklarasikan dua variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">panjang</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">lebar</code>, lalu hitung dan tampilkan luasnya (panjang × lebar).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Deklarasikan: int panjang = 8;",
                "pattern": "int\\s+panjang\\s*=\\s*8\\s*;",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan: int lebar = 5;",
                "pattern": "int\\s+lebar\\s*=\\s*5\\s*;",
                "shouldExist": true
              },
              {
                "message": "Hitung luas dengan: int luas = panjang * lebar;",
                "pattern": "int\\s+luas\\s*=\\s*panjang\\s*\\*\\s*lebar\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan format specifier %d pada ketiga printf(), sesuai urutan: Panjang, Lebar, Luas",
                "pattern": "printf\\s*\\(\\s*\"Panjang:\\s*%d\\\\n\"\\s*,\\s*panjang\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"Lebar:\\s*%d\\\\n\"\\s*,\\s*lebar\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"Luas:\\s*%d\\\\n\"\\s*,\\s*luas\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m2-l3",
            "title": "Tipe Data `float` dan `double`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> digunakan untuk menyimpan <strong>bilangan pecahan (desimal)</strong>. Perbedaan utamanya ada pada presisi: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> (4 byte) memiliki presisi sekitar 6–7 digit desimal, sementara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> (8 byte) memberikan presisi sekitar 15–16 digit desimal. Untuk keperluan umum di mana presisi tinggi dibutuhkan, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> lebih dianjurkan. Literal desimal dalam kode secara default bertipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code>; tambahkan akhiran <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f</code> untuk memaksanya menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> (misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.14f</code>).</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Tipe</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Ukuran</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Presisi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Format Specifier</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">4 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">~6–7 digit</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">8 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">~15–16 digit</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%lf</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">long double</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">10–16 byte</td><td class=\"border border-zinc-200 px-3 py-1.5\">~18–19 digit</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%Lf</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    float harga = 9999.99f;\n    double jarak = 384400.123456789;\n    printf(&quot;Harga: %.2f\\n&quot;, harga);\n    printf(&quot;Jarak ke bulan: %.6lf km\\n&quot;, jarak);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Harga: 9999.99\nJarak ke bulan: 384400.123457 km</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    float harga = 9999.99f;\n    double jarak = 384400.123456789;\n    printf(\"Harga: %.2f\\n\", harga);\n    printf(\"Jarak ke bulan: %.6lf km\\n\", jarak);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    __ nilai_ujian = 87.5f;\n    __ rata_rata = 91.234567;\n\n    printf(\"Nilai ujian: __\\n\", nilai_ujian);\n    printf(\"Rata-rata: __\\n\", rata_rata);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    float nilai_ujian = 87.5f;\n    double rata_rata = 91.234567;\n\n    printf(\"Nilai ujian: %.2f\\n\", nilai_ujian);\n    printf(\"Rata-rata: %.2lf\\n\", rata_rata);\n    return 0;\n}",
            "hint": "1. Lengkapi tipe data variabel \"nilai_ujian\" (sesuai bagian pertama\n   judul pelajaran ini), nilai sudah disediakan = 87.5f.\n\n2. Lengkapi tipe data variabel \"rata_rata\" (sesuai bagian kedua\n   judul pelajaran ini), nilai sudah disediakan = 91.234567.\n\n3. Pada printf() pertama, lengkapi format specifier untuk menampilkan\n   nilai_ujian dengan 2 angka desimal.\n\n4. Pada printf() kedua, lengkapi format specifier untuk menampilkan\n   rata_rata dengan 2 angka desimal (gunakan modifier \"l\" untuk double).",
            "quiz": {
              "question": "Apa perbedaan utama antara tipe data float dan double dalam bahasa C?",
              "options": [
                "float hanya bisa menyimpan bilangan positif, double bisa negatif",
                "float untuk bilangan bulat, double untuk bilangan pecahan",
                "double memiliki presisi lebih tinggi dan ukuran memori lebih besar dari float",
                "double tidak bisa digunakan dengan printf()"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Nilai ujian: 87.50\nRata-rata: 91.23\n",
                "description": "<span>Deklarasikan variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai_ujian</code> (misal 87.5) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">rata_rata</code> (misal 91.234567). Tampilkan keduanya dengan format 2 angka desimal.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Deklarasikan dengan tipe float: float nilai_ujian = 87.5f;",
                "pattern": "float\\s+nilai_ujian\\s*=\\s*87\\.5f?\\s*;",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan dengan tipe double: double rata_rata = 91.234567;",
                "pattern": "double\\s+rata_rata\\s*=\\s*91\\.234567\\s*;",
                "shouldExist": true
              },
              {
                "message": "printf() pertama harus menggunakan %.2f dan variabel nilai_ujian",
                "pattern": "printf\\s*\\(\\s*\"Nilai ujian:\\s*%\\.2f\\\\n\"\\s*,\\s*nilai_ujian\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "printf() kedua harus menggunakan %.2lf dan variabel rata_rata",
                "pattern": "printf\\s*\\(\\s*\"Rata-rata:\\s*%\\.2lf\\\\n\"\\s*,\\s*rata_rata\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m2-l4",
            "title": "Tipe Data `void`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> secara harfiah berarti \"kosong\" atau \"tidak bertipe\". Dalam bahasa C, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> digunakan dalam tiga konteks utama: sebagai tipe kembalian fungsi yang <strong>tidak mengembalikan nilai</strong> apapun (prosedur), sebagai daftar parameter fungsi yang <strong>tidak menerima argumen</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> sebagai pengganti parameter kosong), dan sebagai <strong>pointer generic</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void*</code>) yang dapat menunjuk ke tipe data apapun.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> bukanlah tipe data untuk variabel biasa — kamu tidak bisa mendeklarasikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void x;</code>. Fungsi bertipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> tidak membutuhkan pernyataan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> (atau jika ada, ditulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return;</code> tanpa nilai). Ini berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main()</code> yang wajib mengembalikan nilai integer.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nvoid tampilkan_pesan(void) {\n    printf(&quot;Fungsi void tidak mengembalikan nilai.\\n&quot;);\n    /* Tidak ada return, atau bisa ditulis: return; */\n}\n\nint main() {\n    tampilkan_pesan();\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Fungsi void tidak mengembalikan nilai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nvoid tampilkan_pesan(void) {\n    printf(\"Fungsi void tidak mengembalikan nilai.\\n\");\n    /* Tidak ada return, atau bisa ditulis: return; */\n}\n\nint main() {\n    tampilkan_pesan();\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n__ sapa_pengguna() {\n    printf(\"__\\n\");\n}\n\nint main() {\n    __;\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nvoid sapa_pengguna() {\n    printf(\"Selamat datang, Pengguna!\\n\");\n}\n\nint main() {\n    sapa_pengguna();\n    return 0;\n}",
            "hint": "1. Lengkapi tipe kembalian fungsi sapa_pengguna sesuai topik\n   pelajaran ini (fungsi tidak mengembalikan nilai apapun).\n\n2. Lengkapi isi teks yang ditampilkan oleh printf() di dalam\n   fungsi sapa_pengguna, sesuai output yang diharapkan.\n\n3. Di dalam main(), panggil fungsi sapa_pengguna dengan\n   menuliskan nama fungsi diikuti tanda kurung dan titik koma.",
            "quiz": {
              "question": "Kapan tipe void digunakan sebagai tipe kembalian sebuah fungsi?",
              "options": [
                "Ketika fungsi harus mengembalikan nilai 0",
                "Ketika fungsi tidak mengembalikan nilai apapun",
                "Ketika fungsi menerima banyak parameter",
                "Ketika fungsi menggunakan variabel global"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Selamat datang, Pengguna!\n",
                "description": "<span>Buat fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sapa_pengguna()</code> yang menampilkan teks \"Selamat datang, Pengguna!\", lalu panggil fungsi tersebut dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Tipe kembalian fungsi harus void: void sapa_pengguna() {",
                "pattern": "void\\s+sapa_pengguna\\s*\\(\\s*\\)\\s*\\{",
                "shouldExist": true
              },
              {
                "message": "Tampilkan teks dengan: printf(\"Selamat datang, Pengguna!\\n\");",
                "pattern": "printf\\s*\\(\\s*\"Selamat datang, Pengguna!\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Panggil fungsi di dalam main() dengan: sapa_pengguna();",
                "pattern": "int\\s+main\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*sapa_pengguna\\s*\\(\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m2-l5",
            "title": "Tipe Data `bool`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> menyimpan nilai <strong>boolean</strong>: hanya dua kemungkinan, yaitu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code> (benar/1) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code> (salah/0). Dalam bahasa C standar (C99 ke atas), penggunaan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code> membutuhkan header <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdbool.h&gt;</code>. Tanpa header ini, compiler tidak mengenali kata kunci tersebut. Tipe ini sangat berguna untuk variabel flag, kondisi, dan hasil perbandingan logis.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Secara internal, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> dalam C disimpan sebagai integer 1 byte: nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> dianggap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code>, dan nilai <strong>apapun selain 0</strong> dianggap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code>. Format specifier untuk menampilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%d</code> (akan menampilkan 1 atau 0). Jika ingin menampilkan teks \"true\"/\"false\", perlu dilakukan konversi manual.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n#include &lt;stdbool.h&gt;\n\nint main() {\n    bool sudah_login = true;\n    bool akses_ditolak = false;\n\n    printf(&quot;Status login: %d\\n&quot;, sudah_login);\n    printf(&quot;Akses ditolak: %s\\n&quot;, akses_ditolak ? &quot;true&quot; : &quot;false&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Status login: 1\nAkses ditolak: false</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    bool sudah_login = true;\n    bool akses_ditolak = false;\n\n    printf(\"Status login: %d\\n\", sudah_login);\n    printf(\"Akses ditolak: %s\\n\", akses_ditolak ? \"true\" : \"false\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n#include <__>\n\nint main() {\n    __ lampu_menyala = __;\n    __ pintu_terkunci = __;\n    printf(\"Lampu menyala: __\\n\", lampu_menyala);\n    printf(\"Pintu terkunci: __\\n\", pintu_terkunci);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    bool lampu_menyala = true;\n    bool pintu_terkunci = false;\n    printf(\"Lampu menyala: %d\\n\", lampu_menyala);\n    printf(\"Pintu terkunci: %d\\n\", pintu_terkunci);\n    return 0;\n}",
            "hint": "1. Lengkapi nama header yang harus disertakan agar tipe bool,\n   true, dan false bisa digunakan.\n\n2. Lengkapi tipe data dan nilai untuk variabel \"lampu_menyala\"\n   (bernilai true).\n\n3. Lengkapi tipe data dan nilai untuk variabel \"pintu_terkunci\"\n   (bernilai false).\n\n4. Lengkapi format specifier pada kedua printf() untuk menampilkan\n   nilai bool sebagai angka 1 atau 0.",
            "quiz": {
              "question": "Header file apa yang harus disertakan agar tipe bool, true, dan false bisa digunakan dalam C99?",
              "options": [
                "<string.h>",
                "<stdlib.h>",
                "<stdbool.h>",
                "<boolean.h>"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Lampu menyala: 1\nPintu terkunci: 0\n",
                "description": "<span>Deklarasikan dua variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">lampu_menyala</code> bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">pintu_terkunci</code> bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code>. Tampilkan statusnya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Sertakan header: #include <stdbool.h>",
                "pattern": "#include\\s*<\\s*stdbool\\.h\\s*>",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan: bool lampu_menyala = true;",
                "pattern": "bool\\s+lampu_menyala\\s*=\\s*true\\s*;",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan: bool pintu_terkunci = false;",
                "pattern": "bool\\s+pintu_terkunci\\s*=\\s*false\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan format specifier %d pada kedua printf(), sesuai urutan variabel",
                "pattern": "printf\\s*\\(\\s*\"Lampu menyala:\\s*%d\\\\n\"\\s*,\\s*lampu_menyala\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"Pintu terkunci:\\s*%d\\\\n\"\\s*,\\s*pintu_terkunci\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m2-l6",
            "title": "Format Digit Pecahan",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Saat menampilkan bilangan pecahan dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code>, kamu bisa mengontrol <strong>jumlah digit</strong> yang ditampilkan menggunakan <strong>format width dan precision</strong> di dalam format specifier. Format lengkapnya adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%[lebar_total].[jumlah_desimal]f</code>. Misalnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%.2f</code> menampilkan 2 angka di belakang koma, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%8.2f</code> menampilkan total 8 karakter dengan 2 di belakang koma (sisanya diisi spasi di kiri). Ini penting untuk membuat output yang rapi dan mudah dibaca.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Format</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Arti</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh Input</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh Output</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Default 6 desimal</td><td class=\"border border-zinc-200 px-3 py-1.5\">3.14</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.140000</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%.2f</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">2 angka desimal</td><td class=\"border border-zinc-200 px-3 py-1.5\">3.14159</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.14</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%8.2f</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Lebar 8, 2 desimal</td><td class=\"border border-zinc-200 px-3 py-1.5\">3.14</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">····3.14</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%-8.2f</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Rata kiri, lebar 8</td><td class=\"border border-zinc-200 px-3 py-1.5\">3.14</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.14····</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%+.2f</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Tampilkan tanda</td><td class=\"border border-zinc-200 px-3 py-1.5\">-3.14</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-3.14</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">[Gambar: Ilustrasi komponen format specifier %8.2f dengan label bagian lebar dan presisi]</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    double pi = 3.14159265;\n    printf(&quot;Default  : %f\\n&quot;, pi);\n    printf(&quot;2 desimal: %.2f\\n&quot;, pi);\n    printf(&quot;Lebar 10 : %10.4f\\n&quot;, pi);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Default  : 3.141593\n2 desimal: 3.14\nLebar 10 :     3.1416</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    double pi = 3.14159265;\n    printf(\"Default  : %f\\n\", pi);\n    printf(\"2 desimal: %.2f\\n\", pi);\n    printf(\"Lebar 10 : %10.4f\\n\", pi);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    double angka = 1234.5678;\n    printf(\"Default   : __\\n\", angka);\n    printf(\"2 desimal : __\\n\", angka);\n    printf(\"Lebar 12  : __\\n\", angka);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    double angka = 1234.5678;\n    printf(\"Default   : %f\\n\", angka);\n    printf(\"2 desimal : %.2f\\n\", angka);\n    printf(\"Lebar 12  : %12.3f\\n\", angka);\n    return 0;\n}",
            "hint": "1. Pada printf() pertama, lengkapi format specifier default untuk\n   menampilkan double (tanpa pengaturan lebar/presisi tambahan).\n\n2. Pada printf() kedua, lengkapi format specifier untuk menampilkan\n   2 angka desimal.\n\n3. Pada printf() ketiga, lengkapi format specifier untuk menampilkan\n   dengan lebar total 12 karakter dan 3 angka desimal.",
            "quiz": {
              "question": "Format specifier %10.3f akan menampilkan bilangan dengan...",
              "options": [
                "10 angka desimal dan total lebar 3 karakter",
                "Total lebar 10 karakter dan 3 angka di belakang koma",
                "10 angka di depan koma dan 3 angka di belakang koma",
                "Presisi 10 dan pembulatan ke 3 desimal"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Default   : 1234.567800\n2 desimal : 1234.57\nLebar 12  :     1234.568\n",
                "description": "<span>Tampilkan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> berikut: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1234.5678</code> dalam tiga format berbeda: default, 2 desimal, dan lebar total 12 dengan 3 desimal.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "printf() pertama harus menggunakan format default: %f",
                "pattern": "printf\\s*\\(\\s*\"Default\\s*:\\s*%f\\\\n\"\\s*,\\s*angka\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "printf() kedua harus menggunakan: %.2f",
                "pattern": "printf\\s*\\(\\s*\"2 desimal\\s*:\\s*%\\.2f\\\\n\"\\s*,\\s*angka\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "printf() ketiga harus menggunakan: %12.3f",
                "pattern": "printf\\s*\\(\\s*\"Lebar 12\\s*:\\s*%12\\.3f\\\\n\"\\s*,\\s*angka\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m3",
        "title": "Deklarasi Variabel",
        "lessons": [
          {
            "id": "c-level-1-m3-l1",
            "title": "Konsep dan Format Variabel",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Variabel</strong> adalah \"kotak penyimpanan\" bernama di memori komputer yang digunakan untuk menyimpan data yang nilainya bisa berubah-ubah selama program berjalan. Sebelum variabel digunakan, ia harus <strong>dideklarasikan</strong> terlebih dahulu — ini memberitahu compiler untuk mengalokasikan ruang memori dengan ukuran sesuai tipe datanya. Format deklarasi variabel di C adalah: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_data nama_variabel;</code> atau langsung diinisialisasi: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_data nama_variabel = nilai;</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Deklarasi bisa dilakukan untuk satu variabel atau beberapa variabel bertipe sama sekaligus dalam satu baris menggunakan koma. Variabel yang dideklarasikan di dalam fungsi disebut <strong>variabel lokal</strong> dan hanya dapat diakses di dalam fungsi tersebut. Variabel yang dideklarasikan di luar semua fungsi disebut <strong>variabel global</strong> dan bisa diakses dari seluruh bagian program.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint skor_global = 0; /* Variabel global */\n\nint main() {\n    int usia = 20;            /* Deklarasi + inisialisasi */\n    float tinggi;             /* Deklarasi saja */\n    int a = 1, b = 2, c = 3; /* Beberapa variabel sekaligus */\n\n    tinggi = 170.5f;          /* Inisialisasi setelah deklarasi */\n    printf(&quot;Usia: %d, Tinggi: %.1f\\n&quot;, usia, tinggi);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Usia: 20, Tinggi: 170.5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint skor_global = 0; /* Variabel global */\n\nint main() {\n    int usia = 20;            /* Deklarasi + inisialisasi */\n    float tinggi;             /* Deklarasi saja */\n    int a = 1, b = 2, c = 3; /* Beberapa variabel sekaligus */\n\n    tinggi = 170.5f;          /* Inisialisasi setelah deklarasi */\n    printf(\"Usia: %d, Tinggi: %.1f\\n\", usia, tinggi);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    __ tahun = 2024;\n    __ ipk = 3.75f;\n    __ grade = 'A';\n\n    printf(\"Tahun: __\\n\", tahun);\n    printf(\"IPK: __\\n\", ipk);\n    printf(\"Grade: __\\n\", grade);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int tahun = 2024;\n    float ipk = 3.75f;\n    char grade = 'A';\n\n    printf(\"Tahun: %d\\n\", tahun);\n    printf(\"IPK: %.2f\\n\", ipk);\n    printf(\"Grade: %c\\n\", grade);\n    return 0;\n}",
            "hint": "1. Lengkapi tipe data variabel \"tahun\" (bilangan bulat tanpa\n   desimal), nilai = 2024.\n\n2. Lengkapi tipe data variabel \"ipk\" (bilangan pecahan), nilai = 3.75f.\n\n3. Lengkapi tipe data variabel \"grade\" (satu karakter), nilai = 'A'\n   (gunakan tanda petik tunggal).\n\n4. Lengkapi format specifier pada ketiga printf() sesuai tipe data\n   masing-masing variabel:\n   - tahun -> format untuk int\n   - ipk   -> format untuk float dengan 2 angka desimal\n   - grade -> format untuk char",
            "quiz": {"question":"Manakah yang merupakan deklarasi variabel dengan inisialisasi langsung yang benar di C?","options":["variabel int = 10;","int = variabel 10;","int variabel = 10;","10 = int variabel;"],"correctAnswer":2},
            "testCases": [{"expectedOutput":"Tahun: 2024\nIPK: 3.75\nGrade: A\n","description":"<span>Deklarasikan tiga variabel: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tahun</code> dengan nilai 2024, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">ipk</code> dengan nilai 3.75, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">grade</code> dengan nilai 'A'. Tampilkan ketiganya.</span>"}],
            "validationRules": [{"message":"Deklarasikan: int tahun = 2024;","pattern":"int\\s+tahun\\s*=\\s*2024\\s*;","shouldExist":true},{"message":"Deklarasikan: float ipk = 3.75f;","pattern":"float\\s+ipk\\s*=\\s*3\\.75f?\\s*;","shouldExist":true},{"message":"Deklarasikan: char grade = 'A'; (gunakan petik tunggal)","pattern":"char\\s+grade\\s*=\\s*'A'\\s*;","shouldExist":true},{"message":"Pastikan format specifier sesuai tipe: %d untuk tahun, %.2f untuk ipk, %c untuk grade","pattern":"printf\\s*\\(\\s*\"Tahun:\\s*%d\\\\n\"\\s*,\\s*tahun\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"IPK:\\s*%\\.2f\\\\n\"\\s*,\\s*ipk\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"Grade:\\s*%c\\\\n\"\\s*,\\s*grade\\s*\\)","shouldExist":true}]
          },
          {
            "id": "c-level-1-m3-l2",
            "title": "Aturan Penamaan Variabel",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Bahasa C memiliki aturan ketat untuk penamaan variabel. Nama variabel <strong>hanya boleh</strong> mengandung huruf (a-z, A-Z), angka (0-9), dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">_</code>). Nama variabel <strong>wajib diawali</strong> dengan huruf atau garis bawah — tidak boleh diawali angka. Selain itu, nama variabel tidak boleh sama dengan <strong>kata kunci reserved</strong> (keyword) bahasa C seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code>, dan lainnya.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">✅ Nama Valid</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">❌ Nama Tidak Valid</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Alasan Tidak Valid</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2nilai</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Diawali angka</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama_siswa</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama siswa</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Mengandung spasi</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">_data</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">data-siswa</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Mengandung tanda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">totalHarga</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Kata kunci reserved</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x1</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama@user</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Mengandung karakter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">@</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Konvensi penamaan yang umum dipakai di C adalah <strong>snake_case</strong> (semua huruf kecil, kata dipisahkan garis bawah): <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">total_harga</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama_siswa</code>. Pilih nama yang deskriptif dan bermakna — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">jumlah_siswa</code> jauh lebih baik daripada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">js</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int jumlah_siswa = 35;     /* snake_case — dianjurkan */\n    float nilai_rata_rata = 78.5f;\n    char inisial_nama = &#039;B&#039;;\n    printf(&quot;Siswa: %d, Rata-rata: %.1f\\n&quot;, jumlah_siswa, nilai_rata_rata);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Siswa: 35, Rata-rata: 78.5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int jumlah_siswa = 35;     /* snake_case — dianjurkan */\n    float nilai_rata_rata = 78.5f;\n    char inisial_nama = 'B';\n    printf(\"Siswa: %d, Rata-rata: %.1f\\n\", jumlah_siswa, nilai_rata_rata);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int __ = 50000;\n    int __ = 3;\n    printf(\"Harga barang: %d\\n\", __);\n    printf(\"Jumlah item: %d\\n\", __);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int harga_barang = 50000;\n    int jumlah_item = 3;\n    printf(\"Harga barang: %d\\n\", harga_barang);\n    printf(\"Jumlah item: %d\\n\", jumlah_item);\n    return 0;\n}",
            "hint": "1. Variabel pertama bernama \"harga barang\" mengandung spasi\n   (tidak valid). Lengkapi blank dengan nama variabel yang\n   valid menggunakan garis bawah sebagai pengganti spasi.\n   Gunakan nama yang SAMA pada deklarasi maupun printf().\n\n2. Variabel kedua bernama \"3item\" diawali angka (tidak valid).\n   Lengkapi blank dengan nama variabel yang valid — tambahkan\n   kata \"jumlah_\" di depan nama tersebut.\n   Gunakan nama yang SAMA pada deklarasi maupun printf().",
            "quiz": {
              "question": "Manakah nama variabel yang **tidak valid** menurut aturan penamaan bahasa C?",
              "options": [
                "total_nilai",
                "_skor",
                "nilai1",
                "3angka"
              ],
              "correctAnswer": 3
            },
            "testCases": [
              {
                "expectedOutput": "Harga barang: 50000\nJumlah item: 3\n",
                "description": "<span>Perbaiki deklarasi variabel berikut yang namanya melanggar aturan penamaan C, lalu tampilkan nilainya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Deklarasikan variabel pertama dengan: int harga_barang = 50000; (gunakan garis bawah)",
                "pattern": "int\\s+harga_barang\\s*=\\s*50000\\s*;",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan variabel kedua dengan: int jumlah_item = 3; (tambahkan jumlah_ di depan)",
                "pattern": "int\\s+jumlah_item\\s*=\\s*3\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan nama variabel yang sama pada printf() seperti pada deklarasi",
                "pattern": "printf\\s*\\(\\s*\"Harga barang:\\s*%d\\\\n\"\\s*,\\s*harga_barang\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"Jumlah item:\\s*%d\\\\n\"\\s*,\\s*jumlah_item\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m3-l3",
            "title": "Sifat Case-Sensitive Bahasa C",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Bahasa C bersifat <strong>case-sensitive</strong>, artinya huruf besar dan kecil dianggap <strong>berbeda dan tidak saling menggantikan</strong>. Variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">Nilai</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">NILAI</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai</code> adalah tiga variabel yang berbeda sepenuhnya di C. Hal yang sama berlaku untuk nama fungsi, konstanta, dan semua identifier lainnya. Ini berbeda dengan beberapa bahasa lain seperti SQL atau Basic yang tidak case-sensitive.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sifat ini berlaku konsisten: keyword bahasa C ditulis dengan huruf kecil semua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code>). Menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">Int</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">IF</code>, atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">Return</code> akan menyebabkan error karena compiler tidak mengenalinya sebagai keyword. Kesalahan case adalah salah satu penyebab paling umum error kompilasi pada pemula, terutama saat memanggil fungsi atau merujuk variabel.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 80;\n    int Nilai = 90;\n    int NILAI = 100;\n\n    /* Ketiganya adalah variabel yang BERBEDA */\n    printf(&quot;nilai  = %d\\n&quot;, nilai);\n    printf(&quot;Nilai  = %d\\n&quot;, Nilai);\n    printf(&quot;NILAI  = %d\\n&quot;, NILAI);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">nilai  = 80\nNilai  = 90\nNILAI  = 100</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int nilai = 80;\n    int Nilai = 90;\n    int NILAI = 100;\n\n    /* Ketiganya adalah variabel yang BERBEDA */\n    printf(\"nilai  = %d\\n\", nilai);\n    printf(\"Nilai  = %d\\n\", Nilai);\n    printf(\"NILAI  = %d\\n\", NILAI);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n__ main() {\n    int skor = 95;\n    __(\"Skor: %d\\n\", skor);\n    __ 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int skor = 95;\n    printf(\"Skor: %d\\n\", skor);\n    return 0;\n}",
            "hint": "1. Kata \"Int\" pada baris deklarasi fungsi ditulis dengan huruf\n   kapital di awal — ini bukan keyword yang valid. Lengkapi\n   dengan keyword yang benar (perhatikan huruf besar/kecil).\n\n2. Kata \"Printf\" ditulis dengan huruf kapital di awal — ini\n   bukan nama fungsi yang valid. Lengkapi dengan nama fungsi\n   yang benar (perhatikan huruf besar/kecil).\n\n3. Kata \"Return\" ditulis dengan huruf kapital di awal — ini\n   bukan keyword yang valid. Lengkapi dengan keyword yang benar\n   (perhatikan huruf besar/kecil).",
            "quiz": {
              "question": "Dalam bahasa C, apakah variabel data, Data, dan DATA dianggap sama?",
              "options": [
                "Ya, ketiganya adalah variabel yang sama",
                "Ya, tapi hanya data dan Data yang sama",
                "Tidak, ketiganya adalah variabel yang berbeda",
                "Tergantung compiler yang digunakan"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Skor: 95\n",
                "description": "<span>Perbaiki kode berikut yang gagal dikompilasi akibat kesalahan penulisan case pada keyword dan nama variabel.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan huruf kecil semua: int main() { (bukan Int)",
                "pattern": "^\\s*int\\s+main\\s*\\(\\s*\\)\\s*\\{",
                "shouldExist": true
              },
              {
                "message": "Gunakan huruf kecil semua: printf(...) (bukan Printf)",
                "pattern": "printf\\s*\\(\\s*\"Skor:\\s*%d\\\\n\"\\s*,\\s*skor\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan huruf kecil semua: return 0; (bukan Return)",
                "pattern": "return\\s+0\\s*;",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m4",
        "title": "Fungsi Menginput / Memasukkan Data",
        "lessons": [
          {
            "id": "c-level-1-m4-l1",
            "title": "Fungsi `scanf()` dan Formatnya",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> adalah fungsi standar C untuk <strong>membaca input dari keyboard</strong> dan menyimpannya ke variabel. Format penggunaannya adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf(\"format_specifier\", &variabel)</code>. Tanda <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code> (ampersand)</strong> di depan nama variabel adalah operator address-of yang memberikan alamat memori variabel kepada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> — ini wajib ada, dan melupakannya adalah kesalahan paling umum pemula yang menyebabkan perilaku program tidak terduga atau crash.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Format specifier di <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> sama dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%d</code> untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code> untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%lf</code> untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%c</code> untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code>. Untuk string, digunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%s</code> dan tidak membutuhkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code> karena nama array sudah berupa pointer. Perlu diperhatikan: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%s</code> berhenti membaca di spasi, sehingga tidak cocok untuk input kalimat.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int usia;\n    float berat;\n    printf(&quot;Masukkan usia: &quot;);\n    scanf(&quot;%d&quot;, &amp;usia);\n    printf(&quot;Masukkan berat badan: &quot;);\n    scanf(&quot;%f&quot;, &amp;berat);\n    printf(&quot;Usia: %d tahun, Berat: %.1f kg\\n&quot;, usia, berat);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan usia: 22\nMasukkan berat badan: 65.5\nUsia: 22 tahun, Berat: 65.5 kg</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int usia;\n    float berat;\n    printf(\"Masukkan usia: \");\n    scanf(\"%d\", &usia);\n    printf(\"Masukkan berat badan: \");\n    scanf(\"%f\", &berat);\n    printf(\"Usia: %d tahun, Berat: %.1f kg\\n\", usia, berat);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int a, b, hasil;\n    printf(\"Masukkan angka pertama: \");\n    scanf(\"__\", &__);\n    printf(\"Masukkan angka kedua: \");\n    scanf(\"__\", &__);\n    hasil = __ + __;\n    printf(\"Hasil: __\\n\", hasil);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int a, b, hasil;\n    printf(\"Masukkan angka pertama: \");\n    scanf(\"%d\", &a);\n    printf(\"Masukkan angka kedua: \");\n    scanf(\"%d\", &b);\n    hasil = a + b;\n    printf(\"Hasil: %d\\n\", hasil);\n    return 0;\n}",
            "hint": "1. Lengkapi format specifier pada scanf() pertama untuk membaca\n   bilangan bulat ke variabel \"a\". Jangan lupa tanda & sebelum\n   nama variabel.\n\n2. Lengkapi format specifier pada scanf() kedua untuk membaca\n   bilangan bulat ke variabel \"b\". Jangan lupa tanda & sebelum\n   nama variabel.\n\n3. Lengkapi rumus penjumlahan untuk variabel \"hasil\" menggunakan\n   operator penjumlahan antara variabel a dan b.\n\n4. Lengkapi format specifier pada printf() terakhir untuk\n   menampilkan nilai bertipe int.",
            "quiz": {
              "question": "Mengapa tanda & diperlukan sebelum nama variabel di dalam scanf()?",
              "options": [
                "Untuk menghitung nilai variabel secara otomatis",
                "Untuk memberikan alamat memori variabel agar scanf() bisa menyimpan nilai ke sana",
                "Untuk mengosongkan nilai variabel sebelum diisi",
                "Untuk menampilkan nilai variabel setelah diinput"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan angka pertama: Masukkan angka kedua: Hasil: 42\n",
                "description": "<span>Buat program yang meminta pengguna memasukkan dua bilangan bulat, lalu tampilkan hasil penjumlahannya.</span>",
                "input": "15\n27"
              }
            ],
            "validationRules": [
              {
                "message": "scanf() pertama harus: scanf(\"%d\", &a);",
                "pattern": "scanf\\s*\\(\\s*\"%d\"\\s*,\\s*&a\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "scanf() kedua harus: scanf(\"%d\", &b);",
                "pattern": "scanf\\s*\\(\\s*\"%d\"\\s*,\\s*&b\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Hitung hasil dengan: hasil = a + b;",
                "pattern": "hasil\\s*=\\s*a\\s*\\+\\s*b\\s*;",
                "shouldExist": true
              },
              {
                "message": "Tampilkan hasil dengan: printf(\"Hasil: %d\\n\", hasil);",
                "pattern": "printf\\s*\\(\\s*\"Hasil:\\s*%d\\\\n\"\\s*,\\s*hasil\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m4-l2",
            "title": "Fungsi `getchar()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">getchar()</code> adalah fungsi yang membaca <strong>satu karakter tunggal</strong> dari input standar (keyboard) dan mengembalikannya sebagai nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>. Fungsi ini sering digunakan untuk membaca satu karakter saja, atau sebagai teknik untuk <strong>membersihkan sisa newline</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code>) yang tertinggal di buffer input setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> — masalah umum yang menyebabkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">gets()</code> berikutnya terlewat.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">getchar()</code> mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> agar bisa merepresentasikan nilai EOF (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-1</code>) selain karakter normal. Nilai yang dikembalikan bisa langsung disimpan ke variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> karena akan di-cast secara implisit. Idiom umum: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while ((c = getchar()) != '\\n');</code> digunakan untuk menguras sisa input di buffer.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char karakter;\n    printf(&quot;Tekan satu tombol: &quot;);\n    karakter = getchar();\n    printf(&quot;Karakter yang ditekan: %c\\n&quot;, karakter);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Tekan satu tombol: X\nKarakter yang ditekan: X</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    char karakter;\n    printf(\"Tekan satu tombol: \");\n    karakter = getchar();\n    printf(\"Karakter yang ditekan: %c\\n\", karakter);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int karakter;\n    printf(\"Masukkan satu karakter: \");\n    karakter = __();\n    printf(\"Karakter: __, ASCII: __\\n\", karakter, karakter);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int karakter;\n    printf(\"Masukkan satu karakter: \");\n    karakter = getchar();\n    printf(\"Karakter: %c, ASCII: %d\\n\", karakter, karakter);\n    return 0;\n}",
            "hint": "1. Lengkapi pemanggilan fungsi untuk membaca satu karakter dari\n   input dan simpan ke variabel \"karakter\" (fungsi ini dibahas\n   pada judul pelajaran ini).\n\n2. Lengkapi format specifier pertama pada printf() untuk\n   menampilkan variabel karakter sebagai sebuah huruf/simbol.\n\n3. Lengkapi format specifier kedua pada printf() untuk menampilkan\n   variabel karakter yang SAMA sebagai kode ASCII (angka).",
            "quiz": {
              "question": "Apa tipe data yang dikembalikan oleh fungsi getchar()?",
              "options": [
                "char",
                "void",
                "int",
                "string"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan satu karakter: Karakter: A, ASCII: 65\n",
                "description": "<span>Buat program yang membaca satu karakter menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">getchar()</code>, lalu tampilkan karakter tersebut beserta kode ASCII-nya.</span>",
                "input": "A"
              }
            ],
            "validationRules": [
              {
                "message": "Baca karakter dengan: karakter = getchar();",
                "pattern": "karakter\\s*=\\s*getchar\\s*\\(\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan: printf(\"Karakter: %c, ASCII: %d\\n\", karakter, karakter);",
                "pattern": "printf\\s*\\(\\s*\"Karakter:\\s*%c,\\s*ASCII:\\s*%d\\\\n\"\\s*,\\s*karakter\\s*,\\s*karakter\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m4-l3",
            "title": "Fungsi `scanf()` dengan Format `%[^\\n]`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Membaca <strong>satu baris teks lengkap</strong> (termasuk spasi) pada bahasa C dapat dilakukan dengan penentu format khusus pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code>, yaitu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%[^\\n]</code> — dibaca &ldquo;semua karakter sampai ditemukan enter (baris baru)&rdquo;. Ini berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%s</code> yang berhenti begitu menemukan spasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur penulisannya tetap mengikuti aturan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> pada umumnya, yaitu memakai operator alamat <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&amp;</code>:</p>\n      <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800 mb-4\"><code>scanf(\"%[^\\n]\", &amp;nama_variabel);</code></pre>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Catatan penting:</strong> jika dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf(\"%[^\\n]\", ...)</code> dipakai secara berturut-turut, hanya input pertama yang terbaca — input kedua dianggap kosong. Solusinya gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">getchar()</code> untuk membuang baris baru sebelum input kedua.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\nint main() {\n    char nama[50];\n    printf(&quot;Masukkan nama lengkap: &quot;);\n    scanf(&quot;%[^\\n]&quot;, nama);\n    getchar();  /* buang baris baru */\n    printf(&quot;Halo, %s!\\n&quot;, nama);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ clang program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan nama lengkap: Budi Santoso\nHalo, Budi Santoso!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    char nama[50];\n    printf(\"Masukkan nama lengkap: \");\n    scanf(\"%[^\\n]\", nama);\n    getchar();  /* buang baris baru */\n    printf(\"Halo, %s!\\n\", nama);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    char kota[100];\n    printf(\"Masukkan nama kota: \");\n    scanf(\"__\", __);\n    __();  /* buang baris baru */\n    printf(\"Kota tujuan: __\\n\", kota);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    char kota[100];\n    printf(\"Masukkan nama kota: \");\n    scanf(\"%[^\\n]\", kota);\n    getchar();  /* buang baris baru */\n    printf(\"Kota tujuan: %s\\n\", kota);\n    return 0;\n}",
            "hint": "1. Lengkapi penentu format pada scanf() agar seluruh baris teks\n   (termasuk spasi) terbaca sampai pengguna menekan Enter:\n   gunakan %[^\\n] di dalam tanda kutip.\n\n2. Lengkapi argumen kedua scanf() dengan nama array tempat\n   menyimpan input, yaitu kota.\n\n3. Lengkapi pemanggilan fungsi untuk membuang karakter baris baru\n   setelah scanf(), yaitu getchar().\n\n4. Lengkapi format specifier pada printf() untuk menampilkan\n   isi array kota sebagai string.",
            "quiz": {
              "question": "Mengapa penentu format %[^\\n] lebih tepat daripada %s untuk membaca nama lengkap?",
              "options": [
                "Karena %[^\\n] membaca seluruh baris termasuk spasi, sedangkan %s berhenti di spasi",
                "Karena %[^\\n] hanya bisa dipakai untuk membaca angka",
                "Karena %[^\\n] tidak memerlukan operator alamat &",
                "Karena %[^\\n] otomatis mengubah input menjadi huruf kapital"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan nama kota: Kota tujuan: Kuala Lumpur\n",
                "description": "<span>Buat program yang meminta pengguna memasukkan nama kota (bisa mengandung spasi) menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> dengan penentu format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%[^\\n]</code>, lalu tampilkan kembali.</span>",
                "input": "Kuala Lumpur"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: scanf(\"%[^\\n]\", kota);",
                "pattern": "scanf\\s*\\(\\s*\"%\\[\\^\\\\n\\]\"\\s*,\\s*kota\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Buang baris baru dengan: getchar();",
                "pattern": "getchar\\s*\\(\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan format specifier %s: printf(\"Kota tujuan: %s\\n\", kota);",
                "pattern": "printf\\s*\\(\\s*\"Kota tujuan:\\s*%s\\\\n\"\\s*,\\s*kota\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m5",
        "title": "Fungsi Menampilkan Data",
        "lessons": [
          {
            "id": "c-level-1-m5-l1",
            "title": "Fungsi `printf()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> adalah fungsi output paling fleksibel di C, digunakan untuk <strong>mencetak teks terformat</strong> ke layar. Format dasarnya adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"string_format\", argumen1, argumen2, ...)</code>. Di dalam string format, terdapat dua elemen khusus: <strong>format specifier</strong> (diawali <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>) yang diganti dengan nilai argumen, dan <strong>escape sequence</strong> (diawali <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\</code>) untuk karakter khusus seperti baris baru dan tab.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Format Specifier</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Tipe Data</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%d</code> / <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%i</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%d\", 42)</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">42</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> / <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%.2f\", 3.14)</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.14</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%c</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%c\", 'A')</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">A</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%s</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">string (char array)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%s\", \"Halo\")</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">Halo</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%u</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">unsigned int</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%u\", 4000U)</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">4000</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Hexadecimal</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%x\", 255)</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">ff</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Escape Sequence</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Baris baru (newline)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\t</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Tab horizontal</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\\\</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Cetak karakter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\\"</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Cetak karakter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    printf(&quot;Nama\\tUsia\\tKota\\n&quot;);\n    printf(&quot;%-10s\\t%d\\t%s\\n&quot;, &quot;Andi&quot;, 20, &quot;Jakarta&quot;);\n    printf(&quot;%-10s\\t%d\\t%s\\n&quot;, &quot;Budi&quot;, 22, &quot;Bandung&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama      Usia  Kota\nAndi      20    Jakarta\nBudi      22    Bandung</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    printf(\"Nama\\tUsia\\tKota\\n\");\n    printf(\"%-10s\\t%d\\t%s\\n\", \"Andi\", 20, \"Jakarta\");\n    printf(\"%-10s\\t%d\\t%s\\n\", \"Budi\", 22, \"Bandung\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    printf(\"Produk\\t\\tHarga\\tStok\\n\");\n    printf(\"__\\t__\\t__\\n\");\n    printf(\"__\\t\\t__\\t__\\n\");\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    printf(\"Produk\\t\\tHarga\\tStok\\n\");\n    printf(\"Buku Tulis\\t5000\\t100\\n\");\n    printf(\"Pensil\\t\\t2000\\t250\\n\");\n    return 0;\n}",
            "hint": "1. Pada baris kedua, lengkapi format string untuk menampilkan\n   \"Buku Tulis\", lalu nilai 5000, lalu nilai 100 — pisahkan\n   ketiga bagian dengan karakter tab (\\t) dan akhiri dengan\n   baris baru (\\n). Gunakan format specifier yang sesuai\n   untuk angka.\n\n2. Pada baris ketiga, lakukan hal yang sama untuk \"Pensil\",\n   2000, dan 250.",
            "quiz": {
              "question": "Apa fungsi dari escape sequence \\t di dalam string format printf()?",
              "options": [
                "Mengakhiri program",
                "Mencetak karakter t ke layar",
                "Mencetak karakter tab horizontal",
                "Memindahkan cursor ke awal baris"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Produk          Harga   Stok\nBuku Tulis      5000    100\nPensil          2000    250\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> untuk menampilkan informasi produk dalam format berkolom menggunakan tab (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\t</code>).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Baris kedua harus: printf(\"Buku Tulis\\t5000\\t100\\n\");",
                "pattern": "printf\\s*\\(\\s*\"Buku Tulis\\\\t5000\\\\t100\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Baris ketiga harus: printf(\"Pensil\\t\\t2000\\t250\\n\");",
                "pattern": "printf\\s*\\(\\s*\"Pensil\\\\t\\\\t2000\\\\t250\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m5-l2",
            "title": "Fungsi `puts()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code> adalah fungsi sederhana untuk <strong>mencetak string ke layar diikuti baris baru otomatis</strong>. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> yang fleksibel dan mendukung format specifier, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code> hanya menerima satu argumen: sebuah string (literal atau pointer ke array karakter). <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code> secara otomatis menambahkan karakter newline (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code>) di akhir, sehingga kamu tidak perlu menambahkannya sendiri.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Karena tidak mendukung format specifier, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code> cocok digunakan saat kamu hanya perlu menampilkan <strong>teks statis atau isi variabel string secara langsung</strong>, tanpa memerlukan pemformatan. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code> berasal dari header <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdio.h&gt;</code> dan lebih ringan dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> untuk kasus penggunaan sederhana ini.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char pesan[] = &quot;Selamat belajar bahasa C!&quot;;\n    puts(&quot;Halo, Dunia!&quot;);     /* Otomatis ada newline di akhir */\n    puts(pesan);              /* Menampilkan isi array string */\n    puts(&quot;Program selesai.&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Dunia!\nSelamat belajar bahasa C!\nProgram selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    char pesan[] = \"Selamat belajar bahasa C!\";\n    puts(\"Halo, Dunia!\");     /* Otomatis ada newline di akhir */\n    puts(pesan);              /* Menampilkan isi array string */\n    puts(\"Program selesai.\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    __(\"=== Kalkulator Sederhana ===\");\n    __(\"Versi: 1.0\");\n    __(\"Dibuat oleh: Siswa C\");\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    puts(\"=== Kalkulator Sederhana ===\");\n    puts(\"Versi: 1.0\");\n    puts(\"Dibuat oleh: Siswa C\");\n    return 0;\n}",
            "hint": "1. Lengkapi pemanggilan puts() pertama dengan teks\n   \"=== Kalkulator Sederhana ===\" (tanpa \\n di akhir,\n   karena puts() otomatis menambahkan baris baru).\n\n2. Lengkapi pemanggilan puts() kedua dengan teks \"Versi: 1.0\".\n\n3. Lengkapi pemanggilan puts() ketiga dengan teks\n   \"Dibuat oleh: Siswa C\".",
            "quiz": {
              "question": "Apa yang membedakan puts() dari printf() dalam menampilkan string?",
              "options": [
                "puts() bisa menampilkan angka, printf() tidak",
                "puts() secara otomatis menambahkan newline di akhir output",
                "puts() membutuhkan format specifier, printf() tidak",
                "puts() berasal dari header yang berbeda dengan printf()"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "=== Kalkulator Sederhana ===\nVersi: 1.0\nDibuat oleh: Siswa C\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code> untuk menampilkan tiga baris teks deskripsi sebuah program sederhana.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Baris pertama harus: puts(\"=== Kalkulator Sederhana ===\");",
                "pattern": "puts\\s*\\(\\s*\"=== Kalkulator Sederhana ===\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Baris kedua harus: puts(\"Versi: 1.0\");",
                "pattern": "puts\\s*\\(\\s*\"Versi: 1\\.0\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Baris ketiga harus: puts(\"Dibuat oleh: Siswa C\");",
                "pattern": "puts\\s*\\(\\s*\"Dibuat oleh: Siswa C\"\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m5-l3",
            "title": "Fungsi `putchar()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">putchar()</code> adalah pasangan dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">getchar()</code> — fungsi yang menampilkan <strong>satu karakter tunggal</strong> ke layar. Argumennya bisa berupa variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code>, literal karakter (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'A'</code>), atau nilai ASCII integer. Fungsi ini tidak secara otomatis menambahkan newline seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">puts()</code>; jika ingin baris baru, kamu perlu secara eksplisit memanggil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">putchar('\\n')</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">putchar()</code> sangat berguna saat kamu perlu menampilkan karakter satu per satu, misalnya dalam iterasi string atau saat membangun output karakter demi karakter. Secara internal, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">putchar(c)</code> sebenarnya adalah macro yang setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fputc(c, stdout)</code>, tapi dalam praktik pembelajaran keduanya bisa dianggap sama.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    char huruf = &#039;C&#039;;\n    putchar(huruf);      /* Cetak variabel char */\n    putchar(&#039; &#039;);        /* Cetak spasi */\n    putchar(&#039;R&#039;);        /* Cetak literal char */\n    putchar(&#039;u&#039;);\n    putchar(&#039;l&#039;);\n    putchar(&#039;e&#039;);\n    putchar(&#039;s&#039;);\n    putchar(&#039;\\n&#039;);       /* Baris baru */\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">C Rules</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    char huruf = 'C';\n    putchar(huruf);      /* Cetak variabel char */\n    putchar(' ');        /* Cetak spasi */\n    putchar('R');        /* Cetak literal char */\n    putchar('u');\n    putchar('l');\n    putchar('e');\n    putchar('s');\n    putchar('\\n');       /* Baris baru */\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    putchar('__');\n    putchar('__');\n    putchar('__');\n    putchar('__');\n    putchar('__');\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    putchar('H');\n    putchar('A');\n    putchar('L');\n    putchar('O');\n    putchar('\\n');\n    return 0;\n}",
            "hint": "1. Lengkapi pemanggilan putchar() untuk masing-masing huruf:\n   'H', 'A', 'L', 'O' — satu huruf per baris, sesuai urutan\n   kata \"HALO\".\n\n2. Lengkapi pemanggilan putchar() terakhir dengan karakter\n   baris baru '\\n' agar output pindah ke baris berikutnya.",
            "quiz": {
              "question": "Berapa karakter yang ditampilkan oleh satu panggilan putchar()?",
              "options": [
                "Seluruh isi string",
                "Satu baris teks penuh",
                "Satu karakter tunggal",
                "Tergantung panjang argumen"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "HALO\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">putchar()</code> untuk menampilkan kata \"HALO\" karakter per karakter, diikuti baris baru.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Urutan harus: putchar('H'); putchar('A'); putchar('L'); putchar('O');",
                "pattern": "putchar\\s*\\(\\s*'H'\\s*\\)\\s*;\\s*\\n\\s*putchar\\s*\\(\\s*'A'\\s*\\)\\s*;\\s*\\n\\s*putchar\\s*\\(\\s*'L'\\s*\\)\\s*;\\s*\\n\\s*putchar\\s*\\(\\s*'O'\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Baris terakhir harus menampilkan baris baru: putchar('\\n');",
                "pattern": "putchar\\s*\\(\\s*'\\\\n'\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m6",
        "title": "Deklarasi Konstanta",
        "lessons": [
          {
            "id": "c-level-1-m6-l1",
            "title": "Konsep Nilai Konstanta",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Konstanta</strong> adalah nilai yang ditetapkan satu kali dan <strong>tidak boleh diubah</strong> selama program berjalan. Berbeda dengan variabel yang nilainya bisa dimodifikasi kapan saja, konstanta memberikan jaminan bahwa nilai tersebut tetap konsisten di seluruh program. Ini meningkatkan keamanan kode dan mencegah perubahan nilai yang tidak disengaja.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Penggunaan konstanta adalah praktik pemrograman yang baik karena dua alasan utama: pertama, kode lebih mudah dibaca (nama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">LAJU_CAHAYA</code> lebih bermakna daripada angka <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">299792458</code> yang tersebar di mana-mana), dan kedua, jika nilai perlu diubah, kamu hanya perlu mengubah satu tempat saja, bukan mencari-cari angka tersebut di seluruh kode. Contoh umum konstanta: nilai PI, batas maksimum array, kecepatan konversi, dll.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\n/* Contoh konstanta untuk program konversi suhu */\n#define OFFSET_FAHRENHEIT 32\n#define FAKTOR_KONVERSI 1.8\n\nint main() {\n    float celsius = 100.0f;\n    float fahrenheit = (celsius * FAKTOR_KONVERSI) + OFFSET_FAHRENHEIT;\n    printf(&quot;%.1f°C = %.1f°F\\n&quot;, celsius, fahrenheit);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">100.0°C = 212.0°F</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\n/* Contoh konstanta untuk program konversi suhu */\n#define OFFSET_FAHRENHEIT 32\n#define FAKTOR_KONVERSI 1.8\n\nint main() {\n    float celsius = 100.0f;\n    float fahrenheit = (celsius * FAKTOR_KONVERSI) + OFFSET_FAHRENHEIT;\n    printf(\"%.1f°C = %.1f°F\\n\", celsius, fahrenheit);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n#define __ 3.14159\n#define __ 2\n\nint main() {\n    float r = 7.0f;\n    float keliling = __ * __ * r;\n    printf(\"Keliling lingkaran dengan jari-jari %.0f: %.2f\\n\", r, keliling);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\n#define PI 3.14159\n#define DUA 2\n\nint main() {\n    float r = 7.0f;\n    float keliling = DUA * PI * r;\n    printf(\"Keliling lingkaran dengan jari-jari %.0f: %.2f\\n\", r, keliling);\n    return 0;\n}",
            "hint": "1. Lengkapi definisi konstanta PI menggunakan #define,\n   dengan nilai 3.14159.\n\n2. Lengkapi definisi konstanta DUA menggunakan #define,\n   dengan nilai 2.\n\n3. Pada rumus keliling, ganti angka literal 2 dan 3.14159\n   dengan nama konstanta DUA dan PI yang sudah didefinisikan.",
            "quiz": {"question":"Mengapa menggunakan konstanta lebih baik daripada menyebarkan nilai angka literal di seluruh kode program?","options":["Karena konstanta menggunakan lebih sedikit memori dibanding variabel","Karena konstanta bisa memiliki tipe data yang berbeda","Karena mudah dibaca dan jika nilai perlu diubah cukup mengubah satu tempat saja","Karena konstanta otomatis dioptimalkan oleh compiler"],"correctAnswer":2},
            "testCases": [{"expectedOutput":"Keliling lingkaran dengan jari-jari 7: 43.98\n","description":"<span>Tentukan mengapa kode berikut sebaiknya menggunakan konstanta, lalu refactor dengan mendefinisikan konstanta untuk nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.14159</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2</code>.</span>"}],
            "validationRules": [{"message":"Definisikan: #define PI 3.14159","pattern":"^\\s*#define\\s+PI\\s+3\\.14159\\s*$","shouldExist":true},{"message":"Definisikan: #define DUA 2","pattern":"^\\s*#define\\s+DUA\\s+2\\s*$","shouldExist":true},{"message":"Gunakan konstanta dalam rumus: float keliling = DUA * PI * r;","pattern":"float\\s+keliling\\s*=\\s*DUA\\s*\\*\\s*PI\\s*\\*\\s*r\\s*;","shouldExist":true}]
          },
          {
            "id": "c-level-1-m6-l2",
            "title": "Deklarasi dengan `#define`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code> adalah <strong>direktif preprocessor</strong> untuk mendefinisikan konstanta bernama (atau disebut macro). Sintaksnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define NAMA_KONSTANTA nilai</code> — tanpa tanda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code> dan tanpa titik koma di akhir. Sebelum kompilasi, preprocessor C akan <strong>mengganti setiap kemunculan</strong> nama tersebut secara tekstual dengan nilainya di seluruh kode. Oleh karena itu, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code> bukan deklarasi variabel — ia hanya substitusi teks.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Konvensi standar adalah menulis nama konstanta <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code> dengan <strong>HURUF KAPITAL SEMUA</strong> agar mudah dibedakan dari variabel. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code> bisa digunakan untuk mendefinisikan bukan hanya angka, tapi juga string, ekspresi, bahkan macro fungsi (meski yang terakhir perlu hati-hati dengan efek samping).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\n#define UKURAN_ARRAY 5\n#define NAMA_APP &quot;Kalkulator C&quot;\n#define VERSI 1.2\n\nint main() {\n    printf(&quot;Aplikasi: %s v%.1f\\n&quot;, NAMA_APP, VERSI);\n    printf(&quot;Ukuran array: %d elemen\\n&quot;, UKURAN_ARRAY);\n    int nilai[UKURAN_ARRAY] = {10, 20, 30, 40, 50};\n    printf(&quot;Elemen pertama: %d\\n&quot;, nilai[0]);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Aplikasi: Kalkulator C v1.2\nUkuran array: 5 elemen\nElemen pertama: 10</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\n#define UKURAN_ARRAY 5\n#define NAMA_APP \"Kalkulator C\"\n#define VERSI 1.2\n\nint main() {\n    printf(\"Aplikasi: %s v%.1f\\n\", NAMA_APP, VERSI);\n    printf(\"Ukuran array: %d elemen\\n\", UKURAN_ARRAY);\n    int nilai[UKURAN_ARRAY] = {10, 20, 30, 40, 50};\n    printf(\"Elemen pertama: %d\\n\", nilai[0]);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n#define __ __\n#define __ __\n#define __ __\n\nint main() {\n    int volume = __ * __ * __;\n    printf(\"Volume balok: %d\\n\", volume);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\n#define PANJANG 10\n#define LEBAR 5\n#define TINGGI 3\n\nint main() {\n    int volume = PANJANG * LEBAR * TINGGI;\n    printf(\"Volume balok: %d\\n\", volume);\n    return 0;\n}",
            "hint": "1. Lengkapi definisi konstanta PANJANG dengan nilai 10.\n   Ingat: #define tidak menggunakan tanda = dan tidak\n   diakhiri titik koma.\n\n2. Lengkapi definisi konstanta LEBAR dengan nilai 5.\n\n3. Lengkapi definisi konstanta TINGGI dengan nilai 3.\n\n4. Pada baris perhitungan volume, lengkapi rumus menggunakan\n   ketiga nama konstanta yang sudah didefinisikan, dikalikan\n   satu sama lain.",
            "quiz": {
              "question": "Manakah penulisan #define yang benar untuk mendefinisikan konstanta dengan nilai 100?",
              "options": [
                "#define MAKS = 100;",
                "#define MAKS 100",
                "#define int MAKS = 100;",
                "define MAKS 100;"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Volume balok: 150\n",
                "description": "<span>Definisikan tiga konstanta menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">PANJANG</code> (10), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">LEBAR</code> (5), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">TINGGI</code> (3), lalu hitung dan tampilkan volume balok (panjang × lebar × tinggi).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Definisikan: #define PANJANG 10",
                "pattern": "^\\s*#define\\s+PANJANG\\s+10\\s*$",
                "shouldExist": true
              },
              {
                "message": "Definisikan: #define LEBAR 5",
                "pattern": "^\\s*#define\\s+LEBAR\\s+5\\s*$",
                "shouldExist": true
              },
              {
                "message": "Definisikan: #define TINGGI 3",
                "pattern": "^\\s*#define\\s+TINGGI\\s+3\\s*$",
                "shouldExist": true
              },
              {
                "message": "Hitung volume dengan: int volume = PANJANG * LEBAR * TINGGI;",
                "pattern": "int\\s+volume\\s*=\\s*PANJANG\\s*\\*\\s*LEBAR\\s*\\*\\s*TINGGI\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m6-l3",
            "title": "Deklarasi dengan `const`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code>, bahasa C (sejak C89) menyediakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code> untuk mendeklarasikan konstanta yang <strong>memiliki tipe data eksplisit</strong>. Sintaksnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const tipe_data NAMA = nilai;</code>. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code> yang hanya substitusi teks tanpa tipe, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code> menciptakan variabel yang benar-benar <strong>bertipe dan bisa dicek oleh compiler</strong> — compiler akan memberikan error jika kamu mencoba mengubah nilainya.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Aspek</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#define</code></th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code></th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Tipe data</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak ada (substitusi teks)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Ada (bertipe eksplisit)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Cek compiler</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak ada</td><td class=\"border border-zinc-200 px-3 py-1.5\">Ada (lebih aman)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Debugging</td><td class=\"border border-zinc-200 px-3 py-1.5\">Sulit (tidak ada nama di debugger)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Mudah (nama terlihat)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Lingkup</td><td class=\"border border-zinc-200 px-3 py-1.5\">Global (seluruh file)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Mengikuti aturan scope</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Penggunaan dalam ekspresi</td><td class=\"border border-zinc-200 px-3 py-1.5\">Substitusi tekstual</td><td class=\"border border-zinc-200 px-3 py-1.5\">Nilai bertipe</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nconst float PAJAK = 0.11f;  /* Konstanta bertipe float */\nconst int BATAS_USIA = 18;\n\nint main() {\n    int usia = 20;\n    float harga = 100000.0f;\n    float total = harga + (harga * PAJAK);\n    printf(&quot;Harga setelah pajak: %.2f\\n&quot;, total);\n    /* PAJAK = 0.12f; */ /* ERROR: Tidak bisa mengubah const! */\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Harga setelah pajak: 111000.00</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nconst float PAJAK = 0.11f;  /* Konstanta bertipe float */\nconst int BATAS_USIA = 18;\n\nint main() {\n    int usia = 20;\n    float harga = 100000.0f;\n    float total = harga + (harga * PAJAK);\n    printf(\"Harga setelah pajak: %.2f\\n\", total);\n    /* PAJAK = 0.12f; */ /* ERROR: Tidak bisa mengubah const! */\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n__ double KURS = 15750.0;\n__ int MINIMAL_TRANSFER = 100;\n\nint main() {\n    int usd = 50;\n    double idr = usd * __;\n    printf(\"%d USD = Rp__\\n\", usd, idr);\n    printf(\"Minimal transfer: __ USD\\n\", MINIMAL_TRANSFER);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nconst double KURS = 15750.0;\nconst int MINIMAL_TRANSFER = 100;\n\nint main() {\n    int usd = 50;\n    double idr = usd * KURS;\n    printf(\"%d USD = Rp%.2f\\n\", usd, idr);\n    printf(\"Minimal transfer: %d USD\\n\", MINIMAL_TRANSFER);\n    return 0;\n}",
            "hint": "1. Lengkapi deklarasi konstanta KURS menggunakan const dengan\n   tipe double, nilai = 15750.0.\n\n2. Lengkapi deklarasi konstanta MINIMAL_TRANSFER menggunakan\n   const dengan tipe int, nilai = 100.\n\n3. Lengkapi rumus konversi: kalikan variabel usd dengan\n   konstanta KURS, simpan ke variabel idr (tipe double).\n\n4. Lengkapi format specifier pada kedua printf() untuk\n   menampilkan: nilai idr dengan 2 angka desimal, dan\n   konstanta MINIMAL_TRANSFER sebagai integer.",
            "quiz": {
              "question": "Apa keunggulan menggunakan const dibandingkan #define untuk mendefinisikan konstanta?",
              "options": [
                "const tidak membutuhkan tipe data sehingga lebih fleksibel",
                "const memiliki tipe data eksplisit sehingga compiler bisa melakukan pemeriksaan tipe",
                "const membuat program berjalan lebih cepat dari #define",
                "const bisa digunakan di luar fungsi, #define tidak bisa"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "50 USD = Rp787500.00\nMinimal transfer: 100 USD\n",
                "description": "<span>Deklarasikan dua konstanta menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const double KURS</code> (bernilai 15750.0 untuk konversi USD ke IDR) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const int MINIMAL_TRANSFER</code> (bernilai 100). Hitung konversi 50 USD ke IDR.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Deklarasikan: const double KURS = 15750.0;",
                "pattern": "^\\s*const\\s+double\\s+KURS\\s*=\\s*15750\\.0\\s*;",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan: const int MINIMAL_TRANSFER = 100;",
                "pattern": "^\\s*const\\s+int\\s+MINIMAL_TRANSFER\\s*=\\s*100\\s*;",
                "shouldExist": true
              },
              {
                "message": "Hitung konversi dengan: double idr = usd * KURS;",
                "pattern": "double\\s+idr\\s*=\\s*usd\\s*\\*\\s*KURS\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan %.2f untuk idr dan %d untuk MINIMAL_TRANSFER pada printf()",
                "pattern": "printf\\s*\\(\\s*\"%d USD = Rp%\\.2f\\\\n\"\\s*,\\s*usd\\s*,\\s*idr\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"Minimal transfer:\\s*%d USD\\\\n\"\\s*,\\s*MINIMAL_TRANSFER\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m7",
        "title": "Fungsi",
        "lessons": [
          {
            "id": "c-level-1-m7-l1",
            "title": "Konsep dan Deklarasi Fungsi",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Fungsi</strong> adalah blok kode mandiri yang melakukan tugas tertentu dan bisa dipanggil berulang kali dari berbagai bagian program. Tujuan utamanya adalah <strong>menghindari penulisan kode yang berulang</strong> (DRY — Don't Repeat Yourself) dan membuat program lebih terstruktur, mudah dibaca, dan mudah di-debug. Setiap fungsi C memiliki: tipe kembalian, nama fungsi, daftar parameter (opsional), dan badan fungsi (body).</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur dasar fungsi adalah: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_kembalian nama_fungsi(parameter) { /* badan fungsi */ return nilai; }</code>. Jika fungsi tidak mengembalikan nilai, tipe kembaliannya adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> dan tidak perlu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> dengan nilai. Sebuah fungsi harus <strong>dideklarasikan (prototipe) atau didefinisikan sebelum dipanggil</strong> — jika definisi fungsi ditulis di bawah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code>, kamu perlu menulis prototipenya di atas <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\n/* Prototipe / deklarasi fungsi */\nint kuadrat(int n);\n\nint main() {\n    int hasil = kuadrat(5);  /* Pemanggilan fungsi */\n    printf(&quot;Kuadrat dari 5 adalah: %d\\n&quot;, hasil);\n    return 0;\n}\n\n/* Definisi fungsi */\nint kuadrat(int n) {\n    return n * n;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Kuadrat dari 5 adalah: 25</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\n/* Prototipe / deklarasi fungsi */\nint kuadrat(int n);\n\nint main() {\n    int hasil = kuadrat(5);  /* Pemanggilan fungsi */\n    printf(\"Kuadrat dari 5 adalah: %d\\n\", hasil);\n    return 0;\n}\n\n/* Definisi fungsi */\nint kuadrat(int n) {\n    return n * n;\n}",
            "initialCode": "#include <stdio.h>\n\n__ luasPersegi(__ __);\n\nint main() {\n    int sisi = 6;\n    int luas = luasPersegi(sisi);\n    printf(\"Luas persegi dengan sisi %d adalah: %d\\n\", sisi, luas);\n    return 0;\n}\n\n__ luasPersegi(__ __) {\n    return __ * __;\n}",
            "solution": "#include <stdio.h>\n\nint luasPersegi(int sisi);\n\nint main() {\n    int sisi = 6;\n    int luas = luasPersegi(sisi);\n    printf(\"Luas persegi dengan sisi %d adalah: %d\\n\", sisi, luas);\n    return 0;\n}\n\nint luasPersegi(int sisi) {\n    return sisi * sisi;\n}",
            "hint": "1. Lengkapi prototipe fungsi luasPersegi: tipe kembalian int,\n   menerima satu parameter bertipe int bernama sisi.\n\n2. Pada definisi fungsi (di bawah main), lengkapi kembali\n   header fungsi yang SAMA seperti prototipe pada langkah 1.\n\n3. Lengkapi isi fungsi: kembalikan hasil perkalian sisi dengan\n   sisi menggunakan return.",
            "quiz": {"question":"Apa tujuan utama menggunakan fungsi dalam pemrograman?","options":["Membuat program berjalan lebih lambat tapi lebih aman","Menghindari penulisan kode berulang dan membuat program lebih terstruktur","Mengganti kebutuhan akan variabel global","Hanya digunakan untuk operasi matematika"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Luas persegi dengan sisi 6 adalah: 36\n","description":"<span>Buat fungsi bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">luasPersegi</code> yang menerima satu parameter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int sisi</code> dan mengembalikan nilai luas persegi (sisi × sisi). Panggil fungsi tersebut dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> dengan sisi = 6.</span>"}],
            "validationRules": [{"message":"Prototipe fungsi harus: int luasPersegi(int sisi);","pattern":"^\\s*int\\s+luasPersegi\\s*\\(\\s*int\\s+sisi\\s*\\)\\s*;","shouldExist":true},{"message":"Header definisi fungsi harus sama dengan prototipe: int luasPersegi(int sisi) {","pattern":"int\\s+luasPersegi\\s*\\(\\s*int\\s+sisi\\s*\\)\\s*\\{","shouldExist":true},{"message":"Kembalikan hasil perkalian dengan: return sisi * sisi;","pattern":"return\\s+sisi\\s*\\*\\s*sisi\\s*;","shouldExist":true}]
          },
          {
            "id": "c-level-1-m7-l2",
            "title": "Fungsi Pustaka `<string.h>`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Header <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;string.h&gt;</code> menyediakan kumpulan fungsi siap pakai untuk <strong>manipulasi string</strong> (array karakter yang diakhiri <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'\\0'</code>). Fungsi-fungsi ini sangat sering digunakan karena C tidak memiliki tipe string bawaan seperti bahasa lain — string di C adalah array <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code> biasa.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Kegunaan</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strlen(s)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Menghitung panjang string</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strlen(\"Halo\")</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">4</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcpy(dst, src)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Menyalin string</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcpy(a, \"Budi\")</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcat(dst, src)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Menggabungkan string</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcat(a, b)</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcmp(s1, s2)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Membandingkan string (0 = sama)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcmp(\"a\",\"a\")</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strrev(s)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Membalik string (non-standar)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strrev(\"abc\")</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"cba\"</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n#include &lt;string.h&gt;\n\nint main() {\n    char nama1[20] = &quot;Andi&quot;;\n    char nama2[20] = &quot;Budi&quot;;\n    char gabungan[40];\n\n    printf(&quot;Panjang nama1: %lu\\n&quot;, strlen(nama1));\n    strcpy(gabungan, nama1);\n    strcat(gabungan, &quot; dan &quot;);\n    strcat(gabungan, nama2);\n    printf(&quot;Gabungan: %s\\n&quot;, gabungan);\n    printf(&quot;Apakah sama? %d\\n&quot;, strcmp(nama1, nama2));\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Panjang nama1: 4\nGabungan: Andi dan Budi\nApakah sama? -1</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char nama1[20] = \"Andi\";\n    char nama2[20] = \"Budi\";\n    char gabungan[40];\n\n    printf(\"Panjang nama1: %lu\\n\", strlen(nama1));\n    strcpy(gabungan, nama1);\n    strcat(gabungan, \" dan \");\n    strcat(gabungan, nama2);\n    printf(\"Gabungan: %s\\n\", gabungan);\n    printf(\"Apakah sama? %d\\n\", strcmp(nama1, nama2));\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n#include <__>\n\nint main() {\n    char kata[20] = \"Programming\";\n    printf(\"Panjang kata: %lu\\n\", __(kata));\n    __(kata, \" C\");\n    printf(\"Hasil gabungan: __\\n\", kata);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char kata[20] = \"Programming\";\n    printf(\"Panjang kata: %lu\\n\", strlen(kata));\n    strcat(kata, \" C\");\n    printf(\"Hasil gabungan: %s\\n\", kata);\n    return 0;\n}",
            "hint": "1. Lengkapi header yang dibutuhkan agar fungsi strlen() dan\n   strcat() bisa digunakan.\n\n2. Lengkapi pemanggilan strlen() dengan argumen \"kata\" pada\n   printf() pertama. Gunakan format specifier %lu.\n\n3. Lengkapi pemanggilan strcat() untuk menggabungkan variabel\n   \"kata\" dengan string \" C\".\n\n4. Lengkapi format specifier pada printf() kedua untuk\n   menampilkan hasil gabungan sebagai string.",
            "quiz": {
              "question": "Fungsi strcmp(s1, s2) mengembalikan nilai 0 jika...",
              "options": [
                "s1 lebih panjang dari s2",
                "Kedua string identik",
                "s1 lebih pendek dari s2",
                "Salah satu string kosong"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Panjang kata: 11\nHasil gabungan: Programming C\n",
                "description": "<span>Buat program yang mendeklarasikan string <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">kata = \"Programming\"</code>, lalu tampilkan panjangnya menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strlen()</code>, dan gabungkan dengan kata \" C\" menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcat()</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Sertakan header: #include <string.h>",
                "pattern": "#include\\s*<\\s*string\\.h\\s*>",
                "shouldExist": true
              },
              {
                "message": "Gunakan: printf(\"Panjang kata: %lu\\n\", strlen(kata));",
                "pattern": "printf\\s*\\(\\s*\"Panjang kata:\\s*%lu\\\\n\"\\s*,\\s*strlen\\s*\\(\\s*kata\\s*\\)\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Gabungkan dengan: strcat(kata, \" C\");",
                "pattern": "strcat\\s*\\(\\s*kata\\s*,\\s*\"\\s*C\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan format %s: printf(\"Hasil gabungan: %s\\n\", kata);",
                "pattern": "printf\\s*\\(\\s*\"Hasil gabungan:\\s*%s\\\\n\"\\s*,\\s*kata\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-1-m7-l3",
            "title": "Fungsi Pustaka `<math.h>` dan `<stdlib.h>`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Header <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;math.h&gt;</code> menyediakan fungsi-fungsi <strong>matematika</strong> seperti akar kuadrat, pangkat, dan pembulatan. Saat dikompilasi dengan GCC, header ini sering memerlukan flag tambahan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-lm</code> (link math library). Header <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code> menyediakan fungsi <strong>utilitas umum</strong>, termasuk konversi tipe data, alokasi memori dinamis, menghasilkan angka acak, dan menghentikan program.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Header</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Kegunaan</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sqrt(x)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;math.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Akar kuadrat</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">pow(x,y)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;math.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat (x^y)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">ceil(x)</code> / <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">floor(x)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;math.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pembulatan atas/bawah</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">abs(x)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Nilai absolut integer</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">rand()</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Angka acak</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">atoi(s)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">String ke integer</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">exit(kode)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;stdlib.h&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Menghentikan program</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n#include &lt;math.h&gt;\n#include &lt;stdlib.h&gt;\n\nint main() {\n    double akar = sqrt(64.0);\n    double pangkat = pow(2.0, 10.0);\n    int absolut = abs(-25);\n    int dariString = atoi(&quot;150&quot;);\n\n    printf(&quot;Akar dari 64: %.0f\\n&quot;, akar);\n    printf(&quot;2 pangkat 10: %.0f\\n&quot;, pangkat);\n    printf(&quot;Absolut -25: %d\\n&quot;, absolut);\n    printf(&quot;String &#039;150&#039; jadi int: %d\\n&quot;, dariString);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program -lm &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Akar dari 64: 8\n2 pangkat 10: 1024\nAbsolut -25: 25\nString &#039;150&#039; jadi int: 150</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n    double akar = sqrt(64.0);\n    double pangkat = pow(2.0, 10.0);\n    int absolut = abs(-25);\n    int dariString = atoi(\"150\");\n\n    printf(\"Akar dari 64: %.0f\\n\", akar);\n    printf(\"2 pangkat 10: %.0f\\n\", pangkat);\n    printf(\"Absolut -25: %d\\n\", absolut);\n    printf(\"String '150' jadi int: %d\\n\", dariString);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n#include <__>\n\nint main() {\n    double akar = __(144.0);\n    double pangkat = __(3.0, 3.0);\n    printf(\"Akar dari 144: __\\n\", akar);\n    printf(\"3 pangkat 3: __\\n\", pangkat);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    double akar = sqrt(144.0);\n    double pangkat = pow(3.0, 3.0);\n    printf(\"Akar dari 144: %.2f\\n\", akar);\n    printf(\"3 pangkat 3: %.2f\\n\", pangkat);\n    return 0;\n}",
            "hint": "1. Lengkapi header yang dibutuhkan agar fungsi sqrt() dan pow()\n   bisa digunakan.\n\n2. Lengkapi pemanggilan sqrt() dengan argumen 144.0, simpan ke\n   variabel \"akar\" bertipe double.\n\n3. Lengkapi pemanggilan pow() dengan argumen 3.0 dan 3.0 (basis\n   dan eksponen), simpan ke variabel \"pangkat\" bertipe double.\n\n4. Lengkapi format specifier pada kedua printf() untuk\n   menampilkan double dengan 2 angka desimal.",
            "quiz": {
              "question": "Fungsi pow(2.0, 10.0) dari <math.h> digunakan untuk menghitung...",
              "options": [
                "2 dibagi 10",
                "2 dikurangi 10",
                "2 dipangkatkan 10",
                "Akar pangkat 10 dari 2"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Akar dari 144: 12.00\n3 pangkat 3: 27.00\n",
                "description": "<span>Buat program yang menghitung akar kuadrat dari 144 menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sqrt()</code> dan menghitung 3 pangkat 3 menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">pow()</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Sertakan header: #include <math.h>",
                "pattern": "#include\\s*<\\s*math\\.h\\s*>",
                "shouldExist": true
              },
              {
                "message": "Gunakan: double akar = sqrt(144.0);",
                "pattern": "double\\s+akar\\s*=\\s*sqrt\\s*\\(\\s*144(\\.0)?\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan: double pangkat = pow(3.0, 3.0);",
                "pattern": "double\\s+pangkat\\s*=\\s*pow\\s*\\(\\s*3(\\.0)?\\s*,\\s*3(\\.0)?\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Gunakan format %.2f pada kedua printf()",
                "pattern": "printf\\s*\\(\\s*\"Akar dari 144:\\s*%\\.2f\\\\n\"\\s*,\\s*akar\\s*\\)[\\s\\S]*printf\\s*\\(\\s*\"3 pangkat 3:\\s*%\\.2f\\\\n\"\\s*,\\s*pangkat\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-1-m8",
        "title": "Operator",
        "lessons": [
          {
            "id": "c-level-1-m8-l1",
            "title": "Operator Unary",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Operator unary</strong> adalah operator yang hanya beroperasi pada <strong>satu operand</strong> (satu nilai/variabel). Operator unary yang umum di C meliputi: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code> (negasi/minus), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> (positif, jarang dipakai), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">++</code> (increment, menambah 1), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">--</code> (decrement, mengurangi 1), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> (NOT logika), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code> (address-of), serta <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> (dereference pointer).</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">++</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">--</code> memiliki dua bentuk: <strong>prefix</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">++x</code>) dan <strong>postfix</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x++</code>). Perbedaannya terletak pada <em>kapan</em> nilai baru digunakan dalam ekspresi: prefix menambah nilai <strong>sebelum</strong> digunakan, sedangkan postfix menggunakan nilai <strong>lama</strong> terlebih dahulu, baru kemudian menambahkannya. Perbedaan ini sangat penting saat operator digunakan dalam ekspresi gabungan, bukan sebagai statement berdiri sendiri.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil (jika x=5)</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Negasi</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-5</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">++x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pre-increment</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">y = ++x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">x jadi 6, y = 6</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x++</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Post-increment</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">y = x++</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">y = 5, x jadi 6</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">--x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pre-decrement</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">y = --x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">x jadi 4, y = 4</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!x</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Logical NOT</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!0</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code> (true)</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int a = 5, b = 5;\n    int hasil1 = ++a;  /* a jadi 6 dulu, lalu hasil1 = 6 */\n    int hasil2 = b++;  /* hasil2 = 5 dulu, lalu b jadi 6 */\n\n    printf(&quot;a = %d, hasil1 = %d\\n&quot;, a, hasil1);\n    printf(&quot;b = %d, hasil2 = %d\\n&quot;, b, hasil2);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">a = 6, hasil1 = 6\nb = 6, hasil2 = 5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 5;\n    int hasil1 = ++a;  /* a jadi 6 dulu, lalu hasil1 = 6 */\n    int hasil2 = b++;  /* hasil2 = 5 dulu, lalu b jadi 6 */\n\n    printf(\"a = %d, hasil1 = %d\\n\", a, hasil1);\n    printf(\"b = %d, hasil2 = %d\\n\", b, hasil2);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int counter = 10;\n    printf(\"Pre-increment: %d\\n\", __counter);\n    printf(\"Post-decrement: %d\\n\", counter__);\n    printf(\"Nilai akhir counter: %d\\n\", counter);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int counter = 10;\n    printf(\"Pre-increment: %d\\n\", ++counter);\n    printf(\"Post-decrement: %d\\n\", counter--);\n    printf(\"Nilai akhir counter: %d\\n\", counter);\n    return 0;\n}",
            "hint": "1. Pada printf() pertama, lengkapi ekspresi pre-increment\n   terhadap variabel counter (operator ++ ditulis SEBELUM\n   nama variabel).\n\n2. Pada printf() kedua, lengkapi ekspresi post-decrement\n   terhadap variabel counter (operator -- ditulis SETELAH\n   nama variabel).\n\n3. printf() ketiga sudah benar — tidak perlu diubah.",
            "quiz": {"question":"Jika int x = 10; dan dijalankan int y = x++;, berapa nilai y setelah baris itu dieksekusi?","options":["11","10","0","9"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Pre-increment: 11\nPost-decrement: 11\nNilai akhir counter: 10\n","description":"<span>Deklarasikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int counter = 10;</code>. Tampilkan hasil dari pre-increment (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">++counter</code>) dan post-decrement (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">counter--</code>) beserta nilai akhir <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">counter</code> setelah keduanya dieksekusi.</span>"}],
            "validationRules": [{"message":"Gunakan pre-increment: printf(\"Pre-increment: %d\\n\", ++counter);","pattern":"printf\\s*\\(\\s*\"Pre-increment:\\s*%d\\\\n\"\\s*,\\s*\\+\\+counter\\s*\\)","shouldExist":true},{"message":"Gunakan post-decrement: printf(\"Post-decrement: %d\\n\", counter--);","pattern":"printf\\s*\\(\\s*\"Post-decrement:\\s*%d\\\\n\"\\s*,\\s*counter--\\s*\\)","shouldExist":true},{"message":"Pastikan urutan: pre-increment dulu, lalu post-decrement, lalu nilai akhir","pattern":"\\+\\+counter[\\s\\S]*counter--[\\s\\S]*Nilai akhir counter","shouldExist":true}]
          },
          {
            "id": "c-level-1-m8-l2",
            "title": "Operator Aritmatika",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Operator aritmatika</strong> digunakan untuk melakukan operasi matematika dasar: penjumlahan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>), pengurangan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>), perkalian (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>), pembagian (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>), dan </strong>modulus/sisa bagi<strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>). Operator-operator ini mengikuti aturan <strong>urutan operasi (precedence)</strong> matematika standar — perkalian dan pembagian dikerjakan sebelum penjumlahan dan pengurangan, kecuali ada tanda kurung.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hal penting yang harus dipahami pemula adalah perilaku <strong>pembagian integer</strong>: jika kedua operand <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>, hasilnya juga <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> dan bagian desimal <strong>dibuang (truncated)</strong>, bukan dibulatkan. Misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code>. Untuk hasil desimal, minimal salah satu operand harus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code>. Operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code> (modulus) hanya berlaku untuk tipe integer dan menghasilkan <strong>sisa pembagian</strong>.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Penjumlahan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 + 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pengurangan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 - 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Perkalian</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 * 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">15</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pembagian</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> (int)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pembagian</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7.0 / 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus (sisa bagi)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 % 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int a = 17, b = 5;\n    printf(&quot;17 + 5 = %d\\n&quot;, a + b);\n    printf(&quot;17 / 5 (integer)  = %d\\n&quot;, a / b);\n    printf(&quot;17 / 5 (float)    = %.2f\\n&quot;, (float)a / b);\n    printf(&quot;17 %% 5 (modulus) = %d\\n&quot;, a % b);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">17 + 5 = 22\n17 / 5 (integer)  = 3\n17 / 5 (float)    = 3.40\n17 % 5 (modulus) = 2</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int a = 17, b = 5;\n    printf(\"17 + 5 = %d\\n\", a + b);\n    printf(\"17 / 5 (integer)  = %d\\n\", a / b);\n    printf(\"17 / 5 (float)    = %.2f\\n\", (float)a / b);\n    printf(\"17 %% 5 (modulus) = %d\\n\", a % b);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf(\"Masukkan bilangan pertama: \");\n    scanf(\"%d\", &a);\n    printf(\"Masukkan bilangan kedua: \");\n    scanf(\"%d\", &b);\n    printf(\"Hasil bagi: %d\\n\", a __ b);\n    printf(\"Sisa bagi: %d\\n\", a __ b);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf(\"Masukkan bilangan pertama: \");\n    scanf(\"%d\", &a);\n    printf(\"Masukkan bilangan kedua: \");\n    scanf(\"%d\", &b);\n    printf(\"Hasil bagi: %d\\n\", a / b);\n    printf(\"Sisa bagi: %d\\n\", a % b);\n    return 0;\n}",
            "hint": "1. Pada printf() pertama setelah scanf(), lengkapi ekspresi\n   untuk menghitung hasil bagi integer antara a dan b\n   (gunakan operator pembagian biasa).\n\n2. Pada printf() kedua, lengkapi ekspresi untuk menghitung\n   sisa pembagian antara a dan b (gunakan operator modulus).",
            "quiz": {"question":"Apa hasil dari ekspresi 17 % 5 dalam bahasa C?","options":["3.4","3","2","5"],"correctAnswer":2},
            "testCases": [{"expectedOutput":"Masukkan bilangan pertama: Masukkan bilangan kedua: Hasil bagi: 5\nSisa bagi: 3\n","description":"<span>Buat program yang membaca dua bilangan bulat dari pengguna, lalu menampilkan hasil bagi (integer) dan sisa bagi (modulus) dari kedua bilangan tersebut.</span>","input":"23\n4"}],
            "validationRules": [{"message":"Hitung hasil bagi dengan operator /: printf(\"Hasil bagi: %d\\n\", a / b);","pattern":"printf\\s*\\(\\s*\"Hasil bagi:\\s*%d\\\\n\"\\s*,\\s*a\\s*/\\s*b\\s*\\)","shouldExist":true},{"message":"Hitung sisa bagi dengan operator %: printf(\"Sisa bagi: %d\\n\", a % b);","pattern":"printf\\s*\\(\\s*\"Sisa bagi:\\s*%d\\\\n\"\\s*,\\s*a\\s*%\\s*b\\s*\\)","shouldExist":true}]
          },
          {
            "id": "c-level-1-m8-l3",
            "title": "Operator Relasi",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Operator relasi (perbandingan)</strong> digunakan untuk <strong>membandingkan dua nilai</strong> dan menghasilkan nilai boolean: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code> (benar/true) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> (salah/false). Operator ini sangat penting karena menjadi dasar dari pengambilan keputusan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, dll). Hasil perbandingan <strong>bukan</strong> tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> khusus di C klasik, melainkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (0 atau 1).</li>\n</ul>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Arti</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Sama dengan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 == 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak sama dengan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 != 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Lebih besar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 &gt; 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Lebih kecil</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 &lt; 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;=</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Lebih besar atau sama</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 &gt;= 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;=</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Lebih kecil atau sama</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 &lt;= 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Kesalahan paling umum</strong>: tertukar antara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code> (assignment / memberi nilai) dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code> (perbandingan kesamaan). Menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (x = 5)</code> adalah bug serius — ini akan <strong>memberi nilai 5 ke x</strong> dan selalu bernilai true (karena 5 bukan 0), bukan membandingkan apakah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x</code> sama dengan 5.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int a = 10, b = 20;\n    printf(&quot;a == b : %d\\n&quot;, a == b);\n    printf(&quot;a != b : %d\\n&quot;, a != b);\n    printf(&quot;a &lt; b  : %d\\n&quot;, a &lt; b);\n    printf(&quot;a &gt;= b : %d\\n&quot;, a &gt;= b);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">a == b : 0\na != b : 1\na &lt; b  : 1\na &gt;= b : 0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    printf(\"a == b : %d\\n\", a == b);\n    printf(\"a != b : %d\\n\", a != b);\n    printf(\"a < b  : %d\\n\", a < b);\n    printf(\"a >= b : %d\\n\", a >= b);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf(\"Masukkan bilangan A: \");\n    scanf(\"%d\", &a);\n    printf(\"Masukkan bilangan B: \");\n    scanf(\"%d\", &b);\n    printf(\"A == B: %d\\n\", a __ b);\n    printf(\"A > B : %d\\n\", a __ b);\n    printf(\"A <= B: %d\\n\", a __ b);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf(\"Masukkan bilangan A: \");\n    scanf(\"%d\", &a);\n    printf(\"Masukkan bilangan B: \");\n    scanf(\"%d\", &b);\n    printf(\"A == B: %d\\n\", a == b);\n    printf(\"A > B : %d\\n\", a > b);\n    printf(\"A <= B: %d\\n\", a <= b);\n    return 0;\n}",
            "hint": "1. Lengkapi ekspresi pada printf() pertama: bandingkan a dan b\n   menggunakan operator \"sama dengan\".\n\n2. Lengkapi ekspresi pada printf() kedua: bandingkan a dan b\n   menggunakan operator \"lebih besar dari\".\n\n3. Lengkapi ekspresi pada printf() ketiga: bandingkan a dan b\n   menggunakan operator \"lebih kecil atau sama dengan\".",
            "quiz": {"question":"Apa hasil dari ekspresi (10 != 10) dalam bahasa C?","options":["1","0","10","Error kompilasi"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Masukkan bilangan A: Masukkan bilangan B: A == B: 1\nA > B : 0\nA <= B: 1\n","description":"<span>Buat program yang membaca dua bilangan bulat, lalu menampilkan hasil perbandingan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;=</code> antara kedua bilangan tersebut (dalam bentuk 0 atau 1).</span>","input":"8\n8"}],
            "validationRules": [{"message":"Gunakan operator ==: printf(\"A == B: %d\\n\", a == b);","pattern":"printf\\s*\\(\\s*\"A == B:\\s*%d\\\\n\"\\s*,\\s*a\\s*==\\s*b\\s*\\)","shouldExist":true},{"message":"Gunakan operator >: printf(\"A > B : %d\\n\", a > b);","pattern":"printf\\s*\\(\\s*\"A > B\\s*:\\s*%d\\\\n\"\\s*,\\s*a\\s*>\\s*b\\s*\\)","shouldExist":true},{"message":"Gunakan operator <=: printf(\"A <= B: %d\\n\", a <= b);","pattern":"printf\\s*\\(\\s*\"A <= B:\\s*%d\\\\n\"\\s*,\\s*a\\s*<=\\s*b\\s*\\)","shouldExist":true}]
          },
          {
            "id": "c-level-1-m8-l4",
            "title": "Operator Logika",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Operator logika</strong> digunakan untuk menggabungkan atau memodifikasi hasil ekspresi boolean (kondisi). Terdapat tiga operator logika di C: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code> (AND/DAN — bernilai true hanya jika </strong>kedua<strong> operand true), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code> (OR/ATAU — bernilai true jika <strong>salah satu</strong> operand true), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> (NOT — membalik nilai boolean).</li>\n</ul>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">A</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">B</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">AND</td><td class=\"border border-zinc-200 px-3 py-1.5\">1</td><td class=\"border border-zinc-200 px-3 py-1.5\">1</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">AND</td><td class=\"border border-zinc-200 px-3 py-1.5\">1</td><td class=\"border border-zinc-200 px-3 py-1.5\">0</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">`\\</td><td class=\"border border-zinc-200 px-3 py-1.5\">\\</td><td class=\"border border-zinc-200 px-3 py-1.5\">`</td><td class=\"border border-zinc-200 px-3 py-1.5\">OR</td><td class=\"border border-zinc-200 px-3 py-1.5\">0</td><td class=\"border border-zinc-200 px-3 py-1.5\">1</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">`\\</td><td class=\"border border-zinc-200 px-3 py-1.5\">\\</td><td class=\"border border-zinc-200 px-3 py-1.5\">`</td><td class=\"border border-zinc-200 px-3 py-1.5\">OR</td><td class=\"border border-zinc-200 px-3 py-1.5\">0</td><td class=\"border border-zinc-200 px-3 py-1.5\">0</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">NOT</td><td class=\"border border-zinc-200 px-3 py-1.5\">1</td><td class=\"border border-zinc-200 px-3 py-1.5\">-</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">NOT</td><td class=\"border border-zinc-200 px-3 py-1.5\">0</td><td class=\"border border-zinc-200 px-3 py-1.5\">-</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator logika sering digunakan untuk memeriksa <strong>rentang nilai</strong> atau <strong>kombinasi kondisi</strong>, misalnya memeriksa apakah usia berada dalam rentang tertentu: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(usia &gt;= 18 && usia &lt;= 60)</code>. C juga menerapkan <strong>short-circuit evaluation</strong>: pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, jika operand pertama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code>, operand kedua tidak akan dievaluasi sama sekali (karena hasilnya pasti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code>); pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, jika operand pertama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code>, operand kedua diabaikan.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int usia = 25;\n    int punya_ktp = 1;\n\n    printf(&quot;Bisa memilih: %d\\n&quot;, (usia &gt;= 17) &amp;&amp; punya_ktp);\n    printf(&quot;Diskon (lansia/anak): %d\\n&quot;, (usia &lt; 12) || (usia &gt; 60));\n    printf(&quot;Bukan dewasa: %d\\n&quot;, !(usia &gt;= 18));\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Bisa memilih: 1\nDiskon (lansia/anak): 0\nBukan dewasa: 0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int usia = 25;\n    int punya_ktp = 1;\n\n    printf(\"Bisa memilih: %d\\n\", (usia >= 17) && punya_ktp);\n    printf(\"Diskon (lansia/anak): %d\\n\", (usia < 12) || (usia > 60));\n    printf(\"Bukan dewasa: %d\\n\", !(usia >= 18));\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int suhu;\n    printf(\"Masukkan suhu tubuh: \");\n    scanf(\"%d\", &suhu);\n    printf(\"Status normal: %d\\n\", (suhu __ 36) __ (suhu __ 37));\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int suhu;\n    printf(\"Masukkan suhu tubuh: \");\n    scanf(\"%d\", &suhu);\n    printf(\"Status normal: %d\\n\", (suhu >= 36) && (suhu <= 37));\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi pertama: periksa apakah suhu lebih besar\n   atau sama dengan 36.\n\n2. Lengkapi operator logika di antara kedua kondisi — gunakan\n   operator yang berarti \"DAN\" (kedua kondisi harus terpenuhi).\n\n3. Lengkapi kondisi kedua: periksa apakah suhu lebih kecil\n   atau sama dengan 37.",
            "quiz": {"question":"Berapa hasil dari ekspresi (5 > 3) && (2 > 4) dalam bahasa C?","options":["1","0","2","Error karena tidak boleh menggabungkan dua ekspresi"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Masukkan suhu tubuh: Status normal: 1\n","description":"<span>Buat program yang membaca nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int suhu</code> dan menampilkan apakah suhu tersebut berada dalam kategori \"Normal\" (antara 36 dan 37 derajat, inklusif) menggunakan operator logika AND.</span>","input":"36"}],
            "validationRules": [{"message":"Kondisi pertama harus: (suhu >= 36)","pattern":"\\(\\s*suhu\\s*>=\\s*36\\s*\\)","shouldExist":true},{"message":"Gabungkan dengan operator AND: (suhu >= 36) && (suhu <= 37)","pattern":"\\(\\s*suhu\\s*>=\\s*36\\s*\\)\\s*&&\\s*\\(\\s*suhu\\s*<=\\s*37\\s*\\)","shouldExist":true},{"message":"Kondisi kedua harus: (suhu <= 37)","pattern":"\\(\\s*suhu\\s*<=\\s*37\\s*\\)","shouldExist":true}]
          },
        ]
      },
      {
        "id": "c-level-1-m9",
        "title": "Flowchart",
        "lessons": [
          {
            "id": "c-level-1-m9-l1",
            "title": "Aturan Penulisan Flowchart",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Flowchart (diagram alir)</strong> adalah representasi visual dari langkah-langkah logika sebuah program menggunakan simbol-simbol standar yang saling terhubung dengan garis/anak panah penunjuk arah. Flowchart membantu programmer <strong>merancang logika sebelum menulis kode</strong>, sehingga alur program lebih mudah dipahami, didiskusikan, dan diverifikasi sebelum diimplementasikan.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Beberapa aturan dasar penulisan flowchart: (1) setiap flowchart <strong>wajib memiliki satu titik Mulai (Start)</strong> dan minimal satu titik <strong>Selesai (End)</strong>; (2) alur dibaca <strong>dari atas ke bawah</strong> dan arah panah menunjukkan urutan eksekusi; (3) setiap simbol memiliki <strong>bentuk dan makna khusus</strong> yang tidak bisa ditukar sembarangan; (4) garis penghubung <strong>tidak boleh saling tumpang tindih tanpa keterangan</strong> yang jelas; (5) percabangan (decision) harus memiliki <strong>minimal dua keluaran</strong> berlabel (misalnya \"Ya\"/\"Tidak\").</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">[Gambar: Flowchart sederhana dengan simbol Start, Proses, Decision, dan End yang terhubung dengan anak panah]</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\n/* \n * Flowchart:\n * [Start] -&gt; [Input: nilai] -&gt; [Decision: nilai &gt;= 60?]\n *    Ya -&gt; [Output: &quot;Lulus&quot;] -&gt; [End]\n *    Tidak -&gt; [Output: &quot;Tidak Lulus&quot;] -&gt; [End]\n */\nint main() {\n    int nilai = 75;\n    if (nilai &gt;= 60) {\n        printf(&quot;Lulus\\n&quot;);\n    } else {\n        printf(&quot;Tidak Lulus\\n&quot;);\n    }\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Lulus</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\n/* \n * Flowchart:\n * [Start] -> [Input: nilai] -> [Decision: nilai >= 60?]\n *    Ya -> [Output: \"Lulus\"] -> [End]\n *    Tidak -> [Output: \"Tidak Lulus\"] -> [End]\n */\nint main() {\n    int nilai = 75;\n    if (nilai >= 60) {\n        printf(\"Lulus\\n\");\n    } else {\n        printf(\"Tidak Lulus\\n\");\n    }\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n/*\n * Flowchart:\n * [Start] -> [Input: angka] -> [Decision: angka % 2 == 0?]\n *    Ya -> [Output: \"Genap\"] -> [End]\n *    Tidak -> [Output: \"__\"] -> [End]\n */\nint main() {\n    int angka = 7;\n    if (angka __ 2 __ 0) {\n        printf(\"Bilangan %d adalah Genap\\n\", angka);\n    } else {\n        __\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\n/*\n * Flowchart:\n * [Start] -> [Input: angka] -> [Decision: angka % 2 == 0?]\n *    Ya -> [Output: \"Genap\"] -> [End]\n *    Tidak -> [Output: \"Ganjil\"] -> [End]\n */\nint main() {\n    int angka = 7;\n    if (angka % 2 == 0) {\n        printf(\"Bilangan %d adalah Genap\\n\", angka);\n    } else {\n        printf(\"Bilangan %d adalah Ganjil\\n\", angka);\n    }\n    return 0;\n}",
            "hint": "1. Pada bagian komentar flowchart, lengkapi label keluaran\n   \"Tidak\" — sesuai dengan kondisi (angka % 2 == 0) bernilai\n   salah, artinya angka tersebut termasuk kategori apa?\n\n2. Pada kondisi if, lengkapi ekspresi untuk memeriksa apakah\n   angka habis dibagi 2 (gunakan operator modulus, hasilnya\n   dibandingkan dengan 0).\n\n3. Pada blok else, lengkapi printf() untuk menampilkan bahwa\n   bilangan adalah \"Ganjil\", dengan format yang sama seperti\n   blok if (gunakan %d untuk angka dan sertakan nama variabel).",
            "quiz": {"question":"Apa yang **wajib** ada dalam sebuah flowchart yang benar?","options":["Minimal sepuluh simbol proses","Satu titik Mulai (Start) dan minimal satu titik Selesai (End)","Hanya simbol decision tanpa simbol proses","Warna berbeda untuk setiap simbol"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Bilangan 7 adalah Ganjil\n","description":"<span>Lengkapi komentar flowchart berikut agar mencerminkan urutan logika program: cek apakah angka adalah bilangan genap atau ganjil, lalu implementasikan kodenya.</span>"}],
            "validationRules": [{"message":"Lengkapi komentar flowchart: Tidak -> [Output: \"Ganjil\"]","pattern":"Tidak\\s*->\\s*\\[Output:\\s*\"Ganjil\"\\]","shouldExist":true},{"message":"Gunakan kondisi: if (angka % 2 == 0)","pattern":"if\\s*\\(\\s*angka\\s*%\\s*2\\s*==\\s*0\\s*\\)","shouldExist":true},{"message":"Pada blok else, gunakan: printf(\"Bilangan %d adalah Ganjil\\n\", angka);","pattern":"else\\s*\\{\\s*printf\\s*\\(\\s*\"Bilangan %d adalah Ganjil\\\\n\"\\s*,\\s*angka\\s*\\)\\s*;\\s*\\}","shouldExist":true}]
          },
          {
            "id": "c-level-1-m9-l2",
            "title": "Struktur Sequence, Branching, dan Looping",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap algoritma, betapapun kompleksnya, dibangun dari kombinasi <strong>tiga struktur kontrol dasar</strong>: <strong>Sequence</strong> (urutan), <strong>Branching/Selection</strong> (percabangan), dan <strong>Looping/Repetition</strong> (perulangan). Memahami ketiganya adalah dasar fundamental sebelum menulis program apapun.</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Sequence</strong> adalah eksekusi instruksi <strong>satu per satu secara berurutan</strong> dari atas ke bawah, masing-masing dijalankan tepat satu kali. <strong>Branching</strong> memungkinkan program <strong>memilih jalur eksekusi berbeda</strong> berdasarkan suatu kondisi (true/false) — diwakili simbol diamond (belah ketupat) di flowchart. <strong>Looping</strong> memungkinkan satu blok instruksi <strong>dieksekusi berulang kali</strong> selama kondisi tertentu masih terpenuhi, sangat efisien untuk tugas repetitif.</li>\n</ul>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Struktur</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Simbol Flowchart</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Implementasi di C</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Sequence</td><td class=\"border border-zinc-200 px-3 py-1.5\">Persegi panjang (proses) berurutan</td><td class=\"border border-zinc-200 px-3 py-1.5\">Baris kode berurutan</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Branching</td><td class=\"border border-zinc-200 px-3 py-1.5\">Diamond/belah ketupat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Looping</td><td class=\"border border-zinc-200 px-3 py-1.5\">Diamond dengan panah kembali (loop back)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">[Gambar: Tiga diagram flowchart berdampingan menunjukkan Sequence (kotak berurutan), Branching (diamond bercabang dua), dan Looping (diamond dengan panah kembali ke atas)]</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    /* SEQUENCE: dijalankan berurutan */\n    int total = 0;\n    printf(&quot;Memulai perhitungan...\\n&quot;);\n\n    /* LOOPING: dijalankan berulang 3 kali */\n    for (int i = 1; i &lt;= 3; i++) {\n        total += i;\n\n        /* BRANCHING: cek kondisi setiap iterasi */\n        if (total &gt; 3) {\n            printf(&quot;Total sudah lebih dari 3: %d\\n&quot;, total);\n        } else {\n            printf(&quot;Total masih: %d\\n&quot;, total);\n        }\n    }\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Memulai perhitungan...\nTotal masih: 1\nTotal masih: 3\nTotal sudah lebih dari 3: 6</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    /* SEQUENCE: dijalankan berurutan */\n    int total = 0;\n    printf(\"Memulai perhitungan...\\n\");\n\n    /* LOOPING: dijalankan berulang 3 kali */\n    for (int i = 1; i <= 3; i++) {\n        total += i;\n\n        /* BRANCHING: cek kondisi setiap iterasi */\n        if (total > 3) {\n            printf(\"Total sudah lebih dari 3: %d\\n\", total);\n        } else {\n            printf(\"Total masih: %d\\n\", total);\n        }\n    }\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    for (int i = __; i __ 5; i__) {\n        if (i __ 2 __ 0) {\n            printf(\"__: Genap\\n\", i);\n        } else {\n            printf(\"__: Ganjil\\n\", i);\n        }\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0) {\n            printf(\"%d: Genap\\n\", i);\n        } else {\n            printf(\"%d: Ganjil\\n\", i);\n        }\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi struktur for loop: mulai dari i = 1, kondisi\n   berlanjut selama i <= 5, dan naikkan i sebesar 1 setiap\n   iterasi (sesuai notasi flowchart looping pada materi).\n\n2. Lengkapi kondisi if untuk memeriksa apakah i habis dibagi 2\n   (gunakan operator modulus, bandingkan dengan 0).\n\n3. Lengkapi printf() pada blok if untuk format \"i: Genap\".\n\n4. Lengkapi printf() pada blok else untuk format \"i: Ganjil\".",
            "quiz": {"question":"Struktur kontrol manakah yang digunakan untuk **mengulang** eksekusi sebuah blok kode beberapa kali?","options":["Sequence","Branching","Looping","Selection"],"correctAnswer":2},
            "testCases": [{"expectedOutput":"1: Ganjil\n2: Genap\n3: Ganjil\n4: Genap\n5: Ganjil\n","description":"<span>Tulis program yang menggabungkan ketiga struktur: gunakan <strong>sequence</strong> untuk inisialisasi, <strong>looping</strong> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> dari 1 hingga 5, dan di dalam loop gunakan <strong>branching</strong> untuk mencetak \"Genap\" atau \"Ganjil\" untuk setiap angka.</span>"}],
            "validationRules": [{"message":"Gunakan loop: for (int i = 1; i <= 5; i++)","pattern":"for\\s*\\(\\s*int\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*5\\s*;\\s*i\\+\\+\\s*\\)","shouldExist":true},{"message":"Gunakan kondisi: if (i % 2 == 0)","pattern":"if\\s*\\(\\s*i\\s*%\\s*2\\s*==\\s*0\\s*\\)","shouldExist":true},{"message":"Blok if harus: printf(\"%d: Genap\\n\", i);","pattern":"printf\\s*\\(\\s*\"%d:\\s*Genap\\\\n\"\\s*,\\s*i\\s*\\)","shouldExist":true},{"message":"Blok else harus: printf(\"%d: Ganjil\\n\", i);","pattern":"printf\\s*\\(\\s*\"%d:\\s*Ganjil\\\\n\"\\s*,\\s*i\\s*\\)","shouldExist":true}]
          },
          {
            "id": "c-level-1-m9-l3",
            "title": "Simbol dan Notasi Flowchart",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap simbol dalam flowchart memiliki <strong>bentuk geometris standar</strong> yang merepresentasikan jenis operasi tertentu. Konsistensi penggunaan simbol ini penting agar flowchart dapat dipahami oleh siapapun yang membacanya, tanpa ambiguitas.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Simbol</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Bentuk</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Terminator</td><td class=\"border border-zinc-200 px-3 py-1.5\">Oval / elips</td><td class=\"border border-zinc-200 px-3 py-1.5\">Menandai <strong>Start</strong> dan <strong>End</strong> program</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Proses</td><td class=\"border border-zinc-200 px-3 py-1.5\">Persegi panjang</td><td class=\"border border-zinc-200 px-3 py-1.5\">Operasi/instruksi, misal perhitungan</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Input/Output</td><td class=\"border border-zinc-200 px-3 py-1.5\">Jajaran genjang (parallelogram)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Operasi input atau output data</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Decision</td><td class=\"border border-zinc-200 px-3 py-1.5\">Diamond (belah ketupat)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Percabangan kondisi (Ya/Tidak)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Garis Alir</td><td class=\"border border-zinc-200 px-3 py-1.5\">Anak panah</td><td class=\"border border-zinc-200 px-3 py-1.5\">Menunjukkan arah eksekusi</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Konektor</td><td class=\"border border-zinc-200 px-3 py-1.5\">Lingkaran kecil</td><td class=\"border border-zinc-200 px-3 py-1.5\">Penghubung antar bagian flowchart yang terpisah</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Predefined Process</td><td class=\"border border-zinc-200 px-3 py-1.5\">Persegi panjang dengan garis vertikal di sisi</td><td class=\"border border-zinc-200 px-3 py-1.5\">Pemanggilan sub-program/fungsi</td></tr>\n      </tbody>\n    </table>\n  </div>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">[Gambar: Tabel visual simbol flowchart standar — oval, persegi panjang, jajaran genjang, diamond, anak panah, dan lingkaran konektor beserta label nama masing-masing]</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\n/*\n * Pemetaan simbol flowchart ke kode:\n * (Oval)        Start\n * (Jajargenjang) Input: panjang, lebar\n * (Persegi)     Proses: luas = panjang * lebar\n * (Jajargenjang) Output: luas\n * (Oval)        End\n */\nint main() {\n    int panjang = 8, lebar = 4;\n    int luas = panjang * lebar;\n    printf(&quot;Luas: %d\\n&quot;, luas);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Luas: 32</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\n/*\n * Pemetaan simbol flowchart ke kode:\n * (Oval)        Start\n * (Jajargenjang) Input: panjang, lebar\n * (Persegi)     Proses: luas = panjang * lebar\n * (Jajargenjang) Output: luas\n * (Oval)        End\n */\nint main() {\n    int panjang = 8, lebar = 4;\n    int luas = panjang * lebar;\n    printf(\"Luas: %d\\n\", luas);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\n/*\n * (Oval)         Start\n * (Jajargenjang) Input: total\n * (Diamond)      Decision: total >= 100000?\n *    Ya -> (Persegi) Proses: total_bayar = total * 0.9\n *          (Jajargenjang) Output: \"Anda mendapat diskon!\" dan total_bayar\n *    Tidak -> (Jajargenjang) Output: total_bayar = total\n * (Oval)         End\n */\nint main() {\n    int total;\n    printf(\"Masukkan total belanja: \");\n    scanf(\"%d\", &total);\n\n    if (total __ 100000) {\n        int total_bayar = total * __;\n        printf(\"__\\n\");\n        printf(\"Total bayar: %d\\n\", __);\n    } else {\n        printf(\"Total bayar: %d\\n\", __);\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\n/*\n * (Oval)         Start\n * (Jajargenjang) Input: total\n * (Diamond)      Decision: total >= 100000?\n *    Ya -> (Persegi) Proses: total_bayar = total * 0.9\n *          (Jajargenjang) Output: \"Anda mendapat diskon!\" dan total_bayar\n *    Tidak -> (Jajargenjang) Output: total_bayar = total\n * (Oval)         End\n */\nint main() {\n    int total;\n    printf(\"Masukkan total belanja: \");\n    scanf(\"%d\", &total);\n\n    if (total >= 100000) {\n        int total_bayar = total * 0.9;\n        printf(\"Anda mendapat diskon!\\n\");\n        printf(\"Total bayar: %d\\n\", total_bayar);\n    } else {\n        printf(\"Total bayar: %d\\n\", total);\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi if (Decision/diamond) untuk memeriksa apakah\n   total belanja lebih besar atau sama dengan 100000.\n\n2. Pada blok if, lengkapi rumus perhitungan total_bayar setelah\n   diskon 10% — kalikan total dengan 0.9.\n\n3. Pada blok if, lengkapi printf() pertama untuk menampilkan\n   pesan \"Anda mendapat diskon!\".\n\n4. Pada blok if, lengkapi printf() kedua untuk menampilkan\n   total_bayar.\n\n5. Pada blok else, lengkapi printf() untuk menampilkan total\n   (tanpa potongan diskon) sebagai total_bayar.",
            "quiz": {
              "question": "Simbol **jajaran genjang (parallelogram)** dalam flowchart digunakan untuk merepresentasikan...",
              "options": [
                "Titik mulai dan selesai program",
                "Operasi input atau output data",
                "Percabangan kondisi",
                "Proses perhitungan matematis"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan total belanja: Anda mendapat diskon!\nTotal bayar: 135000\n",
                "description": "<span>Tulis komentar flowchart yang memetakan setiap simbol (oval, jajargenjang, persegi panjang, diamond) ke baris kode yang sesuai untuk program penghitung diskon, lalu lengkapi kodenya.</span>",
                "input": "150000"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan decision: if (total >= 100000)",
                "pattern": "if\\s*\\(\\s*total\\s*>=\\s*100000\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Hitung diskon dengan: int total_bayar = total * 0.9;",
                "pattern": "int\\s+total_bayar\\s*=\\s*total\\s*\\*\\s*0\\.9\\s*;",
                "shouldExist": true
              },
              {
                "message": "Tampilkan pesan diskon: printf(\"Anda mendapat diskon!\\n\");",
                "pattern": "printf\\s*\\(\\s*\"Anda mendapat diskon!\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Pada blok if, tampilkan total_bayar: printf(\"Total bayar: %d\\n\", total_bayar);",
                "pattern": "if\\s*\\([\\s\\S]*?printf\\s*\\(\\s*\"Total bayar:\\s*%d\\\\n\"\\s*,\\s*total_bayar\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Pada blok else, tampilkan total (bukan total_bayar): printf(\"Total bayar: %d\\n\", total);",
                "pattern": "else\\s*\\{\\s*printf\\s*\\(\\s*\"Total bayar:\\s*%d\\\\n\"\\s*,\\s*total\\s*\\)\\s*;\\s*\\}",
                "shouldExist": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "level-2",
    "title": "STRUKTUR KONTROL DALAM BAHASA C",
    "description": "Materi Level 2",
    "accessMode": "auto",
    "locked": false,
    "modules": [
      {
        "id": "c-level-2-m1",
        "title": "Percabangan",
        "lessons": [
          {
            "id": "c-level-2-m1-l1",
            "title": "Percabangan `if`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statement <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> adalah struktur kontrol percabangan paling dasar. Ia mengevaluasi sebuah <strong>kondisi (ekspresi boolean)</strong> — jika kondisi tersebut bernilai <strong>benar (bukan 0)</strong>, blok kode di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> akan dieksekusi; jika kondisi bernilai <strong>salah (0)</strong>, blok tersebut <strong>diabaikan</strong> dan program melanjutkan ke statement setelahnya. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> tanpa pasangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> berarti tidak ada tindakan alternatif jika kondisi salah.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks dasar: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (kondisi) { /* blok kode jika benar */ }</code>. Tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> boleh dihilangkan jika hanya ada <strong>satu statement</strong> di dalam blok, tetapi praktik terbaik adalah selalu menggunakannya untuk menghindari kesalahan logika (bug terkenal \"dangling else\"). Kondisi di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bisa berupa hasil operator relasi, logika, atau bahkan ekspresi numerik biasa (selain 0 dianggap true).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 85;\n\n    if (nilai &gt;= 60) {\n        printf(&quot;Selamat, kamu Lulus!\\n&quot;);\n    }\n\n    printf(&quot;Pemeriksaan selesai.\\n&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat, kamu Lulus!\nPemeriksaan selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int nilai = 85;\n\n    if (nilai >= 60) {\n        printf(\"Selamat, kamu Lulus!\\n\");\n    }\n\n    printf(\"Pemeriksaan selesai.\\n\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int saldo;\n    printf(\"Masukkan saldo: \");\n    scanf(\"%d\", &saldo);\n    if (saldo __ 50000) {\n        printf(\"__\\n\");\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int saldo;\n    printf(\"Masukkan saldo: \");\n    scanf(\"%d\", &saldo);\n    if (saldo < 50000) {\n        printf(\"Saldo Anda rendah!\\n\");\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi if: periksa apakah variabel saldo bernilai\n   kurang dari 50000 (gunakan operator perbandingan \"lebih kecil\").\n\n2. Lengkapi isi blok if dengan printf() yang menampilkan teks\n   \"Saldo Anda rendah!\" persis seperti pada output yang diharapkan.",
            "quiz": {
              "question": "Apa yang terjadi jika kondisi di dalam if (kondisi) bernilai 0?",
              "options": [
                "Program akan berhenti total",
                "Blok kode di dalam if akan dieksekusi",
                "Blok kode di dalam if akan diabaikan",
                "Akan terjadi error kompilasi"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan saldo: Saldo Anda rendah!\n",
                "description": "<span>Buat program yang membaca nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int saldo</code>. Jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">saldo</code> kurang dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">50000</code>, tampilkan pesan peringatan \"Saldo Anda rendah!\".</span>",
                "input": "30000"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan kondisi: if (saldo < 50000)",
                "pattern": "if\\s*\\(\\s*saldo\\s*<\\s*50000\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Tampilkan pesan dengan: printf(\"Saldo Anda rendah!\\n\");",
                "pattern": "if\\s*\\(\\s*saldo\\s*<\\s*50000\\s*\\)\\s*\\{\\s*printf\\s*\\(\\s*\"Saldo Anda rendah!\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-2-m1-l2",
            "title": "Percabangan `if - else`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> menambahkan <strong>jalur alternatif</strong> yang dieksekusi ketika kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bernilai salah. Strukturnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (kondisi) { /* jika benar */ } else { /* jika salah */ }</code>. Tepat <strong>satu</strong> dari kedua blok ini akan dieksekusi — tidak mungkin keduanya, dan tidak mungkin tidak ada yang dieksekusi sama sekali (selalu ada hasil).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> ideal digunakan untuk kondisi <strong>biner</strong> (dua kemungkinan saling eksklusif), seperti: lulus/tidak lulus, genap/ganjil, ya/tidak. Untuk lebih dari dua kemungkinan, gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else if-else</code> (dibahas selanjutnya) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch-case</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">[Gambar: Flowchart if-else dengan diamond decision bercabang dua arah berlabel \"Ya\" dan \"Tidak\", masing-masing menuju proses yang berbeda sebelum bertemu kembali]</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 45;\n\n    if (nilai &gt;= 60) {\n        printf(&quot;Status: Lulus\\n&quot;);\n    } else {\n        printf(&quot;Status: Tidak Lulus\\n&quot;);\n    }\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Status: Tidak Lulus</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int nilai = 45;\n\n    if (nilai >= 60) {\n        printf(\"Status: Lulus\\n\");\n    } else {\n        printf(\"Status: Tidak Lulus\\n\");\n    }\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int angka;\n    printf(\"Masukkan angka: \");\n    scanf(\"%d\", &angka);\n    if (angka __ 0) {\n        printf(\"__\\n\");\n    } else {\n        printf(\"__\\n\");\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int angka;\n    printf(\"Masukkan angka: \");\n    scanf(\"%d\", &angka);\n    if (angka > 0) {\n        printf(\"Angka positif\\n\");\n    } else {\n        printf(\"Angka negatif atau nol\\n\");\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi if: periksa apakah angka lebih besar dari 0.\n\n2. Lengkapi isi blok if dengan printf() yang menampilkan\n   \"Angka positif\".\n\n3. Lengkapi isi blok else dengan printf() yang menampilkan\n   \"Angka negatif atau nol\" — perhatikan penulisan harus\n   PERSIS sama dengan output yang diharapkan.",
            "quiz": {
              "question": "Dalam struktur if-else, berapa blok kode yang **pasti** dieksekusi (tidak lebih, tidak kurang)?",
              "options": [
                "Tidak ada",
                "Tepat satu",
                "Selalu kedua blok",
                "Tergantung jumlah variabel"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan angka: Angka negatif atau nol\n",
                "description": "<span>Buat program yang membaca <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int angka</code> lalu menampilkan apakah angka tersebut <strong>positif</strong> atau <strong>negatif/nol</strong> menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code>.</span>",
                "input": "-5"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan kondisi: if (angka > 0)",
                "pattern": "if\\s*\\(\\s*angka\\s*>\\s*0\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Pada blok if, tampilkan: printf(\"Angka positif\\n\");",
                "pattern": "if\\s*\\(\\s*angka\\s*>\\s*0\\s*\\)\\s*\\{\\s*printf\\s*\\(\\s*\"Angka positif\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Pada blok else, tampilkan: printf(\"Angka negatif atau nol\\n\");",
                "pattern": "else\\s*\\{\\s*printf\\s*\\(\\s*\"Angka negatif atau nol\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-2-m1-l3",
            "title": "Percabangan `if - else if`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else if-else</code> digunakan ketika ada <strong>lebih dari dua kemungkinan kondisi</strong> yang harus dievaluasi secara berurutan. Setiap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> dievaluasi hanya jika <strong>semua kondisi sebelumnya bernilai salah</strong>. Begitu salah satu kondisi bernilai benar, blok yang sesuai dieksekusi dan <strong>sisa kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> lainnya diabaikan</strong> — tidak ada lagi yang dicek setelah kondisi pertama yang terpenuhi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> di akhir (opsional) berfungsi sebagai <strong>jalur default/fallback</strong> jika semua kondisi di atasnya salah. Urutan kondisi sangat penting — terutama saat memeriksa <strong>rentang nilai</strong>, kondisi harus disusun dari yang paling spesifik/ekstrem ke yang paling umum agar logika berjalan benar.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nilai</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Kondisi yang Terpenuhi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Grade</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">90</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai &gt;= 90</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">A</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">75</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai &gt;= 70</code> (karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;=90</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;=80</code> salah)</td><td class=\"border border-zinc-200 px-3 py-1.5\">B</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">65</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai &gt;= 60</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">C</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">40</td><td class=\"border border-zinc-200 px-3 py-1.5\">(tidak ada kondisi terpenuhi → else)</td><td class=\"border border-zinc-200 px-3 py-1.5\">D</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 75;\n\n    if (nilai &gt;= 90) {\n        printf(&quot;Grade: A\\n&quot;);\n    } else if (nilai &gt;= 80) {\n        printf(&quot;Grade: B\\n&quot;);\n    } else if (nilai &gt;= 70) {\n        printf(&quot;Grade: C\\n&quot;);\n    } else {\n        printf(&quot;Grade: D\\n&quot;);\n    }\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Grade: C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int nilai = 75;\n\n    if (nilai >= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (nilai >= 80) {\n        printf(\"Grade: B\\n\");\n    } else if (nilai >= 70) {\n        printf(\"Grade: C\\n\");\n    } else {\n        printf(\"Grade: D\\n\");\n    }\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int bmi;\n    printf(\"Masukkan nilai BMI: \");\n    scanf(\"%d\", &bmi);\n    if (bmi __ 18) {\n        printf(\"Kategori: __\\n\");\n    } else if (bmi __ 25) {\n        printf(\"Kategori: __\\n\");\n    } else {\n        printf(\"Kategori: __\\n\");\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int bmi;\n    printf(\"Masukkan nilai BMI: \");\n    scanf(\"%d\", &bmi);\n    if (bmi < 18) {\n        printf(\"Kategori: Kurus\\n\");\n    } else if (bmi <= 25) {\n        printf(\"Kategori: Normal\\n\");\n    } else {\n        printf(\"Kategori: Gemuk\\n\");\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi if pertama: periksa apakah bmi kurang dari 18.\n   Lengkapi isi bloknya dengan printf() kategori \"Kurus\".\n\n2. Lengkapi kondisi else if: periksa apakah bmi kurang dari atau\n   sama dengan 25 (kondisi ini hanya dicek jika kondisi pertama\n   salah, sehingga otomatis berarti bmi >= 18).\n   Lengkapi isi bloknya dengan printf() kategori \"Normal\".\n\n3. Lengkapi blok else (tanpa kondisi tambahan, ini untuk kasus\n   bmi > 25) dengan printf() kategori \"Gemuk\".\n\nCatatan: ketiga printf() menggunakan format yang sama:\n\"Kategori: <nama_kategori>\\n\"",
            "quiz": {
              "question": "Pada struktur if-else if-else, apa yang terjadi setelah salah satu kondisi else if terpenuhi (bernilai benar)?",
              "options": [
                "Semua else if setelahnya tetap dievaluasi",
                "Program berhenti total",
                "Blok yang sesuai dieksekusi, dan sisa else if/else diabaikan",
                "Hanya blok else yang akan dieksekusi"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan nilai BMI: Kategori: Normal\n",
                "description": "<span>Buat program kategori BMI sederhana berdasarkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int bmi</code> (bilangan bulat): <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt; 18</code> → \"Kurus\", <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">18</code> sampai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">25</code> → \"Normal\", <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt; 25</code> → \"Gemuk\".</span>",
                "input": "22"
              }
            ],
            "validationRules": [
              {
                "message": "Kondisi pertama dan outputnya harus: if (bmi < 18) { printf(\"Kategori: Kurus\\n\");",
                "pattern": "if\\s*\\(\\s*bmi\\s*<\\s*18\\s*\\)\\s*\\{\\s*printf\\s*\\(\\s*\"Kategori:\\s*Kurus\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Kondisi kedua dan outputnya harus: else if (bmi <= 25) { printf(\"Kategori: Normal\\n\");",
                "pattern": "else\\s+if\\s*\\(\\s*bmi\\s*<=\\s*25\\s*\\)\\s*\\{\\s*printf\\s*\\(\\s*\"Kategori:\\s*Normal\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Blok else (tanpa kondisi) dan outputnya harus: else { printf(\"Kategori: Gemuk\\n\");",
                "pattern": "else\\s*\\{\\s*printf\\s*\\(\\s*\"Kategori:\\s*Gemuk\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-2-m1-l4",
            "title": "Percabangan `switch case`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch-case</code> adalah struktur percabangan yang membandingkan <strong>satu variabel/ekspresi</strong> dengan beberapa <strong>nilai konstan</strong> secara eksplisit. Ini adalah alternatif yang lebih rapi dibanding banyak <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> ketika perbandingan dilakukan terhadap nilai diskrit (seperti pilihan menu 1, 2, 3, atau karakter 'A', 'B', 'C').</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur dasarnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch (variabel) { case nilai1: /* kode */ break; case nilai2: /* kode */ break; default: /* kode */ }</code>. Kata kunci <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code></strong> sangat penting — tanpanya, eksekusi akan <strong>\"jatuh tembus\" (fall-through)</strong> ke <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">case</code> berikutnya meskipun nilainya tidak cocok, hingga menemukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> atau akhir <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch</code>. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">default</code> berfungsi seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> — dieksekusi jika tidak ada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">case</code> yang cocok. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch</code> hanya bisa membandingkan tipe integer atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code>, <strong>tidak bisa</strong> untuk <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code>, atau string.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int hari = 3;\n\n    switch (hari) {\n        case 1:\n            printf(&quot;Senin\\n&quot;);\n            break;\n        case 2:\n            printf(&quot;Selasa\\n&quot;);\n            break;\n        case 3:\n            printf(&quot;Rabu\\n&quot;);\n            break;\n        default:\n            printf(&quot;Hari tidak valid\\n&quot;);\n    }\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Rabu</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int hari = 3;\n\n    switch (hari) {\n        case 1:\n            printf(\"Senin\\n\");\n            break;\n        case 2:\n            printf(\"Selasa\\n\");\n            break;\n        case 3:\n            printf(\"Rabu\\n\");\n            break;\n        default:\n            printf(\"Hari tidak valid\\n\");\n    }\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    char pilihan;\n    printf(\"Masukkan operator (+,-,*,/): \");\n    scanf(\"%c\", &pilihan);\n    switch (__) {\n        case '__':\n            printf(\"Operasi: __\\n\");\n            __;\n        case '__':\n            printf(\"Operasi: __\\n\");\n            __;\n        case '__':\n            printf(\"Operasi: __\\n\");\n            __;\n        case '__':\n            printf(\"Operasi: __\\n\");\n            __;\n        default:\n            printf(\"__\\n\");\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    char pilihan;\n    printf(\"Masukkan operator (+,-,*,/): \");\n    scanf(\"%c\", &pilihan);\n    switch (pilihan) {\n        case '+':\n            printf(\"Operasi: Penjumlahan\\n\");\n            break;\n        case '-':\n            printf(\"Operasi: Pengurangan\\n\");\n            break;\n        case '*':\n            printf(\"Operasi: Perkalian\\n\");\n            break;\n        case '/':\n            printf(\"Operasi: Pembagian\\n\");\n            break;\n        default:\n            printf(\"Operator tidak valid\\n\");\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi pernyataan switch dengan variabel yang akan diperiksa.\n\n2. Lengkapi keempat label case dengan karakter operator yang sesuai:\n   '+', '-', '*', '/' (perhatikan tanda petik tunggal).\n\n3. Lengkapi isi setiap case dengan printf() nama operasi yang sesuai:\n   - '+' -> \"Operasi: Penjumlahan\"\n   - '-' -> \"Operasi: Pengurangan\"\n   - '*' -> \"Operasi: Perkalian\"\n   - '/' -> \"Operasi: Pembagian\"\n\n4. Lengkapi kata kunci yang harus ditulis SETELAH setiap printf()\n   pada keempat case agar tidak terjadi fall-through ke case\n   berikutnya.\n\n5. Lengkapi label default dengan printf() \"Operator tidak valid\".",
            "quiz": {
              "question": "Apa yang terjadi jika kata kunci break tidak ditulis di akhir sebuah case pada switch?",
              "options": [
                "Program akan berhenti secara paksa",
                "Eksekusi akan \"jatuh tembus\" (fall-through) ke case berikutnya",
                "Compiler akan menolak mengompilasi program",
                "case tersebut akan diulang tanpa batas"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan operator (+,-,*,/): Operasi: Perkalian\n",
                "description": "<span>Buat program <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch-case</code> yang membaca <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char pilihan</code> (operator: '+', '-', '*', '/') dan menampilkan nama operasi berdasarkan pilihan tersebut.</span>",
                "input": "*"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: switch (pilihan) {",
                "pattern": "switch\\s*\\(\\s*pilihan\\s*\\)\\s*\\{",
                "shouldExist": true
              },
              {
                "message": "case '+' harus: printf(\"Operasi: Penjumlahan\\n\"); break;",
                "pattern": "case\\s*'\\+'\\s*:\\s*\\n\\s*printf\\s*\\(\\s*\"Operasi: Penjumlahan\\\\n\"\\s*\\)\\s*;\\s*\\n\\s*break\\s*;",
                "shouldExist": true
              },
              {
                "message": "case '-' harus: printf(\"Operasi: Pengurangan\\n\"); break;",
                "pattern": "case\\s*'-'\\s*:\\s*\\n\\s*printf\\s*\\(\\s*\"Operasi: Pengurangan\\\\n\"\\s*\\)\\s*;\\s*\\n\\s*break\\s*;",
                "shouldExist": true
              },
              {
                "message": "case '*' harus: printf(\"Operasi: Perkalian\\n\"); break;",
                "pattern": "case\\s*'\\*'\\s*:\\s*\\n\\s*printf\\s*\\(\\s*\"Operasi: Perkalian\\\\n\"\\s*\\)\\s*;\\s*\\n\\s*break\\s*;",
                "shouldExist": true
              },
              {
                "message": "case '/' harus: printf(\"Operasi: Pembagian\\n\"); break;",
                "pattern": "case\\s*'/'\\s*:\\s*\\n\\s*printf\\s*\\(\\s*\"Operasi: Pembagian\\\\n\"\\s*\\)\\s*;\\s*\\n\\s*break\\s*;",
                "shouldExist": true
              },
              {
                "message": "default harus: printf(\"Operator tidak valid\\n\");",
                "pattern": "default\\s*:\\s*\\n\\s*printf\\s*\\(\\s*\"Operator tidak valid\\\\n\"\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-2-m2",
        "title": "Perulangan",
        "lessons": [
          {
            "id": "c-level-2-m2-l1",
            "title": "Perulangan `while`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> mengeksekusi sebuah blok kode <strong>berulang kali selama kondisi bernilai benar</strong>. Kondisi dievaluasi <strong>sebelum</strong> setiap iterasi (termasuk yang pertama) — jika kondisi langsung salah saat pertama dicek, blok kode <strong>tidak akan dieksekusi sama sekali</strong>. Karena itu, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> disebut <strong>pre-test loop</strong> (loop dengan pengecekan di awal).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while (kondisi) { /* blok kode */ }</code>. Sangat penting untuk memastikan ada <strong>statement di dalam blok yang akan mengubah kondisi</strong> (misalnya increment), agar loop tidak berjalan tak terbatas (infinite loop) kecuali memang disengaja (misalnya dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> di dalamnya).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int i = 1;\n\n    while (i &lt;= 5) {\n        printf(&quot;Iterasi ke-%d\\n&quot;, i);\n        i++;  /* Wajib! Tanpa ini, loop tak terbatas */\n    }\n    printf(&quot;Selesai.\\n&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Iterasi ke-1\nIterasi ke-2\nIterasi ke-3\nIterasi ke-4\nIterasi ke-5\nSelesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\n    while (i <= 5) {\n        printf(\"Iterasi ke-%d\\n\", i);\n        i++;  /* Wajib! Tanpa ini, loop tak terbatas */\n    }\n    printf(\"Selesai.\\n\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int hitung = 5;\n    while (hitung __ 1) {\n        printf(\"__\\n\", hitung);\n        __;\n    }\n    printf(\"Mulai!\\n\");\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int hitung = 5;\n    while (hitung >= 1) {\n        printf(\"%d\\n\", hitung);\n        hitung--;\n    }\n    printf(\"Mulai!\\n\");\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi while: loop berlanjut selama hitung lebih\n   besar atau sama dengan 1.\n\n2. Lengkapi printf() di dalam loop untuk menampilkan nilai\n   variabel hitung (format integer).\n\n3. Lengkapi statement untuk mengurangi nilai hitung sebesar 1\n   setiap iterasi (gunakan operator decrement), agar loop\n   tidak berjalan tak terbatas.",
            "quiz": {
              "question": "Jika kondisi pada while (kondisi) bernilai **salah sejak awal** (sebelum iterasi pertama), berapa kali blok kode di dalamnya dieksekusi?",
              "options": [
                "Tepat satu kali",
                "Tidak sama sekali (0 kali)",
                "Tak terbatas",
                "Dua kali"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "5\n4\n3\n2\n1\nMulai!\n",
                "description": "<span>Buat program yang menampilkan hitung mundur dari 5 ke 1 menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, diakhiri dengan teks \"Mulai!\".</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: while (hitung >= 1)",
                "pattern": "while\\s*\\(\\s*hitung\\s*>=\\s*1\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Tampilkan hitung dengan: printf(\"%d\\n\", hitung);",
                "pattern": "while\\s*\\([\\s\\S]*?printf\\s*\\(\\s*\"%d\\\\n\"\\s*,\\s*hitung\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Setelah printf(), kurangi hitung dengan: hitung--;",
                "pattern": "printf\\s*\\(\\s*\"%d\\\\n\"\\s*,\\s*hitung\\s*\\)\\s*;\\s*\\n\\s*hitung--\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-2-m2-l2",
            "title": "Perulangan `do while`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> adalah varian perulangan yang mengeksekusi blok kode <strong>terlebih dahulu, lalu mengevaluasi kondisi</strong> di akhir. Karena pengecekan dilakukan <strong>setelah</strong> iterasi, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> disebut <strong>post-test loop</strong> dan <strong>menjamin blok kode dieksekusi minimal satu kali</strong>, terlepas dari apakah kondisinya benar atau salah sejak awal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do { /* blok kode */ } while (kondisi);</code> — perhatikan <strong>titik koma wajib</strong> setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while(kondisi)</code>, berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> biasa. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> sangat cocok untuk skenario seperti <strong>validasi input</strong> (minta input minimal sekali, ulangi jika tidak valid) atau <strong>menu interaktif</strong> (tampilkan menu minimal sekali sebelum memutuskan apakah harus berhenti).</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Aspek</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code></th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code></th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Pengecekan kondisi</td><td class=\"border border-zinc-200 px-3 py-1.5\">Sebelum iterasi</td><td class=\"border border-zinc-200 px-3 py-1.5\">Setelah iterasi</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Minimal eksekusi</td><td class=\"border border-zinc-200 px-3 py-1.5\">0 kali</td><td class=\"border border-zinc-200 px-3 py-1.5\">1 kali</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Titik koma penutup</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak ada</td><td class=\"border border-zinc-200 px-3 py-1.5\">Wajib <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">};</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int angka;\n\n    do {\n        printf(&quot;Masukkan angka positif: &quot;);\n        scanf(&quot;%d&quot;, &amp;angka);\n        if (angka &lt;= 0) {\n            printf(&quot;Angka harus positif! Coba lagi.\\n&quot;);\n        }\n    } while (angka &lt;= 0);\n\n    printf(&quot;Angka diterima: %d\\n&quot;, angka);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan angka positif: -3\nAngka harus positif! Coba lagi.\nMasukkan angka positif: 7\nAngka diterima: 7</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int angka;\n\n    do {\n        printf(\"Masukkan angka positif: \");\n        scanf(\"%d\", &angka);\n        if (angka <= 0) {\n            printf(\"Angka harus positif! Coba lagi.\\n\");\n        }\n    } while (angka <= 0);\n\n    printf(\"Angka diterima: %d\\n\", angka);\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int i = 1;\n    do {\n        printf(\"__\\n\", i);\n        __;\n    } while (i __ 3)__\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int i = 1;\n    do {\n        printf(\"%d\\n\", i);\n        i++;\n    } while (i <= 3);\n    return 0;\n}",
            "hint": "1. Lengkapi printf() di dalam blok do untuk menampilkan nilai\n   variabel i (format integer).\n\n2. Lengkapi statement untuk menambah nilai i sebesar 1 setiap\n   iterasi (gunakan operator increment).\n\n3. Lengkapi kondisi while di akhir blok do: loop berlanjut\n   selama i kurang dari atau sama dengan 3. JANGAN LUPA titik\n   koma setelah while(...) — ini berbeda dengan while biasa.",
            "quiz": {
              "question": "Mengapa do-while cocok digunakan untuk validasi input yang harus dilakukan minimal sekali?",
              "options": [
                "Karena do-while lebih cepat dari while",
                "Karena do-while mengevaluasi kondisi setelah iterasi, sehingga blok pasti dieksekusi minimal sekali",
                "Karena do-while tidak membutuhkan variabel kondisi",
                "Karena do-while otomatis menangani error input"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "1\n2\n3\n",
                "description": "<span>Buat program <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> yang menampilkan angka 1 sampai 3 menggunakan variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">i</code> mulai dari 1.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Di dalam do, tampilkan i dengan: printf(\"%d\\n\", i);",
                "pattern": "do\\s*\\{\\s*printf\\s*\\(\\s*\"%d\\\\n\"\\s*,\\s*i\\s*\\)\\s*;",
                "shouldExist": true
              },
              {
                "message": "Setelah printf(), naikkan i dengan: i++;",
                "pattern": "printf\\s*\\(\\s*\"%d\\\\n\"\\s*,\\s*i\\s*\\)\\s*;\\s*\\n\\s*i\\+\\+\\s*;",
                "shouldExist": true
              },
              {
                "message": "Tutup do-while dengan: } while (i <= 3); — jangan lupa titik koma",
                "pattern": "\\}\\s*while\\s*\\(\\s*i\\s*<=\\s*3\\s*\\)\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-2-m2-l3",
            "title": "Perulangan `for`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> adalah perulangan yang paling sering digunakan ketika <strong>jumlah iterasi sudah diketahui sebelumnya</strong>. Strukturnya memadatkan tiga komponen loop dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for (inisialisasi; kondisi; update) { /* blok kode */ }</code>. <strong>Inisialisasi</strong> dijalankan sekali di awal (biasanya mendeklarasikan variabel counter), <strong>kondisi</strong> dievaluasi sebelum setiap iterasi (mirip <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>), dan <strong>update</strong> dijalankan setelah setiap iterasi (biasanya increment/decrement).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> adalah <strong>pre-test loop</strong> seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, tapi lebih ringkas karena ketiga komponen kunci loop berada di satu tempat, sehingga lebih mudah dibaca dan kurang rentan lupa update counter. Ketiga bagian dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for(;;)</code> bersifat opsional — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for(;;)</code> tanpa isi apapun akan menjadi loop tak terbatas.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int total = 0;\n\n    for (int i = 1; i &lt;= 10; i++) {\n        total += i;\n    }\n    printf(&quot;Total 1 sampai 10 = %d\\n&quot;, total);\n\n    /* Loop mundur dengan step 2 */\n    for (int j = 10; j &gt;= 0; j -= 2) {\n        printf(&quot;%d &quot;, j);\n    }\n    printf(&quot;\\n&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Total 1 sampai 10 = 55\n10 8 6 4 2 0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int total = 0;\n\n    for (int i = 1; i <= 10; i++) {\n        total += i;\n    }\n    printf(\"Total 1 sampai 10 = %d\\n\", total);\n\n    /* Loop mundur dengan step 2 */\n    for (int j = 10; j >= 0; j -= 2) {\n        printf(\"%d \", j);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    int hasil = 1;\n    for (int i = __; i __ 5; i__) {\n        hasil __ i;\n    }\n    printf(\"5! = %d\\n\", hasil);\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    int hasil = 1;\n    for (int i = 1; i <= 5; i++) {\n        hasil *= i;\n    }\n    printf(\"5! = %d\\n\", hasil);\n    return 0;\n}",
            "hint": "1. Lengkapi struktur for loop: mulai dari i = 1, kondisi\n   berlanjut selama i kurang dari atau sama dengan 5, dan\n   naikkan i sebesar 1 setiap iterasi.\n\n2. Lengkapi statement di dalam loop untuk mengalikan variabel\n   hasil dengan i (gunakan operator assignment gabungan *=).",
            "quiz": {
              "question": "Pada for (int i = 0; i < 5; i++), urutan eksekusi komponen yang benar adalah...",
              "options": [
                "update → kondisi → inisialisasi",
                "inisialisasi (sekali) → cek kondisi → eksekusi blok → update → cek kondisi (ulang)",
                "kondisi → inisialisasi → update, diulang terus",
                "Semua komponen dijalankan bersamaan setiap iterasi"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "5! = 120\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> untuk menghitung dan menampilkan <strong>faktorial</strong> dari angka 5 (5! = 5×4×3×2×1).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: for (int i = 1; i <= 5; i++)",
                "pattern": "for\\s*\\(\\s*int\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*5\\s*;\\s*i\\+\\+\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Kalikan hasil dengan: hasil *= i;",
                "pattern": "hasil\\s*\\*=\\s*i\\s*;",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "c-level-2-m3",
        "title": "Peloncatan",
        "lessons": [
          {
            "id": "c-level-2-m3-l1",
            "title": "Label dan Statemen `goto`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> adalah statement yang memindahkan <strong>alur eksekusi program secara langsung</strong> ke sebuah <strong>label</strong> tertentu di dalam fungsi yang sama, mengabaikan urutan normal. Label ditulis sebagai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama_label:</code> dan statement <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto nama_label;</code> akan melompat ke titik tersebut, baik maju maupun mundur dalam kode.</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> sangat tidak disarankan<strong> dalam pemrograman modern karena membuat alur program sulit dilacak (\"spaghetti code\"), sulit di-debug, dan rentan menyebabkan kebocoran resource (misalnya melompati </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fclose()</code>). Hampir semua kasus penggunaan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> dapat digantikan dengan struktur yang lebih baik seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code>, fungsi, atau flag boolean. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> umumnya hanya dibahas untuk pemahaman historis dan kasus penanganan error yang sangat spesifik di C tingkat sistem.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int i = 1;\n\nulang:  /* Label */\n    printf(&quot;Angka: %d\\n&quot;, i);\n    i++;\n    if (i &lt;= 3) {\n        goto ulang; /* Melompat kembali ke label ulang */\n    }\n\n    printf(&quot;Selesai.\\n&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3\nSelesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\nulang:  /* Label */\n    printf(\"Angka: %d\\n\", i);\n    i++;\n    if (i <= 3) {\n        goto ulang; /* Melompat kembali ke label ulang */\n    }\n\n    printf(\"Selesai.\\n\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    for (int i = __; i __ 3; i__) {\n        printf(\"__: %d\\n\", i);\n    }\n    printf(\"Selesai.\\n\");\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf(\"Angka: %d\\n\", i);\n    }\n    printf(\"Selesai.\\n\");\n    return 0;\n}",
            "hint": "1. Lengkapi struktur for loop sebagai pengganti label dan goto:\n   mulai dari i = 1, kondisi berlanjut selama i kurang dari\n   atau sama dengan 3, naikkan i sebesar 1 setiap iterasi.\n\n2. Lengkapi printf() di dalam loop untuk menampilkan \"Angka: <i>\"\n   sesuai format pada output yang diharapkan.\n\n3. Baris printf(\"Selesai.\\n\") di luar loop sudah benar —\n   jangan diubah, dan jangan gunakan goto di solusi ini.",
            "quiz": {"question":"Mengapa penggunaan goto dianggap praktik buruk dalam pemrograman modern?","options":["Karena goto tidak bisa dikompilasi oleh compiler modern","Karena goto membuat alur program sulit dilacak dan biasanya bisa digantikan struktur lain yang lebih baik","Karena goto hanya bisa digunakan dengan tipe data int","Karena goto membutuhkan header tambahan"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Angka: 1\nAngka: 2\nAngka: 3\nSelesai.\n","description":"<span>Amati program <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> berikut yang mencetak angka 1-3, lalu <strong>refactor</strong> menjadi versi menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> loop yang menghasilkan output identik tanpa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code>.</span>"}],
            "validationRules": [{"message":"Gunakan for loop: for (int i = 1; i <= 3; i++)","pattern":"for\\s*\\(\\s*int\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*3\\s*;\\s*i\\+\\+\\s*\\)","shouldExist":true},{"message":"Tampilkan dengan: printf(\"Angka: %d\\n\", i);","pattern":"printf\\s*\\(\\s*\"Angka:\\s*%d\\\\n\"\\s*,\\s*i\\s*\\)","shouldExist":true},{"message":"Jangan gunakan goto pada solusi refactor ini","pattern":"goto","shouldExist":true}]
          },
          {
            "id": "c-level-2-m3-l2",
            "title": "Prosedur `break`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> adalah statement yang <strong>menghentikan secara langsung</strong> perulangan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code>) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch</code> yang sedang berjalan, lalu melanjutkan eksekusi ke statement <strong>setelah</strong> loop/switch tersebut — terlepas dari apakah kondisi loop masih terpenuhi atau belum.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Penggunaan paling umum <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> adalah untuk <strong>keluar dari loop lebih awal</strong> ketika suatu kondisi tertentu tercapai, misalnya menemukan elemen yang dicari dalam pencarian (search), atau menghentikan loop tak terbatas (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while(1)</code>) berdasarkan kondisi internal. Pada <strong>nested loop</strong> (loop bersarang), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> hanya menghentikan loop <strong>terdalam</strong> tempat ia berada, tidak mempengaruhi loop luar.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 10; i++) {\n        if (i == 5) {\n            printf(&quot;Ditemukan! Berhenti di %d\\n&quot;, i);\n            break;  /* Keluar dari loop saat i == 5 */\n        }\n        printf(&quot;Memeriksa %d\\n&quot;, i);\n    }\n    printf(&quot;Loop selesai.\\n&quot;);\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Memeriksa 1\nMemeriksa 2\nMemeriksa 3\nMemeriksa 4\nDitemukan! Berhenti di 5\nLoop selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            printf(\"Ditemukan! Berhenti di %d\\n\", i);\n            break;  /* Keluar dari loop saat i == 5 */\n        }\n        printf(\"Memeriksa %d\\n\", i);\n    }\n    printf(\"Loop selesai.\\n\");\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 100; i++) {\n        printf(\"%d\\n\", i);\n        if (i __ 7 __ 0) {\n            printf(\"__\\n\", i);\n            __;\n        }\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 100; i++) {\n        printf(\"%d\\n\", i);\n        if (i % 7 == 0) {\n            printf(\"Berhenti di angka %d (habis dibagi 7)\\n\", i);\n            break;\n        }\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi if: periksa apakah i habis dibagi 7\n   (gunakan operator modulus, bandingkan dengan 0).\n\n2. Lengkapi printf() di dalam blok if untuk menampilkan pesan\n   \"Berhenti di angka <i> (habis dibagi 7)\".\n\n3. Lengkapi statement setelah printf() pada langkah 2 untuk\n   menghentikan loop sepenuhnya.",
            "quiz": {
              "question": "Pada **nested loop** (loop di dalam loop), statement break di loop bagian dalam akan menghentikan...",
              "options": [
                "Hanya loop bagian dalam (terdekat) tempat break berada",
                "Seluruh loop, termasuk loop luar",
                "Seluruh program",
                "Hanya iterasi saat ini, lalu lanjut iterasi berikutnya"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "1\n2\n3\n4\n5\n6\n7\nBerhenti di angka 7 (habis dibagi 7)\n",
                "description": "<span>Buat program <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> loop dari 1 hingga 100 yang mencetak setiap angka, tetapi <strong>berhenti</strong> (gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>) tepat ketika menemukan angka yang habis dibagi 7 untuk pertama kalinya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan kondisi: if (i % 7 == 0)",
                "pattern": "if\\s*\\(\\s*i\\s*%\\s*7\\s*==\\s*0\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Tampilkan pesan dengan: printf(\"Berhenti di angka %d (habis dibagi 7)\\n\", i);",
                "pattern": "printf\\s*\\(\\s*\"Berhenti di angka %d \\(habis dibagi 7\\)\\\\n\"\\s*,\\s*i\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Setelah printf() tersebut, hentikan loop dengan: break;",
                "pattern": "printf\\s*\\(\\s*\"Berhenti di angka %d \\(habis dibagi 7\\)\\\\n\"\\s*,\\s*i\\s*\\)\\s*;\\s*\\n\\s*break\\s*;",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "c-level-2-m3-l3",
            "title": "Prosedur `continue`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> adalah statement yang <strong>melompat langsung ke akhir iterasi saat ini</strong> dan melanjutkan ke <strong>iterasi berikutnya</strong> dari loop, melewati (skip) sisa kode di dalam blok loop untuk iterasi tersebut. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> yang menghentikan loop secara total, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> <strong>tidak menghentikan loop</strong> — loop tetap berjalan, hanya saja iterasi tertentu dilewati sebagian.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code>, bagian <strong>update</strong> (misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">i++</code>) tetap dijalankan sebelum mengevaluasi kondisi lagi. Pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code>, perlu hati-hati: jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> dipanggil sebelum statement yang mengubah variabel kondisi, bisa menyebabkan <strong>infinite loop</strong> karena variabel kondisi tidak pernah berubah.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 10; i++) {\n        if (i % 2 == 0) {\n            continue; /* Lewati angka genap */\n        }\n        printf(&quot;Angka ganjil: %d\\n&quot;, i);\n    }\n    return 0;\n}</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka ganjil: 1\nAngka ganjil: 3\nAngka ganjil: 5\nAngka ganjil: 7\nAngka ganjil: 9</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            continue; /* Lewati angka genap */\n        }\n        printf(\"Angka ganjil: %d\\n\", i);\n    }\n    return 0;\n}",
            "initialCode": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i __ 3 __ 0) {\n            __;\n        }\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            "solution": "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 0) {\n            continue;\n        }\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            "hint": "1. Lengkapi kondisi if: periksa apakah i habis dibagi 3\n   (gunakan operator modulus, bandingkan dengan 0).\n\n2. Lengkapi statement di dalam blok if untuk melewati iterasi\n   saat ini (lanjut ke iterasi berikutnya tanpa menjalankan\n   printf() di bawahnya).",
            "quiz": {
              "question": "Apa perbedaan utama antara break dan continue di dalam sebuah loop?",
              "options": [
                "break menghentikan loop sepenuhnya, sedangkan continue hanya melewati iterasi saat ini dan lanjut ke iterasi berikutnya",
                "continue menghentikan loop sepenuhnya, sedangkan break melewati satu iterasi",
                "Keduanya memiliki fungsi yang identik",
                "break hanya bisa digunakan di for, continue hanya di while"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "1\n2\n4\n5\n7\n8\n10\n",
                "description": "<span>Buat program <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> loop dari 1 hingga 10 yang menampilkan semua angka <strong>kecuali</strong> kelipatan 3 (gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> untuk melewati kelipatan 3).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan kondisi: if (i % 3 == 0)",
                "pattern": "if\\s*\\(\\s*i\\s*%\\s*3\\s*==\\s*0\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Di dalam blok if, lewati iterasi dengan: continue;",
                "pattern": "if\\s*\\(\\s*i\\s*%\\s*3\\s*==\\s*0\\s*\\)\\s*\\{\\s*continue\\s*;",
                "shouldExist": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "level-3",
    "title": "PENGENALAN DASAR BAHASA PYTHON",
    "description": "Materi Level 3",
    "accessMode": "unlocked",
    "locked": false,
    "modules": [
      {
        "id": "level-3-m1",
        "title": "Pendahuluan Python",
        "lessons": [
          {
            "id": "level-3-m1-l1",
            "title": "Pengenalan Bahasa Python",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python adalah bahasa pemrograman <strong>tingkat tinggi (high-level)</strong> yang dikenal karena sintaksnya yang <strong>sederhana dan mudah dibaca</strong>, hampir seperti bahasa Inggris biasa. Python bersifat <strong>interpreted</strong> — kode dijalankan baris per baris oleh interpreter, <strong>bukan dikompilasi</strong> terlebih dahulu menjadi file <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.exe</code> seperti C. Hal ini membuat Python mudah untuk eksperimen cepat (rapid prototyping), tetapi umumnya lebih lambat dalam eksekusi dibandingkan bahasa terkompilasi seperti C.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python digunakan secara luas untuk berbagai bidang: pengembangan web, data science, machine learning, otomatisasi, dan scripting. Salah satu ciri khas Python adalah <strong>tidak membutuhkan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code></strong> untuk blok kode — sebagai gantinya, Python menggunakan <strong>indentasi (spasi/tab)</strong> untuk menentukan struktur blok. File Python berekstensi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.py</code> dan dijalankan menggunakan perintah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">python nama_file.py</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Program Python pertama\nprint(&quot;Halo, Dunia!&quot;)\nprint(&quot;Selamat belajar Python.&quot;)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Dunia!\nSelamat belajar Python.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "# Program Python pertama\nprint(\"Halo, Dunia!\")\nprint(\"Selamat belajar Python.\")",
            "initialCode": "__(\"Bahasa: Python\")\n__(\"Alasan: Mudah dipelajari\")\n__(\"Target: Membuat program sederhana\")",
            "solution": "print(\"Bahasa: Python\")\nprint(\"Alasan: Mudah dipelajari\")\nprint(\"Target: Membuat program sederhana\")",
            "hint": "1. Lengkapi pemanggilan print() pertama dengan teks\n   \"Bahasa: Python\" (gunakan tanda petik).\n\n2. Lengkapi pemanggilan print() kedua dengan teks\n   \"Alasan: Mudah dipelajari\".\n\n3. Lengkapi pemanggilan print() ketiga dengan teks\n   \"Target: Membuat program sederhana\".",
            "quiz": {
              "question": "Bagaimana Python menentukan struktur blok kode (misalnya isi dari sebuah fungsi atau kondisi)?",
              "options": [
                "Menggunakan tanda kurung kurawal {}",
                "Menggunakan kata kunci begin dan end",
                "Menggunakan indentasi (spasi/tab)",
                "Menggunakan titik koma di setiap baris"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Bahasa: Python\nAlasan: Mudah dipelajari\nTarget: Membuat program sederhana\n",
                "description": "<span>Tulis program Python sederhana yang menampilkan tiga baris teks tentang dirimu sebagai pemula: nama bahasa yang dipelajari, alasan belajar, dan target belajar.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Baris pertama harus: print(\"Bahasa: Python\")",
                "pattern": "^print\\s*\\(\\s*[\"']Bahasa: Python[\"']\\s*\\)\\s*$",
                "shouldExist": true
              },
              {
                "message": "Baris kedua harus: print(\"Alasan: Mudah dipelajari\")",
                "pattern": "^print\\s*\\(\\s*[\"']Alasan: Mudah dipelajari[\"']\\s*\\)\\s*$",
                "shouldExist": true
              },
              {
                "message": "Baris ketiga harus: print(\"Target: Membuat program sederhana\")",
                "pattern": "^print\\s*\\(\\s*[\"']Target: Membuat program sederhana[\"']\\s*\\)\\s*$",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m1-l2",
            "title": "Perbandingan Sintaks Python dan C",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Meskipun konsep dasar pemrograman (variabel, percabangan, perulangan) sama di Python dan C, <strong>sintaksnya sangat berbeda</strong>. Python tidak membutuhkan deklarasi tipe data eksplisit (Python bersifat <strong>dynamically typed</strong>), tidak membutuhkan titik koma di akhir statement, tidak membutuhkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code>, dan tidak membutuhkan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> sebagai titik masuk wajib — kode di luar fungsi dieksekusi langsung dari atas ke bawah.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Aspek</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Bahasa C</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Python</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Deklarasi tipe</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int x = 5;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = 5</code> (tipe otomatis)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Akhir statement</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code> (wajib)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak perlu</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Blok kode</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Indentasi</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Cetak ke layar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%d\", x);</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(x)</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Komentar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">// atau /* */</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Titik masuk</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main() { ... }</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak wajib, jalan dari atas</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Python: tidak perlu tipe data, titik koma, atau main()\nnama = &quot;Andi&quot;\nusia = 20\nprint(&quot;Nama:&quot;, nama)\nprint(&quot;Usia:&quot;, usia)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama: Andi\nUsia: 20</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "# Python: tidak perlu tipe data, titik koma, atau main()\nnama = \"Andi\"\nusia = 20\nprint(\"Nama:\", nama)\nprint(\"Usia:\", usia)",
            "initialCode": "__ = 10\n__ = 4\n\nprint(\"Luas:\", __ __ __)",
            "solution": "panjang = 10\nlebar = 4\n\nprint(\"Luas:\", panjang * lebar)",
            "hint": "1. Lengkapi deklarasi variabel panjang dengan nilai 10.\n   Ingat: Python tidak membutuhkan tipe data dan titik koma.\n\n2. Lengkapi deklarasi variabel lebar dengan nilai 4.\n\n3. Lengkapi pemanggilan print() dengan dua argumen dipisah koma:\n   teks \"Luas:\" dan hasil perkalian panjang * lebar.",
            "quiz": {
              "question": "Manakah pernyataan yang **benar** mengenai perbedaan Python dan C?",
              "options": [
                "Python wajib memiliki fungsi main() seperti C",
                "Python membutuhkan tipe data dideklarasikan secara eksplisit seperti C",
                "Python tidak membutuhkan titik koma di akhir statement dan menggunakan indentasi untuk blok kode",
                "C menggunakan indentasi untuk blok kode seperti Python"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Luas: 40\n",
                "description": "<span>Konversi kode C berikut ke Python: deklarasi dua variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">panjang = 10</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">lebar = 4</code>, lalu tampilkan hasil perkalian (luas) keduanya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Deklarasikan: panjang = 10",
                "pattern": "^panjang\\s*=\\s*10\\s*$",
                "shouldExist": true
              },
              {
                "message": "Deklarasikan: lebar = 4",
                "pattern": "^lebar\\s*=\\s*4\\s*$",
                "shouldExist": true
              },
              {
                "message": "Tampilkan dengan: print(\"Luas:\", panjang * lebar)",
                "pattern": "print\\s*\\(\\s*[\"']Luas:[\"']\\s*,\\s*panjang\\s*\\*\\s*lebar\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-3-m2",
        "title": "Variabel",
        "lessons": [
          {
            "id": "level-3-m2-l1",
            "title": "Ketentuan Deklarasi Variabel",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dengan C, Python <strong>tidak memerlukan deklarasi tipe data</strong> sama sekali — variabel langsung dibuat saat kamu <strong>memberikan nilai pertama kali</strong> menggunakan tanda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code>. Python bersifat <strong>dynamically typed</strong>, artinya tipe data sebuah variabel ditentukan secara otomatis berdasarkan nilai yang diberikan, dan <strong>bisa berubah</strong> di tengah program jika diberi nilai bertipe lain.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Aturan penamaan variabel di Python mirip dengan C: hanya boleh mengandung huruf, angka, dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">_</code>), tidak boleh diawali angka, bersifat <strong>case-sensitive</strong>, dan tidak boleh sama dengan keyword Python (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>, dll). Konvensi penamaan standar Python adalah <strong>snake_case</strong> (huruf kecil dengan garis bawah), sesuai PEP 8 (panduan gaya resmi Python).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Tipe data ditentukan otomatis\nnama = &quot;Budi&quot;      # str (string)\nusia = 20          # int (integer)\ntinggi = 170.5     # float\n\nprint(nama, usia, tinggi)\n\n# Variabel bisa berubah tipe\nnilai = 100        # int\nnilai = &quot;Seratus&quot;  # sekarang jadi str\nprint(nilai)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Budi 20 170.5\nSeratus</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "# Tipe data ditentukan otomatis\nnama = \"Budi\"      # str (string)\nusia = 20          # int (integer)\ntinggi = 170.5     # float\n\nprint(nama, usia, tinggi)\n\n# Variabel bisa berubah tipe\nnilai = 100        # int\nnilai = \"Seratus\"  # sekarang jadi str\nprint(nilai)",
            "initialCode": "kota = \"Surabaya\"\nprint(\"__\", kota)\n\nkota = \"__\"\nprint(\"__\", kota)",
            "solution": "kota = \"Surabaya\"\nprint(\"Kota awal:\", kota)\n\nkota = \"Jakarta\"\nprint(\"Kota sekarang:\", kota)",
            "hint": "1. Lengkapi pemanggilan print() pertama: tampilkan teks\n   \"Kota awal:\" dan nilai variabel kota (saat ini \"Surabaya\").\n\n2. Ubah nilai variabel kota menjadi \"Jakarta\" (gunakan tanda =\n   seperti deklarasi awal — di Python, variabel bisa diberi\n   nilai baru kapan saja).\n\n3. Lengkapi pemanggilan print() kedua: tampilkan teks\n   \"Kota sekarang:\" dan nilai variabel kota (sekarang \"Jakarta\").",
            "quiz": {
              "question": "Mengapa Python disebut sebagai bahasa yang **dynamically typed**?",
              "options": [
                "Karena Python hanya bisa menyimpan satu tipe data per program",
                "Karena tipe data variabel ditentukan otomatis dan bisa berubah selama program berjalan",
                "Karena Python membutuhkan deklarasi tipe data eksplisit seperti C",
                "Karena Python tidak mendukung variabel sama sekali"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Kota awal: Surabaya\nKota sekarang: Jakarta\n",
                "description": "<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">kota = \"Surabaya\"</code>, lalu ubah nilainya menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"Jakarta\"</code>, dan tampilkan kedua nilai tersebut secara berurutan.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Print pertama harus: print(\"Kota awal:\", kota)",
                "pattern": "print\\s*\\(\\s*[\"']Kota awal:[\"']\\s*,\\s*kota\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Ubah nilai kota dengan: kota = \"Jakarta\"",
                "pattern": "^kota\\s*=\\s*[\"']Jakarta[\"']\\s*$",
                "shouldExist": true
              },
              {
                "message": "Setelah kota diubah, print kedua harus: print(\"Kota sekarang:\", kota)",
                "pattern": "kota\\s*=\\s*[\"']Jakarta[\"'][\\s\\S]*print\\s*\\(\\s*[\"']Kota sekarang:[\"']\\s*,\\s*kota\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m2-l2",
            "title": "Format Penulisan Variabel",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Penulisan variabel di Python mengikuti konvensi <strong>PEP 8</strong> sebagai standar resmi gaya kode Python. Beberapa aturan format penting: nama variabel sebaiknya <strong>deskriptif</strong> dan menggunakan <strong>snake_case</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">jumlah_siswa</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">JumlahSiswa</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">js</code>); konstanta (nilai yang tidak diubah) ditulis dengan <strong>HURUF KAPITAL SEMUA</strong> dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">PI = 3.14159</code>), meskipun Python tidak memiliki keyword <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code> sungguhan — ini hanya konvensi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung <strong>multiple assignment</strong> — memberi nilai ke beberapa variabel dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a, b, c = 1, 2, 3</code>. Selain itu, Python mendukung <strong>chained assignment</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = y = z = 0</code> memberikan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> ke ketiga variabel sekaligus. Kedua fitur ini tidak ada di C dan membuat kode Python lebih ringkas.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Multiple assignment\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Chained assignment\nx = y = z = 0\nprint(x, y, z)\n\n# Konstanta (konvensi huruf kapital)\nPI = 3.14159\nprint(&quot;Nilai PI:&quot;, PI)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">1 2 3\n0 0 0\nNilai PI: 3.14159</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "# Multiple assignment\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Chained assignment\nx = y = z = 0\nprint(x, y, z)\n\n# Konstanta (konvensi huruf kapital)\nPI = 3.14159\nprint(\"Nilai PI:\", PI)",
            "initialCode": "__, __, __ = __, __, __\nprint(\"Volume:\", __ __ __ __ __)",
            "solution": "panjang, lebar, tinggi = 5, 3, 2\nprint(\"Volume:\", panjang * lebar * tinggi)",
            "hint": "1. Lengkapi multiple assignment: tiga nama variabel (panjang,\n   lebar, tinggi) di sisi kiri tanda =, dan tiga nilai\n   (5, 3, 2) di sisi kanan, masing-masing dipisah koma.\n\n2. Lengkapi pemanggilan print() dengan dua argumen: teks\n   \"Volume:\" dan hasil perkalian ketiga variabel.",
            "quiz": {
              "question": "Apa hasil dari kode Python x = y = z = 5 lalu print(x, y, z)?",
              "options": [
                "5 0 0",
                "5 5 5",
                "Error karena tidak valid",
                "x y z"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Volume: 30\n",
                "description": "<span>Gunakan <strong>multiple assignment</strong> untuk mendeklarasikan tiga variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">panjang, lebar, tinggi = 5, 3, 2</code> dalam satu baris, lalu hitung dan tampilkan volume balok (p × l × t).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan multiple assignment: panjang, lebar, tinggi = 5, 3, 2",
                "pattern": "^panjang\\s*,\\s*lebar\\s*,\\s*tinggi\\s*=\\s*5\\s*,\\s*3\\s*,\\s*2\\s*$",
                "shouldExist": true
              },
              {
                "message": "Tampilkan dengan: print(\"Volume:\", panjang * lebar * tinggi)",
                "pattern": "print\\s*\\(\\s*[\"']Volume:[\"']\\s*,\\s*panjang\\s*\\*\\s*lebar\\s*\\*\\s*tinggi\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-3-m3",
        "title": "Tipe Data",
        "lessons": [
          {
            "id": "level-3-m3-l1",
            "title": "Tipe Data Number (int, float)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python memiliki dua tipe data numerik utama yang sering dipakai: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (integer/bilangan bulat, <strong>tanpa batas ukuran</strong> secara teori — berbeda dengan C yang punya batas 32-bit) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> (bilangan pecahan/desimal, presisi ganda mirip <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> di C). Python juga mendukung tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">complex</code> untuk bilangan kompleks, tapi jarang dipakai pemula.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operasi aritmatika di Python mirip C, dengan satu perbedaan penting: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code> di Python <strong>selalu menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code></strong>, bahkan jika kedua operand <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> = <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code> seperti di C). Untuk pembagian integer (hasil dibuang desimalnya), Python punya operator khusus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code> (floor division). Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">type()</code> digunakan untuk memeriksa tipe data sebuah nilai.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pembagian (selalu float)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Floor division (integer)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 // 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 % 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 ** 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>a = 17\nb = 5\n\nprint(a / b)    # Pembagian biasa -&gt; float\nprint(a // b)   # Floor division -&gt; int\nprint(a % b)    # Modulus\nprint(a ** 2)   # Pangkat\nprint(type(a))  # Tipe data a</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">3.4\n3\n2\n289\n&lt;class &#039;int&#039;&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "a = 17\nb = 5\n\nprint(a / b)    # Pembagian biasa -> float\nprint(a // b)   # Floor division -> int\nprint(a % b)    # Modulus\nprint(a ** 2)   # Pangkat\nprint(type(a))  # Tipe data a",
            "initialCode": "a = 29\nb = 4\nprint(\"Pembagian:\", a __ b)\nprint(\"Floor division:\", a __ b)\nprint(\"Modulus:\", a __ b)",
            "solution": "a = 29\nb = 4\nprint(\"Pembagian:\", a / b)\nprint(\"Floor division:\", a // b)\nprint(\"Modulus:\", a % b)",
            "hint": "1. Lengkapi print() pertama: tampilkan teks \"Pembagian:\" dan\n   hasil pembagian biasa antara a dan b (operator /, hasilnya\n   selalu float di Python).\n\n2. Lengkapi print() kedua: tampilkan teks \"Floor division:\" dan\n   hasil pembagian bulat antara a dan b (operator // ).\n\n3. Lengkapi print() ketiga: tampilkan teks \"Modulus:\" dan hasil\n   sisa pembagian antara a dan b (operator %).",
            "quiz": {
              "question": "Apa hasil dari 7 / 2 di Python (operator pembagian biasa, bukan //)?",
              "options": [
                "3",
                "3.5",
                "1",
                "Error"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Pembagian: 7.25\nFloor division: 7\nModulus: 1\n",
                "description": "<span>Buat dua variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a = 29</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">b = 4</code>. Tampilkan hasil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a / b</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a // b</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a % b</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Tampilkan dengan: print(\"Pembagian:\", a / b)",
                "pattern": "print\\s*\\(\\s*[\"']Pembagian:[\"']\\s*,\\s*a\\s*/\\s*b\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Tampilkan dengan: print(\"Floor division:\", a // b)",
                "pattern": "print\\s*\\(\\s*[\"']Floor division:[\"']\\s*,\\s*a\\s*//\\s*b\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Tampilkan dengan: print(\"Modulus:\", a % b)",
                "pattern": "print\\s*\\(\\s*[\"']Modulus:[\"']\\s*,\\s*a\\s*%\\s*b\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m3-l2",
            "title": "Tipe Data String",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">String di Python adalah <strong>tipe data bawaan</strong> untuk teks (berbeda dengan C yang menggunakan array <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code>). String bisa ditulis menggunakan tanda petik <strong>tunggal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'...'</code></strong> atau <strong>ganda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code></strong> — keduanya setara dan bisa dipilih sesuai kebutuhan (misalnya gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code> jika teks mengandung petik tunggal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'</code>). String juga bisa ditulis multi-baris menggunakan <strong>triple quotes</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'''...'''</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"\"...\"\"\"</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">String di Python bersifat <strong>immutable</strong> (tidak bisa diubah elemennya secara langsung setelah dibuat) tetapi mendukung banyak operasi: <strong>slicing</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">s[0:3]</code> mengambil sebagian string), <strong>concatenation</strong> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <strong>repetisi</strong> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ab\" * 3</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ababab\"</code>), serta fungsi panjang <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">len(s)</code>. Indeks string juga dimulai dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, dan mendukung <strong>indeks negatif</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">s[-1]</code> mengambil karakter terakhir).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = &quot;Python&quot;\nprint(nama[0])       # Karakter pertama\nprint(nama[-1])      # Karakter terakhir\nprint(nama[0:3])     # Slicing: 3 karakter pertama\nprint(len(nama))     # Panjang string\nprint(nama * 2)      # Repetisi string\nprint(nama + &quot; Programming&quot;)  # Concatenation</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">P\nn\nPyt\n6\nPythonPython\nPython Programming</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nama = \"Python\"\nprint(nama[0])       # Karakter pertama\nprint(nama[-1])      # Karakter terakhir\nprint(nama[0:3])     # Slicing: 3 karakter pertama\nprint(len(nama))     # Panjang string\nprint(nama * 2)      # Repetisi string\nprint(nama + \" Programming\")  # Concatenation",
            "initialCode": "kata = \"Algoritma\"\nprint(\"Panjang:\", __(kata))\nprint(\"4 huruf pertama:\", kata[__:__])\nprint(\"Huruf terakhir:\", kata[__])",
            "solution": "kata = \"Algoritma\"\nprint(\"Panjang:\", len(kata))\nprint(\"4 huruf pertama:\", kata[0:4])\nprint(\"Huruf terakhir:\", kata[-1])",
            "hint": "1. Lengkapi print() pertama: tampilkan teks \"Panjang:\" dan\n   panjang variabel kata (gunakan fungsi len()).\n\n2. Lengkapi print() kedua: tampilkan teks \"4 huruf pertama:\" dan\n   4 karakter pertama dari kata (gunakan slicing dari indeks 0\n   sampai 4, tidak termasuk indeks 4).\n\n3. Lengkapi print() ketiga: tampilkan teks \"Huruf terakhir:\" dan\n   karakter terakhir dari kata (gunakan indeks negatif -1).",
            "quiz": {
              "question": "Apa hasil dari \"abc\"[-1] di Python?",
              "options": [
                "'a'",
                "'c'",
                "Error, indeks negatif tidak valid",
                "'abc'"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Panjang: 9\n4 huruf pertama: Algo\nHuruf terakhir: a\n",
                "description": "<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">kata = \"Algoritma\"</code>. Tampilkan panjang kata, 4 karakter pertama (slicing), dan karakter terakhir (indeks negatif).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Tampilkan dengan: print(\"Panjang:\", len(kata))",
                "pattern": "print\\s*\\(\\s*[\"']Panjang:[\"']\\s*,\\s*len\\s*\\(\\s*kata\\s*\\)\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Ambil 4 karakter pertama dengan: print(\"4 huruf pertama:\", kata[0:4])",
                "pattern": "print\\s*\\(\\s*[\"']4 huruf pertama:[\"']\\s*,\\s*kata\\s*\\[\\s*0\\s*:\\s*4\\s*\\]\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Ambil karakter terakhir dengan: print(\"Huruf terakhir:\", kata[-1])",
                "pattern": "print\\s*\\(\\s*[\"']Huruf terakhir:[\"']\\s*,\\s*kata\\s*\\[\\s*-1\\s*\\]\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m3-l3",
            "title": "Tipe Data Boolean",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> di Python hanya memiliki dua nilai: <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code></strong> dan <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code></strong> (perhatikan huruf besar di awal — berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code> di C). <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> sebenarnya adalah <strong>subclass dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code></strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code> setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code> setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, sehingga keduanya bisa digunakan dalam operasi aritmatika.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;=</code>) dan operator logika (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code>) di Python mengembalikan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code>. Perlu diperhatikan: Python menggunakan kata <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code> (kata dalam bahasa Inggris), <strong>bukan</strong> simbol <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> seperti di C. Selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, nilai-nilai seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0.0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"</code> (string kosong), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[]</code> (list kosong), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code> juga dianggap \"falsy\" (setara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>) dalam konteks boolean.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>status_aktif = True\nsaldo = 50000\n\nprint(status_aktif)\nprint(type(status_aktif))\nprint(saldo &gt; 0 and status_aktif)  # and -&gt; butuh keduanya True\nprint(saldo &gt; 100000 or status_aktif)  # or -&gt; salah satu True cukup\nprint(not status_aktif)  # not -&gt; membalik nilai</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\n&lt;class &#039;bool&#039;&gt;\nTrue\nTrue\nFalse</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "status_aktif = True\nsaldo = 50000\n\nprint(status_aktif)\nprint(type(status_aktif))\nprint(saldo > 0 and status_aktif)  # and -> butuh keduanya True\nprint(saldo > 100000 or status_aktif)  # or -> salah satu True cukup\nprint(not status_aktif)  # not -> membalik nilai",
            "initialCode": "usia = 17\npunya_izin = True\nprint(\"Boleh masuk:\", usia >= 17 __ punya_izin)\nprint(\"Boleh tanpa pendamping:\", usia >= 18 __ punya_izin)",
            "solution": "usia = 17\npunya_izin = True\nprint(\"Boleh masuk:\", usia >= 17 and punya_izin)\nprint(\"Boleh tanpa pendamping:\", usia >= 18 or punya_izin)",
            "hint": "1. Lengkapi print() pertama: tampilkan teks \"Boleh masuk:\" dan\n   hasil dari kondisi (usia lebih besar atau sama dengan 17)\n   DAN punya_izin. Gunakan kata kunci Python untuk operator AND\n   (bukan simbol &&).\n\n2. Lengkapi print() kedua: tampilkan teks\n   \"Boleh tanpa pendamping:\" dan hasil dari kondisi (usia lebih\n   besar atau sama dengan 18) ATAU punya_izin. Gunakan kata kunci\n   Python untuk operator OR (bukan simbol ||).",
            "quiz": {
              "question": "Operator logika apa yang digunakan di Python sebagai pengganti && pada bahasa C?",
              "options": [
                "&",
                "and",
                "AND",
                "&&"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Boleh masuk: True\nBoleh tanpa pendamping: True\n",
                "description": "<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">usia = 17</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">punya_izin = True</code>. Tampilkan hasil dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">usia &gt;= 17 and punya_izin</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">usia &gt;= 18 or punya_izin</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan operator and: print(\"Boleh masuk:\", usia >= 17 and punya_izin)",
                "pattern": "print\\s*\\(\\s*[\"']Boleh masuk:[\"']\\s*,\\s*usia\\s*>=\\s*17\\s+and\\s+punya_izin\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Gunakan operator or: print(\"Boleh tanpa pendamping:\", usia >= 18 or punya_izin)",
                "pattern": "print\\s*\\(\\s*[\"']Boleh tanpa pendamping:[\"']\\s*,\\s*usia\\s*>=\\s*18\\s+or\\s+punya_izin\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m3-l4",
            "title": "Konversi Tipe Data",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Konversi tipe data (type casting)</strong> adalah proses mengubah nilai dari satu tipe ke tipe lainnya. Python menyediakan fungsi bawaan untuk ini: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int(x)</code> mengonversi ke integer (membuang desimal jika dari float, atau mengonversi string angka), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float(x)</code> mengonversi ke desimal, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str(x)</code> mengonversi ke string, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool(x)</code> mengonversi ke boolean.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Konversi sangat penting saat menggabungkan tipe data berbeda — misalnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + 20)</code> akan <strong>error</strong> karena Python tidak bisa menggabungkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> secara langsung dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>. Solusinya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + str(20))</code>. Begitu pula, input dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> selalu berupa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>, sehingga jika ingin melakukan operasi matematika, harus dikonversi dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float()</code> terlebih dahulu.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka_str = &quot;100&quot;\nangka_int = int(angka_str)   # str -&gt; int\nangka_float = float(angka_int)  # int -&gt; float\nhasil_str = str(angka_int)   # int -&gt; str\n\nprint(angka_int + 50)        # Operasi matematika setelah konversi\nprint(angka_float)\nprint(&quot;Nilai: &quot; + hasil_str) # Concatenation setelah konversi\nprint(bool(0), bool(1), bool(&quot;&quot;))</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">150\n100.0\nNilai: 100\nFalse True False</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "angka_str = \"100\"\nangka_int = int(angka_str)   # str -> int\nangka_float = float(angka_int)  # int -> float\nhasil_str = str(angka_int)   # int -> str\n\nprint(angka_int + 50)        # Operasi matematika setelah konversi\nprint(angka_float)\nprint(\"Nilai: \" + hasil_str) # Concatenation setelah konversi\nprint(bool(0), bool(1), bool(\"\"))",
            "initialCode": "umur_str = \"25\"\numur = __(umur_str)\nprint(\"Umur sekarang: \" + __(umur))\nprint(\"Umur 5 tahun lagi: \" + __(umur __ 5))",
            "solution": "umur_str = \"25\"\numur = int(umur_str)\nprint(\"Umur sekarang: \" + str(umur))\nprint(\"Umur 5 tahun lagi: \" + str(umur + 5))",
            "hint": "1. Lengkapi konversi umur_str (bertipe string) menjadi integer,\n   simpan ke variabel umur. Gunakan fungsi konversi yang sesuai.\n\n2. Lengkapi print() pertama: gabungkan teks \"Umur sekarang: \"\n   dengan umur menggunakan operator +. Karena umur bertipe int\n   dan teks bertipe str, umur harus dikonversi ke str terlebih\n   dahulu dengan fungsi str().\n\n3. Lengkapi print() kedua: gabungkan teks \"Umur 5 tahun lagi: \"\n   dengan hasil (umur + 5) yang juga harus dikonversi ke str()\n   sebelum digabung.",
            "quiz": {"question":"Mengapa print(\"Umur: \" + 20) menghasilkan error di Python?","options":["Karena angka 20 terlalu besar","Karena Python tidak bisa menggabungkan tipe str dan int secara langsung dengan operator +","Karena print() hanya menerima satu argumen","Karena tanda + hanya untuk operasi matematika di Python"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Umur sekarang: 25\nUmur 5 tahun lagi: 30\n","description":"<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">umur_str = \"25\"</code>. Konversi ke <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>, tambahkan 5, lalu gabungkan dengan string menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str()</code> untuk ditampilkan.</span>"}],
            "validationRules": [{"message":"Konversi string ke int dengan: umur = int(umur_str)","pattern":"^umur\\s*=\\s*int\\s*\\(\\s*umur_str\\s*\\)\\s*$","shouldExist":true},{"message":"Gabungkan dengan: print(\"Umur sekarang: \" + str(umur))","pattern":"print\\s*\\(\\s*[\"']Umur sekarang: [\"']\\s*\\+\\s*str\\s*\\(\\s*umur\\s*\\)\\s*\\)","shouldExist":true},{"message":"Gabungkan dengan: print(\"Umur 5 tahun lagi: \" + str(umur + 5))","pattern":"print\\s*\\(\\s*[\"']Umur 5 tahun lagi: [\"']\\s*\\+\\s*str\\s*\\(\\s*umur\\s*\\+\\s*5\\s*\\)\\s*\\)","shouldExist":true}]
          },
        ]
      },
      {
        "id": "level-3-m4",
        "title": "Operator",
        "lessons": [
          {
            "id": "level-3-m4-l1",
            "title": "Operator Aritmatika",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator aritmatika di Python sebagian besar sama dengan C (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>), dengan tambahan operator <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"></strong></code><strong> untuk </strong>pangkat<strong> dan </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code><strong> untuk </strong>floor division<strong> yang tidak ada di C. Python juga mendukung </strong>operator assignment gabungan<strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"></strong>=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%=</code>) yang berfungsi sama seperti di C — menyingkat <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = x + 5</code> menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 5</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Urutan operasi (precedence) di Python mengikuti aturan matematika standar: pangkat (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code>) memiliki prioritas tertinggi, diikuti perkalian/pembagian/modulus/floor division (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code>), dan terakhir penjumlahan/pengurangan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>). Tanda kurung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">()</code> selalu bisa digunakan untuk mengubah urutan evaluasi.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Dasar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 + 3 * 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 ** 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Floor division</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">17 // 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">17 % 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-=</code> dst</td><td class=\"border border-zinc-200 px-3 py-1.5\">Assignment gabungan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = x + 5</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 10\nnilai += 5   # nilai = 15\nnilai *= 2   # nilai = 30\nprint(&quot;Nilai:&quot;, nilai)\n\nprint(&quot;2 pangkat 5:&quot;, 2 ** 5)\nprint(&quot;17 // 5:&quot;, 17 // 5)\nprint(&quot;Urutan operasi:&quot;, 2 + 3 * 2)  # * dulu, lalu +</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nilai: 30\n2 pangkat 5: 32\n17 // 5: 3\nUrutan operasi: 8</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nilai = 10\nnilai += 5   # nilai = 15\nnilai *= 2   # nilai = 30\nprint(\"Nilai:\", nilai)\n\nprint(\"2 pangkat 5:\", 2 ** 5)\nprint(\"17 // 5:\", 17 // 5)\nprint(\"Urutan operasi:\", 2 + 3 * 2)  # * dulu, lalu +",
            "initialCode": "skor = 50\nskor __ 20\nskor __ 2\nprint(\"Skor akhir:\", skor)\nprint(\"5 pangkat 3:\", 5 ** 3)",
            "solution": "skor = 50\nskor += 20\nskor *= 2\nprint(\"Skor akhir:\", skor)\nprint(\"5 pangkat 3:\", 5 ** 3)",
            "hint": "1. Lengkapi statement untuk menambahkan 20 ke variabel skor\n   menggunakan operator assignment gabungan +=.\n\n2. Lengkapi statement untuk mengalikan variabel skor dengan 2\n   menggunakan operator assignment gabungan *=.\n\n3. print() untuk skor akhir dan 5 pangkat 3 sudah benar —\n   jangan diubah.",
            "quiz": {
              "question": "Operator apa di Python yang digunakan untuk operasi **pangkat** (eksponen)?",
              "options": [
                "^",
                "**",
                "pow",
                "exp"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Skor akhir: 140\n5 pangkat 3: 125\n",
                "description": "<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">skor = 50</code>. Gunakan operator assignment gabungan: tambahkan 20 (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code>), lalu kalikan 2 (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*=</code>). Tampilkan nilai akhir, dan tampilkan juga <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">5 ** 3</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: skor += 20",
                "pattern": "^skor\\s*\\+=\\s*20\\s*$",
                "shouldExist": true
              },
              {
                "message": "Gunakan: skor *= 2",
                "pattern": "^skor\\s*\\*=\\s*2\\s*$",
                "shouldExist": true
              },
              {
                "message": "Urutan harus: skor += 20 terlebih dahulu, lalu skor *= 2",
                "pattern": "skor\\s*\\+=\\s*20[\\s\\S]*skor\\s*\\*=\\s*2",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m4-l2",
            "title": "Operator Perbandingan",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan di Python (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt;=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt;=</code>) memiliki <strong>simbol yang identik</strong> dengan C dan menghasilkan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>), bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> seperti tampilan di C (meskipun secara internal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> adalah subclass <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>). Sama seperti C, kesalahan umum pemula adalah tertukar antara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code> (assignment) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code> (perbandingan).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fitur unik Python yang tidak ada di C adalah <strong>chained comparison</strong> — kamu bisa menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0 &lt; x &lt; 10</code> yang secara otomatis berarti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(0 &lt; x) and (x &lt; 10)</code>, tanpa perlu operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code> secara eksplisit. Ini membuat pengecekan rentang nilai jauh lebih ringkas dibanding C yang harus menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(x &gt; 0) && (x &lt; 10)</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>x = 5\n\nprint(x == 5)         # True\nprint(x != 10)        # True\nprint(0 &lt; x &lt; 10)     # Chained comparison -&gt; True\nprint(10 &lt; x &lt; 20)    # False, karena x = 5 tidak &gt; 10</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\nTrue\nTrue\nFalse</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "x = 5\n\nprint(x == 5)         # True\nprint(x != 10)        # True\nprint(0 < x < 10)     # Chained comparison -> True\nprint(10 < x < 20)    # False, karena x = 5 tidak > 10",
            "initialCode": "nilai = 75\nprint(\"Dalam rentang lulus:\", __ __ nilai __ __)",
            "solution": "nilai = 75\nprint(\"Dalam rentang lulus:\", 60 <= nilai <= 100)",
            "hint": "1. Lengkapi print() dengan teks \"Dalam rentang lulus:\" dan\n   chained comparison: nilai harus lebih besar atau sama dengan\n   60 DAN lebih kecil atau sama dengan 100, ditulis dalam satu\n   ekspresi tanpa kata and (gunakan format: 60 <= nilai <= 100).",
            "quiz": {
              "question": "Apa yang dimaksud dengan **chained comparison** seperti 0 < x < 10 di Python?",
              "options": [
                "Python akan error karena tidak bisa membandingkan tiga nilai sekaligus",
                "Setara dengan (0 < x) and (x < 10)",
                "Setara dengan (0 < x) or (x < 10)",
                "Hanya membandingkan x < 10, nilai 0 diabaikan"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Dalam rentang lulus: True\n",
                "description": "<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai = 75</code>. Gunakan <strong>chained comparison</strong> untuk memeriksa apakah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nilai</code> berada dalam rentang 60 sampai 100 (inklusif), lalu tampilkan hasilnya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan chained comparison: print(\"Dalam rentang lulus:\", 60 <= nilai <= 100)",
                "pattern": "print\\s*\\(\\s*[\"']Dalam rentang lulus:[\"']\\s*,\\s*60\\s*<=\\s*nilai\\s*<=\\s*100\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m4-l3",
            "title": "Operator Logika",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menggunakan kata kunci <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code></strong>, <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code></strong>, dan <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code></strong> sebagai operator logika, <strong>bukan</strong> simbol <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> seperti C. Cara kerjanya identik secara konseptual: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code> true jika kedua operand true, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code> true jika salah satu true, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code> membalik nilai boolean.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga menerapkan <strong>short-circuit evaluation</strong> sama seperti C: pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a and b</code>, jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">b</code> tidak akan dievaluasi (hasilnya pasti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>). Selain konteks boolean murni, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code> di Python sebenarnya mengembalikan salah satu <strong>operand itu sendiri</strong> (bukan selalu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>), sebuah perilaku yang sering dimanfaatkan untuk memberi nilai default: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama = input_user or \"Tamu\"</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>usia = 25\npunya_ktp = True\nsudah_daftar = False\n\nprint(usia &gt;= 17 and punya_ktp)          # and\nprint(sudah_daftar or usia &gt;= 18)        # or\nprint(not sudah_daftar)                  # not\n\n# Penggunaan unik: memberi nilai default\ninput_user = &quot;&quot;\nnama = input_user or &quot;Tamu&quot;\nprint(&quot;Nama:&quot;, nama)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\nTrue\nTrue\nNama: Tamu</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "usia = 25\npunya_ktp = True\nsudah_daftar = False\n\nprint(usia >= 17 and punya_ktp)          # and\nprint(sudah_daftar or usia >= 18)        # or\nprint(not sudah_daftar)                  # not\n\n# Penggunaan unik: memberi nilai default\ninput_user = \"\"\nnama = input_user or \"Tamu\"\nprint(\"Nama:\", nama)",
            "initialCode": "hujan = True\nbawa_payung = False\nprint(\"Kena hujan:\", hujan __ __ bawa_payung)",
            "solution": "hujan = True\nbawa_payung = False\nprint(\"Kena hujan:\", hujan and not bawa_payung)",
            "hint": "1. Lengkapi print() dengan teks \"Kena hujan:\" dan ekspresi:\n   variabel hujan, operator AND (kata kunci Python), kata kunci\n   NOT (kata kunci Python), lalu variabel bawa_payung.",
            "quiz": {
              "question": "Apakah &&, ||, dan ! bisa digunakan sebagai operator logika di Python?",
              "options": [
                "Ya, identik dengan C",
                "Tidak, Python menggunakan and, or, dan not",
                "Hanya ! yang bisa digunakan",
                "Hanya && yang bisa digunakan"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Kena hujan: True\n",
                "description": "<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hujan = True</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bawa_payung = False</code>. Tampilkan hasil dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hujan and not bawa_payung</code> (artinya: hujan tapi tidak bawa payung — situasi buruk).</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: print(\"Kena hujan:\", hujan and not bawa_payung)",
                "pattern": "print\\s*\\(\\s*[\"']Kena hujan:[\"']\\s*,\\s*hujan\\s+and\\s+not\\s+bawa_payung\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-3-m5",
        "title": "Menginput / Memasukkan Data",
        "lessons": [
          {
            "id": "level-3-m5-l1",
            "title": "Fungsi `input()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> adalah fungsi bawaan Python untuk <strong>membaca input dari pengguna</strong> melalui keyboard. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> di C yang membutuhkan format specifier dan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> sangat sederhana: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">variabel = input(\"Pesan prompt: \")</code> — teks di dalam tanda kurung akan ditampilkan sebagai prompt sebelum pengguna mengetik.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hal terpenting yang harus diingat: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> <strong>selalu mengembalikan tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> (string)</strong>, <strong>apapun</strong> yang diketik pengguna — bahkan jika pengguna mengetik angka. Jika kamu langsung menggunakan hasil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> dalam operasi matematika tanpa konversi, akan terjadi error atau hasil yang tidak diharapkan (concatenation string, bukan penjumlahan angka).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = input(&quot;Masukkan nama Anda: &quot;)\nprint(&quot;Halo, &quot; + nama + &quot;!&quot;)\n\nangka_str = input(&quot;Masukkan sebuah angka: &quot;)\nprint(&quot;Tipe data input:&quot;, type(angka_str))  # Selalu &lt;class &#039;str&#039;&gt;</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan nama Anda: Sinta\nHalo, Sinta!\nMasukkan sebuah angka: 25\nTipe data input: &lt;class &#039;str&#039;&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nama = input(\"Masukkan nama Anda: \")\nprint(\"Halo, \" + nama + \"!\")\n\nangka_str = input(\"Masukkan sebuah angka: \")\nprint(\"Tipe data input:\", type(angka_str))  # Selalu <class 'str'>",
            "initialCode": "nama_hewan = __(\"Masukkan nama hewan peliharaanmu: \")\nprint(\"Halo \" __ nama_hewan __ \", semoga harimu menyenangkan!\")",
            "solution": "nama_hewan = input(\"Masukkan nama hewan peliharaanmu: \")\nprint(\"Halo \" + nama_hewan + \", semoga harimu menyenangkan!\")",
            "hint": "1. Lengkapi pemanggilan input() dengan teks prompt\n   \"Masukkan nama hewan peliharaanmu: \", simpan hasilnya\n   ke variabel nama_hewan.\n\n2. Lengkapi print() untuk menampilkan sapaan: gabungkan teks\n   \"Halo \" dengan variabel nama_hewan, lalu gabungkan lagi\n   dengan teks \", semoga harimu menyenangkan!\" menggunakan\n   operator +.",
            "quiz": {
              "question": "Apa tipe data yang **selalu** dikembalikan oleh fungsi input(), terlepas dari apa yang diketik pengguna?",
              "options": [
                "int",
                "float",
                "str",
                "bool"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan nama hewan peliharaanmu: Halo Milo, semoga harimu menyenangkan!\n",
                "description": "<span>Buat program yang meminta pengguna memasukkan nama hewan peliharaan mereka, lalu menampilkan pesan sapaan kepada hewan tersebut.</span>",
                "input": "Milo"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: nama_hewan = input(\"Masukkan nama hewan peliharaanmu: \")",
                "pattern": "^nama_hewan\\s*=\\s*input\\s*\\(\\s*[\"']Masukkan nama hewan peliharaanmu: [\"']\\s*\\)\\s*$",
                "shouldExist": true
              },
              {
                "message": "Gabungkan dengan: print(\"Halo \" + nama_hewan + \", semoga harimu menyenangkan!\")",
                "pattern": "print\\s*\\(\\s*[\"']Halo\\s*[\"']\\s*\\+\\s*nama_hewan\\s*\\+\\s*[\"'],\\s*semoga harimu menyenangkan![\"']\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m5-l2",
            "title": "Mengubah Input Menjadi Integer",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> selalu mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>, untuk melakukan <strong>operasi matematika</strong> terhadap input pengguna, hasilnya harus dikonversi menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> (untuk bilangan bulat) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float()</code> (untuk bilangan desimal). Pola yang sangat umum digunakan adalah <strong>konversi langsung</strong> dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">angka = int(input(\"Masukkan angka: \"))</code> — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> dijalankan dulu, hasilnya (str) langsung dibungkus oleh <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Jika pengguna memasukkan teks yang <strong>tidak bisa dikonversi</strong> ke angka (misalnya huruf), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> akan menghasilkan <strong>error <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">ValueError</code></strong>. Pada level pemula, hal ini diterima sebagai keterbatasan; penanganan error menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">try-except</code> akan dibahas pada level lebih lanjut.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Konversi langsung dalam satu baris\numur = int(input(&quot;Masukkan umur Anda: &quot;))\ntahun_depan = umur + 1\nprint(&quot;Tahun depan usia Anda:&quot;, tahun_depan)\n\nberat = float(input(&quot;Masukkan berat badan (kg): &quot;))\nprint(&quot;Berat dalam gram:&quot;, berat * 1000)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan umur Anda: 20\nTahun depan usia Anda: 21\nMasukkan berat badan (kg): 65.5\nBerat dalam gram: 65500.0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "# Konversi langsung dalam satu baris\numur = int(input(\"Masukkan umur Anda: \"))\ntahun_depan = umur + 1\nprint(\"Tahun depan usia Anda:\", tahun_depan)\n\nberat = float(input(\"Masukkan berat badan (kg): \"))\nprint(\"Berat dalam gram:\", berat * 1000)",
            "initialCode": "angka1 = __(__(\"Masukkan angka pertama: \"))\nangka2 = __(__(\"Masukkan angka kedua: \"))\nprint(\"Hasil penjumlahan:\", angka1 __ angka2)",
            "solution": "angka1 = int(input(\"Masukkan angka pertama: \"))\nangka2 = int(input(\"Masukkan angka kedua: \"))\nprint(\"Hasil penjumlahan:\", angka1 + angka2)",
            "hint": "1. Lengkapi baris pertama: baca input dengan prompt\n   \"Masukkan angka pertama: \", konversi langsung ke int\n   menggunakan int(input(...)), simpan ke variabel angka1.\n\n2. Lengkapi baris kedua: baca input dengan prompt\n   \"Masukkan angka kedua: \", konversi langsung ke int,\n   simpan ke variabel angka2.\n\n3. Lengkapi print() untuk menampilkan teks \"Hasil penjumlahan:\"\n   dan hasil dari angka1 + angka2.",
            "quiz": {
              "question": "Apa yang terjadi jika int(input(\"Masukkan angka: \")) dijalankan tetapi pengguna mengetik \"abc\"?",
              "options": [
                "Hasilnya otomatis menjadi 0",
                "Python akan menghasilkan error ValueError",
                "Python akan mengabaikan input dan meminta input lagi secara otomatis",
                "Hasilnya menjadi string \"abc\""
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan angka pertama: Masukkan angka kedua: Hasil penjumlahan: 20\n",
                "description": "<span>Buat program yang membaca dua angka dari pengguna (menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int(input(...))</code>), lalu menampilkan hasil penjumlahannya.</span>",
                "input": "12\n8"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: angka1 = int(input(\"Masukkan angka pertama: \"))",
                "pattern": "^angka1\\s*=\\s*int\\s*\\(\\s*input\\s*\\(\\s*[\"']Masukkan angka pertama: [\"']\\s*\\)\\s*\\)\\s*$",
                "shouldExist": true
              },
              {
                "message": "Gunakan: angka2 = int(input(\"Masukkan angka kedua: \"))",
                "pattern": "^angka2\\s*=\\s*int\\s*\\(\\s*input\\s*\\(\\s*[\"']Masukkan angka kedua: [\"']\\s*\\)\\s*\\)\\s*$",
                "shouldExist": true
              },
              {
                "message": "Tampilkan dengan: print(\"Hasil penjumlahan:\", angka1 + angka2)",
                "pattern": "print\\s*\\(\\s*[\"']Hasil penjumlahan:[\"']\\s*,\\s*angka1\\s*\\+\\s*angka2\\s*\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-3-m6",
        "title": "Menampilkan Data",
        "lessons": [
          {
            "id": "level-3-m6-l1",
            "title": "Fungsi `print()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> adalah fungsi paling dasar untuk <strong>menampilkan output</strong> ke layar di Python. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> di C yang membutuhkan format specifier, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> bisa langsung menerima <strong>banyak argumen</strong> dipisahkan koma, dan secara otomatis menambahkan <strong>spasi</strong> di antara argumen serta <strong>newline</strong> di akhir.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> memiliki beberapa parameter opsional yang berguna: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sep</code> (separator/pemisah antar argumen, default spasi) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">end</code> (karakter di akhir, default <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code>). Contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"A\", \"B\", \"C\", sep=\"-\")</code> menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">A-B-C</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Tanpa newline\", end=\"\")</code> mencegah pindah baris setelahnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(&quot;Halo&quot;, &quot;Dunia&quot;)              # Pemisah default: spasi\nprint(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, sep=&quot;-&quot;)       # Pemisah custom: -\nprint(&quot;Tidak ada newline&quot;, end=&quot; &quot;) # Tidak pindah baris\nprint(&quot;lanjut di baris yang sama&quot;)\nprint(1, 2, 3, sep=&quot;, &quot;, end=&quot;!\\n&quot;) # Kombinasi sep dan end</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo Dunia\nA-B-C\nTidak ada newline lanjut di baris yang sama\n1, 2, 3!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "print(\"Halo\", \"Dunia\")              # Pemisah default: spasi\nprint(\"A\", \"B\", \"C\", sep=\"-\")       # Pemisah custom: -\nprint(\"Tidak ada newline\", end=\" \") # Tidak pindah baris\nprint(\"lanjut di baris yang sama\")\nprint(1, 2, 3, sep=\", \", end=\"!\\n\") # Kombinasi sep dan end",
            "initialCode": "hari = 17\nbulan = 8\ntahun = 1945\nprint(f\"{hari:__d}\", f\"{bulan:__d}\", tahun, sep=\"__\")",
            "solution": "hari = 17\nbulan = 8\ntahun = 1945\nprint(f\"{hari:02d}\", f\"{bulan:02d}\", tahun, sep=\"/\")",
            "hint": "1. Lengkapi print() dengan tiga argumen: hari, bulan, tahun.\n   Karena bulan harus tampil sebagai \"08\" (dua digit dengan\n   nol di depan), gunakan f-string f\"{bulan:02d}\" untuk bulan\n   dan f\"{hari:02d}\" untuk hari. Variabel tahun tetap ditulis\n   langsung tanpa f-string karena sudah 4 digit.\n\n2. Lengkapi parameter sep dengan tanda \"/\" sebagai pemisah\n   antar argumen print().",
            "quiz": {
              "question": "Apa nilai default dari parameter sep pada fungsi print() jika tidak dituliskan?",
              "options": [
                "Tanpa karakter apapun (kosong)",
                "Koma ,",
                "Spasi \" \"",
                "Newline \\n"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "17/08/1945\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> dengan parameter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sep</code> untuk menampilkan tanggal dalam format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">DD/MM/YYYY</code> dari tiga variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hari = 17</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bulan = 8</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tahun = 1945</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: print(f\"{hari:02d}\", f\"{bulan:02d}\", tahun, sep=\"/\")",
                "pattern": "print\\s*\\(\\s*f[\"']\\{hari:02d\\}[\"']\\s*,\\s*f[\"']\\{bulan:02d\\}[\"']\\s*,\\s*tahun\\s*,\\s*sep\\s*=\\s*[\"']/[\"']\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-3-m6-l2",
            "title": "Menampilkan String dan Variabel (f-string)",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>f-string</strong> (formatted string literal), diperkenalkan di Python 3.6, adalah cara modern dan paling direkomendasikan untuk <strong>menyisipkan nilai variabel ke dalam string</strong>. Caranya: tambahkan huruf <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f</code> sebelum tanda petik, lalu tulis nama variabel di dalam kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"Nama saya {nama}\"</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">f-string juga mendukung <strong>ekspresi</strong> di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> (tidak hanya variabel tunggal, tapi juga operasi matematika atau pemanggilan fungsi), dan mendukung <strong>format specifier</strong> mirip C menggunakan tanda titik dua, contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"{nilai:.2f}\"</code> untuk 2 angka desimal, atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"{angka:05d}\"</code> untuk padding angka dengan nol di depan hingga 5 digit. f-string jauh lebih ringkas dan mudah dibaca dibandingkan concatenation <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> atau metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.format()</code> yang lebih lama.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = &quot;Maya&quot;\nusia = 21\nipk = 3.78912\n\nprint(f&quot;Nama saya {nama}, usia {usia} tahun.&quot;)\nprint(f&quot;IPK: {ipk:.2f}&quot;)          # 2 angka desimal\nprint(f&quot;Tahun depan: {usia + 1}&quot;)  # ekspresi di dalam {}\nprint(f&quot;Kode: {7:03d}&quot;)            # padding nol, lebar 3</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama saya Maya, usia 21 tahun.\nIPK: 3.79\nTahun depan: 22\nKode: 007</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nama = \"Maya\"\nusia = 21\nipk = 3.78912\n\nprint(f\"Nama saya {nama}, usia {usia} tahun.\")\nprint(f\"IPK: {ipk:.2f}\")          # 2 angka desimal\nprint(f\"Tahun depan: {usia + 1}\")  # ekspresi di dalam {}\nprint(f\"Kode: {7:03d}\")            # padding nol, lebar 3",
            "initialCode": "nama_produk = \"Laptop\"\nharga = 7500000.5\nprint(__\"Produk: {__}, Harga: Rp{__:.2f}\")",
            "solution": "nama_produk = \"Laptop\"\nharga = 7500000.5\nprint(f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\")",
            "hint": "1. Lengkapi print() menggunakan f-string (diawali huruf f\n   sebelum tanda petik).\n\n2. Di dalam f-string, sisipkan variabel nama_produk\n   menggunakan tanda kurung kurawal {nama_produk}.\n\n3. Di dalam f-string, sisipkan variabel harga dengan format\n   2 angka desimal menggunakan {harga:.2f}.",
            "quiz": {"question":"Bagaimana cara menyisipkan nilai variabel harga ke dalam string menggunakan f-string?","options":["print(\"Harga: \" % harga)","print(f\"Harga: {harga}\")","print(\"Harga: \" . harga)","print(\"Harga: ${harga}\")"],"correctAnswer":1},
            "testCases": [{"expectedOutput":"Produk: Laptop, Harga: Rp7500000.50\n","description":"<span>Buat variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama_produk = \"Laptop\"</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">harga = 7500000.5</code>. Gunakan f-string untuk menampilkan nama produk dan harganya dengan 2 angka desimal.</span>"}],
            "validationRules": [{"message":"Gunakan f-string: print(f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\")","pattern":"print\\s*\\(\\s*f[\"']Produk: \\{nama_produk\\}, Harga: Rp\\{harga:\\.2f\\}[\"']\\s*\\)","shouldExist":true}]
          },
          {
            "id": "level-3-m6-l3",
            "title": "Menggabungkan (Concatenate) String",
            "explanation": "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><strong>Concatenation</strong> (penggabungan string) di Python bisa dilakukan dengan beberapa cara: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> (menggabungkan string secara langsung, kedua operand harus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>), operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> (mengulang string sejumlah angka, misal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ab\" * 3</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ababab\"</code>), dan <strong>f-string</strong> (cara paling fleksibel, sudah dibahas sebelumnya). Untuk menggabungkan banyak string dengan separator yang konsisten, Python menyediakan metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.join()</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"-\".join([\"2024\", \"01\", \"15\"])</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"2024-01-15\"</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perlu diingat kembali: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> untuk concatenation <strong>hanya bekerja antar <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code></strong> — menggabungkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> langsung akan menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">TypeError</code>, sehingga perlu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str()</code> untuk konversi (sudah dibahas di pelajaran konversi tipe data). f-string umumnya lebih disukai karena menghindari masalah konversi tipe ini sepenuhnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>depan = &quot;Selamat&quot;\nbelakang = &quot;Pagi&quot;\n\n# Penggabungan dengan +\nprint(depan + &quot; &quot; + belakang)\n\n# Repetisi dengan *\nprint(&quot;=&quot; * 10)\n\n# Penggabungan dengan join\ntanggal = &quot;-&quot;.join([&quot;2024&quot;, &quot;01&quot;, &quot;15&quot;])\nprint(tanggal)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat Pagi\n==========\n2024-01-15</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "depan = \"Selamat\"\nbelakang = \"Pagi\"\n\n# Penggabungan dengan +\nprint(depan + \" \" + belakang)\n\n# Repetisi dengan *\nprint(\"=\" * 10)\n\n# Penggabungan dengan join\ntanggal = \"-\".join([\"2024\", \"01\", \"15\"])\nprint(tanggal)",
            "initialCode": "judul = \"BAB 1\"\nsubjudul = \"Pengenalan\"\nprint(judul __ \" - \" __ subjudul)\nprint(\"=\" __ 15)",
            "solution": "judul = \"BAB 1\"\nsubjudul = \"Pengenalan\"\nprint(judul + \" - \" + subjudul)\nprint(\"=\" * 15)",
            "hint": "1. Lengkapi print() pertama: gabungkan variabel judul, string\n   \" - \", dan variabel subjudul menggunakan operator + (dua kali).\n\n2. Lengkapi print() kedua: tampilkan string \"=\" yang diulang\n   15 kali menggunakan operator * (perkalian/repetisi string).",
            "quiz": {"question":"Apa hasil dari ekspresi Python \"-\" * 5?","options":["\"-5\"","Error, operator * tidak bisa digunakan untuk string","\"-----\"","5"],"correctAnswer":2},
            "testCases": [{"expectedOutput":"BAB 1 - Pengenalan\n===============\n","description":"<span>Buat dua variabel string <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">judul = \"BAB 1\"</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">subjudul = \"Pengenalan\"</code>. Gabungkan keduanya dengan pemisah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"> - </code> menggunakan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, lalu tampilkan garis pemisah sepanjang 15 karakter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code> di bawahnya menggunakan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>.</span>"}],
            "validationRules": [{"message":"Gabungkan dengan: print(judul + \" - \" + subjudul)","pattern":"print\\s*\\(\\s*judul\\s*\\+\\s*[\"'] - [\"']\\s*\\+\\s*subjudul\\s*\\)","shouldExist":true},{"message":"Tampilkan garis dengan: print(\"=\" * 15)","pattern":"print\\s*\\(\\s*[\"']=[\"']\\s*\\*\\s*15\\s*\\)","shouldExist":true}]
          },
        ]
      }
    ]
  },
  {
    "id": "level-4",
    "title": "PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON",
    "description": "Materi Level 4",
    "accessMode": "unlocked",
    "locked": false,
    "modules": [
      {
        "id": "level-4-m1",
        "title": "Percabangan",
        "lessons": [
          {
            "id": "level-4-m1-l1",
            "title": "Struktur Titik Dua dan Tab/Indentasi",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python tidak menggunakan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> untuk menandai blok kode seperti C. Sebagai gantinya, Python menggunakan <strong>kombinasi titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>) dan indentasi</strong>. Setiap statement yang membuka sebuah blok (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>, dll) <strong>wajib diakhiri dengan tanda titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>)</strong>, dan semua baris di dalam blok tersebut harus <strong>diberi indentasi (biasanya 4 spasi)</strong> secara konsisten.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Indentasi bukan sekadar estetika di Python — ia adalah <strong>bagian dari sintaks</strong>. Jika indentasi tidak konsisten (misalnya mencampur tab dan spasi, atau jumlah spasi berbeda dalam satu blok), Python akan menghasilkan error <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">IndentationError</code>. Standar PEP 8 merekomendasikan <strong>4 spasi</strong> per level indentasi, dan editor kode modern biasanya otomatis mengonversi tab menjadi 4 spasi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 80\n\nif nilai &gt;= 60:          # Titik dua membuka blok\n    print(&quot;Lulus&quot;)       # Indentasi 4 spasi -&gt; bagian dari blok if\n    print(&quot;Selamat!&quot;)    # Masih bagian dari blok if\nprint(&quot;Pemeriksaan selesai.&quot;)  # Tanpa indentasi -&gt; di luar blok if</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Lulus\nSelamat!\nPemeriksaan selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nilai = 80\n\nif nilai >= 60:          # Titik dua membuka blok\n    print(\"Lulus\")       # Indentasi 4 spasi -> bagian dari blok if\n    print(\"Selamat!\")    # Masih bagian dari blok if\nprint(\"Pemeriksaan selesai.\")  # Tanpa indentasi -> di luar blok if",
            "initialCode": "status = True\n\nif status__\n__print(\"Selamat datang!\")\n  print(\"Silakan login.\")",
            "solution": "status = True\n\nif status:\n    print(\"Selamat datang!\")\n    print(\"Silakan login.\")",
            "hint": "1. Pada baris \"if status\", tambahkan tanda titik dua (:) di\n   akhir baris untuk membuka blok.\n\n2. Pada baris print(\"Selamat datang!\"), tambahkan indentasi\n   4 spasi di depannya supaya menjadi bagian dari blok if.\n\n3. Pada baris print(\"Silakan login.\"), perbaiki indentasinya\n   menjadi 4 spasi yang SAMA dengan baris di atasnya (bukan\n   2 spasi seperti semula).",
            "quiz": {
              "question": "Apa yang akan terjadi jika indentasi di dalam blok if di Python tidak konsisten (misalnya campuran jumlah spasi berbeda)?",
              "options": [
                "Python akan mengabaikan masalah tersebut",
                "Python akan menghasilkan error IndentationError",
                "Python otomatis memperbaiki indentasi",
                "Hanya menghasilkan warning, program tetap berjalan normal"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Selamat datang!\nSilakan login.\n",
                "description": "<span>Perbaiki kode berikut yang memiliki kesalahan indentasi dan tanda titik dua yang hilang, agar bisa berjalan tanpa error.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Tambahkan titik dua: if status:",
                "pattern": "^if\\s+status\\s*:\\s*$",
                "shouldExist": true
              },
              {
                "message": "Baris print(\"Selamat datang!\") harus berindentasi 4 spasi di bawah if status:",
                "pattern": "if\\s+status\\s*:\\s*\\n {4}print\\s*\\(\\s*[\"']Selamat datang![\"']\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Baris print(\"Silakan login.\") harus memiliki indentasi 4 spasi yang sama dengan baris di atasnya",
                "pattern": "print\\s*\\(\\s*[\"']Selamat datang![\"']\\s*\\)\\s*\\n {4}print\\s*\\(\\s*[\"']Silakan login\\.[\"']\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-4-m1-l2",
            "title": "Percabangan `if`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statement <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> di Python berfungsi sama dengan C: mengevaluasi sebuah kondisi, dan jika bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, blok kode yang terindentasi di bawahnya akan dieksekusi. Sintaksnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if kondisi:</code> diikuti baris-baris terindentasi sebagai isi blok. Tidak ada tanda kurung wajib di sekitar kondisi (meskipun boleh ditambahkan untuk kejelasan), dan tidak ada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sama seperti C, kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> di Python bisa berupa hasil dari operator perbandingan, logika, atau bahkan <strong>nilai \"truthy\"/\"falsy\"</strong> — nilai non-nol, string tidak kosong, atau list tidak kosong dianggap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>; sedangkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[]</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code> dianggap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>suhu = 38\n\nif suhu &gt; 37.5:\n    print(&quot;Demam terdeteksi.&quot;)\n    print(&quot;Segera periksa ke dokter.&quot;)\n\nprint(&quot;Pemeriksaan suhu selesai.&quot;)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Demam terdeteksi.\nSegera periksa ke dokter.\nPemeriksaan suhu selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "suhu = 38\n\nif suhu > 37.5:\n    print(\"Demam terdeteksi.\")\n    print(\"Segera periksa ke dokter.\")\n\nprint(\"Pemeriksaan suhu selesai.\")",
            "initialCode": "kecepatan = int(input(\"Masukkan kecepatan (km/jam): \"))\nif kecepatan __ 80__\n    __(\"__\")",
            "solution": "kecepatan = int(input(\"Masukkan kecepatan (km/jam): \"))\nif kecepatan > 80:\n    print(\"Melebihi batas kecepatan!\")",
            "hint": "1. Lengkapi kondisi if: periksa apakah kecepatan lebih besar\n   dari 80, diakhiri dengan titik dua.\n\n2. Lengkapi baris di dalam blok if (berindentasi 4 spasi)\n   dengan print() yang menampilkan \"Melebihi batas kecepatan!\".",
            "quiz": {
              "question": "Manakah penulisan if yang **benar secara sintaks** di Python?",
              "options": [
                "if (x > 5) { print(\"besar\") }",
                "if x > 5: print(\"besar\") (pada baris yang sama) atau dengan blok terindentasi di bawahnya",
                "if x > 5 then print(\"besar\")",
                "if x > 5 do print(\"besar\") end"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan kecepatan (km/jam): Melebihi batas kecepatan!\n",
                "description": "<span>Buat program yang membaca <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int kecepatan</code> dari pengguna. Jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">kecepatan</code> lebih dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">80</code>, tampilkan \"Melebihi batas kecepatan!\".</span>",
                "input": "95"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: if kecepatan > 80:",
                "pattern": "^if\\s+kecepatan\\s*>\\s*80\\s*:\\s*$",
                "shouldExist": true
              },
              {
                "message": "Di dalam blok if (indentasi 4 spasi), tampilkan: print(\"Melebihi batas kecepatan!\")",
                "pattern": "if\\s+kecepatan\\s*>\\s*80\\s*:\\s*\\n {4}print\\s*\\(\\s*[\"']Melebihi batas kecepatan![\"']\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-4-m1-l3",
            "title": "Percabangan `if - else`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> di Python memberikan jalur alternatif jika kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, dengan sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if kondisi: ... else: ...</code>. Sama seperti C, <strong>tepat satu</strong> blok yang dieksekusi. Perbedaan sintaks utama dengan C: tidak ada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>, kedua kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> diakhiri <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>, dan isi blok ditentukan oleh indentasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung <strong>conditional expression</strong> (sering disebut \"ternary operator\"), yang ditulis dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hasil = nilai_jika_true if kondisi else nilai_jika_false</code>. Ini setara dengan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">? :</code> di C, tetapi urutan penulisannya berbeda — kondisi diletakkan di <strong>tengah</strong>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 45\n\nif nilai &gt;= 60:\n    status = &quot;Lulus&quot;\nelse:\n    status = &quot;Tidak Lulus&quot;\n\nprint(&quot;Status:&quot;, status)\n\n# Conditional expression (ternary)\nketerangan = &quot;Genap&quot; if nilai % 2 == 0 else &quot;Ganjil&quot;\nprint(&quot;Keterangan:&quot;, keterangan)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Status: Tidak Lulus\nKeterangan: Ganjil</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nilai = 45\n\nif nilai >= 60:\n    status = \"Lulus\"\nelse:\n    status = \"Tidak Lulus\"\n\nprint(\"Status:\", status)\n\n# Conditional expression (ternary)\nketerangan = \"Genap\" if nilai % 2 == 0 else \"Ganjil\"\nprint(\"Keterangan:\", keterangan)",
            "initialCode": "angka = int(input(\"Masukkan angka: \"))\nhasil = \"__\" __ angka __ 0 __ \"__\"\nprint(\"Hasil:\", hasil)",
            "solution": "angka = int(input(\"Masukkan angka: \"))\nhasil = \"Positif\" if angka > 0 else \"Negatif atau Nol\"\nprint(\"Hasil:\", hasil)",
            "hint": "1. Lengkapi conditional expression (ternary): tulis nilai\n   \"Positif\" terlebih dahulu, lalu kata kunci if, lalu kondisi\n   (angka lebih besar dari 0), lalu kata kunci else, lalu\n   nilai \"Negatif atau Nol\". Simpan hasilnya ke variabel hasil.",
            "quiz": {
              "question": "Bagaimana penulisan **conditional expression** (ternary) di Python yang setara dengan x > 0 ? \"positif\" : \"negatif\" di C?",
              "options": [
                "\"positif\" if x > 0 else \"negatif\"",
                "if x > 0 then \"positif\" else \"negatif\"",
                "x > 0 ? \"positif\" : \"negatif\"",
                "\"positif\" else \"negatif\" if x > 0"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan angka: Hasil: Negatif atau Nol\n",
                "description": "<span>Buat program yang membaca <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int angka</code>, lalu menggunakan <strong>conditional expression</strong> untuk menentukan apakah angka tersebut \"Positif\" atau \"Negatif atau Nol\", dan tampilkan hasilnya.</span>",
                "input": "-7"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan conditional expression: hasil = \"Positif\" if angka > 0 else \"Negatif atau Nol\"",
                "pattern": "^hasil\\s*=\\s*[\"']Positif[\"']\\s+if\\s+angka\\s*>\\s*0\\s+else\\s+[\"']Negatif atau Nol[\"']\\s*$",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-4-m1-l4",
            "title": "Percabangan `if - elif`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menggunakan kata kunci <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code></strong> (singkatan dari \"else if\") sebagai pengganti rangkaian <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> di C. Strukturnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if kondisi1: ... elif kondisi2: ... elif kondisi3: ... else: ...</code>. Sama seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> di C, setiap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> hanya dievaluasi jika <strong>semua kondisi sebelumnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code></strong>, dan begitu satu kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, sisanya diabaikan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python <strong>tidak memiliki <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch-case</code></strong> seperti C (meskipun sejak Python 3.10 ada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">match-case</code> yang serupa namun lebih powerful). Sebelum Python 3.10, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-elif-else</code> adalah cara standar untuk menangani banyak kemungkinan kondisi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 75\n\nif nilai &gt;= 90:\n    grade = &quot;A&quot;\nelif nilai &gt;= 80:\n    grade = &quot;B&quot;\nelif nilai &gt;= 70:\n    grade = &quot;C&quot;\nelse:\n    grade = &quot;D&quot;\n\nprint(&quot;Grade:&quot;, grade)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Grade: C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nilai = 75\n\nif nilai >= 90:\n    grade = \"A\"\nelif nilai >= 80:\n    grade = \"B\"\nelif nilai >= 70:\n    grade = \"C\"\nelse:\n    grade = \"D\"\n\nprint(\"Grade:\", grade)",
            "initialCode": "bmi = float(input(\"Masukkan BMI: \"))\nif bmi __ 18.5__\n    kategori = \"__\"\n__ bmi __ 25__\n    kategori = \"__\"\n__:\n    kategori = \"__\"\n\nprint(\"Kategori:\", kategori)",
            "solution": "bmi = float(input(\"Masukkan BMI: \"))\nif bmi < 18.5:\n    kategori = \"Kurus\"\nelif bmi <= 25:\n    kategori = \"Normal\"\nelse:\n    kategori = \"Gemuk\"\n\nprint(\"Kategori:\", kategori)",
            "hint": "1. Lengkapi kondisi if pertama: periksa apakah bmi kurang dari\n   18.5, diakhiri titik dua. Isi blok (4 spasi): kategori = \"Kurus\".\n\n2. Lengkapi kondisi elif (kata kunci pengganti \"else if\" di\n   Python): periksa apakah bmi kurang dari atau sama dengan 25,\n   diakhiri titik dua. Isi blok (4 spasi): kategori = \"Normal\".\n\n3. Lengkapi blok else (tanpa kondisi tambahan), diakhiri titik\n   dua. Isi blok (4 spasi): kategori = \"Gemuk\".",
            "quiz": {
              "question": "Apa kata kunci yang digunakan Python sebagai pengganti else if pada bahasa C?",
              "options": [
                "elseif",
                "else if",
                "elif",
                "elsif"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Masukkan BMI: Kategori: Normal\n",
                "description": "<span>Buat program kategori BMI: membaca <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float bmi</code>, lalu menentukan kategori: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&lt; 18.5</code> → \"Kurus\", <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">18.5</code> sampai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">25</code> → \"Normal\", <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&gt; 25</code> → \"Gemuk\", menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-elif-else</code>.</span>",
                "input": "22.5"
              }
            ],
            "validationRules": [
              {
                "message": "Blok if harus: if bmi < 18.5:\\n    kategori = \"Kurus\"",
                "pattern": "^if\\s+bmi\\s*<\\s*18\\.5\\s*:\\s*\\n {4}kategori\\s*=\\s*[\"']Kurus[\"']\\s*$",
                "shouldExist": true
              },
              {
                "message": "Blok elif harus: elif bmi <= 25:\\n    kategori = \"Normal\"",
                "pattern": "^elif\\s+bmi\\s*<=\\s*25\\s*:\\s*\\n {4}kategori\\s*=\\s*[\"']Normal[\"']\\s*$",
                "shouldExist": true
              },
              {
                "message": "Blok else harus: else:\\n    kategori = \"Gemuk\"",
                "pattern": "^else\\s*:\\s*\\n {4}kategori\\s*=\\s*[\"']Gemuk[\"']\\s*$",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-4-m2",
        "title": "Perulangan",
        "lessons": [
          {
            "id": "level-4-m2-l1",
            "title": "Perulangan `for` dan Fungsi `range()`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> di Python <strong>berbeda secara fundamental</strong> dari C — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> di Python adalah <strong>iterasi melalui elemen-elemen</strong> dari sebuah objek iterable (list, string, dll), bukan loop berbasis kondisi/counter manual. Sintaksnya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for variabel in iterable:</code>. Untuk meniru perilaku <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> C yang menggunakan counter, Python menyediakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(stop)</code> menghasilkan urutan angka dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> hingga <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">stop-1</code>. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(start, stop)</code> menghasilkan dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">start</code> hingga <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">stop-1</code>. <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(start, stop, step)</code> menambahkan kenaikan/penurunan sebesar <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">step</code>. Penting: <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">stop</code> tidak termasuk</strong> dalam hasil — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(1, 6)</code> menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1, 2, 3, 4, 5</code>, bukan sampai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">6</code>.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Pemanggilan</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil Iterasi</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(5)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0, 1, 2, 3, 4</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(1, 6)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1, 2, 3, 4, 5</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(0, 10, 2)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0, 2, 4, 6, 8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range(10, 0, -1)</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">10, 9, 8, ..., 1</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># for dengan range\nfor i in range(1, 6):\n    print(&quot;Iterasi ke-&quot;, i)\n\n# for langsung pada string\nfor huruf in &quot;abc&quot;:\n    print(huruf)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Iterasi ke- 1\nIterasi ke- 2\nIterasi ke- 3\nIterasi ke- 4\nIterasi ke- 5\na\nb\nc</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "# for dengan range\nfor i in range(1, 6):\n    print(\"Iterasi ke-\", i)\n\n# for langsung pada string\nfor huruf in \"abc\":\n    print(huruf)",
            "initialCode": "total = 0\nfor i in range(__, __)__\n    total __ i\n\nprint(\"Total 1 sampai 10:\", total)",
            "solution": "total = 0\nfor i in range(1, 11):\n    total += i\n\nprint(\"Total 1 sampai 10:\", total)",
            "hint": "1. Lengkapi struktur for loop menggunakan range(): karena\n   range() tidak menyertakan angka akhir, dan kita butuh sampai\n   10 (inklusif), gunakan range(1, 11). Diakhiri titik dua.\n\n2. Lengkapi baris di dalam loop (indentasi 4 spasi): tambahkan\n   nilai i ke variabel total menggunakan operator assignment\n   gabungan +=.",
            "quiz": {
              "question": "Berapa angka terakhir yang dihasilkan oleh range(1, 6)?",
              "options": [
                "6",
                "5",
                "1",
                "0"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Total 1 sampai 10: 55\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code> untuk menghitung total dari 1 sampai 10 (inklusif), lalu tampilkan hasilnya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: for i in range(1, 11): (11 karena range tidak termasuk angka akhir)",
                "pattern": "^for\\s+i\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*11\\s*\\)\\s*:\\s*$",
                "shouldExist": true
              },
              {
                "message": "Di dalam loop (indentasi 4 spasi), tambahkan: total += i",
                "pattern": "range\\s*\\(\\s*1\\s*,\\s*11\\s*\\)\\s*:\\s*\\n {4}total\\s*\\+=\\s*i",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-4-m2-l2",
            "title": "Perulangan `while`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> di Python berfungsi sama seperti C: mengeksekusi blok kode <strong>selama kondisi bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code></strong>, dievaluasi <strong>sebelum</strong> setiap iterasi (pre-test loop). Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while kondisi:</code> diikuti blok terindentasi. Sama seperti C, harus ada mekanisme yang mengubah kondisi di dalam loop agar tidak menjadi infinite loop (kecuali memang disengaja menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung statement <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> dengan perilaku <strong>identik</strong> dengan C: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> menghentikan loop sepenuhnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> melompat ke iterasi berikutnya. Selain itu, Python memiliki fitur unik: <strong>klausa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> pada loop</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while ... else:</code>) — blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> dieksekusi jika loop selesai <strong>normal</strong> (tanpa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>), tetapi ini jarang digunakan oleh pemula.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>hitung = 5\n\nwhile hitung &gt;= 1:\n    print(hitung)\n    hitung -= 1\n\nprint(&quot;Mulai!&quot;)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">5\n4\n3\n2\n1\nMulai!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "hitung = 5\n\nwhile hitung >= 1:\n    print(hitung)\n    hitung -= 1\n\nprint(\"Mulai!\")",
            "initialCode": "angka = 1\nwhile __:\n    if angka __ 6 == 0 __ angka __ 8 == 0:\n        __\n    angka __ 1\n\nprint(\"Ditemukan:\", angka)",
            "solution": "angka = 1\nwhile True:\n    if angka % 6 == 0 and angka % 8 == 0:\n        break\n    angka += 1\n\nprint(\"Ditemukan:\", angka)",
            "hint": "1. Lengkapi while loop dengan kondisi True (loop tak terbatas,\n   akan dihentikan dengan break), diakhiri titik dua.\n\n2. Lengkapi kondisi if (indentasi 4 spasi) di dalam while:\n   periksa apakah angka habis dibagi 6 DAN habis dibagi 8\n   (gunakan operator modulus dan kata kunci and), diakhiri\n   titik dua.\n\n3. Lengkapi isi blok if (indentasi 8 spasi) dengan statement\n   untuk menghentikan loop.\n\n4. Lengkapi baris terakhir di dalam while (indentasi 4 spasi,\n   di luar blok if): tambahkan 1 ke variabel angka menggunakan\n   operator assignment gabungan +=.",
            "quiz": {
              "question": "Manakah pernyataan yang **benar** mengenai break dan continue di Python dibandingkan C?",
              "options": [
                "Python tidak memiliki break dan continue",
                "break dan continue di Python memiliki perilaku yang identik dengan C",
                "break di Python berfungsi seperti continue di C",
                "continue di Python menghentikan seluruh program"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Ditemukan: 24\n",
                "description": "<span>Gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> untuk mencari dan menampilkan angka pertama antara 1 dan 50 yang habis dibagi 6 <strong>dan</strong> 8, lalu hentikan loop dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan: while True:",
                "pattern": "^while\\s+True\\s*:\\s*$",
                "shouldExist": true
              },
              {
                "message": "Gunakan kondisi: if angka % 6 == 0 and angka % 8 == 0:",
                "pattern": "if\\s+angka\\s*%\\s*6\\s*==\\s*0\\s+and\\s+angka\\s*%\\s*8\\s*==\\s*0\\s*:",
                "shouldExist": true
              },
              {
                "message": "Di dalam blok if (indentasi 8 spasi), hentikan loop dengan: break",
                "pattern": "and\\s+angka\\s*%\\s*8\\s*==\\s*0\\s*:\\s*\\n {8}break",
                "shouldExist": true
              },
              {
                "message": "Setelah blok if, tambahkan: angka += 1 (indentasi 4 spasi)",
                "pattern": "break\\s*\\n {4}angka\\s*\\+=\\s*1",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-4-m3",
        "title": "Deklarasi Fungsi",
        "lessons": [
          {
            "id": "level-4-m3-l1",
            "title": "Penggunaan `def` dan Parameter",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi di Python dideklarasikan menggunakan kata kunci <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code></strong>, diikuti nama fungsi, daftar parameter dalam kurung, dan titik dua: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def nama_fungsi(parameter1, parameter2):</code> diikuti blok terindentasi sebagai badan fungsi. Berbeda dengan C, Python <strong>tidak membutuhkan tipe data</strong> untuk parameter maupun nilai kembalian — semuanya ditentukan secara dinamis saat runtime.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python mendukung <strong>default parameter value</strong> — nilai default jika argumen tidak diberikan saat pemanggilan: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def sapa(nama=\"Tamu\"):</code>. Python juga mendukung <strong>keyword arguments</strong> — memanggil fungsi dengan menyebutkan nama parameter secara eksplisit, memungkinkan urutan argumen berbeda: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fungsi(b=2, a=1)</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def sapa(nama, salam=&quot;Halo&quot;):\n    print(salam + &quot;, &quot; + nama + &quot;!&quot;)\n\nsapa(&quot;Budi&quot;)               # Menggunakan default salam\nsapa(&quot;Ani&quot;, &quot;Selamat pagi&quot;) # Override default\nsapa(salam=&quot;Hai&quot;, nama=&quot;Citra&quot;)  # Keyword arguments</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Budi!\nSelamat pagi, Ani!\nHai, Citra!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "def sapa(nama, salam=\"Halo\"):\n    print(salam + \", \" + nama + \"!\")\n\nsapa(\"Budi\")               # Menggunakan default salam\nsapa(\"Ani\", \"Selamat pagi\") # Override default\nsapa(salam=\"Hai\", nama=\"Citra\")  # Keyword arguments",
            "initialCode": "def hitung_diskon(__, __=__)__\n    return harga __ (harga __ persen __ 100)\n\nprint(\"Harga setelah diskon 1:\", hitung_diskon(100000))\nprint(\"Harga setelah diskon 2:\", hitung_diskon(200000, 20))",
            "solution": "def hitung_diskon(harga, persen=10):\n    return harga - (harga * persen / 100)\n\nprint(\"Harga setelah diskon 1:\", hitung_diskon(100000))\nprint(\"Harga setelah diskon 2:\", hitung_diskon(200000, 20))",
            "hint": "1. Lengkapi definisi fungsi: nama hitung_diskon, parameter\n   pertama \"harga\" (tanpa default), parameter kedua \"persen\"\n   dengan nilai default 10, diakhiri titik dua.\n\n2. Lengkapi statement return (indentasi 4 spasi): kembalikan\n   harga dikurangi (harga dikali persen dibagi 100).",
            "quiz": {
              "question": "Kata kunci apa yang digunakan di Python untuk mendefinisikan sebuah fungsi?",
              "options": [
                "function",
                "func",
                "def",
                "fun"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Harga setelah diskon 1: 90000.0\nHarga setelah diskon 2: 160000.0\n",
                "description": "<span>Buat fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hitung_diskon(harga, persen=10)</code> yang mengembalikan harga setelah dikurangi diskon (dalam persen). Panggil fungsi dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">harga=100000</code> (default 10%) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">harga=200000, persen=20</code>.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Definisikan fungsi dengan: def hitung_diskon(harga, persen=10):",
                "pattern": "^def\\s+hitung_diskon\\s*\\(\\s*harga\\s*,\\s*persen\\s*=\\s*10\\s*\\)\\s*:\\s*$",
                "shouldExist": true
              },
              {
                "message": "Baris return (indentasi 4 spasi) harus: return harga - (harga * persen / 100)",
                "pattern": "persen\\s*=\\s*10\\s*\\)\\s*:\\s*\\n {4}return\\s+harga\\s*-\\s*\\(\\s*harga\\s*\\*\\s*persen\\s*/\\s*100\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-4-m3-l2",
            "title": "Pengembalian Nilai dengan `return`",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statement <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> di Python berfungsi sama dengan C: <strong>menghentikan eksekusi fungsi</strong> dan mengembalikan sebuah nilai ke pemanggil. Berbeda dengan C, fungsi Python yang tidak memiliki <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> (atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> tanpa nilai) <strong>secara otomatis mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code></strong> — nilai khusus yang merepresentasikan \"tidak ada nilai\", mirip konsep <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">void</code> di C tapi tetap merupakan nilai yang bisa diperiksa.</p>\n\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def bagi(a, b):\n    hasil = a / b\n    return hasil  # Mengembalikan satu nilai\n\ndef tanpa_return():\n    print(&quot;Fungsi ini tidak mengembalikan apa-apa&quot;)\n\nhasil_bagi = bagi(17, 5)\nprint(&quot;Hasil bagi:&quot;, hasil_bagi)\n\nnilai = tanpa_return()\nprint(&quot;Nilai kembalian:&quot;, nilai)  # None</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Hasil bagi: 3 Sisa: 2\nFungsi ini tidak mengembalikan apa-apa\nNilai kembalian: None</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "def bagi(a, b):\n    hasil = a / b\n    return hasil  # Mengembalikan satu nilai\n\ndef tanpa_return():\n    print(\"Fungsi ini tidak mengembalikan apa-apa\")\n\nhasil_bagi = bagi(17, 5)\nprint(\"Hasil bagi:\", hasil_bagi)\n\nnilai = tanpa_return()\nprint(\"Nilai kembalian:\", nilai)  # None",
            "initialCode": "def info_lingkaran(__)__\n    keliling = __ * 3.14 * radius\n    luas = 3.14 * radius __ 2\n    return __, __\n\n__, __ = info_lingkaran(__)\nprint(\"Keliling:\", k)\nprint(\"Luas:\", l)",
            "solution": "def info_lingkaran(radius):\n    keliling = 2 * 3.14 * radius\n    luas = 3.14 * radius ** 2\n    return keliling, luas\n\nk, l = info_lingkaran(7)\nprint(\"Keliling:\", k)\nprint(\"Luas:\", l)",
            "hint": "1. Lengkapi definisi fungsi: nama info_lingkaran, satu parameter\n   \"radius\", diakhiri titik dua.\n\n2. Lengkapi baris pertama di dalam fungsi (indentasi 4 spasi):\n   hitung keliling = 2 * 3.14 * radius.\n\n3. Lengkapi baris kedua di dalam fungsi (indentasi 4 spasi):\n   hitung luas = 3.14 * radius ** 2.\n\n4. Lengkapi statement return (indentasi 4 spasi): kembalikan\n   DUA nilai sekaligus — keliling dan luas, dipisah koma.\n\n5. Lengkapi pemanggilan fungsi: unpack dua nilai kembalian\n   ke variabel k dan l, dengan argumen radius = 7.",
            "quiz": {
              "question": "Apa yang dikembalikan oleh fungsi Python yang **tidak memiliki** statement return sama sekali?",
              "options": [
                "0",
                "String kosong \"\"",
                "None",
                "Error kompilasi"
              ],
              "correctAnswer": 2
            },
            "testCases": [
              {
                "expectedOutput": "Keliling: 43.96\nLuas: 153.86\n",
                "description": "<span>Buat fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">info_lingkaran(radius)</code> yang mengembalikan <strong>dua nilai</strong>: keliling (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 * 3.14 * radius</code>) dan luas (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.14 * radius ** 2</code>). Panggil fungsi dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">radius = 7</code> dan tampilkan kedua hasilnya.</span>"
              }
            ],
            "validationRules": [
              {
                "message": "Definisikan fungsi dengan: def info_lingkaran(radius):",
                "pattern": "^def\\s+info_lingkaran\\s*\\(\\s*radius\\s*\\)\\s*:\\s*$",
                "shouldExist": true
              },
              {
                "message": "Baris pertama (indentasi 4 spasi) harus: keliling = 2 * 3.14 * radius",
                "pattern": "radius\\s*\\)\\s*:\\s*\\n {4}keliling\\s*=\\s*2\\s*\\*\\s*3\\.14\\s*\\*\\s*radius",
                "shouldExist": true
              },
              {
                "message": "Baris kedua (indentasi 4 spasi) harus: luas = 3.14 * radius ** 2",
                "pattern": "keliling\\s*=\\s*2\\s*\\*\\s*3\\.14\\s*\\*\\s*radius\\s*\\n {4}luas\\s*=\\s*3\\.14\\s*\\*\\s*radius\\s*\\*\\*\\s*2",
                "shouldExist": true
              },
              {
                "message": "Baris return (indentasi 4 spasi) harus: return keliling, luas",
                "pattern": "luas\\s*=\\s*3\\.14\\s*\\*\\s*radius\\s*\\*\\*\\s*2\\s*\\n {4}return\\s+keliling\\s*,\\s*luas",
                "shouldExist": true
              },
              {
                "message": "Panggil fungsi dengan: k, l = info_lingkaran(7)",
                "pattern": "^k\\s*,\\s*l\\s*=\\s*info_lingkaran\\s*\\(\\s*7\\s*\\)\\s*$",
                "shouldExist": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "level-5",
    "title": "STRUKTUR DATA PYTHON",
    "description": "Mempelajari struktur data terurut (List) dan pemetaan kunci-nilai (Dictionary) secara mendalam beserta seluruh method manipulasinya di Python.",
    "accessMode": "auto",
    "locked": false,
    "modules": [
      {
        "id": "level-5-m1",
        "title": "List",
        "lessons": [
          {
            "id": "level-5-m1-l1",
            "title": "Konsep List, Sifat Mutable, dan Indexing",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Struktur data</strong> adalah cara mengorganisir dan menyimpan data di memori komputer agar dapat diakses serta dimanipulasi secara efisien.</p>\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>List</strong> adalah tipe data terurut (<em>ordered sequence</em>) di Python yang fungsinya mirip dengan array pada bahasa pemrograman lain. List dideklarasikan menggunakan tanda kurung siku <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[ ]</code> dengan setiap anggota dipisahkan oleh tanda koma (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">,</code>).</p>\n      \n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">List bersifat <strong>mutable</strong> (nilainya dapat diubah, ditambah, atau dihapus secara langsung). Karakteristik utama List meliputi:</p>\n      \n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Karakteristik List</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Penjelasan</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Mutable</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Elemen penyusunnya bisa diganti, ditambah, dan dihapus kapan saja.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Indexing (Mulai dari 0)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Elemen pertama berada pada indeks 0, kedua di indeks 1, dan indeks negatif (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-1</code>) untuk elemen terakhir.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Slicing</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengambil potongan elemen dengan notasi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">list[start:end]</code>.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Tipe Data Campuran</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Dapat menyimpan berbagai tipe data sekaligus (integer, float, string, boolean).</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Nested List</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">List dapat berisi list lain di dalamnya (list bersarang).</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Pendeklarasian & Pengaksesan List:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilaiUjian = [80, 73, 90, 85, 78, 88, 92, 76, 95, 89]\nnamaMahasiswa = [\"Faqod\", \"Lisa\", \"Jev\", \"Rafi\", \"Valdo\", \"Ibin\"]\nnilaiCampuran = [\"Python\", 20, 3.44, True]\nnestedList = [[80, 23, 11], True, [\"Javascript\", \"Python\"]]\n\nprint(nilaiUjian[1])        # Output: 73\nprint(namaMahasiswa[0])     # Output: Faqod\nprint(nilaiCampuran[2])     # Output: 3.44\nprint(nestedList[2][1])     # Output: Python</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">73\nFaqod\n3.44\nPython</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nilaiUjian = [80, 73, 90, 85, 78, 88, 92, 76, 95, 89]\nnamaMahasiswa = [\"Faqod\", \"Lisa\", \"Jev\", \"Rafi\", \"Valdo\", \"Ibin\"]\nnilaiCampuran = [\"Python\", 20, 3.44, True]\nnestedList = [[80, 23, 11], True, [\"Javascript\", \"Python\"]]\n\nprint(nilaiUjian[1])\nprint(namaMahasiswa[0])\nprint(nilaiCampuran[2])\nprint(nestedList[2][1])",
            "initialCode": "# Buatlah list dataMahasiswa yang berisi data: \"Faqod\", 20, 3.75, True\ndataMahasiswa = [\"Faqod\", 20, 3.75, True]\n\n# 1. Cetak nama (elemen pada index 0)\nprint(dataMahasiswa[__])\n\n# 2. Cetak IPK (elemen pada index 2)\nprint(dataMahasiswa[__])",
            "solution": "dataMahasiswa = [\"Faqod\", 20, 3.75, True]\nprint(dataMahasiswa[0])\nprint(dataMahasiswa[2])",
            "hint": "1. Elemen pertama pada list memiliki indeks 0: dataMahasiswa[0].\n2. Elemen ketiga (3.75) memiliki indeks 2: dataMahasiswa[2].",
            "quiz": {
              "question": "Mengapa List dalam Python disebut sebagai tipe data yang bersifat mutable?",
              "options": [
                "Karena elemen di dalam List dapat diubah, ditambah, atau dihapus secara langsung",
                "Karena List hanya bisa menampung data bertipe string",
                "Karena ukuran List bersifat statis dan tetap setelah dideklarasikan",
                "Karena indeks elemen List selalu diawali dari angka 1"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "Faqod\n3.75\n",
                "description": "Cetak elemen nama pada index 0 dan IPK pada index 2"
              }
            ],
            "validationRules": [
              {
                "message": "Akses elemen index 0 menggunakan dataMahasiswa[0]",
                "pattern": "dataMahasiswa\\[0\\]",
                "shouldExist": true
              },
              {
                "message": "Akses elemen index 2 menggunakan dataMahasiswa[2]",
                "pattern": "dataMahasiswa\\[2\\]",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-5-m1-l2",
            "title": "Menambah Elemen List (append, insert, dan Penggabungan)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menyediakan beberapa cara efektif untuk menambahkan elemen baru ke dalam sebuah List:</p>\n\n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Metode Penambahan</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Sintaks</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Perilaku</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">append</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.append(item)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menambahkan satu item ke posisi paling akhir dari list.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">insert</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.insert(i, item)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menyisipkan item pada posisi indeks ke-<code class=\"bg-zinc-100 px-1 py-0.5 rounded text-rose-700 font-mono\">i</code>, menggeser elemen setelahnya ke kanan.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">Penggabungan (+)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">list1 + list2</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menggabungkan dua list menjadi satu list baru.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Penambahan Elemen:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>myList = [1, 2, 3, 4, 5]\nprint(\"List Awal : \", myList)\n\n# Menambahkan elemen di akhir dengan insert(len) atau append\nmyList.insert(len(myList), 6)   # menambah angka 6 di akhir\nmyList.insert(1, 0)             # menyisipkan angka 0 di indeks ke-1\n\n# Menggabungkan dua list\nsecondList = [7, 8, 9]\nmy_list = myList + secondList\nprint(\"List Setelah Penambahan : \", my_list)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">List Awal :  [1, 2, 3, 4, 5]\nList Setelah Penambahan :  [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "myList = [1, 2, 3, 4, 5]\nprint(\"List Awal :\", myList)\n\nmyList.insert(len(myList), 6)\nmyList.insert(1, 0)\n\nsecondList = [7, 8, 9]\nmy_list = myList + secondList\nprint(\"List Setelah Penambahan :\", my_list)",
            "initialCode": "angka = [10, 20, 30, 40, 50]\n\n# 1. Tambahkan angka 60 di posisi paling akhir menggunakan append()\nangka.______(60)\n\n# 2. Sisipkan angka 15 pada indeks ke-1 menggunakan insert()\nangka.______(1, 15)\n\n# 3. Cetak isi list setelah penambahan\nprint(angka)",
            "solution": "angka = [10, 20, 30, 40, 50]\nangka.append(60)\nangka.insert(1, 15)\nprint(angka)",
            "hint": "1. Gunakan method append: angka.append(60).\n2. Gunakan method insert dengan indeks 1: angka.insert(1, 15).",
            "quiz": {
              "question": "Perbedaan utama antara method append() dan insert() pada List adalah:",
              "options": [
                "append() selalu menambahkan ke akhir list, sedangkan insert() bisa menyisipkan pada indeks tertentu",
                "append() menghapus elemen lama, sedangkan insert() tidak",
                "insert() hanya bisa digunakan untuk angka",
                "append() memerlukan 2 argumen"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "[10, 15, 20, 30, 40, 50, 60]\n",
                "description": "Tambahkan elemen menggunakan append dan insert"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan method append(60)",
                "pattern": "angka\\.append\\(\\s*60\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Gunakan method insert(1, 15)",
                "pattern": "angka\\.insert\\(\\s*1\\s*,\\s*15\\s*\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-5-m1-l3",
            "title": "Menghapus Elemen List (pop, remove, del)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menghapus elemen dari dalam list, Python menyediakan method dan statement dengan karakteristik berikut:</p>\n\n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama Fungsi / Method</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Cara Deklarasi</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Penjelasan</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">pop()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.pop()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menghapus dan mengembalikan item <strong>terakhir</strong> dari dalam list.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">pop(i)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.pop(i)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menghapus dan mengembalikan item pada indeks ke-<code class=\"bg-zinc-100 px-1 py-0.5 rounded text-rose-700 font-mono\">i</code>.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">remove()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.remove(item)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menghapus kemunculan <strong>pertama</strong> item berdasarkan nilai (value-nya).</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">del</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">del alist[i]</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Statement untuk menghapus item pada posisi indeks ke-<code class=\"bg-zinc-100 px-1 py-0.5 rounded text-rose-700 font-mono\">i</code> tanpa mengembalikan nilai.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Penghapusan Elemen:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>buah = [\"Apel\", \"Mangga\", \"Jeruk\", \"Pisang\", \"Jeruk\"]\n\nterakhir = buah.pop()         # menghapus \"Jeruk\" paling akhir\nbuah.remove(\"Mangga\")         # menghapus item \"Mangga\"\ndel buah[0]                   # menghapus elemen indeks 0 (\"Apel\")\n\nprint(\"Sisa List :\", buah)\nprint(\"Item Dihapus :\", terakhir)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Sisa List : ['Jeruk', 'Pisang']\nItem Dihapus : Jeruk</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "buah = [\"Apel\", \"Mangga\", \"Jeruk\", \"Pisang\", \"Jeruk\"]\n\nterakhir = buah.pop()\nbuah.remove(\"Mangga\")\ndel buah[0]\n\nprint(\"Sisa List :\", buah)\nprint(\"Item Dihapus :\", terakhir)",
            "initialCode": "hewan = [\"Kucing\", \"Anjing\", \"Burung\", \"Ikan\", \"Kelinci\"]\n\n# 1. Hapus elemen terakhir (\"Kelinci\") menggunakan pop() dan simpan di variabel item_terakhir\nitem_terakhir = hewan.______\n\n# 2. Hapus elemen dengan nilai \"Anjing\" menggunakan remove()\nhewan.______(\"Anjing\")\n\n# 3. Cetak sisa list hewan dan item yang dihapus\nprint(hewan)\nprint(item_terakhir)",
            "solution": "hewan = [\"Kucing\", \"Anjing\", \"Burung\", \"Ikan\", \"Kelinci\"]\nitem_terakhir = hewan.pop()\nhewan.remove(\"Anjing\")\nprint(hewan)\nprint(item_terakhir)",
            "hint": "1. Gunakan hewan.pop() tanpa argumen untuk menghapus item terakhir.\n2. Gunakan hewan.remove(\"Anjing\") untuk menghapus item berdasarkan nilainya.",
            "quiz": {
              "question": "Method manakah yang menghapus item berdasarkan nilainya secara langsung (bukan berdasarkan indeks)?",
              "options": [
                "alist.remove(item)",
                "alist.pop()",
                "del alist[i]",
                "alist.index(item)"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "['Kucing', 'Burung', 'Ikan']\nKelinci\n",
                "description": "Hapus elemen dengan pop dan remove"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan method pop()",
                "pattern": "hewan\\.pop\\(\\)",
                "shouldExist": true
              },
              {
                "message": "Gunakan method remove('Anjing')",
                "pattern": "hewan\\.remove\\([\"']Anjing[\"']\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-5-m1-l4",
            "title": "Pencarian dan Pengurutan List (sort, reverse, index, count)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menganalisis dan mengatur data di dalam List, Python menyediakan fungsi pengurutan dan pencarian:</p>\n\n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama Fungsi / Method</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Cara Deklarasi</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Penjelasan</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">sort</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.sort()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengubah urutan elemen list agar terurut secara ascending (dari kecil ke besar).</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">reverse</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.reverse()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Membalikkan urutan elemen di dalam list.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">index</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.index(item)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengembalikan posisi indeks kemunculan pertama dari item yang dicari.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">count</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">alist.count(item)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menghitung jumlah kehadiran / frekuensi kemunculan item di dalam list.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Pengurutan & Pencarian:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = [85, 70, 95, 70, 60, 70]\n\n# Menghitung frekuensi kemunculan nilai 70\nprint(\"Jumlah nilai 70 :\", nilai.count(70))\n\n# Mencari indeks nilai 95\nprint(\"Indeks nilai 95 :\", nilai.index(95))\n\n# Mengurutkan list\nnilai.sort()\nprint(\"List Terurut :\", nilai)\n\n# Membalik urutan list\nnilai.reverse()\nprint(\"List Terbalik :\", nilai)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Jumlah nilai 70 : 3\nIndeks nilai 95 : 2\nList Terurut : [60, 70, 70, 70, 85, 95]\nList Terbalik : [95, 85, 70, 70, 70, 60]</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "nilai = [85, 70, 95, 70, 60, 70]\n\nprint(\"Jumlah nilai 70 :\", nilai.count(70))\nprint(\"Indeks nilai 95 :\", nilai.index(95))\n\nnilai.sort()\nprint(\"List Terurut :\", nilai)\n\nnilai.reverse()\nprint(\"List Terbalik :\", nilai)",
            "initialCode": "angka = [50, 20, 80, 20, 10, 20]\n\n# 1. Hitung berapa kali angka 20 muncul menggunakan count()\nprint(\"Jumlah 20:\", angka.______(20))\n\n# 2. Urutkan angka dari terkecil ke terbesar menggunakan sort()\nangka.______\n\n# 3. Cetak list setelah diurutkan\nprint(angka)",
            "solution": "angka = [50, 20, 80, 20, 10, 20]\nprint(\"Jumlah 20:\", angka.count(20))\nangka.sort()\nprint(angka)",
            "hint": "1. Gunakan angka.count(20) untuk menghitung kemunculan.\n2. Panggil angka.sort() untuk mengurutkan list.",
            "quiz": {
              "question": "Method manakah yang digunakan untuk menghitung berapa kali suatu elemen muncul di dalam list?",
              "options": [
                "alist.count(item)",
                "alist.index(item)",
                "alist.sort()",
                "len(alist)"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "Jumlah 20: 3\n[10, 20, 20, 20, 50, 80]\n",
                "description": "Hitung kemunculan angka 20 dan urutkan list"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan method count(20)",
                "pattern": "angka\\.count\\(\\s*20\\s*\\)",
                "shouldExist": true
              },
              {
                "message": "Gunakan method sort()",
                "pattern": "angka\\.sort\\(\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      },
      {
        "id": "level-5-m2",
        "title": "Dictionary",
        "lessons": [
          {
            "id": "level-5-m2-l1",
            "title": "Konsep Dictionary dan Key-Value Pairs",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Dictionary</strong> adalah tipe data pemetaan (<em>mapping type</em>) di Python yang digunakan untuk menyimpan data dalam bentuk pasangan kunci-nilai (<strong>key-value pairs</strong>).</p>\n      \n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Dictionary diwakili dengan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code>. Pasangan kunci dan nilai dipisahkan oleh tanda titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>), dan antar pasangan dipisahkan oleh tanda koma (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">,</code>).</p>\n      \n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Sama seperti list, Dictionary bersifat <strong>mutable</strong> (bisa dimodifikasi dengan menambah, menghapus, atau mengganti nilai berdasarkan kuncinya). Manipulasi terhadap nilai dictionary dilakukan dengan mengakses nilainya melalui <em>key</em> penandanya.</p>\n\n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Komponen</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi / Sifat</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Key (Kunci)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Penanda unik, tidak boleh duplikat, dan bertipe data immutable (biasanya string atau integer).</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Value (Nilai)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Data aktual yang disimpan, dapat berupa tipe apa saja (angka, string, list, dictionary lain).</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-semibold\">Akses Nilai</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Menggunakan kurung siku dengan nama key: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">adict[key]</code>.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Dictionary:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Membuat dictionary\nmahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20,\n    \"mata_kuliah\": [\"Kalkulus\", \"Fisika\", \"Kimia\"]\n}\n\nprint(\"Dictionary awal : \", mahasiswa)\n\n# Mengakses nilai berdasarkan key\nnama = mahasiswa[\"nama\"]\nprint(\"Nama : \", nama)\nprint(\"Mata Kuliah ke-1 : \", mahasiswa[\"mata_kuliah\"][0])</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Dictionary awal :  {'nama': 'Naufal', 'umur': 20, 'mata_kuliah': ['Kalkulus', 'Fisika', 'Kimia']}\nNama :  Naufal\nMata Kuliah ke-1 :  Kalkulus</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20,\n    \"mata_kuliah\": [\"Kalkulus\", \"Fisika\", \"Kimia\"]\n}\nprint(\"Dictionary awal :\", mahasiswa)\nnama = mahasiswa[\"nama\"]\nprint(\"Nama :\", nama)\nprint(\"Mata Kuliah ke-1 :\", mahasiswa[\"mata_kuliah\"][0])",
            "initialCode": "# Buat dictionary data_siswa berisi data:\n# \"nama\": \"Naufal\", \"umur\": 20, \"jurusan\": \"Teknik Informatika\"\ndata_siswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20,\n    \"jurusan\": \"Teknik Informatika\"\n}\n\n# 1. Cetak nilai dari key \"nama\"\nprint(\"Nama:\", data_siswa[__])\n\n# 2. Cetak nilai dari key \"jurusan\"\nprint(\"Jurusan:\", data_siswa[__])",
            "solution": "data_siswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20,\n    \"jurusan\": \"Teknik Informatika\"\n}\nprint(\"Nama:\", data_siswa[\"nama\"])\nprint(\"Jurusan:\", data_siswa[\"jurusan\"])",
            "hint": "1. Tuliskan nama key dalam tanda petik di dalam kurung siku: data_siswa[\"nama\"].\n2. Lakukan hal yang sama untuk key jurusan: data_siswa[\"jurusan\"].",
            "quiz": {
              "question": "Simbol apakah yang digunakan untuk mendefinisikan Dictionary dalam Python?",
              "options": [
                "Kurung siku [ ]",
                "Kurung kurawal { }",
                "Kurung bulat ( )",
                "Kurung sudut < >"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Nama: Naufal\nJurusan: Teknik Informatika\n",
                "description": "Cetak nilai nama dan jurusan dari dictionary data_siswa"
              }
            ],
            "validationRules": [
              {
                "message": "Akses key 'nama' dengan data_siswa[\"nama\"]",
                "pattern": "data_siswa\\[[\"']nama[\"']\\]",
                "shouldExist": true
              },
              {
                "message": "Akses key 'jurusan' dengan data_siswa[\"jurusan\"]",
                "pattern": "data_siswa\\[[\"']jurusan[\"']\\]",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-5-m2-l2",
            "title": "Membaca Kunci, Nilai, dan Pasangan (keys, values, items)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menyediakan tiga method penting untuk memeriksa seluruh isi data di dalam Dictionary:</p>\n\n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama Method</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Cara Deklarasi</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Penjelasan</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">keys()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">adict.keys()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengambil semua key (kunci) yang ada pada dictionary.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">values()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">adict.values()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengambil semua value (nilai) yang ada pada dictionary.</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">items()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono\">adict.items()</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengambil semua pasangan (key, value) dari dict.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan keys, values, dan items:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20,\n    \"mata_kuliah\": [\"Kalkulus\", \"Fisika\", \"Kimia\"]\n}\n\n# Mengonversi view dictionary ke bentuk list\nprint(\"Daftar Kunci :\", list(mahasiswa.keys()))\nprint(\"Daftar Nilai :\", list(mahasiswa.values()))\n\n# Looping pasangan key dan value menggunakan items()\nfor k, v in mahasiswa.items():\n    print(f\"{k} -> {v}\")</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Daftar Kunci : ['nama', 'umur', 'mata_kuliah']\nDaftar Nilai : ['Naufal', 20, ['Kalkulus', 'Fisika', 'Kimia']]\nnama -> Naufal\numur -> 20\nmata_kuliah -> ['Kalkulus', 'Fisika', 'Kimia']</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20,\n    \"mata_kuliah\": [\"Kalkulus\", \"Fisika\", \"Kimia\"]\n}\nprint(\"Daftar Kunci :\", list(mahasiswa.keys()))\nprint(\"Daftar Nilai :\", list(mahasiswa.values()))",
            "initialCode": "biodata = {\n    \"nama\": \"Naufal\",\n    \"kota\": \"Jakarta\",\n    \"pekerjaan\": \"Programmer\"\n}\n\n# 1. Ambil semua kunci sebagai list menggunakan list(biodata.keys())\ndaftar_kunci = list(biodata.______)\n\n# 2. Ambil semua nilai sebagai list menggunakan list(biodata.values())\ndaftar_nilai = list(biodata.______)\n\n# 3. Cetak daftar kunci dan daftar nilai\nprint(daftar_kunci)\nprint(daftar_nilai)",
            "solution": "biodata = {\n    \"nama\": \"Naufal\",\n    \"kota\": \"Jakarta\",\n    \"pekerjaan\": \"Programmer\"\n}\ndaftar_kunci = list(biodata.keys())\ndaftar_nilai = list(biodata.values())\nprint(daftar_kunci)\nprint(daftar_nilai)",
            "hint": "1. Panggil method biodata.keys() untuk mengambil kunci.\n2. Panggil method biodata.values() untuk mengambil nilai.",
            "quiz": {
              "question": "Method Dictionary manakah yang digunakan untuk mengiterasi pasangan (key, value) secara bersamaan?",
              "options": [
                "adict.items()",
                "adict.keys()",
                "adict.values()",
                "adict.get()"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "['nama', 'kota', 'pekerjaan']\n['Naufal', 'Jakarta', 'Programmer']\n",
                "description": "Ambil daftar kunci dan nilai dari dictionary biodata"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan method keys()",
                "pattern": "biodata\\.keys\\(\\)",
                "shouldExist": true
              },
              {
                "message": "Gunakan method values()",
                "pattern": "biodata\\.values\\(\\)",
                "shouldExist": true
              }
            ]
          },
          {
            "id": "level-5-m2-l3",
            "title": "Akses Nilai Aman dan Fallback Default (get)",
            "explanation": "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Ketika mengakses nilai dengan kurung siku <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">adict[key]</code>, program akan langsung crash dan menghasilkan error <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">KeyError</code> jika key yang dicari tidak ditemukan.</p>\n      \n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mencegah error tersebut, Python menyediakan method <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.get()</code> yang lebih aman:</p>\n\n      <div class=\"my-4 overflow-x-auto\">\n        <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n          <thead>\n            <tr>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Bentuk Pemanggilan</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Perilaku Jika Key Ditemukan</th>\n              <th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Perilaku Jika Key Tidak Ada</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">adict.get(key)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengembalikan value dari key tersebut.</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengembalikan <code class=\"bg-zinc-100 px-1 py-0.5 rounded text-rose-700 font-mono\">None</code> (tidak melempar error).</td>\n            </tr>\n            <tr>\n              <td class=\"border border-zinc-200 px-3 py-1.5 font-mono text-rose-700 font-bold\">adict.get(key, alt)</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengembalikan value dari key tersebut.</td>\n              <td class=\"border border-zinc-200 px-3 py-1.5\">Mengembalikan nilai default <code class=\"bg-zinc-100 px-1 py-0.5 rounded text-rose-700 font-mono\">alt</code> pengganti.</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Method get():</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20\n}\n\n# Akses aman\nprint(\"Nama   :\", mahasiswa.get(\"nama\"))\nprint(\"Alamat :\", mahasiswa.get(\"alamat\"))                 # Output: None\nprint(\"Status :\", mahasiswa.get(\"status\", \"Mahasiswa Aktif\")) # Output: Mahasiswa Aktif</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal:</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">terminal — workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama   : Naufal\nAlamat : None\nStatus : Mahasiswa Aktif</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            "codeExample": "mahasiswa = {\n    \"nama\": \"Naufal\",\n    \"umur\": 20\n}\nprint(\"Nama   :\", mahasiswa.get(\"nama\"))\nprint(\"Alamat :\", mahasiswa.get(\"alamat\"))\nprint(\"Status :\", mahasiswa.get(\"status\", \"Mahasiswa Aktif\"))",
            "initialCode": "produk = {\n    \"nama\": \"Laptop\",\n    \"harga\": 8500000,\n    \"stok\": 12\n}\n\n# 1. Ambil nilai harga menggunakan get(\"harga\")\nprint(\"Harga:\", produk.get(\"harga\"))\n\n# 2. Ambil nilai diskon dengan nilai default 0 jika key tidak ditemukan\nprint(\"Diskon:\", produk.get(______, ______))\n\n# 3. Ambil nilai garansi dengan nilai default \"1 Tahun\" jika key tidak ada\nprint(\"Garansi:\", produk.get(______, ______))",
            "solution": "produk = {\n    \"nama\": \"Laptop\",\n    \"harga\": 8500000,\n    \"stok\": 12\n}\nprint(\"Harga:\", produk.get(\"harga\"))\nprint(\"Diskon:\", produk.get(\"diskon\", 0))\nprint(\"Garansi:\", produk.get(\"garansi\", \"1 Tahun\"))",
            "hint": "1. Gunakan produk.get(\"diskon\", 0) untuk mengisi parameter key dan nilai default alt.\n2. Gunakan produk.get(\"garansi\", \"1 Tahun\") untuk fallback garansi.",
            "quiz": {
              "question": "Apa keuntungan utama menggunakan method get(key, alt) dibandingkan adict[key]?",
              "options": [
                "Mencegah error KeyError saat key tidak ditemukan dan mengembalikan nilai default alt",
                "Otomatis menambahkan key baru ke dalam dictionary",
                "Mengurutkan seluruh isi dictionary secara otomatis",
                "Menghapus key setelah nilainya dibaca"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "Harga: 8500000\nDiskon: 0\nGaransi: 1 Tahun\n",
                "description": "Gunakan get dengan fallback nilai default"
              }
            ],
            "validationRules": [
              {
                "message": "Gunakan get('diskon', 0)",
                "pattern": "produk\\.get\\([\"']diskon[\"']\\s*,\\s*0\\)",
                "shouldExist": true
              },
              {
                "message": "Gunakan get('garansi', '1 Tahun')",
                "pattern": "produk\\.get\\([\"']garansi[\"']\\s*,\\s*[\"']1 Tahun[\"']\\)",
                "shouldExist": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "level-6",
    "title": "PENGOLAHAN DAN VISUALISASI DATA PYTHON",
    "description": "Mempelajari statistik deskriptif (pemusatan, penyebaran, posisi & korelasi) dan teknik visualisasi data grafik interaktif menggunakan Matplotlib.",
    "accessMode": "auto",
    "locked": false,
    "modules": [
      {
        "id": "level-6-m1",
        "title": "Statistik Deskriptif & Analisis Data",
        "lessons": [
          {
            "id": "level-6-m1-l1",
            "title": "Ukuran Pemusatan Data (Mean, Median, Mode)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Ukuran pemusatan data digunakan untuk menemukan titik sentral atau nilai yang paling representatif dari suatu kelompok data numerik.</p>\n  <ul class=\"list-disc pl-5 space-y-2 text-zinc-700\">\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">statistics.mean()</code>: Menghitung nilai rata-rata aritmatika seluruh elemen.</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">statistics.median()</code>: Mencari nilai tengah dari data yang telah terurut. Lebih tahan terhadap nilai anomali (outlier).</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">statistics.mode()</code>: Mencari modus atau nilai yang paling sering muncul (frekuensi tertinggi).</li>\n  </ul>\n</div>",
            "codeExample": "import statistics\n\ndata = [80, 90, 85, 70, 90, 100]\n\nrata_rata = statistics.mean(data)\nnilai_tengah = statistics.median(data)\nmodus = statistics.mode(data)\n\nprint(f\"Mean: {rata_rata:.2f}\")\nprint(f\"Median: {nilai_tengah}\")\nprint(f\"Modus: {modus}\")",
            "initialCode": "import statistics\n\nnilai = [75, 80, 85, 80, 95]\n\n# TODO: Lengkapi kode rumpang di bawah ini\nrata = statistics.____(nilai)       # Panggil fungsi rata-rata\ntengah = statistics.____(nilai)     # Panggil fungsi nilai tengah\nmodus = statistics.____(nilai)      # Panggil fungsi modus\n\nprint(f\"Rata-rata: {rata:.1f}\")\nprint(f\"Nilai Tengah: {tengah}\")\nprint(f\"Modus: {modus}\")",
            "solution": "import statistics\n\nnilai = [75, 80, 85, 80, 95]\n\nrata = statistics.mean(nilai)\ntengah = statistics.median(nilai)\nmodus = statistics.mode(nilai)\n\nprint(f\"Rata-rata: {rata:.1f}\")\nprint(f\"Nilai Tengah: {tengah}\")\nprint(f\"Modus: {modus}\")",
            "hint": "Ganti garis bawah ____ dengan mean, median, dan mode.",
            "quiz": {
              "question": "Fungsi pemusatan data apakah yang paling tahan terhadap kehadiran anomali (outlier) data yang sangat besar/kecil?",
              "options": [
                "mean()",
                "median()",
                "mode()",
                "sum()"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Rata-rata: 83.0\nNilai Tengah: 80\nModus: 80\n",
                "description": "Menghitung mean, median, dan mode dari list nilai"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m1-l2",
            "title": "Ukuran Penyebaran Data (Min, Max, Variance, Stdev)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi penyebaran data mengukur seberapa jauh atau lebar sebaran titik data dari titik pusatnya.</p>\n  <ul class=\"list-disc pl-5 space-y-2 text-zinc-700\">\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">min()</code> & <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">max()</code>: Menemukan nilai terendah dan tertinggi di kelompok data.</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">statistics.variance()</code>: Menghitung varians sampel (rata-rata kuadrat selisih tiap data terhadap rata-rata).</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">statistics.stdev()</code>: Menghitung standar deviasi (simpangan baku), metrik penyimpangan data pada skala aslinya.</li>\n  </ul>\n</div>",
            "codeExample": "import statistics\n\nsuhu = [28.5, 30.1, 29.0, 31.5, 27.8]\n\nterendah = min(suhu)\ntertinggi = max(suhu)\nvarians = statistics.variance(suhu)\nstd_dev = statistics.stdev(suhu)\n\nprint(f\"Min: {terendah}, Max: {tertinggi}\")\nprint(f\"Varians: {varians:.4f}\")\nprint(f\"Stdev: {std_dev:.4f}\")",
            "initialCode": "import statistics\n\nsampel = [10, 12, 15, 18, 20]\n\n# TODO: Lengkapi kode rumpang penyebaran data di bawah ini\nn_min = ____(sampel)                  # Fungsi nilai minimum\nn_max = ____(sampel)                  # Fungsi nilai maksimum\nvar = statistics.____(sampel)         # Fungsi varians\nstd = statistics.____(sampel)         # Fungsi standar deviasi\n\nprint(f\"Min: {n_min}\")\nprint(f\"Max: {n_max}\")\nprint(f\"Varians: {var:.2f}\")\nprint(f\"Stdev: {std:.2f}\")",
            "solution": "import statistics\n\nsampel = [10, 12, 15, 18, 20]\n\nn_min = min(sampel)\nn_max = max(sampel)\nvar = statistics.variance(sampel)\nstd = statistics.stdev(sampel)\n\nprint(f\"Min: {n_min}\")\nprint(f\"Max: {n_max}\")\nprint(f\"Varians: {var:.2f}\")\nprint(f\"Stdev: {std:.2f}\")",
            "hint": "Isi garis bawah ____ berturut-turut dengan min, max, variance, dan stdev.",
            "quiz": {
              "question": "Metrik statistik apakah yang dihitung dari akar kuadrat nilai varians?",
              "options": [
                "Median",
                "Standar Deviasi (stdev)",
                "Modus",
                "Kuartil"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Min: 10\nMax: 20\nVarians: 17.00\nStdev: 4.12\n",
                "description": "Menghitung min, max, varians, dan stdev data sampel"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m1-l3",
            "title": "Posisi & Hubungan Variabel (Quantiles & Correlation)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi posisi dan hubungan variabel digunakan untuk membagi interval data dan mengukur keterkaitan antar himpunan data.</p>\n  <ul class=\"list-disc pl-5 space-y-2 text-zinc-700\">\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">quantiles(n=4)</code>: Membagi data terurut ke dalam interval probabilitas yang sama (kuartil Q1, Q2, Q3).</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">correlation(x, y)</code>: Menghitung koefisien korelasi Pearson antara dua variabel (rentang -1 hingga 1).</li>\n  </ul>\n</div>",
            "codeExample": "import statistics\n\n# Kuartil (n=4)\ndata = [10, 20, 30, 40, 50, 60, 70, 80]\nkuartil = statistics.quantiles(data, n=4)\nprint(f\"Kuartil: {kuartil}\")\n\n# Korelasi\njam = [2, 4, 6, 8]\nnilai = [50, 65, 80, 95]\nkor = statistics.correlation(jam, nilai)\nprint(f\"Korelasi: {kor:.2f}\")",
            "initialCode": "import statistics\n\ndata = [12, 24, 36, 48, 60, 72, 84]\n\n# TODO: Lengkapi fungsi kuartil untuk membagi menjadi 4 bagian\nq = statistics.____(data, n=4)\n\nprint(f\"Q1, Q2, Q3: {[round(x, 1) for x in q]}\")",
            "solution": "import statistics\n\ndata = [12, 24, 36, 48, 60, 72, 84]\n\nq = statistics.quantiles(data, n=4)\n\nprint(f\"Q1, Q2, Q3: {[round(x, 1) for x in q]}\")",
            "hint": "Ganti garis bawah ____ dengan quantiles.",
            "quiz": {
              "question": "Berapakah rentang nilai koefisien korelasi Pearson yang dihasilkan oleh fungsi correlation()?",
              "options": [
                "0 hingga 100",
                "-1 hingga 1",
                "0 hingga 1",
                "-100 hingga 100"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Q1, Q2, Q3: [24.0, 48.0, 72.0]\n",
                "description": "Membagi interval kuartil data"
              }
            ],
            "validationRules": []
          }
        ]
      },
      {
        "id": "level-6-m2",
        "title": "Visualisasi Data Dasar dengan Matplotlib",
        "lessons": [
          {
            "id": "level-6-m2-l1",
            "title": "Konfigurasi & Pelengkap Grafik (Title, Label, Grid, Show)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Sebelum merender grafik, kita menggunakan modul <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">matplotlib.pyplot</code> untuk mengatur tata letak pelengkap grafik:</p>\n  <ul class=\"list-disc pl-5 space-y-2 text-zinc-700\">\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.title(\"...\")</code>: Menisipkan judul utama di bagian atas bingkai grafik.</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.xlabel(\"...\")</code> & <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.ylabel(\"...\")</code>: Memberikan label keterangan pada sumbu X dan Y.</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.grid(True)</code>: Menampilkan garis pembantu kisi di latar belakang.</li>\n    <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.show()</code>: Perintah wajib untuk merender dan menampilkan seluruh bingkai grafik ke layar.</li>\n  </ul>\n</div>",
            "codeExample": "import matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [10, 20, 30])\nplt.title(\"Grafik Sederhana\")\nplt.xlabel(\"Sumbu X\")\nplt.ylabel(\"Sumbu Y\")\nplt.grid(True)\nplt.show()",
            "initialCode": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [5, 10, 15, 20]\n\nplt.plot(x, y)\n\n# TODO: Lengkapi konfigurasi grafik di bawah ini\nplt.____(\"Grafik Perkembangan\")   # Fungsi Judul\nplt.____(\"Waktu\")                 # Fungsi Label Sumbu X\nplt.____(\"Nilai\")                 # Fungsi Label Sumbu Y\nplt.grid(True)\n\nplt.____()                         # Perintah wajib penampil grafik\n\nprint(\"Konfigurasi grafik selesai!\")",
            "solution": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [5, 10, 15, 20]\n\nplt.plot(x, y)\n\nplt.title(\"Grafik Perkembangan\")\nplt.xlabel(\"Waktu\")\nplt.ylabel(\"Nilai\")\nplt.grid(True)\n\nplt.show()\n\nprint(\"Konfigurasi grafik selesai!\")",
            "hint": "Ganti garis bawah ____ dengan title, xlabel, ylabel, dan show.",
            "quiz": {
              "question": "Fungsi Matplotlib manakah yang digunakan untuk memberi nama label pada garis sumbu vertikal (tegak)?",
              "options": [
                "plt.xlabel()",
                "plt.ylabel()",
                "plt.title()",
                "plt.grid()"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Konfigurasi grafik selesai!\n",
                "description": "Melengkapi judul, label sumbu X/Y, dan plt.show()"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m2-l2",
            "title": "Visualisasi Grafik Garis - Line Chart (plot)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Grafik garis atau Line Chart dibentuk menggunakan perintah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.plot(x, y)</code>.</p>\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Grafik ini paling optimal diterapkan untuk memvisualisasikan kumpulan data berkelanjutan (kontinu) untuk melacak <strong>tren pergerakan nilai seiring waktu</strong> (deret waktu).</p>\n</div>",
            "codeExample": "import matplotlib.pyplot as plt\n\nbulan = [\"Jan\", \"Feb\", \"Mar\", \"Apr\"]\npenjualan = [10, 25, 18, 30]\n\nplt.plot(bulan, penjualan, marker='o', color='maroon')\nplt.title(\"Tren Penjualan Bulanan\")\nplt.show()",
            "initialCode": "import matplotlib.pyplot as plt\n\nhari = [\"Sen\", \"Sel\", \"Rab\", \"Kam\", \"Jum\"]\nsuhu = [28, 29, 31, 30, 32]\n\n# TODO: Gunakan fungsi plot() untuk membuat grafik garis\nplt.____(hari, suhu, color='blue')\nplt.title(\"Tren Suhu Harian\")\n\nplt.show()\nprint(\"Line chart berhasil dibuat!\")",
            "solution": "import matplotlib.pyplot as plt\n\nhari = [\"Sen\", \"Sel\", \"Rab\", \"Kam\", \"Jum\"]\nsuhu = [28, 29, 31, 30, 32]\n\nplt.plot(hari, suhu, color='blue')\nplt.title(\"Tren Suhu Harian\")\n\nplt.show()\nprint(\"Line chart berhasil dibuat!\")",
            "hint": "Ganti garis bawah ____ dengan plot.",
            "quiz": {
              "question": "Fungsi Matplotlib manakah yang digunakan untuk membuat grafik garis (line chart)?",
              "options": [
                "plt.bar()",
                "plt.plot()",
                "plt.pie()",
                "plt.scatter()"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Line chart berhasil dibuat!\n",
                "description": "Membuat Grafik Garis (Line Chart) dengan plt.plot()"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m2-l3",
            "title": "Visualisasi Grafik Batang - Bar Chart (bar)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Grafik batang atau Bar Chart dibuat menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.bar(kategori, nilai)</code>.</p>\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Plot pilar ini biasa diandalkan dalam skenario penganalisisan komparatif antar kategori (diskrit) untuk <strong>membandingkan kuantitas dari setiap kelompok variabel</strong>.</p>\n</div>",
            "codeExample": "import matplotlib.pyplot as plt\n\nproduk = [\"Laptop\", \"Mouse\", \"Keyboard\"]\nstok = [15, 50, 30]\n\nplt.bar(produk, stok, color='maroon')\nplt.title(\"Stok Produk\")\nplt.show()",
            "initialCode": "import matplotlib.pyplot as plt\n\nbuah = [\"Apel\", \"Jeruk\", \"Mangga\"]\njumlah = [40, 60, 35]\n\n# TODO: Gunakan fungsi bar() untuk membuat grafik batang\nplt.____(buah, jumlah, color='orange')\nplt.title(\"Penjualan Buah\")\n\nplt.show()\nprint(\"Bar chart berhasil dibuat!\")",
            "solution": "import matplotlib.pyplot as plt\n\nbuah = [\"Apel\", \"Jeruk\", \"Mangga\"]\njumlah = [40, 60, 35]\n\nplt.bar(buah, jumlah, color='orange')\nplt.title(\"Penjualan Buah\")\n\nplt.show()\nprint(\"Bar chart berhasil dibuat!\")",
            "hint": "Ganti garis bawah ____ dengan bar.",
            "quiz": {
              "question": "Kapan penggunaan grafik batang (bar chart) paling tepat diterapkan?",
              "options": [
                "Membandingkan kuantitas antar kategori diskrit",
                "Melacak tren kontinu deret waktu",
                "Membagi interval kuartil data",
                "Menghitung varians sampel"
              ],
              "correctAnswer": 0
            },
            "testCases": [
              {
                "expectedOutput": "Bar chart berhasil dibuat!\n",
                "description": "Membuat Grafik Batang (Bar Chart) dengan plt.bar()"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m2-l4",
            "title": "Visualisasi Grafik Lingkaran - Pie Chart (pie)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Grafik lingkaran atau Pie Chart dibuat menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.pie(nilai, labels=kategori)</code>.</p>\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Visualisasi sirkuler ini digunakan untuk menampilkan <strong>proporsi relatif atau persentase pecahan kategori</strong> dari suatu total nilai populasi.</p>\n</div>",
            "codeExample": "import matplotlib.pyplot as plt\n\nkategori = [\"Pendidikan\", \"Kesehatan\", \"Transportasi\"]\npengeluaran = [40, 35, 25]\n\nplt.pie(pengeluaran, labels=kategori, autopct='%1.1f%%')\nplt.title(\"Proporsi Pengeluaran\")\nplt.show()",
            "initialCode": "import matplotlib.pyplot as plt\n\nbahasa = [\"Python\", \"C\", \"Java\", \"JS\"]\nporsi = [40, 25, 20, 15]\n\n# TODO: Gunakan fungsi pie() untuk membuat grafik lingkaran\nplt.____(porsi, labels=bahasa, autopct='%1.1f%%')\nplt.title(\"Bahasa Pemrograman Populer\")\n\nplt.show()\nprint(\"Pie chart berhasil dibuat!\")",
            "solution": "import matplotlib.pyplot as plt\n\nbahasa = [\"Python\", \"C\", \"Java\", \"JS\"]\nporsi = [40, 25, 20, 15]\n\nplt.pie(porsi, labels=bahasa, autopct='%1.1f%%')\nplt.title(\"Bahasa Pemrograman Populer\")\n\nplt.show()\nprint(\"Pie chart berhasil dibuat!\")",
            "hint": "Ganti garis bawah ____ dengan pie.",
            "quiz": {
              "question": "Fungsi Matplotlib manakah yang digunakan untuk membuat grafik lingkaran (pie chart)?",
              "options": [
                "plt.circle()",
                "plt.pie()",
                "plt.bar()",
                "plt.scatter()"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Pie chart berhasil dibuat!\n",
                "description": "Membuat Grafik Lingkaran (Pie Chart) dengan plt.pie()"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m2-l5",
            "title": "Visualisasi Diagram Pencar - Scatter Plot (scatter)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Diagram pencar atau Scatter Plot dibangun menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.scatter(x, y)</code>.</p>\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Grafik ini menampilkan sebaran titik koordinat data mentah yang independen pada pertemuan sumbu X dan Y. Sangat berguna untuk membuktikan ada/tidaknya <strong>korelasi empiris antar dua variabel</strong>.</p>\n</div>",
            "codeExample": "import matplotlib.pyplot as plt\n\njam_belajar = [1, 2, 3, 4, 5]\nnilai_ujian = [55, 60, 75, 80, 95]\n\nplt.scatter(jam_belajar, nilai_ujian, color='blue', marker='o')\nplt.title(\"Hubungan Jam Belajar vs Nilai Ujian\")\nplt.xlabel(\"Jam Belajar\")\nplt.ylabel(\"Nilai Ujian\")\nplt.show()",
            "initialCode": "import matplotlib.pyplot as plt\n\nx = [2, 4, 6, 8, 10]\ny = [10, 25, 45, 65, 85]\n\n# TODO: Gunakan fungsi scatter() untuk membuat diagram pencar\nplt.____(x, y, color='green')\nplt.title(\"Scatter Plot Korelasi\")\n\nplt.show()\nprint(\"Scatter plot berhasil dibuat!\")",
            "solution": "import matplotlib.pyplot as plt\n\nx = [2, 4, 6, 8, 10]\ny = [10, 25, 45, 65, 85]\n\nplt.scatter(x, y, color='green')\nplt.title(\"Scatter Plot Korelasi\")\n\nplt.show()\nprint(\"Scatter plot berhasil dibuat!\")",
            "hint": "Ganti garis bawah ____ dengan scatter.",
            "quiz": {
              "question": "Fungsi visualisasi Matplotlib apakah yang paling tepat untuk membuktikan ada atau tidaknya korelasi antar dua variabel independen?",
              "options": [
                "plt.hist()",
                "plt.scatter()",
                "plt.bar()",
                "plt.pie()"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Scatter plot berhasil dibuat!\n",
                "description": "Membuat Diagram Pencar (Scatter Plot) dengan plt.scatter()"
              }
            ],
            "validationRules": []
          },
          {
            "id": "level-6-m2-l6",
            "title": "Distribusi Frekuensi dengan Histogram (hist)",
            "explanation": "<div class=\"space-y-4\">\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Histogram dibentuk menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">plt.hist(data, bins=n)</code>.</p>\n  <p class=\"mb-4 text-zinc-700 leading-relaxed\">Histogram menerapkan kalkulasi internal untuk meringkas distribusi himpunan numerik dengan cara menyortirnya dalam rentang selang tertentu (<em>bins/interval</em>) lalu menggambarkan frekuensi volumenya secara berurutan tanpa celah spasi antar batang.</p>\n</div>",
            "codeExample": "import matplotlib.pyplot as plt\n\nusia = [18, 19, 19, 20, 20, 20, 21, 21, 22, 23, 25, 25, 30]\n\nplt.hist(usia, bins=5, color='green', edgecolor='black')\nplt.title(\"Distribusi Usia Pengguna\")\nplt.xlabel(\"Rentang Usia\")\nplt.ylabel(\"Frekuensi\")\nplt.show()",
            "initialCode": "import matplotlib.pyplot as plt\n\nskor = [65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]\n\n# TODO: Gunakan fungsi hist() untuk membuat histogram\nplt.____(skor, bins=4, color='purple', edgecolor='black')\nplt.title(\"Distribusi Skor Ujian\")\n\nplt.show()\nprint(\"Histogram berhasil dibuat!\")",
            "solution": "import matplotlib.pyplot as plt\n\nskor = [65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95]\n\nplt.hist(skor, bins=4, color='purple', edgecolor='black')\nplt.title(\"Distribusi Skor Ujian\")\n\nplt.show()\nprint(\"Histogram berhasil dibuat!\")",
            "hint": "Ganti garis bawah ____ dengan hist.",
            "quiz": {
              "question": "Apakah nama interval selang pengelompokan rentang data numerik pada grafik Histogram?",
              "options": [
                "Labels",
                "Bins",
                "Grid",
                "Ticks"
              ],
              "correctAnswer": 1
            },
            "testCases": [
              {
                "expectedOutput": "Histogram berhasil dibuat!\n",
                "description": "Membuat Histogram sebaran frekuensi dengan plt.hist()"
              }
            ],
            "validationRules": []
          }
        ]
      }
    ]
  }
];
