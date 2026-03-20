import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { useStore, UserProfile } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { syncProgress } from '../services/progressService';
import { curriculumService } from '../services/curriculumService';

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
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setStoreUser(null);
        setCompletedLessons([]);
        if (unsubProfile) unsubProfile();
        if (unsubProgress) unsubProgress();
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
      if (unsubProgress) unsubProgress();
    };
  }, [setStoreUser, setCompletedLessons]);

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};
