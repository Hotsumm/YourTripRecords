import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import City from './routes/City';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/city/:cityName" exact component={City} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
