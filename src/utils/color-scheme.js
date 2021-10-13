import { useEffect, useState } from 'react';

const COLOR_SCHEME_KEY = 'dark-theme';

function setCurrentTheme(colorScheme) {
  window.localStorage.setItem(COLOR_SCHEME_KEY, colorScheme);
}

function getCurrentTheme() {
  const currentTheme = window.localStorage.getItem(COLOR_SCHEME_KEY);
  if (!currentTheme) {
    setCurrentTheme(false);
  }

  return window.localStorage.getItem(COLOR_SCHEME_KEY);
}

function useDarkTheme() {
  const [currentTheme, setCurrentTheme] = useState(() => getCurrentTheme());
  const toggleDarkTheme = () => {
    setCurrentTheme(!currentTheme);
    setCurrentTheme(!currentTheme);
  };

  useEffect(() => {
    const preferredDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    if (preferredDarkScheme.matches) {
      setCurrentTheme(true);
    }
  }, []);

  const isDarkTheme =
    typeof currentTheme === 'string' ? currentTheme === 'true' : currentTheme;

  return [isDarkTheme, toggleDarkTheme];
}

export default useDarkTheme;
