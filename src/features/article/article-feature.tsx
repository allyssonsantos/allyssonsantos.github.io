import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import type { Blog } from 'contentlayer/generated';

import styles from './article.module.css';

import { Feedback } from './components/Feedback/feedback';
import { PostBody } from './components/PostBody';

export function ArticleFeature({ post }: Readonly<{ post: Blog }>) {
  const { t } = useTranslation('article');
  const readingTime = Math.floor(post.readingTime.minutes);

  return (
    <div className={styles.article}>
      <div className={styles.article__header}>
        <h1 className={styles.article__title}>{post.title}</h1>
        <small className={styles['article__reading-time']}>
          <abbr title={t('estimated-time-to-read', { count: readingTime })}>
            {readingTime} min
          </abbr>
        </small>
      </div>
      <div className={styles['article__cover-wrapper']}>
        <Image
          className={styles.article__cover}
          src={`/images/articles/${post.slug}/${post.cover}`}
          alt={post.altCover}
          fill
          priority
        />
      </div>
      <article>
        <PostBody code={post.body.code} />
      </article>
      <Feedback
        title={post.title}
        description={post.description}
        slug={post.slug}
      />
    </div>
  );
}
