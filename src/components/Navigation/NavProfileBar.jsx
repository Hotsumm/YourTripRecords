import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { VscTriangleDown } from 'react-icons/vsc';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { firebaseAuth } from '../../firebaseConfig';
import { UserContext } from '../../Context';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const ProfileBarWrap = styled.div`
  width: 100%;
  position: relative;
  width: ${(props) => (props.current ? '220px' : '230px')};
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
`;

const AvatarWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & span {
    width: 60%;
    font-weight: 700;
    font-size: 15px;
    text-align: right;
    margin-left: 10px;
    color: #2c3e50;
  }
  & img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 5px;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  width: 230px;
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
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const NavProfile = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isSignUpClick, setIsSignUpClick] = useState(false);
  const [isSignInClick, setIsSignInClick] = useState(false);
  const ref = useRef();
  const { userObj } = useContext(UserContext);

  useOutsideClick(ref, () => setIsMenu(false));

  const menuClick = () => setIsMenu(!isMenu);
  const toggleSignIn = () => setIsSignInClick(!isSignInClick);
  const toggleSignUp = () => setIsSignUpClick(!isSignUpClick);

  const SignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        alert('로그아웃 되었습니다.');
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      <ProfileBarWrap ref={ref} current={userObj} onClick={menuClick}>
        <AvatarWrap>
          {userObj ? (
            <>
              <VscTriangleDown size={15} color={'grey'} />
              <span>{userObj.nickname}</span>
              <img src={userObj.avatar} alt="avatar" />
            </>
          ) : (
            <>
              <VscTriangleDown size={15} color={'grey'} />
              <span>로그인을 해주세요.</span>
              <HiUserCircle size={35} color={'grey'} />
            </>
          )}
        </AvatarWrap>
        {isMenu && (
          <ProfileMenu>
            {userObj ? (
              <ul>
                <Link to={`/myAccount/${userObj.userId}`}>
                  <li style={{ fontWeight: '700' }}>내 계정</li>
                </Link>
                <Link to={`/profile/${userObj.userId}`}>
                  <li>프로필 보기</li>
                </Link>
                <Link to={'/city/서울'}>
                  <li>여행기록 둘러보기</li>
                </Link>
                <Link to={'/upload'}>
                  <li>여행기록 올리기</li>
                </Link>
                <li>설정</li>
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
      {isSignInClick && <SignIn toggleSignIn={toggleSignIn} />}
      {isSignUpClick && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

export default NavProfile;
