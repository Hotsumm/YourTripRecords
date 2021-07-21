import React from 'react';
import styled from 'styled-components';

const ProfileIntroContainer = styled.div`
  width: 25%;
  margin-right: 40px;
`;

const ProfileIntroWrap = styled.div`
  width: 100%;
  display: flex;
  background: white;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  padding: 20px 20px 50px 20px;
  flex-direction: column;
`;

const IntroHeader = styled.div`
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
  return (
    <>
      <ProfileIntroContainer>
        <ProfileIntroWrap>
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
