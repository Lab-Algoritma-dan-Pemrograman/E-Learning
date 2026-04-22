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
  description: 'Mempelajari struktur penulisan algoritma C, bagan alir (Flowchart), tipe data dasar, fungsi input/output lengkap, dan operator.',
  modules: [
    {
      id: 'c1-m1',
      title: 'Logika Flowchart dan Struktur C',
      lessons: [
        {
          id: 'c1-l1',
          title: 'Pengenalan Logika & Flowchart',
          explanation: `Algoritma adalah urutan langkah logis untuk menyelesaikan masalah. Sebelum diubah menjadi bahasa C, algoritma divisualkan dengan Flowchart (Bagan Alir).\n\nStrukturnya meliputi Start, Read, Process, Write, dan End. Jenis flowchart dapat berupa Sequence (Berurutan), Branching (Percabangan), atau Looping (Perulangan).\n\nSimbol utamanya:\n- Terminal (Bentuk oval): Awal dan Akhir program.\n- Process (Bentuk persegi panjang): Rumus atau proses assign nilai.\n- Decision (Belah ketupat): Percabangan tanya jawab Yes/No.\n- Input/Output (Jajar genjang): Aktivitas pembacaan data.`,
          codeExample: `// Contoh implementasi di kehidupan nyata:\n1. Start\n2. Read: Masukkan Air\n3. Process: Panaskan\n4. Write: Air Matang\n5. End`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Tulis print simulasi langkah Flowchart: "1. Start\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    printf("1. Start\\n");\n    return 0;\n}`,
          hint: `Ketik printf("1. Start\\n");`,
          quiz: {
            question: `Pada diagram flowchart, bentuk apakah yang merepresentasikan 'Decision' atau percabangan keputusan dari suatu kondisi instruksi?`,
            options: [`Oval`, `Jajar Genjang`, `Persegi Panjang`, `Belah Ketupat`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `1. Start\n`, description: `Menampilkan simulasi diagram` }
          ]
        },
        {
          id: 'c1-l2',
          title: 'Struktur Program Bahasa C & Header',
          explanation: `Struktur dasar program C terdiri dari dua area wajib.\n\n1. Bagian '#include': Berfungsi mengimpor fungsi perpustakaan. Penggunaan standar '<stdio.h>' ditujukan untuk input-output standar. Jika membuat file header lokal buatan sendiri, strukturnya menjadi dipetik yakni '#include "nama.h"'.\n2. Bagian 'int main()': Fungsi utama penggerak yang tereksekusi. Perintah 'return 0;' ditujukan menutup fungsi secara absolut dan wajar.\nSetiap instruksi akhir dalam statement C wajib ditutup dengan Titik Koma ( ; )!`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    printf("Int main berjalan sempurna.\\n");\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Tulis perintah yang memunculkan tulisan "Booting main..." plus penanda letak ganti baris baris baru.\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    printf("Booting main...\\n");\n    return 0;\n}`,
          hint: `Minta printf berisikan kalimat "Booting main...\\n"; diakhiri ';' ya!`,
          quiz: {
            question: `Apakah library header C yang dipakai jika kita memerlukan bantuan fungsi matematis tinggi seperti pemangkatan pow() atau pun sinus consinus?`,
            options: [`<string.h>`, `<stdlib.h>`, `<math.h>`, `<stdbool.h>`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Booting main...\n`, description: `Bisa memunculkan baris boot main` }
          ],
          validationRules: [
            { pattern: `;`, message: `Keharusan meletakkan titik koma di akhir instruksi.`, shouldExist: true }
          ]
        },
        {
          id: 'c1-l3',
          title: 'Tipe Data dan Deklarasi Constanta',
          explanation: `Tipe data C mencakup:\n- 'char': Huruf (Range -128 ke 127). Untuk menampilkannya kita panggil simbol cetak %c atau jika himpunan kata %s.\n- 'int': Integer format d.\n- 'float': Desimal (pecahan sederhana) dng parameter f.\n- 'double': Desiminal tingkat kompleks parameter lf.\n- 'bool': Boolean 1 dan 0.\n\nUntuk mendeklarasikan Variabel Statik yang mustahil diubah selama runtime, pakailah awalan 'const'. Contoh: const float pi = 3.14;`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    const int nilaiMax = 100;\n    int skor = 90;\n    printf("Max: %d", nilaiMax);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Minta instansiasikan constanta berjenis float dengan nama pi yang berisi nilai 3.14\n    \n    // Tampilkan kalimat "Nilai PI adalah 3.14" lewat pemanggilan variabel pi.\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    const float pi = 3.14;\n    printf("Nilai PI adalah %.2f\\n", pi);\n    return 0;\n}`,
          hint: `Deklarasikan sebagai: const float pi = 3.14; diikuti formating %.2f di printf.`,
          quiz: {
            question: `Kata awalan manakah untuk menset nilai memori yang dikunci paksa nilainya tak terbantahkan sepanjang program berjalan?`,
            options: [ `#define / const`, `void`, `struct`, `bool` ],
            correctAnswer: 0
          },
          testCases: [
            { expectedOutput: `Nilai PI adalah 3.14\n`, description: `Test konstan float` }
          ]
        }
      ]
    },
    {
      id: 'c1-m2',
      title: 'Fungsi Input Output I/O Lengkap C',
      lessons: [
        {
          id: 'c1-l4',
          title: 'Printf & Puts Dasar Tampilan Data',
          explanation: `C menyediakan ragam interaksi Command Line mumpuni.\n- 'printf()': Bersifat mentah, murni menumpuk teks panjang tanpa spasi apalagi enter. Kamu harus manual menulis escape '\\n' di tiap ekornya.\n- 'puts()': Super singkat untuk teks String tok! Ia punya sihir ajaib akan otomatis menginject enter ganti baris tersendiri tanpa perlu \\n manual di ujungnya!\n- 'putchar()': Menumpahkan HANYA satu karakter ascii ke layar.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    puts("Otomatis Turun Baris Nih!");\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Lakukan print text murni tanpa escape \\n lewat keyword 'puts' berisi teks "Halo Dunia"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    puts("Halo Dunia");\n    return 0;\n}`,
          hint: `Langsung puts("Halo Dunia"); saja, lebih singkat!`,
          quiz: {
            question: `Apabila suatu pesan teks bahasa C dieksekusi dengan fungsi puts() dan bukan via printf() konvensional, maka keuntungan istimewa apakah yang ada di akhir outputnya?`,
            options: [`Tulisannya kedap berhuruf sangat besar (Capslock Automatic)`, `Diselipkan fungsi otomatis mengganti turunan ENTER garis ke bawahn terbaru`, `Mencegah memori lag`, `Disisipkan tanda koma`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Halo Dunia\n`, description: `Testing Puts functionality murni enter bawaan` }
          ]
        },
        {
          id: 'c1-l5',
          title: 'Input Ampersand dari Memory (Scanf)',
          explanation: `Fungsi Scanner Console bahasa C sangat kuno, tetapi ini mengajarkan pointer alamat paling basic.\nSewaktu menerima data integer via 'scanf' wajib didahului mendidik Nilai Nol (Inisial), lalu berikan arah memori bersimbol 'Ampersand &' di depan variabelnya.\nTanpa simbol &, Scanf menabrakkan memori dan program CRASH murni!`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int nominal = 0;\n    printf("Uang: "); \n    scanf("%d", &nominal); \n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Buat var int nomor, sediakan init angka 0.\n    int nomor = 0;\n    // Cetak permohonan isi "Ketik id: " (no enter)\n    \n    \n    // Panggil scanner membaca %d , tujukan pakai simbol alamat ke nomor\n    \n    \n    // Verifikasi outputnya dengan cetak "ID Didaftarkan: [angka_nomor]\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int nomor = 0;\n    printf("Ketik id: ");\n    scanf("%d", &nomor);\n    printf("ID Didaftarkan: %d\\n", nomor);\n    return 0;\n}`,
          hint: `Minta printf "Ketik id: ", terus scanf %d dan variabelnya wajib tambahkan & di depannya. Akhiri printf.`,
          quiz: {
            question: `Operator apik pembawa alamat (Addressing) pada parameter argumen variabel sasaran didalam function "scanf()" adalah...`,
            options: [`Simbol Bintang *`, `Simbol Dan &`, `Simbol Tilde ~`, `Simbol Persen %`],
            correctAnswer: 1
          },
          testCases: [
            { input: `69`, expectedOutput: `Ketik id: ID Didaftarkan: 69\n`, description: `Output check id form test C scanner input` }
          ]
        },
        {
          id: 'c1-l6',
          title: 'Interaktif String (Gets & Getchar)',
          explanation: `C juga menawaran inputan diluar sistem ribet Scanf.\n- 'gets()': Ditujukan menangkap string spasi utuh dalam 1 blok kalimat panjang (yg kalau scanf biasanya patah dan macet di spasi pertama yang diketik).\n- 'getch()': Input huruf tersembunyi mirip penginputan system Password hitam. Tanpa tekan ENTER dia langsung submit logic.\n- 'getche()': Sama namun merefleksikan karakter ke interface.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    // Hanya teori demonstrasi karena platform butuh full terminal flush:\n    char huruf = 'A';\n    putchar(huruf);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Karena gets dan getch tidak secure di sistem web virtual ini.. praktikkan pembuangan escape saja.\n    char buffer = 'Z';\n    // Gunakan fungsi tunggal putchar() untuk mem-print var buffer.\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    char buffer = 'Z';\n    putchar(buffer);\n    return 0;\n}`,
          hint: `Eksekusi fungsi putchar dengan disisipkan nama variable.`,
          quiz: {
            question: `Apakah kegunaan luar biasa fungsi getch() yang umumnya diremehkan tetapi dipakai developer lawas C untuk menciptakan area pendaftaran?`,
            options: [`Memperbaiki error logikal.`, `Untuk menangkap huruf sandi secara ghaib tanpa kelihatan / merefleksi bentuk kata di layarnya.`, `Mempercepat waktu runtime C.`, `Mencetak Array Text.`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Z`, description: `Output putchar` }
          ]
        }
      ]
    },
    {
      id: 'c1-m3',
      title: 'Operator Lanjutan di Bahasa C',
      lessons: [
        {
          id: 'c1-l7',
          title: 'Operator Aritmatika & Modus Unary',
          explanation: `Aritmatika esensial C: Penambahan (+), Pengurangan (-), Perkalian (*), Pembagian (/). Modulo (% sisa mutlak pembagian).\n\nNamun kekuatan utama C terletak pada Operator Unary yang brutal performanya. Yaitu modifikasi pada SATU buah tipe kembar:\n- Post-Increment ('x++'): Dipakai dulu urusan nilainya saat itu di public, BARU ia ditambahkan 1 untuk simpanan file!\n- Pre-Increment ('++x'): Maju ditambahkan 1 di memori dasar, sehingga siapapun yang membacanya sesaat kemudian mendapat val terkini.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int a = 5;\n    printf("Nilai awal a ditarik via a++ : %d\\n", a++); // Tampil 5, trus a jadi 6\n    printf("Kini a didorong via ++a : %d\\n", ++a); // Ditambahkan dari memori jadi 7, muncul 7\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int poin = 100;\n    // Cetaklah sisa modulo poin tersebut jika poin dibagi angka 3, memakai format printf biasa\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int poin = 100;\n    printf("%d\\n", poin % 3);\n    return 0;\n}`,
          hint: `Sisa bagi poin mod 3 adalah poin % 3`,
          quiz: {
            question: `Operator modulo/sisa bagi dipetakan oleh mesin dengan notasi karakter apa?`,
            options: [`Mod()`, `#`, `%`, `*`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `1\n`, description: `Menghitung modulus yang sangat akurat` }
          ]
        },
        {
          id: 'c1-l8',
          title: 'Komparator Perbandingan',
          explanation: `Dalam cabang manapun, Anda mengecek suatu syarat menggunakan Operator Relasi (Perbandingan).\n'==': Bernilai murni "Apakah sama nilainya?". Tolong jangan salahkan dengan '=', itu adalah deklarasi setter inisialisasi.\n'!=': Tidak sama dengan.\n'>=' dan '<=': Lebih atau setara dengan. Sangat lazim masuk dalam struktur percabangan If C.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int suhu = 30;\n    if (suhu >= 30) {\n        printf("Panas Hawa");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int cek = 20;\n    // Buat cabang membandingkan cek dengan 20 menggunakan Relasional Tidak Sama Dengan (Cek BUKAN 20)\n    // Kalau syarat true cetak "Lolos", else cetak "Blok"\n    if () {\n        \n    } else {\n        \n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int cek = 20;\n    if (cek != 20) {\n        printf("Lolos\\n");\n    } else {\n        printf("Blok\\n");\n    }\n    return 0;\n}`,
          hint: `Minta pengecekan komparator (cek != 20).`,
          quiz: {
            question: `Apabila suatu variabel bertulis id_user diuji tidak sama serapan nya dengan konstanta angka 1, C memandunya lewat perintah relasional berkarakter tunggal sebagai?`,
            options: [`id_user <> 1`, `id_user != 1`, `id_user ~ 1`, `id_user !== 1`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Blok\n`, description: `Test percabangan tidak sama dengan pada blok nilai genap sepadan` }
          ]
        },
        {
          id: 'c1-l9',
          title: 'Operator Gerbang Logis Terpadu',
          explanation: `Skenario C kerap menuntut pengujian 2 skenario atau bahkan tiga dalam sederet syarat mutlak. Gunakan Gerbang!\n\n- '&&' (AND): Keras mutlak. Seluruh pemicu sayap kiri maupun penjaga kondisi kanan harus mutlak tercukupi "True" agar ia bernilai lanjut.\n- '||' (OR): Longgar. Jika kanan saja sudah True maka program akan mengeksekusi statmentnya.\n- '!' (NOT): Merusak nilai. Nilai hasil True akan dibaliknya menjadi murni False.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int usia = 18, vip = 1;\n    if (usia >= 18 && vip == 1) {\n        printf("Guest Masuk");\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int poin = 50;\n    int premium = 0;\n    // Susun percabangan if OR. Syaratnya: poin == 100 ATAU premium == 1 untuk tembus print "Mantap\\n"...\n    // Jika salah maka print "Ups\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int poin = 50;\n    int premium = 0;\n    if (poin == 100 || premium == 1) {\n        printf("Mantap\\n");\n    } else {\n        printf("Ups\\n");\n    }\n    return 0;\n}`,
          hint: `Syarat logika OR ditulis (poin == 100 || premium == 1).`,
          quiz: {
            question: `Operator bahasa pemrogaman C apa namanya yang sanggup merantai 2 rute persyaratan agar keduanya mutlak harus berhasil dilintasi (Wajib Semua Bernilai Benar)?`,
            options: [`& (Tunggal)`, `&& (Double Ampersand)`, `|| (Or)`, `==`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Ups\n`, description: `Testing validasi percabangan fail condition OR test` }
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
  description: 'Penguasaan lanjutan cabang hirarkikal eksekusi dan Iterasi.',
  modules: [
    {
      id: 'c2-m1',
      title: 'Decisions / Percabangan Lanjutan',
      lessons: [
        {
          id: 'c2-l1',
          title: 'Kontrol Blok Tunggal (If / Else)',
          explanation: `Percabangan sederhana If-Else hanya bermekanisme biner. Lolos, maju blok 1. Gagal, buang eksekusi blok ujung.\nJangan pernah menyelipkan Titik koma sesudah parenthesis syarat komparasi, cth: 'if (x>2);', jika dikasih titik koma, maka isi blok takkan pernah direlasi/dicek dengan IF tersebut!`,
          codeExample: `#include <stdio.h>\n\nint main() {\n   if (1) {\n       printf("Jalan aja boss");\n   }\n   return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int x = 1;\n    // Bikin blok statis nge-print "OK\\n" pada blok ELSE dari if (x == 5).\n    if (x == 5) {\n        printf("Jebakan\\n");\n    } \n    // tambahkan else\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int x = 1;\n    if (x == 5) {\n        printf("Jebakan\\n");\n    } else {\n        printf("OK\\n");\n    }\n    return 0;\n}`,
          hint: `Minta percabangan blok else mencetak print("OK\\n");`,
          quiz: {
            question: `Konstruktor "Else" pada pemrograman percabangan diklasifikasikan berstatus mutlak untuk fungsi...`,
            options: [`Memulai ulang memori`, `Menyimpan data`, `Bertindak sebagai pengakhir buangan jikalau segenap if prasyarat dan konco atasnya pada ditolak/tidak terpenuhi semua rutenya`, `Membatalkan eksekusi script main`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `OK\n`, description: `Test IF ELSE Basic C logic` }
          ]
        },
        {
          id: 'c2-l2',
          title: 'Blok Beranting Else-If Bertingkat',
          explanation: `Ketika opsi syarat tidak hanya dualisme hitam-putih. Anda butuh 'else if'. \nElse if mengecek urutan prasyarat secara mutlak paralel vertikal dari kepala atas beruntun ke anak bawah!\nSifat Sakti: Apabila 'else if' di area posisi level 2 saja sudah menemukan jawaban rute komparasinya yang Benar, maka SISA sisa ranting Else If lain di bawahnya beserta else murni **langsung ditendang / dikangkangi otomatis alias lewat tanpa dicek lagi**!`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int usia = 10;\n    if (usia >= 20) puts("Dewasa");\n    else if (usia >= 15) puts("Remaja Lanjut");\n    else if (usia >= 5) puts("Kanak Dasar"); // Rute Pemenang Asli\n    else puts("Bawah umur");\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int uang = 1500;\n    \n    // Cek harga rentang.\n    // if uang > 5000 printf "Makan Kuaci\\n"\n    // else if uang > 3000 printf "Es Teh\\n"\n    // else if uang > 1000 printf "Air Mineral\\n"\n    // else printf "Batal jajan\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int uang = 1500;\n    if (uang > 5000) {\n        printf("Makan Kuaci\\n");\n    } else if (uang > 3000) {\n        printf("Es Teh\\n");\n    } else if (uang > 1000) {\n        printf("Air Mineral\\n");\n    } else {\n        printf("Batal jajan\\n");\n    }\n    return 0;\n}`,
          hint: `Minta pengujian else if tersusun sampai else output "Air Mineral\\n".`,
          quiz: {
            question: `Karena Else-if bersanding runtun dari atas sampai bawah. Apa bahaya utama menaruh komparasi batas lebih ringan di paling baris puncak tertinggi ElseIf tersebut?`,
            options: [`Membuat C compiler crash limit exceed.`, `Jika kondisi enteng diloloskan paling atas, kondisi bawahnya yang mungkin lebih berat valid nilainya ikut ter-blockade tidak akan ditengok lagi prosesor.`, `Menjadikan program 10x lambat.`, `Hanya salah parse memori`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Air Mineral\n`, description: `Test prioritas routing if-elif di rentang C menengah.` }
          ]
        },
        {
          id: 'c2-l3',
          title: 'Dinamika Cepat Terminal Switch-Case',
          explanation: `Switch-Case mengelola lalu lintas percabangan tanpa \`>\` atau \`<\`. Metode selektif ini secara sakti dan berkecepatan dewa membypass syarat pencarian nilai karakter tertentu persis (konstan). Misal nilai 1, 2 atau 'A', 'B'.\n\nPenangan wajib di dalam strukturnya:\n1. 'case [nilai]:'\n2. 'break;' (Kalau tidak ditambahkan, seleksi akan terus merampok eksekusi hingga file paling bontot! Ini disebut jurus "Fall Through").\n3. 'default:' (Pengecualian mirip kinerjanya Else mentah).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int id = 2;\n    switch(id) {\n        case 1: puts("Owner"); break;\n        case 2: puts("Admin"); break;\n        default: puts("User"); break;\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    char blok = 'C';\n    \n    // Lakukan Switch pada karakter blok tsb.\n    // case 'A': printf("Premium\\n"); break;\n    // case 'C': printf("Standar\\n"); break;\n    // default: printf("Subsidi\\n"); break;\n    // *AWAS perhatikan petik tunggal untuk validasi array karakter ya!\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    char blok = 'C';\n    switch(blok) {\n        case 'A':\n            printf("Premium\\n"); break;\n        case 'C':\n            printf("Standar\\n"); break;\n        default:\n            printf("Subsidi\\n"); break;\n    }\n    return 0;\n}`,
          hint: `Ketik switch(blok) { case 'A': printf("Premium\\n"); break; ... dsb }`,
          quiz: {
            question: `Apakah fungsi perusak (atau justru sakti) jika kita melanggar batas praktik dan melupakan sintaks komando 'break;' tepat sesudah blok case 1 dilangsungkan C?`,
            options: [`Compile exception missing semicolon`, `Komputer mematikan OS terinfeksi`, `Terjadilah fenomena Fallthrough.. case nomor-nomor bawah akan kesapu ikut jalan terus satu persatu eksekusinya.`, `Itu illegal dan auto ditolak.`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Standar\n`, description: `Test routing swicth karakter` }
          ]
        }
      ]
    },
    {
      id: 'c2-m2',
      title: 'Dinamika Iteratif dan Pelompatan Loop',
      lessons: [
        {
          id: 'c2-l4',
          title: 'Pola Sementara (While dan Do-While)',
          explanation: `Perulangan While meneliti dengan pakem "Condition di Puncak Depan". Bila baru sekali nge-while nilainya memalukan (False), dia mutlak skip/nol ekskutor tanpa sisa ampun.\n\nSebaliknya, **Do - While** berkolase dengan menaruh condition validator di paling jurang bawah ('while(syarat);'). Karena letaknya itu, program tak peduli apapan status di awal, ia pasti membabat instruksi blok di atas minimal dan senantiasa SATU kali.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int a = 100;\n    do {\n        printf("Mustahil ini!\\n");\n        a++;\n    } while(a < 10); // Kondisi cacat false dari sananya, tp text di atas dah duluan tercetak!\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int iterasi = 1;\n    \n    // Implementasikan struktur kental while loop (SYARAT di AWAL)\n    // Selama iterasi berjalan menduduki syarat kurang/bernilai = 2 (< 3)\n    // Cetak printf memanggil "Jalan %d\\n" via pointer val iterasi..\n    // JANGAN PERNAH lupakan step iterasi++ di blok indent itu kawan!\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int iterasi = 1;\n    while(iterasi < 3) {\n        printf("Jalan %d\\n", iterasi);\n        iterasi++;\n    }\n    return 0;\n}`,
          hint: `Minta pengecekan komparator while (iterasi < 3) { print(..); iterasi++; }`,
          quiz: {
            question: `Dalam Do-While, di manakah pengecekan kondisi diletakkan untuk menghasilkan eksekusi awal paksaan di blok strukturnya itu?`,
            options: [`Di pertengahan baris statement`, `Selalu di deklarasi header include awal`, `Tepat sebelum eksekusi curly braces pertama blok`, `Aman di bagian paling akhir / di bawah body blok tersebut.`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Jalan 1\nJalan 2\n`, description: `Test output loop incremental standar` }
          ]
        },
        {
          id: 'c2-l5',
          title: 'Perulangan Dinamis Pasti (For Loop)',
          explanation: `Berbeda jauh dari While yang terpisah-pisah, tipe perulangan For mendeklarasikan pergerakan mutlak *3 Instrumen Dewa* miliknya dalam satu baris sejuk.\nFormasi: 'for (inisialisasi basis awal; limit kontrol stop; stepping pergerakan) { ... }'\nSemisal: 'for(int z = 1; z <= 10; z++)' (Cetaklah aku mulai 1 dan tak bakal stop selama angkanya belum menyentuh dan pecah 10).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    for(int start = 3; start > 0; start--) {\n        printf("Angka minus: %d\\n", start);\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Bikin for loop dari inisial z = 1 sampai dengan nilai pas z<=3.\n    // Gunakan increment standar (++)\n    // Blok print text "Posisi z adalah %d\\n"\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    for(int z = 1; z <= 3; z++) {\n        printf("Posisi z adalah %d\\n", z);\n    }\n    return 0;\n}`,
          hint: `for(int z = 1; z <= 3; z++) lalu beri printf untuk isian dalamnya.`,
          quiz: {
            question: `Pernyataaan dalam kurung kurawal pembentuk for-loop dipisahkan total oleh simbol pembatas ajaib apakah dari tata bahasa C?`,
            options: [`Koma (,)`, `Titik (.)`, `Titik Dua (:)`, `Titik Koma (;)`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Posisi z adalah 1\nPosisi z adalah 2\nPosisi z adalah 3\n`, description: `Cek perputaran limitasi batas looping absolut for` }
          ]
        },
        {
          id: 'c2-l6',
          title: 'Inisiasi Break dan Pelarian Continue',
          explanation: `Fungsi pengatur tempo mesin iterasi mutlak.\n- 'break': Mematahkan iterasi total dan meloncat menyelamatkan memori OS dan keluar ke akhir baris body sesudah For loop berakhir. (Iterasi habis selesai)\n- 'continue': Menenggelamkan iterasinya dan me-skip pada PUTARAN DETIK itu SAJA, lalu menagih lagi dari atas di step perulangan nomor sesudahnya layaknya orang licik.\n- 'goto [nama_label];': Melompat murni antar dimensi ke label ekstrinsik tertentu dari program (sangat dihindari para Dev Modern karena melahirkan efek Spaghetti code semraut).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    for(int val = 1; val <= 5; val++) {\n        if(val == 4) break; // Berhenti kalau sentuh angka 4.. (Tidak sampai angka 5!)\n        printf("%d", val);\n    }\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    for(int idx = 1; idx <= 3; idx++) {\n        // Susupkan pelarian if, bila ada idx memegang relasional bersyarat nilai [ 2 ] maka lemparkan skrip continue;\n        \n        printf("Lintasan %d\\n", idx);\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    for(int idx = 1; idx <= 3; idx++) {\n        if(idx == 2) continue;\n        printf("Lintasan %d\\n", idx);\n    }\n    return 0;\n}`,
          hint: `Minta pengujian komparator sederhana if (idx == 2) continue; sebelum syntax printf baris terakhir mu.`,
          quiz: {
            question: `Operator lompat ghaib apa yang kerap diasingkan pakar dan pakem programming Clean Code lantaran sangat merusak struktur terstruktur karena sifatnya melompat kesana-kemari bagaikan mie spaghetti?`,
            options: [`if fall-though`, `return 0`, `goto (jump operator label bypass)`, `exit()`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Lintasan 1\nLintasan 3\n`, description: `Test kelayakan modifikasi alur Continue Bypass Index Logic!` }
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
  description: 'Penyusunan arsitektur array multidimensi kompleks, identitas tipe Struct, array Struct dan pengelolaan Stream File Text external mutlak.',
  modules: [
    {
      id: 'c3-m1',
      title: 'Tipe Koleksi C dan List',
      lessons: [
        {
          id: 'c3-l1',
          title: 'Basis Array Satu Dimensi & Teks Banal',
          explanation: `Dalam arsitektur alokasi memori dasar C language, Array dideklarasikan memborong lahan ram terdekati dalam bentuk blok kontigouus dengan Tipe Data homogen. Indeks array C sakral merujuk awalan dari nol '[0]'.\n\n**Ilusi Penyamaran String:** C purba tidak punya variabel bernamakan text bebas 'string'. Ia meramu format tipu menipu yaitu mendefinisikan variable karakter array dimensi kolom: 'char buffer[10]'. \nWajib Diingat: Array karakter C HARUS menyematkan penanda hampa Terminator Null ('\\0') di bangku gerbong terakhir kalimatnya sekadar ngasih tahu penanda bahwa text usai di gerbong itu!`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int uang_jajan[3] = {10, 20, 30};\n    printf("Uang hari kedua adalah array idx1 yaitu : %d..\\n", uang_jajan[1]);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Punya data statis int matriks[3] = {500, 600, 700};\n    int m[3] = {500, 600, 700};\n    // Target Anda semata: Tarik angka terakhir array (indeks puncaknya)\n    // Gunakan baris output printf menampilkan nilai integer dari akses list bersangkutan.\\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int m[3] = {500, 600, 700};\n    printf("%d\\n", m[2]);\n    return 0;\n}`,
          hint: `M[2] merupakan index array baris bontot dari size alokasi 3 memory itu. Tulis printf("%d\\n", m[2]);.`,
          quiz: {
            question: `Berdasarkan arsitektur ilusi statik text compiler C, array of characters hanya akan lolos dicetak mulus merangkai untai string manakala di gerbong buntutnya berjejer parameter karakter tersembunyi null termination marker. Apakah representatif karakter mematikan itu di C compiler?`,
            options: [`#eof`, `\\%s`, `\\n`, `\\0`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `700\n`, description: `Menilai kebergunaan ekstraksi pointer dasar array list` }
          ]
        },
        {
          id: 'c3-l2',
          title: 'Multi Baris Matriks Array 2D',
          explanation: `Bila dimensi satu sekadar mengoleksi deret bangku lurus (Kolom). Kita mendefinisikan dimensi kelipatan Dua seperti papan Catur berukuran [Baris][Kolom]. \nHingga Multi dimensi. Array begini ibarat tumpukan kotak. Berguna mengkoordinat tabel sistem perlintasan x y.\nBentukan Deklarasi Multi-d baris berjejer:\n'int kisi[2][3]' merepresentasi 2 barisan rak laci di mana tiap isi rak laci ada tumpukan sisipan 3 slot laci anakan lagi di dalamnya. Akses element dengan: 'kisi[0][1]' dll.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    // [1 baris, 2 slot elemen kolom]\n    int laci[1][2] = {{80, 90}};\n    printf("Ambil Data %d", laci[0][0]); // Memanggil nilai absolut 80\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int papan_catur[2][2] = {\n        {11, 22},\n        {33, 44}\n    };\n    // Challenge: Locus printf nilai terekam dari Rak 1 (index 0) tapi pada pilar item urutan Ke 2 (index 1)! Nilainya harus memunculkan %d = 22.\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int papan_catur[2][2] = { {11, 22}, {33, 44} };\n    printf("%d\\n", papan_catur[0][1]);\n    return 0;\n}`,
          hint: `Tarik dari baris nol dan kolom elemen kesatu : papan_catur[0][1] di dalam format %d printf.`,
          quiz: {
            question: `Apakah fungsi peruntukan awal dan termutlak Array berderajat/berdimensi banyak 2D bila diterjemahkan dalam konsep ilmu algoritma realis lapangan?`,
            options: [`Memecah kode mesin CPU`, `Menciptakan ruang tabel data list relasional berbentuk Matrix Koordinat (Sumbu X dan Y Array)`, `Mengkloning duplikasi memori cache L3`, `Merepresentasikan Text ASCII`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `22\n`, description: `Tarik nilai Matrix koordinat sel papan catur.` }
          ]
        },
        {
          id: 'c3-l3',
          title: 'Memanipulasi Elemen Positif Value',
          explanation: `Sembari bermain dengan indeks, array statis C memperbolehkan kita menindih atau bahkan mengoperasikan operasi kalkulator murni pada pointer list indexnya tsb. \nBerbeda dari Array string (yg harus pakai function strcpy), array numerikal bebas di-\"assign\" operator penembakan sama dengan lurus saja.\nContoh pemicu assignment list override paksa: 'data[1] = 999;'.\nAtaupun menghitung: 'poin[0] = poin[1] * data[2];'`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    int temp[2] = {10, 0}; \n    temp[1] = temp[0] * 5; // Slot idx1 menjadi 50 di memori\n    printf("%d", temp[1]);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    int statik[2] = {100, 200};\n    // Ubah nilai memori elemen angka 200 (yang mana ada di index statik[1])\n    // menimpa asalnya dioverwrite merubah harganya menjadi 500!\n    \n    // Buktikan pengeditan kamu via pemanggilan output (printf integer).\\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    int statik[2] = {100, 200};\n    statik[1] = 500;\n    printf("%d\\n", statik[1]);\n    return 0;\n}`,
          hint: `Minta pengeditan index list tsb diakses via statik[1] = 500; dan dicetak ulang dng printf biasa.`,
          quiz: {
            question: `Metode validasi pengisian apa yang paling wajar untuk menindih/meng-overwrite memory internal list array bilangan genap Numerikal berkapasitas Index khusus di program C?`,
            options: [`Harus direkonstruksi dengan function bawaan strcpy array() override.`, `Dengan menyusupkan simbol direct set Assignment penugasan konstan = memori index tujuannya (contoh: list[3]=10;)`, `Harus dilebur malloc memory alokasi barunya dulu`, `Pointer exception block list`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `500\n`, description: `Testing overwrite list memori mutlak` }
          ]
        }
      ]
    },
    {
      id: 'c3-m2',
      title: 'Tipe Ekstra: Struct Organik Objects',
      lessons: [
        {
          id: 'c3-l4',
          title: 'Kerangka Dasar Object Berbasis Struct',
          explanation: `Array itu naif. Ia tak sudi dikawinkan campuran integer, float, string rupa karakter dalam selimut list yang utuh... Struct lahir menaklukkan kesombongan list!!\nStruct layaknya fondasi rumah Cetakan yang mampu menangkap, mengekang memeluk puluhan turunan tipe data yang tak searah jadi objek entitas utuh.\nAnak-anakan komponen variablenya diberi nama 'Field'.\nPenggabungan objek instansi ke Field parameter utamanya diakses khusus menggunakan 'Operator Titik Dot (.)'.`,
          codeExample: `#include <stdio.h>\n// Cetakan wajib luar tubuh program main\nstruct Mobil {\n    int roda;\n    int pintu;\n};\n\nint main() {\n    struct Mobil m1;\n    m1.roda = 4;\n    printf("Ban m1 %d\\n", m1.roda);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nstruct NodeData {\n    int status;\n};\n\nint main() {\n    // Bikin variable beralias 'paket1' mewarisi sifat kerangka keturunan blueprint 'struct NodeData'\n    \n    // Berikan setting field object status miliknya 'paket1' merelai data value = 200.\n    \n    // Print as %d form status payload valuenya.\\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    struct NodeData paket1;\n    paket1.status = 200;\n    printf("%d\\n", paket1.status);\n    return 0;\n}`,
          hint: `Kamu cukup merelasikan object seperti instruksi.. struct NodeData paket1; lalu panggil atribut paket1.status = ...`,
          quiz: {
            question: `Satu notasi karakter sintaks istimewa operator apa sih yang sanggup mendrill dan menembus mengakses kerangka turunan 'field variable properti anakan' didalam induk wujud alokasi satu kelas memory struct di bahasa C?`,
            options: [`Tanda Panah Langsung (->)`, `Tanda Hubung (-/Sub)`, `Tanda Angka Hash (#)`, `Tanda Titik Sambung (.)`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `200\n`, description: `Test field mapping object oriented mini c` }
          ]
        },
        {
          id: 'c3-l5',
          title: 'Implementasi Array di Kombinasi Struct',
          explanation: `Struct ibarat blueprint database 1 orang pekerja. Tapi jika Anda memiliki kantor dengan ratusan Pegawai? Masa Anda harus mendeklarasikan satu per satu baris variable Struct 'pgw1', 'pgw2' secara melelahkan.\nSolusi dewa! Timpa struct dengan kemegahan memori ARRAY LIST!\nDeklarasi hebat: 'struct DatabasePegawai listPekerja[100]'.\nAnda punya 100 object terkemas laci memory index C terdepan yang masing-masingnya mewarisi field utuh!`,
          codeExample: `#include <stdio.h>\nstruct Pekerja { int level; };\n\nint main() {\n    // 2 orang bertipe struct!\n    struct Pekerja baris_kary[2]; \n    baris_kary[0].level = 5; \n    printf("Level mgr ke-1 = %d", baris_kary[0].level);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nstruct ServerHost {\n    int load;\n};\n\nint main() {\n    // Ciptakan sebuah 'array list of Struct' bernama target_servers dengan size bracket kapasitas [2]\n    // yang dikonfigurasi mengikuti tipe layout blueprint (struct ServerHost)\n    struct ServerHost target_servers[2];\n    \n    // Isikan atribut overload field '.load' khusus pada rak elemen array KEDUA (berarti index pos [1]) ke nilai beban sebesar 99.\n    \n    // Tampilkan integer muatan beban dari list tsb.. format outputnya biarkan angkanya tok plus newline.\\n\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    struct ServerHost target_servers[2];\n    target_servers[1].load = 99;\n    printf("%d\\n", target_servers[1].load);\n    return 0;\n}`,
          hint: `target_servers[1].load = 99; printf("%d\\n", target_servers[1].load);`,
          quiz: {
            question: `Manfaat eksponensial tak tertandingi penggabungan/kawin silang antara limitasi tipe memori List Statik 'Array C' dikombinasikan terhadap entitas turunan 'Struct' C, adalah bisa membentuk tatanan...`,
            options: [`Memory Leak Data Bebas`, `Sekumpulan banyak variasi Class yang tak terindeks rapi beraturan OS memory`, `Terciptanya puluhan baris Instansiasi List Kumpulan Objek Data Bertingkat Berkapasitas Massal seperti Array list Karyawan yang kompak/rapi`, `Penolakan dari sisi engine compilation C`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `99\n`, description: `Routing test list indexing mapping to array values of composite objects structs.` }
          ]
        },
        {
          id: 'c3-l6',
          title: 'Struct Copy Assginment Nilai',
          explanation: `Dalam kasus Array murni purba numerik, menyalin isi Array 1 ke Array 2 sangat mustahil. Mustahil Anda menuliskan 'arrayA = arrayB;' ini menyalahi memory limit. Anda wajib loop menyalinnya sedari item nol hingga elemen paling bontot satu serpihan laci.\n\nTAPI! Karena Anda pakai Struct.. struct mengotakkan datanya. Struct 1 BISA dicopy membabi buta dan lurus disuntikkan setara total ke Struct 2 lain asalkan turunan genotipe mereka klop. \nFitur ini merubah hidup coder!`,
          codeExample: `#include <stdio.h>\nstruct Akun { int duit; };\n\nint main() {\n    struct Akun rekA = {5000};\n    struct Akun rekB;\n    rekB = rekA; // WOW! Magic override C assignment! Tersalin 100%\n    printf("Uang di Rek B dicopy: %d", rekB.duit);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nstruct Dompet {\n    int nominal;\n};\n\nint main() {\n    struct Dompet bapak = {1000};\n    struct Dompet anak;\n    \n    // Lakukan Copy Assignmen instan C dari sumber obj bapak menuju obj penerima var si anak...\n    \n    // Display print format %d untuk ngecek val 'nominal' si dompet milik anak.\\n\n    \n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    struct Dompet bapak = {1000};\n    struct Dompet anak;\n    anak = bapak;\n    printf("%d\\n", anak.nominal);\n    return 0;\n}`,
          hint: `Selipkan transfer copy assigment ini: anak = bapak; lalu printf.`,
          quiz: {
            question: `Kenapa metode penambalan/salin data menyingkat instruksi penyalinan Array statik (Bukan operasi pointer tingkat tinggi) dilarang mentah menggunakan operasional assigment (=) secara gamblang antara sesama object variabel List arraynya?`,
            options: [`Kapasitas array melebihi ukuran blok pointer bit alokasi system 32 bit OS.`, `Penyalinan List Array Statik memang Cacat Genetik sejak lahir bahasa C tidak punya operator deep array memori swap override secara mentah (Tidak dibenahi library default C).`, `Error loop array break.`, `Compiler auto memanggil destructor C++ memory function.`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `1000\n`, description: `Akurasi test object bypass property assigment copy clone memory block struct` }
          ]
        }
      ]
    },
    {
      id: 'c3-m3',
      title: 'Stream Fs File Input/Output Text Eksternal',
      lessons: [
        {
          id: 'c3-l7',
          title: 'Dasar Buka & Tulis Murni File Txt File',
          explanation: `Interaksi mendalam dengan sistem File System (FS) di Linux/Windows mengandalkan pembukaan izin kursor pointer bernada istimewa ( 'FILE *' ).\nAnda membuka gerbang nya memanggil gembok operasi \`fopen("name.txt", "w")\`.\nMode Paling Destruktif: Modifikasi sandi **'w' (Write Mode)**.\nSandi ini sadis, ia menulis ulang dari kertas putih file baru kosongan, bilamana pun file bernama target Anda sudah nongkrong berisian ribuan text dokumen di Disk drive folder, mode W auto membabat hangus bersih data asalnya menjadi luluh lantak file 0kb!\nDan akhir kalimat file harus dicekik memory lock nya alias **Wajib ditutup lewat 'fclose(variable_namanya)'**.`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *f_test = fopen("dummy.txt", "w");\n    fputs("Saya menulis bersih text file\\n", f_test);\n    fclose(f_test);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Simulasi pointer penanganan eksekusi File write Mode murni.\n    FILE *fl = fopen("db.txt", "w");\n    \n    if (fl != NULL) {\n        // Simulasi printf dummy terminal log sebagai konfirmasi bot test (Aman tanpa real modif proxy IO)\n        printf("Tulis ulang File berhasil dikunci fclose.\\n");\n        fclose(fl); // Penutup kunci memory kernel\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    FILE *fl = fopen("db.txt", "w");\n    if (fl != NULL) {\n        printf("Tulis ulang File berhasil dikunci fclose.\\n");\n        fclose(fl);\n    }\n    return 0;\n}`,
          hint: `Murni perhatikan teks string kembalian pengujian log C terminal log. Cukup Printf.`,
          quiz: {
            question: `Apakah paramater Mode penulisan (write access access bit control) di parameter parameter function 'fopen' di bahasa C yang paling terkenal Sadis/Murni Destruktif meriset dan menghapus total block text file eksisting seandainya user keliru/ceroboh tidak sengaja melakukan running operasi di file TXT lama miliknya ?`,
            options: [`Sandi mode 'append'`, `Sandi mode 'w' / Murni Write Override total`, `Sandi Read Only +`, `Sandi pointer null fallback`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Tulis ulang File berhasil dikunci fclose.\n`, description: `Log File Check Override Simulation output trace` }
          ]
        },
        {
          id: 'c3-l8',
          title: 'Menambah Data Posisi Akhir Teks',
          explanation: `Guna menghindari tragedi musnah data file dari praktek ganas sandi mode file W (Write), Cederdas merekomendasikan penggunaan sakelar sandi **'a' (Mode Append murni)**.\nAlih-alih membobol menghapus data di file, sandi parameter 'a' ini semata mendeteksi kemana lokasi kursor teks paling jurang bawah mentok file teks arsip tersebut berakhir, dan menyambung melestarikan kalimat string penulisan list list kalimat susulan mu selanjutnya merapat di rentet ekor bawah text file tsb. (Sangat ideal buat nulis Log Sistem History Aplikasi yang berkelanjutan harian).`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *log_catat = fopen("historis.log", "a");\n    fputs("Log Aktivitas Admin No 2.\\n", log_catat);\n    fclose(log_catat); \n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    // Lakukan simulasi pointer function Append.\n    FILE *f_srv = fopen("list.txt", "a"); // Catatan sakti 'a'\n    \n    if (f_srv != NULL) {\n        // Print test check kembalian konfirmasi console\n        printf("Data append tersambung mulus di ekor list file.\\n");\n        fclose(f_srv);\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    FILE *f_srv = fopen("list.txt", "a");\n    if (f_srv != NULL) {\n        printf("Data append tersambung mulus di ekor list file.\\n");\n        fclose(f_srv);\n    }\n    return 0;\n}`,
          hint: `Panggi dan cetak printf dengan kelulusan persis konfirmasi.`,
          quiz: {
            question: `Sewaktu developer mendambakan fungsionalitas aman untuk menyimpan rentetan baris histori user activity (contoh File Activity Logs txt) terus menyambung per harinya dalam satu file lama. Maka parameter manipulasi gembok sandi apik File 'fopen()' yang murni difungsikan adalah wujud...?`,
            options: [`Mode gembok 'Read Only'`, `Bentuk sandi 'Write ++'`, `Sandi operasi Append mode 'a'`, `Mode Bypass Firewall Sandi Override 'O'`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Data append tersambung mulus di ekor list file.\n`, description: `Test virtual penulisan rentet egrang list arsip text manual file C stream pointer string mode ekor` }
          ]
        },
        {
          id: 'c3-l9',
          title: 'Perintah Scan Membaca File Text Disk',
          explanation: `Interaksi File Sistem tak komplit bilamana tidak bisa membongkar/membaca tulisan kembali di file ekstensi yang tersimpan.\nMode izin yang menyertainya dalam compiler 'fopen' direpresentasikan murni Sandi karakateristik saklar string izin **'r' (Read Mode Absolut)**.\n\nSatu kendala fatal sandi Read: Apabila mesin C ini mencari rute target file tujuannya di lokasi folder ternyata murni HOAX (tidak ada fisik hard File txt-nya/keliru penamaan file name path).. maka Compiler mengeksekusi blockade dan me-NULL kan memori filestream. Anda WAJIB melempar deteksi IF agar tak Crash jika pointer == NULL (filenya hilang)!`,
          codeExample: `#include <stdio.h>\n\nint main() {\n    FILE *f_scan = fopen("database_ku.txt", "r");\n    if(f_scan == NULL) {\n        puts("Waduh, file databasenya musnah bro!");\n        return 1; // Keluar kode Error darurat terminal OS Code.\n    }\n    // Proses baca..\n    fclose(f_scan);\n    return 0;\n}`,
          initialCode: `#include <stdio.h>\n\nint main() {\n    FILE *baca = fopen("tidak_ada.txt", "r");\n    \n    // Cek IF pointer file itu adalah berstatus zonk / NULL (file hoax).\n    if (baca == NULL) {\n        printf("Gawat, File HOAX dicari tidak ketemu di Harddisk!\\n");\n    }\n    return 0;\n}`,
          solution: `#include <stdio.h>\n\nint main() {\n    FILE *baca = fopen("tidak_ada.txt", "r");\n    if (baca == NULL) {\n        printf("Gawat, File HOAX dicari tidak ketemu di Harddisk!\\n");\n    }\n    return 0;\n}`,
          hint: `Selalu siagakan if (baca == NULL) kalau buka tipe R! Print peringatannya.`,
          quiz: {
            question: `Apakah yang terjadi paling absolut kejam pada fungsi kerja OS sistem blok program sandi 'Read' ("r") di C language tatkala file ekstensi target yang dicarinya justru fiktif (Tak eksis nama file nya di path folder PC tsb)?`,
            options: [`Compiler C mencarikan dengan mendownload nama identik dari internet`, `Tiba-tiba otomatis membangun baru sebiji fle kosong agar scriptnya tidak sedih`, `Fungsi Pointer Stream auto-mereturn value NULL point Exception (Bahaya bila dibiarkan tanpa dicegah manual penanganan IF oleh developernya).`, `Browser OS mati shutdown restart memori cache dump biru.` ],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Gawat, File HOAX dicari tidak ketemu di Harddisk!\n`, description: `Mendeteksi kelancaran file null system blok R access permission violation trap test logger C stream text reading OS platform null route` }
          ],
          validationRules: [
            { pattern: `==\\s*NULL`, message: `Validasi error Null Check if harus ditancapkan! if (baca == NULL)`, shouldExist: true }
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
      title: 'Dasar Dinamis & Type Mapping Python',
      lessons: [
        {
          id: 'py4-l1',
          title: 'Pendahuluan Singkat Typeless Moderen',
          explanation: `Python lahir menantang bahasa purba sebagai bahasa tingkat tinggi paling ringkas kodenya dan super "pemaaf." Scripting ber-ideologi DRY.\n\n**Dynamic Typing Ajaib:** Tipe data tak butuh deklarasi tertulis absolut kaku di nama variabel (Bye perbudakan kasta 'int' atau 'char' compiler C/Java!). Sistem interperter mutakhir AI-nya nebak dan menetapkan jenis tipe data otomatis sedetik ketika variabelnya tertimpa isian valuenya saat kode tersebut me-running interpreter runtime.\nKamu ketik murni langsung: 'nama_kucing = "Bobby"'`,
          codeExample: `jumlah = 100 \ntandanya = "Ada Orang" \naktifkah = True \nprint(jumlah, tandanya, aktifkah)`,
          initialCode: `# Buat deklarasinya var nya bebas\n# Bikin variabel kota dengan tipe string tulisan "Jakarta"\n# Cetak string tsb pake print biasa\n`,
          solution: `kota = "Jakarta"\nprint(kota)`,
          hint: `Ketik langsung: kota = "Jakarta" (Lalu dilanjutkan di enter baru print(kota))`,
          quiz: {
            question: `Tak selayaknya bahasa C tua nan kaku, Anda tak harus repot memproklamirkan kewajiban awalan 'int' atau 'char' sewaktu menciptakan list nama var data. Python memberikannya gelar spesialis canggih yang disebut fitur mutakhir...?`,
            options: [`Auto Magic Script Predictor Engine`, `Dynamic Object Class Reference Allocation System`, `Static Explicit Compiling OS Bypass Route Level`, `Dynamic Typing System Interpreter (Pengetikan Bebas Deklarasi)`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Jakarta\n`, description: `Testing dynamic object instance text` }
          ]
        },
        {
          id: 'py4-l2',
          title: 'Konvensi Boolean Sensitif (Kapitasi Mutlak)',
          explanation: `Semudah mudahnya Python, ia tetap memiliki 'Keanehan' pemaksaan aturan Case Sensitif absolut mutlak yang mematikan program jika dibiarkan:\nPada pilar tipe logikal data **Boolean**, Python tidak menerjemahkan tulisan abjad kecil 'true' ataupun 'false' bawaan Javascript atau C++..!\n\nUntuk menetapkan bahwa ini merupakan logika status nyata yang divalidasi mesin mesin if... Penulisannya **WAJIB MUTLAK membesarkan (mengkapitalkan awalan)** awalan huruf param tsb menjadi 'True' dan 'False'. Jika membandel, ia akan dikategorikan sebagai string teks tidak logis atau missing variable.`,
          codeExample: `mode_admin = True\npesan_bacaan = False\nprint("Status mode panel:", mode_admin)`,
          initialCode: `# Deklarasikan logis.\n# Bangun nama variable power_system dan setting saklar valuenya menyala / Benar utuh pada boolean asli Py.\n# Teruskan mencetak print(power_system) !\n`,
          solution: `power_system = True\nprint(power_system)`,
          hint: `Tulis power_system = True dengan huruf T super besar di depan!`,
          quiz: {
            question: `Apakah parameter krusial dari penerapan bahasa per-Scripting logis type data Boolean yang menahannya/membayangkannya dari gaya nulis bebas C++ / Java atau JS klasik, dan mewajibkannya harus ber-identitas tulisan aneh/unik pada Python compiler nya ini?`,
            options: [`Tidak mendukung Boolean sama sekali alias dipayungi Integer (0 dan 1)`, `Wajib pakai fungsi bool() di depan namanya.`, `Harus Memulai penulisan absolut dengan huruf karakter awal (Pangkal) Super Besar Kapitalisasinya contoh: 'True' / 'False'. Kesalahan awalan kecil bikin logic Error exception null crash var!`, `Boolean hanya boleh untuk string text.` ],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `True\n`, description: `Test boolean validation sensitive casing capital rules in syntax formatting engine parse log log python compiler mode logic check logis boolean system log trace output terminal result!` }
          ],
          validationRules: [
            { pattern: `True`, message: `Boolean bahasa Python mutlak wajib kapital berawalan T besar: True.`, shouldExist: true }
          ]
        },
        {
          id: 'py4-l3',
          title: 'Seni Type Casting Konversi Paksa Bebas (String > Int)',
          explanation: `Dalam keseharian Coder Python.. Kerap kali Python minta tuntutan kepatuhan logis saat memadukan format matematis campuran tipe antar text-string angka dan integer number murni math logic kalkulasi.\nTidak mungkin Python nekat "menambahkan" kalimat tipe string teks '"10"' dan nomor kalkulator absolut '2'. Di Javascript hal ini bebas jadi concatenate "102". Di python? CRASH TypeError Exceptions!!\n\nUntuk mensahkannya, Gunakan *Cast (Konversi Paksa)* alat sakti fungsi perubah:\n- 'int()': Jebak string atau angka desimal jadi integer Bulat murni bebas pecahan.\n- 'float()': Bongkar data ke Presisi Desimal Koma angka.\n- 'str()': Merangkai integer math logic nomor jadi teks string cetakan literal kaku tulisan nomor banal.`,
          codeExample: `angket_angka = "5000"\nnilai_riil = int(angket_angka)\nprint(nilai_riil + 500) # Kalkulasi bersih keluar math result 5500`,
          initialCode: `jumlah_karung = "150"\n# Instruksi Cast: Anda harus mem-print memanggil pengali matematika operasi kali ( * 2 ) ke object var array var jumlah_karung tersebut SETELAH mensucikannya jadi int integer int()!\n`,
          solution: `jumlah_karung = "150"\nprint(int(jumlah_karung) * 2)`,
          hint: `Jalankan operasi casting param: print(int(jumlah_karung) * 2)`,
          quiz: {
            question: `Aplikasi function perantara built-in apa yang digunakan memuluskan konversi pemaksaan string text angka berformat 'text' menjadi ke dalam kalkulasi Integer Angka mesin bulat sempurna perhitungan matematis presisi tanpa Error TypeError?`,
            options: [`chr() ASCII`, `str() cast operator parsing parser limit string engine memory bytes type number class string list.`, `long() type 64 bit bypass override.`, `int() Function Konversi Bulat Integer`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `300\n`, description: `Menilai apakah hasil casting int() tembus matematika ganda logic calc py func param block.` }
          ]
        }
      ]
    },
    {
      id: 'py4-m2',
      title: 'Operator Moderen nan Puitis Pythonic',
      lessons: [
        {
          id: 'py4-l4',
          title: 'Aritmatika Khusus Bebas (Pemangkatan Khusus)',
          explanation: `Sembari berpedoman pakem format dasar kalkulator matematika C (+ - / * %), Python mendobrak kerangkeng dan menciptakan shortcut operator berkelas efisien tingkat tinggi khusus Aritmatika Pemangkatan Murni.\n\nPemangkatan Aritmatika murni di python langsung ditulis menggunakan metode sakral '**' bintang ganda. \n(Misal contoh skrip: '10 ** 3' berarti murni diolah sepadan angka matematika sepuluh dipangkatkan nilai Tiga yang otomatis result hitung kalkulasinya menelurkan angka bersih 1000). Tanpa butuh import library canggih ribet seperti <math.h> ala purbakala syntax lama C!`,
          codeExample: `print(5 ** 2) # Eksekusi kilat Lima Pangkat Dua hasilnya adalah lurus 25!\nprint(3 ** 3) # Bernilai output 27`,
          initialCode: `# Operator Unik Python Practice Power!\n# Lakukan print memunculkan angka hitung presisi bersih eksekusi nilai kalkulator matematika dari nomor 2 (Dua) pangkat 4.\n`,
          solution: `print(2 ** 4)`,
          hint: `Murni kerjakan matematika python sintaks hitung 2 ** 4.`,
          quiz: {
            question: `Operator pengganti nilai khusus library rumit Math dan function eksponensial di bahasa structural pemrograman kuno saat diformulasikan ke format shortcut Python kalkulasi diwakilkan via tulisan kode rahasia apa?`,
            options: [`Simbol Panah Atas Logic (^) Bitwise xor bypass trick`, `Function built-in pow() saja.`, `Tanda Silang (x) math.`, `Simbol Penggandaan Bintang Ganda / Asterisk Pair ( ** ) Mutlak.`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `16\n`, description: `Test kalkulasi presisi pemangkatan eksponensial math logic murni param func terminal var block engine py result trace test` }
          ]
        },
        {
          id: 'py4-l5',
          title: 'Menyingkirkan Robotik Logic & Memeluk English Words',
          explanation: `Di Python, sintaks logikal "Gerbang Perbandingan Pemilihan Rute Kompleks" mendeskreditkan dan merombak habis tata aturan purbakala bahasa C/C++/Java yang kerap menjejali programmer awam dng deretan huruf robotik membingungkan ('&&', '||', '!').\n\nPythonic Logic mengecam gaya robotik dan meyakini prinsip 'Readability Counts'. Maka sistem kompiler Python menerjemahkan kebenaran absolut multi komparasi rute ke dalam struktur murni kata sifat kamus tata bahasa inggris tulen (English Words) berhuruf kecil semua. Yaitu kata ajaib: **'and'**, **'or'**, **'not'**.`,
          codeExample: `peserta = 1\nkartu_vip = True\nif peserta == 1 and kartu_vip == True:\n    print("Berhak mengkonsumsi Kue Bolu Premium")\n# Sedangkan lawan membalik negasi Not Logis !x diubah menjadi:\nprint(not False) # Langsung di compiler ngeprint True balikan!`,
          initialCode: `# Logikal Praktisi English Sentences Cerdas Python.\n# Berikan kalimat statemen logic sederhana operator AND:\n# Cetak panggil fungsi print() yang di dalamnya memakan evaluasi data: True and True\n# (Keluaran console pastilah auto jadi string "True" di layarnya).\n`,
          solution: `print(True and True)`,
          hint: `Bungkus tulisan keyword literal logis print(True and True)`,
          quiz: {
            question: `Penerapan revolusioner operator logika penyangkal/membalik keadaan mutlak kondisi true-false di otak compiler mesin python modern yang membumihanguskan pemakaian simbol tanda seru buangan komparasi (!) digantikan dan difungsikan menjadi perintah diksi teks apa?`,
            options: [`nO`, `False`, `not`, `negative`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `True\n`, description: `Pengingat logis dan implementasi gerbang the truth logic string base and py engine trace terminal truthy operator literal dict function word evaluation text syntax true!` }
          ],
          validationRules: [
            { pattern: `and`, message: `Lupa mencantumkan gerbang english grammar logic!`, shouldExist: true }
          ]
        },
        {
          id: 'py4-l6',
          title: 'Operator Unik Pembanding Setetara Ekstra "IS"',
          explanation: `Berhati-hatilah kalian pengabdi komparasi '==' (Sama Persis nilainya / Equity Check).\nPython memperkenalkan satu monster ekstra spesifik yaitu Operator Identifikasi **'is'**!\n\nPerbedaan Mengerikan:\n- '==' (Equality check) hanya memeriksa apakah BENTUK BACAAN VISUAL nilai var A dan var B nilainya keliatan tulisan karakternya tampak 100% kongruen kembar / serupa nominal di layar kertas. (Contoh A = [1] dan B = [1], maka A == B adalah Terbukti Benar).\n- 'is' (Identity check) turun level sampai ke pengecekan "ALAMAT MESIN LOKASI HARDDISK/RAM" apakah mereka memang benda ciptaan kembar siam dari wadah memori sel persis yang sama? (Contoh A = [1], B = [1] dengan wujud pointer object list yg diciptakan pisah, maka A is B adalah SALAH BESAR krn slot memori berlainan biarpun isinya sejodoh visual!!).`,
          codeExample: `a_list = [500]\nb_list = [500]\n# Visual Teks Mereka Kembar Isinya? IYA bener sama-sama isi string bilangan text array satu.\nprint(a_list == b_list) # True\n# APAKAH list A nempel / mencaplok alamat kapling rumah tanah memori yang sama persis seperti List B object? BUKAN!\nprint(a_list is b_list) # False mutlak (Terkecuali jika b_list = a_list di set manual alamat assignment reference memory salinnya!)\n# Aneh kan? Inilah bahaya IS!`,
          initialCode: `# Eksperimen Uji Coba Cerdas Python Is / Equity Logic.\nlist_satu = [1]\nlist_dua = [1]\n# Tantangan gampang: Print uji relasi is memori list_satu is list_dua (pasti tercetak false).\n`,
          solution: `list_satu = [1]\nlist_dua = [1]\nprint(list_satu is list_dua)`,
          hint: `Murni di eksekutor param func blok print() sisipkan pembanding logic string word "is" antar variable-nya.`,
          quiz: {
            question: `Operator komparasi anomali 'is' di python compiler ditugaskan hanya mengevaluasi kondisi kebenarannya (Truthy) berasaskan patokan parameter indikasi perbandingan apa pada sisi backend arsitektural mesin logic-nya?`,
            options: [`Membandingkan dan mencek murni keselarasan jumlah visual nominal angka huruf string valuenya tok, bukan bentuk memorinya.`, `Murni menebak ukuran size bytes data size payload text list memory byte class string text.`, `Mengecek tipe data identitas typeof murni kelas turunan objek warisan statik inheritance list.`, `Identitas Lokasi Pointer Memori Address. Menyatakan Benar cuma ketika kedua pengikat nama variabel itu secara absolut nyata-nyata menunjuk mereferensikan satu lokasi sumber kapling obyek wujud memori blok RAM sel identik yang sama tiada dua/bercabang duplikat di belakang layar kompilernya.` ],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `False\n`, description: `Test identity operator logic memory address trap diff` }
          ]
        }
      ]
    },
    {
      id: 'py4-m3',
      title: 'Tingkat Mahir Dynamic Input/Output (I/O)',
      lessons: [
        {
          id: 'py4-l7',
          title: 'Sihir input() String Absolut Input Interaktif Prompt User',
          explanation: `**Mengambil Interaksi Cerdas Terminal CLI via 'input()':**\nSistem native CLI I/O built-in serapan input() Python memiliki arsitektur menakjubkan yang mutlak tidak memerlukan sintaks \`<stdio.h>\` ataupun repot menyiapkan alokasi alamat \`&var\` macam C usang.\n\nFungsi ini seketika menyimulasi pencetakan prompt layar interface instruksi teks panduan panduan prompt secara SUPER LANSGUNG praktikal instan di dalam kurungan param fungsinya kelak. \nNamun Awas Warning Keras: Output pengembalian / kembalian dari rahim method fungsi prompt 'input()' ke arah variabel penyambutnya ini selalu dan MESTIKALAH mutlak dilempar dengan bungkus struktur **"STRING TEXT MURNI"** di awal, walau jari si user nakal menggetikan list nombor numerik 123 juta sekalipun!`,
          codeExample: `nama = input("Tulis Namamu Bos: ")\nprint("Terdaftar Bos: " + nama)`,
          initialCode: `# Ketik dan panggil sistem command prompt input() yang param di layar string literal panduannya menanyakan persis tulisan text: "Masukan text: "\n# Tangkap operan dan return nilainya tampung masuk dalam wadah ke variabel nama var logik bebas semisal 'jawaban'.\n# Cetak konfirmasi balik memanggil display teks -> print(jawaban)\n`,
          solution: `jawaban = input("Masukan text: ")\nprint(jawaban)`,
          hint: `Selipkan pendaratan memori penampungan return function ke assignment logic variabel ( cth: x = input("Tulis...") ).`,
          quiz: {
            question: `Apakah default base jenis kerangka rupa tipe kemasan data mentah rahasia mutlak yang senantiasa absolut diproduksi balik (returned outputted type object val format system var return) sesaat seusai menjalankan instansiasi fungsi system function 'input()' di Python Console Interpreter biarpun operator end usernya ngotot ngetik mengetikkan tombol murni angka hitungan math calculator 0 s/d 9 pada mesin GUI prompt terminal UI-nya?`,
            options: [`Format Data Array Block Bytes mentah IO OS Windows / UNIX.`, `Berubah bunglon konversi Cerdas secara ajaib auto-casting compiler menebak menerkal Memprediksi hasil Bisa berupa format real math logic Integer Ataupun hitungan akurasi desimal Float pecahan seiring kesesuaian jejak sidik angka ketikan dari papan keyboard console form gui command OS terminal log sys process.`, `Selamanya auto dibekukan (frozen) dan dipaksakan ditranslate/dioper dikembalikan ke pelukan var menjadi kemasan bentuk kerangka wujud arsitektur Text Tipe List String ("") huruf banal layaknya kalimat prosa puisi novel literal teks murni mentah-mentah konstan di compiler memori RAM OS python base app trace terminal byte exec stack format var log. `, `Pengecekan logika Boolean konstan error null return check boolean test flag False. Return array buffer stream size bits bytes buffer test class object return var. False true state function test list py logic check format system os.` ],
            correctAnswer: 2
          },
          testCases: [
            { input: `Hallo Server`, expectedOutput: `Masukan text: Hallo Server\n`, description: `Output evaluasi mesin simulasi input mock IO OS py param test func literal terminal bot!` }
          ]
        },
        {
          id: 'py4-l8',
          title: 'Cast Berkelanjutan Kombosisi Angka Murni Dari Input Prompt',
          explanation: `Dalam praktek real dunia pengembangan web logic, menyadari bawa input dilempar mentah berupa 'String' adalah bencana jika niat pemrogram hendak ngekalkulasi PPN/Diskon Pajak di nilai input tsb! (Error "Cant multiply seq by non-int of type str")\n\nPenyelesaian elegan satu baris ala Pythonista: Kita mutlak "Melabuhkan/Membungkus Fungsi" dari hasil Return 'input()' masuk ke dalam liang rahim paramter fungsi pengonversi perantara integer bulatan murni ('int()') SEBELUM nilai tersimpan kaku membusuk ke disk memori variabel tujuannya!\nSyntax legendaris gabungannya (Chain call inline function) berformat: \n'umur_user = int(input("Ayo usia: "))'. Hasilnya dijamin 100% jadi num padat.`,
          codeExample: `# Jika User Ketik 10\nhitung = int(input("Uang Belanja Jajan: "))\nprint(hitung + 50) # Berbuntut aman melahirkan output math = 60`,
          initialCode: `# Instruksi Latihan Rantai Casting Berkelanjutan I/O Mutakhir:\n# 1. Deklarasi identifikasi var 'tahun_target_masuk', tangkap isinya lurus run dari prompt layar user dengan param isi "Wajib tahun lahir lu brp: " memakai rakitan rute chaining cast fungsi wrapper 'string->int()' method inline.\n# (Simulasi system virtual input bot C-Test AI kami di awan bakal nebak test run menyuntikkan form input mengisi nominal angka 2000 saat submit param command line ini)\n\n# 2. Print output operasi matematikal pengurangan (tahun_target_masuk variablenya tersebut DIKURANGI angka 5) secara mentah lurus polos pada blok print func.\n`,
          solution: `tahun_target_masuk = int(input("Wajib tahun lahir lu brp: "))\nprint(tahun_target_masuk - 5)`,
          hint: `Awali param dan kerudungi dengan kurung wrapper method raksasanya konversi murni seperti 'var_x = int(input("..."))'. Jangan luput operasi - 5.`,
          quiz: {
            question: `Apa penyebab terparah dari kejadian aneh ketika seorang developer menginstruksikan perkalian ganda "x = input('Uang: ') * 2" lalu di Run dan diketik nominal besaran uangnya adalah nilai '10', lalu program malah memprint hasil '1010' yang anehnya memanjang ke baris belakang ketimbang harusnya munculnya ekspektasi hasil matematika operasi ganda dari '20'?`,
            options: [`Memori compiler korup. Mengakomodasi auto overflow bit size class block object math trace bit num bytes float double float log string int cast num bit var byte pointer null trap error var func py logic float exception double struct pointer mem exception trap loop format param size null func terminal mem test block error system crash null.`, `Operasi matematika Python ter-glitch karena OS Windows limit math precision system IO processor cache string cast error bool test exception terminal format bypass trap exception list py py script func format test pointer sys var error traceback logic list bool.`, `Teks 10 nya berwujud array 2D matrix class structure object float double format bit array pointer byte loop int memory logic byte param terminal type OS pointer float format logic byte trace list structure buffer test string byte function pointer OS null.`, `Karena tipe awal natural penampungan angka '10' masih terdegradasi utuh masuk kedalam peranan list Teks String tulisan! Perkalian tipe deret String pada eksekusi math operator Python hanya bakal melipat-gandakan (mendemonstrasikan copy-paste concat text duplikasi strings text secara visual memanjang '1010') tidak menjalankan operasi math angka bilangan aslinya! Programmer itu terbukti KELUPAAN memberikan filter rakitan type caster parameter int() pada pembungkus prompt layar method pemanggil awal instansiasi param inputnya!`],
            correctAnswer: 3
          },
          testCases: [
            { input: `2000`, expectedOutput: `Wajib tahun lahir lu brp: 1995\n`, description: `Test virtual pengecekan rantai filter cast number integer logic string test bypass param math log py.` }
          ],
          validationRules: [
            { pattern: `int\\(\\s*input\\(`, message: `Filter Cast Int runtuh! Wajib Gunakan konstruktor raksasa int(input("..")) di awal.`, shouldExist: true }
          ]
        },
        {
          id: 'py4-l9',
          title: 'Template Cetak Keren Data F-String',
          explanation: `Zaman purba string python atau js memaksa programmer me-remix teks plus ('+') dengan ribuan list variabel, mengundang rentetan error space atau koma. Lahirlah: **F-String (Format String) Data Tool Formatter Modern Literals!**\n\nMekanika f-string menjembatani integrasi kalimat string quotes bersanding langsung diinterupsi oleh panggilan nama list variabel dinamis interpreter berantakan tanpa perlu koma liar pembantah (Concatenate var + dilarang mutlak). Taruh mutlak kata huruf Prefix magis karakter "f" atau "F" menempel di detik sebelum quote string pertama dirilis kompilernya 'f".."'. Ruang kosong panggilan perantara variabel di dalam kalang bungkus teks kutipannya di injeksi lewat bracket kurung kurawal '{nama_variable_kamu_di_sini}'.`,
          codeExample: `nama = "Rizal"\njob = "Dev"\nprint(f"Info detail pegawai kita {nama} jabatannya {job}!")`,
          initialCode: `# Bangun variabel var_id dan berikan assignment nomor id bertipe 66 murni.\nvar_id = 66\n# Pakai print output pemanggilan syntax literal F-String prefix 'f' agar tulisan murninya tersambung dinamis merangkai kalimat kombo utuh hasil akhir string: "Nomor registrasinya adalah: 66 ya"\n`,
          solution: `var_id = 66\nprint(f"Nomor registrasinya adalah: {var_id} ya")`,
          hint: `Terapkan kerangka f"...{var}..." persis panduan.`,
          quiz: {
            question: `Dimanakah letak legal absah peletakkan kunci pemicu magic karakter literal prefix tulisan huruf spesifikasi "f" nan ghaib peruntukannya bagi mengaktifkan kemampuan super injeks interpolasi String F-string Formatter variables ini di body arsitektur function instruksi parameter print() kompilasinya? `,
            options: [`Digantung di blok dalam kurung kurawal nama identifier variablenya {f(nama)}.`, `Diposkan di buritan akhir ekor sesudah quote penutup var print("..."f).`, `Diwajibkan bertengger Murni LURUS di awal terluar barisan sebelum (di luar/nempel mendahului persekian mili detik batasnya quote pembuka awalan) penulisan baris kutip string pertama. Contoh: print( f"..." ). Biasa juga dipanggil interpolasi awalan prefix magic operator python param list byte type test pointer bool var error exception sys.`, `Diblok pakai method terpisah .format_F()` ],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Nomor registrasinya adalah: 66 ya\n`, description: `Test f string templating format text render output format py byte obj string list.` }
          ],
          validationRules: [
            { pattern: `f["'].*\\{var_id\\}.*["']`, message: `Validasi format pengeluaran teks hancur! Prefix f-string modern literal di blok function call argument gagal dipanggil.`, shouldExist: true }
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
  description: 'Python Control Block Rule: Regulasi indentasi spasi blok ekstrim, fungsi logic per-rute-an percabangan kompleks If-Elif-Else berkesinambungan tanpa henti, pembongkaran skema literasi array For loop, plus Def Function.',
  modules: [
    {
      id: 'py5-m1',
      title: 'Hukum Suci Indentasi Blok Percabangan',
      lessons: [
        {
          id: 'py5-l1',
          title: 'Regulasi Kuat Tanda Titik Dua (:) & Indentasi Tab',
          explanation: `Python dengan arogan **melepaskan paksa total runtinitas kuno penjara blok penjepit Kurung Kurawal C '{}'** serta membebaskan sirkus kepenatan pengetikan tanda bungkus tanda kurung parentesis di gerbang utama pernyataan statement Kondisinya.\n\nSebagai kompensasi penggantinya demi tahu mana ujung body block logic, Python mewajibkan pengawalan dan pendeteksian titik gerbang eksekusi barisan blok instruksinya menggunakan notasi gerbang ajaib **Titik Dua (':')** yang melayang nangkring di bagian ekor deklarasi pernyataan statement 'if' atau 'while' mu.. \nTak cukup sampai disitu, lahirlah **Hukum Indentasi Mutlak**: Apapun isian anak cucu rincian instruksi rentetan program code body logic di dalam kepemilikan sub-blok if tsb mesti di **Tab / spasi kosong sejauh 4 pijakan huruf**. Rata baris lurus menyamping ke arah masuk kanan! Tidak mematuhi rute rata identasi yang selaras ini akan memberondong developer berakibat kehancuran Compile error maut (IndentationError) seketika!.`,
          codeExample: `bensin = 2\nif bensin > 10:\n    # Blok dalam menjorok tab kanan\n    print("Level Lolos")\n    bensin -= 1\n# Dibawah sini, ini udah keluar if dan menata baris ke dinding kiri asal.\nprint("Done Lolos")`,
          initialCode: `angka = 10\n# Susun kondisinya:\n# Bikin jika angka > 15 cetak "Kelebihan"\n# Kalo salah tidak eksekusi tapi print line terpisah (bloknya harus digeser diratain balik ke tembok kiri ujung blok main script indent tanpa sub blok spasi) untuk ngeprint kalimat "Selesai" mutlak bebas IF.\n`,
          solution: `angka = 10\nif angka > 15:\n    print("Kelebihan")\nprint("Selesai")`,
          hint: `Harus lurus: if angka > 15: => lalu Tab indent printnya.. lalu tarik ulang rata tembok layar kiri buat print 'selesai' ujung.`,
          quiz: {
            question: `Sewaktu programmer lengah abai (kebablasan ngetik / typo rata baris code/tercampur tabs spasi ga jelas formatnya) dan gagal menyejajarkan tab ketukan space identasi di suatu himpunan baris tubuh/body blok skrip pernyataan di sub-blok IF percabangan logic milik program syntax interpreter OS python compiler ini, petaka maut error runtime system jenis apalah dari trace kernel compiler yang langsung sigap menyambar memberhentikan aplikasi dan memberikannya hukuman paksa eksekusi penolakan exception?`,
            options: [`TypeError Mismatch Output Memory Array Bytes Stack Loop Boolean Value Float Check Integer OS Limit Logic System Trace List Error Param OS Linux Kernel Panic Exception Trace Null Point False Route Pointer Bug Test Byte Function Format Variable Type. `, `SyntaxError Lacking Quotes Block String Missing Trace List OS Test Byte Null Trap Byte Bug Integer Boolean String Test Float Form.`, `Memory Exceed Overflow Pointer Trap System OS.`, `IndentationError: expected an indented block (Hukuman Mutlak Keselarasan Spasi Kosong) yang menggagalkan eksekusi total system compiler py parser OS limit syntax tree memory block trace err var py module file code.`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Selesai\n`, description: `Test kelolosan escape unindent format spacing body block logic routing out py file exec test block` }
          ]
        },
        {
          id: 'py5-l2',
          title: 'Komposisi If dan Else Biasa',
          explanation: `Percabangan sederhana murni di Python hanya bertumpu pada biner pilihan hitam / putih.\n- 'if': Pembuka pintu kebenaran pertama. Jika kondisi yang dipaparkan adalah terjamin True seutuhnya, ruang isian script block ber-indentasi milik si pangkal 'if' tersebut langsung dieksekusi mesin. Jika kondisinya cacat False/Salah.. compiler santai tak berkutik skip acuh tak acuh dan diam melompati rute isinya!\n- 'else:': Berposisi sejajar di barisan yang persis ditarik keluar kembali ke pangkal awalan dinding yang sama dengan kepala 'if' nya. Instruksi 'Else' merupakan gerbang buangan / tong sampah mutlak terakhir penyelamat rute alur eksekusi apabila si penguasa kondisi statement 'if' atasnya mentah-mentah DITOLAK status kondisinya oleh dewan kompilasi penilai True/False!. (Syarat wajab: 'Else' haram hukumnya dikasih pengecekan prasyarat tambahan condition di pantat parameter teks deklarasinya!!)`,
          codeExample: `waktu = 10\nif waktu < 12:\n    print("Masih Pagi Booz.")\nelse:\n    print("Sudah Agak Siang Menjelang nih.")`,
          initialCode: `angka = 9\n# Bikin logika pengecekan tunggal genap ganjil pakai hitungan modulo mod (%). Sisa bagi jika dibagi operand 2. Modulonya itu kan pakai % !\n# Jika angka modulus 2 perbandingannya sisa sama_dengan 0, cetak genap.\n# Alternatifnya else: otomatis pasti genap? ganjil kan :D , Cetak ganjil.\n`,
          solution: `angka = 9\nif angka % 2 == 0:\n    print("Genap")\nelse:\n    print("Ganjil")`,
          hint: `Cukup simple logika C di py: if angka % 2 == 0: -> cetak dan else nya di luar identsnya -> cetak.`,
          quiz: {
            question: `Mengapa pada kerangka tata baku susunan blok parameter perumusan deklarasi gerbang pengakhir 'else' secara nyata dilarang dan diharamkan total bagi programmer menambahkan statement komparasi logika imbuhan param syarat evaluasi condition condition logic var penguji semisal 'else x > 200:' melampiri ekornya, sehingga hanya saklek ditutup sebatas titik dua tok 'else:' di python? `,
            options: [`Memperlambat memory clock rendering system var pointer list loop array.`, `Compiler auto memanggil destructor C++ C Memory OS system call block byte list array trap null pointer.`, `Karena peranan Else esensinya didesain murni memang ditujukan untuk jadi saringan penjebol sampah terakhir wadah alternatif mutlak (Catch-All) bilamana kumpulan sisa-sisa syarat if konstelasi hirarki filter kondisional blok pendahulu di level atasnya sudah ditolak kandas alias berguguran status valid True nya semua, sehingga sungguh tak logis dan mustahil error jika masih diuji tes evaluasi logic lanjutan lagi di dalamnya, murni memborong jalur takdir sisa var bool check struct list err py list array trace param block func type format.`, `Error boolean check false sys int float trap err array exception var struct py module memory leak bool.`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Ganjil\n`, description: `Testing parity basic routing log engine test block string cast output bool py trap logic system memory block route var param exception format.` }
          ]
        },
        {
          id: 'py5-l3',
          title: 'Elif: Paralel Opsi Kondisional Berkepanjangan Bertingkat',
          explanation: `Suatu kondisi sering kali bukanlah Dualisme Hitam Putih biner semata.\nMenyisir range skala IPK atau menu ID dari puluhan deret opsi? Anda mengandalkan fitur sambung rute kondisional **'elif' (Singkatan akronim elegan dari Else-if)**. Python melenyapkan keborosan diksi 'else if' purba C/Java untuk menghemat ngetik jari jemari developer elitnya.\n\nPengecekan berkelanjutan ini dirancang menempatkan prosesor kompilernya murni memeriksa antrian kondisi hierarkis rentang prasyarat evaluasinya secara paralel berurutan tegak lurus mendaki dan menurun dari awalan kepala blok paling puncak hingga ke cabang turunan paling anak bawahnya. Jika kelak satu kondisi rute poin evaluasi tertembak cocok / Valid mencapai skor poin nilai True di tengah rute jaringannya.. sisa berderet-deret anak cabang komparasi rute 'elif' lain di bawah posisinya dan pos rute ekor 'else' otomatis seketika diboikot buta, diloncati acuh bebas hambatan dan program membebaskan memorinya kabur keluar dari rute keseluruhan blok percabangan kompleks hirarkis itu! `,
          codeExample: `skor_kemenangan = 85\nif skor_kemenangan >= 90:\n    print("Medali EMAS A")\nelif skor_kemenangan >= 80:\n    print("Medali PERAK B") # Akan Murni Menang Terpanggil yang Ini Saja!\nelif skor_kemenangan >= 60:\n    print("Medali PERUNGGU C")\nelse:\n    print("Gagal Medali Total Kosong.")`,
          initialCode: `angka_uji = 10\n# Susun kondisinya beranting rentet:\n# Bikin rute awal jika angka_uji > 15 cetak "Angka Besar"\n# Pakai sisipan penyambung elif untuk mencek rute cek kembali secara urut lurus ke bawah: jika angka_uji > 5 cetak string bernada "Angka Sedang"\n# Gunakan penadah mentok else buat cetak pamungkas kata default "Angka Kecil"\n`,
          solution: `angka_uji = 10\nif angka_uji > 15:\n    print("Angka Besar")\nelif angka_uji > 5:\n    print("Angka Sedang")\nelse:\n    print("Angka Kecil")`,
          hint: `Ingat susun lurus vertikal ke ujung tembok format per-indentasi if.. lalu ratakan dgn elif ..dan pungkasi dng else:`,
          quiz: {
            question: `Kata singkatan sambung alias jembatan transit per-rute-an ke 2 atau posisi penengah paralel berderet blok rentang pada rancang kode sintaks percabangan seleksi panjang komprehensif kompleks logikal perbandingan Python itu dibakukan seragam mutlak di engine compiler bahasanya sebagai susunan ejaan singkat text apa?`,
            options: [`else if (Persis C)`, `elseif (Gaya PHP)`, `if-2 (Next Gen Logic)`, `elif (Else If Singkatan Py)`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Angka Sedang\n`, description: `Test tembusan validasi di route anak jaringan elif menengah nilai logic fallback default val int param logic err trace system output test array float bool struct err string test int eval if block py format script loop format var block.` }
          ]
        }
      ]
    },
    {
      id: 'py5-m2',
      title: 'Lingkaran Putaran Perulangan (Loops)',
      lessons: [
        {
          id: 'py5-l4',
          title: 'Metodologi For-Loop Generator List dan Indeks Limit Range()',
          explanation: `Python mendesain pemecahan iterasi For looping itu serba magis, canggih terorganisir tak perlu repot muter-muter ngetik int x =0; x<..; kaku ala bapak moyangnya!\nSang iterasi FOR Python sekadar dipasangkan berselingkuh menyusuri pelacakan array list / perabotan mesin per-angkakan massal yang diatur, dijepret cantik mendadak di awang-awang dengan mesin fungsi generator batas memori limit mutlak pembangkit iterasi angka **'in range(batas_start_awal, batas_stop_akhir, titik_lompat_pijakan_step_interval)'**.\n\nKarena dijamin ketapel rentang iterasi pembatas angkanya di engine, alat pamungkas Loop Range() dinobatkan disebut instrumen kelompok *Counted Loop (Struktur Perulangan Cerdas Terukur Limitasi Pasti)* karena secara limitasi kepastian jaminan perlindungan mutlak, Angka langkah eksekutor hitungan memori list deretannya dijanjikan kompiler **PASTI bergaransi bakal memutus gas berhenti ter rem otomatis TEPAT SEDETIK SEBELUM** ia kelabakan menyentuh melanggar nyepak menyenggol menabrak batas angka mutlak "stop" nya yang sakral (Konsep pembatasan Iterasi index statis batas akhir selalu Stop_minus_1 / Exclusive Limit Rule Upper Bounds Logic Algorithm!).`,
          codeExample: `for urutan in range(3):\n    # Mencetak perulangan panggil string text perintah console loop sebanyak step urutan index 0, lalu lanjut ke urutan 1, dan Terakhir mentok menabrak rem henti perulangan dieksekusi di limit urutan index id ke-2 belaka (Murni karena Batas parameter func Range = 3 tak tersentuh). Total print utuh 3X kemunculan string visual.\n    print("Proyek Lolos Sukses!") `,
          initialCode: `# Bangun rentetan konstruksi blok deklarasi iterasi pengulangan memakai metode format kalimat pakem "for i in range" berjumlah settingan kepastian mutlak sejumlah 4 kali/putaran putaran print out batas logic nya.\n# Di ruangan selorok baris Blok yang menjorok indent spasi ke kanannya, silahkan kamu diam-diam menaruh beban panggulan perintah lemparan eksekusi function print() mencetak string berisi ("Ulang-ulangi Dong")!\n`,
          solution: `for i in range(4):\n    print("Ulang-ulangi Dong")`,
          hint: `Minta kamu nulis baris tunggal loop for i in range(4): => Dan diposkan menyusup di bawah ter-indent indentasi kanan selorok ruang taruh cetakannya pakai print.`,
          quiz: {
            question: `Misalkan tertulis statement skrip rakitan literasi blok arg baris perputaran putaran statik rentang nilai instruksi function 'for n in range(0, 10):'. Berdasar arsitektural memori Python bounds range exclusive limitation limits engine parameter bounds block, maka pastilah pada pendaratan perputaran titik urutan hitungan langkah eksekutor indeks internal eksekusi array step list index ke nomor berapakah literasi siklus repetisi baris baris ini mendadak bakal diinjak rem distop mati terputus total paksa, mengakhiri blok membiarkan lajunya mengalihkan urutan eksekusi memori keluar instruksi selanjutnya dengan bebas di python sys compiler output tracer OS system var param bool loop float test bypass trace trap block script logic struct list array terminal console string byte pointer limit?`,
            options: [`Lanjut putaran urut sampai menyentuh menabrak nyentuh dan berhenti di rute angka limit 11. (Index Over Bounds Exception ByPass Memory Limit)`, `Infinite looping ngeblank error ngeloop OS nge-crash system overflow traceback crash error pointer OS linux kernel trace system block test.`, `Lolos Hitungan menjejakkan angka persis berhenti di index urutan loop id ke 10 dan berjalan mencetak nilainya penuh utuh mantap dilayar console terminal.`, `Meskipun angkanya memuat nominal limit tulisan text param 10 aslinya di kurung fungsi... Eksekusinya secara cerdik/ajaib di rem auto-tertutup diblokade mendadak distop dimatikan utuh (stop_limit_reached_exclusivity bounds protection constraint algorithm check engine log compiler flag test OS module error mem sys) ditarik putus tali kendalinya tepat sedetik saat listnya baru memegang pijakan pencapaian mencetak index angka mentok menembus poin hitungan maksimal mentok di titik angka nilai index ke-9 murni!!! Angka parameter batas 10 nya dicampakkan mutlak tak terbaca diluberkannya dibuang total (Limit tak dicetak) !! Hentian Exclusive.`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Ulang-ulangi Dong\nUlang-ulangi Dong\nUlang-ulangi Dong\nUlang-ulangi Dong\n`, description: `Test validasi loop perputaran range constraint exclusive memory bounds limit logic bot format var mock param sys trace int py log script trace array list format loop.` }
          ],
          validationRules: [
            { pattern: `range\\(\\s*4\\s*\\)`, message: `Fungsi perulangan harus menggunakan setting angka range(4)`, shouldExist: true }
          ]
        },
        {
          id: 'py5-l5',
          title: 'Resiko Bencana Infinite While Loop (Pengulangan List Uncounted)',
          explanation: `Iterasi kuno warisan cikal bakal While sesungguhnya sungguh amat disoroti *sangat-sangat rawan, licin, / riskan kelalaian error mautnya* karena sifat pola mekanisme kerja instruksial purba program While Loop control ini cuma mendasari dan murni menitikberatkan bertumpu mengeksplor ngecek pengujian syarat patokan kondisi nilai benar salah Boolean tok per putarannya di tebing ambang ranah perbandingan logika 'True Validation Engine Check Logic Status Truthy-Boolean Indicator Array Data' (Status sering dijuluki jenis rentetan alur pelacakan siklus buas memori memakan resource RAM membludak mutlak liar alias *Uncounted Loop Endless Trapping Trap Error Exception Out Of memory Check Limit Log Exception Memory Leaks Heap Exceeding Array Module* yg amat rakus memory jika salah tulis condition logic).\nSatu-satunya pakem mutlak agar skrip python ini selamat: Ia bisa Terus Terusan memanggil .. murni terus terputar secara terus menerus memutar gulungannya bak lingkaran iblis tiada unjung asalkan status pengecekan kriteria test parameter awal barisannya akan masih selalu disulap / bernilai masih konstan menyandang status kebenaran (Valid - True ) sepanjang waktu tidak diganggu gugat di logik pikirannya!\n \nGuna memberantas, Mencegah menghindari kiamat tabrakan limitasi RAM komputasi CPU membeku blank screen biru OS (*Fenomena Lag Infinite Lag Leak Loop Trapped Bug System Exception Memory Overload OS Kernel Crash*) maka sudah diwajibkan bagi programer untuk selalu senantiasa berjanji sumpah memastitkan dan menyelipkan bahwa kita harus bersusah payah SELALU AWAS memasukkan suntikan penambah obat penawar dosis angka pergerakan limitasi mutlak yang difungsikan bertugas perlahan sadis menaikan/mengurangi memangkas batas nilainya valuenya statik var counter nya sendiri di tebing akhir rentetan indentasi di bawahnya sana (\`contoh baris eksekusi penyetop : y += 1 ATAU penurun angka n -=1 mutlak\`) di dasar ruangan identasi kamar akhir perulangan skrip ini secara murni disisipkan paksa inputan baris pendorong manual developer compiler bot logic math operand assignment var ini... dengan jaminan mutlak agar di batas putaran detik kesekian limitasi akhirnya syarat kondisi di puncak pengujinya kelak tercungkil jebol ternodai dan meletup patah lalu hancur akhirnya termanipulasi sukses berganti menjadi berpredikat menyandang nilai kalkulasi ( Finish False limit breached)!.. Lalu system legah berhasil kabur lompat break! `,
          codeExample: `timer_waktu = 1\nwhile timer_waktu <= 3:\n    print(timer_waktu)\n    timer_waktu += 1 # WARNING CRITICAL HARUS DAN MUTLAK ADA! Tanpa suntikan baris keramat penggerak loop ini, value 1 membusuk tak berubah lalu angka 1 pasti akan terus-terusan logisnya mendiami logika statement "nilainya selalu tak diragukan lagi bakalan 100% lebih kecil daripada angka batas 3 selamanya mutlak!!". Alhasil: MEMORY CRASH LIMIT LOOP TAK TERHINGGA SAMPAI BLUESCREEN!!! `,
          initialCode: `y_counter_mundur = 1\n# Misi Utama Kamu Bro: Bangun Cetakan wadah putaran rakit while Loop iterasi mutlak di mana dipatok selama kelangsungan data evaluasi memory logic test cek variabel pembading uji y_counter_mundur disyaratkan masih bernilai <= 2 (kurang atawa sama persis dgn angka dualisme batasan dua). berjalan terus mengeksesusi mutar!\n# Beri perintah tempelan di blok indent spasi menjoroknya yaitu print output log per baris mencetak panggil pemuatan var parameter angka bulat integer (y_counter_mundur) per repetisi satu jengkal siklus putaran indent bloknya.\n# SANGAT AMAT TEGAS TENGAS DIPERINGATKAN AWAS CRASH ERROR SYSTEM, kelak kau selipkan jangan sampai musnah Increment step pergerakan dosis pendorong statik angka variable valuenya secara mutlak penambahan math logis tunggal di baris plng mentok dlm blok indentasi tsb (tulisan var nya dikombinasi logic y_counter_mundur += 1). JIKA LUPA = APLIKASI WEB KITA INI 100% MACET TOTAL MATI NGEHANG FREEZE! BUKTIKAN PRESTASIMU BRO.\n`,
          solution: `y_counter_mundur = 1\nwhile y_counter_mundur <= 2:\n    print(y_counter_mundur)\n    y_counter_mundur += 1`,
          hint: `Rakitan while y_counter_mundur <= 2: => print(y_counter_mundur) => var_yg_sama tambah dengan sintaks ( += 1 ) pastikan baris incrementnya diratakan mutlak wajib masuk numpang masuk nongkrong bernaung sejajar menjorok patuh dlm kelompok indent di payung blok body nya si selimut loop while.`,
          quiz: {
            question: `Apakah dampak ganjaran hukuman bayaran tragedi fatal mengerikan konsekuensi maut terparah/Fatal dari kegagalan kekeliruan sangat sepele lupa sekecil jarum dari si seorang manusia programmer amatir logic logic C py form script test string OS struct byte yang entah amnesia sampai kelupaan secara sadar sengaja utuh abai malas lalai mengamankan luput tak tertuang menulis manual modifikasi skrip Incremental gerbong penambah bilangan Variable pendorong Value penyetop step count counter lompat iterasi (seperti halnya pemakaian n += 1,  index = index + 5, dll param math counter logic) didalam susunan barisan text baris akhir tersembunyi rincian scope blok di ruang identasi barisan satu struktur perakitan blok pilar ruang batas pembentuk logic body pemecahan blok Loop Perulangan Sementara Waktu Iteratif Bersyarat Jenis rentetan Evaluasi 'Condition based statement check Uncounted loop' (Struktur Pakem While Statement Check Truthy Loop Logic Loop Parameter py string OS error check float memory)?? Murni murni apa kutukannya?`,
            options: [`Browser akan merespon dengan gila ngegas force close auto mutlak force exit tutup instan kill thread PID process mem kill mem-restart me reset mutlak paksa mati dan men-tune mem format cache memory perangkat cpu mem OS linux bot test module script traceback function int struct pointer sys py.`, `Hanya membangkitkan fenomena meloloskan perputaran putaran loop seolah skip sekali dan loop nya tidak pernah sukses menyala sama sekali sekalipun disentuh eksekutor list.`, `Itu adalah murni perbuatan terlarang membangkitkan ritual klenik Terciptanya lubang cacing waktu fenomena mesin komputasi merusak alam berupa "Iterasi Lingkaran Jahat Tak Pernah Berujung Menemui Kematian Kepastian Pemberhentian (Sering Diistilahkan sbg: Infinite Looping Bug Fatal Exception Syndrome / Memory CPU Overload RAM Spike Overflow Memory Leaks Loop Overflow)" di mana putaran CPU mesin di persekian micro detik akan stuck nyangkut di rute sana muter di script sepotong nan dungu macet total tiada akhir nyala ngespam memakan triliunan RAM OS hingga laptop PC anda meranggas kemebul panas meledak error crash freezes blue screen mem lock cpu dead !! Itulah Loop Tak Terhingga.`, `Script Auto dipetieskan dimaklumi santai dirawat diperbaiki diam diam rahasia sunyi senyap auto dibenerkan oleh bantuan sihir ajaib fungsi tool AI dewa system linter VScode compiler runtime OS fallback interpreter Python pintar jaman purba sakti yang mana dengan baik hatinya membetulkan bug script tulisan user nakal tsbt merubah auto logic error bug text err null ptr script format error. `],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `1\n2\n`, description: `Auto assessment simulasi counter loop engine validator bypass loop memory trap format OS engine logic trap mem limits loop check bool evaluation true test bool. Trace while trap bypass auto system py float logic OS.` }
          ],
          validationRules: [
            { pattern: `\\+=\\s*1`, message: `JANGAN MAIN MAIN DENGAH MAUT CPU! DILARANG KERAS MUTLAK SEKALI-KALI MEMICU KEMACETAAN TOTAL INFINITE LOOP GILA TANPA MEMBEKALI STATEMENT SUNTIKAN INCREMENT VAR OPERATOR LOGIC MUTLAK BENTUK += 1 ATAU BENTUK PENAMBAHAN IDENTIK MODIFIKATORNYA DI DALAM BLOK CHECK INDENTASI WHILE ANDA. SISTEM KAMI AKAN MENOLAK PENGETESAN ALGORITMA CODE ANDA DEMI KEAMANAN INFRASTRUKTUR WEB KAMI DARI SERANGAN SERVER PROCESS MEMORY LEAK OVERFLOW INFINIT LOOP THREAD LOCK BOMB JAWABAN ANDA.`, shouldExist: true }
          ]
        },
        {
          id: 'py5-l6',
          title: 'Pengendalian Akses Manuver Perulangan (Break Cerdas & Pemotongan Laju Continue Pengecualian)',
          explanation: `Python bukan cuma mesin pengeruk iterasi buta. Python membekali kau si developer dewa ini wewenang mencabut mencampakkan pedal rem memotong aliran alur takdir rantai perputaran gerbong kereta 'For' loop statis dan komedi putar tak terbatas 'While' Loop melalu tuas interupsi rem pakem gawat sakral manual bypass peloncat kode intervensi mutahir.\n\nSimak dua Mantra Sakti Interupsi ini:\n- Kata sandi mutlak **'break'**: Menghantam merusak memberangus kaca rem darurat kereta perulangan menghancurkan rute perputaran mesin list loop ini putus menyala terhenti secara paksel murni menghabisi nyawa sisa iterasi urutan angka sisa list limit array di ujung blok seakan iterasi murni dianggap impas sudah habis ludes! Mesin meloncat beranjak menyambung membaca pindah blok keluar ke kode skrip waras di akar main program selanjutnya.\n- Kata mantera **'continue'**: Berfungsi bak maling licik ahli sabotase. Fungsinya menyabotase, membelot me-skip dan membutakan mematikan menolak pembacaan mengeksekusi sisa kumpulan koding rentet rincian baris deret program urut yang bernaung sial nasibnya persis antri tertera berbaris jongkok di jajaran indent lantai level Bawah garis keberadaannya kalimat sintaks sakti continue ini. Mesin akan dipaksa menelan mendadak me-skip / membatalkan pengoprasian mutlak *KHUSUS HANYA 1 BUAH ITERASI PADA PUTARAN POSISI TITIK DETIK* detik tsb tok saja secara tunggal diskip! Mesin lalu dipandu instan mengabaikan rute skipnya dilewat meloncat tarik ke awang-awang ditarik paksa naik ngamuk menunjuk kembali ke ujung puncak awal atap pembuka block for/while lagi guna ditagih mengejar menyambung memeras menagih kembali hutang dari urutan nyawa di siklus step indeks iterasi angka pada putaran angka rentetan giliran step nomor yang perulangan urut selanjut-selanjutnya secara berurut lagi laiknya tiada dosa dan tak ada yang skip terjadi!. `,
          codeExample: `for peluru in range(1, 6): # Tembak rentetan index simulasi angka murni dr peluru 1 ke 5\n    if peluru == 3:\n        continue # Peringatan!! Murni saat nilai indeks logic param peluru membentur angka mutlak 3, blok skip ini meledak nyala mensabotase baris dibawahnya. Maka detik iterasi putaran ke-3 auto lenyap tidak bakal merasakan efek print mencetak ke layar text di terminal! Skrip naik menagih sisa urut angka peluru 4!\n    if peluru == 5:\n        break # Alarm! Begitu index var melinjak nilai logic peluru val 5, Mesin stop mati membanting tuas memberhentikan dan meruntuhkan mesin for loop seketika hancur berkeping. Loop selesai mutlak tak ada putaran lg! Dan takkan pernah ke eksekusi log list angka 5!\n    print(f"Dorr proyektil tembakan peluru melesat: ke-{peluru}")\n# Prediksi Tampilan Visual Nyata:\n# Dorr proyektil tembakan peluru melesat: ke-1\n# Dorr proyektil tembakan peluru melesat: ke-2\n# Dorr proyektil tembakan peluru melesat: ke-4\n# KELUAR LOOP! SISA RANGE HABIS BATAL KRN BREAK! Angka 3 lenyap, Angka 5 Batal!! `,
          initialCode: `# Ujian Simulator Manuver Skrip Sabuk Pengaman Logic Python Escape:\n# Misi Mutlak Cerdas Menerobos Barikade Range Limit. Bikin seutas jembatan putaran For loop dinamis dengan index penanda nama bebas misalnya 'val_kucing' melintasi penjelajahan iterasi per-nomor batas limit menggunakan perabotan list generator sakti method "range(1, 4)" inklusif menembus step rentang inklusif murni angka list start limit awal 1 sampai ke 3 murni inklusif terbit range batas index limit ujung.\n# Susupkan taktik blok licik: SELIPKAN sebuah blok sepit pengujian filter percabangan if logic penjagaan ganda! \n# Pertama! Jikalau filter 'if' logic mendeteksi penciuman di mana si val_kucing secara logis tepat lurus memegang komparator ganda (==) persis murni angka nominal bilangan [ 2 ] maka lemparkan sabotase skrip sintaks tulisan manuver "continue"! (Jangan dikasih string kutip lho murni script statmen log nya)\n\n# Kedua, Baris yang selalu lurus aman dicetak dipaksakan per perputaran print: Cetak gabungan text F-string f"Kucing ke-{val_kucing}\\n" atau concatenate koma nya.\n`,
          solution: `for val_kucing in range(1, 4):\n    if val_kucing == 2:\n        continue\n    print(f"Kucing ke-{val_kucing}")`,
          hint: `for val_kucing in range(1, 4): lalu beri ident ke kanannya ketik blok if val_kucing == 2: terus dlm bloknya lemparkan syntax pelarian continue. Mentokin lagi baris di garis sejajar blok dalem for buat masang tembakan printf() parameter format luaran resultnya bro.`,
          quiz: {
            question: `Syntax interupsi gahar pengatur lalulintas lompat batas dimensi ruang dimensi komputasi manakah di seluruh alam ekosistem compiler standar bahasa C modern dan pelarian blok scope parser Python log file ini.. yang mana fungsinya secara pakem dikhususkan murni mensabotase mati untuk sekejab langsung mematikan meledakkan lompat nge-trap menghentikan serta memblokir menghabisi merusak rute SELURUH sisa rentetan amunisi siklus jumlah nyawa alokasi urutan list perulangan For Loop tersisa agar habis di detik pengeksekusian nilai variabel saat itu juga (Kabur total ke akhir kurung block tanpa ba-bi-bu mutlak absolut tanpa kompromi)?`,
            options: [`goto default; exit err format pointer bypass limit trap.`, `break`, `continue`, `return 0 exit log trap pointer memory bit mem flag error.`],
            correctAnswer: 1
          },
          testCases: [
            { expectedOutput: `Kucing ke-1\nKucing ke-3\n`, description: `Memvalidasi kelayakan test simulasi manipulasi lompat escape routing bypass putus logic log rentet skip iterasi skip rentang exception continue system logic loop array list bypass.` }
          ],
          validationRules: [
            { pattern: `continue`, message: `Lupa menyematkan pelarian script string bypass sabotase iterasi index loop continue`, shouldExist: true }
          ]
        }
      ]
    },
    {
      id: 'py5-m3',
      title: 'Perakitan Modular Fungsi Custom',
      lessons: [
        {
          id: 'py5-l7',
          title: 'Konstruksi Blok Penamaan Deklarasi Wadah Def (Define Tool Function)',
          explanation: `Ritual bodoh penulisan Pengulangan duplikat puluhan baris seonggok rincian blok rentetan baris proses algoritma program yang ber-batu-batu copy dan di-paste berkali kali di memori lembar root kertas editor sangatlah amat menjijikkan dan super diharamkan murni di kamus para pemrogram master (Melanggar fatwa etika pilar koding mantap aliran suci: *Prinsip DRY Mutlak = Don't Repeat Yourself!*). \nGuna menyucikannya.. Kita harus membungkus tumpukan bata merapikan menyempilkan meringkas membereskannya memaketkan paksa mengotakkannya menyekap meletakannya menyimpannya menyelipkannya dalam rancang susun wadah kardus kapsul modul panggil tempel alat rakit ulang raksasa yang lazim murni sejagat dibaptis diberi gelar arsitek: **"Fungsi Dasar Terpusat (Custom Functional Modul Unit / Functional Abstraction Tool)"**.\n\nAwalilah pondasi kerangkanya pembangunannya dengan semburan mantera instruksi kata pakem saktinya murni awalan wajib \`def gabung_nama_fungsi_unik_alias_kalian():\` lurus membentang diimbangi disandingkan urutan penampung piringan selipan lobang corong kran parameternya bila perlu... disambung murni perlakuan mem-barikade identasi selorok susunan anak anak block rincian barisan tata operasional kerja kode nya yang mutlak wajib patuh bersaf menjorok beringsut 1 pilar ke sebelah arah kanan merunduk dibawah blok perut indentasi payung kemah titik dua ( : ) eksekusi rincian sang induk arsitektur def function tersebut murni patuh tunduk tak lekas lari dr scope block kurungan method lokal tersebut kelak.\nSelain sekadar memerintah murni suruhan kerja fisik perbudakan koding... Fungsi function pun dapat difungsikan pula memukul memantulkan menendang balik bola balasan nilai jawaban feedback hasil kalkulasi jerih olahan result data output olahan hitungan val array value result-nya dengan sakral lurus melempar sebuah return param value baris tersembunyi disemati penanda khusus ber-kata kunci awalan sintaks pamungkas \`return objek_hasilnya_bro\` ke penangkap var di luar batas void universe fungsi isolasi teritori lokal lingkup ini (scope encapsulation local variable closure format block def function module scope test pointer function definition param func block pointer module trap list arr test system log log log!).`,
          codeExample: `def fungsi_perkalian_rahasia(data_a, data_b):\n    hasil_matematika = data_a * data_b\n    return hasil_matematika # Pengembalian lemparan output nilai akhir mentah tanpa diprint terlebih dahulu, nilainya diselamatkan di awang awang dikirim ke si pengundang method kelarnya\n\n# Ini di lantai blok root public eksternal dunia luar area alam bebas diluar penjara Def blok kamar scope local encapsulation...\nprint(fungsi_perkalian_rahasia(5, 5)) # Menjerit panggil manggil nama method.. trus var Result tangkapan bola return output yg dilempar keluar itu tertangkap nyangkut dan seketika langsung tercetak termuntahkan dilesatkan dicetak sbg bentuk display sbg result mentahan var murni berwujud angka desimal bulat 25 !`,
          initialCode: `# 1. Misi kamu sederhana abis bro: Tulis dan Jadikan kumpulkan bungkus satu kumpulan kamar struktur rutinitas blok baru sebut lebelin namanya lewat syntax awalan perakit blueprint function \`def sirine()\` dengan kelengkapan mutlak wajib titk dua nya ( : )\n# 2. Yang mana instruksi tugas anak isinya (di-tab 1x menjolok) semata hanya menanggung beban 1 keping baris string cetakan statis mem print kalimat literal text "Wiu Wiu Darurat!" tok! \n# 3. Last step kawan: Panggil getok gendor panggillah nama dan trigger perintah paksa eksekusi tombol nyalakan secepat kilat method instansiasi objek func blueprint sirine() rakitan mu mu murni saklar tadi di rute sejajar tembok akar rata kiri di public alam terluar scope blok anak def nya... (panggil di line akhir di bawah luar scope def nya persis).\n`,
          solution: `def sirine():\n    print("Wiu Wiu Darurat!")\n\nsirine()`,
          hint: `Bungkus deklarasi pembuat bungkus wadah the function nya.. geser masuk ke dlm perut indentasikan letakan kode instruksi suruhan fungsinya.. lalu tab kembali ratakan punggung panggil teriak panggil nama sirine() dan jalankan nyalakan saklarnya method pemanggil namnya di public scope sejajar root alam luar tembok sebelah bawah dinding di ujung pinggiran tembok sbg console caller trigger run method eksekutor the the def-nya...`,
          quiz: {
            question: `Berkenaan tabiat kodrat lantaran sifat karakteristik pemaksaan label tanda keharusan penyebutan nama "Static-Type" penetapan tipe perkenalan paksa format wujud kasta di awal pemesanan genotipe variable (seperti awalam penamaan cth var kaku bertulis var types string, void namafunc, int method, char tipe.. sbg pendata parameter statik struct bytes size float dilarang bebas pointer) sungguh telah utuh ditanggalkan diludahi disingkirkan dihancurkan musnah total sedari awal desain rancang bangun penciptaan blueprint Python OS runtime engine di dalam proses memanifes/arahan membentuk menciptakan merakit mencetak modul racikan rancang blueprint rincian susunan deret prosedur sebuah fungsi blok void sub code program instruksi urutan kerja pemanggilan module khusus re-useable rute fungsional anyar (Function Tool Code Code)...   Maka satu keping peluit kata perintah sintaks awalan sakral baku text string pengganti yang diperkenankan mendirikan merakit menaungi pondasi perantara sebagai pilar penetap the function blueprint identifier method structure builder keyword code itu sendiri ialah dinamani dan disingkat dalam teks tiga huruf karakter dewa murni sakti berwujud text sintaks apa di otak kompiler py runtime loop float check array python syntax file sys list exception check mem compiler trap var trace pointer sys memory ?`,
            options: [`let func ==`, `class::() func var func.`, `def (Berasal murni Dari kata Define/ Mendefinisikan Fungsi Abstraksi Logic Penjadwalan Code Block Executable Reusable Tool Code Generator Blueprint Func Tool. `, `void main() struct init ptr.`],
            correctAnswer: 2
          },
          testCases: [
            { expectedOutput: `Wiu Wiu Darurat!\n`, description: `Uji dan Check kelayakan ekses mutlak uji nyali tes pemanggilan eksternal root pemantik engine internal rincian anak tangga script test method scope object blok scope run running test logic terminal trace engine loop module object runtime exec system void parameter return block eval test block run script format os bot pointer trap test return run trace def module func definition run block test bypass memory trap bypass os sys trap method OS OS bot.` }
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
  title: 'LIST, DICTIONARY, FORMAT IO TEXT',
  description: 'Python Advanced List Management dan manipulasi Key Json Style',
  modules: [
    {
      id: 'py6-m1',
      title: 'Dinamika List & Array',
      lessons: [
        {
          id: 'py6-l1',
          title: 'List Dinamis Mutabel Lengkap',
          explanation: `Python tidak mengenal Array C kaku. Mereka menggunakan struktur sakti '[ List ]'!\nSifatnya Mutabel (Bebas diobok-obok dirubah dipecah) dan menampung tipe Gado-gado acak!`,
          codeExample: `listku = [100, 'Teks', True]\nlistku.append(999)\nprint(listku)`,
          initialCode: `angka_deret = [1, 2, 3]\n# Misi Anda: Modifikasi angka_deret tersebut dan selipkan append() guna menginject/menambah angka nilai bulat 4 pada pos urutan terakhir ekor array itu.\n# Buktikan eksistensinya dengan mengeksekusi print(angka_deret)\n`,
          solution: `angka_deret = [1, 2, 3]\nangka_deret.append(4)\nprint(angka_deret)`,
          hint: `Ketik angka_deret.append(4) barulah pungkasi print(angka_deret)`,
          quiz: {
            question: `Apakah parameter metode penambah data paling belakang di Python list?`,
            options: [`add()`, `insert()`, `push()`, `append()`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `[1, 2, 3, 4]\n`, description: `Test list append.` }
          ]
        },
        {
          id: 'py6-l2',
          title: 'Dictionary Kunci Mapping Canggih',
          explanation: `Format dictionary mengawinkan 1 kunci (Key string text) dan 1 nilai (value). Pemanggilan dan manipulasi memory murni mendayagunakan panggilan Nama 'Kunci' propertinya alih alih index.`,
          codeExample: `robot = {'warna': 'merah', 'seri': 10}\nprint(robot['warna'])`,
          initialCode: `murid_dict = {'uuid': '12B-01', 'grade': 'High'}\n# Tampilkan lewat print atribut properti kunci 'grade' saja dari map ini!\n`,
          solution: `murid_dict = {'uuid': '12B-01', 'grade': 'High'}\nprint(murid_dict['grade'])`,
          hint: `print(murid_dict['grade'])`,
          quiz: {
            question: `Objek penyimpanan perpasangan Kunci-Nilai mirip Format sintaks JSON di py disebut sbg struktur?`,
            options: [`Set()`, `Struct`, `ListArray()`, `Dictionary / Dict {}`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `High\n`, description: `Test Dict` }
          ]
        },
        {
          id: 'py6-l3',
          title: 'With Open File Manager Log',
          explanation: `Sembari melupakan fopen purba.. Py memperkenalkan blok sakti penjaga gembok file OS bernama 'with open(nama, sandi) as f:'. \nOtomatis tertutup di akhir lekuk indentasinya tanpa fclose manual!`,
          codeExample: `with open('dummy.txt', 'a') as f:\n    f.write('sukses nulis')`,
          initialCode: `# Simulasikan block virtual context manager "with open" mode Append "a" manipulasi file "dummy.txt".\n# Simpan 1 baris string utuh bertulisan persis ini: "Log_Berhasil_Di_Inject\\n" lewat  .write().\n# Terakhir, tutuplah identasinya. print konfirmasi text "Akses Beres"\n`,
          solution: `with open("dummy.txt", "a") as f:\n    f.write("Log_Berhasil_Di_Inject\\n")\nprint("Akses Beres")`,
          hint: `with open("dummy.txt", "a") as f: -> f.write() -> keluar pindah identasi -> print("Akses Beres")`,
          quiz: {
            question: `Kelebihan blok pengaman akses Context with open() terhadap C open murni adalah?`,
            options: [`Lebih lambat`, `Wajib manual reset null param list trace os`, `Memakan memori list trap module python`, `Berteknologi Auto Memory Close OS / membebaskan f.close secara cerdas terotomatisasi di batas jurang keluar ujung indentasinya`],
            correctAnswer: 3
          },
          testCases: [
            { expectedOutput: `Akses Beres\n`, description: `Test IO Write mode` }
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
