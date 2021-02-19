import React, { useState, useEffect, useContext } from 'react';
import Router from './Router';
import { GlobalStyles } from './global-styles';
import { firebaseAuth } from './firebaseConfig';
import { UserContext } from './Context';

const App = () => {
  const [userObj, setUserObj] = useState('');
  const [init, setInit] = useState(false);
  useEffect(() => {
    try {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          console.log('로그인됨 ');
          const data = firebaseAuth.currentUser;
          setUserObj(data);
        }
        setInit(true);
      });
    } catch (error) {
      console.log(error);
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
