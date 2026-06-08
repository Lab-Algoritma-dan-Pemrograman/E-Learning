export default async function handler(req: any, res: any) {
  // Simple check to prevent exposing this publicly
  const { code } = req.query;
  if (code !== 'faqod123') {
    return res.status(403).json({ error: 'Forbidden. Pass correct code query parameter.' });
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

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV || 'N/A',
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'N/A',
      VITE_SUPABASE_ANON_KEY: getEnvStats('VITE_SUPABASE_ANON_KEY'),
      JWT_SECRET: getEnvStats('JWT_SECRET'),
      VITE_JWT_SECRET: getEnvStats('VITE_JWT_SECRET'),
      SUPABASE_JWT_SECRET: getEnvStats('SUPABASE_JWT_SECRET'),
    }
  });
}
