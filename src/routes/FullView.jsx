import React, { useState } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';

const FullViewContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
  max-width: 1450px;
  margin: 0 auto;
`;

const FullViewWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 80px;
  margin-bottom: 30px;
`;

const FullViewHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  svg {
    cursor: pointer;
    position: absolute;
    left: 40px;
  }
`;
const PictureNumber = styled.div`
  font-size: 18px;
`;

const SelectPictureContainer = styled.div`
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const SelectPictureSlideWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px 30px 20px;
  svg {
    position: absolute;
    color: white;
    cursor: pointer;
    :first-child {
      left: 10px;
    }
    :last-child {
      right: 10px;
    }
    :hover {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  }
`;

const SelectPicture = styled.img`
  width: 100%;
  height: 100%;
`;

const SelectPictureInfoWrap = styled.div`
  width: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 30px 20px 30px 0;
`;
const SelectPictureInfo = styled.div``;

const LocationWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 20px 30px;
  border-bottom: 1px solid #f1f2f6;
  span {
    font-size: 18px;
    font-weight: 700;
    margin-right: 20px;
  }
`;

const Location = styled.div`
  font-size: 16px;
`;

const DescriptionWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  span {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

const Description = styled.div`
  font-size: 16px;
  color: ${(props) => (props.description ? 'black' : 'gray')};
`;

const FullViewList = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  img {
    opacity: 0.6;
    :nth-child(${(props) => props.index + 1}) {
      opacity: 1;
    }
  }
`;
const ListPicture = styled.img`
  cursor: pointer;
  width: 120px;
  height: 100px;
  margin-right: 10px;
`;

const FullView = ({ match, location, history }) => {
  const pictureList = location.state.pictureList;
  const postId = match.params.postId;
  const cityName = match.params.cityName;
  const [pictureIndex, setPictureIndex] = useState(location.state.pictureIndex);
  const [selectPicture, setSelectPicture] = useState(pictureList[pictureIndex]);

  const onCloseBtn = () => {
    history.push(`/city/${cityName}/${postId}`);
  };

  const changePicture = (index) => {
    setPictureIndex(index);
    setSelectPicture(pictureList[index]);
  };

  const slideLeft = () => {
    if (pictureIndex > 0) {
      setPictureIndex((index) => index - 1);
      setSelectPicture(pictureList[pictureIndex - 1]);
    }
  };

  const slideRight = () => {
    if (pictureIndex < pictureList.length - 1) {
      setPictureIndex((index) => index + 1);
      setSelectPicture(pictureList[pictureIndex + 1]);
    }
  };

  return (
    <FullViewContainer>
      <FullViewHeader>
        <BsBoxArrowInLeft onClick={onCloseBtn} size={24} />
        <PictureNumber>
          {pictureIndex + 1}/{pictureList.length}
        </PictureNumber>
      </FullViewHeader>
      <FullViewWrap>
        <SelectPictureContainer>
          <SelectPictureSlideWrap>
            <BsArrowLeftShort onClick={slideLeft} size={32} />
            <SelectPicture src={selectPicture.pictureURL}></SelectPicture>
            <BsArrowRightShort onClick={slideRight} size={32} />
          </SelectPictureSlideWrap>
          <SelectPictureInfoWrap>
            <SelectPictureInfo>
              <LocationWrap>
                <span>위치</span>
                <Location>{selectPicture.location}</Location>
              </LocationWrap>
              <DescriptionWrap>
                <span>설명</span>
                <Description description={selectPicture.description}>
                  {selectPicture.description
                    ? selectPicture.description
                    : '설명 없음'}
                </Description>
              </DescriptionWrap>
            </SelectPictureInfo>
          </SelectPictureInfoWrap>
        </SelectPictureContainer>
      </FullViewWrap>
      <FullViewList index={pictureIndex}>
        {pictureList.length > 0 &&
          pictureList.map((picture, index) => (
            <ListPicture
              key={index}
              src={picture.pictureURL}
              onClick={() => changePicture(index)}
            ></ListPicture>
          ))}
      </FullViewList>
    </FullViewContainer>
  );
};

export default FullView;
