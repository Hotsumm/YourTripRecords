import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { firebaseFireStore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

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
    margin-right: 7px;
  }
`;

const LikeCount = styled.div`
  font-size: 18px;
  margin-right: 20px;
`;

const CommentCount = styled.div`
  font-size: 18px;
  color: black;
`;
const CreatorWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
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

const PostInfo = ({ postObj, userObj }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    postObj.likes.length ? postObj.likes.length : 0,
  );
  const likeList = postObj.likes;

  const handleLike = async () => {
    if (!userObj) {
      alert('먼저 로그인을 해주세요.');
      return;
    }
    const likesRef = firebaseFireStore
      .collection('records')
      .doc(postObj.postId);

    if (isLiked) {
      setIsLiked((isLiked) => !isLiked);
      setLikeCount((likeCount) => likeCount - 1);
      const likeFilter = likeList.filter((like) => like !== userObj.userId);
      await likesRef
        .update({
          likes: [...likeFilter],
        })
        .catch((error) => alert(error.message));
    } else {
      setIsLiked((isLiked) => !isLiked);
      setLikeCount((likeCount) => likeCount + 1);
      await likesRef
        .update({
          likes: [...likeList, userObj.userId],
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    if (userObj) {
      const likeCheck = postObj.likes.some((like) => like === userObj.userId);
      if (likeCheck) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [postObj, userObj]);

  return (
    <PostInfoContainer>
      <PostInfoWrap>
        <CountWrap>
          {isLiked ? (
            <BsHeartFill
              onClick={handleLike}
              size={'22'}
              style={{ color: '#eb4d4b', cursor: 'pointer' }}
            />
          ) : (
            <BsHeart
              onClick={handleLike}
              size={'22'}
              style={{ color: '#2f3542', cursor: 'pointer' }}
            />
          )}
          <LikeCount>{likeCount}</LikeCount>
          <GoComment size={'23'} style={{ color: '#2f3542' }} />
          <CommentCount>0</CommentCount>
        </CountWrap>
        <Link to={`/profile/${postObj.creator.userObj.id}`}>
          <CreatorWrap>
            <img src={postObj.creator.userObj.avatar} alt="Avatar" />
            <div>{postObj.creator.userObj.nickname}</div>
          </CreatorWrap>
        </Link>
      </PostInfoWrap>
    </PostInfoContainer>
  );
};

export default PostInfo;
