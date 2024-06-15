import type { ReactElement } from 'react';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { allBlogs, type Blog as BlogType } from 'contentlayer/generated';

import nextI18nextConfig from 'next-i18next.config';
import { BlogFeature } from 'src/features/blog/blog-feature';
import { getI18nPaths, getI18nProps } from 'src/utils/getI18n';
import { SITE_BASE_URL } from 'src/constants';
import { BaseLayout } from 'src/layouts/base/base';

import type { NextPageWithLayout } from '../../_app';

type BlogProps = {
  posts: Record<string, BlogType[]>;
};

const Blog = ({ posts }: NextPageWithLayout & BlogProps) => {
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
      <BlogFeature posts={posts} />
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.params?.locale || nextI18nextConfig.i18n.defaultLocale;
  const posts = allBlogs
    .filter((post) => post.locale === locale)
    .reduce(
      (acc, post) => {
        acc[post.category] = [...(acc[post.category] || []), post];

        return acc;
      },
      {} as Record<string, BlogType[]>,
    );

  const i18nProps = await getI18nProps(context, [
    'common',
    'delete-account-modal',
    'sign-in-modal',
    'sidebar',
  ]);
  return { props: { posts, ...i18nProps } };
};

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export default Blog;
