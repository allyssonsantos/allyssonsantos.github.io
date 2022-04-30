import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@frigobar/core';

import { useDarkTheme } from '@utils/color-scheme';
import { lightTheme, darkTheme } from '@utils/themes';

import { ModalProvider } from '@contexts/ModalContext';
import { useAuth } from '@contexts/AuthContext';
import { useTracking } from '@contexts/TrackingContext';

import Wrapper from './Wrapper';
import MenuButton from './MenuButton';
import GlobalStyle from './GlobalStyle';
import Navigation from './Navigation';

function Layout({ children }) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const { identify } = useTracking();
  const { currentTheme } = useDarkTheme();
  const { currentUser } = useAuth();
  const navRef = useRef(null);

  const handleMenu = () => {
    setNavigationOpen(!navigationOpen);
  };

  const clickAway = useCallback(
    (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavigationOpen(false);
      }
    },
    [navRef.current]
  );

  useEffect(() => {
    if (currentUser) {
      identify({ name: currentUser.displayName, email: currentUser.email });
    }
  }, [currentUser]);

  useEffect(() => {
    if (navigationOpen) {
      window.addEventListener('click', clickAway);
    } else {
      window.removeEventListener('click', clickAway);
    }

    return () => {
      window.removeEventListener('click', clickAway);
    };
  }, [navigationOpen]);

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <ModalProvider>
        <div style={{ display: 'flex' }}>
          <MenuButton onClick={handleMenu} />
          <Navigation
            onMenuClick={handleMenu}
            opened={navigationOpen}
            ref={navRef}
          />
          <Wrapper menuOpened={navigationOpen}>
            <GlobalStyle />
            <main>{children}</main>
          </Wrapper>
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
