import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import ChangePassword from '../components/Account/ChangePassword';
import { FcLock } from 'react-icons/fc';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FiUserX } from 'react-icons/fi';
import { UserContext, ThemeContext } from '../Context';
import UserDelete from '../components/Account/UserDelete';
import Footer from '../components/Home/Footer';

const MyAccountContainer = styled.div`
  width: 100vw;
  max-width: 1450px;
  padding-top: 80px;
  margin: 0 auto;
`;

const MyAccountHeader = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 60px;
  font-size: 40px;
`;

const MyAccountWrap = styled.div`
  width: 100%;
  padding: 70px 0;
`;

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  div {
    :nth-child(2) {
      margin-left: 10px;
      font-size: 20px;
    }
    :last-child {
      margin-left: 5px;
      font-weight: 700;
      font-size: 14px;
      color: #16a085;
    }
  }
`;

const MenuWrap = styled.div`
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    gap: 20px 0;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0 20px;
  padding-bottom: 20px;
`;

const Menu = styled.div`
  @media (max-width: 500px) {
    width: 95vw;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 250px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border: 1px solid #16a085;
`;

const Title = styled.div`
  margin-top: 15px;
`;

const MyAccount = ({ match }) => {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isUserDelete, setIsUserDelete] = useState(false);
  const { userObj } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const toggleChangePassword = () => setIsChangePassword(!isChangePassword);
  const toggleUserDelete = () => setIsUserDelete(!isUserDelete);

  if (userObj === null || userObj.userId !== match.params.userId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navigation show={true} />
      {userObj && (
        <MyAccountContainer>
          <MyAccountHeader>내 계정</MyAccountHeader>
          <MyAccountWrap>
            <UserWrap>
              <UserInfoWrap>
                <img src={userObj.avatar} alt="Avatar" />
                <div>{userObj.nickname}님,</div>
                <div>{userObj.email}</div>
              </UserInfoWrap>
            </UserWrap>
            <MenuWrap>
              <Link to={`/profile/${userObj.userId}`}>
                <Menu theme={theme}>
                  <BsBoxArrowInUpRight size={25} style={{ color: '#00b894' }} />
                  <Title>프로필로 이동</Title>
                </Menu>
              </Link>
              <Menu onClick={toggleChangePassword} theme={theme}>
                <FcLock size={25} />
                <Title>비밀번호 변경</Title>
              </Menu>
              <Menu onClick={toggleUserDelete} theme={theme}>
                <FiUserX size={25} style={{ color: '#e74c3c' }} />
                <Title style={{ color: '#e74c3c' }}>회원 탈퇴</Title>
              </Menu>
            </MenuWrap>
          </MyAccountWrap>
          <Footer />
        </MyAccountContainer>
      )}
      {isChangePassword && (
        <ChangePassword toggleChangePassword={toggleChangePassword} />
      )}
      {isUserDelete && <UserDelete toggleUserDelete={toggleUserDelete} />}
    </>
  );
};

export default MyAccount;
