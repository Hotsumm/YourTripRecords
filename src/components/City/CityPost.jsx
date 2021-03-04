import React from 'react';
import styled from 'styled-components';

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

const CityPost = ({ postObj }) => {
  return (
    <CityPostContainer>
      <CityPostWrap>
        {postObj.map((post) => (
          <PostIntro>
            <PostThumbnail src={post.pictureList[0].pictureURL}></PostThumbnail>
            <PostInfo>
              <PostTitle>{post.postTitle}</PostTitle>
              <PostDescription>
                {post.pictureList[0].description}
              </PostDescription>
            </PostInfo>
          </PostIntro>
        ))}
      </CityPostWrap>
    </CityPostContainer>
  );
};

export default CityPost;
