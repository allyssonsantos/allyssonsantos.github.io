import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const Post = styled.article`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const Home = ({
  location,
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    allMdx: { edges: posts },
  },
}) => (
  <Layout location={location} title={siteTitle}>
    <SEO
      title="All posts"
      keywords={[
        'blog',
        'gatsby',
        'javascript',
        'react',
        'styled-components',
        'design-system',
      ]}
    />
    {posts.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug;
      return (
        <Post key={node.fields.slug}>
          <Title>
            <Link to={node.fields.slug}>{title}</Link>
          </Title>
          <time>{node.frontmatter.date}</time>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </Post>
      );
    })}
  </Layout>
);

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
