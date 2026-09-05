import React from 'react';
import { Layout } from '../components/Layout';
import { Trophy, Zap, Clock, Settings, Edit2, Award, Star, Bug, Target, Flame } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Achievement } from '../services/achievementService';
import achievementsData from '../data/achievements.json';

export const Profile: React.FC = () => {
  const { user } = useStore();
  const { completedLessons } = useProgress();
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user?.nim) return;
    
    const fetchUnlocked = async () => {
      const { data, error } = await supabase
        .from('unlocked_achievements')
        .select('achievement_id')
        .eq('nim', user.nim);
        
      if (!error && data) {
        setUnlockedIds(new Set(data.map(d => d.achievement_id)));
      }
    };
    
    fetchUnlocked();

    const channel = supabase
      .channel(`public:unlocked_achievements:nim=${user.nim}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'unlocked_achievements', 
        filter: `nim=eq.${user.nim}` 
      }, () => {
        fetchUnlocked();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.nim]);

  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'March 2026';

  const nextLevelXp = (user?.level || 1) * 2000;
  const xpProgress = Math.round(((user?.xp || 0) % 2000) / 2000 * 100);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12 pb-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white border-2 border-gray-100 p-8 rounded-[3rem] shadow-soft card-hover hover:border-maroon/20 transition-all">
          <div className="relative group/avatar select-none">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover transform rotate-[-4deg] group-hover/avatar:rotate-0 transition-transform" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-zinc-100 border-4 border-white shadow-xl flex items-center justify-center text-4xl font-black text-zinc-300 transform rotate-[-4deg] group-hover/avatar:rotate-0 transition-transform">
                {(user?.nama || 'U').charAt(0)}
              </div>
            )}
            <button className="absolute bottom-0 right-0 p-2.5 bg-rose-700 text-white rounded-full shadow-bubbly-maroon hover:bg-rose-600 transition-all btn-bubbly cursor-pointer">
              <i className="fa-solid fa-camera text-xs"></i>
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 select-none">{user?.nama || 'User'}</h1>
            <p className="text-zinc-500 font-bold">Penjelajah Python • Bergabung {joinedDate}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Badge icon={<i className="fa-solid fa-fire text-amber-600"></i>} label={`${user?.streak || 0} Hari Beruntun`} color="bg-amber-50 text-amber-700" shadowColor="#D97706" borderClass="border-amber-200" />
              <Badge icon={<i className="fa-solid fa-trophy text-rose-700"></i>} label={`Level ${user?.level || 1}`} color="bg-rose-50 text-rose-750" shadowColor="#8A1538" borderClass="border-rose-200" />
              <Badge icon={<i className="fa-solid fa-star text-blue-600"></i>} label={`${(user?.xp || 0).toLocaleString()} XP`} color="bg-blue-50 text-blue-705" shadowColor="#023E8A" borderClass="border-blue-200" />
            </div>
          </div>

          <button className="p-3.5 hover:bg-rose-50 text-zinc-400 hover:text-maroon rounded-2xl transition-all self-start cursor-pointer">
            <i className="fa-solid fa-gear text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 select-none">
              <h3 className="text-xl font-black flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-[0_3px_0_#5C0E25]">
                  <i className="fa-solid fa-award text-sm"></i>
                </div>
                Pencapaian
              </h3>
              <div className="bg-rose-50 text-maroon border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-black shadow-sm">
                <i className="fa-solid fa-trophy mr-1.5 text-amber-500"></i>
                {unlockedIds.size} / {(achievementsData as Achievement[]).length} Terbuka
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(achievementsData as Achievement[]).map((ach) => (
                <AchievementCard 
                  key={ach.id}
                  title={ach.title} 
                  desc={ach.description} 
                  icon={ach.icon} 
                  unlocked={unlockedIds.has(ach.id)} 
                />
              ))}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 shadow-soft card-hover hover:border-maroon/20 transition-all group/stats">
              <h3 className="font-black text-lg mb-6 flex items-center gap-3 select-none">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-[0_3px_0_#D97706] transform rotate-[-4deg] group-hover/stats:rotate-0 transition-transform">
                  <i className="fa-solid fa-chart-line text-sm"></i>
                </div>
                Statistik Belajar
              </h3>
              <div className="space-y-4">
                <StatRow label="Pelajaran Selesai" value={completedLessons.length.toString()} />
                <StatRow label="Kuis Lulus" value={completedLessons.length.toString()} />
                <StatRow label="Latihan Terpecahkan" value={completedLessons.length.toString()} />
                <StatRow label="Total Waktu" value={`${Math.round(completedLessons.length * 15 / 60)} jam`} />
              </div>
            </div>

            <div className="bg-zinc-950 border-2 border-zinc-950 rounded-[2rem] p-6 text-white shadow-[0_6px_0_#000] relative overflow-hidden group/target">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl transition-transform duration-500 group-hover/target:scale-110 pointer-events-none" />
              <h3 className="font-black text-lg mb-4 flex items-center gap-2 select-none">🎯 Target Berikutnya</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1 font-bold">
                  <span className="text-zinc-400">Level {(user?.level || 1) + 1}</span>
                  <span className="font-black font-mono">{(user?.xp || 0) % 2000} / 2000 XP</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner border border-zinc-900">
                  <div className="h-full bg-rose-600 rounded-full transition-all duration-500 relative" style={{ width: `${xpProgress}%` }}>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30 rounded-t-full"></div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-bold">
                  Selesaikan {Math.ceil((2000 - ((user?.xp || 0) % 2000)) / 50)} pelajaran lagi untuk mencapai Level {(user?.level || 1) + 1} dan membuka modul baru!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Badge: React.FC<{ icon: React.ReactNode; label: string; color: string; shadowColor: string; borderClass: string }> = ({ icon, label, color, shadowColor, borderClass }) => (
  <div className={cn("flex items-center gap-2 px-4 py-2 border-2 rounded-full text-xs font-black uppercase tracking-wider select-none", color, borderClass)} style={{ boxShadow: `0 3px 0 ${shadowColor}` }}>
    {icon}
    {label}
  </div>
);

const AchievementCard: React.FC<{ title: string; desc: string; icon: string; unlocked?: boolean }> = ({ title, desc, icon, unlocked }) => {
  const IconMap: Record<string, string> = {
    Bug: "fa-bug",
    Target: "fa-bullseye",
    Zap: "fa-bolt",
    Trophy: "fa-trophy",
    Flame: "fa-fire",
    Star: "fa-star",
    Award: "fa-award",
    Crown: "fa-crown",
    Heart: "fa-heart",
    Rocket: "fa-rocket",
    Medal: "fa-medal",
    Gift: "fa-gift",
    Gem: "fa-gem"
  };
  const iconClass = IconMap[icon] || "fa-trophy";
  
  return (
    <div className={cn(
      "p-5 border-2 text-center space-y-3 transition-all flex flex-col items-center justify-center group/ach",
      unlocked 
        ? "bg-white border-gray-100 rounded-[2rem] shadow-soft card-hover hover:border-maroon/20 cursor-pointer select-none" 
        : "bg-zinc-50 border-zinc-200 opacity-40 grayscale rounded-[2rem] select-none"
    )}>
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-1 transition-transform duration-300",
        unlocked 
          ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[0_4px_0_#5C0E25] transform rotate-[-5deg] group-hover/ach:rotate-0" 
          : "bg-zinc-200 text-zinc-450 border border-zinc-300 shadow-inner"
      )}>
        <i className={cn("fa-solid text-xl", iconClass)}></i>
      </div>
      <div>
        <div className="font-black text-[11px] leading-tight mb-1 text-zinc-900">{title}</div>
        <div className="text-[9px] text-zinc-500 font-bold leading-tight line-clamp-2">{desc}</div>
      </div>
    </div>
  );
};

const StatRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-3.5 border-b-2 border-dashed border-gray-105/40 last:border-0">
    <span className="text-sm text-zinc-500 font-bold">{label}</span>
    <span className="font-black text-zinc-900 font-mono text-base">{value}</span>
  </div>
);
