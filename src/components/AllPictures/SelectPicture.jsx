import React, { useContext } from 'react';
import styled from 'styled-components';
import Marker from '../Detail/KakaoMap/Marker';
import { ThemeContext } from '../../Context';
import { AiOutlineSound } from 'react-icons/ai';
import { TiLocationOutline } from 'react-icons/ti';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';

const SelectPictureContainer = styled.div`
  @media (max-width: 1024px) {
    order: 3;
    padding: 30px 50px;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 500px) {
    padding: 30px 10px;
  }

  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 30px;
`;

const SelectPictureSlideWrap = styled.div`
  @media (max-width: 1200px) {
    width: 600px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
  width: 800px;
  position: relative;
  display: flex;
  align-items: center;
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

const SelectPictureWrap = styled.div`
  aspect-ratio: 4/3;
  width: 100%;
  height: 100%;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const SelectPictureInfoWrap = styled.div`
  @media (max-width: 1400px) {
    width: 400px;
  }
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    height: 400px;
  }
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }
  width: 500px;
  height: 600px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const PictureInfoHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 0 10px;
  & span {
    display: inline;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    margin-top: 3px;
  }
`;

const HeaderIconWrap = styled.div`
  & svg {
    font-size: 22px;
  }
`;

const DescriptionWrap = styled.div`
  @media (max-width: 1024px) {
    height: 100%;
    border-bottom: none;
    border-right: 1px solid #f1f2f6;
  }
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #f1f2f6;
  }
  width: 100%;
  height: 325px;
  max-height: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #f1f2f6;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 2;
  color: ${(props) => !props.description && 'gray'};
`;

const LocationWrap = styled.div`
  @media (max-width: 1024px) {
    height: 100%;
  }
  @media (max-width: 768px) {
  }
  width: 100%;
  height: 275px;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const KakaoMapWrap = styled.div`
  @media (max-width: 1200px) {
    width: 250px;
  }
  @media (max-width: 1024px) {
    width: 350px;
  }
  @media (max-width: 500px) {
    width: 270px;
    height: 150px;
  }
  @media (max-width: 375px) {
    width: 200px;
  }
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  & span {
    display: inline;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    font-weight: 600;
    margin-bottom: 15px;
  }
`;

const MarkerWrap = styled.div`
  width: 100%;
  height: 100%;
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

const SelectPicture = ({ selectPicture, slideLeft, slideRight }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SelectPictureContainer>
      <SelectPictureSlideWrap>
        <BsArrowLeftShort onClick={slideLeft} size={32} />
        <SelectPictureWrap>
          <img src={selectPicture.pictureURL} alt="선택사진" />
        </SelectPictureWrap>
        <BsArrowRightShort onClick={slideRight} size={32} />
      </SelectPictureSlideWrap>
      <SelectPictureInfoWrap>
        <DescriptionWrap>
          <PictureInfoHeaderWrap>
            <HeaderIconWrap>
              <AiOutlineSound />
            </HeaderIconWrap>
            <span>설명</span>
          </PictureInfoHeaderWrap>
          <Description description={selectPicture.description}>
            {selectPicture.description
              ? selectPicture.description
              : '설명 없음'}
          </Description>
        </DescriptionWrap>
        <LocationWrap>
          <PictureInfoHeaderWrap>
            <HeaderIconWrap>
              <TiLocationOutline style={{ color: theme.textColor }} />
            </HeaderIconWrap>
            <span>위치</span>
          </PictureInfoHeaderWrap>
          {selectPicture.location ? (
            <KakaoMapWrap>
              <span
                onClick={() =>
                  window.open(
                    `https://map.kakao.com/link/map/${selectPicture.location.locationId}`,
                  )
                }
              >
                {selectPicture.location.placeName}
              </span>
              <MarkerWrap>
                <Marker coords={selectPicture.location.coords} />
              </MarkerWrap>
            </KakaoMapWrap>
          ) : (
            <NoLocationWrap>
              <NoLocation>위치 정보가 없습니다.</NoLocation>
            </NoLocationWrap>
          )}
        </LocationWrap>
      </SelectPictureInfoWrap>
    </SelectPictureContainer>
  );
};

export default SelectPicture;
