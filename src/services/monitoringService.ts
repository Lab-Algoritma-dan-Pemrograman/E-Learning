import { supabase } from '../lib/supabase';

export interface ActiveSession {
  nim: string;
  nama: string;
  kelas: string;
  last_heartbeat: string;
  current_activity: string;
  attempt_id?: string | null;
  users?: {
    role: 'admin' | 'kordas' | 'asisten' | 'praktikan';
  } | null;
}

export interface ActivityLog {
  id?: string;
  nim: string;
  nama: string;
  event_type: string;
  timestamp: string;
  details: string;
  ip_address?: string | null;
}

export const monitoringService = {
  // =========================================================================
  // USER HEARTBEAT & ACTIVE SESSIONS
  // =========================================================================

  /**
   * Update student active session heartbeat. Should be called per 30s.
   */
  async updateHeartbeat(
    nim: string,
    nama: string,
    kelas: string,
    currentActivity: string,
    attemptId: string | null = null
  ): Promise<void> {
    const session = {
      nim,
      nama,
      kelas,
      last_heartbeat: new Date().toISOString(),
      current_activity: currentActivity,
      attempt_id: attemptId
    };

    const { error } = await supabase
      .from('active_sessions')
      .upsert(session, { onConflict: 'nim' });

    if (error) {
      console.warn("Failed to update heartbeat:", error.message);
    }
  },

  /**
   * Subscribes to changes in active sessions to display live online users
   */
  subscribeActiveSessions(onUpdate: (sessions: any[]) => void) {
    // 1. Initial fetch
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('active_sessions')
        .select('*, users(role, kelas, jurusan)')
        .order('last_heartbeat', { ascending: false });
      if (!error && data) {
        onUpdate(data);
      }
    };
    
    fetchSessions();

    // 2. Realtime Listener
    const channel = supabase
      .channel('realtime:active_sessions')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'active_sessions' 
      }, () => {
        fetchSessions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Deletes session heartbeats that are older than the threshold time.
   */
  async cleanupStaleSessions(thresholdMinutes: number = 2): Promise<void> {
    try {
      const thresholdTime = new Date(Date.now() - thresholdMinutes * 60 * 1000).toISOString();
      const { error } = await supabase
        .from('active_sessions')
        .delete()
        .lt('last_heartbeat', thresholdTime);

      if (error) {
        console.warn("Failed to cleanup stale sessions:", error.message);
      }
    } catch (e) {
      console.error("Failed to run cleanupStaleSessions:", e);
    }
  },

  // =========================================================================
  // AUDIT LOGS
  // =========================================================================

  /**
   * Adds an audit event log to the database
   */
  async addAuditLog(
    nim: string,
    nama: string,
    eventType: 'login' | 'logout' | 'start_test' | 'submit_test' | 'token_generated' | 'token_used' | 'access_modified' | 'ai_grading' | 'curriculum_modified' | 'progress_reset',
    details: string
  ): Promise<void> {
    try {
      const log: ActivityLog = {
        nim,
        nama,
        event_type: eventType,
        timestamp: new Date().toISOString(),
        details
      };
      await supabase.from('activity_logs').insert([log]);
    } catch (e) {
      console.error("Failed to add audit log:", e);
    }
  },

  /**
   * Fetch log history
   */
  async getAuditLogs(limit: number = 100): Promise<ActivityLog[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  /**
   * Subscribes to realtime audit logs stream
   */
  subscribeAuditLogs(onLog: (logs: ActivityLog[]) => void) {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
      if (!error && data) {
        onLog(data);
      }
    };

    fetchLogs();

    const channel = supabase
      .channel('realtime:activity_logs')
      .on('postgres_changes', {
        event: '*', // Listen to INSERT, DELETE, etc.
        schema: 'public',
        table: 'activity_logs'
      }, () => {
        fetchLogs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Deletes a specific audit log by ID
   */
  async deleteAuditLog(logId: string): Promise<void> {
    const { error } = await supabase
      .from('activity_logs')
      .delete()
      .eq('id', logId);

    if (error) throw error;
  }
};
