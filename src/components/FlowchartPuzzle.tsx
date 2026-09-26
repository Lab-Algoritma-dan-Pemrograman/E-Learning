import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Trash2, ArrowDown, GripVertical } from 'lucide-react';
import { cn } from '../lib/utils';
import { FlowchartSymbol, FlowchartStep, FlowchartBranch } from '../types';

/**
 * FlowchartPuzzle — latihan susun simbol flowchart (drag & drop / tap).
 *
 * Praktikan membaca kode sederhana (read-only), lalu menyusun kartu simbol dari
 * bank ke slot. Validasi murni di klien.
 *
 * Alur lurus dan bercabang sama-sama didukung:
 *  - Setiap `decision` pada alur utama otomatis punya dua slot cabang (Ya/Tidak),
 *    masing-masing dengan kolom sendiri.
 *  - Cabang ditentukan oleh pemerian yang DIPILIH siswa (decision mana, cabang
 *    mana), bukan oleh urutan penempatan — jadi penilaian tidak ambigu.
 *  - Cabang boleh memuat `decision` lagi (bersarang).
 *
 * Bentuk `solution` (JSON):
 *   v2 : { version: 2, flow: [{ at: 'main'|'yes'|'no', shape, label }, ...] }
 *   v1 : FlowchartSymbol[] datar (diperlakukan sebagai seluruhnya `main`)
 *
 * Pengelompokan cabang: setiap `decision` pada alur utama "mengambil" entri
 * `yes`/`no` berikutnya sebagai cabangnya, sesuai urutan pada `flow`.
 */

interface Props {
  /** Kode sumber yang harus diterjemahkan ke flowchart (read-only). */
  code: string;
  /** JSON string: FlowchartFlow (v2) atau FlowchartSymbol[] (v1). */
  solutionJson: string;
  /** Simbol pengecoh tambahan di bank (tidak dipakai di jawaban benar). */
  distractors?: FlowchartSymbol[];
  onResult: (correct: boolean) => void;
  disabled?: boolean;
}

type BankItem = FlowchartSymbol & { key: string };

/** Satu slot pada susunan. */
interface SlotRef {
  id: string;
  branch: FlowchartBranch;
  /** Untuk cabang: indeks decision pemiliknya di alur utama. */
  owner?: number;
  expected: FlowchartSymbol;
}

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

const sameCard = (a: FlowchartSymbol | null | undefined, b: FlowchartSymbol | null | undefined) =>
  !!a && !!b && a.shape === b.shape && a.label === b.label;

/** Urai `solution` menjadi alur utama + cabang per decision. */
function parseFlow(solutionJson: string): { main: FlowchartSymbol[]; yes: FlowchartSymbol[][]; no: FlowchartSymbol[][] } {
  let parsed: any;
  try {
    parsed = JSON.parse(solutionJson);
  } catch {
    return { main: [], yes: [], no: [] };
  }

  let steps: FlowchartStep[];
  if (Array.isArray(parsed)) {
    steps = parsed.map((s: any) => ({ shape: s.shape, label: String(s.label ?? ''), at: 'main' as const }));
  } else if (parsed && Array.isArray(parsed.flow)) {
    steps = parsed.flow.map((s: any) => ({
      shape: s.shape,
      label: String(s.label ?? ''),
      at: (s.at === 'yes' || s.at === 'no' ? s.at : 'main') as FlowchartBranch,
    }));
  } else {
    return { main: [], yes: [], no: [] };
  }

  const main: FlowchartSymbol[] = [];
  const yes: FlowchartSymbol[][] = [];
  const no: FlowchartSymbol[][] = [];
  let decisionCount = 0;

  for (const s of steps) {
    const card: FlowchartSymbol = { shape: s.shape, label: s.label };
    if (s.at === 'main') {
      main.push(card);
      if (card.shape === 'decision') {
        decisionCount++;
        yes.push([]);
        no.push([]);
      }
    } else {
      if (decisionCount === 0) continue;       // cabang tanpa induk -> abaikan
      const k = decisionCount - 1;
      (s.at === 'yes' ? yes : no)[k].push(card);
    }
  }

  return { main, yes, no };
}

export const FlowchartPuzzle: React.FC<Props> = ({ code, solutionJson, distractors = [], onResult, disabled }) => {
  const { main, yes, no } = useMemo(() => parseFlow(solutionJson), [solutionJson]);

  /** Semua slot penilaian: alur utama + cabang tiap decision. */
  const slotRefs = useMemo<SlotRef[]>(() => {
    const refs: SlotRef[] = [];
    main.forEach((s, i) => refs.push({ id: `m-${i}`, branch: 'main', expected: s }));

    let k = -1;                                 // indeks decision yang sedang dihitung
    main.forEach((s) => {
      if (s.shape !== 'decision') return;
      k++;
      (yes[k] || []).forEach((b, j) => refs.push({ id: `b${k}-yes-${j}`, branch: 'yes', owner: k, expected: b }));
      (no[k] || []).forEach((b, j) => refs.push({ id: `b${k}-no-${j}`, branch: 'no', owner: k, expected: b }));
    });

    return refs;
  }, [main, yes, no]);

  const slotById = useMemo(() => new Map(slotRefs.map(r => [r.id, r])), [slotRefs]);

  /** Bank = semua jawaban benar (diacak) + pengecoh. */
  const initialBank = useMemo<BankItem[]>(() => {
    const all: FlowchartSymbol[] = [...slotRefs.map(r => r.expected), ...distractors];
    const withKeys = all.map((s, i) => ({ ...s, key: `${s.shape}-${i}-${s.label.slice(0, 8)}` }));
    const arr = [...withKeys];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [slotRefs, distractors]);

  const [bank, setBank] = useState<BankItem[]>(initialBank);
  const [placed, setPlaced] = useState<Record<string, BankItem>>({});
  const [checked, setChecked] = useState<null | boolean>(null);
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [tapped, setTapped] = useState<string | null>(null);

  const findItem = (key: string): BankItem | null =>
    bank.find(b => b.key === key) || Object.values(placed).find(p => p.key === key) || null;

  const slotOfKey = (key: string): string | null =>
    Object.entries(placed).find(([, v]) => v.key === key)?.[0] ?? null;

  const placeAt = (key: string, slotId: string) => {
    if (disabled || !slotById.has(slotId)) return;
    const item = findItem(key);
    if (!item) return;

    setPlaced(prev => {
      const next = { ...prev };
      for (const [sid, it] of Object.entries(next)) if (it.key === key) delete next[sid];
      const displaced = next[slotId];
      if (displaced) setBank(b => [...b, displaced]);
      next[slotId] = item;
      return next;
    });
    setBank(prev => prev.filter(b => b.key !== key));
    setChecked(null);
  };

  const removeFromSlot = (slotId: string) => {
    if (disabled) return;
    const item = placed[slotId];
    if (!item) return;
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
    setBank(prev => [...prev, item]);
    setChecked(null);
  };

  const reset = () => {
    setBank(initialBank);
    setPlaced({});
    setChecked(null);
    setTapped(null);
    onResult(false);
  };

  const filledCount = slotRefs.filter(r => placed[r.id]).length;

  const check = () => {
    const filled = filledCount === slotRefs.length;
    const correct = filled && slotRefs.every(r => sameCard(placed[r.id], r.expected));
    setChecked(correct);
    onResult(correct);
  };

  // --- Drag & drop (HTML5) ---
  const onDragStart = (key: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', key);
    setDragKey(key);
  };
  const onDropSlot = (slotId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('text/plain');
    if (key) placeAt(key, slotId);
    setDragKey(null);
  };
  const onDropBank = (e: React.DragEvent) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('text/plain');
    if (!key) return;
    const sid = slotOfKey(key);
    if (sid) removeFromSlot(sid);
    setDragKey(null);
  };

  /** Render satu slot (dipakai alur utama maupun cabang). */
  const renderSlot = (ref: SlotRef, compact = false) => {
    const item = placed[ref.id];
    const ok = sameCard(item, ref.expected);
    return (
      <div
        key={ref.id}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropSlot(ref.id)}
        onClick={() => {
          if (item) removeFromSlot(ref.id);
          else if (tapped) { placeAt(tapped, ref.id); setTapped(null); }
        }}
        className={cn(
          'w-full rounded-xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer relative group',
          compact ? 'min-h-[56px]' : 'min-h-[64px]',
          item ? 'border-transparent' : 'border-zinc-300 hover:border-rose-400 hover:bg-rose-50/40',
          !item && tapped && 'border-rose-400 bg-rose-50/60 animate-pulse'
        )}
      >
        {item ? (
          <div className="relative">
            <SymbolShape shape={item.shape} label={item.label} small />
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-0.5 shadow">
              <Trash2 size={10} />
            </div>
          </div>
        ) : (
          <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Slot</span>
        )}
        {checked !== null && item && (
          <div className={cn('absolute -left-2 top-1/2 -translate-y-1/2 rounded-full p-0.5', ok ? 'text-emerald-600' : 'text-red-500')}>
            {ok ? <CheckCircle2 size={16} /> : <span className="text-xs font-black">✕</span>}
          </div>
        )}
      </div>
    );
  };

  /** Berapa decision pada alur utama sebelum indeks i (untuk mencocokkan grup cabang). */
  const branchGroupOf = (i: number) => main.slice(0, i + 1).filter(x => x.shape === 'decision').length - 1;

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

        {/* Susunan flowchart */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">
            Susunan Flowchart ({filledCount}/{slotRefs.length})
          </div>
          <div className="flex flex-col items-center gap-0">
            {main.map((step, i) => {
              const k = branchGroupOf(i);
              const yesRefs = step.shape === 'decision' ? slotRefs.filter(r => r.branch === 'yes' && r.owner === k) : [];
              const noRefs = step.shape === 'decision' ? slotRefs.filter(r => r.branch === 'no' && r.owner === k) : [];
              const hasBranches = yesRefs.length > 0 || noRefs.length > 0;

              return (
                <React.Fragment key={i}>
                  <div className="w-full">
                    {renderSlot(slotRefs.find(r => r.id === `m-${i}`)!, false)}
                  </div>

                  {step.shape === 'decision' && hasBranches && (
                    <div className="w-full grid grid-cols-2 gap-3 my-2">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ya</span>
                        {yesRefs.length ? yesRefs.map(r => renderSlot(r, true)) : <span className="text-[10px] text-zinc-300 italic">(tanpa langkah)</span>}
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Tidak</span>
                        {noRefs.length ? noRefs.map(r => renderSlot(r, true)) : <span className="text-[10px] text-zinc-300 italic">(tanpa langkah)</span>}
                      </div>
                    </div>
                  )}

                  {i < main.length - 1 && <ArrowDown size={14} className="text-zinc-300 my-0.5 shrink-0" />}
                </React.Fragment>
              );
            })}
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
          disabled={disabled || filledCount < slotRefs.length}
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
            checked ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-600'
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
