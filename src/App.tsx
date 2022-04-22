import React, { useState, useEffect } from 'react';
import Router from '@src/Router';
import { firebaseAuth, firebaseFireStore } from '@src/firebaseConfig';
import { UserContext, ThemeContext } from '@src/Context';
import { GlobalStyles } from '@styles/global-styles';
import { useDarkMode } from '@hooks/useDarkMode';

const App: React.FC = () => {
  const [userObj, setUserObj] = useState<IUserObj | null>(null);
  const { theme, toggleTheme } = useDarkMode();

  useEffect(() => refreshUser(true), []);

  const refreshUser = (sign: boolean) => {
    if (!sign) return;
    firebaseAuth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        const userRef = firebaseFireStore.collection('users').doc(user.uid);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData: any = { ...doc.data() };
              setUserObj(userData);
            } else {
              console.log('No such document!');
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ userObj, refreshUser }}>
        <React.Fragment>
          <GlobalStyles theme={theme} />
          <Router />
        </React.Fragment>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
