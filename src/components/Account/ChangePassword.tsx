import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { firebaseAuth, firebaseInstance } from '../../firebaseConfig';
import { ThemeContext, UserContext } from '../../Context';

const ChangePasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const ChangePasswordWrap = styled.div`
  width: 450px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: ${(props) => props.theme.menuColor};
`;

const ChangePasswordHeaderWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #ababab80;
  & h2 {
    font-size: 18px;
    font-weight: 700;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  & input {
    -webkit-appearance: none;
    width: 250px;
    padding: 15px 20px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    ::placeholder {
      font-size: 14px;
    }
    :focus {
      outline: none;
      border: 1px solid #16a085;
    }
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & button {
    width: 120px;
    height: 50px;
    border-radius: 10px;
    background: white;
    border: 1px solid #16a085;
    color: #16a085;
    :last-child {
      border: 1px solid red;
      color: red;
      margin-left: 15px;
    }
  }
`;

interface ChangePasswordProps {
  toggleChangePassword(): void;
}

interface InputsProps {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  toggleChangePassword,
}) => {
  const [inputs, setInputs] = useState<InputsProps>({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const { theme } = useContext(ThemeContext);
  const { userObj } = useContext(UserContext);

  const { oldPassword, newPassword, newPasswordConfirm } = inputs;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validCheck();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const validCheck = () => {
    if (newPassword !== newPasswordConfirm)
      return alert('새 비밀번호가 일치하지 않습니다.');
    onSubmit();
  };

  const onSubmit = () => {
    if (!userObj) return;

    if (userObj.isSocial) return alert('비밀번호 변경이 불가능한 계정입니다.');

    const currentUser: any = firebaseAuth.currentUser;
    const credential = firebaseInstance.auth.EmailAuthProvider.credential(
      currentUser.email,
      oldPassword,
    );

    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        currentUser
          .updatePassword(newPassword)
          .then(() => {
            firebaseAuth
              .signOut()
              .then(() => {
                alert(
                  '비밀번호가 정상적으로 변경되었습니다.\n다시 로그인 해주세요.',
                );
                location.reload();
              })
              .catch((error) => console.log(error));
          })
          .catch((error: any) => {
            if (error.code === 'auth/weak-password') {
              alert('새 비밀번호를 6자 이상으로 입력해주세요.');
            }
            console.log(error);
          });
      })
      .catch((error: any) => {
        if (error.code === 'auth/weak-password') {
          alert(
            '비밀번호는 8~16자 숫자/소문자/특수문자를 모두 포함해야 합니다.',
          );
        } else if (error.code === 'auth/wrong-password') {
          alert('현재 비밀번호를 확인 해주세요.');
        } else {
          alert(error.code);
        }
        console.log(error);
      });
  };

  return (
    <ChangePasswordContainer>
      <ChangePasswordWrap theme={theme}>
        <ChangePasswordHeaderWrap>
          <h2>비밀번호 변경</h2>
        </ChangePasswordHeaderWrap>
        <InputContainer>
          <InputWrap>
            <input
              type="Password"
              onChange={onChange}
              name="oldPassword"
              placeholder="현재 비밀번호"
              onKeyPress={handleKeyPress}
            />
          </InputWrap>
          <InputWrap>
            <input
              type="password"
              onChange={onChange}
              name="newPassword"
              placeholder="새 비밀번호"
              onKeyPress={handleKeyPress}
            />
          </InputWrap>
          <InputWrap>
            <input
              type="password"
              onChange={onChange}
              name="newPasswordConfirm"
              placeholder="새 비밀번호 확인"
              onKeyPress={handleKeyPress}
            />
          </InputWrap>
        </InputContainer>
        <ButtonWrap>
          <button onClick={() => validCheck()}>변경</button>
          <button onClick={() => toggleChangePassword()}>취소</button>
        </ButtonWrap>
      </ChangePasswordWrap>
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
