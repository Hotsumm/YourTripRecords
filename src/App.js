import React, { useState, useEffect } from 'react';
import Router from './Router';
import { GlobalStyles } from './global-styles';
import { firebaseAuth } from './firebaseConfig';
import { firebaseFireStore } from './firebaseConfig';
import { UserContext } from './Context';

const App = () => {
  const [userObj, setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    try {
      let allUser = [];
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const usersRef = await firebaseFireStore.collection('users').get();
          usersRef.forEach((doc) => {
            const userData = {
              id: doc.id,
              ...doc.data(),
            };
            allUser.push(userData);
          });
          const currentUser = allUser.filter(
            (data) => data.userId === user.uid,
          );
          setUserObj(...currentUser);
        }
        setInit(true);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userObj }}>
        <GlobalStyles />
        {init && <Router />}
      </UserContext.Provider>
    </>
  );
};

export default App;
