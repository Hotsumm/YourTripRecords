import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { firebaseFireStore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import Loading from '../Load/Loading';
import { ThemeContext } from '../../Context';

const UploadedListContainer = styled.section`
  width: 70%;
  @media (max-width: 1200px) {
    width: 65%;
  }
  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }
  display: flex;
  flex-direction: column;
`;

const UploadedListHeaderWrap = styled.header`
  width: 100%;
  margin-bottom: 40px;
`;

const UploadedListHeader = styled.h2`
  font-size: 26px;
  font-weight: 600;
`;

const NoUploadedList = styled.span`
  color: gray;
  font-size: 20px;
  text-decoration: underline;
`;

const UploadedListWrap = styled.ul`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

const UploadedList = styled.li`
  width: 100%;
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.menuColor};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
`;

const PostHeaderWrap = styled.header`
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :first-child {
    margin-bottom: 10px;
  }
`;

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarImgWrap = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const NickName = styled.h4`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
`;

const PostTitle = styled.h3`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
`;

const PostCreated = styled.div`
  font-size: 10px;
  color: gray;
`;

const PostThumbnailWrap = styled.div`
  width: 100%;
  position: relative;
  ::before {
    content: '';
    display: block;
    margin-top: 75%;
  }
  & img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const UserUploadedList = ({ userObj, thisUser }) => {
  const [loading, setLoading] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const { theme } = useContext(ThemeContext);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    let recordArr = [];
    for (let i = 0; i < thisUser.records.length; i++) {
      await firebaseFireStore
        .collection('records')
        .doc(thisUser.records[i])
        .get()
        .then((doc) => {
          if (doc.exists) {
            recordArr.push(doc.data());
          } else {
            console.log('찾을 수 없음.');
          }
        });
    }
    setLoading(false);
    setRecordList(recordArr);
  }, [thisUser.records]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <UploadedListContainer>
          <UploadedListHeaderWrap>
            <UploadedListHeader>
              {thisUser.nickname}의 여행기록
            </UploadedListHeader>
          </UploadedListHeaderWrap>
          {recordList.length === 0 ? (
            <NoUploadedList>아직 등록한 게시물이 없습니다.</NoUploadedList>
          ) : (
            <UploadedListWrap>
              {recordList.map((record, index) => (
                <UploadedList key={index}>
                  <Link to={`/city/${record.city}/${record.postId}`}>
                    <PostContainer theme={theme}>
                      <PostHeaderWrap>
                        <PostHeader>
                          <AvatarWrap>
                            <AvatarImgWrap>
                              <img src={thisUser.avatar} alt="프로필 사진" />
                            </AvatarImgWrap>
                            <NickName theme={theme}>
                              {thisUser.nickname}
                            </NickName>
                          </AvatarWrap>
                        </PostHeader>
                        <PostHeader>
                          <PostTitle theme={theme}>
                            {record.postTitle.length > 14
                              ? `${record.postTitle.substring(0, 14)}...`
                              : record.postTitle}
                          </PostTitle>
                          <PostCreated>{record.createdAt}</PostCreated>
                        </PostHeader>
                      </PostHeaderWrap>
                      <PostThumbnailWrap>
                        <img
                          src={record.pictureList[0].pictureURL}
                          alt="썸네일"
                        />
                      </PostThumbnailWrap>
                    </PostContainer>
                  </Link>
                </UploadedList>
              ))}
            </UploadedListWrap>
          )}
        </UploadedListContainer>
      )}
    </>
  );
};

export default UserUploadedList;
