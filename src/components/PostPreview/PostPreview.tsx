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
    <a href={slug} className={styles.post}>
      <h2 className={styles.post__title}>
        {title} - <small>{readingTime}</small>
      </h2>
      <p className={styles.post__description}>{description}</p>
      <time>{publishedAt}</time>
    </a>
  );
}
