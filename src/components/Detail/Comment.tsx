import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Load/Loading';
import styled from 'styled-components';
import { firebaseFireStore } from '../../firebaseConfig';
import { getCreatedDay } from '../../utils/getCreatedDay';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { HiX } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from '../../hooks/useUserContext';

const CommentContainer = styled.section`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const CommentHeaderWrap = styled.header`
  width: 100%;
  margin-top: 20px;
  & h2 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const CommentCreatorWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 0;
  gap: 0 15px;
  & button {
    white-space: pre;
    border: 1px solid #16a085;
    border-radius: 5px;
    color: #16a085;
    padding: 10px;
    :hover {
      background: #16a085;
      color: white;
      border: none;
    }
  }
`;

const CommentInputWrap = styled.div`
  width: 100%;
  & input {
    padding: 10px;
    -webkit-appearance: none;
    width: 100%;
    font-size: 16px;
    border: none;
    line-height: 10px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
`;

const CommentWrap = styled.ul`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ababab80;
  border-radius: 5px;
`;
const CommentList = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0 15px;
  padding: 5px 0;
`;

const ContentInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentInfo = styled.div`
  width: 100%;
  padding: 0 0 5px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ababab80;
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  & img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;

const Author = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
  :hover {
    text-decoration: underline;
  }
`;

const CreatedAt = styled.span`
  font-size: 10px;
  color: #636e72;
  margin-right: 10px;
`;

const Content = styled.div`
  padding: 10px 0;
  font-size: 15px;
`;

interface CommentProps {
  postObj: IPost;
}

const Comment: React.FC<CommentProps> = ({ postObj }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignInClick, setIsSignInClick] = useState<boolean>(false);
  const [isSignUpClick, setIsSignUpClick] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const { userObj } = useUserContext();

  const toggleSignIn = () => setIsSignInClick(!isSignInClick);
  const toggleSignUp = () => setIsSignUpClick(!isSignUpClick);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleComments();
    }
  };

  const handleDeleteComment = (commentId: string) => {
    const answer = window.confirm('작성한 댓글을 삭제하시겠습니까?');
    if (answer) {
      const newComments = comments.filter(
        (comment) => comment.commentId !== commentId,
      );
      firebaseFireStore
        .collection('records')
        .doc(postObj.postId)
        .update({
          comments: newComments,
        })
        .then(() => {
          setComments(newComments);
          setCommentCount(commentCount - 1);
          alert('댓글이 삭제되었습니다.');
        })
        .catch((error) => {
          console.log(error);
          alert('오류가 발생했습니다.');
        });
    }
  };

  const fetchComments = useCallback(() => {
    setIsLoading(true);
    const commentsRef = firebaseFireStore
      .collection('records')
      .doc(postObj.postId);
    commentsRef
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          setComments(doc.data().comments);
          setCommentCount(doc.data().comments.length);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [postObj.postId]);

  const handleComments = () => {
    if (content === '') {
      alert('댓글을 작성해주세요 !');
      return;
    }
    const commentId = uuidv4();
    const commentsDoc = [
      ...comments,
      {
        commentId,
        authorId: userObj.userId,
        avatar: userObj.avatar,
        nickname: userObj.nickname,
        content,
        createdAt: getCreatedDay(),
      },
    ];

    firebaseFireStore
      .collection('records')
      .doc(postObj.postId)
      .update({
        comments: commentsDoc,
      })
      .then(() => {
        setContent('');
        setComments(commentsDoc);
        setCommentCount(commentCount + 1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchComments(), [fetchComments]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CommentContainer>
          <CommentHeaderWrap>
            <h2>댓글 {commentCount}개</h2>
          </CommentHeaderWrap>
          <CommentCreatorWrap>
            {userObj ? (
              <>
                <Avatar>
                  <img src={userObj.avatar} alt="프로필 사진" />
                </Avatar>
                <CommentInputWrap>
                  <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="댓글..."
                    onKeyPress={handleKeyPress}
                  />
                </CommentInputWrap>
                <button onClick={handleComments}>작성</button>
              </>
            ) : (
              <>
                <Avatar>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/travel-7a141.appspot.com/o/UserProfle%2FU3NaFKaoyGYnYozURq4p2XHsqkw2%2FdefaultAvatar.png?alt=media&token=dc3a629e-1934-4db6-abf0-e918c306d004"
                    alt="기본프로필 사진"
                  />
                </Avatar>
                <div
                  style={{
                    fontSize: 18,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={toggleSignIn}
                >
                  로그인을 해주세요.
                </div>
              </>
            )}
          </CommentCreatorWrap>
          {commentCount === 0 ? (
            <span
              style={{
                color: 'gray',
                textAlign: 'center',
                fontSize: '24px',
                marginTop: '20px',
              }}
            >
              "아직 댓글이 없습니다."
            </span>
          ) : (
            <CommentWrap>
              <CommentList>
                {comments &&
                  comments.map((comment) => (
                    <CommentContent key={comment.commentId}>
                      <Avatar>
                        <img src={comment.avatar} alt="프로필 사진" />
                      </Avatar>
                      <ContentInfoWrap>
                        <ContentInfo>
                          <Link to={`/profile/${comment.authorId}`}>
                            <Author>{comment.nickname}</Author>
                          </Link>
                          <CreatedAt>{comment.createdAt}</CreatedAt>
                          {userObj && userObj.userId === comment.authorId && (
                            <HiX
                              size={'14px'}
                              style={{ cursor: 'pointer', color: 'tomato' }}
                              onClick={() =>
                                handleDeleteComment(comment.commentId)
                              }
                            />
                          )}
                        </ContentInfo>
                        <Content>{comment.content}</Content>
                      </ContentInfoWrap>
                    </CommentContent>
                  ))}
              </CommentList>
            </CommentWrap>
          )}
        </CommentContainer>
      )}
      {isSignInClick && (
        <SignIn toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp} />
      )}
      {isSignUpClick && <SignUp toggleSignUp={toggleSignUp} />}
    </>
  );
};

export default Comment;
