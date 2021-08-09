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

const PopularCityHeaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const PopularCityHeader = styled.div`
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
  overflow-x: auto;
  margin: 0 auto;
  gap: 0 20px;
  @media (max-width: 500px) {
    padding: 30px;
  }
`;

const PopularPost = styled.img`
  width: 23vw;
  aspect-ratio: 1/1;
`;

const PopularCity = () => {
  const [loading, setLoading] = useState(true);
  const [popularPost, setPopularPost] = useState(null);
  const [popularCityName, setPopularCityName] = useState(null);
  const [selectCityObj, setSelectCityObj] = useState(null);
  const [selected, setSelected] = useState('');

  const { theme } = useContext(ThemeContext);

  const handleCitySelect = (city) => {
    setSelectCityObj(
      popularPost.filter((post) => post.city === city).slice(0, 4),
      setSelected(city),
    );
  };

  const fetchPost = useCallback(() => {
    setLoading(true);
    let allRecord = [];
    let popularCityArr = [];
    firebaseFireStore
      .collection('records')
      .get()
      .then((postsRef) => {
        postsRef.forEach((doc) => {
          allRecord.push(doc.data());
        });
        allRecord.sort((next, prev) => sortByPopular(next, prev));
        for (let i = 0; i < allRecord.length; i++) {
          if (popularCityArr > 4) break;
          if (
            popularCityArr === null ||
            !popularCityArr.includes(allRecord[i].city)
          ) {
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
                  <Link
                    key={record.postId}
                    to={{
                      pathname: `/city/${record.city}/${record.postId}`,
                      state: { cityName: record.city, record: record },
                    }}
                  >
                    <PopularPost src={record.pictureList[0].pictureURL} />
                  </Link>
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
