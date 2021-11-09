import styled, { css, keyframes } from 'styled-components';
import { Link } from 'gatsby';
import rem from '@utils/rem';

const Posts = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    margin-top: ${theme.spacings.huge}px;
  `
);

const BorderAnimation = props => keyframes`
  0% {
    border-image-source: linear-gradient(
      to right,
        ${props.theme.colors.primary[300]} 0%,
        ${props.theme.colors.secondary[300]} 50%
    );
  }

  50% {
    border-image-source: linear-gradient(
      to right,
      ${props.theme.colors.secondary[300]} 50%,
      ${props.theme.colors.primary[300]} 100%
    );
  }

  100% {
    border-image-source: linear-gradient(
      to right,
        ${props.theme.colors.primary[300]} 0%,
        ${props.theme.colors.secondary[300]} 50%
    );
  }

`;

const Post = styled(Link)(
  ({ theme }) => css`
    padding-bottom: ${theme.spacings.xlarge}px;

    transition: transform 0.3s ease;
    text-decoration: none;

    & + & {
      padding-top: ${theme.spacings.xlarge}px;

      border-top: ${theme.borders.medium}px solid;
      border-image-slice: 1;
      border-image-source: linear-gradient(
        to right,
        ${theme.colors.primary[500]} 0%,
        ${theme.colors.secondary[500]} 50%
      );
      animation: ${BorderAnimation} 4s infinite alternate;
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
