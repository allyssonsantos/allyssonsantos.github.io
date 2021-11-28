import styled, { css } from 'styled-components';
import rem from '@utils/rem';

const InlineCode = styled.code(
  ({ theme }) => css`
    font-size: ${rem(14)};

    padding: 2px;

    border: 1px solid ${theme.colors.neutral[200]};
    border-radius: 4px;

    color: ${theme.colors.secondary[500]};
    white-space: pre;
  `
);

export default InlineCode;
