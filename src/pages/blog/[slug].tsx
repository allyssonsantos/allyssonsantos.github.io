import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { allBlogs, type Blog } from 'contentlayer/generated';

import { SITE_BASE_URL } from 'src/constants';
import { ArticleFeature } from 'src/features/article';
import { ArticleLayout } from 'src/layouts/article';
import { BaseLayout } from 'src/layouts/base';

import type { NextPageWithLayout } from '../_app';

export default function Article({
  article,
}: NextPageWithLayout & { article: Blog }) {
  const POST_URL = `${SITE_BASE_URL}/blog/${article.slug}`;
  const IMAGE_URL = `${SITE_BASE_URL}/public/articles/${article.cover}`;

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.description}
        canonical={POST_URL}
        openGraph={{
          url: POST_URL,
          title: article.title,
          description: article.description,
          type: 'article',
          images: [
            {
              url: IMAGE_URL,
              width: 800,
              height: 600,
              alt: article.title,
              type: 'image/jpeg',
            },
          ],
          article: {
            publishedTime: article.publishedAt,
            authors: ['https://twitter.com/_allyssonsantos'],
            tags: article.tags,
          },
        }}
      />
      <ArticleJsonLd
        type="Article"
        url={POST_URL}
        title={article.title}
        images={[`${SITE_BASE_URL}/${article.cover}`]}
        datePublished={article.publishedAt}
        authorName="Allysson Santos"
        description={article.description}
      />
      <ArticleFeature post={article} />
    </>
  );
}

Article.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <ArticleLayout>{page}</ArticleLayout>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((blog) => ({ params: { slug: blog.slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = allBlogs.find((blog) => blog.slug === params?.slug);
  return { props: { article } };
};
