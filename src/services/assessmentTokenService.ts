import { supabase } from '../lib/supabase';

export interface AssessmentToken {
  token: string;
  created_by: string;
  created_at: string;
  expired_at: string;
  status: 'active' | 'expired' | 'used';
  usage_limit: number;
  usage_count: number;
  target_classes: string[];
}

export const assessmentTokenService = {
  /**
   * Generates a 6-digit alphanumeric token for Ujian Praktik access
   */
  async generateToken(
    createdByNim: string,
    usageLimit: number = 40,
    targetClasses: string[] = [],
    expirationHours: number = 4
  ): Promise<AssessmentToken> {
    // Generate 6 character alphanumeric code
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let tokenStr = '';
    for (let i = 0; i < 6; i++) {
      tokenStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Calculate expiration timestamp
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + expirationHours);

    const newToken = {
      token: tokenStr,
      created_by: createdByNim,
      expired_at: expiredAt.toISOString(),
      status: 'active',
      usage_limit: usageLimit,
      usage_count: 0,
      target_classes: targetClasses
    };

    const { data, error } = await supabase
      .from('assessment_tokens')
      .insert([newToken])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Fetch all tokens for the admin/kordas dashboard
   */
  async getAllTokens(): Promise<AssessmentToken[]> {
    const { data, error } = await supabase
      .from('assessment_tokens')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Validate if a token is valid, active, not expired, and belongs to the student's class
   */
  async validateToken(tokenStr: string, studentClass: string): Promise<{ valid: boolean; message: string }> {
    const cleanToken = tokenStr.trim().toUpperCase();
    
    const { data: tokenDoc, error } = await supabase
      .from('assessment_tokens')
      .select('*')
      .eq('token', cleanToken)
      .single();

    if (error || !tokenDoc) {
      return { valid: false, message: 'Token tidak valid. Silakan periksa kembali kode Anda.' };
    }

    // Check expiration
    const now = new Date();
    const expiredAt = new Date(tokenDoc.expired_at);
    if (now > expiredAt) {
      return { valid: false, message: 'Token sudah kedaluwarsa.' };
    }

    // Check status
    if (tokenDoc.status !== 'active') {
      return { valid: false, message: 'Token sudah tidak aktif.' };
    }

    // Check usage limit
    if (tokenDoc.usage_count >= tokenDoc.usage_limit) {
      return { valid: false, message: 'Token sudah mencapai batas maksimum penggunaan.' };
    }

    // Check target classes (if configured)
    const targetClasses = Array.isArray(tokenDoc.target_classes) ? tokenDoc.target_classes : [];
    if (targetClasses.length > 0) {
      const isClassAllowed = targetClasses.some((c: string) => 
        studentClass.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(studentClass.toLowerCase())
      );
      if (!isClassAllowed) {
        return { valid: false, message: `Token ini tidak diperuntukkan bagi kelas Anda (${studentClass}).` };
      }
    }

    return { valid: true, message: 'Token berhasil divalidasi.' };
  },

  /**
   * Increments the token usage count when a student successfully enters
   */
  async incrementTokenUsage(tokenStr: string): Promise<void> {
    const cleanToken = tokenStr.trim().toUpperCase();
    
    // Fetch current usage_count
    const { data: tokenDoc } = await supabase
      .from('assessment_tokens')
      .select('usage_count, usage_limit')
      .eq('token', cleanToken)
      .single();

    if (tokenDoc) {
      const newCount = tokenDoc.usage_count + 1;
      const statusUpdate = newCount >= tokenDoc.usage_limit ? 'used' : 'active';

      await supabase
        .from('assessment_tokens')
        .update({ 
          usage_count: newCount,
          status: statusUpdate
        })
        .eq('token', cleanToken);
    }
  },

  /**
   * Deactivate a token manually (Kordas/Admin action)
   */
  async deactivateToken(tokenStr: string): Promise<void> {
    const { error } = await supabase
      .from('assessment_tokens')
      .update({ status: 'expired' })
      .eq('token', tokenStr);

    if (error) throw error;
  }
};
