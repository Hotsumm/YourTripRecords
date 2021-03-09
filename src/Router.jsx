import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import City from './routes/City';
import MyAccount from './routes/MyAccount';
import Upload from './routes/Upload';
import PostDetail from './routes/PostDetail';
import FullView from './routes/FullView';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/city/:cityName" exact component={City} />
        <Route path="/city/:city/:postId" exact component={PostDetail} />
        <Route
          path="/city/:cityName/:postId/:pictureId"
          exact
          component={FullView}
        />
        <Route path="/myaccount" exact component={MyAccount} />
        <Route path="/upload" exact component={Upload} />

        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
