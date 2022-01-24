import { createContext } from 'react';
import { theme } from './styles/theme';

const { lightTheme } = theme;

export const UserContext = createContext<IUserContext | null>(null);

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: (): void => {},
});
