import { create } from 'zustand';
import { Level } from '../data/curriculum';

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
  selectedModel: 'gemini-3-flash' | 'gemini-2.5-flash';
  setSelectedModel: (model: 'gemini-3-flash' | 'gemini-2.5-flash') => void;
  pyodide: any;
  setPyodide: (py: any) => void;
  isPyodideLoading: boolean;
  setIsPyodideLoading: (loading: boolean) => void;
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
  selectedModel: 'gemini-3-flash',
  setSelectedModel: (model) => set({ selectedModel: model }),
  pyodide: null,
  setPyodide: (py) => set({ pyodide: py }),
  isPyodideLoading: true,
  setIsPyodideLoading: (loading) => set({ isPyodideLoading: loading }),
}));
