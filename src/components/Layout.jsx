import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { withFade } from '@frigobar/animation';

import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import { normal } from '../utils/theme';

const Bg = styled.div`
  background-color: #f6f6f6;
`;

const Wrapper = withFade(styled.main`
  max-width: 910px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`);

const Layout = ({ children, title }) => (
  <ThemeProvider theme={normal}>
    <>
      <GlobalStyle />
      <Header show title={title} />
      <Bg>
        <Wrapper show>{children}</Wrapper>
        <Footer />
      </Bg>
    </>
  </ThemeProvider>
);

export default Layout;
