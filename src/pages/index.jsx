import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import useTransition from '@utils/useTransition';
import { SEO } from '@components/Layout';
import { Link } from '@components/Elements';
import { About, Title, Description, Me } from '@components/Home';

import { Posts } from '@components/Posts';

function Home({
  transitionStatus,
  data: {
    allMdx: { edges: posts },
  },
}) {
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
                olist
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
        <Me>
          <source srcSet="/me.webp" type="image/webp" />
          <source srcSet="/me.jpg" type="image/jpeg" />
        </Me>
      </About>
      <Posts posts={posts} />
      <Link
        to="/blog"
        entry={{ length: 0.11, delay: 0.11 }}
        exit={{ length: 0.11 }}
      >
        todos os posts
      </Link>
    </div>
  );
}

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
  transitionStatus: PropTypes.oneOf([
    'entering',
    'entered',
    'exiting',
    'exited',
  ]),
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

Home.defaultProps = {
  transitionStatus: undefined,
};
