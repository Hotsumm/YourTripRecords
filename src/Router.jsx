import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import City from './routes/City';
import MyAccount from './routes/MyAccount';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/city/:cityName" exact component={City} />
        <Route path="/myaccount" exact component={MyAccount} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
