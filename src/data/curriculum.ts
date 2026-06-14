// Auto-generated curriculum file by build_combined_curriculum.cjs
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
    description: "Mengatur alur kontrol program menggunakan percabangan (if, if-else, switch-case), perulangan (while, do-while, for), dan peloncatan (goto, break, continue).",
    modules: [
      {
        id: "c2-m1",
        title: "Percabangan",
        lessons: [
          {
            id: "c2-l1",
            title: "Percabangan if",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> adalah struktur kontrol paling dasar dalam bahasa C yang memungkinkan program <strong>mengeksekusi blok kode tertentu hanya jika suatu kondisi bernilai benar (true)</strong>. Dalam bahasa C, nilai <strong>0</strong> dianggap <em>false</em> dan nilai <strong>selain 0</strong> dianggap <em>true</em>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks dasar percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> adalah: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (kondisi) { pernyataan; }</code>. Jika kondisi bernilai benar, maka blok kode di dalam kurung kurawal akan dieksekusi. Jika salah, blok kode tersebut akan dilewati.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><strong>Perhatian:</strong> Kesalahan umum pemula adalah menambahkan titik koma <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code> tepat setelah kondisi if, seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if (x &gt; 0);</code>. Ini menyebabkan blok kode di bawahnya <strong>selalu dieksekusi</strong> tanpa mempedulikan kondisi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 80;\n\n    if (nilai &gt;= 75) {\n        printf(\"Selamat! Anda lulus.\\n\");\n    }\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat! Anda lulus.\nProgram selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int nilai = 80;\n\n    if (nilai >= 75) {\n        printf(\"Selamat! Anda lulus.\\n\");\n    }\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int umur = 18;\n\n    // TODO: Buat percabangan if untuk memeriksa apakah umur >= 17\n    // Jika ya, cetak \"Anda boleh membuat SIM.\"\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int umur = 18;\n\n    if (umur >= 17) {\n        printf(\"Anda boleh membuat SIM.\\n\");\n    }\n\n    printf(\"Program selesai.\\n\");\n    return 0;\n}",
            hint: "Gunakan if (umur >= 17) lalu di dalam kurung kurawal tuliskan printf untuk mencetak pesan.",
            quiz: {
              question: "Apa yang terjadi jika kita menulis if (x > 5); { printf(\"Besar\"); } ?",
              options: [
                "printf hanya dijalankan jika x > 5",
                "Program error saat kompilasi",
                "printf selalu dijalankan tanpa mempedulikan kondisi karena titik koma setelah if",
                "Program berhenti karena infinite loop"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Anda boleh membuat SIM.\nProgram selesai.\n",
                description: "Cetak pesan ketika umur >= 17"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s*\\(\\s*umur\\s*>=\\s*17\\s*\\)",
                message: "Gunakan if (umur >= 17) untuk memeriksa kondisi umur",
                shouldExist: true
              },
              {
                pattern: "printf\\s*\\(\\s*\"Anda boleh membuat SIM",
                message: "Cetak pesan \"Anda boleh membuat SIM.\" di dalam blok if",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l2",
            title: "Percabangan if - else",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> digunakan ketika program harus memilih antara <strong>dua jalur eksekusi</strong>. Jika kondisi pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bernilai benar, blok kode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> dijalankan. Jika salah, blok kode <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> yang dijalankan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sangat penting untuk selalu menggunakan <strong>kurung kurawal</strong> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{ }</code> untuk menandai blok kode, meskipun hanya berisi satu baris pernyataan. Hal ini menghindari bug yang sulit dilacak dan membuat kode lebih mudah dibaca.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> juga bisa disarangkan (<em>nested</em>), yaitu menempatkan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> di dalam blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> lain untuk menangani logika yang lebih kompleks.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int angka = 7;\n\n    if (angka % 2 == 0) {\n        printf(\"%d adalah bilangan genap.\\n\", angka);\n    } else {\n        printf(\"%d adalah bilangan ganjil.\\n\", angka);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">7 adalah bilangan ganjil.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int angka = 7;\n\n    if (angka % 2 == 0) {\n        printf(\"%d adalah bilangan genap.\\n\", angka);\n    } else {\n        printf(\"%d adalah bilangan ganjil.\\n\", angka);\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int suhu = 30;\n\n    // TODO: Buat percabangan if-else\n    // Jika suhu > 35, cetak \"Cuaca sangat panas!\"\n    // Jika tidak, cetak \"Cuaca normal.\"\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int suhu = 30;\n\n    if (suhu > 35) {\n        printf(\"Cuaca sangat panas!\\n\");\n    } else {\n        printf(\"Cuaca normal.\\n\");\n    }\n\n    return 0;\n}",
            hint: "Gunakan if (suhu > 35) untuk kondisi panas, dan else untuk kondisi normal.",
            quiz: {
              question: "Pada percabangan if-else, kapan blok else dieksekusi?",
              options: [
                "Ketika kondisi if bernilai benar (true)",
                "Ketika kondisi if bernilai salah (false)",
                "Blok else selalu dieksekusi setelah blok if",
                "Blok else dieksekusi bersamaan dengan blok if"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Cuaca normal.\n",
                description: "Cetak 'Cuaca normal.' ketika suhu = 30 (tidak lebih dari 35)"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s*\\(\\s*suhu\\s*>\\s*35\\s*\\)",
                message: "Gunakan if (suhu > 35) untuk memeriksa kondisi suhu",
                shouldExist: true
              },
              {
                pattern: "\\}\\s*else\\s*\\{",
                message: "Gunakan blok else untuk menangani kondisi sebaliknya",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l3",
            title: "Percabangan if - else if",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if - else if</code> digunakan ketika terdapat <strong>lebih dari dua kemungkinan jalur</strong> eksekusi. Struktur ini memungkinkan kita memeriksa beberapa kondisi secara berurutan dari atas ke bawah.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Urutan evaluasi sangat penting: kondisi diperiksa <strong>dari atas ke bawah</strong>, dan begitu satu kondisi bernilai benar, blok kode terkait dijalankan lalu seluruh rantai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else if</code> dilewati. Oleh karena itu, letakkan kondisi yang <strong>paling spesifik/ketat di bagian atas</strong> agar tidak tertimpa oleh kondisi yang lebih umum.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> di akhir bersifat opsional dan berfungsi sebagai penangkap kondisi yang tidak terpenuhi oleh satupun <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> atau <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code> sebelumnya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int nilai = 72;\n\n    if (nilai &gt;= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (nilai &gt;= 80) {\n        printf(\"Grade: B\\n\");\n    } else if (nilai &gt;= 70) {\n        printf(\"Grade: C\\n\");\n    } else {\n        printf(\"Grade: D\\n\");\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Grade: C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int nilai = 72;\n\n    if (nilai >= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (nilai >= 80) {\n        printf(\"Grade: B\\n\");\n    } else if (nilai >= 70) {\n        printf(\"Grade: C\\n\");\n    } else {\n        printf(\"Grade: D\\n\");\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int kecepatan = 120;\n\n    // TODO: Buat percabangan if - else if - else\n    // Jika kecepatan > 100, cetak \"Terlalu cepat! Kurangi kecepatan.\"\n    // Jika kecepatan >= 60, cetak \"Kecepatan normal.\"\n    // Jika tidak (di bawah 60), cetak \"Terlalu lambat.\"\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int kecepatan = 120;\n\n    if (kecepatan > 100) {\n        printf(\"Terlalu cepat! Kurangi kecepatan.\\n\");\n    } else if (kecepatan >= 60) {\n        printf(\"Kecepatan normal.\\n\");\n    } else {\n        printf(\"Terlalu lambat.\\n\");\n    }\n\n    return 0;\n}",
            hint: "Mulai dengan if (kecepatan > 100), lalu else if (kecepatan >= 60), dan terakhir else.",
            quiz: {
              question: "Pada struktur if - else if, apa yang terjadi jika kondisi pertama sudah bernilai benar?",
              options: [
                "Semua blok else if dan else tetap diperiksa",
                "Hanya blok if yang dijalankan, sisanya dilewati",
                "Program menampilkan error karena ada banyak kondisi",
                "Blok else selalu dijalankan sebagai tambahan"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Terlalu cepat! Kurangi kecepatan.\n",
                description: "Cetak pesan terlalu cepat ketika kecepatan = 120"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s*\\(\\s*kecepatan\\s*>\\s*100\\s*\\)",
                message: "Gunakan if (kecepatan > 100) sebagai kondisi pertama",
                shouldExist: true
              },
              {
                pattern: "else\\s+if\\s*\\(\\s*kecepatan\\s*>=\\s*60\\s*\\)",
                message: "Gunakan else if (kecepatan >= 60) sebagai kondisi kedua",
                shouldExist: true
              },
              {
                pattern: "\\}\\s*else\\s*\\{",
                message: "Tambahkan blok else sebagai penangkap kondisi terakhir",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l4",
            title: "Percabangan switch case",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">switch-case</code> digunakan untuk memilih salah satu dari beberapa blok kode berdasarkan <strong>nilai konstan</strong> dari suatu ekspresi. Struktur ini sangat cocok ketika kita ingin membandingkan satu variabel dengan <strong>banyak nilai tetap</strong> (integer atau karakter).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Setiap <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">case</code> harus diakhiri dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break;</code> untuk menghentikan eksekusi. Tanpa <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>, program akan mengalami <strong>fallthrough</strong>, yaitu mengeksekusi case berikutnya secara berurutan meskipun nilai tidak cocok.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">default</code> berfungsi seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> pada if-else, yaitu dijalankan ketika <strong>tidak ada case yang cocok</strong>.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int hari = 3;\n\n    switch (hari) {\n        case 1:\n            printf(\"Senin\\n\");\n            break;\n        case 2:\n            printf(\"Selasa\\n\");\n            break;\n        case 3:\n            printf(\"Rabu\\n\");\n            break;\n        default:\n            printf(\"Hari tidak valid\\n\");\n            break;\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Rabu</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int hari = 3;\n\n    switch (hari) {\n        case 1:\n            printf(\"Senin\\n\");\n            break;\n        case 2:\n            printf(\"Selasa\\n\");\n            break;\n        case 3:\n            printf(\"Rabu\\n\");\n            break;\n        default:\n            printf(\"Hari tidak valid\\n\");\n            break;\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int bulan = 2;\n\n    // TODO: Buat switch-case untuk menampilkan nama bulan\n    // case 1: cetak \"Januari\"\n    // case 2: cetak \"Februari\"\n    // case 3: cetak \"Maret\"\n    // default: cetak \"Bulan tidak valid\"\n    // Jangan lupa break di setiap case!\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int bulan = 2;\n\n    switch (bulan) {\n        case 1:\n            printf(\"Januari\\n\");\n            break;\n        case 2:\n            printf(\"Februari\\n\");\n            break;\n        case 3:\n            printf(\"Maret\\n\");\n            break;\n        default:\n            printf(\"Bulan tidak valid\\n\");\n            break;\n    }\n\n    return 0;\n}",
            hint: "Gunakan switch (bulan) lalu tulis case 1:, case 2:, case 3:, dan default: dengan break di setiap case.",
            quiz: {
              question: "Apa yang terjadi jika break dihilangkan dari sebuah case di dalam switch?",
              options: [
                "Program error saat kompilasi",
                "Hanya case yang cocok yang dieksekusi",
                "Terjadi fallthrough: eksekusi berlanjut ke case berikutnya tanpa pengecekan",
                "Program langsung loncat ke blok default"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Februari\n",
                description: "Cetak nama bulan Februari ketika bulan = 2"
              }
            ],
            validationRules: [
              {
                pattern: "switch\\s*\\(\\s*bulan\\s*\\)",
                message: "Gunakan switch (bulan) untuk memulai percabangan switch",
                shouldExist: true
              },
              {
                pattern: "case\\s+2\\s*:",
                message: "Tambahkan case 2: untuk menangani bulan Februari",
                shouldExist: true
              },
              {
                pattern: "break\\s*;",
                message: "Jangan lupa tambahkan break; di setiap case",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "c2-m2",
        title: "Perulangan",
        lessons: [
          {
            id: "c2-l5",
            title: "Perulangan while",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> digunakan untuk mengeksekusi blok kode secara <strong>berulang selama kondisi bernilai benar</strong>. Kondisi diperiksa <strong>sebelum</strong> setiap iterasi, sehingga jika kondisi awal sudah bernilai salah, blok kode <strong>tidak akan pernah dieksekusi</strong> sama sekali.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks dasar: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while (kondisi) { pernyataan; }</code>. Pastikan di dalam blok perulangan terdapat pernyataan yang <strong>mengubah nilai kondisi</strong> agar perulangan bisa berhenti. Jika tidak, akan terjadi <strong>infinite loop</strong> (perulangan tak terhingga) yang membuat program tidak pernah selesai.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> cocok digunakan ketika kita <strong>tidak tahu pasti berapa kali perulangan akan dilakukan</strong>, melainkan bergantung pada suatu kondisi tertentu.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int i = 1;\n\n    while (i &lt;= 5) {\n        printf(\"Iterasi ke-%d\\n\", i);\n        i++;\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Iterasi ke-1\nIterasi ke-2\nIterasi ke-3\nIterasi ke-4\nIterasi ke-5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\n    while (i <= 5) {\n        printf(\"Iterasi ke-%d\\n\", i);\n        i++;\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int hitung = 1;\n\n    // TODO: Buat perulangan while yang mencetak angka 1 sampai 3\n    // Format: \"Angka: 1\", \"Angka: 2\", \"Angka: 3\"\n    // Jangan lupa increment variabel hitung!\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int hitung = 1;\n\n    while (hitung <= 3) {\n        printf(\"Angka: %d\\n\", hitung);\n        hitung++;\n    }\n\n    return 0;\n}",
            hint: "Gunakan while (hitung <= 3) dan di dalam loop cetak angka lalu tambahkan hitung++ untuk increment.",
            quiz: {
              question: "Apa yang terjadi jika kondisi while sudah bernilai false sejak awal?",
              options: [
                "Blok kode dijalankan tepat satu kali",
                "Blok kode tidak akan pernah dieksekusi",
                "Program mengalami error karena kondisi tidak valid",
                "Perulangan berjalan tanpa batas"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Angka: 1\nAngka: 2\nAngka: 3\n",
                description: "Cetak angka 1 sampai 3 menggunakan while"
              }
            ],
            validationRules: [
              {
                pattern: "while\\s*\\(\\s*hitung\\s*<=\\s*3\\s*\\)",
                message: "Gunakan while (hitung <= 3) sebagai kondisi perulangan",
                shouldExist: true
              },
              {
                pattern: "hitung\\s*\\+\\+|hitung\\s*\\+=\\s*1|hitung\\s*=\\s*hitung\\s*\\+\\s*1",
                message: "Tambahkan hitung++ di dalam loop untuk menghindari infinite loop",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l6",
            title: "Perulangan do while",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> mirip dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, namun dengan perbedaan utama: blok kode dieksekusi <strong>terlebih dahulu</strong>, baru kemudian kondisi diperiksa. Ini menjamin bahwa blok kode akan <strong>dijalankan minimal satu kali</strong>, meskipun kondisi sudah bernilai salah sejak awal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do { pernyataan; } while (kondisi);</code>. Perhatikan bahwa setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while (kondisi)</code> harus diakhiri dengan <strong>titik koma</strong> <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">;</code>. Lupa menambahkan titik koma ini adalah kesalahan umum yang menyebabkan error kompilasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code> sangat berguna untuk skenario seperti menu interaktif, di mana kita ingin menampilkan menu <strong>setidaknya sekali</strong> sebelum memeriksa apakah pengguna ingin melanjutkan.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int angka = 1;\n\n    do {\n        printf(\"Angka: %d\\n\", angka);\n        angka++;\n    } while (angka &lt;= 3);\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int angka = 1;\n\n    do {\n        printf(\"Angka: %d\\n\", angka);\n        angka++;\n    } while (angka <= 3);\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    // TODO: Buat perulangan do-while untuk hitung mundur dari 5 ke 1\n    // Format: \"Hitung mundur: 5\", \"Hitung mundur: 4\", ... \"Hitung mundur: 1\"\n    // Jangan lupa titik koma setelah while!\n\n    printf(\"Selesai!\\n\");\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int n = 5;\n\n    do {\n        printf(\"Hitung mundur: %d\\n\", n);\n        n--;\n    } while (n >= 1);\n\n    printf(\"Selesai!\\n\");\n    return 0;\n}",
            hint: "Gunakan do { ... } while (n >= 1); dan jangan lupa n-- di dalam blok do untuk mengurangi nilai n.",
            quiz: {
              question: "Apa perbedaan utama antara while dan do-while?",
              options: [
                "while lebih cepat dari do-while",
                "do-while menjamin eksekusi minimal satu kali karena kondisi diperiksa setelah blok kode",
                "do-while tidak memerlukan kondisi",
                "while hanya bisa digunakan untuk bilangan bulat"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Hitung mundur: 5\nHitung mundur: 4\nHitung mundur: 3\nHitung mundur: 2\nHitung mundur: 1\nSelesai!\n",
                description: "Cetak hitung mundur dari 5 ke 1 menggunakan do-while"
              }
            ],
            validationRules: [
              {
                pattern: "do\\s*\\{",
                message: "Mulai dengan kata kunci do diikuti kurung kurawal buka",
                shouldExist: true
              },
              {
                pattern: "\\}\\s*while\\s*\\(.*\\)\\s*;",
                message: "Akhiri dengan } while (kondisi); — jangan lupa titik koma di akhir",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l7",
            title: "Perulangan for",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> adalah perulangan yang paling sering digunakan ketika kita <strong>sudah mengetahui berapa kali perulangan akan dilakukan</strong>. Perulangan ini menggabungkan tiga komponen penting dalam satu baris: inisialisasi, kondisi, dan langkah perubahan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Sintaks: <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for (inisialisasi; kondisi; step) { pernyataan; }</code>. Komponen pertama (<strong>inisialisasi</strong>) dijalankan sekali di awal. Komponen kedua (<strong>kondisi</strong>) diperiksa sebelum setiap iterasi. Komponen ketiga (<strong>step/increment</strong>) dijalankan setelah setiap iterasi.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> juga bisa disarangkan (<em>nested for loop</em>) untuk membuat pola seperti bintang, tabel perkalian, atau mengolah data multi-dimensi.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 5; i++) {\n        printf(\"Perulangan ke-%d\\n\", i);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Perulangan ke-1\nPerulangan ke-2\nPerulangan ke-3\nPerulangan ke-4\nPerulangan ke-5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf(\"Perulangan ke-%d\\n\", i);\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // TODO: Buat perulangan for untuk mencetak bilangan genap dari 2 sampai 10\n    // Format: \"Genap: 2\", \"Genap: 4\", ... \"Genap: 10\"\n    // Gunakan for (int i = 2; ...; i += 2)\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 2; i <= 10; i += 2) {\n        printf(\"Genap: %d\\n\", i);\n    }\n\n    return 0;\n}",
            hint: "Gunakan for (int i = 2; i <= 10; i += 2) agar i melompat 2 langkah setiap iterasi.",
            quiz: {
              question: "Pada for (int i = 0; i < 5; i++), berapa kali perulangan dijalankan?",
              options: [
                "4 kali (i = 0, 1, 2, 3)",
                "5 kali (i = 0, 1, 2, 3, 4)",
                "6 kali (i = 0, 1, 2, 3, 4, 5)",
                "Tidak terbatas karena i selalu kurang dari 5"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Genap: 2\nGenap: 4\nGenap: 6\nGenap: 8\nGenap: 10\n",
                description: "Cetak bilangan genap dari 2 sampai 10"
              }
            ],
            validationRules: [
              {
                pattern: "for\\s*\\(",
                message: "Gunakan perulangan for untuk menyelesaikan latihan ini",
                shouldExist: true
              },
              {
                pattern: "i\\s*\\+=\\s*2|i\\s*=\\s*i\\s*\\+\\s*2",
                message: "Gunakan i += 2 sebagai step agar melompat ke bilangan genap berikutnya",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "c2-m3",
        title: "Peloncatan",
        lessons: [
          {
            id: "c2-l8",
            title: "Label dan statemen goto",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statemen <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> digunakan untuk melompat ke bagian kode tertentu yang ditandai oleh sebuah <strong>label</strong>. Label ditulis dengan format <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">nama_label:</code> (diakhiri titik dua) dan bisa ditempatkan di mana saja dalam fungsi yang sama.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Penggunaan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> umumnya <strong>tidak disarankan</strong> dalam pemrograman modern karena dapat menghasilkan kode yang sulit dibaca dan di-debug, dikenal dengan istilah <strong>spaghetti code</strong>. Alur program menjadi tidak terstruktur dan sulit diprediksi ketika banyak lompatan goto digunakan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Namun, ada beberapa kasus langka di mana <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">goto</code> dianggap valid, seperti <strong>keluar dari perulangan bersarang</strong> (nested loop) yang dalam, di mana <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> hanya bisa keluar dari satu level loop saja.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    int i = 1;\n\n    ulangi:\n        printf(\"Angka: %d\\n\", i);\n        i++;\n        if (i &lt;= 3) {\n            goto ulangi;\n        }\n\n    printf(\"Selesai.\\n\");\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3\nSelesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    int i = 1;\n\n    ulangi:\n        printf(\"Angka: %d\\n\", i);\n        i++;\n        if (i <= 3) {\n            goto ulangi;\n        }\n\n    printf(\"Selesai.\\n\");\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    int x = 1;\n\n    // TODO: Buat label bernama \"cetak\" di sini\n    // Cetak \"Nilai x: \" diikuti nilai x\n    // Increment x\n    // Jika x <= 4, gunakan goto untuk kembali ke label cetak\n\n    printf(\"Loop selesai.\\n\");\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    int x = 1;\n\n    cetak:\n        printf(\"Nilai x: %d\\n\", x);\n        x++;\n        if (x <= 4) {\n            goto cetak;\n        }\n\n    printf(\"Loop selesai.\\n\");\n    return 0;\n}",
            hint: "Buat label dengan menulis cetak: lalu gunakan goto cetak; di dalam blok if untuk melompat kembali.",
            quiz: {
              question: "Mengapa penggunaan goto umumnya tidak disarankan?",
              options: [
                "Karena goto membuat program berjalan lebih lambat",
                "Karena goto menyebabkan memory leak",
                "Karena goto menghasilkan alur program yang tidak terstruktur (spaghetti code) dan sulit di-debug",
                "Karena goto tidak didukung oleh standar C modern"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Nilai x: 1\nNilai x: 2\nNilai x: 3\nNilai x: 4\nLoop selesai.\n",
                description: "Cetak Nilai x dari 1 sampai 4 menggunakan goto"
              }
            ],
            validationRules: [
              {
                pattern: "\\bcetak\\s*:",
                message: "Buat label bernama cetak dengan format cetak:",
                shouldExist: true
              },
              {
                pattern: "goto\\s+cetak\\s*;",
                message: "Gunakan goto cetak; untuk melompat kembali ke label",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l9",
            title: "Prosedur break",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statemen <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> digunakan untuk <strong>menghentikan eksekusi perulangan atau switch secara paksa</strong> dan melanjutkan ke pernyataan setelah blok tersebut. Ketika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> ditemui, program langsung keluar dari perulangan tanpa menyelesaikan iterasi yang tersisa.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pada perulangan bersarang (<em>nested loop</em>), <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> hanya menghentikan <strong>perulangan terdalam</strong> (innermost loop) tempat ia berada. Perulangan luar tetap berjalan normal. Jika ingin keluar dari semua level loop, pertimbangkan menggunakan flag variabel atau goto.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> sangat berguna dalam skenario pencarian: begitu item ditemukan, tidak perlu lagi memeriksa sisa data sehingga perulangan bisa dihentikan lebih awal.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 10; i++) {\n        if (i == 6) {\n            printf(\"Berhenti di angka %d\\n\", i);\n            break;\n        }\n        printf(\"Angka: %d\\n\", i);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 1\nAngka: 2\nAngka: 3\nAngka: 4\nAngka: 5\nBerhenti di angka 6</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 6) {\n            printf(\"Berhenti di angka %d\\n\", i);\n            break;\n        }\n        printf(\"Angka: %d\\n\", i);\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // TODO: Buat perulangan for dari 1 sampai 10\n    // Jika i == 5, cetak \"Loop dihentikan pada i = 5\" lalu hentikan loop dengan break\n    // Selain itu, cetak \"i = \" diikuti nilai i\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            printf(\"Loop dihentikan pada i = 5\\n\");\n            break;\n        }\n        printf(\"i = %d\\n\", i);\n    }\n\n    return 0;\n}",
            hint: "Di dalam for loop, gunakan if (i == 5) lalu cetak pesan dan tulis break; untuk keluar dari loop.",
            quiz: {
              question: "Pada nested loop (loop di dalam loop), apa yang terjadi saat break dieksekusi?",
              options: [
                "Semua level loop dihentikan",
                "Hanya loop terdalam (innermost) yang dihentikan",
                "Program langsung berhenti (exit)",
                "Loop terluar yang dihentikan"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "i = 1\ni = 2\ni = 3\ni = 4\nLoop dihentikan pada i = 5\n",
                description: "Cetak i = 1 sampai 4, lalu berhenti pada i = 5"
              }
            ],
            validationRules: [
              {
                pattern: "break\\s*;",
                message: "Gunakan break; untuk menghentikan perulangan",
                shouldExist: true
              },
              {
                pattern: "if\\s*\\(\\s*i\\s*==\\s*5\\s*\\)",
                message: "Gunakan if (i == 5) untuk mengecek kapan loop harus berhenti",
                shouldExist: true
              }
            ]
          },
          {
            id: "c2-l10",
            title: "Prosedur continue",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Statemen <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> digunakan untuk <strong>melewati sisa kode dalam iterasi saat ini</strong> dan langsung melompat ke iterasi berikutnya. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code> yang menghentikan loop sepenuhnya, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> hanya melewati iterasi yang sedang berjalan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Pada perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, setelah <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> dieksekusi, program akan melompat ke bagian <strong>step/increment</strong> (misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">i++</code>) lalu memeriksa kondisi. Pada perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">do-while</code>, program langsung melompat ke <strong>pengecekan kondisi</strong>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\"><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code> berguna ketika kita ingin <strong>mengabaikan nilai tertentu</strong> dalam perulangan tanpa menghentikan seluruh proses. Misalnya, mencetak hanya bilangan ganjil atau melewati data yang tidak valid.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>#include &lt;stdio.h&gt;\n\nint main() {\n    for (int i = 1; i &lt;= 6; i++) {\n        if (i % 2 == 0) {\n            continue;\n        }\n        printf(\"Ganjil: %d\\n\", i);\n    }\n\n    return 0;\n}</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ gcc program.c -o program &amp;&amp; ./program</span>\n            <span class=\"block mt-1 text-zinc-100\">Ganjil: 1\nGanjil: 3\nGanjil: 5</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 6; i++) {\n        if (i % 2 == 0) {\n            continue;\n        }\n        printf(\"Ganjil: %d\\n\", i);\n    }\n\n    return 0;\n}",
            initialCode: "#include <stdio.h>\n\nint main() {\n    // TODO: Buat perulangan for dari 1 sampai 10\n    // Gunakan continue untuk melewati angka yang habis dibagi 3\n    // Cetak angka yang TIDAK habis dibagi 3\n    // Format: \"Angka: 1\", \"Angka: 2\", \"Angka: 4\", ...\n\n    return 0;\n}",
            solution: "#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i % 3 == 0) {\n            continue;\n        }\n        printf(\"Angka: %d\\n\", i);\n    }\n\n    return 0;\n}",
            hint: "Di dalam for loop, gunakan if (i % 3 == 0) { continue; } untuk melewati kelipatan 3.",
            quiz: {
              question: "Apa perbedaan utama antara break dan continue dalam perulangan?",
              options: [
                "break melewati satu iterasi, continue menghentikan seluruh loop",
                "break menghentikan seluruh loop, continue melewati iterasi saat ini dan lanjut ke iterasi berikutnya",
                "break dan continue memiliki fungsi yang identik",
                "continue hanya bisa digunakan di dalam while, sedangkan break hanya di for"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Angka: 1\nAngka: 2\nAngka: 4\nAngka: 5\nAngka: 7\nAngka: 8\nAngka: 10\n",
                description: "Cetak angka 1-10 yang tidak habis dibagi 3"
              }
            ],
            validationRules: [
              {
                pattern: "continue\\s*;",
                message: "Gunakan continue; untuk melewati iterasi tertentu",
                shouldExist: true
              },
              {
                pattern: "i\\s*%\\s*3\\s*==\\s*0",
                message: "Gunakan i % 3 == 0 untuk memeriksa apakah angka habis dibagi 3",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  },
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
  },
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
  },
  {
    id: "p-level-5",
    title: "PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON",
    description: "Mempelajari percabangan (if, if-else, if-elif), perulangan (for, while), dan deklarasi fungsi (def, return) pada Python.",
    modules: [
      {
        id: "p5-m1",
        title: "Percabangan",
        lessons: [
          {
            id: "p5-l1",
            title: "Struktur Titik Dua dan Tab/Indentasi",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Berbeda dengan bahasa pemrograman lain seperti C atau Java yang menggunakan tanda kurung kurawal <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">{}</code> untuk menandai blok kode, Python menggunakan <strong>titik dua (<code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>)</strong> dan <strong>indentasi</strong> (spasi atau tab) sebagai penanda blok kode. Ini membuat kode Python terlihat lebih bersih dan mudah dibaca.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Aturan indentasi di Python sangat ketat. Setiap blok kode yang berada di dalam struktur kontrol (seperti <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code>, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>) harus diindentasi secara <strong>konsisten</strong>, umumnya menggunakan <strong>4 spasi</strong>. Jika indentasi tidak konsisten, Python akan menghasilkan error bernama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">IndentationError</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut adalah aturan penting indentasi Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>Gunakan <strong>4 spasi</strong> untuk setiap level indentasi (standar PEP 8).</li>\n  <li>Jangan mencampur <strong>spasi dan tab</strong> dalam satu file.</li>\n  <li>Semua baris dalam satu blok harus memiliki indentasi yang <strong>sama persis</strong>.</li>\n  <li>Baris setelah tanda titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code> harus diindentasi lebih dalam.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 85\n\nif nilai &gt;= 75:\n    print(\"Selamat!\")\n    print(\"Anda lulus ujian.\")\n\nprint(\"Program selesai.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Selamat!\nAnda lulus ujian.\nProgram selesai.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nilai = 85\n\nif nilai >= 75:\n    print(\"Selamat!\")\n    print(\"Anda lulus ujian.\")\n\nprint(\"Program selesai.\")",
            initialCode: "# Buatlah variabel umur berisi 20\n# Gunakan if dengan titik dua dan indentasi 4 spasi\n# Jika umur >= 17, cetak \"Anda sudah dewasa.\"\n# Di luar blok if, cetak \"Terima kasih.\"\n",
            solution: "umur = 20\n\nif umur >= 17:\n    print(\"Anda sudah dewasa.\")\n\nprint(\"Terima kasih.\")",
            hint: "Setelah baris if umur >= 17: tekan Enter lalu beri 4 spasi sebelum print. Baris print(\"Terima kasih.\") tidak perlu indentasi karena di luar blok if.",
            quiz: {
              question: "Apa yang terjadi jika indentasi dalam blok kode Python tidak konsisten?",
              options: [
                "Kode tetap berjalan normal tanpa masalah",
                "Python akan menghasilkan IndentationError",
                "Python otomatis memperbaiki indentasi",
                "Kode akan berjalan tapi hasilnya salah"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Anda sudah dewasa.\nTerima kasih.\n",
                description: "Cetak pesan dewasa dan terima kasih"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s+.*:",
                message: "Gunakan struktur if dengan titik dua (:) di akhir kondisi",
                shouldExist: true
              },
              {
                pattern: "\\n    print",
                message: "Gunakan indentasi 4 spasi untuk blok kode di dalam if",
                shouldExist: true
              }
            ]
          },
          {
            id: "p5-l2",
            title: "Percabangan if",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> digunakan untuk mengeksekusi blok kode tertentu <strong>hanya jika kondisi bernilai True</strong>. Dalam Python, penulisan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> tidak memerlukan tanda kurung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">()</code> di sekitar kondisi (meskipun boleh digunakan), dan diakhiri dengan tanda titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur dasar percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> di Python adalah: tulis kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, diikuti kondisi, lalu titik dua. Baris-baris yang termasuk dalam blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> harus diindentasi 4 spasi. Jika kondisi bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, blok kode akan dijalankan; jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, blok akan dilewati.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Operator perbandingan yang sering digunakan dalam kondisi antara lain:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Operator</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Keterangan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">==</td><td class=\"px-3 py-2 text-zinc-700\">Sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x == 10</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">!=</td><td class=\"px-3 py-2 text-zinc-700\">Tidak sama dengan</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x != 5</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&gt;</td><td class=\"px-3 py-2 text-zinc-700\">Lebih besar</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &gt; 0</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&lt;</td><td class=\"px-3 py-2 text-zinc-700\">Lebih kecil</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &lt; 100</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&gt;=</td><td class=\"px-3 py-2 text-zinc-700\">Lebih besar atau sama</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &gt;= 17</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">&lt;=</td><td class=\"px-3 py-2 text-zinc-700\">Lebih kecil atau sama</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">x &lt;= 50</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>suhu = 38\n\nif suhu &gt; 37:\n    print(\"Anda sedang demam.\")\n    print(\"Segera istirahat.\")\n\nprint(\"Semoga lekas sembuh.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Anda sedang demam.\nSegera istirahat.\nSemoga lekas sembuh.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "suhu = 38\n\nif suhu > 37:\n    print(\"Anda sedang demam.\")\n    print(\"Segera istirahat.\")\n\nprint(\"Semoga lekas sembuh.\")",
            initialCode: "# Buatlah variabel skor berisi 90\n# Jika skor >= 80, cetak \"Nilai Anda sangat baik!\"\n# Cetak \"Terus semangat belajar.\" di luar blok if\n",
            solution: "skor = 90\n\nif skor >= 80:\n    print(\"Nilai Anda sangat baik!\")\n\nprint(\"Terus semangat belajar.\")",
            hint: "Tulis if skor >= 80: lalu pada baris berikutnya beri 4 spasi sebelum print(\"Nilai Anda sangat baik!\").",
            quiz: {
              question: "Manakah penulisan percabangan if yang benar dalam Python?",
              options: [
                "if (skor >= 80) { print(\"Bagus\") }",
                "if skor >= 80:\n    print(\"Bagus\")",
                "if skor >= 80 then print(\"Bagus\")",
                "if skor >= 80; print(\"Bagus\")"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Nilai Anda sangat baik!\nTerus semangat belajar.\n",
                description: "Cetak pesan nilai baik dan semangat"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s+skor\\s*>=\\s*80\\s*:",
                message: "Gunakan if skor >= 80: untuk memeriksa kondisi",
                shouldExist: true
              },
              {
                pattern: "print\\(.*Nilai Anda sangat baik.*\\)",
                message: "Cetak 'Nilai Anda sangat baik!' di dalam blok if",
                shouldExist: true
              }
            ]
          },
          {
            id: "p5-l3",
            title: "Percabangan if - else",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Percabangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> memungkinkan program menjalankan <strong>satu dari dua blok kode</strong>. Jika kondisi pada <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> bernilai <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">True</code>, blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code> dijalankan. Jika <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code>, blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> yang dijalankan.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Dalam Python, kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> harus ditulis <strong>sejajar</strong> (pada level indentasi yang sama) dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>, dan diakhiri dengan tanda titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>. Blok kode di dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> juga harus diindentasi 4 spasi, sama seperti blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Struktur <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-else</code> cocok digunakan ketika kita memiliki <strong>dua kemungkinan</strong> yang saling eksklusif, misalnya lulus atau tidak lulus, genap atau ganjil, dan sebagainya.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>angka = 7\n\nif angka % 2 == 0:\n    print(f\"{angka} adalah bilangan genap.\")\nelse:\n    print(f\"{angka} adalah bilangan ganjil.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">7 adalah bilangan ganjil.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "angka = 7\n\nif angka % 2 == 0:\n    print(f\"{angka} adalah bilangan genap.\")\nelse:\n    print(f\"{angka} adalah bilangan ganjil.\")",
            initialCode: "# Buatlah variabel nilai berisi 60\n# Jika nilai >= 75, cetak \"Anda lulus.\"\n# Jika tidak (else), cetak \"Anda tidak lulus.\"\n",
            solution: "nilai = 60\n\nif nilai >= 75:\n    print(\"Anda lulus.\")\nelse:\n    print(\"Anda tidak lulus.\")",
            hint: "Tulis else: sejajar dengan if (tanpa indentasi), lalu indentasi 4 spasi untuk print di dalam blok else.",
            quiz: {
              question: "Pada struktur if-else di Python, bagaimana posisi penulisan kata kunci 'else'?",
              options: [
                "else harus diindentasi lebih dalam dari if",
                "else harus sejajar (seindentasi) dengan if dan diakhiri titik dua",
                "else boleh ditulis di mana saja tanpa aturan",
                "else harus ditulis di baris yang sama dengan if"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Anda tidak lulus.\n",
                description: "Cetak pesan tidak lulus karena nilai 60"
              }
            ],
            validationRules: [
              {
                pattern: "if\\s+nilai\\s*>=\\s*75\\s*:",
                message: "Gunakan if nilai >= 75: sebagai kondisi",
                shouldExist: true
              },
              {
                pattern: "else\\s*:",
                message: "Gunakan else: untuk menangani kondisi sebaliknya",
                shouldExist: true
              }
            ]
          },
          {
            id: "p5-l4",
            title: "Percabangan if - elif",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Ketika ada <strong>lebih dari dua kondisi</strong> yang perlu diperiksa, Python menyediakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> (singkatan dari <strong>else if</strong>). Berbeda dengan bahasa lain yang menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else if</code>, Python menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> sebagai satu kata kunci tunggal.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Anda bisa merangkai sebanyak mungkin <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">elif</code> sesuai kebutuhan. Python akan memeriksa kondisi dari atas ke bawah, dan <strong>hanya blok pertama yang kondisinya bernilai True</strong> yang akan dijalankan. Blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> di bagian paling bawah bersifat opsional, berfungsi sebagai <em>catch-all</em> (penangkap semua kondisi yang tidak cocok).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut contoh penggunaan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">if-elif-else</code> untuk menentukan grade berdasarkan nilai:</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>nilai = 72\n\nif nilai &gt;= 90:\n    grade = \"A\"\nelif nilai &gt;= 80:\n    grade = \"B\"\nelif nilai &gt;= 70:\n    grade = \"C\"\nelif nilai &gt;= 60:\n    grade = \"D\"\nelse:\n    grade = \"E\"\n\nprint(f\"Grade Anda: {grade}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Grade Anda: C</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "nilai = 72\n\nif nilai >= 90:\n    grade = \"A\"\nelif nilai >= 80:\n    grade = \"B\"\nelif nilai >= 70:\n    grade = \"C\"\nelif nilai >= 60:\n    grade = \"D\"\nelse:\n    grade = \"E\"\n\nprint(f\"Grade Anda: {grade}\")",
            initialCode: "# Buatlah variabel suhu berisi 35\n# Jika suhu > 37, cetak \"Demam\"\n# Elif suhu >= 36, cetak \"Normal\"\n# Elif suhu >= 35, cetak \"Sedikit rendah\"\n# Else, cetak \"Hipotermia\"\n",
            solution: "suhu = 35\n\nif suhu > 37:\n    print(\"Demam\")\nelif suhu >= 36:\n    print(\"Normal\")\nelif suhu >= 35:\n    print(\"Sedikit rendah\")\nelse:\n    print(\"Hipotermia\")",
            hint: "Gunakan elif (bukan else if) untuk setiap kondisi tambahan. Pastikan elif dan else sejajar dengan if.",
            quiz: {
              question: "Dalam Python, bagaimana cara menulis percabangan 'else if'?",
              options: [
                "else if kondisi:",
                "elseif kondisi:",
                "elif kondisi:",
                "elsif kondisi:"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Sedikit rendah\n",
                description: "Cetak Sedikit rendah karena suhu 35"
              }
            ],
            validationRules: [
              {
                pattern: "elif\\s+",
                message: "Gunakan kata kunci elif untuk kondisi tambahan",
                shouldExist: true
              },
              {
                pattern: "else\\s*:",
                message: "Gunakan else: sebagai penangkap kondisi terakhir",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "p5-m2",
        title: "Perulangan",
        lessons: [
          {
            id: "p5-l5",
            title: "Perulangan for dan Fungsi range()",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> di Python digunakan untuk <strong>mengiterasi</strong> (mengulang) elemen-elemen dalam sebuah <em>iterable</em> seperti list, string, atau objek yang dihasilkan oleh fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code>. Sintaksnya menggunakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> diikuti variabel, kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">in</code>, lalu iterable, dan diakhiri titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code> sangat sering digunakan bersama <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> untuk menghasilkan deretan angka. Fungsi ini memiliki beberapa variasi penggunaan:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Bentuk</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Keterangan</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Contoh Hasil</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(stop)</td><td class=\"px-3 py-2 text-zinc-700\">Mulai dari 0 sampai stop-1</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(5) → 0,1,2,3,4</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(start, stop)</td><td class=\"px-3 py-2 text-zinc-700\">Mulai dari start sampai stop-1</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(2,6) → 2,3,4,5</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(start, stop, step)</td><td class=\"px-3 py-2 text-zinc-700\">Mulai dari start, lompat sebesar step</td><td class=\"px-3 py-2 text-zinc-700 font-mono\">range(1,10,2) → 1,3,5,7,9</td></tr></tbody></table>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Selain <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">range()</code>, perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> juga dapat digunakan untuk mengiterasi elemen-elemen dalam list atau karakter-karakter dalam string secara langsung.</p>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code># Menggunakan range(stop)\nfor i in range(5):\n    print(f\"Angka: {i}\")\n\n# Mengiterasi list\nbuah = [\"apel\", \"jeruk\", \"mangga\"]\nfor item in buah:\n    print(f\"Buah: {item}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Angka: 0\nAngka: 1\nAngka: 2\nAngka: 3\nAngka: 4\nBuah: apel\nBuah: jeruk\nBuah: mangga</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "# Menggunakan range(stop)\nfor i in range(5):\n    print(f\"Angka: {i}\")\n\n# Mengiterasi list\nbuah = [\"apel\", \"jeruk\", \"mangga\"]\nfor item in buah:\n    print(f\"Buah: {item}\")",
            initialCode: "# Gunakan for dan range() untuk mencetak angka 1 sampai 5\n# Format output: \"Nomor: 1\", \"Nomor: 2\", dst.\n",
            solution: "for i in range(1, 6):\n    print(f\"Nomor: {i}\")",
            hint: "Gunakan range(1, 6) agar menghasilkan angka 1 sampai 5. Ingat, batas akhir range tidak termasuk.",
            quiz: {
              question: "Apa hasil dari range(2, 8, 2)?",
              options: [
                "2, 3, 4, 5, 6, 7, 8",
                "2, 4, 6",
                "2, 4, 6, 8",
                "0, 2, 4, 6"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Nomor: 1\nNomor: 2\nNomor: 3\nNomor: 4\nNomor: 5\n",
                description: "Cetak Nomor 1 sampai 5"
              }
            ],
            validationRules: [
              {
                pattern: "for\\s+\\w+\\s+in\\s+range\\(",
                message: "Gunakan for dengan range() untuk perulangan",
                shouldExist: true
              },
              {
                pattern: "range\\(1\\s*,\\s*6\\)",
                message: "Gunakan range(1, 6) untuk menghasilkan angka 1 sampai 5",
                shouldExist: true
              }
            ]
          },
          {
            id: "p5-l6",
            title: "Perulangan while",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Perulangan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> digunakan untuk mengulang blok kode <strong>selama kondisi bernilai True</strong>. Berbeda dengan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">for</code> yang biasanya digunakan saat jumlah pengulangan diketahui, <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> cocok digunakan saat jumlah pengulangan <strong>belum diketahui</strong> dan bergantung pada kondisi tertentu.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Hal penting dalam <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> adalah pastikan ada mekanisme yang membuat kondisi menjadi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">False</code> di suatu titik, misalnya dengan mengubah nilai variabel atau menggunakan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>. Jika tidak, perulangan akan berjalan <strong>tanpa henti</strong> (infinite loop).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Python juga mendukung <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while-else</code>, di mana blok <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">else</code> akan dijalankan saat kondisi <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">while</code> menjadi False secara alami (bukan karena <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>). Berikut beberapa kata kunci penting:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">break</code>: Menghentikan perulangan secara paksa.</li>\n  <li><code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">continue</code>: Melewati iterasi saat ini dan lanjut ke iterasi berikutnya.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>hitung = 1\n\nwhile hitung &lt;= 5:\n    print(f\"Hitungan ke-{hitung}\")\n    hitung += 1\n\nprint(\"Selesai menghitung.\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Hitungan ke-1\nHitungan ke-2\nHitungan ke-3\nHitungan ke-4\nHitungan ke-5\nSelesai menghitung.</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "hitung = 1\n\nwhile hitung <= 5:\n    print(f\"Hitungan ke-{hitung}\")\n    hitung += 1\n\nprint(\"Selesai menghitung.\")",
            initialCode: "# Buatlah variabel angka berisi 3\n# Gunakan while untuk mencetak \"Angka: 3\", \"Angka: 2\", \"Angka: 1\" (hitung mundur)\n# Kurangi angka sebesar 1 setiap iterasi\n# Setelah loop, cetak \"Selesai!\"\n",
            solution: "angka = 3\n\nwhile angka >= 1:\n    print(f\"Angka: {angka}\")\n    angka -= 1\n\nprint(\"Selesai!\")",
            hint: "Gunakan while angka >= 1: lalu di dalam loop cetak angka dan kurangi nilainya dengan angka -= 1.",
            quiz: {
              question: "Apa yang terjadi jika kondisi while tidak pernah menjadi False?",
              options: [
                "Program akan berhenti otomatis setelah 100 iterasi",
                "Program menghasilkan error SyntaxError",
                "Terjadi infinite loop (perulangan tanpa henti)",
                "Python mengubah kondisi menjadi False secara otomatis"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Angka: 3\nAngka: 2\nAngka: 1\nSelesai!\n",
                description: "Hitung mundur dari 3 ke 1 lalu cetak Selesai"
              }
            ],
            validationRules: [
              {
                pattern: "while\\s+.*:",
                message: "Gunakan while dengan kondisi yang sesuai",
                shouldExist: true
              },
              {
                pattern: "angka\\s*-=\\s*1|angka\\s*=\\s*angka\\s*-\\s*1",
                message: "Kurangi variabel angka di setiap iterasi untuk menghindari infinite loop",
                shouldExist: true
              }
            ]
          }
        ]
      },
      {
        id: "p5-m3",
        title: "Deklarasi Fungsi",
        lessons: [
          {
            id: "p5-l7",
            title: "Penggunaan def dan Parameter",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Fungsi dalam Python dideklarasikan menggunakan kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">def</code>, diikuti nama fungsi, tanda kurung yang berisi parameter (jika ada), dan diakhiri titik dua <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">:</code>. Fungsi membantu kita <strong>mengelompokkan kode</strong> yang melakukan tugas tertentu agar bisa digunakan ulang (<em>reusable</em>).</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Parameter adalah variabel yang diterima oleh fungsi saat dipanggil. Python mendukung <strong>parameter default</strong>, yaitu parameter yang memiliki nilai bawaan sehingga tidak wajib diisi saat pemanggilan. Nama fungsi sebaiknya menggunakan huruf kecil dan pemisah garis bawah (<em>snake_case</em>), misalnya <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">hitung_luas</code>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Berikut aturan penting tentang fungsi Python:</p>\n<ul class=\"list-disc pl-5 space-y-1 my-2 text-zinc-700\">\n  <li>Fungsi harus <strong>didefinisikan sebelum dipanggil</strong>.</li>\n  <li>Parameter dengan nilai default harus ditulis <strong>setelah</strong> parameter tanpa default.</li>\n  <li>Isi/badan fungsi harus <strong>diindentasi</strong> 4 spasi.</li>\n  <li>Fungsi dipanggil dengan menuliskan <strong>nama_fungsi(argumen)</strong>.</li>\n</ul>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def sapa(nama, sapaan=\"Halo\"):\n    print(f\"{sapaan}, {nama}!\")\n\nsapa(\"Budi\")\nsapa(\"Ani\", \"Selamat pagi\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Halo, Budi!\nSelamat pagi, Ani!</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "def sapa(nama, sapaan=\"Halo\"):\n    print(f\"{sapaan}, {nama}!\")\n\nsapa(\"Budi\")\nsapa(\"Ani\", \"Selamat pagi\")",
            initialCode: "# Buatlah fungsi bernama perkenalan yang menerima parameter nama dan umur\n# Di dalam fungsi, cetak \"Nama saya [nama], umur [umur] tahun.\"\n# Panggil fungsi dengan nama=\"Andi\" dan umur=20\n",
            solution: "def perkenalan(nama, umur):\n    print(f\"Nama saya {nama}, umur {umur} tahun.\")\n\nperkenalan(\"Andi\", 20)",
            hint: "Gunakan def perkenalan(nama, umur): lalu di bawahnya tulis print dengan f-string. Panggil fungsi di luar blok def.",
            quiz: {
              question: "Bagaimana cara mendeklarasikan fungsi dengan parameter default di Python?",
              options: [
                "def fungsi(a, b := 10):",
                "def fungsi(a, b = 10):",
                "def fungsi(a, default b = 10):",
                "def fungsi(a, b == 10):"
              ],
              correctAnswer: 1
            },
            testCases: [
              {
                expectedOutput: "Nama saya Andi, umur 20 tahun.\n",
                description: "Cetak perkenalan Andi umur 20"
              }
            ],
            validationRules: [
              {
                pattern: "def\\s+perkenalan\\s*\\(",
                message: "Deklarasikan fungsi dengan def perkenalan(nama, umur):",
                shouldExist: true
              },
              {
                pattern: "perkenalan\\s*\\(",
                message: "Panggil fungsi perkenalan() dengan argumen yang sesuai",
                shouldExist: true
              }
            ]
          },
          {
            id: "p5-l8",
            title: "Pengembalian Nilai dengan return",
            explanation: "<div class=\"space-y-4\">\n      <p class=\"mb-4 text-zinc-700 leading-relaxed\">Kata kunci <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> digunakan untuk <strong>mengembalikan nilai</strong> dari sebuah fungsi ke pemanggil. Ketika Python menemukan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code>, eksekusi fungsi langsung berhenti dan nilai yang disebutkan akan dikirim kembali ke tempat fungsi dipanggil.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Jika fungsi tidak memiliki <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> atau hanya menulis <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code> tanpa nilai, fungsi tersebut mengembalikan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">None</code> secara default. Python juga mendukung <strong>pengembalian beberapa nilai</strong> sekaligus menggunakan koma, yang secara otomatis dikemas menjadi <em>tuple</em>.</p>\n<p class=\"mb-4 text-zinc-700 leading-relaxed\">Perbedaan penting antara <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">print()</code> dan <code class=\"bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs\">return</code>:</p>\n<table class=\"w-full text-xs border border-zinc-200 rounded-lg overflow-hidden my-3\"><thead class=\"bg-zinc-100\"><tr><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">Aspek</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">print()</th><th class=\"px-3 py-2 text-left text-zinc-600 font-bold\">return</th></tr></thead><tbody><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Fungsi</td><td class=\"px-3 py-2 text-zinc-700\">Menampilkan ke layar</td><td class=\"px-3 py-2 text-zinc-700\">Mengirim nilai ke pemanggil</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Nilai</td><td class=\"px-3 py-2 text-zinc-700\">Tidak menghasilkan nilai</td><td class=\"px-3 py-2 text-zinc-700\">Menghasilkan nilai yang bisa disimpan</td></tr><tr class=\"border-t border-zinc-200\"><td class=\"px-3 py-2 text-zinc-700 font-mono\">Eksekusi</td><td class=\"px-3 py-2 text-zinc-700\">Fungsi tetap berjalan</td><td class=\"px-3 py-2 text-zinc-700\">Fungsi langsung berhenti</td></tr></tbody></table>\n\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Contoh Penggunaan Kode:</div>\n        <pre class=\"bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800\"><code>def hitung_luas(panjang, lebar):\n    luas = panjang * lebar\n    return luas\n\ndef info_persegi(sisi):\n    luas = sisi * sisi\n    keliling = 4 * sisi\n    return luas, keliling\n\nhasil = hitung_luas(5, 3)\nprint(f\"Luas persegi panjang: {hasil}\")\n\nl, k = info_persegi(4)\nprint(f\"Luas: {l}, Keliling: {k}\")</code></pre>\n      </div>\n      <div class=\"my-4 not-prose\">\n        <div class=\"text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider\">Output Terminal (Mac):</div>\n        <div class=\"bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl\">\n          <div class=\"flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500\">\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ff5f56]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#ffbd2e]\"></span>\n            <span class=\"w-2.5 h-2.5 rounded-full bg-[#27c93f]\"></span>\n            <span class=\"ml-2 text-[10px] font-bold text-zinc-400\">macbook-pro — ~user/workspace</span>\n          </div>\n          <div class=\"whitespace-pre-wrap font-semibold leading-relaxed\">\n            <span class=\"text-zinc-500\">$ python3 program.py</span>\n            <span class=\"block mt-1 text-zinc-100\">Luas persegi panjang: 15\nLuas: 16, Keliling: 16</span>\n          </div>\n        </div>\n      </div>\n    </div>",
            codeExample: "def hitung_luas(panjang, lebar):\n    luas = panjang * lebar\n    return luas\n\ndef info_persegi(sisi):\n    luas = sisi * sisi\n    keliling = 4 * sisi\n    return luas, keliling\n\nhasil = hitung_luas(5, 3)\nprint(f\"Luas persegi panjang: {hasil}\")\n\nl, k = info_persegi(4)\nprint(f\"Luas: {l}, Keliling: {k}\")",
            initialCode: "# Buatlah fungsi tambah yang menerima parameter a dan b\n# Fungsi mengembalikan hasil penjumlahan a + b menggunakan return\n# Simpan hasil pemanggilan tambah(10, 25) ke variabel hasil\n# Cetak \"Hasil: [hasil]\"\n",
            solution: "def tambah(a, b):\n    return a + b\n\nhasil = tambah(10, 25)\nprint(f\"Hasil: {hasil}\")",
            hint: "Di dalam fungsi tambah, gunakan return a + b untuk mengembalikan nilai. Simpan hasilnya ke variabel dengan hasil = tambah(10, 25).",
            quiz: {
              question: "Apa yang dikembalikan oleh fungsi Python yang tidak memiliki statement return?",
              options: [
                "0",
                "False",
                "None",
                "Error karena fungsi harus punya return"
              ],
              correctAnswer: 2
            },
            testCases: [
              {
                expectedOutput: "Hasil: 35\n",
                description: "Cetak hasil penjumlahan 10 + 25"
              }
            ],
            validationRules: [
              {
                pattern: "def\\s+tambah\\s*\\(\\s*a\\s*,\\s*b\\s*\\)\\s*:",
                message: "Deklarasikan fungsi def tambah(a, b):",
                shouldExist: true
              },
              {
                pattern: "return\\s+a\\s*\\+\\s*b",
                message: "Gunakan return a + b untuk mengembalikan hasil penjumlahan",
                shouldExist: true
              }
            ]
          }
        ]
      }
    ]
  },
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
];
