import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { UserProfile, useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { 
  Users, Trophy, Zap, Clock, ChevronRight, Search, Shield, 
  User as UserIcon, CheckCircle2, Sparkles, Loader2, BookOpen,
  Lock, Unlock, ChevronUp, ChevronDown, Trash2, Plus, GripVertical,
  RotateCcw, Minus, AlertTriangle, Edit2, Save, X, Eye, EyeOff, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Level, Module, Lesson } from '../data/curriculum';
import { resetUserProgress, resetLevelProgress, adjustUserXp, deleteUser } from '../services/progressService';
import { GameQuestion, getGameQuestions, addGameQuestion, updateGameQuestion, deleteGameQuestion, getGameSettings, updateGameSettings, GameSettings, forceResetGameQuestions } from '../services/gameService';
import { Achievement, getAchievements } from '../services/achievementService';
import initialAchievements from '../data/achievements.json';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string;
  score?: number;
}

export const AdminDashboard: React.FC = () => {
  const { user: currentUser, curriculum: appCurriculum, setPage } = useStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<LessonProgress[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);

  const [activeTab, setActiveTab] = useState<'users' | 'curriculum' | 'structure' | 'games'>('users');
  const [aiMaterial, setAiMaterial] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generatedCurriculum, setGeneratedCurriculum] = useState<Level[] | null>(null);

  const [currentCurriculum, setCurrentCurriculum] = useState<Level[]>([]);
  const [draftCurriculum, setDraftCurriculum] = useState<Level[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [editingLevel, setEditingLevel] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; description: string }>({ title: '', description: '' });

  // Lesson editor state
  const [editingLessonInfo, setEditingLessonInfo] = useState<{ levelId: string; modIdx: number; lessonIdx: number } | null>(null);
  const [lessonEditForm, setLessonEditForm] = useState<Lesson | null>(null);
  const [savingLesson, setSavingLesson] = useState(false);
  
  // Admin reset state
  const [xpAdjustValue, setXpAdjustValue] = useState('');
  // Game management state
  const [allQuestions, setAllQuestions] = useState<GameQuestion[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettings>({ 
    bugHuntActive: true,
    bugHuntCActive: true, 
    bugHuntPythonActive: true,
    bugHuntWeeklyLimit: 3,
    bugHuntQuestionCount: 5
  });
  const [editingQuestion, setEditingQuestion] = useState<GameQuestion | null>(null);
  const [loadingGameData, setLoadingGameData] = useState(false);
  const [questionFilters, setQuestionFilters] = useState({ language: 'all' as 'all' | 'c' | 'python' });

  const [resetLoading, setResetLoading] = useState(false);

  const [showModal, setShowModal] = useState<{
    type: 'confirm' | 'alert';
    title: string;
    message: string;
    onConfirm?: () => void;
  } | null>(null);

  const [aiGenModal, setAiGenModal] = useState<{ type: 'module' | 'lesson'; levelId: string; modIdx?: number; levelLanguage: string; } | null>(null);
  const [aiGenContext, setAiGenContext] = useState('');
  const [isAiTargetGenerating, setIsAiTargetGenerating] = useState(false);

  // AI Game Question Generation State
  const [showAiGameGenModal, setShowAiGameGenModal] = useState(false);
  const [aiGameGenTopic, setAiGameGenTopic] = useState('');
  const [isAiGameGenerating, setIsAiGameGenerating] = useState(false);

  const isAdmin = currentUser?.role === 'admin';
  const isEditor = currentUser?.role === 'kordas';
  const isCoordinator = isAdmin && currentUser?.division === 'koordinator';
  const canAccess = isAdmin || isEditor;

  useEffect(() => {
    if (!canAccess) return;
    
    let unsubscribe: () => void;
    
    import('../services/curriculumService').then(m => {
      unsubscribe = m.curriculumService.subscribeToCurriculum(setCurrentCurriculum);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [canAccess]);

  useEffect(() => {
    if (!canAccess || activeTab !== 'games') return;
    
    const fetchGameData = async () => {
      setLoadingGameData(true);
      try {
        const [qList, settings] = await Promise.all([
          getGameQuestions('c', 100), // temp fetch all by getting large amount
          getGameSettings()
        ]);
        // Also fetch python
        const pyList = await getGameQuestions('python', 100);
        setAllQuestions([...qList, ...pyList]);
        setGameSettings(settings);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingGameData(false);
      }
    };
    fetchGameData();
  }, [canAccess, activeTab]);

  useEffect(() => {
    // Sinkronisasi pertama kali ke draft saat membuka tab structure
    if (activeTab === 'structure' && currentCurriculum.length > 0 && draftCurriculum.length === 0) {
      setDraftCurriculum(JSON.parse(JSON.stringify(currentCurriculum)));
    }
  }, [activeTab, currentCurriculum, draftCurriculum.length]);

  useEffect(() => {
    // Check if validation rules are missing in the database
    if (activeTab === 'structure' && currentCurriculum.length > 0) {
      const hasSomeRules = currentCurriculum.some(level => 
        level.modules?.some(mod => 
          mod.lessons?.some(lesson => lesson.validationRules && lesson.validationRules.length > 0)
        )
      );

      if (!hasSomeRules && !hasChanges) {
        setShowModal({
          type: 'confirm',
          title: '💡 Tip: Aturan Validasi Kosong',
          message: 'Sepertinya database Anda belum memiliki aturan validasi statis. Apakah Anda ingin memuat aturan standar dari sistem sekarang? (Ini akan masuk ke Draft)',
          onConfirm: handleSyncValidationRules
        });
      }
    }
  }, [activeTab, currentCurriculum.length]);

  const updateDraftLevel = (newLevel: Level) => {
    setDraftCurriculum(prev => prev.map(l => l.id === newLevel.id ? newLevel : l));
    setHasChanges(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else if (file) {
      setShowModal({
        type: 'alert',
        title: 'File Tidak Valid',
        message: 'Mohon unggah file PDF.'
      });
    }
  };

  const handleGenerateAi = async () => {
    if (!aiMaterial.trim() && !selectedFile) return;
    setIsGenerating(true);
    setGenerationProgress('Menganalisis isi materi...');
    try {
      const { aiCurriculumService } = await import('../services/aiCurriculumService');
      
      let fileData = '';
      if (selectedFile) {
        const reader = new FileReader();
        fileData = await new Promise((resolve) => {
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
          };
          reader.readAsDataURL(selectedFile);
        });
      }

      const result = await aiCurriculumService.generateCurriculum(
        aiMaterial, 
        fileData, 
        (msg) => setGenerationProgress(msg)
      );
      setGeneratedCurriculum(result);
    } catch (error) {
      setShowModal({
        type: 'alert',
        title: 'Gagal',
        message: 'Gagal membuat kurikulum: ' + (error instanceof Error ? error.message : 'Error tidak diketahui')
      });
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  const handleSaveAiCurriculum = async () => {
    if (!generatedCurriculum) return;
    
    setShowModal({
      type: 'confirm',
      title: 'Simpan Kurikulum',
      message: 'Ganti kurikulum yang ada? (Pilih "Ya" untuk Ganti Semua, "Tidak" untuk Tambahkan ke yang sudah ada)',
      onConfirm: async () => {
        try {
          const { curriculumService } = await import('../services/curriculumService');
          await curriculumService.clearCurriculum();
          await curriculumService.saveFullCurriculum(generatedCurriculum);
          setShowModal({ type: 'alert', title: 'Berhasil', message: 'Kurikulum berhasil disimpan!' });
          setGeneratedCurriculum(null);
          setAiMaterial('');
          setSelectedFile(null);
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal menyimpan kurikulum.' });
        }
      }
    });
  };

  const handleClearCurriculum = async () => {
    setShowModal({
      type: 'confirm',
      title: 'Hapus Kurikulum',
      message: 'PERINGATAN: Ini akan menghapus SEMUA kurikulum yang ada di database. Lanjutkan?',
      onConfirm: async () => {
        try {
          const { curriculumService } = await import('../services/curriculumService');
          await curriculumService.clearCurriculum();
          setShowModal({ type: 'alert', title: 'Berhasil', message: 'Kurikulum berhasil dikosongkan!' });
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal menghapus kurikulum.' });
        }
      }
    });
  };

  const handleResetGameQuestions = async () => {
    setShowModal({
      type: 'confirm',
      title: 'Reset Bank Soal Bug Hunt',
      message: 'Reset bank soal ke data default JSON? Aksi ini akan me-replace semua soal di database Anda.',
      onConfirm: async () => {
        try {
          const gameQuestionsJson = await import('../data/gameQuestions.json');
          await forceResetGameQuestions(gameQuestionsJson.default || gameQuestionsJson);
          setShowModal({ type: 'alert', title: 'Berhasil', message: 'Bank soal game berhasil disinkronisasi ke 140+ database JSON!' });
          // Refresh list by re-fetching
          const [qList, pyList] = await Promise.all([
            getGameQuestions('c', 100),
            getGameQuestions('python', 100)
          ]);
          setAllQuestions([...qList, ...pyList]);
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal mereset bank soal game.' });
        }
      }
    });
  };

  const handleResetCurriculum = async () => {
    setShowModal({
      type: 'confirm',
      title: 'Reset Kurikulum',
      message: 'Reset kurikulum ke pengaturan awal? Semua perubahan kustom akan hilang.',
      onConfirm: async () => {
        try {
          const { curriculumService } = await import('../services/curriculumService');
          const { curriculum: staticCurriculum } = await import('../data/curriculum');
          await curriculumService.clearCurriculum();
          await curriculumService.saveFullCurriculum(staticCurriculum);
          setShowModal({ type: 'alert', title: 'Berhasil', message: 'Kurikulum berhasil direset ke pengaturan awal!' });
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal mereset kurikulum.' });
        }
      }
    });
  };

  // ===== CYCLE ACCESS MODE =====
  const handleCycleAccessMode = (level: Level) => {
    const current = level.accessMode || (level.locked ? 'locked' : 'auto');
    let next: 'auto' | 'unlocked' | 'locked' = 'auto';
    if (current === 'auto') next = 'unlocked';
    else if (current === 'unlocked') next = 'locked';
    else next = 'auto';
    
    updateDraftLevel({ ...level, accessMode: next, locked: next === 'locked' });
  };

  /**
   * Helper to make textareas behave more like a code editor.
   * Supports Tab key (2 spaces) and auto-indent on Enter.
   */
  const handleCodeKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>, 
    value: string, 
    setter: (val: string) => void
  ) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      setter(newValue);
      
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
        }
      }, 0);
    }
    
    if (e.key === 'Enter') {
      const start = e.currentTarget.selectionStart;
      const valueBefore = value.substring(0, start);
      const lastLine = valueBefore.split('\n').pop() || '';
      const indentMatch = lastLine.match(/^\s*/);
      const indent = indentMatch ? indentMatch[0] : '';
      
      if (indent.length > 0) {
        e.preventDefault();
        const end = e.currentTarget.selectionEnd;
        const newValue = value.substring(0, start) + '\n' + indent + value.substring(end);
        setter(newValue);
        
        setTimeout(() => {
          if (e.currentTarget) {
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1 + indent.length;
          }
        }, 0);
      }
    }
  };

  // ===== REORDER MODULES =====
  const handleMoveModule = (levelId: string, modIdx: number, direction: 'up' | 'down') => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level || !level.modules) return;
    
    const newModules = [...level.modules];
    const targetIdx = direction === 'up' ? modIdx - 1 : modIdx + 1;
    if (targetIdx < 0 || targetIdx >= newModules.length) return;
    
    [newModules[modIdx], newModules[targetIdx]] = [newModules[targetIdx], newModules[modIdx]];
    updateDraftLevel({ ...level, modules: newModules });
  };

  // ===== REORDER LESSONS =====
  const handleMoveLesson = (levelId: string, modIdx: number, lessonIdx: number, direction: 'up' | 'down') => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level || !level.modules) return;
    
    const mod = level.modules[modIdx];
    if (!mod || !mod.lessons) return;
    
    const newLessons = [...mod.lessons];
    const targetIdx = direction === 'up' ? lessonIdx - 1 : lessonIdx + 1;
    if (targetIdx < 0 || targetIdx >= newLessons.length) return;
    
    [newLessons[lessonIdx], newLessons[targetIdx]] = [newLessons[targetIdx], newLessons[lessonIdx]];
    
    const newModules = [...level.modules];
    newModules[modIdx] = { ...mod, lessons: newLessons };
    updateDraftLevel({ ...level, modules: newModules });
  };

  // ===== DELETE MODULE =====
  const handleDeleteModule = (levelId: string, modIdx: number) => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level || !level.modules) return;
    
    const modTitle = level.modules[modIdx]?.title || 'modul';
    
    setShowModal({
      type: 'confirm',
      title: 'Hapus Modul',
      message: `Hapus modul "${modTitle}" beserta semua pelajarannya? Tindakan ini tidak bisa dibatalkan jika Anda menyimpan draft.`,
      onConfirm: () => {
        const newModules = level.modules.filter((_, i) => i !== modIdx);
        updateDraftLevel({ ...level, modules: newModules });
      }
    });
  };

  // ===== DELETE LESSON =====
  const handleDeleteLesson = (levelId: string, modIdx: number, lessonIdx: number) => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level?.modules?.[modIdx]) return;
    
    const mod = level.modules[modIdx];
    const lessonTitle = mod.lessons?.[lessonIdx]?.title || 'pelajaran';
    
    setShowModal({
      type: 'confirm',
      title: 'Hapus Pelajaran',
      message: `Hapus pelajaran "${lessonTitle}"? Tindakan ini tidak bisa dibatalkan jika Anda menyimpan draft.`,
      onConfirm: () => {
        const newLessons = mod.lessons.filter((_, i) => i !== lessonIdx);
        const newModules = [...level.modules];
        newModules[modIdx] = { ...mod, lessons: newLessons };
        updateDraftLevel({ ...level, modules: newModules });
      }
    });
  };

  // ===== EDIT LEVEL TITLE/DESCRIPTION =====
  const handleSaveLevelEdit = (levelId: string) => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level) return;
    
    updateDraftLevel({ 
      ...level, 
      title: editForm.title || level.title, 
      description: editForm.description || level.description 
    });
    setEditingLevel(null);
  };

  const handleCommitChanges = async () => {
    try {
      console.log("Committing changes to Firebase...");
      console.log("Draft Data Sample (First Level):", draftCurriculum[0]);
      
      setResetLoading(true); 
      const { curriculumService } = await import('../services/curriculumService');
      
      // Triple check sync data before saving
      const hasRules = draftCurriculum.some(l => l.modules?.some(m => m.lessons?.some(les => les.validationRules && les.validationRules.length > 0)));
      console.log("Does draft contain any validation rules?", hasRules);

      await curriculumService.saveFullCurriculum(draftCurriculum);
      setHasChanges(false);
      setShowModal({ type: 'alert', title: 'Berhasil', message: 'Semua perubahan berhasil disimpan ke database.' });
    } catch (error) {
      console.error("Commit Error:", error);
      setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal menyimpan perubahan ke database.' });
    } finally {
      setResetLoading(false);
    }
  };

  const handleDiscardChanges = () => {
    setShowModal({
      type: 'confirm',
      title: 'Batalkan Perubahan',
      message: 'Semua draf perubahan akan hilang. Lanjutkan?',
      onConfirm: () => {
        setDraftCurriculum(JSON.parse(JSON.stringify(currentCurriculum)));
        setHasChanges(false);
      }
    });
  };

  const handleSyncValidationRules = async () => {
    setShowModal({
      type: 'confirm',
      title: 'Sinkronisasi Aturan Validasi',
      message: 'Ini akan mensinkronkan aturan validasi statis dari file sistem ke database. Data materi Anda akan tetap aman. Lanjutkan?',
      onConfirm: async () => {
        try {
          console.log("Starting Sync...");
          setResetLoading(true);
          const { curriculum: staticCurriculum } = await import('../data/curriculum');
          
          let updatedCount = 0;
          const updatedCurriculum = draftCurriculum.map((level, lIdx) => {
            // Match Level: ID or Title or Index
            const staticLevel = staticCurriculum.find(sl => sl.id === level.id) || 
                               staticCurriculum.find(sl => sl.title.toLowerCase().trim() === level.title.toLowerCase().trim()) ||
                               staticCurriculum[lIdx];
            
            if (!staticLevel) return level;

            const updatedModules = level.modules?.map((mod, mIdx) => {
              // Match Module: ID or Title or Index
              const staticMod = staticLevel.modules?.find(sm => sm.id === mod.id) ||
                               staticLevel.modules?.find(sm => sm.title.toLowerCase().trim() === mod.title.toLowerCase().trim()) ||
                               staticLevel.modules?.[mIdx];
              
              if (!staticMod) return mod;

              const updatedLessons = mod.lessons?.map((lesson, lesIdx) => {
                // Match Lesson: ID or Title or Index
                const staticLesson = staticMod.lessons?.find(sl => sl.id === lesson.id) ||
                                    staticMod.lessons?.find(sl => sl.title.toLowerCase().trim() === lesson.title.toLowerCase().trim()) ||
                                    staticMod.lessons?.[lesIdx];
                
                if (!staticLesson || !staticLesson.validationRules || staticLesson.validationRules.length === 0) return lesson;

                console.log(`Matched rules for lesson: ${lesson.title}`);
                updatedCount++;
                return {
                  ...lesson,
                  validationRules: JSON.parse(JSON.stringify(staticLesson.validationRules))
                };
              });

              return { ...mod, lessons: updatedLessons };
            });

            return { ...level, modules: updatedModules };
          });

          console.log(`Sync complete. Lessons updated: ${updatedCount}`);
          setDraftCurriculum(updatedCurriculum);
          setHasChanges(true); 
          setShowModal({ 
            type: 'alert', 
            title: 'Sinkronisasi Berhasil', 
            message: `Berhasil memuat aturan validasi untuk ${updatedCount} pelajaran ke dalam Draft. Klik "Simpan ke Server" untuk menerapkannya.` 
          });
        } catch (error) {
          console.error("Sync Error:", error);
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal sinkron: ' + (error instanceof Error ? error.message : 'Error') });
        } finally {
          setResetLoading(false);
        }
      }
    });
  };

  const submitAiGeneration = async () => {
    if (!aiGenModal || !aiGenContext.trim()) return;
    setIsAiTargetGenerating(true);
    try {
      const { aiCurriculumService } = await import('../services/aiCurriculumService');
      const level = draftCurriculum.find(l => l.id === aiGenModal.levelId);
      if (!level) throw new Error("Level not found");

      if (aiGenModal.type === 'module') {
        const newModule = await aiCurriculumService.generateSingleModule(aiGenContext, level.title, aiGenModal.levelLanguage);
        const newModules = [...(level.modules || []), newModule];
        updateDraftLevel({ ...level, modules: newModules });
      } else if (aiGenModal.type === 'lesson' && typeof aiGenModal.modIdx === 'number') {
        const mod = level.modules[aiGenModal.modIdx];
        const newLesson = await aiCurriculumService.generateSingleLesson(aiGenContext, mod.title, aiGenModal.levelLanguage);
        const newLessons = [...(mod.lessons || []), newLesson];
        const newModules = [...level.modules];
        newModules[aiGenModal.modIdx] = { ...mod, lessons: newLessons };
        updateDraftLevel({ ...level, modules: newModules });
      }
      setAiGenModal(null);
      setAiGenContext('');
      setShowModal({ type: 'alert', title: 'Berhasil', message: `${aiGenModal.type === 'module' ? 'Modul' : 'Pelajaran'} baru ditambahkan ke draft.` });
    } catch (error) {
      setShowModal({ type: 'alert', title: 'Gagal', message: error instanceof Error ? error.message : 'Gagal memanggil AI.' });
    } finally {
      setIsAiTargetGenerating(false);
    }
  };

  const handleAddManualModule = (levelId: string) => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level) return;
    const newModule = {
      id: `m-${Date.now()}`,
      title: 'Modul Baru',
      lessons: []
    };
    updateDraftLevel({ ...level, modules: [...(level.modules || []), newModule] });
  };

  const handleAddManualLesson = (levelId: string, modIdx: number) => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level || !level.modules) return;
    const mod = level.modules[modIdx];
    const newLesson: Lesson = {
      id: `l-${Date.now()}`,
      title: 'Pelajaran Baru',
      explanation: 'Isi penjelasan...',
      codeExample: '',
      initialCode: '',
      solution: '',
      hint: '',
      quiz: { question: 'Soal?', options: ['A','B','C','D'], correctAnswer: 0 },
      testCases: [{ description: 'Test', expectedOutput: 'Output' }]
    };
    const newModules = [...level.modules];
    newModules[modIdx] = { ...mod, lessons: [...(mod.lessons || []), newLesson] };
    updateDraftLevel({ ...level, modules: newModules });
  };

  // ===== EDIT LESSON CONTENT =====
  const handleOpenLessonEditor = (levelId: string, modIdx: number, lessonIdx: number) => {
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level?.modules?.[modIdx]?.lessons?.[lessonIdx]) return;
    
    // Deep clone and ensure basic structure exists to avoid Crashes
    const lesson = JSON.parse(JSON.stringify(level.modules[modIdx].lessons[lessonIdx]));
    
    // Auto-repair missing fields if they are missing (e.g. from partial AI generation)
    if (!lesson.quiz) {
      lesson.quiz = { question: '', options: ['', '', '', ''], correctAnswer: 0 };
    }
    if (!Array.isArray(lesson.testCases)) lesson.testCases = [];
    if (!Array.isArray(lesson.validationRules)) lesson.validationRules = [];

    setEditingLessonInfo({ levelId, modIdx, lessonIdx });
    setLessonEditForm(lesson);
  };

  const handleSaveLessonEdit = () => {
    if (!editingLessonInfo || !lessonEditForm) return;
    const { levelId, modIdx, lessonIdx } = editingLessonInfo;
    const level = draftCurriculum.find(l => l.id === levelId);
    if (!level?.modules?.[modIdx]) return;

    const newModules = [...level.modules];
    const newLessons = [...newModules[modIdx].lessons];
    newLessons[lessonIdx] = lessonEditForm;
    newModules[modIdx] = { ...newModules[modIdx], lessons: newLessons };

    updateDraftLevel({ ...level, modules: newModules });
    setEditingLessonInfo(null);
    setLessonEditForm(null);
  };

  const handleUpdateTestCase = (idx: number, field: 'expectedOutput' | 'description' | 'input', value: string) => {
    if (!lessonEditForm) return;
    const newTestCases = [...lessonEditForm.testCases];
    newTestCases[idx] = { ...newTestCases[idx], [field]: value };
    setLessonEditForm({ ...lessonEditForm, testCases: newTestCases });
  };

  const handleAddTestCase = () => {
    if (!lessonEditForm) return;
    setLessonEditForm({
      ...lessonEditForm,
      testCases: [...lessonEditForm.testCases, { expectedOutput: '', description: '' }]
    });
  };

  const handleRemoveTestCase = (idx: number) => {
    if (!lessonEditForm) return;
    setLessonEditForm({
      ...lessonEditForm,
      testCases: lessonEditForm.testCases.filter((_, i) => i !== idx)
    });
  };

  const handleUpdateQuizOption = (idx: number, value: string) => {
    if (!lessonEditForm || !lessonEditForm.quiz) return;
    const newOptions = [...(lessonEditForm.quiz.options || ['', '', '', ''])];
    newOptions[idx] = value;
    setLessonEditForm({
      ...lessonEditForm,
      quiz: { ...lessonEditForm.quiz, options: newOptions }
    });
  };

  // ===== AI GAME QUESTION GENERATION =====
  const handleAiGameGeneration = async () => {
    if (!aiGameGenTopic.trim()) return;
    setIsAiGameGenerating(true);
    try {
      const { aiCurriculumService } = await import('../services/aiCurriculumService');
      const lang = questionFilters.language === 'all' ? 'python' : questionFilters.language;
      const result = await aiCurriculumService.generateBugHuntQuestion(aiGameGenTopic, lang, 'medium');
      
      // Open the existing editor with AI result
      setEditingQuestion({
        id: '', // New question
        language: lang,
        difficulty: 'medium',
        title: result.title,
        code: result.code,
        bugLine: result.bugLine,
        explanation: result.explanation
      });
      
      setShowAiGameGenModal(false);
      setAiGameGenTopic('');
    } catch (error) {
      setShowModal({ 
        type: 'alert', 
        title: 'Gagal', 
        message: error instanceof Error ? error.message : 'Gagal generate soal via AI.' 
      });
    } finally {
      setIsAiGameGenerating(false);
    }
  };

  // ===== ADMIN: RESET USER PROGRESS =====
  const handleResetUserProgress = async () => {
    if (!selectedUser) return;
    setShowModal({
      type: 'confirm',
      title: '⚠️ Reset Semua Progress',
      message: `PERINGATAN: Ini akan menghapus SEMUA progress dan mengeset XP ke 0 untuk ${selectedUser.nama}. Data di Supabase juga akan dihapus. Tindakan ini TIDAK BISA dibatalkan!`,
      onConfirm: async () => {
        setResetLoading(true);
        try {
          await resetUserProgress(selectedUser.nim);
          setShowModal({ type: 'alert', title: 'Berhasil', message: `Progress ${selectedUser.nama} berhasil direset.` });
          fetchUserProgress(selectedUser.nim);
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal mereset progress.' });
        } finally {
          setResetLoading(false);
        }
      }
    });
  };

  const handleResetLevelForUser = async (levelId: string, levelTitle: string) => {
    if (!selectedUser) return;
    setShowModal({
      type: 'confirm',
      title: 'Reset Level Progress',
      message: `Reset progress level "${levelTitle}" untuk ${selectedUser.nama}? XP akan dikurangi sesuai jumlah pelajaran yang dihapus.`,
      onConfirm: async () => {
        setResetLoading(true);
        try {
          await resetLevelProgress(selectedUser.nim, levelId, appCurriculum);
          setShowModal({ type: 'alert', title: 'Berhasil', message: `Level "${levelTitle}" berhasil direset.` });
          fetchUserProgress(selectedUser.nim);
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal mereset level.' });
        } finally {
          setResetLoading(false);
        }
      }
    });
  };

  const handleAdjustXp = async () => {
    if (!selectedUser || !xpAdjustValue) return;
    const newXp = parseInt(xpAdjustValue);
    if (isNaN(newXp) || newXp < 0) {
      setShowModal({ type: 'alert', title: 'Error', message: 'Masukkan angka XP yang valid (>= 0).' });
      return;
    }
    
    setShowModal({
      type: 'confirm',
      title: 'Ubah XP',
      message: `Ubah XP ${selectedUser.nama} dari ${selectedUser.xp} menjadi ${newXp}?`,
      onConfirm: async () => {
        setResetLoading(true);
        try {
          await adjustUserXp(selectedUser.nim, newXp);
          setShowModal({ type: 'alert', title: 'Berhasil', message: `XP berhasil diubah menjadi ${newXp}.` });
          setXpAdjustValue('');
        } catch (error) {
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal mengubah XP.' });
        } finally {
          setResetLoading(false);
        }
      }
    });
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    // Safety checks
    if (selectedUser.nim === currentUser?.nim) {
      setShowModal({
        type: 'alert',
        title: 'Aksi Ditolak',
        message: 'Anda tidak dapat menghapus akun Anda sendiri.',
      });
      return;
    }

    // Role-based permissions
    const targetIsAdmin = selectedUser.role === 'admin';
    const targetIsKordas = selectedUser.role === 'kordas';
    const targetIsAsisten = selectedUser.role === 'asisten';
    
    if ((targetIsAdmin || targetIsKordas || targetIsAsisten) && !isCoordinator) {
      setShowModal({
        type: 'alert',
        title: 'Aksi Ditolak',
        message: 'Hanya Koordinator yang dapat menghapus akun Admin, Kordas, atau Asisten.',
      });
      return;
    }

    if ((currentUser?.role === 'kordas' || currentUser?.role === 'asisten') && (targetIsAdmin || targetIsKordas || targetIsAsisten)) {
       setShowModal({
        type: 'alert',
        title: 'Aksi Ditolak',
        message: 'Kordas atau Asisten hanya dapat menghapus akun dengan role User.',
      });
      return;
    }

    setShowModal({
      type: 'confirm',
      title: '🗑️ Hapus Akun Peserta',
      message: `PERINGATAN: Ini akan menghapus akun ${selectedUser.nama} dan SEMUA datanya secara permanen dari sistem (Firebase & Supabase). Tindakan ini tidak dapat dibatalkan!`,
      onConfirm: async () => {
        setResetLoading(true);
        try {
          await deleteUser(selectedUser.nim);
          setShowModal({ type: 'alert', title: 'Berhasil', message: `Akun ${selectedUser.nama} telah berhasil dihapus.` });
          setSelectedUser(null);
        } catch (error) {
          console.error(error);
          setShowModal({ type: 'alert', title: 'Gagal', message: 'Gagal menghapus akun.' });
        } finally {
          setResetLoading(false);
        }
      }
    });
  };


  const handleUpdateUserAccessOverride = async (levelId: string) => {
    if (!selectedUser?.nim) return;
    try {
      setResetLoading(true);
      const overrides = selectedUser.levelAccessOverrides || {};
      const current = overrides[levelId] || 'auto';
      let next: 'auto' | 'unlocked' | 'locked' = 'auto';
      if (current === 'auto') next = 'unlocked';
      else if (current === 'unlocked') next = 'locked';
      else next = 'auto';

      const newOverrides = { ...overrides, [levelId]: next };
      const { error } = await supabase
        .from('users')
        .update({ level_access_overrides: newOverrides })
        .eq('nim', selectedUser.nim);

      if (error) throw error;
      
      const updatedUser = { ...selectedUser, levelAccessOverrides: newOverrides };
      setSelectedUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.nim === selectedUser.nim ? updatedUser : u));
    } catch (error) {
      console.error(error);
      setShowModal({ type: 'alert', title: 'Error', message: 'Gagal update akses level user' });
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin || activeTab !== 'users') return;

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('xp', { ascending: false });

      if (error) {
        console.error("Failed to load users from Supabase:", error);
        setLoading(false);
        return;
      }

      setUsers((data || []).map(u => ({
        nim: u.nim,
        nama: u.nama,
        kelas: u.kelas,
        email: u.email,
        xp: u.xp || 0,
        level: u.level || 1,
        streak: u.streak || 0,
        lastActive: u.last_active || '',
        createdAt: u.created_at || '',
        role: u.role || 'praktikan',
        levelAccessOverrides: u.level_access_overrides || {},
        assessmentAccess: u.assessment_access || {}
      })) as UserProfile[]);
      setLoading(false);
    };

    fetchUsers();

    const channel = supabase
      .channel('public:users-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, activeTab]);

  const fetchUserProgress = async (userId: string) => {
    setLoadingProgress(true);
    try {
      const { data, error } = await supabase
        .from('student_progress')
        .select('*')
        .eq('nim', userId)
        .eq('completed', true)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      const progress = (data || []).map(p => ({
        lessonId: p.lesson_id,
        completed: p.completed,
        completedAt: p.completed_at,
        score: p.score
      })) as LessonProgress[];

      setUserProgress(progress);
    } catch (error) {
      console.error("Failed to load user progress:", error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const handleToggleRole = async (targetUser: UserProfile, newRole: 'admin' | 'kordas' | 'asisten' | 'praktikan') => {
    if (targetUser.nim === currentUser?.nim) {
      setShowModal({
        type: 'alert',
        title: 'Aksi Ditolak',
        message: 'Anda tidak dapat mengubah peran akun Anda sendiri.',
      });
      return;
    }

    if (!isCoordinator && (newRole === 'admin' || targetUser.role === 'admin')) {
      setShowModal({
        type: 'alert',
        title: 'Aksi Ditolak',
        message: 'Hanya Koordinator yang dapat mengelola akun Admin.',
      });
      return;
    }

    if (!isAdmin && !isCoordinator) {
      setShowModal({
        type: 'alert',
        title: 'Aksi Ditolak',
        message: 'Anda tidak memiliki otoritas untuk mengubah peran.',
      });
      return;
    }

    setShowModal({
      type: 'confirm',
      title: 'Ubah Peran',
      message: `Ubah peran ${targetUser.nama} menjadi ${newRole}?`,
      onConfirm: async () => {
        try {
          const { error } = await supabase
            .from('users')
            .update({ role: newRole })
            .eq('nim', targetUser.nim);
          if (error) throw error;
        } catch (error) {
          console.error("Error updating user role:", error);
          setShowModal({ type: 'alert', title: 'Error', message: 'Gagal mengubah peran user' });
        }
      }
    });
  };

  const filteredUsers = users.filter(u => 
    u.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!canAccess) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-white border border-zinc-200 rounded-[3rem] shadow-xl shadow-zinc-200/50">
          <div className="w-20 h-20 bg-rose-50 text-rose-700 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">Akses Terbatas</h1>
          <p className="text-zinc-500 max-w-sm mb-8">
            Maaf, area ini hanya dapat diakses oleh Administrator atau Editor.
          </p>
          <button 
            onClick={() => setPage('dashboard')}
            className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-900/20"
          >
            Kembali ke Beranda
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{showModal.title}</h3>
                  <p className="text-zinc-500 leading-relaxed">{showModal.message}</p>
                </div>
                <div className="flex gap-3">
                  {showModal.type === 'confirm' ? (
                    <>
                      <button 
                        onClick={() => setShowModal(null)}
                        className="flex-1 py-3 bg-zinc-100 text-zinc-600 font-bold rounded-xl hover:bg-zinc-200 transition-all"
                      >
                        Batal
                      </button>
                      <button 
                        onClick={() => {
                          showModal.onConfirm?.();
                          setShowModal(null);
                        }}
                        className="flex-1 py-3 bg-rose-800 text-white font-bold rounded-xl hover:bg-rose-900 shadow-lg shadow-rose-700/20 transition-all"
                      >
                        Ya, Lanjutkan
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setShowModal(null)}
                      className="w-full py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all"
                    >
                      Tutup
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-zinc-500 mt-1">Kelola peserta, kurikulum, dan struktur kursus.</p>
          </div>
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-2xl">
            {(['users', 'structure', 'games', 'curriculum'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2.5 rounded-xl font-bold text-sm transition-all",
                  activeTab === tab ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                )}
              >
                {tab === 'users' ? 'Peserta' : tab === 'structure' ? 'Struktur' : tab === 'games' ? 'Game & Soal' : 'Kurikulum AI'}
              </button>
            ))}
          </div>
        </div>

        {/* ==================== USERS TAB ==================== */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Users List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Cari nama atau NIM peserta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 transition-all shadow-sm"
                />
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Peserta</th>
                        <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">XP</th>
                        <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Role</th>
                        <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">Memuat data peserta...</td>
                        </tr>
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((u) => (
                          <motion.tr 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={u.nim} 
                            className={cn(
                              "hover:bg-zinc-50/50 transition-colors group cursor-pointer",
                              selectedUser?.nim === u.nim && "bg-rose-50/30"
                            )}
                            onClick={() => {
                              setSelectedUser(u);
                              fetchUserProgress(u.nim);
                            }}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {u.photoURL ? (
                                  <img src={u.photoURL} alt="" className="w-10 h-10 rounded-full border border-zinc-100" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400">
                                    {u.nama?.charAt(0) || 'U'}
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-zinc-900">{u.nama}</div>
                                  <div className="text-xs text-zinc-500">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-1 font-bold text-rose-800">
                                <Trophy size={14} />
                                {u.xp.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                                u.role === 'admin' ? "bg-purple-100 text-purple-700" : "bg-zinc-100 text-zinc-600"
                              )}>
                                {u.role || 'praktikan'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <ChevronRight size={20} className={cn(
                                "transition-transform",
                                selectedUser?.nim === u.nim ? "rotate-90 text-rose-700" : "text-zinc-300"
                              )} />
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">Tidak ada peserta yang ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Details Sidebar */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {selectedUser ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm sticky top-24 space-y-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      {selectedUser.photoURL ? (
                        <img src={selectedUser.photoURL} alt="" className="w-20 h-20 rounded-full border-4 border-zinc-50 mb-4" />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center text-2xl font-bold text-zinc-400 mb-4">
                          {selectedUser.nama?.charAt(0)}
                        </div>
                      )}
                      <h2 className="text-xl font-bold">{selectedUser.nama}</h2>
                      <p className="text-zinc-500 text-sm">{selectedUser.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-50 p-3 rounded-2xl text-center">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Level</div>
                        <div className="text-lg font-bold">{selectedUser.level}</div>
                      </div>
                      <div className="bg-zinc-50 p-3 rounded-2xl text-center">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Streak</div>
                        <div className="text-lg font-bold text-amber-500 flex items-center justify-center gap-1">
                          <Zap size={16} />
                          {selectedUser.streak}
                        </div>
                      </div>
                    </div>

                    {/* Admin/Editor Actions */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Manajemen Peran</h3>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl flex-wrap animate-fade-in">
                          <button 
                            onClick={() => handleToggleRole(selectedUser, 'praktikan')}
                            disabled={selectedUser.role === 'praktikan' || (!isCoordinator && selectedUser.role === 'admin')}
                            className={cn(
                              "flex-1 py-1.5 px-2 text-[10px] font-bold rounded-lg transition-all min-w-[50px]",
                              selectedUser.role === 'praktikan' || (!selectedUser.role)
                                ? "bg-white text-zinc-900 shadow-sm" 
                                : "text-zinc-500 hover:text-zinc-900"
                            )}
                          >
                            Praktikan
                          </button>
                          <button 
                            onClick={() => handleToggleRole(selectedUser, 'asisten')}
                            disabled={selectedUser.role === 'asisten' || (!isCoordinator && selectedUser.role === 'admin')}
                            className={cn(
                              "flex-1 py-1.5 px-2 text-[10px] font-bold rounded-lg transition-all min-w-[50px]",
                              selectedUser.role === 'asisten'
                                ? "bg-emerald-600 text-white shadow-sm" 
                                : "text-zinc-500 hover:text-zinc-900"
                            )}
                          >
                            Asisten
                          </button>
                          <button 
                            onClick={() => handleToggleRole(selectedUser, 'kordas')}
                            disabled={selectedUser.role === 'kordas' || (!isCoordinator && selectedUser.role === 'admin')}
                            className={cn(
                              "flex-1 py-1.5 px-2 text-[10px] font-bold rounded-lg transition-all min-w-[50px]",
                              selectedUser.role === 'kordas'
                                ? "bg-blue-600 text-white shadow-sm" 
                                : "text-zinc-500 hover:text-zinc-900"
                            )}
                          >
                            Kordas
                          </button>
                          <button 
                            onClick={() => handleToggleRole(selectedUser, 'admin')}
                            disabled={selectedUser.role === 'admin' || !isCoordinator}
                            className={cn(
                              "flex-1 py-1.5 px-2 text-[10px] font-bold rounded-lg transition-all min-w-[50px]",
                              selectedUser.role === 'admin'
                                ? "bg-purple-600 text-white shadow-sm" 
                                : "text-zinc-500 hover:text-zinc-900",
                              !isCoordinator && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            Admin
                          </button>
                        </div>
                        {!isCoordinator && (selectedUser.role === 'admin') && (
                          <p className="text-[10px] text-zinc-400 italic px-2">Hanya Koordinator yang dapat mengelola Admin.</p>
                        )}
                      </div>

                      {/* XP Adjustment */}
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          placeholder="Set XP baru..."
                          value={xpAdjustValue}
                          onChange={(e) => setXpAdjustValue(e.target.value)}
                          className="flex-1 px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700"
                        />
                        <button
                          onClick={handleAdjustXp}
                          disabled={!xpAdjustValue || resetLoading}
                          className="px-4 py-2.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 disabled:opacity-50 transition-all text-sm flex items-center gap-1"
                        >
                          <Zap size={14} />
                          Set
                        </button>
                      </div>

                      {/* Reset Per Level */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Reset Per Level</div>
                        <div className="max-h-[120px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                          {appCurriculum.map(level => (
                            <button
                              key={level.id}
                              onClick={() => handleResetLevelForUser(level.id, level.title)}
                              disabled={resetLoading}
                              className="w-full flex items-center justify-between px-3 py-2 bg-zinc-50 hover:bg-amber-50 rounded-lg text-xs transition-colors disabled:opacity-50"
                            >
                              <span className="font-medium truncate">{level.title}</span>
                              <RotateCcw size={12} className="text-zinc-400 shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Override Akses Level (Per-User) */}
                      <div className="space-y-2 mt-4">
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Otoritas Akses Level (User Ini Saja)</div>
                        <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar pb-2">
                          {appCurriculum.map(level => {
                            const overrideState = selectedUser.levelAccessOverrides?.[level.id] || 'auto';
                            return (
                              <div key={level.id} className="flex items-center justify-between px-3 py-2 bg-zinc-50 rounded-lg text-xs">
                                <span className="font-medium truncate flex-1 pr-2">{level.title}</span>
                                <button
                                  onClick={() => handleUpdateUserAccessOverride(level.id)}
                                  disabled={resetLoading}
                                  className={cn(
                                    "px-2 py-1 rounded-md font-bold shrink-0 transition-colors flex items-center gap-1",
                                    overrideState === 'unlocked' ? "bg-green-100 text-green-700 hover:bg-green-200" :
                                    overrideState === 'locked' ? "bg-red-100 text-red-700 hover:bg-red-200" :
                                    "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"
                                  )}
                                  title="Klik untuk mengubah (Auto -> Terbuka -> Terkunci)"
                                >
                                  {overrideState === 'unlocked' && <><Unlock size={10} /> FORCE OPEN</>}
                                  {overrideState === 'locked' && <><Lock size={10} /> FORCE LOCK</>}
                                  {overrideState === 'auto' && <><CheckCircle2 size={10} /> AUTO</>}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Reset All */}
                      <button 
                        onClick={handleResetUserProgress}
                        disabled={resetLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all text-sm disabled:opacity-50"
                      >
                        {resetLoading ? <Loader2 size={16} className="animate-spin" /> : <AlertTriangle size={16} />}
                        Reset Semua Progress & XP
                      </button>

                      {/* Delete User */}
                      {(isCoordinator || isAdmin || isEditor) && (
                        <button 
                          onClick={handleDeleteUser}
                          disabled={resetLoading}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-700 font-bold rounded-xl hover:bg-rose-100 transition-all text-sm disabled:opacity-50 mt-2 border border-rose-100"
                        >
                          {resetLoading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                          Hapus Akun Peserta
                        </button>
                      )}

                    </div>

                    {/* Progress List */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Progres Pelajaran</h3>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {loadingProgress ? (
                          <div className="text-center py-4 text-zinc-400 text-sm italic">Memuat progres...</div>
                        ) : userProgress.length > 0 ? (
                          userProgress.map((p) => (
                            <div key={p.lessonId} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-rose-700" />
                                <div className="text-sm font-medium truncate max-w-[120px]">{p.lessonId}</div>
                              </div>
                              <div className="text-[10px] text-zinc-400">
                                {new Date(p.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-zinc-400 text-sm italic">Belum ada pelajaran selesai.</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-zinc-100/50 border-2 border-dashed border-zinc-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-zinc-300 mb-4 shadow-sm">
                      <Users size={32} />
                    </div>
                    <h3 className="font-bold text-zinc-400">Pilih Peserta</h3>
                    <p className="text-zinc-400 text-sm mt-1">Klik pada salah satu peserta untuk melihat detail progres dan manajemen.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ==================== STRUCTURE TAB ==================== */}
        {activeTab === 'structure' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 text-zinc-400 rounded-2xl flex items-center justify-center">
                    <GripVertical size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Kelola Struktur Kurikulum</h2>
                    <p className="text-zinc-500 text-sm">Atur urutan modul, buka/kunci level, edit judul, atau hapus konten.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleSyncValidationRules}
                    className="px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-xl hover:bg-rose-100 transition-all flex items-center gap-2 text-xs border border-rose-100"
                  >
                    <Terminal size={14} />
                    Sync Validasi Statis
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {hasChanges && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between p-4 mb-6 bg-rose-50 border border-rose-200 rounded-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <Zap size={18} className="text-rose-700" />
                      <div>
                        <div className="font-bold text-rose-900 text-sm">Ada perubahan yang belum disimpan!</div>
                        <div className="text-xs text-rose-700">Perubahan tidak akan terlihat oleh siswa sampai Anda menyimpannya.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleDiscardChanges}
                        disabled={resetLoading}
                        className="px-4 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100 rounded-xl transition-colors disabled:opacity-50"
                      >
                        Batalkan Draft
                      </button>
                      <button 
                        onClick={handleCommitChanges}
                        disabled={resetLoading}
                        className="px-4 py-2 text-sm font-bold bg-rose-700 text-white hover:bg-rose-800 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-rose-700/20"
                      >
                        {resetLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Simpan ke Server
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {draftCurriculum.length > 0 ? (
                <div className="space-y-4">
                  {draftCurriculum.map((level, lIdx) => {
                    const isExpanded = expandedLevels.has(level.id);
                    return (
                      <div key={level.id} className="border border-zinc-200 rounded-2xl overflow-hidden">
                        {/* Level Header */}
                        <div className="bg-zinc-50 px-5 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <button
                              onClick={() => {
                                const next = new Set(expandedLevels);
                                isExpanded ? next.delete(level.id) : next.add(level.id);
                                setExpandedLevels(next);
                              }}
                              className="p-1 hover:bg-zinc-200 rounded-lg transition-colors"
                            >
                              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </button>
                            
                            {editingLevel === level.id ? (
                              <div className="flex-1 flex items-center gap-2">
                                <input
                                  value={editForm.title}
                                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                                  className="flex-1 px-2 py-1 bg-white border border-zinc-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-700/20"
                                  placeholder="Judul Level"
                                />
                                <button onClick={() => handleSaveLevelEdit(level.id)} className="p-1 text-rose-700 hover:bg-rose-50 rounded-lg">
                                  <Save size={16} />
                                </button>
                                <button onClick={() => setEditingLevel(null)} className="p-1 text-zinc-400 hover:bg-zinc-100 rounded-lg">
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Level {lIdx + 1}</span>
                                  {(() => {
                                    const mode = level.accessMode || (level.locked ? 'locked' : 'auto');
                                    if (mode === 'locked') return <span className="text-[10px] items-center gap-1 font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded flex"><Lock size={12}/> TERKUNCI</span>;
                                    if (mode === 'unlocked') return <span className="text-[10px] items-center gap-1 font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex"><Unlock size={12}/> TERBUKA GLOBAL</span>;
                                    return <span className="text-[10px] items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex"><CheckCircle2 size={12}/> AUTO (PROGRES)</span>;
                                  })()}
                                </div>
                                <h4 className="font-bold truncate">{level.title}</h4>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingLevel(level.id);
                                setEditForm({ title: level.title, description: level.description });
                              }}
                              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleCycleAccessMode(level)}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors text-xs font-bold",
                                (level.accessMode || (level.locked ? 'locked' : 'auto')) === 'locked' 
                                  ? "text-red-500 hover:bg-red-50 bg-red-50/50" 
                                  : (level.accessMode === 'unlocked' ? "text-green-600 hover:bg-green-50 bg-green-50/50" : "text-blue-600 hover:bg-blue-50 bg-blue-50/50")
                              )}
                              title="Silklus Mode Akses (Auto -> Terbuka -> Terkunci)"
                            >
                              {(() => {
                                const mode = level.accessMode || (level.locked ? 'locked' : 'auto');
                                if (mode === 'locked') return <><Lock size={14} /> Terkunci</>;
                                if (mode === 'unlocked') return <><Unlock size={14} /> Terbuka</>;
                                return <><CheckCircle2 size={14} /> Auto</>;
                              })()}
                            </button>
                          </div>
                        </div>

                        {/* Expanded: Modules */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 space-y-3">
                                <div className="flex items-center justify-end gap-2 mb-2">
                                  <button onClick={() => setAiGenModal({ type: 'module', levelId: level.id, levelLanguage: level.id.includes('c-') ? 'C' : 'Python' })} className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors flex items-center gap-1">
                                    <Zap size={10} /> + Modul (AI)
                                  </button>
                                  <button onClick={() => handleAddManualModule(level.id)} className="text-[10px] font-bold px-2 py-1 bg-zinc-100 text-zinc-600 rounded hover:bg-zinc-200 transition-colors flex items-center gap-1">
                                    <Plus size={10} /> + Modul Manual
                                  </button>
                                </div>
                                {(level.modules || []).map((mod, mIdx) => {
                                  const modKey = `${level.id}:${mod.id}`;
                                  const isModExpanded = expandedModules.has(modKey);
                                  return (
                                    <div key={mod.id} className="border border-zinc-100 rounded-xl overflow-hidden">
                                      {/* Module Header */}
                                      <div className="bg-white px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <button
                                            onClick={() => {
                                              const next = new Set(expandedModules);
                                              isModExpanded ? next.delete(modKey) : next.add(modKey);
                                              setExpandedModules(next);
                                            }}
                                            className="p-1 hover:bg-zinc-100 rounded transition-colors"
                                          >
                                            {isModExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                          </button>
                                          <BookOpen size={14} className="text-zinc-400" />
                                          <span className="font-bold text-sm truncate">{mod.title}</span>
                                          <span className="text-[10px] text-zinc-400 shrink-0">({mod.lessons?.length || 0} pelajaran)</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                          <button
                                            onClick={() => handleMoveModule(level.id, mIdx, 'up')}
                                            disabled={mIdx === 0}
                                            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded disabled:opacity-30 transition-colors"
                                            title="Pindah Ke Atas"
                                          >
                                            <ChevronUp size={14} />
                                          </button>
                                          <button
                                            onClick={() => handleMoveModule(level.id, mIdx, 'down')}
                                            disabled={mIdx === (level.modules?.length || 0) - 1}
                                            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded disabled:opacity-30 transition-colors"
                                            title="Pindah Ke Bawah"
                                          >
                                            <ChevronDown size={14} />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteModule(level.id, mIdx)}
                                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Hapus Modul"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Expanded: Lessons */}
                                      <AnimatePresence>
                                        {isModExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="px-4 pb-3 space-y-1">
                                              <div className="flex items-center justify-end gap-2 mb-2">
                                                <button onClick={() => setAiGenModal({ type: 'lesson', levelId: level.id, modIdx: mIdx, levelLanguage: level.id.includes('c-') ? 'C' : 'Python' })} className="text-[10px] font-bold px-2 py-1 bg-amber-50 text-amber-600 rounded hover:bg-amber-100 transition-colors flex items-center gap-1 border border-amber-200/50">
                                                  <Zap size={10} /> + Pelajaran (AI)
                                                </button>
                                                <button onClick={() => handleAddManualLesson(level.id, mIdx)} className="text-[10px] font-bold px-2 py-1 bg-white text-zinc-500 rounded hover:bg-zinc-50 transition-colors flex items-center gap-1 border border-zinc-200">
                                                  <Plus size={10} /> + Pelajaran Manual
                                                </button>
                                              </div>
                                              {(mod.lessons || []).map((lesson, lesIdx) => (
                                                <div key={lesson.id} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg text-xs">
                                                  <div className="flex items-center gap-2 truncate">
                                                    <span className="text-zinc-400 font-mono w-5 text-center">{lesIdx + 1}</span>
                                                    <span className="font-medium truncate">{lesson.title}</span>
                                                  </div>
                                                  <div className="flex items-center gap-0.5 shrink-0">
                                                    <button
                                                      onClick={() => handleOpenLessonEditor(level.id, mIdx, lesIdx)}
                                                      className="p-1 text-zinc-400 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                                                      title="Edit Pelajaran"
                                                    >
                                                      <Edit2 size={12} />
                                                    </button>
                                                    <button
                                                      onClick={() => handleMoveLesson(level.id, mIdx, lesIdx, 'up')}
                                                      disabled={lesIdx === 0}
                                                      className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded disabled:opacity-30 transition-colors"
                                                    >
                                                      <ChevronUp size={12} />
                                                    </button>
                                                    <button
                                                      onClick={() => handleMoveLesson(level.id, mIdx, lesIdx, 'down')}
                                                      disabled={lesIdx === (mod.lessons?.length || 0) - 1}
                                                      className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded disabled:opacity-30 transition-colors"
                                                    >
                                                      <ChevronDown size={12} />
                                                    </button>
                                                    <button
                                                      onClick={() => handleDeleteLesson(level.id, mIdx, lesIdx)}
                                                      className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                    >
                                                      <Trash2 size={12} />
                                                    </button>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-400 italic">
                  Database kurikulum kosong. Buka tab "Kurikulum AI" untuk membuat kurikulum baru.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== GAMES & SOAL TAB ==================== */}
        {activeTab === 'games' && (
          <div className="space-y-8 pb-20">
            {/* Global Game Settings */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-zinc-900/20">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Kontrol Game Global</h3>
                    <p className="text-zinc-500 text-xs text-balance">Aktifkan atau matikan seluruh akses game Bug Hunt untuk semua peserta secara instan.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Status Global</span>
                    <span className={cn("text-xs font-bold", gameSettings.bugHuntActive ? "text-emerald-600" : "text-rose-600")}>
                      {gameSettings.bugHuntActive ? 'AKTIF' : 'NONAKTIF'}
                    </span>
                  </div>
                  <button 
                    onClick={async () => {
                      const next = !gameSettings.bugHuntActive;
                      await updateGameSettings({ bugHuntActive: next });
                      setGameSettings(prev => ({ ...prev, bugHuntActive: next }));
                    }}
                    className={cn(
                      "w-14 h-7 rounded-full relative transition-all duration-300",
                      gameSettings.bugHuntActive ? "bg-emerald-500 shadow-lg shadow-emerald-500/20" : "bg-zinc-300"
                    )}
                  >
                    <motion.div 
                      animate={{ x: gameSettings.bugHuntActive ? 30 : 4 }}
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md" 
                    />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} className="text-zinc-400" />
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Limit Bermain Mingguan</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="number" 
                        min="0"
                        value={gameSettings.bugHuntWeeklyLimit}
                        onChange={async (e) => {
                          const val = parseInt(e.target.value) || 0;
                          setGameSettings(prev => ({ ...prev, bugHuntWeeklyLimit: val }));
                        }}
                        onBlur={async () => {
                          await updateGameSettings({ bugHuntWeeklyLimit: gameSettings.bugHuntWeeklyLimit });
                        }}
                        className="w-24 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono font-bold text-center focus:ring-2 focus:ring-rose-700/20"
                      />
                      <span className="text-xs text-zinc-500 font-medium">kali / minggu</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 italic mt-1">*Set ke 0 untuk unlimited.</p>
                 </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Terminal size={16} className="text-zinc-400" />
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Jumlah Soal Per Sesi</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="number" 
                        min="1"
                        max="20"
                        value={gameSettings.bugHuntQuestionCount}
                        onChange={async (e) => {
                          const val = parseInt(e.target.value) || 5;
                          setGameSettings(prev => ({ ...prev, bugHuntQuestionCount: val }));
                        }}
                        onBlur={async () => {
                          await updateGameSettings({ bugHuntQuestionCount: gameSettings.bugHuntQuestionCount });
                        }}
                        className="w-24 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl font-mono font-bold text-center focus:ring-2 focus:ring-rose-700/20"
                      />
                      <span className="text-xs text-zinc-500 font-medium">soal / sesi</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 italic mt-1">*Default adalah 5 soal.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={16} className="text-zinc-400" />
                      <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Status Bahasa</label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className={cn(
                        "p-3 rounded-xl border transition-all flex items-center justify-between",
                        gameSettings.bugHuntCActive ? "bg-blue-50/30 border-blue-100" : "bg-zinc-50 border-zinc-200 opacity-60"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px]", gameSettings.bugHuntCActive ? "bg-blue-600 text-white" : "bg-zinc-200 text-zinc-500")}>C</div>
                          <span className="text-xs font-bold">Bahasa C</span>
                        </div>
                        <button 
                          onClick={async () => {
                            const next = !gameSettings.bugHuntCActive;
                            await updateGameSettings({ bugHuntCActive: next });
                            setGameSettings(prev => ({ ...prev, bugHuntCActive: next }));
                          }}
                          className={cn(
                            "w-10 h-5 rounded-full relative transition-colors",
                            gameSettings.bugHuntCActive ? "bg-blue-600" : "bg-zinc-300"
                          )}
                        >
                          <motion.div 
                            animate={{ x: gameSettings.bugHuntCActive ? 22 : 3 }}
                            className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" 
                          />
                        </button>
                      </div>

                      <div className={cn(
                        "p-3 rounded-xl border transition-all flex items-center justify-between",
                        gameSettings.bugHuntPythonActive ? "bg-rose-50/30 border-rose-100" : "bg-zinc-50 border-zinc-200 opacity-60"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px]", gameSettings.bugHuntPythonActive ? "bg-rose-600 text-white" : "bg-zinc-200 text-zinc-500")}>Py</div>
                          <span className="text-xs font-bold">Python</span>
                        </div>
                        <button 
                          onClick={async () => {
                            const next = !gameSettings.bugHuntPythonActive;
                            await updateGameSettings({ bugHuntPythonActive: next });
                            setGameSettings(prev => ({ ...prev, bugHuntPythonActive: next }));
                          }}
                          className={cn(
                            "w-10 h-5 rounded-full relative transition-colors",
                            gameSettings.bugHuntPythonActive ? "bg-rose-600" : "bg-zinc-300"
                          )}
                        >
                          <motion.div 
                            animate={{ x: gameSettings.bugHuntPythonActive ? 22 : 3 }}
                            className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Question Manager */}
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">Bank Soal Bug Hunt</h3>
                  <p className="text-zinc-500 text-xs">Total {allQuestions.length} soal terdaftar.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetGameQuestions}
                    className="flex-1 bg-rose-50 border border-rose-100 text-rose-600 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-100 transition shadow-sm"
                    title="Otomatis Tarik 140+ Soal via File JSON lokal ke Firebase Game"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Ke Default
                  </button>
                  <select 
                    value={questionFilters.language}
                    onChange={(e) => setQuestionFilters({ language: e.target.value as any })}
                    className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-700/20"
                  >
                    <option value="all">Semua Bahasa</option>
                    <option value="c">Bahasa C</option>
                    <option value="python">Python</option>
                  </select>
                  <button 
                    onClick={() => setShowAiGameGenModal(true)}
                    className="bg-amber-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
                  >
                    <Sparkles size={16} /> Generate AI
                  </button>
                  <button 
                    onClick={() => {
                      setEditingQuestion({
                        id: '', 
                        language: questionFilters.language === 'all' ? 'python' : questionFilters.language, 
                        difficulty: 'easy', 
                        title: 'Soal Baru', 
                        code: '', 
                        bugLine: 0, 
                        explanation: ''
                      });
                    }}
                    className="bg-zinc-900 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-800 transition-all active:scale-95"
                  >
                    <Plus size={16} /> Tambah Soal
                  </button>
                </div>
              </div>

              <div className="divide-y divide-zinc-100 overflow-x-auto">
                {loadingGameData ? (
                  <div className="p-12 text-center text-zinc-400">Memuat bank soal...</div>
                ) : allQuestions.filter(q => questionFilters.language === 'all' || q.language === questionFilters.language).length > 0 ? (
                  allQuestions
                    .filter(q => questionFilters.language === 'all' || q.language === questionFilters.language)
                    .map((q) => (
                      <div key={q.id} className="p-4 hover:bg-zinc-50 transition-colors flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0",
                            q.language === 'c' ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"
                          )}>
                            {q.language === 'c' ? 'C' : 'Py'}
                          </div>
                          <div className="truncate">
                            <h4 className="font-bold text-sm truncate">{q.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                                q.difficulty === 'easy' ? "bg-emerald-100 text-emerald-700" : 
                                q.difficulty === 'medium' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                              )}>
                                {q.difficulty}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono">Bug @ line {q.bugLine + 1}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => setEditingQuestion(q)}
                            className="p-2 text-zinc-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => {
                              setShowModal({
                                type: 'confirm',
                                title: 'Hapus Soal',
                                message: `Apakah Anda yakin ingin menghapus soal "${q.title}"?`,
                                onConfirm: async () => {
                                  await deleteGameQuestion(q.id);
                                  setAllQuestions(prev => prev.filter(item => item.id !== q.id));
                                }
                              });
                            }}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-12 text-center text-zinc-400 italic">Belum ada soal untuk filter ini.</div>
                )}
              </div>
            </div>

            {/* Question Editor Modal */}
            <AnimatePresence>
              {editingQuestion && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                  >
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                      <div>
                        <h3 className="text-xl font-bold">{editingQuestion.id ? 'Edit Soal' : 'Tambah Soal Baru'}</h3>
                        <p className="text-zinc-500 text-xs">Konfigurasi materi untuk tantangan Bug Hunt.</p>
                      </div>
                      <button onClick={() => setEditingQuestion(null)} className="p-2 bg-white text-zinc-400 hover:text-zinc-600 rounded-full border border-zinc-200">
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Bahasa</label>
                          <select 
                            value={editingQuestion.language}
                            onChange={(e) => setEditingQuestion({ ...editingQuestion, language: e.target.value as any })}
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-bold focus:ring-2 focus:ring-rose-700/20"
                          >
                            <option value="c">Bahasa C</option>
                            <option value="python">Python</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Kesulitan</label>
                          <select 
                            value={editingQuestion.difficulty}
                            onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: e.target.value as any })}
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl font-bold focus:ring-2 focus:ring-rose-700/20"
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Judul Soal</label>
                        <input 
                          type="text" 
                          value={editingQuestion.title}
                          onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                          placeholder="Contoh: Kesalahan Tipu Data"
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-700/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Snippet Kode (Buggy)</label>
                          <span className="text-[10px] text-zinc-400 italic">Gunakan baris baru untuk setiap kode</span>
                        </div>
                        <textarea 
                          rows={6}
                          value={editingQuestion.code}
                          onChange={(e) => setEditingQuestion({ ...editingQuestion, code: e.target.value })}
                          onKeyDown={(e) => handleCodeKeyDown(e, editingQuestion.code, (val) => setEditingQuestion({ ...editingQuestion, code: val }))}
                          placeholder="Tulis kode di sini..."
                          className="w-full px-4 py-3 bg-zinc-900 text-emerald-400 font-mono text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-700/20"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Index Baris Bug (Mulai dari 0)</label>
                          <input 
                            type="number" 
                            value={editingQuestion.bugLine}
                            onChange={(e) => setEditingQuestion({ ...editingQuestion, bugLine: parseInt(e.target.value) })}
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-700/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Preview Baris Salah</label>
                          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-mono truncate">
                            {editingQuestion.code.replace(/\\n/g, '\n').split('\n')[editingQuestion.bugLine] || '(Baris tidak valid)'}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Penjelasan Bug</label>
                        <textarea 
                          rows={3}
                          value={editingQuestion.explanation}
                          onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                          placeholder="Jelaskan mengapa kode ini salah..."
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-700/20"
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
                      <button 
                        onClick={() => setEditingQuestion(null)}
                        className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-600 font-bold rounded-xl hover:bg-zinc-100 transition-all"
                      >
                        Batal
                      </button>
                      <button 
                        onClick={async () => {
                          setLoadingGameData(true);
                          try {
                            if (editingQuestion.id) {
                              await updateGameQuestion(editingQuestion.id, editingQuestion);
                              setAllQuestions(prev => prev.map(q => q.id === editingQuestion.id ? editingQuestion : q));
                            } else {
                              const newId = await addGameQuestion(editingQuestion);
                              setAllQuestions(prev => [...prev, { ...editingQuestion, id: newId }]);
                            }
                            setEditingQuestion(null);
                          } catch (e) {
                            console.error(e);
                          } finally {
                            setLoadingGameData(false);
                          }
                        }}
                        className="flex-1 py-3 bg-rose-700 text-white font-bold rounded-xl hover:bg-rose-800 shadow-lg shadow-rose-700/20 transition-all"
                      >
                        Simpan Materi
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== CURRICULUM AI TAB ==================== */}
        {activeTab === 'curriculum' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Preview Kurikulum Saat Ini */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 text-zinc-400 rounded-2xl flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Kurikulum Saat Ini</h2>
                    <p className="text-zinc-500 text-sm">{currentCurriculum.length} Level terdaftar di database.</p>
                  </div>
                </div>
              </div>

              {currentCurriculum.length > 0 ? (
                <div className="space-y-4">
                  {currentCurriculum.map((level, idx) => (
                    <div key={level.id} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Level {idx + 1}</span>
                          {level.locked && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <Lock size={10} /> Terkunci
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-zinc-300">{level.id}</span>
                      </div>
                      <h4 className="font-bold">{level.title}</h4>
                      <div className="mt-2 flex gap-4 text-xs text-zinc-500">
                        <span>{level.modules?.length || 0} Modul</span>
                        <span>{level.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0} Pelajaran</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-400 italic">
                  Database kurikulum kosong. Gunakan AI untuk membuat kurikulum baru.
                </div>
              )}
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-rose-50 text-rose-800 rounded-2xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Generate Kurikulum dengan AI</h2>
                  <p className="text-zinc-500 text-sm">Tempelkan materi Anda di bawah ini, dan AI akan menyusun kurikulum lengkap.</p>
                </div>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-700 shadow-sm border border-zinc-100">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Pilih Model AI</div>
                    <div className="text-sm font-black">{useStore.getState().selectedModel === 'gemini-3-flash-preview' ? 'Gemini 3 Flash (Terbaru)' : 'Gemini 2.5 Flash'}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 bg-white p-1 rounded-xl border border-zinc-200">
                  <button 
                    onClick={() => useStore.getState().setSelectedModel('gemini-3-flash-preview')}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                      useStore.getState().selectedModel === 'gemini-3-flash-preview' 
                        ? "bg-rose-700 text-white shadow-md shadow-rose-700/20" 
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    )}
                  >
                    Gemini 3 Flash
                  </button>
                  <button 
                    onClick={() => useStore.getState().setSelectedModel('gemini-2.5-flash')}
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                      useStore.getState().selectedModel === 'gemini-2.5-flash' 
                        ? "bg-rose-700 text-white shadow-md shadow-rose-700/20" 
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    )}
                  >
                    Gemini 2.5 Flash
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4 mb-4">
                <button 
                  onClick={handleClearCurriculum}
                  className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Shield size={14} />
                  Hapus Semua Kurikulum
                </button>
                <button 
                  onClick={handleResetCurriculum}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-600 flex items-center gap-1 transition-colors"
                >
                  <Clock size={14} />
                  Reset ke Default
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Materi Teks</label>
                  <textarea 
                    value={aiMaterial}
                    onChange={(e) => setAiMaterial(e.target.value)}
                    placeholder="Tempelkan materi pelajaran di sini (teks, outline, atau penjelasan detail)..."
                    className="w-full h-48 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 transition-all resize-none font-sans text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Unggah File PDF (Opsional)</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={cn(
                      "w-full p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all",
                      selectedFile 
                        ? "border-rose-700 bg-rose-50/30" 
                        : "border-zinc-200 bg-zinc-50 group-hover:border-zinc-300 group-hover:bg-zinc-100/50"
                    )}>
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center mb-1 shadow-sm",
                        selectedFile ? "bg-rose-700 text-white" : "bg-white text-zinc-400"
                      )}>
                        <Zap size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-zinc-900">
                          {selectedFile ? selectedFile.name : "Klik atau seret file PDF di sini"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "AI akan membaca isi PDF untuk menyusun kurikulum."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerateAi}
                  disabled={isGenerating || (!aiMaterial.trim() && !selectedFile)}
                  className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {generationProgress || 'AI sedang menyusun kurikulum...'}
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Kurikulum
                    </>
                  )}
                </button>
              </div>
            </div>

            {generatedCurriculum && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Hasil Generasi AI</h3>
                  <button 
                    onClick={handleSaveAiCurriculum}
                    className="px-6 py-2 bg-rose-800 text-white font-bold rounded-xl hover:bg-rose-900 shadow-lg shadow-rose-700/20 transition-all"
                  >
                    Simpan Kurikulum
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedCurriculum.map((level) => (
                    <div key={level.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                      <div className="text-xs font-bold text-rose-800 uppercase tracking-widest mb-1">{level.id}</div>
                      <h4 className="font-bold text-lg mb-2">{level.title}</h4>
                      <p className="text-zinc-500 text-sm mb-4">{level.description}</p>
                      <div className="space-y-2">
                        {level.modules?.map(m => (
                          <div key={m.id} className="flex items-center gap-2 text-xs text-zinc-400">
                            <ChevronRight size={12} />
                            <span>{m.title} ({m.lessons?.length || 0} Pelajaran)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
        {/* ==================== LESSON EDITOR MODAL ==================== */}
        <AnimatePresence>
          {editingLessonInfo && lessonEditForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-100 shrink-0">
                  <div>
                    <h3 className="text-xl font-bold">Edit Pelajaran</h3>
                    <p className="text-sm text-zinc-400">ID: {lessonEditForm.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveLessonEdit}
                      disabled={savingLesson}
                      className="flex items-center gap-2 px-5 py-2.5 bg-rose-700 text-white font-bold rounded-xl hover:bg-rose-800 disabled:opacity-50 transition-all text-sm shadow-lg shadow-rose-700/20"
                    >
                      {savingLesson ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Simpan
                    </button>
                    <button
                      onClick={() => { setEditingLessonInfo(null); setLessonEditForm(null); }}
                      className="p-2.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-xl transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Judul Pelajaran</label>
                    <input
                      value={lessonEditForm.title}
                      onChange={e => setLessonEditForm({ ...lessonEditForm, title: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 transition-all"
                    />
                  </div>

                  {/* Explanation */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Materi Penjelasan (Markdown)</label>
                    <textarea
                      value={lessonEditForm.explanation}
                      onChange={e => setLessonEditForm({ ...lessonEditForm, explanation: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 transition-all resize-y"
                    />
                  </div>

                  {/* Code Example & Initial Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Contoh Kode</label>
                      <textarea
                        value={lessonEditForm.codeExample}
                        onChange={e => setLessonEditForm({ ...lessonEditForm, codeExample: e.target.value })}
                        onKeyDown={(e) => handleCodeKeyDown(e, lessonEditForm.codeExample || '', (val) => setLessonEditForm({ ...lessonEditForm, codeExample: val }))}
                        rows={5}
                        className="w-full px-4 py-3 bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-700/20 transition-all resize-y"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Kode Awal (Initial)</label>
                      <textarea
                        value={lessonEditForm.initialCode}
                        onChange={e => setLessonEditForm({ ...lessonEditForm, initialCode: e.target.value })}
                        onKeyDown={(e) => handleCodeKeyDown(e, lessonEditForm.initialCode || '', (val) => setLessonEditForm({ ...lessonEditForm, initialCode: val }))}
                        rows={5}
                        className="w-full px-4 py-3 bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-700/20 transition-all resize-y"
                      />
                    </div>
                  </div>

                  {/* Solution & Hint */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Solusi (Referensi)</label>
                      <textarea
                        value={lessonEditForm.solution}
                        onChange={e => setLessonEditForm({ ...lessonEditForm, solution: e.target.value })}
                        onKeyDown={(e) => handleCodeKeyDown(e, lessonEditForm.solution || '', (val) => setLessonEditForm({ ...lessonEditForm, solution: val }))}
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-700/20 transition-all resize-y"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Petunjuk (Hint)</label>
                      <textarea
                        value={lessonEditForm.hint}
                        onChange={e => setLessonEditForm({ ...lessonEditForm, hint: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:border-rose-700 transition-all resize-y"
                      />
                    </div>
                  </div>

                  {/* Quiz Section */}
                  <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-amber-600" />
                      <h4 className="font-bold text-amber-900">Soal Kuis</h4>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pertanyaan</label>
                      <input
                        value={lessonEditForm.quiz?.question || ''}
                        onChange={e => setLessonEditForm({
                          ...lessonEditForm,
                          quiz: { ...(lessonEditForm.quiz || { question: '', options: ['', '', '', ''], correctAnswer: 0 }), question: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pilihan Jawaban</label>
                      {(lessonEditForm.quiz?.options || ['', '', '', '']).map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-3">
                          <button
                            onClick={() => setLessonEditForm({
                              ...lessonEditForm,
                              quiz: { ...(lessonEditForm.quiz || { question: '', options: ['', '', '', ''], correctAnswer: 0 }), correctAnswer: oIdx }
                            })}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all",
                              lessonEditForm.quiz?.correctAnswer === oIdx
                                ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                            )}
                            title={lessonEditForm.quiz?.correctAnswer === oIdx ? 'Jawaban Benar' : 'Klik untuk jadikan jawaban benar'}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </button>
                          <input
                            value={opt}
                            onChange={e => handleUpdateQuizOption(oIdx, e.target.value)}
                            className={cn(
                              "flex-1 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all",
                              lessonEditForm.quiz?.correctAnswer === oIdx
                                ? "bg-green-50 border-green-300 focus:ring-green-500/20 focus:border-green-500"
                                : "bg-white border-zinc-200 focus:ring-amber-500/20 focus:border-amber-500"
                            )}
                            placeholder={`Pilihan ${String.fromCharCode(65 + oIdx)}`}
                          />
                          {lessonEditForm.quiz?.correctAnswer === oIdx && (
                            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg uppercase tracking-wider shrink-0">Benar</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Validation Rules (Static Checks) */}
                  <div className="bg-rose-50/50 border border-rose-200/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal size={18} className="text-rose-700" />
                        <h4 className="font-bold text-rose-900">Validasi Kode Statis (Non-AI)</h4>
                      </div>
                      <button 
                        onClick={() => {
                          const rules = [...(lessonEditForm.validationRules || [])];
                          rules.push({ pattern: '', message: '', shouldExist: true });
                          setLessonEditForm({ ...lessonEditForm, validationRules: rules });
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 text-rose-700 text-[10px] font-bold rounded-lg hover:bg-rose-100 transition-all"
                      >
                        <Plus size={12} /> Tambah Aturan
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(!lessonEditForm.validationRules || lessonEditForm.validationRules.length === 0) ? (
                        <div className="text-center py-4 text-rose-300 text-xs italic">Belum ada aturan validasi statis.</div>
                      ) : (
                        lessonEditForm.validationRules.map((rule, rIdx) => (
                          <div key={rIdx} className="bg-white/60 p-4 rounded-xl border border-rose-100 space-y-3 relative group/rule">
                            <button 
                              onClick={() => {
                                const rules = lessonEditForm.validationRules?.filter((_, i) => i !== rIdx);
                                setLessonEditForm({ ...lessonEditForm, validationRules: rules });
                              }}
                              className="absolute top-2 right-2 p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover/rule:opacity-100 transition-all"
                            >
                              <X size={14} />
                            </button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Regex Pattern</label>
                                <input
                                  value={rule.pattern}
                                  onChange={e => {
                                    const rules = [...(lessonEditForm.validationRules || [])];
                                    rules[rIdx].pattern = e.target.value;
                                    setLessonEditForm({ ...lessonEditForm, validationRules: rules });
                                  }}
                                  placeholder="Contoh: for.*range"
                                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs font-mono focus:ring-1 focus:ring-rose-700"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pesan Error</label>
                                <input
                                  value={rule.message}
                                  onChange={e => {
                                    const rules = [...(lessonEditForm.validationRules || [])];
                                    rules[rIdx].message = e.target.value;
                                    setLessonEditForm({ ...lessonEditForm, validationRules: rules });
                                  }}
                                  placeholder="Contoh: Gunakan for loop!"
                                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:ring-1 focus:ring-rose-700"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  const rules = [...(lessonEditForm.validationRules || [])];
                                  rules[rIdx].shouldExist = !rules[rIdx].shouldExist;
                                  setLessonEditForm({ ...lessonEditForm, validationRules: rules });
                                }}
                                className={cn(
                                  "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5",
                                  rule.shouldExist 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-red-100 text-red-700"
                                )}
                              >
                                {rule.shouldExist ? <CheckCircle2 size={12} /> : <X size={12} />}
                                {rule.shouldExist ? 'Wajib Ada (Include)' : 'Dilarang Ada (Exclude)'}
                              </button>
                              <span className="text-[10px] text-zinc-400 italic">Klik untuk mengubah mode validasi.</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Test Cases */}
                  <div className="bg-blue-50/50 border border-blue-200/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-blue-600" />
                        <h4 className="font-bold text-blue-900">Test Cases (Validasi Output)</h4>
                      </div>
                      <button
                        onClick={handleAddTestCase}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={12} />
                        Tambah
                      </button>
                    </div>

                    {lessonEditForm.testCases.map((tc, tcIdx) => (
                      <div key={tcIdx} className="bg-white border border-blue-200/50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Test Case #{tcIdx + 1}</span>
                          {lessonEditForm.testCases.length > 1 && (
                            <button
                              onClick={() => handleRemoveTestCase(tcIdx)}
                              className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Deskripsi Tugas</label>
                          <input
                            value={tc.description}
                            onChange={e => handleUpdateTestCase(tcIdx, 'description', e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="Deskripsi tugas..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Expected Output</label>
                            <textarea
                              value={tc.expectedOutput}
                              onChange={e => handleUpdateTestCase(tcIdx, 'expectedOutput', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                              placeholder="Output yang diharapkan..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Input (Opsional)</label>
                            <textarea
                              value={tc.input || ''}
                              onChange={e => handleUpdateTestCase(tcIdx, 'input', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y"
                              placeholder="Input opsional..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* AI GAME QUESTION GEN MODAL */}
        <AnimatePresence>
          {showAiGameGenModal && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative border border-zinc-100"
              >
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-black mb-3">
                  Generate Soal {questionFilters.language === 'all' ? 'Python' : (questionFilters.language === 'c' ? 'Bahasa C' : 'Python')}
                </h3>
                <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
                  Masukkan topik spesifik (misal: "Pointers", "Recursion", "Loops") agar AI membuatkan soal Bug Hunt yang menantang.
                </p>
                <div className="space-y-4 mb-8">
                  <label className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] px-1">Topik Tantangan</label>
                  <textarea
                    value={aiGameGenTopic}
                    onChange={e => setAiGameGenTopic(e.target.value)}
                    placeholder="Contoh: Array 2 Dimensi dan Nested Loops..."
                    rows={3}
                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 transition-all resize-none"
                    autoFocus
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAiGameGeneration}
                    disabled={!aiGameGenTopic.trim() || isAiGameGenerating}
                    className="w-full py-4 bg-amber-500 text-white rounded-2xl font-black hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/30 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    {isAiGameGenerating ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} />}
                    {isAiGameGenerating ? 'Sedang Merancang Soal...' : 'Buat Soal Sekarang'}
                  </button>
                  <button
                    onClick={() => { setShowAiGameGenModal(false); setAiGameGenTopic(''); }}
                    disabled={isAiGameGenerating}
                    className="w-full py-4 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-50"
                  >
                    Batal
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* AI GEN MODAL */}
        <AnimatePresence>
          {aiGenModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
              >
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Generate {aiGenModal.type === 'module' ? 'Modul' : 'Pelajaran'} via AI
                </h3>
                <p className="text-sm text-zinc-500 mb-6">
                  Masukkan topik spesifik, materi, atau instruksi untuk generasi {aiGenModal.type === 'module' ? 'modul' : 'pelajaran'} baru di Level ini.
                </p>
                <textarea
                  value={aiGenContext}
                  onChange={e => setAiGenContext(e.target.value)}
                  placeholder="Contoh: Buatkan soal tentang perulangan For khusus untuk analisis data..."
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none mb-6"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => { setAiGenModal(null); setAiGenContext(''); }}
                    disabled={isAiTargetGenerating}
                    className="px-5 py-2.5 text-sm font-bold text-zinc-500 hover:text-zinc-700 transition-colors disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={submitAiGeneration}
                    disabled={!aiGenContext.trim() || isAiTargetGenerating}
                    className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isAiTargetGenerating ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                    {isAiTargetGenerating ? 'Memproses...' : 'Generate Sekarang'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
};

const ShieldCheck: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
