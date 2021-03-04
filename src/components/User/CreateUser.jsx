import { firebaseFireStore } from '../../firebaseConfig';
import defaultAvatar from '../../static/assets/defaultAvatar.png';
import { getCreatedDay } from '../../utils/getCreatedDay';
import { firebaseAuth } from '../../firebaseConfig';

export const CreateUser = async (email, nickname) => {
  const usersRef = firebaseFireStore.collection('users');
  const currentUser = firebaseAuth.currentUser;
  await usersRef.add({
    userId: currentUser.uid,
    email,
    nickname,
    avatar: defaultAvatar,
    createdAt: getCreatedDay(),
  });
};
