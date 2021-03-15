import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Context';
import SignIn from '../Auth/SignIn';

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  width: 100%;
  div {
    font-size: 20px;
    font-weight: 700;
  }
`;

const CommentCreatorWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 30px 0;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const CommentInput = styled.div`
  width: 60%;
  input {
    width: 100%;
    font-size: 16px;
    border: none;
    :focus {
      outline: none;
    }
  }
`;

const Comment = () => {
  const { userObj } = useContext(UserContext);
  const [isSignInClick, setIsSignInClick] = useState(false);
  const toggleSignIn = () => setIsSignInClick(!isSignInClick);

  return (
    <>
      <CommentContainer>
        <CommentHeader>
          <div>댓글 0개</div>
        </CommentHeader>
        <CommentCreatorWrap>
          {userObj ? (
            <>
              <img src={userObj.avatar} alt="user" />
              <CommentInput>
                <input type="text" placeholder="댓글..." />
                <div
                  style={{ borderTop: '1px solid #ababab80', marginTop: '5px' }}
                ></div>
              </CommentInput>
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
      </CommentContainer>
      {isSignInClick && <SignIn toggleSignIn={toggleSignIn} />}
    </>
  );
};

export default Comment;
