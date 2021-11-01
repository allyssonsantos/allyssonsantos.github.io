import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { SEO, Description } from '@components';
import { Link, Title, Img } from '@components/Elements';
import { Layout } from '@components/Layout';

const disqusConfig = (slug, title) => ({
  shortname: 'allyssonme',
  config: { identifier: slug, title },
});

const Post = ({ data: { mdx: post }, pageContext: { previous, next } }) => (
  <Layout>
    <SEO title={post.frontmatter.title} description={post.excerpt} />
    <Title>{post.frontmatter.title}</Title>
    <Description>{post.frontmatter.description}</Description>
    <time>Publicado em {post.frontmatter.date}</time>
    <Img src={`/${post.frontmatter.img}`} />
    <MDXRenderer>{post.body}</MDXRenderer>
    <hr />

    <DiscussionEmbed
      {...disqusConfig(post.frontmatter.slug, post.frontmatter.title)}
    />
    <ul
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        listStyle: `none`,
        padding: 0,
      }}
    >
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  </Layout>
);

export default Post;

export const pageQuery = graphql`
  query($slug: String!) {
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
    }
  }
`;

Post.defaultProps = {
  pageContext: undefined,
};

Post.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape({
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
};
