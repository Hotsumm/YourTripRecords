import { firebaseAuth } from '../../firebaseConfig';

export const CreateUser = async (email, password) => {
  await firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      if (error.code === 'auth/weak-password') {
        alert('비밀번호는 8자리 이상의 영문 + 특수문자로 입력해주세요.');
      } else {
        alert(error.message);
      }
    });
};
