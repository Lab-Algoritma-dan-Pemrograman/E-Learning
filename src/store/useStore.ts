import { create } from 'zustand';
import { Level, curriculum as defaultCurriculum } from '../data/curriculum';
import { Achievement } from '../services/achievementService';

export interface UserProfile {
  nim: string;
  nama: string;
  kelas: string;
  jurusan?: string | null;
  email?: string | null;
  photoURL?: string | null;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  createdAt: string;
  role?: 'admin' | 'kordas' | 'asisten' | 'praktikan'; // default: 'praktikan' (set by SupabaseProvider)
  division?: string;
  levelAccessOverrides?: Record<string, 'auto' | 'unlocked' | 'locked'>;
  assessmentAccess?: Record<string, boolean>;
  studyTime?: number; // study time tracked in seconds
}

type Page = 'dashboard' | 'lesson' | 'playground' | 'leaderboard' | 'courses' | 'profile' | 'admin' | 'monitoring' | 'auditlog' | 'terminal-demo';

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
  cWorker: any;
  setCWorker: (worker: any) => void;
  isCLoading: boolean;
  setIsCLoading: (loading: boolean) => void;
  unlockedAchievement: Achievement | null;
  setUnlockedAchievement: (achievement: Achievement | null) => void;
  achievementQueue: Achievement[];
  pushAchievement: (achievement: Achievement) => void;
  shiftAchievement: () => void;
  levelUpNotification: number | null;
  setLevelUpNotification: (level: number | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  curriculum: defaultCurriculum,
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
  cWorker: null,
  setCWorker: (worker) => set({ cWorker: worker }),
  isCLoading: true,
  setIsCLoading: (loading) => set({ isCLoading: loading }),
  unlockedAchievement: null,
  setUnlockedAchievement: (achievement) => set({ unlockedAchievement: achievement }),
  achievementQueue: [],
  pushAchievement: (achievement) => set((state) => {
    const newQueue = [...state.achievementQueue, achievement];
    return {
      achievementQueue: newQueue,
      unlockedAchievement: state.unlockedAchievement || achievement
    };
  }),
  shiftAchievement: () => set((state) => {
    const nextQueue = state.achievementQueue.slice(1);
    return {
      achievementQueue: nextQueue,
      unlockedAchievement: nextQueue.length > 0 ? nextQueue[0] : null
    };
  }),
  levelUpNotification: null,
  setLevelUpNotification: (level) => set({ levelUpNotification: level }),
}));
