import type { CodeLanguage } from '../hooks/useCodeRunner';

/**
 * Deteksi bahasa pemrograman sebuah level.
 *
 * PENTING: jangan menebak dari prefix ID level. Sejak level di-rename menjadi
 * `level-1..level-6`, prefix 'c-'/'py-' tidak ada lagi — filter lama
 * (`id.startsWith('c-')`) mengembalikan 0 level sehingga daftar level dan
 * progress bar di beranda hilang. Prefix modul juga tidak bisa dipakai
 * (modul level-3 masih ber-ID `c-level-4-*`).
 *
 * Sumber paling andal = judul level ("... BAHASA C" vs "... PYTHON").
 * Fallback: prefix ID lama (data historis), lalu urutan index kurikulum.
 */
export function getLevelLanguage(
  level: { id?: string | null; title?: string | null } | null | undefined,
  index?: number
): CodeLanguage {
  if (!level) return 'python';

  const title = String(level.title || '').toUpperCase();
  if (title.includes('PYTHON')) return 'python';
  if (/\bC\b/.test(title)) return 'c';

  const id = String(level.id || '');
  if (id.startsWith('c-')) return 'c';
  if (id.startsWith('py-') || id.startsWith('p-')) return 'python';

  // Fallback terakhir: dua level pertama kurikulum saat ini adalah Bahasa C.
  return typeof index === 'number' && index <= 1 ? 'c' : 'python';
}

/** Label tampilan bahasa level. */
export function getLevelLanguageLabel(
  level: { id?: string | null; title?: string | null } | null | undefined,
  index?: number
): string {
  return getLevelLanguage(level, index) === 'c' ? 'Bahasa C' : 'Python';
}
