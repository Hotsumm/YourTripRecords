import React from 'react';
import styled from 'styled-components';
import fakePostImg from '../../static/assets/fakepost.jpg';

const CityPostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;
  padding: 10px 40px;
`;
const CityPostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 280px;
  border: 1px solid #ababab80;
  border-radius: 10px;
`;
const PostIntro = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  padding: 30px;

  border-right: 1px solid #ababab80;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const PostThumbnail = styled.img`
  width: 250px;
  height: 200px;
  border-radius: 10px;
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;
const PostTitle = styled.span`
  font-size: 40px;
  margin-bottom: 20px;
`;
const PostDescription = styled.span`
  font-size: 20px;
`;

const CityPost = () => {
  return (
    <CityPostContainer>
      <CityPostWrap>
        <PostIntro>
          <PostThumbnail src={fakePostImg}></PostThumbnail>
          <PostInfo>
            <PostTitle>Fake Post 1</PostTitle>
            <PostDescription>Fake Description 1</PostDescription>
          </PostInfo>
        </PostIntro>
        <PostIntro>
          <PostThumbnail src={fakePostImg}></PostThumbnail>
          <PostInfo>
            <PostTitle>Fake Post 2</PostTitle>
            <PostDescription>Fake Description 1</PostDescription>
          </PostInfo>
        </PostIntro>
      </CityPostWrap>
    </CityPostContainer>
  );
};

export default CityPost;
