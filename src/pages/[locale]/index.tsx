import type { NextPage, GetStaticProps } from 'next';
import { compareDesc } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';

import nextI18nextConfig from 'next-i18next.config';
import { HomeFeature } from 'src/features/home';
import { getI18nProps, getI18nPaths } from 'src/utils/getI18n';

const POSTS_TO_SHOW_ON_HOME_PAGE = 3;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.params?.locale || nextI18nextConfig.i18n.defaultLocale;
  const posts = allBlogs
    .filter((blog) => blog.locale === locale)
    .slice(0, POSTS_TO_SHOW_ON_HOME_PAGE)
    .sort((a, b) => {
      return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
    });
  const i18nProps = await getI18nProps(context, [
    'common',
    'home',
    'sign-in-modal',
    'delete-account-modal',
    'sidebar',
  ]);
  return { props: { posts, ...i18nProps } };
};

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => (
  <HomeFeature posts={posts} />
);

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export default Home;
