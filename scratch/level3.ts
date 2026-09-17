{
  id: "c-level-3",
  title: "ARRAY, STRUCT, DAN OPERASI FILE",
  description: "Membahas array dimensi satu hingga multi dimensi, tipe data struct, dan operasi file (buka, tutup, tulis, baca).",
  modules: [
    {
      id: "c3-m1",
      title: "Array",
      lessons: [
        {
          id: "c3-l1",
          title: "Array Dimensi Satu",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Array</strong> adalah kumpulan elemen yang memiliki <strong>tipe data yang sama</strong> dan disimpan secara berurutan di dalam memori. Array dimensi satu (1D) adalah bentuk array yang paling sederhana, di mana elemen-elemen tersusun dalam satu baris seperti deret loker bernomor.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Deklarasi array menggunakan sintaks <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_data nama[ukuran];</code>. Elemen array diakses menggunakan <strong>indeks yang dimulai dari 0</strong>. Misalnya, array berukuran 5 memiliki indeks 0 sampai 4. Kita juga bisa menginisialisasi array langsung saat deklarasi menggunakan kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menelusuri seluruh elemen array, kita biasanya menggunakan perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> dengan variabel counter sebagai indeks.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai[5] = {80, 90, 75, 85, 95};\n\n    for (int i = 0; i &lt; 5; i++) {\n        printf(\"nilai[%d] = %d\\n\", i, nilai[i]);\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">nilai[0] = 80\nnilai[1] = 90\nnilai[2] = 75\nnilai[3] = 85\nnilai[4] = 95</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int nilai[5] = {80, 90, 75, 85, 95};\n\n    for (int i = 0; i < 5; i++) {\n        printf(\"nilai[%d] = %d\\n\", i, nilai[i]);\n    }\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Deklarasikan array 'angka' bertipe int berukuran 3\n    // dengan nilai {10, 20, 30}\n\n    // Cetak semua elemen array menggunakan perulangan for\n    // Format: \"angka[i] = nilai\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int angka[3] = {10, 20, 30};\n\n    for (int i = 0; i < 3; i++) {\n        printf(\"angka[%d] = %d\\n\", i, angka[i]);\n    }\n    return 0;\n}",
          hint: "Deklarasikan array dengan int angka[3] = {10, 20, 30}; lalu gunakan for loop dari i=0 sampai i<3 untuk mencetak setiap elemen.",
          quiz: {
            question: "Jika sebuah array dideklarasikan sebagai int data[5], berapakah indeks elemen terakhir?",
            options: [
              "5",
              "4",
              "1",
              "0"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "angka[0] = 10\nangka[1] = 20\nangka[2] = 30\n",
              description: "Cetak semua elemen array angka"
            }
          ],
          validationRules: [
            {
              pattern: "int\\s+angka\\s*\\[\\s*3\\s*\\]\\s*=\\s*\\{\\s*10\\s*,\\s*20\\s*,\\s*30\\s*\\}",
              message: "Deklarasikan array dengan int angka[3] = {10, 20, 30};",
              shouldExist: true
            },
            {
              pattern: "for\\s*\\(",
              message: "Gunakan perulangan for untuk menelusuri elemen array",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l2",
          title: "Array Dimensi Dua",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Array dimensi dua (2D)</strong> adalah array yang memiliki dua indeks, yaitu <strong>baris</strong> dan <strong>kolom</strong>. Array 2D sering digunakan untuk merepresentasikan data dalam bentuk <strong>tabel atau matriks</strong>. Deklarasinya menggunakan sintaks <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_data nama[baris][kolom];</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mengakses elemen array 2D, kita menggunakan dua indeks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama[i][j]</code>, di mana <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">i</code> adalah indeks baris dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">j</code> adalah indeks kolom. Sama seperti array 1D, indeks dimulai dari 0.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menelusuri seluruh elemen array 2D, kita memerlukan <strong>nested loop</strong> (perulangan bersarang): loop luar untuk baris dan loop dalam untuk kolom.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int matriks[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n\n    for (int i = 0; i &lt; 2; i++) {\n        for (int j = 0; j &lt; 3; j++) {\n            printf(\"%d \", matriks[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">1 2 3 \n4 5 6 </span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int matriks[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf(\"%d \", matriks[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Deklarasikan array 2D 'tabel' berukuran 2x2\n    // dengan nilai {{1, 2}, {3, 4}}\n\n    // Cetak elemen array 2D menggunakan nested loop\n    // Format: cetak setiap elemen dipisahkan spasi, setiap baris dipisahkan newline\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int tabel[2][2] = {\n        {1, 2},\n        {3, 4}\n    };\n\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            printf(\"%d \", tabel[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
          hint: "Deklarasikan array 2D dengan int tabel[2][2] = {{1, 2}, {3, 4}}; lalu gunakan dua for loop bersarang untuk mencetak setiap elemen.",
          quiz: {
            question: "Bagaimana cara mengakses elemen pada baris ke-2 kolom ke-3 dari array int m[3][4]?",
            options: [
              "m[2][3]",
              "m[1][2]",
              "m[3][2]",
              "m[2][1]"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "1 2 \n3 4 \n",
              description: "Cetak matriks 2x2"
            }
          ],
          validationRules: [
            {
              pattern: "int\\s+tabel\\s*\\[\\s*2\\s*\\]\\s*\\[\\s*2\\s*\\]",
              message: "Deklarasikan array 2D dengan int tabel[2][2]",
              shouldExist: true
            },
            {
              pattern: "for\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*for\\s*\\(",
              message: "Gunakan nested loop (perulangan bersarang) untuk menelusuri array 2D",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l3",
          title: "Array Multi Dimensi",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Array multi dimensi</strong> adalah array yang memiliki lebih dari dua dimensi. Array 3D misalnya, bisa dibayangkan seperti kumpulan beberapa tabel (matriks 2D) yang ditumpuk. Deklarasinya menggunakan sintaks <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">tipe_data nama[d1][d2][d3];</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Contoh penggunaan array 3D dalam dunia nyata adalah menyimpan data nilai siswa dari beberapa kelas di beberapa semester. Dimensi pertama bisa mewakili semester, dimensi kedua mewakili kelas, dan dimensi ketiga mewakili siswa.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mengakses elemen array 3D, diperlukan <strong>tiga indeks</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama[i][j][k]</code>. Untuk menelusuri seluruh elemen, digunakan <strong>tiga perulangan bersarang</strong>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int data[2][2][3] = {\n        {{1, 2, 3}, {4, 5, 6}},\n        {{7, 8, 9}, {10, 11, 12}}\n    };\n\n    for (int i = 0; i &lt; 2; i++) {\n        printf(\"Blok %d:\\n\", i);\n        for (int j = 0; j &lt; 2; j++) {\n            for (int k = 0; k &lt; 3; k++) {\n                printf(\"%d \", data[i][j][k]);\n            }\n            printf(\"\\n\");\n        }\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Blok 0:\n1 2 3 \n4 5 6 \nBlok 1:\n7 8 9 \n10 11 12 </span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    int data[2][2][3] = {\n        {{1, 2, 3}, {4, 5, 6}},\n        {{7, 8, 9}, {10, 11, 12}}\n    };\n\n    for (int i = 0; i < 2; i++) {\n        printf(\"Blok %d:\\n\", i);\n        for (int j = 0; j < 2; j++) {\n            for (int k = 0; k < 3; k++) {\n                printf(\"%d \", data[i][j][k]);\n            }\n            printf(\"\\n\");\n        }\n    }\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Deklarasikan array 3D 'kubus' berukuran [2][2][2]\n    // Blok 0: {{1, 2}, {3, 4}}\n    // Blok 1: {{5, 6}, {7, 8}}\n\n    // Cetak semua elemen dengan format:\n    // \"Blok X:\" diikuti elemen setiap baris dipisahkan spasi\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    int kubus[2][2][2] = {\n        {{1, 2}, {3, 4}},\n        {{5, 6}, {7, 8}}\n    };\n\n    for (int i = 0; i < 2; i++) {\n        printf(\"Blok %d:\\n\", i);\n        for (int j = 0; j < 2; j++) {\n            for (int k = 0; k < 2; k++) {\n                printf(\"%d \", kubus[i][j][k]);\n            }\n            printf(\"\\n\");\n        }\n    }\n    return 0;\n}",
          hint: "Deklarasikan array 3D dengan int kubus[2][2][2] lalu gunakan tiga for loop bersarang untuk mencetak semua elemen.",
          quiz: {
            question: "Berapa total elemen yang dapat ditampung oleh array int data[3][4][5]?",
            options: [
              "12",
              "15",
              "60",
              "20"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Blok 0:\n1 2 \n3 4 \nBlok 1:\n5 6 \n7 8 \n",
              description: "Cetak array 3D kubus 2x2x2"
            }
          ],
          validationRules: [
            {
              pattern: "int\\s+kubus\\s*\\[\\s*2\\s*\\]\\s*\\[\\s*2\\s*\\]\\s*\\[\\s*2\\s*\\]",
              message: "Deklarasikan array 3D dengan int kubus[2][2][2]",
              shouldExist: true
            },
            {
              pattern: "for\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*for\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*for\\s*\\(",
              message: "Gunakan tiga perulangan bersarang untuk menelusuri array 3D",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "c3-m2",
      title: "STRUCT",
      lessons: [
        {
          id: "c3-l4",
          title: "Konsep Tipe Data Struct",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Struct</strong> (structure) adalah tipe data bentukan yang memungkinkan kita <strong>mengelompokkan beberapa variabel dengan tipe data berbeda</strong> ke dalam satu kesatuan. Berbeda dengan array yang hanya bisa menyimpan data bertipe sama, struct bisa menyimpan kombinasi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char[]</code>, dan lainnya.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Bayangkan sebuah <strong>kartu identitas mahasiswa</strong>: di dalamnya ada nama (string), umur (integer), dan IPK (float). Dalam bahasa C, kita bisa merepresentasikan data tersebut dalam satu struct. Setiap data di dalam struct disebut <strong>member</strong> (anggota).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struct didefinisikan dengan keyword <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">struct</code> diikuti nama struct dan blok kurung kurawal berisi deklarasi member-member-nya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nstruct Mahasiswa {\n    char nama[50];\n    int umur;\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa mhs = {\"Budi\", 20, 3.75};\n    printf(\"Nama: %s\\n\", mhs.nama);\n    printf(\"Umur: %d\\n\", mhs.umur);\n    printf(\"IPK: %.2f\\n\", mhs.ipk);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama: Budi\nUmur: 20\nIPK: 3.75</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nstruct Mahasiswa {\n    char nama[50];\n    int umur;\n    float ipk;\n};\n\nint main() {\n    struct Mahasiswa mhs = {\"Budi\", 20, 3.75};\n    printf(\"Nama: %s\\n\", mhs.nama);\n    printf(\"Umur: %d\\n\", mhs.umur);\n    printf(\"IPK: %.2f\\n\", mhs.ipk);\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\n// Definisikan struct 'Buku' dengan member:\n// - judul (char array ukuran 50)\n// - harga (int)\n\nint main() {\n    // Buat variabel struct Buku bernama 'bk'\n    // dengan judul \"Pemrograman C\" dan harga 85000\n\n    // Cetak: \"Judul: ...\"\n    // Cetak: \"Harga: ...\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nstruct Buku {\n    char judul[50];\n    int harga;\n};\n\nint main() {\n    struct Buku bk = {\"Pemrograman C\", 85000};\n    printf(\"Judul: %s\\n\", bk.judul);\n    printf(\"Harga: %d\\n\", bk.harga);\n    return 0;\n}",
          hint: "Definisikan struct Buku dengan char judul[50] dan int harga, lalu buat variabel dengan struct Buku bk = {\"Pemrograman C\", 85000};",
          quiz: {
            question: "Apa perbedaan utama antara struct dan array?",
            options: [
              "Struct lebih cepat dibanding array",
              "Array bisa menyimpan tipe data berbeda, struct tidak",
              "Struct bisa mengelompokkan variabel dengan tipe data berbeda, array hanya satu tipe",
              "Struct tidak bisa digunakan di dalam fungsi main"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Judul: Pemrograman C\nHarga: 85000\n",
              description: "Cetak data struct Buku"
            }
          ],
          validationRules: [
            {
              pattern: "struct\\s+Buku\\s*\\{",
              message: "Definisikan struct dengan nama Buku",
              shouldExist: true
            },
            {
              pattern: "struct\\s+Buku\\s+bk",
              message: "Buat variabel struct Buku dengan nama bk",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l5",
          title: "Deklarasi Variabel Struct",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Setelah mendefinisikan struct, kita perlu <strong>mendeklarasikan variabel</strong> dari tipe struct tersebut agar bisa digunakan. Ada beberapa cara untuk mendeklarasikan variabel struct di bahasa C.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Cara pertama adalah mendeklarasikan variabel setelah definisi struct: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">struct NamaStruct variabel;</code>. Cara kedua adalah langsung saat mendefinisikan struct. Untuk mempermudah penulisan, kita bisa menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">typedef</code> agar tidak perlu menulis keyword <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">struct</code> berulang kali.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">typedef</code>, kita membuat alias untuk tipe struct sehingga deklarasi variabel menjadi lebih singkat dan mudah dibaca. Inisialisasi nilai bisa dilakukan saat deklarasi menggunakan kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\ntypedef struct {\n    char nama[50];\n    int usia;\n} Siswa;\n\nint main() {\n    Siswa s1 = {\"Ani\", 17};\n    Siswa s2 = {\"Beni\", 18};\n\n    printf(\"Siswa 1: %s, Usia: %d\\n\", s1.nama, s1.usia);\n    printf(\"Siswa 2: %s, Usia: %d\\n\", s2.nama, s2.usia);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Siswa 1: Ani, Usia: 17\nSiswa 2: Beni, Usia: 18</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\ntypedef struct {\n    char nama[50];\n    int usia;\n} Siswa;\n\nint main() {\n    Siswa s1 = {\"Ani\", 17};\n    Siswa s2 = {\"Beni\", 18};\n\n    printf(\"Siswa 1: %s, Usia: %d\\n\", s1.nama, s1.usia);\n    printf(\"Siswa 2: %s, Usia: %d\\n\", s2.nama, s2.usia);\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\n// Definisikan struct 'Hewan' menggunakan typedef\n// dengan member: nama (char array 30), kaki (int)\n\nint main() {\n    // Deklarasikan variabel h1 bertipe Hewan\n    // dengan nama \"Kucing\" dan kaki 4\n\n    // Cetak: \"Hewan: Kucing, Kaki: 4\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\ntypedef struct {\n    char nama[30];\n    int kaki;\n} Hewan;\n\nint main() {\n    Hewan h1 = {\"Kucing\", 4};\n    printf(\"Hewan: %s, Kaki: %d\\n\", h1.nama, h1.kaki);\n    return 0;\n}",
          hint: "Gunakan typedef struct { ... } Hewan; untuk mendefinisikan tipe, lalu deklarasikan variabel dengan Hewan h1 = {\"Kucing\", 4};",
          quiz: {
            question: "Apa kegunaan keyword typedef pada struct?",
            options: [
              "Membuat struct menjadi lebih cepat dieksekusi",
              "Menghapus struct dari memori setelah digunakan",
              "Membuat alias/nama singkat agar tidak perlu menulis keyword struct berulang kali",
              "Membuat struct tidak bisa dimodifikasi"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Hewan: Kucing, Kaki: 4\n",
              description: "Cetak data struct Hewan"
            }
          ],
          validationRules: [
            {
              pattern: "typedef\\s+struct",
              message: "Gunakan typedef struct untuk mendefinisikan tipe Hewan",
              shouldExist: true
            },
            {
              pattern: "Hewan\\s+h1",
              message: "Deklarasikan variabel h1 bertipe Hewan",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l6",
          title: "Mengakses Elemen dengan Operator Titik",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mengakses atau memodifikasi member (anggota) dari sebuah variabel struct, kita menggunakan <strong>operator titik</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.</code>). Sintaksnya adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">variabel.member</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator titik bisa digunakan untuk <strong>membaca nilai</strong> member maupun <strong>mengisi/mengubah nilai</strong> member setelah variabel struct dideklarasikan. Untuk mengisi member bertipe string (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char[]</code>), kita harus menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">strcpy()</code> dari library <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">string.h</code>, karena string tidak bisa diassign langsung dengan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator titik sangat intuitif dan merupakan cara paling umum untuk berinteraksi dengan data di dalam struct.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n#include &lt;string.h&gt;\n\nstruct Produk {\n    char nama[50];\n    int stok;\n    float harga;\n};\n\nint main() {\n    struct Produk p;\n    strcpy(p.nama, \"Laptop\");\n    p.stok = 15;\n    p.harga = 12500000.50;\n\n    printf(\"Produk: %s\\n\", p.nama);\n    printf(\"Stok: %d\\n\", p.stok);\n    printf(\"Harga: %.2f\\n\", p.harga);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Produk: Laptop\nStok: 15\nHarga: 12500000.50</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n#include <string.h>\n\nstruct Produk {\n    char nama[50];\n    int stok;\n    float harga;\n};\n\nint main() {\n    struct Produk p;\n    strcpy(p.nama, \"Laptop\");\n    p.stok = 15;\n    p.harga = 12500000.50;\n\n    printf(\"Produk: %s\\n\", p.nama);\n    printf(\"Stok: %d\\n\", p.stok);\n    printf(\"Harga: %.2f\\n\", p.harga);\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n#include <string.h>\n\nstruct Mobil {\n    char merek[30];\n    int tahun;\n};\n\nint main() {\n    struct Mobil m;\n    // Isi member merek dengan \"Toyota\" menggunakan strcpy\n    // Isi member tahun dengan 2023 menggunakan operator titik\n\n    // Cetak: \"Merek: Toyota\"\n    // Cetak: \"Tahun: 2023\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n#include <string.h>\n\nstruct Mobil {\n    char merek[30];\n    int tahun;\n};\n\nint main() {\n    struct Mobil m;\n    strcpy(m.merek, \"Toyota\");\n    m.tahun = 2023;\n\n    printf(\"Merek: %s\\n\", m.merek);\n    printf(\"Tahun: %d\\n\", m.tahun);\n    return 0;\n}",
          hint: "Gunakan strcpy(m.merek, \"Toyota\") untuk mengisi string dan m.tahun = 2023 untuk mengisi integer.",
          quiz: {
            question: "Mengapa kita tidak bisa menggunakan operator = untuk mengisi member struct bertipe char[]?",
            options: [
              "Karena operator = hanya untuk tipe float",
              "Karena char[] adalah array, dan array tidak bisa diassign langsung dengan =, harus menggunakan strcpy()",
              "Karena struct tidak mendukung tipe char",
              "Karena operator = sudah digunakan untuk deklarasi"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Merek: Toyota\nTahun: 2023\n",
              description: "Cetak data struct Mobil"
            }
          ],
          validationRules: [
            {
              pattern: "strcpy\\s*\\(\\s*m\\.merek",
              message: "Gunakan strcpy untuk mengisi member merek",
              shouldExist: true
            },
            {
              pattern: "m\\.tahun\\s*=\\s*2023",
              message: "Gunakan operator titik untuk mengisi member tahun: m.tahun = 2023",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "c3-m3",
      title: "Operasi FILE",
      lessons: [
        {
          id: "c3-l7",
          title: "Macam-Macam Operasi File",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Dalam pemrograman C, kita sering perlu menyimpan data secara <strong>permanen</strong> ke dalam file, bukan hanya di memori (RAM) yang hilang saat program selesai. Bahasa C menyediakan berbagai fungsi untuk melakukan <strong>operasi file</strong>, yaitu: membuat file, membuka file, membaca file, menulis ke file, menambahkan data ke file, dan menutup file.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Semua operasi file di C menggunakan <strong>FILE pointer</strong> dan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fopen()</code> untuk membuka file dengan <strong>mode</strong> tertentu. Setiap mode menentukan jenis operasi yang diizinkan terhadap file. Berikut adalah tabel mode file yang tersedia:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Mode</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Keterangan</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">r</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk dibaca. File harus sudah ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">w</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk ditulis. Jika file sudah ada, isinya dihapus. Jika belum ada, file dibuat baru.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">a</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk ditambahkan (append). Data ditulis di akhir file. Jika belum ada, file dibuat baru.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">r+</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk dibaca dan ditulis. File harus sudah ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">w+</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk dibaca dan ditulis. Isi file dihapus jika sudah ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">a+</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk dibaca dan ditambahkan. Data baru ditulis di akhir file.</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    FILE *fp = fopen(\"data.txt\", \"w\");\n    if (fp != NULL) {\n        fprintf(fp, \"Hello, File!\\n\");\n        fclose(fp);\n        printf(\"File berhasil ditulis.\\n\");\n    } else {\n        printf(\"Gagal membuka file.\\n\");\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">File berhasil ditulis.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"data.txt\", \"w\");\n    if (fp != NULL) {\n        fprintf(fp, \"Hello, File!\\n\");\n        fclose(fp);\n        printf(\"File berhasil ditulis.\\n\");\n    } else {\n        printf(\"Gagal membuka file.\\n\");\n    }\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Buka file \"catatan.txt\" dengan mode tulis (\"w\")\n    // Simpan ke variabel FILE pointer bernama 'fp'\n\n    // Cek apakah file berhasil dibuka (fp != NULL)\n    // Jika berhasil, tulis \"Belajar File C\" ke file menggunakan fprintf\n    // Tutup file dengan fclose\n    // Cetak: \"File berhasil dibuat.\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"catatan.txt\", \"w\");\n    if (fp != NULL) {\n        fprintf(fp, \"Belajar File C\\n\");\n        fclose(fp);\n        printf(\"File berhasil dibuat.\\n\");\n    }\n    return 0;\n}",
          hint: "Gunakan FILE *fp = fopen(\"catatan.txt\", \"w\"); untuk membuka file, lalu fprintf(fp, ...) untuk menulis, dan fclose(fp) untuk menutup.",
          quiz: {
            question: "Mode file manakah yang akan menghapus isi file yang sudah ada saat dibuka?",
            options: [
              "r (read)",
              "a (append)",
              "w (write)",
              "r+ (read+write)"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "File berhasil dibuat.\n",
              description: "Cetak pesan bahwa file berhasil dibuat"
            }
          ],
          validationRules: [
            {
              pattern: "fopen\\s*\\(\\s*\"catatan\\.txt\"\\s*,\\s*\"w\"\\s*\\)",
              message: "Buka file catatan.txt dengan mode \"w\" menggunakan fopen",
              shouldExist: true
            },
            {
              pattern: "fclose\\s*\\(\\s*fp\\s*\\)",
              message: "Tutup file dengan fclose(fp)",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l8",
          title: "Membuka dan Menutup File",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Langkah pertama dalam operasi file adalah <strong>membuka file</strong> menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fopen()</code>. Fungsi ini menerima dua parameter: <strong>nama file</strong> (string) dan <strong>mode</strong> (string). Fungsi ini mengembalikan <strong>FILE pointer</strong> yang digunakan untuk operasi selanjutnya.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sangat penting untuk selalu <strong>memeriksa apakah file berhasil dibuka</strong> dengan mengecek apakah pointer bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">NULL</code>. Jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fopen()</code> mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">NULL</code>, berarti file gagal dibuka (misalnya file tidak ditemukan saat menggunakan mode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">r</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Setelah selesai melakukan operasi, file <strong>harus ditutup</strong> menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fclose()</code>. Menutup file penting untuk memastikan semua data tersimpan dengan benar dan membebaskan sumber daya sistem.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    FILE *fp = fopen(\"contoh.txt\", \"w\");\n\n    if (fp == NULL) {\n        printf(\"Error: File gagal dibuka!\\n\");\n        return 1;\n    }\n\n    printf(\"File berhasil dibuka.\\n\");\n    fprintf(fp, \"Data tersimpan.\\n\");\n    fclose(fp);\n    printf(\"File berhasil ditutup.\\n\");\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">File berhasil dibuka.\nFile berhasil ditutup.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"contoh.txt\", \"w\");\n\n    if (fp == NULL) {\n        printf(\"Error: File gagal dibuka!\\n\");\n        return 1;\n    }\n\n    printf(\"File berhasil dibuka.\\n\");\n    fprintf(fp, \"Data tersimpan.\\n\");\n    fclose(fp);\n    printf(\"File berhasil ditutup.\\n\");\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Buka file \"log.txt\" dengan mode tulis (\"w\")\n\n    // Periksa apakah file berhasil dibuka\n    // Jika NULL, cetak \"Error: Gagal membuka file!\" dan return 1\n\n    // Jika berhasil, cetak \"File dibuka.\"\n    // Tulis \"Log dimulai\" ke file menggunakan fprintf\n    // Tutup file\n    // Cetak \"File ditutup.\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"log.txt\", \"w\");\n\n    if (fp == NULL) {\n        printf(\"Error: Gagal membuka file!\\n\");\n        return 1;\n    }\n\n    printf(\"File dibuka.\\n\");\n    fprintf(fp, \"Log dimulai\\n\");\n    fclose(fp);\n    printf(\"File ditutup.\\n\");\n    return 0;\n}",
          hint: "Gunakan FILE *fp = fopen(\"log.txt\", \"w\"); lalu cek if (fp == NULL) untuk menangani error. Jangan lupa fclose(fp) di akhir.",
          quiz: {
            question: "Apa yang terjadi jika kita tidak memanggil fclose() setelah selesai menggunakan file?",
            options: [
              "Program akan langsung crash",
              "File otomatis terhapus dari disk",
              "Data mungkin tidak tersimpan dengan benar dan sumber daya sistem tidak dibebaskan",
              "Tidak ada efek apapun"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "File dibuka.\nFile ditutup.\n",
              description: "Cetak pesan buka dan tutup file"
            }
          ],
          validationRules: [
            {
              pattern: "fp\\s*==\\s*NULL|NULL\\s*==\\s*fp",
              message: "Periksa apakah file pointer bernilai NULL",
              shouldExist: true
            },
            {
              pattern: "fclose\\s*\\(\\s*fp\\s*\\)",
              message: "Tutup file dengan fclose(fp) setelah selesai",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l9",
          title: "Menulis File pada Operasi File",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Bahasa C menyediakan beberapa fungsi untuk <strong>menulis data ke file</strong>. Setiap fungsi memiliki kegunaan yang berbeda tergantung jenis data yang ingin ditulis. Semua fungsi tulis memerlukan file yang sudah dibuka dengan mode yang mendukung penulisan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">w</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">w+</code>, atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a+</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut adalah perbandingan fungsi-fungsi untuk menulis ke file:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Fungsi</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Kegunaan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">fprintf()</td><td class=\"px-3 py-2 text-zinc-700\">Menulis teks berformat ke file (seperti printf tapi ke file)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">fprintf(fp, \"Nilai: %d\", 90)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">fputs()</td><td class=\"px-3 py-2 text-zinc-700\">Menulis string ke file tanpa format</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">fputs(\"Hello\", fp)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">fputc()</td><td class=\"px-3 py-2 text-zinc-700\">Menulis satu karakter ke file</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">fputc('A', fp)</td></tr></tbody></table>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fprintf()</code> adalah yang paling fleksibel karena mendukung format specifier seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%d</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%s</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%f</code>, mirip dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    FILE *fp = fopen(\"nilai.txt\", \"w\");\n    if (fp != NULL) {\n        fprintf(fp, \"Nama: %s\\n\", \"Andi\");\n        fprintf(fp, \"Nilai: %d\\n\", 95);\n        fputs(\"Status: Lulus\\n\", fp);\n        fclose(fp);\n        printf(\"Data berhasil ditulis ke file.\\n\");\n    }\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Data berhasil ditulis ke file.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"nilai.txt\", \"w\");\n    if (fp != NULL) {\n        fprintf(fp, \"Nama: %s\\n\", \"Andi\");\n        fprintf(fp, \"Nilai: %d\\n\", 95);\n        fputs(\"Status: Lulus\\n\", fp);\n        fclose(fp);\n        printf(\"Data berhasil ditulis ke file.\\n\");\n    }\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Buka file \"biodata.txt\" dengan mode tulis\n\n    // Cek apakah file berhasil dibuka\n    // Gunakan fprintf untuk menulis: \"Nama: Siti\"\n    // Gunakan fprintf untuk menulis: \"Umur: 21\"\n    // Tutup file\n    // Cetak: \"Biodata berhasil disimpan.\"\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"biodata.txt\", \"w\");\n    if (fp != NULL) {\n        fprintf(fp, \"Nama: Siti\\n\");\n        fprintf(fp, \"Umur: 21\\n\");\n        fclose(fp);\n        printf(\"Biodata berhasil disimpan.\\n\");\n    }\n    return 0;\n}",
          hint: "Buka file dengan fopen(\"biodata.txt\", \"w\"), lalu gunakan fprintf(fp, \"Nama: Siti\\n\") dan fprintf(fp, \"Umur: 21\\n\") untuk menulis ke file.",
          quiz: {
            question: "Apa perbedaan utama antara fprintf() dan fputs()?",
            options: [
              "fprintf() hanya untuk angka, fputs() hanya untuk string",
              "fprintf() mendukung format specifier (%d, %s, dll), fputs() menulis string apa adanya",
              "fputs() lebih cepat karena tidak perlu membuka file",
              "Tidak ada perbedaan, keduanya identik"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Biodata berhasil disimpan.\n",
              description: "Cetak pesan bahwa biodata berhasil disimpan"
            }
          ],
          validationRules: [
            {
              pattern: "fprintf\\s*\\(\\s*fp",
              message: "Gunakan fprintf(fp, ...) untuk menulis data ke file",
              shouldExist: true
            },
            {
              pattern: "fopen\\s*\\(\\s*\"biodata\\.txt\"\\s*,\\s*\"w\"\\s*\\)",
              message: "Buka file biodata.txt dengan mode \"w\"",
              shouldExist: true
            }
          ]
        },
        {
          id: "c3-l10",
          title: "Membaca File pada Operasi File",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain menulis, kita juga perlu <strong>membaca data dari file</strong>. Bahasa C menyediakan beberapa fungsi untuk membaca file yang sudah dibuka dengan mode baca (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">r</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">r+</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut adalah perbandingan fungsi-fungsi untuk membaca file:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Fungsi</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Kegunaan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">fscanf()</td><td class=\"px-3 py-2 text-zinc-700\">Membaca data berformat dari file (seperti scanf tapi dari file)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">fscanf(fp, \"%s\", buf)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">fgets()</td><td class=\"px-3 py-2 text-zinc-700\">Membaca satu baris string dari file (termasuk spasi)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">fgets(buf, 100, fp)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">fgetc()</td><td class=\"px-3 py-2 text-zinc-700\">Membaca satu karakter dari file</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">ch = fgetc(fp)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">feof()</td><td class=\"px-3 py-2 text-zinc-700\">Mengecek apakah sudah mencapai akhir file (end of file)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">while (!feof(fp))</td></tr></tbody></table>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">fgets()</code> adalah yang paling umum digunakan untuk membaca file baris per baris karena aman dari buffer overflow dan bisa membaca string yang mengandung spasi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    // Tulis file terlebih dahulu\n    FILE *fp = fopen(\"pesan.txt\", \"w\");\n    fprintf(fp, \"Halo dari file!\\n\");\n    fprintf(fp, \"Baris kedua.\\n\");\n    fclose(fp);\n\n    // Baca file\n    fp = fopen(\"pesan.txt\", \"r\");\n    char baris[100];\n    while (fgets(baris, 100, fp) != NULL) {\n        printf(\"%s\", baris);\n    }\n    fclose(fp);\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo dari file!\nBaris kedua.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "#include <stdio.h>\n\nint main() {\n    // Tulis file terlebih dahulu\n    FILE *fp = fopen(\"pesan.txt\", \"w\");\n    fprintf(fp, \"Halo dari file!\\n\");\n    fprintf(fp, \"Baris kedua.\\n\");\n    fclose(fp);\n\n    // Baca file\n    fp = fopen(\"pesan.txt\", \"r\");\n    char baris[100];\n    while (fgets(baris, 100, fp) != NULL) {\n        printf(\"%s\", baris);\n    }\n    fclose(fp);\n    return 0;\n}",
          initialCode: "#include <stdio.h>\n\nint main() {\n    // Langkah 1: Tulis file \"info.txt\" dengan mode \"w\"\n    // Tulis dua baris: \"Selamat Datang\" dan \"Di Bahasa C\"\n    // Tutup file\n\n    // Langkah 2: Buka file \"info.txt\" dengan mode \"r\"\n    // Baca dan cetak setiap baris menggunakan fgets dan while loop\n    // Tutup file\n\n    return 0;\n}",
          solution: "#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen(\"info.txt\", \"w\");\n    fprintf(fp, \"Selamat Datang\\n\");\n    fprintf(fp, \"Di Bahasa C\\n\");\n    fclose(fp);\n\n    fp = fopen(\"info.txt\", \"r\");\n    char baris[100];\n    while (fgets(baris, 100, fp) != NULL) {\n        printf(\"%s\", baris);\n    }\n    fclose(fp);\n    return 0;\n}",
          hint: "Tulis file dengan fopen mode \"w\" dan fprintf, lalu baca ulang dengan fopen mode \"r\" dan loop fgets sampai NULL.",
          quiz: {
            question: "Mengapa fgets() lebih disarankan dibanding fscanf() untuk membaca baris teks dari file?",
            options: [
              "fgets() bisa membaca angka, fscanf() tidak",
              "fgets() lebih cepat dari fscanf()",
              "fgets() bisa membaca seluruh baris termasuk spasi, sedangkan fscanf() berhenti di spasi",
              "fgets() tidak memerlukan FILE pointer"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "Selamat Datang\nDi Bahasa C\n",
              description: "Baca dan cetak isi file info.txt"
            }
          ],
          validationRules: [
            {
              pattern: "fgets\\s*\\(",
              message: "Gunakan fgets() untuk membaca file baris per baris",
              shouldExist: true
            },
            {
              pattern: "fopen\\s*\\(\\s*\"info\\.txt\"\\s*,\\s*\"r\"\\s*\\)",
              message: "Buka file info.txt dengan mode \"r\" untuk membaca",
              shouldExist: true
            }
          ]
        }
      ]
    }
  ]
}
