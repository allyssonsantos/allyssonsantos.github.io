import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import useTransition from '@utils/useTransition';
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
  PostBody,
  Me,
} from '@components/Home';

const Home = ({
  transitionStatus,
  data: {
    allMdx: { edges: posts },
  },
}) => {
  const animation = useTransition(transitionStatus);

  return (
    <div animation={animation}>
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
        <div>
          <Title>Olá,</Title>
          <Description>
            Sou desenvolvedor front-end, atualmente estou desenvolvendo o
            design-system do{' '}
            <strong>
              <a
                href="https://olist.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Olist
              </a>
            </strong>
          </Description>
          <Description as="h2">
            Antes do Olist estava no{' '}
            <strong>
              <a
                href="https://gympass.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Gympass
              </a>
            </strong>
            , e trabalhei majoritariamente no design system{' '}
            <strong>
              <a href="https://gympass.github.io/yoga/">Yoga</a>
            </strong>{' '}
            mas também atuei em alguns times de produto.
          </Description>
        </div>
        <Me />
      </About>
      <Posts>
        <Subtitle>Posts recentes</Subtitle>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <Post
              key={title}
              to={`/blog${node.fields.slug}`}
              entry={{ length: 0.11, delay: 0.11 }}
              exit={{ length: 0.11 }}
            >
              <PostBody>
                <PostTitle>{title}</PostTitle>
                <PostDescription>
                  {node.frontmatter.description}
                </PostDescription>
              </PostBody>
            </Post>
          );
        })}
        <Link
          to="/blog"
          entry={{ length: 0.11, delay: 0.11 }}
          exit={{ length: 0.11 }}
        >
          todos os posts
        </Link>
      </Posts>
    </div>
  );
};

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
