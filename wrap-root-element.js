import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Ul, Ol, Li, Link, Code, InlineCode } from '@components/Elements';
import { preToCodeBlock } from 'mdx-utils';
import { DarkProvider } from '@utils/color-scheme';
import { AuthProvider } from '@contexts/AuthContext';

const components = {
  pre: (preProps) => {
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
  h2: ({ children, ...props }) => (
    <h2 {...props} id={children.toLowerCase().replaceAll(' ', '-')}>
      {children}
    </h2>
  ),
};
export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    <DarkProvider>
      <MDXProvider components={components}>{element}</MDXProvider>
    </DarkProvider>
  </AuthProvider>
);
