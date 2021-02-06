import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
