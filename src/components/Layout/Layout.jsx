import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider, theme } from '@frigobar/core';

import { Link } from '@components/Elements';
import { useDarkTheme } from '@utils/color-scheme';

import Wrapper from './Wrapper';
import Header from './Header';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle';

import Sun from '../../../public/icons/sun.svg';
import Moon from '../../../public/icons/moon.svg';

const ChangeThemeButton = styled.button(
  ({ isDarkTheme }) => css`
    width: 30px;
    height: 25px;

    background-color: transparent;
    border: none;
    border-radius: 50%;

    overflow: hidden;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    div {
      transform: translateY(${isDarkTheme ? -22 : 0}px);

      transition: transform 300ms cubic-bezier(0.21, 0.54, 0.29, 0.92);
    }
  `
);

const darkMode = {
  colors: {
    neutral: {
      900: '#fdfdfd',
      800: '#f2f2f2',
      700: '#ccc',
      600: '#b8b8b8',
      500: '#a8a8a8',
      400: '#999',
      300: '#8a8a8a',
      200: '#666',
      100: '#333',
      50: '#111',
    },
  },
};

const Layout = ({ children }) => {
  const { isDarkTheme, toggleDarkTheme } = useDarkTheme();
  const buttonLabel = `Trocar para tema ${isDarkTheme ? 'claro' : 'escuro'}`;

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: { ...theme.colors, ...(isDarkTheme ? darkMode.colors : {}) },
      }}
    >
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
              <Header.ListItem>
                <ChangeThemeButton
                  onClick={() => toggleDarkTheme(!isDarkTheme)}
                  title={buttonLabel}
                  isDarkTheme={isDarkTheme}
                >
                  <div aria-label={buttonLabel}>
                    <Moon />
                    <Sun />
                  </div>
                </ChangeThemeButton>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
