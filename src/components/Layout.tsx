import React, { useEffect, useRef, useState } from 'react';
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
    achievementQueue,
    levelUpNotification, 
    setLevelUpNotification 
  } = useStore();

  // Defer level-up popup until the achievement queue is empty.
  // This ensures the level-up celebration plays AFTER any achievement popups finish.
  const [pendingLevelUp, setPendingLevelUp] = useState<number | null>(null);

  useEffect(() => {
    if (levelUpNotification !== null) {
      // Stash it for later; clear it from global state immediately so it doesn't re-trigger
      setPendingLevelUp(levelUpNotification);
      setLevelUpNotification(null);
    }
  }, [levelUpNotification]);

  // Initial check: close sidebar on mount if on mobile/tablet screen
  useEffect(() => {
    if (window.innerWidth < 1024 && isSidebarOpen) {
      toggleSidebar();
    }
  }, []);

  // Auto-close sidebar on mobile/tablet when page changes
  useEffect(() => {
    if (window.innerWidth < 1024 && isSidebarOpen) {
      toggleSidebar();
    }
  }, [page]);

  // Only show level-up popup when the achievement queue is fully drained
  const showLevelUp = pendingLevelUp !== null && !unlockedAchievement && achievementQueue.length === 0;




  const isAdminOrKordas = user?.role === 'admin' || user?.role === 'kordas';
  const isStaff = isAdminOrKordas || user?.role === 'asisten';

  const handleLogout = async () => {
    try {
      if (user?.nim) {
        const { monitoringService } = await import('../services/monitoringService');
        await monitoringService.addAuditLog(user.nim, user.nama, 'logout', 'Melakukan logout dari sistem');
        
        await supabase
          .from('active_sessions')
          .delete()
          .eq('nim', user.nim);
      }
      sessionStorage.removeItem('logged_in_audit_logged');
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
        const now = new Date().toISOString();
        await supabase
          .from('active_sessions')
          .upsert({
            nim: user.nim,
            nama: user.nama || 'Anonymous',
            kelas: user.kelas || 'Unknown',
            last_heartbeat: now,
            current_activity: page
          });
        
        await supabase
          .from('users')
          .update({ last_active: now })
          .eq('nim', user.nim);
      } catch (e) {
        console.error("Failed to send heartbeat:", e);
      }
    }, 30000);

    // Initial heartbeat
    const initialNow = new Date().toISOString();
    supabase
      .from('active_sessions')
      .upsert({
        nim: user.nim,
        nama: user.nama || 'Anonymous',
        kelas: user.kelas || 'Unknown',
        last_heartbeat: initialNow,
        current_activity: page
      })
      .then(({ error }) => {
        if (error) console.error("Initial heartbeat failed:", error);
      });

    supabase
      .from('users')
      .update({ last_active: initialNow })
      .eq('nim', user.nim)
      .then(({ error }) => {
        if (error) console.error("Initial user active sync failed:", error);
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
    <div className="min-h-screen bg-[#FDFBF7] text-dark flex overflow-hidden font-sans">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed inset-y-0 left-0 w-64 bg-sidebar flex flex-col justify-between shadow-[4px_0_24px_rgba(138,21,56,0.05)] z-50 h-full border-r border-maroon/5"
          >


            <div className="flex flex-col flex-1 min-h-0">
              {/* Logo */}
              <div className="p-6 flex items-center justify-between mt-2">
                <div 
                  onClick={() => setPage('dashboard')}
                  className="w-11 h-11 bg-maroon rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-bubbly-maroon transform rotate-[-6deg] hover:rotate-0 transition-transform cursor-pointer"
                >
                  E
                </div>
                <span 
                  onClick={() => setPage('dashboard')}
                  className="text-xl font-black tracking-tight text-maroon cursor-pointer select-none flex-1 ml-3"
                >
                  E-Learning
                </span>
                <button onClick={toggleSidebar} className="p-2 hover:bg-maroon-bg text-maroon rounded-lg lg:hidden transition-colors">
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 mt-6 space-y-3 overflow-y-auto custom-scrollbar">
                <SidebarItem 
                  iconClass="fa-solid fa-shapes" 
                  hoverColorClass="group-hover:text-maroon"
                  label="Beranda" 
                  href="/" 
                  active={page === 'dashboard'} 
                  onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}
                />
                <SidebarItem 
                  iconClass="fa-solid fa-book-open" 
                  hoverColorClass="group-hover:text-maroon"
                  label="Belajar" 
                  href="/courses" 
                  active={page === 'courses'} 
                  onClick={(e) => { e.preventDefault(); setPage('courses'); }}
                />
                <SidebarItem 
                  iconClass="fa-solid fa-terminal" 
                  hoverColorClass="group-hover:text-fun-blue"
                  label="Playground" 
                  href="/playground" 
                  active={page === 'playground'} 
                  onClick={(e) => { e.preventDefault(); setPage('playground'); }}
                />
                <SidebarItem 
                  iconClass="fa-solid fa-trophy" 
                  hoverColorClass="group-hover:text-fun-yellow"
                  label="Papan Peringkat" 
                  href="/leaderboard" 
                  active={page === 'leaderboard'} 
                  onClick={(e) => { e.preventDefault(); setPage('leaderboard'); }}
                />

                {/* Staff Panel - role-based visibility */}
                {isStaff && (
                  <div className="pt-4 border-t border-maroon/5 space-y-3">
                    <div className="px-4 mb-2">
                      <span className="text-[10px] font-black text-maroon/40 tracking-widest uppercase bg-maroon-bg px-3 py-1 rounded-full">
                        Panel Staf
                      </span>
                    </div>
                    {isAdminOrKordas && (
                      <SidebarItem 
                        iconClass="fa-solid fa-shield-halved" 
                        hoverColorClass="group-hover:text-maroon"
                        label="Admin Panel" 
                        href="/admin" 
                        active={page === 'admin'} 
                        onClick={(e) => { e.preventDefault(); setPage('admin'); }}
                      />
                    )}
                    <SidebarItem 
                      iconClass="fa-solid fa-users-viewfinder" 
                      hoverColorClass="group-hover:text-fun-blue"
                      label="Monitoring" 
                      href="/monitoring" 
                      active={page === 'monitoring'} 
                      onClick={(e) => { e.preventDefault(); setPage('monitoring'); }}
                    />
                    {isAdminOrKordas && (
                      <SidebarItem 
                        iconClass="fa-solid fa-clipboard-list" 
                        hoverColorClass="group-hover:text-fun-green"
                        label="Audit Log" 
                        href="/auditlog" 
                        active={page === 'auditlog'} 
                        onClick={(e) => { e.preventDefault(); setPage('auditlog'); }}
                      />
                    )}
                  </div>
                )}
              </nav>
            </div>

            {/* Logout Button */}
            <div className="p-6 border-t border-maroon/5">
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 text-gray-400 hover:text-red-500 font-black transition-colors group px-2 w-full text-left"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-100 group-hover:text-red-500 transition-all">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
                <span className="font-black text-sm tracking-wide">Keluar</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar Backdrop Overlay for Mobile/Tablet */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 lg:hidden cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300",
        isSidebarOpen ? "lg:ml-64" : "ml-0"
      )}>
        {/* Floating decorative blobs behind content */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-fun-yellow/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-maroon/5 rounded-full blur-3xl z-0 pointer-events-none"></div>

        {/* Top Header */}
        <header className="bg-[#FDFBF7]/80 backdrop-blur-md sticky top-0 z-40 px-8 py-4 border-b border-maroon/5 h-20 flex items-center">
          <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar} 
                className="w-10 h-10 rounded-full hover:bg-maroon-bg flex items-center justify-center text-maroon transition-colors focus:outline-none cursor-pointer"
              >
                <i className="fa-solid fa-bars text-lg"></i>
              </button>
              {page !== 'dashboard' && (
                <button 
                  onClick={() => setPage('dashboard')} 
                  className="text-sm font-bold text-gray-400 hover:text-maroon flex items-center space-x-2 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left text-xs"></i>
                  <span className="hidden sm:inline">Kembali ke Dashboard</span>
                </button>
              )}
            </div>

            {/* Profile Chip Ceria */}
            <div 
              onClick={() => setPage('profile')}
              className="flex items-center space-x-3 cursor-pointer bg-white hover:bg-maroon-bg p-1.5 pl-5 rounded-full transition-colors border-2 border-transparent hover:border-maroon/20 shadow-sm group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-dark leading-none mb-1 group-hover:text-maroon transition-colors uppercase">
                  {user?.nama || 'User'}
                </p>
                <div className="flex items-center justify-end">
                  <span className="bg-maroon text-white text-[10px] px-2 py-0.5 rounded-md font-bold mr-2">
                    LVL {user?.level || 1}
                  </span>
                  <p className="text-xs font-bold text-gray-500 flex items-center">
                    <i className="fa-solid fa-star text-fun-yellow mr-1"></i> {user?.xp || 0} XP
                  </p>
                </div>
              </div>
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-white group-hover:scale-105 transition-transform object-cover shadow-sm" 
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-fun-yellow flex items-center justify-center text-maroon font-black shadow-inner border-2 border-white group-hover:scale-105 transition-transform text-lg select-none">
                  {(user?.nama || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
        </div>
      </main>

      {/* Achievement popup — shown first if there are any in the queue */}
      <AnimatePresence>
        {unlockedAchievement && (
          <AchievementPopup 
            achievement={unlockedAchievement} 
            onClose={() => shiftAchievement()} 
          />
        )}
      </AnimatePresence>

      {/* Level-up popup — only fires after the achievement queue is empty */}
      <AnimatePresence>
        {showLevelUp && (
          <LevelUpPopup
            level={pendingLevelUp!}
            onClose={() => setPendingLevelUp(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarItem: React.FC<{
  iconClass: string;
  label: string;
  href: string;
  active?: boolean;
  hoverColorClass?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ iconClass, label, href, active, hoverColorClass = "group-hover:text-maroon", onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all font-bold group relative overflow-hidden",
        active
          ? "bg-maroon text-white shadow-bubbly-maroon font-black transform transition-transform hover:-translate-y-1"
          : "text-gray-500 hover:bg-maroon-bg hover:text-maroon"
      )}
    >
      {active && (
        <div className="absolute -right-2 -top-2 text-white/10 text-4xl">
          <i className="fa-solid fa-burst"></i>
        </div>
      )}
      
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
          active
            ? "bg-white/20 text-white relative z-10"
            : "bg-gray-100 text-gray-400 group-hover:bg-white group-hover:shadow-sm " + hoverColorClass
        )}
      >
        <i className={cn(iconClass, "text-sm")}></i>
      </div>
      <span className={cn("relative z-10 tracking-wide text-sm font-bold", active ? "font-black" : "")}>{label}</span>
    </a>
  );
};
