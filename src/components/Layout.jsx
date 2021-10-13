import React from 'react';
import { ThemeProvider, Button } from '@frigobar/core';
import Wrapper from '@components/Wrapper';
import Header from '@components/Header';
import useDarkTheme from '@utils/color-scheme';

import GlobalStyle from './GlobalStyle';

const Layout = ({ children }) => {
  const [isDarkTheme, toggleDarkTheme] = useDarkTheme();

  return (
    <ThemeProvider>
      <Wrapper>
        <GlobalStyle />
        <Header>
          <Header.Navigation>
            <Header.List>
              <Header.ListItem>
                <a href="/">home</a>
              </Header.ListItem>
              <Header.ListItem>
                <a href="/blog">blog</a>
              </Header.ListItem>
              <Header.ListItem>
                <a href="/about">about</a>
              </Header.ListItem>
            </Header.List>
          </Header.Navigation>
        </Header>
        <main>{children}</main>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
