import { collection, doc, getDocs, setDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { curriculum as staticCurriculum, Level } from '../data/curriculum';

const COLLECTION_NAME = 'curriculum';

export const curriculumService = {
  async getCurriculum(): Promise<Level[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('id'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(doc => doc.data() as Level);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  },

  subscribeToCurriculum(onUpdate: (levels: Level[]) => void): () => void {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id'));
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        onUpdate([]);
      } else {
        onUpdate(snapshot.docs.map(doc => doc.data() as Level));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      onUpdate([]);
    });
  },

  async saveFullCurriculum(levels: Level[]): Promise<void> {
    try {
      for (const level of levels) {
        await setDoc(doc(db, COLLECTION_NAME, level.id), level);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
      throw error;
    }
  },

  async updateLevel(level: Level): Promise<void> {
    try {
      await setDoc(doc(db, COLLECTION_NAME, level.id), level);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${level.id}`);
      throw error;
    }
  },

  async clearCurriculum(): Promise<void> {
    try {
      const { deleteDoc, doc: firestoreDoc } = await import('firebase/firestore');
      const q = query(collection(db, COLLECTION_NAME));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(d => {
        return deleteDoc(firestoreDoc(db, COLLECTION_NAME, d.id));
      });
      await Promise.all(deletePromises);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
      throw error;
    }
  }
};
