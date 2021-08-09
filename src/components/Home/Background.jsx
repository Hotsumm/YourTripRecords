import React from 'react';
import styled from 'styled-components';
import bgImg from '../../static/assets/bg1.jpg';

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-width: 500px) {
    height: 100%;
    aspect-ratio: 1/1;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  span {
    @media (max-width: 500px) {
      top: 120px;
      left: 50px;
      font-size: 24px;
      width: 150px;
    }
    position: absolute;
    width: 240px;
    font-weight: 600;
    font-size: 45px;
    top: 200px;
    left: 100px;
    color: white;
    text-shadow: 1px 0.5px 2px black;
  }
`;

const Background = () => {
  return (
    <BackgroundContainer>
      <img src={bgImg} alt="메인배경" />
      <span>
        너의
        <br /> 여행기록들을 공유 해봐 !
      </span>
    </BackgroundContainer>
  );
};

export default Background;
