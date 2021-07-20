import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { cityArray } from '../../utils/cityArray';
import arrowImg from '../../static/assets/arrow.jpeg';

const CityCategoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 60px;
`;

const CityCategoryWrap = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CategoryWrap = styled.li`
  display: flex;
  align-items: center;
  margin-right: 70px;
`;

const CategoryHeader = styled.span`
  font-size: 20px;
  margin-right: 15px;
`;

const Category = styled.select`
  width: 120px;
  font-size: 16px;
  padding: 10px 20px;
  border: 1px solid #999;
  background: url(${arrowImg}) no-repeat 95% 50%;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 5px;
  :-ms-expand {
    display: none;
  }
`;

const CityCategory = ({ cityName, handleSeasonSelect }) => {
  const [city, setCity] = useState(cityName);
  const [season, setSeason] = useState('전체');

  const history = useHistory();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'city') {
      setCity(value);
      history.push(`/city/${value}`);
    } else if (name === 'season') {
      setSeason(value);
      handleSeasonSelect(value);
    }
  };

  return (
    <CityCategoryContainer>
      <CityCategoryWrap>
        <CategoryWrap>
          <CategoryHeader>도시</CategoryHeader>
          <Category name="city" onChange={onChange} value={city}>
            <option value="전체">전체</option>
            {cityArray &&
              cityArray.length > 0 &&
              cityArray.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
          </Category>
        </CategoryWrap>
        <CategoryWrap>
          <CategoryHeader>계절</CategoryHeader>
          <Category name="season" onChange={onChange} value={season}>
            <option value="전체">전체</option>
            <option value="봄">봄</option>
            <option value="여름">여름</option>
            <option value="가을">가을</option>
            <option value="겨울">겨울</option>
          </Category>
        </CategoryWrap>
      </CityCategoryWrap>
    </CityCategoryContainer>
  );
};

export default CityCategory;
