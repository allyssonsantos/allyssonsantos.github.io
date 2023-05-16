import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heart, MessageCircle } from 'react-feather';
import { cva } from 'class-variance-authority';
import { type Blog } from 'contentlayer/generated';

import { Button } from 'src/components';
import styles from './article.module.css';
import { AddComment } from './components/add-comment';

const likeButton = cva(styles['like-button'], {
  variants: {
    liked: {
      true: styles['like-button--liked'],
    },
  },
});

export function ArticleFeature({ post }: { post: Blog }) {
  const PostBody = useMDXComponent(post.body.code);
  const readingTime = Math.ceil(post.readingTime.minutes);

  return (
    <div className={styles.article}>
      <div className={styles.article__header}>
        <h1 className={styles.article__title}>{post.title}</h1>
        <small className={styles['article__reading-time']}>
          <abbr title={`estimated time to read: ${readingTime} minute`}>
            {readingTime} min
          </abbr>
        </small>
      </div>
      <div className={styles['article__cover-wrapper']}>
        <Image
          className={styles.article__cover}
          src={`/articles/${post.cover}`}
          alt={post.altCover}
          fill
        />
      </div>
      <article>
        <PostBody />
      </article>
      <section className={styles.article__actions}>
        <Button className={likeButton({ liked: true })}>
          <Heart aria-hidden /> 2 likes
        </Button>
        <div className={styles.article__actions__comments}>
          <MessageCircle /> 0 comments
        </div>
      </section>
      <section>
        <h2>Comments</h2>
        <p>No comments in this post.</p>
        <div>
          <div>
            <strong className={styles['article__comment-author']}>
              allysson santos
            </strong>
            <time className={styles['article__comment-date']}>
              30 de janeiro de 2022
            </time>
          </div>
          <p className={styles['article__comment-message']}>Comment message</p>
        </div>
        <AddComment />
      </section>
    </div>
  );
}
