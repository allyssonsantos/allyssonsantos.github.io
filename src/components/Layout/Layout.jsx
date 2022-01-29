import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@frigobar/core';
import {
  Home,
  Book,
  Info,
  GitHub,
  Instagram,
  Twitter,
  Linkedin,
} from 'react-feather';

import { useDarkTheme } from '@utils/color-scheme';
import { lightTheme, darkTheme } from '@utils/themes';

import { AuthProvider } from '@contexts/AuthContext';

import Wrapper from './Wrapper';
import Menu from './Menu';
import GlobalStyle from './GlobalStyle';
import Navigation from './Navigation';
import Grid from './Grid';

function Layout({ children }) {
  const { currentTheme } = useDarkTheme();
  const navRef = useRef(null);
  const [opened, setOpened] = useState(false);

  const handleMenu = () => {
    setOpened(!opened);
  };

  const clickAway = useCallback((event) => {
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
    <AuthProvider>
      <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
        <Grid>
          <Menu onClick={handleMenu} />
          <Navigation
            onMenuClick={handleMenu}
            opened={opened}
            ref={navRef}
            items={[
              { title: 'Home', href: '/', icon: Home },
              { title: 'Artigos', href: '/blog', icon: Book },
              { title: 'Sobre', href: '/about', icon: Info },
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
    </AuthProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
