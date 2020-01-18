import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'gatsby';

import GlobalStyle from './GlobalStyle';
import Header from './Header';
import theme from '../utils/theme';

const Wrapper = styled.main`
  max-width: 700px;
  margin-top: 80px;
  margin-right: auto;
  margin-left: auto;
`;

const Layout = ({ children, title }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Header title={title} />
      <Wrapper>
        {children}
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Wrapper>
    </>
  </ThemeProvider>
);

export default Layout;
