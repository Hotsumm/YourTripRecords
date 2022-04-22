import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiX } from 'react-icons/hi';

import { firebaseFireStore } from '@src/firebaseConfig';
import { ThemeContext } from '@src/Context';
import Loading from '@components/Load/Loading';

const LikedUserListContainer = styled.div`
  @media (max-width: 390px) {
    padding: 0px 10px;
  }
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

const LikedUserListWrap = styled.div`
  @media (max-width: 390px) {
    width: 100%;
  }
  width: 370px;
  display: flex;
  max-height: 50%;
  border-radius: 10px;
  flex-direction: column;
  background: ${(props) => props.theme.menuColor};
`;

const LikedUserListHeader = styled.div`
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

const LikedUserList = styled.ul`
  width: 100%;
  padding: 20px 0;
  gap: 20px 0;
  display: flex;
  overflow-y: auto;
  max-height: calc(50vh - 59px);
  flex-direction: column;
  align-items: flex-start;

  & li {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 390px) {
      padding: 0 10px;
    }
    padding: 0 20px;
  }
`;

const LikedUserInfoWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AvatarWrap = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 10px;
  margin-top: 4px;
  gap: 5px 0;
  & span {
    :first-child {
      @media (max-width: 390px) {
        font-size: 14px;
      }
      width: auto;
      white-space: pre;
      font-size: 16px;
    }
    :last-child {
      @media (max-width: 390px) {
        font-size: 10px;
      }
      width: auto;
      white-space: pre;
      font-size: 12px;
      color: gray;
    }
  }
`;

const UserProfileLink = styled(Link)`
  width: 100px;
  & button {
    text-align: center;
    width: 100%;
    height: 100%;
    white-space: pre;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ababab80;
    :hover {
      color: white;
      background: #16a085;
    }
  }
`;

interface LikedUserProps {
  likedUserList: string[];
  toggleLikesUser(): void;
}

const LikedUser: React.FC<LikedUserProps> = ({
  likedUserList,
  toggleLikesUser,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likesUserList, setLikesUserList] = useState<IUserObj[]>([]);

  const { theme } = useContext(ThemeContext);

  const closeButton = (): void => toggleLikesUser();

  const fetchLikesUserCallback = useCallback<() => void>(async () => {
    setIsLoading(true);
    let likesUserArr: IUserObj[] = [];
    for (let userId of likedUserList) {
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
  }, [likedUserList]);

  useEffect(() => {
    const fetchLikesUser = () => {
      fetchLikesUserCallback();
    };
    fetchLikesUser();
  }, [fetchLikesUserCallback]);

  return (
    <LikedUserListContainer>
      <LikedUserListWrap theme={theme}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <LikedUserListHeader>
              <HiX onClick={closeButton} size={'20'} />
              <h3>좋아요 한 사용자</h3>
            </LikedUserListHeader>
            <LikedUserList>
              {likesUserList &&
                likesUserList.length > 0 &&
                likesUserList.map((user) => (
                  <li key={user.userId}>
                    <LikedUserInfoWrap>
                      <AvatarWrap>
                        <img src={user.avatar} alt="프로필사진" />
                      </AvatarWrap>
                      <UserInfo>
                        <span>{user.nickname}</span>
                        <span>포스팅 : {user.records.length}개</span>
                      </UserInfo>
                    </LikedUserInfoWrap>
                    <UserProfileLink to={`/profile/${user.userId}`}>
                      <button>프로필 이동</button>
                    </UserProfileLink>
                  </li>
                ))}
            </LikedUserList>
          </>
        )}
      </LikedUserListWrap>
    </LikedUserListContainer>
  );
};

export default LikedUser;
