import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const COLOR_SCHEME_KEY = 'dark-theme';

function setCurrentTheme(colorScheme) {
  window.localStorage.setItem(COLOR_SCHEME_KEY, colorScheme);
}

export function getCurrentTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const preferredColorScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );
  const prefersDark = preferredColorScheme.matches;
  const storedPreference = window.localStorage.getItem(COLOR_SCHEME_KEY);

  if (typeof storedPreference === 'string') {
    return storedPreference;
  }

  return prefersDark ? 'dark' : 'light';
}

const DarkContext = createContext({
  currentTheme: undefined,
  toggleDarkTheme: () => {},
});

function DarkProvider({ children }) {
  const [currentTheme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const toggleDarkTheme = (newValue) => {
    setTheme(newValue);
    setCurrentTheme(newValue);
  };

  const value = useMemo(
    () => ({ currentTheme, toggleDarkTheme }),
    [currentTheme]
  );

  return <DarkContext.Provider value={value}>{children}</DarkContext.Provider>;
}

DarkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useDarkTheme() {
  const context = useContext(DarkContext);

  if (!context) {
    throw new Error('useDarkTheme must be used within a DarkProvider');
  }

  return context;
}

export { DarkProvider, useDarkTheme };
