const fs = require('fs');
const path = require('path');

// 1. Convert TS to temporary JS
console.log("Reading src/data/curriculum.ts...");
let tsCode = fs.readFileSync('src/data/curriculum.ts', 'utf8');

// Strip interface declarations and types to compile on the fly
tsCode = tsCode.replace(/export interface [^{]*{[\s\S]*?}\r?\n/g, '');
tsCode = tsCode.replace(/: Level\[\]/g, '');
tsCode = tsCode.replace(/: Level/g, '');
tsCode = tsCode.replace(/: Module/g, '');
tsCode = tsCode.replace(/: Lesson/g, '');
tsCode = tsCode.replace(/: ValidationRule/g, '');
tsCode = tsCode.replace('export const curriculum =', 'module.exports =');

fs.writeFileSync('scratch/temp_curriculum.cjs', tsCode, 'utf8');
const curriculum = require('./temp_curriculum.cjs');
console.log(`Loaded ${curriculum.length} levels from temporary curriculum file.`);

// 2. Read level4.md
const mdPath = path.join(process.cwd(), 'level4.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

// 3. Parse Markdown
const parts = mdContent.split(/\r?\n---\r?\n/);
const modules = [];
let currentModule = null;
let moduleCount = 0;
let lessonCount = 0;

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatInlineMarkdown(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/`(.*?)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">$1</code>');
  return text;
}

function parseMarkdownList(text) {
  const lines = text.split('\n');
  const itemsHtml = lines.map(line => {
    let clean = line.replace(/^[-*]\s*/, '').trim();
    return `<li>${formatInlineMarkdown(clean)}</li>`;
  }).join('\n  ');
  return `<ul class="list-disc pl-5 space-y-1 my-2 text-zinc-700">\n  ${itemsHtml}\n</ul>`;
}

function parseMarkdownTable(text) {
  const lines = text.split('\n');
  if (lines.length < 2) return '';
  
  const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
  const rows = lines.slice(2).map(line => {
    return line.split('|').map(s => s.trim()).filter(Boolean);
  });
  
  const headHtml = headers.map(h => `<th class="border border-zinc-200 px-3 py-1.5 bg-zinc-50 font-bold text-left">${formatInlineMarkdown(h)}</th>`).join('');
  const rowsHtml = rows.map(row => {
    const cells = row.map(c => `<td class="border border-zinc-200 px-3 py-1.5">${formatInlineMarkdown(c)}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('\n    ');
  
  return `
  <div class="my-4 overflow-x-auto">
    <table class="w-full border-collapse border border-zinc-200 text-xs">
      <thead>
        <tr>${headHtml}</tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  </div>`;
}

function parseMateri(text) {
  let codeExample = "";
  const blocks = text.split(/```/);
  let htmlParts = [];
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (i % 2 === 1) {
      if (block.startsWith('python')) {
        const code = block.substring('python'.length).trim();
        if (!codeExample) {
          codeExample = code;
        }
        htmlParts.push(`
      <div class="my-4 not-prose">
        <div class="text-[10px] font-bold text-zinc-400 mb-1 uppercase tracking-wider">Contoh Penggunaan Kode:</div>
        <pre class="bg-zinc-950 text-zinc-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800"><code>${escapeHtml(code)}</code></pre>
      </div>`);
      } else {
        const lines = block.trim().split('\n');
        let cmd = "python3 program.py";
        let outputLines = [];
        for (let line of lines) {
          if (line.startsWith('$')) {
            cmd = line.substring(1).trim();
          } else {
            outputLines.push(line);
          }
        }
        htmlParts.push(`
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
            <span class="text-zinc-500">$ ${escapeHtml(cmd)}</span>
            <span class="block mt-1 text-zinc-100">${escapeHtml(outputLines.join('\n'))}</span>
          </div>
        </div>
      </div>`);
      }
    } else {
      let textHtml = block.trim();
      if (!textHtml) continue;
      
      const paragraphs = textHtml.split(/\r?\n\r?\n/);
      for (let p of paragraphs) {
        p = p.trim();
        if (!p) continue;
        
        if (p.startsWith('|')) {
          htmlParts.push(parseMarkdownTable(p));
        } else if (p.startsWith('-') || p.startsWith('*')) {
          htmlParts.push(parseMarkdownList(p));
        } else if (p.startsWith('Output Terminal:')) {
          continue;
        } else {
          let formatted = formatInlineMarkdown(p);
          htmlParts.push(`<p class="mb-4 text-zinc-700 leading-relaxed">${formatted}</p>`);
        }
      }
    }
  }
  
  const explanation = `<div class="space-y-4">\n      ${htmlParts.join('\n').trim()}\n    </div>`;
  return { explanation, codeExample };
}

function parseQuiz(text) {
  const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
  if (lines.length < 2) return null;
  
  const question = formatInlineMarkdown(lines[0]);
  const options = [];
  let correctAnswer = 0;
  
  const optionLines = lines.slice(1);
  optionLines.forEach((line, idx) => {
    let cleanOption = line.replace(/^[A-D]\.\s*/, '').trim();
    if (cleanOption.includes('**Benar**')) {
      correctAnswer = idx;
      cleanOption = cleanOption.replace('**Benar**', '').trim();
    }
    options.push(cleanOption);
  });
  
  return {
    question,
    options,
    correctAnswer
  };
}

function extractCodeBlock(text, label) {
  const regex = new RegExp(label + '\\r?\\n```(?:python)?([\\s\\S]*?)```');
  const match = text.match(regex);
  return match ? match[1].trim() + '\n' : "";
}

function parseLatihan(text) {
  const initialCodeBlock = extractCodeBlock(text, 'kode awal:');
  const solutionBlock = extractCodeBlock(text, 'solusi:');
  
  const hintMatch = text.match(/petunjuk:\r?\n([\s\S]*?)(?=kode awal:|$)/);
  const hint = hintMatch ? hintMatch[1].trim() : "";
  
  const expectedOutputMatch = text.match(/output diharapkan:\r?\n```([\s\S]*?)```/);
  const expectedOutputRaw = expectedOutputMatch ? expectedOutputMatch[1] : "";
  let expectedOutput = expectedOutputRaw.trim();
  if (expectedOutput) {
    expectedOutput = expectedOutput + '\n';
  }

  const inputMatch = text.match(/input \(opsional\):\r?\n(.*?)(?=\r?\npetunjuk:|$)/);
  const input = inputMatch && inputMatch[1].trim() !== '-' ? inputMatch[1].trim() : undefined;
  
  const testCases = [
    {
      expectedOutput,
      description: "Hasil eksekusi program"
    }
  ];
  if (input) {
    testCases[0].input = input;
  }
  
  const validationRules = [];
  const valMatch = text.match(/Validasi kode statis:\r?\n```([\s\S]*?)```/);
  if (valMatch) {
    const valLines = valMatch[1].trim().split('\n');
    let currentRule = null;
    for (let line of valLines) {
      line = line.trim();
      if (line.startsWith('regex pattern =')) {
        currentRule = {
          pattern: line.replace('regex pattern =', '').trim(),
          message: '',
          shouldExist: true
        };
        validationRules.push(currentRule);
      } else if (line.startsWith('pesan error =') && currentRule) {
        currentRule.message = line.replace('pesan error =', '').trim();
      }
    }
  }
  
  return {
    initialCode: initialCodeBlock,
    solution: solutionBlock,
    hint,
    testCases,
    validationRules
  };
}

for (let part of parts) {
  part = part.trim();
  if (!part) continue;

  if (part.startsWith('## SUBBAB:')) {
    const title = part.replace('## SUBBAB:', '').trim();
    moduleCount++;
    currentModule = {
      id: `py4-m${moduleCount}`,
      title: title,
      lessons: []
    };
    modules.push(currentModule);
  } else if (part.startsWith('### Pelajaran:')) {
    if (!currentModule) {
      moduleCount++;
      currentModule = {
        id: `py4-m${moduleCount}`,
        title: "Pendahuluan Python",
        lessons: []
      };
      modules.push(currentModule);
    }

    const titleLine = part.split('\n')[0];
    const lessonTitle = titleLine.replace('### Pelajaran:', '').trim();
    lessonCount++;
    const lessonId = `py4-l${lessonCount}`;

    const rest = part.substring(titleLine.length).trim();
    
    const materiIndex = rest.indexOf('##materi:');
    const kuisIndex = rest.indexOf('##kuis:');
    const latihanIndex = rest.indexOf('##latihan:');
    
    let materiText = "";
    if (materiIndex !== -1) {
      const endOfMateri = kuisIndex !== -1 ? kuisIndex : (latihanIndex !== -1 ? latihanIndex : rest.length);
      materiText = rest.substring(materiIndex + '##materi:'.length, endOfMateri).trim();
    }
    
    let kuisText = "";
    if (kuisIndex !== -1) {
      const endOfKuis = latihanIndex !== -1 ? latihanIndex : rest.length;
      kuisText = rest.substring(kuisIndex + '##kuis:'.length, endOfKuis).trim();
    }

    let latihanText = "";
    if (latihanIndex !== -1) {
      latihanText = rest.substring(latihanIndex).trim();
    }

    const { explanation, codeExample } = parseMateri(materiText);
    const quiz = parseQuiz(kuisText);
    const { initialCode, solution, hint, testCases, validationRules } = parseLatihan(latihanText);

    currentModule.lessons.push({
      id: lessonId,
      title: lessonTitle,
      explanation,
      codeExample,
      initialCode,
      solution,
      hint,
      quiz,
      testCases,
      validationRules
    });
  }
}

console.log(`Successfully parsed ${modules.length} modules containing ${lessonCount} total lessons.`);

// 4. Update Level 4 (py-level-1) in curriculum array
const levelIndex = curriculum.findIndex(l => l.id === 'py-level-1');
if (levelIndex !== -1) {
  curriculum[levelIndex] = {
    id: "py-level-1",
    title: "PENGENALAN DASAR BAHASA PYTHON",
    description: "Beralih ke sintaksis dinamis Python, pengenalan variabel dynamic typing, boolean case-sensitive, casting, dan I/O.",
    locked: false,
    accessMode: "auto",
    modules: modules
  };
  console.log("Successfully replaced py-level-1 (Level 4) curriculum details.");
} else {
  console.error("Could not find py-level-1 level in existing curriculum!");
  process.exit(1);
}

// 5. Serialize and write back
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

function customStringify(val, indent = 0) {
  const spaces = ' '.repeat(indent);
  if (typeof val === 'string') {
    return JSON.stringify(val);
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

const serializedCurriculum = `export const curriculum: Level[] = ${customStringify(curriculum, 0)};\n`;

fs.writeFileSync('src/data/curriculum.ts', fileHeader + serializedCurriculum, 'utf8');
console.log("✅ Rebuilt src/data/curriculum.ts successfully!");

// Cleanup temp files
try {
  fs.unlinkSync('scratch/temp_curriculum.cjs');
} catch (e) {}
