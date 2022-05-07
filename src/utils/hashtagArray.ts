interface IHashtagArray {
  id: number;
  name: string;
}
const hashtagList = [
  '카페',
  '식도락',
  '바다여행',
  '자전거',
  '이색',
  '당일치기',
  '쇼핑',
];

export const hashtagArray: IHashtagArray[] = hashtagList.map(
  (hashtag, index) => {
    return { id: index, name: hashtag };
  },
);
