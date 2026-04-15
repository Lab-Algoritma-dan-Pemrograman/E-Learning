import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Bug, Target, Flame, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Achievement } from '../services/achievementService';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

const IconMap: Record<string, any> = {
  Bug, Target, Zap, Trophy, Flame, Star
};

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  const { width, height } = useWindowSize();
  const Icon = IconMap[achievement.icon] || Star;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <Confetti 
        width={width} 
        height={height} 
        numberOfPieces={200} 
        recycle={false}
        colors={['#be123c', '#fbbf24', '#10b981', '#3b82f6']}
      />
      
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
