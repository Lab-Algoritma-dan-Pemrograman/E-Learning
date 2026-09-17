{
  id: "p-level-5",
  title: "PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON",
  description: "Mempelajari percabangan (if, if-else, if-elif), perulangan (for, while), dan deklarasi fungsi (def, return) pada Python.",
  modules: [
    {
      id: "p5-m1",
      title: "Percabangan",
      lessons: [
        {
          id: "p5-l1",
          title: "Struktur Titik Dua dan Tab/Indentasi",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dengan bahasa pemrograman lain seperti C atau Java yang menggunakan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> untuk menandai blok kode, Python menggunakan <strong>titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>)</strong> dan <strong>indentasi</strong> (spasi atau tab) sebagai penanda blok kode. Ini membuat kode Python terlihat lebih bersih dan mudah dibaca.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Aturan indentasi di Python sangat ketat. Setiap blok kode yang berada di dalam struktur kontrol (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>) harus diindentasi secara <strong>konsisten</strong>, umumnya menggunakan <strong>4 spasi</strong>. Jika indentasi tidak konsisten, Python akan menghasilkan error bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">IndentationError</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut adalah aturan penting indentasi Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>Gunakan <strong>4 spasi</strong> untuk setiap level indentasi (standar PEP 8).</li>\n  <li>Jangan mencampur <strong>spasi dan tab</strong> dalam satu file.</li>\n  <li>Semua baris dalam satu blok harus memiliki indentasi yang <strong>sama persis</strong>.</li>\n  <li>Baris setelah tanda titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code> harus diindentasi lebih dalam.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 85\n\nif nilai &gt;= 75:\n    print(\"Selamat!\")\n    print(\"Anda lulus ujian.\")\n\nprint(\"Program selesai.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat!\nAnda lulus ujian.\nProgram selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "nilai = 85\n\nif nilai >= 75:\n    print(\"Selamat!\")\n    print(\"Anda lulus ujian.\")\n\nprint(\"Program selesai.\")",
          initialCode: "# Buatlah variabel umur berisi 20\n# Gunakan if dengan titik dua dan indentasi 4 spasi\n# Jika umur >= 17, cetak \"Anda sudah dewasa.\"\n# Di luar blok if, cetak \"Terima kasih.\"\n",
          solution: "umur = 20\n\nif umur >= 17:\n    print(\"Anda sudah dewasa.\")\n\nprint(\"Terima kasih.\")",
          hint: "Setelah baris if umur >= 17: tekan Enter lalu beri 4 spasi sebelum print. Baris print(\"Terima kasih.\") tidak perlu indentasi karena di luar blok if.",
          quiz: {
            question: "Apa yang terjadi jika indentasi dalam blok kode Python tidak konsisten?",
            options: [
              "Kode tetap berjalan normal tanpa masalah",
              "Python akan menghasilkan IndentationError",
              "Python otomatis memperbaiki indentasi",
              "Kode akan berjalan tapi hasilnya salah"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Anda sudah dewasa.\nTerima kasih.\n",
              description: "Cetak pesan dewasa dan terima kasih"
            }
          ],
          validationRules: [
            {
              pattern: "if\\s+.*:",
              message: "Gunakan struktur if dengan titik dua (:) di akhir kondisi",
              shouldExist: true
            },
            {
              pattern: "\\n    print",
              message: "Gunakan indentasi 4 spasi untuk blok kode di dalam if",
              shouldExist: true
            }
          ]
        },
        {
          id: "p5-l2",
          title: "Percabangan if",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> digunakan untuk mengeksekusi blok kode tertentu <strong>hanya jika kondisi bernilai True</strong>. Dalam Python, penulisan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> tidak memerlukan tanda kurung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">()</code> di sekitar kondisi (meskipun boleh digunakan), dan diakhiri dengan tanda titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur dasar percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> di Python adalah: tulis kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, diikuti kondisi, lalu titik dua. Baris-baris yang termasuk dalam blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> harus diindentasi 4 spasi. Jika kondisi bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, blok kode akan dijalankan; jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, blok akan dilewati.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan yang sering digunakan dalam kondisi antara lain:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Operator</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Keterangan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">==</td><td class=\"px-3 py-2 text-zinc-700\">Sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x == 10</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">!=</td><td class=\"px-3 py-2 text-zinc-700\">Tidak sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x != 5</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&gt;</td><td class=\"px-3 py-2 text-zinc-700\">Lebih besar</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &gt; 0</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&lt;</td><td class=\"px-3 py-2 text-zinc-700\">Lebih kecil</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &lt; 100</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&gt;=</td><td class=\"px-3 py-2 text-zinc-700\">Lebih besar atau sama</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &gt;= 17</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&lt;=</td><td class=\"px-3 py-2 text-zinc-700\">Lebih kecil atau sama</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &lt;= 50</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>suhu = 38\n\nif suhu &gt; 37:\n    print(\"Anda sedang demam.\")\n    print(\"Segera istirahat.\")\n\nprint(\"Semoga lekas sembuh.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Anda sedang demam.\nSegera istirahat.\nSemoga lekas sembuh.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "suhu = 38\n\nif suhu > 37:\n    print(\"Anda sedang demam.\")\n    print(\"Segera istirahat.\")\n\nprint(\"Semoga lekas sembuh.\")",
          initialCode: "# Buatlah variabel skor berisi 90\n# Jika skor >= 80, cetak \"Nilai Anda sangat baik!\"\n# Cetak \"Terus semangat belajar.\" di luar blok if\n",
          solution: "skor = 90\n\nif skor >= 80:\n    print(\"Nilai Anda sangat baik!\")\n\nprint(\"Terus semangat belajar.\")",
          hint: "Tulis if skor >= 80: lalu pada baris berikutnya beri 4 spasi sebelum print(\"Nilai Anda sangat baik!\").",
          quiz: {
            question: "Manakah penulisan percabangan if yang benar dalam Python?",
            options: [
              "if (skor >= 80) { print(\"Bagus\") }",
              "if skor >= 80:\n    print(\"Bagus\")",
              "if skor >= 80 then print(\"Bagus\")",
              "if skor >= 80; print(\"Bagus\")"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Nilai Anda sangat baik!\nTerus semangat belajar.\n",
              description: "Cetak pesan nilai baik dan semangat"
            }
          ],
          validationRules: [
            {
              pattern: "if\\s+skor\\s*>=\\s*80\\s*:",
              message: "Gunakan if skor >= 80: untuk memeriksa kondisi",
              shouldExist: true
            },
            {
              pattern: "print\\(.*Nilai Anda sangat baik.*\\)",
              message: "Cetak 'Nilai Anda sangat baik!' di dalam blok if",
              shouldExist: true
            }
          ]
        },
        {
          id: "p5-l3",
          title: "Percabangan if - else",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> memungkinkan program menjalankan <strong>satu dari dua blok kode</strong>. Jika kondisi pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> dijalankan. Jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> yang dijalankan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dalam Python, kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> harus ditulis <strong>sejajar</strong> (pada level indentasi yang sama) dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, dan diakhiri dengan tanda titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>. Blok kode di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> juga harus diindentasi 4 spasi, sama seperti blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> cocok digunakan ketika kita memiliki <strong>dua kemungkinan</strong> yang saling eksklusif, misalnya lulus atau tidak lulus, genap atau ganjil, dan sebagainya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka = 7\n\nif angka % 2 == 0:\n    print(f\"{angka} adalah bilangan genap.\")\nelse:\n    print(f\"{angka} adalah bilangan ganjil.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">7 adalah bilangan ganjil.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "angka = 7\n\nif angka % 2 == 0:\n    print(f\"{angka} adalah bilangan genap.\")\nelse:\n    print(f\"{angka} adalah bilangan ganjil.\")",
          initialCode: "# Buatlah variabel nilai berisi 60\n# Jika nilai >= 75, cetak \"Anda lulus.\"\n# Jika tidak (else), cetak \"Anda tidak lulus.\"\n",
          solution: "nilai = 60\n\nif nilai >= 75:\n    print(\"Anda lulus.\")\nelse:\n    print(\"Anda tidak lulus.\")",
          hint: "Tulis else: sejajar dengan if (tanpa indentasi), lalu indentasi 4 spasi untuk print di dalam blok else.",
          quiz: {
            question: "Pada struktur if-else di Python, bagaimana posisi penulisan kata kunci 'else'?",
            options: [
              "else harus diindentasi lebih dalam dari if",
              "else harus sejajar (seindentasi) dengan if dan diakhiri titik dua",
              "else boleh ditulis di mana saja tanpa aturan",
              "else harus ditulis di baris yang sama dengan if"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Anda tidak lulus.\n",
              description: "Cetak pesan tidak lulus karena nilai 60"
            }
          ],
          validationRules: [
            {
              pattern: "if\\s+nilai\\s*>=\\s*75\\s*:",
              message: "Gunakan if nilai >= 75: sebagai kondisi",
              shouldExist: true
            },
            {
              pattern: "else\\s*:",
              message: "Gunakan else: untuk menangani kondisi sebaliknya",
              shouldExist: true
            }
          ]
        },
        {
          id: "p5-l4",
          title: "Percabangan if - elif",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Ketika ada <strong>lebih dari dua kondisi</strong> yang perlu diperiksa, Python menyediakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> (singkatan dari <strong>else if</strong>). Berbeda dengan bahasa lain yang menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code>, Python menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> sebagai satu kata kunci tunggal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Anda bisa merangkai sebanyak mungkin <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> sesuai kebutuhan. Python akan memeriksa kondisi dari atas ke bawah, dan <strong>hanya blok pertama yang kondisinya bernilai True</strong> yang akan dijalankan. Blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> di bagian paling bawah bersifat opsional, berfungsi sebagai <em>catch-all</em> (penangkap semua kondisi yang tidak cocok).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut contoh penggunaan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-elif-else</code> untuk menentukan grade berdasarkan nilai:</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 72\n\nif nilai &gt;= 90:\n    grade = \"A\"\nelif nilai &gt;= 80:\n    grade = \"B\"\nelif nilai &gt;= 70:\n    grade = \"C\"\nelif nilai &gt;= 60:\n    grade = \"D\"\nelse:\n    grade = \"E\"\n\nprint(f\"Grade Anda: {grade}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Grade Anda: C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "nilai = 72\n\nif nilai >= 90:\n    grade = \"A\"\nelif nilai >= 80:\n    grade = \"B\"\nelif nilai >= 70:\n    grade = \"C\"\nelif nilai >= 60:\n    grade = \"D\"\nelse:\n    grade = \"E\"\n\nprint(f\"Grade Anda: {grade}\")",
          initialCode: "# Buatlah variabel suhu berisi 35\n# Jika suhu > 37, cetak \"Demam\"\n# Elif suhu >= 36, cetak \"Normal\"\n# Elif suhu >= 35, cetak \"Sedikit rendah\"\n# Else, cetak \"Hipotermia\"\n",
          solution: "suhu = 35\n\nif suhu > 37:\n    print(\"Demam\")\nelif suhu >= 36:\n    print(\"Normal\")\nelif suhu >= 35:\n    print(\"Sedikit rendah\")\nelse:\n    print(\"Hipotermia\")",
          hint: "Gunakan elif (bukan else if) untuk setiap kondisi tambahan. Pastikan elif dan else sejajar dengan if.",
          quiz: {
            question: "Dalam Python, bagaimana cara menulis percabangan 'else if'?",
            options: [
              "else if kondisi:",
              "elseif kondisi:",
              "elif kondisi:",
              "elsif kondisi:"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Sedikit rendah\n",
              description: "Cetak Sedikit rendah karena suhu 35"
            }
          ],
          validationRules: [
            {
              pattern: "elif\\s+",
              message: "Gunakan kata kunci elif untuk kondisi tambahan",
              shouldExist: true
            },
            {
              pattern: "else\\s*:",
              message: "Gunakan else: sebagai penangkap kondisi terakhir",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p5-m2",
      title: "Perulangan",
      lessons: [
        {
          id: "p5-l5",
          title: "Perulangan for dan Fungsi range()",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> di Python digunakan untuk <strong>mengiterasi</strong> (mengulang) elemen-elemen dalam sebuah <em>iterable</em> seperti list, string, atau objek yang dihasilkan oleh fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code>. Sintaksnya menggunakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> diikuti variabel, kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">in</code>, lalu iterable, dan diakhiri titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code> sangat sering digunakan bersama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> untuk menghasilkan deretan angka. Fungsi ini memiliki beberapa variasi penggunaan:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Bentuk</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Keterangan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh Hasil</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(stop)</td><td class=\"px-3 py-2 text-zinc-700\">Mulai dari 0 sampai stop-1</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(5) → 0,1,2,3,4</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(start, stop)</td><td class=\"px-3 py-2 text-zinc-700\">Mulai dari start sampai stop-1</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(2,6) → 2,3,4,5</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(start, stop, step)</td><td class=\"px-3 py-2 text-zinc-700\">Mulai dari start, lompat sebesar step</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(1,10,2) → 1,3,5,7,9</td></tr></tbody></table>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code>, perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> juga dapat digunakan untuk mengiterasi elemen-elemen dalam list atau karakter-karakter dalam string secara langsung.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Menggunakan range(stop)\nfor i in range(5):\n    print(f\"Angka: {i}\")\n\n# Mengiterasi list\nbuah = [\"apel\", \"jeruk\", \"mangga\"]\nfor item in buah:\n    print(f\"Buah: {item}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 0\nAngka: 1\nAngka: 2\nAngka: 3\nAngka: 4\nBuah: apel\nBuah: jeruk\nBuah: mangga</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "# Menggunakan range(stop)\nfor i in range(5):\n    print(f\"Angka: {i}\")\n\n# Mengiterasi list\nbuah = [\"apel\", \"jeruk\", \"mangga\"]\nfor item in buah:\n    print(f\"Buah: {item}\")",
          initialCode: "# Gunakan for dan range() untuk mencetak angka 1 sampai 5\n# Format output: \"Nomor: 1\", \"Nomor: 2\", dst.\n",
          solution: "for i in range(1, 6):\n    print(f\"Nomor: {i}\")",
          hint: "Gunakan range(1, 6) agar menghasilkan angka 1 sampai 5. Ingat, batas akhir range tidak termasuk.",
          quiz: {
            question: "Apa hasil dari range(2, 8, 2)?",
            options: [
              "2, 3, 4, 5, 6, 7, 8",
              "2, 4, 6",
              "2, 4, 6, 8",
              "0, 2, 4, 6"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Nomor: 1\nNomor: 2\nNomor: 3\nNomor: 4\nNomor: 5\n",
              description: "Cetak Nomor 1 sampai 5"
            }
          ],
          validationRules: [
            {
              pattern: "for\\s+\\w+\\s+in\\s+range\\(",
              message: "Gunakan for dengan range() untuk perulangan",
              shouldExist: true
            },
            {
              pattern: "range\\(1\\s*,\\s*6\\)",
              message: "Gunakan range(1, 6) untuk menghasilkan angka 1 sampai 5",
              shouldExist: true
            }
          ]
        },
        {
          id: "p5-l6",
          title: "Perulangan while",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> digunakan untuk mengulang blok kode <strong>selama kondisi bernilai True</strong>. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> yang biasanya digunakan saat jumlah pengulangan diketahui, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> cocok digunakan saat jumlah pengulangan <strong>belum diketahui</strong> dan bergantung pada kondisi tertentu.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hal penting dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> adalah pastikan ada mekanisme yang membuat kondisi menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code> di suatu titik, misalnya dengan mengubah nilai variabel atau menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>. Jika tidak, perulangan akan berjalan <strong>tanpa henti</strong> (infinite loop).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while-else</code>, di mana blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> akan dijalankan saat kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> menjadi False secara alami (bukan karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>). Berikut beberapa kata kunci penting:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>: Menghentikan perulangan secara paksa.</li>\n  <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code>: Melewati iterasi saat ini dan lanjut ke iterasi berikutnya.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>hitung = 1\n\nwhile hitung &lt;= 5:\n    print(f\"Hitungan ke-{hitung}\")\n    hitung += 1\n\nprint(\"Selesai menghitung.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Hitungan ke-1\nHitungan ke-2\nHitungan ke-3\nHitungan ke-4\nHitungan ke-5\nSelesai menghitung.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "hitung = 1\n\nwhile hitung <= 5:\n    print(f\"Hitungan ke-{hitung}\")\n    hitung += 1\n\nprint(\"Selesai menghitung.\")",
          initialCode: "# Buatlah variabel angka berisi 3\n# Gunakan while untuk mencetak \"Angka: 3\", \"Angka: 2\", \"Angka: 1\" (hitung mundur)\n# Kurangi angka sebesar 1 setiap iterasi\n# Setelah loop, cetak \"Selesai!\"\n",
          solution: "angka = 3\n\nwhile angka >= 1:\n    print(f\"Angka: {angka}\")\n    angka -= 1\n\nprint(\"Selesai!\")",
          hint: "Gunakan while angka >= 1: lalu di dalam loop cetak angka dan kurangi nilainya dengan angka -= 1.",
          quiz: {
            question: "Apa yang terjadi jika kondisi while tidak pernah menjadi False?",
            options: [
              "Program akan berhenti otomatis setelah 100 iterasi",
              "Program menghasilkan error SyntaxError",
              "Terjadi infinite loop (perulangan tanpa henti)",
              "Python mengubah kondisi menjadi False secara otomatis"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Angka: 3\nAngka: 2\nAngka: 1\nSelesai!\n",
              description: "Hitung mundur dari 3 ke 1 lalu cetak Selesai"
            }
          ],
          validationRules: [
            {
              pattern: "while\\s+.*:",
              message: "Gunakan while dengan kondisi yang sesuai",
              shouldExist: true
            },
            {
              pattern: "angka\\s*-=\\s*1|angka\\s*=\\s*angka\\s*-\\s*1",
              message: "Kurangi variabel angka di setiap iterasi untuk menghindari infinite loop",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p5-m3",
      title: "Deklarasi Fungsi",
      lessons: [
        {
          id: "p5-l7",
          title: "Penggunaan def dan Parameter",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi dalam Python dideklarasikan menggunakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>, diikuti nama fungsi, tanda kurung yang berisi parameter (jika ada), dan diakhiri titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>. Fungsi membantu kita <strong>mengelompokkan kode</strong> yang melakukan tugas tertentu agar bisa digunakan ulang (<em>reusable</em>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Parameter adalah variabel yang diterima oleh fungsi saat dipanggil. Python mendukung <strong>parameter default</strong>, yaitu parameter yang memiliki nilai bawaan sehingga tidak wajib diisi saat pemanggilan. Nama fungsi sebaiknya menggunakan huruf kecil dan pemisah garis bawah (<em>snake_case</em>), misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hitung_luas</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut aturan penting tentang fungsi Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>Fungsi harus <strong>didefinisikan sebelum dipanggil</strong>.</li>\n  <li>Parameter dengan nilai default harus ditulis <strong>setelah</strong> parameter tanpa default.</li>\n  <li>Isi/badan fungsi harus <strong>diindentasi</strong> 4 spasi.</li>\n  <li>Fungsi dipanggil dengan menuliskan <strong>nama_fungsi(argumen)</strong>.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def sapa(nama, sapaan=\"Halo\"):\n    print(f\"{sapaan}, {nama}!\")\n\nsapa(\"Budi\")\nsapa(\"Ani\", \"Selamat pagi\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Budi!\nSelamat pagi, Ani!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "def sapa(nama, sapaan=\"Halo\"):\n    print(f\"{sapaan}, {nama}!\")\n\nsapa(\"Budi\")\nsapa(\"Ani\", \"Selamat pagi\")",
          initialCode: "# Buatlah fungsi bernama perkenalan yang menerima parameter nama dan umur\n# Di dalam fungsi, cetak \"Nama saya [nama], umur [umur] tahun.\"\n# Panggil fungsi dengan nama=\"Andi\" dan umur=20\n",
          solution: "def perkenalan(nama, umur):\n    print(f\"Nama saya {nama}, umur {umur} tahun.\")\n\nperkenalan(\"Andi\", 20)",
          hint: "Gunakan def perkenalan(nama, umur): lalu di bawahnya tulis print dengan f-string. Panggil fungsi di luar blok def.",
          quiz: {
            question: "Bagaimana cara mendeklarasikan fungsi dengan parameter default di Python?",
            options: [
              "def fungsi(a, b := 10):",
              "def fungsi(a, b = 10):",
              "def fungsi(a, default b = 10):",
              "def fungsi(a, b == 10):"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Nama saya Andi, umur 20 tahun.\n",
              description: "Cetak perkenalan Andi umur 20"
            }
          ],
          validationRules: [
            {
              pattern: "def\\s+perkenalan\\s*\\(",
              message: "Deklarasikan fungsi dengan def perkenalan(nama, umur):",
              shouldExist: true
            },
            {
              pattern: "perkenalan\\s*\\(",
              message: "Panggil fungsi perkenalan() dengan argumen yang sesuai",
              shouldExist: true
            }
          ]
        },
        {
          id: "p5-l8",
          title: "Pengembalian Nilai dengan return",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> digunakan untuk <strong>mengembalikan nilai</strong> dari sebuah fungsi ke pemanggil. Ketika Python menemukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code>, eksekusi fungsi langsung berhenti dan nilai yang disebutkan akan dikirim kembali ke tempat fungsi dipanggil.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Jika fungsi tidak memiliki <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> atau hanya menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> tanpa nilai, fungsi tersebut mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code> secara default. Python juga mendukung <strong>pengembalian beberapa nilai</strong> sekaligus menggunakan koma, yang secara otomatis dikemas menjadi <em>tuple</em>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perbedaan penting antara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code>:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Aspek</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">print()</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">return</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Fungsi</td><td class=\"px-3 py-2 text-zinc-700\">Menampilkan ke layar</td><td class=\"px-3 py-2 text-zinc-700\">Mengirim nilai ke pemanggil</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Nilai</td><td class=\"px-3 py-2 text-zinc-700\">Tidak menghasilkan nilai</td><td class=\"px-3 py-2 text-zinc-700\">Menghasilkan nilai yang bisa disimpan</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Eksekusi</td><td class=\"px-3 py-2 text-zinc-700\">Fungsi tetap berjalan</td><td class=\"px-3 py-2 text-zinc-700\">Fungsi langsung berhenti</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def hitung_luas(panjang, lebar):\n    luas = panjang * lebar\n    return luas\n\ndef info_persegi(sisi):\n    luas = sisi * sisi\n    keliling = 4 * sisi\n    return luas, keliling\n\nhasil = hitung_luas(5, 3)\nprint(f\"Luas persegi panjang: {hasil}\")\n\nl, k = info_persegi(4)\nprint(f\"Luas: {l}, Keliling: {k}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Luas persegi panjang: 15\nLuas: 16, Keliling: 16</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "def hitung_luas(panjang, lebar):\n    luas = panjang * lebar\n    return luas\n\ndef info_persegi(sisi):\n    luas = sisi * sisi\n    keliling = 4 * sisi\n    return luas, keliling\n\nhasil = hitung_luas(5, 3)\nprint(f\"Luas persegi panjang: {hasil}\")\n\nl, k = info_persegi(4)\nprint(f\"Luas: {l}, Keliling: {k}\")",
          initialCode: "# Buatlah fungsi tambah yang menerima parameter a dan b\n# Fungsi mengembalikan hasil penjumlahan a + b menggunakan return\n# Simpan hasil pemanggilan tambah(10, 25) ke variabel hasil\n# Cetak \"Hasil: [hasil]\"\n",
          solution: "def tambah(a, b):\n    return a + b\n\nhasil = tambah(10, 25)\nprint(f\"Hasil: {hasil}\")",
          hint: "Di dalam fungsi tambah, gunakan return a + b untuk mengembalikan nilai. Simpan hasilnya ke variabel dengan hasil = tambah(10, 25).",
          quiz: {
            question: "Apa yang dikembalikan oleh fungsi Python yang tidak memiliki statement return?",
            options: [
              "0",
              "False",
              "None",
              "Error karena fungsi harus punya return"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Hasil: 35\n",
              description: "Cetak hasil penjumlahan 10 + 25"
            }
          ],
          validationRules: [
            {
              pattern: "def\\s+tambah\\s*\\(\\s*a\\s*,\\s*b\\s*\\)\\s*:",
              message: "Deklarasikan fungsi def tambah(a, b):",
              shouldExist: true
            },
            {
              pattern: "return\\s+a\\s*\\+\\s*b",
              message: "Gunakan return a + b untuk mengembalikan hasil penjumlahan",
              shouldExist: true
            }
          ]
        }
      ]
    }
  ]
}
