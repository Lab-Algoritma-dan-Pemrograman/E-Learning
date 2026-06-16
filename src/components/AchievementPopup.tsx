import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Bug, Target, Flame, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Achievement } from '../services/achievementService';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

const IconMap: Record<string, any> = {
  Bug, Target, Zap, Trophy, Flame, Star
};

// Floating sparkle particles
const Particle: React.FC<{ delay: number }> = ({ delay }) => {
  const angle = Math.random() * 360;
  const distance = 90 + Math.random() * 70;
  const size = 5 + Math.random() * 7;

  return (
    <motion.div
      className="absolute rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        background: `hsl(${45 + Math.random() * 20}, 100%, ${50 + Math.random() * 30}%)`, // Gold & Sparkly colors
        left: '50%',
        top: '50%',
        boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
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

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  const Icon = IconMap[achievement.icon] || Star;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content reveal for dramatic effect
    const t = setTimeout(() => setShowContent(true), 300);

    // Grand confetti celebration
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 300 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // First big blast
    confetti({ ...defaults, particleCount: 80, scalar: 1.2, origin: { x: 0.5, y: 0.4 } });

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 45 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } });
    }, 200);

    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Immersive deep dark backdrop with strong blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 100, rotateX: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.3, opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.9 }}
        className="relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-[3.5rem] p-10 max-w-sm w-full shadow-2xl shadow-amber-500/20 border-2 border-amber-500/30 text-center overflow-visible"
        style={{ perspective: 1000 }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-[3.5rem] overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.1) 45%, rgba(251,191,36,0.2) 50%, rgba(251,191,36,0.1) 55%, transparent 70%)',
            }}
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Ambient background glow inside card */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

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
                    <Particle key={i} delay={0.1 + i * 0.04} />
                  ))}
                </div>
              </div>

              {/* Animated glow ring */}
              <div className="relative mb-8 mt-4">
                <motion.div
                  className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-amber-500/40 via-rose-500/30 to-yellow-500/40 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.9, 0.6],
                    rotate: 360
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -inset-3 rounded-[2.2rem] border-2 border-amber-400/40"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.div 
                  initial={{ rotate: -30, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 8, stiffness: 120, delay: 0.2 }}
                  className="relative w-32 h-32 bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-zinc-950 rounded-[2.2rem] flex items-center justify-center shadow-2xl shadow-amber-500/50 border-4 border-zinc-950"
                >
                  <Icon size={56} className="text-zinc-950 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
                  {/* Sparkle badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 border-2 border-zinc-950"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <Sparkles size={16} className="text-white" />
                  </motion.div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 text-[10px] font-black text-amber-300 uppercase tracking-[0.3em] mb-4 bg-amber-950/60 border border-amber-500/35 px-5 py-2 rounded-full shadow-inner">
                  <Sparkles size={11} className="text-amber-400 animate-pulse" />
                  Pencapaian Terbuka!
                  <Sparkles size={11} className="text-amber-400 animate-pulse" />
                </div>
              </motion.div>

              <motion.h2 
                className="text-3xl font-black bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent mb-3 leading-tight drop-shadow-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {achievement.title}
              </motion.h2>

              <motion.p 
                className="text-zinc-300 text-sm font-semibold leading-relaxed mb-8 px-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {achievement.description}
              </motion.p>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-4.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border-b-4 border-amber-800 text-zinc-950 font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 text-sm uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 active:border-b-0 active:translate-y-[4px]"
              >
                Luar Biasa! ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-xl transition-colors z-10"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
};
