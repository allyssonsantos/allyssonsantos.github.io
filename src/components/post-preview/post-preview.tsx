import type { Blog } from 'contentlayer/generated';
import { useTranslation } from 'next-i18next';
import { LinkComponent as Link } from '../link/link';
import styles from './post-preview.module.css';

interface IPostPreview extends Pick<Blog, 'title' | 'slug' | 'description'> {
  readingTime: number;
  publishedAt: string;
}

export function PostPreview({
  title,
  slug,
  readingTime,
  description,
  publishedAt,
}: IPostPreview) {
  const { t } = useTranslation(['common']);
  const readingTimeText = `${Math.floor(readingTime)} ${t('common:reading-time')}`;

  return (
    <Link href={`/blog/${slug}`} className={styles.post}>
      <div>
        <h3 className={styles.post__title}>{title}</h3>
        <span className={styles.post__separator}> - </span>
        <small>{readingTimeText}</small>
      </div>
      <p className={styles.post__description}>{description}</p>
      <time>{publishedAt}</time>
    </Link>
  );
}
