import React from 'react';
import styled from 'styled-components';

import Pagination from '@components/Detail/KakaoMap/Pagination';

interface PictureInfoEditProps {
  pictureObjList: IPictureList[];
  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  searchPlace: string[];
  isSearchPlaceSelect: boolean[];
  locationSelect: LocationSelectParams;
}

const PictureInfoEdit: React.FC<PictureInfoEditProps> = ({
  pictureObjList,
  onChange,
  searchPlace,
  isSearchPlaceSelect,
  locationSelect,
}) => {
  return (
    <PictureInfoContainer>
      <PictureInfoWrap>
        {pictureObjList.map((pictureObj, index) => (
          <li key={pictureObj.pictureId}>
            <PictureWrap>
              <img src={pictureObj.pictureURL} alt="여행기록 사진" />
            </PictureWrap>
            <PictureInputWrap>
              <PictureInfo>
                <h3>위치</h3>
                <InputWrap>
                  <input
                    type="text"
                    placeholder="위치"
                    name="location"
                    value={searchPlace[index] ? searchPlace[index] : ''}
                    onChange={onChange}
                    tabIndex={index}
                  />
                  {searchPlace[index] && !isSearchPlaceSelect[index] && (
                    <Pagination
                      searchPlace={searchPlace[index]}
                      locationSelect={locationSelect}
                      id={index}
                    />
                  )}
                </InputWrap>
              </PictureInfo>
              <PictureInfo>
                <h3>설명</h3>
                <TextAreaWrap>
                  <textarea
                    placeholder="최대 300자로 사진을 설명해보세요."
                    rows={7}
                    maxLength={300}
                    tabIndex={index}
                    name="description"
                    value={pictureObj.description}
                    onChange={onChange}
                  />
                  <div>
                    {pictureObjList[index].description.length}
                    /300자
                  </div>
                </TextAreaWrap>
              </PictureInfo>
            </PictureInputWrap>
          </li>
        ))}
      </PictureInfoWrap>
    </PictureInfoContainer>
  );
};

const PictureInfoContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PictureInfoWrap = styled.ul`
  @media (max-width: 1000px) {
    width: 100%;
  }
  width: 1000px;
  padding: 0 10px;
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
  position: relative;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }

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

const PictureInfo = styled.div`
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
    padding: 10px 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
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
  & textarea {
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
  & div {
    width: 100%;
    text-align: right;
    margin-top: 5px;
  }
`;

export default PictureInfoEdit;
