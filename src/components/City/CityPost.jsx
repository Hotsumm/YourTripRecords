import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiHeartFill } from 'react-icons/ri';
import Loading from '../Load/Loading';
import noPostImg from '../../static/assets/NoPost1.jpeg';

const CityPostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px;
`;

const NoPostWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoPostImg = styled.img`
  width: 750px;
  height: 400px;
  border-radius: 10px;
`;

const NoPost = styled.p`
  font-size: 30px;
  margin-bottom: 10px;
  color: black;
`;

const CityPostWrap = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(4, 1fr);
`;
const PostIntro = styled.div`
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

const PostThumbnail = styled.img`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
`;

const HashtagWrap = styled.ul`
  position: absolute;
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

const CityPost = ({ loading, posts, cityName }) => {
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <CityPostContainer>
          {posts && posts.length > 0 ? (
            <CityPostWrap>
              {posts.map((post) => (
                <Link
                  key={post.postId}
                  to={{
                    pathname: `/city/${post.city}/${post.postId}`,
                    state: { cityName: post.city, post: post },
                  }}
                >
                  <PostIntro>
                    <PostThumbnail src={post.pictureList[0].pictureURL} />
                    {post.hashtags && (
                      <HashtagWrap>
                        {post.hashtags.map((hashtag) => (
                          <Hashtag>{hashtag}</Hashtag>
                        ))}
                      </HashtagWrap>
                    )}
                    <PostInfo>
                      <PostCountWrap>
                        <RiHeartFill size={'16'} style={{ color: '#ff4757' }} />
                        <LikeCount>{post.likes.length}</LikeCount>
                        <CommentCount>(0)</CommentCount>
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
                </Link>
              ))}
            </CityPostWrap>
          ) : (
            <NoPostWrap>
              <NoPost>아직 등록 된 게시물이 없습니다.</NoPost>
              <NoPost style={{ marginBottom: '40px' }}>
                첫 게시물을 등록 해보세요 !
              </NoPost>
              <NoPostImg src={noPostImg} />
            </NoPostWrap>
          )}
        </CityPostContainer>
      )}
    </>
  );
};

export default CityPost;
