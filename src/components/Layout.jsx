import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import { normal } from '../utils/theme';

const Bg = styled.div`
  background-color: #f6f6f6;
`;

const Wrapper = styled.main`
  max-width: 910px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
`;

const Layout = ({ children, title, full }) => (
  <ThemeProvider theme={normal}>
    <>
      <Helmet>
      <script src="https://www.googleoptimize.com/optimize.js?id=OPT-T22ZV98"></script>
      </Helmet>
      <GlobalStyle />
      <Header show title={title} full={full} />
      <Bg>
        <Wrapper show>{children}</Wrapper>
        <Footer />
      </Bg>
    </>
  </ThemeProvider>
);

export default Layout;
