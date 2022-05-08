import React from 'react';
import styled from 'styled-components';

import bgImg from '@assets/backgroundImg.jpg';
import HomeIntro from '@components/Home/HomeIntro/HomeIntro';
import HomeCityList from '@components/Home/HomeIntro/HomeCityList';

const Background: React.FC = () => {
  return (
    <BackgroundContainer>
      <img src={bgImg} alt="메인배경" />
      <HomeIntro />
      <HomeCityList />
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-width: 768px) {
    height: 70vh;
  }

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default Background;
