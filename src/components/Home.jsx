import styled, { css } from 'styled-components';
import rem from '@utils/rem';

const Title = styled.h1(
  ({ theme }) => css`
    font-size: ${rem(46)};

    margin: 0;

    color: ${theme.colors.neutral[800]};
  `
);

const SubTitle = styled(Title).attrs({ as: 'h2' })`
  font-size: ${rem(18)};
  font-weight: normal;

  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: ${rem(14)};
  font-weight: normal;

  margin: 0;
  margin-top: 8px;
`;

const Posts = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    margin-top: ${theme.spacings.xxxlarge}px;
  `
);

const Post = styled.a(
  ({ theme }) => css`
    padding-bottom: ${theme.spacings.xlarge}px;

    transition: transform 0.3s ease;
    text-decoration: none;

    & + & {
      padding-top: ${theme.spacings.xlarge}px;

      border-top: ${theme.borders.small}px solid ${theme.colors.neutral[200]};
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

    color: ${theme.colors.neutral[800]};

    margin: 0;
    margin-top: 8px;
  `
);

const Projects = styled.section(
  ({ theme }) => css`
    margin-top: ${theme.spacings.xxxlarge}px;
  `
);

const Repos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Project = styled.a(
  ({ theme }) => css`
    display: flex;
    flex-basis: 200px;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;

    padding: ${theme.spacings.small}px;

    transition: transform 0.3s ease;
    text-decoration: none;
    color: ${theme.colors.neutral[800]};

    border: ${theme.borders.small}px solid ${theme.colors.neutral[200]};
    border-radius: ${theme.radius[2]}px;

    &:hover {
      transform: scale(1.02);
    }
  `
);

const ProjectTitle = styled(PostTitle)`
  margin-bottom: 12px;

  text-transform: lowercase;
`;
const ProjectDescription = styled(PostDescription)`
  font-size: ${rem(14)};
`;
const ProjectStars = styled.span`
  font-size: ${rem(12)};

  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 10px;

  margin-top: 10px;
`;

export {
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
};
