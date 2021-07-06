import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from '../Load/Loading';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { CreateUser } from '../User/CreateUser';
import { firebaseAuth, firebaseInstance } from '../../firebaseConfig';

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
  height: 10%;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ababab80;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
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

const SignUpContentWrap = styled.div`
  width: 100%;
  height: 90%;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 50px 10px 50px;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrap = styled.div`
  width: 100%;
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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const closeButton = () => toggleSignUp();

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
    setLoading(true);
    try {
      await firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(() => CreateUser(email, nickname));
      alert('회원가입이 완료되었습니다.');
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
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        const googleUser = result.user;
        CreateUser(googleUser.email, googleUser.displayName);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SignUpContainer>
      <SignUpWrap>
        <SignUpHeader>
          <BsBoxArrowInLeft onClick={closeButton} size={26} />
          <HeaderTitle>회원가입</HeaderTitle>
        </SignUpHeader>
        <SignUpContentWrap>
          {loading ? (
            <Loading />
          ) : (
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
                <button onClick={googleSignIn}>
                  <FcGoogle size={25} />
                  Google로 로그인 하기
                </button>
              </ButtonWrap>
            </>
          )}
        </SignUpContentWrap>
      </SignUpWrap>
    </SignUpContainer>
  );
};

export default SignUp;
