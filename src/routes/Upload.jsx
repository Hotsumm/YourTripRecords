import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { v4 as uuidv4 } from 'uuid';
import { cityArray } from '../utils/cityArray';
import { hashtagArray } from '../utils/hashtagArray';
import { firebaseFireStore, firebaseStorage } from '../firebaseConfig';
import { getCreatedDay } from '../utils/getCreatedDay';
import Loading from '../components/Load/Loading';
import Pagination from '../components/Detail/KakaoMap/Pagination';
import { UserContext, ThemeContext } from '../Context';

const UploadContainer = styled.div`
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
  padding-top: 80px;
  background: white;
  text-align: center;
  filter: ${(props) =>
    props.loading ? 'brightness(30%)' : 'brightness(100%)'};
  height: ${(props) => props.loading && '100vh'};
`;
const UploadHeader = styled.div`
  margin-top: 50px;
  font-size: 40px;
`;

const UploadWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 250px;
`;

const RecordInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

const RecordInfoWrap = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

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

const HashtagWrap = styled.ul`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0 20px;
`;

const Hashtag = styled.li`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.menuColor};
  border: 1px solid #16a085;
  :hover {
    color: #16a085;
  }
`;

const PictureInfoContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const PictureInfoWrap = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`;

const Picture = styled.img`
  width: 35%;
  height: 80%;
  margin-right: 50px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const PictureInputWrap = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
`;

const PictureInfo = styled.div`
  display: flex;
  padding: 5px 0;
  align-items: flex-start;
  :first-child {
    position: relative;
  }
  & input {
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

const FileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;

  label {
    width: 450px;
    height: 100%;
    position: absolute;
    display: flex;
    background: white;
    border: 2px dashed gray;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: black;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
`;

const GuideContainer = styled.div`
  margin: 25px 0;
`;

const GuideHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Guide = styled.div`
  font-size: 14px;
  padding: 5px 0;
`;

const ButtonWrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 0.1px solid #16a085;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  :first-child {
    margin-right: 30px;
  }
  pointer-events: ${(props) => props.loading && 'none'};
`;

const Upload = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState('서울');
  const [postTitle, setPostTitle] = useState('');
  const [season, setSeason] = useState('봄');
  const [searchPlace, setSearchPlace] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState([]);
  const [searchPlaceSelect, setSearchPlaceSelect] = useState([]);
  const { userObj } = useContext(UserContext);
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

    if (fileArr.length > 15) {
      alert('사진을 15장 이하로 업로드 해주세요.');
      return;
    } else if (fileArr.length < 5) {
      alert('사진을 최소 5장 이상 업로드 해주세요.');
      return;
    }

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
    setLoading(true);
    let userPostList = userObj.records;
    let pictureInfo = [];
    const postId = uuidv4();
    const postRefId = uuidv4();

    for (let i = 0; i < posts.length; i++) {
      const fileRef = firebaseStorage.ref(postRefId).child(posts[i].fileName);
      const res = await fileRef.putString(posts[i].picture, 'data_url');
      const pictureURL = await res.ref.getDownloadURL();
      pictureInfo.push({
        pictureId: uuidv4(),
        location: posts[i].location,
        description: posts[i].description,
        fileName: posts[i].fileName,
        pictureURL: pictureURL,
      });
    }

    firebaseFireStore
      .collection('users')
      .doc(userObj.userId)
      .update({
        records: [...userPostList, postId],
      })
      .catch((error) => console.log(error));

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

    firebaseFireStore
      .collection('records')
      .doc(postId)
      .set(docData)
      .then(() => setLoading(false))
      .then(() => alert('업로드가 완료 되었습니다.'))
      .then(() => history.push(`/city/${city}/${postId}`))
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Navigation show={true} />
      <UploadContainer loading={loading ? 1 : 0}>
        <UploadHeader>여행기록 올리기</UploadHeader>
        <UploadWrap>
          {loading ? (
            <Loading />
          ) : (
            <>
              {posts && posts.length > 0 ? (
                <>
                  <RecordInfoContainer>
                    <RecordInfoWrap>
                      <span style={{ fontSize: '18px' }}>여행 제목</span>
                      <input
                        type="title"
                        name="recordTitle"
                        onChange={onChange}
                      />
                    </RecordInfoWrap>
                    <RecordInfoWrap>
                      <span style={{ fontSize: '14px' }}>도시</span>
                      <select name="city" onChange={onChange}>
                        {cityArray &&
                          cityArray.length > 0 &&
                          cityArray.map((city, index) => (
                            <option key={index} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                    </RecordInfoWrap>
                    <RecordInfoWrap>
                      <span style={{ fontSize: '14px' }}>여행 계절</span>
                      <select name="season" onChange={onChange}>
                        <option value="봄">봄</option>
                        <option value="여름">여름</option>
                        <option value="가을">가을</option>
                        <option value="겨울">겨울</option>
                      </select>
                    </RecordInfoWrap>
                    <HashtagWrap>
                      {hashtagArray.map((hashtag) => (
                        <Hashtag
                          theme={theme}
                          key={hashtag.id}
                          onClick={() => handleHashtagSelect(hashtag.name)}
                          style={
                            selectedHashtag.includes(hashtag.name)
                              ? {
                                  background: '#e3f4ea',
                                  fontWeight: '600',
                                  color: '#16a085',
                                  cursor: 'default',
                                  border: 'none',
                                }
                              : {
                                  cursor: 'pointer',
                                }
                          }
                        >
                          {hashtag.name}
                        </Hashtag>
                      ))}
                    </HashtagWrap>
                  </RecordInfoContainer>
                  <PictureInfoContainer>
                    {posts.map((post, index) => (
                      <PictureInfoWrap key={index}>
                        <Picture src={post.picturePreview} alt="post" />
                        <PictureInputWrap>
                          <PictureInfo>
                            <span>위치</span>
                            <input
                              type="text"
                              placeholder="위치"
                              id={index}
                              name="location"
                              onChange={onChange}
                              value={searchPlace[index]}
                            />
                            {searchPlace[index] &&
                              !searchPlaceSelect[index] && (
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
                                onChange={onChange}
                              />
                              <div>{posts[index].description.length}/300자</div>
                            </TextAreaWrap>
                          </PictureInfo>
                        </PictureInputWrap>
                      </PictureInfoWrap>
                    ))}
                  </PictureInfoContainer>
                </>
              ) : (
                <FileContainer>
                  <label htmlFor="input-file">
                    사진 올리기 (최소 5장 최대 15장)
                  </label>
                  <input
                    type="file"
                    id="input-file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    multiple="multiple"
                    onChange={onFileChange}
                  />
                </FileContainer>
              )}
            </>
          )}
          <GuideContainer>
            <GuideHeader>가이드 라인</GuideHeader>
            <Guide>
              *자신이 다녀왔던 여행지의 여행사진들을 업로드 해주세요.
            </Guide>
            <Guide>*여행기록의 제목을 지어주세요.</Guide>
            <Guide>*여행기록의 도시, 계절을 선택해주세요.</Guide>
            <Guide>
              *여행사진의 위치, 사진에 대한 간단한 설명을 적어주세요.
            </Guide>
            <Guide>
              (작성한 위치는 게시물에 지도로 표시되니, 정확한 위치를
              입력해주세요.)
            </Guide>
            <Guide>
              *사진은 최소 5장에서 최대 15장까지 업로드할 수 있습니다.
            </Guide>
            <Guide>*사진의 크기는 최대 15MB 미만이여야 합니다.</Guide>
          </GuideContainer>
          <ButtonWrap>
            <Button
              type="submit"
              loading={loading ? 1 : 0}
              theme={theme}
              onClick={onUpload}
            >
              업로드하기
            </Button>
            <Link to="/" style={{ pointerEvents: loading && 'none' }}>
              <Button>취소</Button>
            </Link>
          </ButtonWrap>
        </UploadWrap>
      </UploadContainer>
    </>
  );
};

export default Upload;
