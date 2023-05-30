import type { NextPage, GetStaticProps } from 'next';
import { compareDesc } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';

import { HomeFeature } from 'src/features/home';
import { getI18nProps, getI18nPaths } from 'src/utils/getI18n';

const POSTS_TO_SHOW_ON_HOME_PAGE = 3;

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = allBlogs.slice(0, POSTS_TO_SHOW_ON_HOME_PAGE).sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  const i18nProps = await getI18nProps(context, ['common']);
  return { props: { posts, ...i18nProps } };
}

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => {
  return <HomeFeature posts={posts} />;
};

export const getStaticPaths = getI18nPaths;

export default Home;
