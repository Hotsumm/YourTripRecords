import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '@src/Context';
import { hashtagArray } from '@utils/hashtagArray';

interface RecordInfoProps {
  onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  cityArray: ICityArray[];
  handleHashtagSelect(name: string): void;
  selectedHashtag: string[];
}

const RecordInfo: React.FC<RecordInfoProps> = ({
  onChange,
  cityArray,
  handleHashtagSelect,
  selectedHashtag,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RecordInfoContainer>
      <RecordContentWrap>
        <RecordContent>
          <span>여행 제목</span>
          <input type="title" name="postTitle" onChange={onChange} />
        </RecordContent>
        <RecordContent>
          <span>도시</span>
          <select name="city" onChange={onChange}>
            {cityArray &&
              cityArray.length > 0 &&
              cityArray.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
          </select>
        </RecordContent>
        <RecordContent>
          <span>여행 계절</span>
          <select name="season" onChange={onChange}>
            <option value="봄">봄</option>
            <option value="여름">여름</option>
            <option value="가을">가을</option>
            <option value="겨울">겨울</option>
          </select>
        </RecordContent>
        <HashtagContainer>
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
        </HashtagContainer>
      </RecordContentWrap>
    </RecordInfoContainer>
  );
};

const RecordInfoContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecordContentWrap = styled.ul`
  @media (max-width: 500px) {
    width: 100%;
  }
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
`;

const RecordContent = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  gap: 0px 10px;
  & span {
    @media (max-width: 500px) {
      font-size: 14px;
    }
    @media (max-width: 320px) {
      font-size: 12px;
    }
    font-size: 16px;
    width: 20%;
  }
  & input {
    -webkit-appearance: none;
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
  & select {
    width: 80%;
    padding: 7px;
    font-size: 14px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

const HashtagContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HashtagWrap = styled.ul`
  @media (max-width: 500px) {
    width: 100%;
    max-width: 500px;
  }
  width: 500px;
  margin-top: 30px;
  padding: 0 20px;
  display: flex;

  overflow-x: auto;
  gap: 0 20px;
`;

const Hashtag = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.menuColor};
  border: 1px solid #16a085;
  :hover {
    color: #16a085;
  }
`;

export default RecordInfo;
