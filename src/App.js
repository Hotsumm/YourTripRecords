import React from 'react';
import Router from './Router';
import { GlobalStyles } from './global-styles';
import { firebaseAuth } from './firebaseConfig';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
};

export default App;
