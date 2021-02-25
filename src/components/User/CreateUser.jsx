import { firebaseFireStore } from '../../firebaseConfig';
import defaultAvatar from '../../static/assets/defaultAvatar.png';

const getCreatedDay = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

export const CreateUser = async (email, nickname) => {
  const usersRef = firebaseFireStore.collection('users');
  await usersRef.add({
    email,
    nickname,
    avatar: defaultAvatar,
    createdAt: getCreatedDay(),
  });
};
