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
          explanation: `Struktur dasar C dibagi menjadi dua bagian utama:\n\n1. **Bagian \`#include\`:** Berfungsi mengimpor fungsi dari *header file*. Contohnya \`<stdio.h>\` untuk deklarasi fungsi dasar \`printf()\` dan \`scanf()\`. Kita juga bisa membuat header sendiri menggunakan penulisan \`#include "namafile.h"\`.\n2. **Bagian \`int main()\`:** Fungsi utama yang dieksekusi pertama kali. Di dalamnya berisi *statement* yang dikelompokkan dengan tanda \`{}\`.\n\nSetiap perintah wajib diakhiri titik koma (\`;\`). Perintah \`return 0;\` digunakan untuk menutup fungsi utama sekaligus mengakhiri program. Tanpa \`;\`, kode akan memicu Syntax Error.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    printf("Halo, C!\\n"); // Fungsi mencetak\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Tulis print "Selamat Datang di C!" di bawah\n    // Ingatlah untuk selalu menggunakan \\n saat ingin berpindah baris di akhir teks\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    printf("Selamat Datang di C!\\n");\n    return 0;\n}`,
          hint: `Ketik secara persis: printf("Selamat Datang di C!\\n"); lalu pastikan ada tanda titik koma.`,
          quiz: {
            question: `Apakah fungsi utama yang wajib dieksekusi pertama kali saat program C berjalan?`,
            options: [`#include`, `int main()`, `return 0`, `printf()`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Selamat Datang di C!\n`, description: `Menampilkan teks awalan` }
          ],
          validationRules: [
            { pattern: `printf`, message: `Gunakan printf secara persis`, shouldExist: true },
            { pattern: `;`, message: `Jangan lupa titik koma (;)! C bukan Python.`, shouldExist: true }
          ]
        },
        {
          id: 'c1-l2',
          title: 'Tipe Data dan Variabel',
          explanation: `Variabel adalah penampung data yang nilainya dapat berubah-ubah. C mewajibkan penentuan tipe datanya terlebih dahulu! Formatnya: \`Tipe_data Nama_variabel = <nilai>;\`.\n\nAda 6 tipe data dasar dalam C:\n*   **char:** Karakter (Format penentu print: \`%c\`) atau String (Format: \`%s\`). Range -128 s/d 127.\n*   **int:** Bilangan bulat. Format: \`%i\` atau \`%d\`.\n*   **float:** Bilangan pecahan. Format: \`%f\`. Untuk mengatur tampilannya bisa menggunakan format \`%m.nf\` dimana 'n' adalah jumlah digit di belakang koma (misal: \`%.2f\`).\n*   **double:** Pecahan kompleks panjang. Format: \`%lf\`.\n*   **void:** Untyped.\n*   **bool:** True/False (1 atau 0).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int skor = 100;\n    float pi = 3.14159;\n    printf("Skor: %d, Pi: %.2f\\n", skor, pi); // Menampikan float dengan 2 desimal saja\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Buat variabel integer bernama 'harga' dan LANGSUNG berikan nilai awal (inisialisasi) yaitu 5000\n    \n    // Tampilkan variabel harga menggunakan printf dengan format "Harga barang: [nilai_variabel]\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int harga = 5000;\n    printf("Harga barang: %d\\n", harga);\n    return 0;\n}`,
          hint: `Definisikan 'int harga = 5000;' lalu cetak memakai printf("Harga barang: %d\\n", harga);`,
          quiz: {
            question: `Jika Anda memiliki variabel float temperatur = 36.5678, Penentu (Specifier) format manakah yang paling pas didalam printf agar output yang tampil membulat HANYA "36.57" di layar?`,
            options: [`%d`, `%.1f`, `%.2f`, `%lf`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Harga barang: 5000\n`, description: `Mencetak nilai variabel integer menggunakan %d / %i.` }
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
          explanation: `**Mengambil Input (\`scanf\`):**\nSangat penting! Sebelum meminta data, kita wajib menyiapkan variabel penampungnya dan \`memberikannya angka awal/inisialisasi nol\` untuk menghindari "Garbage Memory". Variabel di dalam \`scanf\` wajib memakai operator alamat memori \`&\`.\nContoh: \`int umur = 0; scanf("%d", &umur);\`\nCatatan: Dua scanf bertipe String yang berurutan sangat rentan bentrok dan butuh fungsi \`getchar()\` untuk membuang karakter Enter.\\n\n**Menampilkan Data (\`printf\` / \`puts\` / \`putchar\`):**\n\`printf()\` menampilkan teks tanpa enter otomatis. \`puts()\` khusus string dan otomatis enter di akhir.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int umur = 0; // Berikan nilai awal (Inisialisasi)\n    printf("Masukkan umur Anda: ");\n    scanf("%d", &umur); // Gunakan & sebelum umur!\n    printf("Umur Anda adalah %d tahun.\\n", umur);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // 1. Deklarasikan variabel int tahun, lalu SET nilainya ke 0 (Inisialisasi awal)\n    \n    // 2. Tampilkan perintah ke user secara persis: "Masukkan tahun lahir: " (tanpa newline)\n    \n    // 3. Panggil fungsi scanf() untuk menerima input format %d dan simpan ke dalam alamat memori variabel tahun\n    \n    // 4. Secara paksa tampilkan respons persis: "Tahun lahir: [nilai]\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int tahun = 0;\n    printf("Masukkan tahun lahir: ");\n    scanf("%d", &tahun);\n    printf("Tahun lahir: %d\\n", tahun);\n    return 0;\n}`,
          hint: `Langkah: int tahun = 0; > printf("Masukkan tahun lahir: "); > scanf("%d", &tahun); > printf("Tahun lahir: %d\\n", tahun);`,
          quiz: {
            question: `Pada saat kita menerima dua buah isian tipe STRING karakter secara berturut-turut melalui scanf di bahasa C, program seringkali error/melewati pertanyaan kedua. Fungsi spesifik apakah yang perlu diselipkan di tengah-tengah dua scanf tersebut untuk membuang karakter enter?`,
            options: [`puts()`, `system("pause")`, `getchar()`, `break()`],
            correctAnswer: 2
          },
          testCases: [
            { input: `1998`, expectedOutput: `Masukkan tahun lahir: Tahun lahir: 1998\n`, description: `Memvalidasi input respon text dan format angka scanf.` }
          ],
          validationRules: [
            { pattern: `int\\s+tahun\\s*=\\s*0`, message: `Anda LUPA memberikan Inisialisasi! Berikan nilai 0 pada variabel terlebih dahulu sebelum melakukan scanf!`, shouldExist: true },
            { pattern: `scanf`, message: `Gunakan fungsi scanf() untuk membaca input!`, shouldExist: true },
            { pattern: `&tahun`, message: `Kamu lupa menaruh simbol alamat '&' pada variabel tahun di dalam scanf!`, shouldExist: true }
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
          title: 'Operator Aritmatika & Unary',
          explanation: `**Operator Aritmatika:** Perkalian (\`*\`), Pembagian (\`/\`), Sisa Bagi / Modulo (\`%\`), Penambahan (\`+\`), Pengurangan (\`-\`).\n\n**Operator Unary:** Beroperasi tajam pada satu variabel saja.\n- \`A++\` (Post-increment): Nilainya diproses dulu / dikeluarkan di layar secara utuh, BARU ditambahkan 1 di memori.\n- \`++A\` (Pre-increment): Ditambahkan 1 di memori dahulu, siapapun yang panggil ini akan mendapatkan versi update barunya.\n- \`!A\` : Not (Berbalik logic).\n- \`&A\` : Alamat Memori.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int a = 5;\n    printf("Sisa bagi 10 %% 3: %d\\n", 10 % 3);\n    printf("Post-increment A: %d\\n", a++); // Akan cetak 5, lalu a berubah jadi 6 di memori\n    printf("Pre-increment A: %d\\n", ++a);  // memori a diupdate jadi 7, lalu dicetak 7 ke layar\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int x = 15;\n    // Hitung secara langsung (tanpa memakai variabel pembantu!)\n    // nilai dari x yang dimoduluskan/dicari sisa baginya terhadap 4.\n    // Gunakan printf dengan format format %d diikuti \\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int x = 15;\n    printf("%d\\n", x % 4);\n    return 0;\n}`,
          hint: `Deklarasi int x = 15; sudah ada. Kamu cukup menuliskan perintah pencetakan printf("%d\\n", x % 4);`,
          quiz: {
            question: `Bila "int num = 10". Pada perintah "printf('%d', num++);", angka berapa yang justru akan benar-benar tercetak muncul di layar console?`,
            options: [`11`, `9`, `10`, `Terjadi Error / Syntax Exception`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `3\n`, description: `Menghitung modulo/sisa pembagian dengan tepat pada console.` }
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
  description: 'Mempelajari kontrol alur program seperti pengambilan keputusan komputasi terbatas If-Else, maupun perulangan besar dengan Do-While.',
  modules: [
    {
      id: 'c2-m1',
      title: 'Percabangan',
      lessons: [
        {
          id: 'c2-l1',
          title: 'Struktur If, Else If, Else',
          explanation: `Percabangan adalah syarat khusus yang mengevaluasi kondisi. \n- \`if\`: Percabangan tunggal. Jika syarat (true) masuk, jika (false) ia tidak melakukan apa-apa dan terus ke rute berikutnya.\n- \`if - else\`: Jika \`if\` salah, otomatis lari mengeksekusi blok \`else\` sebagai pembuangan akhir tanpa batasan kondisi.\n- \`if - else if\`: Memiliki lebih dari 2 logika paralel dan diperiksa otomatis berurutan lurus dari atas. Jika ada 1 kondisi tercapai, hirarki di bawahnya diboikot/diabaikan.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int skor = 0;\n    printf("Masukkan skormu: ");\n    scanf("%d", &skor);\n    \n    if (skor >= 90) {\n        printf("Nilai: A\\n");\n    } else if (skor >= 70) {\n        printf("Nilai: B\\n");\n    } else {\n        printf("Nilai: C\\n");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int skor = 65;\n    \n    // Tulis struktur if-else if-else di sini.\n    // Jika nilai skor >= 80, printf "Lulus\\n" secara rapi.\n    // Jika skor ternyata >= 50, tetapi masih di rentang tengah, printf "Remedial\\n"\n    // Jika lolos dari semua kondisi atas, printf "Gagal\\n"\n\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int skor = 65;\n    if (skor >= 80) {\n        printf("Lulus\\n");\n    } else if (skor >= 50) {\n        printf("Remedial\\n");\n    } else {\n        printf("Gagal\\n");\n    }\n    return 0;\n}`,
          hint: `Logika C tidak menyulitkan. Susun saja urut -> if (skor >= 80) { bloknya } else if (skor >= 50) { bloknya } else { bloknya }`,
          quiz: {
            question: `Di dalam suatu program struktur if - else if panjang berderet. Apa yang akan sistem eksekusi sekiranya program mendeteksi bahwa pengecekan 'if' (kondisi poin kesatu paling puncak) ternyata sudah langsung bernilai TRUE/BENAR?`,
            options: [`Program langsung crash / Error Timeout`, `Pengecekan di rute bawahnya akan tetap dijalankan satu per satu demi validasi ganda`, `Blok lain (else if dan else bagian bawahnya) mutlak diabaikan dan ter-skip dengan sendirinya`, `Program keluar paksa (Exit Process Code 0)`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Remedial\n`, description: `Menilai ketepatan validasi logika percabangan bercabang kompleks` }
          ],
          validationRules: [
            { pattern: `else if`, message: `Gunakan blok 'else if' sebagai opsi tengah evaluasi lanjutan.`, shouldExist: true }
          ]
        },
        {
          id: 'c2-l2',
          title: 'Seleksi Menu: Switch - Case',
          explanation: `Switch Case merupakan opsi percabangan yang *sangat efisien dan cepat* ketimbang if, khususnya jika kita menangani ratusan banyak pilihan nilai secara langsung (misal list karakter atau index angka). Ia tidak bisa menangani rentang syarat komparator seperti '<' atau '>'.\n\nStrukturnya bertumpu pada 3 kata sakti:\n1. 'case nilai:' untuk membuat check poin.\n2. 'break;' agar program terpotong dan tidak *kebablasan* menjalankan instruksi case milik orang di bawahnya!\n3. 'default:' bertindak identik bagaikan *else* akhir jika tiada case satupun yang cocok/True.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int menu = 2;\n    switch(menu) {\n        case 1:\n            printf("Memesan Kopi\\n");\n            break; // Wajib break agar case 2 di bawahnya tidak ikut nyala!\n        case 2:\n            printf("Memesan Teh\\n");\n            break;\n        default:\n            printf("Menu Tidak Valid\\n");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int kode = 3;\n    \n    // Buat statement blok switch(kode).\n    // case 1: bertugas cetak "Laptop\\n", jangan lupakan break;\n    // case 3: bertugas cetak "Tablet\\n", beri break;\n    // default: bertugas mencetak teguran "Aksesoris\\n"\n\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int kode = 3;\n    switch(kode) {\n        case 1:\n            printf("Laptop\\n");\n            break;\n        case 3:\n            printf("Tablet\\n");\n            break;\n        default:\n            printf("Aksesoris\\n");\n    }\n    return 0;\n}`,
          hint: `switch(kode) { case 1: ... break; case 3: ... break; default: ... }`,
          quiz: {
            question: `Apakah fungsi dari penulisan statemen instruksi \`break;\` disetiap pengakhiran satu blok kode 'case'?`,
            options: [`Memperlambat memory clock limit processor`, `Keluar paksa dan menghentikan seluruh aplikasi windows`, `Membatalkan Switch dan meloncat keluar darinya agar blok case yang ada di bawahnya tidak ikut berjalan tak diundang`, `Menutup console interface`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Tablet\n`, description: `Menilai apakah switch menangkap identifikasi konstanta indeks 3 yang tepat.` }
          ],
          validationRules: [
            { pattern: `break;`, message: `Perhatian pada semicolon. Kamu kurang menambahkan perintah mutlak 'break;'`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'c2-m2',
      title: 'Perulangan dan Peloncatan Blok',
      lessons: [
        {
          id: 'c2-l3',
          title: 'Looping Bebas: While & Do-While',
          explanation: `Dalam perulangan (Iterasi Loop) setidaknya harus punya: Inisialisasi Angka Awal, Kondisi Evaluasi Henti, dan instruksi Kenaikan/Penurunan Step nilainya (\`++\` Murni).\n\n- **While**: Kondisi diperiksa ketat di **PUNCAK AWAL**. Jika di iterasi awal sudah menghasilkan (False) / Salah, blok di dalamnya **haram berjalan, tidak akan pernah dieksekusi sekalipun**.\n- **Do-While**: Kondisi dievaluasi pelan di **AKHIR**. Sebagai kompensasinya, maka Program di dalam \`do\` akan Dijalankan **minimal SATU Kali** secara paksa (walau logika kondisinya sudah rusak sejak awal!).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int x = 1;\n    while(x <= 3) {\n        printf("Tahap iterasi: %d\\n", x);\n        x++; // Jangan hilangkan increment ini atau program CRASH infinite Loop.\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int iterasi = 1;\n    \n    // Terapkan statement do.. while() untuk iterasi.\n    // Cetak dan lompati baris tulisan "Angka: [iterasi]\\n"  tiap putaran.\n    // Ingatlah menambahkan step kenaikannya.\n    // Kondisi pengecekan berada di bawah dengan rumus syarat iterasi berada < (kurang dari) 3.\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int iterasi = 1;\n    do {\n        printf("Angka: %d\\n", iterasi);\n        iterasi++;\n    } while(iterasi < 3);\n    return 0;\n}`,
          hint: `do { printf("Angka: %d\\n", iterasi); iterasi++; } while (iterasi < 3);`,
          quiz: {
            question: `Sebuah looping menggunakan struktur \`Do-While\` dengan kondisi nilai syarat yang langsung bertuliskan \`while (0)\` (False konstan). Berapa banyak skrip di blok \`Do\` itu akan tetap diproses layar?`,
            options: [`Nol Kali. Program menolak dari awal.`, `Error Crash karena tidak valid.`, `Mutlak akan dieksekusi minimal Satu Kali (1).`, `Infinite Loop hingga memory limit`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Angka: 1\nAngka: 2\n`, description: `Menilai kinerja simulasi loop mundur yang dibakukan pada sintaks do-while` }
          ]
        },
        {
          id: 'c2-l4',
          title: 'For-Loop & Manuver Break/Continue',
          explanation: `**Perulangan For**\nSangat dirancang untuk iterasi panjang dan banyak yang jumlah batasannya sudah mutlak pasti dipahami. Format gabungan praktis C: \`for (inisialisasi; syarat_kondisi; pergerakan_step)\`.\n\n**Perintah Peloncat (Lompatan Gahar)**\nPemrogram dituntut terkadang mensabotase iterasi di sebuah *state* loop.\n- **break**: Murni menghancurkan loop, perintah ini melompat keluar memberhentikan paksa **seluruh iterasi tersisa** secara penuh.\n- **continue**: Lebih licik, perintah logis ini membatalkan **1 buah iterasi detik itu saja** sedemikian ia melompat keatas lagi skip ke hitungan selanjutnya (mengacuhkan file di bawahnya).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=5; i++) {\n        if(i == 3) continue; // Langsung lompat ke atas untuk iterasi no-4, maka angka 3 terlewati (tidak dicetak)!\n        if(i == 5) break;    // Menghabisi iterasi total, angka 5 tidak pernah dieksekusi loop bawahnya.\n        printf("%d ", i);\n    }\n    // Hasil Print: 1 2 4 \n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Bikin For loop iterasi naik dari 1 sampai dengan nilai pas lurus 3 (inclusive <= 3).\n    for(int i=1; i<=3; i++) {\n        // SELIPKAN sebuah blok logic. \n        // Jika i mendeteksi di angka 2 persis, beri manipulasi continue; agar ia terskip!\n        \n        printf("Nomor %d\\n", i);\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    for(int i=1; i<=3; i++) {\n        if(i == 2) continue;\n        printf("Nomor %d\\n", i);\n    }\n    return 0;\n}`,
          hint: `Tambahkan blok sejuk: if(i == 2) continue; tepat sebelum syntax pencetakan (printf).`,
          quiz: {
            question: `Syntax manakah di alam C yang fungsinya murni menghentikan serta memblokir SELURUH rentetan perulangan Loop bersisa di detik itu juga?`,
            options: [`goto default;`, `break;`, `continue;`, `#include`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Nomor 1\nNomor 3\n`, description: `Memvalidasi manipulasi skip iterasi` }
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
  description: 'Penyusunan arsitektur Array indeks berantai ganda, pengikatan tipe properti pada Struct object, hingga mode simulasi Stream File.',
  modules: [
    {
      id: 'c3-m1',
      title: 'Struktur Data Seragam',
      lessons: [
        {
          id: 'c3-l1',
          title: 'Array Multidimensi',
          explanation: `Array memblokade dan menyimpan himpunan sekumpulan memori variabel bertipe data sama di lokasi yang saling bertetangga. Array selalu diakses berdasarkan kompas bilangan pemandu berurut yang konstan dihitung selalu sedari Index 0.\n\nDalam C (tidak seperti Python modern), sebuah variasi teks Text String sebetulnya hanyalah ilusi dari 'Array tipe Karakter'. Dan harus selalu memiliki terminator ajaib berwujud '\\0' (null parameter mark) di akhir elemen array agar mesin compiler C tahu "Ooh, disini pangkal string teks nya stop!".\n\nBentuk Deklarasi:\nArray biasa (Kolom 1 dimensi): 'int poin[panjang]'\nArray matriks (Papan Catur/Baris&Kolom): 'int grid[baris][kolom]'`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int skor_tim[4] = {100, 200, 300, 400};\n    printf("Elemen ke-2 (Indeks 1) adalah: %d\\n", skor_tim[1]);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Program memanipulasi akses blok list terbatas\n    int kumpulan[3] = {500, 600, 700};\n    // Tantangan: Akses dan panggil elemen barisan index TERAKHIR dari limitasi array tersebut, cetak angkanya (%d) plus \\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int kumpulan[3] = {500, 600, 700};\n    printf("%d\\n", kumpulan[2]);\n    return 0;\n}`,
          hint: `Karena slot array berjumlah 3, maka index maksimal yang absah hanyalah: 0, 1, dan 2. Maka panggil angka array pada index [2].`,
          quiz: {
            question: `Apakah karakter 'Escape Boundary Marker' rahasia bahasa C yang posisinya selalu wajib ditanam mesin di barisan belakang sendiri pada sebuah array of characters sehingga ia baru sah dan lolos dipanggil sebagai 'String'?`,
            options: [`\\s`, `\\n`, `\\0 (Null Terkunci)`, `Tidak ada penanda`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `700\n`, description: `Menilai kalkulasi tebakan hitungan dimensi index programmer` }
          ],
          validationRules: [
            { pattern: `\\[2\\]`, message: `Index terakhir untuk Array Limit=3 pastilah memanggil '[2]'. Perbaiki.`, shouldExist: true }
          ]
        },
        {
          id: 'c3-l2',
          title: 'Structs (Wadah Objek C)',
          explanation: `Sementara Array cacat karena cuma satu setipe data konstan di sekujur memori. **Struct** hadir sebagai kebalikan Array. Ia wadah mutakhir merangkul sekaligus pengelompokan puluhan tipe yang bisa berbeda-beda identitasnya sekalian (misal dalam sebongkah class ini ada float IPK, ada int Umur, serta string Nama di satu variabel induk tunggal).\n\nKomponen penyusun (Anakan) pada struct dinamakan **field**. Masing-masing field hanya sah bila diekstrak memakai alat potong syntax operator berupa karakter titik (\`.\`). \nFormat interaksi misal: \`variabel_tujuan.nama_field = 100\`.`,
          codeExample: `#include <stdio.h>\n\n// Mendefinisikan 'cetakan/blueprint' utama diluar Main()\nstruct DatabasePegawai {\n    int id_karyawan;\n    float nominal_gaji;\n};\n\nint main() {\n    struct DatabasePegawai peg_01; // Mewariskan / Instansiasi Variabel Objek ke peg_01\n    peg_01.id_karyawan = 10;\n    peg_01.nominal_gaji = 5.500;\n    \n    printf("Peg Gaji=%.3f\\n", peg_01.nominal_gaji);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nstruct DataProduk {\n    int kuantitas_stok;\n};\n\nint main() {\n    // 1. Instansiasi variabel penampung baru 'box_satu' yang mewarisi class cetakan tipe 'struct DataProduk'.\n    \n    // 2. Akses field-nya, oper/suntik nilai 50 ke kuantitas_stok pada box_satu tersebut.\n    \n    // 3. Tampilkan p.stok memanfaatkan perintah format print bilangan integer.\\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    struct DataProduk box_satu;\n    box_satu.kuantitas_stok = 50;\n    printf("%d\\n", box_satu.kuantitas_stok);\n    return 0;\n}`,
          hint: `Strukturnya -> struct DataProduk box_satu; -> box_satu.kuantitas_stok = 50; -> printf("%d\\n", box_satu.kuantitas_stok);`,
          quiz: {
            question: `Operator tunggal nan sakti yang menavigasi compiler ke dalam ruang arsitektur variabel untuk mengakses "field attributes" di dalam class Struct adalah operator ...?`,
            options: [`Spasi/Space`, `Tanda Titik (.)`, `Tanda Panah (->)`, `Tanda Dollar ($)`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `50\n`, description: `Menilai perlakuan Object Binding Property Struct` }
          ]
        }
      ]
    },
    {
      id: 'c3-m2',
      title: 'Interaksi Berkas Input/Output Eksternal',
      lessons: [
        {
          id: 'c3-l3',
          title: 'Simulasi Sistem Open File (Mode Append)',
          explanation: `Dalam operasional serius, C memanipulasi file (txt, log) lewat pointer file sakelar khusus bernotasi asteris ('FILE *'). \nCara bukaan pakemnya adalah 'fopen("NamaFile", "ModePermisi");'.\n\n**Parameter Modes Hak Akses Penting:**\n- '"r"': Read-Only (Aman). Membaca file. Bakal fatal error jika target direksinya fiktif.\n- '"w"': Write Mode. Mode sadis! Menulis di file kosong ATAU membabat mereset bersih SEMUA isi file lama menjadi 0 bits jika file tersebut exist agar Anda bisa override dominan.\n- '"a"': Append Mode (Penempel Teks). Tambah ekstra tulisan log tanpa melenyapkan/mengoverwrite teks terdahulu.\n\n**Wajib Mutlak Praktik Terbaik:** Tutup keran koneksi memory-loss dengan memanggil 'fclose(pointer);'.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *log = fopen("test.txt", "w");\n    fputs("Hello File Server\\n", log);\n    fclose(log);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Lakukan simulasi pemanggilan function Append.\n    FILE *f_server = fopen("config.txt", "a"); // Catatan: "a" dipakai agar tidak menabrak overwrite (w).\n    \n    if (f_server != NULL) {\n        // Kita seolah mencetak fputs("Berhasil Modif File.\\n", f_server);\n        // Karena alasan proxy server keamanan eksekusi script ini, cukup print teks persis seperti baris di atas!\n        printf("Simulator: Sukses mengedit tanpa overwriting.\\n");\n        fclose(f_server);\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    FILE *f_server = fopen("config.txt", "a");\n    if (f_server != NULL) {\n        printf("Simulator: Sukses mengedit tanpa overwriting.\\n");\n        fclose(f_server);\n    }\n    return 0;\n}`,
          hint: `Murni perhatikan teks string kembalian console printf-nya saja agar lolos verifikasi blok.`,
          quiz: {
            question: `Apakah paramater Mode penulisan (write format access) di fopen yang paling krusial sewaktu *requirement* OS mengharuskan kita MENGEDIT/MENAMBAHKAN teks string ke file system TANPA PERNAH menggantikan/mereset baris asalnya ke 0 lagi?`,
            options: [`"update"`, `"w"`, `"r+"`, `"a" (Append Mode)`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Simulator: Sukses mengedit tanpa overwriting.\n`, description: `Output string dummy simulator operasi sistem file non-destructive` }
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
  description: 'Revolusi sintaks. Pemahaman Variabel Dynamic, deteksi otomatis Tipe Data, konversi Casting paksa angka string, formating f-string, dsb.',
  modules: [
    {
      id: 'py4-m1',
      title: 'Dasar Bebas Python',
      lessons: [
        {
          id: 'py4-l1',
          title: 'Pendahuluan Singkat & Variabel Typeless',
          explanation: `Python lahir menantang bahasa purba sebagai bahasa tingkat tinggi paling ringkas kodenya dan "pemaaf." Python mendukung OOP, prosedur dan fungsional.\n\n**Dynamic Typing Gila:** Tipe data tak butuh deklarasi tertulis baku (Bye \`int\` atau \`char\`!) Sistem interperter nebak nilai otomatis ketika variable dipanggil isian \`nama = "Python"\` saat runtime.\n\nType Dasar Esensial:\n- **Number**: Digabung yakni Integer & Float desimal.\n- **String**: Teks panjang. Bisa dikurung kutip tunggal (\`'..\`), ganda (\`"..\`) atau triple (\`""".."""\`) jika isinya memuncak multi-line / banyak enter!\n- **Boolean**: Saklar kebenaran mutlak. Diawali huruf awal *Sangat Besar (Kapital)*, yaitu: \`True\` & \`False\`.`,
          codeExample: `skor_maksimal = 100\njejak_rekaman = "Pemain Top 1"\naktivitas = True\nprint(skor_maksimal, jejak_rekaman, aktivitas)`,
          initialCode: `# Buat variabel bahasa, injeksikan nama string "Python"\n# Buat variabel engine, atur tipe valuenya ke logis boolean True \n# Cetak beriringan keduanya: print(bahasa, engine)\n`,
          solution: `bahasa = "Python"\nengine = True\nprint(bahasa, engine)`,
          hint: `Selalu pastikan memakai awalan T besar untuk boolean True di mesin Python.`,
          quiz: {
            question: `Tidak seperti C dkk, Python tidak mewajibkan programmer mencantumkan keyword bertuliskan semacam int, float, dan char di depan deklarasi nama variabelnya. Kemampuan sihir nebak tipe otomatis ini dipanggil dengan istilah teknis...?`,
            options: [`Magical Code Syntax`, `Dynamic Typing`, `Static Compiling Execution`, `Auto Variable Predictor AI`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Python True\n`, description: `Test eksekusi dua arguments variable dynamis Python console interperter` }
          ],
          validationRules: [
            { pattern: `True`, message: `Dalam python, boolean True/False mutlak mensyaratkan awal huruf karakter Kapital.`, shouldExist: true }
          ]
        },
        {
          id: 'py4-l2',
          title: 'Seni Type Casting (Konversi Paksa)',
          explanation: `Kerap kali Python butuh kepatuhan logis saat mencampuradukkan format matematis kalkulasi tipe antar string ke operasi integer matematis.\nJika Anda nekat "menambah" tipe string angka \`"10"\` dan int \`2\`, Python bingung mau menyatukan atau menambah. Anda wajib mengeksekusi Cast (Konversi Paksa) tipe yang beda ini terlebih dulu.\n\nFunction Kastanya:\n- \`int()\`: Jebak data jadi bulat.\n- \`float()\`: Pecahan desimal.\n- \`str()\`: Jadi teks biasa melinting variable.\n- \`bool()\`: Balikkin Nilai Truthy.\n- \`chr()\`: Konfigurasi ASCII char table.`,
          codeExample: `angket_angka = "5000"\nnilai_riil = int(angket_angka)\nprint(nilai_riil + 500) # Kalkulasi bersih keluar 5500`,
          initialCode: `kalori_kue = "350"\n# Instruksi: Konversi string kalori_kue dibungkus param int()\n# lalu langsung hitung dikurangi 50, \n# cetak via print() output matematikanya.\n`,
          solution: `kalori_kue = "350"\nprint(int(kalori_kue) - 50)`,
          hint: `Minta jalankan konversi: print(int(kalori_kue) - 50)`,
          quiz: {
            question: `Jika hasil dari sebuah variabel string yang kita baca adalah text seperti tulisan "12000.55". Jika mau murni menjadikannya di-kalkulasi operasi matematis kalkulator diskon, sintaksis yang aman merangkulnya kita sebut dengan bungkus param...?`,
            options: [`long()`, `str()`, `float()`, `int()`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `300\n`, description: `Menilai apakah hasil casting berjalan di operasi string-based math` }
          ],
          validationRules: [
            { pattern: `int\\(.*\\)`, message: `Variabel teks tak mungkin lurus dikurangkan, wajib int(kalori_kue)!`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py4-m2',
      title: 'Dinamika Ekspresi Input Output (I/O)',
      lessons: [
        {
          id: 'py4-l3',
          title: 'Operator Spesifik nan Moderen',
          explanation: `Sembari berpedoman format standar matematika C, Python rombak total dan punya operator berkelas dan bersih:\n- Pemangkatan Aritmatikal ditulis \`**\` ganda. (cth: \`5 ** 3\` berarti lima pangkat 3 hitungannya 125).\n- Operator Logis Komparasi membuang notasi robotik (\`&&\`, \`||\`, \`!\`) dari bahasa C!\n- Python menerjemahkannya murni di bahasa inggris mentah nan puitis: **\`and\`**, **\`or\`**, **\`not\`**.`,
          codeExample: `print(2 ** 4) # Eksekusi dua Pangkat Empat hasilnya adalah 16\n# Contoh Operator English Logic:\nprint(True and False) # Hasil False utuh`,
          initialCode: `# Operator Unik Python Practice!\n# Cetak langsung hasil bersih eksekusi nilai kalkulator dari 6 pangkat 2 pakai operator bintang dobel.\n`,
          solution: `print(6 ** 2)`,
          hint: `Rumuskan matematika 6 ** 2`,
          quiz: {
            question: `Secara khusus, simbol apakah yang menduplikasi (merepresentasikan) logic NOT ! Negasi (membalik logis) di bahasa struktural saat difungsikan dalam alam logika Python modern?`,
            options: [`nO`, `False`, `not`, `!` ],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `36\n`, description: `Validasi perkalian pemangkatan logis ganda` }
          ]
        },
        {
          id: 'py4-l4',
          title: 'Sihir input() Interaktif dan f-String Format',
          explanation: `**Mengambil Interaktif CLI via \`input()\`:**\nSistem \`input()\` Python mampu memuat instruksi teks pesan / kalimat string panduan prompt SECARA LANSGUNG di dalam kurungan tanpa butuh perbantuan \`printf\` ekstra.\nContoh ideal pemakaian: \`input("Minta nama bosku: ")\`.\nSatu peringatan absolut: Output serapan semua teks masuknya **mutlak bertipe 'STRING' murni** sekalipun pemakai ketik angka 100! Butuh integer? Lakukan ini di tempat: \`int(input("Ketikan Umur: "))\` lho!\n\n**F-String Data Formatter:**\nMenghimpun variabel bertaburan tanpa koma-koma liar (Concatenate Plus+ dilarang). Taruh prefix \`f\` sebelum string quote. Variabel di dalam bungkus lewat \`{..}\`.\nStrukturnya: \`f"User is {user_name} and score: {poin_num}"\``,
          codeExample: `umur_str = input("Masukkan nama: ")\numur = int(umur_str)\nprint(f"Hore user terdaftar, umurnya tepat di {umur} dong!")`,
          initialCode: `# Instruksi Python I/O mutakhir:\n# 1. Deklarasi var 'target_year', tangkap isinya dari prompt user memakai cast string->int utuh.\n# (Simulasi input bot kami bakal test run input mengisi angka 2025 secara autotyped param ke test mesinnya ini)\n# CONTOH PENANGANAN => target_year = int(input("Masukkan tahun sasaran: "))\n\n# 2. Cetak satu statemen f-string. Pastikan hasil output akhirnya persis tercetak format teks: "Tahun sasaranmu ada di {target_year}"\n`,
          solution: `target_year = int(input("Masukkan tahun sasaran: "))\nprint(f"Tahun sasaranmu ada di {target_year}")`,
          hint: `Salin dan pastikan deklarasi lengkap pakai int(input("..")) lalu f"" syntax di print baris terakhirnya.`,
          quiz: {
            question: `Apakah default base jenis data mentah absolut yang selalu diserap (dikembalikan) ke memori program sewaktu memanggil basic fungsi 'input()' di Python Console Interpreter?`,
            options: [`Format Data Array Bytes mentah OS`, `Berubah Cerdas Menerka Bisa Integer Ataupun Float seiring ketikan keyboard.`, `Selamanya menaruh output serapan menjadi text struktur String ("").`, `Dikembalikan sebagai Boolean Status Keberhasilan Input Ops`],
            correctAnswer: 2
          },
          testCases: [
            { input: `2099`, expectedOutput: `Masukkan tahun sasaran: Tahun sasaranmu ada di 2099\n`, description: `Evaluasi mesin baca serapan I/O konsumsi data bot.` }
          ],
          validationRules: [
            { pattern: `int\\(\\s*input\\(`, message: `Validasi Cast Int gagal. Gunakan format int(input("..")) ! Ini penting agar format angka bisa ber-matematika ria.`, shouldExist: true },
            { pattern: `f["'].*\\{.*\\}.*["']`, message: `Validasi format output terhenti! Biasakan pakai kekuatan super F-STRING format prefix di print string.`, shouldExist: true }
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
  description: 'Python Control Block Rule: Regulasi blok identasi statment, fungsi logic If-Elif-Else berkesinambungan, literasi massal via iterasi Range (For) dan pembuatan function Custom (Def).',
  modules: [
    {
      id: 'py5-m1',
      title: 'Pola Sintaks Baru Pembentukan Blok',
      lessons: [
        {
          id: 'py5-l1',
          title: 'Regulasi Kuat Tanda Titik Dua (:) & Indentasi Tab',
          explanation: `Python **melepaskan total** dominasi penjara Kurung Kurawal C \`{}\` serta membebaskan penulisan kurung di pembuka Statement Kondisinya.\n\nSebagai gantinya, Python mengawali eksekusi ruang blok instruksinya menggunakan **Titik Dua (\`:\`)** di bagian ekor deklarasi statemen if.. \nDan parahnya **Hukum Mutlak Kesekian**: Seluruh barisan baris kepunyaannya harus bergeser **1 step jarak Tab / 4 spasi (Indentasi Lurus)**. Salah mencadangkan identitasi? Error "IndentationError" menguasai code compiler mu!\n\nRute If:\n- \`if\`: Arah pembukaan utamanya.\n- \`elif\` (Sisa/Else If): Pengecekan berkelanjutan runtun blok persinggahan ke dua dst.\n- \`else\`: Penadah buang bilamana rute semua di atas ditendang dan tercacah.`,
          codeExample: `bensin = 2\nif bensin > 10:\n    print("Jalan Kencang")\nelif bensin >= 2:\n    print("Pas-pasan boss.") # Rute Tengah\nelse:\n    print("Mati/Kosong!")`,
          initialCode: `angka = 10\n# Susun kondisinya:\n# Bikin jika angka > 15 cetak "Angka Besar"\n# Pakai elif cek jika angka > 5 cetak string bernada "Angka Sedang"\n# Gunakan penadah else buat cetak pamungkas kata "Angka Kecil"\n`,
          solution: `angka = 10\nif angka > 15:\n    print("Angka Besar")\nelif angka > 5:\n    print("Angka Sedang")\nelse:\n    print("Angka Kecil")`,
          hint: `Harus lurus: if angka > 15: => lalu Tab indent printnya.. lalu elif.. dan else: di ujung`,
          quiz: {
            question: `Kata singkatan sambung jembatan rute ke 2 penengah percabangan (Sama seperti alias "Else if") pada rancang kode sintaks identasi komprehensif logikal Python dibakukan sebagai apa?`,
            options: [`else if`, `if-second`, `elseif`, `elif`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Angka Sedang\n`, description: `Test tembusan validasi di route elif tengah nilai logic default` }
          ]
        }
      ]
    },
    {
      id: 'py5-m2',
      title: 'Dinamika Lingkaran Perulangan (Loops)',
      lessons: [
        {
          id: 'py5-l2',
          title: 'Metodologi For-Loop bersama Range() Generator',
          explanation: `Python mendesain pemecahan iterasi For amat anggun yang dijepret dengan fungsi pembangkit iterasi \`in range(batas_start, batas_stop, pijakan_step)\`.\nIa disebut struktur Counted Loop karena secara kepastian mutlak **Batas Limit iteratif stop SELALU terjaga tidak tertembus**. Angka eksekutor hitungannya **pasti berhenti TEPAT SEBELUM menyentuh batas angka mutlak "stop" nya** (Iterasi batas minus 1).`,
          codeExample: `for urutan in range(3):\n    # Mencetak perulangan text sebanyak urutan 0, urutan 1, dan Terakhir urutan ke-2 (Batas=3)\n    print("Proyek Sukses!") `,
          initialCode: `# Bangun blok iterasi pengulangan memakai "for i in range" berjumlah pastian 4 putaran.\n# Blok menjoroknya menaruh instruksi panggilan print("Ulangi Dong")\n`,
          solution: `for i in range(4):\n    print("Ulangi Dong")`,
          hint: `Baris satu for i in range(4): => Baris bawah indent ditaruh print.`,
          quiz: {
            question: `Misalkan tertulis statement skrip literasi blok baris 'for n in range(0, 10):'. Pada perputaran urutan eksekusi step nomor berapakah literasi baris ini mendadak distop total membiarkan urutannya lepas?`,
            options: [`Hitungan persis di loop ke 10 berjalan penuh di layar.`, `Eksekusinya di rem tertutup (stop) pada putaran saat mencapai index poin-ke 9. Angka 10 dibuang.`, `Infinite looping OS crash.`, `Melewati batasnya dan berhenti di rute angka 11.`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Ulangi Dong\nUlangi Dong\nUlangi Dong\nUlangi Dong\n`, description: `Tes looping valid batas stop-range statik` }
          ]
        },
        {
          id: 'py5-l3',
          title: 'Resiko Infinite While Loop (Pengulangan Uncounted)',
          explanation: `Iterasi While sungguh *rawan / riskan* karena program ini cuma bertumpu mengeksplor di ranah True Truthy-Boolean (*Uncounted Loop*). Terus.. terus berputar asalkan pengecekan awal selalu Valid di pikirannya.\n \nHindari kiamat komputasi (*Infinite Lag Loop*) dengan memastitkan kita SELALU memasukkan suntikan penambah angka limitasi yang menaikan batas nilainya sendiri (\`y += 1\`) di dasar ruangan identasi perulangan secara manual agar tercapai finish False.`,
          codeExample: `timer = 1\nwhile timer <= 3:\n    print(timer)\n    timer += 1 # HARUS ADA! Tanpa baris ini, 1 selalu lebih kecil dari 3 selamanya!`,
          initialCode: `y = 1\n# Cetakan while Loop di mana selama variabel y bernilai <= 2 berjalan terus!\n# Beri print mencetak angka integer (y) per putaran.\n# Sangat teramat diperingatkan, selipkan Increment step pendorong (y += 1).\n`,
          solution: `y = 1\nwhile y <= 2:\n    print(y)\n    y += 1`,
          hint: `while y <= 2: => print(y) => y += 1 (indent di blok while)`,
          quiz: {
            question: `Apakah bayaran mengerikan/Fatal dari kegagalan sepele si seorang programmer yang sampai kelupaan secara utuh menulis manual modifikasi skrip Incremental Variable Value (n += 1) didalam scope identasi satu struktur pemecahan Loop Sementara (While)?`,
            options: [`Browser akan force tutup instan me-restart perangkat.`, `Loop tidak pernah menyala sekalipun.`, `Terciptanya fenomena Iterasi Lingkaran Jahat Tak Berujung (Infinite Looping / Memory Overflow)`, `Hanya menyebabkan skip program 1x`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `1\n2\n`, description: `Check auto increment step logic bypass.` }
          ],
          validationRules: [
            { pattern: `\\+=\\s*1`, message: `DILARANG KERAS MEMICU INFINITE LOOP TANPA INCREMENT OPERATOR += 1`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py5-m3',
      title: 'Pembuatan Modular Fungsi Custom',
      lessons: [
        {
          id: 'py5-l4',
          title: 'Pendeklarasian Blok Definisi Kode (Def Tool)',
          explanation: `Pengulangan duplikat puluhan blok baris program amat diharamkan (DRY = Don't Repeat Yourself). Kita harus menyelipkannya dalam rancang wadah panggil ulang bernama Fungsi Dasar (Function Tool).\n\nAwali dengan instruksi kata saktinya \`def panggil_nama()\` diimbangi urutan parameternya dan block identasi titik dua perlakuan code. Dapat pula memukul bola feedback output-nya dengan melempar parameter baris tersembunyi ber-kata kunci awalan \`return obj;\` ke penangkapnya di luar void ini.`,
          codeExample: `def fungsi_perkalian(a, b):\n    return a * b\n\n# Ini di blok publik luar Def\nprint(fungsi_perkalian(5, 5)) # Result output dilempar keluar sebagai 25`,
          initialCode: `# 1. Jadikan satu kumpulan rutinitas lewat \`def absensi():\`\n# 2. Yang instruksinya hanya baris statis print("Aman Hadir!") \n# 3. Panggil dan eksekusi secepatnya method instansiasi objek func absensi() tadi di luar blok nya.\n`,
          solution: `def absensi():\n    print("Aman Hadir!")\n\nabsensi()`,
          hint: `Bungkus deklarasi nya, geser indent fungsinya, lalu panggi namnya di public scope di bawah sejajar ujung dinding console def-nya.`,
          quiz: {
            question: `Karena karakter "Static-Type" (cth var types string, void int) ditanggalkan total dalam proses memanifes/menciptakan modul rancang blueprint sebuah fungsi kerja anyar (Function), perintah awalan baku keyword pengganti perantara function itu sendiri apa?`,
            options: [`let func ==`, `class::()`, `def (define)`, `void main()`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Aman Hadir!\n`, description: `Check ekses pemanggilan internal modul object scope runtime def.` }
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
  description: 'Pengenalan Koleksi memori cerdik List Py [] Dinamis, Arsitektur pasang Kunci-Nilai spesifik (Key:Val) JSON style dari Data Dictionary {}, plus pengarahan manajemen manipulasi isi baris Berkas text File mumpuni.',
  modules: [
    {
      id: 'py6-m1',
      title: 'Keranjang Kapasitas List (Array Mutasi Tipe Bebas)',
      lessons: [
        {
          id: 'py6-l1',
          title: 'Karakter Ektrim Mutable & Method Tool',
          explanation: `Keranjang memori dinamis di Python dilambangkan sanggul Kurung Siku Matrix \`[ ]\`. Jika kita berkaca sejenak pada limitasi tabung index C-Array di level lalu yang mensyaratkan keras seluruh gerbong gerbong memory wujud array mutlak dari turunan gen Tipe Data yang sama rata (entah kumpulan deret angka Integer semua, text murni). \n\nDi Python List ini \`Mutlak Boleh Dicampur Random!\` Angka Int, Float, String tulisan konyol dlm 1 row bisa! Semuanya terurut dari indeks nomor \`0\`. Ia berpredikat "MUTABLE" yang maknanya segala rupa fisiknya bisa diubah (Hapus, Inject, Ganti, Insert tengah) on the fly lewat puluhan Method-nya. \n\nCth Senjatanya:\n- \`append(<value>)\`: Taruh nilai baru ke posisi ujung baris paling paling belakang. (sering)\n- \`insert(titik_index, <value>)\`: Maksa menusuk data baru di susunan tengah ke i.\n- \`pop(titik?)\`: Menggunting nilai data index target keluar (atau sisa paling blåkang) & lalu menghilangkanya dari list array.\n- \`sort()\` dan \`reverse()\` : Ngatur sorting ASC / DESC otomatis di array memory aslinya membalik list pos.`,
          codeExample: `row_db = [10.5, "Karyawan Y", True] # 3 jenis tipe yang gila\nrow_db.append(100) # Tergabung ke belakang\nprint(row_db[3]) # Meretrieve index terakhir ke 3 baru = 100`,
          initialCode: `angka_deret = [1, 2, 3]\n# Misi Anda: Modifikasi angka_deret tersebut dan selipkan append() guna menginject/menambah angka nilai bulat 4 pada pos urutan terakhir ekor array itu.\n# Buktikan eksistensinya dengan mengeksekusi print(angka_deret)\n`,
          solution: `angka_deret = [1, 2, 3]\nangka_deret.append(4)\nprint(angka_deret)`,
          hint: `Ketikan angka_deret.append(4) barulah pungkasi print(angka_deret)`,
          quiz: {
            question: `Apakah karakteristik identitas spesial dan memutus keterkungkungan batasan tipe Array-C jaman dahulu dari fitur sakti milik Python List Array ini tentang batasan tipe variabel memori yang diaturnya?`,
            options: [`Membutuhkan header file import special`, `Bisa dipastikan di memori RAM teralokasi tidak butuh space bytes banyak di array C list`, `Ia mendukung penyimpanan segala gabungan bentuk variasi tipe data (Campuran Bool, Text, dll) didalam baris kurung himpunannya secara massal`, `Dia membuang pola arsitektur penghitungan index mulainya dari bilangan bulat angka Nol (0)`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `[1, 2, 3, 4]\n`, description: `Uji pengetesan pemanggilan Method modifikator memori di level arsitektur py method array index list` }
          ],
          validationRules: [
            { pattern: `\\.append\\s*\\(\\s*4\\s*\\)`, message: `Kamu belum menginject integer angka penambahnya menggunakan parameter function manipulasi Append yang mutlak!`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py6-m2',
      title: 'Dictionary Key Mapping Database',
      lessons: [
        {
          id: 'py6-l2',
          title: 'Pasangan Sejoli Format Json Kunci-Nilai (Dictionary)',
          explanation: `Dalam simulasi pemformatan memori logis mirip pola Object Relational JSON milik NodeJS modern, anda mendefinisikannya melaluai peranan Dictionary. Tempat penyimpanan raksasa dimana parameter identifikasi lokasi data bukan mengandalkan pencarian kompas index \`[0/1]\`, melaikan di-Map lewat satu 'Text String Kunci Utama' yang mengikat 'Suatu Value Nominalnya'. Berbentuk apitan Bracket Kurung Kurawal \`{\`..\`}\` dgn pilar operator titik koma \`:\` pengikat pasangannya.\n\nContraction Map: \`tabel_murid = {"nickname" : "ProPlayer69", "tier" : "Epic"}\` \n\nMetode Pengaksesan Massalnya meliputi iteratif loop melalui tool tool ekstraktor sakti semisal:\n- \`.keys()\` membackup sekeranjang index namanya semata. \n- \`.values()\` sebaliknya. Hanya membacking output parameter variablenya (contoh isi text dari nickname ProPlayer69 td).\n- \`.get(nama\_property, 'Fallback Error')\` ambil aman.`,
          codeExample: `config = {"host": "127.0.0.1", "port": 8080}\nprint(config["host"]) # Pengaksesan mutlak via Property key name`,
          initialCode: `murid_dict = {"uuid" : "12B-01", "grade" : "Sekolah Menengah"}\n# Tugas singkat: Beri program fungsi statement print output yang me-retrieve dan \n# mengambil isi value string hanya khusus pada rute bagian atribut dictionary kunci string dari "grade".\n`,
          solution: `murid_dict = {"uuid": "12B-01", "grade": "Sekolah Menengah"}\nprint(murid_dict["grade"])`,
          hint: `Manfaatkan metode perujukan property dictionary pada object nya murid_dict["grade"]`,
          quiz: {
            question: `Dari ragam jenis properti tool bawaan metode ekstensi dictionary arsitektur mapping, Manakah tipe function getter yang sanggup merampingkan sekaligus menyedot pengumpulan deretan parameter string identitas KEY-nya saja secara sendirian tanpa menghiraukan isi konten nominal parameter didalam array dict object itu?`,
            options: [`.keys()`, `.json()`, `.fetch.attributes()`, `.compile_idx()`],
            correctAnswer: 0
          },
          testCases: [
            { expectedOutput: `Sekolah Menengah\n`, description: `Check dan test kemurnian property value retrieval mechanism dict structure model mapping string` }
          ]
        }
      ]
    },
    {
      id: 'py6-m3',
      title: 'Stream Operasional Edit Sistem Berkas (TXT) & IO',
      lessons: [
        {
          id: 'py6-l3',
          title: 'Proteksi Manipulator Memori Dengan Metode Context Manager [With Open]',
          explanation: `Berinteraksi ke kedalaman akar directory (I/O Open Text Log atau db File config \`.txt\`) dipraktekkan sangat bersih pada ranah Python menggunakan sistem \`Context Managers\`. Yakni satu pelindung blok statement berwujud sakti:\n\`with open('nama.extensi', 'mode-sandi') as f:\`\n\nPenangan dan tanggung jawab wajib pendelegasian perintah manual pemutusan file disk (\`f.close()\` memory lock leak release function) seketika dibebastugaskan/dikerjakan sangat canggih dan absolut otomatis asalkan runtutan baris aljabar algoritma berhasil melewati block akhir *indentation* file tsb!\n\n**MODE SANDI File Manipulation:**\nKita menyimulasi Mode Sandi Akses Edit Paling Aman, Mode **\`"a"\`** singkatan dari Append (Tambah Belakang Ekstra). Tidak berbahaya menyelelmuti / membumi-hanguskan isi file log text di dalamnya layaknya mode pembantai ganas seperti W (*Writer Overwrite*)\nLalu anda sisipkan method pointer tembak isinya melalui: \`f.write("teksnya")\`.`,
          codeExample: `# Karena proxy OS Vercel server web app mem-ban physical read and write pada direktori ini, kita pakai simulasi pemahamannya.\n# with open("C:\\User\\log_status.txt", "a") as configPointer:\n#     configPointer.write("Sukses masuk login.\\n")`,
          initialCode: `# Simulasikan block virtual context manager super aman "with open" mode target Append text pada sandi parameter "a" memanipulasi target mock file "dummy.txt".\n# Simpan 1 baris string utuh bertulisan persis ini: "Log_Berhasil_Di_Inject\\n" ke handle alias object memanggil method .write().\n# Terakhir, tutuplah identasinya. Maju sejajar ke ujung kiri di luar statement lalu cetak print konfirmasi bertuliskan text literal >> "Prosedur Akses Beres"\n`,
          solution: `with open("dummy.txt", "a") as f:\n    f.write("Log_Berhasil_Di_Inject\\n")\nprint("Prosedur Akses Beres")`,
          hint: `Mulai with open("dummy.txt", "a") as f: -> f.write() -> keluar pindah ke baris ident ke akar -> print("Prosedur Akses Beres")`,
          quiz: {
            question: `Apakah benefit mutlak terbesar / fungsi magic pelaksana utamanya sehingga tata cara programmer moderen sangat mengutamakan pemakain penanganan scope blok sistem *WITH Statement* 'With Open' di manipulasi file ketimbang metode lama pemanggil open biasa yang dilarutkan ke nama statik root variable?`,
            options: [`Otomatis Bypass Proteksi Permission Error Hak Admin Windows Root Readonly`, `Fungsi ajaib nya otomatis memastikan 'Releasing' atau penutupan file object f.close() dilakukan otomatis ke kernel CPU setelah usai proses ekstrasinya tanpa harus capek dipanggil programmer secara eksplisit di code line bawahnya`, `Sanggup auto decrypt text file format ke Hash AES-256`, `Mempersingkat nama file read path format unix nya`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Prosedur Akses Beres\n`, description: `Indicator exit and mock out context function simulator block test.` }
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
