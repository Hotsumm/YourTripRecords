import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { cityArray } from '../../utils/cityArray';
import arrowImg from '../../static/assets/arrow.jpeg';
import { hashtagArray } from '../../utils/hashtagArray';
import { ThemeContext } from '../../Context';

const CityCategoryContainer = styled.div`
  @media (max-width: 500px) {
    width: 100%;
    padding: 0;
    align-items: center;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 60px;
`;

const CityCategoryWrap = styled.div`
  @media (max-width: 500px) {
    flex-direction: column;
    width: 100%;
  }
  width: 100%;
  display: flex;
  align-items: center;
`;

const CategorySelectWrap = styled.div`
  @media (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
  gap: 15px;
  display: flex;
  align-items: center;
  margin-right: 70px;
`;

const CategoryHeader = styled.h3`
  font-size: 20px;
  white-space: pre;
`;

const Category = styled.select`
  width: 120px;
  font-size: 16px;
  padding: 10px 20px;
  border: 1px solid #16a085;
  background: url(${arrowImg}) no-repeat 95% 50%;
  background-color: white;
  color: black;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 5px;
  :-ms-expand {
    display: none;
  }
`;

const HashtagWrap = styled.ul`
  @media (max-width: 500px) {
    padding: 0 20px;
  }
  overflow-x: auto;
  width: 100%;
  display: flex;
  margin-top: 30px;
  gap: 0 20px;
  margin-bottom: 20px;
`;

const Hashtag = styled.li`
  @media (min-width: 600px) {
    white-space: pre;
  }
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid #16a085;
  color: ${(props) => props.theme.textColor};

  :hover {
    color: #16a085;
  }
`;

interface CityCategoryProps {
  cityName: string;
  handleSeasonSelect(season: string): void;
  hashtagList: string[];
  handleHashtagSelect(hashtag: string): void;
}

const CityCategory: React.FC<CityCategoryProps> = ({
  cityName,
  handleSeasonSelect,
  hashtagList,
  handleHashtagSelect,
}) => {
  const [city, setCity] = useState<string>(cityName);
  const [season, setSeason] = useState<string>('전체');

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const {
      target: { name, value },
    } = e;
    if (name === 'city') {
      setCity(value);
      navigate(`/city/${value}`);
    } else if (name === 'season') {
      setSeason(value);
      handleSeasonSelect(value);
    }
  };

  return (
    <CityCategoryContainer>
      <CityCategoryWrap>
        <CategorySelectWrap>
          <CategoryHeader>도시</CategoryHeader>
          <Category name="city" onChange={onChange} value={city}>
            <option value="전체">전체</option>
            {cityArray &&
              cityArray.length > 0 &&
              cityArray.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
          </Category>
        </CategorySelectWrap>
        <CategorySelectWrap>
          <CategoryHeader>계절</CategoryHeader>
          <Category name="season" onChange={onChange} value={season}>
            <option value="전체">전체</option>
            <option value="봄">봄</option>
            <option value="여름">여름</option>
            <option value="가을">가을</option>
            <option value="겨울">겨울</option>
          </Category>
        </CategorySelectWrap>
      </CityCategoryWrap>
      <HashtagWrap>
        {hashtagArray.map((hashtag) => (
          <Hashtag
            theme={theme}
            onClick={() => handleHashtagSelect(hashtag.name)}
            key={hashtag.id}
            style={
              hashtagList.includes(hashtag.name)
                ? {
                    background: '#e3f4ea',
                    fontWeight: '600',
                    color: '#16a085',
                    cursor: 'default',
                    border: 'none',
                  }
                : { cursor: 'pointer' }
            }
          >
            {hashtag.name}
          </Hashtag>
        ))}
      </HashtagWrap>
    </CityCategoryContainer>
  );
};

export default React.memo(CityCategory);
