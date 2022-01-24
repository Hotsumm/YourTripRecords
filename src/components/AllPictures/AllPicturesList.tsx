import React from 'react';
import styled from 'styled-components';

const AllPicturesListContainer = styled.div`
  @media (max-width: 1024px) {
    padding: 0px 10px;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
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
  justify-content: flex-start;
  width: 100%;
  overflow-x: auto;
  gap: 0 10px;
  padding: 20px 10px;
`;
const PictureWrap = styled.div<{ index: number }>`
  & img {
    width: 120px;
    height: 90px;
    @media (max-width: 500px) {
      width: 100px;
      height: 75px;
    }
    @media (max-width: 368px) {
      width: 80px;
      height: 60px;
    }
  }
  opacity: 0.6;
  cursor: pointer;
  :nth-child(${(props) => props.index + 1}) {
    opacity: 1;
  }
`;

interface AllPicturesListProps {
  changePicture(index: number): void;
  pictureList: IPictureList[];
  pictureIndex: number;
}

const AllPicturesList: React.FC<AllPicturesListProps> = ({
  changePicture,
  pictureList,
  pictureIndex,
}) => {
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
