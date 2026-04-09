import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { Users, Trophy, Zap, Clock, ChevronRight, Search, Shield, User as UserIcon, CheckCircle2, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Level } from '../data/curriculum';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string;
  score?: number;
}

export const AdminDashboard: React.FC = () => {
  const { user: currentUser } = useStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userProgress, setUserProgress] = useState<LessonProgress[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(false);

  const [activeTab, setActiveTab] = useState<'users' | 'curriculum'>('users');
  const [aiMaterial, setAiMaterial] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCurriculum, setGeneratedCurriculum] = useState<Level[] | null>(null);

  const [currentCurriculum, setCurrentCurriculum] = useState<Level[]>([]);
  const [showModal, setShowModal] = useState<{
    type: 'confirm' | 'alert';
    title: string;
    message: string;
    onConfirm?: () => void;
  } | null>(null);

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return;
    
    let unsubscribe: () => void;
    
    import('../services/curriculumService').then(m => {
      unsubscribe = m.curriculumService.subscribeToCurriculum(setCurrentCurriculum);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isAdmin]);

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

      const result = await aiCurriculumService.generateCurriculum(aiMaterial, fileData);
      setGeneratedCurriculum(result);
    } catch (error) {
      setShowModal({
        type: 'alert',
        title: 'Gagal',
        message: 'Gagal membuat kurikulum: ' + (error instanceof Error ? error.message : 'Error tidak diketahui')
      });
    } finally {
      setIsGenerating(false);
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

  useEffect(() => {
    if (!isAdmin || activeTab !== 'users') return;

    const q = query(collection(db, 'users'), orderBy('xp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => doc.data() as UserProfile);
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const fetchUserProgress = async (userId: string) => {
    setLoadingProgress(true);
    try {
      const q = query(collection(db, 'users', userId, 'progress'), orderBy('completedAt', 'desc'));
      const snapshot = await getDocs(q);
      const progress = snapshot.docs.map(doc => doc.data() as LessonProgress);
      setUserProgress(progress);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `users/${userId}/progress`);
    } finally {
      setLoadingProgress(false);
    }
  };

  const handleToggleRole = async (targetUser: UserProfile) => {
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    setShowModal({
      type: 'confirm',
      title: 'Ubah Peran',
      message: `Ubah peran ${targetUser.nama} menjadi ${newRole}?`,
      onConfirm: async () => {
        try {
          await updateDoc(doc(db, 'users', targetUser.nim), {
            role: newRole
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${targetUser.nim}`);
        }
      }
    });
  };

  const filteredUsers = users.filter(u => 
    u.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold">Akses Ditolak</h1>
          <p className="text-zinc-500 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
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
            <p className="text-zinc-500 mt-1">Kelola peserta dan kurikulum kursus.</p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('users')}
              className={cn(
                "px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                activeTab === 'users' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              Peserta
            </button>
            <button 
              onClick={() => setActiveTab('curriculum')}
              className={cn(
                "px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                activeTab === 'curriculum' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              Kurikulum AI
            </button>
          </div>
        </div>

        {activeTab === 'users' ? (
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
                                {u.role || 'user'}
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
                    className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm sticky top-24"
                  >
                    <div className="flex flex-col items-center text-center mb-6">
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

                    <div className="grid grid-cols-2 gap-4 mb-6">
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

                    <div className="space-y-4 mb-8">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Aksi Admin</h3>
                      <button 
                        onClick={() => handleToggleRole(selectedUser)}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
                          selectedUser.role === 'admin' 
                            ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200" 
                            : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20"
                        )}
                      >
                        {selectedUser.role === 'admin' ? (
                          <>
                            <UserIcon size={18} />
                            Jadikan User Biasa
                          </>
                        ) : (
                          <>
                            <Shield size={18} />
                            Jadikan Admin
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Progres Pelajaran</h3>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
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
        ) : (
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
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Level {idx + 1}</span>
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
                      AI sedang menyusun kurikulum...
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
