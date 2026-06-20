import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BookOpen, Trophy, Zap, ChevronRight, Play, Code2, BarChart3, BrainCircuit, ExternalLink } from 'lucide-react';
import { useStore } from '../store/useStore';

const WEB_UTAMA_URL = import.meta.env.VITE_WEB_UTAMA_URL || '#';

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const setUser = useStore((state) => state.setUser);
  const setPage = useStore((state) => state.setPage);

  const handleGoToWebUtama = () => {
    if (WEB_UTAMA_URL && WEB_UTAMA_URL !== '#') {
      window.location.href = WEB_UTAMA_URL;
    }
  };

  const handleDevLogin = (role: 'admin' | 'praktikan') => {
    const mockUser = {
      nim: role === 'admin' ? '123456789' : '202211083',
      nama: role === 'admin' ? 'Developer Admin (Kordas)' : 'Developer Praktikan',
      kelas: 'DEV-X',
      role: role,
      xp: role === 'admin' ? 9999 : 120,
      level: role === 'admin' ? 10 : 1,
      streak: 3,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      assessmentAccess: {
        pre_test: true,
        post_test: true,
        program_keterampilan: true,
        ujian_praktik: true
      },
      levelAccessOverrides: {}
    };
    setUser(mockUser);
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-transparent text-dark font-sans selection:bg-maroon-bg selection:text-maroon">
      {/* Navbar */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-[#FDFBF7]/80 backdrop-blur-md z-50 border-b border-maroon/5">
        <div 
          onClick={() => setPage('dashboard')}
          className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer"
        >
          <div className="w-11 h-11 bg-maroon rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-bubbly-maroon rotate-[-6deg] hover:rotate-0 transition-transform">
            E
          </div>
          <span className="text-maroon font-black tracking-tight ml-1">E-Learning</span>
        </div>
        <button 
          onClick={handleGoToWebUtama}
          className="bg-maroon hover:bg-maroon-light text-white px-8 py-3.5 rounded-2xl font-black transition-all active:scale-95 shadow-bubbly-maroon active:translate-y-[6px] active:shadow-none btn-bubbly flex items-center gap-2 text-sm cursor-pointer"
        >
          <ExternalLink size={16} />
          Mulai Sekarang
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-40 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-fun-yellow/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-maroon/5 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-maroon-bg text-maroon rounded-2xl text-xs font-black border border-maroon/10 uppercase tracking-widest">
            <Zap size={14} fill="currentColor" className="text-fun-yellow" />
            Join the pro league!
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-dark">
            Jago <span className="text-maroon">Coding</span> <br />
            Tanpa <span className="italic font-serif text-zinc-400">Pusing.</span>
          </h1>

          <p className="text-xl text-zinc-550 max-w-lg leading-relaxed font-bold">
            Siap buat naik level? Yuk pelajari <span className="text-dark font-black underline decoration-maroon underline-offset-4 decoration-2">Python</span> & <span className="text-dark font-black underline decoration-fun-blue underline-offset-4 decoration-2">Bahasa C</span> dengan cara yang lebih seru dan interaktif.
          </p>

          {/* New Access Info */}
          <div className="p-6 bg-white border border-maroon/5 rounded-[2rem] shadow-soft max-w-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-maroon/5 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-150" />
            <div className="flex gap-4 relative z-10">
              <div className="w-12 h-12 bg-maroon text-white rounded-2xl flex items-center justify-center shrink-0 shadow-bubbly-maroon">
                <Play size={24} fill="currentColor" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wide mb-1 text-dark">Gimana caranya masuk?</h4>
                <p className="text-zinc-550 text-xs leading-relaxed font-semibold">
                  Login via <span className="font-bold text-dark">Web Utama</span> pakai NIM kamu, trus klik tombol <span className="font-bold text-maroon">E-Learning</span>. Gampang kan?
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <button 
              onClick={handleGoToWebUtama}
              className="group w-full sm:w-auto bg-maroon hover:bg-maroon-light text-white px-12 py-6 rounded-[2rem] font-black text-xl transition-all shadow-bubbly-maroon active:translate-y-[6px] active:shadow-none btn-bubbly flex items-center justify-center gap-3 cursor-pointer"
            >
              Let's Go!
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {import.meta.env.DEV && (
            <div className="pt-6 border-t border-maroon/5 space-y-3">
              <p className="text-xs font-black text-maroon/50 uppercase tracking-widest">🧪 Developer Quick Access (Local Only)</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleDevLogin('admin')}
                  className="px-4 py-2 bg-zinc-950 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  Masuk sebagai Admin
                </button>
                <button
                  onClick={() => handleDevLogin('praktikan')}
                  className="px-4 py-2 bg-white hover:bg-zinc-55 text-zinc-900 text-xs font-bold rounded-xl transition-all active:scale-95 border border-zinc-200 flex items-center gap-1.5 cursor-pointer"
                >
                  Masuk sebagai Praktikan
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
          className="relative"
        >
          <div className="bg-zinc-950 rounded-[3rem] p-8 shadow-[0_50px_100px_-20px_rgba(138,21,56,0.3)] border border-white/5 relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-maroon/10 via-transparent to-fun-blue/10 opacity-50" />
            <div className="flex items-center justify-between mb-8 px-2 relative z-10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold">coding_adventure.v1</div>
            </div>
            <pre className="font-mono text-sm md:text-lg text-zinc-300 p-4 leading-relaxed relative z-10">
              <span className="text-zinc-650 italic">// Bahasa C</span><br />
              <span className="text-rose-400">#include</span> <span className="text-amber-300">&lt;stdio.h&gt;</span><br />
              <span className="text-rose-400">int</span> <span className="text-blue-450">main</span>() {"{"}<br />
              &nbsp;&nbsp;<span className="text-blue-450">printf</span>(<span className="text-amber-300">"Waktunya Jadi Pro!"</span>);<br />
              &nbsp;&nbsp;<span className="text-rose-400">return</span> <span className="text-amber-300">0</span>;<br />
              {"}"}<br />
              <br />
              <span className="text-zinc-650 italic"># Python</span><br />
              <span className="text-rose-400">def</span> <span className="text-blue-450">semangat</span>():<br />
              &nbsp;&nbsp;<span className="text-blue-450">print</span>(<span className="text-amber-300">"Kamu Pasti Bisa!"</span>)<br />
            </pre>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-maroon/20 blur-3xl rounded-full" />
          </div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-maroon/10 rounded-full blur-[100px]" />
        </motion.div>
      </section>

      {/* Curriculum Grid */}
      <section className="px-6 md:px-12 py-32 border-y border-maroon/5 bg-maroon-bg/25">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-dark">Level Up Perjalananmu</h2>
            <p className="text-xl text-zinc-550 max-w-2xl mx-auto font-bold">
              Gak perlu bingung mulai dari mana. Kita udah susun jalan ninja kamu biar makin jago step-by-step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CurriculumCard 
              icon={<Terminal className="text-fun-blue" />} 
              title="Level 1" 
              desc="DASAR LOGIKA ALGORITMA DAN PEMROGRAMAN BAHASA C"
              level="Bahasa C"
            />
            <CurriculumCard 
              icon={<Code2 className="text-fun-blue" />} 
              title="Level 2" 
              desc="STRUKTUR KONTROL DALAM BAHASA C"
              level="Bahasa C"
            />
            <CurriculumCard 
              icon={<BookOpen className="text-fun-blue" />} 
              title="Level 3" 
              desc="ARRAY, STRUCT, dan OPERASI FILE"
              level="Bahasa C"
            />
            <CurriculumCard 
              icon={<Terminal className="text-maroon" />} 
              title="Level 4" 
              desc="PENGENALAN DASAR BAHASA PYTHON"
              level="Python"
            />
            <CurriculumCard 
              icon={<Code2 className="text-maroon" />} 
              title="Level 5" 
              desc="PERCABANGAN DAN PERULANGAN PADA BAHASA PYTHON"
              level="Python"
            />
            <CurriculumCard 
              icon={<BarChart3 className="text-maroon" />} 
              title="Level 6" 
              desc="LIST, DICTIONARY, DAN OPERASI FILE"
              level="Python"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-6xl mx-auto bg-zinc-950 rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(138,21,56,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(138,21,56,0.3),transparent_70%)]" />
          <h2 className="text-5xl md:text-8xl font-black text-white relative z-10 tracking-tighter leading-tight">Siap Jadi <br />Game Changer?</h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto relative z-10 leading-relaxed font-bold">
            Buruan masuk dan tunjukin skill kamu. Ratusan tantangan seru udah nungguin buat kamu taklukin!
          </p>
          <button 
            onClick={handleGoToWebUtama}
            className="bg-white hover:bg-maroon-bg text-dark px-16 py-7 rounded-[2.5rem] font-black text-2xl hover:text-maroon transition-all active:scale-95 relative z-10 shadow-2xl shadow-maroon/10 flex items-center gap-3 mx-auto cursor-pointer"
          >
            Mulai Sekarang!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 border-t border-maroon/5 text-center space-y-4">
        <div className="font-black text-xl tracking-tighter text-maroon/30 uppercase">Lab-AP E-Learning</div>
        <div className="text-zinc-500 text-sm font-bold">
          Dibuat oleh Aslab AP untuk praktikan tercinta
        </div>
      </footer>
    </div>
  );
};

const CurriculumCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; level: string }> = ({ icon, title, desc, level }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-maroon/5 hover:border-maroon/20 hover:shadow-soft transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-maroon-bg rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150" />
    <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-maroon-bg transition-all relative z-10 shadow-sm">
      {icon}
    </div>
    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 relative z-10">{level}</div>
    <h3 className="text-2xl font-black mb-4 relative z-10 group-hover:text-maroon transition-colors">{title}</h3>
    <p className="text-zinc-500 leading-relaxed relative z-10 text-sm font-semibold italic">"{desc}"</p>
  </div>
);
