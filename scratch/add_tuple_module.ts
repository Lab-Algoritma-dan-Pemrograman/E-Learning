import fs from 'fs';
import path from 'path';

const curriculumPath = path.resolve('src/data/curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

// Parse curriculum
const jsonStartMatch = content.match(/export const curriculum: Level\[\] = (\[[\s\S]*\]);?\s*$/);
if (!jsonStartMatch) {
  console.error("Could not match export const curriculum format!");
  process.exit(1);
}

const curriculum = JSON.parse(jsonStartMatch[1]);

// Find Level 6
const level6 = curriculum.find((l: any) => l.id === 'py-level-6');
if (!level6) {
  console.error("Level 6 not found!");
  process.exit(1);
}

// Find py-level-6-m2 (Tuple module)
const tupleModule = level6.modules.find((m: any) => m.id === 'py-level-6-m2');
if (!tupleModule) {
  console.error("Tuple module not found!");
  process.exit(1);
}

// Find py-level-6-m2-l3 (Method Tuple lesson)
const lesson3 = tupleModule.lessons.find((l: any) => l.id === 'py-level-6-m2-l3');
if (!lesson3) {
  console.error("Lesson 3 not found!");
  process.exit(1);
}

// Update explanation with HTML Table
lesson3.explanation = `<div class="space-y-4">
  <p class="mb-4 text-zinc-700 leading-relaxed">Meskipun bersifat <strong>immutable</strong>, Tuple menyediakan method pencarian bawaan serta fungsi pendukung untuk manipulasi data:</p>

  <div class="my-4 overflow-x-auto">
    <table class="w-full border-collapse border border-zinc-200 text-xs">
      <thead>
        <tr>
          <th class="border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left">Method / Fungsi</th>
          <th class="border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left">Deskripsi Fungsi</th>
          <th class="border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left">Contoh Penggunaan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">count(x)</code></td>
          <td class="border border-zinc-200 px-3 py-1.5">Menghitung frekuensi kemunculan nilai <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">x</code> di dalam Tuple.</td>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">(1, 2, 2, 3).count(2)</code> → <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">2</code></td>
        </tr>
        <tr>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">index(x)</code></td>
          <td class="border border-zinc-200 px-3 py-1.5">Mengembalikan posisi indeks pertama kali nilai <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">x</code> ditemukan.</td>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">("a", "b", "c").index("b")</code> → <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">1</code></td>
        </tr>
        <tr>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">list(tup)</code></td>
          <td class="border border-zinc-200 px-3 py-1.5">Mengonversi Tuple menjadi List agar elemennya dapat diubah (mutable).</td>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">list((1, 2))</code> → <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">[1, 2]</code></td>
        </tr>
        <tr>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">tuple(lst)</code></td>
          <td class="border border-zinc-200 px-3 py-1.5">Mengonversi List kembali menjadi Tuple (immutable).</td>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">tuple([1, 2])</code> → <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">(1, 2)</code></td>
        </tr>
        <tr>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">len(tup)</code></td>
          <td class="border border-zinc-200 px-3 py-1.5">Menghitung total jumlah elemen di dalam Tuple.</td>
          <td class="border border-zinc-200 px-3 py-1.5"><code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">len((10, 20, 30))</code> → <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">3</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="mb-4 text-zinc-700 leading-relaxed">Untuk mengubah isi Tuple yang sudah dibuat, trik yang biasa dilakukan adalah mengonversinya terlebih dahulu ke List dengan <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">list(tup)</code>, melakukan perubahan (misalnya <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">append()</code>), lalu mengembalikannya menjadi Tuple dengan <code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">tuple(lst)</code>.</p>

  <div class="my-4 not-prose">
    <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Contoh Penggunaan Kode:</div>
    <pre class="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800"><code>angka = (5, 10, 15, 10, 20, 10)

print("Jumlah 10:", angka.count(10))
print("Posisi 15:", angka.index(15))

# Konversi Tuple -> List -> Tuple
lst = list(angka)
lst.append(99)
tuple_baru = tuple(lst)
print("Tuple Baru:", tuple_baru)</code></pre>
  </div>

  <div class="my-4 not-prose">
    <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Output Terminal:</div>
    <div class="bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl">
      <div class="flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
        <span class="ml-2 text-[10px] font-bold text-zinc-400">terminal — workspace</span>
      </div>
      <div class="whitespace-pre-wrap font-semibold leading-relaxed">
        <span class="text-zinc-500">$ python program.py</span>
        <span class="block mt-1 text-zinc-100">Jumlah 10: 3
Posisi 15: 2
Tuple Baru: (5, 10, 15, 10, 20, 10, 99)</span>
      </div>
    </div>
  </div>
</div>`;

const updatedTsContent = `import { Level } from '../types';\n\nexport const curriculum: Level[] = ${JSON.stringify(curriculum, null, 2)};\n`;
fs.writeFileSync(curriculumPath, updatedTsContent, 'utf8');

console.log("Successfully updated Lesson 3 Tuple explanation with HTML table!");
