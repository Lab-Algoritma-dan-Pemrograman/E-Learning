/**
 * api/_cors.ts
 *
 * HIGH-05: whitelist origin eksplisit untuk API elearning.
 * Sebelumnya semua endpoint membalas `Access-Control-Allow-Origin: *`,
 * artinya situs mana pun bisa memanggil API ini dari browser korban.
 *
 * Cara pakai (di dalam handler):
 *   import { applyCors } from './_cors.js';
 *   if (applyCors(req, res)) return;   // true = preflight sudah dijawab
 */

const ALLOWED_ORIGINS = [
  'https://elearning.algohub.web.id',
  'https://algohub.web.id',
  'https://www.algohub.web.id',
  'https://siakad.algohub.web.id',
  'https://labap-frontend.vercel.app',
  'https://labap-backend.vercel.app',
];

// Origin tambahan dari env (dipisah koma), berguna untuk preview deployment.
function envOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS || process.env.ALLOWED_ORIGINS || '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function isAllowed(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (envOrigins().includes(origin)) return true;
  // Preview Vercel untuk project ini (mis. elearning-abc123-lab.vercel.app)
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true;
  // Localhost untuk pengembangan
  if (/^http:\/\/localhost(:\d+)?$/i.test(origin)) return true;
  return false;
}

/**
 * Set header CORS sesuai origin pemanggil. Mengembalikan true bila request
 * adalah preflight OPTIONS yang sudah dijawab (handler harus langsung return).
 */
export function applyCors(req: any, res: any): boolean {
  const origin = String(req.headers?.origin || '');
  if (origin && isAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  // Origin tak dikenal: tidak ada header ACAO → browser memblokir responsnya.
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '600');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}