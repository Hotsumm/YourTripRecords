import React, { useState, useEffect } from 'react';
import Router from './Router';
import { GlobalStyles } from './global-styles';
import { firebaseAuth } from './firebaseConfig';
import { firebaseFireStore } from './firebaseConfig';
import { UserContext } from './Context';

const App = () => {
  const [userObj, setUserObj] = useState('');
  const [init, setInit] = useState(false);

  useEffect(() => {
    try {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const data = firebaseAuth.currentUser;
          let allUser = [];
          const usersRef = await firebaseFireStore.collection('users').get();
          usersRef.forEach((doc) => allUser.push(doc.data()));
          const user = allUser.filter((user) => user.email === data.email);
          setUserObj(...user);
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
