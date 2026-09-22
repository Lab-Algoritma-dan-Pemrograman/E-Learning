import React, { useEffect, useState, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { Trophy, Medal, ArrowUp, ArrowDown, Minus, Loader2, User, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';
import { getLeaderboard, getUserRank, getLeaderboardFilters } from '../services/leaderboardService';
import { UserProfile, useStore } from '../store/useStore';
import { normalizeRole } from '../services/tokenService';

export const Leaderboard: React.FC = () => {
  const { user } = useStore();
  const [leaders, setLeaders] = useState<UserProfile[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const userRole = normalizeRole(user?.role);
  const isStudent = userRole === 'praktikan';
  const isStaff = ['admin', 'kordas', 'asisten'].includes(userRole);

  // Filter state for staff users
  const [filterKelas, setFilterKelas] = useState<string>('');
  const [filterJurusan, setFilterJurusan] = useState<string>('');
  const [filterLimit, setFilterLimit] = useState<number>(20);
  const [kelasOptions, setKelasOptions] = useState<string[]>([]);
  const [jurusanOptions, setJurusanOptions] = useState<string[]>([]);

  // Fetch filter options for staff
  useEffect(() => {
    if (isStaff) {
      getLeaderboardFilters().then(({ kelas, jurusan }) => {
        setKelasOptions(kelas);
        setJurusanOptions(jurusan);
      });
    }
  }, [isStaff]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (isStudent && user) {
      const [topLeaders, rank] = await Promise.all([
        getLeaderboard(3, user.kelas, user.jurusan),
        getUserRank(user.xp, user.kelas, user.jurusan)
      ]);
      setLeaders(topLeaders);
      setUserRank(rank);
    } else if (isStaff && user) {
      const kelas = filterKelas || undefined;
      const jurusan = filterJurusan || undefined;
      const [topLeaders, rank] = await Promise.all([
        getLeaderboard(filterLimit, kelas, jurusan),
        getUserRank(user.xp, kelas, jurusan)
      ]);
      setLeaders(topLeaders);
      setUserRank(rank);
    }
    setLoading(false);
  }, [user, isStudent, isStaff, filterKelas, filterJurusan, filterLimit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasActiveFilter = filterKelas !== '' || filterJurusan !== '' || filterLimit !== 20;

  const resetFilters = () => {
    setFilterKelas('');
    setFilterJurusan('');
    setFilterLimit(20);
  };

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
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-maroon mb-2 tracking-tight flex items-center justify-center select-none">
            Papan Peringkat Global
            <i className="fa-solid fa-crown text-fun-yellow ml-4 text-3xl animate-bounce"></i>
          </h1>
          <p className="text-zinc-550 font-bold max-w-xl mx-auto leading-relaxed">
            {isStudent 
              ? `Top 3 Penjelajah Python di Kelas ${user?.kelas} - ${user?.jurusan || ''}`
              : 'Lihat peringkat semua praktikan berdasarkan total XP.'}
          </p>
        </div>

        {/* Filter Bar for Staff */}
        {isStaff && (
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-5 shadow-soft">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
                className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-black focus:ring-2 focus:ring-rose-700/20 focus:outline-none shadow-inner cursor-pointer"
              >
                <option value="">Semua Kelas</option>
                {kelasOptions.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>

              <select
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
                className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-black focus:ring-2 focus:ring-rose-700/20 focus:outline-none shadow-inner cursor-pointer"
              >
                <option value="">Semua Jurusan</option>
                {jurusanOptions.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>

              <select
                value={filterLimit}
                onChange={(e) => setFilterLimit(Number(e.target.value))}
                className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-black focus:ring-2 focus:ring-rose-700/20 focus:outline-none shadow-inner cursor-pointer"
              >
                <option value={3}>Top 3</option>
                <option value={10}>Top 10</option>
                <option value={20}>Top 20</option>
                <option value={0}>Semua</option>
              </select>

              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-700 border-2 border-rose-200 rounded-xl text-sm font-black transition-all shadow-[0_3px_0_#8A1538] active:translate-y-[3px] active:shadow-none btn-bubbly cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-left"></i>
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        {leaders.length > 0 && (
          <div className="flex justify-center items-end gap-6 pt-12 pb-8 overflow-x-auto px-4">
            {leaders.length >= 2 && (
              <PodiumItem entry={leaders[1]} rank={2} height="h-40 sm:h-48" color="bg-zinc-100" shadowColor="#71717a" borderClass="border-zinc-300" medal={<i className="fa-solid fa-medal text-zinc-400 text-2xl"></i>} />
            )}
            <PodiumItem entry={leaders[0]} rank={1} height="h-56 sm:h-64" color="bg-amber-50" shadowColor="#D97706" borderClass="border-amber-200" medal={<i className="fa-solid fa-trophy text-amber-500 text-2xl"></i>} />
            {leaders.length >= 3 && (
              <PodiumItem entry={leaders[2]} rank={3} height="h-32 sm:h-40" color="bg-orange-50" shadowColor="#C2410C" borderClass="border-orange-200" medal={<i className="fa-solid fa-medal text-orange-500 text-2xl"></i>} />
            )}
          </div>
        )}

        {/* List */}
        <div className="bg-white border-2 border-gray-100 rounded-[2rem] overflow-hidden shadow-soft card-hover hover:border-maroon/20 transition-all duration-300">
          <div className="grid grid-cols-12 px-6 py-4 bg-maroon-bg border-b-2 border-gray-100 text-xs font-black text-maroon/70 uppercase tracking-widest">
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
                  "grid grid-cols-12 px-6 py-4.5 items-center hover:bg-zinc-50/50 transition-colors group",
                  user?.nim === entry.nim && "bg-rose-50/40"
                )}
              >
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                  <span className={cn(
                    "font-black text-base",
                    idx < 3 ? "text-rose-700" : "text-zinc-850"
                  )}>{idx + 1}</span>
                  <TrendIcon trend="stable" />
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  {entry.photoURL ? (
                    <img src={entry.photoURL} alt={entry.nama || ''} className="w-10 h-10 rounded-full border-2 border-gray-150 object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center font-black text-zinc-400 select-none">
                      {(entry.nama || 'U').charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-black text-zinc-900 truncate max-w-[150px] sm:max-w-none flex items-center gap-2">
                      {entry.nama || 'Anonymous'}
                      {user?.nim === entry.nim && <span className="text-[9px] bg-rose-100 text-rose-700 font-black px-2 py-0.5 rounded-lg border border-rose-200/50 uppercase tracking-widest">Anda</span>}
                    </span>
                    <span className="text-[10px] text-zinc-400 sm:hidden uppercase font-black tracking-wider">Level {entry.level || 1}</span>
                  </div>
                </div>
                <div className="col-span-2 text-center hidden sm:block">
                  <span className="px-3 py-1 bg-zinc-100 rounded-xl text-xs font-black text-zinc-600 border border-zinc-200/50">Lvl {entry.level || 1}</span>
                </div>
                <div className="col-span-4 sm:col-span-3 text-right font-black text-rose-700 font-mono text-sm sm:text-base">
                  {(entry.xp || 0).toLocaleString()} XP
                </div>
              </div>
            ))}

            {/* Current User Rank if not in top list */}
            {user && !isUserInTop && userRank && (
              <>
                <div className="flex justify-center py-3 bg-zinc-50/30">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 mx-1 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 mx-1 animate-pulse delay-75" />
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 mx-1 animate-pulse delay-150" />
                </div>
                <div className="grid grid-cols-12 px-6 py-4.5 items-center bg-rose-50/35 border-t border-zinc-100">
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                    <span className="font-black text-base text-zinc-900">{userRank}</span>
                    <TrendIcon trend="stable" />
                  </div>
                  <div className="col-span-6 flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.nama || ''} className="w-10 h-10 rounded-full border-2 border-rose-200 object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-rose-250 flex items-center justify-center font-black text-rose-700 select-none">
                        {(user.nama || 'U').charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-black text-zinc-900 flex items-center gap-2">
                        {user.nama || 'Anonymous'}
                        <span className="text-[9px] bg-rose-100 text-rose-700 font-black px-2 py-0.5 rounded-lg border border-rose-200/50 uppercase tracking-widest">Anda</span>
                      </span>
                      <span className="text-[10px] text-zinc-400 sm:hidden uppercase font-black tracking-wider">Level {user.level || 1}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <span className="px-3 py-1 bg-rose-100 rounded-xl text-xs font-black text-rose-700 border border-rose-200/50">Lvl {user.level || 1}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-right font-black text-rose-700 font-mono text-sm sm:text-base">
                    {(user.xp || 0).toLocaleString()} XP
                  </div>
                </div>
              </>
            )}
          </div>

          {leaders.length === 0 && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <i className="fa-solid fa-users text-zinc-400 text-2xl"></i>
              </div>
              <div className="space-y-1">
                <p className="font-black text-zinc-900">Belum ada data</p>
                <p className="text-sm text-zinc-500 text-balance font-bold">Jadilah yang pertama untuk mencapai puncak papan peringkat!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const PodiumItem: React.FC<{ entry: UserProfile; rank: number; height: string; color: string; shadowColor: string; borderClass: string; medal: React.ReactNode }> = ({ entry, rank, height, color, shadowColor, borderClass, medal }) => (
  <div className="flex flex-col items-center gap-4 min-w-[120px] select-none group/podium">
    <div className="relative">
      {entry.photoURL ? (
        <img src={entry.photoURL} alt={entry.nama || ''} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl object-cover transform rotate-[-4deg] group-hover/podium:rotate-0 transition-transform" />
      ) : (
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-200 border-4 border-white shadow-xl flex items-center justify-center text-xl sm:text-2xl font-black text-zinc-450 transform rotate-[-4deg] group-hover/podium:rotate-0 transition-transform">
          {(entry.nama || 'U').charAt(0)}
        </div>
      )}
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md transform group-hover/podium:scale-110 transition-transform">
        {medal}
      </div>
    </div>
    <div className="text-center">
      <div className="font-black text-sm sm:text-base text-zinc-800 truncate max-w-[100px] sm:max-w-[140px]">{entry.nama || 'Anonymous'}</div>
      <div className="text-xs sm:text-sm font-bold text-zinc-500">{(entry.xp || 0).toLocaleString()} XP</div>
    </div>
    <div className={cn("w-full rounded-t-3xl flex items-center justify-center border-t-2 border-x-2 relative transition-all duration-300", height, color, borderClass)} style={{ boxShadow: `0 8px 0 ${shadowColor}` }}>
      <span className="text-3xl sm:text-5xl font-black text-white/25 group-hover/podium:scale-110 transition-transform select-none">#{rank}</span>
    </div>
  </div>
);

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'stable' }> = ({ trend }) => {
  if (trend === 'up') return <ArrowUp size={14} className="text-rose-700" />;
  if (trend === 'down') return <ArrowDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-zinc-300" />;
};
