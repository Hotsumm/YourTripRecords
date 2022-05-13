import React from 'react';
import styled from 'styled-components';

import bgImg from '@assets/backgroundImg.jpg';
import HomeIntro from '@src/components/Home/HomeIntro';
import CitySearchBar from '@components/City/CitySearchBar';

const Background: React.FC = () => {
  return (
    <BackgroundContainer>
      <BackgroundImgWrap>
        <img src={bgImg} alt="메인배경" />
      </BackgroundImgWrap>
      <BackgroundCitySearchBarWrap>
        <CitySearchBar />
      </BackgroundCitySearchBarWrap>
      <HomeIntro />
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BackgroundImgWrap = styled.div`
  @media (max-height: 1000px) {
    height: 85vh;
  }
  @media (max-height: 800px) {
    height: 90vh;
  }
  @media (max-height: 500px) {
    height: 125vh;
  }
  width: 100%;
  height: 80vh;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const BackgroundCitySearchBarWrap = styled.div`
  @media (min-width: 1025px) {
    display: none;
  }
  @media (max-width: 500px) {
    left: 0;
  }
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  position: absolute;
  top: 30%;
  left: calc(50% - 250px);
`;

export default Background;
