import { useState, useEffect } from 'react';
import { DefaultTheme } from 'styled-components';

import { lightTheme, darkTheme } from '@styles/theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(lightTheme);
  const setMode = (mode: DefaultTheme) => {
    mode === lightTheme
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark');
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
