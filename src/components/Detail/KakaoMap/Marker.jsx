import React, { useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const MarkerContanier = styled.div`
  width: 100%;
`;

const MarkerWrap = styled.div`
  width: 70%;
  height: 150px;
`;

const Marker = ({ coords }) => {
  useEffect(() => {
    const container = document.getElementById('marker');
    const options = {
      center: new kakao.maps.LatLng(coords.latitude, coords.longitude),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      coords.latitude,
      coords.longitude,
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(kakaoMap);
  }, [coords]);

  return (
    <MarkerContanier>
      <MarkerWrap id="marker"></MarkerWrap>
    </MarkerContanier>
  );
};

export default Marker;
