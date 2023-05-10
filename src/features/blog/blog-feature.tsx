import { allBlogs, Blog } from 'contentlayer/generated';
import { PostPreview } from 'src/components';

import styles from './blog.module.css';

export function BlogFeature() {
  const posts = allBlogs.reduce((acc, post) => {
    acc[post.category] = [...(acc[post.category] || []), post];

    return acc;
  }, {} as Record<string, Blog[]>);

  return (
    <section>
      <ul className={styles['blog__category-list']}>
        {Object.entries(posts).map(([category, post]) => (
          <li key={category}>
            <div className={styles['blog__category-header']}>
              <h2 className={styles['blog__category-title']}>{category}</h2>
              <small>{post.length} Articles</small>
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
        ))}
      </ul>
    </section>
  );
}
