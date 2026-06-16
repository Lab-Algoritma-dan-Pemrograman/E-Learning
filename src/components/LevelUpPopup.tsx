import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles, X, Zap, Crown, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playLevelUpSound } from '../lib/soundEffects';

interface LevelUpPopupProps {
  level: number;
  onClose: () => void;
}

// Orbiting star around trophy
const OrbitStar: React.FC<{ index: number; total: number; radius: number }> = ({ index, total, radius }) => {
  const angle = (index / total) * 360;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;
  const size = index % 2 === 0 ? 10 : 7;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', marginLeft: -size / 2, marginTop: -size / 2 }}
      initial={{ x, y, scale: 0, opacity: 0 }}
      animate={{ x, y, scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.07 }}
    >
      <Star size={size} className="fill-amber-300 text-amber-300" />
    </motion.div>
  );
};

// Starburst ray
const Ray: React.FC<{ angle: number; delay: number }> = ({ angle, delay }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: '50%',
      top: '50%',
      width: 120,
      height: 2,
      marginTop: -1,
      transformOrigin: 'left center',
      rotate: angle,
      background: 'linear-gradient(to right, rgba(251,191,36,0.7), transparent)',
      borderRadius: 2,
    }}
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }}
    transition={{ duration: 1.4, delay, ease: 'easeOut' }}
  />
);

export const LevelUpPopup: React.FC<LevelUpPopupProps> = ({ level, onClose }) => {
  useEffect(() => {
    // Sound — play immediately on mount
    playLevelUpSound();

    // Big center blast
    confetti({
      particleCount: 160,
      spread: 360,
      startVelocity: 55,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#fbbf24', '#f59e0b', '#e11d48', '#3b82f6', '#10b981', '#8b5cf6', '#f472b6', '#fff'],
      scalar: 1.4,
      ticks: 200,
      zIndex: 310,
    });

    // Side canons
    const t1 = setTimeout(() => {
      confetti({ particleCount: 90, angle: 55,  spread: 65, startVelocity: 65, origin: { x: 0, y: 0.5 }, colors: ['#fbbf24', '#f59e0b', '#e11d48'], zIndex: 310 });
      confetti({ particleCount: 90, angle: 125, spread: 65, startVelocity: 65, origin: { x: 1, y: 0.5 }, colors: ['#10b981', '#8b5cf6', '#f472b6'], zIndex: 310 });
    }, 200);

    // Star shapes burst at 0.8s
    const t2 = setTimeout(() => {
      confetti({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.3 }, shapes: ['star'], colors: ['#fbbf24', '#fff', '#fde68a'], scalar: 1.5, ticks: 150, zIndex: 310 });
    }, 800);

    // Sustained stream for 5s
    const end = Date.now() + 5000;
    let toggle = false;
    const stream = setInterval(() => {
      if (Date.now() > end) { clearInterval(stream); return; }
      toggle = !toggle;
      confetti({
        particleCount: 8,
        angle: toggle ? 70 : 110,
        spread: 50,
        origin: { x: toggle ? 0.1 : 0.9, y: 0.35 },
        colors: ['#fbbf24', '#e11d48', '#3b82f6', '#10b981', '#8b5cf6'],
        gravity: 0.8,
        ticks: 120,
        zIndex: 310,
      });
    }, 150);

    // Final shower
    const t3 = setTimeout(() => {
      confetti({ particleCount: 120, spread: 120, startVelocity: 40, origin: { x: 0.5, y: 0.2 }, shapes: ['star', 'circle'], colors: ['#fbbf24', '#f59e0b', '#fff'], scalar: 1.2, ticks: 160, zIndex: 310 });
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(stream);
    };
  }, []);

  const rays = Array.from({ length: 16 }, (_, i) => (i / 16) * 360);

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
      {/* Flash overlay — pure CSS, no state needed */}
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-amber-200 pointer-events-none"
        style={{ zIndex: 209 }}
      />

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 backdrop-blur-xl"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(120,53,15,0.35) 0%, rgba(0,0,0,0.9) 100%)' }}
        onClick={onClose}
      />

      {/* Starburst rays — behind card */}
      <div className="absolute pointer-events-none" style={{ left: '50%', top: '50%', width: 0, height: 0, zIndex: 211 }}>
        {rays.map((angle, i) => (
          <Ray key={i} angle={angle} delay={0.1 + i * 0.04} />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.2, opacity: 0 }}
        transition={{ type: 'spring', damping: 13, stiffness: 170, delay: 0.1 }}
        className="relative text-white rounded-[3.5rem] p-10 max-w-sm w-full text-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1c1008 0%, #0f0a04 40%, #0a0a12 100%)',
          boxShadow: '0 0 0 1.5px rgba(251,191,36,0.25), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(251,191,36,0.12)',
          zIndex: 212,
        }}
      >
        {/* Animated golden border */}
        <motion.div
          className="absolute inset-0 rounded-[3.5rem] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #fde68a, #fbbf24)',
            backgroundSize: '400% 400%',
            padding: 2,
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute inset-[2px] rounded-[calc(3.5rem-2px)]"
            style={{ background: 'linear-gradient(160deg, #1c1008 0%, #0f0a04 40%, #0a0a12 100%)' }}
          />
        </motion.div>

        {/* Inner golden glow top */}
        <div
          className="absolute top-0 left-0 w-full h-36 pointer-events-none rounded-t-[3.5rem]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.25) 0%, transparent 70%)', opacity: 0.8 }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center" style={{ zIndex: 3 }}>

          {/* Icon area */}
          <div className="relative mb-6 mt-2">
            {/* Radial glow */}
            <div
              className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.28) 0%, transparent 70%)' }}
            />

            {/* Orbiting stars */}
            <div className="absolute pointer-events-none" style={{ width: 0, height: 0, left: '50%', top: '50%' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <OrbitStar key={i} index={i} total={8} radius={72} />
              ))}
            </div>

            {/* Double ring */}
            <motion.div
              className="absolute -inset-5 rounded-full border-2 border-amber-400/50 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-2 rounded-full border border-amber-300/30 pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Trophy circle */}
            <motion.div
              initial={{ rotate: -25, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 8, stiffness: 140 }}
              className="relative w-32 h-32 rounded-full flex items-center justify-center border-4 border-black"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 35%, #d97706 65%, #fbbf24 100%)',
                boxShadow: '0 0 0 4px rgba(251,191,36,0.25), 0 12px 50px rgba(245,158,11,0.45), inset 0 2px 4px rgba(255,255,255,0.25)',
              }}
            >
              <Trophy size={50} className="text-amber-900 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" />

              {/* Crown badge */}
              <motion.div
                className="absolute -top-3 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-2 border-black"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <Crown size={16} className="text-white" />
              </motion.div>

              {/* Zap badge */}
              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
              >
                <Zap size={14} className="text-white fill-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* LEVEL UP pill */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 250 }}
            className="mb-2"
          >
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10">
              <Star size={10} className="fill-amber-300 text-amber-300" />
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-[0.3em]">Level Up!</span>
              <Star size={10} className="fill-amber-300 text-amber-300" />
            </div>
          </motion.div>

          {/* Big level number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.32, type: 'spring', stiffness: 180 }}
            className="relative mb-1"
          >
            <span
              className="text-7xl font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 40%, #f59e0b 70%, #fde68a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5))',
              }}
            >
              {level}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            className="text-xl font-black text-white mb-2 tracking-tight"
          >
            Mencapai Level {level}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.44, duration: 0.4 }}
            className="text-zinc-400 text-sm leading-relaxed mb-8 px-4 max-w-[270px] mx-auto"
          >
            Keren! Kemampuanmu terus berkembang. Setiap langkah kecil membawamu lebih dekat ke puncak!
          </motion.p>

          {/* CTA button */}
          <motion.button
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full py-4 text-amber-900 font-black rounded-2xl text-sm uppercase tracking-widest border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
              boxShadow: '0 8px 30px rgba(251,191,36,0.3)',
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <ArrowUp size={14} />
              Lanjutkan Belajar
              <Sparkles size={14} />
            </span>
          </motion.button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-200 hover:bg-white/10 rounded-xl transition-colors"
          style={{ zIndex: 10 }}
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
};
