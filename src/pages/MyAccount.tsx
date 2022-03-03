import React, { useState, useContext } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import ChangePassword from '../components/Account/ChangePassword';
import { FcLock } from 'react-icons/fc';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FiUserX } from 'react-icons/fi';
import { ThemeContext, UserContext } from '../Context';
import UserDelete from '../components/Account/UserDelete';
import Footer from '../components/Home/Footer';

const MyAccountContainer = styled.main`
  width: 100vw;
  max-width: 2560px;
  padding-top: 80px;
  margin: 0 auto;
`;

const MyAccountHeaderWrap = styled.header`
  width: 100%;
  padding-top: 60px;
`;

const MyAccountHeader = styled.h1`
  text-align: center;
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
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px 0;
    margin-bottom: 30px;
  }
  display: flex;
  align-items: center;
  margin-bottom: 60px;
  gap: 0 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  span {
    :nth-child(2) {
      font-size: 20px;
    }
    :last-child {
      font-weight: 700;
      font-size: 14px;
      color: #16a085;
    }
  }
`;

const MenuWrap = styled.div`
  @media (max-width: 768px) {
    gap: 0 10px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    gap: 20px 0;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0 20px;
`;

const Menu = styled.div`
  @media (max-width: 1024px) {
    width: 200px;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    width: 150px;
    font-size: 16px;
  }

  @media (max-width: 500px) {
    width: 90vw;
    font-size: 20px;
    height: 150px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 250px;
  padding: 40px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border: 1px solid #16a085;
`;

const IconWrap = styled.div`
  & svg {
    @media (max-width: 768px) {
      font-size: 20px;
    }
    font-size: 30px;
  }
`;

const Title = styled.span`
  margin-top: 15px;
`;

interface MatchProps {
  userId: string;
}

const MyAccount: React.FC<RouteComponentProps<MatchProps, {}>> = ({
  match,
}) => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [isUserDelete, setIsUserDelete] = useState<boolean>(false);
  const { userObj } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const { userId } = match.params;

  const toggleChangePassword = (): void =>
    setIsChangePassword(!isChangePassword);

  const toggleUserDelete = (): void => setIsUserDelete(!isUserDelete);

  if (userObj === null || userObj.userId !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navigation show={true} />
      {userObj && (
        <MyAccountContainer>
          <MyAccountHeaderWrap>
            <MyAccountHeader>내 계정</MyAccountHeader>
          </MyAccountHeaderWrap>
          <MyAccountWrap>
            <UserWrap>
              <UserInfoWrap>
                <img src={userObj.avatar} alt="Avatar" />
                <span>{userObj.nickname}</span>
                <span>{userObj.email}</span>
              </UserInfoWrap>
            </UserWrap>
            <MenuWrap>
              <Link to={`/profile/${userObj.userId}`}>
                <Menu theme={theme}>
                  <IconWrap>
                    <BsBoxArrowInUpRight style={{ color: '#00b894' }} />
                  </IconWrap>
                  <Title>프로필로 이동</Title>
                </Menu>
              </Link>
              <Menu onClick={toggleChangePassword} theme={theme}>
                <IconWrap>
                  <FcLock />
                </IconWrap>
                <Title>비밀번호 변경</Title>
              </Menu>
              <Menu onClick={toggleUserDelete} theme={theme}>
                <IconWrap>
                  <FiUserX style={{ color: '#e74c3c' }} />
                </IconWrap>
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
