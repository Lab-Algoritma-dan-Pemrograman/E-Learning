import { collection, doc, getDocs, setDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
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
      console.error('Error fetching curriculum:', error);
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
      console.error('Curriculum subscription error:', error);
      onUpdate([]);
    });
  },

  async saveFullCurriculum(levels: Level[]): Promise<void> {
    try {
      for (const level of levels) {
        await setDoc(doc(db, COLLECTION_NAME, level.id), level);
      }
    } catch (error) {
      console.error('Error saving curriculum:', error);
      throw error;
    }
  },

  async updateLevel(level: Level): Promise<void> {
    try {
      await setDoc(doc(db, COLLECTION_NAME, level.id), level);
    } catch (error) {
      console.error('Error updating level:', error);
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
      console.error('Error clearing curriculum:', error);
      throw error;
    }
  }
};
