import React, { useState, useLayoutEffect, useMemo } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Background from '../components/Home/Background';
import PopularCity from '../components/Home/PopularCity';
import Footer from '../components/Home/Footer';
import { throttle } from 'lodash';

const HomeContainer = styled.main`
  width: 100%;
  max-width: 2560px;
  margin: 0 auto;
`;

const Home: React.FC = () => {
  const [navBar, setNavBar] = useState<boolean>(false);

  const throttleScroll = useMemo<() => void>(
    () =>
      throttle(() => {
        if (window.scrollY >= 80) {
          setNavBar(true);
        } else {
          setNavBar(false);
        }
      }, 300),
    [],
  );

  useLayoutEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => window.removeEventListener('scroll', throttleScroll);
  }, [throttleScroll]);

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
