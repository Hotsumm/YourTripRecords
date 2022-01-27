import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Background from '../components/Home/Background';
import PopularCity from '../components/Home/PopularCity';
import Footer from '../components/Home/Footer';

const HomeContainer = styled.main`
  width: 100%;
  max-width: 2560px;
  margin: 0 auto;
`;

const Home: React.FC = () => {
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
        <PopularCity />
        <Footer />
      </HomeContainer>
    </>
  );
};

export default Home;
