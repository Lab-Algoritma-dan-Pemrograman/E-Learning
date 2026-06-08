import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { jwtVerify, SignJWT } from 'jose';

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

      // 2. Intercept /api/debug-env
      if (req.url && req.url.startsWith('/api/debug-env')) {
        const url = new URL(req.url, 'http://localhost');
        const code = url.searchParams.get('code');
        if (code !== 'faqod123') {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Forbidden' }));
          return;
        }

        const getEnvStats = (key: string) => {
          const value = env[key] || process.env[key];
          if (!value) {
            return { exists: false, length: 0, preview: 'N/A' };
          }
          const clean = value.trim();
          const len = clean.length;
          const preview = len > 8 
            ? `${clean.substring(0, 4)}...${clean.substring(len - 4)}` 
            : '***';
          return { exists: true, length: len, preview };
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          timestamp: new Date().toISOString(),
          env: {
            NODE_ENV: process.env.NODE_ENV || 'development',
            VITE_SUPABASE_URL: env.VITE_SUPABASE_URL || 'N/A',
            VITE_SUPABASE_ANON_KEY: getEnvStats('VITE_SUPABASE_ANON_KEY'),
            JWT_SECRET: getEnvStats('JWT_SECRET'),
            VITE_JWT_SECRET: getEnvStats('VITE_JWT_SECRET'),
            SUPABASE_JWT_SECRET: getEnvStats('SUPABASE_JWT_SECRET'),
          }
        }));
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

