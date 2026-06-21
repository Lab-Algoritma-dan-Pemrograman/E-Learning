import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { jwtVerify, SignJWT } from 'jose';
import { createClient } from '@supabase/supabase-js';

// Vite Plugin to run api/verify and api/debug-env serverless functions locally under npm run dev
const apiDevServer = (env: Record<string, string>) => ({
  name: 'api-dev-server',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      // 1. Intercept /api/verify
      if (req.url && req.url.startsWith('/api/verify') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', async () => {
          try {
            const { token } = JSON.parse(body);
            if (!token) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Token is required' }));
              return;
            }

            let tokenPayload: any = null;
            let verified = false;

            const supabaseSecretStr = env.SUPABASE_JWT_SECRET;
            if (supabaseSecretStr) {
              try {
                const secret = new TextEncoder().encode(supabaseSecretStr);
                const { payload } = await jwtVerify(token, secret);
                tokenPayload = payload;
                verified = true;
              } catch (err) {
                // Fall back to Web Utama secret
              }
            }

            if (!verified) {
              const secret = new TextEncoder().encode(env.JWT_SECRET || env.VITE_JWT_SECRET);
              const { payload } = await jwtVerify(token, secret);
              tokenPayload = payload;
            }

            if (!tokenPayload.nim || !tokenPayload.nama) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Token missing required fields (nim, nama)' }));
              return;
            }

            if (tokenPayload.role === 'koordinator') {
              tokenPayload.role = 'kordas';
            }

            let returnedToken = token;
            if (supabaseSecretStr) {
              const secret = new TextEncoder().encode(supabaseSecretStr);
              returnedToken = await new SignJWT({
                nim: tokenPayload.nim,
                nama: tokenPayload.nama,
                kelas: tokenPayload.kelas,
                role: tokenPayload.role || 'praktikan',
                email: tokenPayload.email || null
              })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(secret);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              payload: tokenPayload,
              token: returnedToken,
              firebaseToken: null
            }));
          } catch (error: any) {
            console.error('Local API mock error:', error.message);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid token' }));
          }
        });
        return;
      }

      // 2. Intercept /api/validate-quiz
      if (req.url && req.url.startsWith('/api/validate-quiz') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', async () => {
          try {
            // A. Authenticate token
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Unauthorized: Missing token' }));
              return;
            }

            const token = authHeader.substring(7);
            let verified = false;
            let tokenPayload: any = null;

            const supabaseSecretStr = env.SUPABASE_JWT_SECRET;
            if (supabaseSecretStr) {
              try {
                const secret = new TextEncoder().encode(supabaseSecretStr);
                const { payload } = await jwtVerify(token, secret);
                tokenPayload = payload;
                verified = true;
              } catch (err) {
                // Fall back
              }
            }

            if (!verified) {
              const secret = new TextEncoder().encode(env.JWT_SECRET || env.VITE_JWT_SECRET);
              const { payload } = await jwtVerify(token, secret);
              tokenPayload = payload;
            }

            if (!tokenPayload || !tokenPayload.nim) {
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Unauthorized: Invalid token' }));
              return;
            }

            // B. Parse body
            const { lessonId, selectedOption } = JSON.parse(body);
            if (!lessonId || typeof selectedOption === 'undefined') {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Missing required fields' }));
              return;
            }

            // C. Query Supabase
            const supabaseUrl = env.VITE_SUPABASE_URL || '';
            const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || '';
            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            const { data: lesson, error } = await supabase
              .from('lessons')
              .select('quiz')
              .eq('id', lessonId)
              .single();

            if (error || !lesson) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Lesson not found' }));
              return;
            }

            const quiz = lesson.quiz as any;
            if (!quiz || typeof quiz.correctAnswer === 'undefined') {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Quiz not configured' }));
              return;
            }

            const correctAnswer = Number(quiz.correctAnswer);
            const isCorrect = Number(selectedOption) === correctAnswer;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ isCorrect, correctAnswer }));
          } catch (error: any) {
            console.error('Local validate-quiz error:', error.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        });
        return;
      }

      next();
    });
  }
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), apiDevServer(env), VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallbackDenylist: [/^\/pyodide\.worker\.js/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/pyodide\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pyodide-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || ''),
    },
    optimizeDeps: {
      include: ['error-stack-parser', 'stackframe'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    worker: {
      format: 'es',
    },
  };
});

