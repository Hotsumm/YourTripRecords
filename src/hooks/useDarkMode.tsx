import { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import { DefaultTheme } from 'styled-components';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(lightTheme);
  const setMode = (mode: DefaultTheme) => {
    mode === lightTheme
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
    setTheme(mode);
  };
  const toggleTheme = (): void => {
    theme === lightTheme ? setMode(darkTheme) : setMode(lightTheme);
  };

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
  }, []);

  return { theme, toggleTheme };
};
