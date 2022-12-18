import type { NextPage } from 'next';
import Image from 'next/image';
import { compareDesc, format, parseISO } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';

import { PostPreview } from 'src/components/Posts/PostPreview';
import styles from '../../styles/home.module.css';

const POSTS_TO_SHOW_ON_HOME_PAGE = 3;

export async function getStaticProps() {
  const posts = allBlogs.slice(0, POSTS_TO_SHOW_ON_HOME_PAGE).sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  return { props: { posts } };
}

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => {
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
            Next.js, and micro frontends in exceptional companies.
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
};

export default Home;
