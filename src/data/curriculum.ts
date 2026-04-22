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
  description: 'Mempelajari struktur penulisan program C, tipe data dasar, deklarasi variabel, fungsi input/output, dan operator.',
  modules: [
    {
      id: 'c1-m1',
      title: 'Struktur dan Deklarasi',
      lessons: [
        {
          id: 'c1-l1',
          title: 'Struktur Penulisan Program Bahasa C',
          explanation: `Struktur dasar C dibagi menjadi dua bagian utama:\n\n1. **Bagian \`#include\`:** Berfungsi mengimpor fungsi dari *header file*. Contohnya \`<stdio.h>\` untuk deklarasi fungsi dasar \`printf()\` dan \`scanf()\`. \n2. **Bagian \`int main()\`:** Fungsi utama yang dieksekusi pertama kali. Di dalamnya berisi *statement* yang dikelompokkan dengan tanda \`{}\`.\n\nSetiap perintah wajib diakhiri titik koma (\`;\`). Perintah \`return 0;\` digunakan untuk menutup fungsi utama sekaligus mengakhiri program.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    printf("Halo, C!\\n");\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Tulis print "Selamat Datang di C!" di bawah\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    printf("Selamat Datang di C!\\n");\n    return 0;\n}`,
          hint: `Gunakan printf("Selamat Datang di C!\\n"); lalu pastikan ada tanda titik koma.`,
          quiz: {
            question: `Apakah fungsi utama yang dieksekusi pertama kali saat program C berjalan?`,
            options: [`#include`, `int main()`, `return 0`, `printf()`],
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
          explanation: `Variabel adalah penampung data yang nilainya dapat berubah-ubah. Formatnya: \`Tipe_data Nama_variabel = <nilai>\`.\n\nAda 6 tipe data dasar dalam C:\n*   **char:** Karakter (Format: %c) atau String (Format: %s).\n*   **int:** Bilangan bulat (Format: %i atau %d).\n*   **float:** Bilangan pecahan (Format: %f).\n*   **double:** Bilangan pecahan kompleks (Format: %lf).\n*   **void:** Untyped, tidak menyimpan/mengembalikan nilai.\n*   **bool:** True/False (1 atau 0).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int skor = 100;\n    float pi = 3.14;\n    printf("Skor: %d, Pi: %.2f\\n", skor, pi);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Buat variabel integer bernama 'harga' bernilai 5000\n    \n    // Tampilkan variabel harga menggunakan printf\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int harga = 5000;\n    printf("Harga: %d\\n", harga);\n    return 0;\n}`,
          hint: `Definisikan 'int harga = 5000;' lalu cetak dengan format '%d'`,
          quiz: {
            question: `Penentu format apa yang digunakan untuk menampilkan bilangan pecahan (float)?`,
            options: [`%d`, `%c`, `%f`, `%s`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Harga: 5000\n`, description: `Mencetak nilai variabel integer.` }
          ]
        }
      ]
    },
    {
      id: 'c1-m2',
      title: 'Fungsi Input dan Output',
      lessons: [
        {
          id: 'c1-l3',
          title: 'Menerima dan Menampilkan Data',
          explanation: `**Mengambil Input (\`scanf\`):**\nMembaca input terformat. Sangat penting: Berikan panduan kepada pengguna menggunakan \`printf\` sebelum meminta input. Variabel penampung di dalam \`scanf\` wajib didahului operator alamat \`&\`.\n\n**Menampilkan Data (\`printf\` / \`puts\`):**\n\`printf()\` menampilkan teks tanpa enter otomatis. \`puts()\` menampilkan string dan otomatis menambahkan baris baru di akhir.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int umur;\n    printf("Masukkan umur Anda: ");\n    scanf("%d", &umur);\n    printf("Umur Anda adalah %d tahun.\\n", umur);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int tahun;\n    // 1. Tampilkan perintah ke user: "Masukkan tahun lahir: " (tanpa newline)\n    \n    \n    // 2. Lakukan scanf untuk menerima input %d ke dalam variabel &tahun\n    \n    \n    // 3. Tampilkan hasilnya: "Tahun lahir: [variabel]\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int tahun;\n    printf("Masukkan tahun lahir: ");\n    scanf("%d", &tahun);\n    printf("Tahun lahir: %d\\n", tahun);\n    return 0;\n}`,
          hint: `printf("Masukkan tahun lahir: "); lalu scanf("%d", &tahun); lalu printf("Tahun lahir: %d\\n", tahun);`,
          quiz: {
            question: `Operator apa yang HARUS mendahului nama variabel angka saat ditaruh di dalam fungsi scanf()?`,
            options: [`#`, `%`, `&`, `*`],
            correctAnswer: 2
          },
          testCases: [
            { input: `1998`, expectedOutput: `Masukkan tahun lahir: Tahun lahir: 1998\n`, description: `Memvalidasi input respon dari scanf.` }
          ],
          validationRules: [
            { pattern: `scanf`, message: `Gunakan fungsi scanf() untuk membaca input!`, shouldExist: true },
            { pattern: `&tahun`, message: `Kamu lupa menaruh simbol alamat '&' pada variabel tahun di scanf!`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c1-m3',
      title: 'Operator pada C',
      lessons: [
        {
          id: 'c1-l4',
          title: 'Operator Aritmatika & Unary',
          explanation: `**Operator Aritmatika:** Perkalian (\`*\`), Pembagian (\`/\`), Modulo/sisa bagi (\`%\`), Penambahan (\`+\`), Pengurangan (\`-\`).\n\n**Operator Unary:** Beroperasi pada satu variabel.\n- \`A++\` (Post-increment): Nilai diproses/ditampilkan dulu, baru ditambah 1.\n- \`++A\` (Pre-increment): Ditambah 1 dulu, baru diproses/ditampilkan.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int a = 5;\n    printf("Aritmatika (10 %% 3): %d\\n", 10 % 3);\n    printf("Post-increment: %d\\n", a++); // Akan cetak 5, lalu a menjadi 6\n    printf("Pre-increment: %d\\n", ++a);  // a menjadi 7, lalu dicetak 7\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // 1. Buat variabel x bernilai 15\n    \n    // 2. Tampilkan sisa bagi dari x dibagi 4 secara langsung di printf (x % 4)\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int x = 15;\n    printf("%d\\n", x % 4);\n    return 0;\n}`,
          hint: `Deklarasi int x = 15; lalu printf("%d\\n", x % 4);`,
          quiz: {
            question: `Apa perbedaan utama antara A++ dan ++A?`,
            options: [`A++ menambah nilai 2, ++A menambah 1.`, `Tidak ada yang beda, keduanya persis sama.`, `A++ dipakai di C, ++A dipakai di C++.`, `A++ (diproses dulu baru ditambah), ++A (ditambah dulu baru diproses).`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `3\n`, description: `Menghitung modulo` }
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
  description: 'Mempelajari kontrol alur program: Percabangan (If, Switch), Perulangan (While, For), dan Peloncatan.',
  modules: [
    {
      id: 'c2-m1',
      title: 'Percabangan',
      lessons: [
        {
          id: 'c2-l1',
          title: 'Struktur If, Else If, Else',
          explanation: `Percabangan mengevaluasi sebuah kondisi (true/false).\n\n- \`if\`: Jika syarat terpenuhi, cabang dijalankan.\n- \`if - else\`: Jika \`if\` salah, otomatis menjalankan perintah \`else\`.\n- \`if - else if\`: Memiliki lebih dari dua kondisi. Jika satu kondisi di atas terpenuhi, sisa kondisi di bawahnya akan diabaikan.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int nilai = 80;\n    if (nilai >= 90) {\n        printf("A\\n");\n    } else if (nilai >= 70) {\n        printf("B\\n");\n    } else {\n        printf("C\\n");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int skor = 65;\n    // Susun if-else if. \n    // Jika skor >= 80, cetak "Lulus".\n    // Jika skor >= 50, cetak "Remedial".\n    // Selain itu cetak "Gagal".\n\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int skor = 65;\n    if (skor >= 80) {\n        printf("Lulus\\n");\n    } else if (skor >= 50) {\n        printf("Remedial\\n");\n    } else {\n        printf("Gagal\\n");\n    }\n    return 0;\n}`,
          hint: `Gunakan if () {}, else if () {}, dan else {}.`,
          quiz: {
            question: `Pada struktur "if - else if", apa yang terjadi jika kondisi if (pertama) sudah bernilai BENAR?`,
            options: [`Program akan crash`, `Kondisi di bawahnya ("else if") tetap diekstekusi`, `Kondisi di bawahnya otomatis diabaikan (dilewati)`, `Program keluar paksa dari main`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Remedial\n`, description: `Menyeleksi kondisi Else-if.` }
          ],
          validationRules: [
            { pattern: `else if`, message: `Gunakan blok else if untuk kondisi kedua.`, shouldExist: true }
          ]
        },
        {
          id: 'c2-l2',
          title: 'Switch - Case',
          explanation: `Switch Case lebih efektif untuk memeriksa variabel terhadap banyak pilihan nilai secara langsung (tanpa rentang `<` atau `>`).\n\nWajib memakai:\n1. \`case nilai:\`\n2. \`break;\` agar program tidak kebablasan menjalankan perintah di bawahnya.\n3. \`default:\` bertindak sebagai *else* ketika tidak ada case yang cocok.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int menu = 2;\n    switch(menu) {\n        case 1:\n            printf("Menu 1\\n");\n            break;\n        case 2:\n            printf("Menu 2\\n");\n            break;\n        default:\n            printf("Menu Tidak Valid\\n");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int kode = 3;\n    // Buat switch(kode).\n    // case 1: cetak "Laptop", break;\n    // case 3: cetak "Tablet", break;\n    // default: cetak "Aksesoris"\n\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int kode = 3;\n    switch(kode) {\n        case 1:\n            printf("Laptop\\n");\n            break;\n        case 3:\n            printf("Tablet\\n");\n            break;\n        default:\n            printf("Aksesoris\\n");\n    }\n    return 0;\n}`,
          hint: `Strukturnya switch(kode) { case 1: ... break; case 3: ... break; default: ... }`,
          quiz: {
            question: `Perintah apa yang digunakan untuk memaksa keluar dari sekumpulan "case" agar perintah di opsi case bawahnya tidak ikut dijalankan?`,
            options: [`stop;`, `break;`, `exit 0;`, `continue;`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Tablet\n`, description: `Memvalidasi eksekusi blok case ke-3` }
          ],
          validationRules: [
            { pattern: `break;`, message: `Jangan lupa titik koma (;)! setelah instruksi break`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-m2',
      title: 'Perulangan dan Peloncatan',
      lessons: [
        {
          id: 'c2-l3',
          title: 'Looping: For, While, Do-While',
          explanation: `**Syarat Looping:** Inisialisasi, Kondisi (Syarat henti), Step (+/-).\n\n- **While**: Kondisi diperiksa di awal. Jika dari awal sudah Salah, tidak pernah jalan.\n- **Do-While**: Kondisi di akhir. Program jalan minimal SATU kali.\n- **For**: Deklarasi praktis 1 baris. Rumus: \`for (inisialisasi; syarat; step)\`.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    for(int i = 1; i <= 3; i++) {\n        printf("Cetak: %d\\n", i);\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Cetak kata "Halo" sebanyak 3 kali menggunakan for loop (dari 0 hingga < 3)\n    for(int i = 0; i < 3; i++) {\n        \n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    for(int i = 0; i < 3; i++) {\n        printf("Halo\\n");\n    }\n    return 0;\n}`,
          hint: `Letakkan printf("Halo\\n"); di dalam blok kurung kurawal for.`,
          quiz: {
            question: `Jenis perulangan manakah yang dijamin akan tereksekusi MINIMAL 1 KALI meskipun syaratnya sudah False sejak awal?`,
            options: [`for loop`, `do - while`, `while`, `semua perulangan dijamin jalan`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Halo\nHalo\nHalo\n`, description: `Loop iterasi dasar` }
          ]
        },
        {
          id: 'c2-l4',
          title: 'Peloncatan: Break & Continue',
          explanation: `Memaksa program memindahkan arah eksekusinya.\n\n- **break**: Menghentikan PAKSA seluruh iterasi (membuat keluar sepenuhnya dari blok perulangan di detik itu juga).\n- **continue**: Menghentikan iterasi yang sedang berjalan *saat itu saja*, lalu MELOMPAT kembali ke atas untuk melanjutkan proses iterasi putaran berikutnya.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=5; i++) {\n        if(i == 3) continue; // Langsung lompat ke iterasi ke-4\n        if(i == 5) break;    // Stop total perulangan\n        printf("%d\\n", i);\n    }\n    // Output: 1 2 4\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=3; i++) {\n        // Jika i sama dengan 2, lakukan continue;\n        \n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=3; i++) {\n        if(i == 2) continue;\n        printf("%d\\n", i);\n    }\n    return 0;\n}`,
          hint: `Tambahkan if (i == 2) continue; di atas baris printf.`,
          quiz: {
            question: `Perintah apa yang menghentikan SATU putaran iterasi yang sedang berjalan, namun tetap melanjutkan putaran iterasi di angka berikutnya?`,
            options: [`goto`, `break`, `continue`, `#include`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `1\n3\n`, description: `Melewati angka 2 menggunakan fitur continue.` }
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
  description: 'Penguasaan struktur data Array, tipe memori gabungan Struct, dan tata cara baca-tulis dokumen File Text pada sistem komputer.',
  modules: [
    {
      id: 'c3-m1',
      title: 'Tipe Data Terstruktur',
      lessons: [
        {
          id: 'c3-l1',
          title: 'Array (List Berurutan)',
          explanation: `Array menyimpan banyak sekumpulan variabel bertipe sama. Indeks di memori selalu dimulai dari 0.\n\nC mewajibkan String diimplementasikan secara statis sebagai Array karakter. Karakter tersebut selalu diakhiri \`\\0\` (null) sebagai penanda akhir batas sebuah String.\n\nDeklarasi 1 Dimensi (Kolom): \`int nilai[panjang]\`\nDeklarasi 2 Dimensi (Baris Kolom): \`int matriks[baris][kolom]\``,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int nilai[4] = {10, 20, 30, 40};\n    printf("Elemen pertama: %d\\n", nilai[0]);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int a[3] = {500, 600, 700};\n    // Tampilkan elemen TERAKHIR dari array a\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int a[3] = {500, 600, 700};\n    printf("%d\\n", a[2]);\n    return 0;\n}`,
          hint: `Elemen terakhir dari array 3 items adalah indeks [2]. Gunakan printf.`,
          quiz: {
            question: `Apa tanda khusus penutup di dalam array tipe data character yang membuktikan bahwa itu adalah string text bahasa C?`,
            options: [`\\s`, `\\n`, `\\0 (Null Terminated)`, `\\ EOF`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `700\n`, description: `Memanggil indeks paling tinggi.` }
          ]
        },
        {
          id: 'c3-l2',
          title: 'Struct (Objek Gabungan)',
          explanation: `Berbeda dengan Array yang harus setipe, Struct menggabungkan tipe data *berbeda-beda* (misalnya 1 integer, 1 float, 1 string) ke dalam satu wadah kesatuan objek.\n\nElemen-elemen di dalamnya disebut sebagai **field**, yang diakses dengan format operator titik (\`.\`). \nContoh: \`variabel_struct.nama_field\`.`,
          codeExample: `#include <stdio.h>\n\nstruct Pegawai {\n    int id;\n    float gaji;\n};\n\nint main() {\n    struct Pegawai p1;\n    p1.id = 101;\n    p1.gaji = 5500.50;\n    printf("Pegawai %d gajinya %.2f\\n", p1.id, p1.gaji);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nstruct Produk {\n    int stok;\n};\n\nint main() {\n    // 1. Deklarasikan variabel 'p' dengan tipe 'struct Produk'\n    \n    // 2. Isi data p.stok = 50\n    \n    // 3. Tampilkan p.stok\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    struct Produk p;\n    p.stok = 50;\n    printf("%d\\n", p.stok);\n    return 0;\n}`,
          hint: `struct Produk p; p.stok = 50; printf("%d\\n", p.stok);`,
          quiz: {
            question: `Simbol apakah yang menghubungkan nama variabel struct untuk dapat mengambil properti / field datanya di dalam memori?`,
            options: [`Tanda Titik (.)`, `Panah (->)`, `Tanda Plus (+)`, `Titik Dua (:)`],
            correctAnswer: 0
          },
          testCases: [
            { expectedOutput: `50\n`, description: `Akses elemen property suatu class struct` }
          ]
        }
      ]
    },
    {
      id: 'c3-m2',
      title: 'Interaksi File Eksternal',
      lessons: [
        {
          id: 'c3-l3',
          title: 'Operasi File',
          explanation: `File diaktifkan melalui objek memori pointer: \`FILE *\`.\nFungsi utamanya \`fopen("nama", "mode")\`.\n\n**Mode Penting:**\n- \`"r"\`: Membaca.\n- \`"w"\`: Membuat/menulis file baru (yang lama terhapus / overwrite murni).\n- \`"a"\`: Append. Tambah isi text ke bagian paling bawah file tanpa menghapus teks aslinya.\n\nWajib: Tutup file di akhir memori Anda menggunakan \`fclose(pointer);\`.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("test.txt", "w");\n    fputs("Hello World\\n", f);\n    fclose(f);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Kita simulasikan penambahan sebuah kalimat (Mode Append)\n    FILE *file = fopen("log.txt", "a"); // Menggunakan parameter a\n    if (file != NULL) {\n        // fputs("Berhasil melakukan append text.\\n", file);\n        printf("Simulator: Proses file fputs berhasil.\\n");\n        fclose(file);\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    FILE *file = fopen("log.txt", "a");\n    if (file != NULL) {\n        printf("Simulator: Proses file fputs berhasil.\\n");\n        fclose(file);\n    }\n    return 0;\n}`,
          hint: `Batalkan/buka comment di baris kode tersebut untuk lulus uji logika file.`,
          quiz: {
            question: `Apa parameter mode yang kita wajib sematkan pada fopen() jika niat kita ingin menambahkan kata di belakang file tanpa melenyapkan tulisan file terdahulunya?`,
            options: [`"r"`, `"x"`, `"a"`, `"w+"`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Simulator: Proses file fputs berhasil.\n`, description: `Tes demonstrasi teori block struct tanpa file fisik beneran` }
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
  description: 'Pengenalan Python, Variabel, Tipe Data otomatis, dan fungsi input-output murni interaktif.',
  modules: [
    {
      id: 'py4-m1',
      title: 'Dasar dan Casting Python',
      lessons: [
        {
          id: 'py4-l1',
          title: 'Pendahuluan dan Variabel Dinamis',
          explanation: `Python dirancang untuk kemudahan dan sintaks lebih ringkas daripada C.\n**Dynamic Typing:** Tipe data tidak perlu secara tertulis diawali (seperti tidak butuh \`int X\`). Python bisa berubah isi otomatis. Cukup tulis: \`nama = "Python"\`.\n\nTipe utamanya:\n- **Number**: Integer & Float\n- **String**: Kutip ganda ("..") tunggal ('..') atau tiga (\"\"\"...\"\"\") buat banyak baris.\n- **Boolean**: Kapital True dan False.`,
          codeExample: `angka = 100\nteks = "Bahasa Python"\nprint(angka)\nprint(teks)`,
          initialCode: `# Buat variabel bahasa dengan nama "Python"\n# Buat variabel rilis bertipe boolean True \n# Print menggunakan print(bahasa, rilis)\n`,
          solution: `bahasa = "Python"\nrilis = True\nprint(bahasa, rilis)`,
          hint: `bahasa = "Python" lalu print(bahasa, rilis)`,
          quiz: {
            question: `Python tidak butuh perintah bertuliskan float, boolean, int di awal pembuatannya, fitur pintar ini di Python sering dikenal sebagai apa?`,
            options: [`Magic Syntax`, `Dynamic Typing`, `Static Compiling`, `Auto Generate Object`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Python True\n`, description: `Test eksekusi dua dynamic arguments.` }
          ],
          validationRules: [
            { pattern: `True`, message: `Dalam python, boolean True wajib memiliki huruf pangkal T besar (kapital)`, shouldExist: true }
          ]
        },
        {
          id: 'py4-l2',
          title: 'Cepat Paham Casting (Konversi)',
          explanation: `Python menebak angka di dalam input dan text string.\nJika ingin menjumlah \`"10"\` dan \`2\`, kita butuh Cast paksa.\n\nFungsi bawaan pengganti:\n- \`int()\`: Jadikan bulat\n- \`float()\`: Jadikan desimal pecahan point\n- \`str()\`: Jadikan teks string\n- \`bool()\`: Logic check.`,
          codeExample: `angka_teks = "50"\nangka_asli = int(angka_teks)\nprint(angka_asli + 10) # Mencetak 60`,
          initialCode: `bobot = "75"\n# Lakukan konversi int() ke bobot dan kurangi - 5!\n# print(...) hasilnya.\n`,
          solution: `bobot = "75"\nprint(int(bobot) - 5)`,
          hint: `print(int(bobot) - 5)`,
          quiz: {
            question: `Untuk mengonversikan input text ke basis desimal presisi pecahan, kita menerapkan fungsi mana?`,
            options: [`long()`, `int()`, `float()`, `str()`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `70\n`, description: `Print string yang dihitung secara matematikal konversi integer.` }
          ]
        }
      ]
    },
    {
      id: 'py4-m2',
      title: 'Operator & Input-Output Python',
      lessons: [
        {
          id: 'py4-l3',
          title: 'Operator Spesial',
          explanation: `Walau banyak mirip C, perhatikan perbedaan krusial:\n- Aritmatika pemangkatan ditulis \`**\` (contoh: \`10 ** 2\`).\n- Pembanding logika di-Alfabetiskan: Bukan pakai (\`&&\`, \`||\`, \`!\`), tetapi harus pakai bahasa inggris murni: **\`and\`**, **\`or\`**, **\`not\`**.`,
          codeExample: `print(3 ** 3) # pangkat 3 dari 3, hasilnya 27\nprint(True and False)`,
          initialCode: `# Operator Python!\n# Cetak langsung hasil dari 5 pangkat 2 pakai operator **\n`,
          solution: `print(5 ** 2)`,
          hint: `Perintah simpel 1 baris print(5 ** 2)`,
          quiz: {
            question: `Operator pengganti nilai seru ! (Not) di bahasa C saat dipindahkan logikanya ke Python ditulis sebagai teks?`,
            options: [`not`, `nought`, `No`, `False`],
            correctAnswer: 0
          },
          testCases: [
            { expectedOutput: `25\n`, description: `Test hitung 5 ** 2` }
          ]
        },
        {
          id: 'py4-l4',
          title: 'Fungsi Input() dan F-Strings Output',
          explanation: `**Mengambil Input (\`input()\`):**\nDapat memuat instruksi teks panduan secara langsung di dalam kurung. Contoh: \`input("Masukkan nama: ")\`. Penting diingat: Output dari fungsi \`input()\` selalu bertipe **String**.\n\n**Data F-String:**\nPenggabungan kalimat memanggil variabel di tengah teks dengan prefix \`f\`, contoh \`f"Luas: {variabel}"\`.`,
          codeExample: `nama = input("Siapa nama kamu? ")\nprint(f"Oke, selamat pagi {nama}")`,
          initialCode: `# 1. Buat input("Masukkan tahun: ") lalu letakkan / kemas mentah nilainya via konversi int() ke variabel tahun.\n# (Simulasi CLI kami menaruh autotyped bot "2024" sebagai input)\n\n# 2. Print kalimat "Tahun input adalah {tahun}" menggunakan F-string format.\n`,
          solution: `tahun = int(input("Masukkan tahun: "))\nprint(f"Tahun input adalah {tahun}")`,
          hint: `tahun = int(input("Masukkan tahun: "))\nprint(f"Tahun input adalah {tahun}")`,
          quiz: {
            question: `Apakah output data jenis pengembalian dasar *default* yang dilontarkan dari fungsi input() pada Python?`,
            options: [`Sesuai yang user ketik, bisa Float/Int otomatis.`, `Satu Array`, `Selalu Boolean`, `Selalu menjadi tipe String`],
            correctAnswer: 3
          },
          testCases: [
            { input: `2030`, expectedOutput: `Masukkan tahun: Tahun input adalah 2030\n`, description: `Baca input 2030 ke template CLI format dan diprint konversi-nya` }
          ],
          validationRules: [
            { pattern: `input\\(`, message: `Mohon buat fungsi user input!`, shouldExist: true },
            { pattern: `f["'].*\\{.*\\}.*["']`, message: `Ayo pakai struktur f-string f"" modern Python untuk output-nya.`, shouldExist: true }
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
  description: 'Python Control Flow Statement: Indentasi Blok, if-elif-else, iterasi range dan def custom functions.',
  modules: [
    {
      id: 'py5-m1',
      title: 'Pola Sintaks & Blok Percabangan',
      lessons: [
        {
          id: 'py5-l1',
          title: 'Aturan Terpadu: Titik Dua (:) & Tab Spasi',
          explanation: `Python **membuang** sistem Kurung Kurawal \`{}\` standar. Semua kondisi dimulai dengan Titik Dua (\`:\`) dan isi kepunyaannya bergeser 1 buah INDENTASI (Tab/4 spasi). Jaraknya harus lurus. Kesalahan urutan Spasi = Fatal Crash (IndentationError).\n\nIf memiliki 3 skema:\n- \`if\`: Blok percabangan sederhana.\n- \`elif\`: (Singkatan dari Else-If). Pengecekan berkelanjutan.\n- \`else\`: Sisa alternatif jika if dan semua elif tertolak.`,
          codeExample: `nilai = 80\nif nilai > 90:\n    print("A")\nelif nilai > 70:\n    print("B")\nelse:\n    print("C")`,
          initialCode: `angka = 10\n# Susun kondisinya:\n# Jika angka > 15 cetak "Besar"\n# Elif angka > 5 cetak "Sedang"\n# Else cetak "Kecil"\n`,
          solution: `angka = 10\nif angka > 15:\n    print("Besar")\nelif angka > 5:\n    print("Sedang")\nelse:\n    print("Kecil")`,
          hint: `Pastikan ada tab indentsi (geser kanan) di depan setiap kata print! Serta setiap elif pakai :`,
          quiz: {
            question: `Kata penyambung antara if dan else (Else if) untuk skenario pengujian 3 rute di persingkat di python sebagai syntax apa?`,
            options: [`else if`, `elseif`, `elif`, `if2`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Sedang\n`, description: `Test percabangan tengah pada Elif karena nilai asli = 10.` }
          ]
        }
      ]
    },
    {
      id: 'py5-m2',
      title: 'Tipe Perulangan',
      lessons: [
        {
          id: 'py5-l2',
          title: 'For-Loop bersama Range()',
          explanation: `Python \`for\` sering digunakan dengan fungsi generator \`in range(start, stop, step)\`. Di mana iterasi bekerja dan dijamin akan **berhenti** persis sebelum menyentuh batasan nilai indeks \`stop\`.`,
          codeExample: `for i in range(2):\n    print("Halo") # Mencetak Halo Sebanyak 0 dan 1 (Total 2x)`,
          initialCode: `# Buat blok iterasi for loop yang mutlak akan berjalan memanggil range sejumlah 3 Loop.\n# Di tiap blok, taruh instruksi print("Ulang")\n`,
          solution: `for i in range(3):\n    print("Ulang")`,
          hint: `Ketik for i in range(3): lalu didalamnya print("Ulang")`,
          quiz: {
            question: `Misalkan kita mengklaim sintaks 'range(0, 5)'. Pada hitungan berapakah secara teoritis putaran iterasi ini berhenti mendadak?`,
            options: [`Tepat saat nilai ke 5 termunculkan bersamaan di console`, `Pada langkah ke 6 karena 0 dihitung extra`, `Terhenti (stop) sebelum angka 5 tersentuh instruksinya.`, `Itu adalah infinite iterasi`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Ulang\nUlang\nUlang\n`, description: `Tes 3x perulangan.` }
          ]
        },
        {
          id: 'py5-l3',
          title: 'While Loop Resiko Macet',
          explanation: `While sangat fleksibel tetapi juga riskan (*uncounted loop*). Berjalan selama argument True. Python Mewajibkan programmer merakit manual perintah penambahan increment statemen (\`x += 1\`) di dasar blok While-nya. Lupa naroh? Infinite loop!`,
          codeExample: `x = 1\nwhile x <= 3:\n    print(x)\n    x += 1`,
          initialCode: `y = 1\n# Lakukan iterasi while asalkan y <= 2.\n# Beri perintah print(y)\n# Jangan lupakan step maju incrementnya (y += 1).\n`,
          solution: `y = 1\nwhile y <= 2:\n    print(y)\n    y += 1`,
          hint: `while y <= 2: print(y); y += 1 (pastikan y+=1 masuk ke dlm blok)`,
          quiz: {
            question: `Apakah akibat paling wajar dari kegagalan / kelalaian programmer men-setting skrip increment didalam satu blok statemen while?`,
            options: [`File menjadi 10x Lipat Ukurannya`, `Browser me-restart sendiri`, `Program berjalan tanpa batasan henti (infinite loops) dan lag.`, `Nothing.. sistem bisa berinteraksi adaptif perbaiki bug`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `1\n2\n`, description: `While check berjalan dengan increment benar.` }
          ]
        }
      ]
    },
    {
      id: 'py5-m3',
      title: 'Fungsi Custom',
      lessons: [
        {
          id: 'py5-l4',
          title: 'Deklarasi Fungsi (Def)',
          explanation: `Di Python, fungsi dideklarasikan dengan \`def nama_fungsi(parameter):\` beserta blok ber-indentasi. Boleh diakhiri \`return\` untuk pelemparan output value.\nCocok untuk modularisasi blok kode mandiri.`,
          codeExample: `def salam():\n    print("Selamat Pagi")\nsalam() # Cara memanggil`,
          initialCode: `# 1. Buat suatu blok deklarasi def panggil() yang didalamnya mencetak string "Hadir!".\n# 2. Segera jalankan (panggil) instruksinya dibagian line luarnya di bawah.\n`,
          solution: `def panggil():\n    print("Hadir!")\n\npanggil()`,
          hint: `Minta def panggil(): isinya print lalu eksekusi dari root level.`,
          quiz: {
            question: `Berbeda dari bahasa "Static-Type" yang menggunakan jenis penamaan variabelnya dalam membuat fungsi/kelas. Python sekadar mewajibkan awalan pembuka pendek. Apakah teks tersebut?`,
            options: [`func`, `void`, `call`, `def`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Hadir!\n`, description: `Jalankan Def via interpreter.` }
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
  description: 'Python Lanjutan: Menguasai array multi-type via iterasi List [], pemetaan Key-Value Dictionary {}, berserta operasi tulis file canggih.',
  modules: [
    {
      id: 'py6-m1',
      title: 'List (Array Cerdas Python)',
      lessons: [
        {
          id: 'py6-l1',
          title: 'Sifat Mutable List Python',
          explanation: `List Python (ditandakan siku \`[ ]\`) bersifat luar biasa *Mutable*. Angka dan huruf string bisa dicampur aduk dalam 1 keranjang memori. \nFungsi bawaan sakti Python List:\n- \`append()\`: Simpan paksa di posisi belakang data\n- \`insert(i, item)\`: Sisip elemen berdasar urutan baris id `i`.\n- \`pop()\`: Cabut satu elemen sisa terakhir dari ujung nya.\n- \`sort()\` / \`reverse()\`: Rombak susun balik data massalnya.`,
          codeExample: `data = [99, "Sapi", True]\ndata.append(100)\nprint(data[3]) # mencetak 100 baru`,
          initialCode: `angka = [1, 2, 3]\n# Eksekusilah method append untuk menaruh nilai Integer angka 4 ke dalam list angka tersebut.\n# Lalu terakhir Cetak list nya menggunakan print (untuk dicek log mesin kami).\n`,
          solution: `angka = [1, 2, 3]\nangka.append(4)\nprint(angka)`,
          hint: `Minta pakai append(4) saja ke variabel.`,
          quiz: {
            question: `Salah satu keunggulan luar biasa karakteristik list Python berbanding memori tipe struct-array C kuno adalah?`,
            options: [`List python memakan lebih banyak size disk per value nya.`, `List python mutlak terbatas 10 element.`, `List python sanggup dicampur berbagai tipe variabel dalam satu variabel (Heterogen Data).`, `Data List python tidak di index 0`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `[1, 2, 3, 4]\n`, description: `Pastikan Output array terkonfigurasi masuk angka di pantauan Console` }
          ]
        }
      ]
    },
    {
      id: 'py6-m2',
      title: 'Dictionary',
      lessons: [
        {
          id: 'py6-l2',
          title: 'Dictionary Mode Key-Value',
          explanation: `Menyimpan data memori dengan pasangan Kunci + Nilai (Mirip format tabel data JSON). Anda tidak menaruh query ke urutan Index 0, 1, atau seterusnya. Melainkan pakai penamaan *"Kunci"* parameter yang didampinginya.\nDibuat dengan kurung kurawal \`{\`..\`}\` berisi pemisah \`:\`.\n\nContoh: \`profil = {"nama" : "Andi"}\``,
          codeExample: `motor = {"merek" : "Honda", "cc": 150}\nprint(motor["cc"]) # Memanggil value si Key CC`,
          initialCode: `murid = {"id" : "12B", "tingkat" : "SMA"}\n# Tugas singkat: Beri perintah print untuk mengambil output data khusus kunci atribut "tingkat" dari dict itu.\n`,
          solution: `murid = {"id": "12B", "tingkat": "SMA"}\nprint(murid["tingkat"])`,
          hint: `Panggil saja index namanya: print(murid["tingkat"])`,
          quiz: {
            question: `Melihat arsitektur Python dictionary (Key:Value), Fungsi perintah method statik apa yang diketik jika Anda menginginkan pengembalian nilai khusus terhadap data Kunci parameternya saja untuk di loop massal?`,
            options: [`.keys()`, `.json()`, `.hash()`, `.query()`],
            correctAnswer: 0
          },
          testCases: [
            { expectedOutput: `SMA\n`, description: `Menilai apakah peserta mengakses index identifier custom yang tepat pada array` }
          ]
        }
      ]
    },
    {
      id: 'py6-m3',
      title: 'Berkas dan Sistem File Output',
      lessons: [
        {
          id: 'py6-l3',
          title: 'Membaca serta Mengedit Modifikasi Berkas via Context Managers',
          explanation: `File eksternal (contoh: format `.txt`) di Python dieksekusi efisien (mengindari error memori leak akibat lupa f.close()) bila dipadukan sintaks blok pelindung \`with open(..) as ..:\`\n\n**Mode Edit Existing File (Menambahkan):**\nGunakan parameter mode \`"a"\` (Append - Tidak menggangu data asli tapi memasukkan deret baris di posisi teks terdalam per kursor terakhir) atau \`"r+"\` (Baca dan Overwrite).\n\`write(teks)\` dipakai untuk menembakan memori.\n\nContoh edit di file lokal:\n\`\`\`python\nwith open("data.txt", "a") as f:\n    f.write("Tambahan ke arsip.\\n")\n\`\`\``,
          codeExample: `with open("log.txt", "a") as config:\n    config.write("Admin Login Succes!\\n")\nprint("Selesai")`,
          initialCode: `# Simulasikan block context "with open" mode Append "a" yang memanipulasi file db.txt.\n# Simpan 1 baris string "Data_Baru\\n" ke dalam handle alias f menggunakan f.write().\n# Terakhir tutup block indent dan cetak "Done".\n`,
          solution: `with open("db.txt", "a") as f:\n    f.write("Data_Baru\\n")\nprint("Done")`,
          hint: `Pakai mode "a"(append) untuk memastikan format script txt lama terjaga dari deletion saat edit data.`,
          quiz: {
            question: `Mengapa block indent "with open()" disebut paling aman dan ideal dibanding format legacy Open file memori biasa dan dinilai sangat canggih?`,
            options: [`Membuat size file lebih compress`, `Menutup file (file pointer closure) terselesaikan otomatis jika instruksinya exit dari blok indent tersebut.`, `Tidak perlu permission read storage OS`, `Hanya bisa jalan di Unix OS`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Done\n`, description: `Mencetak indikator block success` }
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
