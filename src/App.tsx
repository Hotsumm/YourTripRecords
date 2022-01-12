import React, { useState, useEffect } from 'react';
import Router from './Router';
import { GlobalStyles } from './styles/global-styles';
import { firebaseAuth } from './firebaseConfig';
import { firebaseFireStore } from './firebaseConfig';
import { UserContext, ThemeContext } from './Context';
import { useDarkMode } from './hooks/useDarkMode';

declare global {
  interface Window {
    kakao: any;
  }
}

export interface IUserObj {
  avatar: string;
  createdAt: string;
  email: string;
  intro?: string;
  isSocial: boolean;
  nickname: string;
  records: string[];
  userId: string;
}

const App: React.FC = () => {
  const [userObj, setUserObj] = useState<IUserObj | undefined>(undefined);
  const [init, setInit] = useState(false);
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
              setInit(true);
            } else {
              console.log('No such document!');
            }
          })
          .catch((error) => console.log(error));
      } else {
        setInit(true);
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ userObj, refreshUser }}>
        <React.Fragment>
          <GlobalStyles theme={theme} />
          {init && <Router />}
        </React.Fragment>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
