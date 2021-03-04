import React from 'react';
import styled from 'styled-components';

const CityPostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 40px;
`;

const NoPost = styled.div`
  font-size: 60px;
  color: black;
`;

const CityPostWrap = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 250px);
`;
const PostIntro = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  }
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 5px;
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
`;
const PostTitle = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
`;

const PostCreatorWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    font-size: 16px;
    font-weight: 700;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const CityPost = ({ postObj, cityName }) => {
  return (
    <CityPostContainer>
      {postObj.length > 0 ? (
        <CityPostWrap>
          {postObj.map((post) => (
            <>
              <PostIntro>
                <PostThumbnail
                  src={post.pictureList[0].pictureURL}
                ></PostThumbnail>
                <PostInfo>
                  <PostTitle>
                    {post.postTitle.length > 15
                      ? `${post.postTitle.substring(0, 15)}...`
                      : post.postTitle}
                  </PostTitle>
                  <PostCreatorWrap>
                    <img src={post.creator.userObj.avatar} alt="Avatar" />
                    <div>{post.creator.userObj.nickname}</div>
                  </PostCreatorWrap>
                </PostInfo>
              </PostIntro>
            </>
          ))}
        </CityPostWrap>
      ) : (
        <NoPost>'{cityName}'의 첫 게시물을 올려주세요.</NoPost>
      )}
    </CityPostContainer>
  );
};

export default CityPost;
