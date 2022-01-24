import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { firebaseAuth, firebaseInstance } from '../../firebaseConfig';
import { CreateSocialUser } from '../User/CreateSocialUser';
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
  @media (max-width: 500px) {
    width: 90%;
  }
  width: 450px;
  overflow-y: auto;
  background: ${(props) => props.theme.menuColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
const SignInHeaderWrap = styled.header`
  width: 100%;
  padding: 15px 0;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ababab80;
  justify-content: center;
  align-items: center;
`;

const HeaderIconWrap = styled.div`
  position: absolute;
  left: 40px;
  cursor: pointer;
  & svg {
    @media (max-width: 500px) {
      font-size: 18px;
    }
    font-size: 25px;
  }
`;
const HeaderTitle = styled.h3`
  @media (max-width: 320px) {
    font-size: 16px;
  }
  font-size: 20px;
`;

const SignInContentWrap = styled.div`
  @media (max-width: 500px) {
    padding: 30px 20px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px 0;
`;

const InputWrap = styled.div`
  width: 100%;
  & input {
    -webkit-appearance: none;
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
`;

const SignUpTextWrap = styled.div`
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 5px 0;
    align-items: center;
    padding: 10px 0;
  }
  width: 100%;
  display: flex;
  justify-content: center;

  padding: 0 10px;
  padding: 20px 0;
  color: grey;
  & span {
    :last-child {
      margin-left: 10px;
      text-decoration: underline;
      cursor: pointer;
      :hover {
        color: #16a085;
      }
    }
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & button {
    @media (max-width: 320px) {
      font-size: 14px;
    }
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
        @media (max-width: 320px) {
          font-size: 16px;
        }
        position: absolute;
        left: 20px;
        font-size: 20px;
      }
    }
  }
`;

interface SignInProps {
  toggleSignIn(): void;
  toggleSignUp(): void;
}

const SignIn: React.FC<SignInProps> = ({ toggleSignIn, toggleSignUp }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);

  const resendMessage =
    '이메일 확인링크가 인증되지 않았습니다. \n등록한 이메일로 발송된 확인링크 인증 후 서비스 이용이 가능합니다.\n이메일 확인링크를 재전송 하시겠습니까?';

  const closeButton = () => toggleSignIn();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignIn = () => {
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        if (!userCredential.user.emailVerified) {
          const answer = window.confirm(resendMessage);
          if (answer) {
            firebaseAuth.currentUser?.sendEmailVerification();
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

  const googleSignIn = () => {
    setLoading(true);
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    firebaseAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        if (result.additionalUserInfo.isNewUser)
          return CreateSocialUser(
            result.user.email,
            result.user.displayName,
            result.user.photoURL,
          );
      })
      .then(() => window.location.reload())
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };
  return (
    <SignInContainer>
      <SignInWrap theme={theme}>
        <SignInHeaderWrap>
          <HeaderIconWrap>
            <BsBoxArrowInLeft onClick={closeButton} />
          </HeaderIconWrap>
          <HeaderTitle>로그인</HeaderTitle>
        </SignInHeaderWrap>
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
              <SignUpTextWrap>
                <span>아직 회원이 아니신가요?</span>
                <span
                  onClick={() => {
                    closeButton();
                    toggleSignUp();
                  }}
                >
                  회원가입 바로가기
                </span>
              </SignUpTextWrap>
              <ButtonWrap theme={theme}>
                <button onClick={handleSignIn}>로그인</button>
                <button onClick={googleSignIn}>
                  <FcGoogle />
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
