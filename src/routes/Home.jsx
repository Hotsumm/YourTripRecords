import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import bgImg from '../static/assets/bg2.JPG';
import Navigation from '../components/Navigation/Navigation';

const HomeContainer = styled.div`
  width: 100%;
  height: 200vh;
`;
const BackgroundContainer = styled.div`
  width: 100%;
  & img {
    width: 100%;
  }
  & span {
    position: absolute;
    width: 300px;
    font-weight: 800;
    font-size: 50px;
    z-index: 1;
    bottom: 100px;
    left: 100px;
    color: white;
  }
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
        <Navigation show={navBar} />
        <BackgroundContainer>
          <img src={bgImg} alt="메인배경" />
          <span>너의 여행들을 공유 해봐!</span>
        </BackgroundContainer>
      </HomeContainer>
    </>
  );
};

export default Home;
