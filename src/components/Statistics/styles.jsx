import styled, { css } from 'styled-components';

import rem from '@utils/rem';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 6px;
  }
`;

const LikeButton = styled.button(
  ({ theme }) => css`
    font-size: ${rem(16)};

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 8px;

    cursor: pointer;

    color: ${theme.colors.neutral[900]};
    border: none;
    border-radius: ${theme.radius[1]}px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.colors.neutral[200]};
    }

    svg {
      margin-right: 6px;
    }
  `
);

export { Wrapper, LikeButton, Label };
