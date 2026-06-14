export interface ValidationRule {
  pattern: string;      
  message: string;      
  shouldExist: boolean; 
  flags?: string;
  stripStrings?: boolean;
  presetId?: string;
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

export const curriculum: Level[] = [
  {
    id: "c-level-1",
    title: "DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C",
    description: "Mempelajari struktur penulisan algoritma C, bagan alir (Flowchart), tipe data dasar, fungsi input/output lengkap, dan operator.",
    modules: [
      {
        id: "c1-m1",
        title: "Logika Flowchart dan Struktur C",
        lessons: [
          {
            id: "c1-l1",
            title: "Pengenalan Logika & Flowchart",
            explanation: "Algoritma adalah urutan langkah logis untuk menyelesaikan masalah. Sebelum diubah menjadi bahasa C, algoritma divisualkan dengan Flowchart (Bagan Alir).\n\nStrukturnya meliputi Start, Read, Process, Write, dan End. Jenis flowchart dapat berupa Sequence (Berurutan), Branching (Percabangan), atau Looping (Perulangan).\n\nSimbol utamanya:\n- Terminal (Bentuk oval): Awal dan Akhir program.\n- Process (Bentuk persegi panjang): Rumus atau proses assign nilai.\n- Decision (Belah ketupat): Percabangan tanya jawab Yes/No.\n- Input/Output (Jajar genjang): Aktivitas pembacaan data.",
            codeExample: "// Contoh implementasi di kehidupan nyata:\n1. Start\n2. Read: Masukkan Air\n3. Process: Panaskan\n4. Write: Air Matang\n5. End",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Tulis print simulasi langkah Flowchart: \"1. Start\\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    printf(\"1. Start\\n\");\n    return 0;\n}",
            hint: "Ketik printf(\"1. Start\\n\");",
            quiz: {
              question: "Pada diagram flowchart, bentuk apakah yang merepresentasikan 'Decision' atau percabangan keputusan dari suatu kondisi instruksi?",
              options: [
                "Oval",
                "Jajar Genjang",
                "Persegi Panjang",
                "Belah Ketupat"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "1. Start\n",
                description: "Menampilkan simulasi diagram"
              }
            ]
          },
          {
            id: "c1-l2",
            title: "Struktur Program Bahasa C & Header",
            explanation: "Struktur dasar program C terdiri dari dua area wajib.\n\n1. Bagian '#include': Berfungsi mengimpor fungsi perpustakaan. Penggunaan standar '<stdio.h>' ditujukan untuk input-output standar. Jika membuat file header lokal buatan sendiri, strukturnya menjadi dipetik yakni '#include \"nama.h\"'.\n2. Bagian 'int main()': Fungsi utama penggerak yang tereksekusi. Perintah 'return 0;' ditujukan menutup fungsi secara absolut dan wajar.\nSetiap instruksi akhir dalam statement C wajib ditutup dengan Titik Koma ( ; )!",
            codeExample: "#include <stdio.h>\n\nint main() {\n    printf(\"Int main berjalan sempurna.\\n\");\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Tulis perintah yang memunculkan tulisan \"Booting main...\" plus penanda letak ganti baris baris baru.\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    printf(\"Booting main...\\n\");\n    return 0;\n}",
            hint: "Minta printf berisikan kalimat \"Booting main...\\n\"; diakhiri ';' ya!",
            quiz: {
              question: "Apakah library header C yang dipakai jika kita memerlukan bantuan fungsi matematis tinggi seperti pemangkatan pow() atau pun sinus consinus?",
              options: [
                "<string.h>",
                "<stdlib.h>",
                "<math.h>",
                "<stdbool.h>"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Booting main...\n",
                description: "Bisa memunculkan baris boot main"
              }
            ],
            validationRules: [
              {
                pattern: ";",
                message: "Keharusan meletakkan titik koma di akhir instruksi.",
                shouldExist: true
              }
            ]
          },
          {
            id: "c1-l3",
            title: "Tipe Data dan Deklarasi Constanta",
            explanation: "Tipe data C mencakup:\n- 'char': Huruf (Range -128 ke 127). Untuk menampilkannya kita panggil simbol cetak %c atau jika himpunan kata %s.\n- 'int': Integer format d.\n- 'float': Desimal (pecahan sederhana) dng parameter f.\n- 'double': Desiminal tingkat kompleks parameter lf.\n- 'bool': Boolean 1 dan 0.\n\nUntuk mendeklarasikan Variabel Statik yang mustahil diubah selama runtime, pakailah awalan 'const'. Contoh: const float pi = 3.14;",
            codeExample: "#include <stdio.h>\n\nint main() {\n    const int nilaiMax = 100;\n    int skor = 90;\n    printf(\"Max: %d\", nilaiMax);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Minta instansiasikan constanta berjenis float dengan nama pi yang berisi nilai 3.14\n    \n    // Tampilkan kalimat \"Nilai PI adalah 3.14\" lewat pemanggilan variabel pi.\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    const float pi = 3.14;\n    printf(\"Nilai PI adalah %.2f\\n\", pi);\n    return 0;\n}",
            hint: "Deklarasikan sebagai: const float pi = 3.14; diikuti formating %.2f di printf.",
            quiz: {
              question: "Kata awalan manakah untuk menset nilai memori yang dikunci paksa nilainya tak terbantahkan sepanjang program berjalan?",
              options: [
                "#define / const",
                "void",
                "struct",
                "bool"
              ],
              correctAnswer: 0
            },
            testCases: [
              {
                expectedOutput: "Nilai PI adalah 3.14\n",
                description: "Test konstan float"
              }
            ]
          }
        ]
      },
      {
        id: "c1-m2",
        title: "Fungsi Input Output I/O Lengkap C",
        lessons: [
          {
            id: "c1-l4",
            title: "Printf & Puts Dasar Tampilan Data",
            explanation: "C menyediakan ragam interaksi Command Line mumpuni.\n- 'printf()': Bersifat mentah, murni menumpuk teks panjang tanpa spasi apalagi enter. Kamu harus manual menulis escape '\\n' di tiap ekornya.\n- 'puts()': Super singkat untuk teks String tok! Ia punya sihir ajaib akan otomatis menginject enter ganti baris tersendiri tanpa perlu \\n manual di ujungnya!\n- 'putchar()': Menumpahkan HANYA satu karakter ascii ke layar.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    puts(\"Otomatis Turun Baris Nih!\");\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Lakukan print text murni tanpa escape \\n lewat keyword 'puts' berisi teks \"Halo Dunia\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    puts(\"Halo Dunia\");\n    return 0;\n}",
            hint: "Langsung puts(\"Halo Dunia\"); saja, lebih singkat!",
            quiz: {
              question: "Apabila suatu pesan teks bahasa C dieksekusi dengan fungsi puts() dan bukan via printf() konvensional, maka keuntungan istimewa apakah yang ada di akhir outputnya?",
              options: [
                "Tulisannya kedap berhuruf sangat besar (Capslock Automatic)",
                "Diselipkan fungsi otomatis mengganti turunan ENTER garis ke bawahn terbaru",
                "Mencegah memori lag",
                "Disisipkan tanda koma"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Halo Dunia\n",
                description: "Testing Puts functionality murni enter bawaan"
              }
            ]
          },
          {
            id: "c1-l5",
            title: "Input Ampersand dari Memory (Scanf)",
            explanation: "Fungsi Scanner Console bahasa C sangat kuno, tetapi ini mengajarkan pointer alamat paling basic.\nSewaktu menerima data integer via 'scanf' wajib didahului mendidik Nilai Nol (Inisial), lalu berikan arah memori bersimbol 'Ampersand &' di depan variabelnya.\nTanpa simbol &, Scanf menabrakkan memori dan program CRASH murni!",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int nominal = 0;\n    printf(\"Uang: \"); \n    scanf(\"%d\", &nominal); \n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Buat var int nomor, sediakan init angka 0.\n    int nomor = 0;\n    // Cetak permohonan isi \"Ketik id: \" (no enter)\n    \n    \n    // Panggil scanner membaca %d , tujukan pakai simbol alamat ke nomor\n    \n    \n    // Verifikasi outputnya dengan cetak \"ID Didaftarkan: [angka_nomor]\\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int nomor = 0;\n    printf(\"Ketik id: \");\n    scanf(\"%d\", &nomor);\n    printf(\"ID Didaftarkan: %d\\n\", nomor);\n    return 0;\n}",
            hint: "Minta printf \"Ketik id: \", terus scanf %d dan variabelnya wajib tambahkan & di depannya. Akhiri printf.",
            quiz: {
              question: "Operator apik pembawa alamat (Addressing) pada parameter argumen variabel sasaran didalam function \"scanf()\" adalah...",
              options: [
                "Simbol Bintang *",
                "Simbol Dan &",
                "Simbol Tilde ~",
                "Simbol Persen %"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                input: "69",
                expectedOutput: "Ketik id: ID Didaftarkan: 69\n",
                description: "Output check id form test C scanner input"
              }
            ]
          },
          {
            id: "c1-l6",
            title: "Interaktif String (Gets & Getchar)",
            explanation: "C juga menawaran inputan diluar sistem ribet Scanf.\n- 'gets()': Ditujukan menangkap string spasi utuh dalam 1 blok kalimat panjang (yg kalau scanf biasanya patah dan macet di spasi pertama yang diketik).\n- 'getch()': Input huruf tersembunyi mirip penginputan system Password hitam. Tanpa tekan ENTER dia langsung submit logic.\n- 'getche()': Sama namun merefleksikan karakter ke interface.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    // Hanya teori demonstrasi karena platform butuh full terminal flush:\n    char huruf = 'A';\n    putchar(huruf);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Karena gets dan getch tidak secure di sistem web virtual ini.. praktikkan pembuangan escape saja.\n    char buffer = 'Z';\n    // Gunakan fungsi tunggal putchar() untuk mem-print var buffer.\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    char buffer = 'Z';\n    putchar(buffer);\n    return 0;\n}",
            hint: "Eksekusi fungsi putchar dengan disisipkan nama variable.",
            quiz: {
              question: "Apakah kegunaan luar biasa fungsi getch() yang umumnya diremehkan tetapi dipakai developer lawas C untuk menciptakan area pendaftaran?",
              options: [
                "Memperbaiki error logikal.",
                "Untuk menangkap huruf sandi secara ghaib tanpa kelihatan / merefleksi bentuk kata di layarnya.",
                "Mempercepat waktu runtime C.",
                "Mencetak Array Text."
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Z",
                description: "Output putchar"
              }
            ]
          }
        ]
      },
      {
        id: "c1-m3",
        title: "Operator Lanjutan di Bahasa C",
        lessons: [
          {
            id: "c1-l7",
            title: "Operator Aritmatika & Modus Unary",
            explanation: "Aritmatika esensial C: Penambahan (+), Pengurangan (-), Perkalian (*), Pembagian (/). Modulo (% sisa mutlak pembagian).\n\nNamun kekuatan utama C terletak pada Operator Unary yang brutal performanya. Yaitu modifikasi pada SATU buah tipe kembar:\n- Post-Increment ('x++'): Dipakai dulu urusan nilainya saat itu di public, BARU ia ditambahkan 1 untuk simpanan file!\n- Pre-Increment ('++x'): Maju ditambahkan 1 di memori dasar, sehingga siapapun yang membacanya sesaat kemudian mendapat val terkini.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int a = 5;\n    printf(\"Nilai awal a ditarik via a++ : %d\\n\", a++); // Tampil 5, trus a jadi 6\n    printf(\"Kini a didorong via ++a : %d\\n\", ++a); // Ditambahkan dari memori jadi 7, muncul 7\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int poin = 100;\n    // Cetaklah sisa modulo poin tersebut jika poin dibagi angka 3, memakai format printf biasa\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int poin = 100;\n    printf(\"%d\\n\", poin % 3);\n    return 0;\n}",
            hint: "Sisa bagi poin mod 3 adalah poin % 3",
            quiz: {
              question: "Operator modulo/sisa bagi dipetakan oleh mesin dengan notasi karakter apa?",
              options: [
                "Mod()",
                "#",
                "%",
                "*"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "1\n",
                description: "Menghitung modulus yang sangat akurat"
              }
            ]
          },
          {
            id: "c1-l8",
            title: "Komparator Perbandingan",
            explanation: "Dalam cabang manapun, Anda mengecek suatu syarat menggunakan Operator Relasi (Perbandingan).\n'==': Bernilai murni \"Apakah sama nilainya?\". Tolong jangan salahkan dengan '=', itu adalah deklarasi setter inisialisasi.\n'!=': Tidak sama dengan.\n'>=' dan '<=': Lebih atau setara dengan. Sangat lazim masuk dalam struktur percabangan If C.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int suhu = 30;\n    if (suhu >= 30) {\n        printf(\"Panas Hawa\");\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int cek = 20;\n    // Buat cabang membandingkan cek dengan 20 menggunakan Relasional Tidak Sama Dengan (Cek BUKAN 20)\n    // Kalau syarat true cetak \"Lolos\", else cetak \"Blok\"\n    if () {\n        \n    } else {\n        \n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int cek = 20;\n    if (cek != 20) {\n        printf(\"Lolos\\n\");\n    } else {\n        printf(\"Blok\\n\");\n    }\n    return 0;\n}",
            hint: "Minta pengecekan komparator (cek != 20).",
            quiz: {
              question: "Apabila suatu variabel bertulis id_user diuji tidak sama serapan nya dengan konstanta angka 1, C memandunya lewat perintah relasional berkarakter tunggal sebagai?",
              options: [
                "id_user <> 1",
                "id_user != 1",
                "id_user ~ 1",
                "id_user !== 1"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Blok\n",
                description: "Test percabangan tidak sama dengan pada blok nilai genap sepadan"
              }
            ]
          },
          {
            id: "c1-l9",
            title: "Operator Gerbang Logis Terpadu",
            explanation: "Skenario C kerap menuntut pengujian 2 skenario atau bahkan tiga dalam sederet syarat mutlak. Gunakan Gerbang!\n\n- '&&' (AND): Keras mutlak. Seluruh pemicu sayap kiri maupun penjaga kondisi kanan harus mutlak tercukupi \"True\" agar ia bernilai lanjut.\n- '||' (OR): Longgar. Jika kanan saja sudah True maka program akan mengeksekusi statmentnya.\n- '!' (NOT): Merusak nilai. Nilai hasil True akan dibaliknya menjadi murni False.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int usia = 18, vip = 1;\n    if (usia >= 18 && vip == 1) {\n        printf(\"Guest Masuk\");\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int poin = 50;\n    int premium = 0;\n    // Susun percabangan if OR. Syaratnya: poin == 100 ATAU premium == 1 untuk tembus print \"Mantap\\n\"...\n    // Jika salah maka print \"Ups\\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int poin = 50;\n    int premium = 0;\n    if (poin == 100 || premium == 1) {\n        printf(\"Mantap\\n\");\n    } else {\n        printf(\"Ups\\n\");\n    }\n    return 0;\n}",
            hint: "Syarat logika OR ditulis (poin == 100 || premium == 1).",
            quiz: {
              question: "Operator bahasa pemrogaman C apa namanya yang sanggup merantai 2 rute persyaratan agar keduanya mutlak harus berhasil dilintasi (Wajib Semua Bernilai Benar)?",
              options: [
                "& (Tunggal)",
                "&& (Double Ampersand)",
                "|| (Or)",
                "=="
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Ups\n",
                description: "Testing validasi percabangan fail condition OR test"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c-level-2",
    title: "STRUKTUR KONTROL DALAM BAHASA C",
    description: "Penguasaan lanjutan cabang hirarkikal eksekusi dan Iterasi.",
    modules: [
      {
        id: "c2-m1",
        title: "Decisions / Percabangan Lanjutan",
        lessons: [
          {
            id: "c2-l1",
            title: "Kontrol Blok Tunggal (If / Else)",
            explanation: "Percabangan sederhana If-Else hanya bermekanisme biner. Lolos, maju blok 1. Gagal, buang eksekusi blok ujung.\nJangan pernah menyelipkan Titik koma sesudah parenthesis syarat komparasi, cth: 'if (x>2);', jika dikasih titik koma, maka isi blok takkan pernah direlasi/dicek dengan IF tersebut!",
            codeExample: "#include <stdio.h>\n\nint main() {\n   if (1) {\n       printf(\"Jalan aja boss\");\n   }\n   return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int x = 1;\n    // Bikin blok statis nge-print \"OK\\n\" pada blok ELSE dari if (x == 5).\n    if (x == 5) {\n        printf(\"Jebakan\\n\");\n    } \n    // tambahkan else\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int x = 1;\n    if (x == 5) {\n        printf(\"Jebakan\\n\");\n    } else {\n        printf(\"OK\\n\");\n    }\n    return 0;\n}",
            hint: "Minta percabangan blok else mencetak print(\"OK\\n\");",
            quiz: {
              question: "Konstruktor \"Else\" pada pemrograman percabangan diklasifikasikan berstatus mutlak untuk fungsi...",
              options: [
                "Memulai ulang memori",
                "Menyimpan data",
                "Bertindak sebagai pengakhir buangan jikalau segenap if prasyarat dan konco atasnya pada ditolak/tidak terpenuhi semua rutenya",
                "Membatalkan eksekusi script main"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "OK\n",
                description: "Test IF ELSE Basic C logic"
              }
            ]
          },
          {
            id: "c2-l2",
            title: "Blok Beranting Else-If Bertingkat",
            explanation: "Ketika opsi syarat tidak hanya dualisme hitam-putih. Anda butuh 'else if'. \nElse if mengecek urutan prasyarat secara mutlak paralel vertikal dari kepala atas beruntun ke anak bawah!\nSifat Sakti: Apabila 'else if' di area posisi level 2 saja sudah menemukan jawaban rute komparasinya yang Benar, maka SISA sisa ranting Else If lain di bawahnya beserta else murni **langsung ditendang / dikangkangi otomatis alias lewat tanpa dicek lagi**!",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int usia = 10;\n    if (usia >= 20) puts(\"Dewasa\");\n    else if (usia >= 15) puts(\"Remaja Lanjut\");\n    else if (usia >= 5) puts(\"Kanak Dasar\"); // Rute Pemenang Asli\n    else puts(\"Bawah umur\");\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int uang = 1500;\n    \n    // Cek harga rentang.\n    // if uang > 5000 printf \"Makan Kuaci\\n\"\n    // else if uang > 3000 printf \"Es Teh\\n\"\n    // else if uang > 1000 printf \"Air Mineral\\n\"\n    // else printf \"Batal jajan\\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int uang = 1500;\n    if (uang > 5000) {\n        printf(\"Makan Kuaci\\n\");\n    } else if (uang > 3000) {\n        printf(\"Es Teh\\n\");\n    } else if (uang > 1000) {\n        printf(\"Air Mineral\\n\");\n    } else {\n        printf(\"Batal jajan\\n\");\n    }\n    return 0;\n}",
            hint: "Minta pengujian else if tersusun sampai else output \"Air Mineral\\n\".",
            quiz: {
              question: "Karena Else-if bersanding runtun dari atas sampai bawah. Apa bahaya utama menaruh komparasi batas lebih ringan di paling baris puncak tertinggi ElseIf tersebut?",
              options: [
                "Membuat C compiler crash limit exceed.",
                "Jika kondisi enteng diloloskan paling atas, kondisi bawahnya yang mungkin lebih berat valid nilainya ikut ter-blockade tidak akan ditengok lagi prosesor.",
                "Menjadikan program 10x lambat.",
                "Hanya salah parse memori"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Air Mineral\n",
                description: "Test prioritas routing if-elif di rentang C menengah."
              }
            ]
          },
          {
            id: "c2-l3",
            title: "Dinamika Cepat Terminal Switch-Case",
            explanation: "Switch-Case mengelola lalu lintas percabangan tanpa `>` atau `<`. Metode selektif ini secara sakti dan berkecepatan dewa membypass syarat pencarian nilai karakter tertentu persis (konstan). Misal nilai 1, 2 atau 'A', 'B'.\n\nPenangan wajib di dalam strukturnya:\n1. 'case [nilai]:'\n2. 'break;' (Kalau tidak ditambahkan, seleksi akan terus merampok eksekusi hingga file paling bontot! Ini disebut jurus \"Fall Through\").\n3. 'default:' (Pengecualian mirip kinerjanya Else mentah).",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int id = 2;\n    switch(id) {\n        case 1: puts(\"Owner\"); break;\n        case 2: puts(\"Admin\"); break;\n        default: puts(\"User\"); break;\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    char blok = 'C';\n    \n    // Lakukan Switch pada karakter blok tsb.\n    // case 'A': printf(\"Premium\\n\"); break;\n    // case 'C': printf(\"Standar\\n\"); break;\n    // default: printf(\"Subsidi\\n\"); break;\n    // *AWAS perhatikan petik tunggal untuk validasi array karakter ya!\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    char blok = 'C';\n    switch(blok) {\n        case 'A':\n            printf(\"Premium\\n\"); break;\n        case 'C':\n            printf(\"Standar\\n\"); break;\n        default:\n            printf(\"Subsidi\\n\"); break;\n    }\n    return 0;\n}",
            hint: "Ketik switch(blok) { case 'A': printf(\"Premium\\n\"); break; ... dsb }",
            quiz: {
              question: "Apakah fungsi perusak (atau justru sakti) jika kita melanggar batas praktik dan melupakan sintaks komando 'break;' tepat sesudah blok case 1 dilangsungkan C?",
              options: [
                "Compile exception missing semicolon",
                "Komputer mematikan OS terinfeksi",
                "Terjadilah fenomena Fallthrough.. case nomor-nomor bawah akan kesapu ikut jalan terus satu persatu eksekusinya.",
                "Itu illegal dan auto ditolak."
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Standar\n",
                description: "Test routing swicth karakter"
              }
            ]
          }
        ]
      },
      {
        id: "c2-m2",
        title: "Dinamika Iteratif dan Pelompatan Loop",
        lessons: [
          {
            id: "c2-l4",
            title: "Pola Sementara (While dan Do-While)",
            explanation: "Perulangan While meneliti dengan pakem \"Condition di Puncak Depan\". Bila baru sekali nge-while nilainya memalukan (False), dia mutlak skip/nol ekskutor tanpa sisa ampun.\n\nSebaliknya, **Do - While** berkolase dengan menaruh condition validator di paling jurang bawah ('while(syarat);'). Karena letaknya itu, program tak peduli apapan status di awal, ia pasti membabat instruksi blok di atas minimal dan senantiasa SATU kali.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int a = 100;\n    do {\n        printf(\"Mustahil ini!\\n\");\n        a++;\n    } while(a < 10); // Kondisi cacat false dari sananya, tp text di atas dah duluan tercetak!\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int iterasi = 1;\n    \n    // Implementasikan struktur kental while loop (SYARAT di AWAL)\n    // Selama iterasi berjalan menduduki syarat kurang/bernilai = 2 (< 3)\n    // Cetak printf memanggil \"Jalan %d\\n\" via pointer val iterasi..\n    // JANGAN PERNAH lupakan step iterasi++ di blok indent itu kawan!\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int iterasi = 1;\n    while(iterasi < 3) {\n        printf(\"Jalan %d\\n\", iterasi);\n        iterasi++;\n    }\n    return 0;\n}",
            hint: "Minta pengecekan komparator while (iterasi < 3) { print(..); iterasi++; }",
            quiz: {
              question: "Dalam Do-While, di manakah pengecekan kondisi diletakkan untuk menghasilkan eksekusi awal paksaan di blok strukturnya itu?",
              options: [
                "Di pertengahan baris statement",
                "Selalu di deklarasi header include awal",
                "Tepat sebelum eksekusi curly braces pertama blok",
                "Aman di bagian paling akhir / di bawah body blok tersebut."
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "Jalan 1\nJalan 2\n",
                description: "Test output loop incremental standar"
              }
            ]
          },
          {
            id: "c2-l5",
            title: "Perulangan Dinamis Pasti (For Loop)",
            explanation: "Berbeda jauh dari While yang terpisah-pisah, tipe perulangan For mendeklarasikan pergerakan mutlak *3 Instrumen Dewa* miliknya dalam satu baris sejuk.\nFormasi: 'for (inisialisasi basis awal; limit kontrol stop; stepping pergerakan) { ... }'\nSemisal: 'for(int z = 1; z <= 10; z++)' (Cetaklah aku mulai 1 dan tak bakal stop selama angkanya belum menyentuh dan pecah 10).",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for(int start = 3; start > 0; start--) {\n        printf(\"Angka minus: %d\\n\", start);\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Bikin for loop dari inisial z = 1 sampai dengan nilai pas z<=3.\n    // Gunakan increment standar (++)\n    // Blok print text \"Posisi z adalah %d\\n\"\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for(int z = 1; z <= 3; z++) {\n        printf(\"Posisi z adalah %d\\n\", z);\n    }\n    return 0;\n}",
            hint: "for(int z = 1; z <= 3; z++) lalu beri printf untuk isian dalamnya.",
            quiz: {
              question: "Pernyataaan dalam kurung kurawal pembentuk for-loop dipisahkan total oleh simbol pembatas ajaib apakah dari tata bahasa C?",
              options: [
                "Koma (,)",
                "Titik (.)",
                "Titik Dua (:)",
                "Titik Koma (;)"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "Posisi z adalah 1\nPosisi z adalah 2\nPosisi z adalah 3\n",
                description: "Cek perputaran limitasi batas looping absolut for"
              }
            ]
          },
          {
            id: "c2-l6",
            title: "Inisiasi Break dan Pelarian Continue",
            explanation: "Fungsi pengatur tempo mesin iterasi mutlak.\n- 'break': Mematahkan iterasi total dan meloncat menyelamatkan memori OS dan keluar ke akhir baris body sesudah For loop berakhir. (Iterasi habis selesai)\n- 'continue': Menenggelamkan iterasinya dan me-skip pada PUTARAN DETIK itu SAJA, lalu menagih lagi dari atas di step perulangan nomor sesudahnya layaknya orang licik.\n- 'goto [nama_label];': Melompat murni antar dimensi ke label ekstrinsik tertentu dari program (sangat dihindari para Dev Modern karena melahirkan efek Spaghetti code semraut).",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for(int val = 1; val <= 5; val++) {\n        if(val == 4) break; // Berhenti kalau sentuh angka 4.. (Tidak sampai angka 5!)\n        printf(\"%d\", val);\n    }\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    for(int idx = 1; idx <= 3; idx++) {\n        // Susupkan pelarian if, bila ada idx memegang relasional bersyarat nilai [ 2 ] maka lemparkan skrip continue;\n        \n        printf(\"Lintasan %d\\n\", idx);\n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for(int idx = 1; idx <= 3; idx++) {\n        if(idx == 2) continue;\n        printf(\"Lintasan %d\\n\", idx);\n    }\n    return 0;\n}",
            hint: "Minta pengujian komparator sederhana if (idx == 2) continue; sebelum syntax printf baris terakhir mu.",
            quiz: {
              question: "Operator lompat ghaib apa yang kerap diasingkan pakar dan pakem programming Clean Code lantaran sangat merusak struktur terstruktur karena sifatnya melompat kesana-kemari bagaikan mie spaghetti?",
              options: [
                "if fall-though",
                "return 0",
                "goto (jump operator label bypass)",
                "exit()"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Lintasan 1\nLintasan 3\n",
                description: "Test kelayakan modifikasi alur Continue Bypass Index Logic!"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c-level-3",
    title: "ARRAY, STRUCT, DAN OPERASI FILE (C)",
    description: "Penyusunan arsitektur array multidimensi kompleks, identitas tipe Struct, array Struct dan pengelolaan Stream File Text external mutlak.",
    modules: [
      {
        id: "c3-m1",
        title: "Tipe Koleksi C dan List",
        lessons: [
          {
            id: "c3-l1",
            title: "Basis Array Satu Dimensi & Teks Banal",
            explanation: "Dalam arsitektur alokasi memori dasar C language, Array dideklarasikan memborong lahan ram terdekati dalam bentuk blok kontigouus dengan Tipe Data homogen. Indeks array C sakral merujuk awalan dari nol '[0]'.\n\n**Ilusi Penyamaran String:** C purba tidak punya variabel bernamakan text bebas 'string'. Ia meramu format tipu menipu yaitu mendefinisikan variable karakter array dimensi kolom: 'char buffer[10]'. \nWajib Diingat: Array karakter C HARUS menyematkan penanda hampa Terminator Null ('\\0') di bangku gerbong terakhir kalimatnya sekadar ngasih tahu penanda bahwa text usai di gerbong itu!",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int uang_jajan[3] = {10, 20, 30};\n    printf(\"Uang hari kedua adalah array idx1 yaitu : %d..\\n\", uang_jajan[1]);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Punya data statis int matriks[3] = {500, 600, 700};\n    int m[3] = {500, 600, 700};\n    // Target Anda semata: Tarik angka terakhir array (indeks puncaknya)\n    // Gunakan baris output printf menampilkan nilai integer dari akses list bersangkutan.\\n\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int m[3] = {500, 600, 700};\n    printf(\"%d\\n\", m[2]);\n    return 0;\n}",
            hint: "M[2] merupakan index array baris bontot dari size alokasi 3 memory itu. Tulis printf(\"%d\\n\", m[2]);.",
            quiz: {
              question: "Berdasarkan arsitektur ilusi statik text compiler C, array of characters hanya akan lolos dicetak mulus merangkai untai string manakala di gerbong buntutnya berjejer parameter karakter tersembunyi null termination marker. Apakah representatif karakter mematikan itu di C compiler?",
              options: [
                "#eof",
                "\\%s",
                "\\n",
                "\\0"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "700\n",
                description: "Menilai kebergunaan ekstraksi pointer dasar array list"
              }
            ]
          },
          {
            id: "c3-l2",
            title: "Multi Baris Matriks Array 2D",
            explanation: "Bila dimensi satu sekadar mengoleksi deret bangku lurus (Kolom). Kita mendefinisikan dimensi kelipatan Dua seperti papan Catur berukuran [Baris][Kolom]. \nHingga Multi dimensi. Array begini ibarat tumpukan kotak. Berguna mengkoordinat tabel sistem perlintasan x y.\nBentukan Deklarasi Multi-d baris berjejer:\n'int kisi[2][3]' merepresentasi 2 barisan rak laci di mana tiap isi rak laci ada tumpukan sisipan 3 slot laci anakan lagi di dalamnya. Akses element dengan: 'kisi[0][1]' dll.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    // [1 baris, 2 slot elemen kolom]\n    int laci[1][2] = {{80, 90}};\n    printf(\"Ambil Data %d\", laci[0][0]); // Memanggil nilai absolut 80\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int papan_catur[2][2] = {\n        {11, 22},\n        {33, 44}\n    };\n    // Challenge: Locus printf nilai terekam dari Rak 1 (index 0) tapi pada pilar item urutan Ke 2 (index 1)! Nilainya harus memunculkan %d = 22.\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int papan_catur[2][2] = { {11, 22}, {33, 44} };\n    printf(\"%d\\n\", papan_catur[0][1]);\n    return 0;\n}",
            hint: "Tarik dari baris nol dan kolom elemen kesatu : papan_catur[0][1] di dalam format %d printf.",
            quiz: {
              question: "Apakah fungsi peruntukan awal dan termutlak Array berderajat/berdimensi banyak 2D bila diterjemahkan dalam konsep ilmu algoritma realis lapangan?",
              options: [
                "Memecah kode mesin CPU",
                "Menciptakan ruang tabel data list relasional berbentuk Matrix Koordinat (Sumbu X dan Y Array)",
                "Mengkloning duplikasi memori cache L3",
                "Merepresentasikan Text ASCII"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "22\n",
                description: "Tarik nilai Matrix koordinat sel papan catur."
              }
            ]
          },
          {
            id: "c3-l3",
            title: "Memanipulasi Elemen Positif Value",
            explanation: "Sembari bermain dengan indeks, array statis C memperbolehkan kita menindih atau bahkan mengoperasikan operasi kalkulator murni pada pointer list indexnya tsb. \nBerbeda dari Array string (yg harus pakai function strcpy), array numerikal bebas di-\"assign\" operator penembakan sama dengan lurus saja.\nContoh pemicu assignment list override paksa: 'data[1] = 999;'.\nAtaupun menghitung: 'poin[0] = poin[1] * data[2];'",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int temp[2] = {10, 0}; \n    temp[1] = temp[0] * 5; // Slot idx1 menjadi 50 di memori\n    printf(\"%d\", temp[1]);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int statik[2] = {100, 200};\n    // Ubah nilai memori elemen angka 200 (yang mana ada di index statik[1])\n    // menimpa asalnya dioverwrite merubah harganya menjadi 500!\n    \n    // Buktikan pengeditan kamu via pemanggilan output (printf integer).\\n\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int statik[2] = {100, 200};\n    statik[1] = 500;\n    printf(\"%d\\n\", statik[1]);\n    return 0;\n}",
            hint: "Minta pengeditan index list tsb diakses via statik[1] = 500; dan dicetak ulang dng printf biasa.",
            quiz: {
              question: "Metode validasi pengisian apa yang paling wajar untuk menindih/meng-overwrite memory internal list array bilangan genap Numerikal berkapasitas Index khusus di program C?",
              options: [
                "Harus direkonstruksi dengan function bawaan strcpy array() override.",
                "Dengan menyusupkan simbol direct set Assignment penugasan konstan = memori index tujuannya (contoh: list[3]=10;)",
                "Harus dilebur malloc memory alokasi barunya dulu",
                "Pointer exception block list"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "500\n",
                description: "Testing overwrite list memori mutlak"
              }
            ]
          }
        ]
      },
      {
        id: "c3-m2",
        title: "Tipe Ekstra: Struct Organik Objects",
        lessons: [
          {
            id: "c3-l4",
            title: "Kerangka Dasar Object Berbasis Struct",
            explanation: "Array itu naif. Ia tak sudi dikawinkan campuran integer, float, string rupa karakter dalam selimut list yang utuh... Struct lahir menaklukkan kesombongan list!!\nStruct layaknya fondasi rumah Cetakan yang mampu menangkap, mengekang memeluk puluhan turunan tipe data yang tak searah jadi objek entitas utuh.\nAnak-anakan komponen variablenya diberi nama 'Field'.\nPenggabungan objek instansi ke Field parameter utamanya diakses khusus menggunakan 'Operator Titik Dot (.)'.",
            codeExample: "#include <stdio.h>\n// Cetakan wajib luar tubuh program main\nstruct Mobil {\n    int roda;\n    int pintu;\n};\n\nint main() {\n    struct Mobil m1;\n    m1.roda = 4;\n    printf(\"Ban m1 %d\\n\", m1.roda);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nstruct NodeData {\n    int status;\n};\n\nint main() {\n    // Bikin variable beralias 'paket1' mewarisi sifat kerangka keturunan blueprint 'struct NodeData'\n    \n    // Berikan setting field object status miliknya 'paket1' merelai data value = 200.\n    \n    // Print as %d form status payload valuenya.\\n\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    struct NodeData paket1;\n    paket1.status = 200;\n    printf(\"%d\\n\", paket1.status);\n    return 0;\n}",
            hint: "Kamu cukup merelasikan object seperti instruksi.. struct NodeData paket1; lalu panggil atribut paket1.status = ...",
            quiz: {
              question: "Satu notasi karakter sintaks istimewa operator apa sih yang sanggup mendrill dan menembus mengakses kerangka turunan 'field variable properti anakan' didalam induk wujud alokasi satu kelas memory struct di bahasa C?",
              options: [
                "Tanda Panah Langsung (->)",
                "Tanda Hubung (-/Sub)",
                "Tanda Angka Hash (#)",
                "Tanda Titik Sambung (.)"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "200\n",
                description: "Test field mapping object oriented mini c"
              }
            ]
          },
          {
            id: "c3-l5",
            title: "Implementasi Array di Kombinasi Struct",
            explanation: "Struct ibarat blueprint database 1 orang pekerja. Tapi jika Anda memiliki kantor dengan ratusan Pegawai? Masa Anda harus mendeklarasikan satu per satu baris variable Struct 'pgw1', 'pgw2' secara melelahkan.\nSolusi dewa! Timpa struct dengan kemegahan memori ARRAY LIST!\nDeklarasi hebat: 'struct DatabasePegawai listPekerja[100]'.\nAnda punya 100 object terkemas laci memory index C terdepan yang masing-masingnya mewarisi field utuh!",
            codeExample: "#include <stdio.h>\nstruct Pekerja { int level; };\n\nint main() {\n    // 2 orang bertipe struct!\n    struct Pekerja baris_kary[2]; \n    baris_kary[0].level = 5; \n    printf(\"Level mgr ke-1 = %d\", baris_kary[0].level);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nstruct ServerHost {\n    int load;\n};\n\nint main() {\n    // Ciptakan sebuah 'array list of Struct' bernama target_servers dengan size bracket kapasitas [2]\n    // yang dikonfigurasi mengikuti tipe layout blueprint (struct ServerHost)\n    struct ServerHost target_servers[2];\n    \n    // Isikan atribut overload field '.load' khusus pada rak elemen array KEDUA (berarti index pos [1]) ke nilai beban sebesar 99.\n    \n    // Tampilkan integer muatan beban dari list tsb.. format outputnya biarkan angkanya tok plus newline.\\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    struct ServerHost target_servers[2];\n    target_servers[1].load = 99;\n    printf(\"%d\\n\", target_servers[1].load);\n    return 0;\n}",
            hint: "target_servers[1].load = 99; printf(\"%d\\n\", target_servers[1].load);",
            quiz: {
              question: "Manfaat eksponensial tak tertandingi penggabungan/kawin silang antara limitasi tipe memori List Statik 'Array C' dikombinasikan terhadap entitas turunan 'Struct' C, adalah bisa membentuk tatanan...",
              options: [
                "Memory Leak Data Bebas",
                "Sekumpulan banyak variasi Class yang tak terindeks rapi beraturan OS memory",
                "Terciptanya puluhan baris Instansiasi List Kumpulan Objek Data Bertingkat Berkapasitas Massal seperti Array list Karyawan yang kompak/rapi",
                "Penolakan dari sisi engine compilation C"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "99\n",
                description: "Routing test list indexing mapping to array values of composite objects structs."
              }
            ]
          },
          {
            id: "c3-l6",
            title: "Struct Copy Assginment Nilai",
            explanation: "Dalam kasus Array murni purba numerik, menyalin isi Array 1 ke Array 2 sangat mustahil. Mustahil Anda menuliskan 'arrayA = arrayB;' ini menyalahi memory limit. Anda wajib loop menyalinnya sedari item nol hingga elemen paling bontot satu serpihan laci.\n\nTAPI! Karena Anda pakai Struct.. struct mengotakkan datanya. Struct 1 BISA dicopy membabi buta dan lurus disuntikkan setara total ke Struct 2 lain asalkan turunan genotipe mereka klop. \nFitur ini merubah hidup coder!",
            codeExample: "#include <stdio.h>\nstruct Akun { int duit; };\n\nint main() {\n    struct Akun rekA = {5000};\n    struct Akun rekB;\n    rekB = rekA; // WOW! Magic override C assignment! Tersalin 100%\n    printf(\"Uang di Rek B dicopy: %d\", rekB.duit);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nstruct Dompet {\n    int nominal;\n};\n\nint main() {\n    struct Dompet bapak = {1000};\n    struct Dompet anak;\n    \n    // Lakukan Copy Assignmen instan C dari sumber obj bapak menuju obj penerima var si anak...\n    \n    // Display print format %d untuk ngecek val 'nominal' si dompet milik anak.\\n\n    \n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    struct Dompet bapak = {1000};\n    struct Dompet anak;\n    anak = bapak;\n    printf(\"%d\\n\", anak.nominal);\n    return 0;\n}",
            hint: "Selipkan transfer copy assigment ini: anak = bapak; lalu printf.",
            quiz: {
              question: "Kenapa metode penambalan/salin data menyingkat instruksi penyalinan Array statik (Bukan operasi pointer tingkat tinggi) dilarang mentah menggunakan operasional assigment (=) secara gamblang antara sesama object variabel List arraynya?",
              options: [
                "Kapasitas array melebihi ukuran blok pointer bit alokasi system 32 bit OS.",
                "Penyalinan List Array Statik memang Cacat Genetik sejak lahir bahasa C tidak punya operator deep array memori swap override secara mentah (Tidak dibenahi library default C).",
                "Error loop array break.",
                "Compiler auto memanggil destructor C++ memory function."
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "1000\n",
                description: "Akurasi test object bypass property assigment copy clone memory block struct"
              }
            ]
          }
        ]
      },
      {
        id: "c3-m3",
        title: "Stream Fs File Input/Output Text Eksternal",
        lessons: [
          {
            id: "c3-l7",
            title: "Dasar Buka & Tulis Murni File Txt File",
            explanation: "Interaksi mendalam dengan sistem File System (FS) di Linux/Windows mengandalkan pembukaan izin kursor pointer bernada istimewa ( 'FILE *' ).\nAnda membuka gerbang nya memanggil gembok operasi `fopen(\"name.txt\", \"w\")`.\nMode Paling Destruktif: Modifikasi sandi **'w' (Write Mode)**.\nSandi ini sadis, ia menulis ulang dari kertas putih file baru kosongan, bilamana pun file bernama target Anda sudah nongkrong berisian ribuan text dokumen di Disk drive folder, mode W auto membabat hangus bersih data asalnya menjadi luluh lantak file 0kb!\nDan akhir kalimat file harus dicekik memory lock nya alias **Wajib ditutup lewat 'fclose(variable_namanya)'**.",
            codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *f_test = fopen(\"dummy.txt\", \"w\");\n    fputs(\"Saya menulis bersih text file\\n\", f_test);\n    fclose(f_test);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Simulasi pointer penanganan eksekusi File write Mode murni.\n    FILE *fl = fopen(\"db.txt\", \"w\");\n    \n    if (fl != NULL) {\n        // Simulasi printf dummy terminal log sebagai konfirmasi bot test (Aman tanpa real modif proxy IO)\n        printf(\"Tulis ulang File berhasil dikunci fclose.\\n\");\n        fclose(fl); // Penutup kunci memory kernel\n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    FILE *fl = fopen(\"db.txt\", \"w\");\n    if (fl != NULL) {\n        printf(\"Tulis ulang File berhasil dikunci fclose.\\n\");\n        fclose(fl);\n    }\n    return 0;\n}",
            hint: "Murni perhatikan teks string kembalian pengujian log C terminal log. Cukup Printf.",
            quiz: {
              question: "Apakah paramater Mode penulisan (write access access bit control) di parameter parameter function 'fopen' di bahasa C yang paling terkenal Sadis/Murni Destruktif meriset dan menghapus total block text file eksisting seandainya user keliru/ceroboh tidak sengaja melakukan running operasi di file TXT lama miliknya ?",
              options: [
                "Sandi mode 'append'",
                "Sandi mode 'w' / Murni Write Override total",
                "Sandi Read Only +",
                "Sandi pointer null fallback"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Tulis ulang File berhasil dikunci fclose.\n",
                description: "Log File Check Override Simulation output trace"
              }
            ]
          },
          {
            id: "c3-l8",
            title: "Menambah Data Posisi Akhir Teks",
            explanation: "Guna menghindari tragedi musnah data file dari praktek ganas sandi mode file W (Write), Cederdas merekomendasikan penggunaan sakelar sandi **'a' (Mode Append murni)**.\nAlih-alih membobol menghapus data di file, sandi parameter 'a' ini semata mendeteksi kemana lokasi kursor teks paling jurang bawah mentok file teks arsip tersebut berakhir, dan menyambung melestarikan kalimat string penulisan list list kalimat susulan mu selanjutnya merapat di rentet ekor bawah text file tsb. (Sangat ideal buat nulis Log Sistem History Aplikasi yang berkelanjutan harian).",
            codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *log_catat = fopen(\"historis.log\", \"a\");\n    fputs(\"Log Aktivitas Admin No 2.\\n\", log_catat);\n    fclose(log_catat); \n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // Lakukan simulasi pointer function Append.\n    FILE *f_srv = fopen(\"list.txt\", \"a\"); // Catatan sakti 'a'\n    \n    if (f_srv != NULL) {\n        // Print test check kembalian konfirmasi console\n        printf(\"Data append tersambung mulus di ekor list file.\\n\");\n        fclose(f_srv);\n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    FILE *f_srv = fopen(\"list.txt\", \"a\");\n    if (f_srv != NULL) {\n        printf(\"Data append tersambung mulus di ekor list file.\\n\");\n        fclose(f_srv);\n    }\n    return 0;\n}",
            hint: "Panggi dan cetak printf dengan kelulusan persis konfirmasi.",
            quiz: {
              question: "Sewaktu developer mendambakan fungsionalitas aman untuk menyimpan rentetan baris histori user activity (contoh File Activity Logs txt) terus menyambung per harinya dalam satu file lama. Maka parameter manipulasi gembok sandi apik File 'fopen()' yang murni difungsikan adalah wujud...?",
              options: [
                "Mode gembok 'Read Only'",
                "Bentuk sandi 'Write ++'",
                "Sandi operasi Append mode 'a'",
                "Mode Bypass Firewall Sandi Override 'O'"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Data append tersambung mulus di ekor list file.\n",
                description: "Test virtual penulisan rentet egrang list arsip text manual file C stream pointer string mode ekor"
              }
            ]
          },
          {
            id: "c3-l9",
            title: "Perintah Scan Membaca File Text Disk",
            explanation: "Interaksi File Sistem tak komplit bilamana tidak bisa membongkar/membaca tulisan kembali di file ekstensi yang tersimpan.\nMode izin yang menyertainya dalam compiler 'fopen' direpresentasikan murni Sandi karakateristik saklar string izin **'r' (Read Mode Absolut)**.\n\nSatu kendala fatal sandi Read: Apabila mesin C ini mencari rute target file tujuannya di lokasi folder ternyata murni HOAX (tidak ada fisik hard File txt-nya/keliru penamaan file name path).. maka Compiler mengeksekusi blockade dan me-NULL kan memori filestream. Anda WAJIB melempar deteksi IF agar tak Crash jika pointer == NULL (filenya hilang)!",
            codeExample: "#include <stdio.h>\n\nint main() {\n    FILE *f_scan = fopen(\"database_ku.txt\", \"r\");\n    if(f_scan == NULL) {\n        puts(\"Waduh, file databasenya musnah bro!\");\n        return 1; // Keluar kode Error darurat terminal OS Code.\n    }\n    // Proses baca..\n    fclose(f_scan);\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    FILE *baca = fopen(\"tidak_ada.txt\", \"r\");\n    \n    // Cek IF pointer file itu adalah berstatus zonk / NULL (file hoax).\n    if (baca == NULL) {\n        printf(\"Gawat, File HOAX dicari tidak ketemu di Harddisk!\\n\");\n    }\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    FILE *baca = fopen(\"tidak_ada.txt\", \"r\");\n    if (baca == NULL) {\n        printf(\"Gawat, File HOAX dicari tidak ketemu di Harddisk!\\n\");\n    }\n    return 0;\n}",
            hint: "Selalu siagakan if (baca == NULL) kalau buka tipe R! Print peringatannya.",
            quiz: {
              question: "Apakah yang terjadi paling absolut kejam pada fungsi kerja OS sistem blok program sandi 'Read' (\"r\") di C language tatkala file ekstensi target yang dicarinya justru fiktif (Tak eksis nama file nya di path folder PC tsb)?",
              options: [
                "Compiler C mencarikan dengan mendownload nama identik dari internet",
                "Tiba-tiba otomatis membangun baru sebiji fle kosong agar scriptnya tidak sedih",
                "Fungsi Pointer Stream auto-mereturn value NULL point Exception (Bahaya bila dibiarkan tanpa dicegah manual penanganan IF oleh developernya).",
                "Browser OS mati shutdown restart memori cache dump biru."
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Gawat, File HOAX dicari tidak ketemu di Harddisk!\n",
                description: "Mendeteksi kelancaran file null system blok R access permission violation trap test logger C stream text reading OS platform null route"
              }
            ],
            validationRules: [
              {
                pattern: "==\\s*NULL",
                message: "Validasi error Null Check if harus ditancapkan! if (baca == NULL)",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "py-level-1",
    title: "PENGENALAN DASAR BAHASA PYTHON",
    description: "Beralih ke sintaksis dinamis Python, pengenalan variabel dynamic typing, boolean case-sensitive, casting, dan I/O.",
    locked: false,
    accessMode: "auto",
    modules: [
      {
        id: "py4-m1",
        title: "Pendahuluan Python",
        lessons: [
          {
            id: "py4-l1",
            title: "Pengenalan Bahasa Python",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python adalah bahasa pemrograman <strong>tingkat tinggi (high-level)</strong> yang dikenal karena sintaksnya yang <strong>sederhana dan mudah dibaca</strong>, hampir seperti bahasa Inggris biasa. Python bersifat <strong>interpreted</strong> — kode dijalankan baris per baris oleh interpreter, <strong>bukan dikompilasi</strong> terlebih dahulu menjadi file <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.exe</code> seperti C. Hal ini membuat Python mudah untuk eksperimen cepat (rapid prototyping), tetapi umumnya lebih lambat dalam eksekusi dibandingkan bahasa terkompilasi seperti C.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python digunakan secara luas untuk berbagai bidang: pengembangan web, data science, machine learning, otomatisasi, dan scripting. Salah satu ciri khas Python adalah <strong>tidak membutuhkan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code></strong> untuk blok kode — sebagai gantinya, Python menggunakan <strong>indentasi (spasi/tab)</strong> untuk menentukan struktur blok. File Python berekstensi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.py</code> dan dijalankan menggunakan perintah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">python nama_file.py</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Program Python pertama\nprint(&quot;Halo, Dunia!&quot;)\nprint(&quot;Selamat belajar Python.&quot;)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Dunia!\nSelamat belajar Python.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Program Python pertama\nprint(\"Halo, Dunia!\")\nprint(\"Selamat belajar Python.\")",
            initialCode: "# Tampilkan tiga baris informasi menggunakan print()\n",
            solution: "print(\"Bahasa: Python\")\nprint(\"Alasan: Mudah dipelajari\")\nprint(\"Target: Membuat program sederhana\")\n",
            hint: "Gunakan `print()` tiga kali, masing-masing untuk satu baris teks.",
            quiz: {
              question: "Bagaimana Python menentukan struktur blok kode (misalnya isi dari sebuah fungsi atau kondisi)?",
              options: [
                "Menggunakan tanda kurung kurawal `{}`",
                "Menggunakan kata kunci `begin` dan `end`",
                "Menggunakan indentasi (spasi/tab)",
                "Menggunakan titik koma di setiap baris"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Bahasa: Python\nAlasan: Mudah dipelajari\nTarget: Membuat program sederhana\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Bahasa: Python[\"']\\s*\\)",
                message: "Tampilkan baris pertama dengan: print(\"Bahasa: Python\")",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Target: Membuat program sederhana[\"']\\s*\\)",
                message: "Tampilkan baris ketiga dengan: print(\"Target: Membuat program sederhana\")",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l2",
            title: "Perbandingan Sintaks Python dan C",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Meskipun konsep dasar pemrograman (variabel, percabangan, perulangan) sama di Python dan C, <strong>sintaksnya sangat berbeda</strong>. Python tidak membutuhkan deklarasi tipe data eksplisit (Python bersifat <strong>dynamically typed</strong>), tidak membutuhkan titik koma di akhir statement, tidak membutuhkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#include</code>, dan tidak membutuhkan fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">main()</code> sebagai titik masuk wajib — kode di luar fungsi dieksekusi langsung dari atas ke bawah.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Aspek</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Bahasa C</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Python</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Deklarasi tipe</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int x = 5;</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = 5</code> (tipe otomatis)</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Akhir statement</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code> (wajib)</td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak perlu</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Blok kode</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Indentasi</td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Cetak ke layar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf(\"%d\", x);</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(x)</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Komentar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">// atau /* */</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">#</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\">Titik masuk</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int main() { ... }</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Tidak wajib, jalan dari atas</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Python: tidak perlu tipe data, titik koma, atau main()\nnama = &quot;Andi&quot;\nusia = 20\nprint(&quot;Nama:&quot;, nama)\nprint(&quot;Usia:&quot;, usia)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama: Andi\nUsia: 20</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Python: tidak perlu tipe data, titik koma, atau main()\nnama = \"Andi\"\nusia = 20\nprint(\"Nama:\", nama)\nprint(\"Usia:\", usia)",
            initialCode: "# Kode C: \n# int panjang = 10;\n# int lebar = 4;\n# printf(\"Luas: %d\\n\", panjang * lebar);\n\n# Tulis versi Python-nya di sini\n",
            solution: "panjang = 10\nlebar = 4\nprint(\"Luas:\", panjang * lebar)\n",
            hint: "Python tidak membutuhkan tipe data atau titik koma. Gunakan `print(\"Luas:\", panjang * lebar)`.",
            quiz: {
              question: "Manakah pernyataan yang <strong>benar</strong> mengenai perbedaan Python dan C?",
              options: [
                "Python wajib memiliki fungsi `main()` seperti C",
                "Python membutuhkan tipe data dideklarasikan secara eksplisit seperti C",
                "Python tidak membutuhkan titik koma di akhir statement dan menggunakan indentasi untuk blok kode",
                "C menggunakan indentasi untuk blok kode seperti Python"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Luas: 40\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "panjang\\s*=\\s*10",
                message: "Deklarasikan variabel dengan: panjang = 10 (tanpa tipe data dan titik koma)",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Luas:[\"']\\s*,\\s*panjang\\s*\\*\\s*lebar\\s*\\)",
                message: "Tampilkan hasil dengan: print(\"Luas:\", panjang * lebar)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m2",
        title: "Variabel",
        lessons: [
          {
            id: "py4-l3",
            title: "Ketentuan Deklarasi Variabel",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dengan C, Python <strong>tidak memerlukan deklarasi tipe data</strong> sama sekali — variabel langsung dibuat saat kamu <strong>memberikan nilai pertama kali</strong> menggunakan tanda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code>. Python bersifat <strong>dynamically typed</strong>, artinya tipe data sebuah variabel ditentukan secara otomatis berdasarkan nilai yang diberikan, dan <strong>bisa berubah</strong> di tengah program jika diberi nilai bertipe lain.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Aturan penamaan variabel di Python mirip dengan C: hanya boleh mengandung huruf, angka, dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">_</code>), tidak boleh diawali angka, bersifat <strong>case-sensitive</strong>, dan tidak boleh sama dengan keyword Python (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>, dll). Konvensi penamaan standar Python adalah <strong>snake_case</strong> (huruf kecil dengan garis bawah), sesuai PEP 8 (panduan gaya resmi Python).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Tipe data ditentukan otomatis\nnama = &quot;Budi&quot;      # str (string)\nusia = 20          # int (integer)\ntinggi = 170.5     # float\n\nprint(nama, usia, tinggi)\n\n# Variabel bisa berubah tipe\nnilai = 100        # int\nnilai = &quot;Seratus&quot;  # sekarang jadi str\nprint(nilai)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Budi 20 170.5\nSeratus</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Tipe data ditentukan otomatis\nnama = \"Budi\"      # str (string)\nusia = 20          # int (integer)\ntinggi = 170.5     # float\n\nprint(nama, usia, tinggi)\n\n# Variabel bisa berubah tipe\nnilai = 100        # int\nnilai = \"Seratus\"  # sekarang jadi str\nprint(nilai)",
            initialCode: "kota = \"Surabaya\"\n# Tampilkan \"Kota awal: Surabaya\"\n\n# Ubah nilai kota menjadi \"Jakarta\"\n\n# Tampilkan \"Kota sekarang: Jakarta\"\n",
            solution: "kota = \"Surabaya\"\nprint(\"Kota awal:\", kota)\n\nkota = \"Jakarta\"\nprint(\"Kota sekarang:\", kota)\n",
            hint: "Buat variabel, cetak nilainya, lalu beri nilai baru menggunakan `=` lagi, lalu cetak kembali.",
            quiz: {
              question: "Mengapa Python disebut sebagai bahasa yang <strong>dynamically typed</strong>?",
              options: [
                "Karena Python hanya bisa menyimpan satu tipe data per program",
                "Karena tipe data variabel ditentukan otomatis dan bisa berubah selama program berjalan",
                "Karena Python membutuhkan deklarasi tipe data eksplisit seperti C",
                "Karena Python tidak mendukung variabel sama sekali"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Kota awal: Surabaya\nKota sekarang: Jakarta\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Kota awal:[\"']\\s*,\\s*kota\\s*\\)",
                message: "Tampilkan dengan: print(\"Kota awal:\", kota)",
                shouldExist: true
              },
              {
                pattern: "kota\\s*=\\s*[\"']Jakarta[\"']",
                message: "Ubah nilai kota dengan: kota = \"Jakarta\"",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l4",
            title: "Format Penulisan Variabel",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Penulisan variabel di Python mengikuti konvensi <strong>PEP 8</strong> sebagai standar resmi gaya kode Python. Beberapa aturan format penting: nama variabel sebaiknya <strong>deskriptif</strong> dan menggunakan <strong>snake_case</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">jumlah_siswa</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">JumlahSiswa</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">js</code>); konstanta (nilai yang tidak diubah) ditulis dengan <strong>HURUF KAPITAL SEMUA</strong> dan garis bawah (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">PI = 3.14159</code>), meskipun Python tidak memiliki keyword <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">const</code> sungguhan — ini hanya konvensi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung <strong>multiple assignment</strong> — memberi nilai ke beberapa variabel dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a, b, c = 1, 2, 3</code>. Selain itu, Python mendukung <strong>chained assignment</strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = y = z = 0</code> memberikan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> ke ketiga variabel sekaligus. Kedua fitur ini tidak ada di C dan membuat kode Python lebih ringkas.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Multiple assignment\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Chained assignment\nx = y = z = 0\nprint(x, y, z)\n\n# Konstanta (konvensi huruf kapital)\nPI = 3.14159\nprint(&quot;Nilai PI:&quot;, PI)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">1 2 3\n0 0 0\nNilai PI: 3.14159</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Multiple assignment\na, b, c = 1, 2, 3\nprint(a, b, c)\n\n# Chained assignment\nx = y = z = 0\nprint(x, y, z)\n\n# Konstanta (konvensi huruf kapital)\nPI = 3.14159\nprint(\"Nilai PI:\", PI)",
            initialCode: "# Deklarasikan panjang, lebar, tinggi dengan multiple assignment\n\n# Hitung dan tampilkan volume\n",
            solution: "panjang, lebar, tinggi = 5, 3, 2\nprint(\"Volume:\", panjang * lebar * tinggi)\n",
            hint: "Gunakan `panjang, lebar, tinggi = 5, 3, 2` lalu `print(\"Volume:\", panjang * lebar * tinggi)`.",
            quiz: {
              question: "Apa hasil dari kode Python <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = y = z = 5</code> lalu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(x, y, z)</code>?",
              options: [
                "`5 0 0`",
                "`5 5 5`",
                "Error karena tidak valid",
                "`x y z`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Volume: 30\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "panjang\\s*,\\s*lebar\\s*,\\s*tinggi\\s*=\\s*5\\s*,\\s*3\\s*,\\s*2",
                message: "Gunakan multiple assignment: panjang, lebar, tinggi = 5, 3, 2",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Volume:[\"']\\s*,\\s*panjang\\s*\\*\\s*lebar\\s*\\*\\s*tinggi\\s*\\)",
                message: "Tampilkan dengan: print(\"Volume:\", panjang * lebar * tinggi)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m3",
        title: "Tipe Data",
        lessons: [
          {
            id: "py4-l5",
            title: "Tipe Data Number (int, float)",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python memiliki dua tipe data numerik utama yang sering dipakai: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (integer/bilangan bulat, <strong>tanpa batas ukuran</strong> secara teori — berbeda dengan C yang punya batas 32-bit) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> (bilangan pecahan/desimal, presisi ganda mirip <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">double</code> di C). Python juga mendukung tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">complex</code> untuk bilangan kompleks, tapi jarang dipakai pemula.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operasi aritmatika di Python mirip C, dengan satu perbedaan penting: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code> di Python <strong>selalu menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code></strong>, bahkan jika kedua operand <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> = <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code>, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code> seperti di C). Untuk pembagian integer (hasil dibuang desimalnya), Python punya operator khusus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code> (floor division). Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">type()</code> digunakan untuk memeriksa tipe data sebuah nilai.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Fungsi</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pembagian (selalu float)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3.5</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Floor division (integer)</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 // 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 % 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 ** 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>a = 17\nb = 5\n\nprint(a / b)    # Pembagian biasa -&gt; float\nprint(a // b)   # Floor division -&gt; int\nprint(a % b)    # Modulus\nprint(a ** 2)   # Pangkat\nprint(type(a))  # Tipe data a</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">3.4\n3\n2\n289\n&lt;class &#039;int&#039;&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "a = 17\nb = 5\n\nprint(a / b)    # Pembagian biasa -> float\nprint(a // b)   # Floor division -> int\nprint(a % b)    # Modulus\nprint(a ** 2)   # Pangkat\nprint(type(a))  # Tipe data a",
            initialCode: "a = 29\nb = 4\n# Tampilkan a / b dengan label \"Pembagian:\"\n\n# Tampilkan a // b dengan label \"Floor division:\"\n\n# Tampilkan a % b dengan label \"Modulus:\"\n",
            solution: "a = 29\nb = 4\nprint(\"Pembagian:\", a / b)\nprint(\"Floor division:\", a // b)\nprint(\"Modulus:\", a % b)\n",
            hint: "Gunakan operator `/`, `//`, dan `%` masing-masing dalam `print()`.",
            quiz: {
              question: "Apa hasil dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">7 / 2</code> di Python (operator pembagian biasa, bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code>)?",
              options: [
                "`3`",
                "`3.5`",
                "`1`",
                "Error"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Pembagian: 7.25\nFloor division: 7\nModulus: 1\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Pembagian:[\"']\\s*,\\s*a\\s*/\\s*b\\s*\\)",
                message: "Tampilkan dengan: print(\"Pembagian:\", a / b)",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Floor division:[\"']\\s*,\\s*a\\s*//\\s*b\\s*\\)",
                message: "Tampilkan dengan: print(\"Floor division:\", a // b)",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l6",
            title: "Tipe Data String",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">String di Python adalah <strong>tipe data bawaan</strong> untuk teks (berbeda dengan C yang menggunakan array <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">char</code>). String bisa ditulis menggunakan tanda petik <strong>tunggal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'...'</code></strong> atau <strong>ganda <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code></strong> — keduanya setara dan bisa dipilih sesuai kebutuhan (misalnya gunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"...\"</code> jika teks mengandung petik tunggal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'</code>). String juga bisa ditulis multi-baris menggunakan <strong>triple quotes</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">'''...'''</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"\"...\"\"\"</code>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">String di Python bersifat <strong>immutable</strong> (tidak bisa diubah elemennya secara langsung setelah dibuat) tetapi mendukung banyak operasi: <strong>slicing</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">s[0:3]</code> mengambil sebagian string), <strong>concatenation</strong> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <strong>repetisi</strong> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ab\" * 3</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ababab\"</code>), serta fungsi panjang <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">len(s)</code>. Indeks string juga dimulai dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, dan mendukung <strong>indeks negatif</strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">s[-1]</code> mengambil karakter terakhir).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = &quot;Python&quot;\nprint(nama[0])       # Karakter pertama\nprint(nama[-1])      # Karakter terakhir\nprint(nama[0:3])     # Slicing: 3 karakter pertama\nprint(len(nama))     # Panjang string\nprint(nama * 2)      # Repetisi string\nprint(nama + &quot; Programming&quot;)  # Concatenation</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">P\nn\nPyt\n6\nPythonPython\nPython Programming</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = \"Python\"\nprint(nama[0])       # Karakter pertama\nprint(nama[-1])      # Karakter terakhir\nprint(nama[0:3])     # Slicing: 3 karakter pertama\nprint(len(nama))     # Panjang string\nprint(nama * 2)      # Repetisi string\nprint(nama + \" Programming\")  # Concatenation",
            initialCode: "kata = \"Algoritma\"\n# Tampilkan panjang kata\n\n# Tampilkan 4 karakter pertama\n\n# Tampilkan karakter terakhir\n",
            solution: "kata = \"Algoritma\"\nprint(\"Panjang:\", len(kata))\nprint(\"4 huruf pertama:\", kata[0:4])\nprint(\"Huruf terakhir:\", kata[-1])\n",
            hint: "Gunakan `len(kata)`, `kata[0:4]`, dan `kata[-1]`.",
            quiz: {
              question: "Apa hasil dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"abc\"[-1]</code> di Python?",
              options: [
                "`'a'`",
                "`'c'`",
                "Error, indeks negatif tidak valid",
                "`'abc'`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Panjang: 9\n4 huruf pertama: Algo\nHuruf terakhir: a\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "print\\s*\\(\\s*[\"']Panjang:[\"']\\s*,\\s*len\\s*\\(\\s*kata\\s*\\)\\s*\\)",
                message: "Tampilkan dengan: print(\"Panjang:\", len(kata))",
                shouldExist: true
              },
              {
                pattern: "kata\\s*\\[\\s*0\\s*:\\s*4\\s*\\]",
                message: "Ambil 4 karakter pertama dengan slicing: kata[0:4]",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l7",
            title: "Tipe Data Boolean",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> di Python hanya memiliki dua nilai: <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code></strong> dan <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code></strong> (perhatikan huruf besar di awal — berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">true</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">false</code> di C). <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> sebenarnya adalah <strong>subclass dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code></strong>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code> setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code> setara dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, sehingga keduanya bisa digunakan dalam operasi aritmatika.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">></code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">>=</code>) dan operator logika (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code>) di Python mengembalikan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code>. Perlu diperhatikan: Python menggunakan kata <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code> (kata dalam bahasa Inggris), <strong>bukan</strong> simbol <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> seperti di C. Selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, nilai-nilai seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0.0</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"\"</code> (string kosong), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">[]</code> (list kosong), dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code> juga dianggap \"falsy\" (setara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>) dalam konteks boolean.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>status_aktif = True\nsaldo = 50000\n\nprint(status_aktif)\nprint(type(status_aktif))\nprint(saldo &gt; 0 and status_aktif)  # and -&gt; butuh keduanya True\nprint(saldo &gt; 100000 or status_aktif)  # or -&gt; salah satu True cukup\nprint(not status_aktif)  # not -&gt; membalik nilai</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\n&lt;class &#039;bool&#039;&gt;\nTrue\nTrue\nFalse</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "status_aktif = True\nsaldo = 50000\n\nprint(status_aktif)\nprint(type(status_aktif))\nprint(saldo > 0 and status_aktif)  # and -> butuh keduanya True\nprint(saldo > 100000 or status_aktif)  # or -> salah satu True cukup\nprint(not status_aktif)  # not -> membalik nilai",
            initialCode: "usia = 17\npunya_izin = True\n# Tampilkan \"Boleh masuk:\" dengan kondisi usia >= 17 and punya_izin\n\n# Tampilkan \"Boleh tanpa pendamping:\" dengan kondisi usia >= 18 or punya_izin\n",
            solution: "usia = 17\npunya_izin = True\nprint(\"Boleh masuk:\", usia >= 17 and punya_izin)\nprint(\"Boleh tanpa pendamping:\", usia >= 18 or punya_izin)\n",
            hint: "Gunakan operator `and` dan `or` sesuai konvensi Python.",
            quiz: {
              question: "Operator logika apa yang digunakan di Python sebagai pengganti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code> pada bahasa C?",
              options: [
                "`&`",
                "`and`",
                "`AND`",
                "`&&`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Boleh masuk: True\nBoleh tanpa pendamping: True\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "usia\\s*>=\\s*17\\s+and\\s+punya_izin",
                message: "Gunakan operator and: usia >= 17 and punya_izin",
                shouldExist: true
              },
              {
                pattern: "usia\\s*>=\\s*18\\s+or\\s+punya_izin",
                message: "Gunakan operator or: usia >= 18 or punya_izin",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l8",
            title: "Konversi Tipe Data",
            explanation: "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>*Konversi tipe data (type casting)** adalah proses mengubah nilai dari satu tipe ke tipe lainnya. Python menyediakan fungsi bawaan untuk ini: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int(x)</code> mengonversi ke integer (membuang desimal jika dari float, atau mengonversi string angka), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float(x)</code> mengonversi ke desimal, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str(x)</code> mengonversi ke string, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool(x)</code> mengonversi ke boolean.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Konversi sangat penting saat menggabungkan tipe data berbeda — misalnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + 20)</code> akan <strong>error</strong> karena Python tidak bisa menggabungkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code> secara langsung dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>. Solusinya: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + str(20))</code>. Begitu pula, input dari <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> selalu berupa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>, sehingga jika ingin melakukan operasi matematika, harus dikonversi dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float()</code> terlebih dahulu.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka_str = &quot;100&quot;\nangka_int = int(angka_str)   # str -&gt; int\nangka_float = float(angka_int)  # int -&gt; float\nhasil_str = str(angka_int)   # int -&gt; str\n\nprint(angka_int + 50)        # Operasi matematika setelah konversi\nprint(angka_float)\nprint(&quot;Nilai: &quot; + hasil_str) # Concatenation setelah konversi\nprint(bool(0), bool(1), bool(&quot;&quot;))</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">150\n100.0\nNilai: 100\nFalse True False</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "angka_str = \"100\"\nangka_int = int(angka_str)   # str -> int\nangka_float = float(angka_int)  # int -> float\nhasil_str = str(angka_int)   # int -> str\n\nprint(angka_int + 50)        # Operasi matematika setelah konversi\nprint(angka_float)\nprint(\"Nilai: \" + hasil_str) # Concatenation setelah konversi\nprint(bool(0), bool(1), bool(\"\"))",
            initialCode: "umur_str = \"25\"\numur = int(umur_str)\n# Tampilkan \"Umur sekarang: \" digabung dengan str(umur)\n\n# Hitung umur + 5 dan tampilkan \"Umur 5 tahun lagi: \" digabung dengan hasilnya\n",
            solution: "umur_str = \"25\"\numur = int(umur_str)\nprint(\"Umur sekarang: \" + str(umur))\nprint(\"Umur 5 tahun lagi: \" + str(umur + 5))\n",
            hint: "Gunakan `int(umur_str)` untuk konversi, dan `str(...)` saat menggabungkan dengan `+`.",
            quiz: {
              question: "Mengapa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Umur: \" + 20)</code> menghasilkan error di Python?",
              options: [
                "Karena angka 20 terlalu besar",
                "Karena Python tidak bisa menggabungkan tipe `str` dan `int` secara langsung dengan operator `+`",
                "Karena `print()` hanya menerima satu argumen",
                "Karena tanda `+` hanya untuk operasi matematika di Python"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Umur sekarang: 25\nUmur 5 tahun lagi: 30\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "umur\\s*=\\s*int\\s*\\(\\s*umur_str\\s*\\)",
                message: "Konversi string ke int dengan: umur = int(umur_str)",
                shouldExist: true
              },
              {
                pattern: "str\\s*\\(\\s*umur\\s*\\+\\s*5\\s*\\)",
                message: "Konversi hasil penjumlahan dengan: str(umur + 5)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m4",
        title: "Operator",
        lessons: [
          {
            id: "py4-l9",
            title: "Operator Aritmatika",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator aritmatika di Python sebagian besar sama dengan C (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>), dengan tambahan operator <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"></strong></code><strong> untuk </strong>pangkat<strong> dan </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code><strong> untuk </strong>floor division<strong> yang tidak ada di C. Python juga mendukung </strong>operator assignment gabungan<strong> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"></strong>=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%=</code>) yang berfungsi sama seperti di C — menyingkat <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = x + 5</code> menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 5</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Urutan operasi (precedence) di Python mengikuti aturan matematika standar: pangkat (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code>) memiliki prioritas tertinggi, diikuti perkalian/pembagian/modulus/floor division (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code>), dan terakhir penjumlahan/pengurangan (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code>). Tanda kurung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">()</code> selalu bisa digunakan untuk mengubah urutan evaluasi.</p>\n\n  <div class=\"my-4 overflow-x-auto\">\n    <table class=\"w-full border-collapse border border-zinc-200 text-xs\">\n      <thead>\n        <tr><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Operator</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Nama</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Contoh</th><th class=\"border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left\">Hasil</th></tr>\n      </thead>\n      <tbody>\n        <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">/</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Dasar</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 + 3 * 2</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">**</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Pangkat</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2 ** 3</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">8</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">//</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Floor division</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">17 // 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">3</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">%</code></td><td class=\"border border-zinc-200 px-3 py-1.5\">Modulus</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">17 % 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">2</code></td></tr>\n    <tr><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+=</code> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">-=</code> dst</td><td class=\"border border-zinc-200 px-3 py-1.5\">Assignment gabungan</td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x += 5</code></td><td class=\"border border-zinc-200 px-3 py-1.5\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">x = x + 5</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 10\nnilai += 5   # nilai = 15\nnilai *= 2   # nilai = 30\nprint(&quot;Nilai:&quot;, nilai)\n\nprint(&quot;2 pangkat 5:&quot;, 2 ** 5)\nprint(&quot;17 // 5:&quot;, 17 // 5)\nprint(&quot;Urutan operasi:&quot;, 2 + 3 * 2)  # * dulu, lalu +</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nilai: 30\n2 pangkat 5: 32\n17 // 5: 3\nUrutan operasi: 8</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nilai = 10\nnilai += 5   # nilai = 15\nnilai *= 2   # nilai = 30\nprint(\"Nilai:\", nilai)\n\nprint(\"2 pangkat 5:\", 2 ** 5)\nprint(\"17 // 5:\", 17 // 5)\nprint(\"Urutan operasi:\", 2 + 3 * 2)  # * dulu, lalu +",
            initialCode: "skor = 50\n# Tambahkan 20 menggunakan +=\n\n# Kalikan 2 menggunakan *=\n\nprint(\"Skor akhir:\", skor)\nprint(\"5 pangkat 3:\", 5 ** 3)\n",
            solution: "skor = 50\nskor += 20\nskor *= 2\nprint(\"Skor akhir:\", skor)\nprint(\"5 pangkat 3:\", 5 ** 3)\n",
            hint: "Gunakan `skor += 20` lalu `skor *= 2`.",
            quiz: {
              question: "Operator apa di Python yang digunakan untuk operasi <strong>pangkat</strong> (eksponen)?",
              options: [
                "`^`",
                "`**`",
                "`pow`",
                "`exp`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Skor akhir: 140\n5 pangkat 3: 125\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "skor\\s*\\+=\\s*20",
                message: "Gunakan operator assignment gabungan: skor += 20",
                shouldExist: true
              },
              {
                pattern: "skor\\s*\\*=\\s*2",
                message: "Gunakan operator assignment gabungan: skor *= 2",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l10",
            title: "Operator Perbandingan",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan di Python (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">></code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">>=</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\"><=</code>) memiliki <strong>simbol yang identik</strong> dengan C dan menghasilkan nilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>), bukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">1</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0</code> seperti tampilan di C (meskipun secara internal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">bool</code> adalah subclass <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>). Sama seperti C, kesalahan umum pemula adalah tertukar antara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">=</code> (assignment) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">==</code> (perbandingan).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fitur unik Python yang tidak ada di C adalah <strong>chained comparison</strong> — kamu bisa menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0 < x < 10</code> yang secara otomatis berarti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(0 < x) and (x < 10)</code>, tanpa perlu operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code> secara eksplisit. Ini membuat pengecekan rentang nilai jauh lebih ringkas dibanding C yang harus menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">(x > 0) && (x < 10)</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>x = 5\n\nprint(x == 5)         # True\nprint(x != 10)        # True\nprint(0 &lt; x &lt; 10)     # Chained comparison -&gt; True\nprint(10 &lt; x &lt; 20)    # False, karena x = 5 tidak &gt; 10</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\nTrue\nTrue\nFalse</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "x = 5\n\nprint(x == 5)         # True\nprint(x != 10)        # True\nprint(0 < x < 10)     # Chained comparison -> True\nprint(10 < x < 20)    # False, karena x = 5 tidak > 10",
            initialCode: "nilai = 75\n# Tampilkan \"Dalam rentang lulus:\" dengan chained comparison 60 <= nilai <= 100\n",
            solution: "nilai = 75\nprint(\"Dalam rentang lulus:\", 60 <= nilai <= 100)\n",
            hint: "Gunakan `60 <= nilai <= 100`.",
            quiz: {
              question: "Apa yang dimaksud dengan <strong>chained comparison</strong> seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">0 < x < 10</code> di Python?",
              options: [
                "Python akan error karena tidak bisa membandingkan tiga nilai sekaligus",
                "Setara dengan `(0 < x) and (x < 10)`",
                "Setara dengan `(0 < x) or (x < 10)`",
                "Hanya membandingkan `x < 10`, nilai `0` diabaikan"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Dalam rentang lulus: True\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "60\\s*<=\\s*nilai\\s*<=\\s*100",
                message: "Gunakan chained comparison: 60 <= nilai <= 100",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Dalam rentang lulus:[\"']",
                message: "Tampilkan dengan label \"Dalam rentang lulus:\"",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l11",
            title: "Operator Logika",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Python menggunakan kata kunci <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code></strong>, <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code></strong>, dan <strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code></strong> sebagai operator logika, <strong>bukan</strong> simbol <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> seperti C. Cara kerjanya identik secara konseptual: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code> true jika kedua operand true, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code> true jika salah satu true, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">not</code> membalik nilai boolean.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga menerapkan <strong>short-circuit evaluation</strong> sama seperti C: pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a and b</code>, jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">a</code> adalah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">b</code> tidak akan dievaluasi (hasilnya pasti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>). Selain konteks boolean murni, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">and</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">or</code> di Python sebenarnya mengembalikan salah satu <strong>operand itu sendiri</strong> (bukan selalu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>), sebuah perilaku yang sering dimanfaatkan untuk memberi nilai default: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama = input_user or \"Tamu\"</code>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>usia = 25\npunya_ktp = True\nsudah_daftar = False\n\nprint(usia &gt;= 17 and punya_ktp)          # and\nprint(sudah_daftar or usia &gt;= 18)        # or\nprint(not sudah_daftar)                  # not\n\n# Penggunaan unik: memberi nilai default\ninput_user = &quot;&quot;\nnama = input_user or &quot;Tamu&quot;\nprint(&quot;Nama:&quot;, nama)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">True\nTrue\nTrue\nNama: Tamu</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "usia = 25\npunya_ktp = True\nsudah_daftar = False\n\nprint(usia >= 17 and punya_ktp)          # and\nprint(sudah_daftar or usia >= 18)        # or\nprint(not sudah_daftar)                  # not\n\n# Penggunaan unik: memberi nilai default\ninput_user = \"\"\nnama = input_user or \"Tamu\"\nprint(\"Nama:\", nama)",
            initialCode: "hujan = True\nbawa_payung = False\n# Tampilkan \"Kena hujan:\" dengan kondisi hujan and not bawa_payung\n",
            solution: "hujan = True\nbawa_payung = False\nprint(\"Kena hujan:\", hujan and not bawa_payung)\n",
            hint: "Gunakan `hujan and not bawa_payung`.",
            quiz: {
              question: "Apakah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">||</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">!</code> bisa digunakan sebagai operator logika di Python?",
              options: [
                "Ya, identik dengan C",
                "Tidak, Python menggunakan `and`, `or`, dan `not`",
                "Hanya `!` yang bisa digunakan",
                "Hanya `&&` yang bisa digunakan"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Kena hujan: True\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "hujan\\s+and\\s+not\\s+bawa_payung",
                message: "Gunakan: hujan and not bawa_payung",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Kena hujan:[\"']",
                message: "Tampilkan dengan label \"Kena hujan:\"",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m5",
        title: "Menginput / Memasukkan Data",
        lessons: [
          {
            id: "py4-l12",
            title: "Fungsi `input()`",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> adalah fungsi bawaan Python untuk <strong>membaca input dari pengguna</strong> melalui keyboard. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">scanf()</code> di C yang membutuhkan format specifier dan operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">&</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> sangat sederhana: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">variabel = input(\"Pesan prompt: \")</code> — teks di dalam tanda kurung akan ditampilkan sebagai prompt sebelum pengguna mengetik.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hal terpenting yang harus diingat: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> <strong>selalu mengembalikan tipe <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> (string)</strong>, <strong>apapun</strong> yang diketik pengguna — bahkan jika pengguna mengetik angka. Jika kamu langsung menggunakan hasil <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> dalam operasi matematika tanpa konversi, akan terjadi error atau hasil yang tidak diharapkan (concatenation string, bukan penjumlahan angka).</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = input(&quot;Masukkan nama Anda: &quot;)\nprint(&quot;Halo, &quot; + nama + &quot;!&quot;)\n\nangka_str = input(&quot;Masukkan sebuah angka: &quot;)\nprint(&quot;Tipe data input:&quot;, type(angka_str))  # Selalu &lt;class &#039;str&#039;&gt;</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan nama Anda: Sinta\nHalo, Sinta!\nMasukkan sebuah angka: 25\nTipe data input: &lt;class &#039;str&#039;&gt;</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = input(\"Masukkan nama Anda: \")\nprint(\"Halo, \" + nama + \"!\")\n\nangka_str = input(\"Masukkan sebuah angka: \")\nprint(\"Tipe data input:\", type(angka_str))  # Selalu <class 'str'>",
            initialCode: "# Baca nama hewan peliharaan dengan input()\n\n# Tampilkan sapaan menggunakan nama tersebut\n",
            solution: "nama_hewan = input(\"Masukkan nama hewan peliharaanmu: \")\nprint(\"Halo \" + nama_hewan + \", semoga harimu menyenangkan!\")\n",
            hint: "Gunakan `input(\"Masukkan nama hewan peliharaanmu: \")` dan gabungkan dengan `print()`.",
            quiz: {
              question: "Apa tipe data yang <strong>selalu</strong> dikembalikan oleh fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code>, terlepas dari apa yang diketik pengguna?",
              options: [
                "`int`",
                "`float`",
                "`str`",
                "`bool`"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Masukkan nama hewan peliharaanmu: Milo\nHalo Milo, semoga harimu menyenangkan!\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "input\\s*\\(\\s*[\"']Masukkan nama hewan peliharaanmu: [\"']\\s*\\)",
                message: "Gunakan: input(\"Masukkan nama hewan peliharaanmu: \")",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Halo\\s*[\"']\\s*\\+\\s*nama_hewan",
                message: "Gabungkan teks sapaan dengan variabel nama hewan menggunakan +",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l13",
            title: "Mengubah Input Menjadi Integer",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> selalu mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>, untuk melakukan <strong>operasi matematika</strong> terhadap input pengguna, hasilnya harus dikonversi menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> (untuk bilangan bulat) atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float()</code> (untuk bilangan desimal). Pola yang sangat umum digunakan adalah <strong>konversi langsung</strong> dalam satu baris: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">angka = int(input(\"Masukkan angka: \"))</code> — <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">input()</code> dijalankan dulu, hasilnya (str) langsung dibungkus oleh <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Jika pengguna memasukkan teks yang <strong>tidak bisa dikonversi</strong> ke angka (misalnya huruf), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int()</code> akan menghasilkan <strong>error <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">ValueError</code></strong>. Pada level pemula, hal ini diterima sebagai keterbatasan; penanganan error menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">try-except</code> akan dibahas pada level lebih lanjut.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Konversi langsung dalam satu baris\numur = int(input(&quot;Masukkan umur Anda: &quot;))\ntahun_depan = umur + 1\nprint(&quot;Tahun depan usia Anda:&quot;, tahun_depan)\n\nberat = float(input(&quot;Masukkan berat badan (kg): &quot;))\nprint(&quot;Berat dalam gram:&quot;, berat * 1000)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Masukkan umur Anda: 20\nTahun depan usia Anda: 21\nMasukkan berat badan (kg): 65.5\nBerat dalam gram: 65500.0</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Konversi langsung dalam satu baris\numur = int(input(\"Masukkan umur Anda: \"))\ntahun_depan = umur + 1\nprint(\"Tahun depan usia Anda:\", tahun_depan)\n\nberat = float(input(\"Masukkan berat badan (kg): \"))\nprint(\"Berat dalam gram:\", berat * 1000)",
            initialCode: "# Baca angka pertama dan kedua sebagai int\n\n# Tampilkan hasil penjumlahan\n",
            solution: "angka1 = int(input(\"Masukkan angka pertama: \"))\nangka2 = int(input(\"Masukkan angka kedua: \"))\nprint(\"Hasil penjumlahan:\", angka1 + angka2)\n",
            hint: "Gunakan `int(input(\"...\"))` untuk masing-masing variabel, lalu jumlahkan dengan `+`.",
            quiz: {
              question: "Apa yang terjadi jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int(input(\"Masukkan angka: \"))</code> dijalankan tetapi pengguna mengetik <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"abc\"</code>?",
              options: [
                "Hasilnya otomatis menjadi `0`",
                "Python akan menghasilkan error `ValueError`",
                "Python akan mengabaikan input dan meminta input lagi secara otomatis",
                "Hasilnya menjadi string `\"abc\"`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Masukkan angka pertama: 12\nMasukkan angka kedua: 8\nHasil penjumlahan: 20\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "int\\s*\\(\\s*input\\s*\\(\\s*[\"']Masukkan angka pertama: [\"']\\s*\\)\\s*\\)",
                message: "Gunakan: int(input(\"Masukkan angka pertama: \"))",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*[\"']Hasil penjumlahan:[\"']\\s*,\\s*angka1\\s*\\+\\s*angka2\\s*\\)",
                message: "Tampilkan dengan: print(\"Hasil penjumlahan:\", angka1 + angka2)",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py4-m6",
        title: "Menampilkan Data",
        lessons: [
          {
            id: "py4-l14",
            title: "Fungsi `print()`",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> adalah fungsi paling dasar untuk <strong>menampilkan output</strong> ke layar di Python. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">printf()</code> di C yang membutuhkan format specifier, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> bisa langsung menerima <strong>banyak argumen</strong> dipisahkan koma, dan secara otomatis menambahkan <strong>spasi</strong> di antara argumen serta <strong>newline</strong> di akhir.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> memiliki beberapa parameter opsional yang berguna: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sep</code> (separator/pemisah antar argumen, default spasi) dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">end</code> (karakter di akhir, default <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\\n</code>). Contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"A\", \"B\", \"C\", sep=\"-\")</code> menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">A-B-C</code>, dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print(\"Tanpa newline\", end=\"\")</code> mencegah pindah baris setelahnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>print(&quot;Halo&quot;, &quot;Dunia&quot;)              # Pemisah default: spasi\nprint(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, sep=&quot;-&quot;)       # Pemisah custom: -\nprint(&quot;Tidak ada newline&quot;, end=&quot; &quot;) # Tidak pindah baris\nprint(&quot;lanjut di baris yang sama&quot;)\nprint(1, 2, 3, sep=&quot;, &quot;, end=&quot;!\\n&quot;) # Kombinasi sep dan end</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo Dunia\nA-B-C\nTidak ada newline lanjut di baris yang sama\n1, 2, 3!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "print(\"Halo\", \"Dunia\")              # Pemisah default: spasi\nprint(\"A\", \"B\", \"C\", sep=\"-\")       # Pemisah custom: -\nprint(\"Tidak ada newline\", end=\" \") # Tidak pindah baris\nprint(\"lanjut di baris yang sama\")\nprint(1, 2, 3, sep=\", \", end=\"!\\n\") # Kombinasi sep dan end",
            initialCode: "hari = 17\nbulan = 8\ntahun = 1945\n# Tampilkan tanggal dengan format DD/MM/YYYY menggunakan sep\n",
            solution: "hari = 17\nbulan = 8\ntahun = 1945\nprint(f\"{hari:02d}\", f\"{bulan:02d}\", tahun, sep=\"/\")\n",
            hint: "Gunakan `print(hari, bulan, tahun, sep=\"/\")`. Perhatikan agar `bulan` tampil sebagai \"08\" — gunakan format string atau f-string jika diperlukan.",
            quiz: {
              question: "Apa nilai default dari parameter <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">sep</code> pada fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> jika tidak dituliskan?",
              options: [
                "Tanpa karakter apapun (kosong)",
                "Koma `,`",
                "Spasi `\" \"`",
                "Newline `\\n`"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "17/08/1945\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "sep\\s*=\\s*[\"']/[\"']",
                message: "Gunakan parameter sep=\"/\" pada print() untuk format DD/MM/YYYY",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(.*hari.*bulan.*tahun",
                message: "Tampilkan ketiga variabel hari, bulan, dan tahun dalam satu print()",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l15",
            title: "Menampilkan String dan Variabel (f-string)",
            explanation: "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>*f-string<strong> (formatted string literal), diperkenalkan di Python 3.6, adalah cara modern dan paling direkomendasikan untuk </strong>menyisipkan nilai variabel ke dalam string**. Caranya: tambahkan huruf <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f</code> sebelum tanda petik, lalu tulis nama variabel di dalam kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"Nama saya {nama}\"</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">f-string juga mendukung <strong>ekspresi</strong> di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> (tidak hanya variabel tunggal, tapi juga operasi matematika atau pemanggilan fungsi), dan mendukung <strong>format specifier</strong> mirip C menggunakan tanda titik dua, contoh: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"{nilai:.2f}\"</code> untuk 2 angka desimal, atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">f\"{angka:05d}\"</code> untuk padding angka dengan nol di depan hingga 5 digit. f-string jauh lebih ringkas dan mudah dibaca dibandingkan concatenation <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> atau metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.format()</code> yang lebih lama.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nama = &quot;Maya&quot;\nusia = 21\nipk = 3.78912\n\nprint(f&quot;Nama saya {nama}, usia {usia} tahun.&quot;)\nprint(f&quot;IPK: {ipk:.2f}&quot;)          # 2 angka desimal\nprint(f&quot;Tahun depan: {usia + 1}&quot;)  # ekspresi di dalam {}\nprint(f&quot;Kode: {7:03d}&quot;)            # padding nol, lebar 3</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Nama saya Maya, usia 21 tahun.\nIPK: 3.79\nTahun depan: 22\nKode: 007</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nama = \"Maya\"\nusia = 21\nipk = 3.78912\n\nprint(f\"Nama saya {nama}, usia {usia} tahun.\")\nprint(f\"IPK: {ipk:.2f}\")          # 2 angka desimal\nprint(f\"Tahun depan: {usia + 1}\")  # ekspresi di dalam {}\nprint(f\"Kode: {7:03d}\")            # padding nol, lebar 3",
            initialCode: "nama_produk = \"Laptop\"\nharga = 7500000.5\n# Tampilkan menggunakan f-string dengan format 2 desimal untuk harga\n",
            solution: "nama_produk = \"Laptop\"\nharga = 7500000.5\nprint(f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\")\n",
            hint: "Gunakan `f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\"`.",
            quiz: {
              question: "Bagaimana cara menyisipkan nilai variabel <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">harga</code> ke dalam string menggunakan f-string?",
              options: [
                "`print(\"Harga: \" % harga)`",
                "`print(f\"Harga: {harga}\")`",
                "`print(\"Harga: \" . harga)`",
                "`print(\"Harga: ${harga}\")`"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Produk: Laptop, Harga: Rp7500000.50\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "f[\"'].*\\{nama_produk\\}.*\\{harga:\\.2f\\}",
                message: "Gunakan f-string dengan format: f\"Produk: {nama_produk}, Harga: Rp{harga:.2f}\"",
                shouldExist: true
              },
              {
                pattern: "print\\s*\\(\\s*f[\"']",
                message: "Gunakan print() dengan f-string (diawali huruf f sebelum tanda petik)",
                shouldExist: true
              }
            ]
          },
          {
            id: "py4-l16",
            title: "Menggabungkan (Concatenate) String",
            explanation: "<div class=\"space-y-4\">\n      <ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>*Concatenation<strong> (penggabungan string) di Python bisa dilakukan dengan beberapa cara: operator </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code><strong> (menggabungkan string secara langsung, kedua operand harus <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code>), operator </strong><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">*</code><strong> (mengulang string sejumlah angka, misal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ab\" * 3</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"ababab\"</code>), dan </strong>f-string** (cara paling fleksibel, sudah dibahas sebelumnya). Untuk menggabungkan banyak string dengan separator yang konsisten, Python menyediakan metode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">.join()</code>: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"-\".join([\"2024\", \"01\", \"15\"])</code> → <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"2024-01-15\"</code>.</li>\n</ul>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perlu diingat kembali: operator <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">+</code> untuk concatenation <strong>hanya bekerja antar <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code></strong> — menggabungkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str</code> dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">int</code>/<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">float</code> langsung akan menghasilkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">TypeError</code>, sehingga perlu <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">str()</code> untuk konversi (sudah dibahas di pelajaran konversi tipe data). f-string umumnya lebih disukai karena menghindari masalah konversi tipe ini sepenuhnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>depan = &quot;Selamat&quot;\nbelakang = &quot;Pagi&quot;\n\n# Penggabungan dengan +\nprint(depan + &quot; &quot; + belakang)\n\n# Repetisi dengan *\nprint(&quot;=&quot; * 10)\n\n# Penggabungan dengan join\ntanggal = &quot;-&quot;.join([&quot;2024&quot;, &quot;01&quot;, &quot;15&quot;])\nprint(tanggal)</code></pre>\n      </div>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat Pagi\n==========\n2024-01-15</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "depan = \"Selamat\"\nbelakang = \"Pagi\"\n\n# Penggabungan dengan +\nprint(depan + \" \" + belakang)\n\n# Repetisi dengan *\nprint(\"=\" * 10)\n\n# Penggabungan dengan join\ntanggal = \"-\".join([\"2024\", \"01\", \"15\"])\nprint(tanggal)",
            initialCode: "judul = \"BAB 1\"\nsubjudul = \"Pengenalan\"\n# Tampilkan gabungan judul dan subjudul dengan pemisah \" - \"\n\n# Tampilkan garis \"=\" sepanjang 15 karakter\n",
            solution: "judul = \"BAB 1\"\nsubjudul = \"Pengenalan\"\nprint(judul + \" - \" + subjudul)\nprint(\"=\" * 15)\n",
            hint: "Gunakan `judul + \" - \" + subjudul` dan `\"=\" * 15`.",
            quiz: {
              question: "Apa hasil dari ekspresi Python <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">\"-\" * 5</code>?",
              options: [
                "`\"-5\"`",
                "Error, operator `*` tidak bisa digunakan untuk string",
                "`\"-----\"`",
                "`5`"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "BAB 1 - Pengenalan\n===============\n",
                description: "Hasil eksekusi program"
              }
            ],
            validationRules: [
              {
                pattern: "judul\\s*\\+\\s*[\"']\\s*-\\s*[\"']\\s*\\+\\s*subjudul",
                message: "Gabungkan dengan: judul + \" - \" + subjudul",
                shouldExist: true
              },
              {
                pattern: "[\"']=[\"']\\s*\\*\\s*15",
                message: "Tampilkan garis dengan: \"=\" * 15",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "py-level-2",
    title: "PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON",
    description: "Python Control Block Rule: Regulasi indentasi spasi blok ekstrim, fungsi logic per-rute-an percabangan kompleks If-Elif-Else berkesinambungan tanpa henti, pembongkaran skema literasi array For loop, plus Def Function.",
    modules: [
      {
        id: "py5-m1",
        title: "Hukum Suci Indentasi Blok Percabangan",
        lessons: [
          {
            id: "py5-l1",
            title: "Regulasi Kuat Tanda Titik Dua (:) & Indentasi Tab",
            explanation: "Python dengan arogan **melepaskan paksa total runtinitas kuno penjara blok penjepit Kurung Kurawal C '{}'** serta membebaskan sirkus kepenatan pengetikan tanda bungkus tanda kurung parentesis di gerbang utama pernyataan statement Kondisinya.\n\nSebagai kompensasi penggantinya demi tahu mana ujung body block logic, Python mewajibkan pengawalan dan pendeteksian titik gerbang eksekusi barisan blok instruksinya menggunakan notasi gerbang ajaib **Titik Dua (':')** yang melayang nangkring di bagian ekor deklarasi pernyataan statement 'if' atau 'while' mu.. \nTak cukup sampai disitu, lahirlah **Hukum Indentasi Mutlak**: Apapun isian anak cucu rincian instruksi rentetan program code body logic di dalam kepemilikan sub-blok if tsb mesti di **Tab / spasi kosong sejauh 4 pijakan huruf**. Rata baris lurus menyamping ke arah masuk kanan! Tidak mematuhi rute rata identasi yang selaras ini akan memberondong developer berakibat kehancuran Compile error maut (IndentationError) seketika!.",
            codeExample: "bensin = 2\nif bensin > 10:\n    # Blok dalam menjorok tab kanan\n    print(\"Level Lolos\")\n    bensin -= 1\n# Dibawah sini, ini udah keluar if dan menata baris ke dinding kiri asal.\nprint(\"Done Lolos\")",
            initialCode: "angka = 10\n# Susun kondisinya:\n# Bikin jika angka > 15 cetak \"Kelebihan\"\n# Kalo salah tidak eksekusi tapi print line terpisah (bloknya harus digeser diratain balik ke tembok kiri ujung blok main script indent tanpa sub blok spasi) untuk ngeprint kalimat \"Selesai\" mutlak bebas IF.\n",
            solution: "angka = 10\nif angka > 15:\n    print(\"Kelebihan\")\nprint(\"Selesai\")",
            hint: "Harus lurus: if angka > 15: => lalu Tab indent printnya.. lalu tarik ulang rata tembok layar kiri buat print 'selesai' ujung.",
            quiz: {
              question: "Sewaktu programmer lengah abai (kebablasan ngetik / typo rata baris code/tercampur tabs spasi ga jelas formatnya) dan gagal menyejajarkan tab ketukan space identasi di suatu himpunan baris tubuh/body blok skrip pernyataan di sub-blok IF percabangan logic milik program syntax interpreter OS python compiler ini, petaka maut error runtime system jenis apalah dari trace kernel compiler yang langsung sigap menyambar memberhentikan aplikasi dan memberikannya hukuman paksa eksekusi penolakan exception?",
              options: [
                "TypeError Mismatch Output Memory Array Bytes Stack Loop Boolean Value Float Check Integer OS Limit Logic System Trace List Error Param OS Linux Kernel Panic Exception Trace Null Point False Route Pointer Bug Test Byte Function Format Variable Type. ",
                "SyntaxError Lacking Quotes Block String Missing Trace List OS Test Byte Null Trap Byte Bug Integer Boolean String Test Float Form.",
                "Memory Exceed Overflow Pointer Trap System OS.",
                "IndentationError: expected an indented block (Hukuman Mutlak Keselarasan Spasi Kosong) yang menggagalkan eksekusi total system compiler py parser OS limit syntax tree memory block trace err var py module file code."
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "Selesai\n",
                description: "Test kelolosan escape unindent format spacing body block logic routing out py file exec test block"
              }
            ]
          },
          {
            id: "py5-l2",
            title: "Komposisi If dan Else Biasa",
            explanation: "Percabangan sederhana murni di Python hanya bertumpu pada biner pilihan hitam / putih.\n- 'if': Pembuka pintu kebenaran pertama. Jika kondisi yang dipaparkan adalah terjamin True seutuhnya, ruang isian script block ber-indentasi milik si pangkal 'if' tersebut langsung dieksekusi mesin. Jika kondisinya cacat False/Salah.. compiler santai tak berkutik skip acuh tak acuh dan diam melompati rute isinya!\n- 'else:': Berposisi sejajar di barisan yang persis ditarik keluar kembali ke pangkal awalan dinding yang sama dengan kepala 'if' nya. Instruksi 'Else' merupakan gerbang buangan / tong sampah mutlak terakhir penyelamat rute alur eksekusi apabila si penguasa kondisi statement 'if' atasnya mentah-mentah DITOLAK status kondisinya oleh dewan kompilasi penilai True/False!. (Syarat wajab: 'Else' haram hukumnya dikasih pengecekan prasyarat tambahan condition di pantat parameter teks deklarasinya!!)",
            codeExample: "waktu = 10\nif waktu < 12:\n    print(\"Masih Pagi Booz.\")\nelse:\n    print(\"Sudah Agak Siang Menjelang nih.\")",
            initialCode: "angka = 9\n# Bikin logika pengecekan tunggal genap ganjil pakai hitungan modulo mod (%). Sisa bagi jika dibagi operand 2. Modulonya itu kan pakai % !\n# Jika angka modulus 2 perbandingannya sisa sama_dengan 0, cetak genap.\n# Alternatifnya else: otomatis pasti genap? ganjil kan :D , Cetak ganjil.\n",
            solution: "angka = 9\nif angka % 2 == 0:\n    print(\"Genap\")\nelse:\n    print(\"Ganjil\")",
            hint: "Cukup simple logika C di py: if angka % 2 == 0: -> cetak dan else nya di luar identsnya -> cetak.",
            quiz: {
              question: "Mengapa pada kerangka tata baku susunan blok parameter perumusan deklarasi gerbang pengakhir 'else' secara nyata dilarang dan diharamkan total bagi programmer menambahkan statement komparasi logika imbuhan param syarat evaluasi condition condition logic var penguji semisal 'else x > 200:' melampiri ekornya, sehingga hanya saklek ditutup sebatas titik dua tok 'else:' di python? ",
              options: [
                "Memperlambat memory clock rendering system var pointer list loop array.",
                "Compiler auto memanggil destructor C++ C Memory OS system call block byte list array trap null pointer.",
                "Karena peranan Else esensinya didesain murni memang ditujukan untuk jadi saringan penjebol sampah terakhir wadah alternatif mutlak (Catch-All) bilamana kumpulan sisa-sisa syarat if konstelasi hirarki filter kondisional blok pendahulu di level atasnya sudah ditolak kandas alias berguguran status valid True nya semua, sehingga sungguh tak logis dan mustahil error jika masih diuji tes evaluasi logic lanjutan lagi di dalamnya, murni memborong jalur takdir sisa var bool check struct list err py list array trace param block func type format.",
                "Error boolean check false sys int float trap err array exception var struct py module memory leak bool."
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Ganjil\n",
                description: "Testing parity basic routing log engine test block string cast output bool py trap logic system memory block route var param exception format."
              }
            ]
          },
          {
            id: "py5-l3",
            title: "Elif: Paralel Opsi Kondisional Berkepanjangan Bertingkat",
            explanation: "Suatu kondisi sering kali bukanlah Dualisme Hitam Putih biner semata.\nMenyisir range skala IPK atau menu ID dari puluhan deret opsi? Anda mengandalkan fitur sambung rute kondisional **'elif' (Singkatan akronim elegan dari Else-if)**. Python melenyapkan keborosan diksi 'else if' purba C/Java untuk menghemat ngetik jari jemari developer elitnya.\n\nPengecekan berkelanjutan ini dirancang menempatkan prosesor kompilernya murni memeriksa antrian kondisi hierarkis rentang prasyarat evaluasinya secara paralel berurutan tegak lurus mendaki dan menurun dari awalan kepala blok paling puncak hingga ke cabang turunan paling anak bawahnya. Jika kelak satu kondisi rute poin evaluasi tertembak cocok / Valid mencapai skor poin nilai True di tengah rute jaringannya.. sisa berderet-deret anak cabang komparasi rute 'elif' lain di bawah posisinya dan pos rute ekor 'else' otomatis seketika diboikot buta, diloncati acuh bebas hambatan dan program membebaskan memorinya kabur keluar dari rute keseluruhan blok percabangan kompleks hirarkis itu! ",
            codeExample: "skor_kemenangan = 85\nif skor_kemenangan >= 90:\n    print(\"Medali EMAS A\")\nelif skor_kemenangan >= 80:\n    print(\"Medali PERAK B\") # Akan Murni Menang Terpanggil yang Ini Saja!\nelif skor_kemenangan >= 60:\n    print(\"Medali PERUNGGU C\")\nelse:\n    print(\"Gagal Medali Total Kosong.\")",
            initialCode: "angka_uji = 10\n# Susun kondisinya beranting rentet:\n# Bikin rute awal jika angka_uji > 15 cetak \"Angka Besar\"\n# Pakai sisipan penyambung elif untuk mencek rute cek kembali secara urut lurus ke bawah: jika angka_uji > 5 cetak string bernada \"Angka Sedang\"\n# Gunakan penadah mentok else buat cetak pamungkas kata default \"Angka Kecil\"\n",
            solution: "angka_uji = 10\nif angka_uji > 15:\n    print(\"Angka Besar\")\nelif angka_uji > 5:\n    print(\"Angka Sedang\")\nelse:\n    print(\"Angka Kecil\")",
            hint: "Ingat susun lurus vertikal ke ujung tembok format per-indentasi if.. lalu ratakan dgn elif ..dan pungkasi dng else:",
            quiz: {
              question: "Kata singkatan sambung alias jembatan transit per-rute-an ke 2 atau posisi penengah paralel berderet blok rentang pada rancang kode sintaks percabangan seleksi panjang komprehensif kompleks logikal perbandingan Python itu dibakukan seragam mutlak di engine compiler bahasanya sebagai susunan ejaan singkat text apa?",
              options: [
                "else if (Persis C)",
                "elseif (Gaya PHP)",
                "if-2 (Next Gen Logic)",
                "elif (Else If Singkatan Py)"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "Angka Sedang\n",
                description: "Test tembusan validasi di route anak jaringan elif menengah nilai logic fallback default val int param logic err trace system output test array float bool struct err string test int eval if block py format script loop format var block."
              }
            ]
          }
        ]
      },
      {
        id: "py5-m2",
        title: "Lingkaran Putaran Perulangan (Loops)",
        lessons: [
          {
            id: "py5-l4",
            title: "Metodologi For-Loop Generator List dan Indeks Limit Range()",
            explanation: "Python mendesain pemecahan iterasi For looping itu serba magis, canggih terorganisir tak perlu repot muter-muter ngetik int x =0; x<..; kaku ala bapak moyangnya!\nSang iterasi FOR Python sekadar dipasangkan berselingkuh menyusuri pelacakan array list / perabotan mesin per-angkakan massal yang diatur, dijepret cantik mendadak di awang-awang dengan mesin fungsi generator batas memori limit mutlak pembangkit iterasi angka **'in range(batas_start_awal, batas_stop_akhir, titik_lompat_pijakan_step_interval)'**.\n\nKarena dijamin ketapel rentang iterasi pembatas angkanya di engine, alat pamungkas Loop Range() dinobatkan disebut instrumen kelompok *Counted Loop (Struktur Perulangan Cerdas Terukur Limitasi Pasti)* karena secara limitasi kepastian jaminan perlindungan mutlak, Angka langkah eksekutor hitungan memori list deretannya dijanjikan kompiler **PASTI bergaransi bakal memutus gas berhenti ter rem otomatis TEPAT SEDETIK SEBELUM** ia kelabakan menyentuh melanggar nyepak menyenggol menabrak batas angka mutlak \"stop\" nya yang sakral (Konsep pembatasan Iterasi index statis batas akhir selalu Stop_minus_1 / Exclusive Limit Rule Upper Bounds Logic Algorithm!).",
            codeExample: "for urutan in range(3):\n    # Mencetak perulangan panggil string text perintah console loop sebanyak step urutan index 0, lalu lanjut ke urutan 1, dan Terakhir mentok menabrak rem henti perulangan dieksekusi di limit urutan index id ke-2 belaka (Murni karena Batas parameter func Range = 3 tak tersentuh). Total print utuh 3X kemunculan string visual.\n    print(\"Proyek Lolos Sukses!\") ",
            initialCode: "# Bangun rentetan konstruksi blok deklarasi iterasi pengulangan memakai metode format kalimat pakem \"for i in range\" berjumlah settingan kepastian mutlak sejumlah 4 kali/putaran putaran print out batas logic nya.\n# Di ruangan selorok baris Blok yang menjorok indent spasi ke kanannya, silahkan kamu diam-diam menaruh beban panggulan perintah lemparan eksekusi function print() mencetak string berisi (\"Ulang-ulangi Dong\")!\n",
            solution: "for i in range(4):\n    print(\"Ulang-ulangi Dong\")",
            hint: "Minta kamu nulis baris tunggal loop for i in range(4): => Dan diposkan menyusup di bawah ter-indent indentasi kanan selorok ruang taruh cetakannya pakai print.",
            quiz: {
              question: "Misalkan tertulis statement skrip rakitan literasi blok arg baris perputaran putaran statik rentang nilai instruksi function 'for n in range(0, 10):'. Berdasar arsitektural memori Python bounds range exclusive limitation limits engine parameter bounds block, maka pastilah pada pendaratan perputaran titik urutan hitungan langkah eksekutor indeks internal eksekusi array step list index ke nomor berapakah literasi siklus repetisi baris baris ini mendadak bakal diinjak rem distop mati terputus total paksa, mengakhiri blok membiarkan lajunya mengalihkan urutan eksekusi memori keluar instruksi selanjutnya dengan bebas di python sys compiler output tracer OS system var param bool loop float test bypass trace trap block script logic struct list array terminal console string byte pointer limit?",
              options: [
                "Lanjut putaran urut sampai menyentuh menabrak nyentuh dan berhenti di rute angka limit 11. (Index Over Bounds Exception ByPass Memory Limit)",
                "Infinite looping ngeblank error ngeloop OS nge-crash system overflow traceback crash error pointer OS linux kernel trace system block test.",
                "Lolos Hitungan menjejakkan angka persis berhenti di index urutan loop id ke 10 dan berjalan mencetak nilainya penuh utuh mantap dilayar console terminal.",
                "Meskipun angkanya memuat nominal limit tulisan text param 10 aslinya di kurung fungsi... Eksekusinya secara cerdik/ajaib di rem auto-tertutup diblokade mendadak distop dimatikan utuh (stop_limit_reached_exclusivity bounds protection constraint algorithm check engine log compiler flag test OS module error mem sys) ditarik putus tali kendalinya tepat sedetik saat listnya baru memegang pijakan pencapaian mencetak index angka mentok menembus poin hitungan maksimal mentok di titik angka nilai index ke-9 murni!!! Angka parameter batas 10 nya dicampakkan mutlak tak terbaca diluberkannya dibuang total (Limit tak dicetak) !! Hentian Exclusive."
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "Ulang-ulangi Dong\nUlang-ulangi Dong\nUlang-ulangi Dong\nUlang-ulangi Dong\n",
                description: "Test validasi loop perputaran range constraint exclusive memory bounds limit logic bot format var mock param sys trace int py log script trace array list format loop."
              }
            ],
            validationRules: [
              {
                pattern: "range\\(\\s*4\\s*\\)",
                message: "Fungsi perulangan harus menggunakan setting angka range(4)",
                shouldExist: true
              }
            ]
          },
          {
            id: "py5-l5",
            title: "Resiko Bencana Infinite While Loop (Pengulangan List Uncounted)",
            explanation: "Iterasi kuno warisan cikal bakal While sesungguhnya sungguh amat disoroti *sangat-sangat rawan, licin, / riskan kelalaian error mautnya* karena sifat pola mekanisme kerja instruksial purba program While Loop control ini cuma mendasari dan murni menitikberatkan bertumpu mengeksplor ngecek pengujian syarat patokan kondisi nilai benar salah Boolean tok per putarannya di tebing ambang ranah perbandingan logika 'True Validation Engine Check Logic Status Truthy-Boolean Indicator Array Data' (Status sering dijuluki jenis rentetan alur pelacakan siklus buas memori memakan resource RAM membludak mutlak liar alias *Uncounted Loop Endless Trapping Trap Error Exception Out Of memory Check Limit Log Exception Memory Leaks Heap Exceeding Array Module* yg amat rakus memory jika salah tulis condition logic).\nSatu-satunya pakem mutlak agar skrip python ini selamat: Ia bisa Terus Terusan memanggil .. murni terus terputar secara terus menerus memutar gulungannya bak lingkaran iblis tiada unjung asalkan status pengecekan kriteria test parameter awal barisannya akan masih selalu disulap / bernilai masih konstan menyandang status kebenaran (Valid - True ) sepanjang waktu tidak diganggu gugat di logik pikirannya!\n \nGuna memberantas, Mencegah menghindari kiamat tabrakan limitasi RAM komputasi CPU membeku blank screen biru OS (*Fenomena Lag Infinite Lag Leak Loop Trapped Bug System Exception Memory Overload OS Kernel Crash*) maka sudah diwajibkan bagi programer untuk selalu senantiasa berjanji sumpah memastitkan dan menyelipkan bahwa kita harus bersusah payah SELALU AWAS memasukkan suntikan penambah obat penawar dosis angka pergerakan limitasi mutlak yang difungsikan bertugas perlahan sadis menaikan/mengurangi memangkas batas nilainya valuenya statik var counter nya sendiri di tebing akhir rentetan indentasi di bawahnya sana (`contoh baris eksekusi penyetop : y += 1 ATAU penurun angka n -=1 mutlak`) di dasar ruangan identasi kamar akhir perulangan skrip ini secara murni disisipkan paksa inputan baris pendorong manual developer compiler bot logic math operand assignment var ini... dengan jaminan mutlak agar di batas putaran detik kesekian limitasi akhirnya syarat kondisi di puncak pengujinya kelak tercungkil jebol ternodai dan meletup patah lalu hancur akhirnya termanipulasi sukses berganti menjadi berpredikat menyandang nilai kalkulasi ( Finish False limit breached)!.. Lalu system legah berhasil kabur lompat break! ",
            codeExample: "timer_waktu = 1\nwhile timer_waktu <= 3:\n    print(timer_waktu)\n    timer_waktu += 1 # WARNING CRITICAL HARUS DAN MUTLAK ADA! Tanpa suntikan baris keramat penggerak loop ini, value 1 membusuk tak berubah lalu angka 1 pasti akan terus-terusan logisnya mendiami logika statement \"nilainya selalu tak diragukan lagi bakalan 100% lebih kecil daripada angka batas 3 selamanya mutlak!!\". Alhasil: MEMORY CRASH LIMIT LOOP TAK TERHINGGA SAMPAI BLUESCREEN!!! ",
            initialCode: "y_counter_mundur = 1\n# Misi Utama Kamu Bro: Bangun Cetakan wadah putaran rakit while Loop iterasi mutlak di mana dipatok selama kelangsungan data evaluasi memory logic test cek variabel pembading uji y_counter_mundur disyaratkan masih bernilai <= 2 (kurang atawa sama persis dgn angka dualisme batasan dua). berjalan terus mengeksesusi mutar!\n# Beri perintah tempelan di blok indent spasi menjoroknya yaitu print output log per baris mencetak panggil pemuatan var parameter angka bulat integer (y_counter_mundur) per repetisi satu jengkal siklus putaran indent bloknya.\n# SANGAT AMAT TEGAS TENGAS DIPERINGATKAN AWAS CRASH ERROR SYSTEM, kelak kau selipkan jangan sampai musnah Increment step pergerakan dosis pendorong statik angka variable valuenya secara mutlak penambahan math logis tunggal di baris plng mentok dlm blok indentasi tsb (tulisan var nya dikombinasi logic y_counter_mundur += 1). JIKA LUPA = APLIKASI WEB KITA INI 100% MACET TOTAL MATI NGEHANG FREEZE! BUKTIKAN PRESTASIMU BRO.\n",
            solution: "y_counter_mundur = 1\nwhile y_counter_mundur <= 2:\n    print(y_counter_mundur)\n    y_counter_mundur += 1",
            hint: "Rakitan while y_counter_mundur <= 2: => print(y_counter_mundur) => var_yg_sama tambah dengan sintaks ( += 1 ) pastikan baris incrementnya diratakan mutlak wajib masuk numpang masuk nongkrong bernaung sejajar menjorok patuh dlm kelompok indent di payung blok body nya si selimut loop while.",
            quiz: {
              question: "Apakah dampak ganjaran hukuman bayaran tragedi fatal mengerikan konsekuensi maut terparah/Fatal dari kegagalan kekeliruan sangat sepele lupa sekecil jarum dari si seorang manusia programmer amatir logic logic C py form script test string OS struct byte yang entah amnesia sampai kelupaan secara sadar sengaja utuh abai malas lalai mengamankan luput tak tertuang menulis manual modifikasi skrip Incremental gerbong penambah bilangan Variable pendorong Value penyetop step count counter lompat iterasi (seperti halnya pemakaian n += 1,  index = index + 5, dll param math counter logic) didalam susunan barisan text baris akhir tersembunyi rincian scope blok di ruang identasi barisan satu struktur perakitan blok pilar ruang batas pembentuk logic body pemecahan blok Loop Perulangan Sementara Waktu Iteratif Bersyarat Jenis rentetan Evaluasi 'Condition based statement check Uncounted loop' (Struktur Pakem While Statement Check Truthy Loop Logic Loop Parameter py string OS error check float memory)?? Murni murni apa kutukannya?",
              options: [
                "Browser akan merespon dengan gila ngegas force close auto mutlak force exit tutup instan kill thread PID process mem kill mem-restart me reset mutlak paksa mati dan men-tune mem format cache memory perangkat cpu mem OS linux bot test module script traceback function int struct pointer sys py.",
                "Hanya membangkitkan fenomena meloloskan perputaran putaran loop seolah skip sekali dan loop nya tidak pernah sukses menyala sama sekali sekalipun disentuh eksekutor list.",
                "Itu adalah murni perbuatan terlarang membangkitkan ritual klenik Terciptanya lubang cacing waktu fenomena mesin komputasi merusak alam berupa \"Iterasi Lingkaran Jahat Tak Pernah Berujung Menemui Kematian Kepastian Pemberhentian (Sering Diistilahkan sbg: Infinite Looping Bug Fatal Exception Syndrome / Memory CPU Overload RAM Spike Overflow Memory Leaks Loop Overflow)\" di mana putaran CPU mesin di persekian micro detik akan stuck nyangkut di rute sana muter di script sepotong nan dungu macet total tiada akhir nyala ngespam memakan triliunan RAM OS hingga laptop PC anda meranggas kemebul panas meledak error crash freezes blue screen mem lock cpu dead !! Itulah Loop Tak Terhingga.",
                "Script Auto dipetieskan dimaklumi santai dirawat diperbaiki diam diam rahasia sunyi senyap auto dibenerkan oleh bantuan sihir ajaib fungsi tool AI dewa system linter VScode compiler runtime OS fallback interpreter Python pintar jaman purba sakti yang mana dengan baik hatinya membetulkan bug script tulisan user nakal tsbt merubah auto logic error bug text err null ptr script format error. "
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "1\n2\n",
                description: "Auto assessment simulasi counter loop engine validator bypass loop memory trap format OS engine logic trap mem limits loop check bool evaluation true test bool. Trace while trap bypass auto system py float logic OS."
              }
            ],
            validationRules: [
              {
                pattern: "\\+=\\s*1",
                message: "JANGAN MAIN MAIN DENGAH MAUT CPU! DILARANG KERAS MUTLAK SEKALI-KALI MEMICU KEMACETAAN TOTAL INFINITE LOOP GILA TANPA MEMBEKALI STATEMENT SUNTIKAN INCREMENT VAR OPERATOR LOGIC MUTLAK BENTUK += 1 ATAU BENTUK PENAMBAHAN IDENTIK MODIFIKATORNYA DI DALAM BLOK CHECK INDENTASI WHILE ANDA. SISTEM KAMI AKAN MENOLAK PENGETESAN ALGORITMA CODE ANDA DEMI KEAMANAN INFRASTRUKTUR WEB KAMI DARI SERANGAN SERVER PROCESS MEMORY LEAK OVERFLOW INFINIT LOOP THREAD LOCK BOMB JAWABAN ANDA.",
                shouldExist: true
              }
            ]
          },
          {
            id: "py5-l6",
            title: "Pengendalian Akses Manuver Perulangan (Break Cerdas & Pemotongan Laju Continue Pengecualian)",
            explanation: "Python bukan cuma mesin pengeruk iterasi buta. Python membekali kau si developer dewa ini wewenang mencabut mencampakkan pedal rem memotong aliran alur takdir rantai perputaran gerbong kereta 'For' loop statis dan komedi putar tak terbatas 'While' Loop melalu tuas interupsi rem pakem gawat sakral manual bypass peloncat kode intervensi mutahir.\n\nSimak dua Mantra Sakti Interupsi ini:\n- Kata sandi mutlak **'break'**: Menghantam merusak memberangus kaca rem darurat kereta perulangan menghancurkan rute perputaran mesin list loop ini putus menyala terhenti secara paksel murni menghabisi nyawa sisa iterasi urutan angka sisa list limit array di ujung blok seakan iterasi murni dianggap impas sudah habis ludes! Mesin meloncat beranjak menyambung membaca pindah blok keluar ke kode skrip waras di akar main program selanjutnya.\n- Kata mantera **'continue'**: Berfungsi bak maling licik ahli sabotase. Fungsinya menyabotase, membelot me-skip dan membutakan mematikan menolak pembacaan mengeksekusi sisa kumpulan koding rentet rincian baris deret program urut yang bernaung sial nasibnya persis antri tertera berbaris jongkok di jajaran indent lantai level Bawah garis keberadaannya kalimat sintaks sakti continue ini. Mesin akan dipaksa menelan mendadak me-skip / membatalkan pengoprasian mutlak *KHUSUS HANYA 1 BUAH ITERASI PADA PUTARAN POSISI TITIK DETIK* detik tsb tok saja secara tunggal diskip! Mesin lalu dipandu instan mengabaikan rute skipnya dilewat meloncat tarik ke awang-awang ditarik paksa naik ngamuk menunjuk kembali ke ujung puncak awal atap pembuka block for/while lagi guna ditagih mengejar menyambung memeras menagih kembali hutang dari urutan nyawa di siklus step indeks iterasi angka pada putaran angka rentetan giliran step nomor yang perulangan urut selanjut-selanjutnya secara berurut lagi laiknya tiada dosa dan tak ada yang skip terjadi!. ",
            codeExample: "for peluru in range(1, 6): # Tembak rentetan index simulasi angka murni dr peluru 1 ke 5\n    if peluru == 3:\n        continue # Peringatan!! Murni saat nilai indeks logic param peluru membentur angka mutlak 3, blok skip ini meledak nyala mensabotase baris dibawahnya. Maka detik iterasi putaran ke-3 auto lenyap tidak bakal merasakan efek print mencetak ke layar text di terminal! Skrip naik menagih sisa urut angka peluru 4!\n    if peluru == 5:\n        break # Alarm! Begitu index var melinjak nilai logic peluru val 5, Mesin stop mati membanting tuas memberhentikan dan meruntuhkan mesin for loop seketika hancur berkeping. Loop selesai mutlak tak ada putaran lg! Dan takkan pernah ke eksekusi log list angka 5!\n    print(f\"Dorr proyektil tembakan peluru melesat: ke-{peluru}\")\n# Prediksi Tampilan Visual Nyata:\n# Dorr proyektil tembakan peluru melesat: ke-1\n# Dorr proyektil tembakan peluru melesat: ke-2\n# Dorr proyektil tembakan peluru melesat: ke-4\n# KELUAR LOOP! SISA RANGE HABIS BATAL KRN BREAK! Angka 3 lenyap, Angka 5 Batal!! ",
            initialCode: "# Ujian Simulator Manuver Skrip Sabuk Pengaman Logic Python Escape:\n# Misi Mutlak Cerdas Menerobos Barikade Range Limit. Bikin seutas jembatan putaran For loop dinamis dengan index penanda nama bebas misalnya 'val_kucing' melintasi penjelajahan iterasi per-nomor batas limit menggunakan perabotan list generator sakti method \"range(1, 4)\" inklusif menembus step rentang inklusif murni angka list start limit awal 1 sampai ke 3 murni inklusif terbit range batas index limit ujung.\n# Susupkan taktik blok licik: SELIPKAN sebuah blok sepit pengujian filter percabangan if logic penjagaan ganda! \n# Pertama! Jikalau filter 'if' logic mendeteksi penciuman di mana si val_kucing secara logis tepat lurus memegang komparator ganda (==) persis murni angka nominal bilangan [ 2 ] maka lemparkan sabotase skrip sintaks tulisan manuver \"continue\"! (Jangan dikasih string kutip lho murni script statmen log nya)\n\n# Kedua, Baris yang selalu lurus aman dicetak dipaksakan per perputaran print: Cetak gabungan text F-string f\"Kucing ke-{val_kucing}\\n\" atau concatenate koma nya.\n",
            solution: "for val_kucing in range(1, 4):\n    if val_kucing == 2:\n        continue\n    print(f\"Kucing ke-{val_kucing}\")",
            hint: "for val_kucing in range(1, 4): lalu beri ident ke kanannya ketik blok if val_kucing == 2: terus dlm bloknya lemparkan syntax pelarian continue. Mentokin lagi baris di garis sejajar blok dalem for buat masang tembakan printf() parameter format luaran resultnya bro.",
            quiz: {
              question: "Syntax interupsi gahar pengatur lalulintas lompat batas dimensi ruang dimensi komputasi manakah di seluruh alam ekosistem compiler standar bahasa C modern dan pelarian blok scope parser Python log file ini.. yang mana fungsinya secara pakem dikhususkan murni mensabotase mati untuk sekejab langsung mematikan meledakkan lompat nge-trap menghentikan serta memblokir menghabisi merusak rute SELURUH sisa rentetan amunisi siklus jumlah nyawa alokasi urutan list perulangan For Loop tersisa agar habis di detik pengeksekusian nilai variabel saat itu juga (Kabur total ke akhir kurung block tanpa ba-bi-bu mutlak absolut tanpa kompromi)?",
              options: [
                "goto default; exit err format pointer bypass limit trap.",
                "break",
                "continue",
                "return 0 exit log trap pointer memory bit mem flag error."
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Kucing ke-1\nKucing ke-3\n",
                description: "Memvalidasi kelayakan test simulasi manipulasi lompat escape routing bypass putus logic log rentet skip iterasi skip rentang exception continue system logic loop array list bypass."
              }
            ],
            validationRules: [
              {
                pattern: "continue",
                message: "Lupa menyematkan pelarian script string bypass sabotase iterasi index loop continue",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "py5-m3",
        title: "Perakitan Modular Fungsi Custom",
        lessons: [
          {
            id: "py5-l7",
            title: "Konstruksi Blok Penamaan Deklarasi Wadah Def (Define Tool Function)",
            explanation: "Ritual bodoh penulisan Pengulangan duplikat puluhan baris seonggok rincian blok rentetan baris proses algoritma program yang ber-batu-batu copy dan di-paste berkali kali di memori lembar root kertas editor sangatlah amat menjijikkan dan super diharamkan murni di kamus para pemrogram master (Melanggar fatwa etika pilar koding mantap aliran suci: *Prinsip DRY Mutlak = Don't Repeat Yourself!*). \nGuna menyucikannya.. Kita harus membungkus tumpukan bata merapikan menyempilkan meringkas membereskannya memaketkan paksa mengotakkannya menyekap meletakannya menyimpannya menyelipkannya dalam rancang susun wadah kardus kapsul modul panggil tempel alat rakit ulang raksasa yang lazim murni sejagat dibaptis diberi gelar arsitek: **\"Fungsi Dasar Terpusat (Custom Functional Modul Unit / Functional Abstraction Tool)\"**.\n\nAwalilah pondasi kerangkanya pembangunannya dengan semburan mantera instruksi kata pakem saktinya murni awalan wajib `def gabung_nama_fungsi_unik_alias_kalian():` lurus membentang diimbangi disandingkan urutan penampung piringan selipan lobang corong kran parameternya bila perlu... disambung murni perlakuan mem-barikade identasi selorok susunan anak anak block rincian barisan tata operasional kerja kode nya yang mutlak wajib patuh bersaf menjorok beringsut 1 pilar ke sebelah arah kanan merunduk dibawah blok perut indentasi payung kemah titik dua ( : ) eksekusi rincian sang induk arsitektur def function tersebut murni patuh tunduk tak lekas lari dr scope block kurungan method lokal tersebut kelak.\nSelain sekadar memerintah murni suruhan kerja fisik perbudakan koding... Fungsi function pun dapat difungsikan pula memukul memantulkan menendang balik bola balasan nilai jawaban feedback hasil kalkulasi jerih olahan result data output olahan hitungan val array value result-nya dengan sakral lurus melempar sebuah return param value baris tersembunyi disemati penanda khusus ber-kata kunci awalan sintaks pamungkas `return objek_hasilnya_bro` ke penangkap var di luar batas void universe fungsi isolasi teritori lokal lingkup ini (scope encapsulation local variable closure format block def function module scope test pointer function definition param func block pointer module trap list arr test system log log log!).",
            codeExample: "def fungsi_perkalian_rahasia(data_a, data_b):\n    hasil_matematika = data_a * data_b\n    return hasil_matematika # Pengembalian lemparan output nilai akhir mentah tanpa diprint terlebih dahulu, nilainya diselamatkan di awang awang dikirim ke si pengundang method kelarnya\n\n# Ini di lantai blok root public eksternal dunia luar area alam bebas diluar penjara Def blok kamar scope local encapsulation...\nprint(fungsi_perkalian_rahasia(5, 5)) # Menjerit panggil manggil nama method.. trus var Result tangkapan bola return output yg dilempar keluar itu tertangkap nyangkut dan seketika langsung tercetak termuntahkan dilesatkan dicetak sbg bentuk display sbg result mentahan var murni berwujud angka desimal bulat 25 !",
            initialCode: "# 1. Misi kamu sederhana abis bro: Tulis dan Jadikan kumpulkan bungkus satu kumpulan kamar struktur rutinitas blok baru sebut lebelin namanya lewat syntax awalan perakit blueprint function `def sirine()` dengan kelengkapan mutlak wajib titk dua nya ( : )\n# 2. Yang mana instruksi tugas anak isinya (di-tab 1x menjolok) semata hanya menanggung beban 1 keping baris string cetakan statis mem print kalimat literal text \"Wiu Wiu Darurat!\" tok! \n# 3. Last step kawan: Panggil getok gendor panggillah nama dan trigger perintah paksa eksekusi tombol nyalakan secepat kilat method instansiasi objek func blueprint sirine() rakitan mu mu murni saklar tadi di rute sejajar tembok akar rata kiri di public alam terluar scope blok anak def nya... (panggil di line akhir di bawah luar scope def nya persis).\n",
            solution: "def sirine():\n    print(\"Wiu Wiu Darurat!\")\n\nsirine()",
            hint: "Bungkus deklarasi pembuat bungkus wadah the function nya.. geser masuk ke dlm perut indentasikan letakan kode instruksi suruhan fungsinya.. lalu tab kembali ratakan punggung panggil teriak panggil nama sirine() dan jalankan nyalakan saklarnya method pemanggil namnya di public scope sejajar root alam luar tembok sebelah bawah dinding di ujung pinggiran tembok sbg console caller trigger run method eksekutor the the def-nya...",
            quiz: {
              question: "Berkenaan tabiat kodrat lantaran sifat karakteristik pemaksaan label tanda keharusan penyebutan nama \"Static-Type\" penetapan tipe perkenalan paksa format wujud kasta di awal pemesanan genotipe variable (seperti awalam penamaan cth var kaku bertulis var types string, void namafunc, int method, char tipe.. sbg pendata parameter statik struct bytes size float dilarang bebas pointer) sungguh telah utuh ditanggalkan diludahi disingkirkan dihancurkan musnah total sedari awal desain rancang bangun penciptaan blueprint Python OS runtime engine di dalam proses memanifes/arahan membentuk menciptakan merakit mencetak modul racikan rancang blueprint rincian susunan deret prosedur sebuah fungsi blok void sub code program instruksi urutan kerja pemanggilan module khusus re-useable rute fungsional anyar (Function Tool Code Code)...   Maka satu keping peluit kata perintah sintaks awalan sakral baku text string pengganti yang diperkenankan mendirikan merakit menaungi pondasi perantara sebagai pilar penetap the function blueprint identifier method structure builder keyword code itu sendiri ialah dinamani dan disingkat dalam teks tiga huruf karakter dewa murni sakti berwujud text sintaks apa di otak kompiler py runtime loop float check array python syntax file sys list exception check mem compiler trap var trace pointer sys memory ?",
              options: [
                "let func ==",
                "class::() func var func.",
                "def (Berasal murni Dari kata Define/ Mendefinisikan Fungsi Abstraksi Logic Penjadwalan Code Block Executable Reusable Tool Code Generator Blueprint Func Tool. ",
                "void main() struct init ptr."
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Wiu Wiu Darurat!\n",
                description: "Uji dan Check kelayakan ekses mutlak uji nyali tes pemanggilan eksternal root pemantik engine internal rincian anak tangga script test method scope object blok scope run running test logic terminal trace engine loop module object runtime exec system void parameter return block eval test block run script format os bot pointer trap test return run trace def module func definition run block test bypass memory trap bypass os sys trap method OS OS bot."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "py-level-3",
    title: "LIST, DICTIONARY, FORMAT IO TEXT",
    description: "Python Advanced List Management dan manipulasi Key Json Style",
    modules: [
      {
        id: "py6-m1",
        title: "Dinamika List & Array",
        lessons: [
          {
            id: "py6-l1",
            title: "List Dinamis Mutabel Lengkap",
            explanation: "Python tidak mengenal Array C kaku. Mereka menggunakan struktur sakti '[ List ]'!\nSifatnya Mutabel (Bebas diobok-obok dirubah dipecah) dan menampung tipe Gado-gado acak!",
            codeExample: "listku = [100, 'Teks', True]\nlistku.append(999)\nprint(listku)",
            initialCode: "angka_deret = [1, 2, 3]\n# Misi Anda: Modifikasi angka_deret tersebut dan selipkan append() guna menginject/menambah angka nilai bulat 4 pada pos urutan terakhir ekor array itu.\n# Buktikan eksistensinya dengan mengeksekusi print(angka_deret)\n",
            solution: "angka_deret = [1, 2, 3]\nangka_deret.append(4)\nprint(angka_deret)",
            hint: "Ketik angka_deret.append(4) barulah pungkasi print(angka_deret)",
            quiz: {
              question: "Apakah parameter metode penambah data paling belakang di Python list?",
              options: [
                "add()",
                "insert()",
                "push()",
                "append()"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "[1, 2, 3, 4]\n",
                description: "Test list append."
              }
            ]
          },
          {
            id: "py6-l2",
            title: "Dictionary Kunci Mapping Canggih",
            explanation: "Format dictionary mengawinkan 1 kunci (Key string text) dan 1 nilai (value). Pemanggilan dan manipulasi memory murni mendayagunakan panggilan Nama 'Kunci' propertinya alih alih index.",
            codeExample: "robot = {'warna': 'merah', 'seri': 10}\nprint(robot['warna'])",
            initialCode: "murid_dict = {'uuid': '12B-01', 'grade': 'High'}\n# Tampilkan lewat print atribut properti kunci 'grade' saja dari map ini!\n",
            solution: "murid_dict = {'uuid': '12B-01', 'grade': 'High'}\nprint(murid_dict['grade'])",
            hint: "print(murid_dict['grade'])",
            quiz: {
              question: "Objek penyimpanan perpasangan Kunci-Nilai mirip Format sintaks JSON di py disebut sbg struktur?",
              options: [
                "Set()",
                "Struct",
                "ListArray()",
                "Dictionary / Dict {}"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "High\n",
                description: "Test Dict"
              }
            ]
          },
          {
            id: "py6-l3",
            title: "With Open File Manager Log",
            explanation: "Sembari melupakan fopen purba.. Py memperkenalkan blok sakti penjaga gembok file OS bernama 'with open(nama, sandi) as f:'. \nOtomatis tertutup di akhir lekuk indentasinya tanpa fclose manual!",
            codeExample: "with open('dummy.txt', 'a') as f:\n    f.write('sukses nulis')",
            initialCode: "# Simulasikan block virtual context manager \"with open\" mode Append \"a\" manipulasi file \"dummy.txt\".\n# Simpan 1 baris string utuh bertulisan persis ini: \"Log_Berhasil_Di_Inject\\n\" lewat  .write().\n# Terakhir, tutuplah identasinya. print konfirmasi text \"Akses Beres\"\n",
            solution: "with open(\"dummy.txt\", \"a\") as f:\n    f.write(\"Log_Berhasil_Di_Inject\\n\")\nprint(\"Akses Beres\")",
            hint: "with open(\"dummy.txt\", \"a\") as f: -> f.write() -> keluar pindah identasi -> print(\"Akses Beres\")",
            quiz: {
              question: "Kelebihan blok pengaman akses Context with open() terhadap C open murni adalah?",
              options: [
                "Lebih lambat",
                "Wajib manual reset null param list trace os",
                "Memakan memori list trap module python",
                "Berteknologi Auto Memory Close OS / membebaskan f.close secara cerdas terotomatisasi di batas jurang keluar ujung indentasinya"
              ],
              correctAnswer: 3
            },
            testCases: [
              {
                expectedOutput: "Akses Beres\n",
                description: "Test IO Write mode"
              }
            ]
          }
        ]
      }
    ]
  }
];
