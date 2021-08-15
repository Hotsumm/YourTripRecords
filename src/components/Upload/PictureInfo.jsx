import React from 'react';
import styled from 'styled-components';
import Pagination from '../Detail/KakaoMap/Pagination';

const PictureInfoContainer = styled.div`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 100px;
`;

const PictureInfoWrap = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  width: 100%;
  gap: 0 50px;
  display: flex;
  justify-content: center;
  padding: 20px 10px;
`;

const PictureWrap = styled.div`
  width: 400px;
  @media (max-width: 500px) {
    width: 100%;
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  & img {
    width: 100%;
    aspect-ratio: 4/3;
    cursor: default;
  }
`;

const PictureInputWrap = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const PictureInfoInput = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px 0;
    width: 100%;
  }
  display: flex;
  padding: 5px 20px;
  gap: 0 10px;
  justify-content: flex-start;
  align-items: flex-start;

  & span {
    font-weight: 700;
    text-align: left;
    margin-bottom: 5px;
  }
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  margin-bottom: 15px;
  & input {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-style: none;
    border-radius: 5px;
    padding: 10px 5px;
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  & span {
    font-weight: 700;
    text-align: left;
    margin-bottom: 5px;
  }
`;

const TextAreaWrap = styled.div`
  gap: 5px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  textarea {
    -webkit-appearance: none;
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
  div {
    width: 100%;
    text-align: right;
    margin-top: 5px;
  }
`;

const PictureInfo = ({
  posts,
  onChange,
  searchPlace,
  searchPlaceSelect,
  locationSelect,
}) => {
  return (
    <PictureInfoContainer>
      {posts.map((post, index) => (
        <PictureInfoWrap key={index}>
          <PictureWrap>
            <img src={post.picturePreview} alt="post" />
          </PictureWrap>
          <PictureInputWrap>
            <PictureInfoInput>
              <InputWrap>
                <span>위치</span>
                <input
                  type="text"
                  placeholder="위치"
                  id={index}
                  name="location"
                  onChange={onChange}
                  value={searchPlace[index]}
                />
                {searchPlace[index] && !searchPlaceSelect[index] && (
                  <Pagination
                    searchPlace={searchPlace[index]}
                    locationSelect={locationSelect}
                    id={index}
                  />
                )}
              </InputWrap>
            </PictureInfoInput>
            <PictureInfoInput>
              <TextAreaWrap>
                <span>설명</span>
                <textarea
                  type="text"
                  placeholder="최대 300자로 사진을 설명해보세요."
                  rows="7"
                  maxLength="300"
                  id={index}
                  name="description"
                  onChange={onChange}
                />
                <div>{posts[index].description.length}/300자</div>
              </TextAreaWrap>
            </PictureInfoInput>
          </PictureInputWrap>
        </PictureInfoWrap>
      ))}
    </PictureInfoContainer>
  );
};

export default PictureInfo;
