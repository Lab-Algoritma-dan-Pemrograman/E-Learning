import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Bug, Target, Flame, X, Sparkles, Award, Crown, Heart, Rocket, Medal, Gift, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Achievement } from '../services/achievementService';
import { playAchievementSound } from '../lib/soundEffects';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

// Palet warna ceria per ikon
const IconThemeMap: Record<string, {
  Icon: React.ElementType;
  bg: string;
  glow: string;
  badge: string;
  ring: string;
  textGrad: string;
  emoji: string;
}> = {
  Bug:    { Icon: Bug,    bg: 'from-lime-400 via-green-400 to-emerald-500',   glow: 'rgba(52,211,153,0.35)',  badge: 'from-lime-500 to-green-600',    ring: 'rgba(52,211,153,0.5)',  textGrad: 'from-lime-300 via-green-200 to-emerald-200',   emoji: '🐛' },
  Target: { Icon: Target, bg: 'from-sky-400 via-blue-500 to-indigo-500',      glow: 'rgba(96,165,250,0.35)',  badge: 'from-sky-500 to-blue-600',      ring: 'rgba(96,165,250,0.5)',  textGrad: 'from-sky-200 via-blue-200 to-indigo-200',      emoji: '🎯' },
  Zap:    { Icon: Zap,    bg: 'from-yellow-300 via-amber-400 to-orange-500',  glow: 'rgba(251,191,36,0.35)', badge: 'from-yellow-400 to-orange-500', ring: 'rgba(251,191,36,0.5)', textGrad: 'from-yellow-200 via-amber-200 to-orange-200',  emoji: '⚡' },
  Trophy: { Icon: Trophy, bg: 'from-amber-400 via-yellow-400 to-yellow-500',  glow: 'rgba(251,191,36,0.4)',  badge: 'from-amber-500 to-yellow-600',  ring: 'rgba(251,191,36,0.5)', textGrad: 'from-amber-200 via-yellow-200 to-amber-100',   emoji: '🏆' },
  Flame:  { Icon: Flame,  bg: 'from-orange-400 via-red-500 to-rose-600',      glow: 'rgba(244,63,94,0.35)',  badge: 'from-orange-500 to-red-600',    ring: 'rgba(244,63,94,0.5)',  textGrad: 'from-orange-200 via-red-200 to-rose-200',      emoji: '🔥' },
  Star:   { Icon: Star,   bg: 'from-purple-400 via-violet-500 to-fuchsia-500',glow: 'rgba(167,139,250,0.35)',badge: 'from-purple-500 to-fuchsia-600',ring: 'rgba(167,139,250,0.5)',textGrad: 'from-purple-200 via-violet-200 to-fuchsia-200', emoji: '⭐' },
  Award:  { Icon: Award,  bg: 'from-teal-400 via-cyan-400 to-sky-500',        glow: 'rgba(34,211,238,0.35)', badge: 'from-teal-500 to-cyan-600',     ring: 'rgba(34,211,238,0.5)', textGrad: 'from-teal-200 via-cyan-200 to-sky-200',        emoji: '🎖️' },
  Crown:  { Icon: Crown,  bg: 'from-yellow-400 via-amber-400 to-yellow-600',  glow: 'rgba(251,191,36,0.45)', badge: 'from-yellow-500 to-amber-600',  ring: 'rgba(251,191,36,0.5)', textGrad: 'from-yellow-200 via-amber-200 to-yellow-100',  emoji: '👑' },
  Heart:  { Icon: Heart,  bg: 'from-pink-400 via-rose-500 to-red-500',        glow: 'rgba(244,114,182,0.35)',badge: 'from-pink-500 to-rose-600',     ring: 'rgba(244,114,182,0.5)',textGrad: 'from-pink-200 via-rose-200 to-red-200',        emoji: '❤️' },
  Rocket: { Icon: Rocket, bg: 'from-indigo-400 via-blue-500 to-violet-600',   glow: 'rgba(99,102,241,0.35)', badge: 'from-indigo-500 to-violet-600', ring: 'rgba(99,102,241,0.5)', textGrad: 'from-indigo-200 via-blue-200 to-violet-200',   emoji: '🚀' },
  Medal:  { Icon: Medal,  bg: 'from-orange-300 via-amber-400 to-yellow-500',  glow: 'rgba(251,191,36,0.35)', badge: 'from-orange-400 to-yellow-600', ring: 'rgba(251,191,36,0.5)', textGrad: 'from-orange-200 via-amber-200 to-yellow-200',  emoji: '🥇' },
  Gift:   { Icon: Gift,   bg: 'from-fuchsia-400 via-pink-500 to-rose-500',    glow: 'rgba(232,121,249,0.35)',badge: 'from-fuchsia-500 to-pink-600',  ring: 'rgba(232,121,249,0.5)',textGrad: 'from-fuchsia-200 via-pink-200 to-rose-200',    emoji: '🎁' },
  Gem:    { Icon: Gem,    bg: 'from-cyan-400 via-teal-400 to-emerald-500',    glow: 'rgba(34,211,238,0.35)', badge: 'from-cyan-500 to-teal-600',     ring: 'rgba(34,211,238,0.5)', textGrad: 'from-cyan-200 via-teal-200 to-emerald-200',   emoji: '💎' },
};

const DEFAULT_THEME = IconThemeMap['Trophy'];

// Particle burst
const Particle: React.FC<{ index: number; color: string }> = ({ index, color }) => {
  const angle = (index / 24) * 360 + Math.random() * 15;
  const distance = 80 + Math.random() * 70;
  const size = 5 + Math.random() * 7;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, left: '50%', top: '50%', marginLeft: -size / 2, marginTop: -size / 2 }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{ duration: 1.8, delay: index * 0.03, ease: 'easeOut' }}
    />
  );
};

const PARTICLE_COLORS = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb923c', '#f87171', '#4ade80'];

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  const theme = IconThemeMap[achievement.icon] || DEFAULT_THEME;
  const { Icon, bg, glow, badge, ring, textGrad, emoji } = theme;

  useEffect(() => {
    // Sound — play immediately on mount
    playAchievementSound();

    // Burst #1 — immediate center
    confetti({
      particleCount: 100,
      spread: 120,
      startVelocity: 50,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb923c'],
      ticks: 160,
      scalar: 1.3,
      zIndex: 300,
    });

    // Burst #2 — sides
    const t1 = setTimeout(() => {
      confetti({ particleCount: 60, angle: 60,  spread: 70, origin: { x: 0,   y: 0.55 }, colors: ['#fbbf24', '#f472b6', '#60a5fa'], zIndex: 300 });
      confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1,   y: 0.55 }, colors: ['#34d399', '#a78bfa', '#fb923c'], zIndex: 300 });
    }, 300);

    // Burst #3 — rain
    const end = Date.now() + 3500;
    const rain = setInterval(() => {
      if (Date.now() > end) { clearInterval(rain); return; }
      confetti({ particleCount: 10, angle: 80,  spread: 40, origin: { x: Math.random() * 0.4, y: -0.05 }, colors: ['#fbbf24', '#f472b6', '#60a5fa'], gravity: 0.7, zIndex: 300 });
      confetti({ particleCount: 10, angle: 100, spread: 40, origin: { x: 0.6 + Math.random() * 0.4, y: -0.05 }, colors: ['#34d399', '#a78bfa', '#fb923c'], gravity: 0.7, zIndex: 300 });
    }, 280);

    return () => {
      clearTimeout(t1);
      clearInterval(rain);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.3, opacity: 0, y: 60 }}
        transition={{ type: 'spring', damping: 14, stiffness: 160 }}
        className="relative rounded-[2.5rem] p-8 max-w-sm w-full text-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #18181b 0%, #09090b 100%)',
          boxShadow: `0 0 0 1.5px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px ${glow}`,
          zIndex: 1,
        }}
      >
        {/* Animated rainbow border */}
        <div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style={{ padding: 2 }}
        >
          <motion.div
            className="absolute inset-0 rounded-[2.5rem]"
            style={{
              background: 'linear-gradient(135deg, #f472b6, #60a5fa, #34d399, #fbbf24, #a78bfa, #fb923c, #f472b6)',
              backgroundSize: '400% 400%',
            }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[2px] rounded-[calc(2.5rem-2px)] bg-zinc-950" />
        </div>

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 55%, transparent 75%)',
            }}
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative flex flex-col items-center" style={{ zIndex: 3 }}>
          {/* Particle burst */}
          <div className="absolute pointer-events-none" style={{ width: 0, height: 0, left: '50%', top: 80 }}>
            {PARTICLE_COLORS.map((color, i) => (
              Array.from({ length: 3 }).map((_, j) => (
                <Particle key={`${i}-${j}`} index={i * 3 + j} color={color} />
              ))
            ))}
          </div>

          {/* Icon badge */}
          <div className="relative mb-6 mt-4">
            {/* Outer glow */}
            <div
              className="absolute -inset-6 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, filter: 'blur(8px)' }}
            />

            {/* Rotating dashed ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-dashed pointer-events-none"
              style={{ borderColor: ring }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Counter-rotate dotted ring */}
            <motion.div
              className="absolute -inset-2 rounded-full border border-dotted pointer-events-none"
              style={{ borderColor: ring, opacity: 0.5 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />

            {/* Main icon square */}
            <motion.div
              initial={{ rotate: -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 8, stiffness: 130, delay: 0.1 }}
              className={`relative w-28 h-28 bg-gradient-to-br ${bg} rounded-[1.75rem] flex items-center justify-center border-4 border-black`}
              style={{ boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 30px ${glow}` }}
            >
              <Icon size={48} className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />

              {/* Emoji badge top-right */}
              <motion.div
                className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${badge} rounded-full flex items-center justify-center text-base border-2 border-black shadow-lg`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 200 }}
              >
                {emoji}
              </motion.div>

              {/* Sparkle badge bottom-left */}
              <motion.div
                className="absolute -bottom-2 -left-2 w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 border-black shadow"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                <Sparkles size={12} className="text-zinc-800" />
              </motion.div>
            </motion.div>
          </div>

          {/* Badge label */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 border border-white/15 px-4 py-1.5 rounded-full">
              <Sparkles size={10} className="text-yellow-300 animate-pulse" />
              <span className="text-white">Pencapaian Terbuka!</span>
              <Sparkles size={10} className="text-yellow-300 animate-pulse" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.33, duration: 0.4 }}
            className={`text-2xl font-black bg-gradient-to-r ${textGrad} bg-clip-text text-transparent mb-2 leading-tight px-2`}
          >
            {achievement.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.41, duration: 0.4 }}
            className="text-zinc-400 text-sm font-medium leading-relaxed mb-7 px-4"
          >
            {achievement.description}
          </motion.p>

          {/* CTA button */}
          <motion.button
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.49, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className={`w-full py-4 bg-gradient-to-r ${bg} text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-2xl border-b-4 border-black/30 active:border-b-0 active:translate-y-1 transition-all relative overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative">Luar Biasa! ✨</span>
          </motion.button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          style={{ zIndex: 10 }}
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
};
