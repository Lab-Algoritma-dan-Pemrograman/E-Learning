import { create } from 'zustand';

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  score?: number;
}

interface ProgressState {
  completedLessons: string[];
  setCompletedLessons: (lessons: string[]) => void;
}

export const useProgress = create<ProgressState>((set) => ({
  completedLessons: [],
  setCompletedLessons: (lessons) => set({ completedLessons: lessons }),
}));
