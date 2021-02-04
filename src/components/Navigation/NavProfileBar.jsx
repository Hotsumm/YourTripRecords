import React, { useState } from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { VscTriangleDown } from 'react-icons/vsc';

const ProfileContent = styled.div`
  position: relative;
  width: ${(props) => (props.current ? '170px' : '220px')};
  height: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  background: white;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  cursor: pointer;

  & span {
    width: 120px;
    font-weight: 700;
    font-size: 15px;
    text-align: right;
  }
`;

const AvatarWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & span {
    width: 70px;
    text-align: right;
    margin-left: 5px;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  width: 230px;
  height: 250px;
  padding: 10px 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  top: 60px;
  left: -50px;

  &ul {
    width: 100%;
    height: 100%;
  }
  & li {
    font-size: 15px;
    padding: 15px 20px;
    cursor: pointer;
    :first-child {
      font-weight: 700;
    }
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const NavProfile = () => {
  const [isActive, setIsActive] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const menuClick = () => setIsActive(!isActive);
  const signIn = () => setIsUser(!isUser);
  const signOut = () => setIsUser(!isUser);

  return (
    <>
      <ProfileContent current={isUser} onClick={menuClick}>
        {isUser ? (
          <AvatarWrap>
            <VscTriangleDown size={20} />
            <span>Hotsumm</span>
            <HiUserCircle size={35} />
          </AvatarWrap>
        ) : (
          <>
            <VscTriangleDown size={20} />
            <span>로그인을 해주세요.</span>
            <HiUserCircle size={35} />
          </>
        )}
        {isActive && (
          <ProfileMenu>
            {isUser ? (
              <ul>
                <li>내 계정</li>
                <li onClick={signOut}>로그아웃</li>
              </ul>
            ) : (
              <ul>
                <li onClick={signIn}>로그인</li>
                <li>회원가입</li>
              </ul>
            )}
          </ProfileMenu>
        )}
      </ProfileContent>
    </>
  );
};

export default NavProfile;
