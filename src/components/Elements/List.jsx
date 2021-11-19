import styled, { css } from 'styled-components';
import rem from '@utils/rem';

const sharedStyle = css`
  margin-left: 20px;
  padding: 0;

  line-height: 2.2;
  font-size: ${rem(18)};
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
  line-height: 28px;

  margin-bottom: 12px;
  padding-left: 8px;
  color: ${props => props.theme.colors.neutral[900]};

  > ul {
    margin-top: 10px;
  }
`;

export { Ul, Ol, Li };
