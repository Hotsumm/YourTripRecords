import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  firebaseAuth,
  firebaseInstance,
  firebaseFireStore,
} from '../../firebaseConfig';
import { UserContext, ThemeContext } from '../../Context';
import Loading from '../Load/Loading';

const UserDeleteContainer = styled.div`
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

const UserDeleteWrap = styled.div`
  width: 450px;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: ${(props) => props.theme.menuColor};
`;

const UserDeleteHeaderWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #ababab80;
  & h2 {
    color: tomato;
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

interface UserDeleteProps {
  toggleUserDelete(): void;
}

interface InputsProps {
  password: string;
  passwordConfirm: string;
}

const UserDelete: React.FC<UserDeleteProps> = ({ toggleUserDelete }) => {
  const [inputs, setInputs] = useState<InputsProps>({
    password: '',
    passwordConfirm: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { userObj }: any = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const { password, passwordConfirm } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const answer = window.confirm(
      '회원탈퇴 후 복구할 수 없습니다.\n정말 탈퇴 하시겠습니까?.',
    );
    if (!answer) return;

    if (userObj.isSocial) return alert('회원탈퇴가 불가능한 계정입니다.');

    const currentUser: any = firebaseAuth.currentUser;

    if (!currentUser) return;

    const credential = firebaseInstance.auth.EmailAuthProvider.credential(
      currentUser.email,
      password,
    );

    setLoading(true);
    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => userInfoDelete())
      .then(() => currentUser.delete())
      .then(() => {
        alert(
          '정상적으로 회원탈퇴 되었습니다.\n그동안 서비스를 이용해주셔서 감사합니다.',
        );
        window.location.reload();
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
      })
      .finally(() => setLoading(false));
  };

  const userInfoDelete = () =>
    Promise.all([
      userPostAllDelete(userObj.records),
      userLikesAllDelete(userObj.userId),
      userDelete(userObj.userId),
      userCommentDelete(userObj.userId),
    ]);

  const userPostAllDelete = (userRecordsList: string[]) => {
    if (!userRecordsList) return;

    return userRecordsList.forEach((postId) => {
      firebaseFireStore
        .collection('records')
        .doc(postId)
        .delete()
        .catch((error) => {
          alert('삭제에 실패하였습니다.');
          console.log(error);
        });
    });
  };

  const userLikesAllDelete = (userId: string) =>
    firebaseFireStore
      .collection('records')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const records = doc.data();
          if (records.likes.length > 0 && records.likes.includes(userId)) {
            const likeFilter = records.likes.filter(
              (like: string) => like !== userId,
            );
            firebaseFireStore
              .collection('records')
              .doc(records.postId)
              .update({
                likes: [...likeFilter],
              })
              .catch((error) => alert(error.message));
          }
        });
      })
      .catch((error) => console.log(error));

  const userCommentDelete = (userId: string) =>
    firebaseFireStore
      .collection('records')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const records = doc.data();
          if (records.comments.length > 0) {
            const commentFilter = records.comments.filter(
              (comment: IComment) => comment.authorId !== userId,
            );
            await firebaseFireStore
              .collection('records')
              .doc(records.postId)
              .update({
                comments: [...commentFilter],
              })
              .catch((error) => alert(error.message));
          }
        });
      })
      .catch((error) => console.log(error));

  const userDelete = (userId: string) =>
    firebaseFireStore
      .collection('users')
      .doc(userId)
      .delete()
      .catch((error) => {
        alert('삭제에 실패하였습니다.');
        console.log(error);
      });

  const validCheck = () => {
    if (password !== passwordConfirm)
      return alert('비밀번호 확인이 일치하지 않습니다.');
    onSubmit();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validCheck();
    }
  };

  return (
    <UserDeleteContainer>
      {loading ? (
        <Loading />
      ) : (
        <UserDeleteWrap theme={theme}>
          <UserDeleteHeaderWrap>
            <h2>회원 탈퇴</h2>
          </UserDeleteHeaderWrap>
          <InputContainer>
            <InputWrap>
              <input
                type="Password"
                onChange={onChange}
                name="password"
                placeholder="비밀번호"
                onKeyPress={handleKeyPress}
              />
            </InputWrap>
            <InputWrap>
              <input
                type="password"
                onChange={onChange}
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                onKeyPress={handleKeyPress}
              />
            </InputWrap>
          </InputContainer>
          <ButtonWrap>
            <button onClick={() => validCheck()}>회원 탈퇴</button>
            <button onClick={() => toggleUserDelete()}>취소</button>
          </ButtonWrap>
        </UserDeleteWrap>
      )}
    </UserDeleteContainer>
  );
};

export default UserDelete;
