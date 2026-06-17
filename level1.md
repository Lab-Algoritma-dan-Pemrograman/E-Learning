# LEVEL 1 — DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C

---

## SUBBAB: Struktur Penulisan Program Bahasa C

---

### Pelajaran: Penggunaan `#include` dan Header File

##materi:
Setiap program C dimulai dengan menyertakan **header file** menggunakan direktif preprocessor `#include`. Header file adalah berkas berekstensi `.h` yang berisi deklarasi fungsi dan konstanta siap pakai dari pustaka standar C. Direktif `#include` ditulis di baris paling atas program, sebelum fungsi `main()`, dan tidak diakhiri titik koma.

Ada dua bentuk penulisan `#include`: menggunakan tanda kurung sudut `<nama.h>` untuk header pustaka standar bawaan compiler (misalnya `<stdio.h>` untuk fungsi input/output), dan menggunakan tanda petik `"nama.h"` untuk header file yang kamu buat sendiri dan disimpan di folder proyek. Tanpa menyertakan header yang tepat, fungsi seperti `printf()` atau `scanf()` tidak akan dikenali oleh compiler.

| Header File | Fungsi Utama | Contoh Fungsi |
|---|---|---|
| `<stdio.h>` | Input / Output standar | `printf()`, `scanf()` |
| `<stdlib.h>` | Utilitas umum | `malloc()`, `exit()` |
| `<string.h>` | Manipulasi string | `strlen()`, `strcpy()` |
| `<math.h>` | Operasi matematika | `sqrt()`, `pow()` |
| `<ctype.h>` | Klasifikasi karakter | `isdigit()`, `toupper()` |

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("Header file berhasil disertakan!\n");
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Header file berhasil disertakan!
```

##kuis:
Penulisan `#include` manakah yang digunakan untuk menyertakan header file **pustaka standar** bawaan compiler?

A. `#include "stdio.h"`
B. `#include [stdio.h]`
C. `#include <stdio.h>` **Benar**
D. `include <stdio.h>`

##latihan:
deskripsi tugas:
Lengkapi program C dengan menyertakan dua header file yang dibutuhkan: `<stdio.h>` untuk fungsi `printf()` dan `<stdlib.h>`.

output diharapkan:
```
Program siap dijalankan!
```

input (opsional):
-

petunjuk:
Tulis dua baris `#include` di bagian paling atas program, sebelum `int main()`.

kode awal:
```c
// Sertakan header stdio.h dan stdlib.h di sini

int main() {
    printf("Program siap dijalankan!\n");
    return 0;
}
```

solusi:
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    printf("Program siap dijalankan!\n");
    return 0;
}
```

Validasi kode statis:
```
regex pattern = #include\s*<stdio\.h>
pesan error = Sertakan header <stdio.h> menggunakan #include <stdio.h>

regex pattern = #include\s*<stdlib\.h>
pesan error = Sertakan header <stdlib.h> menggunakan #include <stdlib.h>
```

---

### Pelajaran: Pembuatan Header File Sendiri

##materi:
Selain menggunakan header bawaan, kamu bisa membuat **header file sendiri** untuk menyimpan deklarasi fungsi yang akan dipakai di banyak file program. Caranya: buat file baru berekstensi `.h`, tulis deklarasi fungsi (prototipe) di dalamnya, lalu sertakan di file program utama menggunakan `#include "namafile.h"` (dengan tanda petik, bukan kurung sudut).

Praktik standar pembuatan header file menggunakan **include guard** — sepasang direktif `#ifndef` dan `#define` di awal, dan `#endif` di akhir. Ini berfungsi mencegah header yang sama dibaca dua kali oleh compiler saat proyek berkembang, yang bisa menyebabkan error duplikasi deklarasi.

```c
/* File: hitung.h */
#ifndef HITUNG_H
#define HITUNG_H

int tambah(int a, int b);

#endif
```

```c
/* File: main.c */
#include <stdio.h>
#include "hitung.h"

int tambah(int a, int b) {
    return a + b;
}

int main() {
    int hasil = tambah(3, 5);
    printf("Hasil: %d\n", hasil);
    return 0;
}
```

Output Terminal:
```
$ gcc main.c -o main && ./main
Hasil: 8
```

##kuis:
Apa kegunaan utama **include guard** (`#ifndef ... #define ... #endif`) dalam header file?

A. Mempercepat proses kompilasi program
B. Mencegah header file dibaca lebih dari satu kali oleh compiler **Benar**
C. Mengenkripsi isi header file agar tidak bisa dibaca
D. Mengganti fungsi `#include` agar lebih ringkas

##latihan:
deskripsi tugas:
Buat struktur include guard yang benar di dalam sebuah header file bernama `utilitas.h`, dan deklarasikan prototipe fungsi `int kuadrat(int x);` di dalamnya.

output diharapkan:
(File header yang valid dengan include guard dan satu prototipe fungsi)

input (opsional):
-

petunjuk:
Gunakan `#ifndef UTILITAS_H`, `#define UTILITAS_H`, tulis prototipe fungsi, lalu tutup dengan `#endif`.

kode awal:
```c
/* File: utilitas.h */
// Tulis include guard di sini

// Deklarasikan prototipe fungsi kuadrat di sini

// Tutup include guard
```

solusi:
```c
/* File: utilitas.h */
#ifndef UTILITAS_H
#define UTILITAS_H

int kuadrat(int x);

#endif
```

Validasi kode statis:
```
regex pattern = #ifndef\s+UTILITAS_H
pesan error = Gunakan #ifndef UTILITAS_H untuk membuka include guard

regex pattern = #endif
pesan error = Tutup include guard dengan #endif di baris terakhir
```

---

### Pelajaran: Penggunaan `int main()` dan `return 0`

##materi:
Fungsi `main()` adalah **titik masuk wajib** dari setiap program C — compiler akan mencari dan menjalankan fungsi ini pertama kali. Penulisan standar adalah `int main()` atau `int main(void)`, di mana kata `int` menandakan fungsi ini mengembalikan nilai bertipe integer ke sistem operasi setelah program selesai berjalan.

Pernyataan `return 0;` di akhir fungsi `main()` adalah sinyal kepada sistem operasi bahwa program **berakhir dengan sukses tanpa error**. Nilai `0` secara universal berarti "berhasil", sedangkan nilai selain `0` (misalnya `return 1;`) menandakan program berakhir dengan kondisi error. Menghilangkan `return 0;` pada beberapa compiler akan memunculkan peringatan, meskipun program tetap berjalan.

```c
#include <stdio.h>

int main() {
    printf("Program berjalan dengan sukses.\n");
    return 0; /* Sinyal sukses ke sistem operasi */
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Program berjalan dengan sukses.
```

##kuis:
Apa arti nilai `return 0;` yang ditulis di akhir fungsi `main()` dalam program C?

A. Menghentikan paksa program saat terjadi error
B. Mengulang program dari awal sebanyak 0 kali
C. Memberitahu sistem operasi bahwa program berakhir dengan sukses **Benar**
D. Mengembalikan nilai 0 ke variabel pertama dalam program

##latihan:
deskripsi tugas:
Lengkapi struktur dasar program C dengan menulis fungsi `main()` yang menampilkan teks "Belajar C Dimulai!" dan diakhiri dengan `return 0`.

output diharapkan:
```
Belajar C Dimulai!
```

input (opsional):
-

petunjuk:
Pastikan fungsi ditulis sebagai `int main()`, gunakan `printf()` untuk menampilkan teks, dan akhiri dengan `return 0;`.

kode awal:
```c
#include <stdio.h>

// Tulis fungsi main() di sini
```

solusi:
```c
#include <stdio.h>

int main() {
    printf("Belajar C Dimulai!\n");
    return 0;
}
```

Validasi kode statis:
```
regex pattern = int\s+main\s*\(
pesan error = Deklarasikan fungsi utama dengan int main()

regex pattern = return\s+0\s*;
pesan error = Akhiri fungsi main() dengan return 0;
```

---

### Pelajaran: Penggunaan Statement dan Titik Koma (`;`)

##materi:
Dalam bahasa C, setiap **statement** (pernyataan/instruksi) harus diakhiri dengan **titik koma (`;`)**. Statement adalah satu unit instruksi lengkap yang diperintahkan kepada program, seperti memanggil fungsi, mendeklarasikan variabel, atau mengembalikan nilai. Titik koma berfungsi sebagai "tanda titik" di akhir kalimat — tanpanya, compiler tidak tahu di mana sebuah instruksi berakhir dan akan menghasilkan error kompilasi.

Perlu dibedakan antara statement dan **blok kode** (`{ ... }`). Blok kode seperti yang mengikuti `if`, `for`, atau definisi fungsi **tidak membutuhkan** titik koma setelah kurung kurawal penutupnya. Kesalahan umum pemula adalah melupakan titik koma setelah `printf()` atau deklarasi variabel, atau sebaliknya, salah meletakkan titik koma setelah kurung kurawal.

```c
#include <stdio.h>

int main() {
    int umur = 20;            /* Statement deklarasi variabel — wajib ada ; */
    printf("Umur: %d\n", umur); /* Statement pemanggilan fungsi — wajib ada ; */
    return 0;                  /* Statement return — wajib ada ; */
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Umur: 20
```

##kuis:
Di baris kode mana terjadi kesalahan penulisan titik koma?

A. `int nilai = 100;`
B. `printf("Halo\n");`
C. `int main() {` **Benar**
D. `return 0;`

##latihan:
deskripsi tugas:
Perbaiki kode berikut yang memiliki titik koma yang salah tempat atau hilang agar bisa dikompilasi dengan benar.

output diharapkan:
```
Nilai: 75
```

input (opsional):
-

petunjuk:
Setiap statement tunggal perlu diakhiri `;`. Definisi fungsi dan blok `{}` tidak membutuhkan `;` setelah `}`.

kode awal:
```c
#include <stdio.h>

int main();
{
    int nilai = 75
    printf("Nilai: %d\n", nilai);
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main()
{
    int nilai = 75;
    printf("Nilai: %d\n", nilai);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = int\s+nilai\s*=\s*75\s*;
pesan error = Deklarasi variabel nilai harus diakhiri titik koma: int nilai = 75;

regex pattern = int\s+main\s*\(\s*\)\s*\n?\s*\{
pesan error = Hapus titik koma setelah int main() — definisi fungsi tidak menggunakan titik koma sebelum {
```

---

## SUBBAB: Tipe Data Dasar

---

### Pelajaran: Tipe Data `char`

##materi:
Tipe data `char` digunakan untuk menyimpan **satu karakter** tunggal, seperti huruf, angka sebagai karakter, atau simbol. Di memori, `char` menyimpan bilangan bulat 8-bit (1 byte) yang merepresentasikan kode ASCII dari karakter tersebut. Nilainya ditulis dengan tanda petik tunggal: `'A'`, `'z'`, `'5'`, `'@'`. Tanda petik ganda (`"..."`) digunakan untuk string (rangkaian karakter), bukan `char` tunggal.

`char` dapat bersifat `signed char` (rentang -128 hingga 127) atau `unsigned char` (rentang 0 hingga 255). Format specifier untuk `char` dalam `printf()` dan `scanf()` adalah `%c`. Karena `char` pada dasarnya adalah integer, kamu bisa melakukan operasi aritmatika padanya — misalnya `'A' + 1` menghasilkan `'B'` (ASCII 65 + 1 = 66).

```c
#include <stdio.h>

int main() {
    char huruf = 'C';
    char simbol = '@';
    printf("Huruf: %c\n", huruf);
    printf("Simbol: %c\n", simbol);
    printf("Kode ASCII dari '%c' adalah: %d\n", huruf, huruf);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Huruf: C
Simbol: @
Kode ASCII dari 'C' adalah: 67
```

##kuis:
Manakah cara penulisan nilai yang **benar** untuk menginisialisasi variabel `char` dalam bahasa C?

A. `char huruf = "A";`
B. `char huruf = 'A';` **Benar**
C. `char huruf = A;`
D. `char huruf = (A);`

##latihan:
deskripsi tugas:
Deklarasikan variabel `char` bernama `inisial` dengan nilai huruf pertama namamu, lalu tampilkan menggunakan format specifier yang tepat.

output diharapkan:
```
Inisial saya: A
```
(Ganti `A` dengan inisial pilihanmu)

input (opsional):
-

petunjuk:
Gunakan tanda petik tunggal untuk nilai char, dan `%c` sebagai format specifier di `printf()`.

kode awal:
```c
#include <stdio.h>

int main() {
    // Deklarasikan variabel char bernama inisial
    
    // Tampilkan dengan printf menggunakan format %c
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    char inisial = 'A';
    printf("Inisial saya: %c\n", inisial);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = char\s+inisial\s*=\s*'[A-Za-z]'\s*;
pesan error = Deklarasikan: char inisial = 'X'; (gunakan petik tunggal untuk nilai char)

regex pattern = printf\s*\(.*%c.*inisial
pesan error = Gunakan format specifier %c dan variabel inisial di dalam printf()
```

---

### Pelajaran: Tipe Data `int`

##materi:
Tipe data `int` adalah tipe paling sering digunakan dalam bahasa C untuk menyimpan **bilangan bulat** (tanpa koma desimal). Ukuran `int` umumnya 4 byte (32-bit) pada sistem modern, dengan rentang nilai -2.147.483.648 hingga 2.147.483.647. Format specifier untuk `int` adalah `%d`. Terdapat beberapa varian `int` yang disesuaikan dengan kebutuhan rentang nilai dan memori.

| Tipe | Ukuran | Rentang Nilai |
|---|---|---|
| `short int` | 2 byte | -32,768 s/d 32,767 |
| `int` | 4 byte | -2,147,483,648 s/d 2,147,483,647 |
| `long int` | 4–8 byte | Tergantung sistem |
| `unsigned int` | 4 byte | 0 s/d 4,294,967,295 |

```c
#include <stdio.h>

int main() {
    int jumlah = 100;
    int suhu = -15;
    unsigned int populasi = 4000000000U;
    printf("Jumlah: %d\n", jumlah);
    printf("Suhu: %d derajat\n", suhu);
    printf("Populasi: %u\n", populasi);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Jumlah: 100
Suhu: -15 derajat
Populasi: 4000000000
```

##kuis:
Format specifier yang tepat untuk menampilkan nilai bertipe `int` menggunakan `printf()` adalah...

A. `%f`
B. `%c`
C. `%s`
D. `%d` **Benar**

##latihan:
deskripsi tugas:
Deklarasikan dua variabel `int` bernama `panjang` dan `lebar`, lalu hitung dan tampilkan luasnya (panjang × lebar).

output diharapkan:
```
Panjang: 8
Lebar: 5
Luas: 40
```

input (opsional):
-

petunjuk:
Gunakan operator `*` untuk perkalian dan simpan hasilnya di variabel `int luas`.

kode awal:
```c
#include <stdio.h>

int main() {
    // Deklarasikan panjang = 8 dan lebar = 5
    
    // Hitung luas
    
    // Tampilkan ketiga nilai
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int panjang = 8;
    int lebar = 5;
    int luas = panjang * lebar;
    printf("Panjang: %d\n", panjang);
    printf("Lebar: %d\n", lebar);
    printf("Luas: %d\n", luas);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = int\s+panjang\s*=\s*8\s*;
pesan error = Deklarasikan variabel: int panjang = 8;

regex pattern = int\s+luas\s*=\s*panjang\s*\*\s*lebar\s*;
pesan error = Hitung luas dengan: int luas = panjang * lebar;
```

---

### Pelajaran: Tipe Data `float` dan `double`

##materi:
Tipe `float` dan `double` digunakan untuk menyimpan **bilangan pecahan (desimal)**. Perbedaan utamanya ada pada presisi: `float` (4 byte) memiliki presisi sekitar 6–7 digit desimal, sementara `double` (8 byte) memberikan presisi sekitar 15–16 digit desimal. Untuk keperluan umum di mana presisi tinggi dibutuhkan, `double` lebih dianjurkan. Literal desimal dalam kode secara default bertipe `double`; tambahkan akhiran `f` untuk memaksanya menjadi `float` (misalnya `3.14f`).

| Tipe | Ukuran | Presisi | Format Specifier |
|---|---|---|---|
| `float` | 4 byte | ~6–7 digit | `%f` |
| `double` | 8 byte | ~15–16 digit | `%lf` atau `%f` |
| `long double` | 10–16 byte | ~18–19 digit | `%Lf` |

```c
#include <stdio.h>

int main() {
    float harga = 9999.99f;
    double jarak = 384400.123456789;
    printf("Harga: %.2f\n", harga);
    printf("Jarak ke bulan: %.6lf km\n", jarak);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Harga: 9999.99
Jarak ke bulan: 384400.123457 km
```

##kuis:
Apa perbedaan utama antara tipe data `float` dan `double` dalam bahasa C?

A. `float` hanya bisa menyimpan bilangan positif, `double` bisa negatif
B. `float` untuk bilangan bulat, `double` untuk bilangan pecahan
C. `double` memiliki presisi lebih tinggi dan ukuran memori lebih besar dari `float` **Benar**
D. `double` tidak bisa digunakan dengan `printf()`

##latihan:
deskripsi tugas:
Deklarasikan variabel `float` bernama `nilai_ujian` (misal 87.5) dan `double` bernama `rata_rata` (misal 91.234567). Tampilkan keduanya dengan format 2 angka desimal.

output diharapkan:
```
Nilai ujian: 87.50
Rata-rata: 91.23
```

input (opsional):
-

petunjuk:
Gunakan `%.2f` pada `printf()` untuk membatasi dua angka di belakang koma.

kode awal:
```c
#include <stdio.h>

int main() {
    // Deklarasikan float nilai_ujian dan double rata_rata
    
    // Tampilkan dengan 2 angka desimal
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    float nilai_ujian = 87.5f;
    double rata_rata = 91.234567;
    printf("Nilai ujian: %.2f\n", nilai_ujian);
    printf("Rata-rata: %.2lf\n", rata_rata);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = float\s+nilai_ujian
pesan error = Deklarasikan variabel: float nilai_ujian = ...; (jangan lupa akhiran f untuk literal float)

regex pattern = printf\s*\(.*%\.2[fl]
pesan error = Gunakan format %.2f atau %.2lf untuk menampilkan 2 angka desimal
```

---

### Pelajaran: Tipe Data `void`

##materi:
`void` secara harfiah berarti "kosong" atau "tidak bertipe". Dalam bahasa C, `void` digunakan dalam tiga konteks utama: sebagai tipe kembalian fungsi yang **tidak mengembalikan nilai** apapun (prosedur), sebagai daftar parameter fungsi yang **tidak menerima argumen** (`void` sebagai pengganti parameter kosong), dan sebagai **pointer generic** (`void*`) yang dapat menunjuk ke tipe data apapun.

`void` bukanlah tipe data untuk variabel biasa — kamu tidak bisa mendeklarasikan `void x;`. Fungsi bertipe `void` tidak membutuhkan pernyataan `return` (atau jika ada, ditulis `return;` tanpa nilai). Ini berbeda dengan `int main()` yang wajib mengembalikan nilai integer.

```c
#include <stdio.h>

void tampilkan_pesan(void) {
    printf("Fungsi void tidak mengembalikan nilai.\n");
    /* Tidak ada return, atau bisa ditulis: return; */
}

int main() {
    tampilkan_pesan();
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Fungsi void tidak mengembalikan nilai.
```

##kuis:
Kapan tipe `void` digunakan sebagai tipe kembalian sebuah fungsi?

A. Ketika fungsi harus mengembalikan nilai 0
B. Ketika fungsi tidak mengembalikan nilai apapun **Benar**
C. Ketika fungsi menerima banyak parameter
D. Ketika fungsi menggunakan variabel global

##latihan:
deskripsi tugas:
Buat fungsi `void` bernama `sapa_pengguna()` yang menampilkan teks "Selamat datang, Pengguna!", lalu panggil fungsi tersebut dari `main()`.

output diharapkan:
```
Selamat datang, Pengguna!
```

input (opsional):
-

petunjuk:
Deklarasikan fungsi dengan `void sapa_pengguna()` di atas `main()`, isi dengan `printf()`, lalu panggil dengan `sapa_pengguna();` di dalam `main()`.

kode awal:
```c
#include <stdio.h>

// Buat fungsi void bernama sapa_pengguna di sini

int main() {
    // Panggil fungsi sapa_pengguna di sini
    return 0;
}
```

solusi:
```c
#include <stdio.h>

void sapa_pengguna() {
    printf("Selamat datang, Pengguna!\n");
}

int main() {
    sapa_pengguna();
    return 0;
}
```

Validasi kode statis:
```
regex pattern = void\s+sapa_pengguna\s*\(
pesan error = Deklarasikan fungsi dengan: void sapa_pengguna()

regex pattern = sapa_pengguna\s*\(\s*\)\s*;
pesan error = Panggil fungsinya di main() dengan: sapa_pengguna();
```

---

### Pelajaran: Tipe Data `bool`

##materi:
Tipe data `bool` menyimpan nilai **boolean**: hanya dua kemungkinan, yaitu `true` (benar/1) atau `false` (salah/0). Dalam bahasa C standar (C99 ke atas), penggunaan `bool`, `true`, dan `false` membutuhkan header `<stdbool.h>`. Tanpa header ini, compiler tidak mengenali kata kunci tersebut. Tipe ini sangat berguna untuk variabel flag, kondisi, dan hasil perbandingan logis.

Secara internal, `bool` dalam C disimpan sebagai integer 1 byte: nilai `0` dianggap `false`, dan nilai **apapun selain 0** dianggap `true`. Format specifier untuk menampilkan `bool` adalah `%d` (akan menampilkan 1 atau 0). Jika ingin menampilkan teks "true"/"false", perlu dilakukan konversi manual.

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    bool sudah_login = true;
    bool akses_ditolak = false;

    printf("Status login: %d\n", sudah_login);
    printf("Akses ditolak: %s\n", akses_ditolak ? "true" : "false");
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Status login: 1
Akses ditolak: false
```

##kuis:
Header file apa yang harus disertakan agar tipe `bool`, `true`, dan `false` bisa digunakan dalam C99?

A. `<string.h>`
B. `<stdlib.h>`
C. `<stdbool.h>` **Benar**
D. `<boolean.h>`

##latihan:
deskripsi tugas:
Deklarasikan dua variabel `bool`: `lampu_menyala` bernilai `true` dan `pintu_terkunci` bernilai `false`. Tampilkan statusnya.

output diharapkan:
```
Lampu menyala: 1
Pintu terkunci: 0
```

input (opsional):
-

petunjuk:
Sertakan `<stdbool.h>`, gunakan `bool` untuk tipe data, dan `%d` untuk menampilkan nilainya.

kode awal:
```c
#include <stdio.h>
// Sertakan header untuk bool di sini

int main() {
    // Deklarasikan lampu_menyala = true dan pintu_terkunci = false
    
    // Tampilkan kedua nilai
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    bool lampu_menyala = true;
    bool pintu_terkunci = false;
    printf("Lampu menyala: %d\n", lampu_menyala);
    printf("Pintu terkunci: %d\n", pintu_terkunci);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = #include\s*<stdbool\.h>
pesan error = Sertakan header <stdbool.h> untuk menggunakan tipe bool

regex pattern = bool\s+lampu_menyala\s*=\s*true\s*;
pesan error = Deklarasikan: bool lampu_menyala = true;
```

---

### Pelajaran: Format Digit Pecahan

##materi:
Saat menampilkan bilangan pecahan dengan `printf()`, kamu bisa mengontrol **jumlah digit** yang ditampilkan menggunakan **format width dan precision** di dalam format specifier. Format lengkapnya adalah `%[lebar_total].[jumlah_desimal]f`. Misalnya, `%.2f` menampilkan 2 angka di belakang koma, `%8.2f` menampilkan total 8 karakter dengan 2 di belakang koma (sisanya diisi spasi di kiri). Ini penting untuk membuat output yang rapi dan mudah dibaca.

| Format | Arti | Contoh Input | Contoh Output |
|---|---|---|---|
| `%f` | Default 6 desimal | 3.14 | `3.140000` |
| `%.2f` | 2 angka desimal | 3.14159 | `3.14` |
| `%8.2f` | Lebar 8, 2 desimal | 3.14 | `····3.14` |
| `%-8.2f` | Rata kiri, lebar 8 | 3.14 | `3.14····` |
| `%+.2f` | Tampilkan tanda | -3.14 | `-3.14` |

[Gambar: Ilustrasi komponen format specifier %8.2f dengan label bagian lebar dan presisi]

```c
#include <stdio.h>

int main() {
    double pi = 3.14159265;
    printf("Default  : %f\n", pi);
    printf("2 desimal: %.2f\n", pi);
    printf("Lebar 10 : %10.4f\n", pi);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Default  : 3.141593
2 desimal: 3.14
Lebar 10 :     3.1416
```

##kuis:
Format specifier `%10.3f` akan menampilkan bilangan dengan...

A. 10 angka desimal dan total lebar 3 karakter
B. Total lebar 10 karakter dan 3 angka di belakang koma **Benar**
C. 10 angka di depan koma dan 3 angka di belakang koma
D. Presisi 10 dan pembulatan ke 3 desimal

##latihan:
deskripsi tugas:
Tampilkan nilai `double` berikut: `1234.5678` dalam tiga format berbeda: default, 2 desimal, dan lebar total 12 dengan 3 desimal.

output diharapkan:
```
Default   : 1234.567800
2 desimal : 1234.57
Lebar 12  :     1234.568
```

input (opsional):
-

petunjuk:
Gunakan `%f`, `%.2f`, dan `%12.3f` secara berurutan di tiga baris `printf()`.

kode awal:
```c
#include <stdio.h>

int main() {
    double angka = 1234.5678;
    // Tampilkan dengan format %f
    
    // Tampilkan dengan format %.2f
    
    // Tampilkan dengan format %12.3f
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    double angka = 1234.5678;
    printf("Default   : %f\n", angka);
    printf("2 desimal : %.2f\n", angka);
    printf("Lebar 12  : %12.3f\n", angka);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = printf\s*\(.*%f.*angka
pesan error = Gunakan printf() dengan format %f untuk tampilan default

regex pattern = printf\s*\(.*%12\.3f.*angka
pesan error = Gunakan printf() dengan format %12.3f untuk lebar 12 dan 3 desimal
```


## SUBBAB: Deklarasi Variabel

---

### Pelajaran: Konsep dan Format Variabel

##materi:
**Variabel** adalah "kotak penyimpanan" bernama di memori komputer yang digunakan untuk menyimpan data yang nilainya bisa berubah-ubah selama program berjalan. Sebelum variabel digunakan, ia harus **dideklarasikan** terlebih dahulu — ini memberitahu compiler untuk mengalokasikan ruang memori dengan ukuran sesuai tipe datanya. Format deklarasi variabel di C adalah: `tipe_data nama_variabel;` atau langsung diinisialisasi: `tipe_data nama_variabel = nilai;`.

Deklarasi bisa dilakukan untuk satu variabel atau beberapa variabel bertipe sama sekaligus dalam satu baris menggunakan koma. Variabel yang dideklarasikan di dalam fungsi disebut **variabel lokal** dan hanya dapat diakses di dalam fungsi tersebut. Variabel yang dideklarasikan di luar semua fungsi disebut **variabel global** dan bisa diakses dari seluruh bagian program.

```c
#include <stdio.h>

int skor_global = 0; /* Variabel global */

int main() {
    int usia = 20;            /* Deklarasi + inisialisasi */
    float tinggi;             /* Deklarasi saja */
    int a = 1, b = 2, c = 3; /* Beberapa variabel sekaligus */

    tinggi = 170.5f;          /* Inisialisasi setelah deklarasi */
    printf("Usia: %d, Tinggi: %.1f\n", usia, tinggi);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Usia: 20, Tinggi: 170.5
```

##kuis:
Manakah yang merupakan deklarasi variabel dengan inisialisasi langsung yang benar di C?

A. `variabel int = 10;`
B. `int = variabel 10;`
C. `int variabel = 10;` **Benar**
D. `10 = int variabel;`

##latihan:
deskripsi tugas:
Deklarasikan tiga variabel: `int` bernama `tahun` dengan nilai 2024, `float` bernama `ipk` dengan nilai 3.75, dan `char` bernama `grade` dengan nilai 'A'. Tampilkan ketiganya.

output diharapkan:
```
Tahun: 2024
IPK: 3.75
Grade: A
```

input (opsional):
-

petunjuk:
Gunakan tipe data yang sesuai untuk masing-masing variabel dan format specifier `%d`, `%.2f`, `%c`.

kode awal:
```c
#include <stdio.h>

int main() {
    // Deklarasikan tahun, ipk, dan grade
    
    // Tampilkan ketiganya
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int tahun = 2024;
    float ipk = 3.75f;
    char grade = 'A';
    printf("Tahun: %d\n", tahun);
    printf("IPK: %.2f\n", ipk);
    printf("Grade: %c\n", grade);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = int\s+tahun\s*=\s*2024\s*;
pesan error = Deklarasikan: int tahun = 2024;

regex pattern = char\s+grade\s*=\s*'A'\s*;
pesan error = Deklarasikan: char grade = 'A'; (gunakan petik tunggal)
```

---

### Pelajaran: Aturan Penamaan Variabel

##materi:
Bahasa C memiliki aturan ketat untuk penamaan variabel. Nama variabel **hanya boleh** mengandung huruf (a-z, A-Z), angka (0-9), dan garis bawah (`_`). Nama variabel **wajib diawali** dengan huruf atau garis bawah — tidak boleh diawali angka. Selain itu, nama variabel tidak boleh sama dengan **kata kunci reserved** (keyword) bahasa C seperti `int`, `for`, `if`, `return`, `void`, dan lainnya.

| ✅ Nama Valid | ❌ Nama Tidak Valid | Alasan Tidak Valid |
|---|---|---|
| `nilai` | `2nilai` | Diawali angka |
| `nama_siswa` | `nama siswa` | Mengandung spasi |
| `_data` | `data-siswa` | Mengandung tanda `-` |
| `totalHarga` | `int` | Kata kunci reserved |
| `x1` | `nama@user` | Mengandung karakter `@` |

Konvensi penamaan yang umum dipakai di C adalah **snake_case** (semua huruf kecil, kata dipisahkan garis bawah): `total_harga`, `nama_siswa`. Pilih nama yang deskriptif dan bermakna — `jumlah_siswa` jauh lebih baik daripada `js` atau `x`.

```c
#include <stdio.h>

int main() {
    int jumlah_siswa = 35;     /* snake_case — dianjurkan */
    float nilai_rata_rata = 78.5f;
    char inisial_nama = 'B';
    printf("Siswa: %d, Rata-rata: %.1f\n", jumlah_siswa, nilai_rata_rata);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Siswa: 35, Rata-rata: 78.5
```

##kuis:
Manakah nama variabel yang **tidak valid** menurut aturan penamaan bahasa C?

A. `total_nilai`
B. `_skor`
C. `nilai1`
D. `3angka` **Benar**

##latihan:
deskripsi tugas:
Perbaiki deklarasi variabel berikut yang namanya melanggar aturan penamaan C, lalu tampilkan nilainya.

output diharapkan:
```
Harga barang: 50000
Jumlah item: 3
```

input (opsional):
-

petunjuk:
Nama variabel tidak boleh mengandung spasi atau diawali angka. Ganti dengan nama yang valid menggunakan garis bawah atau camelCase.

kode awal:
```c
#include <stdio.h>

int main() {
    int harga barang = 50000;  /* Nama tidak valid! */
    int 3item = 3;             /* Nama tidak valid! */
    printf("Harga barang: %d\n", harga barang);
    printf("Jumlah item: %d\n", 3item);
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int harga_barang = 50000;
    int jumlah_item = 3;
    printf("Harga barang: %d\n", harga_barang);
    printf("Jumlah item: %d\n", jumlah_item);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = int\s+harga_barang\s*=\s*50000\s*;
pesan error = Perbaiki nama variabel: gunakan harga_barang (garis bawah, bukan spasi)

regex pattern = int\s+jumlah_item\s*=\s*3\s*;
pesan error = Perbaiki nama variabel: tidak boleh diawali angka, gunakan jumlah_item
```

---

### Pelajaran: Sifat Case-Sensitive Bahasa C

##materi:
Bahasa C bersifat **case-sensitive**, artinya huruf besar dan kecil dianggap **berbeda dan tidak saling menggantikan**. Variabel `Nilai`, `NILAI`, dan `nilai` adalah tiga variabel yang berbeda sepenuhnya di C. Hal yang sama berlaku untuk nama fungsi, konstanta, dan semua identifier lainnya. Ini berbeda dengan beberapa bahasa lain seperti SQL atau Basic yang tidak case-sensitive.

Sifat ini berlaku konsisten: keyword bahasa C ditulis dengan huruf kecil semua (`int`, `if`, `for`, `return`). Menulis `Int`, `IF`, atau `Return` akan menyebabkan error karena compiler tidak mengenalinya sebagai keyword. Kesalahan case adalah salah satu penyebab paling umum error kompilasi pada pemula, terutama saat memanggil fungsi atau merujuk variabel.

```c
#include <stdio.h>

int main() {
    int nilai = 80;
    int Nilai = 90;
    int NILAI = 100;

    /* Ketiganya adalah variabel yang BERBEDA */
    printf("nilai  = %d\n", nilai);
    printf("Nilai  = %d\n", Nilai);
    printf("NILAI  = %d\n", NILAI);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
nilai  = 80
Nilai  = 90
NILAI  = 100
```

##kuis:
Dalam bahasa C, apakah variabel `data`, `Data`, dan `DATA` dianggap sama?

A. Ya, ketiganya adalah variabel yang sama
B. Ya, tapi hanya `data` dan `Data` yang sama
C. Tidak, ketiganya adalah variabel yang berbeda **Benar**
D. Tergantung compiler yang digunakan

##latihan:
deskripsi tugas:
Perbaiki kode berikut yang gagal dikompilasi akibat kesalahan penulisan case pada keyword dan nama variabel.

output diharapkan:
```
Skor: 95
```

input (opsional):
-

petunjuk:
Keyword `Int`, `Printf`, dan `Return` tidak valid — semua keyword C ditulis dengan huruf kecil.

kode awal:
```c
#include <stdio.h>

Int main() {
    int skor = 95;
    Printf("Skor: %d\n", skor);
    Return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int skor = 95;
    printf("Skor: %d\n", skor);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = int\s+main\s*\(
pesan error = Gunakan huruf kecil: int main() bukan Int main()

regex pattern = printf\s*\(
pesan error = Gunakan huruf kecil: printf() bukan Printf()
```

---

## SUBBAB: Fungsi Menginput / Memasukkan Data

---

### Pelajaran: Fungsi `scanf()` dan Formatnya

##materi:
`scanf()` adalah fungsi standar C untuk **membaca input dari keyboard** dan menyimpannya ke variabel. Format penggunaannya adalah `scanf("format_specifier", &variabel)`. Tanda **`&` (ampersand)** di depan nama variabel adalah operator address-of yang memberikan alamat memori variabel kepada `scanf()` — ini wajib ada, dan melupakannya adalah kesalahan paling umum pemula yang menyebabkan perilaku program tidak terduga atau crash.

Format specifier di `scanf()` sama dengan `printf()`: `%d` untuk `int`, `%f` untuk `float`, `%lf` untuk `double`, `%c` untuk `char`. Untuk string, digunakan `%s` dan tidak membutuhkan `&` karena nama array sudah berupa pointer. Perlu diperhatikan: `scanf()` dengan `%s` berhenti membaca di spasi, sehingga tidak cocok untuk input kalimat.

```c
#include <stdio.h>

int main() {
    int usia;
    float berat;
    printf("Masukkan usia: ");
    scanf("%d", &usia);
    printf("Masukkan berat badan: ");
    scanf("%f", &berat);
    printf("Usia: %d tahun, Berat: %.1f kg\n", usia, berat);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Masukkan usia: 22
Masukkan berat badan: 65.5
Usia: 22 tahun, Berat: 65.5 kg
```

##kuis:
Mengapa tanda `&` diperlukan sebelum nama variabel di dalam `scanf()`?

A. Untuk menghitung nilai variabel secara otomatis
B. Untuk memberikan alamat memori variabel agar scanf() bisa menyimpan nilai ke sana **Benar**
C. Untuk mengosongkan nilai variabel sebelum diisi
D. Untuk menampilkan nilai variabel setelah diinput

##latihan:
deskripsi tugas:
Buat program yang meminta pengguna memasukkan dua bilangan bulat, lalu tampilkan hasil penjumlahannya.

output diharapkan:
```
Masukkan angka pertama: 15
Masukkan angka kedua: 27
Hasil: 42
```

input (opsional):
15 dan 27

petunjuk:
Gunakan dua variabel `int`, dua `scanf()` masing-masing dengan `&`, dan hitung hasil penjumlahan sebelum menampilkan.

kode awal:
```c
#include <stdio.h>

int main() {
    int a, b, hasil;
    printf("Masukkan angka pertama: ");
    // Baca nilai a dengan scanf
    
    printf("Masukkan angka kedua: ");
    // Baca nilai b dengan scanf
    
    // Hitung hasil dan tampilkan
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int a, b, hasil;
    printf("Masukkan angka pertama: ");
    scanf("%d", &a);
    printf("Masukkan angka kedua: ");
    scanf("%d", &b);
    hasil = a + b;
    printf("Hasil: %d\n", hasil);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = scanf\s*\(\s*"%d"\s*,\s*&a\s*\)
pesan error = Gunakan scanf("%d", &a); untuk membaca variabel a — jangan lupa tanda &

regex pattern = scanf\s*\(\s*"%d"\s*,\s*&b\s*\)
pesan error = Gunakan scanf("%d", &b); untuk membaca variabel b — jangan lupa tanda &
```

---

### Pelajaran: Fungsi `getchar()`

##materi:
`getchar()` adalah fungsi yang membaca **satu karakter tunggal** dari input standar (keyboard) dan mengembalikannya sebagai nilai `int`. Fungsi ini sering digunakan untuk membaca satu karakter saja, atau sebagai teknik untuk **membersihkan sisa newline** (`\n`) yang tertinggal di buffer input setelah `scanf()` — masalah umum yang menyebabkan `scanf()` atau `gets()` berikutnya terlewat.

`getchar()` mengembalikan `int` bukan `char` agar bisa merepresentasikan nilai EOF (`-1`) selain karakter normal. Nilai yang dikembalikan bisa langsung disimpan ke variabel `char` karena akan di-cast secara implisit. Idiom umum: `while ((c = getchar()) != '\n');` digunakan untuk menguras sisa input di buffer.

```c
#include <stdio.h>

int main() {
    char karakter;
    printf("Tekan satu tombol: ");
    karakter = getchar();
    printf("Karakter yang ditekan: %c\n", karakter);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Tekan satu tombol: X
Karakter yang ditekan: X
```

##kuis:
Apa tipe data yang dikembalikan oleh fungsi `getchar()`?

A. `char`
B. `void`
C. `int` **Benar**
D. `string`

##latihan:
deskripsi tugas:
Buat program yang membaca satu karakter menggunakan `getchar()`, lalu tampilkan karakter tersebut beserta kode ASCII-nya.

output diharapkan:
```
Masukkan satu karakter: A
Karakter: A, ASCII: 65
```

input (opsional):
A

petunjuk:
Simpan hasil `getchar()` ke variabel `int` atau `char`. Untuk menampilkan kode ASCII, gunakan `%d` dengan variabel yang sama.

kode awal:
```c
#include <stdio.h>

int main() {
    int karakter;
    printf("Masukkan satu karakter: ");
    // Baca karakter dengan getchar()
    
    // Tampilkan karakter dan kode ASCII-nya
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int karakter;
    printf("Masukkan satu karakter: ");
    karakter = getchar();
    printf("Karakter: %c, ASCII: %d\n", karakter, karakter);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = getchar\s*\(\s*\)
pesan error = Gunakan getchar() untuk membaca satu karakter dari input

regex pattern = printf\s*\(.*%c.*%d.*karakter.*karakter
pesan error = Tampilkan karakter (%c) dan kode ASCII (%d) dari variabel yang sama
```

---

### Pelajaran: Fungsi `gets()`

##materi:
`gets()` adalah fungsi untuk membaca **satu baris teks lengkap** (termasuk spasi) dari input sampai pengguna menekan Enter, dan menyimpannya ke array karakter (string). Berbeda dengan `scanf("%s", ...)` yang berhenti di spasi, `gets()` membaca seluruh baris. Format penggunaannya sederhana: `gets(nama_array);` tanpa operator `&`.

**Peringatan penting:** `gets()` telah **dihapus dari standar C11** karena rentan terhadap buffer overflow — tidak ada batasan jumlah karakter yang dibaca, sehingga bisa menimpa memori di luar array. Sebagai pengganti yang aman, gunakan `fgets(buffer, ukuran, stdin)` yang memungkinkan pembatasan panjang input. Pada lingkungan pembelajaran C89/C99, `gets()` masih bisa digunakan, tetapi pahami risikonya.

```c
#include <stdio.h>

int main() {
    char nama[50];
    printf("Masukkan nama lengkap: ");
    gets(nama);  /* Atau gunakan: fgets(nama, 50, stdin); */
    printf("Halo, %s!\n", nama);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Masukkan nama lengkap: Budi Santoso
Halo, Budi Santoso!
```

##kuis:
Mengapa `gets()` dianggap berbahaya dan sudah dihapus dari standar C11?

A. Karena `gets()` tidak bisa membaca spasi
B. Karena `gets()` tidak mengembalikan nilai apapun
C. Karena `gets()` tidak membatasi panjang input sehingga rentan buffer overflow **Benar**
D. Karena `gets()` hanya bisa membaca angka, bukan teks

##latihan:
deskripsi tugas:
Buat program yang meminta pengguna memasukkan nama kota (bisa mengandung spasi) menggunakan `fgets()`, lalu tampilkan kembali.

output diharapkan:
```
Masukkan nama kota: Kuala Lumpur
Kota tujuan: Kuala Lumpur
```

input (opsional):
Kuala Lumpur

petunjuk:
Gunakan `fgets(kota, sizeof(kota), stdin)`. `fgets()` menyertakan karakter `\n` di akhir string — untuk menghilangkannya bisa diabaikan dulu pada latihan ini.

kode awal:
```c
#include <stdio.h>

int main() {
    char kota[100];
    printf("Masukkan nama kota: ");
    // Baca input dengan fgets
    
    // Tampilkan kota
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    char kota[100];
    printf("Masukkan nama kota: ");
    fgets(kota, sizeof(kota), stdin);
    printf("Kota tujuan: %s", kota);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = fgets\s*\(\s*kota
pesan error = Gunakan fgets(kota, sizeof(kota), stdin); untuk membaca teks dengan aman

regex pattern = sizeof\s*\(\s*kota\s*\)
pesan error = Sertakan sizeof(kota) sebagai argumen kedua fgets() untuk membatasi ukuran
```

---

### Pelajaran: Fungsi `getch()` dan `getche()`

##materi:
`getch()` dan `getche()` adalah fungsi dari header `<conio.h>` (Console I/O) yang tersedia di compiler Windows seperti MinGW/Turbo C. Keduanya membaca **satu karakter tanpa menunggu Enter** — karakter langsung dibaca begitu tombol ditekan. Perbedaannya: `getch()` membaca karakter **tanpa menampilkannya** (tidak echo) di layar, sedangkan `getche()` membaca **sambil menampilkan** karakter tersebut (dengan echo).

Kedua fungsi ini **tidak tersedia di Linux/macOS** karena `<conio.h>` adalah header Windows. Penggunaannya paling umum untuk membuat menu interaktif, membaca input password tersembunyi (dengan `getch()`), atau menahan layar konsol dengan `getch()` sebelum program berakhir.

```c
#include <stdio.h>
#include <conio.h>  /* Hanya tersedia di Windows/MinGW */

int main() {
    char tombol;
    printf("Tekan sembarang tombol...\n");
    tombol = getch();    /* Tidak menampilkan karakter */
    printf("Kamu menekan: %c\n", tombol);

    printf("Sekarang dengan getche(): ");
    tombol = getche();   /* Menampilkan karakter yang ditekan */
    printf("\nSelesai.\n");
    return 0;
}
```

Output Terminal (Windows):
```
Tekan sembarang tombol...
Kamu menekan: A
Sekarang dengan getche(): B
Selesai.
```

##kuis:
Apa perbedaan utama antara `getch()` dan `getche()`?

A. `getch()` membaca string, `getche()` membaca satu karakter
B. `getch()` menampilkan karakter yang ditekan, `getche()` tidak menampilkannya
C. `getch()` tidak menampilkan karakter yang ditekan, `getche()` menampilkannya **Benar**
D. `getch()` hanya bisa digunakan di Linux, `getche()` hanya di Windows

##latihan:
deskripsi tugas:
Buat program yang menggunakan `getch()` untuk membaca input tombol dan mengecek apakah tombol yang ditekan adalah 'Y' atau bukan.

output diharapkan:
```
Apakah kamu setuju? (Y/N): 
Kamu memilih: Y
Pilihan: Setuju
```

input (opsional):
Y

petunjuk:
Gunakan `getch()` tanpa menampilkan karakter, simpan ke `char`, lalu gunakan `if` untuk memeriksa nilainya.

kode awal:
```c
#include <stdio.h>
#include <conio.h>

int main() {
    char pilihan;
    printf("Apakah kamu setuju? (Y/N): ");
    // Baca satu karakter dengan getch()
    
    printf("\nKamu memilih: %c\n", pilihan);
    // Cek apakah pilihan == 'Y'
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>
#include <conio.h>

int main() {
    char pilihan;
    printf("Apakah kamu setuju? (Y/N): ");
    pilihan = getch();
    printf("\nKamu memilih: %c\n", pilihan);
    if (pilihan == 'Y' || pilihan == 'y') {
        printf("Pilihan: Setuju\n");
    } else {
        printf("Pilihan: Tidak Setuju\n");
    }
    return 0;
}
```

Validasi kode statis:
```
regex pattern = getch\s*\(\s*\)
pesan error = Gunakan getch() untuk membaca satu karakter tanpa menampilkannya

regex pattern = pilihan\s*==\s*'Y'
pesan error = Periksa pilihan dengan: if (pilihan == 'Y')
```

---

## SUBBAB: Fungsi Menampilkan Data

---

### Pelajaran: Fungsi `printf()`

##materi:
`printf()` adalah fungsi output paling fleksibel di C, digunakan untuk **mencetak teks terformat** ke layar. Format dasarnya adalah `printf("string_format", argumen1, argumen2, ...)`. Di dalam string format, terdapat dua elemen khusus: **format specifier** (diawali `%`) yang diganti dengan nilai argumen, dan **escape sequence** (diawali `\`) untuk karakter khusus seperti baris baru dan tab.

| Format Specifier | Tipe Data | Contoh |
|---|---|---|
| `%d` / `%i` | `int` | `printf("%d", 42)` → `42` |
| `%f` | `float` / `double` | `printf("%.2f", 3.14)` → `3.14` |
| `%c` | `char` | `printf("%c", 'A')` → `A` |
| `%s` | string (char array) | `printf("%s", "Halo")` → `Halo` |
| `%u` | `unsigned int` | `printf("%u", 4000U)` → `4000` |
| `%x` | Hexadecimal | `printf("%x", 255)` → `ff` |

| Escape Sequence | Fungsi |
|---|---|
| `\n` | Baris baru (newline) |
| `\t` | Tab horizontal |
| `\\` | Cetak karakter `\` |
| `\"` | Cetak karakter `"` |

```c
#include <stdio.h>

int main() {
    printf("Nama\tUsia\tKota\n");
    printf("%-10s\t%d\t%s\n", "Andi", 20, "Jakarta");
    printf("%-10s\t%d\t%s\n", "Budi", 22, "Bandung");
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Nama      Usia  Kota
Andi      20    Jakarta
Budi      22    Bandung
```

##kuis:
Apa fungsi dari escape sequence `\t` di dalam string format `printf()`?

A. Mengakhiri program
B. Mencetak karakter `t` ke layar
C. Mencetak karakter tab horizontal **Benar**
D. Memindahkan cursor ke awal baris

##latihan:
deskripsi tugas:
Gunakan `printf()` untuk menampilkan informasi produk dalam format berkolom menggunakan tab (`\t`).

output diharapkan:
```
Produk          Harga   Stok
Buku Tulis      5000    100
Pensil          2000    250
```

input (opsional):
-

petunjuk:
Gunakan `\t` untuk pemisah kolom dan `\n` untuk baris baru. Format angka dengan `%d`.

kode awal:
```c
#include <stdio.h>

int main() {
    // Tampilkan header
    printf("Produk\t\tHarga\tStok\n");
    // Tampilkan baris data pertama (Buku Tulis, 5000, 100)
    
    // Tampilkan baris data kedua (Pensil, 2000, 250)
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    printf("Produk\t\tHarga\tStok\n");
    printf("Buku Tulis\t5000\t100\n");
    printf("Pensil\t\t2000\t250\n");
    return 0;
}
```

Validasi kode statis:
```
regex pattern = printf\s*\(.*\\t
pesan error = Gunakan \t (tab) sebagai pemisah kolom di dalam printf()

regex pattern = printf\s*\(.*Buku Tulis
pesan error = Tampilkan data "Buku Tulis" dengan printf()
```

---

### Pelajaran: Fungsi `puts()`

##materi:
`puts()` adalah fungsi sederhana untuk **mencetak string ke layar diikuti baris baru otomatis**. Berbeda dengan `printf()` yang fleksibel dan mendukung format specifier, `puts()` hanya menerima satu argumen: sebuah string (literal atau pointer ke array karakter). `puts()` secara otomatis menambahkan karakter newline (`\n`) di akhir, sehingga kamu tidak perlu menambahkannya sendiri.

Karena tidak mendukung format specifier, `puts()` cocok digunakan saat kamu hanya perlu menampilkan **teks statis atau isi variabel string secara langsung**, tanpa memerlukan pemformatan. `puts()` berasal dari header `<stdio.h>` dan lebih ringan dari `printf()` untuk kasus penggunaan sederhana ini.

```c
#include <stdio.h>

int main() {
    char pesan[] = "Selamat belajar bahasa C!";
    puts("Halo, Dunia!");     /* Otomatis ada newline di akhir */
    puts(pesan);              /* Menampilkan isi array string */
    puts("Program selesai.");
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Halo, Dunia!
Selamat belajar bahasa C!
Program selesai.
```

##kuis:
Apa yang membedakan `puts()` dari `printf()` dalam menampilkan string?

A. `puts()` bisa menampilkan angka, `printf()` tidak
B. `puts()` secara otomatis menambahkan newline di akhir output **Benar**
C. `puts()` membutuhkan format specifier, `printf()` tidak
D. `puts()` berasal dari header yang berbeda dengan `printf()`

##latihan:
deskripsi tugas:
Gunakan `puts()` untuk menampilkan tiga baris teks deskripsi sebuah program sederhana.

output diharapkan:
```
=== Kalkulator Sederhana ===
Versi: 1.0
Dibuat oleh: Siswa C
```

input (opsional):
-

petunjuk:
Panggil `puts()` tiga kali, masing-masing dengan satu string argumen. Tidak perlu menambahkan `\n` di dalam string.

kode awal:
```c
#include <stdio.h>

int main() {
    // Tampilkan tiga baris menggunakan puts()
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    puts("=== Kalkulator Sederhana ===");
    puts("Versi: 1.0");
    puts("Dibuat oleh: Siswa C");
    return 0;
}
```

Validasi kode statis:
```
regex pattern = puts\s*\(
pesan error = Gunakan fungsi puts() untuk menampilkan setiap baris teks

regex pattern = puts\s*\(.*Kalkulator
pesan error = Tampilkan baris pertama dengan puts("=== Kalkulator Sederhana ===")
```

---

### Pelajaran: Fungsi `putchar()`

##materi:
`putchar()` adalah pasangan dari `getchar()` — fungsi yang menampilkan **satu karakter tunggal** ke layar. Argumennya bisa berupa variabel `char`, literal karakter (`'A'`), atau nilai ASCII integer. Fungsi ini tidak secara otomatis menambahkan newline seperti `puts()`; jika ingin baris baru, kamu perlu secara eksplisit memanggil `putchar('\n')`.

`putchar()` sangat berguna saat kamu perlu menampilkan karakter satu per satu, misalnya dalam iterasi string atau saat membangun output karakter demi karakter. Secara internal, `putchar(c)` sebenarnya adalah macro yang setara dengan `fputc(c, stdout)`, tapi dalam praktik pembelajaran keduanya bisa dianggap sama.

```c
#include <stdio.h>

int main() {
    char huruf = 'C';
    putchar(huruf);      /* Cetak variabel char */
    putchar(' ');        /* Cetak spasi */
    putchar('R');        /* Cetak literal char */
    putchar('u');
    putchar('l');
    putchar('e');
    putchar('s');
    putchar('\n');       /* Baris baru */
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
C Rules
```

##kuis:
Berapa karakter yang ditampilkan oleh satu panggilan `putchar()`?

A. Seluruh isi string
B. Satu baris teks penuh
C. Satu karakter tunggal **Benar**
D. Tergantung panjang argumen

##latihan:
deskripsi tugas:
Gunakan `putchar()` untuk menampilkan kata "HALO" karakter per karakter, diikuti baris baru.

output diharapkan:
```
HALO
```

input (opsional):
-

petunjuk:
Panggil `putchar()` lima kali: untuk 'H', 'A', 'L', 'O', dan `'\n'`.

kode awal:
```c
#include <stdio.h>

int main() {
    // Tampilkan H, A, L, O masing-masing dengan putchar()
    // Jangan lupa baris baru di akhir
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    putchar('H');
    putchar('A');
    putchar('L');
    putchar('O');
    putchar('\n');
    return 0;
}
```

Validasi kode statis:
```
regex pattern = putchar\s*\(\s*'H'\s*\)
pesan error = Tampilkan karakter 'H' dengan putchar('H')

regex pattern = putchar\s*\(\s*'\\n'\s*\)
pesan error = Tambahkan baris baru dengan putchar('\n') di akhir
```

---

## SUBBAB: Deklarasi Konstanta

---

### Pelajaran: Konsep Nilai Konstanta

##materi:
**Konstanta** adalah nilai yang ditetapkan satu kali dan **tidak boleh diubah** selama program berjalan. Berbeda dengan variabel yang nilainya bisa dimodifikasi kapan saja, konstanta memberikan jaminan bahwa nilai tersebut tetap konsisten di seluruh program. Ini meningkatkan keamanan kode dan mencegah perubahan nilai yang tidak disengaja.

Penggunaan konstanta adalah praktik pemrograman yang baik karena dua alasan utama: pertama, kode lebih mudah dibaca (nama `LAJU_CAHAYA` lebih bermakna daripada angka `299792458` yang tersebar di mana-mana), dan kedua, jika nilai perlu diubah, kamu hanya perlu mengubah satu tempat saja, bukan mencari-cari angka tersebut di seluruh kode. Contoh umum konstanta: nilai PI, batas maksimum array, kecepatan konversi, dll.

```c
#include <stdio.h>

/* Contoh konstanta untuk program konversi suhu */
#define OFFSET_FAHRENHEIT 32
#define FAKTOR_KONVERSI 1.8

int main() {
    float celsius = 100.0f;
    float fahrenheit = (celsius * FAKTOR_KONVERSI) + OFFSET_FAHRENHEIT;
    printf("%.1f°C = %.1f°F\n", celsius, fahrenheit);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
100.0°C = 212.0°F
```

##kuis:
Mengapa menggunakan konstanta lebih baik daripada menyebarkan nilai angka literal di seluruh kode program?

A. Karena konstanta menggunakan lebih sedikit memori dibanding variabel
B. Karena konstanta bisa memiliki tipe data yang berbeda
C. Karena mudah dibaca dan jika nilai perlu diubah cukup mengubah satu tempat saja **Benar**
D. Karena konstanta otomatis dioptimalkan oleh compiler

##latihan:
deskripsi tugas:
Tentukan mengapa kode berikut sebaiknya menggunakan konstanta, lalu refactor dengan mendefinisikan konstanta untuk nilai `3.14159` dan `2`.

output diharapkan:
```
Keliling lingkaran dengan jari-jari 7: 43.98
```

input (opsional):
-

petunjuk:
Definisikan `PI` dan `DUA` sebagai konstanta, lalu gunakan dalam rumus keliling = 2 * PI * r.

kode awal:
```c
#include <stdio.h>

/* Definisikan konstanta PI dan DUA di sini */

int main() {
    float r = 7.0f;
    float keliling = 2 * 3.14159 * r;  /* Refactor: gunakan konstanta */
    printf("Keliling lingkaran dengan jari-jari %.0f: %.2f\n", r, keliling);
    return 0;
}
```

solusi:
```c
#include <stdio.h>

#define PI 3.14159
#define DUA 2

int main() {
    float r = 7.0f;
    float keliling = DUA * PI * r;
    printf("Keliling lingkaran dengan jari-jari %.0f: %.2f\n", r, keliling);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = #define\s+PI\s+3\.14159
pesan error = Definisikan konstanta PI dengan: #define PI 3.14159

regex pattern = DUA\s*\*\s*PI\s*\*\s*r
pesan error = Gunakan konstanta dalam rumus: DUA * PI * r
```

---

### Pelajaran: Deklarasi dengan `#define`

##materi:
`#define` adalah **direktif preprocessor** untuk mendefinisikan konstanta bernama (atau disebut macro). Sintaksnya: `#define NAMA_KONSTANTA nilai` — tanpa tanda `=` dan tanpa titik koma di akhir. Sebelum kompilasi, preprocessor C akan **mengganti setiap kemunculan** nama tersebut secara tekstual dengan nilainya di seluruh kode. Oleh karena itu, `#define` bukan deklarasi variabel — ia hanya substitusi teks.

Konvensi standar adalah menulis nama konstanta `#define` dengan **HURUF KAPITAL SEMUA** agar mudah dibedakan dari variabel. `#define` bisa digunakan untuk mendefinisikan bukan hanya angka, tapi juga string, ekspresi, bahkan macro fungsi (meski yang terakhir perlu hati-hati dengan efek samping).

```c
#include <stdio.h>

#define UKURAN_ARRAY 5
#define NAMA_APP "Kalkulator C"
#define VERSI 1.2

int main() {
    printf("Aplikasi: %s v%.1f\n", NAMA_APP, VERSI);
    printf("Ukuran array: %d elemen\n", UKURAN_ARRAY);
    int nilai[UKURAN_ARRAY] = {10, 20, 30, 40, 50};
    printf("Elemen pertama: %d\n", nilai[0]);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Aplikasi: Kalkulator C v1.2
Ukuran array: 5 elemen
Elemen pertama: 10
```

##kuis:
Manakah penulisan `#define` yang benar untuk mendefinisikan konstanta dengan nilai 100?

A. `#define MAKS = 100;`
B. `#define MAKS 100` **Benar**
C. `#define int MAKS = 100;`
D. `define MAKS 100;`

##latihan:
deskripsi tugas:
Definisikan tiga konstanta menggunakan `#define`: `PANJANG` (10), `LEBAR` (5), dan `TINGGI` (3), lalu hitung dan tampilkan volume balok (panjang × lebar × tinggi).

output diharapkan:
```
Volume balok: 150
```

input (opsional):
-

petunjuk:
Tulis tiga `#define` di atas fungsi `main()`. Tidak ada tanda `=` dan tidak ada titik koma.

kode awal:
```c
#include <stdio.h>

/* Definisikan PANJANG, LEBAR, dan TINGGI di sini */

int main() {
    int volume = /* Hitung menggunakan konstanta */;
    printf("Volume balok: %d\n", volume);
    return 0;
}
```

solusi:
```c
#include <stdio.h>

#define PANJANG 10
#define LEBAR 5
#define TINGGI 3

int main() {
    int volume = PANJANG * LEBAR * TINGGI;
    printf("Volume balok: %d\n", volume);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = #define\s+PANJANG\s+10
pesan error = Definisikan: #define PANJANG 10 (tanpa = dan tanpa ;)

regex pattern = PANJANG\s*\*\s*LEBAR\s*\*\s*TINGGI
pesan error = Gunakan konstanta dalam perhitungan: PANJANG * LEBAR * TINGGI
```

---

### Pelajaran: Deklarasi dengan `const`

##materi:
Selain `#define`, bahasa C (sejak C89) menyediakan kata kunci `const` untuk mendeklarasikan konstanta yang **memiliki tipe data eksplisit**. Sintaksnya: `const tipe_data NAMA = nilai;`. Berbeda dengan `#define` yang hanya substitusi teks tanpa tipe, `const` menciptakan variabel yang benar-benar **bertipe dan bisa dicek oleh compiler** — compiler akan memberikan error jika kamu mencoba mengubah nilainya.

| Aspek | `#define` | `const` |
|---|---|---|
| Tipe data | Tidak ada (substitusi teks) | Ada (bertipe eksplisit) |
| Cek compiler | Tidak ada | Ada (lebih aman) |
| Debugging | Sulit (tidak ada nama di debugger) | Mudah (nama terlihat) |
| Lingkup | Global (seluruh file) | Mengikuti aturan scope |
| Penggunaan dalam ekspresi | Substitusi tekstual | Nilai bertipe |

```c
#include <stdio.h>

const float PAJAK = 0.11f;  /* Konstanta bertipe float */
const int BATAS_USIA = 18;

int main() {
    int usia = 20;
    float harga = 100000.0f;
    float total = harga + (harga * PAJAK);
    printf("Harga setelah pajak: %.2f\n", total);
    /* PAJAK = 0.12f; */ /* ERROR: Tidak bisa mengubah const! */
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Harga setelah pajak: 111000.00
```

##kuis:
Apa keunggulan menggunakan `const` dibandingkan `#define` untuk mendefinisikan konstanta?

A. `const` tidak membutuhkan tipe data sehingga lebih fleksibel
B. `const` memiliki tipe data eksplisit sehingga compiler bisa melakukan pemeriksaan tipe **Benar**
C. `const` membuat program berjalan lebih cepat dari `#define`
D. `const` bisa digunakan di luar fungsi, `#define` tidak bisa

##latihan:
deskripsi tugas:
Deklarasikan dua konstanta menggunakan `const`: `const double KURS` (bernilai 15750.0 untuk konversi USD ke IDR) dan `const int MINIMAL_TRANSFER` (bernilai 100). Hitung konversi 50 USD ke IDR.

output diharapkan:
```
50 USD = Rp787500.00
Minimal transfer: 100 USD
```

input (opsional):
-

petunjuk:
Gunakan `const double` dan `const int` untuk mendeklarasikan konstanta bertipe, lalu gunakan dalam perhitungan dan `printf()`.

kode awal:
```c
#include <stdio.h>

/* Deklarasikan KURS dan MINIMAL_TRANSFER dengan const di sini */

int main() {
    int usd = 50;
    // Hitung dan tampilkan konversi
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

const double KURS = 15750.0;
const int MINIMAL_TRANSFER = 100;

int main() {
    int usd = 50;
    double idr = usd * KURS;
    printf("%d USD = Rp%.2f\n", usd, idr);
    printf("Minimal transfer: %d USD\n", MINIMAL_TRANSFER);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = const\s+double\s+KURS\s*=\s*15750
pesan error = Deklarasikan: const double KURS = 15750.0;

regex pattern = usd\s*\*\s*KURS
pesan error = Hitung konversi dengan: usd * KURS
```


## SUBBAB: Fungsi

---

### Pelajaran: Konsep dan Deklarasi Fungsi

##materi:
**Fungsi** adalah blok kode mandiri yang melakukan tugas tertentu dan bisa dipanggil berulang kali dari berbagai bagian program. Tujuan utamanya adalah **menghindari penulisan kode yang berulang** (DRY — Don't Repeat Yourself) dan membuat program lebih terstruktur, mudah dibaca, dan mudah di-debug. Setiap fungsi C memiliki: tipe kembalian, nama fungsi, daftar parameter (opsional), dan badan fungsi (body).

Struktur dasar fungsi adalah: `tipe_kembalian nama_fungsi(parameter) { /* badan fungsi */ return nilai; }`. Jika fungsi tidak mengembalikan nilai, tipe kembaliannya adalah `void` dan tidak perlu `return` dengan nilai. Sebuah fungsi harus **dideklarasikan (prototipe) atau didefinisikan sebelum dipanggil** — jika definisi fungsi ditulis di bawah `main()`, kamu perlu menulis prototipenya di atas `main()`.

```c
#include <stdio.h>

/* Prototipe / deklarasi fungsi */
int kuadrat(int n);

int main() {
    int hasil = kuadrat(5);  /* Pemanggilan fungsi */
    printf("Kuadrat dari 5 adalah: %d\n", hasil);
    return 0;
}

/* Definisi fungsi */
int kuadrat(int n) {
    return n * n;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Kuadrat dari 5 adalah: 25
```

##kuis:
Apa tujuan utama menggunakan fungsi dalam pemrograman?

A. Membuat program berjalan lebih lambat tapi lebih aman
B. Menghindari penulisan kode berulang dan membuat program lebih terstruktur **Benar**
C. Mengganti kebutuhan akan variabel global
D. Hanya digunakan untuk operasi matematika

##latihan:
deskripsi tugas:
Buat fungsi bernama `luasPersegi` yang menerima satu parameter `int sisi` dan mengembalikan nilai luas persegi (sisi × sisi). Panggil fungsi tersebut dari `main()` dengan sisi = 6.

output diharapkan:
```
Luas persegi dengan sisi 6 adalah: 36
```

input (opsional):
-

petunjuk:
Buat prototipe fungsi `int luasPersegi(int sisi);`, definisikan di bawah `main()`, dan kembalikan `sisi * sisi`.

kode awal:
```c
#include <stdio.h>

// Tulis prototipe fungsi luasPersegi di sini

int main() {
    int sisi = 6;
    int luas = luasPersegi(sisi);
    printf("Luas persegi dengan sisi %d adalah: %d\n", sisi, luas);
    return 0;
}

// Definisikan fungsi luasPersegi di sini
```

solusi:
```c
#include <stdio.h>

int luasPersegi(int sisi);

int main() {
    int sisi = 6;
    int luas = luasPersegi(sisi);
    printf("Luas persegi dengan sisi %d adalah: %d\n", sisi, luas);
    return 0;
}

int luasPersegi(int sisi) {
    return sisi * sisi;
}
```

Validasi kode statis:
```
regex pattern = int\s+luasPersegi\s*\(\s*int\s+sisi\s*\)
pesan error = Deklarasikan/definisikan fungsi dengan: int luasPersegi(int sisi)

regex pattern = return\s+sisi\s*\*\s*sisi\s*;
pesan error = Kembalikan hasil perkalian dengan: return sisi * sisi;
```

---

### Pelajaran: Fungsi Pustaka `<string.h>`

##materi:
Header `<string.h>` menyediakan kumpulan fungsi siap pakai untuk **manipulasi string** (array karakter yang diakhiri `'\0'`). Fungsi-fungsi ini sangat sering digunakan karena C tidak memiliki tipe string bawaan seperti bahasa lain — string di C adalah array `char` biasa.

| Fungsi | Kegunaan | Contoh |
|---|---|---|
| `strlen(s)` | Menghitung panjang string | `strlen("Halo")` → `4` |
| `strcpy(dst, src)` | Menyalin string | `strcpy(a, "Budi")` |
| `strcat(dst, src)` | Menggabungkan string | `strcat(a, b)` |
| `strcmp(s1, s2)` | Membandingkan string (0 = sama) | `strcmp("a","a")` → `0` |
| `strrev(s)` | Membalik string (non-standar) | `strrev("abc")` → `"cba"` |

```c
#include <stdio.h>
#include <string.h>

int main() {
    char nama1[20] = "Andi";
    char nama2[20] = "Budi";
    char gabungan[40];

    printf("Panjang nama1: %lu\n", strlen(nama1));
    strcpy(gabungan, nama1);
    strcat(gabungan, " dan ");
    strcat(gabungan, nama2);
    printf("Gabungan: %s\n", gabungan);
    printf("Apakah sama? %d\n", strcmp(nama1, nama2));
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Panjang nama1: 4
Gabungan: Andi dan Budi
Apakah sama? -1
```

##kuis:
Fungsi `strcmp(s1, s2)` mengembalikan nilai `0` jika...

A. `s1` lebih panjang dari `s2`
B. Kedua string identik **Benar**
C. `s1` lebih pendek dari `s2`
D. Salah satu string kosong

##latihan:
deskripsi tugas:
Buat program yang mendeklarasikan string `kata = "Programming"`, lalu tampilkan panjangnya menggunakan `strlen()`, dan gabungkan dengan kata " C" menggunakan `strcat()`.

output diharapkan:
```
Panjang kata: 11
Hasil gabungan: Programming C
```

input (opsional):
-

petunjuk:
Pastikan array `kata` memiliki ukuran yang cukup besar untuk menampung hasil `strcat()`.

kode awal:
```c
#include <stdio.h>
#include <string.h>

int main() {
    char kata[20] = "Programming";
    // Tampilkan panjang kata menggunakan strlen
    
    // Gabungkan kata dengan " C" menggunakan strcat
    
    // Tampilkan hasil gabungan
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>
#include <string.h>

int main() {
    char kata[20] = "Programming";
    printf("Panjang kata: %lu\n", strlen(kata));
    strcat(kata, " C");
    printf("Hasil gabungan: %s\n", kata);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = strlen\s*\(\s*kata\s*\)
pesan error = Gunakan strlen(kata) untuk menghitung panjang string

regex pattern = strcat\s*\(\s*kata\s*,\s*"\s*C"\s*\)
pesan error = Gabungkan string dengan: strcat(kata, " C");
```

---

### Pelajaran: Fungsi Pustaka `<math.h>` dan `<stdlib.h>`

##materi:
Header `<math.h>` menyediakan fungsi-fungsi **matematika** seperti akar kuadrat, pangkat, dan pembulatan. Saat dikompilasi dengan GCC, header ini sering memerlukan flag tambahan `-lm` (link math library). Header `<stdlib.h>` menyediakan fungsi **utilitas umum**, termasuk konversi tipe data, alokasi memori dinamis, menghasilkan angka acak, dan menghentikan program.

| Fungsi | Header | Kegunaan |
|---|---|---|
| `sqrt(x)` | `<math.h>` | Akar kuadrat |
| `pow(x,y)` | `<math.h>` | Pangkat (x^y) |
| `ceil(x)` / `floor(x)` | `<math.h>` | Pembulatan atas/bawah |
| `abs(x)` | `<stdlib.h>` | Nilai absolut integer |
| `rand()` | `<stdlib.h>` | Angka acak |
| `atoi(s)` | `<stdlib.h>` | String ke integer |
| `exit(kode)` | `<stdlib.h>` | Menghentikan program |

```c
#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int main() {
    double akar = sqrt(64.0);
    double pangkat = pow(2.0, 10.0);
    int absolut = abs(-25);
    int dariString = atoi("150");

    printf("Akar dari 64: %.0f\n", akar);
    printf("2 pangkat 10: %.0f\n", pangkat);
    printf("Absolut -25: %d\n", absolut);
    printf("String '150' jadi int: %d\n", dariString);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program -lm && ./program
Akar dari 64: 8
2 pangkat 10: 1024
Absolut -25: 25
String '150' jadi int: 150
```

##kuis:
Fungsi `pow(2.0, 10.0)` dari `<math.h>` digunakan untuk menghitung...

A. 2 dibagi 10
B. 2 dikurangi 10
C. 2 dipangkatkan 10 **Benar**
D. Akar pangkat 10 dari 2

##latihan:
deskripsi tugas:
Buat program yang menghitung akar kuadrat dari 144 menggunakan `sqrt()` dan menghitung 3 pangkat 3 menggunakan `pow()`.

output diharapkan:
```
Akar dari 144: 12.00
3 pangkat 3: 27.00
```

input (opsional):
-

petunjuk:
Sertakan `<math.h>`. Gunakan `sqrt(144.0)` dan `pow(3.0, 3.0)`. Tampilkan dengan `%.2f`.

kode awal:
```c
#include <stdio.h>
#include <math.h>

int main() {
    // Hitung akar dari 144 dengan sqrt
    
    // Hitung 3 pangkat 3 dengan pow
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>
#include <math.h>

int main() {
    double akar = sqrt(144.0);
    double pangkat = pow(3.0, 3.0);
    printf("Akar dari 144: %.2f\n", akar);
    printf("3 pangkat 3: %.2f\n", pangkat);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = sqrt\s*\(\s*144(\.0)?\s*\)
pesan error = Gunakan sqrt(144.0) untuk menghitung akar kuadrat

regex pattern = pow\s*\(\s*3(\.0)?\s*,\s*3(\.0)?\s*\)
pesan error = Gunakan pow(3.0, 3.0) untuk menghitung 3 pangkat 3
```

---

### Pelajaran: Fungsi Pustaka `<windows.h>`

##materi:
Header `<windows.h>` adalah header khusus sistem operasi **Windows** yang menyediakan akses ke fungsi-fungsi API Windows, seperti mengontrol jendela konsol, warna teks, suara (beep), dan jeda waktu (`Sleep()`). Header ini **tidak portabel** — kode yang menggunakannya hanya bisa dikompilasi dan dijalankan di sistem Windows, dan akan error di Linux/macOS.

Fungsi yang sering dipakai pemula dari `<windows.h>` adalah `Sleep(milidetik)` untuk menunda eksekusi program, dan `system("cls")` (sebenarnya dari `<stdlib.h>`, tapi sering dipakai bersamaan) untuk membersihkan layar konsol Windows. Karena ketergantungan platform ini, kode produksi yang portabel biasanya menghindari `<windows.h>` dan menggunakan pustaka cross-platform sebagai gantinya.

```c
#include <stdio.h>
#include <windows.h>  /* Hanya untuk Windows */

int main() {
    printf("Memulai proses");
    for (int i = 0; i < 3; i++) {
        Sleep(1000);  /* Tunda 1000 milidetik = 1 detik */
        printf(".");
    }
    printf("\nSelesai!\n");
    return 0;
}
```

Output Terminal (Windows):
```
Memulai proses...
Selesai!
```
(Setiap titik muncul dengan jeda 1 detik)

##kuis:
Mengapa kode yang menggunakan `<windows.h>` tidak bisa dikompilasi di sistem Linux atau macOS?

A. Karena `<windows.h>` adalah header eksklusif untuk sistem operasi Windows **Benar**
B. Karena Linux tidak mendukung bahasa C
C. Karena `<windows.h>` membutuhkan koneksi internet
D. Karena ukuran file `<windows.h>` terlalu besar

##latihan:
deskripsi tugas:
Identifikasi mengapa kode berikut tidak portabel, lalu tulis komentar penjelasan di atas baris `#include <windows.h>` mengenai keterbatasannya, dan tetap pertahankan fungsionalitas `Sleep()`.

output diharapkan:
```
Tunggu sebentar...
Selesai!
```

input (opsional):
-

petunjuk:
Tambahkan komentar `/* Hanya berjalan di Windows */` sebelum `#include <windows.h>`. Pastikan `Sleep(1000)` tetap dipanggil sebelum mencetak "Selesai!".

kode awal:
```c
#include <stdio.h>
#include <windows.h>

int main() {
    printf("Tunggu sebentar...\n");
    // Panggil Sleep selama 1000 milidetik
    printf("Selesai!\n");
    return 0;
}
```

solusi:
```c
#include <stdio.h>
/* Hanya berjalan di Windows */
#include <windows.h>

int main() {
    printf("Tunggu sebentar...\n");
    Sleep(1000);
    printf("Selesai!\n");
    return 0;
}
```

Validasi kode statis:
```
regex pattern = Sleep\s*\(\s*1000\s*\)\s*;
pesan error = Panggil Sleep(1000); untuk menunda program selama 1 detik

regex pattern = /\*.*Windows.*\*/
pesan error = Tambahkan komentar yang menjelaskan keterbatasan platform Windows
```

---

## SUBBAB: Operator

---

### Pelajaran: Operator Unary

##materi:
**Operator unary** adalah operator yang hanya beroperasi pada **satu operand** (satu nilai/variabel). Operator unary yang umum di C meliputi: `-` (negasi/minus), `+` (positif, jarang dipakai), `++` (increment, menambah 1), `--` (decrement, mengurangi 1), `!` (NOT logika), dan `&` (address-of), serta `*` (dereference pointer).

Operator `++` dan `--` memiliki dua bentuk: **prefix** (`++x`) dan **postfix** (`x++`). Perbedaannya terletak pada *kapan* nilai baru digunakan dalam ekspresi: prefix menambah nilai **sebelum** digunakan, sedangkan postfix menggunakan nilai **lama** terlebih dahulu, baru kemudian menambahkannya. Perbedaan ini sangat penting saat operator digunakan dalam ekspresi gabungan, bukan sebagai statement berdiri sendiri.

| Operator | Nama | Contoh | Hasil (jika x=5) |
|---|---|---|---|
| `-x` | Negasi | `-x` | `-5` |
| `++x` | Pre-increment | `y = ++x` | x jadi 6, y = 6 |
| `x++` | Post-increment | `y = x++` | y = 5, x jadi 6 |
| `--x` | Pre-decrement | `y = --x` | x jadi 4, y = 4 |
| `!x` | Logical NOT | `!0` | `1` (true) |

```c
#include <stdio.h>

int main() {
    int a = 5, b = 5;
    int hasil1 = ++a;  /* a jadi 6 dulu, lalu hasil1 = 6 */
    int hasil2 = b++;  /* hasil2 = 5 dulu, lalu b jadi 6 */

    printf("a = %d, hasil1 = %d\n", a, hasil1);
    printf("b = %d, hasil2 = %d\n", b, hasil2);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
a = 6, hasil1 = 6
b = 6, hasil2 = 5
```

##kuis:
Jika `int x = 10;` dan dijalankan `int y = x++;`, berapa nilai `y` setelah baris itu dieksekusi?

A. 11
B. 10 **Benar**
C. 0
D. 9

##latihan:
deskripsi tugas:
Deklarasikan `int counter = 10;`. Tampilkan hasil dari pre-increment (`++counter`) dan post-decrement (`counter--`) beserta nilai akhir `counter` setelah keduanya dieksekusi.

output diharapkan:
```
Pre-increment: 11
Post-decrement: 11
Nilai akhir counter: 10
```

input (opsional):
-

petunjuk:
Setelah `++counter`, counter menjadi 11. Setelah `counter--`, hasil ekspresi adalah 11 (nilai lama), tapi counter berubah jadi 10.

kode awal:
```c
#include <stdio.h>

int main() {
    int counter = 10;
    // Tampilkan hasil pre-increment
    
    // Tampilkan hasil post-decrement
    
    // Tampilkan nilai akhir counter
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int counter = 10;
    printf("Pre-increment: %d\n", ++counter);
    printf("Post-decrement: %d\n", counter--);
    printf("Nilai akhir counter: %d\n", counter);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = \+\+counter
pesan error = Gunakan pre-increment dengan ++counter

regex pattern = counter--
pesan error = Gunakan post-decrement dengan counter--
```

---

### Pelajaran: Operator Aritmatika

##materi:
**Operator aritmatika** digunakan untuk melakukan operasi matematika dasar: penjumlahan (`+`), pengurangan (`-`), perkalian (`*`), pembagian (`/`), dan **modulus/sisa bagi** (`%`). Operator-operator ini mengikuti aturan **urutan operasi (precedence)** matematika standar — perkalian dan pembagian dikerjakan sebelum penjumlahan dan pengurangan, kecuali ada tanda kurung.

Hal penting yang harus dipahami pemula adalah perilaku **pembagian integer**: jika kedua operand `/` adalah `int`, hasilnya juga `int` dan bagian desimal **dibuang (truncated)**, bukan dibulatkan. Misalnya `7 / 2` menghasilkan `3`, bukan `3.5`. Untuk hasil desimal, minimal salah satu operand harus `float`/`double`. Operator `%` (modulus) hanya berlaku untuk tipe integer dan menghasilkan **sisa pembagian**.

| Operator | Nama | Contoh | Hasil |
|---|---|---|---|
| `+` | Penjumlahan | `5 + 3` | `8` |
| `-` | Pengurangan | `5 - 3` | `2` |
| `*` | Perkalian | `5 * 3` | `15` |
| `/` | Pembagian | `7 / 2` (int) | `3` |
| `/` | Pembagian | `7.0 / 2` | `3.5` |
| `%` | Modulus (sisa bagi) | `7 % 2` | `1` |

```c
#include <stdio.h>

int main() {
    int a = 17, b = 5;
    printf("17 + 5 = %d\n", a + b);
    printf("17 / 5 (integer)  = %d\n", a / b);
    printf("17 / 5 (float)    = %.2f\n", (float)a / b);
    printf("17 %% 5 (modulus) = %d\n", a % b);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
17 + 5 = 22
17 / 5 (integer)  = 3
17 / 5 (float)    = 3.40
17 % 5 (modulus) = 2
```

##kuis:
Apa hasil dari ekspresi `17 % 5` dalam bahasa C?

A. `3.4`
B. `3`
C. `2` **Benar**
D. `5`

##latihan:
deskripsi tugas:
Buat program yang membaca dua bilangan bulat dari pengguna, lalu menampilkan hasil bagi (integer) dan sisa bagi (modulus) dari kedua bilangan tersebut.

output diharapkan:
```
Masukkan bilangan pertama: 23
Masukkan bilangan kedua: 4
Hasil bagi: 5
Sisa bagi: 3
```

input (opsional):
23 dan 4

petunjuk:
Gunakan operator `/` untuk hasil bagi integer dan `%` untuk sisa bagi.

kode awal:
```c
#include <stdio.h>

int main() {
    int a, b;
    printf("Masukkan bilangan pertama: ");
    scanf("%d", &a);
    printf("Masukkan bilangan kedua: ");
    scanf("%d", &b);
    // Tampilkan hasil bagi
    
    // Tampilkan sisa bagi
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int a, b;
    printf("Masukkan bilangan pertama: ");
    scanf("%d", &a);
    printf("Masukkan bilangan kedua: ");
    scanf("%d", &b);
    printf("Hasil bagi: %d\n", a / b);
    printf("Sisa bagi: %d\n", a % b);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = printf\s*\(.*a\s*/\s*b
pesan error = Tampilkan hasil bagi dengan: a / b

regex pattern = printf\s*\(.*a\s*%\s*b
pesan error = Tampilkan sisa bagi dengan operator modulus: a % b
```

---

### Pelajaran: Operator Relasi

##materi:
**Operator relasi (perbandingan)** digunakan untuk **membandingkan dua nilai** dan menghasilkan nilai boolean: `1` (benar/true) atau `0` (salah/false). Operator ini sangat penting karena menjadi dasar dari pengambilan keputusan (`if`, `while`, dll). Hasil perbandingan **bukan** tipe `bool` khusus di C klasik, melainkan `int` (0 atau 1).

| Operator | Arti | Contoh | Hasil |
|---|---|---|---|
| `==` | Sama dengan | `5 == 5` | `1` |
| `!=` | Tidak sama dengan | `5 != 3` | `1` |
| `>` | Lebih besar | `5 > 3` | `1` |
| `<` | Lebih kecil | `5 < 3` | `0` |
| `>=` | Lebih besar atau sama | `5 >= 5` | `1` |
| `<=` | Lebih kecil atau sama | `5 <= 3` | `0` |

**Kesalahan paling umum**: tertukar antara `=` (assignment / memberi nilai) dengan `==` (perbandingan kesamaan). Menulis `if (x = 5)` adalah bug serius — ini akan **memberi nilai 5 ke x** dan selalu bernilai true (karena 5 bukan 0), bukan membandingkan apakah `x` sama dengan 5.

```c
#include <stdio.h>

int main() {
    int a = 10, b = 20;
    printf("a == b : %d\n", a == b);
    printf("a != b : %d\n", a != b);
    printf("a < b  : %d\n", a < b);
    printf("a >= b : %d\n", a >= b);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
a == b : 0
a != b : 1
a < b  : 1
a >= b : 0
```

##kuis:
Apa hasil dari ekspresi `(10 != 10)` dalam bahasa C?

A. `1`
B. `0` **Benar**
C. `10`
D. Error kompilasi

##latihan:
deskripsi tugas:
Buat program yang membaca dua bilangan bulat, lalu menampilkan hasil perbandingan `==`, `>`, dan `<=` antara kedua bilangan tersebut (dalam bentuk 0 atau 1).

output diharapkan:
```
Masukkan bilangan A: 8
Masukkan bilangan B: 8
A == B: 1
A > B : 0
A <= B: 1
```

input (opsional):
8 dan 8

petunjuk:
Gunakan `printf()` dengan operator `==`, `>`, dan `<=` langsung di dalam argumen.

kode awal:
```c
#include <stdio.h>

int main() {
    int a, b;
    printf("Masukkan bilangan A: ");
    scanf("%d", &a);
    printf("Masukkan bilangan B: ");
    scanf("%d", &b);
    // Tampilkan a == b
    
    // Tampilkan a > b
    
    // Tampilkan a <= b
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int a, b;
    printf("Masukkan bilangan A: ");
    scanf("%d", &a);
    printf("Masukkan bilangan B: ");
    scanf("%d", &b);
    printf("A == B: %d\n", a == b);
    printf("A > B : %d\n", a > b);
    printf("A <= B: %d\n", a <= b);
    return 0;
}
```

Validasi kode statis:
```
regex pattern = printf\s*\(.*a\s*==\s*b
pesan error = Tampilkan hasil perbandingan dengan: a == b

regex pattern = printf\s*\(.*a\s*<=\s*b
pesan error = Tampilkan hasil perbandingan dengan: a <= b
```

---

### Pelajaran: Operator Logika

##materi:
**Operator logika** digunakan untuk menggabungkan atau memodifikasi hasil ekspresi boolean (kondisi). Terdapat tiga operator logika di C: `&&` (AND/DAN — bernilai true hanya jika **kedua** operand true), `||` (OR/ATAU — bernilai true jika **salah satu** operand true), dan `!` (NOT — membalik nilai boolean).

| Operator | Nama | A | B | Hasil |
|---|---|---|---|---|
| `&&` | AND | 1 | 1 | `1` |
| `&&` | AND | 1 | 0 | `0` |
| `\|\|` | OR | 0 | 1 | `1` |
| `\|\|` | OR | 0 | 0 | `0` |
| `!` | NOT | 1 | - | `0` |
| `!` | NOT | 0 | - | `1` |

Operator logika sering digunakan untuk memeriksa **rentang nilai** atau **kombinasi kondisi**, misalnya memeriksa apakah usia berada dalam rentang tertentu: `(usia >= 18 && usia <= 60)`. C juga menerapkan **short-circuit evaluation**: pada `&&`, jika operand pertama `false`, operand kedua tidak akan dievaluasi sama sekali (karena hasilnya pasti `false`); pada `||`, jika operand pertama `true`, operand kedua diabaikan.

```c
#include <stdio.h>

int main() {
    int usia = 25;
    int punya_ktp = 1;

    printf("Bisa memilih: %d\n", (usia >= 17) && punya_ktp);
    printf("Diskon (lansia/anak): %d\n", (usia < 12) || (usia > 60));
    printf("Bukan dewasa: %d\n", !(usia >= 18));
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Bisa memilih: 1
Diskon (lansia/anak): 0
Bukan dewasa: 0
```

##kuis:
Berapa hasil dari ekspresi `(5 > 3) && (2 > 4)` dalam bahasa C?

A. `1`
B. `0` **Benar**
C. `2`
D. Error karena tidak boleh menggabungkan dua ekspresi

##latihan:
deskripsi tugas:
Buat program yang membaca nilai `int suhu` dan menampilkan apakah suhu tersebut berada dalam kategori "Normal" (antara 36 dan 37 derajat, inklusif) menggunakan operator logika AND.

output diharapkan:
```
Masukkan suhu tubuh: 36
Status normal: 1
```

input (opsional):
36

petunjuk:
Gunakan operator `&&` untuk memeriksa `suhu >= 36 && suhu <= 37`.

kode awal:
```c
#include <stdio.h>

int main() {
    int suhu;
    printf("Masukkan suhu tubuh: ");
    scanf("%d", &suhu);
    // Tampilkan apakah suhu normal (36-37) menggunakan &&
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    int suhu;
    printf("Masukkan suhu tubuh: ");
    scanf("%d", &suhu);
    printf("Status normal: %d\n", (suhu >= 36) && (suhu <= 37));
    return 0;
}
```

Validasi kode statis:
```
regex pattern = \(\s*suhu\s*>=\s*36\s*\)\s*&&\s*\(\s*suhu\s*<=\s*37\s*\)
pesan error = Gunakan operator AND: (suhu >= 36) && (suhu <= 37)

regex pattern = printf\s*\(.*Status normal
pesan error = Tampilkan hasil dengan label "Status normal: %d\n"
```

---

## SUBBAB: Flowchart

---

### Pelajaran: Aturan Penulisan Flowchart

##materi:
**Flowchart (diagram alir)** adalah representasi visual dari langkah-langkah logika sebuah program menggunakan simbol-simbol standar yang saling terhubung dengan garis/anak panah penunjuk arah. Flowchart membantu programmer **merancang logika sebelum menulis kode**, sehingga alur program lebih mudah dipahami, didiskusikan, dan diverifikasi sebelum diimplementasikan.

Beberapa aturan dasar penulisan flowchart: (1) setiap flowchart **wajib memiliki satu titik Mulai (Start)** dan minimal satu titik **Selesai (End)**; (2) alur dibaca **dari atas ke bawah** dan arah panah menunjukkan urutan eksekusi; (3) setiap simbol memiliki **bentuk dan makna khusus** yang tidak bisa ditukar sembarangan; (4) garis penghubung **tidak boleh saling tumpang tindih tanpa keterangan** yang jelas; (5) percabangan (decision) harus memiliki **minimal dua keluaran** berlabel (misalnya "Ya"/"Tidak").

[Gambar: Flowchart sederhana dengan simbol Start, Proses, Decision, dan End yang terhubung dengan anak panah]

```c
#include <stdio.h>

/* 
 * Flowchart:
 * [Start] -> [Input: nilai] -> [Decision: nilai >= 60?]
 *    Ya -> [Output: "Lulus"] -> [End]
 *    Tidak -> [Output: "Tidak Lulus"] -> [End]
 */
int main() {
    int nilai = 75;
    if (nilai >= 60) {
        printf("Lulus\n");
    } else {
        printf("Tidak Lulus\n");
    }
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Lulus
```

##kuis:
Apa yang **wajib** ada dalam sebuah flowchart yang benar?

A. Minimal sepuluh simbol proses
B. Satu titik Mulai (Start) dan minimal satu titik Selesai (End) **Benar**
C. Hanya simbol decision tanpa simbol proses
D. Warna berbeda untuk setiap simbol

##latihan:
deskripsi tugas:
Lengkapi komentar flowchart berikut agar mencerminkan urutan logika program: cek apakah angka adalah bilangan genap atau ganjil, lalu implementasikan kodenya.

output diharapkan:
```
Bilangan 7 adalah Ganjil
```

input (opsional):
-

petunjuk:
Gunakan operator modulus `%` untuk memeriksa genap/ganjil: `angka % 2 == 0` berarti genap.

kode awal:
```c
#include <stdio.h>

/*
 * Flowchart:
 * [Start] -> [Input: angka] -> [Decision: angka % 2 == 0?]
 *    Ya -> [Output: "Genap"] -> [End]
 *    Tidak -> [Output: ___] -> [End]   // Lengkapi label ini
 */
int main() {
    int angka = 7;
    if (angka % 2 == 0) {
        printf("Bilangan %d adalah Genap\n", angka);
    } else {
        // Tampilkan bahwa bilangan adalah Ganjil
    }
    return 0;
}
```

solusi:
```c
#include <stdio.h>

/*
 * Flowchart:
 * [Start] -> [Input: angka] -> [Decision: angka % 2 == 0?]
 *    Ya -> [Output: "Genap"] -> [End]
 *    Tidak -> [Output: "Ganjil"] -> [End]
 */
int main() {
    int angka = 7;
    if (angka % 2 == 0) {
        printf("Bilangan %d adalah Genap\n", angka);
    } else {
        printf("Bilangan %d adalah Ganjil\n", angka);
    }
    return 0;
}
```

Validasi kode statis:
```
regex pattern = angka\s*%\s*2\s*==\s*0
pesan error = Gunakan kondisi (angka % 2 == 0) untuk memeriksa genap

regex pattern = printf\s*\(.*Ganjil.*angka\)
pesan error = Tampilkan "Bilangan %d adalah Ganjil\n" pada blok else
```

---

### Pelajaran: Struktur Sequence, Branching, dan Looping

##materi:
Setiap algoritma, betapapun kompleksnya, dibangun dari kombinasi **tiga struktur kontrol dasar**: **Sequence** (urutan), **Branching/Selection** (percabangan), dan **Looping/Repetition** (perulangan). Memahami ketiganya adalah dasar fundamental sebelum menulis program apapun.

**Sequence** adalah eksekusi instruksi **satu per satu secara berurutan** dari atas ke bawah, masing-masing dijalankan tepat satu kali. **Branching** memungkinkan program **memilih jalur eksekusi berbeda** berdasarkan suatu kondisi (true/false) — diwakili simbol diamond (belah ketupat) di flowchart. **Looping** memungkinkan satu blok instruksi **dieksekusi berulang kali** selama kondisi tertentu masih terpenuhi, sangat efisien untuk tugas repetitif.

| Struktur | Simbol Flowchart | Implementasi di C |
|---|---|---|
| Sequence | Persegi panjang (proses) berurutan | Baris kode berurutan |
| Branching | Diamond/belah ketupat | `if`, `if-else`, `switch` |
| Looping | Diamond dengan panah kembali (loop back) | `for`, `while`, `do-while` |

[Gambar: Tiga diagram flowchart berdampingan menunjukkan Sequence (kotak berurutan), Branching (diamond bercabang dua), dan Looping (diamond dengan panah kembali ke atas)]

```c
#include <stdio.h>

int main() {
    /* SEQUENCE: dijalankan berurutan */
    int total = 0;
    printf("Memulai perhitungan...\n");

    /* LOOPING: dijalankan berulang 3 kali */
    for (int i = 1; i <= 3; i++) {
        total += i;

        /* BRANCHING: cek kondisi setiap iterasi */
        if (total > 3) {
            printf("Total sudah lebih dari 3: %d\n", total);
        } else {
            printf("Total masih: %d\n", total);
        }
    }
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Memulai perhitungan...
Total masih: 1
Total masih: 3
Total sudah lebih dari 3: 6
```

##kuis:
Struktur kontrol manakah yang digunakan untuk **mengulang** eksekusi sebuah blok kode beberapa kali?

A. Sequence
B. Branching
C. Looping **Benar**
D. Selection

##latihan:
deskripsi tugas:
Tulis program yang menggabungkan ketiga struktur: gunakan **sequence** untuk inisialisasi, **looping** `for` dari 1 hingga 5, dan di dalam loop gunakan **branching** untuk mencetak "Genap" atau "Ganjil" untuk setiap angka.

output diharapkan:
```
1: Ganjil
2: Genap
3: Ganjil
4: Genap
5: Ganjil
```

input (opsional):
-

petunjuk:
Gunakan `for (int i = 1; i <= 5; i++)` sebagai looping, dan `if (i % 2 == 0)` sebagai branching di dalamnya.

kode awal:
```c
#include <stdio.h>

int main() {
    // Gunakan for loop dari 1 sampai 5
    for (/* lengkapi */) {
        // Gunakan if-else untuk cek genap/ganjil
        
    }
    return 0;
}
```

solusi:
```c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            printf("%d: Genap\n", i);
        } else {
            printf("%d: Ganjil\n", i);
        }
    }
    return 0;
}
```

Validasi kode statis:
```
regex pattern = for\s*\(\s*int\s+i\s*=\s*1\s*;\s*i\s*<=\s*5\s*;\s*i\+\+\s*\)
pesan error = Gunakan loop: for (int i = 1; i <= 5; i++)

regex pattern = if\s*\(\s*i\s*%\s*2\s*==\s*0\s*\)
pesan error = Gunakan branching: if (i % 2 == 0) untuk cek genap
```

---

### Pelajaran: Simbol dan Notasi Flowchart

##materi:
Setiap simbol dalam flowchart memiliki **bentuk geometris standar** yang merepresentasikan jenis operasi tertentu. Konsistensi penggunaan simbol ini penting agar flowchart dapat dipahami oleh siapapun yang membacanya, tanpa ambiguitas.

| Simbol | Bentuk | Fungsi |
|---|---|---|
| Terminator | Oval / elips | Menandai **Start** dan **End** program |
| Proses | Persegi panjang | Operasi/instruksi, misal perhitungan |
| Input/Output | Jajaran genjang (parallelogram) | Operasi input atau output data |
| Decision | Diamond (belah ketupat) | Percabangan kondisi (Ya/Tidak) |
| Garis Alir | Anak panah | Menunjukkan arah eksekusi |
| Konektor | Lingkaran kecil | Penghubung antar bagian flowchart yang terpisah |
| Predefined Process | Persegi panjang dengan garis vertikal di sisi | Pemanggilan sub-program/fungsi |

[Gambar: Tabel visual simbol flowchart standar — oval, persegi panjang, jajaran genjang, diamond, anak panah, dan lingkaran konektor beserta label nama masing-masing]

```c
#include <stdio.h>

/*
 * Pemetaan simbol flowchart ke kode:
 * (Oval)        Start
 * (Jajargenjang) Input: panjang, lebar
 * (Persegi)     Proses: luas = panjang * lebar
 * (Jajargenjang) Output: luas
 * (Oval)        End
 */
int main() {
    int panjang = 8, lebar = 4;
    int luas = panjang * lebar;
    printf("Luas: %d\n", luas);
    return 0;
}
```

Output Terminal:
```
$ gcc program.c -o program && ./program
Luas: 32
```

##kuis:
Simbol **jajaran genjang (parallelogram)** dalam flowchart digunakan untuk merepresentasikan...

A. Titik mulai dan selesai program
B. Operasi input atau output data **Benar**
C. Percabangan kondisi
D. Proses perhitungan matematis

##latihan:
deskripsi tugas:
Tulis komentar flowchart yang memetakan setiap simbol (oval, jajargenjang, persegi panjang, diamond) ke baris kode yang sesuai untuk program penghitung diskon, lalu lengkapi kodenya.

output diharapkan:
```
Masukkan total belanja: 150000
Anda mendapat diskon!
Total bayar: 135000
```

input (opsional):
150000

petunjuk:
Diamond untuk decision `total >= 100000`. Jajargenjang untuk input dan output. Persegi panjang untuk perhitungan diskon.

kode awal:
```c
#include <stdio.h>

/*
 * (Oval)         Start
 * (Jajargenjang) Input: total
 * (Diamond)      Decision: total >= 100000?
 *    Ya -> (Persegi) Proses: total_bayar = total * 0.9
 *          (Jajargenjang) Output: "Anda mendapat diskon!" dan total_bayar
 *    Tidak -> (Jajargenjang) Output: total_bayar = total
 * (Oval)         End
 */
int main() {
    int total;
    printf("Masukkan total belanja: ");
    scanf("%d", &total);
    
    // Implementasikan decision dan proses sesuai flowchart
    
    return 0;
}
```

solusi:
```c
#include <stdio.h>

/*
 * (Oval)         Start
 * (Jajargenjang) Input: total
 * (Diamond)      Decision: total >= 100000?
 *    Ya -> (Persegi) Proses: total_bayar = total * 0.9
 *          (Jajargenjang) Output: "Anda mendapat diskon!" dan total_bayar
 *    Tidak -> (Jajargenjang) Output: total_bayar = total
 * (Oval)         End
 */
int main() {
    int total;
    printf("Masukkan total belanja: ");
    scanf("%d", &total);

    if (total >= 100000) {
        int total_bayar = total * 0.9;
        printf("Anda mendapat diskon!\n");
        printf("Total bayar: %d\n", total_bayar);
    } else {
        printf("Total bayar: %d\n", total);
    }
    return 0;
}
```

Validasi kode statis:
```
regex pattern = if\s*\(\s*total\s*>=\s*100000\s*\)
pesan error = Gunakan decision: if (total >= 100000)

regex pattern = total\s*\*\s*0\.9
pesan error = Hitung total setelah diskon dengan: total * 0.9
```
