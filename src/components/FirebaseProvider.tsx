import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useStore, UserProfile } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { syncProgress, syncExistingProgressToSupabase } from '../services/progressService';
import { curriculumService } from '../services/curriculumService';
import { initializeFromToken, TokenPayload } from '../services/tokenService';

import { Loader2 } from 'lucide-react';

interface FirebaseContextType {
  tokenPayload: TokenPayload | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ tokenPayload: null, loading: true });

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const setStoreUser = useStore((state) => state.setUser);
  const setCurriculum = useStore((state) => state.setCurriculum);
  const setCompletedLessons = useProgress((state) => state.setCompletedLessons);
  const [isSyncing, setIsSyncing] = useState(false);
  const hasSyncedToSupabase = useRef(false);

  useEffect(() => {
    let unsubProfile: (() => void) | undefined;
    let unsubProgress: (() => void) | undefined;
    let unsubCurriculum: (() => void) | undefined;

    const initialize = async () => {
      console.log("Initializing E-Learning session...");

      // Helper to handle curriculum loading
      const loadCurriculum = () => {
        return new Promise<void>((resolve) => {
          unsubCurriculum = curriculumService.subscribeToCurriculum((levels) => {
            console.log("Curriculum updated:", levels.length, "levels");
            setCurriculum(levels);
            resolve();
          });
        });
      };

      // Try to get token from URL or sessionStorage
      const payload = await initializeFromToken();

      if (!payload) {
        console.log("No valid token found. User must access from web utama.");
        setTokenPayload(null);
        setStoreUser(null);
        setCompletedLessons([]);

        await loadCurriculum();

        setIsSyncing(false);
        setLoading(false);
        setSyncError(null);
        return;
      }

      console.log("Token valid for:", payload.nim, payload.nama);
      setTokenPayload(payload);
      setIsSyncing(true);
      setSyncError(null);

      try {
        console.log("Loading curriculum...");
        await loadCurriculum();

        // Use NIM as the Firestore document ID
        const userRef = doc(db, 'users', payload.nim);
        console.log("Fetching user profile from Firestore...");

        const userSnap = await getDoc(userRef);

        let profileData: UserProfile;
        if (!userSnap.exists()) {
          console.log("Profile not found, creating new user profile...");
          
          // Check if this is the first user (empty database) → auto-assign admin
          const usersSnapshot = await getDocs(collection(db, 'users'));
          const isFirstUser = usersSnapshot.empty;
          if (isFirstUser) {
            console.log("🎉 First user detected! Assigning admin role.");
          }

          profileData = {
            nim: payload.nim,
            nama: payload.nama,
            kelas: payload.kelas,
            email: payload.email || null,
            xp: 0,
            level: 1,
            streak: 0,
            lastActive: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            role: isFirstUser ? 'admin' : 'user',
          };
          await setDoc(userRef, profileData);
          console.log("New profile created successfully");
        } else {
          console.log("Profile found, loading data...");
          profileData = userSnap.data() as UserProfile;
          // Update nama and kelas in case they changed in web utama
          if (profileData.nama !== payload.nama || profileData.kelas !== payload.kelas) {
            await setDoc(userRef, {
              ...profileData,
              nama: payload.nama,
              kelas: payload.kelas,
            });
            profileData.nama = payload.nama;
            profileData.kelas = payload.kelas;
          }
        }

        console.log("Setting store user:", profileData.nama);
        setStoreUser(profileData);

        console.log("Subscribing to real-time profile updates...");
        unsubProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            console.log("Profile updated in real-time");
            setStoreUser(doc.data() as UserProfile);
          }
        }, (error) => {
          console.error("Profile sync real-time error:", error);
          handleFirestoreError(error, OperationType.GET, 'users/' + payload.nim);
        });

        console.log("Subscribing to progress updates...");
        unsubProgress = syncProgress(payload.nim, setCompletedLessons);

        console.log("Firebase sync complete");
      } catch (error: any) {
        console.error("Auth sync error detail:", error);
        setSyncError(error.message || "Gagal memuat profil. Pastikan Firestore sudah aktif.");
        
        // FALLBACK: Still set user from token so they can access the app
        // even if Firestore is not yet configured (e.g. new project, rules not set)
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
          role: 'admin', // Give admin role on fallback so they can initialize DB
        };
        console.log("Using fallback profile from token:", fallbackProfile.nama);
        setStoreUser(fallbackProfile);
      } finally {
        setIsSyncing(false);
        setLoading(false);
      }
    };

    initialize();

    // Fallback timeout to prevent infinite loading screen
    const loadingTimeout = setTimeout(() => {
      setLoading((currentLoading) => {
        if (currentLoading) {
          console.warn("Loading timeout reached. Forcing loading to false.");
          return false;
        }
        return currentLoading;
      });
      setIsSyncing(false);
    }, 10000); // 10 seconds

    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      if (unsubProfile) unsubProfile();
      if (unsubProgress) unsubProgress();
      if (unsubCurriculum) unsubCurriculum();
    };
  }, [setStoreUser, setCompletedLessons]);

  // ===== Auto-sync existing progress to Supabase on load =====
  const user = useStore((state) => state.user);
  const curriculum = useStore((state) => state.curriculum);
  const completedLessons = useProgress((state) => state.completedLessons);

  useEffect(() => {
    if (
      !hasSyncedToSupabase.current &&
      user &&
      curriculum.length > 0 &&
      completedLessons.length > 0
    ) {
      hasSyncedToSupabase.current = true;
      syncExistingProgressToSupabase(user, curriculum, completedLessons);
    }
  }, [user, curriculum, completedLessons]);

  if (loading || isSyncing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 bg-rose-700 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-rose-700/20 mb-6 animate-bounce">
          <span className="text-2xl font-black">E</span>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-rose-700" />
        <p className="mt-4 text-zinc-500 font-medium animate-pulse">
          {isSyncing ? "Menyiapkan profil Anda..." : "Memuat E-Learning..."}
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
    <FirebaseContext.Provider value={{ tokenPayload, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};

