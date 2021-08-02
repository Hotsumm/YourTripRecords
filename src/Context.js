import { createContext } from 'react';
import { theme } from './theme';

const { lightTheme } = theme;

export const UserContext = createContext();

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {
    return null;
  },
});
