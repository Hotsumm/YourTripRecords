import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { firebaseFireStore } from '../firebaseConfig';
import Loading from '../components/Load/Loading';
import { UserContext } from '../Context';
import Pagination from '../components/Detail/KakaoMap/Pagination';

const PostEditContainer = styled.div`
  width: 100%;
  padding: 80px 0;
  text-align: center;
  max-width: 1450px;
  margin: 0 auto;
`;
const PostEditHeader = styled.div`
  margin: 50px 0;
  font-size: 40px;
`;
const PostEditWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px 250px;
`;

const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const RecordWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 450px;
  padding: 10px 0;
  span {
    width: 20%;
    font-size: 14px;
    margin-right: 10px;
  }
  :first-child {
    span {
      font-size: 18px;
    }
  }
  input {
    width: 80%;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  select {
    width: 80%;
    padding: 7px;
    font-size: 14px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const PictureContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`;

const Picture = styled.img`
  width: 35%;
  height: 80%;
  margin-right: 50px;
  cursor: default;
`;
const PictureInputWrap = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
`;

const PictureInfo = styled.div`
  position: relative;
  display: flex;
  padding: 5px 0;
  align-items: flex-start;
  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  span {
    width: 10%;
    margin-right: 10px;
    font-weight: 700;
  }
`;

const TextAreaWrap = styled.div`
  width: 100%;
  display: flex;
  textarea {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    line-height: 20px;
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  flex-direction: column;
  div {
    width: 100%;
    text-align: right;
    margin-top: 5px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #16a085;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  :first-child {
    margin-right: 30px;
  }
  pointer-events: ${(props) => props.loading && 'none'};
`;

const PostEdit = ({ match, location }) => {
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
      <PostEditContainer>
        <PostEditHeader>여행기록 수정</PostEditHeader>
        <PostEditWrap>
          {loading ? (
            <Loading />
          ) : (
            <>
              {postObj && (
                <>
                  <RecordContainer>
                    <RecordWrap>
                      <span>여행 제목</span>
                      <input
                        type="title"
                        name="recordTitle"
                        value={postTitle}
                        onChange={onChange}
                      />
                    </RecordWrap>
                    <RecordWrap>
                      <span>도시</span>
                      <span style={{ textAlign: 'left', fontWeight: 700 }}>
                        {postObj.city}
                      </span>
                    </RecordWrap>
                    <RecordWrap>
                      <span>여행 계절</span>
                      <select name="season" value={season} onChange={onChange}>
                        <option value="봄">봄</option>
                        <option value="여름">여름</option>
                        <option value="가을">가을</option>
                        <option value="겨울">겨울</option>
                      </select>
                    </RecordWrap>
                  </RecordContainer>
                  {pictureObjList.map((pictureObj, index) => (
                    <PictureContainer key={index}>
                      <Picture src={pictureObj.pictureURL} alt="picture" />
                      <PictureInputWrap>
                        <PictureInfo>
                          <span>위치</span>
                          <input
                            type="text"
                            placeholder="위치"
                            id={index}
                            name="location"
                            value={searchPlace[index] ? searchPlace[index] : ''}
                            onChange={onChange}
                          />
                          {searchPlace[index] && !searchPlaceSelect[index] && (
                            <Pagination
                              searchPlace={searchPlace[index]}
                              locationSelect={locationSelect}
                              id={index}
                            />
                          )}
                        </PictureInfo>
                        <PictureInfo>
                          <span>설명</span>
                          <TextAreaWrap>
                            <textarea
                              type="text"
                              placeholder="최대 300자로 사진을 설명해보세요."
                              rows="7"
                              maxLength="300"
                              id={index}
                              name="description"
                              value={pictureObj.description}
                              onChange={onChange}
                            />
                            <div>
                              {pictureObjList[index].description.length}/300자
                            </div>
                          </TextAreaWrap>
                        </PictureInfo>
                      </PictureInputWrap>
                    </PictureContainer>
                  ))}
                </>
              )}
            </>
          )}
          <ButtonWrap loading={loading ? 1 : 0}>
            <Button loading={loading ? 1 : 0} onClick={onPostEdit}>
              수정하기
            </Button>
            <Link to="/" style={{ pointerEvents: loading && 'none' }}>
              <Button loading={loading ? 1 : 0}>취소</Button>
            </Link>
          </ButtonWrap>
        </PostEditWrap>
      </PostEditContainer>
    </>
  );
};

export default PostEdit;
