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
    font-weight: 600;
    font-size: 45px;
    top: 270px;
    left: 80px;
    color: white;
    text-shadow: 1px 0.5px 2px black;
  }
`;

const Background = () => {
  return (
    <BackgroundContainer>
      <img src={bgImg} alt="메인배경" />
      <span>너의 여행들을 공유 해봐 !</span>
    </BackgroundContainer>
  );
};

export default Background;
