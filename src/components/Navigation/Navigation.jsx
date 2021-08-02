import React, { useContext } from 'react';
import styled from 'styled-components';
import NavProfileBar from './NavProfileBar';
import { Link } from 'react-router-dom';
import NavThemeSwitch from './NavThemeSwitch';
import { ThemeContext } from '../../Context';
import { darkTheme } from '../../theme';

const NavContainer = styled.div`
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: ${(props) =>
    props.show ? '0px 0px 8px rgba(0, 0, 0, 0.2)' : '0px'};
  background: ${(props) =>
    props.show ? `${props.theme.NavColor}` : 'transparent'};
`;

const NavWrap = styled.div`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 60px;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 20px 0;
  align-items: flex-start;
  font-size: 30px;
  font-weight: 700;
  color: ${(props) =>
    props.show
      ? (props) => (props.theme === darkTheme ? 'white' : 'black')
      : 'white'};
`;

/*
const SearchContainer = styled.div`
  width: 33%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;
*/

const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 0;
`;

const ThemeContainer = styled.div`
  margin-right: 120px;
`;

const Navigation = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer theme={theme} show={show}>
      <NavWrap>
        <TitleContainer show={show} theme={theme}>
          <Link to="/">YeoGiGong</Link>
        </TitleContainer>
        <ProfileContainer theme={theme}>
          <ThemeContainer show={show}>
            <NavThemeSwitch />
          </ThemeContainer>
          <NavProfileBar />
        </ProfileContainer>
      </NavWrap>
    </NavContainer>
  );
};

export default Navigation;
