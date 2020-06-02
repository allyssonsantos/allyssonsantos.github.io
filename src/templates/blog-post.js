import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const Time = styled.time`
  margin-bottom: 28px;
`;

const disqusConfig = (slug, title) => ({
  shortname: 'allyssonme',
  config: { identifier: slug, title },
});

const Post = ({
  location,
  data: {
    mdx: post,
    site: {
      siteMetadata: { title: siteTitle },
    },
  },
  pageContext: { previous, next },
}) => (
  <Layout location={location} title={siteTitle}>
    <SEO title={post.frontmatter.title} description={post.excerpt} />
    <h1>{post.frontmatter.title}</h1>
    <Time>{post.frontmatter.date}</Time>
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
        date(formatString: "DD MMMM, YYYY", locale: "pt-BR")
      }
      body
    }
  }
`;
