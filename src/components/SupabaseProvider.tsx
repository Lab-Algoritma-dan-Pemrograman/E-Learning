import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase, setSupabaseSession } from '../lib/supabase';
import { useStore, UserProfile } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { initializeFromToken, TokenPayload } from '../services/tokenService';
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
      const savedToken = sessionStorage.getItem('elearning_token') || '';

      console.log("Token valid for Supabase:", payload.nim, payload.nama, "Role:", payload.role || "no role (default: user)");
      setTokenPayload(payload);
      setIsSyncing(true);
      setSyncError(null);

      try {
        // Set header authorization token for RLS
        setSupabaseSession(savedToken);

        // Load curriculum from Supabase
        await loadCurriculum();

        // 2. Fetch or Create User Profile in Supabase
        const nim = payload.nim;
        console.log("Fetching user profile from Supabase table: users...");

        const { data: userProfile, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('nim', nim)
          .single();

        let profileData: UserProfile;

        if (fetchError || !userProfile) {
          console.log("Profile not found or fetch error, creating new user profile in Supabase...");

          const newProfile = {
            nim: payload.nim,
            nama: payload.nama,
            kelas: payload.kelas,
            email: payload.email || null,
            xp: 0,
            level: 1,
            streak: 0,
            last_active: new Date().toISOString(),
            created_at: new Date().toISOString(),
            role: payload.role || 'user',
            assessment_access: {
              pre_test: false,
              post_test: false,
              program_keterampilan: false,
              ujian_praktik: false
            },
            level_access_overrides: {}
          };

          const { error: insertError } = await supabase
            .from('users')
            .insert([newProfile]);

          if (insertError) {
            console.error("Failed to insert profile in Supabase:", insertError);
            throw new Error(insertError.message);
          }

          // Map snake_case database schema to camelCase UserProfile store schema
          profileData = {
            nim: newProfile.nim,
            nama: newProfile.nama,
            kelas: newProfile.kelas,
            email: newProfile.email,
            xp: newProfile.xp,
            level: newProfile.level,
            streak: newProfile.streak,
            lastActive: newProfile.last_active,
            createdAt: newProfile.created_at,
            role: newProfile.role as any,
            assessmentAccess: newProfile.assessment_access as any,
            levelAccessOverrides: newProfile.level_access_overrides as any
          };
          console.log("New profile created successfully in Supabase");
        } else {
          console.log("Profile found in Supabase, loading data...");
          
          // Map snake_case to camelCase
          profileData = {
            nim: userProfile.nim,
            nama: userProfile.nama,
            kelas: userProfile.kelas,
            email: userProfile.email,
            xp: userProfile.xp,
            level: userProfile.level,
            streak: userProfile.streak,
            lastActive: userProfile.last_active,
            createdAt: userProfile.created_at,
            role: userProfile.role as any,
            assessmentAccess: userProfile.assessment_access as any,
            levelAccessOverrides: userProfile.level_access_overrides || {}
          };

          // Update nama/kelas/role if changed in Web Utama
          if (profileData.nama !== payload.nama || profileData.kelas !== payload.kelas || (payload.role && profileData.role !== payload.role)) {
            const updates: any = { nama: payload.nama, kelas: payload.kelas };
            if (payload.role) updates.role = payload.role;

            await supabase
              .from('users')
              .update(updates)
              .eq('nim', nim);
            profileData.nama = payload.nama;
            profileData.kelas = payload.kelas;
            if (payload.role) profileData.role = payload.role as any;
          }
        }

        console.log("Setting store user:", profileData.nama);
        setStoreUser(profileData);

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
            setStoreUser({
              nim: updated.nim,
              nama: updated.nama,
              kelas: updated.kelas,
              email: updated.email,
              xp: updated.xp,
              level: updated.level,
              streak: updated.streak,
              lastActive: updated.last_active,
              createdAt: updated.created_at,
              role: updated.role,
              assessmentAccess: updated.assessment_access,
              levelAccessOverrides: updated.level_access_overrides || {}
            });
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
          role: 'user',
          assessmentAccess: {
            pre_test: false,
            post_test: false,
            program_keterampilan: false,
            ujian_praktik: false
          },
          levelAccessOverrides: {}
        };
        setStoreUser(fallbackProfile);
      } finally {
        setIsSyncing(false);
        setLoading(false);
      }
    };

    const loadCurriculum = async () => {
      try {
        console.log("Loading curriculum levels from Supabase database...");
        const { data: levelsData, error: levelsError } = await supabase
          .from('levels')
          .select('*')
          .order('id');

        if (levelsError || !levelsData || levelsData.length === 0) {
          console.warn("No curriculum in database. Initial setup needed.");
          return;
        }

        // Fetch modules and lessons
        const { data: modulesData } = await supabase
          .from('modules')
          .select('*')
          .order('sort_order');

        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .order('sort_order');

        const resolvedLevels = levelsData.map(level => {
          const levelModules = (modulesData || [])
            .filter(m => m.level_id === level.id)
            .map(mod => {
              const modLessons = (lessonsData || [])
                .filter(l => l.module_id === mod.id)
                .map(les => ({
                  id: les.id,
                  title: les.title,
                  explanation: les.explanation,
                  codeExample: les.code_example,
                  initialCode: les.initial_code,
                  solution: les.solution,
                  hint: les.hint,
                  quiz: les.quiz,
                  testCases: les.test_cases,
                  validationRules: les.validation_rules
                }));
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
