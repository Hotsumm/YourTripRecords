import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiHeartFill } from 'react-icons/ri';
import Loading from '../Load/Loading';
import noPostImg from '../../static/assets/NoPost1.jpeg';

const CityPostContainer = styled.div`
  @media (max-width: 1024px) {
    padding: 0 30px 40px 30px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 40px 40px 40px;
`;

const NoPostWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoPostImgWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 400px;
  }
  @media (max-width: 500px) {
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

const NoPost = styled.p`
  white-space: pre;
  font-size: 4vw;
  margin-bottom: 10px;
  color: black;
`;

const CityPostWrap = styled.div`
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  width: 100%;
  display: grid;
  gap: 50px 30px;
  grid-template-columns: repeat(4, 1fr);
`;

const CityPostLink = styled(Link)`
  width: 100%;
`;

const PostIntro = styled.div`
  position: relative;
  @media (max-width: 500px) {
    width: 100%;
    align-items: center;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #16a085;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  }
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
`;

const Info = styled.span`
  font-size: 12px;
  :first-child {
    margin-top: 5px;
  }
  margin-bottom: 5px;
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

const CityPost = ({ loading, posts }) => {
  return (
    <CityPostContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts && posts.length > 0 ? (
            <CityPostWrap>
              {posts.map((post) => (
                <CityPostLink
                  key={post.postId}
                  to={{
                    pathname: `/city/${post.city}/${post.postId}`,
                    state: { cityName: post.city, post: post },
                  }}
                >
                  <PostIntro>
                    <PostThumbnail>
                      <img
                        src={post.pictureList[0].pictureURL}
                        alt={post.postId}
                      />
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
                          <Info>도시: {post.city}</Info>
                          <Info>여행계절: {post.season}</Info>
                        </InfoWrap>
                        <CreatorWrap>
                          <Avatar
                            src={post.creator.userObj.avatar}
                            alt="Avatar"
                          />
                          <Nickname>{post.creator.userObj.nickname}</Nickname>
                        </CreatorWrap>
                      </InfoContent>
                    </PostInfo>
                  </PostIntro>
                </CityPostLink>
              ))}
            </CityPostWrap>
          ) : (
            <NoPostWrap>
              <NoPost>아직 등록 된 게시물이 없습니다.</NoPost>
              <NoPost style={{ marginBottom: '40px' }}>
                첫 게시물을 등록 해보세요 !
              </NoPost>
              <NoPostImgWrap>
                <img src={noPostImg} alt="게시물 없음" />
              </NoPostImgWrap>
            </NoPostWrap>
          )}
        </>
      )}
    </CityPostContainer>
  );
};

export default CityPost;
