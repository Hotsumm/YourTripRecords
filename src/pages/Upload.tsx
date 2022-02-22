import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import { v4 as uuidv4 } from 'uuid';
import { cityArray } from '../utils/cityArray';
import { firebaseFireStore, firebaseStorage } from '../firebaseConfig';
import { getCreatedDay } from '../utils/getCreatedDay';
import Loading from '../components/Load/Loading';
import Footer from '../components/Home/Footer';
import UploadGuide from '../components/Upload/UploadGuide';
import RecordInfo from '../components/Upload/RecordInfo';
import PictureInfo from '../components/Upload/PictureInfo';
import { browserImageCompression } from '../utils/browserImageCompression';
import { useUserContext } from '../hooks/useUserContext';

const UploadContainer = styled.main`
  width: 100%;
  max-width: 2560px;
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

const ButtonWrap = styled.div<{ isLoading: number }>`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0 20px;
  margin-bottom: 20px;
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
  city: string;
}

const Upload = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState<InputsProps>({
    postTitle: '',
    season: '봄',
    city: '서울',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pictureFileList, setPictureFileList] = useState<IPictureFileList[]>(
    [],
  );
  const [searchPlace, setSearchPlace] = useState<string[]>([]);
  const [selectedHashtag, setSelectedHashtag] = useState<string[]>([]);
  const [isSearchPlaceSelect, setIsSearchPlaceSelect] = useState<boolean[]>([]);

  const { userObj, refreshUser } = useUserContext();

  const { postTitle, season, city } = inputs;

  const locationSelect: LocationSelectParams = (
    locationId,
    longitude,
    latitude,
    place_name,
    id,
  ) => {
    let newPictureFileList = [...pictureFileList];
    let newSearchPlace = [...searchPlace];
    let newIsSearchPlaceSelect = [...isSearchPlaceSelect];

    newSearchPlace[id] = place_name;
    newIsSearchPlaceSelect[id] = true;
    newPictureFileList[id].location = {
      coords: { longitude, latitude },
      placeName: place_name,
      locationId,
    };

    setSearchPlace(newSearchPlace);
    setIsSearchPlaceSelect(newIsSearchPlaceSelect);
    setPictureFileList(newPictureFileList);
  };

  const handleHashtagSelect = (name: string): void => {
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

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {
      target: { tabIndex, name, value },
    } = e;
    let newPictureFileList = [...pictureFileList];
    let newSearchPlace = [...searchPlace];
    let newIsSearchPlaceSelect = [...isSearchPlaceSelect];

    if (name === 'location') {
      if (newIsSearchPlaceSelect[tabIndex]) {
        newIsSearchPlaceSelect[tabIndex] = false;
      }
      newPictureFileList[tabIndex].location = null;
      newSearchPlace[tabIndex] = value;

      setSearchPlace(newSearchPlace);
      setIsSearchPlaceSelect(newIsSearchPlaceSelect);
      setPictureFileList(newPictureFileList);
      return;
    } else if (name === 'description') {
      newPictureFileList[tabIndex].description = value;
      setPictureFileList(newPictureFileList);
      return;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;

    if (!fileArr || fileArr.length > 15)
      return alert('사진을 15장 이하로 업로드 해주세요.');
    else if (!fileArr || fileArr.length < 5)
      return alert('사진을 최소 5장 이상 업로드 해주세요.');

    let pictureFiles: IPictureFileList[] = [];
    let searchPlaceList = [];
    let isSearchPlaceSelectList = [];
    let fileURLs: string[] = [];

    const newFileArr: any[] = await Promise.all(
      [...fileArr].map((file) => browserImageCompression(file)),
    );

    for (let i = 0; i < newFileArr.length; i++) {
      let file = newFileArr[i];

      searchPlaceList.push('');
      isSearchPlaceSelectList.push(false);

      pictureFiles.push({
        picturePreview: URL.createObjectURL(newFileArr[i]),
        fileName: newFileArr[i].name,
        picture: '',
        location: null,
        description: '',
      });

      const reader: FileReader = new FileReader();

      reader.onloadend = (finishedEvent) => {
        const { result }: any = finishedEvent.currentTarget;
        fileURLs.push(result);
        pictureFiles[i].picture = fileURLs[i];
      };
      reader.readAsDataURL(file);
    }
    setPictureFileList(pictureFiles);
    setSearchPlace(searchPlaceList);
    setIsSearchPlaceSelect(isSearchPlaceSelectList);
  };

  const onUpload = async () => {
    setIsLoading(true);

    const pictureInfo: IPictureList[] = [];
    const postId = uuidv4();

    const allPictureURL = await Promise.all(
      [...pictureFileList].map((pictureFile) => {
        const fileRef = firebaseStorage
          .ref(city)
          .child(`${postId}/${pictureFile.fileName}`);
        const res = fileRef.putString(pictureFile.picture, 'data_url');
        return res;
      }),
    );

    for (let i = 0; i < pictureFileList.length; i++) {
      const pictureURL = await allPictureURL[i].ref.getDownloadURL();
      pictureInfo.push({
        pictureId: uuidv4(),
        location: pictureFileList[i].location,
        description: pictureFileList[i].description,
        fileName: pictureFileList[i].fileName,
        pictureURL: pictureURL,
      });
    }

    const docData: IPost = {
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

  const userRecordsUpdate = (userPostList: string[], postId: string) =>
    firebaseFireStore
      .collection('users')
      .doc(userObj.userId)
      .update({
        records: [...userPostList, postId],
      });

  const recordsUpdate = (postId: string, docData: IPost) =>
    firebaseFireStore.collection('records').doc(postId).set(docData);

  return (
    <>
      <Navigation show={true} />
      <UploadContainer>
        <UploadHeaderWrap>
          <h1>여행기록 올리기</h1>
        </UploadHeaderWrap>
        <UploadWrap>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {pictureFileList && pictureFileList.length > 0 ? (
                <>
                  <RecordInfo
                    onChange={onChange}
                    cityArray={cityArray}
                    handleHashtagSelect={handleHashtagSelect}
                    selectedHashtag={selectedHashtag}
                  />
                  <PictureInfo
                    pictureFileList={pictureFileList}
                    onChange={onChange}
                    searchPlace={searchPlace}
                    isSearchPlaceSelect={isSearchPlaceSelect}
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
                        multiple
                        onChange={onFileChange}
                      />
                    </LabelWrap>
                  </UploadFileWrap>
                </UploadFileContainer>
              )}
            </>
          )}
          <UploadGuide />
          <ButtonWrap isLoading={isLoading ? 1 : 0}>
            <button type="submit" onClick={onUpload}>
              업로드하기
            </button>
            <button onClick={closeButton}>취소</button>
          </ButtonWrap>
        </UploadWrap>
        <Footer />
      </UploadContainer>
    </>
  );
};

export default Upload;
