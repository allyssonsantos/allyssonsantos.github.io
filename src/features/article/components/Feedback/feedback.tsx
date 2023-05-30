import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, X } from 'react-feather';
import { cva } from 'class-variance-authority';

import { Button, DeleteCommentModal, useModals } from 'src/components';
import {
  DELETE_COMMENT_MODAL_KEY,
  SIGN_IN_MODAL_KEY,
} from 'src/constants/modals';
import { listenLikes, like } from 'src/services/likes';
import { db } from 'src/services/firebase';
import { useAuth } from 'src/contexts/auth';

import styles from './feedback.module.css';
import { AddComment } from '../AddComment';

const likeButton = cva(styles['like-button'], {
  variants: {
    liked: {
      true: styles['like-button--liked'],
    },
  },
});

type FeedbackProps = {
  slug: string;
};

type Comments = {
  id: string;
  date: {
    toDate: () => Date;
  };
  message: string;
  slug: string;
  timestamp: Date;
  uid: string;
  userName: string;
};

export function Feedback({ slug }: FeedbackProps) {
  const [likes, setLikes] = useState<DocumentData | undefined>(undefined);
  const [comments, setComments] = useState<Comments[]>([]);

  const { openModal } = useModals();
  const { currentUser } = useAuth();
  const isPostLiked = likes?.userIds.includes(currentUser?.uid);

  useEffect(() => {
    async function getComments() {
      const q = query(
        collection(db, 'comments'),
        where('slug', '==', slug),
        orderBy('date', 'desc'),
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comments[];

        setComments(comments);
      });

      return () => unsubscribe();
    }

    listenLikes(slug, (likeds) => {
      setLikes(likeds.data());
    });

    getComments();
  }, [slug]);

  function handleLike() {
    if (currentUser) {
      like(slug, currentUser.uid);
    } else {
      openModal(SIGN_IN_MODAL_KEY);
    }
  }

  return (
    <>
      <section className={styles.feedback__actions}>
        <Button
          className={likeButton({ liked: isPostLiked })}
          onClick={handleLike}
        >
          <ThumbsUp aria-hidden /> {likes?.count || 0} likes
        </Button>
        <div className={styles.feedback__actions__comments}>
          <MessageCircle /> {comments.length || 0} comments
        </div>
      </section>
      <section>
        <h2>Comments</h2>
        {comments.length ? (
          comments.map(({ id, userName, date, message, uid }) => (
            <div key={id} className={styles.feedback__comment}>
              <div>
                <strong className={styles['feedback__comment-author']}>
                  {userName}
                </strong>
                <time className={styles['feedback__comment-date']}>
                  {date.toDate().toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className={styles['feedback__comment-message']}>{message}</p>
              </div>
              {uid === currentUser?.uid && (
                <>
                  <Button
                    className={styles['feedback__delete-comment']}
                    variant="icon"
                    size="small"
                    title="Delete comment"
                    onClick={() =>
                      openModal(`${DELETE_COMMENT_MODAL_KEY}-${id}`)
                    }
                  >
                    <X aria-hidden />
                  </Button>
                  <DeleteCommentModal commentId={id} message={message} />
                </>
              )}
            </div>
          ))
        ) : (
          <p>No comments in this post.</p>
        )}
        {currentUser && <AddComment slug={slug} />}
      </section>
    </>
  );
}
