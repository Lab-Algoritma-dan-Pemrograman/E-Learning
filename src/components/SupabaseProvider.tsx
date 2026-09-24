import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase, setSupabaseSession } from '../lib/supabase';
import { useStore, UserProfile } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { initializeFromToken, TokenPayload, startPostMessageListener, normalizeRole, resolveElearningRole } from '../services/tokenService';
import { calculateStreak } from '../services/streakService';
import { Loader2 } from 'lucide-react';

interface SupabaseContextType {
  tokenPayload: TokenPayload | null;
  loading: boolean;
}

const SupabaseContext = createContext<SupabaseContextType>({ tokenPayload: null, loading: true });

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const setStoreUser = useStore((state) => state.setUser);
  const setCurriculum = useStore((state) => state.setCurriculum);
  const setCompletedLessons = useProgress((state) => state.setCompletedLessons);
  const [isSyncing, setIsSyncing] = useState(false);
  const hasSubscribedProfile = useRef(false);

  // postMessage listener — menerima token dari Web Utama jika E-Learning
  // dibuka sebagai popup atau iframe (tanpa URL redirect)
  useEffect(() => {
    const stopListener = startPostMessageListener(async () => {
      setStoreUser(null);
      window.location.reload();
    });
    return stopListener;
  }, []);

  useEffect(() => {
    let unsubProfileChannel: any = null;
    let unsubProgressChannel: any = null;

    const initialize = async () => {
      console.log("Initializing E-Learning Supabase session...");

      // 1. Try to get token from URL or sessionStorage
      const result = await initializeFromToken();

      if (!result) {
        console.log("No valid token found. User must access from web utama.");
        setTokenPayload(null);
        setStoreUser(null);
        setCompletedLessons([]);

        // Load curriculum as guest/fallback
        await loadCurriculum();

        setIsSyncing(false);
        setLoading(false);
        setSyncError(null);
        return;
      }

      const payload = result.payload;
      
      // Normalize and map role from Web Utama to E-Learning role
      payload.role = normalizeRole(payload.role);

      const savedToken = sessionStorage.getItem('elearning_token') || '';

      console.log("Token valid for Supabase:", payload.nim, payload.nama, "Role:", payload.role);
      setTokenPayload(payload);
      setIsSyncing(true);
      setSyncError(null);

      try {
      // Set header authorization token for RLS
        setSupabaseSession(savedToken);
        
        // Expose supabase client to window so that console security test scripts can access it without frame block errors
        (window as any).supabase = supabase;

        // Load curriculum from Supabase
        await loadCurriculum(payload.role);

        // 2. Fetch or Create User Profile in Supabase
        const nim = payload.nim;
        console.log("Fetching user profile from Supabase table: users...");

        const { data: userProfile, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('nim', nim)
          .maybeSingle();

        let profileData: UserProfile;

        if (fetchError || !userProfile) {
          console.log("Profile not found or fetch error, creating new user profile in Supabase...");

          const newProfile = {
            nim: payload.nim,
            nama: payload.nama,
            kelas: payload.kelas,
            jurusan: (payload as any).jurusan || null,
            email: payload.email || null,
            xp: 0,
            level: 1,
            streak: 1, // Day 1 active streak
            study_time: 0,
            last_active: new Date().toISOString(),
            created_at: new Date().toISOString(),
            role: payload.role || 'praktikan',
            assessment_access: {
              pre_test: false,
              post_test: false,
              program_keterampilan: false,
              ujian_praktik: false
            },
            level_access_overrides: {}
          };

          try {
            const { error: insertError } = await supabase
              .from('users')
              .insert([newProfile]);

            if (insertError) {
              console.warn("Notice: Failed to insert profile in Supabase (might already exist or RLS):", insertError.message);
            }
          } catch (e) {
            console.warn("Insert profile caught:", e);
          }

          // Map snake_case database schema to camelCase UserProfile store schema
          profileData = {
            nim: newProfile.nim,
            nama: newProfile.nama,
            kelas: newProfile.kelas,
            jurusan: newProfile.jurusan,
            email: newProfile.email,
            xp: newProfile.xp,
            level: newProfile.level,
            streak: newProfile.streak,
            lastActive: newProfile.last_active,
            createdAt: newProfile.created_at,
            role: (payload.role || newProfile.role) as any,
            assessmentAccess: newProfile.assessment_access as any,
            levelAccessOverrides: newProfile.level_access_overrides as any,
            studyTime: newProfile.study_time || 0
          };
          console.log("Profile initialized for session with role:", profileData.role);
        } else {
          console.log("Profile found in Supabase, loading data...");
          
          // Calculate streak based on last_active before overwriting it
          const { newStreak } = calculateStreak(userProfile.last_active, userProfile.streak);
          // elearning_role (milik E-Learning) meng-override role kanonik:
          // asisten ber-flag admin tetap 'asisten' di kolom bersama.
          const effectiveRole = (resolveElearningRole(userProfile.role, (userProfile as any).elearning_role) || payload.role || 'praktikan');

          // Map snake_case to camelCase
          profileData = {
            nim: userProfile.nim,
            nama: payload.nama || userProfile.nama,
            kelas: payload.kelas || userProfile.kelas,
            jurusan: userProfile.jurusan || (payload as any).jurusan || null,
            email: userProfile.email || payload.email || null,
            xp: userProfile.xp,
            level: userProfile.level,
            streak: newStreak,
            lastActive: userProfile.last_active,
            createdAt: userProfile.created_at,
            role: effectiveRole as any,
            assessmentAccess: userProfile.assessment_access as any,
            levelAccessOverrides: userProfile.level_access_overrides || {},
            studyTime: userProfile.study_time || 0
          };

          // Always update last_active and streak on login/load, and update nama/kelas/role/jurusan if changed in Web Utama
          const updates: any = { 
            last_active: new Date().toISOString(),
            streak: newStreak
          };
          const hasRoleChange = payload.role && normalizeRole(userProfile.role) !== payload.role;
          const hasJurusanChange = (payload as any).jurusan && profileData.jurusan !== (payload as any).jurusan;
          
          if (profileData.nama !== payload.nama) updates.nama = payload.nama;
          if (profileData.kelas !== payload.kelas) updates.kelas = payload.kelas;
          if (hasRoleChange) updates.role = payload.role;
          if (hasJurusanChange) updates.jurusan = (payload as any).jurusan;

          try {
            await supabase
              .from('users')
              .update(updates)
              .eq('nim', nim);
          } catch (updateErr) {
            console.warn("Could not sync user updates to Supabase (RLS or trigger):", updateErr);
          }

          profileData.lastActive = updates.last_active;
          profileData.streak = newStreak;
          profileData.nama = payload.nama;
          profileData.kelas = payload.kelas;
          profileData.role = effectiveRole as any;
          if ((payload as any).jurusan) profileData.jurusan = (payload as any).jurusan;

          // Check for streak milestones (e.g., streak-3, streak-7)
          if (newStreak >= 3) {
            try {
              const { checkAndUnlockAchievements } = await import('../services/achievementService');
              const newlyUnlocked = await checkAndUnlockAchievements(profileData, {});
              newlyUnlocked.forEach(ach => useStore.getState().pushAchievement(ach));
            } catch (err) {
              console.warn("Achievement check on login warning:", err);
            }
          }
        }

        console.log("Setting store user:", profileData.nama);
        setStoreUser(profileData);

        // Record login audit log once per session
        const sessionLoggedIn = sessionStorage.getItem('logged_in_audit_logged');
        if (!sessionLoggedIn && profileData.nim) {
          const { monitoringService } = await import('../services/monitoringService');
          await monitoringService.addAuditLog(profileData.nim, profileData.nama, 'login', 'Masuk ke sistem E-Learning');
          sessionStorage.setItem('logged_in_audit_logged', 'true');
        }

        // 3. Realtime Subscription for Profile updates
        console.log("Subscribing to realtime profile updates via Supabase...");
        unsubProfileChannel = supabase
          .channel(`public:users:nim=${nim}`)
          .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'users', 
            filter: `nim=eq.${nim}` 
          }, (payload) => {
            const updated = payload.new as any;
            console.log("Profile updated in realtime from Supabase:", updated.nama);
            
            const currentUser = useStore.getState().user;
            const oldLevel = currentUser?.level || 1;
            const newLevel = updated.level || 1;
            const effectiveRole = currentUser?.role && ['admin', 'kordas', 'asisten'].includes(currentUser.role)
              ? currentUser.role
              : resolveElearningRole(updated.role, (updated as any).elearning_role);
            
            setStoreUser({
              nim: updated.nim,
              nama: updated.nama,
              kelas: updated.kelas,
              jurusan: updated.jurusan,
              email: updated.email,
              xp: updated.xp,
              level: newLevel,
              streak: updated.streak,
              lastActive: updated.last_active,
              createdAt: updated.created_at,
              role: effectiveRole,
              assessmentAccess: updated.assessment_access,
              levelAccessOverrides: updated.level_access_overrides || {},
              studyTime: updated.study_time || 0
            });

            if (newLevel > oldLevel) {
              useStore.getState().setLevelUpNotification(newLevel);
            }
          })
          .subscribe();

        // 4. Load & Subscribe to Progress
        console.log("Loading completed lessons progress...");
        const { data: progressData, error: progressError } = await supabase
          .from('student_progress')
          .select('lesson_id')
          .eq('nim', nim)
          .eq('completed', true);

        if (progressError) {
          console.error("Failed to load progress from Supabase:", progressError);
        } else {
          const lessonIds = (progressData || []).map(p => p.lesson_id);
          setCompletedLessons(lessonIds);
        }

        console.log("Subscribing to progress changes via Supabase Realtime...");
        unsubProgressChannel = supabase
          .channel(`public:student_progress:nim=${nim}`)
          .on('postgres_changes', { 
            event: '*', 
            schema: 'public', 
            table: 'student_progress', 
            filter: `nim=eq.${nim}` 
          }, async () => {
            // Re-fetch progress on change
            const { data: latestProgress } = await supabase
              .from('student_progress')
              .select('lesson_id')
              .eq('nim', nim)
              .eq('completed', true);
            const lessonIds = (latestProgress || []).map(p => p.lesson_id);
            setCompletedLessons(lessonIds);
          })
          .subscribe();

        console.log("Supabase initialization complete.");
      } catch (error: any) {
        console.error("Supabase initialization error:", error);
        setSyncError(error.message || "Gagal memuat profil Supabase.");
        
        // Fallback profile
        const fallbackProfile: UserProfile = {
          nim: payload.nim,
          nama: payload.nama,
          kelas: payload.kelas,
          email: payload.email || null,
          xp: 0,
          level: 1,
          streak: 0,
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          role: payload.role || 'praktikan',
          assessmentAccess: {
            pre_test: false,
            post_test: false,
            program_keterampilan: false,
            ujian_praktik: false
          },
          levelAccessOverrides: {},
          studyTime: 0
        };
        setStoreUser(fallbackProfile);
      } finally {
        setIsSyncing(false);
        setLoading(false);
      }
    };

    const loadCurriculum = async (userRole?: string) => {
      try {
        console.log("Loading curriculum levels from Supabase database...");
        let levelsData: any[] | null = null;
        let levelsError: any = null;

        const res = await supabase
          .from('levels')
          .select('*')
          .order('sort_order');
        levelsData = res.data;
        levelsError = res.error;

        if (levelsError && levelsError.code === '42703') {
          console.warn("levels.sort_order column not found in SupabaseProvider, falling back to in-memory sort by ID");
          const fallbackRes = await supabase
            .from('levels')
            .select('*');
          levelsData = fallbackRes.data;
          levelsError = fallbackRes.error;
          if (levelsData) {
            levelsData.sort((a, b) => a.id.localeCompare(b.id));
          }
        }

        if (levelsError || !levelsData || levelsData.length === 0) {
          console.warn("No curriculum in database. Using local static fallback...");
          const { curriculum: defaultCurriculum } = await import('../data/curriculum');
          setCurriculum(defaultCurriculum);
          return;
        }

        // Fetch modules and lessons
        const { data: modulesData } = await supabase
          .from('modules')
          .select('*')
          .order('sort_order');

        const isStaff = userRole === 'admin' || userRole === 'kordas' || userRole === 'koordinator' || userRole === 'asisten';
        const lessonsTable = isStaff ? 'lessons' : 'student_lessons';

        const { data: lessonsData } = await supabase
          .from(lessonsTable)
          .select('*')
          .order('sort_order');

        const resolvedLevels = levelsData.map(level => {
          const levelModules = (modulesData || [])
            .filter(m => m.level_id === level.id)
            .map(mod => {
              const parseJson = (val: any, fallback: any) => {
                if (val === null || val === undefined) return fallback;
                if (typeof val === 'object') return val;
                if (typeof val === 'string') {
                  try {
                    const parsed = JSON.parse(val);
                    return (parsed !== null && parsed !== undefined) ? parsed : fallback;
                  } catch {
                    return fallback;
                  }
                }
                return fallback;
              };

              const modLessons = (lessonsData || [])
                .filter(l => l.module_id === mod.id)
                .map(les => {
                  const rawQuiz = parseJson(les.quiz, null);
                  const quiz = (rawQuiz && typeof rawQuiz === 'object' && (rawQuiz.question || (Array.isArray(rawQuiz.options) && rawQuiz.options.length > 0))) ? {
                    question: rawQuiz.question || '',
                    options: Array.isArray(rawQuiz.options) ? rawQuiz.options : [],
                    correctAnswer: typeof rawQuiz.correctAnswer === 'number' ? rawQuiz.correctAnswer : (typeof rawQuiz.correct_answer === 'number' ? rawQuiz.correct_answer : 0)
                  } : null;
                  const rawTestCases = parseJson(les.test_cases, []);
                  const testCases = (Array.isArray(rawTestCases) ? rawTestCases : []).map((tc: any) => ({
                    expectedOutput: tc.expectedOutput ?? tc.expected_output ?? '',
                    description: tc.description ?? '',
                    input: tc.input
                  }));
                  const rawValidation = parseJson(les.validation_rules, []);
                  const validationRules = Array.isArray(rawValidation) ? rawValidation : [];

                  return {
                    id: les.id,
                    title: les.title,
                    explanation: les.explanation,
                    codeExample: les.code_example,
                    initialCode: les.initial_code,
                    solution: les.solution,
                    hint: les.hint,
                    quiz,
                    testCases,
                    validationRules,
                    xpReward: les.xp_reward ?? 60
                  };
                });
              return {
                id: mod.id,
                title: mod.title,
                lessons: modLessons
              };
            });
          return {
            id: level.id,
            title: level.title,
            description: level.description,
            accessMode: level.access_mode,
            locked: level.locked,
            modules: levelModules
          };
        });

        console.log("Curriculum loaded successfully from Supabase:", resolvedLevels.length, "levels");
        setCurriculum(resolvedLevels);
      } catch (err) {
        console.error("Failed to load curriculum from Supabase:", err);
        const { curriculum: defaultCurriculum } = await import('../data/curriculum');
        setCurriculum(defaultCurriculum);
      }
    };

    initialize();

    return () => {
      if (unsubProfileChannel) supabase.removeChannel(unsubProfileChannel);
      if (unsubProgressChannel) supabase.removeChannel(unsubProgressChannel);
    };
  }, [setStoreUser, setCompletedLessons, setCurriculum]);

  if (loading || isSyncing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 bg-rose-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-rose-700/20 mb-6 animate-bounce">
          <span className="text-2xl font-black">E</span>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-rose-700" />
        <p className="mt-4 text-zinc-500 font-medium animate-pulse">
          {isSyncing ? "Menyiapkan sesi belajar Supabase..." : "Memuat E-Learning..."}
        </p>
        {syncError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl max-w-md text-center">
            <p className="text-red-600 text-sm font-medium">{syncError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 text-xs text-red-500 underline hover:text-red-700"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <SupabaseContext.Provider value={{ tokenPayload, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
};
