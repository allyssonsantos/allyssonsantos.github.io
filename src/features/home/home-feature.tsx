import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import type { Blog } from 'contentlayer/generated';

import { PostPreview } from 'src/components/post-preview';
import styles from './home.module.css';

type HomeFeatureProps = {
  posts: Blog[];
};

export function HomeFeature({ posts }: HomeFeatureProps) {
  return (
    <section className={styles.home}>
      <div className={styles.home__container}>
        <div>
          <h1 className={styles.home__name}>Allysson Santos</h1>
          <h2 className={styles.home__role}>
            Senior Front-end Developer at{' '}
            <a href="https://olist.com" target="_blank" rel="noreferrer">
              Olist
            </a>
          </h2>
          <p className={styles.home__description}>
            Working with front-end stuff such as design systems, React /
            Next.js, and micro frontends.
          </p>
        </div>
        <Image
          src="/images/me.jpg"
          alt="a photo of me with a white t-shirt and a guitar in hands"
          width={120}
          height={120}
          className={styles.home__image}
        />
      </div>
      <h2 className={styles.home__title}>Latest posts:</h2>
      <ul className={styles['home__post-list']}>
        {posts.map(({ publishedAt, readingTime, title, description, slug }) => (
          <li key={title} className={styles.home__post}>
            <PostPreview
              slug={slug}
              title={title}
              description={description}
              readingTime={readingTime.text}
              publishedAt={format(parseISO(publishedAt), 'LLLL d, yyyy')}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
