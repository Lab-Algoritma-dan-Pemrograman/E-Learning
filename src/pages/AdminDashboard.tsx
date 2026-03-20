import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { Users, Trophy, Zap, Clock, ChevronRight, Search, Shield, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const isAdmin = currentUser?.role === 'admin' || currentUser?.email?.toLowerCase() === 'a.faqodkurnia@gmail.com';

  useEffect(() => {
    if (!isAdmin) return;

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
    if (!window.confirm(`Ubah peran ${targetUser.displayName} menjadi ${newRole}?`)) return;

    try {
      await updateDoc(doc(db, 'users', targetUser.uid), {
        role: newRole
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${targetUser.uid}`);
    }
  };

  const filteredUsers = users.filter(u => 
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Peserta</h1>
            <p className="text-zinc-500 mt-1">Pantau progres dan aktivitas seluruh peserta kursus.</p>
          </div>
          <div className="flex items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Peserta</div>
                <div className="text-lg font-bold">{users.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari nama atau email peserta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
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
                          key={u.uid} 
                          className={cn(
                            "hover:bg-zinc-50/50 transition-colors group cursor-pointer",
                            selectedUser?.uid === u.uid && "bg-emerald-50/30"
                          )}
                          onClick={() => {
                            setSelectedUser(u);
                            fetchUserProgress(u.uid);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {u.photoURL ? (
                                <img src={u.photoURL} alt="" className="w-10 h-10 rounded-full border border-zinc-100" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400">
                                  {u.displayName?.charAt(0) || 'U'}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-zinc-900">{u.displayName}</div>
                                <div className="text-xs text-zinc-500">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1 font-bold text-emerald-600">
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
                              selectedUser?.uid === u.uid ? "rotate-90 text-emerald-500" : "text-zinc-300"
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
                        {selectedUser.displayName?.charAt(0)}
                      </div>
                    )}
                    <h2 className="text-xl font-bold">{selectedUser.displayName}</h2>
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
                              <CheckCircle2 size={16} className="text-emerald-500" />
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
