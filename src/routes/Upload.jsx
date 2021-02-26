import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';

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
  padding: 0px 130px;
`;

const PostContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  padding: 0 120px;
`;

const Post = styled.img`
  width: 35%;
  height: 100%;
  margin-right: 50px;
`;
const PostInputWrap = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
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
`;

const PostInfo = styled.div`
  display: flex;
  padding: 5px 0;
  align-items: flex-start;
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
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
    line-height: 20px;
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
  const [post, setPost] = useState(null);
  const [postPreview, setPostPreview] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'location') {
      setLocation(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    if (files.length > 15) {
      alert('사진을 15장 이하로 업로드 해주세요.');
      return;
    }
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setPost(result);
      setPostPreview(true);
    };
    reader.readAsDataURL(theFile);
  };
  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <UploadContainer>
        <UploadHeader>여행기록 올리기</UploadHeader>
        <UploadWrap>
          {post ? (
            <PostContainer>
              <Post src={post} alt="post" />
              <PostInputWrap>
                <PostInfo>
                  <span>제목</span>
                  <input
                    type="text"
                    placeholder="제목"
                    name="title"
                    onChange={onChange}
                    required
                  />
                </PostInfo>
                <PostInfo>
                  <span>위치</span>
                  <input
                    type="text"
                    placeholder="위치"
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
                      placeholder="설명"
                      rows="5"
                      maxLength="100"
                      name="description"
                      onChange={onChange}
                      required
                    />
                    <div>{description.length}/300자</div>
                  </TextAreaWrap>
                </PostInfo>
              </PostInputWrap>
            </PostContainer>
          ) : (
            <FileContainer>
              <label for="input-file">사진 올리기 (최대 15장)</label>
              <input
                type="file"
                id="input-file"
                style={{ display: 'none' }}
                accept="image/*"
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
            <button>업로드하기</button>
          </ButtonWrap>
        </UploadWrap>
      </UploadContainer>
    </>
  );
};

export default Upload;
