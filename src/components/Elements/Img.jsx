import styled, { css } from 'styled-components';

const Img = styled.img(
  ({ theme }) => css`
    width: 100%;
    margin: ${theme.spacings.large}px 0;

    border-radius: ${theme.radius[2]}px;
  `
);

export default Img;
