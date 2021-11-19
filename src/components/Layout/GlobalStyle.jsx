import { createGlobalStyle, css } from 'styled-components';
import rem from '@utils/rem';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    * {
      box-sizing: border-box;
      transition: all 200ms;
    }

    html,
    body {
      font-family: 'Poppins', serif;

      margin: 0;
      padding: 0;

      background-color: ${theme.colors.neutral[50]};

      @media (max-width: 768px) {
        font-size: 90%;
      }
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

    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: ${theme.spacings.huge}px;
      margin-bottom: ${theme.spacings.medium}px;
    }

    h2 {
      font-size: ${rem(32)};
    }

    h3 {
      font-size: ${rem(24)};
    }

    h4 {
      font-size: ${rem(20)};
    }

    h5 {
      font-size: ${rem(18)};
    }

    h6 {
      font-size: ${rem(18)};
    }

    p {
      font-size: ${rem(18)};
      line-height: 1.75;

      color: ${theme.colors.neutral[900]};

      margin-bottom: ${theme.spacings.large}px;
    }

    img {
      width: 120%;
      max-width: calc(100% + 80px);

      margin-left: -${theme.spacings.xxlarge}px;

      border: 1px solid ${theme.colors.neutral[200]};
      border-radius: 0;

      @media (min-width: 768px) {
        border-radius: ${theme.radius[2]}px;
      }
    }

    pre {
      font-size: ${rem(14)};
      line-height: 1.75;

      padding: ${theme.spacings.xxlarge}px;
      margin-left: -${theme.spacings.xxlarge}px;
      margin-right: -${theme.spacings.xxlarge}px;
      border-radius: 0;

      overflow-x: auto;

      code {
        display: inline-block;
        width: 100%;
      }

      .highlight-line {
        background-color: ${theme.colors.primary[50]}60;
        margin-left: -${theme.spacings.xxlarge}px;
        margin-right: -${theme.spacings.xxlarge}px;
        padding-left: ${theme.spacings.xxlarge - 5}px;
        padding-right: ${theme.spacings.xxlarge}px;

        border-left: 5px solid ${theme.colors.primary[200]};
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
      color: ${props => props.theme.colors.primary[500]};
    }

    time {
      color: ${theme.colors.neutral[900]};
    }

    svg {
      fill: ${theme.colors.neutral[900]};
    }

    li {
      a {
        line-height: normal;
      }

      ::marker {
        color: ${theme.colors.neutral[900]};
      }
    }
  `
);

export default GlobalStyle;
