import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelUpPopupProps {
  level: number;
  onClose: () => void;
}

// Sparkle particle component for level up effect
const SparkleParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const angle = Math.random() * 360;
  const distance = 90 + Math.random() * 70;
  const size = 3 + Math.random() * 5;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `hsl(${45 + Math.random() * 20}, 100%, ${60 + Math.random() * 25}%)`, // Gold / amber sparkles
        left: '50%',
        top: '50%',
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{ duration: 1.8, delay, ease: 'easeOut' }}
    />
  );
};

export const LevelUpPopup: React.FC<LevelUpPopupProps> = ({ level, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reveal content after a tiny delay
    const t = setTimeout(() => setShowContent(true), 200);

    // Fire a big double confetti burst for leveling up!
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#e11d48', '#fbbf24', '#3b82f6', '#10b981']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#e11d48', '#fbbf24', '#3b82f6', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
      {/* Dark blurry backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-950/65 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Main level up container */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0, y: 100, rotateX: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.2, opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 15, stiffness: 180 }}
        className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 text-white rounded-[3.5rem] p-10 max-w-sm w-full shadow-2xl shadow-rose-950/40 text-center overflow-visible border border-zinc-800"
        style={{ perspective: 1000 }}
      >
        {/* Subtle top header gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent -z-10 rounded-t-[3.5rem]" />

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center relative"
            >
              {/* Particle burst */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: -30 }}>
                <div className="relative w-0 h-0">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <SparkleParticle key={i} delay={0.05 + i * 0.04} />
                  ))}
                </div>
              </div>

              {/* Level Up Badge and Rings */}
              <div className="relative mb-6">
                {/* Glowing backgrounds */}
                <motion.div
                  className="absolute -inset-6 rounded-full bg-gradient-to-br from-rose-500/30 via-amber-400/20 to-purple-600/30 blur-2xl"
                  animate={{ 
                    scale: [1, 1.25, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                
                <motion.div 
                  initial={{ rotate: -45, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 120, delay: 0.15 }}
                  className="relative w-28 h-28 bg-gradient-to-tr from-amber-500 via-rose-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/30 border-4 border-zinc-900"
                >
                  <Trophy size={48} className="text-amber-100" />
                  
                  {/* Miniature sparkles */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-md border-2 border-zinc-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <Sparkles size={12} className="text-zinc-950 font-bold" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Title & Level Indicator */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 mb-8"
              >
                <div className="inline-flex items-center gap-1 text-[10px] font-black text-amber-400 uppercase tracking-[0.25em] bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  LEVEL UP!
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                </div>
                
                <h2 className="text-3xl font-black tracking-tight mt-2 text-white">
                  Mencapai Level {level}
                </h2>
                
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                  Selamat! Perjalanan belajarmu semakin hebat. Terus selesaikan tantangan untuk naik level berikutnya!
                </p>
              </motion.div>

              {/* Dismiss button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-black rounded-2xl shadow-xl shadow-rose-950/50 text-sm uppercase tracking-widest transition-all"
              >
                Lanjutkan Belajar 🚀
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Small Close Icon */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-xl transition-colors z-10"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
};
