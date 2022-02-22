import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import UserUploadedList from '../components/Profile/UserUploadedList';
import { firebaseFireStore } from '../firebaseConfig';
import ProfileMenu from '../components/Profile/ProfileMenu';
import ProfileIntro from '../components/Profile/ProfileIntro';
import Loading from '../components/Load/Loading';
import bgProfile from '../static/assets/bgProfile.jpg';
import { useUserContext } from '../hooks/useUserContext';

const ProfileContainer = styled.main`
  width: 100%;
  max-width: 2560px;
  margin: 0 auto;
`;

const ProfileHeader = styled.header`
  width: 100%;
`;

const ProfileBackground = styled.img`
  width: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  height: 350px;
`;

const ProfileWrap = styled.div`
  @media (max-width: 1200px) {
    padding: 50px;
  }
  @media (max-width: 768px) {
    padding: 50px 20px;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  position: absolute;
  padding: 50px 0px;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 99;
`;

const ProfileRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  padding: 0 100px;

  @media (max-width: 1024px) {
    padding: 0;
    :first-child {
      width: 100%;
    }
    :last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

interface MatchProps {
  userId: string;
}

const Profile: React.FC<RouteComponentProps<MatchProps, {}>> = ({ match }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [thisUser, setThisUser] = useState<any>(null);

  const { userObj } = useUserContext();

  const userCheck =
    userObj && thisUser ? thisUser.userId === userObj.userId : false;

  const fetchUser = useCallback(() => {
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
        <ProfileHeader>
          <ProfileBackground src={bgProfile} alt="프로필배경" />
        </ProfileHeader>
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
                  <UserUploadedList thisUser={thisUser} />
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
