import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import UserUploadedList from '../components/Profile/UserUploadedList';
import { UserContext } from '../Context';
import { firebaseFireStore } from '../firebaseConfig';
import ProfileMenu from '../components/Profile/ProfileMenu';
import ProfileIntro from '../components/Profile/ProfileIntro';

const ProfileContainer = styled.div`
  width: 100%;
  background: #f1f2f6;
`;

const ProfileWrap = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 100px;
`;

const Profile = ({ match }) => {
  const { userObj } = useContext(UserContext);
  const [thisUser, setThisUser] = useState(null);
  const userCheck =
    userObj && thisUser ? thisUser.userId === userObj.userId : false;

  const fetchUser = useCallback(async () => {
    const userRef = await firebaseFireStore
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
      });
  }, [match.params.userId]);
  console.log(thisUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Navigation show={true} />
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
  );
};

export default Profile;
