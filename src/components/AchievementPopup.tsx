import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Bug, Target, Flame, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Achievement } from '../services/achievementService';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

const IconMap: Record<string, any> = {
  Bug, Target, Zap, Trophy, Flame, Star
};

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  const Icon = IconMap[achievement.icon] || Star;

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        className="bg-white rounded-[3rem] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
      >
        {/* Background Sparkle */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-50 to-transparent -z-10" />
        
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className="w-24 h-24 bg-rose-700 text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-rose-200 mb-6 border-4 border-white"
          >
            <Icon size={48} />
          </motion.div>
          
          <div className="text-[10px] font-black text-rose-700 uppercase tracking-[0.3em] mb-2">Achievement Unlocked!</div>
          <h2 className="text-2xl font-black text-zinc-900 mb-2">{achievement.title}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8">
            {achievement.description}
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-900/20"
          >
            Luar Biasa! ✨
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X size={20} />
        </button>
      </motion.div>
    </div>
  );
};
