import type { NextPage } from 'next';

import { compareDesc, format, parseISO } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';
import { SideBar } from 'src/components/SideBar';

export async function getStaticProps() {
  const posts = allBlogs.sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  return { props: { posts } };
}

const Home: NextPage<{ posts: Blog[] }> = ({ posts }) => {
  return (
    <>
      <SideBar />
      <div>
        <ul>
          {posts.map(({ publishedAt, readingTime, title, description }) => (
            <li key={title}>
              <h2>
                {title} - <small>{readingTime.text}</small>
              </h2>
              <p>{description}</p>
              <time>{format(parseISO(publishedAt), 'LLLL d, yyyy')}</time>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
