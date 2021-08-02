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
  max-height: 400px;
  border-radius: 10px;
  overflow: auto;
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
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const LikesUserList = styled.ul`
  width: 100%;
  padding: 20px 0;
  display: flex;
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

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 40px;
`;

const UserNickname = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;

const PostingCount = styled.span`
  font-size: 12px;
  color: gray;
`;

const UserProfileButton = styled.button`
  text-align: right;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ababab80;
  :hover {
    color: white;
    background: #16a085;
  }
`;

const LikesUser = ({ postObj, toggleLikesUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [likesUserList, setLikesUserList] = useState([]);

  const { theme } = useContext(ThemeContext);

  const closeButton = () => toggleLikesUser();

  const fetchLikesUser = useCallback(async () => {
    setIsLoading(true);
    let likesUserArr = [];
    for (let userId of postObj.likes) {
      await firebaseFireStore
        .collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
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
              <HiX onClick={closeButton} size={'20'}>
                x
              </HiX>
              <Header>좋아요 한 사용자</Header>
            </LikesUserListHeader>
            <LikesUserList>
              {likesUserList &&
                likesUserList.length > 0 &&
                likesUserList.map((user, index) => (
                  <LikesUserInfoWrap key={index}>
                    <LikesUserInfo>
                      <Avatar src={user.avatar} />
                      <UserInfo>
                        <UserNickname>{user.nickname}</UserNickname>
                        <PostingCount>
                          포스팅 : {user.records.length}개
                        </PostingCount>
                      </UserInfo>
                      <Link to={`/profile/${user.userId}`}>
                        <UserProfileButton>프로필 이동</UserProfileButton>
                      </Link>
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
