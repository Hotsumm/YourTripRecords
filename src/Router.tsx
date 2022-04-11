import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import City from './pages/City';
import Profile from './pages/Profile';
import MyAccount from './pages/MyAccount';
import AllPictures from './pages/AllPictures';
import PostEdit from './pages/PostEdit';
import PostDetail from './pages/PostDetail';
import Upload from './pages/Upload';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/city/:cityName" element={<City />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/myAccount/:userId" element={<MyAccount />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/postEdit/:postId" element={<PostEdit />} />
      <Route path="/city/:cityName/:postId" element={<PostDetail />} />
      <Route
        path="/city/:cityName/:postId/:pictureId"
        element={<AllPictures />}
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
