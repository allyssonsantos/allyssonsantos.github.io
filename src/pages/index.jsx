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
  Projects,
  Repos,
  Project,
  ProjectTitle,
  ProjectDescription,
  ProjectStars,
} from '@components/Home';

const Home = ({
  data: {
    allMdx: { edges: posts },
    github: { repositories },
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
    <Projects>
      <Subtitle>Projetos</Subtitle>
      <Repos>
        {repositories.map(({ name, description, stars, url }) => (
          <Project key={name} href={url}>
            <div>
              <ProjectTitle>{name}</ProjectTitle>
              <ProjectDescription>{description}</ProjectDescription>
            </div>
            <ProjectStars>
              {stars}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M12.672.668a.75.75 0 00-1.345 0L8.27 6.865l-6.838.994a.75.75 0 00-.416 1.279l4.948 4.823-1.168 6.811a.75.75 0 001.088.791L12 18.347l6.117 3.216a.75.75 0 001.088-.79l-1.168-6.812 4.948-4.823a.75.75 0 00-.416-1.28l-6.838-.993L12.672.668z"
                />
              </svg>
            </ProjectStars>
          </Project>
        ))}
      </Repos>
    </Projects>
  </>
);

export default Home;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
      limit: 3
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
