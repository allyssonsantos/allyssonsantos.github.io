import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  documentId,
  serverTimestamp,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';

import { db } from './firebase';

export async function deleteComment(id: string) {
  const q = query(collection(db, 'comments'), where(documentId(), '==', id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    try {
      await deleteDoc(doc.ref);
      return true;
    } catch (err) {
      return Promise.reject(err);
    }
  });
}

export async function createComment(currentUser: User, comment: string, slug: string) {
  try {
    const createdComment = await addDoc(collection(db, 'comments'), {
      uid: currentUser.uid,
      message: comment,
      userName: currentUser.displayName,
      date: new Date(),
      timestamp: serverTimestamp(),
      slug,
    });

    return createdComment;
  } catch (err) {
    return Promise.reject(err);
  }
}
