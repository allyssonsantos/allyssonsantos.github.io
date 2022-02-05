import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@frigobar/core';
import { DarkProvider } from '@utils/color-scheme';
import { AuthProvider } from '@contexts/AuthContext';

const customRender = (ui, { currentUser, loadingUser, ...options } = {}) => {
  function Providers({ children }) {
    return (
      <DarkProvider>
        <AuthProvider currentUser={currentUser} loadingUser={loadingUser}>
          <ThemeProvider>{children}</ThemeProvider>
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
