import styled, { css, keyframes } from 'styled-components';
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

    border: ${theme.borders.medium}px solid ${theme.colors.success[100]};
    border-radius: 8px;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      to right,
      ${theme.colors.primary[500]} 0%,
      ${theme.colors.secondary[500]} 50%
    );
    animation: ${BorderAnimation} 4s ease-in-out infinite alternate;

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

  svg {
    fill: ${props => props.theme.colors.neutral[800]};
  }
`;

export {
  Projects,
  Repos,
  Project,
  ProjectTitle,
  ProjectDescription,
  ProjectStars,
};
