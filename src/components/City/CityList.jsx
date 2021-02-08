import React from 'react';
import styled from 'styled-components';
import { cityArray } from '../../utils/cityArray';

const CityListWrap = styled.ul`
  width: 100%;
  height: 300px;
  display: grid;
  justify-content: center;
  padding: 10px 0px 10px 80px;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 100px;
`;
const City = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 120px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 230px;
  height: 150px;
  border-radius: 15px;
  :hover {
    opacity: 0.6;
  }
`;

const CityName = styled.h3`
  margin-top: 20px;
  font-size: 16px;
  color: black;
`;

const CityList = () => {
  return (
    <CityListWrap>
      {cityArray.map((city, index) => (
        <City>
          <Thumbnail src={city.imgUrl}></Thumbnail>
          <CityName>{city.name}</CityName>
        </City>
      ))}
    </CityListWrap>
  );
};

export default CityList;
