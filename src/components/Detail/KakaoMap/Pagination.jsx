import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const PaginationContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #16a085;
  position: absolute;
  width: 367px;
  max-height: 200px;
  overflow: auto;
  top: 41px;
  left: 48px;
  border: 1px solid gray;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const PaginationWrap = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 10px;
  border-bottom: 1px solid white;
  cursor: pointer;
`;

const PaginationPlaceName = styled.span`
  min-width: 100%;
  width: 100%;
  font-size: 12px;
  color: white;
  padding: 5px;
  display: inline;
`;

const PaginationAddress = styled.span`
  min-width: 100%;
  display: inline;
  width: 100%;
  font-size: 10px;
  color: white;
  padding: 5px;
`;

const Pagination = ({ searchPlace, locationSelect, id }) => {
  const [Places, setPlaces] = useState([]);

  const handleLocation = (locationId, longitude, latitude, place_name) => {
    locationSelect(locationId, longitude, latitude, place_name, id);
  };
  console.log(Places);
  useEffect(() => {
    const places = new kakao.maps.services.Places();
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };
    places.keywordSearch(searchPlace, placesSearchCB);

    const displayPlaces = (data) => {
      setPlaces(data);
    };
  }, [searchPlace]);

  return (
    <PaginationContainer>
      {Places &&
        Places.map((place, index) => (
          <PaginationWrap
            key={place.id}
            onClick={() =>
              handleLocation(place.id, place.x, place.y, place.place_name)
            }
          >
            <PaginationPlaceName>{place.place_name}</PaginationPlaceName>
            <PaginationAddress>{place.address_name}</PaginationAddress>
          </PaginationWrap>
        ))}
    </PaginationContainer>
  );
};

export default Pagination;
