import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

import { Layout, Paragraph } from '../components';
import SEO from '../components/seo';

const Post = styled.article`
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 8px;
  font-weight: 900;
`;

const Description = styled(Paragraph)`
  margin: 20px 0 0;
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
      title="Todos os posts"
      keywords={[
        'blog',
        'gatsby',
        'javascript',
        'react',
        'styled-components',
        'design-system',
        'components',
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
          <Description>{node.frontmatter.description}</Description>
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
            date(formatString: "DD MMMM, YYYY", locale: "pt-BR")
            title
            description
          }
        }
      }
    }
  }
`;
