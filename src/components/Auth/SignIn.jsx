import React from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

const SignInContainer = styled.div`
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
const SignInWrap = styled.div`
  width: 450px;
  height: 450px;
  background: white;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
const SignInHeader = styled.div`
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
  padding: 40px 50px;
  flex-direction: column;
  align-items: center;
`;

const InputWrap = styled.div`
  width: 100%;
  & input {
    width: 100%;
    height: 50px;
    padding: 0 0 0 20px;
    border-radius: 15px;
    border-style: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    ::placeholder {
      font-size: 15px;
    }
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  :not(:last-child) {
    & input {
      margin-bottom: 15px;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  & button {
    width: 100%;
    height: 50px;
    background: transparent;
    font-size: 16px;
    border-radius: 15px;
    :first-child {
      background: #16a085;
      color: white;
      margin-bottom: 15px;
    }
    :last-child {
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      margin-bottom: 10px;
      border: 1px solid #bdc3c7;
      & svg {
        position: absolute;
        left: 20px;
      }
    }
  }
`;

const SignIn = ({ toggleSignIn }) => {
  const closeButton = () => toggleSignIn();

  return (
    <SignInContainer>
      <SignInWrap>
        <SignInHeader>
          <BsBoxArrowInLeft onClick={closeButton} size={26} />
          <HeaderTitle>로그인</HeaderTitle>
        </SignInHeader>
        <InputContainer>
          <InputWrap>
            <input type="email" placeholder="이메일" required />
          </InputWrap>
          <InputWrap>
            <input type="password" placeholder="비밀번호" required />
          </InputWrap>
        </InputContainer>
        <ButtonWrap>
          <button>로그인</button>
          <button>
            <FcGoogle size={25} />
            Google로 로그인하기
          </button>
        </ButtonWrap>
      </SignInWrap>
    </SignInContainer>
  );
};

export default SignIn;
