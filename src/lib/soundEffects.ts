/**
 * soundEffects.ts — Web Audio API synthesizer
 *
 * Teknik yang digunakan untuk suara petasan realistis:
 *  - Multi-layer noise (lowpass + bandpass + highpass) untuk textured explosion
 *  - Attack sangat cepat (impulsive) + decay panjang seperti gema outdoor
 *  - Convolution reverb buatan (impulse response sederhana)
 *  - Sub-bass thump untuk "badan" ledakan
 *  - Crackle layer high-freq untuk "api/serpihan"
 *  - Shimmer sine glides untuk ekor kembang api berjatuhan
 */

// ─── Context singleton ─────────────────────────────────────────────────────

let _ctx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

// ─── Reverb (simulate outdoor echo) ──────────────────────────────────────

function makeReverb(ac: AudioContext, duration = 1.2, decay = 2.5): ConvolverNode {
  const rate     = ac.sampleRate;
  const length   = Math.floor(rate * duration);
  const impulse  = ac.createBuffer(2, length, rate);

  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      // Exponential decay noise impulse response
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  const conv = ac.createConvolver();
  conv.buffer = impulse;
  return conv;
}

// ─── Primitive builders ───────────────────────────────────────────────────

function osc(
  ac: AudioContext,
  type: OscillatorType,
  freq: number,
  amp: number,
  t: number,
  dur: number,
  dest: AudioNode = ac.destination
) {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(amp, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(dest);
  o.start(t); o.stop(t + dur + 0.02);
}

function glide(
  ac: AudioContext,
  type: OscillatorType,
  f0: number, f1: number,
  amp: number,
  t: number, dur: number,
  dest: AudioNode = ac.destination
) {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(amp, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(dest);
  o.start(t); o.stop(t + dur + 0.02);
}

// ─── CORE: Realistic firecracker burst ───────────────────────────────────

/**
 * Satu ledakan petasan realistis dengan 5 layer:
 *
 * Layer 1 — SUB THUMP  : sine glide sangat rendah (60→20 Hz), attack instan
 *                         → memberi "badan" dan benturan fisik ledakan
 * Layer 2 — MID BOOM   : noise burst + lowpass 400 Hz
 *                         → suara udara yang mengembang
 * Layer 3 — CRACK BODY : noise burst + bandpass 2kHz–4kHz
 *                         → inti serpihan keras
 * Layer 4 — HIGH CRACK : noise burst + highpass 6kHz
 *                         → percikan api/serpihan halus
 * Layer 5 — REVERB TAIL: semua layer di-feed ke convolution reverb
 *                         → kesan outdoor, gema jauh
 * Layer 6 — SHIMMER    : sine glides acak tinggi
 *                         → ekor kembang api berjatuhan berkilau
 */
function boom(
  ac: AudioContext,
  t: number,
  power: number = 1.0,          // 0.5 (kecil) – 1.5 (sangat besar)
  pitch: 'low' | 'mid' | 'high' = 'mid'
) {
  const rev = makeReverb(ac, 1.4, 2.8);
  const masterGain = ac.createGain();
  masterGain.gain.setValueAtTime(power, t);
  masterGain.connect(ac.destination);

  // Dry (langsung) + Wet (reverb)
  const dryGain = ac.createGain();
  dryGain.gain.setValueAtTime(0.7, t);
  dryGain.connect(ac.destination);

  const wetGain = ac.createGain();
  wetGain.gain.setValueAtTime(0.45, t);
  wetGain.connect(rev);
  rev.connect(ac.destination);

  // ── Layer 1: Sub thump ──
  const subFreq = pitch === 'low' ? 55 : pitch === 'high' ? 110 : 75;
  {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(subFreq * 1.8, t);
    o.frequency.exponentialRampToValueAtTime(subFreq * 0.2, t + 0.22);
    // Very fast attack, slow decay
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.9 * power, t + 0.003); // 3ms attack!
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g);
    g.connect(dryGain);
    g.connect(wetGain);
    o.start(t); o.stop(t + 0.4);
  }

  // ── Layer 2: Mid boom (noise + lowpass) ──
  {
    const bufLen = Math.floor(ac.sampleRate * 0.5);
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;

    const src = ac.createBufferSource();
    src.buffer = buf;

    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(400, t);
    lp.frequency.exponentialRampToValueAtTime(80, t + 0.4);

    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.8 * power, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    src.connect(lp).connect(g);
    g.connect(dryGain);
    g.connect(wetGain);
    src.start(t); src.stop(t + 0.5);
  }

  // ── Layer 3: Crack body (noise + bandpass 2kHz) ──
  {
    const bufLen = Math.floor(ac.sampleRate * 0.3);
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;

    const src = ac.createBufferSource();
    src.buffer = buf;

    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2200, t);
    bp.Q.setValueAtTime(0.7, t);

    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.55 * power, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    src.connect(bp).connect(g);
    g.connect(dryGain);
    g.connect(wetGain);
    src.start(t); src.stop(t + 0.32);
  }

  // ── Layer 4: High crack (noise + highpass 6kHz) ──
  {
    const bufLen = Math.floor(ac.sampleRate * 0.15);
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;

    const src = ac.createBufferSource();
    src.buffer = buf;

    const hp = ac.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(6000, t);

    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.35 * power, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    src.connect(hp).connect(g);
    g.connect(dryGain);
    src.start(t); src.stop(t + 0.15);
  }

  // ── Layer 5: Shimmer — ekor kembang api berjatuhan ──
  const shimmerCount = Math.round(8 * power);
  const shimmerBase  = pitch === 'low' ? 900 : pitch === 'high' ? 1800 : 1300;
  for (let i = 0; i < shimmerCount; i++) {
    const f    = shimmerBase * (0.6 + Math.random() * 1.4);
    const off  = 0.05 + Math.random() * 0.55;
    const dur  = 0.20 + Math.random() * 0.50;
    const amp  = 0.04 * power * (0.5 + Math.random());

    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, t + off);
    o.frequency.exponentialRampToValueAtTime(f * 0.3, t + off + dur);
    g.gain.setValueAtTime(amp, t + off);
    g.gain.exponentialRampToValueAtTime(0.0001, t + off + dur);
    o.connect(g);
    g.connect(wetGain); // shimmer lebih banyak ke reverb
    g.connect(dryGain);
    o.start(t + off); o.stop(t + off + dur + 0.02);
  }
}

// ─── Simple helpers (untuk kuis/code) ────────────────────────────────────

function note(
  ac: AudioContext, type: OscillatorType,
  freq: number, amp: number, t: number, dur: number
) {
  osc(ac, type, freq, amp, t, dur);
}

function noiseSnap(ac: AudioContext, amp: number, t: number, dur: number) {
  const bufLen = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 3000; bp.Q.value = 0.9;
  const g = ac.createGain();
  g.gain.setValueAtTime(amp, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(ac.destination);
  src.start(t); src.stop(t + dur + 0.02);
}

// ─── PUBLIC API ───────────────────────────────────────────────────────────

// ACHIEVEMENT — 1 petasan besar + 1 susulan, mengiringi confetti
export function playAchievementSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;

    // Petasan utama — ledakan besar
    boom(ac, T, 1.1, 'mid');

    // Arpeggio ceria di atas serpihan (delay 200ms)
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      note(ac, 'sine',     f,     0.16, T + 0.22 + i * 0.09, 0.28);
      note(ac, 'triangle', f * 2, 0.05, T + 0.22 + i * 0.09, 0.22);
    });

    // Petasan susulan kecil
    boom(ac, T + 0.65, 0.65, 'high');

  } catch (e) { console.warn('[sound] achievement:', e); }
}

// LEVEL UP — salvo 3 petasan (rendah → menengah → tinggi seperti kembang api)
export function playLevelUpSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;

    // Salvo 1 — ledakan besar rendah
    boom(ac, T, 1.3, 'low');

    // Chord G-major triumphant
    [196.00, 246.94, 293.66, 392.00, 493.88].forEach(f => {
      note(ac, 'triangle', f,     0.13, T + 0.32, 0.80);
      note(ac, 'sine',     f * 2, 0.04, T + 0.32, 0.60);
    });

    // Salvo 2 — medium
    boom(ac, T + 0.70, 1.0, 'mid');

    // Riser menuju salvo 3
    glide(ac, 'sine', 300, 1400, 0.06, T + 1.05, 0.22);

    // Salvo 3 — tinggi sparkly
    boom(ac, T + 1.28, 0.9, 'high');

    // Cascade sparkle final
    [1047, 1319, 1568, 1760, 2093, 2637].forEach((f, i) => {
      note(ac, 'sine', f, 0.06, T + 1.45 + i * 0.07, 0.22);
    });

  } catch (e) { console.warn('[sound] levelup:', e); }
}

// QUIZ CORRECT — dua nada naik ceria
export function playQuizCorrectSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;
    note(ac, 'sine',     659.25, 0.20, T,        0.18);
    note(ac, 'triangle', 659.25, 0.07, T,        0.15);
    note(ac, 'sine',     880.00, 0.22, T + 0.16, 0.30);
    note(ac, 'triangle', 880.00, 0.07, T + 0.16, 0.26);
    note(ac, 'sine',    1760.00, 0.05, T + 0.30, 0.14);
  } catch (e) { console.warn('[sound] quiz correct:', e); }
}

// QUIZ WRONG — dua nada turun lembut
export function playQuizWrongSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;
    glide(ac, 'triangle', 466, 392, 0.14, T,        0.18);
    glide(ac, 'triangle', 392, 330, 0.10, T + 0.15, 0.22);
    glide(ac, 'sine',     260, 180, 0.07, T + 0.05, 0.20);
  } catch (e) { console.warn('[sound] quiz wrong:', e); }
}

// CODE CORRECT — mini pop petasan + arpeggio victory
export function playCodeCorrectSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;

    // Mini firecracker pop
    boom(ac, T, 0.6, 'mid');

    // Victory arpeggio
    [523.25, 659.25, 783.99].forEach((f, i) => {
      note(ac, 'sine',     f,     0.15, T + 0.12 + i * 0.08, 0.22);
      note(ac, 'triangle', f * 2, 0.04, T + 0.12 + i * 0.08, 0.18);
    });
    [523.25, 659.25, 783.99, 1046.50].forEach(f => {
      note(ac, 'triangle', f, 0.09, T + 0.38, 0.45);
    });
  } catch (e) { console.warn('[sound] code correct:', e); }
}

// CODE WRONG — dip lembut
export function playCodeWrongSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;
    glide(ac, 'triangle', 330, 220, 0.12, T,        0.25);
    glide(ac, 'sine',     260, 180, 0.08, T + 0.05, 0.20);
  } catch (e) { console.warn('[sound] code wrong:', e); }
}

// LESSON COMPLETE — petasan medium + resolve chord
export function playLessonCompleteSound(): void {
  try {
    const ac = ctx();
    const T  = ac.currentTime;

    boom(ac, T, 0.85, 'mid');

    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      note(ac, 'sine',     f,     0.14, T + 0.18 + i * 0.09, 0.28);
      note(ac, 'triangle', f * 2, 0.04, T + 0.18 + i * 0.09, 0.22);
    });
    [523.25, 659.25, 783.99, 1046.50].forEach(f => {
      note(ac, 'triangle', f, 0.08, T + 0.58, 0.65);
    });
    [1568, 2093, 2637].forEach((f, i) => {
      note(ac, 'sine', f, 0.05, T + 0.65 + i * 0.07, 0.22);
    });
  } catch (e) { console.warn('[sound] lesson complete:', e); }
}
