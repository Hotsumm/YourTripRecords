import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { firebaseFireStore } from '../../firebaseConfig';
import { HiX } from 'react-icons/hi';
import Loading from '../Load/Loading';
import { ThemeContext } from '../../Context';

const LikesUserListContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

const LikesUserListWrap = styled.div`
  display: flex;
  max-height: 50%;
  border-radius: 10px;
  flex-direction: column;
  background: ${(props) => props.theme.menuColor};
`;

const LikesUserListHeader = styled.div`
  width: 100%;
  padding: 20px 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ababab80;
  & svg {
    position: absolute;
    left: 10px;
    cursor: pointer;
  }
  & h3 {
    font-size: 18px;
    font-weight: 700;
  }
`;

const LikesUserList = styled.ul`
  width: 100%;
  padding: 20px 0;
  display: flex;
  overflow-y: auto;
  max-height: calc(50vh - 59px);
  flex-direction: column;
  align-items: flex-start;
`;

const LikesUserInfoWrap = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 40px;
`;

const LikesUserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AvatarWrap = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 30px;
  gap: 5px 0;
`;

const UserNickname = styled.span`
  width: auto;
  font-size: 16px;
`;

const PostingCount = styled.span`
  width: auto;
  font-size: 12px;
  color: gray;
`;

const UserProfileLink = styled(Link)`
  width: 100px;
  height: 40px;
  & button {
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #ababab80;
    :hover {
      color: white;
      background: #16a085;
    }
  }
`;

interface LikesUserProps {
  postObj: IPost;
  toggleLikesUser(): void;
}

const LikesUser: React.FC<LikesUserProps> = ({ postObj, toggleLikesUser }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likesUserList, setLikesUserList] = useState<IUserObj[]>([]);

  const { theme } = useContext(ThemeContext);

  const closeButton = (): void => toggleLikesUser();

  const fetchLikesUser = useCallback<() => void>(async () => {
    setIsLoading(true);
    let likesUserArr: IUserObj[] = [];
    for (let userId of postObj.likes) {
      await firebaseFireStore
        .collection('users')
        .doc(userId)
        .get()
        .then((doc: any) => {
          if (doc.exists) {
            likesUserArr.push(doc.data());
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => console.log(error));
    }
    setLikesUserList(likesUserArr);
    setIsLoading(false);
  }, [postObj.likes]);

  useEffect(() => fetchLikesUser(), [fetchLikesUser]);

  return (
    <LikesUserListContainer>
      <LikesUserListWrap theme={theme}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <LikesUserListHeader>
              <HiX onClick={closeButton} size={'20'} />
              <h3>좋아요 한 사용자</h3>
            </LikesUserListHeader>
            <LikesUserList>
              {likesUserList &&
                likesUserList.length > 0 &&
                likesUserList.map((user, index) => (
                  <LikesUserInfoWrap key={index}>
                    <LikesUserInfo>
                      <AvatarWrap>
                        <img src={user.avatar} alt="프로필사진" />
                      </AvatarWrap>
                      <UserInfo>
                        <UserNickname>{user.nickname}</UserNickname>
                        <PostingCount>
                          포스팅 : {user.records.length}개
                        </PostingCount>
                      </UserInfo>
                      <UserProfileLink to={`/profile/${user.userId}`}>
                        <button>프로필 이동</button>
                      </UserProfileLink>
                    </LikesUserInfo>
                  </LikesUserInfoWrap>
                ))}
            </LikesUserList>
          </>
        )}
      </LikesUserListWrap>
    </LikesUserListContainer>
  );
};

export default LikesUser;
