import styled from 'styled-components';

const InlineCode = styled.code(
  ({
    theme: {
      colors: { gray },
    },
  }) => `
    padding: 5px;
    border: 1px solid ${gray};
    border-radius: 4px;
    white-space: pre;
    color: mediumvioletred;
  `
);

export default InlineCode;
