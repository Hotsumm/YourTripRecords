import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { firebaseFireStore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import LikesUser from './LikesUser';
import { ThemeContext } from '../../Context';
import { useUserContext } from '../../hooks/useUserContext';

const PostInfoContainer = styled.div`
  width: 100%;
`;

const PostInfoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
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
  :hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const CommentCount = styled.div`
  font-size: 18px;
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

interface PostInfoProps {
  postObj: IPost;
}

const PostInfo: React.FC<PostInfoProps> = ({ postObj }) => {
  const [postRef, setPostRef] = useState<any>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedUserList, setLikedUserList] = useState<string[]>([]);
  const [isLikesUser, setIsLikesUser] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(
    postObj.likes.length ? postObj.likes.length : 0,
  );

  const { userObj } = useUserContext();
  const { theme } = useContext(ThemeContext);

  const isUserCheck = (): boolean => (userObj ? true : false);

  const toggleLikesUser = (): void => {
    if (likeCount === 0) return;
    setIsLikesUser(!isLikesUser);
  };

  const handleLikeClick = (): void => {
    if (!isUserCheck()) return alert('먼저 로그인을 해주세요.');

    if (isLiked) {
      const likeFilter = likedUserList.filter(
        (like) => like !== userObj.userId,
      );
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      updateLikes([...likeFilter]);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      updateLikes([...likedUserList, userObj.userId]);
    }
  };

  const updateLikes = (likes: string[]) => {
    setLikedUserList(likes);
    return postRef
      .update({
        likes,
      })
      .catch((error: Error) => alert(error.message));
  };

  useEffect(() => {
    if (!userObj) return;
    const ref = firebaseFireStore.collection('records').doc(postObj.postId);
    setPostRef(ref);
    setLikedUserList(postObj.likes);

    const likeCheck = postObj.likes.some((like) => like === userObj.userId);
    if (likeCheck) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [postObj, userObj]);

  return (
    <>
      {postObj && (
        <PostInfoContainer>
          <PostInfoWrap>
            <CountWrap>
              {isLiked ? (
                <BsHeartFill
                  onClick={handleLikeClick}
                  size={'22'}
                  style={{ color: '#eb4d4b', cursor: 'pointer' }}
                />
              ) : (
                <BsHeart
                  onClick={handleLikeClick}
                  size={'22'}
                  style={{ color: theme.textColor, cursor: 'pointer' }}
                />
              )}
              <LikeCount onClick={toggleLikesUser}>{likeCount}</LikeCount>
              <GoComment size={'23'} style={{ color: theme.textColor }} />
              <CommentCount>{postObj.comments.length}</CommentCount>
            </CountWrap>
            <Link to={`/profile/${postObj.creator.userObj.userId}`}>
              <CreatorWrap>
                <img src={postObj.creator.userObj.avatar} alt="Avatar" />
                <div>{postObj.creator.userObj.nickname}</div>
              </CreatorWrap>
            </Link>
          </PostInfoWrap>
        </PostInfoContainer>
      )}
      {isLikesUser && (
        <LikesUser
          likedUserList={likedUserList}
          toggleLikesUser={toggleLikesUser}
        />
      )}
    </>
  );
};

export default PostInfo;
