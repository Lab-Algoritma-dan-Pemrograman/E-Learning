import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { RichTextRenderer } from './RichTextRenderer';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onComplete: (isCorrect: boolean) => void;
}

export const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswer, onComplete }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setIsSubmitted(true);
    onComplete(selected === correctAnswer);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-8">
      <div className="space-y-2">
        <div className="text-xs font-black text-rose-800 uppercase tracking-widest">Kuis Singkat</div>
        {/<\/?[a-z][\s\S]*>/i.test(question) ? (
          <RichTextRenderer content={question} className="text-2xl font-bold text-zinc-900 prose-p:text-zinc-900 prose-p:font-bold prose-p:text-2xl" />
        ) : (
          <h3 className="text-2xl font-bold text-zinc-900">{question}</h3>
        )}
      </div>

      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            disabled={isSubmitted}
            onClick={() => setSelected(idx)}
            className={cn(
              "w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
              selected === idx 
                ? "border-rose-700 bg-rose-50" 
                : "border-zinc-100 hover:border-zinc-200 bg-zinc-50",
              isSubmitted && idx === correctAnswer && "border-rose-700 bg-rose-50",
              isSubmitted && selected === idx && idx !== correctAnswer && "border-red-500 bg-red-50"
            )}
          >
            <span className={cn(
              "font-medium",
              selected === idx ? "text-rose-900" : "text-zinc-600"
            )}>
              {option}
            </span>
            
            {isSubmitted && idx === correctAnswer && <CheckCircle2 className="text-rose-700" size={20} />}
            {isSubmitted && selected === idx && idx !== correctAnswer && <XCircle className="text-red-500" size={20} />}
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 disabled:opacity-50 transition-all active:scale-95"
        >
          Periksa Jawaban
        </button>
      ) : (
        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-2xl text-center font-bold",
            selected === correctAnswer ? "bg-rose-100 text-rose-900" : "bg-red-100 text-red-700"
          )}>
            {selected === correctAnswer ? "Benar! Bagus sekali." : `Kurang tepat. Jawaban yang benar adalah: ${options[correctAnswer]}`}
          </div>
          
          {selected !== correctAnswer && (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelected(null);
              }}
              className="w-full py-3 bg-zinc-100 text-zinc-900 font-bold rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
            >
              Coba Lagi
            </button>
          )}
        </div>
      )}
    </div>
  );
};
