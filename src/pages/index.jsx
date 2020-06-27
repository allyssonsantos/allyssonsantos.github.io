import React from 'react';
import styled, { css } from 'styled-components';
import { Link, graphql } from 'gatsby';

import personalProjects from '../data/projects';
import { Layout, Title, Card, Button, Repo, Box } from '../components';
import SEO from '../components/seo';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const Repos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    flex-basis: 49%;

    ${({ theme: { sizes } }) => css`
      @media (max-width: ${sizes.breakpoints.md}px) {
        flex-basis: 100%;
      }
    `}
  }
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
  <Layout location={location} title={siteTitle} full>
    <SEO
      title="Home"
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
    <Title as="h2">Últimos artigos do blog</Title>
    {posts.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug;
      return (
        <Link key={node.fields.slug} to={node.fields.slug}>
          <Card
            tags={node.frontmatter.tags}
            title={title}
            description={node.frontmatter.description}
            date={node.frontmatter.date}
          />
        </Link>
      );
    })}
    <Wrapper>
      <Button as={Link} to="/blog">
        Ver todos artigos
      </Button>
    </Wrapper>
    <Title as="h2">Projetos open source</Title>
    <Repos>
      {personalProjects.map(repo => (
        <Repo
          key={repo.name}
          logo={repo.name.toLowerCase()}
          title={repo.name}
          description={repo.description}
          forks={repo.forks}
          stars={repo.stars}
          link={repo.homepage}
        />
      ))}
    </Repos>
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY", locale: "pt-BR")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
