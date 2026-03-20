import React from 'react';
import { Layout } from '../components/Layout';
import { Trophy, Zap, Clock, Settings, Edit2, Award, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';

export const Profile: React.FC = () => {
  const { user } = useStore();
  const { completedLessons } = useProgress();

  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'March 2026';

  const nextLevelXp = (user?.level || 1) * 2000;
  const xpProgress = Math.round(((user?.xp || 0) % 2000) / 2000 * 100);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-zinc-200 p-8 rounded-[3rem] shadow-sm">
          <div className="relative">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-zinc-100 border-4 border-white shadow-xl flex items-center justify-center text-4xl font-black text-zinc-300">
                {(user?.displayName || 'U').charAt(0)}
              </div>
            )}
            <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-400 transition-colors">
              <Edit2 size={16} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-black tracking-tight">{user?.displayName || 'User'}</h1>
            <p className="text-zinc-500 font-medium">Penjelajah Python • Bergabung {joinedDate}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Badge icon={<Zap size={14} />} label={`${user?.streak || 0} Hari Beruntun`} color="bg-amber-50 text-amber-700" />
              <Badge icon={<Trophy size={14} />} label={`Level ${user?.level || 1}`} color="bg-emerald-50 text-emerald-700" />
              <Badge icon={<Star size={14} />} label={`${(user?.xp || 0).toLocaleString()} XP`} color="bg-blue-50 text-blue-700" />
            </div>
          </div>

          <button className="p-3 hover:bg-zinc-100 rounded-2xl text-zinc-400 transition-colors self-start">
            <Settings size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Award size={20} className="text-emerald-500" />
              Pencapaian
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AchievementCard title="Langkah Pertama" desc="Menyelesaikan pelajaran pertama" icon="🚀" unlocked={completedLessons.length >= 1} />
              <AchievementCard title="Master Kuis" desc="10 kuis sempurna" icon="🧠" unlocked={completedLessons.length >= 10} />
              <AchievementCard title="Ninja Kode" desc="100 baris kode" icon="🥷" unlocked={completedLessons.length >= 20} />
              <AchievementCard title="Penyihir Data" desc="Analisis data pertama" icon="🧙‍♂️" />
              <AchievementCard title="Pionir ML" desc="Model ML pertama" icon="🤖" />
              <AchievementCard title="Raja Beruntun" desc="30 hari beruntun" icon="👑" unlocked={(user?.streak || 0) >= 30} />
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Clock size={20} className="text-emerald-500" />
                Statistik Belajar
              </h3>
              <div className="space-y-4">
                <StatRow label="Pelajaran Selesai" value={completedLessons.length.toString()} />
                <StatRow label="Kuis Lulus" value={completedLessons.length.toString()} />
                <StatRow label="Latihan Terpecahkan" value={completedLessons.length.toString()} />
                <StatRow label="Total Waktu" value={`${Math.round(completedLessons.length * 15 / 60)} jam`} />
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Target Berikutnya</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-400">Level {(user?.level || 1) + 1}</span>
                  <span className="font-bold">{(user?.xp || 0) % 2000} / 2000 XP</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${xpProgress}%` }} />
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
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

const Badge: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
  <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest", color)}>
    {icon}
    {label}
  </div>
);

const AchievementCard: React.FC<{ title: string; desc: string; icon: string; unlocked?: boolean }> = ({ title, desc, icon, unlocked }) => (
  <div className={cn(
    "p-6 rounded-3xl border text-center space-y-3 transition-all",
    unlocked ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-50 border-zinc-100 opacity-50 grayscale"
  )}>
    <div className="text-4xl">{icon}</div>
    <div>
      <div className="font-bold text-sm">{title}</div>
      <div className="text-[10px] text-zinc-500 font-medium leading-tight">{desc}</div>
    </div>
  </div>
);

const StatRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
    <span className="text-sm text-zinc-500">{label}</span>
    <span className="font-bold text-zinc-900">{value}</span>
  </div>
);
