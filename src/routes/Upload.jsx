import React, { useState, useContext } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { v4 as uuidv4 } from 'uuid';
import { cityArray } from '../utils/cityArray';
import { firebaseFireStore, firebaseStorage } from '../firebaseConfig';
import { getCreatedDay } from '../utils/getCreatedDay';
import Loading from '../components/Load/Loading';
import { UserContext, ThemeContext } from '../Context';
import Footer from '../components/Home/Footer';
import UploadGuide from '../components/Upload/UploadGuide';
import RecordInfo from '../components/Upload/RecordInfo';
import PictureInfo from '../components/Upload/PictureInfo';

const UploadContainer = styled.main`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  padding-top: 80px;
  text-align: center;
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
    @media (max-width: 500px) {
      font-size: 30px;
    }
  }
`;

const UploadWrap = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
`;

const UploadFileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 520px) {
    padding: 0 10px;
  }
`;

const UploadFileWrap = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (max-width: 320px) {
    height: 200px;
  }
  position: relative;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelWrap = styled.div`
  position: absolute;
  opacity: 0.9;
  width: 100%;
  height: 100%;

  & label {
    background: #cae5dd;
    cursor: pointer;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.textColor};
    display: flex;
    border: 1px dashed #16a085;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    :hover {
      opacity: 0.7;
    }
  }
`;

const LabelTextWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 15px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    @media (max-width: 320px) {
      font-size: 16px;
    }
    font-size: 20px;
  }
`;

const IconWrap = styled.div`
  @media (max-width: 320px) {
    width: 60px;
    height: 60px;
  }
  width: 80px;
  height: 80px;
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0 20px;
  & button {
    font-size: 14px;
    @media (max-width: 320px) {
      width: 90px;
      height: 45px;
    }
    width: 100px;
    height: 50px;
    border: 0.1px solid #16a085;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const Upload = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState('서울');
  const [postTitle, setPostTitle] = useState('');
  const [season, setSeason] = useState('봄');
  const [searchPlace, setSearchPlace] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState([]);
  const [searchPlaceSelect, setSearchPlaceSelect] = useState([]);

  const { userObj, refreshUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const locationSelect = (locationId, longitude, latitude, place_name, id) => {
    let newPosts = [...posts];
    let newSearchPlace = [...searchPlace];
    let newSearchPlaceSelect = [...searchPlaceSelect];

    newSearchPlace[id] = place_name;
    newSearchPlaceSelect[id] = true;
    newPosts[id].location = {
      coords: { longitude, latitude },
      placeName: place_name,
      locationId,
    };

    setSearchPlace(newSearchPlace);
    setSearchPlaceSelect(newSearchPlaceSelect);
    setPosts(newPosts);
  };

  const handleHashtagSelect = (name) => {
    let newSelectedHashtag = [...selectedHashtag];

    if (selectedHashtag.includes(name)) {
      newSelectedHashtag = newSelectedHashtag.filter(
        (element) => element !== name,
      );
      setSelectedHashtag([...newSelectedHashtag]);
      return;
    }

    newSelectedHashtag.push(name);
    setSelectedHashtag([...newSelectedHashtag]);
  };

  const onChange = (e) => {
    const {
      target: { id, name, value },
    } = e;

    let newPosts = [...posts];
    let newSearchPlace = [...searchPlace];
    let newSearchPlaceSelect = [...searchPlaceSelect];

    if (name === 'recordTitle') {
      setPostTitle(value);
    } else if (name === 'city') {
      setCity(value);
    } else if (name === 'season') {
      setSeason(value);
    } else if (name === 'location') {
      if (newSearchPlaceSelect[id]) {
        newSearchPlaceSelect[id] = false;
      }

      newPosts[id].location = null;
      newSearchPlace[id] = value;

      setSearchPlace(newSearchPlace);
      setSearchPlaceSelect(newSearchPlaceSelect);
      setPosts(newPosts);
    } else if (name === 'description') {
      newPosts[id].description = value;
      setPosts(newPosts);
    }
  };

  const onFileChange = (e) => {
    const {
      target: { files: fileArr },
    } = e;

    if (fileArr.length > 15) alert('사진을 15장 이하로 업로드 해주세요.');
    else if (fileArr.length < 5) alert('사진을 최소 5장 이상 업로드 해주세요.');

    let fileURLs = [];
    let pictureFiles = [];
    let searchPlaceList = [];
    let searchPlaceSelectList = [];

    for (let i = 0; i < fileArr.length; i++) {
      let file = fileArr[i];

      searchPlaceList.push('');
      searchPlaceSelectList.push(false);

      pictureFiles.push({
        picturePreview: URL.createObjectURL(fileArr[i]),
        fileName: fileArr[i].name,
        picture: '',
        location: null,
        description: '',
      });

      const reader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        fileURLs[i] = result;
        pictureFiles[i].picture = fileURLs[i];
      };
      reader.readAsDataURL(file);
    }
    setPosts(pictureFiles);
    setSearchPlace(searchPlaceList);
    setSearchPlaceSelect(searchPlaceSelectList);
  };

  const onUpload = async () => {
    setIsLoading(true);

    const pictureInfo = [];
    const postId = uuidv4();

    for (let post of posts) {
      const fileRef = firebaseStorage
        .ref(city)
        .child(`${postId}/${post.fileName}`);

      const res = await fileRef.putString(post.picture, 'data_url');
      const pictureURL = await res.ref.getDownloadURL();

      pictureInfo.push({
        pictureId: uuidv4(),
        location: post.location,
        description: post.description,
        fileName: post.fileName,
        pictureURL: pictureURL,
      });
    }

    const docData = {
      postId,
      postTitle,
      createdAt: getCreatedDay(),
      city,
      season,
      hashtags: selectedHashtag,
      likes: [],
      comments: [],
      creator: {
        userObj,
      },
      pictureList: [...pictureInfo],
    };

    Promise.all([
      userRecordsUpdate(userObj.records, postId),
      recordsUpdate(postId, docData),
    ])
      .then(() => {
        setIsLoading(false);
        refreshUser(true);
        alert('업로드가 완료 되었습니다.');
        history.push(`/city/${city}/${postId}`);
      })
      .catch((error) => {
        alert('여행기록 업로드에 실패 하였습니다.');
        console.log(error);
        setIsLoading(false);
      });
  };

  const closeButton = () => {
    const answer = window.confirm('작성을 취소 하시겠습니까?');
    if (answer) history.goBack();
  };

  const userRecordsUpdate = (userPostList, postId) =>
    firebaseFireStore
      .collection('users')
      .doc(userObj.userId)
      .update({
        records: [...userPostList, postId],
      });

  const recordsUpdate = (postId, docData) =>
    firebaseFireStore.collection('records').doc(postId).set(docData);

  return (
    <>
      <Navigation show={true} />
      <UploadContainer loading={isLoading ? 1 : 0}>
        <UploadHeaderWrap>
          <h1>여행기록 올리기</h1>
        </UploadHeaderWrap>
        <UploadWrap>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {posts && posts.length > 0 ? (
                <>
                  <RecordInfo
                    onChange={onChange}
                    cityArray={cityArray}
                    handleHashtagSelect={handleHashtagSelect}
                    selectedHashtag={selectedHashtag}
                  />
                  <PictureInfo
                    posts={posts}
                    onChange={onChange}
                    searchPlace={searchPlace}
                    searchPlaceSelect={searchPlaceSelect}
                    locationSelect={locationSelect}
                  />
                </>
              ) : (
                <UploadFileContainer>
                  <UploadFileWrap>
                    <LabelWrap>
                      <label htmlFor="input-file">
                        <LabelTextWrap>
                          <IconWrap>
                            <AiOutlineCloudUpload size={80} />
                          </IconWrap>
                          <span>사진 올리기 (최소 5장 최대 15장)</span>
                        </LabelTextWrap>
                      </label>
                      <input
                        type="file"
                        id="input-file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        multiple="multiple"
                        onChange={onFileChange}
                      />
                    </LabelWrap>
                  </UploadFileWrap>
                </UploadFileContainer>
              )}
            </>
          )}
          <UploadGuide />
          <ButtonWrap>
            <button
              type="submit"
              loading={isLoading ? 1 : 0}
              theme={theme}
              onClick={onUpload}
              style={{ pointerEvents: isLoading && 'none' }}
            >
              업로드하기
            </button>
            <button
              style={{ pointerEvents: isLoading && 'none' }}
              onClick={closeButton}
            >
              취소
            </button>
          </ButtonWrap>
        </UploadWrap>
        <Footer />
      </UploadContainer>
    </>
  );
};

export default Upload;
