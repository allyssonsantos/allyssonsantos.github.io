import styled from 'styled-components';

const Img = styled.img(
  ({ theme }) => `
  margin: ${theme.spacings.large}px 0;

  border: 1px solid ${theme.colors.neutral[200]};

  max-width: 100%;
`
);

export default Img;
