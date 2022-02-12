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
import { db } from '@services/firebase';

async function deleteComment(id) {
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

async function createComment(currentUser, comment, slug) {
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

export { deleteComment, createComment };
