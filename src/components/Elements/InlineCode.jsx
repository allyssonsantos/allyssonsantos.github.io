import styled from 'styled-components';

const InlineCode = styled.code(
  ({ theme }) => `
    padding: 5px;
    border: 1px solid ${theme.colors.neutral[200]};
    border-radius: 4px;
    white-space: pre;
    color: mediumvioletred;
  `
);

export default InlineCode;
