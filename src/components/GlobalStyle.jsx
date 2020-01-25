import { css, createGlobalStyle } from 'styled-components';

const transform = arg => css`
  -webkit-transform: ${arg};
  -moz-transform: ${arg};
  -o-transform: ${arg};
  transform: ${arg};
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Lora', serif;
  }

  h1, article > h2 {
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

  code {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    white-space: pre;
  }

  pre {
    padding: 28px;
    overflow-x: auto;
  }

  img {
    width: 100%;
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
    margin-bottom: 80px;
  }

  figure {
    margin: 0;
  }

  blockquote {
    border-left: 4px solid #000;
    margin-left: 0;
    padding-left: 20px;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 20px;
    word-break: normal;
  }

  table td, table th {
    border: 1px solid #ccc;
    padding: 10px;
    line-height: 28px;
  }

  * {
    box-sizing: border-box;
  }

  .transform {
    display: inline-block;
    margin-right: 20px;
    background-color: yellow;
    border: 1px solid #ccc;
    text-align: center;
    padding: 20px;
    transition: transform 1s;
    vertical-align: top;
    cursor: pointer;
  }

  .transform.translate:hover,
  .transform.translate:focus,
  .transform.translate:active {
    ${transform('translate(50px, 50px)')}
  }

  .transform.rotate:hover,
  .transform.rotate:focus,
  .transform.rotate:active {
    ${transform('rotate(25deg)')}
  }

  .transform.rotateY:hover,
  .transform.rotateY:focus,
  .transform.rotateY:active {
    ${transform('rotateY(180deg)')}
  }

  .transform.rotateY-negativo:hover,
  .transform.rotateY-negativo:focus,
  .transform.rotateY-negativo:active {
    ${transform('rotateY(-160deg)')}
  }

  .transform.rotate-anti-horario:hover,
  .transform.rotate-anti-horario:focus,
  .transform.rotate-anti-horario:active {
    ${transform('rotate(-25deg)')}
  }

  .transform.scale:hover,
  .transform.scale:focus,
  .transform.scale:active {
    ${transform('scale(2)')}
  }

  .transform.scale-torto:hover,
  .transform.scale-torto:focus,
  .transform.scale-torto:active {
    ${transform('scale(2, 4)')}
  }

  .transform.scale-negativo:hover,
  .transform.scale-negativo:focus,
  .transform.scale-negativo:active {
    ${transform('scale(-2)')}
  }

  .transform.skew:hover,
  .transform.skew:active,
  .transform.skew:focus {
    ${transform('skew(10deg, 5deg)')}
  }

  .transform.skew-um-parametro:hover,
  .transform.skew-um-parametro:focus,
  .transform.skew-um-parametro:active {
    ${transform('skew(20deg)')}
  }

  .transform.skewX:hover,
  .transform.skewX:focus,
  .transform.skewX:active {
    ${transform('skewX(15deg)')}
  }

  .transform.skewY:hover,
  .transform.skewY:focus,
  .transform.skewY:active {
    ${transform('skewY(15deg)')}
  }

  .transform.matrix:hover,
  .transform.matrix:focus,
  .transform.matrix:active {
    ${transform('matrix(2, 1, 1, 2, 200, 200)')}
  }
`;

export default GlobalStyle;
