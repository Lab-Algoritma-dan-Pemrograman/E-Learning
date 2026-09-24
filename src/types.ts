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
