import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Comment from '../components/Detail/Comment';
import Preview from '../components/Detail/Preview';
import PostInfo from '../components/Detail/PostInfo';
import { UserContext } from '../Context';
import { firebaseFireStore } from '../firebaseConfig';
import { BsThreeDots } from 'react-icons/bs';

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1450px;
  margin: 0 auto;
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

const PostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrap = styled.div`
  position: relative;
  padding: 2px 3px;
  margin-left: 15px;
  :hover {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
  cursor: pointer;
`;

const EditWrap = styled.div`
  position: absolute;
  width: 100px;
  border-radius: 5px;
  top: 170px;
  right: 140px;
  padding: 5px 0px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  ul {
    width: 100%;
  }
  li {
    font-size: 12px;
    padding: 5px 10px;
    cursor: pointer;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
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
  const [isEditClick, setIsEditClick] = useState(false);

  const history = useHistory();
  const postId = match.params.postId;
  const pathName = match.url;

  const handleDeletePost = async () => {
    const answer = window.confirm(
      '삭제 후 다시 복구할 수 없습니다.\n작성한 게시물을 삭제하시겠습니까?',
    );
    if (answer) {
      firebaseFireStore
        .collection('records')
        .doc(postId)
        .delete()
        .then(() => userPostDelete(userObj.userId, postId, postObj.city))
        .catch((error) => {
          console.log(error);
          alert('게시물 삭제에 실패하였습니다.');
        });
    }
  };

  const userPostDelete = async (userId, postId, city) => {
    const newRecords = userObj.records.filter((record) => record !== postId);
    firebaseFireStore
      .collection('users')
      .doc(userId)
      .update({
        records: newRecords,
      })
      .then(() => alert('게시물이 정상적으로 삭제되었습니다.'))
      .then(() => history.push(`/city/${city}`))
      .catch((error) => console.log(error));
  };

  const handleEdit = () => setIsEditClick(!isEditClick);

  const fetchPosts = useCallback(async () => {
    const postsRef = firebaseFireStore.collection('records').doc(postId);
    postsRef
      .get()
      .then((doc) => {
        const postData = {
          postId,
          ...doc.data(),
        };
        setPostObj(postData);
      })
      .catch((error) => console.log(error));
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
              <PostWrap>
                <PostCreated>게시일 : {postObj.createdAt}</PostCreated>
                {userObj && userObj.userId === postObj.creator.userObj.userId && (
                  <IconWrap>
                    <BsThreeDots onClick={handleEdit} size={26} />
                  </IconWrap>
                )}
                {isEditClick && (
                  <EditWrap>
                    <ul>
                      <Link
                        to={{
                          pathname: `/postEdit/${postObj.postId}`,
                          state: { postObj },
                        }}
                      >
                        <li>게시물 수정하기</li>
                      </Link>
                      <li onClick={handleDeletePost}>게시물 삭제하기</li>
                      <li onClick={handleEdit} style={{ color: 'red' }}>
                        취소
                      </li>
                    </ul>
                  </EditWrap>
                )}
              </PostWrap>
            </DetailHeader>
            <DetailInfoWrap>
              <Preview postObj={postObj} pathName={pathName} />
              <PostInfo postObj={postObj} userObj={userObj} />
              <Comment postId={postObj.postId} />
            </DetailInfoWrap>
          </DetailWrap>
        </DetailContainer>
      )}
    </>
  );
};

export default PostDetail;
