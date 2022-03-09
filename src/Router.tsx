import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
    </BrowserRouter>
  );
};

export default Router;
