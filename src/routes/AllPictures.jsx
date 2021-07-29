import React, { useState } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import Marker from '../components/Detail/KakaoMap/Marker';

const AllPicturesContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  max-width: 1450px;
  margin: 0 auto;
`;

const AllPicturesWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 60px 30px 60px;
`;

const AllPicturesHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
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
  padding: 30px 20px;
`;

const SelectPictureSlideWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
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
  min-width: 800px;
  min-height: 400px;
  max-width: 1000px;
  max-height: 600px;
`;

const SelectPictureInfoWrap = styled.div`
  width: 1000%;
  height: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const SelectPictureInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DescriptionWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #f1f2f6;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 2;
  color: ${(props) => (props.description ? 'black' : 'gray')};
`;

const LocationWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`;

const Header = styled.span`
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 15px;
`;

const KakaoMapWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Location = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
`;

const NoLocationWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NoLocation = styled.span`
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: black;
  text-decoration: underline;
`;

const AllPicturesList = styled.div`
  width: 100%;
  max-width: 1200px;
  overflow: auto;
  height: 150px;
  display: flex;
  padding: 20px 30px;

  img {
    opacity: 0.6;
    :nth-child(${(props) => props.index + 1}) {
      opacity: 1;
    }
  }
`;
const ListPicture = styled.img`
  cursor: pointer;
  width: 130px;
  height: 100%;
  margin-right: 10px;
`;

const AllPictures = ({ match, location }) => {
  const pictureList = location.state ? location.state.pictureList : null;
  const [pictureIndex, setPictureIndex] = useState(
    location.state ? location.state.pictureIndex : null,
  );
  const [selectPicture, setSelectPicture] = useState(
    pictureList ? pictureList[pictureIndex] : null,
  );

  const postId = match.params.postId;
  const cityName = match.params.cityName;

  const history = useHistory();

  if (location.state === undefined) history.push('/');

  window.onpopstate = () => {
    history.push(`/city/${cityName}/${postId}`);
  };

  const changePicture = (index) => {
    setPictureIndex(index);
    setSelectPicture(pictureList[index]);
    history.push({
      pathname: `/city/${cityName}/${postId}/${pictureList[index].pictureId}`,
      state: { pictureList, pictureIndex: index },
    });
  };

  const onCloseBtn = () => {
    history.push(`/city/${cityName}/${postId}`);
  };

  const slideLeft = () => {
    if (pictureIndex > 0) {
      history.push({
        pathname: `/city/${cityName}/${postId}/${
          pictureList[pictureIndex - 1].pictureId
        }`,
        state: { pictureList, pictureIndex: pictureIndex - 1 },
      });
      setPictureIndex((index) => index - 1);
      setSelectPicture(pictureList[pictureIndex - 1]);
    }
  };

  const slideRight = () => {
    if (pictureIndex < pictureList.length - 1) {
      history.push({
        pathname: `/city/${cityName}/${postId}/${
          pictureList[pictureIndex + 1].pictureId
        }`,
        state: { pictureList, pictureIndex: pictureIndex + 1 },
      });
      setPictureIndex((index) => index + 1);
      setSelectPicture(pictureList[pictureIndex + 1]);
    }
  };

  return (
    <AllPicturesContainer>
      {pictureList && (
        <>
          <AllPicturesHeader>
            <BsBoxArrowInLeft onClick={onCloseBtn} size={24} />
            <PictureNumber>
              {pictureIndex + 1}/{pictureList.length}
            </PictureNumber>
          </AllPicturesHeader>
          <AllPicturesWrap>
            <SelectPictureContainer>
              <SelectPictureSlideWrap>
                <BsArrowLeftShort onClick={slideLeft} size={32} />
                <SelectPicture src={selectPicture.pictureURL}></SelectPicture>
                <BsArrowRightShort onClick={slideRight} size={32} />
              </SelectPictureSlideWrap>
              <SelectPictureInfoWrap>
                <SelectPictureInfo>
                  <DescriptionWrap>
                    <Header>설명</Header>
                    <Description description={selectPicture.description}>
                      {selectPicture.description
                        ? selectPicture.description
                        : '설명 없음'}
                    </Description>
                  </DescriptionWrap>
                  {selectPicture.location ? (
                    <LocationWrap>
                      <Header>위치</Header>
                      <KakaoMapWrap>
                        <Location
                          onClick={() =>
                            window.open(
                              `https://map.kakao.com/link/map/${selectPicture.location.locationId}`,
                            )
                          }
                        >
                          {selectPicture.location.placeName}
                        </Location>
                        <Marker coords={selectPicture.location.coords} />
                      </KakaoMapWrap>
                    </LocationWrap>
                  ) : (
                    <LocationWrap>
                      <Header style={{ marginBottom: 0 }}>위치</Header>
                      <NoLocationWrap>
                        <NoLocation>위치 정보가 없습니다.</NoLocation>
                      </NoLocationWrap>
                    </LocationWrap>
                  )}
                </SelectPictureInfo>
              </SelectPictureInfoWrap>
            </SelectPictureContainer>
            <AllPicturesList index={pictureIndex}>
              {pictureList.length > 0 &&
                pictureList.map((picture, index) => (
                  <ListPicture
                    key={index}
                    src={picture.pictureURL}
                    onClick={() => changePicture(index)}
                  />
                ))}
            </AllPicturesList>
          </AllPicturesWrap>
        </>
      )}
    </AllPicturesContainer>
  );
};

export default AllPictures;
