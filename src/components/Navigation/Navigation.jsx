import React from 'react';
import styled from 'styled-components';
import NavSearchBar from './NavSearchBar';
import NavProfileBar from './NavProfileBar';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100vw;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: ${(props) =>
    props.show ? '0px 0px 8px rgba(0, 0, 0, 0.2)' : '0px'};
  background: ${(props) => (props.show ? ' white' : 'transparent')};
`;

const NavWrap = styled.div`
  max-width: 1450px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0px 60px;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 33%;
  display: flex;
  padding: 20px 0;
  justify-content: flex-start;
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => (props.show ? 'black' : 'white')};
`;

const SearchContainer = styled.div`
  width: 33%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  width: 33%;
  display: flex;
  padding: 20px 0;
  justify-content: flex-end;
`;

const Navigation = ({ show }) => {
  return (
    <NavContainer show={show}>
      <NavWrap>
        <TitleContainer show={show}>
          <Link to="/">Travel</Link>
        </TitleContainer>
        <SearchContainer show={show}>
          <NavSearchBar />
        </SearchContainer>
        <ProfileContainer show={show}>
          <NavProfileBar />
        </ProfileContainer>
      </NavWrap>
    </NavContainer>
  );
};

export default Navigation;
