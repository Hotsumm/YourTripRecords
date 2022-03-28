import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PreviewContainer = styled.div`
  width: 100%;
`;

const PreviewWrap = styled.div`
  @media (max-width: 500px) {
    display: flex;
    gap: 0;
  }
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  & button {
    position: absolute;
    bottom: 15px;
    right: 10px;
    padding: 10px 20px;
    border: 1px solid #16a085;
    border-radius: 5px;
    font-size: 0.8rem;
    :hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const PreviewImgWrap = styled.div`
  @media (max-width: 500px) {
    :not(:first-child) {
      display: none;
    }
  }
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
  :first-child {
    grid-area: 1 / 1 / 3 / 3;
  }
  :nth-child(2) {
    grid-area: 1 / 3 / 2 / 4;
  }
  :nth-child(3) {
    grid-area: 2 / 3 / 3 / 4;
  }
  :nth-child(4) {
    grid-area: 1 / 4 / 2 / 5;
  }
  :last-child {
    grid-area: 2 / 4 / 3 / 5;
  }
`;

interface PreviewProps {
  postObj: IPost;
  pathName: string;
}

const Preview: React.FC<PreviewProps> = ({ postObj, pathName }) => {
  return (
    <PreviewContainer>
      <PreviewWrap>
        {postObj.pictureList &&
          postObj.pictureList.length > 0 &&
          postObj.pictureList.map(
            (picture, index) =>
              index < 5 && (
                <PreviewImgWrap key={picture.pictureId}>
                  <Link
                    to={`${pathName}/${postObj.pictureList[index].pictureId}`}
                    state={{
                      initPictureIndex: index,
                      pictureList: postObj.pictureList,
                    }}
                  >
                    <img src={picture.pictureURL} alt="미리보기" />
                  </Link>
                </PreviewImgWrap>
              ),
          )}
        <Link
          to={`${pathName}/${postObj.pictureList[0].pictureId}`}
          state={{
            initPictureIndex: 0,
            pictureList: postObj.pictureList,
          }}
        >
          <button>사진 전체보기 ({postObj.pictureList.length}장)</button>
        </Link>
      </PreviewWrap>
    </PreviewContainer>
  );
};

export default Preview;
