import styled, { css } from 'styled-components';

const sharedStyle = css`
  margin-left: 40px;
  padding: 0;
`;

const Ul = styled.ul`
  padding: 0;
  ${sharedStyle}
  & &,
  & ol {
    ${sharedStyle}
  }
`;

const Ol = styled.ol`
  padding: 0;
  ${sharedStyle}
  & &,
  & ul {
    ${sharedStyle}
  }
`;

const Li = styled.li`
  margin-bottom: 12px;
  line-height: 28px;

  > ul {
    margin-top: 10px;
  }
`;

export { Ul, Ol, Li };
