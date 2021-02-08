import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';

const CityContainer = styled.div`
  width: 100%;
`;

const CityHeader = styled.div`
  width: 100%;
  height: 100px;
`;

const CityName = styled.span`
  color: black;
  font-size: 100px;
`;

const City = ({ match }) => {
  const cityName = match.params.cityName;

  console.log(cityName);
  return (
    <>
      <Navigation show={true}></Navigation>
      <CityContainer>
        <CityHeader>
          <CityName>{cityName}</CityName>
        </CityHeader>
      </CityContainer>
    </>
  );
};

export default City;
