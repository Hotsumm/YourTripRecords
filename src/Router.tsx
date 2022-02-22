import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import City from './pages/City';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import PostDetail from './pages/PostDetail';
import AllPictures from './pages/AllPictures';
import MyAccount from './pages/MyAccount';
import PostEdit from './pages/PostEdit';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/city/:cityName" exact component={City} />
        <Route path="/profile/:userId" exact component={Profile} />
        <Route path="/myAccount/:userId" exact component={MyAccount} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/postEdit/:postId" exact component={PostEdit} />
        <Route path="/city/:cityName/:postId" exact component={PostDetail} />
        <Route
          path="/city/:cityName/:postId/:pictureId"
          exact
          component={AllPictures}
        />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
