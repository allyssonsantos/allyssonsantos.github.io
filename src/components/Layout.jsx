import React from 'react';
import { ThemeProvider } from '@frigobar/core';
import Wrapper from '@components/Wrapper';
import Header from '@components/Header';
import Footer from '@components/Footer';
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
        <Footer>
          © allysson.me
          <Footer.Socials href="https://twitter.com/_allyssonsantos">
            twitter
          </Footer.Socials>
          <Footer.Socials href="https://github.com/allyssonsantos/">
            github
          </Footer.Socials>
          <Footer.Socials href="https://www.linkedin.com/in/allyssonsantos/">
            linkedin
          </Footer.Socials>
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
