import type { ReactElement } from 'react';
import { NextSeo } from 'next-seo';

import { BlogFeature } from 'src/features/blog';
import { SITE_BASE_URL } from 'src/constants';

import type { NextPageWithLayout } from '../_app';
import { BaseLayout } from 'src/layouts';

const Blog: NextPageWithLayout = () => {
  const URL = `${SITE_BASE_URL}/blog`;
  const description =
    'Tutorials and ideas for front-end developers. I write about JavaScript, TypeScript, CSS, HTML, and more.';
  return (
    <>
      <NextSeo
        title="Blog"
        description="Tutorials and ideas for front-end developers. I write about JavaScript, TypeScript, CSS, HTML, and more."
        canonical={URL}
        openGraph={{
          url: URL,
          title: 'Blog | allysson.me',
          description: description,
        }}
      />
      <BlogFeature />
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Blog;
