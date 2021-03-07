import React from 'react';
import styled from 'styled-components';
import { RiHeartLine } from 'react-icons/ri';
import { GoComment } from 'react-icons/go';

const PostInfoContainer = styled.div`
  width: 100%;
`;

const PostInfoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 30px 0;
`;

const CountWrap = styled.div`
  display: flex;
  align-items: flex-end;
  svg {
    cursor: pointer;
    margin-right: 3px;
  }
`;

const LikeCount = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const CommentCount = styled.div`
  font-size: 20px;
  color: black;
`;
const CreatorWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;

  div {
    font-size: 14px;
    font-weight: 700;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const PostInfo = ({ postObj }) => {
  return (
    <PostInfoContainer>
      <PostInfoWrap>
        <CountWrap>
          <RiHeartLine size={'28'} style={{ color: '#ff4757' }} />
          <LikeCount>0</LikeCount>
          <GoComment size={'28'} style={{ color: '#2f3542' }} />
          <CommentCount>0</CommentCount>
        </CountWrap>
        <CreatorWrap>
          <img src={postObj.creator.userObj.avatar} alt="Avatar" />
          <div>{postObj.creator.userObj.nickname}</div>
        </CreatorWrap>
      </PostInfoWrap>
    </PostInfoContainer>
  );
};

export default PostInfo;
