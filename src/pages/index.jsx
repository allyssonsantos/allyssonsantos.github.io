import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import { Layout, SEO } from '@components';
import {
  Title,
  SubTitle,
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
  location,
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    allMdx: { edges: posts },
    github: { repositories },
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
    <section>
      <Title>Allysson Santos</Title>
      <Description as="h2">
        Frontend Developer no <strong>Olist</strong>
      </Description>
    </section>
    <Posts>
      <SubTitle>Posts recentes</SubTitle>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Post href={node.fields.slug}>
            <PostTitle>{title}</PostTitle>
            <PostDescription>{node.frontmatter.description}</PostDescription>
          </Post>
        );
      })}
    </Posts>
    <Projects>
      <SubTitle>Projetos</SubTitle>
      <Repos>
        {repositories.map(({ name, description, stars, url }) => (
          <Project href={url}>
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
                fill="#333"
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
