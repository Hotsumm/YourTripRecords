import React, { useState } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { CreateUser } from '../User/CreateUser';
import { firebaseAuth } from '../../firebaseConfig';

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
  height: 600px;
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
  padding: 30px 50px 10px 50px;
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
    margin-bottom: 15px;

    :last-child {
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      color: black;
      border: 1px solid #bdc3c7;
      background: white;
      & svg {
        position: absolute;
        left: 20px;
      }
    }
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

  :not(:last-child) {
    & input {
      margin-bottom: 25px;
    }
  }
  :last-child {
    margin-bottom: 30px;
  }
`;
const SignUp = ({ toggleSignUp }) => {
  const closeButton = () => toggleSignUp();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [linkCode, setLinkCode] = useState('');
  const [emailConfirm, setEmailConfirm] = useState(false);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } else if (name === 'linkCode') {
      setLinkCode(value);
    }
  };
  const validCheck = () => {
    const passwordRules = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    if (!passwordRules.test(password)) {
      alert('비밀번호는 8~16자 숫자/소문자/특수문자를 모두 포함해야 합니다.');
      return;
    }
    handleSignUp();
  };

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      alert('비밀번호를 확인해주세요.');
      return;
    }
    try {
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
      CreateUser(email, nickname);
      //  setEmailConfirm((emailConfrim) => !emailConfirm);
      alert('회원가입이 완료되었습니다.');
      window.location.reload();
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert('비밀번호는 8자리 이상의 영문 + 특수문자로 입력해주세요.');
        console.log(error.code);
      } else if (error.code === 'auth/email-already-in-use') {
        alert('이미 사용중인 이메일 입니다.');
      } else if (error.code === 'auth/invalid-email') {
        alert('이메일을 정확하게 입력해주세요.');
      } else {
        alert(error.code);
      }
    }
  };

  return (
    <SignUpContainer>
      <SignUpWrap>
        <SignUpHeader>
          <BsBoxArrowInLeft onClick={closeButton} size={26} />
          <HeaderTitle>회원가입</HeaderTitle>
        </SignUpHeader>
        {!emailConfirm ? (
          <>
            <InputContainer>
              <InputWrap>
                <input
                  type="email"
                  placeholder="이메일"
                  name="email"
                  onChange={onChange}
                  required
                />
              </InputWrap>
              <InputWrap>
                <input
                  type="text"
                  placeholder="닉네임"
                  name="nickname"
                  onChange={onChange}
                  required
                />
              </InputWrap>
              <InputWrap>
                <input
                  type="password"
                  placeholder="비밀번호"
                  name="password"
                  onChange={onChange}
                  required
                />
              </InputWrap>
              <InputWrap>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  name="passwordConfirm"
                  onChange={onChange}
                  required
                />
              </InputWrap>
            </InputContainer>
            <ButtonWrap>
              <button onClick={validCheck}>회원가입</button>
              <button>
                <FcGoogle size={25} />
                Google로 회원가입
              </button>
            </ButtonWrap>
          </>
        ) : (
          <>
            <InputContainer>
              <InputWrap>
                <h1> 이메일 코드를 입력해주세요.</h1>
                <input type="text" name="linkCode" />
              </InputWrap>
            </InputContainer>
            <ButtonWrap>
              <button>확인</button>
            </ButtonWrap>
          </>
        )}
      </SignUpWrap>
    </SignUpContainer>
  );
};

export default SignUp;
