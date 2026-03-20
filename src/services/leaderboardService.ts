import { collection, query, orderBy, limit, getDocs, getCountFromServer, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../store/useStore';

export const getLeaderboard = async (limitCount: number = 10) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, orderBy('xp', 'desc'), limit(limitCount));

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'users');
    return [];
  }
};

export const getUserRank = async (xp: number) => {
  if (xp === 0) return null;
  
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('xp', '>', xp));

  try {
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count + 1;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'users');
    return null;
  }
};
