import React, { useEffect, useState, useCallback, useContext } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Comment from '../components/Detail/Comment';
import Hashtag from '../components/Detail/Hashtag';
import Preview from '../components/Detail/Preview';
import PostInfo from '../components/Detail/PostInfo';
import { firebaseFireStore } from '../firebaseConfig';
import PostDetailEdit from '../components/Detail/PostDetailEdit';
import Footer from '../components/Home/Footer';
import Loading from '../components/Load/Loading';
import { UserContext } from '../Context';

const DetailContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 2560px;
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
  padding: 100px 0;
`;

const DetailHeaderWrap = styled.header`
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & h2 {
    @media (max-width: 768px) {
      font-size: 20px;
    }
    font-size: 24px;
    white-space: pre;
  }
`;

const PostCreatedWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0 10px;
  align-items: center;
`;

const PostCreated = styled.span`
  width: 100%;
  color: gray;
  text-align: right;
`;

const DetailInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface MatchProps {
  postId: string;
  pathName: string;
}

const PostDetail: React.FC<RouteComponentProps<MatchProps, {}>> = ({
  match,
}) => {
  const { userObj, refreshUser } = useContext(UserContext);
  const [postObj, setPostObj] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useHistory();
  const { postId } = match.params;
  const pathName = match.url;

  const handleDeletePost = () => {
    if (!userObj) return;

    const answer = window.confirm(
      '삭제 후 다시 복구할 수 없습니다.\n작성한 게시물을 삭제하시겠습니까?',
    );
    if (answer) {
      setIsLoading(true);
      firebaseFireStore
        .collection('records')
        .doc(postId)
        .delete()
        .then(() => userPostDelete(userObj.userId, postId))
        .then(() => {
          refreshUser(true);
          alert('게시물이 정상적으로 삭제되었습니다.');
          setIsLoading(false);
          history.push(`/city/${postObj?.city}`);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          alert('게시물 삭제에 실패하였습니다.');
        });
    }
  };

  const userPostDelete = async (userId: string, postId: string) => {
    if (!userObj) return;

    const newRecords = userObj.records.filter(
      (record: string) => record !== postId,
    );

    await firebaseFireStore
      .collection('users')
      .doc(userId)
      .update({
        records: [...newRecords],
      })
      .catch((error) => console.log(error));
  };

  const fetchPosts = useCallback(() => {
    setIsLoading(true);
    firebaseFireStore
      .collection('records')
      .doc(postId)
      .get()
      .then((doc) => {
        const postData: any = doc.data()
          ? {
              postId,
              ...doc.data(),
            }
          : null;
        setPostObj(postData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <DetailHeaderWrap>
                  <PostTitleWrap>
                    <h2>{postObj.postTitle}</h2>
                  </PostTitleWrap>
                  <PostCreatedWrap>
                    <PostCreated>게시일 : {postObj.createdAt}</PostCreated>
                    {userObj &&
                      userObj.userId === postObj.creator.userObj.userId && (
                        <PostDetailEdit
                          postObj={postObj}
                          handleDeletePost={handleDeletePost}
                        />
                      )}
                  </PostCreatedWrap>
                </DetailHeaderWrap>
                <DetailInfoWrap>
                  <Preview postObj={postObj} pathName={pathName} />
                  <PostInfo postObj={postObj} userObj={userObj} />
                  {postObj.hashtags && <Hashtag postObj={postObj} />}
                  <Comment
                    postObj={postObj}
                    userObj={userObj ? userObj : null}
                  />
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
