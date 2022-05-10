import React from 'react';
import styled from 'styled-components';

import bgImg from '@assets/backgroundImg.jpg';
import HomeIntro from '@src/components/Home/HomeIntro';

const Background: React.FC = () => {
  return (
    <BackgroundContainer>
      <BackgroundImgWrap>
        <img src={bgImg} alt="메인배경" />
      </BackgroundImgWrap>
      <HomeIntro />
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BackgroundImgWrap = styled.div`
  width: 100%;
  height: 80vh;
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
