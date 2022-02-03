import React from 'react';
import styled from 'styled-components';

const RecordInfoContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecordInfoWrap = styled.ul`
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

const RecordInfoContent = styled.li`
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
    width: 20%;
    font-size: 16px;
  }

  & input {
    width: 80%;
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
    width: 80%;
    -webkit-appearance: none;
    min-width: 50%;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    border-style: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
`;

interface RecordInfoEditProps {
  postObj: IPost;
  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
  postTitle: string;
  season: string;
}

const RecordInfoEdit: React.FC<RecordInfoEditProps> = ({
  postObj,
  onChange,
  postTitle,
  season,
}) => {
  return (
    <RecordInfoContainer>
      <RecordInfoWrap>
        <RecordInfoContent>
          <span>여행 제목</span>
          <input
            type="title"
            name="postTitle"
            value={postTitle}
            onChange={onChange}
          />
        </RecordInfoContent>
        <RecordInfoContent>
          <span>도시</span>
          <span
            style={{
              minWidth: '50%',
              textAlign: 'left',
              fontWeight: 700,
              width: '80%',
            }}
          >
            {postObj.city}
          </span>
        </RecordInfoContent>
        <RecordInfoContent>
          <span>여행 계절</span>
          <select name="season" value={season} onChange={onChange}>
            <option value="봄">봄</option>
            <option value="여름">여름</option>
            <option value="가을">가을</option>
            <option value="겨울">겨울</option>
          </select>
        </RecordInfoContent>
      </RecordInfoWrap>
    </RecordInfoContainer>
  );
};

export default RecordInfoEdit;
