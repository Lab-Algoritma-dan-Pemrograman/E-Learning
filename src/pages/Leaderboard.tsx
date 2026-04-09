import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Trophy, Medal, ArrowUp, ArrowDown, Minus, Loader2, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { getLeaderboard, getUserRank } from '../services/leaderboardService';
import { UserProfile, useStore } from '../store/useStore';

export const Leaderboard: React.FC = () => {
  const { user } = useStore();
  const [leaders, setLeaders] = useState<UserProfile[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [topLeaders, rank] = await Promise.all([
        getLeaderboard(20),
        user ? getUserRank(user.xp) : Promise.resolve(null)
      ]);
      setLeaders(topLeaders);
      setUserRank(rank);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const isUserInTop = leaders.some(l => l.nim === user?.nim);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="animate-spin text-rose-700" size={48} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Papan Peringkat Global</h1>
          <p className="text-zinc-500">Lihat peringkat Anda dibandingkan dengan penjelajah Python lainnya di seluruh dunia.</p>
        </div>

        {/* Top 3 Podium */}
        {leaders.length > 0 && (
          <div className="flex justify-center items-end gap-4 pt-12 pb-8 overflow-x-auto px-4">
            {leaders.length >= 2 && (
              <PodiumItem entry={leaders[1]} rank={2} height="h-40 sm:h-48" color="bg-zinc-100" medal={<Medal className="text-zinc-400" size={32} />} />
            )}
            <PodiumItem entry={leaders[0]} rank={1} height="h-56 sm:h-64" color="bg-rose-50" medal={<Trophy className="text-amber-500" size={48} />} />
            {leaders.length >= 3 && (
              <PodiumItem entry={leaders[2]} rank={3} height="h-32 sm:h-40" color="bg-orange-50" medal={<Medal className="text-orange-400" size={32} />} />
            )}
          </div>
        )}

        {/* List */}
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 px-6 py-4 bg-zinc-50 border-b border-zinc-100 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <div className="col-span-2 sm:col-span-1">Rank</div>
            <div className="col-span-6 sm:col-span-6">Penjelajah</div>
            <div className="col-span-2 text-center hidden sm:block">Level</div>
            <div className="col-span-4 sm:col-span-3 text-right">Total XP</div>
          </div>
          
          <div className="divide-y divide-zinc-100">
            {leaders.map((entry, idx) => (
              <div 
                key={entry.nim} 
                className={cn(
                  "grid grid-cols-12 px-6 py-4 items-center hover:bg-zinc-50 transition-colors group",
                  user?.nim === entry.nim && "bg-rose-50/50"
                )}
              >
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                  <span className={cn(
                    "font-bold",
                    idx < 3 ? "text-rose-700" : "text-zinc-900"
                  )}>{idx + 1}</span>
                  <TrendIcon trend="stable" />
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  {entry.photoURL ? (
                    <img src={entry.photoURL} alt={entry.nama || ''} className="w-10 h-10 rounded-full border border-zinc-200 object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-zinc-400">
                      {(entry.nama || 'U').charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 truncate max-w-[150px] sm:max-w-none">
                      {entry.nama || 'Anonymous'}
                      {user?.nim === entry.nim && <span className="ml-2 text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Anda</span>}
                    </span>
                    <span className="text-[10px] text-zinc-400 sm:hidden uppercase font-bold tracking-wider">Level {entry.level || 1}</span>
                  </div>
                </div>
                <div className="col-span-2 text-center hidden sm:block">
                  <span className="px-2 py-1 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-600">Lvl {entry.level || 1}</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-right font-bold text-rose-700">
                  {(entry.xp || 0).toLocaleString()} XP
                </div>
              </div>
            ))}

            {/* Current User Rank if not in top list */}
            {user && !isUserInTop && userRank && (
              <>
                <div className="flex justify-center py-2 bg-zinc-50/50">
                  <div className="h-1 w-1 rounded-full bg-zinc-300 mx-1" />
                  <div className="h-1 w-1 rounded-full bg-zinc-300 mx-1" />
                  <div className="h-1 w-1 rounded-full bg-zinc-300 mx-1" />
                </div>
                <div className="grid grid-cols-12 px-6 py-4 items-center bg-rose-50/50">
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                    <span className="font-bold text-zinc-900">{userRank}</span>
                    <TrendIcon trend="stable" />
                  </div>
                  <div className="col-span-6 flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.nama || ''} className="w-10 h-10 rounded-full border border-rose-200 object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center font-bold text-rose-700">
                        {(user.nama || 'U').charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900">
                        {user.nama || 'Anonymous'}
                        <span className="ml-2 text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Anda</span>
                      </span>
                      <span className="text-[10px] text-zinc-400 sm:hidden uppercase font-bold tracking-wider">Level {user.level || 1}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <span className="px-2 py-1 bg-rose-100 rounded-lg text-xs font-bold text-rose-700">Lvl {user.level || 1}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-right font-bold text-rose-700">
                    {(user.xp || 0).toLocaleString()} XP
                  </div>
                </div>
              </>
            )}
          </div>

          {leaders.length === 0 && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto">
                <User className="text-zinc-400" size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-zinc-900">Belum ada data</p>
                <p className="text-sm text-zinc-500 text-balance">Jadilah yang pertama untuk mencapai puncak papan peringkat!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const PodiumItem: React.FC<{ entry: UserProfile; rank: number; height: string; color: string; medal: React.ReactNode }> = ({ entry, rank, height, color, medal }) => (
  <div className="flex flex-col items-center gap-4 min-w-[120px]">
    <div className="relative">
      {entry.photoURL ? (
        <img src={entry.photoURL} alt={entry.nama || ''} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl object-cover" />
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-200 border-4 border-white shadow-xl flex items-center justify-center text-xl sm:text-2xl font-black text-zinc-400">
          {(entry.nama || 'U').charAt(0)}
        </div>
      )}
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
        {medal}
      </div>
    </div>
    <div className="text-center">
      <div className="font-bold text-sm sm:text-lg truncate max-w-[100px] sm:max-w-[140px]">{entry.nama || 'Anonymous'}</div>
      <div className="text-xs sm:text-sm text-zinc-500">{(entry.xp || 0).toLocaleString()} XP</div>
    </div>
    <div className={cn("w-full rounded-t-3xl shadow-inner flex items-center justify-center", height, color)}>
      <span className="text-2xl sm:text-4xl font-black text-white/20">#{rank}</span>
    </div>
  </div>
);

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'stable' }> = ({ trend }) => {
  if (trend === 'up') return <ArrowUp size={14} className="text-rose-700" />;
  if (trend === 'down') return <ArrowDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-zinc-300" />;
};
