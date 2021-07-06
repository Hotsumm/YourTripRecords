import { firebaseFireStore } from '../../firebaseConfig';
import { getCreatedDay } from '../../utils/getCreatedDay';
import { firebaseAuth } from '../../firebaseConfig';

export const CreateUser = async (email, nickname) => {
  const currentUser = firebaseAuth.currentUser;
  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/travel-7a141.appspot.com/o/UserProfle%2FU3NaFKaoyGYnYozURq4p2XHsqkw2%2FdefaultAvatar.png?alt=media&token=dc3a629e-1934-4db6-abf0-e918c306d004';
  const docData = {
    userId: currentUser.uid,
    email,
    nickname,
    avatar: defaultAvatar,
    records: [],
    createdAt: getCreatedDay(),
  };
  await firebaseFireStore.collection('users').doc(currentUser.uid).set(docData);
  window.location.reload();
};
