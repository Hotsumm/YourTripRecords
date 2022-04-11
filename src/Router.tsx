import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(
  () => import(/* webpackChunkName: "Home" */ './pages/Home'),
);
const City = loadable(
  () => import(/* webpackChunkName: "City" */ './pages/City'),
);
const Profile = loadable(
  () => import(/* webpackChunkName: "Profile" */ './pages/Profile'),
);
const MyAccount = loadable(
  () => import(/* webpackChunkName: "MyAccount" */ './pages/MyAccount'),
);
const AllPictures = loadable(
  () => import(/* webpackChunkName: "AllPictures" */ './pages/AllPictures'),
);
const PostEdit = loadable(
  () => import(/* webpackChunkName: "PostEdit" */ './pages/PostEdit'),
);
const PostDetail = loadable(
  () => import(/* webpackChunkName: "PostDetail" */ './pages/PostDetail'),
);
const Upload = loadable(
  () => import(/* webpackChunkName: "Upload" */ './pages/Upload'),
);

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
