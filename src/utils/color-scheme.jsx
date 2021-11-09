import React, { useEffect, useState, useContext, createContext } from 'react';

const COLOR_SCHEME_KEY = 'dark-theme';

function setCurrentTheme(colorScheme) {
  window.localStorage.setItem(COLOR_SCHEME_KEY, colorScheme);
}

function getCurrentTheme() {
  const currentTheme = window.localStorage.getItem(COLOR_SCHEME_KEY);
  if (!currentTheme) {
    setCurrentTheme(false);
  }

  return JSON.parse(window.localStorage.getItem(COLOR_SCHEME_KEY));
}

const DarkContext = createContext({
  isDarkTheme: false,
  toggleDarkTheme: () => {},
});

const DarkProvider = ({ children }) => {
  const [currentTheme, setTheme] = useState(() => getCurrentTheme());

  const toggleDarkTheme = () => {
    setTheme(Boolean(!currentTheme));
    setCurrentTheme(Boolean(!currentTheme));
  };

  useEffect(() => {
    const preferredDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    if (preferredDarkScheme.matches) {
      setTheme(true);
    }
  }, []);

  const isDarkTheme =
    typeof currentTheme === 'string' ? currentTheme === 'true' : currentTheme;

  return (
    <DarkContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </DarkContext.Provider>
  );
};

function useDarkTheme() {
  const context = useContext(DarkContext);

  if (!context) {
    throw new Error('useDarkTheme must be used within a DarkProvider');
  }

  return context;
}

export { DarkProvider, useDarkTheme };
