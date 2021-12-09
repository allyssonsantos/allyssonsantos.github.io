import styled, { css } from 'styled-components';

const Wrapper = styled.div(
  ({ menuOpened }) => css`
    max-width: 50rem;
    width: calc(100% - 240px);
    margin: 0 auto;
    padding-top: ${(props) => props.theme.spacings.huge}px;
    padding-left: 16px;

    @media (max-width: 1024px) {
      width: 100%;
    }

    ${menuOpened ? 'pointer-events: none;' : ''}
  `
);

export default Wrapper;
