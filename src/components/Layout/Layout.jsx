import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@frigobar/core';

import { Link } from '@components/Elements';

import Wrapper from './Wrapper';
import Header from './Header';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle';

const Layout = ({ children }) => (
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
        <Link href="https://www.linkedin.com/in/allyssonsantos/">linkedin</Link>
      </Footer>
    </Wrapper>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
