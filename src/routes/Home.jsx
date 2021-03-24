import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import CityList from '../components/City/CityList';
import Background from '../components/Home/Background';

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
`;

const CityListHeader = styled.div`
  display: flex;
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
      <Navigation show={navBar} />
      <HomeContainer>
        <Background />
        <CityListHeader>여행지</CityListHeader>
        <CityListContainer>
          <CityList />
        </CityListContainer>
      </HomeContainer>
    </>
  );
};

export default Home;
