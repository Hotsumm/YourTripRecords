import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PreviewContainer = styled.div`
  width: 100%;
`;

const PreviewWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 180px);
  grid-gap: 5px;
`;

const PreviewImgWrap = styled.div`
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
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const LastPreviewImg = styled.div`
  position: relative;
  grid-area: 2 / 4 / 3 / 5;
  button {
    position: absolute;
    bottom: 15px;
    right: 10px;
    width: 130px;
    height: 40px;
    background: white;
    border: 1px solid #16a085;
    border-radius: 5px;
    font-size: 12 px;
    :hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Preview = ({ postObj, pathName }) => {
  console.log(pathName);
  return (
    <PreviewContainer>
      <PreviewWrap>
        {postObj.pictureList &&
          postObj.pictureList.length > 0 &&
          postObj.pictureList.map(
            (picture, index) =>
              index < 4 && (
                <PreviewImgWrap>
                  <Link
                    to={{
                      pathname: `${pathName}/${postObj.pictureList[index].pictureId}`,
                      state: {
                        pictureIndex: index,
                        pictureList: postObj.pictureList,
                      },
                    }}
                  >
                    <PreviewImg
                      key={picture.pictureId}
                      src={picture.pictureURL}
                    />
                  </Link>
                </PreviewImgWrap>
              ),
          )}
        <LastPreviewImg>
          <Link
            to={{
              pathname: `${pathName}/${postObj.pictureList[5].pictureId}`,
              state: {
                pictureIndex: 5,
                pictureList: postObj.pictureList,
              },
            }}
          >
            <PreviewImg
              key={postObj.pictureList[5].pictureId}
              src={postObj.pictureList[5].pictureURL}
            />
          </Link>
          <Link
            to={{
              pathname: `${pathName}/${postObj.pictureList[0].pictureId}`,
              state: {
                pictureIndex: 0,
                pictureList: postObj.pictureList,
              },
            }}
          >
            <button>사진 전체보기 ({postObj.pictureList.length}장)</button>
          </Link>
        </LastPreviewImg>
      </PreviewWrap>
    </PreviewContainer>
  );
};

export default Preview;
