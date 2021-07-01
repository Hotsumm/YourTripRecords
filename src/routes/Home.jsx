import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import CityList from '../components/City/CityList';
import Background from '../components/Home/Background';
import PopularCity from '../components/Home/PopularCity';

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
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
        <CityList />
        <PopularCity />
      </HomeContainer>
    </>
  );
};

export default Home;
