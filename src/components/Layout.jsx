import React from 'react';
import { ThemeProvider } from '@frigobar/core';
import Wrapper from '@components/Wrapper';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from '@components/Link';
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
                <Link to="/">home</Link>
              </Header.ListItem>
              <Header.ListItem>
                <Link to="/blog">blog</Link>
              </Header.ListItem>
            </Header.List>
          </Header.Navigation>
        </Header>
        <main>{children}</main>
        <Footer>
          © allysson.me
          <Link href="https://twitter.com/_allyssonsantos">twitter</Link>
          <Link href="https://github.com/allyssonsantos/">github</Link>
          <Link href="https://www.linkedin.com/in/allyssonsantos/">
            linkedin
          </Link>
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
