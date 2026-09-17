import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key are required. Check environment variables.');
    }
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

export default async function handler(req: any, res: any) {
  // 1. Verify cron secret if configured on Vercel
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const startTime = Date.now();
    const supabase = getSupabaseClient();
    
    // 2. Perform a light query to keep the database active
    const { data, error } = await supabase
      .from('lessons')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase ping error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    const duration = Date.now() - startTime;
    console.log(`Supabase ping successful in ${duration}ms`);
    return res.status(200).json({
      success: true,
      message: 'Supabase project kept warm successfully.',
      durationMs: duration,
      data,
    });
  } catch (err: any) {
    console.error('Ping handler exception:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
