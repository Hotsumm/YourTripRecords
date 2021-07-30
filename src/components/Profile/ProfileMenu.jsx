import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileEdit from './ProfileEdit';
import { IoLogoInstagram } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import SignIn from '../Auth/SignIn';

const ProfileMenuContainer = styled.div`
  width: 100%;
  padding-top: 100px;
`;

const ProfileMenuWrap = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  padding: 30px 30px;
`;

const AvatarWrap = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-right: 20px;
`;

const AvatarInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 20px;
`;

const InfoContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 7px 0;
`;
const ContentTitle = styled.div`
  color: gray;
  margin-right: 10px;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-top: 5px;
`;

const Instagram = styled.div`
  font-size: 14px;
  color: black;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  margin-top: 5px;
`;

const PostConunt = styled.div`
  font-size: 18px;
  margin-top: 5px;
  color: black;
`;

const OtherUser = styled.span`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
`;

const MenuWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  border: 1px solid #16a085;
  border-radius: 5px;
  background: white;
  margin-right: 30px;
  cursor: pointer;
  span {
    color: black;
    font-size: 14px;
    margin-left: 10px;
  }
`;

const ProfileMenu = ({ userCheck, thisUser, userObj }) => {
  const [isEditClick, setIsEditClick] = useState(false);
  const [isSignInClick, setIsSignInClick] = useState(false);
  const toggleProfileEdit = () => setIsEditClick(!isEditClick);

  const toggleSignIn = () => setIsSignInClick(!isSignInClick);

  const handleInstagram = () =>
    window.open(`https://www.instagram.com/${thisUser.instagram}/`);

  return (
    <>
      <ProfileMenuContainer>
        <ProfileMenuWrap>
          <AvatarWrap>
            <Avatar src={thisUser.avatar}></Avatar>
            <AvatarInfoWrap>
              <InfoContent>
                <ContentTitle>닉네임</ContentTitle>
                <Nickname>{thisUser.nickname}</Nickname>
              </InfoContent>
              <InfoContent>
                <ContentTitle>포스팅</ContentTitle>
                <PostConunt>{thisUser.records.length}</PostConunt>
              </InfoContent>
              {thisUser.instagram && (
                <InfoContent>
                  <IoLogoInstagram size={18} style={{ color: 'black' }} />
                  <Instagram onClick={handleInstagram}>
                    @{thisUser.instagram}
                  </Instagram>
                </InfoContent>
              )}
            </AvatarInfoWrap>
          </AvatarWrap>
          {!userObj ? (
            <OtherUser onClick={toggleSignIn}>
              로그인을 하여 더 많은 서비스를 이용해보세요 !
            </OtherUser>
          ) : (
            <>
              {userCheck && (
                <MenuWrap>
                  <Link to={'/upload'}>
                    <Menu>
                      <AiOutlinePlusCircle size={'18'} />
                      <span>여행기록 올리기</span>
                    </Menu>
                  </Link>
                  <Menu onClick={toggleProfileEdit}>
                    <CgProfile size={'18'} />
                    <span>프로필 변경</span>
                  </Menu>
                  <Link to={`/myAccount/${userObj.userId}`}>
                    <Menu>
                      <FaExchangeAlt size={'18'} />
                      <span>계정정보 변경</span>
                    </Menu>
                  </Link>
                </MenuWrap>
              )}
            </>
          )}
        </ProfileMenuWrap>
      </ProfileMenuContainer>
      {isEditClick && <ProfileEdit toggleProfileEdit={toggleProfileEdit} />}
      {isSignInClick && <SignIn toggleSignIn={toggleSignIn} />}
    </>
  );
};

export default ProfileMenu;
