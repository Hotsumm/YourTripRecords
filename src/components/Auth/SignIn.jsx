import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { firebaseAuth, firebaseInstance } from '../../firebaseConfig';
import { CreateUser } from '../User/CreateUser';
import { ThemeContext } from '../../Context';
import Loading from '../Load/Loading';

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
  background: ${(props) => props.theme.menuColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
const SignInHeader = styled.div`
  width: 100%;
  height: 15%;
  padding: 15px 0;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ababab80;
  justify-content: center;
  align-items: center;
  & svg {
    position: absolute;
    left: 40px;
    cursor: pointer;
  }
`;

const HeaderTitle = styled.span`
  font-size: 20px;
`;

const SignInContentWrap = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 50px 30px 50px;
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
      margin-bottom: 20px;
    }
  }
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
    background: transparent;
    font-size: 16px;
    border-radius: 15px;
    border: 1px solid #16a085;
    :first-child {
      background: ${(props) => props.theme.mainColor};
      color: white;
      margin-bottom: 15px;
    }
    :last-child {
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      margin-bottom: 10px;

      & svg {
        position: absolute;
        left: 20px;
      }
    }
  }
`;

const SignIn = ({ toggleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);

  const resendMessage =
    '이메일 확인링크가 인증되지 않았습니다. \n등록한 이메일로 발송된 확인링크 인증 후 서비스 이용이 가능합니다.\n이메일 확인링크를 재전송 하시겠습니까?';

  const closeButton = () => toggleSignIn();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          const answer = window.confirm(resendMessage);
          if (answer) {
            firebaseAuth.currentUser.sendEmailVerification();
            alert('이메일 확인링크가 재전송 되었습니다.');
          }
          firebaseAuth.signOut();
          return;
        }
        window.location.reload();
      })

      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          alert('비밀번호를 확인해주세요.');
        } else if (error.code === 'auth/invalid-email') {
          alert('이메일을 확인해주세요.');
        } else {
          alert(error.code);
        }
      })
      .finally(() => setLoading(false));
  };

  const googleSignIn = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        const googleUser = result.user;
        CreateUser(googleUser.email, googleUser.displayName);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };
  return (
    <SignInContainer>
      <SignInWrap theme={theme}>
        <SignInHeader>
          <BsBoxArrowInLeft onClick={closeButton} size={26} />
          <HeaderTitle>로그인</HeaderTitle>
        </SignInHeader>
        <SignInContentWrap>
          {loading ? (
            <Loading />
          ) : (
            <>
              <InputContainer>
                <InputWrap>
                  <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    placeholder="이메일"
                    required
                  />
                </InputWrap>
                <InputWrap>
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    placeholder="비밀번호"
                    required
                  />
                </InputWrap>
              </InputContainer>
              <ButtonWrap theme={theme}>
                <button onClick={handleSignIn}>로그인</button>
                <button onClick={googleSignIn}>
                  <FcGoogle size={25} />
                  Google로 로그인하기
                </button>
              </ButtonWrap>
            </>
          )}
        </SignInContentWrap>
      </SignInWrap>
    </SignInContainer>
  );
};

export default SignIn;
