import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Context';

const ProfileIntroContainer = styled.div`
  width: 30%;

  @media (max-width: 1200px) {
    width: 33%;
  }

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    width: 90vw;
    margin-right: 0px;
    margin-bottom: 40px;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
  margin-right: 40px;
`;

const ProfileIntroWrap = styled.div`
  width: 100%;
  display: flex;
  background: ${(props) => props.theme.menuColor};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  padding: 20px 20px 50px 20px;
  flex-direction: column;
`;

const IntroHeader = styled.div`
  @media (max-width: 768px) {
  }
  text-align: left;
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Intro = styled.span`
  width: 100%;
  font-size: 13px;
  text-align: left;
`;

const ProfileIntro = ({ thisUser }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ProfileIntroContainer>
        <ProfileIntroWrap theme={theme}>
          <IntroHeader>소개</IntroHeader>
          <Intro>
            {thisUser.intro ? thisUser.intro : '소개글이 없습니다.'}
          </Intro>
        </ProfileIntroWrap>
      </ProfileIntroContainer>
    </>
  );
};

export default ProfileIntro;
