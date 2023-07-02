import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'next-i18next';
import type { Blog } from 'contentlayer/generated';

import { PostPreview, CodeEditor } from 'src/components';
import styles from './home.module.css';

type HomeFeatureProps = {
  posts: Blog[];
};

export function HomeFeature({ posts }: HomeFeatureProps) {
  const { t } = useTranslation(['common', 'home']);

  return (
    <section className={styles.home}>
      <div className={styles.home__container}>
        <div>
          <h1 className={styles.home__name}>Allysson Santos</h1>
          <h2 className={styles.home__role}>
            {t('home:role')}
            <a href="https://olist.com" target="_blank" rel="noreferrer">
              Olist
            </a>
          </h2>
          <p className={styles.home__description}>{t('home:description')}</p>
        </div>
        <Image
          src="/images/me.jpg"
          alt={t('home:me-alt-text')}
          width={120}
          height={120}
          className={styles.home__image}
        />
      </div>
      <h2 className={styles.home__title}>{t('home:latest-posts')}</h2>
      <ul className={styles['home__post-list']}>
        {Boolean(posts.length) ? (
          posts.map(
            ({ publishedAt, readingTime, title, description, slug }) => (
              <li key={title} className={styles.home__post}>
                <PostPreview
                  slug={slug}
                  title={title}
                  description={description}
                  readingTime={readingTime.text}
                  publishedAt={format(parseISO(publishedAt), 'LLLL d, yyyy')}
                />
              </li>
            ),
          )
        ) : (
          <p className={styles.home__description}>
            {t('common:no-posts-yet-title')}.{' '}
            {t('common:no-posts-yet-description')}
          </p>
        )}
      </ul>
      <CodeEditor />
    </section>
  );
}
