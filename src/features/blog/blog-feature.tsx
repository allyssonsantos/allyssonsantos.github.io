import { useTranslation } from 'next-i18next';

import type { Blog } from 'contentlayer/generated';
import { PostPreview } from 'src/components/post-preview/post-preview';

import styles from './blog.module.css';
import Image from 'next/image';

type BlogFeatureProps = {
  posts: Record<string, Blog[]>;
};

export function BlogFeature({ posts }: Readonly<BlogFeatureProps>) {
  const { t } = useTranslation('common');

  return (
    <section>
      {Object.entries(posts).length ? (
        <ul className={styles['blog__category-list']}>
          {Object.entries(posts).map(([category, post]) => (
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
                      publishedAt={post.localizedPublishedAt}
                      readingTime={post.readingTime.minutes}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles['blog__no-posts']}>
          <Image
            src="/images/blog/empty-state.svg"
            alt=""
            aria-hidden
            width={150}
            height={150}
          />
          <h1 className={styles['blog__no-posts-title']}>
            {t('no-posts-yet-title')}
          </h1>
          <p className={styles['blog__no-posts-description']}>
            {t('no-posts-yet-description')}
          </p>
        </div>
      )}
    </section>
  );
}
