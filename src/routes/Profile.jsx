import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import UserUploadedList from '../components/Profile/UserUploadedList';
import { UserContext } from '../Context';
import { firebaseFireStore } from '../firebaseConfig';
import ProfileMenu from '../components/Profile/ProfileMenu';
import ProfileIntro from '../components/Profile/ProfileIntro';
import Loading from '../components/Load/Loading';

const ProfileContainer = styled.div`
  width: 100%;
  background: #f1f2f6;
  max-width: 1450px;
  margin: 0 auto;
`;

const ProfileWrap = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 100px;
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {thisUser && (
            <ProfileContainer>
              <ProfileWrap>
                <ProfileMenu
                  userCheck={userCheck}
                  thisUser={thisUser}
                  userObj={userObj}
                />
              </ProfileWrap>
              <ProfileWrap>
                <ProfileIntro thisUser={thisUser} />
                <UserUploadedList userObj={userObj} thisUser={thisUser} />
              </ProfileWrap>
            </ProfileContainer>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
