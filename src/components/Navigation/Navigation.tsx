import React, { useContext } from 'react';
import styled from 'styled-components';
import NavProfileBar from './NavProfileBar';
import { Link } from 'react-router-dom';
import NavThemeSwitch from './NavThemeSwitch';
import { ThemeContext } from '../../Context';
import { darkTheme } from '../../styles/theme';

const NavContainer = styled.header<{ show: boolean }>`
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

const NavWrap = styled.nav`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0px 60px;
  @media (max-width: 768px) {
    padding: 0px 20px;
  }
  @media (max-width: 500px) {
    padding: 0px 10px;
  }
  max-width: 2560px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div<{ show: boolean }>`
  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
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
  max-width: 200px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 0;
`;

const ThemeContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 280px;
  z-index: -1;

  @media (max-width: 1024px) {
    top: 90px;
    right: 20px;
  }
`;

interface NavigationProps {
  show: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer theme={theme} show={show}>
      <NavWrap>
        <TitleContainer show={show} theme={theme}>
          <Link to="/">YourTripRecords</Link>
        </TitleContainer>
        <ProfileContainer theme={theme}>
          <NavProfileBar />
        </ProfileContainer>
        <ThemeContainer>
          <NavThemeSwitch />
        </ThemeContainer>
      </NavWrap>
    </NavContainer>
  );
};

export default Navigation;
