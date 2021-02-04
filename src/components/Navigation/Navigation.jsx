import React from 'react';
import styled from 'styled-components';
import NavSideBar from './NavSideBar';
import NavSearchBar from './NavSearchBar';
import NavProfileBar from './NavProfileBar';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: fixed;
  color: white;
`;

const NavWrap = styled.div`
  width: 100vw;
  display: flex;
  padding: 0 60px;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 33%;
  display: flex;
  padding: 40px 0;
  justify-content: flex-start;
  font-size: 30px;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  width: 33%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  width: 33%;
  display: flex;
  padding: 40px 0;
  justify-content: flex-end;
`;

const Navigation = () => {
  return (
    <>
      <NavContainer>
        <NavWrap>
          <TitleContainer>
            <Link to="/">Travel</Link>
          </TitleContainer>
          <SearchContainer>
            <NavSearchBar />
          </SearchContainer>
          <ProfileContainer>
            <NavProfileBar />
          </ProfileContainer>
        </NavWrap>
        <NavSideBar />
      </NavContainer>
    </>
  );
};

export default Navigation;
