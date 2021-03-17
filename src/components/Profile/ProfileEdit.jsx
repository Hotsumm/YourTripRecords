import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Context';
import { v4 as uuidv4 } from 'uuid';
import { firebaseFireStore, firebaseStorage } from '../../firebaseConfig';

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
  width: 570px;
  height: 630px;
  background: white;
  z-index: 1;
  border-radius: 20px;
`;

const ProfileEditHeader = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ababab80;
  margin-bottom: 20px;
`;
const HeaderTitle = styled.div`
  color: black;
  font-size: 20px;
`;

const ProfileContentWrap = styled.div`
  display: flex;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  width: 35%;
  button {
    padding: 10px 10px;
    background: #16a085;
    color: white;
    border: 1px solid white;
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
  label {
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

const InputContainer = styled.div`
  width: 64%;
`;
const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 10px 0px;

  input {
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
  textarea {
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
  span {
    font-weight: 600;
    margin-bottom: 10px;
  }
  :last-child {
    span {
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

  button {
    width: 100px;
    height: 50px;
    background: white;
    border: 0.1px solid #16a085;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    color: black;
    border-radius: 5px;
    margin-right: 30px;
  }
`;

const ProfileEdit = ({ toggleProfileEdit }) => {
  const { userObj } = useContext(UserContext);
  const [email, setEmail] = useState(userObj.email);
  const [nickname, setNickname] = useState(userObj.nickname);
  const [instagram, setInstagram] = useState(
    userObj.instagram ? userObj.instagram : '',
  );
  const [intro, setIntro] = useState(userObj.intro ? userObj.intro : '');
  const [avatar, setAvatar] = useState(userObj.avatar);
  const [avatarPreview, setAvatarPreview] = useState(false);

  const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/travel-7a141.appspot.com/o/UserProfle%2FU3NaFKaoyGYnYozURq4p2XHsqkw2%2FdefaultAvatar.png?alt=media&token=dc3a629e-1934-4db6-abf0-e918c306d004';

  const closeButton = () => toggleProfileEdit();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'instagram') {
      setInstagram(value);
    } else if (name === 'intro') {
      setIntro(value);
    }
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAvatar(result);
      setAvatarPreview(true);
    };
    reader.readAsDataURL(theFile);
    console.log(avatar);
  };

  const onSubmit = async () => {
    const usersRef = firebaseFireStore.collection('users').doc(userObj.id);
    if (avatar === defaultAvatar) {
      await usersRef
        .update({
          email,
          nickname,
          avatar,
          instagram: instagram,
          intro: intro,
        })
        .catch((error) => alert(error.message));
    } else {
      if (avatarPreview) {
        const fileRef = firebaseStorage
          .ref('UserProfle')
          .child(`${userObj.userId}/${uuidv4()}`);
        const res = await fileRef.putString(avatar, 'data_url');
        const avatarURL = await res.ref.getDownloadURL();
        await usersRef
          .update({
            email,
            nickname,
            avatar: avatarURL,
            instagram,
            intro,
          })
          .catch((error) => alert(error.message));
      } else {
        await usersRef
          .update({
            email,
            nickname,
            instagram,
            intro,
          })
          .catch((error) => alert(error.message));
      }
    }
    window.location.reload();
  };

  const defaultAvatarChange = () => {
    setAvatar(defaultAvatar);
    setAvatarPreview(true);
  };

  return (
    <ProfileEditContainer>
      <ProfileEditWrap>
        <ProfileEditHeader>
          <HeaderTitle>프로필 수정</HeaderTitle>
        </ProfileEditHeader>
        <ProfileContentWrap>
          <AvatarContainer>
            <AvatarWrap>
              {avatarPreview ? (
                <Avatar src={avatar} />
              ) : (
                <Avatar src={userObj.avatar} />
              )}
              <label for="input-file">프로필사진 변경</label>
              <input
                type="file"
                id="input-file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={onFileChange}
              />
            </AvatarWrap>
            <button onClick={defaultAvatarChange}>기본이미지로 변경</button>
          </AvatarContainer>
          <InputContainer>
            <InputWrap>
              <span>*이메일</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="이메일"
                readOnly
              />
            </InputWrap>
            <InputWrap>
              <span>*닉네임</span>
              <input
                type="text"
                maxLength="12"
                name="nickname"
                value={nickname}
                onChange={onChange}
                placeholder="닉네임"
                required
              />
              <span
                style={{ marginTop: '5px', color: 'gray', fontWeight: '500' }}
              >
                닉네임은 최대 12자로 입력해주세요.
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
                required
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
                rows="4"
                minLength="10"
                maxLength="160"
                onChange={onChange}
                placeholder="최소 10자 최대 160자로 자신을 소개해보세요."
                required
              />
              <span>{intro.length}/160자</span>
            </InputWrap>
          </InputContainer>
        </ProfileContentWrap>
        <ButtonWrap>
          <button onClick={onSubmit}>변경하기</button>
          <button onClick={closeButton}>취소</button>
        </ButtonWrap>
      </ProfileEditWrap>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
