import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import UserUploadedList from '../components/Profile/UserUploadedList';
import { UserContext } from '../Context';
import { firebaseFireStore } from '../firebaseConfig';
import ProfileMenu from '../components/Profile/ProfileMenu';
import ProfileIntro from '../components/Profile/ProfileIntro';
import Loading from '../components/Load/Loading';
import bgProfile from '../static/assets/bgProfile.jpg';

const ProfileContainer = styled.div`
  width: 100%;
  background: white;
  max-width: 1450px;
  margin: 0 auto;
`;
const ProfileBackground = styled.img`
  width: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  height: 350px;
`;

const ProfileWrap = styled.div`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  position: absolute;
  padding: 50px 100px;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 99;
`;

const ProfileRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

const Profile = ({ match }) => {
  const { userObj } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [thisUser, setThisUser] = useState(null);

  const userCheck =
    userObj && thisUser ? thisUser.userId === userObj.userId : false;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    const userRef = firebaseFireStore
      .collection('users')
      .doc(match.params.userId);
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
      })
      .finally(() => setIsLoading(false));
  }, [match.params.userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Navigation show={true} />
      <ProfileContainer>
        <ProfileBackground src={bgProfile} alt="프로필배경" />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {thisUser && (
              <ProfileWrap>
                <ProfileRow>
                  <ProfileMenu
                    userCheck={userCheck}
                    thisUser={thisUser}
                    userObj={userObj}
                  />
                </ProfileRow>
                <ProfileRow>
                  <ProfileIntro thisUser={thisUser} />
                  <UserUploadedList userObj={userObj} thisUser={thisUser} />
                </ProfileRow>
              </ProfileWrap>
            )}
          </>
        )}
      </ProfileContainer>
    </>
  );
};

export default Profile;
