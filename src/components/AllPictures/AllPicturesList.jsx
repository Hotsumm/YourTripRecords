import React from 'react';
import styled from 'styled-components';

const AllPicturesListContainer = styled.div`
  @media (max-width: 1024px) {
    padding: 0px 10px;
  }

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 40px;
  margin-bottom: 30px;
`;

const PicturesListWrap = styled.div`
  @media (max-width: 1024px) {
    order: 2;
  }
  display: flex;
  width: 100vw;
  overflow-x: auto;
  height: 150px;
  gap: 0 10px;
  padding: 20px 30px;
`;
const PictureWrap = styled.div`
  width: 150px;
  aspect-ratio: 4/3;
  opacity: 0.6;
  cursor: pointer;
  :nth-child(${(props) => props.index + 1}) {
    opacity: 1;
  }
  & img {
    width: 100%;
    height: 100%;
  }
`;

const AllPicturesList = ({ changePicture, pictureIndex, pictureList }) => {
  return (
    <AllPicturesListContainer>
      <PicturesListWrap>
        {pictureList.length > 0 &&
          pictureList.map((picture, index) => (
            <PictureWrap
              key={index}
              index={pictureIndex}
              onClick={() => changePicture(index)}
            >
              <img src={picture.pictureURL} alt="스크롤사진" />
            </PictureWrap>
          ))}
      </PicturesListWrap>
    </AllPicturesListContainer>
  );
};
export default AllPicturesList;
