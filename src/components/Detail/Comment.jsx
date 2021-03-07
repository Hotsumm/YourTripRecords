import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Context';

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
  return (
    <CommentContainer>
      <CommentHeader>
        <div>댓글 0개</div>
      </CommentHeader>
      <CommentCreatorWrap>
        <img src={userObj.avatar} alt="user" />
        <CommentInput>
          <input type="text" placeholder="댓글..." />
          <div
            style={{ borderTop: '1px solid #ababab80', marginTop: '5px' }}
          ></div>
        </CommentInput>
      </CommentCreatorWrap>
    </CommentContainer>
  );
};

export default Comment;
