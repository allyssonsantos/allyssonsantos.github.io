import { allBlogs } from 'contentlayer/generated';

import Slug, { getStaticProps } from '../[locale]/blog/[slug]';

export async function getStaticPaths() {
  return {
    paths: allBlogs
      .filter((blog) => blog.locale === 'pt')
      .map(({ slug }) => ({
        params: { slug: slug },
      })),
    fallback: false,
  };
}

export { getStaticProps };
export default Slug;
