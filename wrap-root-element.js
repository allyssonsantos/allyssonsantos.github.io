import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Code, InlineCode, Ul, Ol, Li, Link } from '@components';
import { preToCodeBlock } from 'mdx-utils';

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
  <MDXProvider components={components}>{element}</MDXProvider>
);
