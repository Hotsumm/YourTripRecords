import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { firebaseFireStore } from '../firebaseConfig';
import Loading from '../components/Load/Loading';
import { UserContext } from '../Context';
import Footer from '../components/Home/Footer';
import PictureInfoEdit from '../components/PostEdit/PictureInfoEdit';
import RecordInfoEdit from '../components/PostEdit/RecordInfoEdit';

const PostEditContainer = styled.main`
  width: 100%;
  padding-top: 80px;
  text-align: center;
  max-width: 1450px;
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 0 20px;
  & button {
    width: 100px;
    height: 50px;
    border: 0.1px solid #16a085;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    pointer-events: ${(props) => props.loading && 'none'};
  }
`;

const PostEdit = ({ location }) => {
  const postObj = location.state.postObj;
  const history = useHistory();
  const { userObj } = useContext(UserContext);

  const [pictureObjList, setPictureObjList] = useState(
    location ? location.state.postObj.pictureList : [],
  );
  const [loading, setLoading] = useState(false);
  const [postTitle, setPostTitle] = useState(postObj.postTitle);
  const [season, setSeason] = useState(postObj.season);
  const [searchPlace, setSearchPlace] = useState([]);
  const [searchPlaceSelect, setSearchPlaceSelect] = useState([]);

  useEffect(() => {
    let placeNameList = [];
    let searchPlaceSelectList = [];

    for (let i = 0; i < postObj.pictureList.length; i++) {
      if (postObj.pictureList[i].location) {
        searchPlaceSelectList.push(true);
        placeNameList.push(postObj.pictureList[i].location.placeName);
      } else {
        searchPlaceSelectList.push(false);
        placeNameList.push('');
      }
    }

    setSearchPlace(placeNameList);
    setSearchPlaceSelect(searchPlaceSelectList);
  }, [postObj]);

  const locationSelect = (locationId, longitude, latitude, place_name, id) => {
    let newPictureObjList = [...pictureObjList];
    let newSearchPlace = [...searchPlace];
    let newSearchPlaceSelect = [...searchPlaceSelect];

    newSearchPlace[id] = place_name;
    newSearchPlaceSelect[id] = true;
    newPictureObjList[id].location = {
      coords: { longitude, latitude },
      placeName: place_name,
      locationId,
    };

    setSearchPlace(newSearchPlace);
    setSearchPlaceSelect(newSearchPlaceSelect);
    setPictureObjList(newPictureObjList);
  };

  const onChange = (e) => {
    const {
      target: { id, name, value },
    } = e;
    let newPictureObjList = [...pictureObjList];
    let newSearchPlace = [...searchPlace];
    let newSearchPlaceSelect = [...searchPlaceSelect];

    if (name === 'recordTitle') {
      setPostTitle(value);
    } else if (name === 'season') {
      setSeason(value);
    } else if (name === 'location') {
      if (newSearchPlaceSelect[id]) {
        newSearchPlaceSelect[id] = false;
        setSearchPlaceSelect(newSearchPlaceSelect);
      }

      newPictureObjList[id].location = null;
      newSearchPlace[id] = value;

      setSearchPlace(newSearchPlace);
      setPictureObjList(newPictureObjList);
    } else if (name === 'description') {
      newPictureObjList[id].description = value;
      setPictureObjList(newPictureObjList);
    }
  };

  const onPostEdit = () => {
    setLoading(true);
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
        setLoading(false);
        alert('여행기록 수정이 완료 되었습니다.');
        history.push(`/city/${postObj.city}/${postObj.postId}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Navigation show={true} />
      <PostEditContainer loading={loading ? 1 : 0}>
        <UploadHeaderWrap>
          <h1>여행기록 수정</h1>
        </UploadHeaderWrap>
        <PostEditWrap>
          {loading ? (
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
                    searchPlaceSelect={searchPlaceSelect}
                    locationSelect={locationSelect}
                  />
                </>
              )}
            </>
          )}
          <ButtonWrap loading={loading ? 1 : 0}>
            <button loading={loading ? 1 : 0} onClick={onPostEdit}>
              수정하기
            </button>
            <Link to="/" style={{ pointerEvents: loading && 'none' }}>
              <button loading={loading ? 1 : 0}>취소</button>
            </Link>
          </ButtonWrap>
        </PostEditWrap>
        <Footer />
      </PostEditContainer>
    </>
  );
};

export default PostEdit;
