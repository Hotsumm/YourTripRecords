import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiHeartFill } from 'react-icons/ri';

import noPostImg from '@assets/NoPost1.jpeg';

const CityPostContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CityPostWrap = styled.ul`
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 20px;
  }
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    width: 100%;
  }
  width: 100%;
  display: grid;
  gap: 50px 30px;
  padding: 0 40px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 40px;
`;

const CityPostLinkWrap = styled.li`
  width: 100%;
  cursor: pointer;
  border: 1px solid #16a085;
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  }
`;

const CityPostLink = styled(Link)`
  width: 100%;
`;

const PostIntro = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 500px) {
    align-items: center;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostThumbnail = styled.div`
  width: 100%;
  position: relative;
  ::before {
    content: '';
    display: block;
    margin-top: 75%;
  }
  & img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const PictureCountWrap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid white;
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 20px;
    color: white;
  }
`;

const HashtagWrap = styled.ul`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
`;

const Hashtag = styled.li`
  width: 100%;
  padding: 5px 10px;
  border: 1px solid white;
  color: white;
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const PostCountWrap = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: flex-end;

  svg {
    margin-right: 3px;
  }
`;

const LikeCount = styled.div`
  font-size: 14px;
  margin-right: 3px;
`;

const CommentCount = styled.div`
  font-size: 14px;
  color: #747d8c;
`;

const PostTitle = styled.div`
  font-size: 16px;
`;

const InfoContent = styled.div`
  width: 100%;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreatorWrap = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrap = styled.span`
  display: flex;
  flex-direction: column;
  & span {
    font-size: 12px;
    :first-child {
      margin-top: 5px;
    }
    margin-bottom: 5px;
  }
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;

const Nickname = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

// NoPost
const NoPostWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const NoPostImgWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
  @media (max-width: 576px) {
    width: 100%;
    height: 250px;
  }
  @media (max-width: 320px) {
    width: 100%;
    height: 150px;
  }
  width: 768px;
  height: 500px;
  border-radius: 10px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const NoPost = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  & p {
    white-space: pre;
    line-height: 150%;
    text-align: center;
    font-size: 2rem;
    color: black;
  }
`;

interface CityPostProps {
  posts: IPost[];
}

const CityPost: React.FC<CityPostProps> = ({ posts }) => {
  return (
    <CityPostContainer>
      {posts && posts.length > 0 ? (
        <CityPostWrap>
          {posts.map((post) => (
            <CityPostLinkWrap key={post.postId}>
              <CityPostLink to={`/city/${post.city}/${post.postId}`}>
                <PostIntro>
                  <PostThumbnail>
                    <img src={post.pictureList[0].pictureURL} alt="썸네일" />
                    <PictureCountWrap>
                      <span>+{post.pictureList.length - 1}</span>
                    </PictureCountWrap>
                  </PostThumbnail>
                  {post.hashtags && (
                    <HashtagWrap>
                      {post.hashtags.map((hashtag, index) => (
                        <Hashtag key={index}>{hashtag}</Hashtag>
                      ))}
                    </HashtagWrap>
                  )}
                  <PostInfo>
                    <PostCountWrap>
                      <RiHeartFill size={'16'} style={{ color: '#ff4757' }} />
                      <LikeCount>{post.likes.length}</LikeCount>
                      <CommentCount>({post.comments.length})</CommentCount>
                    </PostCountWrap>
                    <PostTitle>
                      {post.postTitle.length > 15
                        ? `${post.postTitle.substring(0, 15)}...`
                        : post.postTitle}
                    </PostTitle>
                    <InfoContent>
                      <InfoWrap>
                        <span>도시: {post.city}</span>
                        <span>여행계절: {post.season}</span>
                      </InfoWrap>
                      <CreatorWrap>
                        <Avatar
                          src={post.creator.userObj.avatar}
                          alt="프로필 사진"
                        />
                        <Nickname>{post.creator.userObj.nickname}</Nickname>
                      </CreatorWrap>
                    </InfoContent>
                  </PostInfo>
                </PostIntro>
              </CityPostLink>
            </CityPostLinkWrap>
          ))}
        </CityPostWrap>
      ) : (
        <NoPostWrap>
          <NoPost>
            <p>
              아직 등록 된 게시물이 없습니다. <br />첫 게시물을 등록해보세요!
            </p>
          </NoPost>
          <NoPostImgWrap>
            <img src={noPostImg} alt="게시물 없음" />
          </NoPostImgWrap>
        </NoPostWrap>
      )}
    </CityPostContainer>
  );
};

export default CityPost;
