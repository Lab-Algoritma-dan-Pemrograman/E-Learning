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

            if (!tokenPayload.nim && !tokenPayload.username) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Token missing required fields (nim/username)' }));
              return;
            }

            // Normalize field names
            const nim   = tokenPayload.nim || tokenPayload.username || tokenPayload.sub || '';
            const nama  = tokenPayload.nama || tokenPayload.full_name || tokenPayload.name || '';
            const kelas = tokenPayload.kelas || tokenPayload.class_code || '';
            const email = tokenPayload.email || null;

            const rawRole = tokenPayload.user_role || tokenPayload.role;
            let appRole = rawRole || 'praktikan';
            if (appRole === 'koordinator') appRole = 'kordas';
            if (appRole === 'authenticated' || appRole === 'anon' || appRole === 'user') appRole = 'praktikan';

            let returnedToken = token;
            if (supabaseSecretStr) {
              const secret = new TextEncoder().encode(supabaseSecretStr);
              returnedToken = await new SignJWT({
                nim, nama, kelas, email,
                role: 'authenticated',
                user_role: appRole,
                iss: 'supabase', sub: nim, aud: 'authenticated',
              })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(secret);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              payload: { nim, nama, kelas, email, role: appRole },
              token: returnedToken,
              firebaseToken: null,
            }));
          } catch (error: any) {
            console.error('Local API mock error:', error.message);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid token' }));
          }
        });
        return;
      }

      // 2. Intercept /api/receive-token — terima POST JSON { token } dari Web Utama
      if (req.url && req.url.startsWith('/api/receive-token') && req.method === 'POST') {
        // CORS preflight
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', async () => {
          try {
            const { token } = JSON.parse(body);
            if (!token) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Field "token" wajib disertakan.' }));
              return;
            }

            // Verify token
            let tokenPayload: any = null;
            const supabaseSecretStr = env.SUPABASE_JWT_SECRET;
            if (supabaseSecretStr) {
              try {
                const secret = new TextEncoder().encode(supabaseSecretStr);
                const { payload } = await jwtVerify(token, secret);
                tokenPayload = payload;
              } catch { /* fallback */ }
            }
            if (!tokenPayload) {
              const secret = new TextEncoder().encode(env.JWT_SECRET || env.VITE_JWT_SECRET);
              const { payload } = await jwtVerify(token, secret);
              tokenPayload = payload;
            }

            if (!tokenPayload?.nim && !tokenPayload?.username) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Token missing required fields (nim/username, nama/full_name).' }));
              return;
            }

            // Normalize field names (Web Utama uses username/full_name)
            const nim   = tokenPayload.nim || tokenPayload.username || tokenPayload.sub || '';
            const nama  = tokenPayload.nama || tokenPayload.full_name || tokenPayload.name || '';
            const kelas = tokenPayload.kelas || tokenPayload.class_code || '';
            const email = tokenPayload.email || null;

            // Normalisasi role
            const rawRole = tokenPayload.user_role || tokenPayload.role;
            let appRole = rawRole || 'praktikan';
            if (appRole === 'koordinator') appRole = 'kordas';
            if (appRole === 'authenticated' || appRole === 'anon' || appRole === 'user') appRole = 'praktikan';

            // Sign ulang dengan Supabase secret
            let signedToken = token;
            if (supabaseSecretStr) {
              const secret = new TextEncoder().encode(supabaseSecretStr);
              signedToken = await new SignJWT({
                nim, nama, kelas, email,
                role: 'authenticated',
                user_role: appRole,
                iss: 'supabase', sub: nim, aud: 'authenticated',
              })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(secret);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              token: signedToken,
              redirectUrl: `/?token=${encodeURIComponent(signedToken)}`,
              payload: { nim, nama, kelas, email, role: appRole },
            }));
          } catch (error: any) {
            console.error('[dev /api/receive-token] Error:', error.message);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Token tidak valid: ' + error.message }));
          }
        });
        return;
      }

      // 3. Intercept /api/validate-quiz
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

