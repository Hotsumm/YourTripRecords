import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { cityArray } from '../utils/cityArray';
import CityPost from '../components/City/CityPost';
import { firebaseFireStore } from '../firebaseConfig';

const CityContainer = styled.div`
  width: 100%;
  padding-top: 80px;
`;

const CityHeader = styled.div`
  width: 100%;
  padding: 60px 0px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 30px 0;
`;

const CityName = styled.div`
  color: black;
  font-size: 40px;
  font-weight: 700;
`;

const City = ({ match }) => {
  const [postObj, setPostObj] = useState(null);
  const cityName = match.params.cityName;
  const thisCityObj = cityArray.filter((city) => city.name === cityName);
  const cityImgUrl = thisCityObj[0].imgUrl;

  const fetchPost = async () => {
    let allPost = [];
    await firebaseFireStore
      .collection('records')
      .get()
      .then((postsRef) => {
        postsRef.forEach((doc) => {
          const postData = {
            postId: doc.id,
            ...doc.data(),
          };
          allPost.push(postData);
        });
        const cityFilter = allPost.filter((post) => post.city === cityName);
        setPostObj(cityFilter);
      })
      .catch((error) => error.message);
  };

  useEffect(() => {
    fetchPost();
  }, [cityName]);

  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <CityContainer>
        <CityHeader>
          <CityName>{cityName} 둘러보기</CityName>
          <CityImg src={cityImgUrl}></CityImg>
        </CityHeader>
        {postObj && <CityPost postObj={postObj} />}s
      </CityContainer>
    </>
  );
};

export default City;
