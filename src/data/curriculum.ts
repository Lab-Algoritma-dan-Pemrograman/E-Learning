export interface ValidationRule {
  pattern: string;      
  message: string;      
  shouldExist: boolean; 
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

// ============================================================
// LEVEL 1: BAHASA C DASAR (MODUL I)
// ============================================================
const cLevel1: Level = {
  id: 'c-level-1',
  title: 'DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C',
  description: 'Mempelajari struktur penulisan program C, tipe data dasar, variabel, input/output, dan operator dasar.',
  modules: [
    {
      id: 'c1-m1',
      title: 'Struktur dan Tipe Data',
      lessons: [
        {
          id: 'c1-l1',
          title: 'Struktur Penulisan Program Bahasa C',
          explanation: `Struktur dasar program C terdiri dari dua bagian utama:\n\n1. **Bagian \`#include\`:** Berfungsi untuk mengimpor fungsi-fungsi dari header file (file yang berisi kumpulan definisi dan perintah). Contohnya \`<stdio.h>\` untuk fungsi input-output dasar seperti \`printf\` dan \`scanf\`.\n2. **Bagian \`int main()\`:** Ini adalah fungsi utama yang pertama kali dieksekusi saat program berjalan. Kurung kurawal \`{ }\` digunakan untuk mengelompokkan blok kode, dan setiap perintah wajib diakhiri titik koma (\`;\`). Perintah \`return 0;\` menutup fungsi main.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    printf("Halo, C!\\n");\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Tulis print "Selamat Datang di C!" di bawah\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    printf("Selamat Datang di C!\\n");\n    return 0;\n}`,
          hint: `Gunakan printf("Selamat Datang di C!\\n"); lalu pastikan ada tanda titik koma.`,
          quiz: {
            question: `Apa fungsi dari return 0; dalam int main()?`,
            options: [`Menghapus memori`, `Menutup fungsi main sekaligus mengakhiri program`, `Mencetak angka 0 ke layar`, `Mengabaikan error`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Selamat Datang di C!\n`, description: `Menampilkan teks awalan` }
          ],
          validationRules: [
            { pattern: `printf`, message: `Gunakan printf`, shouldExist: true },
            { pattern: `;`, message: `Jangan lupa titik koma (;)!`, shouldExist: true }
          ]
        },
        {
          id: 'c1-l2',
          title: 'Tipe Data dan Variabel',
          explanation: `Tipe data mengelompokkan data berdasarkan isi dan sifatnya.\n\n*   **char:** Karakter (format %c) / String (format %s)\n*   **int:** Bilangan bulat (format %i atau %d)\n*   **float:** Bilangan pecahan (format %f)\n*   **double:** Bilangan pecahan panjang (format %lf)\n\nVariabel dideklarasikan dengan format: \`Tipe_data Nama_variabel = nilai;\`. Contoh: \`int umur = 20;\`.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int skor = 100;\n    printf("Skor: %d\\n", skor);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Buat variabel integer bernama 'harga' bernilai 5000\n    \n\n    // Tampilkan variabel harga\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int harga = 5000;\n    printf("Harga: %d\\n", harga);\n    return 0;\n}`,
          hint: `Definisikan 'int harga = 5000;' lalu cetak dengan format '%d'`,
          quiz: {
            question: `Karakter format untuk menampilkan nilai variabel bertipe Float adalah?`,
            options: [`%d`, `%c`, `%f`, `%s`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Harga: 5000\n`, description: `Mencetak nilai variabel integer harga.` }
          ]
        }
      ]
    },
    {
      id: 'c1-m2',
      title: 'Output dan Input Program',
      lessons: [
        {
          id: 'c1-l3',
          title: 'Fungsi Input & Output',
          explanation: `**Mengambil Input: scanf()**\nMembaca input terformat. Variabel tujuan wajib menggunakan simbol alamat (\`&\`).\n\n**Menampilkan Data: printf() / puts()**\n\`printf\` bisa menampilkan format, sedangkan \`puts()\` khusus untuk mencetak string dan otomatis membuat baris baru.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int umur;\n    scanf("%d", &umur);\n    printf("Umur saya %d tahun\\n", umur);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int tahun;\n    // Lakukan scanf untuk meminta input angka tahun ke dalam variabel 'tahun'\n    \n    printf("Tahun: %d\\n", tahun);\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int tahun;\n    scanf("%d", &tahun);\n    printf("Tahun: %d\\n", tahun);\n    return 0;\n}`,
          hint: `Gunakan scanf("%d", &tahun);`,
          quiz: {
            question: `Simbol apa yang wajib ditambahkan sebelum nama variabel numerik pada fungsi scanf()?`,
            options: [`#`, `%`, `&`, `*`],
            correctAnswer: 2
          },
          testCases: [
            { input: `2024`, expectedOutput: `Tahun: 2024\n`, description: `Menampilkan input tahun yang dimasukkan.` }
          ],
          validationRules: [
            { pattern: `scanf`, message: `Gunakan fungsi scanf untuk menerima input`, shouldExist: true },
            { pattern: `&tahun`, message: `Gunakan & pada variabel dalam scanf`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c1-m3',
      title: 'Operator Dasar',
      lessons: [
        {
          id: 'c1-l4',
          title: 'Operator Aritmatika',
          explanation: `Simbol untuk melakukan pengolahan data aritmatika:\n- \`+\` : Penjumlahan\n- \`-\` : Pengurangan\n- \`*\` : Perkalian\n- \`/\` : Pembagian\n- \`%\` : Modulo (Sisa bagi)`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int sisa = 10 % 3;\n    printf("Sisa: %d\\n", sisa);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Hitung 15 sisa bagi 4, simpan ke dalam variabel 'modulo'\n    \n    // Cetak hasilnya\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int modulo = 15 % 4;\n    printf("%d\\n", modulo);\n    return 0;\n}`,
          hint: `Gunakan int modulo = 15 % 4; lalu printf untuk menampilkannya.`,
          quiz: {
            question: `Simbul untuk operator modulus (sisa bagi) di C adalah?`,
            options: [`/`, `\\`, `%`, `mod`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `3\n`, description: `Hitung 15 modulus 4` }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// LEVEL 2: STRUKTUR KONTROL BAHASA C (MODUL II)
// ============================================================
const cLevel2: Level = {
  id: 'c-level-2',
  title: 'STRUKTUR KONTROL DALAM BAHASA C',
  description: 'Mempelajari cara mengontrol alur program menggunakan percabangan (If, Switch) dan perulangan (While, For, Do-While).',
  modules: [
    {
      id: 'c2-m1',
      title: 'Percabangan (If-Else & Switch)',
      lessons: [
        {
          id: 'c2-l1',
          title: 'Percabangan If-Else',
          explanation: `Mengevaluasi kondisi. Jika kondisi terpenuhi (True), perintah di dalamnya dijalankan.\n\n- **if**: Percabangan tunggal. Kondisi benar baru eksekusi.\n- **if - else**: Jika \`if\` salah, eksekusi blok \`else\`.\n- **if - else if**: Lebih dari dua kondisi berurutan dari atas ke bawah.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int nilai = 80;\n    if (nilai >= 75) {\n        printf("Lulus\\n");\n    } else {\n        printf("Gagal\\n");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int suhu = 35;\n    // Jika suhu lebih besar dari 30, cetak "Panas", jika tidak "Normal".\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int suhu = 35;\n    if (suhu > 30) {\n        printf("Panas\\n");\n    } else {\n        printf("Normal\\n");\n    }\n    return 0;\n}`,
          hint: `Gunakan if (suhu > 30) { printf... } else { printf... }`,
          quiz: {
            question: `Apakah yang dijalankan jika blok 'if' tidak terpenuhi?`,
            options: [`if kedua`, `else`, `while`, `terjadi error`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Panas\n`, description: `Mencetak batas suhu dengan if-else` }
          ],
          validationRules: [
            { pattern: `if\\s*\\(.*\\)`, message: `Gunakan blok if()`, shouldExist: true },
            { pattern: `else`, message: `Gunakan blok else`, shouldExist: true }
          ]
        },
        {
          id: 'c2-l2',
          title: 'Struktur Switch Case',
          explanation: `Percabangan efisien untuk banyak pilihan nilai (angka/karakter). Strukturnya menggunakan \`case nilai:\`, dilarang menaruh operasi relasi pada nilai case.\nSetelah blok eksekusi, wajar menambah \`break;\` agar program tidak kebablasan ke bawah. \`default:\` bertindak sebagai else akhir.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int opsi = 2;\n    switch(opsi) {\n        case 1:\n            printf("Satu\\n"); break;\n        case 2:\n            printf("Dua\\n"); break;\n        default:\n            printf("Bukan 1 / 2\\n");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int hari = 1;\n    // Gunakan switch case. Jika hari = 1, print "Senin". Default print "Lainnya"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int hari = 1;\n    switch(hari) {\n        case 1:\n            printf("Senin\\n");\n            break;\n        default:\n            printf("Lainnya\\n");\n    }\n    return 0;\n}`,
          hint: `switch(hari) { case 1: printf("Senin\\n"); break; default: printf("Lainnya\\n"); }`,
          quiz: {
            question: `Sintaks apa yang wajib ditambahkan di setiap blok 'case' agar tidak kebablasan mengeksekusi case selanjutnya?`,
            options: [`stop;`, `exit;`, `break;`, `continue;`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Senin\n`, description: `Mencetak nilai menggunakan switch case` }
          ],
          validationRules: [
            { pattern: `switch\\s*\\(`, message: `Harus menggunakan statement switch`, shouldExist: true },
            { pattern: `case 1:`, message: `Harus ada definisi case 1:`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-m2',
      title: 'Perulangan (Looping)',
      lessons: [
        {
          id: 'c2-l3',
          title: 'Perulangan While dan Do-While',
          explanation: `Terdiri dari 3 syarat: inisialisasi, kondisi, step.\n\n- **While**: Kondisi diperiksa di awal. Jika dari awal sudah salah, program tidak dijalankan sama sekali.\n- **Do - While**: Kondisi diperiksa di akhir. Blok program dipastikan berjalan minimal satu kali sebelum mengecek kondisi perulangan.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int x = 1;\n    while(x <= 3) {\n        printf("%d\\n", x);\n        x++;\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int x = 1;\n    // Cetak x dari 1 hingga 5 menggunakan while loop\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int x = 1;\n    while(x <= 5) {\n        printf("%d\\n", x);\n        x++;\n    }\n    return 0;\n}`,
          hint: `while (x <= 5) { printf("%d\\n", x); x++; }`,
          quiz: {
            question: `Apa perbedaan utama antara while dan do-while?`,
            options: [`Do-while tidak butuh step`, `Do-while pasti dieksekusi minimal satu kali`, `While digunakan hanya saat step menurun`, `Do-while lebih lambat dan panjang maknanya`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `1\n2\n3\n4\n5\n`, description: `Mencetak 1 hingga 5.` }
          ]
        },
        {
          id: 'c2-l4',
          title: 'Perulangan For',
          explanation: `Perulangan yang jumlah iterasinya sudah pasti. Ketiga syarat dimasukkan dalam satu parameter baris: \`for (inisialisasi; syarat; step)\`.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    for(int i = 0; i < 3; i++) {\n        printf("Cetak %d\\n", i);\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Cetak kata "Belajar" 3 kali menggunakan for loop\n    for(...) {\n        \n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    for(int i = 0; i < 3; i++) {\n        printf("Belajar\\n");\n    }\n    return 0;\n}`,
          hint: `Gunakan for(int i=0; i<3; i++) { printf("Belajar\\n"); }`,
          quiz: {
            question: `Format mana di bawah ini yang paling tepat untuk penulisan statement for-loop dalam bahasa C?`,
            options: [`for (i=0, i<5, i++)`, `for (int i=0; i<5; i++)`, `for i=1 to 5`, `foreach(int i in 5)`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Belajar\nBelajar\nBelajar\n`, description: `Mencetak string literal 3 kali.` }
          ],
          validationRules: [
            { pattern: `for\\s*\\(`, message: `Harus menggunakan syntax for.`, shouldExist: true }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// LEVEL 3: BAHASA C LANJUTAN (MODUL III)
// ============================================================
const cLevel3: Level = {
  id: 'c-level-3',
  title: 'ARRAY, STRUCT, DAN OPERASI FILE (C)',
  description: 'Penggunaan Array memori, penggabungan tipe Struct, dan cara program C memanipulasi File Text.',
  modules: [
    {
      id: 'c3-m1',
      title: 'Array',
      lessons: [
        {
          id: 'c3-l1',
          title: 'Array 1 Dimensi',
          explanation: `Struktur data untuk menyimpan sekumpulan variabel bertipe sama di dalam memori yang berurutan. Posisi elemen diakses menggunakan indeks bilangan bulat yang selalu dimulai dari 0.\n\nContoh Deklarasi: \`int nilai[5] = {10, 20, 30, 40, 50};\``,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int a[3] = {5, 10, 15};\n    printf("%d\\n", a[1]); // Cetak 10\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Deklarasikan array integer bernama 'arr' berisi angka 100, 200, 300\n    // Lalu cetak nilai ke-tiga dari arr (angka 300)\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int arr[3] = {100, 200, 300};\n    printf("%d\\n", arr[2]);\n    return 0;\n}`,
          hint: `Ingat indeks array dimulai dari 0. Elemen ketiga adalah arr[2].`,
          quiz: {
            question: `Indeks pertama dari suatu array pada bahasa C adalah?`,
            options: [`1`, `Null`, `0`, `Tidak ada batas`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `300\n`, description: `Menampilkan indeks elemen ketiga.` }
          ]
        }
      ]
    },
    {
      id: 'c3-m2',
      title: 'Struct',
      lessons: [
        {
          id: 'c3-l2',
          title: 'Dasar Penggunaan Struct',
          explanation: `Struktur data yang bisa menggabungkan beberapa variabel dengan tipe data yang berbeda-beda menjadi satu kesatuan (objek yang terkait). Elemen penyusun di dalam struct disebut "field".\n\nAkses nilai field dalam struct menggunakan operator titik (.).`,
          codeExample: `#include <stdio.h>\n\nstruct Data {\n    int id;\n    float score;\n};\n\nint main() {\n    struct Data d1;\n    d1.id = 1;\n    printf("ID: %d\\n", d1.id);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nstruct Mobil {\n    int tahun;\n};\n\nint main() {\n    // Buat objek Mobil bernama m1. Isi field tahun dengan 2024. Cetak.\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nstruct Mobil {\n    int tahun;\n};\n\nint main() {\n    struct Mobil m1;\n    m1.tahun = 2024;\n    printf("%d\\n", m1.tahun);\n    return 0;\n}`,
          hint: `Gunakan struct Mobil m1; m1.tahun = 2024;`,
          quiz: {
            question: `Operator apa yang digunakan untuk mengakses "field" di dalam variabel struct?`,
            options: [`->`, `::`, `.`, `&`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `2024\n`, description: `Menampilkan field tahun struct.` }
          ]
        }
      ]
    },
    {
      id: 'c3-m3',
      title: 'Operasi File (C)',
      lessons: [
        {
          id: 'c3-l3',
          title: 'Membaca dan Menulis File',
          explanation: `C dapat mengolah file menggunakan tipe penunjuk pointer memori: \`FILE *nama_pointer;\`.\nMode:\n- \`r\`: Baca (fail jika file tidak ada)\n- \`w\`: Tulis baru (delete semua isi sebelumnya)\n- \`a\`: Append / Tambah data di akhir.\n\nJangan lupa selalu panggil \`fclose()\` setelah file selesai digunakan.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("demo.txt", "w");\n    fprintf(f, "Belajar File");\n    fclose(f);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    printf("Penjelasan File. Simulasi IO pada C tergantung pada pointer FILE dan stdio.\\n");\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    printf("Penjelasan File. Simulasi IO pada C tergantung pada pointer FILE dan stdio.\\n");\n    return 0;\n}`,
          hint: `Pemahaman teori saja. Cukup jalankan program.`,
          quiz: {
            question: `Mode akses file mana di bawah ini yang digunakan untuk menulis file baru, dan jika file sudah ada maka isinya akan dihapus bersih (overwrite)?`,
            options: [`"a"`, `"r"`, `"w"`, `"w+"`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Penjelasan File. Simulasi IO pada C tergantung pada pointer FILE dan stdio.\n`, description: `Demonstrasi Teori File C.` }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// LEVEL 4: BAHASA PYTHON DASAR (MODUL IV)
// ============================================================
const pyLevel1: Level = {
  id: 'py-level-1',
  title: 'PENGENALAN DASAR BAHASA PYTHON',
  description: 'Pendahuluan Python, Variabel dinamis, tipe data dasar numerik dan string, operasi input output.',
  modules: [
    {
      id: 'py4-m1',
      title: 'Variabel dan Tipe Data',
      lessons: [
        {
          id: 'py4-l1',
          title: 'Dynamic Typing Python',
          explanation: `Python adalah bahasa tingkat tinggi yang sintaksnya sangat sederhana. Anda tidak perlu mendeklarasikan tipe data secara eksplisit (disebut *dynamic typing*). Python mengerti tipe datanya secara otomatis.\n\nTipe data dasar:\n- **Number**: Integer (bulat) dan Float (desimal seperti 3.14).\n- **String**: Teks (pakai kutip ganda/tunggal).\n- **Boolean**: Nilai logika (True dan False, awal pakai huruf kapital).`,
          codeExample: `angka = 10\nteks = "Halo"\nstatus = True\nprint(angka, teks)`,
          initialCode: `# Buat variabel x isinya angka 50\n# Buat variabel teks isinya "Python" \n# Print keduanya (print(x, teks))\n`,
          solution: `x = 50\nteks = "Python"\nprint(x, teks)`,
          hint: `Gunakan perintah variabel biasa tanpa embel int atau char di depannya.`,
          quiz: {
            question: `Manakah penulisan boolean True yang benar secara syntax di Python?`,
            options: [`true`, `TRUE`, `True`, `'True'`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `50 Python\n`, description: `Cetak dua variabel bebas` }
          ],
          validationRules: [
            { pattern: `x\\s*=`, message: `Definisikan x`, shouldExist: true },
            { pattern: `teks\\s*=`, message: `Definisikan teks`, shouldExist: true }
          ]
        },
        {
          id: 'py4-l2',
          title: 'Casting (Konversi Data)',
          explanation: `Tipe data dapat diubah paksa dengan fungsi bawaan seperti \`int()\`, \`float()\`, \`str()\`, \`bool()\`, \`chr()\`. Misalnya, jika Anda memiliki string '10', Anda butuh mengonversinya ke \`int()\` sebelum bisa dijumlahkan.`,
          codeExample: `s = "10"\nhasil = int(s) + 5\nprint(hasil) # mencetak 15`,
          initialCode: `angka_str = "25"\n# Konversikan angka_str ke integer menggunakan int()\n# Lalu cetak nilainya setelah ditambah 10\n`,
          solution: `angka_str = "25"\nprint(int(angka_str) + 10)`,
          hint: `Bungkus variabel dengan int() baru ditambah 10.`,
          quiz: {
            question: `Fungsi apa yang dipakai mengubah teks berupa angka menjadi bilangan bulat?`,
            options: [`float()`, `str()`, `num()`, `int()`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `35\n`, description: `Menjumlah string dengan angka melalui konversi` }
          ]
        }
      ]
    },
    {
      id: 'py4-m2',
      title: 'Operator Python',
      lessons: [
        {
          id: 'py4-l3',
          title: 'Operator Aritmatika & Logika',
          explanation: `Sedikit modifikasi dari C:\n\n- **Aritmatika:** Tambahan operator pemangkatan menggunakan bintang ganda \`**\` (contoh \`10**2\` = 10 pangkat 2).\n- **Logika:** Berbeda dengan C, Python menggunakan *teks* langsung seperti \`and\`, \`or\`, dan \`not\` untuk membandingkan.`,
          codeExample: `print(5 ** 2) # Pangkat\nprint(True and False) # Logika`,
          initialCode: `# Hitung 3 pangkat 4 menggunakan operator ** dan cetak\n`,
          solution: `print(3 ** 4)`,
          hint: `Gunakan operator dua bintang ** untuk perpangkatan!`,
          quiz: {
            question: `Apa syntax logika pengganti && (AND bahasa C) dalam bahasa Python?`,
            options: [`&&`, `&`, `and`, `And`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `81\n`, description: `Perpangkatan bilangan` }
          ]
        }
      ]
    },
    {
      id: 'py4-m3',
      title: 'Input / Output (I/O)',
      lessons: [
        {
          id: 'py4-l4',
          title: 'Penggunaan Fungsi Input()',
          explanation: `Seluruh data dari fungsi \`input()\` selalu bertipe STRING. Jika Anda meminta umur, variabel tersebut wajib dilempar ke \`int()\` agar bisa diolah. Untuk output, Anda bisa menggunakan koma atau metode canggih **f-string** (\`f"Teks {variabel}"\`).`,
          codeExample: `nama = "Rudi"\nprint(f"Halo nama saya {nama}")`,
          initialCode: `angka1 = "10"\nangka2 = "5"\n# Konversi ke dua variabel ini menjadi int lalu print penjumlahannya pakai f-string!\n`,
          solution: `angka1 = "10"\nangka2 = "5"\nprint(f"Hasilnya {int(angka1) + int(angka2)}")`,
          hint: `print(f"Hasilnya {int(angka1) + int(angka2)}")`,
          quiz: {
            question: `Tipe data yang dikembalikan secara mentah (default) oleh fungsi input() adalah?`,
            options: [`Tergantung isi input-nya`, `Integer`, `String`, `Float`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Hasilnya 15\n`, description: `Kombinasikan konversi pada F-string` }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// LEVEL 5: PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON (MODUL V)
// ============================================================
const pyLevel2: Level = {
  id: 'py-level-2',
  title: 'PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON',
  description: 'Aturan Sintaks Indentasi, blok kode fungsional if-elif-else, loop for range() dan while().',
  modules: [
    {
      id: 'py5-m1',
      title: 'Aturan Indentasi & Percabangan',
      lessons: [
        {
          id: 'py5-l1',
          title: 'If - Elif - Else (Indentasi Python)',
          explanation: `Python tidak memakai kurung kurawal \`{}\`. Semua struktur kontrol dibuka dengan titik dua \`:\` lalu baris berikutnya wajib menjorok (di-tab). Kesalahan spasi akan memicu **IndentationError**.\n\n\`elif\` adalah sintaks untuk "Else If" secara berurutan.`,
          codeExample: `nilai = 80\nif nilai > 70:\n    print("Lulus")\nelif nilai == 70:\n    print("Batas")\nelse:\n    print("Gagal")`,
          initialCode: `suhu = 40\n# Jika suhu lebih besar dari 30 cetak "Hot". Sisanya jika lebih 20 "Warm". Else cetak "Cold".\n`,
          solution: `suhu = 40\nif suhu > 30:\n    print("Hot")\nelif suhu > 20:\n    print("Warm")\nelse:\n    print("Cold")`,
          hint: `Gunakan bentuk blok if.. elif.. else lengkap dengan indentasi 4 spasi.`,
          quiz: {
            question: `Alih-alih kurung kurawal {}, Python menggunakan penanda apakah untuk membuat sebuah blok (kelompok) kode?`,
            options: [`Tanda tanya dan enter`, `Indentasi / Spasi`, `Kurung siku []`, `Keyword end`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Hot\n`, description: `Eksekusi Blok If Pertama. Menguji Else if` }
          ],
          validationRules: [
            { pattern: `elif`, message: `Gunakan elif, bukan else if`, shouldExist: true },
            { pattern: `:`, message: `Semua kondisi blok if dan elif wajib berakhiran titik dua :`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py5-m2',
      title: 'Perulangan di Python',
      lessons: [
        {
          id: 'py5-l2',
          title: 'For count loop (range)',
          explanation: `Digunakan untuk iterasi jika nilainya jelas. Disertai dengan instruksi \`range(start, stop, step)\`. Contoh \`range(5)\` artinya mulai 0 sampai elemen 4 (stop - 1).`,
          codeExample: `for i in range(3):\n    print(i)`,
          initialCode: `# Cetak "Hello" sebanyak 4 kali menggunakan for range\n`,
          solution: `for i in range(4):\n    print("Hello")`,
          hint: `Guna for i in range(4): lalu panggil blok print("Hello")`,
          quiz: {
            question: `Apakah parameter "stop" pada range(start, stop) ikut disertakan dalam iterasinya?`,
            options: [`Tidak, iterasi berhenti di angka sebelum "stop"`, `Ya, selalu disertakan`, `Tergantung step-nya`, `Hanya ikut di while loop`],
            correctAnswer: 0
          },
          testCases: [
            { expectedOutput: `Hello\nHello\nHello\nHello\n`, description: `Range berjalan sebanyak 4 loop.` }
          ]
        },
        {
          id: 'py5-l3',
          title: 'While loop',
          explanation: `Mengulang tanpa batas patokan angka selama nilai statemen tersebut True.\nWajib selipkan increment (seperti \`x += 1\`)! Jika lupa, program akan macet tanpa batas (*infinite loop*).`,
          codeExample: `x = 1\nwhile x <= 3:\n    print(x)\n    x += 1`,
          initialCode: `y = 1\n# Lakukan iterasi dari y <= 5. Jangan lupa y += 1\n# Cetak y per barisnya.\n`,
          solution: `y = 1\nwhile y <= 5:\n    print(y)\n    y += 1`,
          hint: `Set while y <= 5: lalu di dalam blok jangan lupakan y += 1.`,
          quiz: {
            question: `Apa resiko dari While Loop apabila kita lupa memberikan jeda/increment pada variabel pembatasnya?`,
            options: [`Aplikasi segera ditutup system otomatis`, `Loop tidak pernah berjalan`, `Loop berjalan satu kali`, `Infinite loop (macet tanpa henti)`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `1\n2\n3\n4\n5\n`, description: `While check berjalan dengan increment benar.` }
          ]
        }
      ]
    },
    {
      id: 'py5-m3',
      title: 'Pendeklarasian Fungsi (Def)',
      lessons: [
        {
          id: 'py5-l4',
          title: 'Membuat fungsi (def)',
          explanation: `Fungsi di Python dibentuk memakai kata kunci \`def\` (mirip fungsi statis pada C). Digunakan agar blok kode bisa dipakai berulang kali.\n\n\`\`\`python\ndef sapa(nama):\n    return f"Halo {nama}"\n\`\`\``,
          codeExample: `def kali(a,b):\n    return a*b\n\nprint(kali(5, 5))`,
          initialCode: `# Buat def panggil() yang cukup mencetak (print) "Hadir!"\n# Lalu eksekusilah fungsi tersebut (segera sesudah def).\n`,
          solution: `def panggil():\n    print("Hadir!")\n\npanggil()`,
          hint: `Sangat disarankan langsung di bawah def blok gunakan print dan return tidak perlu.`,
          quiz: {
            question: `Kata awalan pembuat function di python adalah?`,
            options: [`function`, `fn`, `def`, `void`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Hadir!\n`, description: `Coba jalankan panggil()` }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// LEVEL 6: PYTHON LANJUTAN (MODUL VI)
// ============================================================
const pyLevel3: Level = {
  id: 'py-level-3',
  title: 'LIST, DICTIONARY, DAN OPERASI FILE (PYTHON)',
  description: 'Belajar array kompleks di python bernama List, struktur pasangan Key-Value dari Dictionary, dan memanipulasi File sistem eksternal.',
  modules: [
    {
      id: 'py6-m1',
      title: 'List Python',
      lessons: [
        {
          id: 'py6-l1',
          title: 'Pengenalan dan Method List',
          explanation: `Tipe data untuk menyimpan kumpulan elemen berurutan (mirip Array C, tapi tipe isinya boleh campur - misal Angka dicampur String dalam satu list). Menggunakan \`[ ]\`.\n\nList ini **Mutable** (nilainya bisa dimanipulasi). Metodenya antara lain:\n- \`append()\` tambah ke belakang\n- \`insert(idx, isian)\` sisip ke titik iterasi\n- \`pop()\` membuang elemen terakhir dan mengembalikannya.`,
          codeExample: `data = [1, 2, "Tiga"]\ndata.append(4)\nprint(data[3]) # mencetak 4`,
          initialCode: `warna = ["Merah", "Kuning"]\n# Tambahkan "Hijau" menggunakan append \n# Cetak keseluruhan warna\n`,
          solution: `warna = ["Merah", "Kuning"]\nwarna.append("Hijau")\nprint(warna)`,
          hint: `warna.append("Hijau") merupakan kode pemanggil insert ekor list.`,
          quiz: {
            question: `Berbeda tajam dengan Array di C, karakteristik dasar elemen/isi parameter dari List Python adalah?`,
            options: [`Indeksnya dimulai otomatis dari angka 11`, `Ukurannya kaku dan fix tak bisa dirubah usai dibuat`, `Tipe datanya tidak perlu sama semua`, `Seluruh nilanya harus dari satu tipe class yang unik`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `['Merah', 'Kuning', 'Hijau']\n`, description: `Menghidupkan dan modifikasi append array` }
          ]
        }
      ]
    },
    {
      id: 'py6-m2',
      title: 'Dictionary Python',
      lessons: [
        {
          id: 'py6-l2',
          title: 'Key-Value Pairs (Dictionary)',
          explanation: `Menyimpan berpasangan Kunci (Key) dan Nilai (Value). Tidak menggunakan metode indeks berangka berurutan seperti array (list), melainkan mengambil data dengan menunjuk langsung Key-nya.\nDibuat dengan kurung kurawal \`{\`..\`}\`.\n\nContoh:\n\`user = {"nama" : "Andi", "umur" : 20}\`\n\nMethod:\n- \`.keys()\` untuk koleksi kuncinya (nama dan umur).\n- \`.values()\` untuk nilainya.`,
          codeExample: `buku = {"judul" : "Laskar Pelangi"}\nprint(buku["judul"])`,
          initialCode: `hewan = {"nama": "Kucing", "suara": "Meong"}\n# Akses dan cetak kunci (key) "suara" dari dictionary hewan\n`,
          solution: `hewan = {"nama": "Kucing", "suara": "Meong"}\nprint(hewan["suara"])`,
          hint: `Panggil melalui index teks berupa kunci namanya -> hewan["suara"]`,
          quiz: {
            question: `Simbol atau tanda yang membentuk mapping key : text didalam deklarasi syntax dasar Dictionary pada Python adalah?`,
            options: [`< >`, `( )`, `[ ]`, `{ }`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Meong\n`, description: `Merespon pemanggilan index text value kustom` }
          ]
        }
      ]
    },
    {
      id: 'py6-m3',
      title: 'Operasi Sistem File',
      lessons: [
        {
          id: 'py6-l3',
          title: 'With Open (Context Manager)',
          explanation: `Python jauh lebih efisien untuk open file dibanding C. C mewajibkan Anda \`fclose()\` di akhir agar memori tidak bocor.\n\nPython menggunakan blocks fungsional \`with open(..) as ..:\` yang otomatis menutup fungsi dirinya ketika semua indentasinya berakhir.\n\nMethod Read (Mengambil):\n- \`read()\` seluruh file menjadi 1 string raksasa\n- \`readlines()\` mengambil teks per baris yang dipisah jadi array array string per iterasi.`,
          codeExample: `# Karena ini simulasi web shell python, output ke terminal memanggil file sungguhan dilarang. \nprint("Teori: with open('file.txt', 'w') as f:")`,
          initialCode: `# Karena operasi file beneran dilarang di browser virtual environment ini, ketik saja "Mengerti!" via print\n`,
          solution: `print("Mengerti!")`,
          hint: `Cukup balas print()`,
          quiz: {
            question: `Fungsi ajaib pada Python yang bertugas otomatis me-realese penutupan file (close) meski tanpa memanggil metode f.close() jika baris kodenya sudah dilewati adalah?`,
            options: [`do and break`, `class()`, `with statement (context manager)`, `self closing boolean logic`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Mengerti!\n`, description: `Hanya sekedar tes keberadaan string simple.` }
          ]
        }
      ]
    }
  ]
};

export const curriculum: Level[] = [
  cLevel1,
  cLevel2,
  cLevel3,
  pyLevel1,
  pyLevel2,
  pyLevel3
];
