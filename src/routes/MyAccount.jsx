import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { UserContext } from '../Context';
import { FcLock } from 'react-icons/fc';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { RiToolsLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const MyAccountContainer = styled.div`
  width: 100%;
  padding-top: 80px;
`;

const MyAccountHeader = styled.div`
  width: 100%;
  text-align: center;
  margin: 60px 0;
  font-size: 40px;
`;

const MyAccountWrap = styled.div`
  width: 100%;
  padding: 0 320px;
`;

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
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
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 250px;
  height: 150px;
  border-radius: 10px;
  color: black;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  svg {
    margin-bottom: 15px;
  }
`;

const Title = styled.div``;

const MyAccount = () => {
  const { userObj } = useContext(UserContext);

  if (userObj === null) {
    return <Redirect path="/" />;
  }

  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
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
              <Menu>
                <BsBoxArrowInUpRight size={25} style={{ color: '#00b894' }} />
                <Title>프로필로 이동</Title>
              </Menu>
            </Link>
            <Menu>
              <FcLock size={25} />
              <Title>비밀번호 변경</Title>
            </Menu>
            <Menu>
              <RiToolsLine size={25} />
              <Title>게시물 수정</Title>
            </Menu>
          </MenuWrap>
        </MyAccountWrap>
      </MyAccountContainer>
    </>
  );
};

export default MyAccount;
