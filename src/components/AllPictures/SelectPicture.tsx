import React, { useContext } from 'react';
import styled from 'styled-components';
import Marker from '../Detail/KakaoMap/Marker';
import { ThemeContext } from '../../Context';
import { AiOutlineSound } from 'react-icons/ai';
import { TiLocationOutline } from 'react-icons/ti';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';

const SelectPictureContainer = styled.article`
  @media (max-width: 1024px) {
    order: 3;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  width: 100%;
  max-width: 1440px;
  padding: 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const SelectPictureSlideWrap = styled.div`
  @media (max-width: 1024px) {
    width: 100%;
  }
  width: 65%;
  position: relative;
  display: flex;
  align-items: center;
  & svg {
    position: absolute;
    color: white;
    cursor: pointer;
    z-index: 99;
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
  width: 100%;
  position: relative;
  ::before {
    content: '';
    display: block;
    margin-top: 75%;
  }
  & img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const SelectPictureInfoWrap = styled.div`
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    height: 350px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

  width: 35%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const PictureInfoHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 0 5px;
  & span {
    display: inline;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
  }
`;

const HeaderIconWrap = styled.div`
  width: 23px;
  height: 23px;
  & svg {
    width: 100%;
    height: 100%;
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
  height: 55%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #f1f2f6;
`;

const Description = styled.div<{ description: string }>`
  font-size: 14px;
  line-height: 2;
  color: ${(props) => !props.description && 'gray'};
`;

const LocationWrap = styled.div`
  @media (max-width: 1024px) {
    height: 100%;
  }
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const KakaoMapWrap = styled.div`
  @media (max-width: 768px) {
    width: 98%;
  }
  width: 80%;
  min-height: 85%;
  display: flex;
  flex-direction: column;
`;

const KakaoMapLinkWrap = styled.div`
  width: 100%;
  margin-bottom: 10px;
  & span {
    display: inline;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    font-weight: 600;
  }
`;

const MarkerWrap = styled.div`
  position: relative;
  ::before {
    content: '';
    display: block;
    margin-top: 50%;
  }
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

interface SelectPictureProps {
  selectPicture: IPictureList;
  slideLeft(): void;
  slideRight(): void;
}

const SelectPicture: React.FC<SelectPictureProps> = ({
  selectPicture,
  slideLeft,
  slideRight,
}) => {
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
              <AiOutlineSound size={22} />
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
              <TiLocationOutline size={22} style={{ color: theme.textColor }} />
            </HeaderIconWrap>
            <span>위치</span>
          </PictureInfoHeaderWrap>
          {selectPicture.location ? (
            <KakaoMapWrap>
              <KakaoMapLinkWrap>
                <span
                  onClick={() =>
                    window.open(
                      `https://map.kakao.com/link/map/${selectPicture.location?.locationId}`,
                    )
                  }
                >
                  {selectPicture.location.placeName}
                </span>
              </KakaoMapLinkWrap>
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
