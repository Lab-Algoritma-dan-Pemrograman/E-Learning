import { jwtVerify } from 'jose';
import { getSupabaseSecret, getWebUtamaSecret } from './auth.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
  const { code, token } = req.query;
  if (code !== 'faqod123') {
    return res.status(403).json({ error: 'Forbidden. Pass correct code query parameter.' });
  }

  let dbResult: any = null;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('nim, nama, role')
      .eq('nim', '202211083')
      .maybeSingle();
    dbResult = { data, error };
  } catch (err: any) {
    dbResult = { exception: err.message };
  }

  const getEnvStats = (key: string) => {
    const value = process.env[key];
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

  let tokenDiagnostics: any = null;

  if (token) {
    tokenDiagnostics = {
      tokenLength: token.length,
      attempts: {}
    };

    // Attempt 1: Supabase Secret
    const supabaseSecretStr = process.env.SUPABASE_JWT_SECRET;
    if (supabaseSecretStr) {
      try {
        const secret = getSupabaseSecret(supabaseSecretStr);
        if (secret) {
          const { payload } = await jwtVerify(token, secret);
          tokenDiagnostics.attempts.supabase = { success: true, payload };
        } else {
          tokenDiagnostics.attempts.supabase = { success: false, error: 'Secret decoding returned null' };
        }
      } catch (err: any) {
        tokenDiagnostics.attempts.supabase = { success: false, error: err.message, code: err.code };
      }
    } else {
      tokenDiagnostics.attempts.supabase = { success: false, error: 'SUPABASE_JWT_SECRET not configured' };
    }

    // Attempt 2: Web Utama Secret
    const webUtamaSecretStr = process.env.VITE_JWT_SECRET || process.env.JWT_SECRET;
    if (webUtamaSecretStr) {
      try {
        const secret = getWebUtamaSecret();
        const { payload } = await jwtVerify(token, secret);
        tokenDiagnostics.attempts.webUtama = { success: true, payload };
      } catch (err: any) {
        tokenDiagnostics.attempts.webUtama = { success: false, error: err.message, code: err.code };
      }
    } else {
      tokenDiagnostics.attempts.webUtama = { success: false, error: 'JWT_SECRET not configured' };
    }
  }

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV || 'N/A',
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'N/A',
      VITE_SUPABASE_ANON_KEY: getEnvStats('VITE_SUPABASE_ANON_KEY'),
      JWT_SECRET: getEnvStats('JWT_SECRET'),
      VITE_JWT_SECRET: getEnvStats('VITE_JWT_SECRET'),
      SUPABASE_JWT_SECRET: getEnvStats('SUPABASE_JWT_SECRET'),
    },
    dbResult,
    tokenDiagnostics
  });
}
