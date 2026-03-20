import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { useStore, UserProfile } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { syncProgress } from '../services/progressService';
import { curriculumService } from '../services/curriculumService';

import { Loader2 } from 'lucide-react';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ user: null, loading: true });

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const setStoreUser = useStore((state) => state.setUser);
  const setCurriculum = useStore((state) => state.setCurriculum);
  const setCompletedLessons = useProgress((state) => state.setCompletedLessons);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let unsubProfile: (() => void) | undefined;
    let unsubProgress: (() => void) | undefined;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Firebase initialized with project:", auth.app.options.projectId);
      console.log("Auth State Changed:", firebaseUser?.email);
      
      if (!firebaseUser) {
        setUser(null);
        setStoreUser(null);
        setCompletedLessons([]);
        if (unsubProfile) unsubProfile();
        if (unsubProgress) unsubProgress();
        setIsSyncing(false);
        setLoading(false);
        setSyncError(null);
        return;
      }

      setUser(firebaseUser);
      setIsSyncing(true);
      setSyncError(null);
      
      const userRef = doc(db, 'users', firebaseUser.uid);
      
      try {
        console.log("Attempting to sync profile for:", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        let profileData: UserProfile;
        if (!userSnap.exists()) {
          console.log("Creating new user profile...");
          profileData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            xp: 0,
            level: 1,
            streak: 0,
            lastActive: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, profileData);
        } else {
          profileData = userSnap.data() as UserProfile;
        }
        
        setStoreUser(profileData);

        unsubProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setStoreUser(doc.data() as UserProfile);
          }
        }, (error) => {
          console.error("Profile sync real-time error:", error);
        });

        unsubProgress = syncProgress(firebaseUser.uid, setCompletedLessons);
      } catch (error: any) {
        console.error("Auth sync error detail:", error);
        setSyncError(error.message || "Gagal memuat profil. Pastikan Firestore sudah aktif.");
      } finally {
        setIsSyncing(false);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
      if (unsubProgress) unsubProgress();
    };
  }, [setStoreUser, setCompletedLessons]);

  if (loading || isSyncing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 mb-6 animate-bounce">
          <span className="text-2xl font-black">P</span>
        </div>
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="mt-4 text-zinc-500 font-medium animate-pulse">
          {isSyncing ? "Menyiapkan profil Anda..." : "Memuat PyLearn..."}
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
    <FirebaseContext.Provider value={{ user, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};
