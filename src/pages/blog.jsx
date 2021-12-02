import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import useTransition from '@utils/useTransition';
import { Input, SEO, Description } from '@components';
import {
  Title,
  Posts,
  Post,
  PostTitle,
  PostDescription,
  PostBody,
} from '@components/Home';

function Blog({
  transitionStatus,
  data: {
    allMdx: { edges: posts },
  },
}) {
  const [filteredTerm, setFilteredTerm] = useState('');
  const filter = (e) => setFilteredTerm(e.target.value.toLowerCase());

  const filteredPosts = posts.filter(({ node }) => {
    const matchedTags = node.frontmatter.tags.filter((tag) =>
      tag.toLowerCase().includes(filteredTerm)
    ).length;
    return (
      node.frontmatter.title.toLowerCase().includes(filteredTerm) ||
      matchedTags ||
      node.frontmatter.description.toLowerCase().includes(filteredTerm)
    );
  });

  const animation = useTransition(transitionStatus);

  return (
    <div animation={animation}>
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title>Artigos</Title>
        <Input placeholder="Procurar posts" onChange={filter} />
      </div>
      <Posts>
        {filteredPosts.length ? (
          filteredPosts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Post
                key={node.fields.slug}
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
          })
        ) : (
          <Description>
            Ops, com essa busca não encontrei nenhum artigo relacionado.
          </Description>
        )}
      </Posts>
    </div>
  );
}

export default Blog;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
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
            published
          }
        }
      }
    }
  }
`;

Blog.propTypes = {
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
          posts: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.shape({
                frontmatter: PropTypes.shape({
                  tags: PropTypes.arrayOf(PropTypes.string),
                  title: PropTypes.string,
                  description: PropTypes.string,
                  date: PropTypes.string,
                  published: PropTypes.bool,
                }),
              }),
            })
          ),
        })
      ),
    }),
  }).isRequired,
};

Blog.defaultProps = {
  transitionStatus: undefined,
};
