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
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const userRef = await firebaseFireStore
            .collection('users')
            .doc(user.uid);
          userRef.get().then((doc) => {
            if (doc.exists) {
              const userData = {
                ...doc.data(),
              };
              setUserObj(userData);
            } else {
              console.log('No such document!');
            }
          });
        }
        setInit(true);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <UserContext.Provider value={{ userObj }}>
      <React.Fragment>
        <GlobalStyles />
        {init && <Router />}
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default App;
