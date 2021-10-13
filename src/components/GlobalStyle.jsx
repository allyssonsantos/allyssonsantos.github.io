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

`;

export default GlobalStyle;
