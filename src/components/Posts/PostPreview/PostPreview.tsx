import Link from 'next/link';
import type { Blog } from 'contentlayer/generated';
import styles from './PostPreview.module.css';

interface IPostPreview extends Pick<Blog, 'title' | 'slug' | 'description'> {
  readingTime: string;
  publishedAt: string;
}

export function PostPreview({
  title,
  slug,
  readingTime,
  description,
  publishedAt,
}: IPostPreview) {
  return (
    <Link href={`/blog/${slug}`} className={styles.post} prefetch>
      <h2 className={styles.post__title}>
        {title} - <small>{readingTime}</small>
      </h2>
      <p className={styles.post__description}>{description}</p>
      <time>{publishedAt}</time>
    </Link>
  );
}
