import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { RichTextRenderer } from './RichTextRenderer';
import { playQuizCorrectSound, playQuizWrongSound } from '../lib/soundEffects';

interface QuizProps {
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer?: number;
  onComplete: (isCorrect: boolean) => void;
}

export const Quiz: React.FC<QuizProps> = ({ 
  lessonId, 
  question, 
  options, 
  correctAnswer: propCorrectAnswer, 
  onComplete 
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const correctAnswer = correctAnswerIndex !== null ? correctAnswerIndex : propCorrectAnswer;

  const handleSubmit = async () => {
    if (selected === null) return;

    if (typeof propCorrectAnswer === 'number' && propCorrectAnswer !== -1 && propCorrectAnswer !== undefined) {
      const isCorrect = selected === propCorrectAnswer;
      setCorrectAnswerIndex(propCorrectAnswer);
      setIsSubmitted(true);
      if (isCorrect) {
        playQuizCorrectSound();
      } else {
        playQuizWrongSound();
      }
      onComplete(isCorrect);
      return;
    }

    setIsLoading(true);
    try {
      const savedToken = sessionStorage.getItem('elearning_token') || '';
      const response = await fetch('/api/validate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${savedToken}`
        },
        body: JSON.stringify({
          lessonId,
          selectedOption: selected
        })
      });

      if (!response.ok) throw new Error('Gagal memvalidasi kuis');

      const data = await response.json();
      const isCorrect = data.isCorrect;
      const correctIdx = Number(data.correctAnswer);

      setCorrectAnswerIndex(correctIdx);
      setIsSubmitted(true);
      if (isCorrect) {
        playQuizCorrectSound();
      } else {
        playQuizWrongSound();
      }
      onComplete(isCorrect);
    } catch (err) {
      console.error('Quiz validation error:', err);
      alert('Gagal memvalidasi jawaban kuis. Harap periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
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
          disabled={selected === null || isLoading}
          className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memvalidasi...
            </>
          ) : (
            'Periksa Jawaban'
          )}
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
