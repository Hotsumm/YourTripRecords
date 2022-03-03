import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { firebaseFireStore, firebaseStorage } from '../../firebaseConfig';
import { ThemeContext } from '../../Context';

const ProfileEditContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ProfileEditWrap = styled.div`
  @media (max-width: 1024px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 95%;
  }
  width: 768px;
  max-height: 75vh;
  margin-top: 80px;
  background: ${(props) => props.theme.menuColor};
  border-radius: 20px;

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #bdc3c7;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

const ProfileEditHeader = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ababab80;
`;
const HeaderTitle = styled.div`
  font-size: 20px;
`;

const ProfileEditContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  max-height: calc(75vh - 61px);
  overflow-y: auto;
`;

const ProfileContent = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ProfileAvatarWrap = styled.div`
  @media (max-width: 500px) {
    margin-bottom: 20px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  width: 35%;
  & button {
    padding: 10px 10px;
    background: #16a085;
    border: 1px solid #16a085;
    border-radius: 5px;
  }
`;

const AvatarWrap = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  margin-bottom: 20px;
  :hover {
    opacity: 0.7;
  }
  & label {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    font-weight: 700;
    color: black;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ProfileInputWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
  width: 64%;
`;
const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  & input {
    -webkit-appearance: none;
    text-align: start;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  & textarea {
    line-height: 20px;
    padding: 10px 0 0 10px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  & span {
    font-weight: 600;
    margin-bottom: 10px;
  }
  :last-child {
    & span {
      :last-child {
        text-align: right;
        color: gray;
        margin-top: 10px;
      }
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  & button {
    width: 100px;
    height: 50px;
    border: 0.1px solid #16a085;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-right: 30px;
  }
`;

interface ProfileEditProps {
  toggleProfileEdit(): void;
  userObj: IUserObj;
}

interface InputsProps {
  nickname: string;
  instagram: string;
  intro: string;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({
  toggleProfileEdit,
  userObj,
}) => {
  const { theme } = useContext(ThemeContext);

  const [inputs, setInputs] = useState<InputsProps>({
    nickname: userObj.nickname,
    instagram: userObj.instagram ? userObj.instagram : '',
    intro: userObj.intro ? userObj.intro : '',
  });
  const [avatar, setAvatar] = useState<string>(userObj.avatar);
  const [avatarPreview, setAvatarPreview] = useState<boolean>(false);

  const { nickname, instagram, intro } = inputs;

  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/travel-7a141.appspot.com/o/UserProfle%2FU3NaFKaoyGYnYozURq4p2XHsqkw2%2FdefaultAvatar.png?alt=media&token=dc3a629e-1934-4db6-abf0-e918c306d004';

  const closeButton = () => toggleProfileEdit();

  const defaultAvatarChange = (): void => {
    setAvatar(defaultAvatar);
    setAvatarPreview(true);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const {
      target: { name, value },
    } = e;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { files },
    } = e;

    if (!files) return alert('사진 업로드에 실패하였습니다.');

    const theFile = files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result }: any = finishedEvent.currentTarget;

      setAvatar(result);
      setAvatarPreview(true);
    };
    reader.readAsDataURL(theFile);
  };

  const vaildCheck = (): void => {
    const specialCheck = /[`~!@#$%^&*|\\'";:/?]/gi;

    let nicknameLength = 0;
    for (let i = 0; i < nickname.length; i++) {
      if (escape(nickname.charAt(i)).length > 4) {
        nicknameLength += 2;
      } else {
        nicknameLength += 1;
      }
    }

    if (nicknameLength < 2 || nicknameLength > 16)
      return alert(
        '닉네임은 한글 2~8자, 영문 및 숫자 4~16자 사이로 입력해주세요. ',
      );
    else if (specialCheck.test(nickname) || nickname.search(/\s/) !== -1)
      return alert('닉네임은 특수문자 또는 공백을 포함 할 수 없습니다.');

    if (specialCheck.test(instagram) || instagram.search(/\s/) !== -1)
      return alert('인스타그램 아이디를 정확하게 입력해주세요.');

    if (intro.length > 100)
      return alert('소개를 4자에서 100자 이하로 입력해주세요.');

    onSubmit();
  };

  const onSubmit = async (): Promise<void> => {
    const usersRef = firebaseFireStore.collection('users').doc(userObj.userId);
    if (!avatarPreview) {
      noChangeAvatar(usersRef);
    } else {
      const fileRef = firebaseStorage
        .ref('UserProfle')
        .child(`${userObj.userId}/${uuidv4()}`);
      const res = await fileRef.putString(avatar, 'data_url');
      const avatarURL = await res.ref.getDownloadURL();
      const newUserObj = {
        ...userObj,
        avatar: avatarURL,
      };

      await Promise.all([
        changeAvatar(usersRef, avatarURL),
        changeRecordProfile(newUserObj),
        changeCommentProfile(avatarURL),
      ])
        .then(() => {
          alert('프로필이 변경되었습니다');
          window.location.reload();
        })
        .catch((error: Error) => alert(error.message));
    }
  };

  const changeCommentProfile = (avatarURL: string) =>
    firebaseFireStore
      .collection('records')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const record = doc.data();
          if (record.comments && record.comments.length > 0) {
            let comments = record.comments;
            for (let i = 0; i < comments.length; i++) {
              if (comments[i].authorId === userObj.userId) {
                comments[i].avatar = avatarURL;
              }
            }
            await firebaseFireStore
              .collection('records')
              .doc(record.postId)
              .update({
                comments: [...comments],
              })
              .catch((error) => alert(error.message));
          }
        });
      });

  const changeRecordProfile = (newUserObj: IUserObj) =>
    firebaseFireStore
      .collection('records')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const record = doc.data();
          if (record.creator.userObj.userId === userObj.userId) {
            firebaseFireStore
              .collection('records')
              .doc(record.postId)
              .update({
                creator: { userObj: { ...newUserObj } },
              })
              .catch((error) => alert(error.message));
          }
        });
      });

  const changeAvatar = (usersRef: any, avatarURL: string) =>
    usersRef
      .update({
        nickname,
        avatar: avatar === defaultAvatar ? avatar : avatarURL,
        instagram,
        intro,
      })
      .then((res: any) => console.log(res))
      .catch((error: Error) => alert(error.message));

  const noChangeAvatar = (usersRef: any) =>
    usersRef
      .update({
        nickname,
        instagram,
        intro,
      })
      .then(() => {
        alert('프로필이 변경되었습니다');
        window.location.reload();
      })
      .catch((error: Error) => alert(error.message));

  return (
    <ProfileEditContainer>
      <ProfileEditWrap theme={theme}>
        <ProfileEditHeader>
          <HeaderTitle>프로필 수정</HeaderTitle>
        </ProfileEditHeader>
        <ProfileEditContentWrap>
          <ProfileContent>
            <ProfileAvatarWrap>
              <AvatarWrap>
                {avatarPreview ? (
                  <Avatar src={avatar} />
                ) : (
                  <Avatar src={userObj.avatar} />
                )}
                <label htmlFor="input-file">프로필사진 변경</label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={onFileChange}
                />
              </AvatarWrap>
              <button style={{ color: 'white' }} onClick={defaultAvatarChange}>
                기본이미지로 변경
              </button>
            </ProfileAvatarWrap>
            <ProfileInputWrap>
              <InputWrap>
                <span>*이메일</span>
                <input type="email" value={userObj.email} readOnly />
              </InputWrap>
              <InputWrap>
                <span>*닉네임</span>
                <input
                  type="text"
                  maxLength={16}
                  name="nickname"
                  value={nickname}
                  onChange={onChange}
                  placeholder="닉네임"
                />
                <span
                  style={{ marginTop: '5px', color: 'gray', fontWeight: '500' }}
                >
                  닉네임은 최소 2자 최대 8자로 입력해주세요.
                </span>
              </InputWrap>
              <InputWrap>
                <span>인스타그램</span>
                <input
                  type="text"
                  name="instagram"
                  onChange={onChange}
                  value={instagram}
                  placeholder="인스타그램"
                />
                <span
                  style={{ marginTop: '5px', color: 'gray', fontWeight: '500' }}
                >
                  Instagram ID가 있다면, 입력해주세요.
                </span>
              </InputWrap>
              <InputWrap>
                <span>소개</span>
                <textarea
                  name="intro"
                  value={intro}
                  rows={4}
                  maxLength={100}
                  onChange={onChange}
                  placeholder="최대 100자로 자신을 소개해보세요."
                />
                <span>{intro.length}/160자</span>
              </InputWrap>
            </ProfileInputWrap>
          </ProfileContent>
          <ButtonWrap>
            <button onClick={vaildCheck}>변경하기</button>
            <button onClick={closeButton}>취소</button>
          </ButtonWrap>
        </ProfileEditContentWrap>
      </ProfileEditWrap>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
