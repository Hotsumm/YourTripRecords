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
  :last-child {
    position: relative;
    grid-area: 2 / 4 / 3 / 5;
    button {
      position: absolute;
      bottom: 15px;
      right: 10px;
      width: 130px;
      height: 40px;

      border: 1px solid #16a085;
      border-radius: 5px;
      font-size: 12 px;
      :hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;
const Preview = ({ postObj, pathName }) => {
  return (
    <PreviewContainer>
      <PreviewWrap>
        {postObj.pictureList &&
          postObj.pictureList.length > 0 &&
          postObj.pictureList.map(
            (picture, index) =>
              index < 4 && (
                <PreviewImgWrap key={picture.pictureId}>
                  <Link
                    to={{
                      pathname: `${pathName}/${postObj.pictureList[index].pictureId}`,
                      state: {
                        postId: postObj.postId,
                        pictureIndex: index,
                        pictureList: postObj.pictureList,
                      },
                    }}
                  >
                    <PreviewImg src={picture.pictureURL} />
                  </Link>
                </PreviewImgWrap>
              ),
          )}
        <PreviewImgWrap key={postObj.pictureList[4].pictureId}>
          <Link
            to={{
              pathname: `${pathName}/${postObj.pictureList[4].pictureId}`,
              state: {
                pictureIndex: 4,
                pictureList: postObj.pictureList,
              },
            }}
          >
            <PreviewImg src={postObj.pictureList[4].pictureURL} />
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
        </PreviewImgWrap>
      </PreviewWrap>
    </PreviewContainer>
  );
};

export default Preview;
