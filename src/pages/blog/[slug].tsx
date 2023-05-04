import { GetStaticProps } from 'next';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { allBlogs, type Blog as BlogType } from 'contentlayer/generated';

import { SITE_BASE_URL } from 'src/constants';
import { BlogFeature } from 'src/features/blog';

export default function Blog({ blog }: { blog: BlogType }) {
  const POST_URL = `${SITE_BASE_URL}/blog/${blog.slug}`;
  const IMAGE_URL = `${SITE_BASE_URL}/public/articles/${blog.cover}`;

  return (
    <>
      <NextSeo
        title={blog.title}
        description={blog.description}
        canonical={POST_URL}
        openGraph={{
          url: POST_URL,
          title: blog.title,
          description: blog.description,
          type: 'article',
          images: [
            {
              url: IMAGE_URL,
              width: 800,
              height: 600,
              alt: blog.title,
              type: 'image/jpeg',
            },
          ],
          article: {
            publishedTime: blog.publishedAt,
            authors: ['https://twitter.com/_allyssonsantos'],
            tags: blog.tags,
          },
        }}
      />
      <ArticleJsonLd
        type="Blog"
        url={POST_URL}
        title={blog.title}
        images={[`${SITE_BASE_URL}/${blog.cover}`]}
        datePublished={blog.publishedAt}
        authorName="Allysson Santos"
        description={blog.description}
      />
      <BlogFeature post={blog} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((blog) => ({ params: { slug: blog.slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = allBlogs.find((blog) => blog.slug === params?.slug);
  return { props: { blog } };
};
