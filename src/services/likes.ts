import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  increment,
  updateDoc,
  type DocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';

import { db } from './firebase';

export function listenLikes(slug: string, callback: (doc: DocumentSnapshot<DocumentData>) => void) {
  const docRef = doc(db, 'likes', slug.replace('/', ''));
  const stream = onSnapshot(docRef, callback);

  return stream;
};

export async function like(slug: string, userId: string) {
  const likesRef = doc(db, 'likes', slug.replace('/', ''));
  const currentLikes = await getDoc(likesRef);

  if (currentLikes.exists()) {
    const currentUsers = currentLikes.data().userIds;
    const alreadyLiked = currentUsers.includes(userId);

    if (alreadyLiked) {
      const decrementedLike = await updateDoc(likesRef, {
        count: increment(-1),
        userIds: currentUsers.filter((user: string) => user !== userId),
      });

      return decrementedLike;
    }

    const incrementedLike = await updateDoc(likesRef, {
      count: increment(1),
      userIds: [...currentUsers, userId],
    });

    return incrementedLike;
  }

  const createdLike = await setDoc(doc(db, 'likes', slug.replace('/', '')), {
    count: 1,
    userIds: [userId],
  });

  return createdLike;
};
