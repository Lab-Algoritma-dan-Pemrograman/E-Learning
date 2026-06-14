import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Menu, X, BookOpen, LayoutDashboard, Terminal, Trophy, LogOut, ShieldCheck, Users, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { clearToken } from '../services/tokenService';
import { AchievementPopup } from './AchievementPopup';
import { LevelUpPopup } from './LevelUpPopup';
import { supabase } from '../lib/supabase';


export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    isSidebarOpen, 
    toggleSidebar, 
    user, 
    page, 
    setPage, 
    unlockedAchievement, 
    shiftAchievement, 
    levelUpNotification, 
    setLevelUpNotification 
  } = useStore();




  const isAdminOrKordas = user?.role === 'admin' || user?.role === 'kordas';
  const isStaff = isAdminOrKordas || user?.role === 'asisten';

  const handleLogout = async () => {
    try {
      clearToken();
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Study time tracking & active tab lock
  const tabId = useRef(Math.random().toString(36).substring(2));
  const lastSyncTime = useRef(Date.now());
  const localStudyTimeAccumulator = useRef(0);

  useEffect(() => {
    if (!user?.nim) return;

    // 1. Setup multi-tab active tracking
    const updateActiveTab = () => {
      const activeTab = localStorage.getItem('study_time_active_tab');
      const activeTimeStr = localStorage.getItem('study_time_active_tab_timestamp');
      const activeTime = activeTimeStr ? parseInt(activeTimeStr, 10) : 0;
      
      const isThisTabActive = !activeTab || activeTab === tabId.current || (Date.now() - activeTime > 4000);
      
      if (isThisTabActive) {
        localStorage.setItem('study_time_active_tab', tabId.current);
        localStorage.setItem('study_time_active_tab_timestamp', Date.now().toString());
      }
    };

    updateActiveTab();

    // 2. Setup 1-second interval to increment study time
    const tickInterval = setInterval(async () => {
      updateActiveTab();

      const activeTab = localStorage.getItem('study_time_active_tab');
      const isThisTabActive = activeTab === tabId.current;

      if (isThisTabActive) {
        // Only track study time if currently on the 'courses' or 'lesson' pages
        if (page === 'courses' || page === 'lesson') {
          localStudyTimeAccumulator.current += 1;

          // Increment store optimistically
          const currentUser = useStore.getState().user;
          if (currentUser && currentUser.nim === user.nim) {
            useStore.getState().setUser({
              ...currentUser,
              studyTime: (currentUser.studyTime || 0) + 1
            });
          }
        }

        // 3. Sync to Supabase every 30 seconds
        const timeSinceLastSync = Date.now() - lastSyncTime.current;
        if (timeSinceLastSync >= 30000 && localStudyTimeAccumulator.current > 0) {
          await syncStudyTimeToDatabase();
        }
      }
    }, 1000);

    const syncStudyTimeToDatabase = async () => {
      const secondsToSync = localStudyTimeAccumulator.current;
      if (secondsToSync <= 0) return;

      try {
        const { data: dbUser } = await supabase
          .from('users')
          .select('study_time')
          .eq('nim', user.nim)
          .single();

        const currentDbTime = dbUser?.study_time || 0;
        const newDbTime = currentDbTime + secondsToSync;

        const { error } = await supabase
          .from('users')
          .update({ study_time: newDbTime })
          .eq('nim', user.nim);

        if (!error) {
          localStudyTimeAccumulator.current = 0;
          lastSyncTime.current = Date.now();
          
          // Re-sync store with actual DB total
          const currentUser = useStore.getState().user;
          if (currentUser && currentUser.nim === user.nim) {
            useStore.getState().setUser({
              ...currentUser,
              studyTime: newDbTime
            });
          }
        }
      } catch (err) {
        console.error("Failed to sync study time to database:", err);
      }
    };

    // 4. Sync on unload using keepalive
    const handleUnload = () => {
      const currentUser = useStore.getState().user;
      if (!currentUser) return;
      
      const payload = JSON.stringify({ study_time: currentUser.studyTime || 0 });
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/users?nim=eq.${user.nim}`;
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${localStorage.getItem('sb-tvsawtkevzfqobsfkiag-auth-token') || ''}`
        },
        body: payload,
        keepalive: true
      }).catch(e => console.error(e));
    };

    // 5. Send heartbeat every 30 seconds
    const heartbeatInterval = setInterval(async () => {
      try {
        await supabase
          .from('active_sessions')
          .upsert({
            nim: user.nim,
            nama: user.nama || 'Anonymous',
            kelas: user.kelas || 'Unknown',
            last_heartbeat: new Date().toISOString(),
            current_activity: page
          });
      } catch (e) {
        console.error("Failed to send heartbeat:", e);
      }
    }, 30000);

    // Initial heartbeat
    supabase
      .from('active_sessions')
      .upsert({
        nim: user.nim,
        nama: user.nama || 'Anonymous',
        kelas: user.kelas || 'Unknown',
        last_heartbeat: new Date().toISOString(),
        current_activity: page
      })
      .then(({ error }) => {
        if (error) console.error("Initial heartbeat failed:", error);
      });

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(tickInterval);
      clearInterval(heartbeatInterval);
      window.removeEventListener('beforeunload', handleUnload);
      
      const activeTab = localStorage.getItem('study_time_active_tab');
      if (activeTab === tabId.current) {
        localStorage.removeItem('study_time_active_tab');
        localStorage.removeItem('study_time_active_tab_timestamp');
      }
      syncStudyTimeToDatabase();
    };
  }, [user?.nim, page]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed inset-y-0 left-0 w-72 bg-white border-r border-zinc-200 z-50 flex flex-col"
          >
            <div className="p-6 border-bottom border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <div className="w-8 h-8 bg-rose-700 rounded-lg flex items-center justify-center text-white">
                  E
                </div>
                <span>E-Learning</span>
              </div>
              <button onClick={toggleSidebar} className="p-2 hover:bg-zinc-100 rounded-lg lg:hidden">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
              <SidebarItem 
                icon={<LayoutDashboard size={22} />} 
                label="Dasbor" 
                href="/" 
                active={page === 'dashboard'} 
                onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}
              />
              <SidebarItem 
                icon={<BookOpen size={22} />} 
                label="Kursus" 
                href="/courses" 
                active={page === 'courses'} 
                onClick={(e) => { e.preventDefault(); setPage('courses'); }}
              />
              <SidebarItem 
                icon={<Terminal size={22} />} 
                label="Playground" 
                href="/playground" 
                active={page === 'playground'} 
                onClick={(e) => { e.preventDefault(); setPage('playground'); }}
              />
              <SidebarItem 
                icon={<Trophy size={22} />} 
                label="Papan Peringkat" 
                href="/leaderboard" 
                active={page === 'leaderboard'} 
                onClick={(e) => { e.preventDefault(); setPage('leaderboard'); }}
              />

              {/* Staff Panel - role-based visibility */}
              {isStaff && (
                <div className="pt-4 border-t border-zinc-150 space-y-3">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-4 mb-2">Panel Staf</div>
                  {isAdminOrKordas && (
                    <SidebarItem 
                      icon={<ShieldCheck size={22} />} 
                      label="Admin Panel" 
                      href="/admin" 
                      active={page === 'admin'} 
                      onClick={(e) => { e.preventDefault(); setPage('admin'); }}
                    />
                  )}
                  <SidebarItem 
                    icon={<Users size={22} />} 
                    label="Monitoring" 
                    href="/monitoring" 
                    active={page === 'monitoring'} 
                    onClick={(e) => { e.preventDefault(); setPage('monitoring'); }}
                  />
                  {isAdminOrKordas && (
                    <SidebarItem 
                      icon={<ClipboardList size={22} />} 
                      label="Audit Log" 
                      href="/auditlog" 
                      active={page === 'auditlog'} 
                      onClick={(e) => { e.preventDefault(); setPage('auditlog'); }}
                    />
                  )}
                </div>
              )}
            </nav>

            <div className="p-4 border-t border-zinc-100 space-y-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Keluar</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "lg:ml-72" : "ml-0"
      )}>
        <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <button onClick={toggleSidebar} className="p-2 hover:bg-zinc-100 rounded-lg">
            <Menu size={20} />
          </button>
          
          <div 
            onClick={() => setPage('profile')}
            className="flex items-center gap-4 cursor-pointer hover:bg-zinc-50 p-1 rounded-xl transition-colors"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{user?.nama || 'User'}</div>
              <div className="text-xs text-zinc-500">Level {user?.level || 1} • {user?.xp || 0} XP</div>
            </div>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-zinc-500">
                {(user?.nama || 'U').charAt(0)}
              </div>
            )}
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <AnimatePresence>
        {unlockedAchievement && (
          <AchievementPopup 
            achievement={unlockedAchievement} 
            onClose={() => shiftAchievement()} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {levelUpNotification !== null && (
          <LevelUpPopup 
            level={levelUpNotification} 
            onClose={() => setLevelUpNotification(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; href: string; active?: boolean; onClick?: (e: React.MouseEvent) => void }> = ({ icon, label, href, active, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 text-sm group",
      active 
        ? "bg-zinc-900 text-white font-extrabold shadow-lg shadow-zinc-950/20 border-b-2 border-zinc-950 scale-[1.02] translate-x-1" 
        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/40 hover:translate-x-0.5"
    )}
  >
    <div className={cn(
      "p-1.5 rounded-xl transition-all duration-300",
      active 
        ? "bg-zinc-800 text-white shadow-inner" 
        : "text-zinc-400 group-hover:text-zinc-700 bg-zinc-50 group-hover:bg-zinc-100"
    )}>
      {icon}
    </div>
    <span className="font-bold">{label}</span>
  </a>
);
