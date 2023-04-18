import type { NextPage } from 'next';
import { compareDesc } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';

import { HomeFeature } from 'src/features/home';

const POSTS_TO_SHOW_ON_HOME_PAGE = 3;

export async function getStaticProps() {
  const posts = allBlogs.slice(0, POSTS_TO_SHOW_ON_HOME_PAGE).sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  return { props: { posts } };
}

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => {
  return <HomeFeature posts={posts} />;
};

export default Home;
