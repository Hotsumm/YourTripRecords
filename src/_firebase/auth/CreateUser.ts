import { firebaseFireStore, firebaseAuth } from '@src/firebaseConfig';
import { getCreatedDay } from '@utils/getCreatedDay';

interface CreateUserParam {
  (email: string, nickname: string): Promise<void>;
}

export const CreateUser: CreateUserParam = async (email, nickname) => {
  const currentUser: any = firebaseAuth.currentUser;
  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/travel-7a141.appspot.com/o/UserProfle%2FU3NaFKaoyGYnYozURq4p2XHsqkw2%2FdefaultAvatar.png?alt=media&token=dc3a629e-1934-4db6-abf0-e918c306d004';
  const docData: {
    userId: string;
    email: string;
    nickname: string;
    avatar: string;
    records: IPost[];
    createdAt: string;
  } = {
    userId: currentUser.uid,
    email,
    nickname,
    avatar: defaultAvatar,
    records: [],
    createdAt: getCreatedDay(),
  };
  await firebaseFireStore
    .collection('users')
    .doc(currentUser.uid)
    .set(docData)
    .catch((error) => console.log(error));
};
