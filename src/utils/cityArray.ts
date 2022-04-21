const cityList = [
  '서울',
  '경기',
  '인천',
  '울산',
  '강원',
  '충청',
  '대전',
  '세종',
  '전라',
  '광주',
  '대구',
  '부산',
  '제주',
];

export const cityArray: ICityArray[] = cityList.map((city, index) => {
  return { id: index, name: city };
});
