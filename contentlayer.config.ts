import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import { format, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
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
    category: { type: 'string', required: true },
  },
  computedFields: {
    locale: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileDir,
    },
    localizedPublishedAt: {
      type: 'string',
      resolve: (doc) =>
        format(parseISO(doc.publishedAt), 'd LLLL - yyyy', {
          locale: doc._raw.sourceFileDir === 'pt' ? ptBR : enUS,
        }),
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', ''),
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
