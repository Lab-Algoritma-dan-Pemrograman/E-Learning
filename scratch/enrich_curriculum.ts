import fs from 'fs';
import path from 'path';
import { curriculum } from '../src/data/curriculum';

const commandMap: Record<string, string> = {
  'c1-l1': 'cat algoritma.txt',
  'c1-l2': 'gcc program.c -o program && ./program',
  'c1-l3': 'gcc program.c -o program && ./program',
  'c1-l4': 'gcc program.c -o program && ./program',
  'c1-l5': 'gcc program.c -o program && ./program',
  'c1-l6': 'gcc program.c -o program && ./program',
  'c1-l7': 'gcc program.c -o program && ./program',
  'c1-l8': 'gcc program.c -o program && ./program',
  'c1-l9': 'gcc program.c -o program && ./program',
  'c2-l1': 'gcc program.c -o program && ./program',
  'c2-l2': 'gcc program.c -o program && ./program',
  'c2-l3': 'gcc program.c -o program && ./program',
  'c2-l4': 'gcc program.c -o program && ./program',
  'c2-l5': 'gcc program.c -o program && ./program',
  'c2-l6': 'gcc program.c -o program && ./program',
  'c3-l1': 'gcc program.c -o program && ./program',
  'c3-l2': 'gcc program.c -o program && ./program',
  'c3-l3': 'gcc program.c -o program && ./program',
  'c3-l4': 'gcc program.c -o program && ./program',
  'c3-l5': 'gcc program.c -o program && ./program',
  'c3-l6': 'gcc program.c -o program && ./program',
  'c3-l7': 'gcc program.c -o program && ./program',
  'c3-l8': 'gcc program.c -o program && ./program',
  'c3-l9': 'gcc program.c -o program && ./program',
  
  'py4-l1': 'python3 program.py',
  'py4-l2': 'python3 program.py',
  'py4-l3': 'python3 program.py',
  'py4-l4': 'python3 program.py',
  'py4-l5': 'python3 program.py',
  'py4-l6': 'python3 program.py',
  'py4-l7': 'python3 program.py',
  'py4-l8': 'python3 program.py',
  'py4-l9': 'python3 program.py',
  'py5-l1': 'python3 program.py',
  'py5-l2': 'python3 program.py',
  'py5-l3': 'python3 program.py',
  'py5-l4': 'python3 program.py',
  'py5-l5': 'python3 program.py',
  'py5-l6': 'python3 program.py',
  'py5-l7': 'python3 program.py',
  'py6-l1': 'python3 program.py',
  'py6-l2': 'python3 program.py',
  'py6-l3': 'python3 program.py',
};

const outputMap: Record<string, string> = {
  'c1-l1': '1. Start\n2. Read: Masukkan Air\n3. Process: Panaskan\n4. Write: Air Matang\n5. End',
  'c1-l2': 'Int main berjalan sempurna.',
  'c1-l3': 'Max: 100',
  'c1-l4': 'Otomatis Turun Baris Nih!',
  'c1-l5': 'Uang: 50000',
  'c1-l6': 'A',
  'c1-l7': 'Nilai awal a ditarik via a++ : 5\nKini a didorong via ++a : 7',
  'c1-l8': 'Panas Hawa',
  'c1-l9': 'Guest Masuk',
  'c2-l1': 'Jalan aja boss',
  'c2-l2': 'Kanak Dasar',
  'c2-l3': 'Admin',
  'c2-l4': 'Mustahil ini!',
  'c2-l5': 'Angka minus: 3\nAngka minus: 2\nAngka minus: 1',
  'c2-l6': '123',
  'c3-l1': 'Uang hari kedua adalah array idx1 yaitu : 20..',
  'c3-l2': 'Ambil Data 80',
  'c3-l3': '50',
  'c3-l4': 'Ban m1 4',
  'c3-l5': 'Level mgr ke-1 = 5',
  'c3-l6': 'Uang di Rek B dicopy: 5000',
  'c3-l7': '(File dummy.txt created successfully)',
  'c3-l8': '(Line appended to historis.log successfully)',
  'c3-l9': 'Waduh, file databasenya musnah bro!',
  
  'py4-l1': '100 Ada Orang True',
  'py4-l2': 'Status mode panel: True',
  'py4-l3': '5500',
  'py4-l4': '25\n27',
  'py4-l5': 'Berhak mengkonsumsi Kue Bolu Premium\nTrue',
  'py4-l6': 'True\nFalse',
  'py4-l7': 'Tulis Namamu Bos: Budi\nTerdaftar Bos: Budi',
  'py4-l8': 'Uang Belanja Jajan: 10\n60',
  'py4-l9': 'Info detail pegawai kita Rizal jabatannya Dev!',
  'py5-l1': 'Done Lolos',
  'py5-l2': 'Masih Pagi Booz.',
  'py5-l3': 'Medali PERAK B',
  'py5-l4': 'Proyek Lolos Sukses!\nProyek Lolos Sukses!\nProyek Lolos Sukses!',
  'py5-l5': '1\n2\n3',
  'py5-l6': 'Dorr proyektil tembakan peluru melesat: ke-1\nDorr proyektil tembakan peluru melesat: ke-2\nDorr proyektil tembakan peluru melesat: ke-4',
  'py5-l7': '25',
  'py6-l1': "[100, 'Teks', True, 999]",
  'py6-l2': 'merah',
  'py6-l3': '(Word appended to dummy.txt successfully)',
};

function formatInlineStyles(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">$1</code>');
}

function convertMarkdownToHtml(md: string): string {
  const lines = md.split('\n');
  let result = '';
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        inList = false;
        listType = null;
      }
      continue;
    }
    
    // Check if list item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        if (inList) {
          result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        }
        result += '<ul class="list-disc pl-5 space-y-1 my-2 text-zinc-700">\n';
        inList = true;
        listType = 'ul';
      }
      const itemContent = trimmed.substring(2);
      result += `  <li>${formatInlineStyles(itemContent)}</li>\n`;
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        if (inList) {
          result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        }
        result += '<ol class="list-decimal pl-5 space-y-1 my-2 text-zinc-700">\n';
        inList = true;
        listType = 'ol';
      }
      const itemContent = trimmed.replace(/^\d+\.\s/, '');
      result += `  <li>${formatInlineStyles(itemContent)}</li>\n`;
    } else {
      if (inList) {
        result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
        inList = false;
        listType = null;
      }
      result += `<p class="mb-4 text-zinc-700 leading-relaxed">${formatInlineStyles(trimmed)}</p>\n`;
    }
  }
  
  if (inList) {
    result += listType === 'ul' ? '</ul>\n' : '</ol>\n';
  }
  
  return result;
}

function makeExplanation(materi: string, code: string, command: string, output: string): string {
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  return `
    <div class="space-y-4">
      ${materi}
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Contoh Penggunaan Kode:</div>
        <pre class="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800"><code>${escapedCode}</code></pre>
      </div>
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Output Terminal (Mac):</div>
        <div class="bg-zinc-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs shadow-xl border border-zinc-800 max-w-xl">
          <div class="flex items-center gap-1.5 mb-2.5 border-b border-zinc-800 pb-2 text-zinc-500">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
            <span class="ml-2 text-[10px] font-bold text-zinc-400">macbook-pro — ~user/workspace</span>
          </div>
          <div class="whitespace-pre-wrap font-semibold leading-relaxed">
            <span class="text-zinc-500">$ ${command}</span>
            <span class="block mt-1 text-zinc-100">${output}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function run() {
  console.log("Processing curriculum...");
  
  // Clone current curriculum and transform explanations
  const updatedCurriculum = curriculum.map(level => {
    return {
      ...level,
      modules: level.modules.map(mod => {
        return {
          ...mod,
          lessons: mod.lessons.map(lesson => {
            const command = commandMap[lesson.id] || 'gcc program.c -o program && ./program';
            const output = outputMap[lesson.id] || 'Hello World!';
            
            // Check if it already has rich HTML structure to avoid double wrapping
            if (lesson.explanation.includes('Output Terminal (Mac)')) {
              console.log(`Skipping already-enriched lesson ${lesson.id}`);
              return lesson;
            }
            
            const materiHtml = convertMarkdownToHtml(lesson.explanation);
            const enrichedExplanation = makeExplanation(materiHtml, lesson.codeExample, command, output);
            
            return {
              ...lesson,
              explanation: enrichedExplanation.trim()
            };
          })
        };
      })
    };
  });

  // Now, serialize the whole curriculum.ts
  const outputFilePath = path.join(process.cwd(), './src/data/curriculum.ts');
  
  const fileHeader = `export interface ValidationRule {
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

`;

  // Custom stringifier to make it pretty and valid TS code
  function customStringify(val: any, indent: number = 0): string {
    const spaces = ' '.repeat(indent);
    if (typeof val === 'string') {
      return JSON.stringify(val); // will escape quotes, newlines, etc.
    }
    if (typeof val === 'number' || typeof val === 'boolean' || val === null || val === undefined) {
      return String(val);
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return '[]';
      const items = val.map(item => customStringify(item, indent + 2)).join(',\n' + ' '.repeat(indent + 2));
      return `[\n${' '.repeat(indent + 2)}${items}\n${spaces}]`;
    }
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (keys.length === 0) return '{}';
      const fields = keys.map(key => {
        const isSafeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
        const formattedKey = isSafeKey ? key : `"${key}"`;
        return `${formattedKey}: ${customStringify(val[key], indent + 2)}`;
      }).join(',\n' + ' '.repeat(indent + 2));
      return `{\n${' '.repeat(indent + 2)}${fields}\n${spaces}}`;
    }
    return 'null';
  }

  const serializedCurriculum = `export const curriculum: Level[] = ${customStringify(updatedCurriculum, 0)};\n`;
  
  fs.writeFileSync(outputFilePath, fileHeader + serializedCurriculum, 'utf8');
  console.log("✅ Curriculum successfully enriched and written to src/data/curriculum.ts");
}

run().catch(console.error);
