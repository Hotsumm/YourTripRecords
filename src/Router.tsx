import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '@components/Load/Loading';

const Home = React.lazy(() => import('@pages/Home'));
const City = React.lazy(() => import('@pages/City'));
const Profile = React.lazy(() => import('@pages/Profile'));
const MyAccount = React.lazy(() => import('@pages/MyAccount'));
const AllPictures = React.lazy(() => import('@pages/AllPictures'));
const PostEdit = React.lazy(() => import('@pages/PostEdit'));
const PostDetail = React.lazy(() => import('@pages/PostDetail'));
const Upload = React.lazy(() => import('@pages/Upload'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default Router;
