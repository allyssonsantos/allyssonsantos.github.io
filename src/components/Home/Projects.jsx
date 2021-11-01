import styled, { css } from 'styled-components';
import rem from '@utils/rem';

import { PostTitle, PostDescription } from './Posts';

const Projects = styled.section(
  ({ theme }) => css`
    margin-top: ${theme.spacings.huge}px;
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

    border: ${theme.borders.tiny}px solid ${theme.colors.neutral[200]};
    border-radius: 8px;

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
  Projects,
  Repos,
  Project,
  ProjectTitle,
  ProjectDescription,
  ProjectStars,
};
