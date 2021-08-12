import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { TiLocationOutline } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import Marker from '../components/Detail/KakaoMap/Marker';
import { ThemeContext } from '../Context';

const AllPicturesContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1450px;
  margin: 0 auto;
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

const AllPicturesWrap = styled.div`
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 40px;
  margin-bottom: 30px;
`;

const PictureNumber = styled.div`
  font-size: 18px;
`;

const SelectPictureContainer = styled.div`
  @media (max-width: 768px) {
    order: 3;
  }
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    padding: 30px 0;
    flex-direction: column;
  }
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
`;

const SelectPictureInfoWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
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
  max-width: 500px;
  font-size: 14px;
  line-height: 2;
  color: ${(props) => !props.description && 'gray'};
`;

const LocationWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`;

const PictureInfoHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  & svg {
    margin-right: 5px;
  }
`;

const PictureInfoHeader = styled.span`
  display: inline;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  margin-top: 3px;
`;

const KakaoMapWrap = styled.div`
  width: 100%;
  max-height: 200px;
  max-width: 300px;
  height: 200px;
  aspect-ratio: 4/3;
  display: flex;
  flex-direction: column;
`;

const Location = styled.span`
  display: inline;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  font-weight: 600;
  margin-bottom: 15px;
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
  text-decoration: underline;
`;

const AllPicturesList = styled.div`
  @media (max-width: 768px) {
    order: 2;
    height: 100px;
  }
  width: 100%;
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

  const { theme } = useContext(ThemeContext);

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
    <AllPicturesContainer theme={theme}>
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
                    <PictureInfoHeaderWrap>
                      <BsReverseLayoutTextSidebarReverse size={16} />
                      <PictureInfoHeader>설명</PictureInfoHeader>
                    </PictureInfoHeaderWrap>
                    <Description description={selectPicture.description}>
                      {selectPicture.description
                        ? selectPicture.description
                        : '설명 없음'}
                    </Description>
                  </DescriptionWrap>
                  {selectPicture.location ? (
                    <LocationWrap>
                      <PictureInfoHeaderWrap>
                        <TiLocationOutline
                          style={{ color: theme.textColor }}
                          size={22}
                        />
                        <PictureInfoHeader>위치</PictureInfoHeader>
                      </PictureInfoHeaderWrap>
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
                      <PictureInfoHeaderWrap>
                        <TiLocationOutline
                          stlye={{ color: theme.textColor }}
                          size={20}
                        />
                        <PictureInfoHeader style={{ marginBottom: 0 }}>
                          위치
                        </PictureInfoHeader>
                      </PictureInfoHeaderWrap>
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
