import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';

import { ThemeContext } from '@src/Context';
import { firebaseFireStore } from '@src/firebaseConfig';
import LikedUser from '@components/Detail/LikedUser';

interface PostInfoProps {
  postObj: IPost;
  userObj: IUserObj | null;
}

const PostInfo: React.FC<PostInfoProps> = ({ postObj, userObj }) => {
  const [postRef, setPostRef] = useState<any>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedUserList, setLikedUserList] = useState<string[]>([]);
  const [isLikesUser, setIsLikesUser] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(
    postObj.likes.length ? postObj.likes.length : 0,
  );

  const { theme } = useContext(ThemeContext);

  const toggleLikesUser = (): void => {
    if (likeCount === 0) return;
    setIsLikesUser(!isLikesUser);
  };

  const handleLikeClick = async (): Promise<void> => {
    if (!userObj) return alert('먼저 로그인을 해주세요.');

    if (isLiked) {
      const likeFilter = likedUserList.filter(
        (like) => like !== userObj.userId,
      );
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      await updateLikes([...likeFilter]);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      await updateLikes([...likedUserList, userObj.userId]);
    }
  };

  const updateLikes = async (likes: string[]): Promise<void> => {
    setLikedUserList(likes);
    return await postRef
      .update({
        likes,
      })
      .catch((error: Error) => alert(error.message));
  };

  useEffect(() => {
    const ref = firebaseFireStore.collection('records').doc(postObj.postId);
    setPostRef(ref);
    setLikedUserList(postObj.likes);

    const likeCheck = userObj
      ? postObj.likes.some((like) => like === userObj.userId)
      : null;

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
        <LikedUser
          likedUserList={likedUserList}
          toggleLikesUser={toggleLikesUser}
        />
      )}
    </>
  );
};

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

export default PostInfo;
