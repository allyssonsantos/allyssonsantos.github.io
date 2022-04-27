import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '@testing-library/react';
import InternalProvider from 'gatsby-plugin-transition-link/context/InternalProvider';
import { ThemeProvider } from '@frigobar/core';
import { DarkProvider } from '@utils/color-scheme';
import { AuthProvider } from '@contexts/AuthContext';
import { TrackingProvider } from '@contexts/TrackingContext';
import { ModalProvider } from '@contexts/ModalContext';

const customRender = (
  ui,
  { currentUser, loadingUser, tracking, ...options } = {}
) => {
  const defaultTracking = {
    track: () => {},
    identify: () => {},
    people: { set: () => {} },
  };

  function Providers({ children }) {
    return (
      <DarkProvider>
        <AuthProvider currentUser={currentUser} loadingUser={loadingUser}>
          <TrackingProvider tracking={tracking || defaultTracking}>
            <InternalProvider>
              <ThemeProvider>
                <ModalProvider>{children}</ModalProvider>
              </ThemeProvider>
            </InternalProvider>
          </TrackingProvider>
        </AuthProvider>
      </DarkProvider>
    );
  }

  Providers.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return render(ui, { wrapper: Providers, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, fireEvent, waitFor };
