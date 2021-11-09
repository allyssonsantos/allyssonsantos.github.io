import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    * {
      box-sizing: border-box;
      transition: all 200ms;
    }

    html,
    body {
      font-family: 'Roboto', serif;

      margin: 0;
      padding: 0;

      background-color: ${theme.colors.neutral[50]};
    }

    body {
      padding: ${theme.spacings.xxlarge}px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.colors.neutral[900]};
    }

    h2 {
      margin-top: ${theme.spacings.xxxlarge}px;
      margin-bottom: ${theme.spacings.medium}px;
    }

    p {
      line-height: 1.75;

      color: ${theme.colors.neutral[900]};

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
      color: ${theme.colors.neutral[900]};

      word-break: normal;
    }

    table td,
    table th {
      line-height: 28px;

      padding: ${theme.spacings.small}px;

      border: ${theme.borders.tiny}px solid ${theme.colors.neutral[200]};
    }

    a {
      text-decoration: none;

      color: ${props => props.theme.colors.primary[200]};
    }

    time {
      color: ${theme.colors.neutral[900]};
    }

    svg {
      fill: ${theme.colors.neutral[900]};
    }
  `
);

export default GlobalStyle;
