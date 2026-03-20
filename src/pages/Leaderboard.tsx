import React from 'react';
import { Layout } from '../components/Layout';
import { Trophy, Medal, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  level: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  photoURL?: string;
}

const mockData: LeaderboardEntry[] = [
  { id: '1', name: 'Alex Python', xp: 15400, level: 15, rank: 1, trend: 'stable' },
  { id: '2', name: 'Sarah Coder', xp: 14200, level: 14, rank: 2, trend: 'up' },
  { id: '3', name: 'Mike Dev', xp: 12800, level: 12, rank: 3, trend: 'down' },
  { id: '4', name: 'Emma Script', xp: 11500, level: 11, rank: 4, trend: 'up' },
  { id: '5', name: 'John Logic', xp: 10200, level: 10, rank: 5, trend: 'stable' },
  { id: '6', name: 'Chris Byte', xp: 9800, level: 9, rank: 6, trend: 'stable' },
  { id: '7', name: 'Lisa Data', xp: 8500, level: 8, rank: 7, trend: 'down' },
];

export const Leaderboard: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Papan Peringkat Global</h1>
          <p className="text-zinc-500">Lihat peringkat Anda dibandingkan dengan penjelajah Python lainnya di seluruh dunia.</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 items-end pt-12 pb-8">
          <PodiumItem entry={mockData[1]} height="h-48" color="bg-zinc-100" medal={<Medal className="text-zinc-400" size={32} />} />
          <PodiumItem entry={mockData[0]} height="h-64" color="bg-emerald-50" medal={<Trophy className="text-amber-500" size={48} />} />
          <PodiumItem entry={mockData[2]} height="h-40" color="bg-orange-50" medal={<Medal className="text-orange-400" size={32} />} />
        </div>

        {/* List */}
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 px-6 py-4 bg-zinc-50 border-b border-zinc-100 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <div className="col-span-1">Peringkat</div>
            <div className="col-span-6">Penjelajah</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-3 text-right">Total XP</div>
          </div>
          
          <div className="divide-y divide-zinc-100">
            {mockData.map((entry) => (
              <div key={entry.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-zinc-50 transition-colors group">
                <div className="col-span-1 flex items-center gap-2">
                  <span className="font-bold text-zinc-900">{entry.rank}</span>
                  <TrendIcon trend={entry.trend} />
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200" />
                  <span className="font-bold text-zinc-900">{entry.name}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="px-2 py-1 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-600">Lvl {entry.level}</span>
                </div>
                <div className="col-span-3 text-right font-bold text-emerald-600">
                  {entry.xp.toLocaleString()} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PodiumItem: React.FC<{ entry: LeaderboardEntry; height: string; color: string; medal: React.ReactNode }> = ({ entry, height, color, medal }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative">
      <div className="w-20 h-20 rounded-full bg-zinc-200 border-4 border-white shadow-xl" />
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
        {medal}
      </div>
    </div>
    <div className="text-center">
      <div className="font-bold text-lg">{entry.name}</div>
      <div className="text-sm text-zinc-500">{entry.xp.toLocaleString()} XP</div>
    </div>
    <div className={cn("w-full rounded-t-3xl shadow-inner flex items-center justify-center", height, color)}>
      <span className="text-4xl font-black text-white/20">#{entry.rank}</span>
    </div>
  </div>
);

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'stable' }> = ({ trend }) => {
  if (trend === 'up') return <ArrowUp size={14} className="text-emerald-500" />;
  if (trend === 'down') return <ArrowDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-zinc-300" />;
};
