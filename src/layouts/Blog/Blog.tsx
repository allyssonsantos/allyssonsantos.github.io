import { type Blog } from 'contentlayer/generated';

interface IBlogLayoutProps {
  blog: Blog;
}

function BlogLayout({ blog }) {
  return <div {...props} />;
}

export { BlogLayout };
