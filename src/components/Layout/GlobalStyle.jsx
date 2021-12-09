import { createGlobalStyle, css } from 'styled-components';
import rem from '@utils/rem';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    :root {
      accent-color: ${theme.colors.neutral[900]};

      transition: accent-color 300ms ease-in-out;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      font-family: 'Source Sans 3', serif;

      margin: 0;
      padding: 0;

      background-color: ${theme.colors.neutral[50]};

      @media (max-width: 768px) {
        font-size: 90%;
      }

      transition: background-color 300ms ease-in-out,
        font-size 300ms ease-in-out;
    }

    body {
      padding: 0 ${theme.spacings.medium}px ${theme.spacings.medium}px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.colors.neutral[900]};

      transition: color 300ms ease-in-out;
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: ${theme.spacings.huge}px;
      margin-bottom: ${theme.spacings.medium}px;
    }

    h2 {
      font-size: ${rem(24)};
    }

    h3 {
      font-size: ${rem(20)};
    }

    h4 {
      font-size: ${rem(18)};
    }

    h5 {
      font-size: ${rem(16)};
    }

    h6 {
      font-size: ${rem(16)};
    }

    p {
      font-size: ${rem(16)};
      line-height: 1.75;

      color: ${theme.colors.neutral[900]};

      margin-bottom: ${theme.spacings.large}px;

      transition: color 300ms ease-in-out;
    }

    img {
      width: 100%;
      max-width: 100%;

      border-radius: ${theme.radius[2]}px;
    }

    pre {
      font-size: ${rem(14)};
      line-height: 1.75;

      padding: ${theme.spacings.xlarge}px;
      margin-left: -16px;
      margin-right: -16px;
      border-radius: 0;

      overflow-x: auto;

      transition: background-color 300ms ease-in-out;

      @media (max-width: 1024px) {
        padding: ${theme.spacings.xlarge}px ${theme.spacings.xxlarge}px;
        margin-right: -16px;
        margin-left: -32px;
      }

      code {
        font-size: ${rem(14)};

        display: inline-block;
        min-width: 100%;
      }

      .highlight-line {
        background-color: ${theme.colors.primary[50]}60;
        margin-left: -${theme.spacings.xlarge}px;
        margin-right: -${theme.spacings.xlarge}px;
        padding-left: ${theme.spacings.xlarge - 5}px;
        padding-right: ${theme.spacings.xlarge}px;

        border-left: 5px solid ${theme.colors.primary[200]};

        transition: background-color 300ms ease-in-out;

        @media (max-width: 1024px) {
          margin-left: -${theme.spacings.xxlarge}px;
          margin-right: -${theme.spacings.xxlarge}px;
          padding-left: ${theme.spacings.xxlarge - 5}px;
          padding-right: ${theme.spacings.xxlarge}px;
        }
      }

      @media (min-width: 768px) {
        border-radius: ${theme.radius[2]}px;
      }
    }

    blockquote {
      margin: 0;
      padding: ${theme.spacings.small}px ${theme.spacings.small}px
        ${theme.spacings.small}px ${theme.spacings.xlarge}px;
      background-color: ${theme.colors.info[50]};

      border-left: 6px solid ${theme.colors.info[200]};

      p {
        margin: 0;
      }
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
      color: ${(props) => props.theme.colors.primary[500]};
    }

    time {
      color: ${theme.colors.neutral[900]};

      transition: color 300ms ease-in-out;
    }

    svg {
      stroke: ${theme.colors.neutral[900]};

      transition: stroke 300ms ease-in-out;
    }

    li {
      transition: color 300ms ease-in-out;

      a {
        line-height: normal;
      }

      ::marker {
        color: ${theme.colors.neutral[900]};
      }
    }

    hr {
      border: none;
    }

    .tl-edges {
      overflow: visible;
    }
  `
);

export default GlobalStyle;
