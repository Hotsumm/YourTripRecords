import React from 'react';
import styled from 'styled-components';

const GuideContainer = styled.div`
  width: 100%;
  margin: 25px 0;
`;

const GuideHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Guide = styled.div`
  font-size: 14px;
  padding: 5px 0;
`;

const UploadGuide = () => {
  return (
    <GuideContainer>
      <GuideHeader>가이드 라인</GuideHeader>
      <Guide>*자신이 다녀왔던 여행지의 여행사진들을 업로드 해주세요.</Guide>
      <Guide>*여행기록의 제목을 지어주세요.</Guide>
      <Guide>*여행기록의 도시, 계절을 선택해주세요.</Guide>
      <Guide>*여행사진의 위치, 사진에 대한 간단한 설명을 적어주세요.</Guide>
      <Guide>
        (작성한 위치는 게시물에 지도로 표시되니, 정확한 위치를 입력해주세요.)
      </Guide>
      <Guide>*사진은 최소 5장에서 최대 15장까지 업로드할 수 있습니다.</Guide>
      <Guide>*사진의 크기는 최대 15MB 미만이여야 합니다.</Guide>
    </GuideContainer>
  );
};

export default UploadGuide;
