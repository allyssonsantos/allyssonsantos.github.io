import type { ReactElement } from 'react';
import { Source_Sans_3 } from '@next/font/google';

import { BlogFeature } from 'src/features/blog';

import type { NextPageWithLayout } from '../_app';
import { BaseLayout } from 'src/layouts';

const sourceSans = Source_Sans_3({ subsets: ['latin'] });

const Blog: NextPageWithLayout = () => {
  return <BlogFeature />;
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout className={sourceSans.className}>{page}</BaseLayout>;
};

export default Blog;
