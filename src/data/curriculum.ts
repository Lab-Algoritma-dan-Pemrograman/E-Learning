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
  modules: Module[];
}

export const curriculum: Level[] = [
  {
    id: 'level-1',
    title: 'Dasar-dasar Python',
    description: 'Kuasai dasar-dasar pemrograman Python.',
    modules: [
      {
        id: 'intro',
        title: 'Pendahuluan',
        lessons: [
          {
            id: 'what-is-python',
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
            ]
          },
          {
            id: 'how-python-works',
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
        id: 'variables',
        title: 'Variabel',
        lessons: [
          {
            id: 'understanding-variables',
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
            ]
          }
        ]
      },
      {
        id: 'data-types',
        title: 'Tipe Data',
        lessons: [
          {
            id: 'strings-and-numbers',
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
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    title: 'Alur Kontrol',
    description: 'Pelajari cara membuat keputusan dan mengulangi tindakan dalam kode Anda.',
    modules: [
      {
        id: 'logic',
        title: 'Logika Kondisional',
        lessons: [
          {
            id: 'if-statement',
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
            ]
          },
          {
            id: 'else-statement',
            title: 'Pernyataan Else',
            explanation: `Pernyataan **else** digunakan untuk menjalankan kode jika kondisi pada **if** tidak terpenuhi.

**Contoh:**
\`\`\`python
umur = 15
if umur >= 18:
    print("Dewasa")
else:
    print("Anak-anak")
\`\`\``,
            codeExample: 'if 1 > 2:\n    print("A")\nelse:\n    print("B")',
            initialCode: 'nilai = 40\n# Jika nilai >= 60 cetak "Lulus", jika tidak cetak "Gagal"\n',
            solution: 'nilai = 40\nif nilai >= 60:\n    print("Lulus")\nelse:\n    print("Gagal")',
            hint: 'Jangan lupa titik dua (:) setelah if dan else.',
            quiz: {
              question: 'Kapan kode di dalam blok else dijalankan?',
              options: ['Selalu', 'Jika kondisi if benar', 'Jika kondisi if salah', 'Tidak pernah'],
              correctAnswer: 2
            },
            testCases: [
              { expectedOutput: 'Gagal', description: 'Gunakan if-else untuk mencetak "Gagal" karena nilai (40) kurang dari 60.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-3',
    title: 'Perulangan',
    description: 'Pelajari cara mengulangi tugas secara otomatis.',
    modules: [
      {
        id: 'loops',
        title: 'For Loops',
        lessons: [
          {
            id: 'for-range',
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
              question: 'Apa fungsi dari range(10)?',
              options: ['Menghitung angka 1-10', 'Mengulangi kode 10 kali', 'Mencetak angka 10', 'Menghapus 10 baris'],
              correctAnswer: 1
            },
            testCases: [
              { expectedOutput: 'Python\nPython\nPython\nPython\nPython', description: 'Cetak kata "Python" sebanyak 5 kali menggunakan loop.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-4',
    title: 'Struktur Data',
    description: 'Cara menyimpan banyak data dalam satu tempat.',
    modules: [
      {
        id: 'lists',
        title: 'List (Daftar)',
        lessons: [
          {
            id: 'intro-to-lists',
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
          }
        ]
      }
    ]
  },
  {
    id: 'level-5',
    title: 'Fungsi',
    description: 'Pelajari cara membuat blok kode yang bisa digunakan kembali.',
    modules: [
      {
        id: 'functions-basics',
        title: 'Dasar Fungsi',
        lessons: [
          {
            id: 'defining-functions',
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
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-6',
    title: 'Input Pengguna',
    description: 'Pelajari cara membuat program yang interaktif dengan menerima input dari pengguna.',
    modules: [
      {
        id: 'user-input',
        title: 'Menerima Input',
        lessons: [
          {
            id: 'input-function',
            title: 'Fungsi input()',
            explanation: `Fungsi **input()** digunakan untuk meminta data dari pengguna. Data yang dimasukkan selalu dianggap sebagai **String**.

**Contoh:**
\`\`\`python
nama = input("Siapa namamu? ")
print("Halo " + nama)
\`\`\`
Jika ingin menerima angka, kita harus mengubahnya menggunakan **int()** atau **float()**.`,
            codeExample: 'nama = "Budi"\nprint("Halo " + nama)',
            initialCode: '# 1. Minta input nama dari pengguna dan simpan di variabel "user"\n# 2. Cetak "Selamat Datang " + user\n# (Untuk simulasi di sini, anggap inputnya adalah "Admin")\nuser = "Admin"\n',
            solution: 'user = "Admin"\nprint("Selamat Datang " + user)',
            hint: 'Gunakan print("Selamat Datang " + user).',
            quiz: {
              question: 'Tipe data apa yang dihasilkan secara default oleh fungsi input()?',
              options: ['Integer', 'Float', 'String', 'Boolean'],
              correctAnswer: 2
            },
            testCases: [
              { expectedOutput: 'Selamat Datang Admin', description: 'Cetak pesan selamat datang menggunakan variabel user.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-7',
    title: 'Logika Lanjutan',
    description: 'Kuasai pengambilan keputusan yang lebih kompleks.',
    modules: [
      {
        id: 'advanced-logic',
        title: 'Elif dan Operator Logika',
        lessons: [
          {
            id: 'elif-statement',
            title: 'Menggunakan Elif',
            explanation: `**elif** (singkatan dari else if) digunakan jika kita memiliki lebih dari dua kondisi.

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
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-8',
    title: 'Proyek Akhir',
    description: 'Terapkan semua ilmu yang telah dipelajari dalam studi kasus nyata.',
    modules: [
      {
        id: 'case-studies',
        title: 'Studi Kasus',
        lessons: [
          {
            id: 'project-calculator',
            title: 'Proyek 1: Kalkulator Sederhana',
            explanation: `Mari kita buat kalkulator yang bisa menjumlahkan dua angka. Kita akan menggunakan variabel, input (simulasi), dan fungsi print.

**Tugas:**
Buat program yang menjumlahkan \`a = 10\` dan \`b = 20\` lalu mencetak hasilnya dengan format: "Hasil: 30"`,
            codeExample: 'a = 5\nb = 5\nprint("Hasil: " + str(a + b))',
            initialCode: 'a = 10\nb = 20\n# Hitung jumlahnya dan cetak "Hasil: 30"\n',
            solution: 'a = 10\nb = 20\nhasil = a + b\nprint("Hasil: " + str(hasil))',
            hint: 'Ingat untuk mengubah angka menjadi string menggunakan str() saat menggabungkannya dengan teks.',
            quiz: {
              question: 'Fungsi apa yang digunakan untuk mengubah angka menjadi teks (string)?',
              options: ['int()', 'text()', 'str()', 'string()'],
              correctAnswer: 2
            },
            testCases: [
              { expectedOutput: 'Hasil: 30', description: 'Cetak hasil penjumlahan 10 + 20 dengan format "Hasil: 30".' }
            ]
          },
          {
            id: 'project-grading',
            title: 'Proyek 2: Sistem Penilaian',
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
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-9',
    title: 'Analisis Data',
    description: 'Pelajari cara mengolah dan menganalisis data menggunakan pustaka populer.',
    modules: [
      {
        id: 'numpy-pandas',
        title: 'NumPy & Pandas',
        lessons: [
          {
            id: 'intro-numpy',
            title: 'Dasar NumPy',
            explanation: `**NumPy** adalah pustaka untuk komputasi numerik. Fitur utamanya adalah **Array**, yang mirip dengan List tapi lebih cepat untuk perhitungan matematika.

**Contoh:**
\`\`\`python
import numpy as np
arr = np.array([1, 2, 3])
print(arr * 2)  # Hasil: [2 4 6]
\`\`\``,
            codeExample: 'import numpy as np\na = np.array([10, 20])\nprint(a / 2)',
            initialCode: 'import numpy as np\ndata = [1, 2, 3, 4, 5]\n# Ubah list "data" menjadi numpy array dan cetak\n',
            solution: 'import numpy as np\ndata = [1, 2, 3, 4, 5]\narr = np.array(data)\nprint(arr)',
            hint: 'Gunakan np.array(data).',
            quiz: {
              question: 'Apa keunggulan utama NumPy Array dibandingkan List biasa?',
              options: ['Lebih lambat', 'Lebih cepat untuk operasi matematika', 'Hanya bisa menyimpan teks', 'Tidak bisa diubah'],
              correctAnswer: 1
            },
            testCases: [
              { expectedOutput: '[1 2 3 4 5]', description: 'Ubah list menjadi numpy array dan tampilkan.' }
            ]
          },
          {
            id: 'intro-pandas',
            title: 'Dasar Pandas',
            explanation: `**Pandas** digunakan untuk manipulasi data dalam bentuk tabel yang disebut **DataFrame**.

**Contoh:**
\`\`\`python
import pandas as pd
data = {"Nama": ["Ali", "Ani"], "Usia": [20, 22]}
df = pd.DataFrame(data)
print(df)
\`\`\``,
            codeExample: 'import pandas as pd\nd = {"X": [1], "Y": [2]}\ndf = pd.DataFrame(d)\nprint(df)',
            initialCode: 'import pandas as pd\n# Buat DataFrame dari dictionary: {"A": [1, 2], "B": [3, 4]}\n',
            solution: 'import pandas as pd\nd = {"A": [1, 2], "B": [3, 4]}\ndf = pd.DataFrame(d)\nprint(df)',
            hint: 'Gunakan pd.DataFrame(dictionary).',
            quiz: {
              question: 'Apa nama struktur data utama di Pandas untuk menyimpan tabel?',
              options: ['Table', 'Spreadsheet', 'DataFrame', 'DataList'],
              correctAnswer: 2
            },
            testCases: [
              { expectedOutput: '   A  B\n0  1  3\n1  2  4', description: 'Buat dan cetak DataFrame sederhana.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'level-10',
    title: 'Machine Learning',
    description: 'Mengenal dunia kecerdasan buatan dan prediksi data.',
    modules: [
      {
        id: 'ml-basics',
        title: 'Pengenalan ML',
        lessons: [
          {
            id: 'what-is-ml',
            title: 'Apa itu Machine Learning?',
            explanation: `**Machine Learning** adalah teknik di mana komputer belajar dari data untuk membuat prediksi atau keputusan tanpa diprogram secara eksplisit.

Ada 3 tipe utama:
1. **Supervised Learning**: Belajar dari data berlabel.
2. **Unsupervised Learning**: Mencari pola dalam data tanpa label.
3. **Reinforcement Learning**: Belajar melalui trial and error.`,
            codeExample: '# ML biasanya menggunakan scikit-learn\n# print("Ready to learn ML!")',
            initialCode: '# Cetak "Supervised Learning" untuk melanjutkan\n',
            solution: 'print("Supervised Learning")',
            hint: 'Cukup cetak tipe ML pertama.',
            quiz: {
              question: 'Tipe ML yang belajar dari data yang sudah memiliki label disebut?',
              options: ['Unsupervised', 'Reinforcement', 'Supervised', 'Deep Learning'],
              correctAnswer: 2
            },
            testCases: [
              { expectedOutput: 'Supervised Learning', description: 'Konfirmasi pemahaman tipe ML.' }
            ]
          },
          {
            id: 'linear-regression-logic',
            title: 'Logika Regresi Linear',
            explanation: `Regresi Linear digunakan untuk memprediksi angka berdasarkan hubungan linear.
Rumus dasarnya: **y = mx + c**

Misalnya, memprediksi harga rumah berdasarkan luas tanah. Semakin luas tanah (x), semakin tinggi harga (y).`,
            codeExample: 'x = 10  # Luas\nm = 5   # Harga per meter\nc = 100 # Biaya admin\ny = m*x + c\nprint(y)',
            initialCode: '# Prediksi nilai y jika x = 5, m = 2, dan c = 10\n# Gunakan rumus y = m*x + c\n',
            solution: 'x = 5\nm = 2\nc = 10\ny = m*x + c\nprint(y)',
            hint: 'Hitung 2 * 5 + 10.',
            quiz: {
              question: 'Dalam rumus y = mx + c, apa yang biasanya kita prediksi?',
              options: ['m', 'x', 'c', 'y'],
              correctAnswer: 3
            },
            testCases: [
              { expectedOutput: '20', description: 'Hitung prediksi nilai y menggunakan logika regresi linear.' }
            ]
          }
        ]
      }
    ]
  }
];
