import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../Context';
import { cityArray } from '../utils/cityArray';
import { firebaseFireStore, firebaseStorage } from '../firebaseConfig';
import { getCreatedDay } from '../utils/getCreatedDay';

const UploadContainer = styled.div`
  padding-top: 80px;
  width: 100%;
  height: 100vw;
  background: #f1f2f6;
  text-align: center;
`;
const UploadHeader = styled.div`
  margin: 60px 0;
  font-size: 40px;
`;

const UploadWrap = styled.div`
  display: flex;
  flex-direction: column;
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
    font-size: 18px;
    margin-right: 10px;
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
    padding: 10px;
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
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
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

const FileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;

  label {
    width: 450px;
    height: 100%;
    position: absolute;
    display: flex;
    background: white;
    border: 2px dashed gray;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: black;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
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
  button {
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
  }
`;

const Upload = () => {
  const { userObj } = useContext(UserContext);
  const history = useHistory();
  const [posts, setPosts] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [city, setCity] = useState('서울');

  const onChange = (e) => {
    const {
      target: { id, name, value },
    } = e;
    let newArray = [...posts];

    if (name === 'recordTitle') {
      setPostTitle(value);
    } else if (name === 'city') {
      console.log(value);
      setCity(value);
    } else if (name === 'location') {
      newArray[id].location = value;
      setPosts(newArray);
    } else if (name === 'description') {
      newArray[id].description = value;
      setPosts(newArray);
    }
  };

  const onFileChange = (e) => {
    const {
      target: { files: fileArr },
    } = e;

    if (fileArr.length > 15) {
      alert('사진을 15장 이하로 업로드 해주세요.');
      return;
    }

    let fileURLs = [];
    let pictureFiles = [];

    for (let i = 0; i < fileArr.length; i++) {
      let file = fileArr[i];

      pictureFiles.push({
        picturePreview: URL.createObjectURL(fileArr[i]),
        fileName: fileArr[i].name,
        picture: '',
        location: '',
        description: '',
      });

      const reader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        fileURLs[i] = result;
        pictureFiles[i].picture = fileURLs[i];
      };
      reader.readAsDataURL(file);
    }
    setPosts(pictureFiles);
  };

  const onUpload = async () => {
    const postRefId = uuidv4();
    let pictureInfo = [];
    for (let i = 0; i < posts.length; i++) {
      const fileRef = firebaseStorage.ref(postRefId).child(posts[i].fileName);
      const res = await fileRef.putString(posts[i].picture, 'data_url');
      const pictureURL = await res.ref.getDownloadURL();
      pictureInfo.push({
        location: posts[i].location,
        description: posts[i].description,
        fileName: posts[i].fileName,
        pictureURL: pictureURL,
      });
    }

    const postsRef = firebaseFireStore.collection('records');
    await postsRef
      .add({
        postTitle,
        createdAt: getCreatedDay(),
        city,
        creator: {
          userObj,
        },
        pictureList: {
          ...pictureInfo,
        },
      })
      .then(() => alert('업로드가 완료 되었습니다.'))
      .then(() => history.push('/'))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <UploadContainer>
        <UploadHeader>여행기록 올리기</UploadHeader>
        <UploadWrap>
          {posts ? (
            <>
              <RecordContainer>
                <RecordWrap>
                  <span>여행 제목</span>
                  <input type="title" name="recordTitle" onChange={onChange} />
                </RecordWrap>
                <RecordWrap>
                  <span>도시</span>
                  <select name="city" onChange={onChange}>
                    {cityArray &&
                      cityArray.length > 0 &&
                      cityArray.map((city, index) => (
                        <option key={index} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                  </select>
                </RecordWrap>
              </RecordContainer>
              {posts.map((post, index) => (
                <>
                  <PostContainer>
                    <Post src={post.picturePreview} alt="post" />
                    <PostInputWrap>
                      <PostInfo>
                        <span>위치</span>
                        <input
                          type="text"
                          placeholder="위치"
                          id={index}
                          name="location"
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
          ) : (
            <FileContainer>
              <label for="input-file">사진 올리기 (최대 15장)</label>
              <input
                type="file"
                id="input-file"
                style={{ display: 'none' }}
                accept="image/*"
                multiple="multiple"
                onChange={onFileChange}
              />
            </FileContainer>
          )}
          <GuideContainer>
            <GuideHeader>가이드 라인</GuideHeader>
            <Guide>*여행기록의 제목을 지어주세요.</Guide>
            <Guide>
              *자신이 다녀왔던 여행지의 여행사진들을 업로드 해주세요.
            </Guide>
            <Guide>*여행사진별로 설명글을 작성해주세요.</Guide>
            <Guide>*사진은 최대 15장까지 업로드할 수 있습니다.</Guide>
            <Guide>*사진의 크기는 최대 15MB 미만이여야 합니다.</Guide>
          </GuideContainer>
          <ButtonWrap>
            <button onClick={onUpload}>업로드하기</button>
            <Link to="/">
              <button>취소</button>
            </Link>
          </ButtonWrap>
        </UploadWrap>
      </UploadContainer>
    </>
  );
};

export default Upload;
