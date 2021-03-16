import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import City from './routes/City';
import Profile from './routes/Profile';
import Upload from './routes/Upload';
import PostDetail from './routes/PostDetail';
import FullView from './routes/FullView';
import MyAccount from './routes/MyAccount';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/city/:cityName" exact component={City} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/myAccount/:userId" exact component={MyAccount} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/city/:city/:postId" exact component={PostDetail} />
        <Route
          path="/city/:cityName/:postId/:pictureId"
          exact
          component={FullView}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
