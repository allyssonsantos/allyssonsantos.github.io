import styled, { css } from 'styled-components';

const Wrapper = styled.div(
  ({ menuOpened, theme: { spacings } }) => css`
    width: calc(100% - 240px);
    max-width: 50rem;

    margin: 0 auto;
    padding-top: ${spacings.huge}px;
    padding-bottom: ${spacings.huge}px;
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
