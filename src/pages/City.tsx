import React, { useState, useEffect, useCallback } from 'react';
import {} from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import CityPost from '../components/City/CityPost';
import CityCategory from '../components/City/CityCategory';
import CityPostSort from '../components/City/CityPostSort';
import { firebaseFireStore } from '../firebaseConfig';
import Footer from '../components/Home/Footer';
import { sortByPopular, sortByLatest, sortByOldest } from '../utils/sortBy';
import Loading from '../components/Load/Loading';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CityContainer = styled.main`
  width: 100%;
  padding-top: 80px;
  max-width: 2560px;
  margin: 0 auto;
`;

const CityHeader = styled.header`
  @media (max-width: 1024px) {
    align-items: center;
    padding: 40px 0;
  }
  width: 100%;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CityName = styled.h1`
  white-space: pre;
  font-size: 40px;
  font-weight: 600;
`;

const City: React.FC = () => {
  const { cityName } = useParams() as { cityName: string };
  const { state } = useLocation() as any;

  const hashtags = state ? state.hashtags : undefined;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [selectSort, setSelectedSort] = useState<string>('최신순');
  const [selectedSeason, setSelectedSeason] = useState<string>('전체');
  const [hashtagList, setHashtagList] = useState<string[]>(
    hashtags ? hashtags : [],
  );

  const handleCurrentSort = useCallback(
    (sortName: string): void => {
      if (selectSort !== sortName) {
        setSelectedSort(sortName);
      }
    },
    [selectSort],
  );

  const handleHashtagSelect = useCallback(
    (hashtag: string) => {
      if (hashtagList.includes(hashtag)) {
        const hashtagFilter = hashtagList.filter(
          (element: string) => element !== hashtag,
        );
        setHashtagList([...hashtagFilter]);
        return;
      }
      setHashtagList((prev: string[]) => [...prev, hashtag]);
    },
    [hashtagList],
  );

  const handleSeasonSelect = useCallback(
    (season: string) => {
      if (selectedSeason !== season) {
        setSelectedSeason(season);
      }
    },
    [selectedSeason],
  );

  const fetchPost = useCallback(() => {
    setIsLoading(true);
    let postArr: IPost[] = [];

    firebaseFireStore
      .collection('records')
      .get()
      .then((postsRef) => {
        postsRef.forEach((doc) => {
          const postsData = doc.data() as IPost;
          postArr.push(postsData);
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

        if (selectSort === '최신순') {
          postArr.sort((next, prev) => sortByLatest(next, prev));
        } else if (selectSort === '오래된순') {
          postArr.sort((next, prev) => sortByOldest(next, prev));
        } else {
          postArr.sort((next, prev) => sortByPopular(next, prev));
        }
        setPosts(postArr);
      })
      .catch((error) => error.message)
      .finally(() => setIsLoading(false));
  }, [cityName, selectedSeason, hashtagList, selectSort]);

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
        <CityPostSort handleCurrentSort={handleCurrentSort} />
        {isLoading || !posts ? <Loading /> : <CityPost posts={posts} />}
        <Footer />
      </CityContainer>
    </>
  );
};

export default City;
