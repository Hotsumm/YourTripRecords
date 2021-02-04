import React from 'react';
import styled from 'styled-components';
import bgImg from '../static/assets/background.jpg';

const HomeContainer = styled.div`
  width: 100%;
`;
const BackgroundContainer = styled.div`
  width: 100%;
  & img {
    width: 100%;
  }
`;

const Home = () => {
  return (
    <>
      <HomeContainer>
        <BackgroundContainer>
          <img src={bgImg} alt="바다배경" />
        </BackgroundContainer>
      </HomeContainer>
    </>
  );
};

export default Home;
