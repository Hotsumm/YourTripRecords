import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi';
import { VscTriangleDown } from 'react-icons/vsc';

import { ThemeContext, UserContext } from '@src/Context';
import { firebaseAuth } from '@src/firebaseConfig';
import SignIn from '@components/Auth/SignIn';
import SignUp from '@components/Auth/SignUp';
import { useOutsideClick } from '@hooks/useOutsideClick';

const ProfileBarWrap = styled.div`
  position: relative;
  height: 40px;
  border-radius: 20px;
  background: ${(props) => props.theme.bgColor};
  padding: 0 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AvatarWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 10px;
  & span {
    @media (max-width: 500px) {
      display: none;
    }
    font-weight: 700;
    font-size: 15px;
    color: ${(props) => props.theme.textColor};
  }
  & img {
    @media (max-width: 500px) {
      width: 25px;
      height: 25px;
    }
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;

const Icon = styled.div`
  & svg {
    color: ${(props) => props.theme.textColor};
  }
`;

const ProfileMenu = styled.div`
  @media (max-width: 500px) {
    width: 180px;
  }
  position: absolute;
  width: 230px;
  padding: 10px 0;
  background: ${(props) => props.theme.menuColor};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  top: 50px;
  right: 0px;

  &ul {
    width: 100%;
    height: 100%;
  }
  & li {
    color: ${(props) => props.theme.textColor};
    font-size: 15px;
    padding: 15px 20px;
    cursor: pointer;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const NavProfile: React.FC = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isSignUpClick, setIsSignUpClick] = useState<boolean>(false);
  const [isSignInClick, setIsSignInClick] = useState<boolean>(false);
  const { userObj } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsMenu(false));

  const menuClick = () => setIsMenu(!isMenu);
  const toggleSignIn = () => setIsSignInClick(!isSignInClick);
  const toggleSignUp = () => setIsSignUpClick(!isSignUpClick);

  const SignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        alert('로그아웃 되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      <ProfileBarWrap theme={theme} ref={ref} onClick={menuClick}>
        {userObj ? (
          <AvatarWrap theme={theme}>
            <Icon>
              <VscTriangleDown size={15} />
            </Icon>
            <span>{userObj.nickname}</span>
            <img src={userObj.avatar} alt="avatar" />
          </AvatarWrap>
        ) : (
          <AvatarWrap theme={theme}>
            <Icon>
              <VscTriangleDown size={15} />
            </Icon>
            <span>로그인을 해주세요</span>
            <HiUserCircle size={35} color={theme.textColor} />
          </AvatarWrap>
        )}
        {isMenu && (
          <ProfileMenu theme={theme}>
            {userObj ? (
              <ul>
                <Link to={`/myAccount/${userObj.userId}`}>
                  <li style={{ fontWeight: '700' }}>내 계정</li>
                </Link>
                <Link to={`/profile/${userObj.userId}`}>
                  <li>프로필 보기</li>
                </Link>
                <Link to={'/city/전체'}>
                  <li>여행기록 둘러보기</li>
                </Link>
                <Link to={'/upload'}>
                  <li>여행기록 올리기</li>
                </Link>
                <li
                  onClick={SignOut}
                  style={{ borderTop: '1px solid #ababab80' }}
                >
                  로그아웃
                </li>
              </ul>
            ) : (
              <ul>
                <li onClick={toggleSignIn}>로그인</li>
                <li onClick={toggleSignUp}>회원가입</li>
                <Link to={'/city/서울'}>
                  <li style={{ borderTop: '1px solid #ababab80' }}>
                    여행기록 둘러보기
                  </li>
                </Link>
              </ul>
            )}
          </ProfileMenu>
        )}
      </ProfileBarWrap>
      {isSignInClick && (
        <SignIn toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp} />
      )}
      {isSignUpClick && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

export default NavProfile;
