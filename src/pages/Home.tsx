import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';

import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import Footer from '@components/Home/Footer';
import Background from '@components/Home/Background';
import PopularCity from '@components/Home/PopularCity';
import Navigation from '@components/Navigation/Navigation';

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
        if (scrollY >= 80) {
          setNavBar(true);
        } else {
          setNavBar(false);
        }
      }, 300),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    addEventListener('scroll', throttleScroll);
    return () => removeEventListener('scroll', throttleScroll);
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
