import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import type { Blog } from 'contentlayer/generated';

import { PostPreview } from 'src/components/post-preview/post-preview';
import styles from './home.module.css';

type HomeFeatureProps = {
  posts: Blog[];
};

export function HomeFeature({ posts }: Readonly<HomeFeatureProps>) {
  const { t } = useTranslation(['common', 'home']);

  return (
    <section>
      <div className={styles.home__container}>
        <div>
          <h1 className={styles.home__name}>Allysson Santos</h1>
          <h2 className={styles.home__role}>
            {t('home:role')}
            <a
              href="https://www.brex.com/"
              target="_blank"
              rel="noreferrer"
            >
              Brex
            </a>
          </h2>
          <p className={styles.home__description}>{t('home:description')}</p>
        </div>
        <Image
          src="/images/me.jpeg"
          alt={t('home:me-alt-text')}
          width={120}
          height={120}
          priority
          className={styles.home__image}
        />
      </div>
      <h2 className={styles.home__title}>{t('home:latest-posts')}</h2>
      <ul className={styles['home__post-list']}>
        {posts.length ? (
          posts.map(
            ({
              localizedPublishedAt,
              readingTime,
              title,
              description,
              slug,
            }) => (
              <li key={title} className={styles.home__post}>
                <PostPreview
                  slug={slug}
                  title={title}
                  description={description}
                  readingTime={readingTime.minutes}
                  publishedAt={localizedPublishedAt}
                />
              </li>
            ),
          )
        ) : (
          <li>
            <p className={styles.home__description}>
              {t('common:no-posts-yet-title')}.{' '}
              {t('common:no-posts-yet-description')}
            </p>
          </li>
        )}
      </ul>
    </section>
  );
}
