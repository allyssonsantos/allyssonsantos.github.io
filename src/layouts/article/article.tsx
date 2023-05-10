import styles from './article.module.css';

export function ArticleLayout({ children }: React.PropsWithChildren) {
  return <div className={styles.article}>{children}</div>;
}
