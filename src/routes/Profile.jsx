import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import ProfileEdit from '../components/Profile/ProfileEdit';
import { UserContext } from '../Context';
import { IoLogoInstagram } from 'react-icons/io';
import { firebaseFireStore } from '../firebaseConfig';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  padding-top: 130px;
  width: 100%;
  height: 100%;
  background: #f1f2f6;
  text-align: center;
`;

const ProfileWrap = styled.div`
  width: 100%;
  height: 250px;
  padding: 10px 130px;
`;
const ProfileIntroWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 0px 130px;
`;

const ProfileIntro = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 400px;
  height: 240px;
  background: white;
`;
const IntroHeader = styled.div`
  text-align: left;
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Intro = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background: white;
  padding: 0px 50px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;
const AvatarWrap = styled.div`
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

const ProfileMenuWrap = styled.div`
  display: flex;
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

const Profile = ({ match }) => {
  const { userObj } = useContext(UserContext);
  const [isEditClick, setIsEditClick] = useState(false);
  const [thisUser, setThisUser] = useState(null);
  const userCheck =
    userObj && thisUser && userObj ? thisUser.userId === userObj.userId : false;

  const toggleProfileEdit = () => setIsEditClick(!isEditClick);

  const handleInstagram = () =>
    window.open(`https://www.instagram.com/${setThisUser.instagram}/`);

  const fetchUser = useCallback(async () => {
    const userRef = await firebaseFireStore
      .collection('users')
      .doc(match.params.id);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setThisUser(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [match.params.id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      {thisUser && (
        <ProfileContainer>
          <ProfileWrap>
            <AvatarContainer>
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
                        <IoLogoInstagram
                          size={18}
                          style={{ color: '#fd79a8' }}
                        />
                      </IconWrap>
                      <Instagram onClick={handleInstagram}>
                        @{thisUser.instagram}
                      </Instagram>
                    </AvatarInfoContent>
                  )}
                  <AvatarInfoContent>
                    <ContentTitle>포스팅</ContentTitle>
                    <PostConunt>0</PostConunt>
                  </AvatarInfoContent>
                </AvatarInfo>
              </AvatarWrap>
              {userCheck && (
                <ProfileMenuWrap>
                  <Link to={'/upload'}>
                    <ProfileMenu>
                      <span>여행기록 올리기</span>
                      <span>여행기록을 올리고 싶어요.</span>
                    </ProfileMenu>
                  </Link>
                  <ProfileMenu onClick={toggleProfileEdit}>
                    <span>프로필 변경</span>
                    <span>프로필을 변경하고 싶어요.</span>
                  </ProfileMenu>
                  <Link to={`/myAccount/${userObj.userId}`}>
                    <ProfileMenu>
                      <span>계정정보 변경</span>
                      <span>계정정보를 변경하고 싶어요.</span>
                    </ProfileMenu>
                  </Link>
                </ProfileMenuWrap>
              )}
            </AvatarContainer>
          </ProfileWrap>
          <ProfileIntroWrap>
            <ProfileIntro>
              <IntroHeader>소개</IntroHeader>
              <Intro>
                {thisUser.intro ? thisUser.intro : '소개글이 없습니다.'}
              </Intro>
            </ProfileIntro>
          </ProfileIntroWrap>
        </ProfileContainer>
      )}
      {isEditClick && <ProfileEdit toggleProfileEdit={toggleProfileEdit} />}
    </>
  );
};

export default Profile;
