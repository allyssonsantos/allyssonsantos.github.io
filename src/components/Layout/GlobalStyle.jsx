import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => `
  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Roboto', serif;

    margin: 0;
    padding: 0;
  }

  body {
    padding: ${theme.spacings.xxlarge}px;

    background-color: #f9fafb;
  }

  h2 {
    margin-top: ${theme.spacings.xxxlarge}px;
    margin-bottom: ${theme.spacings.medium}px;
  }

  p {
    line-height: 1.75;

    margin-bottom: ${theme.spacings.large}px;
  }

  img {
    width: 100%;
    max-width: 100%;

    border: 1px solid ${theme.colors.neutral[200]};
    border-radius: ${theme.radius[2]}px;
  }

  pre {
    padding: ${theme.spacings.small}px;

    border: 1px solid ${theme.colors.neutral[200]};
    border-radius: ${theme.radius[2]}px;

  }

  blockquote {
    margin: 0;
    padding-left: ${theme.spacings.xlarge}px;

    border-left: ${theme.borders.medium}px solid ${theme.colors.neutral[200]};
  }

  table {
    margin-bottom: ${theme.spacings.large}px;

    border-collapse: collapse;

    word-break: normal;
  }
  table td, table th {
    line-height: 28px;
    
    padding: ${theme.spacings.small}px;

    border: ${theme.borders.tiny}px solid ${theme.colors.neutral[200]};
  }

  a {
    text-decoration: none;

    color: ${props => props.theme.colors.primary[200]};
  }
`
);

export default GlobalStyle;
