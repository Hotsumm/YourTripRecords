import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '@src/Context';
import { firebaseFireStore } from '@src/firebaseConfig';
import PictureInfoEdit from '@components/PostEdit/PictureInfoEdit';
import RecordInfoEdit from '@components/PostEdit/RecordInfoEdit';
import Navigation from '@components/Navigation/Navigation';
import Loading from '@components/Load/Loading';
import Footer from '@components/Home/Footer';

const PostEditContainer = styled.main`
  width: 100%;
  padding-top: 80px;
  text-align: center;
  max-width: 2560px;
  margin: 0 auto;
`;
const UploadHeaderWrap = styled.header`
  @media (max-width: 768px) {
    font-size: 30px;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & h1 {
    font-size: 40px;
    @media (max-width: 320px) {
      font-size: 30px;
    }
  }
`;
const PostEditWrap = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
`;

const ButtonWrap = styled.div<{ isLoading: number }>`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 0 20px;
  & button {
    @media (max-width: 320px) {
      width: 90px;
      height: 45px;
    }
    font-size: 14px;
    width: 100px;
    height: 50px;
    border: 0.1px solid #16a085;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    pointer-events: ${(props) => props.isLoading && 'none'};
  }
`;

interface InputsProps {
  postTitle: string;
  season: string;
}

interface LocationProps {
  state: {
    postObj: IPost;
  };
}

const PostEdit: React.FC = () => {
  const navigate = useNavigate();
  const {
    state: { postObj },
  } = useLocation() as LocationProps;

  const { userObj } = useContext(UserContext);
  const [inputs, setInputs] = useState<InputsProps>({
    postTitle: postObj.postTitle,
    season: postObj.season,
  });
  const [pictureObjList, setPictureObjList] = useState<IPictureList[]>(
    postObj.pictureList,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchPlace, setSearchPlace] = useState<string[]>([]);
  const [isSearchPlaceSelect, setIsSearchPlaceSelect] = useState<boolean[]>([]);

  const { postTitle, season } = inputs;

  useEffect(() => {
    let placeNameList: string[] = [];
    let isSearchPlaceSelectList: boolean[] = [];

    for (let i = 0; i < postObj.pictureList.length; i++) {
      const pictureLocation = postObj.pictureList[i].location;

      if (pictureLocation) {
        isSearchPlaceSelectList.push(true);
        placeNameList.push(pictureLocation.placeName);
      } else {
        isSearchPlaceSelectList.push(false);
        placeNameList.push('');
      }
    }

    setSearchPlace(placeNameList);
    setIsSearchPlaceSelect(isSearchPlaceSelectList);
  }, [postObj]);

  const locationSelect: LocationSelectParams = (
    locationId,
    longitude,
    latitude,
    place_name,
    id,
  ) => {
    let newPictureObjList = [...pictureObjList];
    let newSearchPlace = [...searchPlace];
    let newIsSearchPlaceSelect = [...isSearchPlaceSelect];

    newSearchPlace[id] = place_name;
    newIsSearchPlaceSelect[id] = true;
    newPictureObjList[id].location = {
      coords: { longitude, latitude },
      placeName: place_name,
      locationId,
    };

    setSearchPlace(newSearchPlace);
    setIsSearchPlaceSelect(newIsSearchPlaceSelect);
    setPictureObjList(newPictureObjList);
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const {
      target: { tabIndex, name, value },
    } = e;

    let newPictureObjList = [...pictureObjList];
    let newSearchPlace = [...searchPlace];
    let newIsSearchPlaceSelect = [...isSearchPlaceSelect];

    if (name === 'location') {
      if (newIsSearchPlaceSelect[tabIndex]) {
        newIsSearchPlaceSelect[tabIndex] = false;
        setIsSearchPlaceSelect(newIsSearchPlaceSelect);
      }

      newPictureObjList[tabIndex].location = null;
      newSearchPlace[tabIndex] = value;

      setSearchPlace(newSearchPlace);
      setPictureObjList(newPictureObjList);
      return;
    } else if (name === 'description') {
      newPictureObjList[tabIndex].description = value;
      setPictureObjList(newPictureObjList);
      return;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onPostEdit = () => {
    setIsLoading(true);
    const recordsRef = firebaseFireStore
      .collection('records')
      .doc(postObj.postId);

    recordsRef
      .update({
        postId: postObj.postId,
        postTitle,
        createdAt: postObj.createdAt,
        city: postObj.city,
        season,
        likes: postObj.likes,
        creator: { userObj },
        pictureList: [...pictureObjList],
      })
      .then(() => {
        setIsLoading(false);
        alert('여행기록 수정이 완료 되었습니다.');
        navigate(`/city/${postObj.city}/${postObj.postId}`);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const closeButton = () => {
    const answer = confirm('작성을 취소 하시겠습니까?');
    if (answer) navigate(-1);
  };

  return (
    <>
      <Navigation show={true} />
      <PostEditContainer>
        <UploadHeaderWrap>
          <h1>여행기록 수정</h1>
        </UploadHeaderWrap>
        <PostEditWrap>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {postObj && (
                <>
                  <RecordInfoEdit
                    postObj={postObj}
                    onChange={onChange}
                    postTitle={postTitle}
                    season={season}
                  />
                  <PictureInfoEdit
                    pictureObjList={pictureObjList}
                    onChange={onChange}
                    searchPlace={searchPlace}
                    isSearchPlaceSelect={isSearchPlaceSelect}
                    locationSelect={locationSelect}
                  />
                </>
              )}
            </>
          )}
          <ButtonWrap isLoading={isLoading ? 1 : 0}>
            <button onClick={onPostEdit}>수정하기</button>
            <button onClick={closeButton}>취소</button>
          </ButtonWrap>
        </PostEditWrap>
        <Footer />
      </PostEditContainer>
    </>
  );
};

export default PostEdit;
