# LEVEL 4 — PENGENALAN DASAR BAHASA PYTHON

---

## SUBBAB: Pendahuluan Python

---

### Pelajaran: Pengenalan Bahasa Python

##materi:
Python adalah bahasa pemrograman **tingkat tinggi (high-level)** yang dikenal karena sintaksnya yang **sederhana dan mudah dibaca**, hampir seperti bahasa Inggris biasa. Python bersifat **interpreted** — kode dijalankan baris per baris oleh interpreter, **bukan dikompilasi** terlebih dahulu menjadi file `.exe` seperti C. Hal ini membuat Python mudah untuk eksperimen cepat (rapid prototyping), tetapi umumnya lebih lambat dalam eksekusi dibandingkan bahasa terkompilasi seperti C.

Python digunakan secara luas untuk berbagai bidang: pengembangan web, data science, machine learning, otomatisasi, dan scripting. Salah satu ciri khas Python adalah **tidak membutuhkan tanda kurung kurawal `{}`** untuk blok kode — sebagai gantinya, Python menggunakan **indentasi (spasi/tab)** untuk menentukan struktur blok. File Python berekstensi `.py` dan dijalankan menggunakan perintah `python nama_file.py`.

```python
# Program Python pertama
print("Halo, Dunia!")
print("Selamat belajar Python.")
```

Output Terminal:
```
$ python program.py
Halo, Dunia!
Selamat belajar Python.
```

##kuis:
Bagaimana Python menentukan struktur blok kode (misalnya isi dari sebuah fungsi atau kondisi)?

A. Menggunakan tanda kurung kurawal `{}`
B. Menggunakan kata kunci `begin` dan `end`
C. Menggunakan indentasi (spasi/tab) **Benar**
D. Menggunakan titik koma di setiap baris

##latihan:
deskripsi tugas:
Tulis program Python sederhana yang menampilkan tiga baris teks tentang dirimu sebagai pemula: nama bahasa yang dipelajari, alasan belajar, dan target belajar.

output diharapkan:
```
Bahasa: Python
Alasan: Mudah dipelajari
Target: Membuat program sederhana
```

input (opsional):
-

petunjuk:
Gunakan `print()` tiga kali, masing-masing untuk satu baris teks.

kode awal:
```python
# Tampilkan tiga baris informasi menggunakan print()

```

solusi:
```python
print("Bahasa: Python")
print("Alasan: Mudah dipelajari")
print("Target: Membuat program sederhana")
```

Validasi kode statis:
```
regex pattern = print\s*\(\s*["']Bahasa: Python["']\s*\)
pesan error = Tampilkan baris pertama dengan: print("Bahasa: Python")

regex pattern = print\s*\(\s*["']Target: Membuat program sederhana["']\s*\)
pesan error = Tampilkan baris ketiga dengan: print("Target: Membuat program sederhana")
```

---

### Pelajaran: Perbandingan Sintaks Python dan C

##materi:
Meskipun konsep dasar pemrograman (variabel, percabangan, perulangan) sama di Python dan C, **sintaksnya sangat berbeda**. Python tidak membutuhkan deklarasi tipe data eksplisit (Python bersifat **dynamically typed**), tidak membutuhkan titik koma di akhir statement, tidak membutuhkan `#include`, dan tidak membutuhkan fungsi `main()` sebagai titik masuk wajib — kode di luar fungsi dieksekusi langsung dari atas ke bawah.

| Aspek | Bahasa C | Python |
|---|---|---|
| Deklarasi tipe | `int x = 5;` | `x = 5` (tipe otomatis) |
| Akhir statement | `;` (wajib) | Tidak perlu |
| Blok kode | `{ }` | Indentasi |
| Cetak ke layar | `printf("%d", x);` | `print(x)` |
| Komentar | `// atau /* */` | `#` |
| Titik masuk | `int main() { ... }` | Tidak wajib, jalan dari atas |

```python
# Python: tidak perlu tipe data, titik koma, atau main()
nama = "Andi"
usia = 20
print("Nama:", nama)
print("Usia:", usia)
```

Output Terminal:
```
$ python program.py
Nama: Andi
Usia: 20
```

##kuis:
Manakah pernyataan yang **benar** mengenai perbedaan Python dan C?

A. Python wajib memiliki fungsi `main()` seperti C
B. Python membutuhkan tipe data dideklarasikan secara eksplisit seperti C
C. Python tidak membutuhkan titik koma di akhir statement dan menggunakan indentasi untuk blok kode **Benar**
D. C menggunakan indentasi untuk blok kode seperti Python

##latihan:
deskripsi tugas:
Konversi kode C berikut ke Python: deklarasi dua variabel `panjang = 10` dan `lebar = 4`, lalu tampilkan hasil perkalian (luas) keduanya.

output diharapkan:
```
Luas: 40
```

input (opsional):
-

petunjuk:
Python tidak membutuhkan tipe data atau titik koma. Gunakan `print("Luas:", panjang * lebar)`.

kode awal:
```python
# Kode C: 
# int panjang = 10;
# int lebar = 4;
# printf("Luas: %d\n", panjang * lebar);

# Tulis versi Python-nya di sini

```

solusi:
```python
panjang = 10
lebar = 4
print("Luas:", panjang * lebar)
```

Validasi kode statis:
```
regex pattern = panjang\s*=\s*10
pesan error = Deklarasikan variabel dengan: panjang = 10 (tanpa tipe data dan titik koma)

regex pattern = print\s*\(\s*["']Luas:["']\s*,\s*panjang\s*\*\s*lebar\s*\)
pesan error = Tampilkan hasil dengan: print("Luas:", panjang * lebar)
```

---

## SUBBAB: Variabel

---

### Pelajaran: Ketentuan Deklarasi Variabel

##materi:
Berbeda dengan C, Python **tidak memerlukan deklarasi tipe data** sama sekali — variabel langsung dibuat saat kamu **memberikan nilai pertama kali** menggunakan tanda `=`. Python bersifat **dynamically typed**, artinya tipe data sebuah variabel ditentukan secara otomatis berdasarkan nilai yang diberikan, dan **bisa berubah** di tengah program jika diberi nilai bertipe lain.

Aturan penamaan variabel di Python mirip dengan C: hanya boleh mengandung huruf, angka, dan garis bawah (`_`), tidak boleh diawali angka, bersifat **case-sensitive**, dan tidak boleh sama dengan keyword Python (`if`, `for`, `True`, `def`, dll). Konvensi penamaan standar Python adalah **snake_case** (huruf kecil dengan garis bawah), sesuai PEP 8 (panduan gaya resmi Python).

```python
# Tipe data ditentukan otomatis
nama = "Budi"      # str (string)
usia = 20          # int (integer)
tinggi = 170.5     # float

print(nama, usia, tinggi)

# Variabel bisa berubah tipe
nilai = 100        # int
nilai = "Seratus"  # sekarang jadi str
print(nilai)
```

Output Terminal:
```
$ python program.py
Budi 20 170.5
Seratus
```

##kuis:
Mengapa Python disebut sebagai bahasa yang **dynamically typed**?

A. Karena Python hanya bisa menyimpan satu tipe data per program
B. Karena tipe data variabel ditentukan otomatis dan bisa berubah selama program berjalan **Benar**
C. Karena Python membutuhkan deklarasi tipe data eksplisit seperti C
D. Karena Python tidak mendukung variabel sama sekali

##latihan:
deskripsi tugas:
Buat variabel `kota = "Surabaya"`, lalu ubah nilainya menjadi `"Jakarta"`, dan tampilkan kedua nilai tersebut secara berurutan.

output diharapkan:
```
Kota awal: Surabaya
Kota sekarang: Jakarta
```

input (opsional):
-

petunjuk:
Buat variabel, cetak nilainya, lalu beri nilai baru menggunakan `=` lagi, lalu cetak kembali.

kode awal:
```python
kota = "Surabaya"
# Tampilkan "Kota awal: Surabaya"

# Ubah nilai kota menjadi "Jakarta"

# Tampilkan "Kota sekarang: Jakarta"

```

solusi:
```python
kota = "Surabaya"
print("Kota awal:", kota)

kota = "Jakarta"
print("Kota sekarang:", kota)
```

Validasi kode statis:
```
regex pattern = print\s*\(\s*["']Kota awal:["']\s*,\s*kota\s*\)
pesan error = Tampilkan dengan: print("Kota awal:", kota)

regex pattern = kota\s*=\s*["']Jakarta["']
pesan error = Ubah nilai kota dengan: kota = "Jakarta"
```

---

### Pelajaran: Format Penulisan Variabel

##materi:
Penulisan variabel di Python mengikuti konvensi **PEP 8** sebagai standar resmi gaya kode Python. Beberapa aturan format penting: nama variabel sebaiknya **deskriptif** dan menggunakan **snake_case** (`jumlah_siswa`, bukan `JumlahSiswa` atau `js`); konstanta (nilai yang tidak diubah) ditulis dengan **HURUF KAPITAL SEMUA** dan garis bawah (`PI = 3.14159`), meskipun Python tidak memiliki keyword `const` sungguhan — ini hanya konvensi.

Python juga mendukung **multiple assignment** — memberi nilai ke beberapa variabel dalam satu baris: `a, b, c = 1, 2, 3`. Selain itu, Python mendukung **chained assignment**: `x = y = z = 0` memberikan nilai `0` ke ketiga variabel sekaligus. Kedua fitur ini tidak ada di C dan membuat kode Python lebih ringkas.

```python
# Multiple assignment
a, b, c = 1, 2, 3
print(a, b, c)

# Chained assignment
x = y = z = 0
print(x, y, z)

# Konstanta (konvensi huruf kapital)
PI = 3.14159
print("Nilai PI:", PI)
```

Output Terminal:
```
$ python program.py
1 2 3
0 0 0
Nilai PI: 3.14159
```

##kuis:
Apa hasil dari kode Python `x = y = z = 5` lalu `print(x, y, z)`?

A. `5 0 0`
B. `5 5 5` **Benar**
C. Error karena tidak valid
D. `x y z`

##latihan:
deskripsi tugas:
Gunakan **multiple assignment** untuk mendeklarasikan tiga variabel `panjang, lebar, tinggi = 5, 3, 2` dalam satu baris, lalu hitung dan tampilkan volume balok (p × l × t).

output diharapkan:
```
Volume: 30
```

input (opsional):
-

petunjuk:
Gunakan `panjang, lebar, tinggi = 5, 3, 2` lalu `print("Volume:", panjang * lebar * tinggi)`.

kode awal:
```python
# Deklarasikan panjang, lebar, tinggi dengan multiple assignment

# Hitung dan tampilkan volume

```

solusi:
```python
panjang, lebar, tinggi = 5, 3, 2
print("Volume:", panjang * lebar * tinggi)
```

Validasi kode statis:
```
regex pattern = panjang\s*,\s*lebar\s*,\s*tinggi\s*=\s*5\s*,\s*3\s*,\s*2
pesan error = Gunakan multiple assignment: panjang, lebar, tinggi = 5, 3, 2

regex pattern = print\s*\(\s*["']Volume:["']\s*,\s*panjang\s*\*\s*lebar\s*\*\s*tinggi\s*\)
pesan error = Tampilkan dengan: print("Volume:", panjang * lebar * tinggi)
```

---

## SUBBAB: Tipe Data

---

### Pelajaran: Tipe Data Number (int, float)

##materi:
Python memiliki dua tipe data numerik utama yang sering dipakai: `int` (integer/bilangan bulat, **tanpa batas ukuran** secara teori — berbeda dengan C yang punya batas 32-bit) dan `float` (bilangan pecahan/desimal, presisi ganda mirip `double` di C). Python juga mendukung tipe `complex` untuk bilangan kompleks, tapi jarang dipakai pemula.

Operasi aritmatika di Python mirip C, dengan satu perbedaan penting: operator `/` di Python **selalu menghasilkan `float`**, bahkan jika kedua operand `int` (`7 / 2` = `3.5`, bukan `3` seperti di C). Untuk pembagian integer (hasil dibuang desimalnya), Python punya operator khusus `//` (floor division). Fungsi `type()` digunakan untuk memeriksa tipe data sebuah nilai.

| Operator | Fungsi | Contoh | Hasil |
|---|---|---|---|
| `/` | Pembagian (selalu float) | `7 / 2` | `3.5` |
| `//` | Floor division (integer) | `7 // 2` | `3` |
| `%` | Modulus | `7 % 2` | `1` |
| `**` | Pangkat | `2 ** 3` | `8` |

```python
a = 17
b = 5

print(a / b)    # Pembagian biasa -> float
print(a // b)   # Floor division -> int
print(a % b)    # Modulus
print(a ** 2)   # Pangkat
print(type(a))  # Tipe data a
```

Output Terminal:
```
$ python program.py
3.4
3
2
289
<class 'int'>
```

##kuis:
Apa hasil dari `7 / 2` di Python (operator pembagian biasa, bukan `//`)?

A. `3`
B. `3.5` **Benar**
C. `1`
D. Error

##latihan:
deskripsi tugas:
Buat dua variabel `a = 29` dan `b = 4`. Tampilkan hasil `a / b`, `a // b`, dan `a % b`.

output diharapkan:
```
Pembagian: 7.25
Floor division: 7
Modulus: 1
```

input (opsional):
-

petunjuk:
Gunakan operator `/`, `//`, dan `%` masing-masing dalam `print()`.

kode awal:
```python
a = 29
b = 4
# Tampilkan a / b dengan label "Pembagian:"

# Tampilkan a // b dengan label "Floor division:"

# Tampilkan a % b dengan label "Modulus:"

```

solusi:
```python
a = 29
b = 4
print("Pembagian:", a / b)
print("Floor division:", a // b)
print("Modulus:", a % b)
```

Validasi kode statis:
```
regex pattern = print\s*\(\s*["']Pembagian:["']\s*,\s*a\s*/\s*b\s*\)
pesan error = Tampilkan dengan: print("Pembagian:", a / b)

regex pattern = print\s*\(\s*["']Floor division:["']\s*,\s*a\s*//\s*b\s*\)
pesan error = Tampilkan dengan: print("Floor division:", a // b)
```

---

### Pelajaran: Tipe Data String

##materi:
String di Python adalah **tipe data bawaan** untuk teks (berbeda dengan C yang menggunakan array `char`). String bisa ditulis menggunakan tanda petik **tunggal `'...'`** atau **ganda `"..."`** — keduanya setara dan bisa dipilih sesuai kebutuhan (misalnya gunakan `"..."` jika teks mengandung petik tunggal `'`). String juga bisa ditulis multi-baris menggunakan **triple quotes** (`'''...'''` atau `"""..."""`).

String di Python bersifat **immutable** (tidak bisa diubah elemennya secara langsung setelah dibuat) tetapi mendukung banyak operasi: **slicing** (`s[0:3]` mengambil sebagian string), **concatenation** dengan `+`, **repetisi** dengan `*` (`"ab" * 3` → `"ababab"`), serta fungsi panjang `len(s)`. Indeks string juga dimulai dari `0`, dan mendukung **indeks negatif** (`s[-1]` mengambil karakter terakhir).

```python
nama = "Python"
print(nama[0])       # Karakter pertama
print(nama[-1])      # Karakter terakhir
print(nama[0:3])     # Slicing: 3 karakter pertama
print(len(nama))     # Panjang string
print(nama * 2)      # Repetisi string
print(nama + " Programming")  # Concatenation
```

Output Terminal:
```
$ python program.py
P
n
Pyt
6
PythonPython
Python Programming
```

##kuis:
Apa hasil dari `"abc"[-1]` di Python?

A. `'a'`
B. `'c'` **Benar**
C. Error, indeks negatif tidak valid
D. `'abc'`

##latihan:
deskripsi tugas:
Buat variabel `kata = "Algoritma"`. Tampilkan panjang kata, 4 karakter pertama (slicing), dan karakter terakhir (indeks negatif).

output diharapkan:
```
Panjang: 9
4 huruf pertama: Algo
Huruf terakhir: a
```

input (opsional):
-

petunjuk:
Gunakan `len(kata)`, `kata[0:4]`, dan `kata[-1]`.

kode awal:
```python
kata = "Algoritma"
# Tampilkan panjang kata

# Tampilkan 4 karakter pertama

# Tampilkan karakter terakhir

```

solusi:
```python
kata = "Algoritma"
print("Panjang:", len(kata))
print("4 huruf pertama:", kata[0:4])
print("Huruf terakhir:", kata[-1])
```

Validasi kode statis:
```
regex pattern = print\s*\(\s*["']Panjang:["']\s*,\s*len\s*\(\s*kata\s*\)\s*\)
pesan error = Tampilkan dengan: print("Panjang:", len(kata))

regex pattern = kata\s*\[\s*0\s*:\s*4\s*\]
pesan error = Ambil 4 karakter pertama dengan slicing: kata[0:4]
```

---

### Pelajaran: Tipe Data Boolean

##materi:
Tipe `bool` di Python hanya memiliki dua nilai: **`True`** dan **`False`** (perhatikan huruf besar di awal — berbeda dengan `true`/`false` di C). `bool` sebenarnya adalah **subclass dari `int`**: `True` setara dengan `1` dan `False` setara dengan `0`, sehingga keduanya bisa digunakan dalam operasi aritmatika.

Operator perbandingan (`==`, `!=`, `<`, `>`, `<=`, `>=`) dan operator logika (`and`, `or`, `not`) di Python mengembalikan nilai `bool`. Perlu diperhatikan: Python menggunakan kata `and`, `or`, `not` (kata dalam bahasa Inggris), **bukan** simbol `&&`, `||`, `!` seperti di C. Selain `False`, nilai-nilai seperti `0`, `0.0`, `""` (string kosong), `[]` (list kosong), dan `None` juga dianggap "falsy" (setara `False`) dalam konteks boolean.

```python
status_aktif = True
saldo = 50000

print(status_aktif)
print(type(status_aktif))
print(saldo > 0 and status_aktif)  # and -> butuh keduanya True
print(saldo > 100000 or status_aktif)  # or -> salah satu True cukup
print(not status_aktif)  # not -> membalik nilai
```

Output Terminal:
```
$ python program.py
True
<class 'bool'>
True
True
False
```

##kuis:
Operator logika apa yang digunakan di Python sebagai pengganti `&&` pada bahasa C?

A. `&`
B. `and` **Benar**
C. `AND`
D. `&&`

##latihan:
deskripsi tugas:
Buat variabel `usia = 17` dan `punya_izin = True`. Tampilkan hasil dari `usia >= 17 and punya_izin` dan `usia >= 18 or punya_izin`.

output diharapkan:
```
Boleh masuk: True
Boleh tanpa pendamping: True
```

input (opsional):
-

petunjuk:
Gunakan operator `and` dan `or` sesuai konvensi Python.

kode awal:
```python
usia = 17
punya_izin = True
# Tampilkan "Boleh masuk:" dengan kondisi usia >= 17 and punya_izin

# Tampilkan "Boleh tanpa pendamping:" dengan kondisi usia >= 18 or punya_izin

```

solusi:
```python
usia = 17
punya_izin = True
print("Boleh masuk:", usia >= 17 and punya_izin)
print("Boleh tanpa pendamping:", usia >= 18 or punya_izin)
```

Validasi kode statis:
```
regex pattern = usia\s*>=\s*17\s+and\s+punya_izin
pesan error = Gunakan operator and: usia >= 17 and punya_izin

regex pattern = usia\s*>=\s*18\s+or\s+punya_izin
pesan error = Gunakan operator or: usia >= 18 or punya_izin
```

---

### Pelajaran: Konversi Tipe Data

##materi:
**Konversi tipe data (type casting)** adalah proses mengubah nilai dari satu tipe ke tipe lainnya. Python menyediakan fungsi bawaan untuk ini: `int(x)` mengonversi ke integer (membuang desimal jika dari float, atau mengonversi string angka), `float(x)` mengonversi ke desimal, `str(x)` mengonversi ke string, dan `bool(x)` mengonversi ke boolean.

Konversi sangat penting saat menggabungkan tipe data berbeda — misalnya, `print("Umur: " + 20)` akan **error** karena Python tidak bisa menggabungkan `str` dan `int` secara langsung dengan `+`. Solusinya: `print("Umur: " + str(20))`. Begitu pula, input dari `input()` selalu berupa `str`, sehingga jika ingin melakukan operasi matematika, harus dikonversi dengan `int()` atau `float()` terlebih dahulu.

```python
angka_str = "100"
angka_int = int(angka_str)   # str -> int
angka_float = float(angka_int)  # int -> float
hasil_str = str(angka_int)   # int -> str

print(angka_int + 50)        # Operasi matematika setelah konversi
print(angka_float)
print("Nilai: " + hasil_str) # Concatenation setelah konversi
print(bool(0), bool(1), bool(""))
```

Output Terminal:
```
$ python program.py
150
100.0
Nilai: 100
False True False
```

##kuis:
Mengapa `print("Umur: " + 20)` menghasilkan error di Python?

A. Karena angka 20 terlalu besar
B. Karena Python tidak bisa menggabungkan tipe `str` dan `int` secara langsung dengan operator `+` **Benar**
C. Karena `print()` hanya menerima satu argumen
D. Karena tanda `+` hanya untuk operasi matematika di Python

##latihan:
deskripsi tugas:
Buat variabel `umur_str = "25"`. Konversi ke `int`, tambahkan 5, lalu gabungkan dengan string menggunakan `str()` untuk ditampilkan.

output diharapkan:
```
Umur sekarang: 25
Umur 5 tahun lagi: 30
```

input (opsional):
-

petunjuk:
Gunakan `int(umur_str)` untuk konversi, dan `str(...)` saat menggabungkan dengan `+`.

kode awal:
```python
umur_str = "25"
umur = int(umur_str)
# Tampilkan "Umur sekarang: " digabung dengan str(umur)

# Hitung umur + 5 dan tampilkan "Umur 5 tahun lagi: " digabung dengan hasilnya

```

solusi:
```python
umur_str = "25"
umur = int(umur_str)
print("Umur sekarang: " + str(umur))
print("Umur 5 tahun lagi: " + str(umur + 5))
```

Validasi kode statis:
```
regex pattern = umur\s*=\s*int\s*\(\s*umur_str\s*\)
pesan error = Konversi string ke int dengan: umur = int(umur_str)

regex pattern = str\s*\(\s*umur\s*\+\s*5\s*\)
pesan error = Konversi hasil penjumlahan dengan: str(umur + 5)
```

---

## SUBBAB: Operator

---

### Pelajaran: Operator Aritmatika

##materi:
Operator aritmatika di Python sebagian besar sama dengan C (`+`, `-`, `*`, `/`, `%`), dengan tambahan operator **`**`** untuk **pangkat** dan **`//`** untuk **floor division** yang tidak ada di C. Python juga mendukung **operator assignment gabungan** (`+=`, `-=`, `*=`, `/=`, `//=`, `**=`, `%=`) yang berfungsi sama seperti di C — menyingkat `x = x + 5` menjadi `x += 5`.

Urutan operasi (precedence) di Python mengikuti aturan matematika standar: pangkat (`**`) memiliki prioritas tertinggi, diikuti perkalian/pembagian/modulus/floor division (`*`, `/`, `%`, `//`), dan terakhir penjumlahan/pengurangan (`+`, `-`). Tanda kurung `()` selalu bisa digunakan untuk mengubah urutan evaluasi.

| Operator | Nama | Contoh | Hasil |
|---|---|---|---|
| `+` `-` `*` `/` | Dasar | `2 + 3 * 2` | `8` |
| `**` | Pangkat | `2 ** 3` | `8` |
| `//` | Floor division | `17 // 5` | `3` |
| `%` | Modulus | `17 % 5` | `2` |
| `+=` `-=` dst | Assignment gabungan | `x += 5` | `x = x + 5` |

```python
nilai = 10
nilai += 5   # nilai = 15
nilai *= 2   # nilai = 30
print("Nilai:", nilai)

print("2 pangkat 5:", 2 ** 5)
print("17 // 5:", 17 // 5)
print("Urutan operasi:", 2 + 3 * 2)  # * dulu, lalu +
```

Output Terminal:
```
$ python program.py
Nilai: 30
2 pangkat 5: 32
17 // 5: 3
Urutan operasi: 8
```

##kuis:
Operator apa di Python yang digunakan untuk operasi **pangkat** (eksponen)?

A. `^`
B. `**` **Benar**
C. `pow`
D. `exp`

##latihan:
deskripsi tugas:
Buat variabel `skor = 50`. Gunakan operator assignment gabungan: tambahkan 20 (`+=`), lalu kalikan 2 (`*=`). Tampilkan nilai akhir, dan tampilkan juga `5 ** 3`.

output diharapkan:
```
Skor akhir: 140
5 pangkat 3: 125
```

input (opsional):
-

petunjuk:
Gunakan `skor += 20` lalu `skor *= 2`.

kode awal:
```python
skor = 50
# Tambahkan 20 menggunakan +=

# Kalikan 2 menggunakan *=

print("Skor akhir:", skor)
print("5 pangkat 3:", 5 ** 3)
```

solusi:
```python
skor = 50
skor += 20
skor *= 2
print("Skor akhir:", skor)
print("5 pangkat 3:", 5 ** 3)
```

Validasi kode statis:
```
regex pattern = skor\s*\+=\s*20
pesan error = Gunakan operator assignment gabungan: skor += 20

regex pattern = skor\s*\*=\s*2
pesan error = Gunakan operator assignment gabungan: skor *= 2
```

---

### Pelajaran: Operator Perbandingan

##materi:
Operator perbandingan di Python (`==`, `!=`, `>`, `<`, `>=`, `<=`) memiliki **simbol yang identik** dengan C dan menghasilkan nilai `bool` (`True`/`False`), bukan `1`/`0` seperti tampilan di C (meskipun secara internal `bool` adalah subclass `int`). Sama seperti C, kesalahan umum pemula adalah tertukar antara `=` (assignment) dan `==` (perbandingan).

Fitur unik Python yang tidak ada di C adalah **chained comparison** — kamu bisa menulis `0 < x < 10` yang secara otomatis berarti `(0 < x) and (x < 10)`, tanpa perlu operator `and` secara eksplisit. Ini membuat pengecekan rentang nilai jauh lebih ringkas dibanding C yang harus menulis `(x > 0) && (x < 10)`.

```python
x = 5

print(x == 5)         # True
print(x != 10)        # True
print(0 < x < 10)     # Chained comparison -> True
print(10 < x < 20)    # False, karena x = 5 tidak > 10
```

Output Terminal:
```
$ python program.py
True
True
True
False
```

##kuis:
Apa yang dimaksud dengan **chained comparison** seperti `0 < x < 10` di Python?

A. Python akan error karena tidak bisa membandingkan tiga nilai sekaligus
B. Setara dengan `(0 < x) and (x < 10)` **Benar**
C. Setara dengan `(0 < x) or (x < 10)`
D. Hanya membandingkan `x < 10`, nilai `0` diabaikan

##latihan:
deskripsi tugas:
Buat variabel `nilai = 75`. Gunakan **chained comparison** untuk memeriksa apakah `nilai` berada dalam rentang 60 sampai 100 (inklusif), lalu tampilkan hasilnya.

output diharapkan:
```
Dalam rentang lulus: True
```

input (opsional):
-

petunjuk:
Gunakan `60 <= nilai <= 100`.

kode awal:
```python
nilai = 75
# Tampilkan "Dalam rentang lulus:" dengan chained comparison 60 <= nilai <= 100

```

solusi:
```python
nilai = 75
print("Dalam rentang lulus:", 60 <= nilai <= 100)
```

Validasi kode statis:
```
regex pattern = 60\s*<=\s*nilai\s*<=\s*100
pesan error = Gunakan chained comparison: 60 <= nilai <= 100

regex pattern = print\s*\(\s*["']Dalam rentang lulus:["']
pesan error = Tampilkan dengan label "Dalam rentang lulus:"
```

---

### Pelajaran: Operator Logika

##materi:
Python menggunakan kata kunci **`and`**, **`or`**, dan **`not`** sebagai operator logika, **bukan** simbol `&&`, `||`, `!` seperti C. Cara kerjanya identik secara konseptual: `and` true jika kedua operand true, `or` true jika salah satu true, dan `not` membalik nilai boolean.

Python juga menerapkan **short-circuit evaluation** sama seperti C: pada `a and b`, jika `a` adalah `False`, `b` tidak akan dievaluasi (hasilnya pasti `False`). Selain konteks boolean murni, `and`/`or` di Python sebenarnya mengembalikan salah satu **operand itu sendiri** (bukan selalu `True`/`False`), sebuah perilaku yang sering dimanfaatkan untuk memberi nilai default: `nama = input_user or "Tamu"`.

```python
usia = 25
punya_ktp = True
sudah_daftar = False

print(usia >= 17 and punya_ktp)          # and
print(sudah_daftar or usia >= 18)        # or
print(not sudah_daftar)                  # not

# Penggunaan unik: memberi nilai default
input_user = ""
nama = input_user or "Tamu"
print("Nama:", nama)
```

Output Terminal:
```
$ python program.py
True
True
True
Nama: Tamu
```

##kuis:
Apakah `&&`, `||`, dan `!` bisa digunakan sebagai operator logika di Python?

A. Ya, identik dengan C
B. Tidak, Python menggunakan `and`, `or`, dan `not` **Benar**
C. Hanya `!` yang bisa digunakan
D. Hanya `&&` yang bisa digunakan

##latihan:
deskripsi tugas:
Buat variabel `hujan = True` dan `bawa_payung = False`. Tampilkan hasil dari `hujan and not bawa_payung` (artinya: hujan tapi tidak bawa payung — situasi buruk).

output diharapkan:
```
Kena hujan: True
```

input (opsional):
-

petunjuk:
Gunakan `hujan and not bawa_payung`.

kode awal:
```python
hujan = True
bawa_payung = False
# Tampilkan "Kena hujan:" dengan kondisi hujan and not bawa_payung

```

solusi:
```python
hujan = True
bawa_payung = False
print("Kena hujan:", hujan and not bawa_payung)
```

Validasi kode statis:
```
regex pattern = hujan\s+and\s+not\s+bawa_payung
pesan error = Gunakan: hujan and not bawa_payung

regex pattern = print\s*\(\s*["']Kena hujan:["']
pesan error = Tampilkan dengan label "Kena hujan:"
```

---

## SUBBAB: Menginput / Memasukkan Data

---

### Pelajaran: Fungsi `input()`

##materi:
`input()` adalah fungsi bawaan Python untuk **membaca input dari pengguna** melalui keyboard. Berbeda dengan `scanf()` di C yang membutuhkan format specifier dan operator `&`, `input()` sangat sederhana: `variabel = input("Pesan prompt: ")` — teks di dalam tanda kurung akan ditampilkan sebagai prompt sebelum pengguna mengetik.

Hal terpenting yang harus diingat: `input()` **selalu mengembalikan tipe `str` (string)**, **apapun** yang diketik pengguna — bahkan jika pengguna mengetik angka. Jika kamu langsung menggunakan hasil `input()` dalam operasi matematika tanpa konversi, akan terjadi error atau hasil yang tidak diharapkan (concatenation string, bukan penjumlahan angka).

```python
nama = input("Masukkan nama Anda: ")
print("Halo, " + nama + "!")

angka_str = input("Masukkan sebuah angka: ")
print("Tipe data input:", type(angka_str))  # Selalu <class 'str'>
```

Output Terminal:
```
$ python program.py
Masukkan nama Anda: Sinta
Halo, Sinta!
Masukkan sebuah angka: 25
Tipe data input: <class 'str'>
```

##kuis:
Apa tipe data yang **selalu** dikembalikan oleh fungsi `input()`, terlepas dari apa yang diketik pengguna?

A. `int`
B. `float`
C. `str` **Benar**
D. `bool`

##latihan:
deskripsi tugas:
Buat program yang meminta pengguna memasukkan nama hewan peliharaan mereka, lalu menampilkan pesan sapaan kepada hewan tersebut.

output diharapkan:
```
Masukkan nama hewan peliharaanmu: Milo
Halo Milo, semoga harimu menyenangkan!
```

input (opsional):
Milo

petunjuk:
Gunakan `input("Masukkan nama hewan peliharaanmu: ")` dan gabungkan dengan `print()`.

kode awal:
```python
# Baca nama hewan peliharaan dengan input()

# Tampilkan sapaan menggunakan nama tersebut

```

solusi:
```python
nama_hewan = input("Masukkan nama hewan peliharaanmu: ")
print("Halo " + nama_hewan + ", semoga harimu menyenangkan!")
```

Validasi kode statis:
```
regex pattern = input\s*\(\s*["']Masukkan nama hewan peliharaanmu: ["']\s*\)
pesan error = Gunakan: input("Masukkan nama hewan peliharaanmu: ")

regex pattern = print\s*\(\s*["']Halo\s*["']\s*\+\s*nama_hewan
pesan error = Gabungkan teks sapaan dengan variabel nama hewan menggunakan +
```

---

### Pelajaran: Mengubah Input Menjadi Integer

##materi:
Karena `input()` selalu mengembalikan `str`, untuk melakukan **operasi matematika** terhadap input pengguna, hasilnya harus dikonversi menggunakan `int()` (untuk bilangan bulat) atau `float()` (untuk bilangan desimal). Pola yang sangat umum digunakan adalah **konversi langsung** dalam satu baris: `angka = int(input("Masukkan angka: "))` — `input()` dijalankan dulu, hasilnya (str) langsung dibungkus oleh `int()`.

Jika pengguna memasukkan teks yang **tidak bisa dikonversi** ke angka (misalnya huruf), `int()` akan menghasilkan **error `ValueError`**. Pada level pemula, hal ini diterima sebagai keterbatasan; penanganan error menggunakan `try-except` akan dibahas pada level lebih lanjut.

```python
# Konversi langsung dalam satu baris
umur = int(input("Masukkan umur Anda: "))
tahun_depan = umur + 1
print("Tahun depan usia Anda:", tahun_depan)

berat = float(input("Masukkan berat badan (kg): "))
print("Berat dalam gram:", berat * 1000)
```

Output Terminal:
```
$ python program.py
Masukkan umur Anda: 20
Tahun depan usia Anda: 21
Masukkan berat badan (kg): 65.5
Berat dalam gram: 65500.0
```

##kuis:
Apa yang terjadi jika `int(input("Masukkan angka: "))` dijalankan tetapi pengguna mengetik `"abc"`?

A. Hasilnya otomatis menjadi `0`
B. Python akan menghasilkan error `ValueError` **Benar**
C. Python akan mengabaikan input dan meminta input lagi secara otomatis
D. Hasilnya menjadi string `"abc"`

##latihan:
deskripsi tugas:
Buat program yang membaca dua angka dari pengguna (menggunakan `int(input(...))`), lalu menampilkan hasil penjumlahannya.

output diharapkan:
```
Masukkan angka pertama: 12
Masukkan angka kedua: 8
Hasil penjumlahan: 20
```

input (opsional):
12 dan 8

petunjuk:
Gunakan `int(input("..."))` untuk masing-masing variabel, lalu jumlahkan dengan `+`.

kode awal:
```python
# Baca angka pertama dan kedua sebagai int

# Tampilkan hasil penjumlahan

```

solusi:
```python
angka1 = int(input("Masukkan angka pertama: "))
angka2 = int(input("Masukkan angka kedua: "))
print("Hasil penjumlahan:", angka1 + angka2)
```

Validasi kode statis:
```
regex pattern = int\s*\(\s*input\s*\(\s*["']Masukkan angka pertama: ["']\s*\)\s*\)
pesan error = Gunakan: int(input("Masukkan angka pertama: "))

regex pattern = print\s*\(\s*["']Hasil penjumlahan:["']\s*,\s*angka1\s*\+\s*angka2\s*\)
pesan error = Tampilkan dengan: print("Hasil penjumlahan:", angka1 + angka2)
```

---

## SUBBAB: Menampilkan Data

---

### Pelajaran: Fungsi `print()`

##materi:
`print()` adalah fungsi paling dasar untuk **menampilkan output** ke layar di Python. Berbeda dengan `printf()` di C yang membutuhkan format specifier, `print()` bisa langsung menerima **banyak argumen** dipisahkan koma, dan secara otomatis menambahkan **spasi** di antara argumen serta **newline** di akhir.

`print()` memiliki beberapa parameter opsional yang berguna: `sep` (separator/pemisah antar argumen, default spasi) dan `end` (karakter di akhir, default `\n`). Contoh: `print("A", "B", "C", sep="-")` menghasilkan `A-B-C`, dan `print("Tanpa newline", end="")` mencegah pindah baris setelahnya.

```python
print("Halo", "Dunia")              # Pemisah default: spasi
print("A", "B", "C", sep="-")       # Pemisah custom: -
print("Tidak ada newline", end=" ") # Tidak pindah baris
print("lanjut di baris yang sama")
print(1, 2, 3, sep=", ", end="!\n") # Kombinasi sep dan end
```

Output Terminal:
```
$ python program.py
Halo Dunia
A-B-C
Tidak ada newline lanjut di baris yang sama
1, 2, 3!
```

##kuis:
Apa nilai default dari parameter `sep` pada fungsi `print()` jika tidak dituliskan?

A. Tanpa karakter apapun (kosong)
B. Koma `,`
C. Spasi `" "` **Benar**
D. Newline `\n`

##latihan:
deskripsi tugas:
Gunakan `print()` dengan parameter `sep` untuk menampilkan tanggal dalam format `DD/MM/YYYY` dari tiga variabel `hari = 17`, `bulan = 8`, `tahun = 1945`.

output diharapkan:
```
17/08/1945
```

input (opsional):
-

petunjuk:
Gunakan `print(hari, bulan, tahun, sep="/")`. Perhatikan agar `bulan` tampil sebagai "08" — gunakan format string atau f-string jika diperlukan.

kode awal:
```python
hari = 17
bulan = 8
tahun = 1945
# Tampilkan tanggal dengan format DD/MM/YYYY menggunakan sep

```

solusi:
```python
hari = 17
bulan = 8
tahun = 1945
print(f"{hari:02d}", f"{bulan:02d}", tahun, sep="/")
```

Validasi kode statis:
```
regex pattern = sep\s*=\s*["']/["']
pesan error = Gunakan parameter sep="/" pada print() untuk format DD/MM/YYYY

regex pattern = print\s*\(.*hari.*bulan.*tahun
pesan error = Tampilkan ketiga variabel hari, bulan, dan tahun dalam satu print()
```

---

### Pelajaran: Menampilkan String dan Variabel (f-string)

##materi:
**f-string** (formatted string literal), diperkenalkan di Python 3.6, adalah cara modern dan paling direkomendasikan untuk **menyisipkan nilai variabel ke dalam string**. Caranya: tambahkan huruf `f` sebelum tanda petik, lalu tulis nama variabel di dalam kurung kurawal `{}`: `f"Nama saya {nama}"`.

f-string juga mendukung **ekspresi** di dalam `{}` (tidak hanya variabel tunggal, tapi juga operasi matematika atau pemanggilan fungsi), dan mendukung **format specifier** mirip C menggunakan tanda titik dua, contoh: `f"{nilai:.2f}"` untuk 2 angka desimal, atau `f"{angka:05d}"` untuk padding angka dengan nol di depan hingga 5 digit. f-string jauh lebih ringkas dan mudah dibaca dibandingkan concatenation `+` atau metode `.format()` yang lebih lama.

```python
nama = "Maya"
usia = 21
ipk = 3.78912

print(f"Nama saya {nama}, usia {usia} tahun.")
print(f"IPK: {ipk:.2f}")          # 2 angka desimal
print(f"Tahun depan: {usia + 1}")  # ekspresi di dalam {}
print(f"Kode: {7:03d}")            # padding nol, lebar 3
```

Output Terminal:
```
$ python program.py
Nama saya Maya, usia 21 tahun.
IPK: 3.79
Tahun depan: 22
Kode: 007
```

##kuis:
Bagaimana cara menyisipkan nilai variabel `harga` ke dalam string menggunakan f-string?

A. `print("Harga: " % harga)`
B. `print(f"Harga: {harga}")` **Benar**
C. `print("Harga: " . harga)`
D. `print("Harga: ${harga}")`

##latihan:
deskripsi tugas:
Buat variabel `nama_produk = "Laptop"` dan `harga = 7500000.5`. Gunakan f-string untuk menampilkan nama produk dan harganya dengan 2 angka desimal.

output diharapkan:
```
Produk: Laptop, Harga: Rp7500000.50
```

input (opsional):
-

petunjuk:
Gunakan `f"Produk: {nama_produk}, Harga: Rp{harga:.2f}"`.

kode awal:
```python
nama_produk = "Laptop"
harga = 7500000.5
# Tampilkan menggunakan f-string dengan format 2 desimal untuk harga

```

solusi:
```python
nama_produk = "Laptop"
harga = 7500000.5
print(f"Produk: {nama_produk}, Harga: Rp{harga:.2f}")
```

Validasi kode statis:
```
regex pattern = f["'].*\{nama_produk\}.*\{harga:\.2f\}
pesan error = Gunakan f-string dengan format: f"Produk: {nama_produk}, Harga: Rp{harga:.2f}"

regex pattern = print\s*\(\s*f["']
pesan error = Gunakan print() dengan f-string (diawali huruf f sebelum tanda petik)
```

---

### Pelajaran: Menggabungkan (Concatenate) String

##materi:
**Concatenation** (penggabungan string) di Python bisa dilakukan dengan beberapa cara: operator **`+`** (menggabungkan string secara langsung, kedua operand harus `str`), operator **`*`** (mengulang string sejumlah angka, misal `"ab" * 3` → `"ababab"`), dan **f-string** (cara paling fleksibel, sudah dibahas sebelumnya). Untuk menggabungkan banyak string dengan separator yang konsisten, Python menyediakan metode `.join()`: `"-".join(["2024", "01", "15"])` → `"2024-01-15"`.

Perlu diingat kembali: operator `+` untuk concatenation **hanya bekerja antar `str`** — menggabungkan `str` dengan `int`/`float` langsung akan menghasilkan `TypeError`, sehingga perlu `str()` untuk konversi (sudah dibahas di pelajaran konversi tipe data). f-string umumnya lebih disukai karena menghindari masalah konversi tipe ini sepenuhnya.

```python
depan = "Selamat"
belakang = "Pagi"

# Penggabungan dengan +
print(depan + " " + belakang)

# Repetisi dengan *
print("=" * 10)

# Penggabungan dengan join
tanggal = "-".join(["2024", "01", "15"])
print(tanggal)
```

Output Terminal:
```
$ python program.py
Selamat Pagi
==========
2024-01-15
```

##kuis:
Apa hasil dari ekspresi Python `"-" * 5`?

A. `"-5"`
B. Error, operator `*` tidak bisa digunakan untuk string
C. `"-----"` **Benar**
D. `5`

##latihan:
deskripsi tugas:
Buat dua variabel string `judul = "BAB 1"` dan `subjudul = "Pengenalan"`. Gabungkan keduanya dengan pemisah ` - ` menggunakan operator `+`, lalu tampilkan garis pemisah sepanjang 15 karakter `=` di bawahnya menggunakan operator `*`.

output diharapkan:
```
BAB 1 - Pengenalan
===============
```

input (opsional):
-

petunjuk:
Gunakan `judul + " - " + subjudul` dan `"=" * 15`.

kode awal:
```python
judul = "BAB 1"
subjudul = "Pengenalan"
# Tampilkan gabungan judul dan subjudul dengan pemisah " - "

# Tampilkan garis "=" sepanjang 15 karakter

```

solusi:
```python
judul = "BAB 1"
subjudul = "Pengenalan"
print(judul + " - " + subjudul)
print("=" * 15)
```

Validasi kode statis:
```
regex pattern = judul\s*\+\s*["']\s*-\s*["']\s*\+\s*subjudul
pesan error = Gabungkan dengan: judul + " - " + subjudul

regex pattern = ["']=["']\s*\*\s*15
pesan error = Tampilkan garis dengan: "=" * 15
```
