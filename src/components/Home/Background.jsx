import React from 'react';
import styled from 'styled-components';
import bgImg from '../../static/assets/backgroundImg.jpg';

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  aspect-ratio: 1/1;
  @media (max-width: 500px) {
    height: 75vh;
  }
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Background = () => {
  return (
    <BackgroundContainer>
      <img src={bgImg} alt="메인배경" />
    </BackgroundContainer>
  );
};

export default Background;
