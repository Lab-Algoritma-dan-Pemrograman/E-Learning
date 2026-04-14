import React from 'react';
import { useStore } from '../store/useStore';
import { Menu, X, BookOpen, LayoutDashboard, Terminal, Trophy, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { logout } from '../firebase';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen, toggleSidebar, user, page, setPage } = useStore();

  const isAdmin = user?.role === 'admin';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
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

            <nav className="flex-1 p-4 space-y-2">
              <SidebarItem 
                icon={<LayoutDashboard size={20} />} 
                label="Dasbor" 
                href="/" 
                active={page === 'dashboard'} 
                onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}
              />
              <SidebarItem 
                icon={<BookOpen size={20} />} 
                label="Kursus" 
                href="/courses" 
                active={page === 'courses'} 
                onClick={(e) => { e.preventDefault(); setPage('courses'); }}
              />
              <SidebarItem 
                icon={<Terminal size={20} />} 
                label="Playground" 
                href="/playground" 
                active={page === 'playground'} 
                onClick={(e) => { e.preventDefault(); setPage('playground'); }}
              />
              <SidebarItem 
                icon={<Trophy size={20} />} 
                label="Papan Peringkat" 
                href="/leaderboard" 
                active={page === 'leaderboard'} 
                onClick={(e) => { e.preventDefault(); setPage('leaderboard'); }}
              />
              {isAdmin && (
                <SidebarItem 
                  icon={<ShieldCheck size={20} />} 
                  label="Admin" 
                  href="/admin" 
                  active={page === 'admin'} 
                  onClick={(e) => { e.preventDefault(); setPage('admin'); }}
                />
              )}
            </nav>

            <div className="p-4 border-t border-zinc-100 space-y-4">
              <div className="bg-zinc-50 p-3 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">
                  <Sparkles size={12} className="text-rose-700" />
                  AI Model
                </div>
                <div className="flex gap-1 bg-white p-1 rounded-xl border border-zinc-200">
                  <button 
                    onClick={() => useStore.getState().setSelectedModel('gemini-3-flash')}
                    className={cn(
                      "flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                      useStore.getState().selectedModel === 'gemini-3-flash' 
                        ? "bg-rose-700 text-white shadow-sm" 
                        : "text-zinc-500 hover:text-zinc-900"
                    )}
                  >
                    3 Flash
                  </button>
                  <button 
                    onClick={() => useStore.getState().setSelectedModel('gemini-2.5-flash')}
                    className={cn(
                      "flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all",
                      useStore.getState().selectedModel === 'gemini-2.5-flash' 
                        ? "bg-rose-700 text-white shadow-sm" 
                        : "text-zinc-500 hover:text-zinc-900"
                    )}
                  >
                    2.5 Flash
                  </button>
                </div>
              </div>

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
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; href: string; active?: boolean; onClick?: (e: React.MouseEvent) => void }> = ({ icon, label, href, active, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
      active 
        ? "bg-rose-50 text-rose-700 font-semibold" 
        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
    )}
  >
    {icon}
    <span>{label}</span>
  </a>
);
