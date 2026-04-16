export interface ValidationRule {
  pattern: string;      // Regex pattern
  message: string;      // Error message to show
  shouldExist: boolean; // true = must include, false = must NOT include
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
  locked?: boolean; // Deprecated, keep for backward compatibility
  accessMode?: 'auto' | 'unlocked' | 'locked'; 
  modules: Module[];
}

// ============================================================
// KURIKULUM PYTHON — 3 Level × 5 Modul
// ============================================================

const pythonLevel1: Level = {
  id: 'py-level-1',
  title: 'Python Dasar',
  description: 'Kuasai fondasi pemrograman Python: print, variabel, tipe data, operator, dan input/output.',
  modules: [
    {
      id: 'py1-intro',
      title: 'Pendahuluan',
      lessons: [
        {
          id: 'py1-what-is-python',
          title: 'Apa itu Python?',
          explanation: `Python adalah bahasa pemrograman yang sangat populer karena mudah dibaca dan dipelajari. 

Untuk menampilkan sesuatu di layar, kita menggunakan fungsi **print()**. 

**Contoh:**
\`\`\`python
print("Halo semuanya!")
\`\`\`
Teks yang ingin ditampilkan harus diapit oleh tanda kutip (").`,
          codeExample: 'print("Hello, Python!")',
          initialCode: '# Ketik kode di bawah ini:\n# print("Hello, World!")\n',
          solution: 'print("Hello, World!")',
          hint: 'Ketik print("Hello, World!") secara persis, termasuk tanda kurung dan tanda kutip.',
          quiz: {
            question: 'Fungsi apa yang digunakan untuk menampilkan teks ke layar?',
            options: ['display()', 'print()', 'write()', 'output()'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Hello, World!', description: 'Tampilkan teks "Hello, World!" menggunakan fungsi print().' }
          ],
          validationRules: [
            { pattern: 'print\\s*\\(', message: "Kamu harus menggunakan fungsi print() untuk menampilkan teks!", shouldExist: true }
          ]
        },
        {
          id: 'py1-how-python-works',
          title: 'Cara Kerja Python',
          explanation: `Python menjalankan kode baris demi baris dari atas ke bawah. Python juga bisa digunakan sebagai kalkulator sederhana.

**Contoh Matematika:**
\`\`\`python
print(10 + 5)  # Hasilnya 15
print(20 - 7)  # Hasilnya 13
\`\`\`
Anda tidak perlu tanda kutip untuk angka.`,
          codeExample: 'print(1 + 1)',
          initialCode: '# Hitunglah 5 ditambah 5\n# Gunakan print(5 + 5)\n',
          solution: 'print(5 + 5)',
          hint: 'Cukup ketik print(5 + 5) untuk melihat hasilnya.',
          quiz: {
            question: 'Bagaimana Python menjalankan kode?',
            options: ['Sekaligus', 'Baris demi baris', 'Acak', 'Dari bawah ke atas'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: '10', description: 'Gunakan print() untuk menghitung dan menampilkan hasil dari 5 + 5.' }
          ]
        }
      ]
    },
    {
      id: 'py1-variables',
      title: 'Variabel',
      lessons: [
        {
          id: 'py1-understanding-variables',
          title: 'Memahami Variabel',
          explanation: `Variabel adalah tempat untuk menyimpan data. Kita memberi nama pada variabel agar bisa digunakan kembali nanti.

**Cara membuat variabel:**
\`\`\`python
nama_variabel = nilai
\`\`\`

**Contoh:**
\`\`\`python
nama = "Budi"
umur = 20
print(nama)
print(umur)
\`\`\``,
          codeExample: 'name = "Alice"\nprint(name)',
          initialCode: '# 1. Buat variabel bernama age dan isi dengan angka 25\n# 2. Cetak variabel tersebut dengan print(age)\n',
          solution: 'age = 25\nprint(age)',
          hint: 'Ketik age = 25 di baris pertama, lalu print(age) di baris kedua.',
          quiz: {
            question: 'Simbol apa yang digunakan untuk memberikan nilai ke variabel?',
            options: ['+', ':', '=', '=='],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: '25', description: 'Buat variabel age dengan nilai 25, lalu tampilkan nilainya.' }
          ],
          validationRules: [
            { pattern: 'age\\s*=', message: "Kamu harus membuat variabel bernama 'age'!", shouldExist: true },
            { pattern: 'print\\s*\\(\\s*age\\s*\\)', message: "Cetak variabel 'age' menggunakan print(age).", shouldExist: true }
          ]
        },
        {
          id: 'py1-variable-naming',
          title: 'Aturan Penamaan Variabel',
          explanation: `Ada beberapa aturan untuk memberi nama variabel:
1. Harus dimulai dengan **huruf** atau **underscore** (_).
2. Tidak boleh dimulai dengan **angka**.
3. Hanya boleh berisi huruf, angka, dan underscore.
4. **Case-sensitive**: \`nama\` dan \`Nama\` adalah variabel berbeda.

**Contoh yang benar:**
\`\`\`python
nama_depan = "Ali"
_skor = 100
umur2 = 25
\`\`\``,
          codeExample: 'nama_depan = "Ali"\nprint(nama_depan)',
          initialCode: '# Buat variabel nama_lengkap dan isi dengan nama Anda\n# Lalu cetak variabel tersebut\n',
          solution: 'nama_lengkap = "Python Learner"\nprint(nama_lengkap)',
          hint: 'Gunakan nama_lengkap = "Nama Anda" lalu print(nama_lengkap).',
          quiz: {
            question: 'Manakah nama variabel yang TIDAK valid di Python?',
            options: ['_nilai', 'skor2', '2nama', 'nama_depan'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Python Learner', description: 'Buat variabel nama_lengkap dan tampilkan isinya.' }
          ],
          validationRules: [
            { pattern: 'nama_lengkap\\s*=', message: "Gunakan nama variabel 'nama_lengkap'!", shouldExist: true },
            { pattern: 'print\\s*\\(\\s*nama_lengkap\\s*\\)', message: "Cetak variabel 'nama_lengkap'.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py1-data-types',
      title: 'Tipe Data',
      lessons: [
        {
          id: 'py1-strings-numbers',
          title: 'String dan Angka',
          explanation: `Di Python, ada berbagai jenis data:
1. **String**: Teks yang diapit tanda kutip, contoh: "Halo".
2. **Integer**: Angka bulat, contoh: 10.
3. **Float**: Angka desimal, contoh: 3.14.

Kita bisa menggabungkan string menggunakan tanda plus (**+**).`,
          codeExample: 'teks = "Halo " + "Dunia"\nprint(teks)',
          initialCode: '# Gabungkan kata "Python" dan "Keren" dengan spasi di antaranya\n# Lalu cetak hasilnya\n',
          solution: 'print("Python" + " " + "Keren")',
          hint: 'Gunakan tanda + untuk menggabungkan string.',
          quiz: {
            question: 'Manakah yang merupakan contoh tipe data String?',
            options: ['123', 'True', '"Hello"', '3.14'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Python Keren', description: 'Gabungkan string "Python" dan "Keren" sehingga menghasilkan "Python Keren".' }
          ],
          validationRules: [
            { pattern: '\\+', message: "Gunakan operator '+' untuk menggabungkan string.", shouldExist: true }
          ]
        },
        {
          id: 'py1-type-conversion',
          title: 'Konversi Tipe Data',
          explanation: `Kadang kita perlu mengubah tipe data:
- **str()**: Mengubah ke string.
- **int()**: Mengubah ke integer.
- **float()**: Mengubah ke float.

**Contoh:**
\`\`\`python
angka = 10
teks = str(angka)  # "10"
print("Nilai: " + teks)
\`\`\``,
          codeExample: 'x = 42\nprint("Jawabannya: " + str(x))',
          initialCode: '# Ubah angka 100 menjadi string, lalu gabungkan dengan "Skor: "\n# Cetak hasilnya\n',
          solution: 'print("Skor: " + str(100))',
          hint: 'Gunakan str(100) untuk mengubah angka menjadi string.',
          quiz: {
            question: 'Fungsi apa yang mengubah angka menjadi string?',
            options: ['int()', 'str()', 'float()', 'text()'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Skor: 100', description: 'Cetak "Skor: 100" dengan menggabungkan string dan konversi angka.' }
          ],
          validationRules: [
            { pattern: 'str\\s*\\(', message: "Kamu wajib menggunakan fungsi str() untuk mengubah angka menjadi string.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py1-operators',
      title: 'Operator',
      lessons: [
        {
          id: 'py1-arithmetic',
          title: 'Operator Aritmetika',
          explanation: `Python mendukung operator matematika standar:
- **+** : Penjumlahan
- **-** : Pengurangan
- **\\*** : Perkalian
- **/** : Pembagian
- **%** : Modulo (sisa bagi)
- **\\*\\*** : Pangkat

**Contoh:**
\`\`\`python
print(10 % 3)   # Hasilnya 1 (sisa bagi)
print(2 ** 3)   # Hasilnya 8 (2 pangkat 3)
\`\`\``,
          codeExample: 'print(10 + 5)\nprint(10 * 3)\nprint(2 ** 4)',
          initialCode: '# Hitung 7 pangkat 2 (7 ** 2) dan cetak hasilnya\n',
          solution: 'print(7 ** 2)',
          hint: 'Gunakan ** untuk pangkat. print(7 ** 2) akan menghasilkan 49.',
          quiz: {
            question: 'Operator ** digunakan untuk apa?',
            options: ['Perkalian', 'Pembagian', 'Pangkat', 'Modulo'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: '49', description: 'Hitung dan cetak hasil dari 7 pangkat 2.' }
          ],
          validationRules: [
            { pattern: '\\*\\*\\s*2', message: "Gunakan operator '** 2' untuk menghitung pangkat dua.", shouldExist: true }
          ]
        },
        {
          id: 'py1-comparison',
          title: 'Operator Perbandingan',
          explanation: `Operator perbandingan menghasilkan **True** atau **False**:
- **==** : Sama dengan
- **!=** : Tidak sama dengan
- **>** : Lebih besar
- **<** : Lebih kecil
- **>=** : Lebih besar atau sama
- **<=** : Lebih kecil atau sama

**Contoh:**
\`\`\`python
print(5 > 3)   # True
print(5 == 3)  # False
\`\`\``,
          codeExample: 'print(10 > 5)\nprint(3 == 3)\nprint(7 != 8)',
          initialCode: '# Cek apakah 10 lebih besar atau sama dengan 10\n# Cetak hasilnya\n',
          solution: 'print(10 >= 10)',
          hint: 'Gunakan >= untuk membandingkan. print(10 >= 10) akan menghasilkan True.',
          quiz: {
            question: 'Apa hasil dari print(5 != 5)?',
            options: ['True', 'False', 'Error', '5'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'True', description: 'Cek dan cetak apakah 10 >= 10.' }
          ]
        }
      ]
    },
    {
      id: 'py1-io',
      title: 'Input & Output',
      lessons: [
        {
          id: 'py1-print-format',
          title: 'Format Output',
          explanation: `Ada beberapa cara untuk memformat output:

**1. Concatenation (Penggabungan):**
\`\`\`python
nama = "Ali"
print("Halo " + nama)
\`\`\`

**2. f-string (Paling Mudah):**
\`\`\`python
nama = "Ali"
umur = 20
print(f"Nama: {nama}, Umur: {umur}")
\`\`\`

f-string menggunakan huruf **f** sebelum tanda kutip, dan variabel ditulis dalam **{}**.`,
          codeExample: 'nama = "Python"\nversi = 3\nprint(f"{nama} versi {versi}")',
          initialCode: '# Buat variabel bahasa = "Python" dan tahun = 1991\n# Cetak: "Python dibuat tahun 1991" menggunakan f-string\n',
          solution: 'bahasa = "Python"\ntahun = 1991\nprint(f"{bahasa} dibuat tahun {tahun}")',
          hint: 'Gunakan f-string: print(f"{bahasa} dibuat tahun {tahun}").',
          quiz: {
            question: 'Apa karakter yang digunakan sebelum tanda kutip dalam f-string?',
            options: ['s', 'r', 'f', 'b'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Python dibuat tahun 1991', description: 'Cetak informasi menggunakan f-string.' }
          ],
          validationRules: [
            { pattern: 'f["\'].*\\{.*\\}.*["\']', message: "Gunakan f-string untuk menggabungkan variabel ke dalam teks.", shouldExist: true }
          ]
        },
        {
          id: 'py1-input-function',
          title: 'Fungsi input()',
          explanation: `Fungsi **input()** digunakan untuk meminta data dari pengguna. Data yang dimasukkan selalu dianggap sebagai **String**.

**Contoh:**
\`\`\`python
nama = input("Siapa namamu? ")
print("Halo " + nama)
\`\`\`
Jika ingin menerima angka, kita harus mengubahnya menggunakan **int()** atau **float()**.`,
          codeExample: 'nama = "Budi"\nprint("Halo " + nama)',
          initialCode: '# Simulasi: anggap user input adalah "Admin"\nuser = "Admin"\n# Cetak "Selamat Datang Admin"\n',
          solution: 'user = "Admin"\nprint("Selamat Datang " + user)',
          hint: 'Gunakan print("Selamat Datang " + user).',
          quiz: {
            question: 'Tipe data apa yang dihasilkan secara default oleh fungsi input()?',
            options: ['Integer', 'Float', 'String', 'Boolean'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Selamat Datang Admin', description: 'Cetak pesan selamat datang menggunakan variabel user.' }
          ],
          validationRules: [
            { pattern: 'print\\s*\\(.*user.*\\)', message: "Cetak variabel 'user' menggunakan print().", shouldExist: true }
          ]
        }
      ]
    }
  ]
};

const pythonLevel2: Level = {
  id: 'py-level-2',
  title: 'Python Menengah',
  description: 'Kuasai alur kontrol: kondisi, perulangan, fungsi, dan struktur data list.',
  modules: [
    {
      id: 'py2-conditionals',
      title: 'If / Else / Elif',
      lessons: [
        {
          id: 'py2-if-statement',
          title: 'Pernyataan If',
          explanation: `Pernyataan **if** digunakan untuk menjalankan kode hanya jika suatu kondisi terpenuhi.

**Aturan Penting:**
1. Gunakan titik dua (**:**) setelah kondisi.
2. Baris di bawahnya harus menjorok ke dalam (indentasi/spasi).

**Contoh:**
\`\`\`python
skor = 80
if skor > 70:
    print("Lulus!")
\`\`\``,
          codeExample: 'if 5 > 3:\n    print("True!")',
          initialCode: 'x = 10\n# Jika x lebih besar dari 5, cetak "Big"\n',
          solution: 'x = 10\nif x > 5:\n    print("Big")',
          hint: 'Pastikan ada spasi di depan print("Big") agar Python tahu itu bagian dari if.',
          quiz: {
            question: 'Apa yang wajib ada setelah kondisi pada pernyataan if?',
            options: ['Titik koma (;)', 'Titik dua (:)', 'Tanda tanya (?)', 'Kurung kurawal {}'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Big', description: 'Buat pernyataan if untuk mencetak "Big" jika variabel x bernilai lebih dari 5.' }
          ],
          validationRules: [
            { pattern: 'if\\s+x\\s*>', message: "Gunakan pernyataan 'if x > 5' untuk mencetak 'Big'.", shouldExist: true },
            { pattern: ':', message: "Jangan lupa tanda titik dua (:) setelah kondisi if.", shouldExist: true }
          ]
        },
        {
          id: 'py2-if-else',
          title: 'If-Else & Elif',
          explanation: `**else** dijalankan jika kondisi if tidak terpenuhi. **elif** (else if) untuk kondisi tambahan.

**Contoh:**
\`\`\`python
nilai = 75
if nilai >= 90:
    print("A")
elif nilai >= 70:
    print("B")
else:
    print("C")
\`\`\``,
          codeExample: 'x = 5\nif x > 10:\n    print("Besar")\nelif x > 0:\n    print("Positif")\nelse:\n    print("Nol")',
          initialCode: 'temp = 25\n# Jika temp > 30 cetak "Panas"\n# Jika temp > 20 cetak "Sejuk"\n# Jika tidak cetak "Dingin"\n',
          solution: 'temp = 25\nif temp > 30:\n    print("Panas")\nelif temp > 20:\n    print("Sejuk")\nelse:\n    print("Dingin")',
          hint: 'Gunakan urutan if -> elif -> else.',
          quiz: {
            question: 'Apa kepanjangan dari elif?',
            options: ['element if', 'else if', 'extra if', 'every if'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Sejuk', description: 'Gunakan if-elif-else untuk menentukan kategori suhu 25 derajat.' }
          ],
          validationRules: [
            { pattern: 'elif\\s+temp\\s*>', message: "Gunakan 'elif' untuk mengecek kondisi suhu kedua.", shouldExist: true },
            { pattern: 'else\\s*:', message: "Jangan lupa blok 'else' untuk kondisi terakhir.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py2-for-loop',
      title: 'For Loop',
      lessons: [
        {
          id: 'py2-for-range',
          title: 'Menggunakan range()',
          explanation: `Perulangan **for** digunakan untuk mengulangi kode beberapa kali. Fungsi **range()** membantu kita menentukan berapa kali pengulangan dilakukan.

**Contoh:**
\`\`\`python
for i in range(3):
    print("Halo")
\`\`\`
Kode di atas akan mencetak "Halo" sebanyak 3 kali.`,
          codeExample: 'for i in range(2):\n    print(i)',
          initialCode: '# Gunakan for loop dan range(5) untuk mencetak kata "Python"\n',
          solution: 'for i in range(5):\n    print("Python")',
          hint: 'Gunakan for i in range(5): lalu print("Python") dengan indentasi.',
          quiz: {
            question: 'Berapa kali kode di dalam for i in range(10) dijalankan?',
            options: ['9 kali', '10 kali', '11 kali', '1 kali'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Python\nPython\nPython\nPython\nPython', description: 'Cetak kata "Python" sebanyak 5 kali menggunakan loop.' }
          ],
          validationRules: [
            { pattern: 'for\\s+.*\\s+in\\s+range\\(\\s*5\\s*\\)', message: "Kamu harus menggunakan perulangan 'for i in range(5)'.", shouldExist: true }
          ]
        },
        {
          id: 'py2-for-list',
          title: 'Iterasi List',
          explanation: `Kita bisa menggunakan **for** untuk mengiterasi elemen dalam list:

\`\`\`python
buah = ["Apel", "Jeruk", "Mangga"]
for b in buah:
    print(b)
\`\`\``,
          codeExample: 'warna = ["Merah", "Biru", "Hijau"]\nfor w in warna:\n    print(w)',
          initialCode: 'angka = [1, 2, 3]\n# Cetak setiap elemen dalam list angka\n',
          solution: 'angka = [1, 2, 3]\nfor a in angka:\n    print(a)',
          hint: 'Gunakan for a in angka: lalu print(a).',
          quiz: {
            question: 'Apa output dari for x in [10, 20]: print(x)?',
            options: ['10 20', '10\\n20', '[10, 20]', 'Error'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: '1\n2\n3', description: 'Cetak setiap elemen dari list [1, 2, 3].' }
          ],
          validationRules: [
            { pattern: 'for\\s+.*\\s+in\\s+angka', message: "Gunakan loop 'for a in angka' untuk mengiterasi list.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py2-while-loop',
      title: 'While Loop',
      lessons: [
        {
          id: 'py2-while-basic',
          title: 'Dasar While Loop',
          explanation: `**while** mengulangi kode selama kondisi masih **True**.

\`\`\`python
x = 0
while x < 3:
    print(x)
    x += 1
\`\`\`

**Penting:** Pastikan ada perubahan agar loop berhenti (tidak infinite loop).`,
          codeExample: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
          initialCode: '# Cetak angka 1 sampai 5 menggunakan while loop\n',
          solution: 'i = 1\nwhile i <= 5:\n    print(i)\n    i += 1',
          hint: 'Mulai i = 1, loop selama i <= 5, jangan lupa i += 1.',
          quiz: {
            question: 'Apa yang terjadi jika kondisi while selalu True?',
            options: ['Error', 'Program berhenti', 'Infinite loop', 'Mencetak sekali'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: '1\n2\n3\n4\n5', description: 'Cetak angka 1 sampai 5 menggunakan while loop.' }
          ],
          validationRules: [
            { pattern: 'while\\s+.*<=', message: "Gunakan 'while i <= 5' untuk mengulangi kode.", shouldExist: true },
            { pattern: '\\+=\\s*1', message: "Jangan lupa menambahkan 1 ke variabel (i += 1) agar loop berhenti.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py2-functions',
      title: 'Fungsi',
      lessons: [
        {
          id: 'py2-defining-functions',
          title: 'Membuat Fungsi',
          explanation: `**Fungsi** adalah blok kode yang hanya berjalan saat dipanggil. Kita menggunakan kata kunci **def** untuk membuatnya.

**Contoh:**
\`\`\`python
def sapa():
    print("Halo!")

sapa()  # Memanggil fungsi
\`\`\``,
          codeExample: 'def halo():\n    print("Hi")\n\nhalo()',
          initialCode: '# Buat fungsi bernama "semangat" yang mencetak "Ayo Belajar!"\n# Jangan lupa panggil fungsinya di akhir\n',
          solution: 'def semangat():\n    print("Ayo Belajar!")\n\nsemangat()',
          hint: 'Gunakan def semangat(): lalu print("Ayo Belajar!") dengan indentasi.',
          quiz: {
            question: 'Kata kunci apa yang digunakan untuk mendefinisikan fungsi di Python?',
            options: ['function', 'def', 'func', 'define'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Ayo Belajar!', description: 'Definisikan fungsi semangat() dan panggil fungsi tersebut.' }
          ],
          validationRules: [
            { pattern: 'def\\s+semangat\\s*\\(\\s*\\)', message: "Definisikan fungsi dengan nama 'semangat()'.", shouldExist: true },
            { pattern: 'semangat\\s*\\(\\s*\\)', message: "Jangan lupa memanggil fungsi 'semangat()' di akhir kode.", shouldExist: true }
          ]
        },
        {
          id: 'py2-function-params',
          title: 'Fungsi dengan Parameter',
          explanation: `Fungsi bisa menerima data input melalui **parameter**:

\`\`\`python
def sapa(nama):
    print(f"Halo, {nama}!")

sapa("Ali")   # Halo, Ali!
sapa("Budi")  # Halo, Budi!
\`\`\`

Fungsi juga bisa mengembalikan nilai menggunakan **return**:
\`\`\`python
def tambah(a, b):
    return a + b

hasil = tambah(3, 5)
print(hasil)  # 8
\`\`\``,
          codeExample: 'def kali(a, b):\n    return a * b\n\nprint(kali(4, 5))',
          initialCode: '# Buat fungsi "kuadrat" yang menerima parameter n\n# dan mengembalikan n ** 2\n# Cetak hasil kuadrat(6)\n',
          solution: 'def kuadrat(n):\n    return n ** 2\n\nprint(kuadrat(6))',
          hint: 'Gunakan return n ** 2 di dalam fungsi.',
          quiz: {
            question: 'Kata kunci apa yang digunakan untuk mengembalikan nilai dari fungsi?',
            options: ['give', 'send', 'return', 'output'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: '36', description: 'Buat fungsi kuadrat(n) dan cetak hasil kuadrat(6).' }
          ],
          validationRules: [
            { pattern: 'def\\s+kuadrat\\s*\\(\\s*n\\s*\\)', message: "Fungsi harus menerima satu parameter, misalnya 'n'.", shouldExist: true },
            { pattern: 'return', message: "Kamu wajib menggunakan kata kunci 'return' untuk mengembalikan nilai.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py2-lists',
      title: 'List (Daftar)',
      lessons: [
        {
          id: 'py2-intro-lists',
          title: 'Mengenal List',
          explanation: `**List** digunakan untuk menyimpan banyak nilai dalam satu variabel. Nilai-nilai tersebut diapit oleh kurung siku **[]**.

**Contoh:**
\`\`\`python
buah = ["Apel", "Jeruk", "Pisang"]
print(buah[0])  # Mencetak "Apel"
\`\`\`
Ingat: Python mulai menghitung urutan (indeks) dari **0**.`,
          codeExample: 'warna = ["Merah", "Biru"]\nprint(warna[1])',
          initialCode: 'hewan = ["Kucing", "Anjing", "Kelinci"]\n# Cetak elemen kedua (Anjing) dari list hewan\n',
          solution: 'hewan = ["Kucing", "Anjing", "Kelinci"]\nprint(hewan[1])',
          hint: 'Gunakan indeks [1] untuk mengambil elemen kedua.',
          quiz: {
            question: 'Berapa indeks untuk elemen pertama dalam sebuah list?',
            options: ['1', '0', '-1', 'A'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Anjing', description: 'Akses dan cetak elemen kedua dari list yang diberikan.' }
          ]
        },
        {
          id: 'py2-list-methods',
          title: 'Method List',
          explanation: `List memiliki banyak method berguna:
- **append()**: Menambah elemen di akhir.
- **insert()**: Menambah elemen di posisi tertentu.
- **remove()**: Menghapus elemen tertentu.
- **len()**: Menghitung jumlah elemen.

\`\`\`python
data = [1, 2, 3]
data.append(4)
print(len(data))  # 4
\`\`\``,
          codeExample: 'data = [10, 20]\ndata.append(30)\nprint(data)',
          initialCode: 'angka = [1, 2, 3]\n# Tambahkan angka 4 ke list menggunakan append()\n# Cetak seluruh list\n',
          solution: 'angka = [1, 2, 3]\nangka.append(4)\nprint(angka)',
          hint: 'Gunakan angka.append(4).',
          quiz: {
            question: 'Method apa yang menambahkan elemen di akhir list?',
            options: ['add()', 'push()', 'append()', 'insert()'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: '[1, 2, 3, 4]', description: 'Tambahkan 4 ke list dan cetak hasilnya.' }
          ]
        }
      ]
    }
  ]
};

const pythonLevel3: Level = {
  id: 'py-level-3',
  title: 'Python Lanjutan',
  description: 'Tingkatkan kemampuan dengan dictionary, string method, file handling, error handling, dan proyek akhir.',
  modules: [
    {
      id: 'py3-dictionary',
      title: 'Dictionary',
      lessons: [
        {
          id: 'py3-dict-basics',
          title: 'Mengenal Dictionary',
          explanation: `**Dictionary** menyimpan data dalam pasangan **kunci:nilai**.

\`\`\`python
siswa = {
    "nama": "Ali",
    "umur": 20,
    "kelas": "A"
}
print(siswa["nama"])  # Ali
\`\`\``,
          codeExample: 'mobil = {"merek": "Toyota", "tahun": 2024}\nprint(mobil["merek"])',
          initialCode: '# Buat dictionary profil dengan kunci "nama" dan "kota"\n# Cetak nilai "kota"\n',
          solution: 'profil = {"nama": "Budi", "kota": "Jakarta"}\nprint(profil["kota"])',
          hint: 'Buat dictionary dengan {} lalu akses dengan ["kota"].',
          quiz: {
            question: 'Simbol apa yang mengapit dictionary?',
            options: ['[]', '()', '{}', '<>'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Jakarta', description: 'Buat dictionary dan cetak nilai kota.' }
          ],
          validationRules: [
            { pattern: '\\{.*["\']nama["\'].*:.*["\']Budi["\'].*\\}', message: "Buat dictionary 'profil' dengan kunci 'nama' dan 'kota'.", shouldExist: true },
            { pattern: '\\[["\']kota["\']\\]', message: "Akses nilai 'kota' menggunakan profil['kota'].", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py3-string-methods',
      title: 'String Methods',
      lessons: [
        {
          id: 'py3-string-ops',
          title: 'Operasi String',
          explanation: `String memiliki banyak method berguna:
- **upper()**: Ubah ke huruf besar.
- **lower()**: Ubah ke huruf kecil.
- **replace()**: Ganti teks.
- **split()**: Pecah string menjadi list.
- **strip()**: Hapus spasi di awal/akhir.

\`\`\`python
teks = "Hello World"
print(teks.upper())    # HELLO WORLD
print(teks.split())    # ['Hello', 'World']
\`\`\``,
          codeExample: 'teks = "python programming"\nprint(teks.upper())',
          initialCode: 'kalimat = "Belajar Python Itu Menyenangkan"\n# Ubah kalimat ke huruf kecil dan cetak\n',
          solution: 'kalimat = "Belajar Python Itu Menyenangkan"\nprint(kalimat.lower())',
          hint: 'Gunakan .lower() pada string.',
          quiz: {
            question: 'Method apa yang mengubah string ke huruf kecil?',
            options: ['small()', 'lower()', 'down()', 'lowercase()'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'belajar python itu menyenangkan', description: 'Ubah kalimat ke huruf kecil.' }
          ],
          validationRules: [
            { pattern: '\\.lower\\s*\\(\\s*\\)', message: "Gunakan method '.lower()' untuk mengubah teks menjadi huruf kecil.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py3-file-handling',
      title: 'File Handling',
      lessons: [
        {
          id: 'py3-read-write',
          title: 'Membaca & Menulis File',
          explanation: `Python bisa membaca dan menulis file menggunakan **open()**.

**Menulis file:**
\`\`\`python
with open("data.txt", "w") as f:
    f.write("Hello, File!")
\`\`\`

**Membaca file:**
\`\`\`python
with open("data.txt", "r") as f:
    isi = f.read()
    print(isi)
\`\`\`

**Mode file:** w=write, r=read, a=append

*Catatan: Di sini kita simulasikan tanpa file sesungguhnya.*`,
          codeExample: '# Simulasi file\ndata = "Ini isi file"\nprint(data)',
          initialCode: '# Simulasikan membaca 3 baris dari file\nbaris = ["Baris 1", "Baris 2", "Baris 3"]\n# Cetak setiap baris menggunakan loop\n',
          solution: 'baris = ["Baris 1", "Baris 2", "Baris 3"]\nfor b in baris:\n    print(b)',
          hint: 'Gunakan for loop untuk mengiterasi list baris.',
          quiz: {
            question: 'Mode apa yang digunakan untuk menulis file baru?',
            options: ['r', 'w', 'a', 'x'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Baris 1\nBaris 2\nBaris 3', description: 'Cetak setiap baris dari simulasi file.' }
          ]
        }
      ]
    },
    {
      id: 'py3-error-handling',
      title: 'Error Handling',
      lessons: [
        {
          id: 'py3-try-except',
          title: 'Try-Except',
          explanation: `**try-except** digunakan untuk menangani error agar program tidak crash.

\`\`\`python
try:
    hasil = 10 / 0
except ZeroDivisionError:
    print("Tidak bisa bagi dengan nol!")
\`\`\`

Kita bisa menangkap error spesifik atau umum:
\`\`\`python
try:
    x = int("abc")
except ValueError:
    print("Bukan angka!")
except Exception as e:
    print(f"Error: {e}")
\`\`\``,
          codeExample: 'try:\n    x = int("abc")\nexcept ValueError:\n    print("Error: bukan angka")',
          initialCode: '# Coba konversi "hello" menjadi integer\n# Tangkap error dan cetak "Konversi gagal"\n',
          solution: 'try:\n    x = int("hello")\nexcept ValueError:\n    print("Konversi gagal")',
          hint: 'Gunakan try-except ValueError.',
          quiz: {
            question: 'Blok apa yang menangkap error di Python?',
            options: ['catch', 'except', 'handle', 'error'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Konversi gagal', description: 'Tangkap error konversi dan cetak pesan.' }
          ],
          validationRules: [
            { pattern: 'try\\s*:', message: "Gunakan blok 'try' untuk membungkus kode yang berisiko error.", shouldExist: true },
            { pattern: 'except\\s+ValueError\\s*:', message: "Gunakan 'except ValueError' untuk menangkap kesalahan konversi.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py3-final-project',
      title: 'Proyek Akhir',
      lessons: [
        {
          id: 'py3-project-calculator',
          title: 'Kalkulator Sederhana',
          explanation: `Mari buat kalkulator yang menghitung dan mengategorikan hasil.

**Tugas:**
1. Buat variabel \`a = 10\` dan \`b = 20\`.
2. Hitung jumlahnya.
3. Cetak dengan format: "Hasil: 30"`,
          codeExample: 'a = 5\nb = 5\nprint("Hasil: " + str(a + b))',
          initialCode: 'a = 10\nb = 20\n# Hitung jumlahnya dan cetak "Hasil: 30"\n',
          solution: 'a = 10\nb = 20\nhasil = a + b\nprint("Hasil: " + str(hasil))',
          hint: 'Ingat untuk mengubah angka menjadi string menggunakan str().',
          quiz: {
            question: 'Fungsi apa yang digunakan untuk mengubah angka menjadi teks (string)?',
            options: ['int()', 'text()', 'str()', 'string()'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Hasil: 30', description: 'Cetak hasil penjumlahan 10 + 20 dengan format "Hasil: 30".' }
          ],
          validationRules: [
            { pattern: 'a\\s*=\\s*10', message: "Buat variabel a dengan nilai 10.", shouldExist: true },
            { pattern: 'b\\s*=\\s*20', message: "Buat variabel b dengan nilai 20.", shouldExist: true },
            { pattern: 'str\\s*\\(', message: "Gunakan str() untuk menggabungkan angka ke dalam string teks.", shouldExist: true }
          ]
        },
        {
          id: 'py3-project-grading',
          title: 'Sistem Penilaian',
          explanation: `Buatlah sistem yang menentukan apakah seorang siswa lulus atau tidak berdasarkan nilai dan kehadiran.

**Aturan:**
1. Jika nilai >= 70 **DAN** kehadiran >= 80, cetak "LULUS".
2. Jika tidak, cetak "REMIDIAL".`,
          codeExample: 'nilai = 85\nhadir = 90\nif nilai > 70 and hadir > 80:\n    print("LULUS")',
          initialCode: 'nilai = 75\nkehadiran = 70\n# Tentukan status siswa (LULUS/REMIDIAL)\n',
          solution: 'nilai = 75\nkehadiran = 70\nif nilai >= 70 and kehadiran >= 80:\n    print("LULUS")\nelse:\n    print("REMIDIAL")',
          hint: 'Gunakan operator "and" untuk mengecek dua kondisi sekaligus.',
          quiz: {
            question: 'Operator apa yang digunakan untuk memastikan DUA kondisi harus benar?',
            options: ['or', 'not', 'and', '&&'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'REMIDIAL', description: 'Siswa dengan nilai 75 tapi kehadiran 70 harus mendapatkan hasil "REMIDIAL".' }
          ],
          validationRules: [
            { pattern: 'and', message: "Gunakan operator 'and' untuk mengecek dua kondisi sekaligus.", shouldExist: true },
            { pattern: 'if\\s+nilai\\s*>=.*and.*kehadiran\\s*>=', message: "Gunakan logika 'if nilai >= 70 and kehadiran >= 80'.", shouldExist: true }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// KURIKULUM BAHASA C — 3 Level × 5 Modul
// ============================================================

const cLevel1: Level = {
  id: 'c-level-1',
  title: 'Bahasa C Dasar',
  description: 'Fondasi pemrograman C: struktur program, variabel, tipe data, operator, dan I/O.',
  modules: [
    {
      id: 'c1-intro',
      title: 'Pendahuluan C',
      lessons: [
        {
          id: 'c1-hello-world',
          title: 'Program Pertama',
          explanation: `Setiap program C dimulai dengan fungsi **main()**. Untuk menampilkan teks, gunakan **printf()** dari library **stdio.h**.

**Struktur dasar:**
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

- \`#include <stdio.h>\`: Menyertakan library input/output.
- \`int main()\`: Fungsi utama program.
- \`printf()\`: Mencetak teks.
- \`\\n\`: Karakter baris baru.
- \`return 0\`: Menandakan program berakhir dengan sukses.`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    // Cetak "Hello, World!" di sini\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
          hint: 'Gunakan printf("Hello, World!\\n"); di dalam main().',
          quiz: {
            question: 'Fungsi apa yang digunakan untuk mencetak teks di C?',
            options: ['print()', 'printf()', 'cout', 'echo()'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Hello, World!', description: 'Cetak "Hello, World!" menggunakan printf().' }
          ],
          validationRules: [
            { pattern: '#include\\s+<stdio.h>', message: "Setiap program C harus menyertakan '#include <stdio.h>'.", shouldExist: true },
            { pattern: 'int\\s+main\\s*\\(\\s*\\)', message: "Harus ada fungsi 'int main()'.", shouldExist: true },
            { pattern: 'printf\\s*\\(', message: "Gunakan fungsi 'printf()' untuk mencetak teks.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c1-variables',
      title: 'Variabel C',
      lessons: [
        {
          id: 'c1-var-declaration',
          title: 'Deklarasi Variabel',
          explanation: `Di C, kita harus menentukan **tipe data** saat mendeklarasikan variabel:

- **int**: Bilangan bulat.
- **float**: Bilangan desimal.
- **char**: Satu karakter.

\`\`\`c
int umur = 20;
float tinggi = 175.5;
char huruf = 'A';
\`\`\`

Untuk mencetak variabel, gunakan **format specifier**:
- \`%d\` untuk int
- \`%f\` untuk float
- \`%c\` untuk char`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int x = 42;\n    printf("Nilai: %d\\n", x);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    // Buat variabel int bernama skor dengan nilai 100\n    // Cetak "Skor: 100"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int skor = 100;\n    printf("Skor: %d\\n", skor);\n    return 0;\n}',
          hint: 'Gunakan int skor = 100; lalu printf("Skor: %d\\n", skor);',
          quiz: {
            question: 'Format specifier untuk integer adalah?',
            options: ['%f', '%c', '%d', '%s'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Skor: 100', description: 'Deklarasikan variabel int dan cetak nilainya.' }
          ],
          validationRules: [
            { pattern: 'int\\s+skor\\s*=\\s*100\\s*;', message: "Deklarasikan 'int skor = 100;' (jangan lupa titik koma).", shouldExist: true },
            { pattern: '%d', message: "Gunakan '%d' di dalam printf untuk mencetak variabel integer.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c1-data-types',
      title: 'Tipe Data C',
      lessons: [
        {
          id: 'c1-int-float-char',
          title: 'Int, Float, dan Char',
          explanation: `Tipe data di C menentukan berapa memori yang digunakan:

| Tipe | Ukuran | Contoh |
|------|--------|--------|
| int | 4 byte | 42 |
| float | 4 byte | 3.14 |
| double | 8 byte | 3.14159 |
| char | 1 byte | 'A' |

\`\`\`c
float pi = 3.14;
printf("Pi = %.2f\\n", pi);  // Pi = 3.14
\`\`\`

\`.2f\` artinya tampilkan 2 angka di belakang koma.`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    float pi = 3.14;\n    printf("Pi = %.2f\\n", pi);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    // Buat variabel float harga = 25.50\n    // Cetak "Harga: 25.50"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    float harga = 25.50;\n    printf("Harga: %.2f\\n", harga);\n    return 0;\n}',
          hint: 'Gunakan %.2f untuk format 2 desimal.',
          quiz: {
            question: 'Berapa byte yang digunakan tipe double?',
            options: ['2', '4', '8', '16'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Harga: 25.50', description: 'Cetak harga dengan 2 angka desimal.' }
          ]
        }
      ]
    },
    {
      id: 'c1-operators',
      title: 'Operator C',
      lessons: [
        {
          id: 'c1-arithmetic-ops',
          title: 'Operator Aritmetika',
          explanation: `Operator aritmetika di C mirip dengan Python:
- \`+\` Penjumlahan
- \`-\` Pengurangan
- \`*\` Perkalian
- \`/\` Pembagian
- \`%\` Modulo (sisa bagi)

**Perbedaan penting:** Pembagian integer di C menghasilkan integer:
\`\`\`c
int a = 7 / 2;  // Hasilnya 3, bukan 3.5
\`\`\``,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int a = 15, b = 4;\n    printf("Sisa: %d\\n", a % b);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    int x = 10, y = 3;\n    // Cetak sisa bagi dari x / y\n    // Format: "Sisa: <hasil>"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int x = 10, y = 3;\n    printf("Sisa: %d\\n", x % y);\n    return 0;\n}',
          hint: 'Gunakan operator % untuk modulo.',
          quiz: {
            question: 'Apa hasil dari 7 / 2 di C (tipe int)?',
            options: ['3.5', '3', '4', '3.0'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Sisa: 1', description: 'Cetak sisa bagi dari 10 / 3.' }
          ]
        }
      ]
    },
    {
      id: 'c1-io',
      title: 'Input/Output C',
      lessons: [
        {
          id: 'c1-printf-scanf',
          title: 'printf dan scanf',
          explanation: `**printf()** untuk output, **scanf()** untuk input.

\`\`\`c
int umur;
printf("Masukkan umur: ");
scanf("%d", &umur);
printf("Umur Anda: %d\\n", umur);
\`\`\`

**Penting:** Gunakan **&** sebelum nama variabel di scanf (kecuali string).

*Di sini kita simulasikan tanpa input interaktif.*`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10;\n    printf("Jumlah: %d\\n", a + b);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    int p = 8, l = 4;\n    // Hitung luas persegi panjang (p * l)\n    // Cetak "Luas: <hasil>"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int p = 8, l = 4;\n    int luas = p * l;\n    printf("Luas: %d\\n", luas);\n    return 0;\n}',
          hint: 'Hitung p * l dan cetak dengan printf.',
          quiz: {
            question: 'Apa kegunaan simbol & di scanf?',
            options: ['Logika AND', 'Alamat memori variabel', 'Referensi pointer', 'Tidak berguna'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Luas: 32', description: 'Hitung dan cetak luas persegi panjang 8 × 4.' }
          ],
          validationRules: [
            { pattern: 'p\\s*\\*\\s*l', message: "Gunakan rumus 'p * l' untuk menghitung luas.", shouldExist: true },
            { pattern: 'printf\\s*\\(', message: "Hampilkan hasil menggunakan printf().", shouldExist: true }
          ]
        }
      ]
    }
  ]
};

const cLevel2: Level = {
  id: 'c-level-2',
  title: 'Bahasa C Menengah',
  description: 'Alur kontrol, perulangan, fungsi, array, dan string di bahasa C.',
  modules: [
    {
      id: 'c2-conditionals',
      title: 'Kondisional C',
      lessons: [
        {
          id: 'c2-if-else',
          title: 'If-Else di C',
          explanation: `Sintaks kondisional di C:

\`\`\`c
if (kondisi) {
    // kode jika benar
} else if (kondisi2) {
    // kode jika kondisi2 benar
} else {
    // kode jika semua salah
}
\`\`\`

**Perbedaan dengan Python:** Gunakan **kurung kurawal {}** dan **tanda kurung ()**.`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int x = 10;\n    if (x > 5) {\n        printf("Besar\\n");\n    }\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    int nilai = 75;\n    // Jika nilai >= 70 cetak "Lulus"\n    // Jika tidak cetak "Gagal"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int nilai = 75;\n    if (nilai >= 70) {\n        printf("Lulus\\n");\n    } else {\n        printf("Gagal\\n");\n    }\n    return 0;\n}',
          hint: 'Gunakan if (nilai >= 70) { printf("Lulus\\n"); }',
          quiz: {
            question: 'Apa yang mengapit kondisi di if statement C?',
            options: ['{}', '[]', '()', '<>'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Lulus', description: 'Cek apakah nilai 75 memenuhi syarat lulus (>= 70).' }
          ],
          validationRules: [
            { pattern: 'if\\s*\\(\\s*nilai\\s*>=', message: "Gunakan sintaks 'if (nilai >= 70)' dengan tanda kurung.", shouldExist: true },
            { pattern: '\\{', message: "Gunakan kurung kurawal '{}' untuk membungkus kode di dalam if/else.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-loops',
      title: 'Perulangan C',
      lessons: [
        {
          id: 'c2-for-loop',
          title: 'For Loop di C',
          explanation: `Sintaks for loop di C:

\`\`\`c
for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}
\`\`\`

Terdiri dari 3 bagian:
1. **Inisialisasi**: \`int i = 0\`
2. **Kondisi**: \`i < 5\`
3. **Increment**: \`i++\``,
          codeExample: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    // Cetak angka 1 sampai 5 menggunakan for loop\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}',
          hint: 'Gunakan for (int i = 1; i <= 5; i++).',
          quiz: {
            question: 'Apa arti i++ di C?',
            options: ['i = i - 1', 'i = i + 1', 'i = i * 2', 'i = 0'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: '1\n2\n3\n4\n5', description: 'Cetak angka 1 sampai 5.' }
          ],
          validationRules: [
            { pattern: 'for\\s*\\(.*i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*5\\s*;\\s*i\\+\\+\\s*\\)', message: "Gunakan struktur 'for (int i = 1; i <= 5; i++)'.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-functions',
      title: 'Fungsi C',
      lessons: [
        {
          id: 'c2-function-basics',
          title: 'Membuat Fungsi di C',
          explanation: `Fungsi di C harus mendeklarasikan tipe return:

\`\`\`c
int tambah(int a, int b) {
    return a + b;
}

void sapa() {
    printf("Halo!\\n");
}
\`\`\`

- **int**: Fungsi mengembalikan integer.
- **void**: Fungsi tidak mengembalikan apa-apa.`,
          codeExample: '#include <stdio.h>\n\nint kali(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    printf("%d\\n", kali(3, 4));\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\n// Buat fungsi kuadrat yang menerima int n\n// dan mengembalikan n * n\n\nint main() {\n    printf("%d\\n", kuadrat(7));\n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint kuadrat(int n) {\n    return n * n;\n}\n\nint main() {\n    printf("%d\\n", kuadrat(7));\n    return 0;\n}',
          hint: 'Buat int kuadrat(int n) { return n * n; }',
          quiz: {
            question: 'Tipe return apa yang digunakan jika fungsi tidak mengembalikan nilai?',
            options: ['null', 'none', 'void', 'empty'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: '49', description: 'Buat fungsi kuadrat dan cetak kuadrat(7).' }
          ],
          validationRules: [
            { pattern: 'int\\s+kuadrat\\s*\\(\\s*int\\s+n\\s*\\)', message: "Definisikan fungsi 'int kuadrat(int n)'.", shouldExist: true },
            { pattern: 'return\\s+n\\s*\\*\\s*n\\s*;', message: "Kembalikan hasil kuadrat 'n * n' menggunakan return.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-arrays',
      title: 'Array C',
      lessons: [
        {
          id: 'c2-array-basics',
          title: 'Mengenal Array',
          explanation: `**Array** menyimpan beberapa nilai bertipe sama:

\`\`\`c
int angka[5] = {10, 20, 30, 40, 50};
printf("%d\\n", angka[0]);  // 10
printf("%d\\n", angka[2]);  // 30
\`\`\`

Indeks dimulai dari **0**. Ukuran array harus ditentukan saat deklarasi.`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int data[3] = {5, 10, 15};\n    printf("%d\\n", data[1]);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    int nilai[4] = {80, 90, 75, 85};\n    // Cetak elemen ke-3 (75)\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int nilai[4] = {80, 90, 75, 85};\n    printf("%d\\n", nilai[2]);\n    return 0;\n}',
          hint: 'Elemen ke-3 adalah indeks [2].',
          quiz: {
            question: 'Indeks elemen pertama array di C adalah?',
            options: ['1', '0', '-1', 'first'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: '75', description: 'Akses dan cetak elemen ke-3 dari array.' }
          ],
          validationRules: [
            { pattern: 'nilai\\[2\\]', message: "Indeks elemen ke-3 dalam array adalah [2].", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-strings',
      title: 'String C',
      lessons: [
        {
          id: 'c2-string-basics',
          title: 'String di C',
          explanation: `Di C, string adalah array dari karakter yang diakhiri **null character** (\\0):

\`\`\`c
char nama[20] = "Ali";
printf("%s\\n", nama);  // Ali
\`\`\`

Gunakan **%s** untuk mencetak string. Library **string.h** menyediakan fungsi:
- \`strlen()\`: Panjang string.
- \`strcpy()\`: Menyalin string.
- \`strcmp()\`: Membandingkan string.`,
          codeExample: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char kata[] = "Hello";\n    printf("Panjang: %lu\\n", strlen(kata));\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    char bahasa[] = "C Language";\n    // Cetak string bahasa\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    char bahasa[] = "C Language";\n    printf("%s\\n", bahasa);\n    return 0;\n}',
          hint: 'Gunakan printf("%s\\n", bahasa);',
          quiz: {
            question: 'Format specifier untuk string di C adalah?',
            options: ['%d', '%c', '%s', '%f'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'C Language', description: 'Cetak string "C Language".' }
          ]
        }
      ]
    }
  ]
};

const cLevel3: Level = {
  id: 'c-level-3',
  title: 'Bahasa C Lanjutan',
  description: 'Tingkatkan kemampuan C: pointer, struct, memory management, file I/O, dan proyek akhir.',
  modules: [
    {
      id: 'c3-pointers',
      title: 'Pointer',
      lessons: [
        {
          id: 'c3-pointer-basics',
          title: 'Dasar Pointer',
          explanation: `**Pointer** adalah variabel yang menyimpan alamat memori dari variabel lain.

\`\`\`c
int x = 10;
int *ptr = &x;  // ptr menyimpan alamat x

printf("%d\\n", *ptr);  // 10 (dereferencing)
printf("%p\\n", ptr);   // alamat memori x
\`\`\`

- \`&\`: Mengambil alamat variabel.
- \`*\`: Mengakses nilai di alamat (dereferencing).`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int a = 42;\n    int *p = &a;\n    printf("Nilai: %d\\n", *p);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    int nilai = 100;\n    // Buat pointer ke nilai\n    // Cetak nilai melalui pointer\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int nilai = 100;\n    int *ptr = &nilai;\n    printf("%d\\n", *ptr);\n    return 0;\n}',
          hint: 'Gunakan int *ptr = &nilai; lalu printf("%d\\n", *ptr);',
          quiz: {
            question: 'Operator apa yang mengambil alamat memori variabel?',
            options: ['*', '&', '#', '@'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: '100', description: 'Cetak nilai 100 melalui pointer.' }
          ],
          validationRules: [
            { pattern: 'int\\s*\\*\\s*ptr\\s*=\\s*&nilai', message: "Buat pointer 'ptr' yang menyimpan alamat '&nilai'.", shouldExist: true },
            { pattern: '\\*ptr', message: "Gunakan dereferencing '*ptr' untuk mengakses nilai variabel.", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c3-struct',
      title: 'Struct',
      lessons: [
        {
          id: 'c3-struct-basics',
          title: 'Mengenal Struct',
          explanation: `**Struct** mengelompokkan variabel dengan tipe berbeda menjadi satu unit:

\`\`\`c
struct Mahasiswa {
    char nama[50];
    int umur;
    float ipk;
};

struct Mahasiswa m1 = {"Ali", 20, 3.8};
printf("%s\\n", m1.nama);
\`\`\`

Akses anggota struct menggunakan operator **titik (.)**`,
          codeExample: '#include <stdio.h>\n\nstruct Mobil {\n    char merek[30];\n    int tahun;\n};\n\nint main() {\n    struct Mobil m = {"Toyota", 2024};\n    printf("%s %d\\n", m.merek, m.tahun);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nstruct Siswa {\n    char nama[50];\n    int nilai;\n};\n\nint main() {\n    // Buat struct Siswa dengan nama "Budi" dan nilai 90\n    // Cetak "Budi: 90"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nstruct Siswa {\n    char nama[50];\n    int nilai;\n};\n\nint main() {\n    struct Siswa s = {"Budi", 90};\n    printf("%s: %d\\n", s.nama, s.nilai);\n    return 0;\n}',
          hint: 'Buat struct Siswa s = {"Budi", 90}; lalu gunakan s.nama dan s.nilai.',
          quiz: {
            question: 'Operator apa yang digunakan untuk mengakses anggota struct?',
            options: ['->', '::', '.', '[]'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Budi: 90', description: 'Cetak data siswa dari struct.' }
          ],
          validationRules: [
            { pattern: 'struct\\s+Siswa\\s+s\\s*=', message: "Deklarasikan variabel struct 's' dengan tipe 'struct Siswa'.", shouldExist: true },
            { pattern: 's\\.nama', message: "Akses anggota struct menggunakan operator titik (s.nama).", shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c3-memory',
      title: 'Manajemen Memori',
      lessons: [
        {
          id: 'c3-malloc-free',
          title: 'malloc dan free',
          explanation: `C menggunakan alokasi memori manual:

\`\`\`c
#include <stdlib.h>

int *arr = (int*)malloc(5 * sizeof(int));
// gunakan arr...
free(arr);  // WAJIB setelah selesai
\`\`\`

- **malloc()**: Alokasi memori di heap.
- **free()**: Membebaskan memori.
- Selalu **free()** setelah selesai menggunakan memori.

*Catatan: Di simulasi ini kita tidak bisa menjalankan malloc secara interaktif.*`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    // Simulasi konsep: ukuran tipe data\n    printf("int: %lu byte\\n", sizeof(int));\n    printf("char: %lu byte\\n", sizeof(char));\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    // Cetak ukuran float dan double menggunakan sizeof\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    printf("float: %lu byte\\n", sizeof(float));\n    printf("double: %lu byte\\n", sizeof(double));\n    return 0;\n}',
          hint: 'Gunakan sizeof(float) dan sizeof(double).',
          quiz: {
            question: 'Fungsi apa yang membebaskan memori yang dialokasikan secara dinamis?',
            options: ['delete()', 'release()', 'free()', 'remove()'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'float: 4 byte\ndouble: 8 byte', description: 'Cetak ukuran tipe float dan double.' }
          ]
        }
      ]
    },
    {
      id: 'c3-file-io',
      title: 'File I/O C',
      lessons: [
        {
          id: 'c3-file-basics',
          title: 'Baca Tulis File',
          explanation: `Di C, file dioperasikan menggunakan pointer **FILE**:

\`\`\`c
FILE *fp = fopen("data.txt", "w");
fprintf(fp, "Hello File!\\n");
fclose(fp);
\`\`\`

Mode: \`"w"\`=tulis, \`"r"\`=baca, \`"a"\`=tambah.

*Di simulasi ini kita cetak langsung tanpa file.*`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    // Simulasi menulis ke file\n    printf("Data tersimpan\\n");\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    // Simulasi: cetak 3 baris data seolah membaca file\n    // "Baris 1", "Baris 2", "Baris 3"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    printf("Baris 1\\n");\n    printf("Baris 2\\n");\n    printf("Baris 3\\n");\n    return 0;\n}',
          hint: 'Gunakan 3 printf() untuk mencetak setiap baris.',
          quiz: {
            question: 'Fungsi apa yang digunakan untuk membuka file di C?',
            options: ['open()', 'fopen()', 'fileopen()', 'read()'],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: 'Baris 1\nBaris 2\nBaris 3', description: 'Cetak 3 baris data simulasi file.' }
          ]
        }
      ]
    },
    {
      id: 'c3-final-project',
      title: 'Proyek Akhir C',
      lessons: [
        {
          id: 'c3-project-stats',
          title: 'Statistik Array',
          explanation: `Buat program yang menghitung **total** dan **rata-rata** dari array angka.

**Tugas:**
1. Buat array integer: {10, 20, 30, 40, 50}.
2. Hitung jumlah total semua elemen.
3. Hitung rata-rata (total / jumlah elemen).
4. Cetak total dan rata-rata.`,
          codeExample: '#include <stdio.h>\n\nint main() {\n    int data[] = {5, 10, 15};\n    int total = 0;\n    for (int i = 0; i < 3; i++) {\n        total += data[i];\n    }\n    printf("Total: %d\\n", total);\n    return 0;\n}',
          initialCode: '#include <stdio.h>\n\nint main() {\n    int data[] = {10, 20, 30, 40, 50};\n    int n = 5;\n    // Hitung total dan rata-rata\n    // Cetak "Total: 150"\n    // Cetak "Rata-rata: 30"\n    \n    return 0;\n}',
          solution: '#include <stdio.h>\n\nint main() {\n    int data[] = {10, 20, 30, 40, 50};\n    int n = 5;\n    int total = 0;\n    for (int i = 0; i < n; i++) {\n        total += data[i];\n    }\n    int rata = total / n;\n    printf("Total: %d\\n", total);\n    printf("Rata-rata: %d\\n", rata);\n    return 0;\n}',
          hint: 'Gunakan loop untuk menjumlahkan, lalu bagi total dengan n.',
          quiz: {
            question: 'Bagaimana cara menghitung rata-rata dari sebuah array?',
            options: ['Jumlah / 2', 'Jumlah * n', 'Jumlah / n', 'n / Jumlah'],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: 'Total: 150\nRata-rata: 30', description: 'Hitung dan cetak total serta rata-rata array.' }
          ],
          validationRules: [
            { pattern: 'for\\s*\\(', message: "Gunakan loop untuk menjumlahkan elemen array.", shouldExist: true },
            { pattern: '\\/\\s*n', message: "Hitung rata-rata dengan membagi total dengan n.", shouldExist: true },
            { pattern: 'printf\\s*\\(.*Total', message: "Cetak hasil Total menggunakan printf.", shouldExist: true }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// EXPORT KURIKULUM GABUNGAN
// ============================================================

export const curriculum: Level[] = [
  pythonLevel1,
  pythonLevel2,
  pythonLevel3,
  cLevel1,
  cLevel2,
  cLevel3,
];
