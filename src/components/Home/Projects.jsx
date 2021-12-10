import styled, { css } from 'styled-components';
import rem from '@utils/rem';

import { PostTitle, PostDescription } from '../Posts/Posts';

const Repos = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    margin-top: ${theme.spacings.xlarge}px;
  `
);

const Project = styled.a.attrs({ target: '_blank' })(
  ({ theme }) => css`
    position: relative;

    display: flex;

    flex-direction: column;
    justify-content: space-between;

    width: 100%;

    padding: ${theme.spacings.small}px;

    transition: transform 0.3s ease, border-color 0.3s ease;

    text-decoration: none;

    color: ${theme.colors.neutral[800]};

    border: 1px solid ${theme.colors.neutral[800]};
    border-radius: 4px;

    &:hover {
      transform: scale(1.02);
    }

    svg,
    img {
      position: absolute;
      top: ${theme.spacings.small}px;
      right: ${theme.spacings.small}px;
      stroke: none;

      width: 50px;
    }
  `
);

const ProjectTitle = styled(PostTitle)`
  margin-bottom: 12px;
`;

const ProjectDescription = styled(PostDescription)`
  font-size: ${rem(14)};
`;

export { Repos, Project, ProjectTitle, ProjectDescription };
