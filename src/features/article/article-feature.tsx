import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useTranslation } from 'next-i18next';
import type { Blog } from 'contentlayer/generated';

import { CodeEditor, GoToFile } from 'src/components';
import { Feedback } from './components';
import styles from './article.module.css';

export function ArticleFeature({ post }: { post: Blog }) {
  const { t } = useTranslation('article');
  const PostBody = useMDXComponent(post.body.code);
  const readingTime = Math.ceil(post.readingTime.minutes);

  return (
    <div className={styles.article}>
      <div className={styles.article__header}>
        <h1 className={styles.article__title}>{post.title}</h1>
        <small className={styles['article__reading-time']}>
          <abbr
            title={
              t('estimated-time-to-read', { count: readingTime }) as string
            }
          >
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
        <PostBody
          components={{
            CodeEditor,
            GoToFile,
          }}
        />
      </article>
      <Feedback slug={post.slug} />
    </div>
  );
}
