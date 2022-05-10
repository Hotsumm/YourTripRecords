import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ThemeContext } from '@src/Context';
import { darkTheme } from '@styles/theme';
import NavProfileBar from '@components/Navigation/NavProfileBar';
import NavThemeSwitch from '@components/Navigation/NavThemeSwitch';
import CitySearchBar from '@src/components/City/CitySearchBar';

interface NavigationProps {
  show: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavContainer theme={theme} show={show}>
      <NavWrap>
        <TitleWrap show={show} theme={theme}>
          <Link to="/">YourTripRecords</Link>
        </TitleWrap>
        <CitySearchBarWrap>
          <CitySearchBar />
        </CitySearchBarWrap>
        <ProfileWrap theme={theme}>
          <NavProfileBar />
        </ProfileWrap>
        <ThemeContainer>
          <NavThemeSwitch />
        </ThemeContainer>
      </NavWrap>
    </NavContainer>
  );
};

const NavContainer = styled.header<{ show: boolean }>`
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 99999;
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
  @media (max-width: 1440px) {
    padding: 0px 30px;
  }
  @media (max-width: 500px) {
    padding: 0px 10px;
  }
  max-width: 2560px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrap = styled.div<{ show: boolean }>`
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    font-size: 26px;
  }
  @media (max-width: 500px) {
    font-size: 22px;
  }
  width: 33%;
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

const CitySearchBarWrap = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
  width: 33%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

const ProfileWrap = styled.div`
  @media (max-width: 1024px) {
    width: 50%;
  }
  display: flex;
  width: 33%;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px 0;
`;

const ThemeContainer = styled.div`
  @media (max-width: 1440px) {
    right: 30px;
  }
  @media (max-width: 500px) {
    right: 10px;
  }
  position: absolute;
  z-index: -1;
  top: 90px;
  right: 60px;
`;

export default Navigation;
