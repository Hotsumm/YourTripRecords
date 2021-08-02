import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { firebaseFireStore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import Loading from '../Load/Loading';
import { ThemeContext } from '../../Context';

const UploadedListContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const UploadedListHeader = styled.span`
  margin-bottom: 40px;
  font-size: 26px;
  font-weight: 600;
`;

const NoUploadedList = styled.span`
  color: gray;
  font-size: 20px;
  text-decoration: underline;
`;

const UploadedListWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const PostThumbnail = styled.img`
  width: 100%;
  height: 220px;
`;

const PostHeaderWrap = styled.div`
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

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
`;

const NickName = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
`;

const PostTitle = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
`;

const PostCreated = styled.div`
  font-size: 10px;
  color: gray;
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
          <UploadedListHeader>
            {thisUser.nickname}의 여행기록
          </UploadedListHeader>
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
                            <Avatar src={thisUser.avatar}></Avatar>
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
                      <PostThumbnail
                        src={record.pictureList[0].pictureURL}
                        alt={record.pictureList[0].fileName}
                      />
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
