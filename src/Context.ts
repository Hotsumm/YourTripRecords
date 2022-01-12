import { createContext } from 'react';
import { theme } from './styles/theme';
import { IUserObj } from './App';

interface IUserContext {
  userObj?: IUserObj;
  refreshUser: (sign: boolean) => void;
}

const { lightTheme } = theme;

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: (): void => {},
});
