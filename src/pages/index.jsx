import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { SEO } from '@components';
import { Link } from '@components/Elements';
import {
  About,
  Title,
  Subtitle,
  Description,
  Posts,
  Post,
  PostTitle,
  PostDescription,
} from '@components/Home';

const Home = ({
  data: {
    allMdx: { edges: posts },
  },
}) => (
  <>
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
    <About>
      <Title>Allysson Santos</Title>
      <Description as="h2">
        Frontend Developer no <strong>Olist</strong>
      </Description>
    </About>
    <Posts>
      <Subtitle>Posts recentes</Subtitle>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Post key={title} to={node.fields.slug}>
            <PostTitle>{title}</PostTitle>
            <PostDescription>{node.frontmatter.description}</PostDescription>
          </Post>
        );
      })}
      <Link to="/blog">todos os posts</Link>
    </Posts>
  </>
);

export default Home;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
      limit: 2
    ) {
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
    github {
      repositories {
        name
        description
        stars
        url
      }
    }
  }
`;

Home.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            fields: PropTypes.shape({
              slug: PropTypes.string,
            }),
            frontmatter: PropTypes.shape({
              date: PropTypes.string,
              title: PropTypes.string,
              description: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string),
            }),
          }),
        })
      ),
    }),
    github: PropTypes.shape({
      repositories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          stars: PropTypes.number,
          url: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
};
