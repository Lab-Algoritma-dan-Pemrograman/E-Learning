{
  id: "c-level-2",
  title: "STRUKTUR KONTROL DALAM BAHASA C",
  description: "Mengatur alur kontrol program menggunakan percabangan (if, if-else, switch-case), perulangan (while, do-while, for), dan peloncatan (goto, break, continue).",
  modules: [
    {
      id: "c2-m1",
      title: "Percabangan",
      lessons: [
        {
          id: "c2-l1",
          title: "Percabangan if",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> adalah struktur kontrol paling dasar dalam bahasa C yang memungkinkan program <strong>mengeksekusi blok kode tertentu hanya jika suatu kondisi bernilai benar (true)</strong>. Dalam bahasa C, nilai <strong>0</strong> dianggap <em>false</em> dan nilai <strong>selain 0</strong> dianggap <em>true</em>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks dasar percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> adalah: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (kondisi) { pernyataan; }</code>. Jika kondisi bernilai benar, maka blok kode di dalam kurung kurawal akan dieksekusi. Jika salah, blok kode tersebut akan dilewati.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Perhatian:</strong> Kesalahan umum pemula adalah menambahkan titik koma <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code> tepat setelah kondisi if, seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (x &gt; 0);</code>. Ini menyebabkan blok kode di bawahnya <strong>selalu dieksekusi</strong> tanpa mempedulikan kondisi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 80;\n\n    if (nilai &gt;= 75) {\n        printf(\"Selamat! Anda lulus.\\n\");\n    }\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat! Anda lulus.\nProgram selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int nilai = 80;\n\n    if (nilai >= 75) {\n        printf(\"Selamat! Anda lulus.\\n\");\n    }\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int umur = 18;\n\n    // TODO: Buat percabangan if untuk memeriksa apakah umur >= 17\n    // Jika ya, cetak \"Anda boleh membuat SIM.\"\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int umur = 18;\n\n    if (umur >= 17) {\n        printf(\"Anda boleh membuat SIM.\\n\");\n    }\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}",
          hint: "Gunakan if (umur >= 17) lalu di dalam kurung kurawal tuliskan printf untuk mencetak pesan.",
          quiz: {
            question: "Apa yang terjadi jika kita menulis if (x > 5); { printf(\"Besar\"); } ?",
            options: [
              "printf hanya dijalankan jika x > 5",
              "Program error saat kompilasi",
              "printf selalu dijalankan tanpa mempedulikan kondisi karena titik koma setelah if",
              "Program berhenti karena infinite loop"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Anda boleh membuat SIM.\nProgram selesai.\n",
              description: "Cetak pesan ketika umur >= 17"
            }
          ],
          validationRules: [
            {
              pattern: "if\\s*\\(\\s*umur\\s*>=\\s*17\\s*\\)",
              message: "Gunakan if (umur >= 17) untuk memeriksa kondisi umur",
              shouldExist: true
            },
            {
              pattern: "printf\\s*\\(\\s*\"Anda boleh membuat SIM",
              message: "Cetak pesan \"Anda boleh membuat SIM.\" di dalam blok if",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l2",
          title: "Percabangan if - else",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> digunakan ketika program harus memilih antara <strong>dua jalur eksekusi</strong>. Jika kondisi pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bernilai benar, blok kode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> dijalankan. Jika salah, blok kode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> yang dijalankan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sangat penting untuk selalu menggunakan <strong>kurung kurawal</strong> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code> untuk menandai blok kode, meskipun hanya berisi satu baris pernyataan. Hal ini menghindari bug yang sulit dilacak dan membuat kode lebih mudah dibaca.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> juga bisa disarangkan (<em>nested</em>), yaitu menempatkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> di dalam blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> lain untuk menangani logika yang lebih kompleks.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int angka = 7;\n\n    if (angka % 2 == 0) {\n        printf(\"%d adalah bilangan genap.\\n\", angka);\n    } else {\n        printf(\"%d adalah bilangan ganjil.\\n\", angka);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">7 adalah bilangan ganjil.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int angka = 7;\n\n    if (angka % 2 == 0) {\n        printf(\"%d adalah bilangan genap.\\n\", angka);\n    } else {\n        printf(\"%d adalah bilangan ganjil.\\n\", angka);\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int suhu = 30;\n\n    // TODO: Buat percabangan if-else\n    // Jika suhu > 35, cetak \"Cuaca sangat panas!\"\n    // Jika tidak, cetak \"Cuaca normal.\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int suhu = 30;\n\n    if (suhu > 35) {\n        printf(\"Cuaca sangat panas!\\n\");\n    } else {\n        printf(\"Cuaca normal.\\n\");\n    }\n\n    return 0;\n}",
          hint: "Gunakan if (suhu > 35) untuk kondisi panas, dan else untuk kondisi normal.",
          quiz: {
            question: "Pada percabangan if-else, kapan blok else dieksekusi?",
            options: [
              "Ketika kondisi if bernilai benar (true)",
              "Ketika kondisi if bernilai salah (false)",
              "Blok else selalu dieksekusi setelah blok if",
              "Blok else dieksekusi bersamaan dengan blok if"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Cuaca normal.\n",
              description: "Cetak 'Cuaca normal.' ketika suhu = 30 (tidak lebih dari 35)"
            }
          ],
          validationRules: [
            {
              pattern: "if\\s*\\(\\s*suhu\\s*>\\s*35\\s*\\)",
              message: "Gunakan if (suhu > 35) untuk memeriksa kondisi suhu",
              shouldExist: true
            },
            {
              pattern: "\\}\\s*else\\s*\\{",
              message: "Gunakan blok else untuk menangani kondisi sebaliknya",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l3",
          title: "Percabangan if - else if",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if - else if</code> digunakan ketika terdapat <strong>lebih dari dua kemungkinan jalur</strong> eksekusi. Struktur ini memungkinkan kita memeriksa beberapa kondisi secara berurutan dari atas ke bawah.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Urutan evaluasi sangat penting: kondisi diperiksa <strong>dari atas ke bawah</strong>, dan begitu satu kondisi bernilai benar, blok kode terkait dijalankan lalu seluruh rantai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else if</code> dilewati. Oleh karena itu, letakkan kondisi yang <strong>paling spesifik/ketat di bagian atas</strong> agar tidak tertimpa oleh kondisi yang lebih umum.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> di akhir bersifat opsional dan berfungsi sebagai penangkap kondisi yang tidak terpenuhi oleh satupun <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> sebelumnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 72;\n\n    if (nilai &gt;= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (nilai &gt;= 80) {\n        printf(\"Grade: B\\n\");\n    } else if (nilai &gt;= 70) {\n        printf(\"Grade: C\\n\");\n    } else {\n        printf(\"Grade: D\\n\");\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Grade: C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int nilai = 72;\n\n    if (nilai >= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (nilai >= 80) {\n        printf(\"Grade: B\\n\");\n    } else if (nilai >= 70) {\n        printf(\"Grade: C\\n\");\n    } else {\n        printf(\"Grade: D\\n\");\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int kecepatan = 120;\n\n    // TODO: Buat percabangan if - else if - else\n    // Jika kecepatan > 100, cetak \"Terlalu cepat! Kurangi kecepatan.\"\n    // Jika kecepatan >= 60, cetak \"Kecepatan normal.\"\n    // Jika tidak (di bawah 60), cetak \"Terlalu lambat.\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int kecepatan = 120;\n\n    if (kecepatan > 100) {\n        printf(\"Terlalu cepat! Kurangi kecepatan.\\n\");\n    } else if (kecepatan >= 60) {\n        printf(\"Kecepatan normal.\\n\");\n    } else {\n        printf(\"Terlalu lambat.\\n\");\n    }\n\n    return 0;\n}",
          hint: "Mulai dengan if (kecepatan > 100), lalu else if (kecepatan >= 60), dan terakhir else.",
          quiz: {
            question: "Pada struktur if - else if, apa yang terjadi jika kondisi pertama sudah bernilai benar?",
            options: [
              "Semua blok else if dan else tetap diperiksa",
              "Hanya blok if yang dijalankan, sisanya dilewati",
              "Program menampilkan error karena ada banyak kondisi",
              "Blok else selalu dijalankan sebagai tambahan"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Terlalu cepat! Kurangi kecepatan.\n",
              description: "Cetak pesan terlalu cepat ketika kecepatan = 120"
            }
          ],
          validationRules: [
            {
              pattern: "if\\s*\\(\\s*kecepatan\\s*>\\s*100\\s*\\)",
              message: "Gunakan if (kecepatan > 100) sebagai kondisi pertama",
              shouldExist: true
            },
            {
              pattern: "else\\s+if\\s*\\(\\s*kecepatan\\s*>=\\s*60\\s*\\)",
              message: "Gunakan else if (kecepatan >= 60) sebagai kondisi kedua",
              shouldExist: true
            },
            {
              pattern: "\\}\\s*else\\s*\\{",
              message: "Tambahkan blok else sebagai penangkap kondisi terakhir",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l4",
          title: "Percabangan switch case",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch-case</code> digunakan untuk memilih salah satu dari beberapa blok kode berdasarkan <strong>nilai konstan</strong> dari suatu ekspresi. Struktur ini sangat cocok ketika kita ingin membandingkan satu variabel dengan <strong>banyak nilai tetap</strong> (integer atau karakter).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">case</code> harus diakhiri dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break;</code> untuk menghentikan eksekusi. Tanpa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>, program akan mengalami <strong>fallthrough</strong>, yaitu mengeksekusi case berikutnya secara berurutan meskipun nilai tidak cocok.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">default</code> berfungsi seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> pada if-else, yaitu dijalankan ketika <strong>tidak ada case yang cocok</strong>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int hari = 3;\n\n    switch (hari) {\n        case 1:\n            printf(\"Senin\\n\");\n            break;\n        case 2:\n            printf(\"Selasa\\n\");\n            break;\n        case 3:\n            printf(\"Rabu\\n\");\n            break;\n        default:\n            printf(\"Hari tidak valid\\n\");\n            break;\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Rabu</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int hari = 3;\n\n    switch (hari) {\n        case 1:\n            printf(\"Senin\\n\");\n            break;\n        case 2:\n            printf(\"Selasa\\n\");\n            break;\n        case 3:\n            printf(\"Rabu\\n\");\n            break;\n        default:\n            printf(\"Hari tidak valid\\n\");\n            break;\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int bulan = 2;\n\n    // TODO: Buat switch-case untuk menampilkan nama bulan\n    // case 1: cetak \"Januari\"\n    // case 2: cetak \"Februari\"\n    // case 3: cetak \"Maret\"\n    // default: cetak \"Bulan tidak valid\"\n    // Jangan lupa break di setiap case!\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int bulan = 2;\n\n    switch (bulan) {\n        case 1:\n            printf(\"Januari\\n\");\n            break;\n        case 2:\n            printf(\"Februari\\n\");\n            break;\n        case 3:\n            printf(\"Maret\\n\");\n            break;\n        default:\n            printf(\"Bulan tidak valid\\n\");\n            break;\n    }\n\n    return 0;\n}",
          hint: "Gunakan switch (bulan) lalu tulis case 1:, case 2:, case 3:, dan default: dengan break di setiap case.",
          quiz: {
            question: "Apa yang terjadi jika break dihilangkan dari sebuah case di dalam switch?",
            options: [
              "Program error saat kompilasi",
              "Hanya case yang cocok yang dieksekusi",
              "Terjadi fallthrough: eksekusi berlanjut ke case berikutnya tanpa pengecekan",
              "Program langsung loncat ke blok default"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Februari\n",
              description: "Cetak nama bulan Februari ketika bulan = 2"
            }
          ],
          validationRules: [
            {
              pattern: "switch\\s*\\(\\s*bulan\\s*\\)",
              message: "Gunakan switch (bulan) untuk memulai percabangan switch",
              shouldExist: true
            },
            {
              pattern: "case\\s+2\\s*:",
              message: "Tambahkan case 2: untuk menangani bulan Februari",
              shouldExist: true
            },
            {
              pattern: "break\\s*;",
              message: "Jangan lupa tambahkan break; di setiap case",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "c2-m2",
      title: "Perulangan",
      lessons: [
        {
          id: "c2-l5",
          title: "Perulangan while",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> digunakan untuk mengeksekusi blok kode secara <strong>berulang selama kondisi bernilai benar</strong>. Kondisi diperiksa <strong>sebelum</strong> setiap iterasi, sehingga jika kondisi awal sudah bernilai salah, blok kode <strong>tidak akan pernah dieksekusi</strong> sama sekali.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks dasar: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while (kondisi) { pernyataan; }</code>. Pastikan di dalam blok perulangan terdapat pernyataan yang <strong>mengubah nilai kondisi</strong> agar perulangan bisa berhenti. Jika tidak, akan terjadi <strong>infinite loop</strong> (perulangan tak terhingga) yang membuat program tidak pernah selesai.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> cocok digunakan ketika kita <strong>tidak tahu pasti berapa kali perulangan akan dilakukan</strong>, melainkan bergantung pada suatu kondisi tertentu.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int i = 1;\n\n    while (i &lt;= 5) {\n        printf(\"Iterasi ke-%d\\n\", i);\n        i++;\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Iterasi ke-1\nIterasi ke-2\nIterasi ke-3\nIterasi ke-4\nIterasi ke-5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\n    while (i <= 5) {\n        printf(\"Iterasi ke-%d\\n\", i);\n        i++;\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int hitung = 1;\n\n    // TODO: Buat perulangan while yang mencetak angka 1 sampai 3\n    // Format: \"Angka: 1\", \"Angka: 2\", \"Angka: 3\"\n    // Jangan lupa increment variabel hitung!\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int hitung = 1;\n\n    while (hitung <= 3) {\n        printf(\"Angka: %d\\n\", hitung);\n        hitung++;\n    }\n\n    return 0;\n}",
          hint: "Gunakan while (hitung <= 3) dan di dalam loop cetak angka lalu tambahkan hitung++ untuk increment.",
          quiz: {
            question: "Apa yang terjadi jika kondisi while sudah bernilai false sejak awal?",
            options: [
              "Blok kode dijalankan tepat satu kali",
              "Blok kode tidak akan pernah dieksekusi",
              "Program mengalami error karena kondisi tidak valid",
              "Perulangan berjalan tanpa batas"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Angka: 1\nAngka: 2\nAngka: 3\n",
              description: "Cetak angka 1 sampai 3 menggunakan while"
            }
          ],
          validationRules: [
            {
              pattern: "while\\s*\\(\\s*hitung\\s*<=\\s*3\\s*\\)",
              message: "Gunakan while (hitung <= 3) sebagai kondisi perulangan",
              shouldExist: true
            },
            {
              pattern: "hitung\\s*\\+\\+|hitung\\s*\\+=\\s*1|hitung\\s*=\\s*hitung\\s*\\+\\s*1",
              message: "Tambahkan hitung++ di dalam loop untuk menghindari infinite loop",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l6",
          title: "Perulangan do while",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> mirip dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, namun dengan perbedaan utama: blok kode dieksekusi <strong>terlebih dahulu</strong>, baru kemudian kondisi diperiksa. Ini menjamin bahwa blok kode akan <strong>dijalankan minimal satu kali</strong>, meskipun kondisi sudah bernilai salah sejak awal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do { pernyataan; } while (kondisi);</code>. Perhatikan bahwa setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while (kondisi)</code> harus diakhiri dengan <strong>titik koma</strong> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code>. Lupa menambahkan titik koma ini adalah kesalahan umum yang menyebabkan error kompilasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> sangat berguna untuk skenario seperti menu interaktif, di mana kita ingin menampilkan menu <strong>setidaknya sekali</strong> sebelum memeriksa apakah pengguna ingin melanjutkan.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int angka = 1;\n\n    do {\n        printf(\"Angka: %d\\n\", angka);\n        angka++;\n    } while (angka &lt;= 3);\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int angka = 1;\n\n    do {\n        printf(\"Angka: %d\\n\", angka);\n        angka++;\n    } while (angka <= 3);\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // TODO: Buat perulangan do-while untuk hitung mundur dari 5 ke 1\n    // Format: \"Hitung mundur: 5\", \"Hitung mundur: 4\", ... \"Hitung mundur: 1\"\n    // Jangan lupa titik koma setelah while!\n\n    printf(\"Selesai!\\n\");\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    do {\n        printf(\"Hitung mundur: %d\\n\", n);\n        n--;\n    } while (n >= 1);\n\n    printf(\"Selesai!\\n\");\n    return 0;\n}",
          hint: "Gunakan do { ... } while (n >= 1); dan jangan lupa n-- di dalam blok do untuk mengurangi nilai n.",
          quiz: {
            question: "Apa perbedaan utama antara while dan do-while?",
            options: [
              "while lebih cepat dari do-while",
              "do-while menjamin eksekusi minimal satu kali karena kondisi diperiksa setelah blok kode",
              "do-while tidak memerlukan kondisi",
              "while hanya bisa digunakan untuk bilangan bulat"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Hitung mundur: 5\nHitung mundur: 4\nHitung mundur: 3\nHitung mundur: 2\nHitung mundur: 1\nSelesai!\n",
              description: "Cetak hitung mundur dari 5 ke 1 menggunakan do-while"
            }
          ],
          validationRules: [
            {
              pattern: "do\\s*\\{",
              message: "Mulai dengan kata kunci do diikuti kurung kurawal buka",
              shouldExist: true
            },
            {
              pattern: "\\}\\s*while\\s*\\(.*\\)\\s*;",
              message: "Akhiri dengan } while (kondisi); — jangan lupa titik koma di akhir",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l7",
          title: "Perulangan for",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> adalah perulangan yang paling sering digunakan ketika kita <strong>sudah mengetahui berapa kali perulangan akan dilakukan</strong>. Perulangan ini menggabungkan tiga komponen penting dalam satu baris: inisialisasi, kondisi, dan langkah perubahan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for (inisialisasi; kondisi; step) { pernyataan; }</code>. Komponen pertama (<strong>inisialisasi</strong>) dijalankan sekali di awal. Komponen kedua (<strong>kondisi</strong>) diperiksa sebelum setiap iterasi. Komponen ketiga (<strong>step/increment</strong>) dijalankan setelah setiap iterasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> juga bisa disarangkan (<em>nested for loop</em>) untuk membuat pola seperti bintang, tabel perkalian, atau mengolah data multi-dimensi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 5; i++) {\n        printf(\"Perulangan ke-%d\\n\", i);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Perulangan ke-1\nPerulangan ke-2\nPerulangan ke-3\nPerulangan ke-4\nPerulangan ke-5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf(\"Perulangan ke-%d\\n\", i);\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // TODO: Buat perulangan for untuk mencetak bilangan genap dari 2 sampai 10\n    // Format: \"Genap: 2\", \"Genap: 4\", ... \"Genap: 10\"\n    // Gunakan for (int i = 2; ...; i += 2)\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 2; i <= 10; i += 2) {\n        printf(\"Genap: %d\\n\", i);\n    }\n\n    return 0;\n}",
          hint: "Gunakan for (int i = 2; i <= 10; i += 2) agar i melompat 2 langkah setiap iterasi.",
          quiz: {
            question: "Pada for (int i = 0; i < 5; i++), berapa kali perulangan dijalankan?",
            options: [
              "4 kali (i = 0, 1, 2, 3)",
              "5 kali (i = 0, 1, 2, 3, 4)",
              "6 kali (i = 0, 1, 2, 3, 4, 5)",
              "Tidak terbatas karena i selalu kurang dari 5"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Genap: 2\nGenap: 4\nGenap: 6\nGenap: 8\nGenap: 10\n",
              description: "Cetak bilangan genap dari 2 sampai 10"
            }
          ],
          validationRules: [
            {
              pattern: "for\\s*\\(",
              message: "Gunakan perulangan for untuk menyelesaikan latihan ini",
              shouldExist: true
            },
            {
              pattern: "i\\s*\\+=\\s*2|i\\s*=\\s*i\\s*\\+\\s*2",
              message: "Gunakan i += 2 sebagai step agar melompat ke bilangan genap berikutnya",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "c2-m3",
      title: "Peloncatan",
      lessons: [
        {
          id: "c2-l8",
          title: "Label dan statemen goto",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statemen <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> digunakan untuk melompat ke bagian kode tertentu yang ditandai oleh sebuah <strong>label</strong>. Label ditulis dengan format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama_label:</code> (diakhiri titik dua) dan bisa ditempatkan di mana saja dalam fungsi yang sama.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Penggunaan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> umumnya <strong>tidak disarankan</strong> dalam pemrograman modern karena dapat menghasilkan kode yang sulit dibaca dan di-debug, dikenal dengan istilah <strong>spaghetti code</strong>. Alur program menjadi tidak terstruktur dan sulit diprediksi ketika banyak lompatan goto digunakan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Namun, ada beberapa kasus langka di mana <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> dianggap valid, seperti <strong>keluar dari perulangan bersarang</strong> (nested loop) yang dalam, di mana <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> hanya bisa keluar dari satu level loop saja.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int i = 1;\n\n    ulangi:\n        printf(\"Angka: %d\\n\", i);\n        i++;\n        if (i &lt;= 3) {\n            goto ulangi;\n        }\n\n    printf(\"Selesai.\\n\");\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3\nSelesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\n    ulangi:\n        printf(\"Angka: %d\\n\", i);\n        i++;\n        if (i <= 3) {\n            goto ulangi;\n        }\n\n    printf(\"Selesai.\\n\");\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    int x = 1;\n\n    // TODO: Buat label bernama \"cetak\" di sini\n    // Cetak \"Nilai x: \" diikuti nilai x\n    // Increment x\n    // Jika x <= 4, gunakan goto untuk kembali ke label cetak\n\n    printf(\"Loop selesai.\\n\");\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int x = 1;\n\n    cetak:\n        printf(\"Nilai x: %d\\n\", x);\n        x++;\n        if (x <= 4) {\n            goto cetak;\n        }\n\n    printf(\"Loop selesai.\\n\");\n    return 0;\n}",
          hint: "Buat label dengan menulis cetak: lalu gunakan goto cetak; di dalam blok if untuk melompat kembali.",
          quiz: {
            question: "Mengapa penggunaan goto umumnya tidak disarankan?",
            options: [
              "Karena goto membuat program berjalan lebih lambat",
              "Karena goto menyebabkan memory leak",
              "Karena goto menghasilkan alur program yang tidak terstruktur (spaghetti code) dan sulit di-debug",
              "Karena goto tidak didukung oleh standar C modern"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Nilai x: 1\nNilai x: 2\nNilai x: 3\nNilai x: 4\nLoop selesai.\n",
              description: "Cetak Nilai x dari 1 sampai 4 menggunakan goto"
            }
          ],
          validationRules: [
            {
              pattern: "\\bcetak\\s*:",
              message: "Buat label bernama cetak dengan format cetak:",
              shouldExist: true
            },
            {
              pattern: "goto\\s+cetak\\s*;",
              message: "Gunakan goto cetak; untuk melompat kembali ke label",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l9",
          title: "Prosedur break",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statemen <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> digunakan untuk <strong>menghentikan eksekusi perulangan atau switch secara paksa</strong> dan melanjutkan ke pernyataan setelah blok tersebut. Ketika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> ditemui, program langsung keluar dari perulangan tanpa menyelesaikan iterasi yang tersisa.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pada perulangan bersarang (<em>nested loop</em>), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> hanya menghentikan <strong>perulangan terdalam</strong> (innermost loop) tempat ia berada. Perulangan luar tetap berjalan normal. Jika ingin keluar dari semua level loop, pertimbangkan menggunakan flag variabel atau goto.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> sangat berguna dalam skenario pencarian: begitu item ditemukan, tidak perlu lagi memeriksa sisa data sehingga perulangan bisa dihentikan lebih awal.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 10; i++) {\n        if (i == 6) {\n            printf(\"Berhenti di angka %d\\n\", i);\n            break;\n        }\n        printf(\"Angka: %d\\n\", i);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3\nAngka: 4\nAngka: 5\nBerhenti di angka 6</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 6) {\n            printf(\"Berhenti di angka %d\\n\", i);\n            break;\n        }\n        printf(\"Angka: %d\\n\", i);\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // TODO: Buat perulangan for dari 1 sampai 10\n    // Jika i == 5, cetak \"Loop dihentikan pada i = 5\" lalu hentikan loop dengan break\n    // Selain itu, cetak \"i = \" diikuti nilai i\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            printf(\"Loop dihentikan pada i = 5\\n\");\n            break;\n        }\n        printf(\"i = %d\\n\", i);\n    }\n\n    return 0;\n}",
          hint: "Di dalam for loop, gunakan if (i == 5) lalu cetak pesan dan tulis break; untuk keluar dari loop.",
          quiz: {
            question: "Pada nested loop (loop di dalam loop), apa yang terjadi saat break dieksekusi?",
            options: [
              "Semua level loop dihentikan",
              "Hanya loop terdalam (innermost) yang dihentikan",
              "Program langsung berhenti (exit)",
              "Loop terluar yang dihentikan"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "i = 1\ni = 2\ni = 3\ni = 4\nLoop dihentikan pada i = 5\n",
              description: "Cetak i = 1 sampai 4, lalu berhenti pada i = 5"
            }
          ],
          validationRules: [
            {
              pattern: "break\\s*;",
              message: "Gunakan break; untuk menghentikan perulangan",
              shouldExist: true
            },
            {
              pattern: "if\\s*\\(\\s*i\\s*==\\s*5\\s*\\)",
              message: "Gunakan if (i == 5) untuk mengecek kapan loop harus berhenti",
              shouldExist: true
            }
          ]
        },
        {
          id: "c2-l10",
          title: "Prosedur continue",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statemen <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> digunakan untuk <strong>melewati sisa kode dalam iterasi saat ini</strong> dan langsung melompat ke iterasi berikutnya. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> yang menghentikan loop sepenuhnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> hanya melewati iterasi yang sedang berjalan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pada perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> dieksekusi, program akan melompat ke bagian <strong>step/increment</strong> (misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">i++</code>) lalu memeriksa kondisi. Pada perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code>, program langsung melompat ke <strong>pengecekan kondisi</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> berguna ketika kita ingin <strong>mengabaikan nilai tertentu</strong> dalam perulangan tanpa menghentikan seluruh proses. Misalnya, mencetak hanya bilangan ganjil atau melewati data yang tidak valid.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 6; i++) {\n        if (i % 2 == 0) {\n            continue;\n        }\n        printf(\"Ganjil: %d\\n\", i);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Ganjil: 1\nGanjil: 3\nGanjil: 5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 6; i++) {\n        if (i % 2 == 0) {\n            continue;\n        }\n        printf(\"Ganjil: %d\\n\", i);\n    }\n\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // TODO: Buat perulangan for dari 1 sampai 10\n    // Gunakan continue untuk melewati angka yang habis dibagi 3\n    // Cetak angka yang TIDAK habis dibagi 3\n    // Format: \"Angka: 1\", \"Angka: 2\", \"Angka: 4\", ...\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 0) {\n            continue;\n        }\n        printf(\"Angka: %d\\n\", i);\n    }\n\n    return 0;\n}",
          hint: "Di dalam for loop, gunakan if (i % 3 == 0) { continue; } untuk melewati kelipatan 3.",
          quiz: {
            question: "Apa perbedaan utama antara break dan continue dalam perulangan?",
            options: [
              "break melewati satu iterasi, continue menghentikan seluruh loop",
              "break menghentikan seluruh loop, continue melewati iterasi saat ini dan lanjut ke iterasi berikutnya",
              "break dan continue memiliki fungsi yang identik",
              "continue hanya bisa digunakan di dalam while, sedangkan break hanya di for"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Angka: 1\nAngka: 2\nAngka: 4\nAngka: 5\nAngka: 7\nAngka: 8\nAngka: 10\n",
              description: "Cetak angka 1-10 yang tidak habis dibagi 3"
            }
          ],
          validationRules: [
            {
              pattern: "continue\\s*;",
              message: "Gunakan continue; untuk melewati iterasi tertentu",
              shouldExist: true
            },
            {
              pattern: "i\\s*%\\s*3\\s*==\\s*0",
              message: "Gunakan i % 3 == 0 untuk memeriksa apakah angka habis dibagi 3",
              shouldExist: true
            }
          ]
        }
      ]
    }
  ]
}
