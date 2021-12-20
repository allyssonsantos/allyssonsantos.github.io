import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import useTransition from '@utils/useTransition';
import { Title, Img, Description } from '@components/Elements';
import { TableOfContents, SEO } from '@components/Layout';

function Post({ data: { mdx: post }, transitionStatus }) {
  const animation = useTransition(transitionStatus);

  return (
    <div animation={animation}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Title>{post.frontmatter.title}</Title>
      <Description>{post.frontmatter.description}</Description>
      <time>Publicado em {post.frontmatter.date}</time>
      {post.frontmatter.img && <Img src={`/${post.frontmatter.img}`} />}

      <TableOfContents headings={post.headings} />

      <MDXRenderer>{post.body}</MDXRenderer>
    </div>
  );
}

export default Post;

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY", locale: "pt-BR")
        description
        img
      }
      body
      headings(depth: h2) {
        depth
        value
      }
    }
  }
`;

Post.defaultProps = {
  pageContext: undefined,
};

Post.propTypes = {
  transitionStatus: PropTypes.oneOf([
    'entering',
    'entered',
    'exiting',
    'exited',
  ]),
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        img: PropTypes.string,
        slug: PropTypes.string,
      }),
      excerpt: PropTypes.string,
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
        })
      ).isRequired,
      body: PropTypes.string,
    }),
    excerpt: PropTypes.string,
  }).isRequired,
};

Post.defaultProps = {
  transitionStatus: undefined,
};
