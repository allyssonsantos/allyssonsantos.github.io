import React from 'react';
import { Link } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './GlobalStyle';
import Header from './Header';
import theme from '../utils/theme';

const Layout = ({ children, title }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Header />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: 1000,
        }}
      >
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
        {children}
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  </ThemeProvider>
);

export default Layout;
