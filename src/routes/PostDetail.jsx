import React, { useContext, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Comment from '../components/Detail/Comment';
import Preview from '../components/Detail/Preview';
import PostInfo from '../components/Detail/PostInfo';
import { UserContext } from '../Context';
import { firebaseFireStore } from '../firebaseConfig';

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const DetailWrap = styled.div`
  width: 100%;
  padding: 130px 250px 50px 250px;
`;

const DetailHeader = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
`;

const PostCreated = styled.div`
  color: gray;
`;

const PostTitle = styled.div`
  font-size: 24px;
`;

const DetailInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostDetail = ({ match }) => {
  const [postObj, setPostObj] = useState(null);
  const { userObj } = useContext(UserContext);
  const postId = match.params.postId;
  const pathName = match.url;

  const fetchPosts = useCallback(async () => {
    try {
      const postsRef = await firebaseFireStore
        .collection('records')
        .doc(postId);
      postsRef.get().then((doc) => {
        const postData = {
          postId,
          ...doc.data(),
        };
        setPostObj(postData);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <Navigation show={true} />
      {postObj && (
        <DetailContainer>
          <DetailWrap>
            <DetailHeader>
              <PostTitle>{postObj.postTitle}</PostTitle>
              <PostCreated>게시일 : {postObj.createdAt}</PostCreated>
            </DetailHeader>
            <DetailInfoWrap>
              <Preview postObj={postObj} pathName={pathName} />
              <PostInfo postObj={postObj} userObj={userObj} />
              <Comment />
            </DetailInfoWrap>
          </DetailWrap>
        </DetailContainer>
      )}
    </>
  );
};

export default PostDetail;
