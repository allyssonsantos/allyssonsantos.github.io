import type { NextPage } from 'next';
import { compareDesc, format, parseISO } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';

import { PostPreview } from 'src/components/Posts/PostPreview';

const POSTS_TO_SHOW_ON_HOME_PAGE = 3;

export async function getStaticProps() {
  const posts = allBlogs.slice(0, POSTS_TO_SHOW_ON_HOME_PAGE).sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  return { props: { posts } };
}

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => {
  return (
    <>
      <div>
        <ul>
          {posts.map(
            ({ publishedAt, readingTime, title, description, slug }) => (
              <li key={title}>
                <PostPreview
                  slug={slug}
                  title={title}
                  description={description}
                  readingTime={readingTime.text}
                  publishedAt={format(parseISO(publishedAt), 'LLLL d, yyyy')}
                />
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
