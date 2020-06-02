import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { withFade } from '@frigobar/animation';

import GlobalStyle from './GlobalStyle';
import Header from './Header';
import { light, dark } from '../utils/theme';

const Wrapper = withFade(styled.main`
  max-width: 740px;
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`);

const Layout = ({ children, title }) => (
  <ThemeProvider theme={light}>
    <>
      <GlobalStyle />
      <Header show title={title} />
      <Wrapper show>
        {children}
        <footer>
          © {new Date().getFullYear()} -{' '}
          <a href="https://github.com/allyssonsantos" rel="noopener noreferrer">
            github
          </a>{' '}
          •{' '}
          <a
            href="https://twitter.com/_allyssonsantos"
            rel="noopener noreferrer"
          >
            twitter
          </a>{' '}
          •{' '}
          <a
            href="https://www.linkedin.com/in/allyssonsantos/"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
        </footer>
      </Wrapper>
    </>
  </ThemeProvider>
);

export default Layout;
