import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileEdit from './ProfileEdit';
import { IoLogoInstagram } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ProfileMenuContainer = styled.div`
  width: 100%;
  padding-top: 100px;
`;

const ProfileMenuWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  padding: 20px 30px;
`;

const AvatarWrap = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const AvatarInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 30px 0 20px;
`;

const AvatarInfoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
`;
const ContentTitle = styled.div`
  color: gray;
`;

const Nickname = styled.div`
  font-size: 28px;
  color: black;
  margin-top: 5px;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Instagram = styled.div`
  font-size: 18px;
  color: black;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  margin-top: 5px;
`;

const PostConunt = styled.div`
  font-size: 20px;
  margin-top: 5px;
  color: black;
`;

const MenuWrap = styled.div`
  display: flex;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 170px;
  height: 170px;
  border: 1px solid #ababab80;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-right: 50px;
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
`;

const ProfileMenu = ({ userCheck, thisUser, userObj }) => {
  const [isEditClick, setIsEditClick] = useState(false);

  const toggleProfileEdit = () => setIsEditClick(!isEditClick);

  const handleInstagram = () =>
    window.open(`https://www.instagram.com/${thisUser.instagram}/`);

  return (
    <>
      <ProfileMenuContainer>
        <ProfileMenuWrap>
          <AvatarWrap>
            <Avatar src={thisUser.avatar}></Avatar>
            <AvatarInfo>
              <AvatarInfoContent>
                <ContentTitle>닉네임</ContentTitle>
                <Nickname>{thisUser.nickname}</Nickname>
              </AvatarInfoContent>
              {thisUser.instagram && (
                <AvatarInfoContent>
                  <IconWrap>
                    <ContentTitle>인스타그램</ContentTitle>
                    <IoLogoInstagram size={18} style={{ color: '#fd79a8' }} />
                  </IconWrap>
                  <Instagram onClick={handleInstagram}>
                    @{thisUser.instagram}
                  </Instagram>
                </AvatarInfoContent>
              )}
              <AvatarInfoContent>
                <ContentTitle>포스팅</ContentTitle>
                <PostConunt>{thisUser.records.length}</PostConunt>
              </AvatarInfoContent>
            </AvatarInfo>
          </AvatarWrap>
          {userCheck && (
            <MenuWrap>
              <Link to={'/upload'}>
                <Menu>
                  <span>여행기록 올리기</span>
                  <span>여행기록을 올리고 싶어요.</span>
                </Menu>
              </Link>
              <Menu onClick={toggleProfileEdit}>
                <span>프로필 변경</span>
                <span>프로필을 변경하고 싶어요.</span>
              </Menu>
              <Link to={`/myAccount/${userObj.userId}`}>
                <Menu>
                  <span>계정정보 변경</span>
                  <span>계정정보를 변경하고 싶어요.</span>
                </Menu>
              </Link>
            </MenuWrap>
          )}
        </ProfileMenuWrap>
      </ProfileMenuContainer>
      {isEditClick && <ProfileEdit toggleProfileEdit={toggleProfileEdit} />}
    </>
  );
};

export default ProfileMenu;
