import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@services/firebase';

const listenLikes = (slug, callback) => {
  const docRef = doc(db, 'likes', slug.replace('/', ''));
  const stream = onSnapshot(docRef, callback);

  return stream;
};

const like = async (slug, userId) => {
  const likesRef = doc(db, 'likes', slug.replace('/', ''));
  const currentLikes = await getDoc(likesRef);

  if (currentLikes.exists()) {
    const currentUsers = currentLikes.data().userIds;
    const alreadyLiked = currentUsers.includes(userId);
    if (alreadyLiked) {
      const decrementedLike = await updateDoc(likesRef, {
        count: increment(-1),
        userIds: currentUsers.filter((user) => user !== userId),
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

export { listenLikes, like };
