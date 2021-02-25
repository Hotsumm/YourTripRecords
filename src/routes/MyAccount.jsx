import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import ProfileEdit from '../components/Profile/ProfileEdit';
import { UserContext } from '../Context';
import { Redirect } from 'react-router-dom';

const AccountContainer = styled.div`
  padding-top: 80px;
  width: 100%;
  height: 100vw;
  background: #f1f2f6;
  text-align: center;
`;

const AccountHeader = styled.div`
  margin: 60px 0;
  font-size: 40px;
`;

const AccountWrap = styled.div`
  width: 100%;
  height: 250px;
  padding: 0px 130px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
  padding: 0px 40px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;
const ProfileWrap = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  span {
    margin-bottom: 5px;
    color: gray;
  }
`;

const Nickname = styled.div`
  margin-bottom: 50px;
  font-size: 28px;
  color: black;
`;

const ProfileMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 170px;
  height: 170px;
  border: 1px solid #ababab80;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: pointer;
  span {
    color: black;
    font-size: 18px;
    :last-child {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
  :not(:last-child) {
    margin-right: 50px;
  }
`;

const MyAccount = () => {
  const [isEditClick, setIsEditClick] = useState(false);
  const { userObj } = useContext(UserContext);

  if (userObj === null) {
    return <Redirect to="/" />;
  }
  const toggleProfileEdit = () => setIsEditClick(!isEditClick);

  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <AccountContainer>
        <AccountHeader>내 계정</AccountHeader>
        <AccountWrap>
          <ProfileContainer>
            <ProfileWrap>
              <Avatar src={userObj.avatar}></Avatar>
              <AvatarInfo>
                <span>닉네임</span>
                <Nickname>{userObj.nickname}</Nickname>
              </AvatarInfo>
            </ProfileWrap>
            <ProfileMenu>
              <span>내 여행</span>
              <span>내가 올린사진을 보고 싶어요.</span>
            </ProfileMenu>
            <ProfileMenu onClick={toggleProfileEdit}>
              <span>프로필 변경</span>
              <span>프로필을 변경하고 싶어요.</span>
            </ProfileMenu>
            <ProfileMenu>
              <span>비밀번호 변경</span>
              <span>비밀번호를 변경하고 싶어요.</span>
            </ProfileMenu>
          </ProfileContainer>
        </AccountWrap>
      </AccountContainer>
      {isEditClick && <ProfileEdit toggleProfileEdit={toggleProfileEdit} />}
    </>
  );
};

export default MyAccount;
