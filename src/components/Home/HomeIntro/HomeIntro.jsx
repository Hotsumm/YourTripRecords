import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 250px;
  position: absolute;
  top: 200px;
  left: 100px;
  @media (max-width: 500px) {
    top: 120px;
    left: 40px;
  }
`;

const IntroWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & p {
    width: 240px;
    font-weight: 600;
    font-size: 45px;
    color: white;
    line-height: 120%;
    text-shadow: 1px 0.5px 2px black;
    @media (max-width: 500px) {
      font-size: 26px;
      width: 150px;
    }
  }
`;

const CityLink = styled(Link)`
  border: 1px solid white;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 20px;
  color: white;
  :hover {
    background: #e3f4ea;
    color: #16a085;
  }
  @media (min-width: 767px) {
    display: none;
  }
  @media (max-width: 500px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const HomeIntro = () => {
  return (
    <HomeIntroContainer>
      <IntroWrap>
        <p>
          너의 <br />
          여행기록들을 <br />
          공유 해봐 !
        </p>
      </IntroWrap>
      <CityLink to={'/city/전체'}>지금 여행기록 보러가기</CityLink>
    </HomeIntroContainer>
  );
};

export default HomeIntro;
