import { firebaseFireStore } from '../../firebaseConfig';
import { getCreatedDay } from '../../utils/getCreatedDay';
import { firebaseAuth } from '../../firebaseConfig';

export const CreateUser = (email, nickname) => {
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
  firebaseFireStore
    .collection('users')
    .doc(currentUser.uid)
    .set(docData)
    .then(() => firebaseAuth.signOut())
    .then(() => {
      alert(
        '회원가입이 완료되었습니다.\n등록한 이메일로 발송된 확인링크 인증 후 서비스 이용이 가능합니다. ',
      );
      window.location.reload();
    })
    .catch((error) => console.log(error));
};
