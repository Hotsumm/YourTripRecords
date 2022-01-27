import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import CityPost from '../components/City/CityPost';
import CityCategory from '../components/City/CityCategory';
import CityPostSort from '../components/City/CityPostSort';
import { firebaseFireStore } from '../firebaseConfig';
import Footer from '../components/Home/Footer';
import { sortByPopular, sortByLatest, sortByOldest } from '../utils/sortBy';

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

interface MatchProps {
  cityName: string;
}

const City: React.FC<
  RouteComponentProps<MatchProps, {}, { hashtags: string[] | undefined }>
> = ({ match, location }) => {
  const { cityName } = match.params;
  const hashtags = location.state ? location.state.hashtags : undefined;

  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [selectSort, setSelectedSort] = useState<string>('최신순');
  const [selectedSeason, setSelectedSeason] = useState<string>('전체');
  const [hashtagList, setHashtagList] = useState<string[]>(
    hashtags ? hashtags : [],
  );

  const handleCurrentSort = (sortName: string): void =>
    setSelectedSort(sortName);

  const handleHashtagSelect = (hashtag: string) => {
    if (hashtagList.includes(hashtag)) {
      const hashtagFilter = hashtagList.filter(
        (element: string) => element !== hashtag,
      );
      setHashtagList([...hashtagFilter]);
      return;
    }
    setHashtagList((prev: string[]) => [...prev, hashtag]);
  };

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
  };

  const fetchPost = useCallback(() => {
    setLoading(true);
    let postArr: IPost[] = [];

    firebaseFireStore
      .collection('records')
      .get()
      .then((postsRef) => {
        postsRef.forEach((doc: any) => {
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
      .finally(() => setLoading(false));
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
        {posts && <CityPost loading={loading} posts={posts} />}
        <Footer />
      </CityContainer>
    </>
  );
};

export default City;
