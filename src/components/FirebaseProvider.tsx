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
  const setStoreUser = useStore((state) => state.setUser);
  const setCurriculum = useStore((state) => state.setCurriculum);
  const setCompletedLessons = useProgress((state) => state.setCompletedLessons);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!user) {
      setCurriculum([]);
      return;
    }
    // Subscribe to curriculum updates
    const unsubscribe = curriculumService.subscribeToCurriculum(setCurriculum);
    return () => unsubscribe();
  }, [user, setCurriculum]);

  useEffect(() => {
    let unsubProfile: (() => void) | undefined;
    let unsubProgress: (() => void) | undefined;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        setIsSyncing(true);
        const userRef = doc(db, 'users', firebaseUser.uid);
        
        try {
          // Check if user exists in Firestore
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            // Create new user profile
            const newUser: UserProfile = {
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
            await setDoc(userRef, newUser);
            setStoreUser(newUser);
          } else {
            // Sync with Firestore
            setStoreUser(userSnap.data() as UserProfile);
          }

          // Listen for real-time updates
          unsubProfile = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
              setStoreUser(doc.data() as UserProfile);
            }
          }, (error) => {
            handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
          });

          // Sync progress
          unsubProgress = syncProgress(firebaseUser.uid, setCompletedLessons);
        } catch (error) {
          console.error("Auth sync error:", error);
          // Don't throw here, just log and let the user be null in store if it fails
          setStoreUser(null);
        } finally {
          setIsSyncing(false);
        }
      } else {
        setStoreUser(null);
        setCompletedLessons([]);
        if (unsubProfile) unsubProfile();
        if (unsubProgress) unsubProgress();
        setIsSyncing(false);
      }
      
      setLoading(false);
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
      </div>
    );
  }

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};
