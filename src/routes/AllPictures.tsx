import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { ThemeContext } from '../Context';
import SelectPicture from '../components/AllPictures/SelectPicture';
import AllPicturesList from '../components/AllPictures/AllPicturesList';

const AllPicturesContainer = styled.main`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 2560px;
  margin: 0 auto;
  padding: 0 20px;
`;

const AllPicturesHeaderWrap = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  & h1 {
    font-size: 18px;
  }

  & svg {
    @media (max-width: 1024px) {
      left: 20px;
    }
    cursor: pointer;
    position: absolute;
    left: 40px;
  }
`;

interface MatchProps {
  postId: string;
  cityName: string;
}

interface LocationProps {
  initPictureIndex: number;
  pictureList: IPictureList[];
}

const AllPictures: React.FC<
  RouteComponentProps<MatchProps, {}, LocationProps>
> = ({ match, location }) => {
  const { postId, cityName } = match.params;
  const { initPictureIndex, pictureList } = location.state;

  const [pictureIndex, setPictureIndex] = useState<number>(initPictureIndex);
  const [selectPicture, setSelectPicture] = useState<IPictureList>(
    pictureList[pictureIndex],
  );
  const history = useHistory();
  const { theme } = useContext(ThemeContext);

  if (location.state === undefined) history.push('/');

  window.onpopstate = () => history.push(`/city/${cityName}/${postId}`);

  const slideLeft = (): void => {
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

  const slideRight = (): void => {
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

  const changePicture = (index: number): void => {
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

  return (
    <AllPicturesContainer theme={theme}>
      {pictureList && (
        <>
          <AllPicturesHeaderWrap>
            <BsBoxArrowInLeft onClick={onCloseBtn} size={24} />
            <h1>
              {pictureIndex + 1}/{pictureList.length}
            </h1>
          </AllPicturesHeaderWrap>
          <SelectPicture
            selectPicture={selectPicture}
            slideLeft={slideLeft}
            slideRight={slideRight}
          />
          <AllPicturesList
            changePicture={changePicture}
            pictureList={pictureList}
            pictureIndex={pictureIndex}
          />
        </>
      )}
    </AllPicturesContainer>
  );
};

export default AllPictures;
