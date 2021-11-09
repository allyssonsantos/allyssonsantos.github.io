import React from 'react';
import { Layout } from '@components/Layout';
import { MDXProvider } from '@mdx-js/react';
import { Ul, Ol, Li, Link, Code, InlineCode } from '@components/Elements';
import { preToCodeBlock } from 'mdx-utils';
import { DarkProvider } from '@utils/color-scheme';

const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    if (props) {
      return <Code {...props} />;
    }
    return <pre {...preProps} />;
  },
  inlineCode: InlineCode,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: Link,
};
export const wrapRootElement = ({ element }) => (
  <DarkProvider>
    <Layout>
      <MDXProvider components={components}>{element}</MDXProvider>
    </Layout>
  </DarkProvider>
);
