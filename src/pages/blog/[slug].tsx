import { GetStaticProps } from 'next';
import Image from 'next/image';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allBlogs, type Blog as BlogType } from 'contentlayer/generated';

import { SITE_BASE_URL } from 'src/constants';
import { BlogFeature } from 'src/features/blog';

const H1 = (props: any) => <h1 style={{ backgroundColor: 'red' }} {...props} />;

const components = {
  h1: H1,
};

type BlogProps = {
  blog: BlogType;
};

export default function Blog({ blog }: BlogProps) {
  const Component = useMDXComponent(blog.body.code);
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
      <h1>{blog.title}</h1>
      <small>{blog.readingTime.minutes} min</small>
      <Image
        src={`/articles/${blog.cover}`}
        alt={blog.altCover}
        width={800}
        height={600}
      />
      <Component components={components} />
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
