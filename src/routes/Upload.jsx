import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { cityArray } from '../utils/cityArray';
import { firebaseFireStore } from '../firebaseConfig';
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

const RecordTitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  span {
    font-size: 16px;
    margin-right: 10px;
  }
  input {
    width: 300px;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
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
  select {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
  }
`;

const Upload = () => {
  const [posts, setPosts] = useState(null);
  const [recordTitle, setRecordTitle] = useState('');
  //  const [postObj, setPostObj] = useState(null);

  const onChange = (e) => {
    const {
      target: { id, name, value },
    } = e;
    let newArray = [...posts];

    if (name === 'recordTitle') {
      setRecordTitle(value);
    } else if (name === 'city') {
      newArray[id].city = value;
      setPosts(newArray);
    } else if (name === 'location') {
      newArray[id].location = value;
      setPosts(newArray);
    } else if (name === 'description') {
      newArray[id].description = value;
      setPosts(newArray);
    }
    // setPostObj({ recordTitle: recordTitle, ...posts });
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    if (files.length > 15) {
      alert('사진을 15장 이하로 업로드 해주세요.');
      return;
    }

    let pictureFiles = [];

    for (let i = 0; i < files.length; i++) {
      pictureFiles.push({
        picture: URL.createObjectURL(files[i]),
        city: '',
        location: '',
        description: '',
      });
    }

    setPosts(pictureFiles);
  };

  const onUpload = async () => {
    const postsRef = firebaseFireStore.collection('posts');
    await postsRef.add({
      recordTitle: recordTitle,
      postObj: posts,
      createdAt: getCreatedDay(),
    });
  };

  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <UploadContainer>
        <UploadHeader>여행기록 올리기</UploadHeader>
        <UploadWrap>
          {posts ? (
            <>
              <RecordTitleWrap>
                <span>여행 제목</span>
                <input type="title" name="recordTitle" onChange={onChange} />
              </RecordTitleWrap>
              {posts.map((post, index) => (
                <>
                  <PostContainer>
                    <Post src={post.picture} alt="post" />
                    <PostInputWrap>
                      <PostInfo>
                        <span>도시</span>
                        <select name="city" id={index} onChange={onChange}>
                          {cityArray &&
                            cityArray.length > 0 &&
                            cityArray.map((city, index) => (
                              <option key={index} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                        </select>
                      </PostInfo>
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
                            rows="5"
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
          </ButtonWrap>
        </UploadWrap>
      </UploadContainer>
    </>
  );
};

export default Upload;
