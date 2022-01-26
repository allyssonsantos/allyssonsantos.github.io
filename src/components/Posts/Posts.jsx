import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'gatsby-plugin-transition-link';

import rem from '@utils/rem';

import Hr from '../Elements/Hr';
import Description from '../Elements/Description';

const Wrapper = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    margin-top: ${theme.spacings.huge}px;
  `
);

const PostBody = styled.div(
  ({ theme }) => css`
    padding-bottom: ${theme.spacings.xlarge}px;

    transition: background-color 300ms ease-in-out;
  `
);

const Post = styled(Link)(
  ({ theme }) => css`
    text-decoration: none;

    & + & ${PostBody} {
      padding-top: ${theme.spacings.xlarge}px;
    }
  `
);

const PostTitle = styled.h3(
  ({ theme }) => css`
    font-size: ${rem(22)};
    line-height: 1.1;

    margin: 0;

    color: ${theme.colors.neutral[800]};
  `
);

const PostDescription = styled.p(
  ({ theme }) => css`
    font-size: ${rem(16)};
    line-height: ${rem(22)};

    margin: 0;
    margin-top: 8px;

    color: ${theme.colors.neutral[800]};
  `
);

function Posts({ posts }) {
  return (
    <Wrapper>
      {posts.length ? (
        posts.map(({ node }, index) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <React.Fragment key={title}>
              {Boolean(index) && <Hr style={{ marginTop: 0 }} />}
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
            </React.Fragment>
          );
        })
      ) : (
        <Description>
          Ops, com essa busca não encontrei nenhum artigo relacionado.
        </Description>
      )}
    </Wrapper>
  );
}

Posts.propTypes = {
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
};

Posts.defaultProps = {
  posts: [],
};

export { Posts, Post, PostTitle, PostDescription, PostBody };
