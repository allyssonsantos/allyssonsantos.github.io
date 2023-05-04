import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { type Blog } from 'contentlayer/generated';

import styles from './blog.module.css';

export function BlogFeature({ post }: { post: Blog }) {
  const PostBody = useMDXComponent(post.body.code);
  const readingTime = Math.ceil(post.readingTime.minutes);

  return (
    <div>
      <div className={styles.blog__header}>
        <h1 className={styles.blog__title}>{post.title}</h1>
        <small>
          <abbr title={`estimated time to read: ${readingTime} minute`}>
            {readingTime} min
          </abbr>
        </small>
      </div>
      <div className={styles['blog__cover-wrapper']}>
        <Image
          className={styles.blog__cover}
          src={`/articles/${post.cover}`}
          alt={post.altCover}
          fill
        />
      </div>
      <PostBody />
    </div>
  );
}
