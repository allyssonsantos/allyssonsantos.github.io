import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Input, SEO } from '@components';
import { Layout } from '@components/Layout';
import {
  Title,
  Posts,
  Post,
  PostTitle,
  PostDescription,
} from '@components/Home';

const Blog = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    allMdx: { edges: posts },
  },
}) => {
  const [filteredTerm, setFilteredTerm] = useState('');
  const filter = e => setFilteredTerm(e.target.value.toLowerCase());

  const filteredPosts = posts.filter(({ node }) => {
    const matchedTags = node.frontmatter.tags.filter(tag =>
      tag.toLowerCase().includes(filteredTerm)
    ).length;
    return (
      node.frontmatter.title.toLowerCase().includes(filteredTerm) ||
      matchedTags ||
      node.frontmatter.description.toLowerCase().includes(filteredTerm)
    );
  });

  return (
    <Layout title={siteTitle}>
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
      <Title>Blog</Title>
      <Input placeholder="Procurar post" onChange={filter} />
      <Posts>
        {filteredPosts.length ? (
          filteredPosts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Post key={node.fields.slug} to={node.fields.slug}>
                <PostTitle>{title}</PostTitle>
                <PostDescription>
                  {node.frontmatter.description}
                </PostDescription>
              </Post>
            );
          })
        ) : (
          <span>
            Ops, com essa busca não encontrei nenhum artigo relacionado.
          </span>
        )}
      </Posts>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
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
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
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
