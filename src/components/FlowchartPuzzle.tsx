import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Trash2, ArrowDown, GripVertical } from 'lucide-react';
import { cn } from '../lib/utils';
import { FlowchartSymbol } from '../types';

/**
 * FlowchartPuzzle — latihan susun simbol flowchart (drag & drop / tap).
 *
 * Praktikan membaca kode sederhana (read-only), lalu menyusun kartu simbol
 * dari bank ke slot berurutan atas->bawah. Validasi murni di klien:
 * urutan slot harus sama persis dengan `solution` (JSON FlowchartSymbol[]).
 *
 * Kartu pengecoh (distraktor) disediakan via prop `distractors`.
 */

interface Props {
  /** Kode sumber yang harus diterjemahkan ke flowchart (read-only). */
  code: string;
  /** JSON string: FlowchartSymbol[] urutan benar atas -> bawah. */
  solutionJson: string;
  /** Simbol pengecoh tambahan di bank (tidak dipakai di jawaban benar). */
  distractors?: FlowchartSymbol[];
  onResult: (correct: boolean) => void;
  disabled?: boolean;
}

type BankItem = FlowchartSymbol & { key: string };

const SHAPE_LABEL: Record<FlowchartSymbol['shape'], string> = {
  terminator: 'Terminator (Mulai/Selesai)',
  process: 'Proses',
  io: 'Input/Output',
  decision: 'Keputusan',
  connector: 'Konektor',
  predefined: 'Proses Terdefinisi',
};

/** Bentuk simbol ala flowchart via CSS. */
const SymbolShape: React.FC<{ shape: FlowchartSymbol['shape']; label: string; small?: boolean }> = ({ shape, label, small }) => {
  const base = 'flex items-center justify-center text-center font-bold border-2 select-none';
  const size = small ? 'min-h-[44px] px-3 py-1 text-[11px]' : 'min-h-[56px] px-4 py-2 text-xs';
  const style: Record<FlowchartSymbol['shape'], string> = {
    terminator: 'rounded-full border-sky-600 bg-sky-50 text-sky-900 min-w-[120px]',
    process: 'rounded-lg border-blue-600 bg-blue-50 text-blue-900',
    io: 'border-indigo-600 bg-indigo-50 text-indigo-900 [transform:skewX(-12deg)] rounded-md',
    decision: 'border-rose-600 bg-rose-50 text-rose-900 [transform:rotate(45deg)] w-[110px] h-[110px] min-h-0 rounded-md my-2',
    connector: 'rounded-full border-orange-500 bg-orange-50 text-orange-900 w-[56px] h-[56px] min-h-0 px-1',
    predefined: 'border-teal-600 bg-teal-50 text-teal-900 rounded-md [clip-path:polygon(12%_0,88%_0,100%_50%,88%_100%,12%_100%,0_50%)]',
  };
  return (
    <div className={cn(base, size, style[shape])}>
      <span className={cn(shape === 'decision' && '[transform:rotate(-45deg)]', shape === 'io' && '[transform:skewX(12deg)]', 'leading-tight break-words max-w-[160px]')}>
        {label}
      </span>
    </div>
  );
};

export const FlowchartPuzzle: React.FC<Props> = ({ code, solutionJson, distractors = [], onResult, disabled }) => {
  const solution = useMemo<FlowchartSymbol[]>(() => {
    try {
      const parsed = JSON.parse(solutionJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [solutionJson]);

  // Bank = jawaban benar (diacak) + pengecoh. key unik per kartu.
  const initialBank = useMemo<BankItem[]>(() => {
    const all = [...solution, ...distractors];
    const withKeys = all.map((s, i) => ({ ...s, key: `${s.shape}-${i}-${s.label.slice(0, 8)}` }));
    // Acak deterministik-ish (Fisher-Yates dengan seed sederhana agar stabil per sesi render pertama)
    const arr = [...withKeys];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [solution, distractors]);

  const [bank, setBank] = useState<BankItem[]>(initialBank);
  const [slots, setSlots] = useState<(BankItem | null)[]>(() => solution.map(() => null));
  const [checked, setChecked] = useState<null | boolean>(null);
  const [dragKey, setDragKey] = useState<string | null>(null);

  const findItem = (key: string): BankItem | null =>
    bank.find(b => b.key === key) || slots.find(s => s?.key === key) || null;

  const placeAt = (key: string, slotIdx: number) => {
    if (disabled) return;
    const item = findItem(key);
    if (!item) return;
    setBank(prev => prev.filter(b => b.key !== key));
    setSlots(prev => {
      const next = prev.map(s => (s?.key === key ? null : s));
      // Slot tujuan yang terisi dikembalikan ke bank
      const displaced = next[slotIdx];
      if (displaced) setBank(b => [...b, displaced]);
      next[slotIdx] = item;
      return next;
    });
    setChecked(null);
  };

  const removeFromSlot = (slotIdx: number) => {
    if (disabled) return;
    const item = slots[slotIdx];
    if (!item) return;
    setSlots(prev => prev.map((s, i) => (i === slotIdx ? null : s)));
    setBank(prev => [...prev, item]);
    setChecked(null);
  };

  const reset = () => {
    setBank(initialBank);
    setSlots(solution.map(() => null));
    setChecked(null);
    onResult(false);
  };

  const check = () => {
    const filled = slots.every(Boolean);
    const correct = filled && slots.every((s, i) => s!.shape === solution[i].shape && s!.label === solution[i].label);
    setChecked(correct);
    onResult(correct);
  };

  // --- Drag & drop (HTML5) ---
  const onDragStart = (key: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', key);
    setDragKey(key);
  };
  const onDropSlot = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('text/plain');
    if (key) placeAt(key, idx);
    setDragKey(null);
  };
  const onDropBank = (e: React.DragEvent) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('text/plain');
    if (!key) return;
    const slotIdx = slots.findIndex(s => s?.key === key);
    if (slotIdx !== -1) removeFromSlot(slotIdx);
    setDragKey(null);
  };

  // --- Tap untuk mobile: pilih kartu di bank, lalu tap slot ---
  const [tapped, setTapped] = useState<string | null>(null);

  const filledCount = slots.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Kode sumber (read-only) */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shrink-0">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-zinc-800">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">kode sumber — terjemahkan ke flowchart</span>
        </div>
        <pre className="p-4 text-xs font-mono text-zinc-100 overflow-x-auto max-h-56 overflow-y-auto whitespace-pre-wrap">{code}</pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 min-h-0">
        {/* Bank simbol */}
        <div
          className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-4 overflow-y-auto custom-scrollbar"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropBank}
        >
          <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <GripVertical size={12} /> Bank Simbol — seret atau ketuk kartu, lalu ketuk slot
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {bank.map((item) => (
                <button
                  key={item.key}
                  draggable={!disabled}
                  onDragStart={onDragStart(item.key)}
                  onClick={() => setTapped(tapped === item.key ? null : item.key)}
                  disabled={disabled}
                  className={cn(
                    'cursor-grab active:cursor-grabbing rounded-xl transition-all hover:scale-[1.03] hover:shadow-md',
                    tapped === item.key && 'ring-2 ring-rose-500 ring-offset-2 scale-[1.03]',
                    dragKey === item.key && 'opacity-40'
                  )}
                  title={SHAPE_LABEL[item.shape]}
                >
                  <SymbolShape shape={item.shape} label={item.label} small />
                </button>
              ))}
            </AnimatePresence>
            {bank.length === 0 && (
              <p className="text-xs text-zinc-400 italic">Semua kartu sudah dipasang. Ketuk kartu di slot untuk melepasnya.</p>
            )}
          </div>
        </div>

        {/* Slot susunan */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">
            Susunan Flowchart ({filledCount}/{solution.length})
          </div>
          <div className="flex flex-col items-center gap-0">
            {slots.map((slot, idx) => (
              <React.Fragment key={idx}>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDropSlot(idx)}
                  onClick={() => {
                    if (slot) removeFromSlot(idx);
                    else if (tapped) { placeAt(tapped, idx); setTapped(null); }
                  }}
                  className={cn(
                    'w-full min-h-[64px] rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer relative group',
                    slot ? 'border-transparent' : 'border-zinc-300 hover:border-rose-400 hover:bg-rose-50/40',
                    !slot && tapped && 'border-rose-400 bg-rose-50/60 animate-pulse'
                  )}
                >
                  {slot ? (
                    <div className="relative">
                      <SymbolShape shape={slot.shape} label={slot.label} small />
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-0.5 shadow">
                        <Trash2 size={10} />
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Slot {idx + 1}</span>
                  )}
                  {checked !== null && slot && (
                    <div className={cn(
                      'absolute -left-2 top-1/2 -translate-y-1/2 rounded-full p-0.5',
                      slot.shape === solution[idx].shape && slot.label === solution[idx].label
                        ? 'text-emerald-600' : 'text-red-500'
                    )}>
                      {slot.shape === solution[idx].shape && slot.label === solution[idx].label
                        ? <CheckCircle2 size={16} /> : <span className="text-xs font-black">✕</span>}
                    </div>
                  )}
                </div>
                {idx < slots.length - 1 && (
                  <ArrowDown size={14} className="text-zinc-300 my-0.5 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Aksi */}
      <div className="flex gap-3 shrink-0">
        <button
          onClick={reset}
          disabled={disabled}
          className="px-5 py-3 bg-zinc-100 border border-zinc-200 text-zinc-600 font-bold rounded-2xl text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 active:scale-95"
        >
          <RotateCcw size={15} /> Acak Ulang
        </button>
        <button
          onClick={check}
          disabled={disabled || filledCount < solution.length}
          className="flex-1 py-3 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 disabled:opacity-40 transition-all active:scale-95 text-sm"
        >
          Periksa Susunan
        </button>
      </div>

      {checked !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-2xl p-4 text-sm font-bold text-center border',
            checked
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-red-50 border-red-200 text-red-600'
          )}
        >
          {checked
            ? 'Susunan flowchart tepat! Alur kode sudah benar dipetakan.'
            : 'Belum tepat — perhatikan tanda ✕ pada slot yang salah, lalu perbaiki urutannya.'}
        </motion.div>
      )}
    </div>
  );
};
