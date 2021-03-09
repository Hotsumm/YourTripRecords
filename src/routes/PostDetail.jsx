import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Comment from '../components/Detail/Comment';
import Preview from '../components/Detail/Preview';
import PostInfo from '../components/Detail/PostInfo';

const DetailContainer = styled.div`
  width: 100%;
  height: 150vh;
  padding-top: 80px;
`;
const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 250px 0 250px;
`;
const DetailInfoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DetailHeader = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
`;

const PostCreated = styled.div``;

const PostTitle = styled.div`
  font-size: 24px;
`;

const DetailInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PostDetail = ({ match, location }) => {
  const postObj = location.state.post;
  const pathName = location.pathname;
  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <DetailContainer>
        <DetailWrap>
          <DetailInfoContainer>
            <DetailHeader>
              <PostTitle>{postObj.postTitle}</PostTitle>
              <PostCreated>게시일 : {postObj.createdAt}</PostCreated>
            </DetailHeader>
            <DetailInfoWrap>
              <Preview postObj={postObj} pathName={pathName} />
              <PostInfo postObj={postObj} />
              <Comment />
            </DetailInfoWrap>
          </DetailInfoContainer>
        </DetailWrap>
      </DetailContainer>
    </>
  );
};

export default PostDetail;
