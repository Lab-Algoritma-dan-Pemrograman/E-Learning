import { useEffect, useRef, useState } from 'react';
import { assessmentService } from '../services/assessmentService';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export const useAutoSave = (
  attemptId: string | null,
  answers: Record<string, { answerText?: string; codeSubmitted?: string; outputStandard?: string; errors?: string }>,
  debounceMs: number = 30000 // 30 seconds default
) => {
  const [status, setStatus] = useState<AutoSaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  const answersRef = useRef(answers);
  const attemptIdRef = useRef(attemptId);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync refs to avoid stale closures in event listeners
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    attemptIdRef.current = attemptId;
  }, [attemptId]);

  const saveDraft = async () => {
    const currentAttemptId = attemptIdRef.current;
    const currentAnswers = answersRef.current;

    if (!currentAttemptId || Object.keys(currentAnswers).length === 0) return;

    setStatus('saving');
    try {
      await assessmentService.updateAttemptAnswers(currentAttemptId, currentAnswers);
      setStatus('saved');
      setLastSaved(new Date().toLocaleTimeString());
      console.log('💾 Auto-saved assessment answers draft successfully');
    } catch (e) {
      console.error('Failed to auto-save draft:', e);
      setStatus('error');
    }
  };

  // 1. Debounced Timer Auto-Save
  useEffect(() => {
    if (!attemptId || Object.keys(answers).length === 0) return;

    // Set status to idle or keeping track of changes
    setStatus('idle');

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      saveDraft();
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [answers, attemptId, debounceMs]);

  // 2. Immediate Save on Window Close / Tab Visibility Loss
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Synchronous-like save execution via background fetch could be used,
      // but in most modern browsers we trigger the save promise immediately.
      saveDraft();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveDraft();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Run final save on unmount
      saveDraft();
    };
  }, []);

  return { status, lastSaved, forceSave: saveDraft };
};
