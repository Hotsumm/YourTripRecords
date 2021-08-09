import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import CityPost from '../components/City/CityPost';
import CityCategory from '../components/City/CityCategory';
import { firebaseFireStore } from '../firebaseConfig';
import Footer from '../components/Home/Footer';

const CityContainer = styled.div`
  width: 100%;
  padding-top: 80px;
  max-width: 1450px;
  margin: 0 auto;
`;

const CityHeader = styled.div`
  @media (max-width: 500px) {
    align-items: center;
    padding: 60px 0 40px 0;
  }
  width: 100vw;
  padding: 60px 0px 40px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CityName = styled.span`
  font-size: 40px;
  font-weight: 600;
`;

const City = ({ match, location }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('전체');
  const [hashtagList, setHashtagList] = useState(
    location.hashtag ? location.hashtag : [],
  );
  const cityName = match.params.cityName;

  const handleHashtagSelect = (hashtag) => {
    if (hashtagList.includes(hashtag)) {
      const hashtagFilter = hashtagList.filter(
        (element) => element !== hashtag,
      );
      setHashtagList([...hashtagFilter]);
      return;
    }
    setHashtagList((prev) => [...prev, hashtag]);
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const fetchPost = useCallback(() => {
    setLoading(true);
    let postArr = [];

    firebaseFireStore
      .collection('records')
      .get()
      .then((postsRef) => {
        postsRef.forEach((doc) => {
          postArr.push(doc.data());
        });

        if (cityName !== '전체') {
          postArr = postArr.filter((post) => post.city === cityName);
        }

        if (selectedSeason !== '전체') {
          postArr = postArr.filter((post) => post.season === selectedSeason);
        }

        if (hashtagList) {
          for (let hashtag of hashtagList) {
            postArr = postArr.filter((post) => post.hashtags.includes(hashtag));
          }
        }
        setPosts(postArr);
      })
      .catch((error) => error.message)
      .finally(() => setLoading(false));
  }, [cityName, selectedSeason, hashtagList]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      <Navigation show={true} />
      <CityContainer>
        <CityHeader>
          <CityName>{cityName} 여행기록</CityName>
        </CityHeader>
        <CityCategory
          cityName={cityName}
          handleSeasonSelect={handleSeasonSelect}
          hashtagList={hashtagList}
          handleHashtagSelect={handleHashtagSelect}
        />
        {posts && (
          <CityPost loading={loading} posts={posts} cityName={cityName} />
        )}
        <Footer />
      </CityContainer>
    </>
  );
};

export default City;
