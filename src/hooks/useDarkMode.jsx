import { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(lightTheme);
  const setMode = (mode) => {
    mode === lightTheme
      ? window.localStorage.setItem('theme', 'light')
      : window.localStorage.setItem('theme', 'dark');
    setTheme(mode);
  };
  const toggleTheme = () => {
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

  return [theme, toggleTheme];
};
