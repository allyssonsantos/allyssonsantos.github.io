import { useTranslation } from 'next-i18next';

import type { Blog } from 'contentlayer/generated';
import { PostPreview } from 'src/components';

import styles from './blog.module.css';

type BlogFeatureProps = {
  posts: Record<string, Blog[]>;
};

export function BlogFeature({ posts }: BlogFeatureProps) {
  const { t } = useTranslation('common');

  return (
    <section>
      <ul className={styles['blog__category-list']}>
        {Boolean(Object.entries(posts).length) ? (
          Object.entries(posts).map(([category, post]) => (
            <li key={category}>
              <div className={styles['blog__category-header']}>
                <h2 className={styles['blog__category-title']}>{category}</h2>
                <small>{t('article', { count: post.length })}</small>
              </div>
              <ul className={styles['blog__post-list']}>
                {post.map((post) => (
                  <li className={styles['blog__post-item']} key={post.slug}>
                    <PostPreview
                      slug={post.slug}
                      title={post.title}
                      description={post.description}
                      publishedAt={post.publishedAt}
                      readingTime={post.readingTime.text}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>{t('no-posts-yet')}</p>
        )}
      </ul>
    </section>
  );
}
