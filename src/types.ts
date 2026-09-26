export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TestCase {
  description: string;
  expectedOutput: string;
  input?: string;
}

export interface ValidationRule {
  pattern?: string;
  message: string;
  type?: 'regex' | 'forbidden' | string;
  shouldExist?: boolean;
  flags?: string;
  stripStrings?: boolean;
}

export interface FlowchartSymbol {
  shape: 'terminator' | 'process' | 'io' | 'decision' | 'connector' | 'predefined';
  label: string;
}

/** Cabang alur flowchart: utama, atau cabang Ya/Tidak milik sebuah decision. */
export type FlowchartBranch = 'main' | 'yes' | 'no';

/** Satu kartu simbol pada posisi alur tertentu. */
export interface FlowchartStep extends FlowchartSymbol {
  at: FlowchartBranch;
}

/**
 * Bentuk `solution` versi 2 untuk latihan flowchart bercabang.
 * Bentuk lama (array FlowchartSymbol[] datar) tetap didukung dan diperlakukan
 * sebagai seluruhnya beralur `main`.
 */
export interface FlowchartFlow {
  version: number;
  flow: FlowchartStep[];
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  codeExample: string;
  initialCode: string;
  solution: string;
  hint: string;
  quiz?: Quiz;
  testCases?: TestCase[];
  validationRules?: ValidationRule[];
  xpReward?: number;
  /**
   * 'flowchart' = latihan berupa puzzle susun simbol flowchart (drag & drop)
   * dari kode sederhana. Konvensi data:
   *  - initialCode : kode C sederhana yang divisualkan (read-only)
   *  - solution    : JSON string FlowchartSymbol[] urutan BENAR atas->bawah
   *  - testCases[0].description : instruksi tugas
   */
  exerciseType?: 'code' | 'flowchart';
  /** Kartu simbol pengecoh untuk latihan flowchart (tidak ada di jawaban benar). */
  flowchartDistractors?: FlowchartSymbol[];
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
  accessMode?: 'auto' | 'unlocked' | 'locked';
  locked?: boolean;
  modules: Module[];
}
