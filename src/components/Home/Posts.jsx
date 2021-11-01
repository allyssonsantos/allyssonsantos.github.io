import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import rem from '@utils/rem';

const Posts = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    margin-top: ${theme.spacings.huge}px;
  `
);

const Post = styled(Link)(
  ({ theme }) => css`
    padding-bottom: ${theme.spacings.xlarge}px;

    transition: transform 0.3s ease;
    text-decoration: none;

    & + & {
      padding-top: ${theme.spacings.xlarge}px;

      border-top: ${theme.borders.tiny}px solid ${theme.colors.neutral[200]};
    }

    &:hover {
      transform: scale(1.02);
    }

    &:last-child {
      padding-bottom: 0;
    }
  `
);

const PostTitle = styled.h3(
  ({ theme }) => css`
    font-size: ${rem(24)};

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

export { Posts, Post, PostTitle, PostDescription };
