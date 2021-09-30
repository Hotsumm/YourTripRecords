import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import HomeCityList from '../components/Home/HomeCityList';
import Background from '../components/Home/Background';
import PopularCity from '../components/Home/PopularCity';
import Footer from '../components/Home/Footer';
import HomeIntro from '../components/Home/HomeIntro';

const HomeContainer = styled.main`
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
        <HomeIntro />
        <HomeCityList />
        <PopularCity />
        <Footer />
      </HomeContainer>
    </>
  );
};

export default Home;
