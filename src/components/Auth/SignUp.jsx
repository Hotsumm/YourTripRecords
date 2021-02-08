import React from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;
const SignUpWrap = styled.div`
  width: 450px;
  height: 650px;
  background: white;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
const SignUpHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ababab80;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  & svg {
    position: absolute;
    left: 40px;
    color: black;
    cursor: pointer;
  }
`;
const HeaderTitle = styled.span`
  color: black;
  font-size: 20px;
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 50px;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  & button {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    font-size: 16px;
    background: #16a085;
    color: white;
    margin-bottom: 30px;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  & input {
    width: 100%;
    height: 50px;
    padding: 0 0 0 20px;
    border-radius: 15px;
    border-style: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    ::placeholder {
      font-size: 15px;
    }
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }

  :nth-child(3) {
    margin-bottom: 30px;
  }

  :not(:last-child) {
    & input {
      margin-bottom: 25px;
    }
  }
`;
const SignUp = ({ toggleSignUp }) => {
  const closeButton = () => toggleSignUp();

  return (
    <SignUpContainer>
      <SignUpWrap>
        <SignUpHeader>
          <BsBoxArrowInLeft onClick={closeButton} size={26} />
          <HeaderTitle>회원가입</HeaderTitle>
        </SignUpHeader>
        <InputContainer>
          <InputWrap>
            <input type="username" placeholder="아이디" required />
          </InputWrap>
          <InputWrap>
            <input type="password" placeholder="비밀번호" required />
          </InputWrap>
          <InputWrap>
            <input type="password" placeholder="비밀번호 확인" required />
          </InputWrap>
          <InputWrap>
            <input type="text" placeholder="닉네임" required />
          </InputWrap>
          <InputWrap>
            <input type="email" placeholder="이메일 주소" required />
          </InputWrap>
        </InputContainer>
        <ButtonWrap>
          <button>회원가입</button>
        </ButtonWrap>
      </SignUpWrap>
    </SignUpContainer>
  );
};

export default SignUp;
