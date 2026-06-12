{
  id: "p-level-6",
  title: "LIST, DICTIONARY, DAN OPERASI FILE",
  description: "Membahas list dan sifat mutable, dictionary dengan key-value pairs, serta operasi file dengan context manager (with open).",
  modules: [
    {
      id: "p6-m1",
      title: "List",
      lessons: [
        {
          id: "p6-l1",
          title: "Konsep list dan sifat mutable",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">List di Python adalah tipe data koleksi terurut yang digunakan untuk menyimpan banyak item dalam satu variabel. List bersifat <strong>mutable</strong>, artinya elemen-elemen di dalamnya dapat diubah, ditambah, atau dihapus setelah dideklarasikan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">List didefinisikan menggunakan tanda kurung siku <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[]</code> dengan elemen yang dipisahkan koma. List dapat menyimpan tipe data yang berbeda (mixed types) seperti integer, string, dan boolean secara bersamaan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Akses elemen dilakukan dengan indeks berbasis 0. Python mendukung negative indexing (indeks negatif) di mana <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-1</code> menunjuk ke elemen terakhir, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-2</code> untuk elemen sebelum terakhir, dst. Gunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">len()</code> untuk mendapatkan panjang list.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>buah = [\"apel\", \"pisang\", \"mangga\"]\nprint(buah[0])      # apel\nprint(buah[-1])     # mangga\nbuah[1] = \"jeruk\"\nprint(buah)         # ['apel', 'jeruk', 'mangga']\ncampuran = [1, \"Python\", True, 3.14]\nprint(len(campuran)) # 4</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">apel\nmangga\n['apel', 'jeruk', 'mangga']\n4</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "buah = [\"apel\", \"pisang\", \"mangga\"]\nprint(buah[0])\nprint(buah[-1])\nbuah[1] = \"jeruk\"\nprint(buah)\ncampuran = [1, \"Python\", True, 3.14]\nprint(len(campuran))",
          initialCode: "# Buatlah list bernama 'hobi' berisi 3 string: \"membaca\", \"menulis\", \"berenang\"\n# Ganti elemen kedua (\"menulis\") menjadi \"coding\" karena list bersifat mutable\n# Cetak hobi tersebut\n# Cetak elemen terakhir dari list menggunakan indeks negatif\n# Cetak panjang list hobi menggunakan fungsi len()\n",
          solution: "hobi = [\"membaca\", \"menulis\", \"berenang\"]\nhobi[1] = \"coding\"\nprint(hobi)\nprint(hobi[-1])\nprint(len(hobi))",
          hint: "Ganti hobi[1] menjadi 'coding', cetak hobi, lalu gunakan hobi[-1] untuk elemen terakhir, dan len(hobi) untuk panjang list.",
          quiz: {
            question: "Apa arti sifat 'mutable' pada tipe data list di Python?",
            options: [
              "Elemen di dalamnya tidak dapat diubah setelah dibuat",
              "Elemen di dalamnya dapat diubah, ditambah, atau dihapus setelah dideklarasikan",
              "List hanya bisa menampung satu jenis tipe data saja",
              "List otomatis diurutkan dari nilai terkecil ke terbesar"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "['membaca', 'coding', 'berenang']\nberenang\n3\n",
              description: "Cetak list yang dimodifikasi, elemen terakhir, dan panjang list"
            }
          ],
          validationRules: [
            {
              pattern: "hobi\\s*=\\s*\\[\\s*([\"'])membaca\\1\\s*,\\s*([\"'])menulis\\2\\s*,\\s*([\"'])berenang\\3\\s*\\]",
              message: "Deklarasikan list hobi berisi 'membaca', 'menulis', 'berenang'",
              shouldExist: true
            },
            {
              pattern: "hobi\\[1\\]\\s*=\\s*([\"'])coding\\1",
              message: "Ganti elemen kedua (indeks 1) menjadi 'coding'",
              shouldExist: true
            },
            {
              pattern: "hobi\\[-1\\]",
              message: "Gunakan indeks negatif -1 untuk mengambil elemen terakhir",
              shouldExist: true
            },
            {
              pattern: "len\\(hobi\\)",
              message: "Gunakan fungsi len() untuk mendapatkan panjang list",
              shouldExist: true
            }
          ]
        },
        {
          id: "p6-l2",
          title: "Fungsi list (insert, pop, sort, delete, dll)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menyediakan berbagai metode bawaan (built-in methods) untuk memanipulasi list. Metode ini memungkinkan kita untuk menambah, menghapus, menyisipkan, dan mengurutkan elemen list dengan mudah.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menambah elemen, gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.append()</code> di akhir list, atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.insert()</code> untuk menyisipkan pada indeks tertentu. Untuk menghapus, gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.pop()</code> (menghapus berdasarkan indeks dan mengembalikan nilainya), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.remove()</code> (menghapus elemen berdasarkan nilainya), atau pernyataan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">del</code> untuk menghapus elemen pada indeks tertentu tanpa mengembalikan nilai.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk pengurutan, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.sort()</code> digunakan untuk mengurutkan secara <em>in-place</em> (mengubah list asli), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.reverse()</code> untuk membalik urutan elemen.</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Metode / Sintaks</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Deskripsi</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh Penggunaan</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">list.append(x)</td><td class=\"px-3 py-2 text-zinc-700\">Menambahkan elemen x di akhir list</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">angka.append(10)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">list.insert(i, x)</td><td class=\"px-3 py-2 text-zinc-700\">Menyisipkan x pada posisi indeks i</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">angka.insert(0, 5)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">list.pop(i)</td><td class=\"px-3 py-2 text-zinc-700\">Menghapus dan mengembalikan elemen di indeks i (default terakhir)</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">terhapus = angka.pop()</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">list.remove(x)</td><td class=\"px-3 py-2 text-zinc-700\">Menghapus elemen pertama yang bernilai x</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">angka.remove(10)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">list.sort()</td><td class=\"px-3 py-2 text-zinc-700\">Mengurutkan elemen list secara ascending</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">angka.sort()</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">list.reverse()</td><td class=\"px-3 py-2 text-zinc-700\">Membalikkan urutan elemen list</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">angka.reverse()</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">del list[i]</td><td class=\"px-3 py-2 text-zinc-700\">Menghapus elemen pada indeks i secara langsung</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">del angka[0]</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka = [3, 1, 4]\nangka.append(2)\nangka.insert(1, 5)\nprint(angka)         # [3, 5, 1, 4, 2]\nangka.sort()\nprint(angka)         # [1, 2, 3, 4, 5]\nterakhir = angka.pop()\nprint(terakhir)      # 5\nprint(angka)         # [1, 2, 3, 4]</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">[3, 5, 1, 4, 2]\n[1, 2, 3, 4, 5]\n5\n[1, 2, 3, 4]</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "angka = [3, 1, 4]\nangka.append(2)\nangka.insert(1, 5)\nprint(angka)\nangka.sort()\nprint(angka)\nterakhir = angka.pop()\nprint(terakhir)\nprint(angka)",
          initialCode: "# Buat list nilai = [80, 95, 70]\n# 1. Tambahkan nilai 85 ke akhir list menggunakan append\n# 2. Sisipkan nilai 90 ke indeks ke-1 menggunakan insert\n# 3. Urutkan list nilai secara ascending (kecil ke besar) dengan sort()\n# 4. Hapus elemen terakhir list menggunakan pop() dan simpan hasilnya di variabel 'terbuang'\n# 5. Cetak list nilai\n# 6. Cetak variabel terbuang\n",
          solution: "nilai = [80, 95, 70]\nnilai.append(85)\nnilai.insert(1, 90)\nnilai.sort()\nterbuang = nilai.pop()\nprint(nilai)\nprint(terbuang)",
          hint: "Gunakan nilai.append(85), nilai.insert(1, 90), nilai.sort(), terbuang = nilai.pop(), lalu cetak nilai dan terbuang.",
          quiz: {
            question: "Apa perbedaan utama antara metode pop() dan remove() pada list di Python?",
            options: [
              "pop() menghapus elemen berdasarkan indeks dan mengembalikannya, sedangkan remove() menghapus elemen berdasarkan nilainya tanpa mengembalikan nilai",
              "pop() menghapus seluruh list, sedangkan remove() hanya menghapus satu elemen",
              "pop() hanya menghapus dari awal list, sedangkan remove() menghapus dari akhir list",
              "pop() memerlukan nilai elemen, sedangkan remove() memerlukan indeks elemen"
            ],
            correctAnswer: 0
          },
          testCases: [
            {
              expectedOutput: "[70, 80, 85, 90]\n95\n",
              description: "Urutkan nilai dan hapus elemen terbesar"
            }
          ],
          validationRules: [
            {
              pattern: "nilai\\.append\\(\\s*85\\s*\\)",
              message: "Gunakan metode append() untuk menambah 85",
              shouldExist: true
            },
            {
              pattern: "nilai\\.insert\\(\\s*1\\s*,\\s*90\\s*\\)",
              message: "Gunakan metode insert() pada indeks 1 untuk nilai 90",
              shouldExist: true
            },
            {
              pattern: "nilai\\.sort\\(\\)",
              message: "Gunakan metode sort() untuk mengurutkan list",
              shouldExist: true
            },
            {
              pattern: "terbuang\\s*=\\s*nilai\\.pop\\(\\)",
              message: "Hapus elemen terakhir menggunakan pop() dan simpan ke variabel terbuang",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p6-m2",
      title: "Dictionary",
      lessons: [
        {
          id: "p6-l3",
          title: "Konsep key-value pairs",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Dictionary (atau disingkat dict) di Python adalah struktur data yang menyimpan data dalam bentuk pasangan kunci dan nilai (<strong>key-value pairs</strong>). Berbeda dengan list yang menggunakan indeks angka terurut, dictionary menggunakan <em>key</em> (kunci) unik yang kita definisikan sendiri untuk mengakses nilai (<em>value</em>) pasangannya.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dictionary dideklarasikan menggunakan kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> dengan format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">key: value</code>, yang dipisahkan oleh tanda koma. Kunci (<em>key</em>) harus bersifat unik dan tidak dapat diubah (seperti string, integer, atau tuple), sedangkan nilai (<em>value</em>) bisa berupa tipe data apa saja dan boleh duplikat. Jika kita mengakses kunci yang tidak ada, Python akan menghasilkan error bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">KeyError</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Menambah atau memperbarui entri dalam dictionary dilakukan dengan cara yang sama: menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">dict[key] = value</code>. Jika kunci belum ada, entri baru akan ditambahkan; jika sudah ada, nilainya akan diperbarui secara otomatis.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>kontak = {\"Budi\": \"0812\", \"Ani\": \"0813\"}\nprint(kontak[\"Budi\"])        # 0812\nkontak[\"Ani\"] = \"0899\"        # Update nilai\nkontak[\"Cici\"] = \"0857\"       # Tambah entri baru\nprint(kontak)                # {'Budi': '0812', 'Ani': '0899', 'Cici': '0857'}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">0812\n{'Budi': '0812', 'Ani': '0899', 'Cici': '0857'}</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "kontak = {\"Budi\": \"0812\", \"Ani\": \"0813\"}\nprint(kontak[\"Budi\"])\nkontak[\"Ani\"] = \"0899\"\nkontak[\"Cici\"] = \"0857\"\nprint(kontak)",
          initialCode: "# Buatlah dictionary bernama 'stok' berisi: \"apel\": 10, \"jeruk\": 15\n# 1. Cetak stok jeruk dengan mengakses stok[\"jeruk\"]\n# 2. Perbarui stok apel menjadi 12\n# 3. Tambahkan buah baru \"mangga\" dengan stok 8\n# 4. Cetak dictionary stok tersebut\n",
          solution: "stok = {\"apel\": 10, \"jeruk\": 15}\nprint(stok[\"jeruk\"])\nstok[\"apel\"] = 12\nstok[\"mangga\"] = 8\nprint(stok)",
          hint: "Akses stok jeruk dengan stok['jeruk']. Untuk memperbarui apel gunakan stok['apel'] = 12, dan stok['mangga'] = 8 untuk menambahkan mangga.",
          quiz: {
            question: "Apa yang terjadi jika kita mencoba mengakses kunci yang tidak terdaftar di dalam dictionary menggunakan sintaks dict[key]?",
            options: [
              "Mengembalikan nilai None",
              "Menghasilkan KeyError",
              "Dictionary akan otomatis menambahkan kunci tersebut dengan nilai 0",
              "Program akan crash tanpa pesan error"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "15\n{'apel': 12, 'jeruk': 15, 'mangga': 8}\n",
              description: "Akses nilai, update data, dan cetak dictionary stok"
            }
          ],
          validationRules: [
            {
              pattern: "stok\\s*=\\s*\\{\\s*([\"'])apel\\1\\s*:\\s*10\\s*,\\s*([\"'])jeruk\\2\\s*:\\s*15\\s*\\}",
              message: "Deklarasikan dictionary stok awal dengan apel 10 dan jeruk 15",
              shouldExist: true
            },
            {
              pattern: "stok\\[([\"'])apel\\1\\]\\s*=\\s*12",
              message: "Perbarui stok apel menjadi 12",
              shouldExist: true
            },
            {
              pattern: "stok\\[([\"'])mangga\\1\\]\\s*=\\s*8",
              message: "Tambahkan stok mangga bernilai 8",
              shouldExist: true
            }
          ]
        },
        {
          id: "p6-l4",
          title: "Fungsi dict (keys, values, items, get)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menyediakan metode khusus untuk mengekstrak dan memanipulasi komponen dictionary. Beberapa metode paling berguna adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.keys()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.values()</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.items()</code>. Metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.keys()</code> mengembalikan objek berisi semua kunci, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.values()</code> mengembalikan semua nilai, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.items()</code> mengembalikan daftar pasangan key-value dalam bentuk tuple.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menghindari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">KeyError</code> saat mengakses kunci yang belum pasti ada, kita sebaiknya menggunakan metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.get(key, default)</code>. Jika kunci ada, metode ini akan mengembalikan nilainya; jika tidak ada, ia akan mengembalikan nilai <em>default</em> yang kita tentukan tanpa menimbulkan error.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menghapus pasangan key-value, kita bisa menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.pop(key)</code>. Sedangkan metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.update(other_dict)</code> digunakan untuk menggabungkan atau memperbarui dictionary dengan dictionary lain.</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Metode</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Deskripsi</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh Penggunaan</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">.keys()</td><td class=\"px-3 py-2 text-zinc-700\">Mengembalikan objek berisi daftar kunci</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">mhs.keys()</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">.values()</td><td class=\"px-3 py-2 text-zinc-700\">Mengembalikan objek berisi daftar nilai</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">mhs.values()</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">.items()</td><td class=\"px-3 py-2 text-zinc-700\">Mengembalikan objek berisi pasangan (key, value) sebagai tuple</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">mhs.items()</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">.get(key, default)</td><td class=\"px-3 py-2 text-zinc-700\">Mengambil nilai dari key, jika key tidak ada mengembalikan nilai default</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">mhs.get(\"umur\", 20)</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">.pop(key)</td><td class=\"px-3 py-2 text-zinc-700\">Menghapus key dan mengembalikan nilainya</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">mhs.pop(\"usia\")</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">.update(dict2)</td><td class=\"px-3 py-2 text-zinc-700\">Memperbarui dictionary dengan data dari dict2</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">mhs.update({\"IPK\": 3.8})</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>mhs = {\"nama\": \"Budi\", \"jurusan\": \"Informatika\"}\nprint(mhs.keys())           # dict_keys(['nama', 'jurusan'])\nprint(mhs.values())         # dict_values(['Budi', 'Informatika'])\nprint(mhs.get(\"umur\", 20))   # 20\nmhs.update({\"IPK\": 3.8})\nprint(mhs)                  # {'nama': 'Budi', 'jurusan': 'Informatika', 'IPK': 3.8}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">dict_keys(['nama', 'jurusan'])\ndict_values(['Budi', 'Informatika'])\n20\n{'nama': 'Budi', 'jurusan': 'Informatika', 'IPK': 3.8}</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "mhs = {\"nama\": \"Budi\", \"jurusan\": \"Informatika\"}\nprint(mhs.keys())\nprint(mhs.values())\nprint(mhs.get(\"umur\", 20))\nmhs.update({\"IPK\": 3.8})\nprint(mhs)",
          initialCode: "# Buat dictionary bernama 'produk' berisi: \"nama\": \"Laptop\", \"harga\": 7000000\n# 1. Gunakan .get() untuk mencari kunci \"stok\", jika tidak ada kembalikan nilai default 0. Cetak hasilnya!\n# 2. Gunakan .update() untuk menambahkan pasangan \"merek\": \"Asus\" dan \"stok\": 5 ke dalam produk\n# 3. Cetak semua pasangan key-value dari produk menggunakan produk.items()\n",
          solution: "produk = {\"nama\": \"Laptop\", \"harga\": 7000000}\nprint(produk.get(\"stok\", 0))\nproduk.update({\"merek\": \"Asus\", \"stok\": 5})\nprint(produk.items())",
          hint: "Gunakan produk.get('stok', 0) untuk mengambil stok secara aman. Gunakan produk.update({'merek': 'Asus', 'stok': 5}) untuk memperbarui, lalu cetak produk.items().",
          quiz: {
            question: "Apa keuntungan menggunakan metode .get() dibandingkan dengan sintaks kurung siku biasa (dict[key])?",
            options: [
              ".get() berjalan lebih cepat daripada sintaks kurung siku",
              ".get() tidak menghasilkan KeyError jika kunci tidak ditemukan, melainkan mengembalikan nilai default",
              ".get() dapat mengubah kunci menjadi nilai baru secara otomatis",
              ".get() hanya bisa digunakan jika kunci bertipe data integer"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "0\ndict_items([('nama', 'Laptop'), ('harga', 7000000), ('merek', 'Asus'), ('stok', 5)])\n",
              description: "Mengakses stok secara aman, update data, dan list items"
            }
          ],
          validationRules: [
            {
              pattern: "produk\\.get\\(\\s*([\"'])stok\\1\\s*,\\s*0\\s*\\)",
              message: "Gunakan metode get() dengan default 0 pada kunci 'stok'",
              shouldExist: true
            },
            {
              pattern: "produk\\.update\\(\\s*\\{",
              message: "Gunakan metode update() untuk menambahkan merek dan stok",
              shouldExist: true
            },
            {
              pattern: "produk\\.items\\(\\)",
              message: "Gunakan metode items() untuk menampilkan seluruh pasangan key-value",
              shouldExist: true
            }
          ]
        }
      ]
    },
    {
      id: "p6-m3",
      title: "Operasi File",
      lessons: [
        {
          id: "p6-l5",
          title: "Struktur dasar with open",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Dalam pemrograman, membaca dan menulis file adalah operasi yang sangat umum. Di Python, cara terbaik dan paling aman untuk menangani operasi file adalah dengan menggunakan struktur <strong>context manager</strong> melalui kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">with open</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks dasar dari context manager adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">with open(nama_file, mode) as nama_alias:</code>. Di dalam blok kode berindentasi ini, kita dapat membaca atau menulis file menggunakan objek file yang diberi alias. Setelah program keluar dari blok indentasi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">with</code>, Python secara <strong>otomatis akan menutup file</strong> tersebut.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Mengapa otomatis menutup file itu sangat penting? Jika kita tidak menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">with open</code> dan membuka file secara manual dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f = open()</code>, kita harus mengingat untuk memanggil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f.close()</code>. Jika kita lupa, hal itu dapat menyebabkan kebocoran memori (resource leak), kerusakan data, atau file terkunci oleh sistem operasi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Membuka file 'contoh.txt' untuk ditulisi\nwith open(\"contoh.txt\", \"w\") as f:\n    f.write(\"Halo Dunia!\")\n\n# File otomatis tertutup di sini, mari baca kembali\nwith open(\"contoh.txt\", \"r\") as f:\n    isi = f.read()\n    print(isi)</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo Dunia!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "# Membuka file 'contoh.txt' untuk ditulisi\nwith open(\"contoh.txt\", \"w\") as f:\n    f.write(\"Halo Dunia!\")\n\n# File otomatis tertutup di sini, mari baca kembali\nwith open(\"contoh.txt\", \"r\") as f:\n    isi = f.read()\n    print(isi)",
          initialCode: "# Gunakan context manager 'with open' untuk membuat file bernama 'pesan.txt' dalam mode tulis 'w' sebagai alias 'f'\n# Tulis teks \"Belajar Python menyenangkan!\" ke dalam file menggunakan f.write()\n#\n# Setelah blok itu, gunakan 'with open' untuk membaca file 'pesan.txt' dalam mode baca 'r' sebagai alias 'f'\n# Baca seluruh isi file tersebut, simpan dalam variabel 'isi', lalu cetak 'isi'\n",
          solution: "with open(\"pesan.txt\", \"w\") as f:\n    f.write(\"Belajar Python menyenangkan!\")\n\nwith open(\"pesan.txt\", \"r\") as f:\n    isi = f.read()\n    print(isi)",
          hint: "Gunakan with open('pesan.txt', 'w') as f: lalu panggil f.write('Belajar Python menyenangkan!'). Pada blok berikutnya, gunakan with open('pesan.txt', 'r') as f: lalu isi = f.read() dan cetak isi.",
          quiz: {
            question: "Apa kegunaan utama dari penggunaan block context manager 'with open' saat memanipulasi file di Python?",
            options: [
              "Membuat operasi file menjadi 10 kali lebih cepat",
              "Menjamin file ditutup secara otomatis setelah keluar dari blok, mencegah kebocoran resource",
              "Mengubah tipe data file secara otomatis menjadi list",
              "Mengenkripsi isi file agar tidak dapat dibaca orang lain"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Belajar Python menyenangkan!\n",
              description: "Tulis ke file dan baca kembali isi file pesan.txt"
            }
          ],
          validationRules: [
            {
              pattern: "with\\s+open\\(\\s*([\"'])pesan\\.txt\\1\\s*,\\s*([\"'])w\\2\\s*\\)\\s+as\\s+\\w+:",
              message: "Gunakan with open untuk membuat file 'pesan.txt' dalam mode 'w'",
              shouldExist: true
            },
            {
              pattern: "\\.write\\(\\s*([\"'])Belajar Python menyenangkan!\\1\\s*\\)",
              message: "Gunakan f.write() untuk menulis pesan",
              shouldExist: true
            },
            {
              pattern: "with\\s+open\\(\\s*([\"'])pesan\\.txt\\3\\s*,\\s*([\"'])r\\4\\s*\\)\\s+as\\s+\\w+:",
              message: "Gunakan with open untuk membaca file 'pesan.txt' dalam mode 'r'",
              shouldExist: true
            },
            {
              pattern: "\\.read\\(\\)",
              message: "Gunakan f.read() untuk membaca seluruh isi file",
              shouldExist: true
            }
          ]
        },
        {
          id: "p6-l6",
          title: "Macam-macam mode operasi file (r, w, a, dll)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Saat menggunakan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">open()</code>, kita perlu menentukan <strong>mode</strong> operasi file yang memberi tahu Python apa yang ingin kita lakukan terhadap file tersebut. Mode ini menentukan apakah file akan dibaca, ditulis, atau ditambahkan teks baru, serta apa yang terjadi jika file tersebut sudah ada atau belum ada.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dua mode dasar yang paling sering digunakan adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">r</code> (read) untuk membaca file yang sudah ada, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">w</code> (write) untuk menulis. Penting dipahami bahwa mode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">w</code> bersifat <strong>destruktif</strong>: jika file tujuan sudah ada, isinya akan langsung dihapus total (di-overwrite) sebelum teks baru ditulis. Jika ingin mempertahankan isi lama dan hanya menambahkan teks baru di akhir, gunakan mode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a</code> (append).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain itu, Python mendukung mode biner dengan menambahkan huruf <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">b</code> (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">rb</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">wb</code>) untuk file non-teks seperti gambar atau PDF. Kita juga bisa menambahkan tanda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">r+</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">w+</code>) untuk membuka file dalam mode baca dan tulis sekaligus.</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Mode</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Nama Mode</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Deskripsi &amp; Perilaku</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">r</td><td class=\"px-3 py-2 text-zinc-700\">Read (Bawaan)</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk dibaca. Menghasilkan error jika file tidak ditemukan.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">w</td><td class=\"px-3 py-2 text-zinc-700\">Write</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk ditulis. Menghapus isi file lama (overwrite). Membuat file baru jika belum ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">a</td><td class=\"px-3 py-2 text-zinc-700\">Append</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk ditambahkan isinya di akhir. Membuat file baru jika belum ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">r+</td><td class=\"px-3 py-2 text-zinc-700\">Read &amp; Write</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk dibaca dan ditulis. File harus sudah ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">w+</td><td class=\"px-3 py-2 text-zinc-700\">Write &amp; Read</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file untuk ditulis dan dibaca. Menghapus isi file lama jika ada.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">rb / wb</td><td class=\"px-3 py-2 text-zinc-700\">Read/Write Binary</td><td class=\"px-3 py-2 text-zinc-700\">Membuka file dalam mode biner untuk dibaca/ditulis (gambar, executable, dll).</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Menulis awal\nwith open(\"log.txt\", \"w\") as f:\n    f.write(\"Baris 1\\n\")\n\n# Menambahkan (append) tanpa menghapus Baris 1\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"Baris 2\\n\")\n\nwith open(\"log.txt\", \"r\") as f:\n    print(f.read())</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Baris 1\nBaris 2\n</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "# Menulis awal\nwith open(\"log.txt\", \"w\") as f:\n    f.write(\"Baris 1\\n\")\n\n# Menambahkan (append) tanpa menghapus Baris 1\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"Baris 2\\n\")\n\nwith open(\"log.txt\", \"r\") as f:\n    print(f.read())",
          initialCode: "# 1. Buka file 'catatan.txt' dalam mode tulis 'w' dan tulis teks \"Hari Pertama\\n\"\n# 2. Buka file 'catatan.txt' dalam mode append 'a' dan tulis teks \"Hari Kedua\\n\"\n# 3. Buka file 'catatan.txt' dalam mode baca 'r' dan cetak semua isinya\n",
          solution: "with open(\"catatan.txt\", \"w\") as f:\n    f.write(\"Hari Pertama\\n\")\n\nwith open(\"catatan.txt\", \"a\") as f:\n    f.write(\"Hari Kedua\\n\")\n\nwith open(\"catatan.txt\", \"r\") as f:\n    print(f.read())",
          hint: "Gunakan mode 'w' pada with open pertama, mode 'a' pada with open kedua untuk append, dan mode 'r' pada with open ketiga untuk membaca.",
          quiz: {
            question: "Apa perbedaan utama antara mode tulis 'w' dan mode tambah 'a' pada Python?",
            options: [
              "Mode 'w' akan menghapus isi file lama jika file sudah ada (overwrite), sedangkan 'a' akan mempertahankan isi lama dan menambahkannya di akhir",
              "Mode 'w' hanya untuk membaca, sedangkan 'a' untuk menulis",
              "Mode 'w' akan error jika file tidak ditemukan, sedangkan 'a' tidak",
              "Mode 'w' digunakan untuk file biner, sedangkan 'a' untuk file teks biasa"
            ],
            correctAnswer: 0
          },
          testCases: [
            {
              expectedOutput: "Hari Pertama\nHari Kedua\n\n",
              description: "Tulis dan tambahkan data ke catatan.txt lalu baca hasilnya"
            }
          ],
          validationRules: [
            {
              pattern: "open\\(\\s*([\"'])catatan\\.txt\\1\\s*,\\s*([\"'])w\\2\\s*\\)",
              message: "Buka file catatan.txt dalam mode 'w'",
              shouldExist: true
            },
            {
              pattern: "open\\(\\s*([\"'])catatan\\.txt\\3\\s*,\\s*([\"'])a\\4\\s*\\)",
              message: "Buka file catatan.txt dalam mode append 'a'",
              shouldExist: true
            },
            {
              pattern: "open\\(\\s*([\"'])catatan\\.txt\\5\\s*,\\s*([\"'])r\\6\\s*\\)",
              message: "Buka file catatan.txt dalam mode baca 'r'",
              shouldExist: true
            },
            {
              pattern: "write\\(\\s*([\"'])Hari Pertama\\\\n\\1\\s*\\)",
              message: "Tulis 'Hari Pertama\\n' menggunakan f.write()",
              shouldExist: true
            },
            {
              pattern: "write\\(\\s*([\"'])Hari Kedua\\\\n\\1\\s*\\)",
              message: "Tulis 'Hari Kedua\\n' menggunakan f.write()",
              shouldExist: true
            }
          ]
        },
        {
          id: "p6-l7",
          title: "Menulis isi file (write, writelines)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk menulis data teks ke dalam file, Python menyediakan dua metode utama pada objek file, yaitu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.write()</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.writelines()</code>. Pemilihan metode ini bergantung pada bentuk data yang ingin kita masukkan (apakah berupa string tunggal atau sekumpulan string dalam list).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.write(string)</code> menerima argumen berupa <strong>string tunggal</strong> dan menulisnya ke file. Jika kita ingin menulis teks di baris baru, kita harus menambahkan karakter newline (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\n</code>) secara manual di akhir string. Metode ini tidak secara otomatis menambahkan baris baru.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.writelines(list_of_strings)</code> menerima argumen berupa <strong>list berisi string</strong> (atau iterable lainnya) dan menulis setiap elemen list tersebut ke file secara berurutan. Perlu diingat bahwa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.writelines()</code> juga tidak menambahkan karakter newline secara otomatis antar elemen list, sehingga kita harus menyisipkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\n</code> pada masing-masing string di dalam list.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Menulis string tunggal dengan write\nwith open(\"laporan.txt\", \"w\") as f:\n    f.write(\"Laporan Penjualan\\n\")\n    f.write(\"=================\\n\")\n\n# Menulis list of strings dengan writelines\ndata = [\"Apel: 10\\n\", \"Jeruk: 15\\n\", \"Mangga: 8\\n\"]\nwith open(\"laporan.txt\", \"a\") as f:\n    f.writelines(data)\n\n# Baca hasilnya\nwith open(\"laporan.txt\", \"r\") as f:\n    print(f.read())</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Laporan Penjualan\n=================\nApel: 10\nJeruk: 15\nMangga: 8\n</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "# Menulis string tunggal dengan write\nwith open(\"laporan.txt\", \"w\") as f:\n    f.write(\"Laporan Penjualan\\n\")\n    f.write(\"=================\\n\")\n\n# Menulis list of strings dengan writelines\ndata = [\"Apel: 10\\n\", \"Jeruk: 15\\n\", \"Mangga: 8\\n\"]\nwith open(\"laporan.txt\", \"a\") as f:\n    f.writelines(data)\n\n# Baca hasilnya\nwith open(\"laporan.txt\", \"r\") as f:\n    print(f.read())",
          initialCode: "# 1. Buka file 'biodata.txt' dalam mode 'w' sebagai f\n# 2. Gunakan f.write() untuk menulis string \"Nama: Budi\\n\"\n# 3. Buat list berisi dua string: [\"Pekerjaan: Programer\\n\", \"Hobi: Coding\\n\"]\n# 4. Gunakan f.writelines() untuk menulis list tersebut ke file\n# 5. Di luar blok tulis, buka file 'biodata.txt' dalam mode 'r' lalu cetak isinya\n",
          solution: "with open(\"biodata.txt\", \"w\") as f:\n    f.write(\"Nama: Budi\\n\")\n    data = [\"Pekerjaan: Programer\\n\", \"Hobi: Coding\\n\"]\n    f.writelines(data)\n\nwith open(\"biodata.txt\", \"r\") as f:\n    print(f.read())",
          hint: "Gunakan f.write('Nama: Budi\\n') untuk menulis baris pertama. Kemudian buat list data = ['Pekerjaan: Programer\\n', 'Hobi: Coding\\n'] lalu jalankan f.writelines(data).",
          quiz: {
            question: "Apakah metode f.writelines(list) secara otomatis menyisipkan karakter baris baru (\\n) di antara elemen-elemen list saat ditulis ke file?",
            options: [
              "Ya, f.writelines() otomatis menambahkan baris baru di setiap akhir elemen list",
              "Tidak, kita harus menambahkan karakter \\n secara manual pada masing-masing string di dalam list",
              "Ya, tetapi hanya jika elemen list berupa angka",
              "Tidak, f.writelines() otomatis mengganti spasi menjadi koma"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "Nama: Budi\nPekerjaan: Programer\nHobi: Coding\n\n",
              description: "Tulis string dengan write, dan list dengan writelines lalu cetak"
            }
          ],
          validationRules: [
            {
              pattern: "\\.write\\(\\s*([\"'])Nama: Budi\\\\n\\1\\s*\\)",
              message: "Gunakan write untuk menulis Nama: Budi\\n",
              shouldExist: true
            },
            {
              pattern: "writelines\\(\\s*\\w+\\s*\\)",
              message: "Gunakan writelines() untuk menulis list data",
              shouldExist: true
            },
            {
              pattern: "\\[\\s*([\"'])Pekerjaan: Programer\\\\n\\1\\s*,\\s*([\"'])Hobi: Coding\\\\n\\2\\s*\\]",
              message: "Definisikan list data dengan Pekerjaan: Programer\\n dan Hobi: Coding\\n",
              shouldExist: true
            }
          ]
        },
        {
          id: "p6-l8",
          title: "Membaca isi file (read, readline, readlines)",
          explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Untuk membaca isi file, Python menyediakan tiga metode bawaan yang memiliki kegunaan berbeda-beda tergantung bagaimana kita ingin mengolah data teks tersebut di dalam program. Ketiga metode tersebut adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.read()</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.readline()</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.readlines()</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.read()</code> membaca <strong>seluruh isi file</strong> sekaligus sebagai satu string besar. Metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.readline()</code> membaca file <strong>baris demi baris</strong> (satu baris setiap kali dipanggil). Sedangkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.readlines()</code> membaca <strong>seluruh baris</strong> sekaligus dan mengembalikannya dalam bentuk <strong>list berisi string</strong> lengkap dengan karakter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\n</code> di ujungnya.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Kita juga bisa melakukan iterasi langsung pada objek file menggunakan perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for line in f:</code>. Cara ini sangat efisien dari segi memori karena Python tidak memuat seluruh file ke RAM sekaligus, melainkan membacanya baris demi baris secara dinamis (lazy loading).</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Metode</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Tipe Kembalian</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Perilaku &amp; Efisiensi Memori</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">f.read()</td><td class=\"px-3 py-2 text-zinc-700\">String</td><td class=\"px-3 py-2 text-zinc-700\">Membaca seluruh isi file. Kurang efisien jika file berukuran sangat besar (menyita banyak RAM).</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">f.readline()</td><td class=\"px-3 py-2 text-zinc-700\">String</td><td class=\"px-3 py-2 text-zinc-700\">Membaca satu baris berikutnya dari file. Sangat efisien memori.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">f.readlines()</td><td class=\"px-3 py-2 text-zinc-700\">List of strings</td><td class=\"px-3 py-2 text-zinc-700\">Membaca seluruh baris dan menyimpannya dalam list. Memori disesuaikan dengan isi file.</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">for line in f</td><td class=\"px-3 py-2 text-zinc-700\">Iterasi (String)</td><td class=\"px-3 py-2 text-zinc-700\">Membaca baris demi baris secara otomatis dalam loop. Sangat hemat RAM dan direkomendasikan untuk file besar.</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Membuat file contoh\nwith open(\"siswa.txt\", \"w\") as f:\n    f.write(\"Andi\\nBudi\\nCici\\n\")\n\n# Membaca dengan readlines\nwith open(\"siswa.txt\", \"r\") as f:\n    baris_list = f.readlines()\n    print(baris_list)       # ['Andi\\n', 'Budi\\n', 'Cici\\n']\n\n# Membaca efisien dengan loop\nwith open(\"siswa.txt\", \"r\") as f:\n    for baris in f:\n        print(baris.strip()) # Menghilangkan \\n di akhir</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">['Andi\\n', 'Budi\\n', 'Cici\\n']\nAndi\nBudi\nCici</span>\n          </div>\n        </div>\n      </div>\n    </div>",
          codeExample: "# Membuat file contoh\nwith open(\"siswa.txt\", \"w\") as f:\n    f.write(\"Andi\\nBudi\\nCici\\n\")\n\n# Membaca dengan readlines\nwith open(\"siswa.txt\", \"r\") as f:\n    baris_list = f.readlines()\n    print(baris_list)\n\n# Membaca efisien dengan loop\nwith open(\"siswa.txt\", \"r\") as f:\n    for baris in f:\n        print(baris.strip())",
          initialCode: "# Buat file 'angka.txt' dan tulis tiga baris: \"Satu\\nDua\\nTiga\\n\"\nwith open(\"angka.txt\", \"w\") as f:\n    f.write(\"Satu\\nDua\\nTiga\\n\")\n\n# 1. Buka file 'angka.txt' dalam mode 'r' sebagai f\n# 2. Gunakan f.readlines() untuk membaca seluruh baris dan simpan dalam variabel 'daftar_baris'\n# 3. Cetak variabel 'daftar_baris'\n# 4. Buka kembali file 'angka.txt' dalam mode 'r' sebagai f\n# 5. Lakukan loop 'for baris in f:' dan cetak tiap baris menggunakan print(baris.strip())\n",
          solution: "with open(\"angka.txt\", \"w\") as f:\n    f.write(\"Satu\\nDua\\nTiga\\n\")\n\nwith open(\"angka.txt\", \"r\") as f:\n    daftar_baris = f.readlines()\n    print(daftar_baris)\n\nwith open(\"angka.txt\", \"r\") as f:\n    for baris in f:\n        print(baris.strip())",
          hint: "Gunakan daftar_baris = f.readlines() untuk membaca file menjadi list. Gunakan for baris in f: lalu print(baris.strip()) untuk mencetak tanpa baris baru ganda.",
          quiz: {
            question: "Tipe data apakah yang dikembalikan oleh metode f.readlines() saat membaca file?",
            options: [
              "String tunggal yang berisi seluruh isi file",
              "List berisi string, di mana masing-masing elemen mewakili satu baris file",
              "Dictionary dengan baris sebagai key dan nomor baris sebagai value",
              "Tuple berisi angka biner"
            ],
            correctAnswer: 1
          },
          testCases: [
            {
              expectedOutput: "['Satu\\n', 'Dua\\n', 'Tiga\\n']\nSatu\nDua\nTiga\n",
              description: "Baca file angka.txt dengan readlines dan loop baris demi baris"
            }
          ],
          validationRules: [
            {
              pattern: "daftar_baris\\s*=\\s*\\w+\\.readlines\\(\\)",
              message: "Gunakan readlines() untuk membaca isi file menjadi list",
              shouldExist: true
            },
            {
              pattern: "for\\s+\\w+\\s+in\\s+\\w+\\s*:",
              message: "Gunakan loop for untuk mengiterasi baris",
              shouldExist: true
            },
            {
              pattern: "print\\(\\s*\\w+\\.strip\\(\\)\\s*\\)",
              message: "Gunakan strip() di dalam print untuk menghapus spasi/newline bawaan",
              shouldExist: true
            }
          ]
        }
      ]
    }
  ]
}
