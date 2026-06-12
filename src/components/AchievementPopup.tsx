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
  const distance = 80 + Math.random() * 60;
  const size = 4 + Math.random() * 6;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `hsl(${340 + Math.random() * 40}, 80%, ${60 + Math.random() * 20}%)`,
        left: '50%',
        top: '50%',
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
      }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
    />
  );
};

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  const Icon = IconMap[achievement.icon] || Star;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content reveal for dramatic effect
    const t = setTimeout(() => setShowContent(true), 300);

    // Confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-900/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 80, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.3, opacity: 0, y: 80 }}
        transition={{ type: 'spring', damping: 18, stiffness: 200, mass: 0.8 }}
        className="relative bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl shadow-rose-900/20 text-center overflow-visible"
        style={{ perspective: 1000 }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 55%, transparent 60%)',
            }}
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-rose-50 via-amber-50/30 to-transparent -z-10 rounded-t-[3rem]" />

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center relative"
            >
              {/* Particle burst */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: -20 }}>
                <div className="relative w-0 h-0">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <Particle key={i} delay={0.1 + i * 0.05} />
                  ))}
                </div>
              </div>

              {/* Animated glow ring */}
              <div className="relative mb-8">
                <motion.div
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-rose-400/30 via-amber-400/20 to-pink-500/30 blur-xl"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -inset-2 rounded-[2rem] border-2 border-rose-300/40"
                  animate={{ 
                    scale: [1, 1.08, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.div 
                  initial={{ rotate: -30, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 8, stiffness: 150, delay: 0.2 }}
                  className="relative w-28 h-28 bg-gradient-to-br from-rose-600 to-pink-700 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-rose-500/30 border-4 border-white"
                >
                  <Icon size={52} />
                  {/* Sparkle badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/40 border-2 border-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <Sparkles size={14} className="text-white" />
                  </motion.div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-rose-700 uppercase tracking-[0.3em] mb-3 bg-rose-50 px-4 py-1.5 rounded-full">
                  <Sparkles size={10} />
                  Achievement Unlocked!
                  <Sparkles size={10} />
                </div>
              </motion.div>

              <motion.h2 
                className="text-2xl font-black text-zinc-900 mb-2 leading-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {achievement.title}
              </motion.h2>

              <motion.p 
                className="text-zinc-500 text-sm leading-relaxed mb-8"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-black rounded-2xl transition-all shadow-xl shadow-zinc-900/20 text-sm uppercase tracking-widest"
              >
                Luar Biasa! ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors z-10"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
};
