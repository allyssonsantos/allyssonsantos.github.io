import styled, { css } from 'styled-components';

const sharedStyle = css`
  margin-left: 40px;
`;

const Ul = styled.ul`
  & > &,
  & > ol {
    ${sharedStyle}
  }
`;

const Ol = styled.ol`
  & > &,
  & > ul {
    ${sharedStyle}
  }
`;

const Li = styled.li`
  margin-bottom: 12px;
  line-height: 28px;
`;

export { Ul, Ol, Li };
