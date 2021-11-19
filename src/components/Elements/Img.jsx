import styled, { css } from 'styled-components';

const Img = styled.img(
  ({ theme }) => css`
    width: 120%;
    max-width: calc(100% + 80px);
    margin: ${theme.spacings.large}px 0;
    margin-left: -${theme.spacings.xxlarge}px;

    border: 1px solid ${theme.colors.neutral[200]};
    border-radius: 0;

    @media (min-width: 768px) {
      border-radius: ${theme.radius[2]}px;
    }
  `
);

export default Img;
