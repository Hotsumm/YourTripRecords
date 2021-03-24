import React from 'react';
import styled from 'styled-components';
import bgImg from '../../static/assets/bg2.JPG';

const BackgroundContainer = styled.div`
  width: 100%;
  position: relative;
  img {
    object-fit: cover;
  }
  span {
    position: absolute;
    width: 270px;
    font-weight: 800;
    font-size: 45px;
    bottom: 90px;
    left: 100px;
    color: white;
  }
`;

const Background = () => {
  return (
    <BackgroundContainer>
      <img src={bgImg} alt="메인배경" />
      <span>너의 여행들을 공유 해봐!</span>
    </BackgroundContainer>
  );
};

export default Background;
