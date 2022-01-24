import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Context';
import { darkTheme } from '../../styles/theme';

const ThemeSwitchWrap = styled.div`
  position: relative;
  @media (max-width: 500px) {
    width: 65px;
    height: 35px;
  }
  width: 80px;
  height: 35px;
`;
const ThemeMode = styled.span`
  position: absolute;
  width: 50px;
  font-size: 10px;
  top: 40px;
  left: 15px;
`;

const ThemeSwitchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 25px;
  background: white;
  transition: background-color 0.2s;
  border: 1px solid #ababab80;
  cursor: pointer;
  ::after {
    @media (max-width: 500px) {
      font-size: 18px;
    }
    content: '🌞';
    margin: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21px;
    width: 25px;
    height: 25px;
    background: ${(props) => props.theme.bgColor};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const ThemeSwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + ${ThemeSwitchLabel} {
    background: ${(props) => props.theme.bgColor};
    ::after {
      @media (max-width: 500px) {
        font-size: 18px;
        margin-left: 35px;
      }
      content: '🌛';
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 3px;
      margin-left: 50px;
      border-radius: 50%;
      font-size: 21px;
      width: 24px;
      height: 24px;
      background: ${(props) => props.theme.menuColor};
      box-shadow: 0px 1px 3px 1px white;
      transition: 0.2s;
    }
  }
`;

const NavThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <ThemeSwitchWrap>
      <ThemeMode>Light / Dark</ThemeMode>
      <ThemeSwitchInput
        theme={theme}
        id={'switch-input'}
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === darkTheme ? true : false}
      />
      <ThemeSwitchLabel
        theme={theme}
        htmlFor={'switch-input'}
      ></ThemeSwitchLabel>
    </ThemeSwitchWrap>
  );
};

export default NavThemeSwitch;
