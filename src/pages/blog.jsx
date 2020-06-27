import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import { Layout, Title, Card, Box, Input } from '../components';
import SEO from '../components/seo';

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
      <Title as="h2" textAlign="left" size="2.25rem">
        Blog
      </Title>
      <Box as="p" lh="25px" size="1rem" mb={24}>
        Aqui você vai explicar quais são os assuntos que você gosta de estudar e
        escrever. É importante para setar as expectativas do usuário.
      </Box>
      <Input
        placeholder="buscar artigo, categoria ou palavra chave"
        onChange={filter}
      />
      <Title as="h2" textAlign="left" size="1.75rem" mt={50} mb={12}>
        Artigos {Boolean(filteredPosts.length) && <>({filteredPosts.length})</>}
      </Title>
      {Boolean(filteredPosts.length) ? (
        filteredPosts.map(({ node }) => {
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
        })
      ) : (
        <Box size="1.25rem" color="#797979">
          Ops, com essa busca não encontrei nenhum artigo relacionado.
        </Box>
      )}
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
