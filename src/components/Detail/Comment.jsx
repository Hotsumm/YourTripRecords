import React, { useContext, useState, useCallback, useEffect } from 'react';
import Loading from '../Load/Loading';
import styled from 'styled-components';
import { firebaseFireStore } from '../../firebaseConfig';
import { UserContext } from '../../Context';
import { getCreatedDay } from '../../utils/getCreatedDay';
import SignIn from '../Auth/SignIn';

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  width: 100%;
  margin-top: 20px;
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const CommentCreatorWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 0;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  button {
    width: 70px;
    height: 40px;
    border: 1px solid #ababab80;
    border-radius: 5px;
    color: #16a085;
    background: white;
    padding: 10px;
    :hover {
      background: #16a085;
      color: white;
      border: none;
    }
  }
`;

const CommentInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  line-height: 10px;
  padding: 10px 0px 10px 10px;
  border-radius: 5px;
  border-style: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
  :focus {
    outline: none;
    border: 2px solid #16a085;
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

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
`;

const Author = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
`;

const CreatedAt = styled.span`
  font-size: 10px;
  color: #636e72;
`;

const Content = styled.div`
  padding: 10px 0;
  font-size: 15px;
`;

const Comment = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignInClick, setIsSignInClick] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [content, setContent] = useState('');
  const { userObj } = useContext(UserContext);

  const toggleSignIn = () => setIsSignInClick(!isSignInClick);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleComments();
    }
  };

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    const commentsRef = firebaseFireStore.collection('records').doc(postId);
    commentsRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setComments(doc.data().comments);
          setCommentCount(doc.data().comments.length);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => console.log(error), fetchComments)
      .finally(() => setIsLoading(false));
  }, [postId, setCommentCount]);

  const handleComments = async () => {
    if (content === '') {
      alert('댓글을 작성해주세요 !');
      return;
    }

    firebaseFireStore
      .collection('records')
      .doc(postId)
      .update({
        comments: [
          ...comments,
          {
            authorId: userObj.userId,
            avatar: userObj.avatar,
            nickname: userObj.nickname,
            content,
            createdAt: getCreatedDay(),
          },
        ],
      })
      .then(() => setContent(''))
      .then(() =>
        setComments([
          ...comments,
          {
            authorId: userObj.userId,
            avatar: userObj.avatar,
            nickname: userObj.nickname,
            content,
            createdAt: getCreatedDay(),
          },
        ]),
      )
      .then(() => setCommentCount(commentCount + 1))
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchComments(), [fetchComments]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CommentContainer>
          <CommentHeader>
            <span>댓글 {commentCount}개</span>
          </CommentHeader>
          <CommentCreatorWrap>
            {userObj ? (
              <>
                <img src={userObj.avatar} alt="user" />
                <CommentInput
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="댓글..."
                  onKeyPress={handleKeyPress}
                  required
                />

                <button onClick={handleComments}>작성</button>
              </>
            ) : (
              <>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/travel-7a141.appspot.com/o/UserProfle%2FU3NaFKaoyGYnYozURq4p2XHsqkw2%2FdefaultAvatar.png?alt=media&token=dc3a629e-1934-4db6-abf0-e918c306d004"
                  alt="user"
                />
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
                marginTop: '20px;',
              }}
            >
              "아직 댓글이 없습니다."
            </span>
          ) : (
            <CommentWrap>
              <CommentList>
                {comments &&
                  comments.map((comment, index) => (
                    <CommentContent key={index}>
                      <Avatar src={comment.avatar}></Avatar>
                      <ContentInfoWrap>
                        <ContentInfo>
                          <Author>{comment.nickname}</Author>
                          <CreatedAt>{comment.createdAt}</CreatedAt>
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
      {isSignInClick && <SignIn toggleSignIn={toggleSignIn} />}
    </>
  );
};

export default Comment;
