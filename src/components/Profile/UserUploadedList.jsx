import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { firebaseFireStore } from '../../firebaseConfig';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loading from '../Load/Loading';

const UploadedListContainer = styled.ul`
  display: flex;
  width: 75%;
`;

const UploadedListWrap = styled.li`
  position: relative;
  width: 33%;
  margin: 0 0px 20px 10px;
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
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
  font-size: 14px;
`;

const IconWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 3px;
  :hover {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
  cursor: pointer;
`;

const PostTitle = styled.div`
  font-size: 16px;
`;

const PostCreated = styled.div`
  font-size: 10px;
  color: gray;
`;

const EditWrap = styled.div`
  position: absolute;
  background: white;
  width: 100px;
  border-radius: 5px;
  top: 30px;
  right: -90px;
  padding: 5px 0px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  ul {
    width: 100%;
  }
  li {
    font-size: 12px;
    padding: 5px 10px;
    cursor: pointer;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const UserUploadedList = ({ thisUser }) => {
  const [loading, setLoading] = useState(true);
  const [recordList, setRecordList] = useState(null);
  const [isEditClick, setIsEditClick] = useState(false);

  const userRecordsList = thisUser.records;

  const handleEdit = () => setIsEditClick(!isEditClick);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    let recordArr = [];
    for (let i = 0; i < userRecordsList.length; i++) {
      await firebaseFireStore
        .collection('records')
        .doc(userRecordsList[i])
        .get()
        .then((doc) => {
          if (doc.exists) {
            recordArr.push(doc.data());
          } else {
            console.log('찾을 수 없음.');
          }
        })
        .finally(() => setLoading(false));
      setRecordList(recordArr);
    }
  }, [userRecordsList]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <UploadedListContainer>
          {recordList &&
            recordList.map((record, index) => (
              <UploadedListWrap key={index}>
                <Link to={`/city/${record.city}/${record.postId}`}>
                  <PostContainer>
                    <PostHeaderWrap>
                      <PostHeader>
                        <AvatarWrap>
                          <Avatar src={thisUser.avatar}></Avatar>
                          <NickName>{thisUser.nickname}</NickName>
                        </AvatarWrap>
                      </PostHeader>
                      <PostHeader>
                        <PostTitle>
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
                <IconWrap>
                  <BsThreeDots onClick={handleEdit} size={26} />
                </IconWrap>
                {isEditClick && (
                  <EditWrap>
                    <ul>
                      <li>게시물 수정하기</li>
                      <li>게시물 삭제하기</li>
                      <li onClick={handleEdit} style={{ color: 'red' }}>
                        취소
                      </li>
                    </ul>
                  </EditWrap>
                )}
              </UploadedListWrap>
            ))}
        </UploadedListContainer>
      )}
    </>
  );
};

export default UserUploadedList;
