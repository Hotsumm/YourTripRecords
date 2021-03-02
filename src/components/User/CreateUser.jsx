import { firebaseFireStore } from '../../firebaseConfig';
import defaultAvatar from '../../static/assets/defaultAvatar.png';
import { getCreatedDay } from '../../utils/getCreatedDay';

export const CreateUser = async (email, nickname) => {
  const usersRef = firebaseFireStore.collection('users');
  await usersRef.add({
    email,
    nickname,
    avatar: defaultAvatar,
    createdAt: getCreatedDay(),
  });
};
