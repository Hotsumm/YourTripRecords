import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Comment from '../components/Detail/Comment';
import Hashtag from '../components/Detail/Hashtag';
import Preview from '../components/Detail/Preview';
import PostInfo from '../components/Detail/PostInfo';
import { UserContext, ThemeContext } from '../Context';
import { firebaseFireStore } from '../firebaseConfig';
import { BsThreeDots } from 'react-icons/bs';
import Footer from '../components/Home/Footer';
import Loading from '../components/Load/Loading';

const DetailContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1450px;
  margin: 0 auto;
`;

const DetailWrap = styled.article`
  @media (max-width: 1024px) {
    width: 80vw;
  }
  @media (max-width: 768px) {
    width: 95vw;
  }
  width: 65vw;
  padding: 80px 0;
`;

const DetailHeaderWrap = styled.header`
  position: relative;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
  width: 100%;
  display: flex;
  padding: 20px 10px 10px 10px;
  justify-content: space-between;
  align-items: center;
`;

const PostTitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & h1 {
    @media (max-width: 768px) {
      font-size: 20px;
    }
    font-size: 24px;
    white-space: pre;
  }
`;

const PostCreatedWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const IconWrap = styled.div`
  padding: 2px 3px;
  margin-left: 15px;
  :hover {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
  cursor: pointer;
`;

const PostCreated = styled.div`
  color: gray;
`;

const EditWrap = styled.div`
  background: ${(props) => props.theme.menuColor};
  position: absolute;
  z-index: 99;
  border-radius: 5px;
  top: 50px;
  right: 30px;
  padding: 5px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  li {
    font-size: 12px;
    padding: 5px 10px;
    cursor: pointer;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const DetailInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostDetail = ({ match }) => {
  const { userObj, refreshUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [postObj, setPostObj] = useState(null);
  const [isEditClick, setIsEditClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const postId = match.params.postId;
  const pathName = match.url;

  const handleDeletePost = () => {
    const answer = window.confirm(
      '삭제 후 다시 복구할 수 없습니다.\n작성한 게시물을 삭제하시겠습니까?',
    );
    if (answer) {
      setLoading(true);
      firebaseFireStore
        .collection('records')
        .doc(postId)
        .delete()
        .then(() => userPostDelete(userObj.userId, postId))
        .then(() => {
          refreshUser(true);
          alert('게시물이 정상적으로 삭제되었습니다.');
          setLoading(false);
          history.push(`/city/${postObj.city}`);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          alert('게시물 삭제에 실패하였습니다.');
        });
    }
  };

  const userPostDelete = async (userId, postId) => {
    const newRecords = userObj.records.filter((record) => record !== postId);
    await firebaseFireStore
      .collection('users')
      .doc(userId)
      .update({
        records: [...newRecords],
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = () => setIsEditClick(!isEditClick);

  const fetchPosts = useCallback(() => {
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
            {loading ? (
              <Loading />
            ) : (
              <>
                <DetailHeaderWrap>
                  <PostTitleWrap>
                    <h1>{postObj.postTitle}</h1>
                  </PostTitleWrap>
                  <PostCreatedWrap>
                    <PostCreated>게시일 : {postObj.createdAt}</PostCreated>
                    {userObj &&
                      userObj.userId === postObj.creator.userObj.userId && (
                        <IconWrap>
                          <BsThreeDots onClick={handleEdit} size={26} />
                        </IconWrap>
                      )}
                  </PostCreatedWrap>
                  {isEditClick && (
                    <EditWrap theme={theme}>
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
                </DetailHeaderWrap>
                <DetailInfoWrap>
                  <Preview postObj={postObj} pathName={pathName} />
                  <PostInfo postObj={postObj} userObj={userObj} />
                  {postObj.hashtags && <Hashtag postObj={postObj} />}
                  <Comment postId={postObj.postId} />
                </DetailInfoWrap>
              </>
            )}
          </DetailWrap>
          <Footer />
        </DetailContainer>
      )}
    </>
  );
};

export default PostDetail;
