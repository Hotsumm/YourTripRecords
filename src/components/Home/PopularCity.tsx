import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { firebaseFireStore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import { sortByPopular } from '../../utils/sortBy';
import Loading from '../Load/Loading';
import { ThemeContext } from '../../Context';

const PopularCityContainer = styled.div`
  width: 100%;
  padding: 40px 0;
`;

const PopularCityWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularCityHeaderWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const PopularCityHeader = styled.h2`
  @media (max-width: 500px) {
    font-size: 20px;
  }
  color: ${(props) => props.theme.textColor};
  font-size: 28px;
  font-weight: 600;
`;

const PopularCityListWrap = styled.div`
  width: 100%;
  padding: 20px 0 0;
`;

const CityNameWrap = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    font-size: 30px;
  }
`;

const CityName = styled.li`
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ababab80;
  color: black;
  border-radius: 3px;
  margin-right: 20px;
  cursor: pointer;
  :hover {
    color: #16a085;
  }
`;

const PopularPostWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 100px;
  margin: 0 auto;
  gap: 0 20px;

  @media (max-width: 768px) {
    padding: 30px 50px;
    gap: 0 10px;
  }
  @media (max-width: 500px) {
    padding: 30px;
  }
`;

const PopularImgLink = styled(Link)`
  width: 300px;
  position: relative;
  ::before {
    content: '';
    display: block;
    margin-top: 100%;
  }
  & img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const PopularCity: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [popularPost, setPopularPost] = useState<IPost[]>([]);
  const [popularCityName, setPopularCityName] = useState<string[]>([]);
  const [selectCityObj, setSelectCityObj] = useState<IPost[]>([]);
  const [selected, setSelected] = useState<string>('');

  const { theme } = useContext(ThemeContext);

  const handleCitySelect = (city: string): void => {
    setSelectCityObj(
      popularPost.filter((post) => post.city === city).slice(0, 4),
    );
    setSelected(city);
  };

  const fetchPost = useCallback(() => {
    setLoading(true);
    let allRecord: IPost[] = [];
    let popularCityArr: string[] = [];
    firebaseFireStore
      .collection('records')
      .get()
      .then((postsRef) => {
        postsRef.forEach((doc: any) => {
          allRecord.push(doc.data());
        });
        allRecord.sort((next, prev) => sortByPopular(next, prev));
        for (let i = 0; i < allRecord.length; i++) {
          if (popularCityArr.length >= 4) break;
          if (!popularCityArr.includes(allRecord[i].city)) {
            popularCityArr.push(allRecord[i].city);
          }
        }
        setSelected(popularCityArr[0]);
        setPopularCityName(popularCityArr);
        setPopularPost(allRecord);
        setSelectCityObj(
          allRecord
            .filter((record) => record.city === popularCityArr[0])
            .slice(0, 4),
        );
      })
      .catch((error) => error.message)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <PopularCityContainer>
      <PopularCityWrap>
        <PopularCityHeaderWrap>
          <PopularCityHeader theme={theme}>
            이 여행지가 인기가 있어요 !
          </PopularCityHeader>
        </PopularCityHeaderWrap>
        {loading ? (
          <Loading />
        ) : (
          <PopularCityListWrap>
            <CityNameWrap>
              {popularCityName && popularCityName.length > 0 ? (
                popularCityName.map((city, index) => (
                  <CityName
                    key={index}
                    style={
                      selected === city
                        ? {
                            background: '#e3f4ea',
                            fontWeight: '600',
                            color: '#16a085',
                            cursor: 'default',
                            border: 'none',
                          }
                        : { background: 'white' }
                    }
                    onClick={() => {
                      handleCitySelect(city);
                    }}
                  >
                    {city}
                  </CityName>
                ))
              ) : (
                <div style={{ color: 'grey', padding: '50px 0' }}>
                  " 현재 인기 게시물이 없습니다. "
                </div>
              )}
            </CityNameWrap>
            {selectCityObj && (
              <PopularPostWrap>
                {selectCityObj.map((record, index) => (
                  <PopularImgLink
                    key={record.postId}
                    to={`/city/${record.city}/${record.postId}`}
                  >
                    <img
                      src={record.pictureList[0].pictureURL}
                      alt="인기사진"
                    />
                  </PopularImgLink>
                ))}
              </PopularPostWrap>
            )}
          </PopularCityListWrap>
        )}
      </PopularCityWrap>
    </PopularCityContainer>
  );
};

export default PopularCity;
