import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Share, ThumbsUp, X } from 'react-feather';
import { cva } from 'class-variance-authority';
import { useTranslation } from 'next-i18next';

import { Button } from 'src/components/button/button';
import { DeleteCommentModal } from 'src/components/delete-comment-modal/delete-comment-modal';
import { useModals } from 'src/components/modal/modal-context';
import {
  DELETE_COMMENT_MODAL_KEY,
  SIGN_IN_MODAL_KEY,
} from 'src/constants/modals';
import { SITE_BASE_URL } from 'src/constants';
import { listenLikes, like } from 'src/services/likes';
import { db } from 'src/services/firebase';
import { useAuth } from 'src/contexts/auth';

import styles from './feedback.module.css';
import { AddComment } from '../AddComment/add-comment';

const likeButton = cva(styles['like-button'], {
  variants: {
    liked: {
      true: styles['like-button--liked'],
    },
  },
});

type FeedbackProps = {
  slug: string;
  title: string;
  description: string;
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

type ShareData = {
  title: string;
  description: string;
  slug: string;
};

function shareFn({ title, description, slug }: ShareData) {
  if (navigator.share) {
    navigator.share({
      title,
      text: description,
      url: `${SITE_BASE_URL}/blog/${slug}`,
    });
  }
}

export function Feedback({ slug, title, description }: FeedbackProps) {
  const { t, i18n } = useTranslation('article');
  const locale = i18n.resolvedLanguage;

  const [likes, setLikes] = useState<DocumentData | undefined>(undefined);
  const [comments, setComments] = useState<Comments[]>([]);

  const { openModal } = useModals();
  const { currentUser } = useAuth();
  const isPostLiked = likes?.userIds.includes(currentUser?.uid);

  const supportNavigatorShare =
    typeof navigator !== 'undefined' && navigator.share;

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
          variant="ghost"
        >
          <ThumbsUp aria-hidden size={14} />{' '}
          {t('like', { count: likes?.count || 0 })}
        </Button>
        {supportNavigatorShare && (
          <Button
            className={styles.feedback__share}
            variant="inverted"
            onClick={() =>
              shareFn({
                title,
                description,
                slug,
              })
            }
          >
            Compartilhar
            <Share size={14} />
          </Button>
        )}
      </section>
      <section>
        <div className={styles['feedback__comment-title-wrapper']}>
          <h2 className={styles['feedback__comment-title']}>
            {t('comments-title')} {comments.length && comments.length}
          </h2>
          {!currentUser && (
            <Button
              variant="inverted"
              onClick={() => openModal(SIGN_IN_MODAL_KEY)}
            >
              Faça o login para deixar um comentário
            </Button>
          )}
        </div>
        {currentUser && <AddComment slug={slug} />}
        {comments.length ? (
          comments.map(({ id, userName, date, message, uid }) => (
            <div key={id} className={styles.feedback__comment}>
              <div>
                <strong className={styles['feedback__comment-author']}>
                  {userName}
                </strong>
                <time className={styles['feedback__comment-date']}>
                  {date.toDate().toLocaleDateString(locale, {
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
                    title={t('delete-comment-aria-label') as string}
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
          <p>{t('no-comments')}</p>
        )}
      </section>
    </>
  );
}
