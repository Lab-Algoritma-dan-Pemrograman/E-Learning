import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BookOpen, Trophy, Zap, ChevronRight, Play, Code2, BarChart3, BrainCircuit, ExternalLink } from 'lucide-react';

const WEB_UTAMA_URL = import.meta.env.VITE_WEB_UTAMA_URL || '#';

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {

  const handleGoToWebUtama = () => {
    if (WEB_UTAMA_URL && WEB_UTAMA_URL !== '#') {
      window.location.href = WEB_UTAMA_URL;
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Navbar */}
      <nav className="h-20 border-b border-zinc-100 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
          <div className="w-10 h-10 bg-rose-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-700/20">
            E
          </div>
          <span>E-Learning</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-500">
          <a href="#curriculum" className="hover:text-zinc-900 transition-colors">Kurikulum</a>
          <a href="#features" className="hover:text-zinc-900 transition-colors">Fitur</a>
        </div>
        <button 
          onClick={handleGoToWebUtama}
          className="bg-zinc-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-900/10 flex items-center gap-2"
        >
          <ExternalLink size={16} />
          Masuk via Web Utama
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-sm font-bold border border-rose-100">
            <Zap size={16} fill="currentColor" />
            Baru: Jalur Pembelajaran Mesin Tersedia
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Kuasai <span className="text-rose-700">Logika</span> & <br />
            <span className="text-rose-700">Kode</span> Pemrograman.
          </h1>

          {/* Access info card */}
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
            <p className="text-blue-800 text-sm font-medium leading-relaxed">
              <strong>ℹ️ Cara Mengakses:</strong> Silakan login melalui <strong>Web Utama</strong> menggunakan NIM dan Password Anda. 
              Setelah login, klik menu <strong>"E-Learning"</strong> untuk mulai belajar.
            </p>
          </div>

          <p className="text-xl text-zinc-500 max-w-lg leading-relaxed">
            Cara paling interaktif untuk belajar <span className="text-zinc-900 font-bold">Python</span> & <span className="text-zinc-900 font-bold">Bahasa C</span>. Bangun pondasi algoritma yang kuat dan kuasai industri teknologi.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={handleGoToWebUtama}
              className="w-full sm:w-auto bg-rose-700 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-rose-600 transition-all shadow-2xl shadow-rose-700/30 active:scale-95 flex items-center justify-center gap-2"
            >
              Masuk via Web Utama
              <ExternalLink size={22} />
            </button>
            <div className="flex items-center gap-2 text-zinc-400 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200" />
                ))}
              </div>
              <span className="text-sm">Bergabung dengan 10rb+ siswa</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-zinc-900 rounded-3xl p-4 shadow-2xl border border-zinc-800 relative z-10">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-rose-700" />
            </div>
            <pre className="font-mono text-sm md:text-base text-zinc-300 p-4 leading-relaxed">
              <span className="text-zinc-500">// Bahasa C</span><br />
              <span className="text-rose-400">#include</span> <span className="text-amber-300">&lt;stdio.h&gt;</span><br />
              <span className="text-rose-400">int</span> <span className="text-blue-400">main</span>() {"{"}<br />
              &nbsp;&nbsp;<span className="text-blue-400">printf</span>(<span className="text-amber-300">"Mari Belajar Kode!"</span>);<br />
              &nbsp;&nbsp;<span className="text-rose-400">return</span> <span className="text-amber-300">0</span>;<br />
              {"}"}<br />
              <br />
              <span className="text-zinc-500"># Python</span><br />
              <span className="text-rose-400">def</span> <span className="text-blue-400">hello</span>():<br />
              &nbsp;&nbsp;<span className="text-blue-400">print</span>(<span className="text-amber-300">"Semangat Belajar!"</span>)<br />
            </pre>
          </div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-rose-700/20 rounded-full blur-3xl" />
          <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Curriculum Grid */}
      <section id="curriculum" className="px-6 md:px-12 py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Terstruktur untuk Kesuksesan</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
              Kami membimbing Anda dari nol hingga siap kerja dengan kurikulum yang dirancang oleh para ahli industri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CurriculumCard 
              icon={<Terminal className="text-rose-700" />} 
              title="Dasar-dasar" 
              desc="Variabel, perulangan, dan logika. Inti dari segalanya."
              level="Level 1-2"
            />
            <CurriculumCard 
              icon={<Code2 className="text-blue-500" />} 
              title="Fungsi & Data" 
              desc="Kode bersih dan struktur data yang kompleks."
              level="Level 3-4"
            />
            <CurriculumCard 
              icon={<BarChart3 className="text-purple-500" />} 
              title="Analisis Data" 
              desc="Pandas, NumPy, and dataset dunia nyata."
              level="Level 5-6"
            />
            <CurriculumCard 
              icon={<BrainCircuit className="text-amber-500" />} 
              title="Pembelajaran Mesin" 
              desc="Regresi, klasifikasi, dan evaluasi model."
              level="Level 7-8"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-5xl mx-auto bg-zinc-900 rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(159,18,57,0.15),transparent_70%)]" />
          <h2 className="text-4xl md:text-6xl font-black text-white relative z-10">Siap untuk memulai perjalanan Anda?</h2>
          <p className="text-zinc-400 text-xl max-w-xl mx-auto relative z-10">
            Login melalui Web Utama dengan NIM dan Password Anda, lalu akses E-Learning untuk mulai belajar Python & Bahasa C.
          </p>
          <button 
            onClick={handleGoToWebUtama}
            className="bg-white text-zinc-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-zinc-100 transition-all active:scale-95 relative z-10 shadow-2xl shadow-white/10 flex items-center gap-2 mx-auto"
          >
            <ExternalLink size={22} />
            Masuk via Web Utama
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-zinc-100 text-center text-zinc-400 text-sm font-medium">
        &copy; 2026 Lab-AP | E-Learning. Seluruh hak cipta dilindungi undang-undang.
      </footer>
    </div>
  );
};

const CurriculumCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; level: string }> = ({ icon, title, desc, level }) => (
  <div className="bg-white p-8 rounded-3xl border border-zinc-200 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-700/5 transition-all group">
    <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">{level}</div>
    <h3 className="text-xl font-black mb-3">{title}</h3>
    <p className="text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);
