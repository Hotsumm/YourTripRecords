import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import bgImg from '../static/assets/bg2.JPG';
import Navigation from '../components/Navigation/Navigation';
import CityList from '../components/City/CityList';

const HomeContainer = styled.div`
  width: 100%;
`;
const BackgroundContainer = styled.div`
  width: 100%;
  & img {
    width: 100%;
    position: relative;
    z-index: -1;
  }
  & span {
    position: absolute;
    z-index: -1;
    width: 270px;
    font-weight: 800;
    font-size: 45px;
    bottom: 90px;
    left: 100px;
    color: white;
  }
`;

const CityListHeader = styled.div`
  display: flex;
  //justify-content: center;
  font-size: 40px;
  padding: 60px 0 10px 50px;
  font-weight: 700;
`;

const CityListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`;

const Home = () => {
  const [navBar, setNavBar] = useState(false);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY >= 80) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  return (
    <>
      <HomeContainer>
        <Navigation show={navBar} sideBar={true} />
        <BackgroundContainer>
          <img src={bgImg} alt="메인배경" />
          <span>너의 여행들을 공유 해봐!</span>
        </BackgroundContainer>
        <CityListHeader>여행지</CityListHeader>
        <CityListContainer>
          <CityList />
        </CityListContainer>
      </HomeContainer>
    </>
  );
};

export default Home;
