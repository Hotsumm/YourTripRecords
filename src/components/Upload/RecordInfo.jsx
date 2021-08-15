import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Context';
import { hashtagArray } from '../../utils/hashtagArray';

const RecordInfoContainer = styled.div`
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

const RecordInfoWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 768px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  & span {
    width: 30%;
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
    min-width: 50%;
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
  padding: 0 20px;
  display: flex;
  overflow-x: auto;
  gap: 0 20px;
`;

const Hashtag = styled.li`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.menuColor};
  border: 1px solid #16a085;
  :hover {
    color: #16a085;
  }
`;

const RecordInfo = ({
  onChange,
  cityArray,
  handleHashtagSelect,
  selectedHashtag,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RecordInfoContainer>
      <RecordInfoWrap>
        <span style={{ fontSize: '16px' }}>여행 제목</span>
        <input type="title" name="recordTitle" onChange={onChange} />
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
  );
};

export default RecordInfo;
