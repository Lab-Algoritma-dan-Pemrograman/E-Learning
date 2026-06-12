{
  id: "p-level-4",
  title: "PENGENALAN DASAR BAHASA PYTHON",
  description: "Mengenal bahasa Python, variabel, tipe data dasar, operator, fungsi input dan output, serta perbandingan dengan bahasa C.",
  modules: [
    {
      id: "p4-m1",
      title: "Pendahuluan Python",
      lessons: [
        {
          id: "p4-l1",
          title: "Pengenalan bahasa Python",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python adalah bahasa pemrograman tingkat tinggi (<em>high-level</em>) yang bersifat interaktif, berorientasi objek, dan bertipe dinamis. Bahasa ini dirancang oleh Guido van Rossum dan pertama kali dirilis pada tahun 1991. Filosofi utama Python adalah mengutamakan <strong>keterbacaan kode</strong> (<em>readability</em>) dengan sintaksis yang sangat bersih dan minimalis, sehingga sangat mudah dipelajari bahkan oleh pemula.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dari bahasa seperti C, Python adalah bahasa yang diterjemahkan menggunakan <strong>interpreter</strong> secara langsung baris demi baris saat program dijalankan, bukan dikompilasi menjadi biner terlebih dahulu. Python tidak membutuhkan tanda titik koma (<code>;</code>) untuk mengakhiri instruksi dan menggunakan indentasi (spasi/tab) untuk menentukan blok kode. Saat ini, Python sangat populer digunakan di bidang Kecerdasan Buatan (AI), analisis data, web development, dan scripting otomatisasi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(\"Halo, Dunia!\")\nprint(\"Belajar Python sangat menyenangkan!\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Dunia!\nBelajar Python sangat menyenangkan!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "print(\"Halo, Dunia!\")\nprint(\"Belajar Python sangat menyenangkan!\")",
          initialCode: "# Cetak \"Halo, Dunia!\" di baris pertama\n# Cetak \"Belajar Python!\" di baris kedua\n",
          solution: "print(\"Halo, Dunia!\")\nprint(\"Belajar Python!\")",
          hint: "Gunakan print() sebanyak dua kali untuk mencetak masing-masing pesan di baris baru.",
          quiz: {
            question: "Apakah peran utama interpreter pada bahasa pemrograman Python?",
            options: [
              "Menerjemahkan seluruh kode menjadi file executable biner (.exe) sebelum dijalankan",
              "Mengeksekusi kode program secara langsung baris demi baris pada saat runtime",
              "Memaksa programmer menuliskan titik koma di akhir setiap baris",
              "Mengubah kode Python menjadi kode bahasa C secara otomatis"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Halo, Dunia!\nBelajar Python!\n",
              description: "Cetak Halo, Dunia! dan Belajar Python!"
            }
          ],
          validationRules: [
            {
              pattern: "print\\(\\s*[\"']Halo,\\s*Dunia![\"']\\s*\\)",
              message: "Pastikan Anda menggunakan print(\"Halo, Dunia!\") di baris pertama",
              shouldExist: true
            },
            {
              pattern: "print\\(\\s*[\"']Belajar\\s*Python![\"']\\s*\\)",
              message: "Pastikan Anda menggunakan print(\"Belajar Python!\") di baris kedua",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l2",
          title: "Perbandingan sintaks Python dan C",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Bagi programmer yang terbiasa dengan bahasa C, sintaksis Python terasa sangat berbeda karena jauh lebih ringkas. Pada bahasa C, kita memerlukan struktur fungsi utama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main()</code>, tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> untuk membungkus blok kode, dan tanda titik koma <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code> di setiap akhir baris. Python menghapus semua formalitas tersebut dan menggantinya dengan aturan baris baru dan <strong>indentasi</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain itu, di C kita wajib mendeklarasikan tipe data variabel (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code>) sebelum menggunakannya. Python secara otomatis menentukan tipe data berdasarkan nilai yang diisikan. Fungsi I/O seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf</code> di bahasa C juga digantikan oleh fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> and <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> yang jauh lebih sederhana.</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Fitur Sintaksis</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Bahasa C</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Bahasa Python</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Pembatas Blok</td><td class=\"px-3 py-2 text-zinc-700\">Kurung kurawal <code>{}</code></td><td class=\"px-3 py-2 text-zinc-700\">Indentasi (Spasi/Tab)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Akhir Pernyataan</td><td class=\"px-3 py-2 text-zinc-700\">Titik koma <code>;</code></td><td class=\"px-3 py-2 text-zinc-700\">Baris baru (Newline)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Deklarasi Variabel</td><td class=\"px-3 py-2 text-zinc-700\">Wajib deklarasi tipe data</td><td class=\"px-3 py-2 text-zinc-700\">Otomatis (Dynamic Typing)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Fungsi Output</td><td class=\"px-3 py-2 text-zinc-700\"><code>printf(\"Format\", var);</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>print(var)</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Fungsi Input</td><td class=\"px-3 py-2 text-zinc-700\"><code>scanf(\"%d\", &amp;var);</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>var = input()</code></td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Python tidak butuh include, main(), atau titik koma\nprint(\"Hello C dan Python!\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Hello C dan Python!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "print(\"Hello C dan Python!\")",
          initialCode: "# Konversikan kode bahasa C di bawah ini ke bahasa Python:\n# int main() {\n#     printf(\"Halo dari Python\\n\");\n#     return 0;\n# }\n",
          solution: "print(\"Halo dari Python\")",
          hint: "Di Python Anda tidak perlu menulis fungsi main() atau import library. Cukup ketik print(\"Halo dari Python\").",
          quiz: {
            question: "Manakah pernyataan yang benar mengenai perbedaan sintaksis antara Python dan C?",
            options: [
              "Python menggunakan tanda kurung kurawal {} untuk menandai akhir blok kode",
              "Python menggunakan indentasi untuk menandai blok kode, sedangkan C menggunakan kurung kurawal {}",
              "Di Python, setiap akhir pernyataan wajib diberikan tanda titik koma ;",
              "Bahasa C tidak membutuhkan tipe data pada variabel, sedangkan Python membutuhkannya"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Halo dari Python\n",
              description: "Cetak pesan Halo dari Python dengan sintaks Python"
            }
          ],
          validationRules: [
            {
              pattern: "print\\(\\s*[\"']Halo\\s+dari\\s+Python[\"']\\s*\\)",
              message: "Gunakan fungsi print untuk menampilkan 'Halo dari Python'",
              shouldExist: true
            },
            {
              pattern: "[{};]+",
              message: "Jangan gunakan kurung kurawal atau titik koma",
              shouldExist: false
            }
          ]
        }
      ]
    },
    {
      id: "p4-m2",
      title: "Variabel",
      lessons: [
        {
          id: "p4-l3",
          title: "Ketentuan deklarasi variabel",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Variabel di Python bertindak sebagai label atau kontainer untuk menyimpan nilai data di dalam memori komputer. Berbeda dengan bahasa C yang memerlukan deklarasi tipe data secara eksplisit (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int x = 5;</code>), Python menggunakan sistem <strong>Dynamic Typing</strong>. Tipe data dari variabel ditentukan secara otomatis oleh interpreter saat Anda memberikan nilai kepadanya menggunakan operator penugasan sama dengan (<code>=</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Karena bertipe dinamis, sebuah variabel di Python dapat dengan bebas menyimpan tipe data yang berbeda sepanjang program berjalan. Misalnya, variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x</code> mula-mula diisi bilangan bulat, kemudian diisi dengan teks. Anda bisa memeriksa tipe data terkini dari sebuah variabel menggunakan fungsi bawaan <code>type()</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>skor = 100\nprint(type(skor))\n\nskor = \"Sangat Baik\"\nprint(type(skor))</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">&lt;class 'int'&gt;\n&lt;class 'str'&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "skor = 100\nprint(type(skor))\n\nskor = \"Sangat Baik\"\nprint(type(skor))",
          initialCode: "# 1. Deklarasikan variabel 'nilai' and isi dengan angka 250\n# 2. Cetak tipe data variabel 'nilai' menggunakan print(type(...))\n# 3. Ubah isi variabel 'nilai' menjadi string \"Lulus\"\n# 4. Cetak kembali tipe datanya menggunakan print(type(...))\n",
          solution: "nilai = 250\nprint(type(nilai))\nnilai = \"Lulus\"\nprint(type(nilai))",
          hint: "Tulis nilai = 250 di baris pertama, gunakan print(type(nilai)) di baris kedua, lalu lakukan reassignment nilai = \"Lulus\".",
          quiz: {
            question: "Apakah makna dari istilah 'Dynamic Typing' pada variabel Python?",
            options: [
              "Nilai variabel hanya bisa diubah-ubah di dalam fungsi khusus",
              "Tipe data variabel ditentukan secara otomatis berdasarkan nilainya saat runtime dan dapat berubah tipe",
              "Variabel memerlukan deklarasi kata kunci khusus sebelum bisa digunakan",
              "Tipe data variabel harus bersifat konstan dan tidak boleh diubah setelah dibuat"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "<class 'int'>\n<class 'str'>\n",
              description: "Mengecek pergantian tipe data secara dinamis dari int ke str"
            }
          ],
          validationRules: [
            {
              pattern: "nilai\\s*=\\s*250",
              message: "Inisialisasi variabel nilai dengan 250",
              shouldExist: true
            },
            {
              pattern: "nilai\\s*=\\s*[\"']Lulus[\"']",
              message: "Ubah isi variabel nilai menjadi string 'Lulus'",
              shouldExist: true
            },
            {
              pattern: "type\\(\\s*nilai\\s*\\)",
              message: "Gunakan type(nilai) untuk memeriksa tipe data",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l4",
          title: "Format penulisan variabel",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Saat menulis kode Python, kita harus mengikuti aturan penulisan variabel agar tidak terjadi error. Selain aturan wajib, Python juga memiliki panduan gaya penulisan bernama <strong>PEP 8</strong> yang menyarankan penggunaan format <strong>snake_case</strong> (huruf kecil semua dengan pemisah garis bawah/underscore) untuk penulisan variabel dengan lebih dari satu kata.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Variabel di Python bersifat <strong>case-sensitive</strong>, yang berarti variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">skor</code> and <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">Skor</code> dianggap berbeda. Berikut adalah panduan penulisan nama variabel:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Nama Variabel</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Status</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Alasan / Keterangan</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>total_harga</code></td><td class=\"px-3 py-2 text-zinc-700\">Valid (Direkomendasikan)</td><td class=\"px-3 py-2 text-zinc-700\">Mengikuti gaya snake_case standar PEP 8.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>skor1</code></td><td class=\"px-3 py-2 text-zinc-700\">Valid</td><td class=\"px-3 py-2 text-zinc-700\">Angka boleh diletakkan di bagian belakang atau tengah.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>_status</code></td><td class=\"px-3 py-2 text-zinc-700\">Valid</td><td class=\"px-3 py-2 text-zinc-700\">Boleh diawali dengan garis bawah (underscore).</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>1skor</code></td><td class=\"px-3 py-2 text-rose-600\">Invalid</td><td class=\"px-3 py-2 text-zinc-700\">Nama variabel tidak boleh diawali oleh angka.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>total harga</code></td><td class=\"px-3 py-2 text-rose-600\">Invalid</td><td class=\"px-3 py-2 text-zinc-700\">Nama variabel tidak boleh mengandung spasi.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>harga$</code></td><td class=\"px-3 py-2 text-rose-600\">Invalid</td><td class=\"px-3 py-2 text-zinc-700\">Tidak boleh menggunakan karakter spesial seperti $, @, atau %.</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama_pengguna = \"Budi\" # snake_case\numur_user = 20\nprint(nama_pengguna, umur_user)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Budi 20</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "nama_pengguna = \"Budi\"\numur_user = 20\nprint(nama_pengguna, umur_user)",
          initialCode: "# Perbaiki nama variabel di bawah ini agar valid dan sesuai dengan gaya snake_case:\n# 1_nama_depan = \"Andi\"\n# umur user = 21\n#\n# Setelah diperbaiki, cetak kedua variabel tersebut menggunakan print()\n",
          solution: "nama_depan = \"Andi\"\numur_user = 21\nprint(nama_depan)\nprint(umur_user)",
          hint: "Hilangkan angka 1 di depan nama_depan dan ganti spasi pada umur user dengan garis bawah (_).",
          quiz: {
            question: "Manakah nama variabel berikut yang VALID dan direkomendasikan di Python?",
            options: [
              "harga barang = 5000",
              "harga_barang = 5000",
              "3_harga_barang = 5000",
              "harga-barang = 5000"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Andi\n21\n",
              description: "Cetak variabel nama_depan dan umur_user yang valid"
            }
          ],
          validationRules: [
            {
              pattern: "nama_depan\\s*=\\s*[\"']Andi[\"']",
              message: "Variabel nama_depan harus bertipe string 'Andi'",
              shouldExist: true
            },
            {
              pattern: "umur_user\\s*=\\s*21",
              message: "Variabel umur_user harus bertipe integer 21",
              shouldExist: true
            },
            {
              pattern: "1_nama_depan|umur user",
              message: "Jangan gunakan nama variabel dengan spasi atau diawali angka",
              shouldExist: false
            }
          ]
        }
      ]
    },
    {
      id: "p4-m3",
      title: "Tipe Data",
      lessons: [
        {
          id: "p4-l5",
          title: "Tipe data Number (int, float)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data numerik (Number) di Python secara umum terbagi menjadi dua, yaitu <strong>int</strong> (integer) untuk bilangan bulat dan <strong>float</strong> untuk bilangan pecahan atau desimal. Integer digunakan untuk merepresentasikan bilangan positif, negatif, atau nol tanpa pecahan. Float ditandai dengan adanya tanda titik (<code>.</code>) sebagai pemisah desimal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Secara default, Python akan mengubah hasil pembagian biasa menggunakan operator garis miring (<code>/</code>) menjadi tipe <strong>float</strong>, bahkan jika bilangan tersebut habis dibagi. Untuk memeriksa apakah tipe data suatu variabel berupa int atau float, Anda dapat memanggil fungsi <code>type()</code>. Anda juga dapat menggabungkan tipe int dan float dalam operasi matematika, yang hasilnya otomatis akan dikonversi menjadi float.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>a = 10\nb = 2.5\nhasil_tambah = a + b\nhasil_bagi = a / 2\n\nprint(hasil_tambah, type(hasil_tambah))\nprint(hasil_bagi, type(hasil_bagi))</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">12.5 &lt;class 'float'&gt;\n5.0 &lt;class 'float'&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "a = 10\nb = 2.5\nhasil_tambah = a + b\nhasil_bagi = a / 2\nprint(hasil_tambah, type(hasil_tambah))\nprint(hasil_bagi, type(hasil_bagi))",
          initialCode: "# 1. Deklarasikan variabel 'x' bernilai integer 20\n# 2. Deklarasikan variabel 'y' bernilai float 5.5\n# 3. Jumlahkan 'x' dan 'y' lalu simpan ke variabel 'hasil'\n# 4. Cetak variabel 'hasil' beserta tipe datanya menggunakan type()\n",
          solution: "x = 20\ny = 5.5\nhasil = x + y\nprint(hasil)\nprint(type(hasil))",
          hint: "Tulis x = 20 dan y = 5.5, jumlahkan dengan +, lalu cetak hasil dan type(hasil) secara terpisah.",
          quiz: {
            question: "Apakah hasil keluaran tipe data dari ekspresi matematika 10 / 5 di Python?",
            options: [
              "int",
              "float",
              "double",
              "str"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "25.5\n<class 'float'>\n",
              description: "Menampilkan hasil penjumlahan integer dan float serta tipenya"
            }
          ],
          validationRules: [
            {
              pattern: "x\\s*=\\s*20",
              message: "Inisialisasi variabel x dengan integer 20",
              shouldExist: true
            },
            {
              pattern: "y\\s*=\\s*5\\.5",
              message: "Inisialisasi variabel y dengan float 5.5",
              shouldExist: true
            },
            {
              pattern: "hasil\\s*=\\s*x\\s*\\+\\s*y|hasil\\s*=\\s*y\\s*\\+\\s*x",
              message: "Gunakan operator + untuk menjumlahkan x dan y",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l6",
          title: "Tipe data String",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data <strong>String</strong> digunakan untuk merepresentasikan teks. String di Python dibentuk dengan membungkus teks menggunakan tanda petik tunggal (<code>'...'</code>) atau tanda petik ganda (<code>\"...\"</code>). Untuk mendefinisikan string panjang yang terdiri dari beberapa baris, Python mendukung penggunaan tiga tanda petik (<code>\"\"\"...\"\"\"</code> atau <code>'''...'''</code>) yang dikenal sebagai <em>triple quotes</em>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap karakter di dalam string memiliki indeks posisi yang dimulai dari <code>0</code> untuk karakter pertama. Anda dapat mengakses karakter tertentu menggunakan <strong>indexing</strong> (misal: <code>teks[0]</code>) atau memotong string menggunakan teknik <strong>slicing</strong> dengan format <code>teks[start:stop]</code> (di mana batas <code>stop</code> bersifat eksklusif / tidak diikutkan). Panjang dari string dapat dihitung secara instan menggunakan fungsi bawaan <code>len()</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>bahasa = \"Python\"\nchar_pertama = bahasa[0]\nsubstring = bahasa[0:4] # \"Pyth\"\npanjang = len(bahasa)\n\nprint(char_pertama, substring, panjang)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">P Pyth 6</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "bahasa = \"Python\"\nchar_pertama = bahasa[0]\nsubstring = bahasa[0:4]\npanjang = len(bahasa)\nprint(char_pertama, substring, panjang)",
          initialCode: "kata = \"E-Learning\"\n# 1. Cetak karakter pertama dari variabel 'kata' (indeks 0)\n# 2. Cetak substring \"Learn\" menggunakan teknik slicing dari variabel 'kata'\n# 3. Cetak panjang dari string 'kata' menggunakan fungsi len()\n",
          solution: "kata = \"E-Learning\"\nprint(kata[0])\nprint(kata[2:7])\nprint(len(kata))",
          hint: "String \"E-Learning\" memiliki 'L' pada indeks 2 and 'n' pada indeks 6. Untuk slicing \"Learn\", gunakan range [2:7].",
          quiz: {
            question: "Jika diberikan teks = 'Halo', bagaimana cara mengakses huruf 'H' dan menghitung panjang teks tersebut?",
            options: [
              "teks[1] dan size(teks)",
              "teks[0] dan len(teks)",
              "teks{0} dan length(teks)",
              "teks.first() dan teks.count()"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "E\nLearn\n10\n",
              description: "Akses indeks ke-0, slicing Learn, dan menghitung len E-Learning"
            }
          ],
          validationRules: [
            {
              pattern: "kata\\[\\s*0\\s*\\]",
              message: "Gunakan kata[0] untuk mengakses karakter pertama",
              shouldExist: true
            },
            {
              pattern: "kata\\[\\s*2\\s*:\\s*7\\s*\\]",
              message: "Gunakan slicing kata[2:7] untuk memotong string 'Learn'",
              shouldExist: true
            },
            {
              pattern: "len\\(\\s*kata\\s*\\)",
              message: "Gunakan len(kata) untuk mendapatkan panjang string",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l7",
          title: "Tipe data Boolean",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe data <strong>Boolean</strong> di Python merepresentasikan kebenaran suatu pernyataan logika dan hanya memiliki dua nilai: <strong>True</strong> (Benar) dan <strong>False</strong> (Salah). Satu aturan penting di Python yang membedakannya dengan bahasa pemrograman lain adalah penulisan boolean bersifat <strong>case-sensitive</strong> dan harus menggunakan huruf awal kapital (yaitu <code>True</code> dan <code>False</code>), bukan huruf kecil semua.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Di Python, semua objek atau nilai dapat dievaluasi ke dalam tipe boolean. Nilai yang bernilai nol, kosong, atau tidak didefinisikan (seperti angka <code>0</code>, string kosong <code>\"\"</code>, list kosong <code>[]</code>, dan objek <code>None</code>) akan bernilai <strong>falsy</strong> atau dianggap <code>False</code> saat dievaluasi. Sebaliknya, semua nilai yang berisi (angka bukan nol, string tidak kosong) dianggap <strong>truthy</strong> atau bernilai <code>True</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>status_aktif = True\nstatus_lulus = False\n\nprint(status_aktif, type(status_aktif))\nprint(5 &gt; 10) # Menghasilkan False\nprint(bool(\"\")) # Menghasilkan False (string kosong)\nprint(bool(\"Python\")) # Menghasilkan True (string terisi)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True &lt;class 'bool'&gt;\nFalse\nFalse\nTrue</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "status_aktif = True\nstatus_lulus = False\nprint(status_aktif, type(status_aktif))\nprint(5 > 10)\nprint(bool(\"\"))\nprint(bool(\"Python\"))",
          initialCode: "# 1. Deklarasikan variabel 'apakah_hujan' bernilai True\n# 2. Deklarasikan variabel 'apakah_dingin' bernilai False\n# 3. Deklarasikan variabel 'perbandingan' yang menampung hasil evaluasi dari: apakah 10 lebih besar dari 15\n# 4. Cetak ketiga variabel tersebut menggunakan print()\n",
          solution: "apakah_hujan = True\napakah_dingin = False\nperbandingan = 10 > 15\nprint(apakah_hujan)\nprint(apakah_dingin)\nprint(perbandingan)",
          hint: "Gunakan huruf besar untuk True dan False. Operasikan perbandingan 10 > 15 untuk mengisi variabel ketiga.",
          quiz: {
            question: "Nilai manakah di bawah ini yang dievaluasi sebagai False (falsy) secara default di Python?",
            options: [
              "String berisi spasi saja \" \"",
              "Angka integer negatif seperti -5",
              "String kosong \"\"",
              "Angka float desimal 0.1"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "True\nFalse\nFalse\n",
              description: "Cetak boolean hujan, dingin, dan perbandingan 10 > 15"
            }
          ],
          validationRules: [
            {
              pattern: "apakah_hujan\\s*=\\s*True",
              message: "Variabel apakah_hujan harus bernilai True",
              shouldExist: true
            },
            {
              pattern: "apakah_dingin\\s*=\\s*False",
              message: "Variabel apakah_dingin harus bernilai False",
              shouldExist: true
            },
            {
              pattern: "perbandingan\\s*=\\s*10\\s*>\\s*15",
              message: "Evaluasi perbandingan 10 > 15 ke variabel perbandingan",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l8",
          title: "Konversi tipe data",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Konversi tipe data (disebut juga <strong>Type Casting</strong>) adalah teknik mengubah tipe data suatu variabel menjadi tipe data lain. Di Python, proses ini sangat mudah dilakukan dengan memanggil fungsi bawaan yang mewakili nama tipe data tujuan. Konversi ini sangat krusial digunakan saat kita mengambil input dari user yang bertipe string, sementara program kita memerlukan perhitungan matematika.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut ini adalah tabel fungsi casting yang sering digunakan beserta contoh perilakunya:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Fungsi Casting</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Tujuan Konversi</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Hasil</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>int(x)</code></td><td class=\"px-3 py-2 text-zinc-700\">Mengubah <code>x</code> menjadi Integer (Bilangan Bulat)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>int(\"45\")</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>45</code> (int)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>float(x)</code></td><td class=\"px-3 py-2 text-zinc-700\">Mengubah <code>x</code> menjadi Float (Bilangan Desimal)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>float(\"3.14\")</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>3.14</code> (float)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>str(x)</code></td><td class=\"px-3 py-2 text-zinc-700\">Mengubah <code>x</code> menjadi String (Teks)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>str(100)</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>\"100\"</code> (string)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>bool(x)</code></td><td class=\"px-3 py-2 text-zinc-700\">Mengubah <code>x</code> menjadi Boolean (Kebenaran)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>bool(0)</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code> (bool)</td></tr></tbody></table>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Harap diingat bahwa konversi teks ke numerik akan menghasilkan <code>ValueError</code> jika teks tersebut berisi karakter non-angka (misalnya memanggil <code>int(\"abc\")</code>).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka_teks = \"123\"\nangka_int = int(angka_teks)\nprint(angka_int + 7) # Hasil: 130</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">130</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "angka_teks = \"123\"\nangka_int = int(angka_teks)\nprint(angka_int + 7)",
          initialCode: "s_nilai = \"85.5\"\ni_skor = 100\n# 1. Konversikan variabel 's_nilai' menjadi float dan simpan di variabel 'nilai_float'\n# 2. Konversikan variabel 'i_skor' menjadi string dan simpan di variabel 'skor_str'\n# 3. Cetak hasil penjumlahan 'nilai_float' dengan 5\n# 4. Cetak tipe data dari variabel 'skor_str' menggunakan print(type(...))\n",
          solution: "s_nilai = \"85.5\"\ni_skor = 100\nnilai_float = float(s_nilai)\nskor_str = str(i_skor)\nprint(nilai_float + 5)\nprint(type(skor_str))",
          hint: "Gunakan float(s_nilai) untuk mengonversi ke pecahan, dan str(i_skor) untuk mengubah integer ke string.",
          quiz: {
            question: "Manakah di bawah ini yang akan menghasilkan error (ValueError) saat dijalankan di interpreter Python?",
            options: [
              "float(\"3.14\")",
              "int(\"88\")",
              "int(\"99.5\")",
              "str(True)"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "90.5\n<class 'str'>\n",
              description: "Menampilkan hasil kalkulasi float casting dan tipe data dari string casting"
            }
          ],
          validationRules: [
            {
              pattern: "nilai_float\\s*=\\s*float\\(\\s*s_nilai\\s*\\)",
              message: "Lakukan konversi s_nilai ke float dan simpan ke nilai_float",
              shouldExist: true
            },
            {
              pattern: "skor_str\\s*=\\s*str\\(\\s*i_skor\\s*\\)",
              message: "Lakukan konversi i_skor ke string dan simpan ke skor_str",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p4-m4",
      title: "Operator",
      lessons: [
        {
          id: "p4-l9",
          title: "Operator Aritmatika",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator aritmatika digunakan untuk melakukan operasi matematika dasar. Selain operator penjumlahan, pengurangan, perkalian, dan pembagian yang sudah umum, Python memiliki beberapa operator unik yang mempermudah proses komputasi tanpa perlu memanggil pustaka matematika eksternal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dua operator unik tersebut adalah <strong>pembagian bulat</strong> (<code>//</code>) dan <strong>perpangkatan</strong> (<code>**</code>). Pembagian bulat akan membagi bilangan lalu membulatkannya ke bawah menjadi integer terdekat, sedangkan perpangkatan memangkatkan angka dasar dengan angka pangkatnya. Berikut detail operator aritmatika di Python:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Operator</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Operasi</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Hasil</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>+</code></td><td class=\"px-3 py-2 text-zinc-700\">Penjumlahan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 + 3</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>8</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>-</code></td><td class=\"px-3 py-2 text-zinc-700\">Pengurangan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 - 3</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>2</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>*</code></td><td class=\"px-3 py-2 text-zinc-700\">Perkalian</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 * 3</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>15</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>/</code></td><td class=\"px-3 py-2 text-zinc-700\">Pembagian (float)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 / 2</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>2.5</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>//</code></td><td class=\"px-3 py-2 text-zinc-700\">Pembagian Bulat</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 // 2</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>2</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>%</code></td><td class=\"px-3 py-2 text-zinc-700\">Sisa Bagi (Modulo)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 % 2</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>1</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>**</code></td><td class=\"px-3 py-2 text-zinc-700\">Perpangkatan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>5 ** 3</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>125</code></td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(10 // 3) # Hasil pembagian bulat: 3\nprint(2 ** 5)  # Hasil 2 pangkat 5: 32</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">3\n32</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "print(10 // 3)\nprint(2 ** 5)",
          initialCode: "a = 17\nb = 5\n# 1. Hitung sisa bagi dari 'a' dibagi 'b' dan simpan di variabel 'sisa'\n# 2. Hitung 'a' pangkat 3 dan simpan di variabel 'pangkat'\n# 3. Hitung pembagian bulat dari 'a' dibagi 'b' dan simpan di variabel 'bulat'\n# Cetak variabel sisa, pangkat, dan bulat secara berurutan menggunakan print()\n",
          solution: "a = 17\nb = 5\nsisa = a % b\npangkat = a ** 3\nbulat = a // b\nprint(sisa)\nprint(pangkat)\nprint(bulat)",
          hint: "Gunakan operator % untuk sisa bagi, ** untuk pangkat, dan // untuk pembagian bulat.",
          quiz: {
            question: "Apakah output dari operasi 15 // 4 di Python?",
            options: [
              "3.75",
              "3",
              "4",
              "1"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "2\n4913\n3\n",
              description: "Menampilkan modulo (2), pangkat 3 (4913), dan pembagian bulat (3)"
            }
          ],
          validationRules: [
            {
              pattern: "sisa\\s*=\\s*a\\s*%\\s*b",
              message: "Hitung sisa bagi dengan operator %",
              shouldExist: true
            },
            {
              pattern: "pangkat\\s*=\\s*a\\s*\\*\\*\\s*3",
              message: "Hitung perpangkatan dengan operator **",
              shouldExist: true
            },
            {
              pattern: "bulat\\s*=\\s*a\\s*//\\s*b",
              message: "Hitung pembagian bulat dengan operator //",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l10",
          title: "Operator Perbandingan",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan digunakan untuk membandingkan dua buah nilai. Evaluasi dari ekspresi perbandingan ini akan selalu menghasilkan nilai Boolean: <code>True</code> atau <code>False</code>. Operator ini sangat penting digunakan untuk menyusun struktur kontrol pengambilan keputusan (<em>percabangan</em>) maupun perulangan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut ini adalah operator perbandingan yang tersedia di Python beserta perilakunya:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Operator</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Keterangan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Hasil (jika x = 10, y = 12)</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>==</code></td><td class=\"px-3 py-2 text-zinc-700\">Sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>x == y</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>!=</code></td><td class=\"px-3 py-2 text-zinc-700\">Tidak sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>x != y</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>&gt;</code></td><td class=\"px-3 py-2 text-zinc-700\">Lebih besar dari</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>x &gt; y</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>&lt;</code></td><td class=\"px-3 py-2 text-zinc-700\">Lebih kecil dari</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>x &lt; y</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>&gt;=</code></td><td class=\"px-3 py-2 text-zinc-700\">Lebih besar atau sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>x &gt;= 10</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>&lt;=</code></td><td class=\"px-3 py-2 text-zinc-700\">Lebih kecil atau sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>y &lt;= 12</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td></tr></tbody></table>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hati-hati jangan sampai tertukar antara operator penugasan sama dengan tunggal (<code>=</code>) yang berfungsi menyimpan nilai ke variabel dengan operator pembanding kesamaan ganda (<code>==</code>).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai_siswa = 78\nstatus_lulus = nilai_siswa &gt;= 75\nprint(status_lulus) # Hasil: True</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "nilai_siswa = 78\nstatus_lulus = nilai_siswa >= 75\nprint(status_lulus)",
          initialCode: "a = 45\nb = 50\n# 1. Bandingkan apakah 'a' tidak sama dengan 'b', cetak hasilnya menggunakan print()\n# 2. Bandingkan apakah 'a' lebih kecil atau sama dengan 'b', cetak hasilnya menggunakan print()\n",
          solution: "a = 45\nb = 50\nprint(a != b)\nprint(a <= b)",
          hint: "Gunakan operator != untuk tidak sama dengan, dan <= untuk lebih kecil atau sama dengan.",
          quiz: {
            question: "Manakah operator perbandingan yang digunakan untuk membandingkan apakah dua nilai tidak sama di Python?",
            options: [
              "<>",
              "!==",
              "!=",
              "not"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "True\nTrue\n",
              description: "Cetak hasil perbandingan 45 != 50 dan 45 <= 50"
            }
          ],
          validationRules: [
            {
              pattern: "a\\s*!=\\s*b",
              message: "Bandingkan ketidaksamaan a dan b dengan operator !=",
              shouldExist: true
            },
            {
              pattern: "a\\s*<=\\s*b",
              message: "Bandingkan apakah a lebih kecil atau sama dengan b dengan operator <= ",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l11",
          title: "Operator Logika",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dengan bahasa C yang menggunakan simbol-simbol khusus seperti <code>&amp;&amp;</code> (AND), <code>||</code> (OR), dan <code>!</code> (NOT), Python menggunakan kata kunci bahasa Inggris yang murni dan bersih untuk merepresentasikan operator logika, yaitu: <strong>and</strong>, <strong>or</strong>, dan <strong>not</strong>. Ini membuat penulisan logika di Python menjadi jauh lebih mudah dibaca.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut adalah tabel kebenaran untuk operator logika di Python:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Ekspresi A</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Ekspresi B</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\"><code>A and B</code></th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\"><code>A or B</code></th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\"><code>not A</code></th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700 font-mono\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>False</code></td><td class=\"px-3 py-2 text-zinc-700\"><code>True</code></td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>hujan = True\nada_payung = False\n\n# Pergi jika tidak hujan ATAU punya payung\nboleh_pergi = not hujan or ada_payung\nprint(boleh_pergi) # Hasil: False</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">False</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "hujan = True\nada_payung = False\nboleh_pergi = not hujan or ada_payung\nprint(boleh_pergi)",
          initialCode: "umur = 18\npunya_sim = True\n# Evaluasi apakah umur lebih besar atau sama dengan 17 DAN punya_sim bernilai True\n# Simpan hasil evaluasi ke variabel 'boleh_mengemudi', lalu cetak nilai boleh_mengemudi\n",
          solution: "umur = 18\npunya_sim = True\nboleh_mengemudi = (umur >= 17) and punya_sim\nprint(boleh_mengemudi)",
          hint: "Gunakan operator logika and (huruf kecil semua) di antara kedua kondisi tersebut.",
          quiz: {
            question: "Manakah penulisan operator logika AND, OR, dan NOT yang valid dalam Python?",
            options: [
              "&&, ||, !",
              "AND, OR, NOT",
              "and, or, not",
              "&, |, ~"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              expectedOutput: "True\n",
              description: "Evaluasi umur >= 17 dan punya SIM menghasilkan True"
            }
          ],
          validationRules: [
            {
              pattern: "\\band\\b",
              message: "Gunakan operator logika and untuk kondisi DAN",
              shouldExist: true
            },
            {
              pattern: "boleh_mengemudi\\s*=",
              message: "Simpan hasil evaluasi ke variabel boleh_mengemudi",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p4-m5",
      title: "Menginput/Memasukkan Data",
      lessons: [
        {
          id: "p4-l12",
          title: "Fungsi input()",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk berinteraksi dengan pengguna, program seringkali memerlukan masukan data dari keyboard saat runtime. Python menyediakan fungsi bawaan bernama <code>input()</code> untuk tujuan ini. Saat pemanggilan fungsi ini dijalankan, interpreter akan menjeda alur eksekusi program dan menunggu sampai pengguna mengetikkan teks dan menekan tombol Enter.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Anda dapat memberikan string di dalam tanda kurung <code>input(\"Masukkan sesuatu: \")</code> sebagai teks petunjuk (prompt) yang ditampilkan kepada pengguna sebelum mengetik. Hal <strong>terpenting</strong> yang harus dipahami adalah fungsi <code>input()</code> <strong>selalu mengembalikan nilai bertipe String (str)</strong>, meskipun data yang dimasukkan oleh pengguna berupa angka atau data jenis lain.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = input(\"Masukkan nama Anda: \")\nprint(\"Halo \" + nama)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan nama Anda: Budi\nHalo Budi</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "nama = input(\"Masukkan nama Anda: \")\nprint(\"Halo \" + nama)",
          initialCode: "# Minta masukan hobi dari pengguna menggunakan input() dengan prompt \"Masukkan hobi Anda: \"\n# Simpan hasil input ke dalam variabel bernama 'hobi'\n# Cetak pesan \"Hobi saya: \" digabungkan dengan nilai variabel 'hobi'\n",
          solution: "hobi = input(\"Masukkan hobi Anda: \")\nprint(\"Hobi saya: \" + hobi)",
          hint: "Tulis hobi = input(\"Masukkan hobi Anda: \") lalu gabungkan string menggunakan operator +.",
          quiz: {
            question: "Apakah tipe data yang dikembalikan oleh fungsi input() di Python secara default?",
            options: [
              "Integer (int)",
              "Tergantung pada input yang dimasukkan user",
              "String (str)",
              "Boolean (bool)"
            ],
            correctAnswer: 2
          },
          testCases: [
            {
              input: "Membaca",
              expectedOutput: "Masukkan hobi Anda: Hobi saya: Membaca\n",
              description: "Simulasi memasukkan hobi 'Membaca'"
            }
          ],
          validationRules: [
            {
              pattern: "input\\(\\s*[\"']Masukkan hobi Anda: [\"']\\s*\\)",
              message: "Gunakan fungsi input() dengan prompt 'Masukkan hobi Anda: '",
              shouldExist: true
            },
            {
              pattern: "hobi\\s*=",
              message: "Simpan hasil input ke dalam variabel hobi",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l13",
          title: "Mengubah input menjadi integer",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Karena fungsi <code>input()</code> selalu menghasilkan nilai string, kita tidak bisa secara langsung menggunakannya dalam operasi matematika. Misalnya, jika pengguna memasukkan angka <code>5</code> dan kita mencoba mengalikannya dengan 2, Python akan menduplikasi string tersebut menjadi <code>\"55\"</code> daripada menghasilkan <code>10</code>. Kita harus melakukan <strong>type casting</strong> segera setelah menerima input.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk mengubah string input menjadi bilangan bulat, kita membungkus fungsi <code>input()</code> di dalam fungsi <code>int()</code> (contoh: <code>int(input())</code>). Jika input tersebut berupa angka desimal, kita membungkusnya dengan <code>float(input())</code>. Jika pengguna memasukkan teks non-angka, Python akan memunculkan error <code>ValueError</code>, sehingga penulisan input numerik harus dipastikan valid.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>usia_str = input(\"Masukkan usia Anda: \")\nusia_int = int(usia_str)\nprint(usia_int + 5)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan usia Anda: 20\n25</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "usia_str = input(\"Masukkan usia Anda: \")\nusia_int = int(usia_str)\nprint(usia_int + 5)",
          initialCode: "# Minta masukan angka pertama dari pengguna dengan prompt \"Angka pertama: \" dan konversikan langsung ke integer\n# Simpan ke variabel 'angka1'\n# Minta masukan angka kedua dari pengguna dengan prompt \"Angka kedua: \" dan konversikan langsung ke integer\n# Simpan ke variabel 'angka2'\n# Cetak hasil penjumlahan 'angka1' dan 'angka2'\n",
          solution: "angka1 = int(input(\"Angka pertama: \"))\nangka2 = int(input(\"Angka kedua: \"))\nprint(angka1 + angka2)",
          hint: "Bungkus fungsi input() dengan int() seperti int(input(\"Angka pertama: \")).",
          quiz: {
            question: "Apa yang terjadi jika program mencoba mengeksekusi int(input(\"Angka: \")) dan pengguna mengetikkan teks \"duabelas\"?",
            options: [
              "Program akan berjalan normal dan menyimpan angka 12",
              "Program akan menghasilkan ValueError dan terhenti",
              "Program secara otomatis mengabaikan input tersebut dan menyimpan angka 0",
              "Program akan memperlakukan kata \"duabelas\" sebagai string biasa"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              input: "15\n25\n",
              expectedOutput: "Angka pertama: Angka kedua: 40\n",
              description: "Simulasi memasukkan angka 15 dan 25 untuk dijumlahkan"
            }
          ],
          validationRules: [
            {
              pattern: "int\\(\\s*input\\(\\s*[\"']Angka pertama: [\"']\\s*\\)\\s*\\)",
              message: "Gunakan int(input('Angka pertama: '))",
              shouldExist: true
            },
            {
              pattern: "int\\(\\s*input\\(\\s*[\"']Angka kedua: [\"']\\s*\\)\\s*\\)",
              message: "Gunakan int(input('Angka kedua: '))",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p4-m6",
      title: "Menampilkan Data",
      lessons: [
        {
          id: "p4-l14",
          title: "Fungsi print()",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi <code>print()</code> digunakan untuk menampilkan informasi ke layar terminal. Secara default, fungsi <code>print()</code> menerima satu atau lebih argumen yang dipisahkan oleh tanda koma, dan secara otomatis mencetak karakter spasi sebagai pemisah antar argumen tersebut, serta menambahkan karakter baris baru (<code>\\n</code>) di akhir output.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Anda dapat mengubah perilaku bawaan ini menggunakan dua parameter opsional bernama <code>sep</code> (pemisah antar argumen) dan <code>end</code> (karakter di akhir output). Misalnya, jika kita tidak ingin fungsi print secara otomatis berpindah ke baris baru, kita bisa mengatur <code>end=\"\"</code> (string kosong).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Mengubah pemisah (sep) dan akhir baris (end)\nprint(\"Apel\", \"Jeruk\", sep=\"-\")\nprint(\"Satu\", end=\", \")\nprint(\"Dua\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Apel-Jeruk\nSatu, Dua</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "print(\"Apel\", \"Jeruk\", sep=\"-\")\nprint(\"Satu\", end=\", \")\nprint(\"Dua\")",
          initialCode: "# 1. Cetak kata \"Python\", \"Keren\", dan \"Sekali\" dalam satu fungsi print() menggunakan pemisah sep=\" | \"\n# 2. Cetak angka 1, 2, dan 3 di baris berikutnya, di mana setelah mencetak angka 1 gunakan end=\" -> \" agar bersambung di baris yang sama dengan angka 2 dan 3\n# (Format cetakan: 1 -> 2 -> 3)\n",
          solution: "print(\"Python\", \"Keren\", \"Sekali\", sep=\" | \")\nprint(1, end=\" -> \")\nprint(2, end=\" -> \")\nprint(3)",
          hint: "Gunakan sep=\" | \" pada print pertama, dan end=\" -> \" pada print angka 1 dan 2.",
          quiz: {
            question: "Apakah kegunaan dari parameter end pada fungsi print() di Python?",
            options: [
              "Menentukan jumlah spasi pemisah antar kata",
              "Mengganti karakter default baris baru (newline) di ujung output dengan karakter lain",
              "Memaksa program berhenti secara langsung setelah mencetak",
              "Mengubah tipe data variabel yang dicetak menjadi string"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Python | Keren | Sekali\n1 -> 2 -> 3\n",
              description: "Menampilkan format cetakan custom sep dan end"
            }
          ],
          validationRules: [
            {
              pattern: "sep\\s*=\\s*[\"']\\s*\\|\\s*[\"']",
              message: "Gunakan parameter sep=' | '",
              shouldExist: true
            },
            {
              pattern: "end\\s*=\\s*[\"']\\s*->\\s*[\"']",
              message: "Gunakan parameter end=' -> ' untuk menyambung output",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l15",
          title: "Menampilkan string dan variabel (f-string)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Di Python, cara paling modern dan efisien untuk menyisipkan variabel atau ekspresi ke dalam string adalah menggunakan fitur <strong>f-string</strong> (<em>Formatted String Literals</em>). f-string dibuat dengan menambahkan huruf <code>f</code> atau <code>F</code> tepat sebelum tanda petik pembuka string. Setelah itu, variabel atau ekspresi matematika dapat ditaruh langsung di dalam tanda kurung kurawal <code>{...}</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain menyisipkan nilai, f-string juga sangat andal untuk memformat tampilan angka desimal. Misalnya, jika Anda ingin membatasi angka float hanya menampilkan 2 digit di belakang koma desimal, Anda bisa menyisipkan format khusus <code>:.2f</code> setelah nama variabel di dalam kurung kurawal (contoh: <code>{nilai:.2f}</code>).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = \"Budi\"\npi = 3.14159\n\n# Menyisipkan variabel dan memformat pecahan desimal\nprint(f\"Halo, {nama}!\")\nprint(f\"Nilai PI: {pi:.2f}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Budi!\nNilai PI: 3.14</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "nama = \"Budi\"\npi = 3.14159\nprint(f\"Halo, {nama}!\")\nprint(f\"Nilai PI: {pi:.2f}\")",
          initialCode: "nama_produk = \"Kopi\"\nharga = 12500.756\n# Gunakan f-string untuk mencetak kalimat: \"Produk [nama_produk] seharga Rp [harga]\"\n# Format variabel 'harga' agar hanya menampilkan 2 digit di belakang koma desimal\n",
          solution: "nama_produk = \"Kopi\"\nharga = 12500.756\nprint(f\"Produk {nama_produk} seharga Rp {harga:.2f}\")",
          hint: "Tulis f\"Produk {nama_produk} seharga Rp {harga:.2f}\" di dalam fungsi print().",
          quiz: {
            question: "Bagaimanakah cara penulisan sintaks f-string yang benar di Python?",
            options: [
              "print(\"Halo %s\" % nama)",
              "print(f\"Halo {nama}\")",
              "print(\"Halo \" + f(nama))",
              "print(format(\"Halo {}\", nama))"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Produk Kopi seharga Rp 12500.76\n",
              description: "Menampilkan nama produk dan harga terformat 2 desimal"
            }
          ],
          validationRules: [
            {
              pattern: "f[\"'].*\\{nama_produk\\}.*\\{harga:.2f\\}.*[\"']",
              message: "Gunakan f-string dengan formatting {harga:.2f} untuk variabel harga",
              shouldExist: true
            }
          ]
        },
        {
          id: "p4-l16",
          title: "Menggabungkan (concatenate) string",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Penggabungan string (<em>string concatenation</em>) adalah proses menempelkan beberapa string menjadi satu string utuh. Di Python, operator tambah (<code>+</code>) dapat digunakan untuk menempelkan string secara langsung. Hal penting yang perlu ingat adalah Python tidak memperbolehkan penggabungan secara langsung antara string dengan tipe numerik (seperti integer atau float). Anda harus mengonversinya terlebih dahulu ke string menggunakan fungsi <code>str()</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain operator tambah, Python juga menyediakan metode <code>.join()</code>. Metode ini sangat berguna untuk menggabungkan sekumpulan string yang berada di dalam sebuah list dengan menggunakan karakter pembatas tertentu secara rapi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>kata1 = \"Belajar\"\nkata2 = \"Python\"\nhasil = kata1 + \" \" + kata2\nprint(hasil)\n\n# Menggabungkan list string\nlist_kata = [\"A\", \"B\", \"C\"]\ngabungan = \"-\".join(list_kata)\nprint(gabungan)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Belajar Python\nA-B-C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "kata1 = \"Belajar\"\nkata2 = \"Python\"\nhasil = kata1 + \" \" + kata2\nprint(hasil)\nlist_kata = [\"A\", \"B\", \"C\"]\ngabungan = \"-\".join(list_kata)\nprint(gabungan)",
          initialCode: "nama = \"Andi\"\nskor = 90\n# Gabungkan string \"Nama: \" dengan variabel 'nama', dan sambung lagi dengan \" mendapat skor \" serta variabel 'skor'\n# Simpan ke variabel 'pesan'\n# Ingat untuk mengonversi variabel 'skor' ke string agar tidak error!\n# Cetak variabel 'pesan'\n",
          solution: "nama = \"Andi\"\nskor = 90\npesan = \"Nama: \" + nama + \" mendapat skor \" + str(skor)\nprint(pesan)",
          hint: "Gunakan str(skor) untuk mengubah integer 90 menjadi string sebelum digabungkan dengan operator +.",
          quiz: {
            question: "Apakah yang akan terjadi jika kita mengeksekusi print(\"Skor: \" + 100) secara langsung di Python?",
            options: [
              "Mencetak teks \"Skor: 100\"",
              "Mengalami TypeError karena menggabungkan string dan integer secara langsung",
              "Mencetak angka 100 saja",
              "Menghasilkan nilai False"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Nama: Andi mendapat skor 90\n",
              description: "Menampilkan pesan gabungan string dan integer casting"
            }
          ],
          validationRules: [
            {
              pattern: "str\\(\\s*skor\\s*\\)",
              message: "Gunakan str(skor) untuk mengubah integer menjadi string",
              shouldExist: true
            },
            {
              pattern: "\\+\\s*str\\(",
              message: "Gunakan operator + untuk menggabungkan string",
              shouldExist: true
            }
          ]
        }
      ]
    }
  ]
}
