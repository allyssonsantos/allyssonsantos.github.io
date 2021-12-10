import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from '@reach/router';
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

import Wrapper from './Wrapper';
import Menu from './Menu';
import GlobalStyle from './GlobalStyle';
import Navigation from './Navigation';
import Grid from './Grid';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

function Layout({ children }) {
  const { currentTheme } = useDarkTheme();
  const navRef = useRef(null);
  const [opened, setOpened] = useState(false);
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
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
