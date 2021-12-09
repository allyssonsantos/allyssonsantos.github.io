import styled, { css, keyframes } from 'styled-components';
import rem from '@utils/rem';
import Link from 'gatsby-plugin-transition-link';

const Posts = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    margin-top: ${theme.spacings.huge}px;
  `
);

const BorderAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const PostBody = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.neutral[50]};

    padding-bottom: ${theme.spacings.xlarge}px;

    transition: background-color 300ms ease-in-out;
  `
);

const Post = styled(Link)(
  ({ theme }) => css`
    background: linear-gradient(
      to right,
      ${theme.colors.primary[500]},
      ${theme.colors.secondary[500]},
      ${theme.colors.primary[500]}
    );
    background-size: 200% 200%;
    animation: ${BorderAnimation} 8s ease-in-out infinite;

    transition: transform 0.3s ease;
    text-decoration: none;

    & + & {
      padding-top: ${theme.borders.tiny}px;
    }

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

export { Posts, Post, PostTitle, PostDescription, PostBody };
