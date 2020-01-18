import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Lora', serif;
  }

  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 3rem 0 1.5rem;
  }

  h3 {
    margin: 1.75rem 0 1rem;
  }

  h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  p {
    line-height: 28px;
    margin-bottom: 28px;
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }

    :active {
      color: inherit;
    }
  }

  footer {
    margin-top: 80px;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
