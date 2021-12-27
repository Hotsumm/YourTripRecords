import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { firebaseFireStore } from '../firebaseConfig';
import Loading from '../components/Load/Loading';
import { UserContext } from '../Context';
import Pagination from '../components/Detail/KakaoMap/Pagination';
import Footer from '../components/Home/Footer';

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
  & h1 {
    font-size: 40px;
  }
  margin-top: 50px;
`;
const PostEditWrap = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
`;

const RecordContainer = styled.ul`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
`;

const RecordWrap = styled.li`
  @media (max-width: 768px) {
    width: 100%;
  }
  display: flex;
  width: 768px;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  & span {
    width: 30%;
    font-size: 16px;
  }

  & input {
    -webkit-appearance: none;
    min-width: 50%;
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
  & select {
    -webkit-appearance: none;
    min-width: 50%;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const PictureInfoContainer = styled.article`
  display: flex;
  justify-content: center;
  width: 1000px;
  padding: 0 10px;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const PictureInfoWrap = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px 0;
  margin-bottom: 30px;

  & li {
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 20px 0;
      width: 80%;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0 50px;
  }
`;

const PictureWrap = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }

  & img {
    width: 100%;
    cursor: default;
  }
`;
const PictureInputWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PictureInfo = styled.div`
  @media (max-width: 768px) {
    gap: 5px 0;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0 10px;

  & h3 {
    font-weight: 700;
    text-align: left;
    margin-bottom: 5px;
  }
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  margin-bottom: 15px;
  & input {
    padding: 10px 5px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    :focus {
      outline: none;
      border: 2px solid #16a085;
    }
  }
  & span {
    font-weight: 700;
    text-align: left;
    margin-bottom: 5px;
  }
`;

const TextAreaWrap = styled.div`
  gap: 5px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  & textarea {
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
  div {
    width: 100%;
    text-align: right;
    margin-top: 5px;
  }
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
                      <span
                        style={{
                          minWidth: '50%',
                          textAlign: 'left',
                          fontWeight: 700,
                        }}
                      >
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
                  <PictureInfoContainer>
                    <PictureInfoWrap>
                      {pictureObjList.map((pictureObj, index) => (
                        <li key={index}>
                          <PictureWrap>
                            <img
                              src={pictureObj.pictureURL}
                              alt={pictureObj.pictureId}
                            />
                          </PictureWrap>
                          <PictureInputWrap>
                            <PictureInfo>
                              <h3>위치</h3>
                              <InputWrap>
                                <input
                                  type="text"
                                  placeholder="위치"
                                  id={index}
                                  name="location"
                                  value={
                                    searchPlace[index] ? searchPlace[index] : ''
                                  }
                                  onChange={onChange}
                                />
                                {searchPlace[index] &&
                                  !searchPlaceSelect[index] && (
                                    <Pagination
                                      searchPlace={searchPlace[index]}
                                      locationSelect={locationSelect}
                                      id={index}
                                    />
                                  )}
                              </InputWrap>
                            </PictureInfo>
                            <PictureInfo>
                              <h3>설명</h3>
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
                                  {pictureObjList[index].description.length}
                                  /300자
                                </div>
                              </TextAreaWrap>
                            </PictureInfo>
                          </PictureInputWrap>
                        </li>
                      ))}
                    </PictureInfoWrap>
                  </PictureInfoContainer>
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
