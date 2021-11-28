import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import { ThemeProvider, theme } from '@frigobar/core';
import {
  Home,
  Book,
  GitHub,
  Instagram,
  Twitter,
  Linkedin,
} from 'react-feather';

import { useDarkTheme } from '@utils/color-scheme';

import Wrapper from './Wrapper';
import Menu from './Menu';
import GlobalStyle from './GlobalStyle';
import Navigation from './Navigation';
import Grid from './Grid';

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
    primary: {
      900: '#e0f1f2',
      800: '#b3dde0',
      700: '#80c6cb',
      600: '#4dafb6',
      500: '#269ea6',
      400: '#008d96',
      300: '#00858e',
      200: '#007a83',
      100: '#007079',
      50: '#005d68',
    },
    secondary: {
      900: '#fceeee',
      800: '#f7d4d4',
      700: '#f2b8b8',
      600: '#ec9c9c',
      500: '#e88686',
      400: '#e47171',
      300: '#e16969',
      200: '#dd5e5e',
      100: '#d95454',
      50: '#d14242',
    },
    info: {
      900: '#e5e7f0',
      800: '#bec3d9',
      700: '#929cbf',
      600: '#6674a5',
      500: '#465692',
      400: '#25387f',
      300: '#213277',
      200: '#1b2b6c',
      100: '#162462',
      50: '#0d174f',
    },
    success: {
      900: '#eaf4f0',
      800: '#cbe4d9',
      700: '#a8d2bf',
      600: '#85bfa5',
      500: '#6ab292',
      400: '#50a47f',
      300: '#499c77',
      200: '#40926c',
      100: '#378962',
      50: '#27784f',
    },
    warning: {
      900: '#f9f2e9',
      800: '#f0dfc8',
      700: '#e6caa3',
      600: '#dcb47e',
      500: '#d5a463',
      400: '#cd9447',
      300: '#c88c40',
      200: '#c18137',
      100: '#ba772f',
      50: '#ae6520',
    },
    danger: {
      900: '#fee8e7',
      800: '#fcc7c3',
      700: '#faa19b',
      600: '#f77b72',
      500: '#f65f54',
      400: '#f44336',
      300: '#f33d30',
      200: '#f13429',
      100: '#ef2c22',
      50: '#ec1e16',
    },
  },
};

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Layout = ({ children }) => {
  const navRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const { isDarkTheme } = useDarkTheme();
  const location = useLocation();
  const previousLocation = usePrevious(location);

  useEffect(() => {
    if (location !== previousLocation) {
      setOpened(false);
    }
  }, [location, previousLocation, setOpened]);

  const handleMenu = () => {
    setOpened(!opened);
  };

  const clickAway = useCallback(event => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setOpened(false);
    }
  });

  useEffect(() => {
    if (opened) {
      window.addEventListener('click', clickAway);
    } else {
      window.removeEventListener('click', clickAway);
    }

    return () => {
      window.removeEventListener('click', clickAway);
    };
  }, [opened]);

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: { ...theme.colors, ...(isDarkTheme ? darkMode.colors : {}) },
      }}
    >
      <Grid>
        <Menu onClick={handleMenu} />
        <Navigation
          onMenuClick={handleMenu}
          opened={opened}
          ref={navRef}
          items={[
            { title: 'Home', href: '/', icon: Home },
            { title: 'Artigos', href: '/blog', icon: Book },
          ]}
          socials={[
            {
              title: 'Github',
              href: 'https://github.com/allyssonsantos',
              icon: GitHub,
            },
            {
              title: 'Twitter',
              href: 'https://twitter.com/_allyssonsantos',
              icon: Twitter,
            },
            {
              title: 'Instagram',
              href: 'https://www.instagram.com/_allysson/',
              icon: Instagram,
            },
            {
              title: 'LinkedIn',
              href: 'https://www.linkedin.com/in/allyssonsantos/',
              icon: Linkedin,
            },
          ]}
        />
        <Wrapper menuOpened={opened}>
          <GlobalStyle />
          <main>{children}</main>
        </Wrapper>
      </Grid>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
