import { create } from 'zustand';
import { Level } from '../data/curriculum';
import { Achievement } from '../services/achievementService';

export interface UserProfile {
  nim: string;
  nama: string;
  kelas: string;
  email?: string | null;
  photoURL?: string | null;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  createdAt: string;
  role?: 'admin' | 'editor' | 'user';
  division?: string;
  levelAccessOverrides?: Record<string, 'auto' | 'unlocked' | 'locked'>;
}

type Page = 'dashboard' | 'lesson' | 'playground' | 'leaderboard' | 'courses' | 'profile' | 'admin';

interface AppState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  curriculum: Level[];
  setCurriculum: (curriculum: Level[]) => void;
  currentLessonId: string | null;
  setCurrentLessonId: (id: string | null) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  page: Page;
  setPage: (page: Page) => void;
  selectedModel: 'gemini-3-flash-preview' | 'gemini-2.5-flash';
  setSelectedModel: (model: 'gemini-3-flash-preview' | 'gemini-2.5-flash') => void;
  pyodideWorker: Worker | null;
  setPyodideWorker: (worker: Worker | null) => void;
  isPyodideLoading: boolean;
  setIsPyodideLoading: (loading: boolean) => void;
  unlockedAchievement: Achievement | null;
  setUnlockedAchievement: (achievement: Achievement | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  curriculum: [],
  setCurriculum: (curriculum) => set({ curriculum }),
  currentLessonId: null,
  setCurrentLessonId: (id) => set({ currentLessonId: id }),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  page: 'dashboard',
  setPage: (page) => set({ page }),
  selectedModel: 'gemini-3-flash-preview',
  setSelectedModel: (model) => set({ selectedModel: model }),
  pyodideWorker: null,
  setPyodideWorker: (worker) => set({ pyodideWorker: worker }),
  isPyodideLoading: true,
  setIsPyodideLoading: (loading) => set({ isPyodideLoading: loading }),
  unlockedAchievement: null,
  setUnlockedAchievement: (achievement) => set({ unlockedAchievement: achievement }),
}));
