import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: 'Roboto', serif;

    margin: 0;
    padding: 0;
  }

  body {
    padding: 32px;
  }

  img {
    width: 100%;
    max-width: 100%;
  }

  a {
    text-decoration: none;

    color: ${props => props.theme.colors.primary[500]};
  }
`;

export default GlobalStyle;
