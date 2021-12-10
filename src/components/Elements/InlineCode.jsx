import styled, { css } from 'styled-components';
import rem from '@utils/rem';

const InlineCode = styled.code(
  ({ theme }) => css`
    font-size: ${rem(14)};

    padding: 2px;

    white-space: pre;

    color: ${theme.colors.secondary[500]};

    border: 1px solid ${theme.colors.neutral[200]};
    border-radius: 4px;
  `
);

export default InlineCode;
