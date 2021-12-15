import styled, { css } from 'styled-components';

const Wrapper = styled.div(
  ({ menuOpened }) => css`
    width: calc(100% - 240px);
    max-width: 50rem;

    margin: 0 auto;
    padding-top: ${(props) => props.theme.spacings.huge}px;
    padding-left: 16px;

    @media (max-width: 1024px) {
      width: 100%;

      ${menuOpened
        ? css`
            pointer-events: none;
          `
        : ''}
    }
  `
);

export default Wrapper;
