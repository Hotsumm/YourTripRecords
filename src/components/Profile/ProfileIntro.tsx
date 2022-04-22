import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '@src/Context';

const ProfileIntroContainer = styled.section`
  width: 30%;

  @media (max-width: 1200px) {
    width: 33%;
  }

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    width: 100%;
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
  padding: 20px;
  flex-direction: column;
`;

const IntroHeaderWrap = styled.header`
  width: 100%;
`;

const IntroHeader = styled.h3`
  font-size: 20px;
  text-align: left;
`;

const Intro = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0;
  & span {
    width: 100%;
    font-size: 13px;
    text-align: left;
  }
`;

interface ProfileIntroProps {
  thisUser: IUserObj;
}

const ProfileIntro: React.FC<ProfileIntroProps> = ({ thisUser }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ProfileIntroContainer>
        <ProfileIntroWrap theme={theme}>
          <IntroHeaderWrap>
            <IntroHeader>소개</IntroHeader>
          </IntroHeaderWrap>
          <Intro>
            <span>
              {thisUser.intro ? thisUser.intro : '소개글이 없습니다.'}
            </span>
          </Intro>
        </ProfileIntroWrap>
      </ProfileIntroContainer>
    </>
  );
};

export default ProfileIntro;
