import React from 'react';
import styled from 'styled-components';

import Pagination from '@components/Detail/KakaoMap/Pagination';

const PictureInfoContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PictureInfoWrap = styled.ul`
  @media (max-width: 1000px) {
    width: 100%;
  }
  padding: 0 10px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px 0;
  margin-bottom: 30px;

  & li {
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 20px 0;
      width: 500px;
    }
    @media (max-width: 520px) {
      width: 100%;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0 30px;
  }
`;

const PictureWrap = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
  position: relative;

  ::before {
    content: '';
    display: block;
    margin-top: 75%;
  }
  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const PictureInputWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PictureInfoContent = styled.div`
  @media (max-width: 768px) {
    gap: 5px 0;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0 10px;

  & h3 {
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
    -webkit-appearance: none;
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

interface PictureInfoProps {
  pictureFileList: IPictureFileList[];
  onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  searchPlace: string[];
  isSearchPlaceSelect: boolean[];
  locationSelect: LocationSelectParams;
}

const PictureInfo: React.FC<PictureInfoProps> = ({
  pictureFileList,
  onChange,
  searchPlace,
  isSearchPlaceSelect,
  locationSelect,
}) => {
  return (
    <PictureInfoContainer>
      <PictureInfoWrap>
        {pictureFileList.map((pictureFile, index) => (
          <li key={index}>
            <PictureWrap>
              <img src={pictureFile.picturePreview} alt="여행기록 사진" />
            </PictureWrap>
            <PictureInputWrap>
              <PictureInfoContent>
                <h3>위치</h3>
                <InputWrap>
                  <input
                    type="text"
                    placeholder="위치"
                    tabIndex={index}
                    name="location"
                    onChange={onChange}
                    value={searchPlace[index]}
                  />
                  {searchPlace[index] && !isSearchPlaceSelect[index] && (
                    <Pagination
                      searchPlace={searchPlace[index]}
                      locationSelect={locationSelect}
                      id={index}
                    />
                  )}
                </InputWrap>
              </PictureInfoContent>
              <PictureInfoContent>
                <h3>설명</h3>
                <TextAreaWrap>
                  <textarea
                    placeholder="최대 300자로 사진을 설명해보세요."
                    maxLength={300}
                    tabIndex={index}
                    rows={8}
                    name="description"
                    onChange={onChange}
                  />
                  <div>{pictureFileList[index].description.length}/300자</div>
                </TextAreaWrap>
              </PictureInfoContent>
            </PictureInputWrap>
          </li>
        ))}
      </PictureInfoWrap>
    </PictureInfoContainer>
  );
};

export default PictureInfo;
