import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { firebaseFireStore } from '../firebaseConfig';
import Loading from '../components/Load/Loading';
import { UserContext } from '../Context';

const PostEditContainer = styled.div`
  width: 100%;
  padding: 80px 0;
  background: #f1f2f6;
  text-align: center;
`;
const PostEditHeader = styled.div`
  margin: 50px 0;
  font-size: 40px;
`;
const PostEditWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 250px;
`;

const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const RecordWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 450px;
  padding: 10px 0;
  span {
    width: 20%;
    font-size: 14px;
    margin-right: 10px;
  }
  :first-child {
    span {
      font-size: 18px;
    }
  }
  input {
    width: 80%;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  select {
    width: 80%;
    padding: 7px;
    font-size: 14px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const PostContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`;

const Post = styled.img`
  width: 35%;
  height: 80%;
  margin-right: 50px;
  cursor: default;
`;
const PostInputWrap = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
`;

const PostInfo = styled.div`
  display: flex;
  padding: 5px 0;
  align-items: flex-start;
  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  span {
    width: 10%;
    margin-right: 10px;
    font-weight: 700;
  }
`;

const TextAreaWrap = styled.div`
  width: 100%;
  display: flex;
  textarea {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    line-height: 20px;
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  flex-direction: column;
  div {
    width: 100%;
    text-align: right;
    margin-top: 5px;
  }
`;

const GuideContainer = styled.div`
  margin: 35px 0 25px 0;
`;

const GuideHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Guide = styled.div`
  font-size: 14px;
  padding: 5px 0;
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  background: white;
  border: 0.1px solid #16a085;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  color: black;
  border-radius: 5px;
  :first-child {
    margin-right: 30px;
  }
  pointer-events: ${(props) => props.loading && 'none'};
`;

const PostEdit = ({ match, location }) => {
  const postObj = location.state.postObj;
  const history = useHistory();
  const { userObj } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(
    location ? location.state.postObj.pictureList : null,
  );
  const [postTitle, setPostTitle] = useState(postObj.postTitle);
  const [season, setSeason] = useState(postObj.season);

  const onChange = (e) => {
    const {
      target: { id, name, value },
    } = e;
    let newArray = [...posts];

    if (name === 'recordTitle') {
      setPostTitle(value);
    } else if (name === 'season') {
      setSeason(value);
    } else if (name === 'location') {
      newArray[id].location = value;
      setPosts(newArray);
    } else if (name === 'description') {
      newArray[id].description = value;
      setPosts(newArray);
    }
  };

  const onPostEdit = async () => {
    setLoading(true);
    const recordsRef = firebaseFireStore
      .collection('records')
      .doc(postObj.postId);

    recordsRef
      .update({
        postId: postObj.postId,
        postTitle,
        createdAt: postObj.createdAt,
        city: postObj.city,
        season,
        likes: postObj.likes,
        creator: { userObj },
        pictureList: [...posts],
      })
      .then(() => alert('여행기록 수정이 완료 되었습니다.'))
      .then(() => history.push('/'))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navigation show={true} />
      <PostEditContainer>
        <PostEditHeader>여행기록 수정</PostEditHeader>
        <PostEditWrap>
          {loading ? (
            <Loading />
          ) : (
            <>
              {postObj && (
                <>
                  <RecordContainer>
                    <RecordWrap>
                      <span>여행 제목</span>
                      <input
                        type="title"
                        name="recordTitle"
                        value={postTitle}
                        onChange={onChange}
                      />
                    </RecordWrap>
                    <RecordWrap>
                      <span>도시</span>
                      <span style={{ textAlign: 'left', fontWeight: 700 }}>
                        {postObj.city}
                      </span>
                    </RecordWrap>
                    <RecordWrap>
                      <span>여행 계절</span>
                      <select name="season" value={season} onChange={onChange}>
                        <option value="봄">봄</option>
                        <option value="여름">여름</option>
                        <option value="가을">가을</option>
                        <option value="겨울">겨울</option>
                      </select>
                    </RecordWrap>
                  </RecordContainer>
                  {posts.map((post, index) => (
                    <>
                      <PostContainer>
                        <Post src={post.pictureURL} alt="post" />
                        <PostInputWrap>
                          <PostInfo>
                            <span>위치</span>
                            <input
                              type="text"
                              placeholder="위치"
                              id={index}
                              name="location"
                              value={post.location}
                              onChange={onChange}
                              required
                            />
                          </PostInfo>
                          <PostInfo>
                            <span>설명</span>
                            <TextAreaWrap>
                              <textarea
                                type="text"
                                placeholder="최대 300자로 사진을 설명해보세요."
                                rows="7"
                                maxLength="300"
                                id={index}
                                name="description"
                                value={post.description}
                                onChange={onChange}
                                required
                              />
                              <div>{posts[index].description.length}/300자</div>
                            </TextAreaWrap>
                          </PostInfo>
                        </PostInputWrap>
                      </PostContainer>
                    </>
                  ))}
                </>
              )}
            </>
          )}

          <GuideContainer>
            <GuideHeader>가이드 라인</GuideHeader>
            <Guide>*여행기록의 제목을 지어주세요.</Guide>
            <Guide>
              *자신이 다녀왔던 여행지의 여행사진들을 업로드 해주세요.
            </Guide>
            <Guide>*여행사진별로 설명글을 작성해주세요.</Guide>
            <Guide>
              *사진은 최소 5장에서 최대 15장까지 업로드할 수 있습니다.
            </Guide>
            <Guide>*사진의 크기는 최대 15MB 미만이여야 합니다.</Guide>
          </GuideContainer>
          <ButtonWrap loading={loading}>
            <Button loading={loading} onClick={onPostEdit}>
              수정하기
            </Button>
            <Link to="/" style={{ pointerEvents: loading && 'none' }}>
              <Button loading={loading}>취소</Button>
            </Link>
          </ButtonWrap>
        </PostEditWrap>
      </PostEditContainer>
    </>
  );
};

export default PostEdit;
