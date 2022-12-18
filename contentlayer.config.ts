import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    description: { type: 'string', required: true },
    cover: { type: 'string', required: true },
    altCover: { type: 'string', required: true },
    tags: { type: 'list', required: true, of: { type: 'string' } },
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    slug: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.sourceFileName.replace('.mdx', '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/blog',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
