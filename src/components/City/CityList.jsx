import React, { useContext } from 'react';
import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { cityArray } from '../../utils/cityArray';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Context';

const CityListContainer = styled.div`
  @media (max-width: 500px) {
    top: 220px;
    left: 30px;
  }
  width: 100%;
  position: absolute;
  top: 380px;
  left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
`;

const CityListHeader = styled.div`
  width: 100%;
`;

const CityMenu = styled.ul`
  display: flex;
  cursor: default;
  justify-content: flex-start;
  align-items: center;
`;

const Menu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.bgColor};
  border-radius: 3px 3px 0 0;
  padding: 10px 10px;
  font-weight: 600;
  & span {
    width: 40px;
    font-size: 18px;
    @media (max-width: 500px) {
      font-size: 14px;
      width: 30px;
    }
  }
`;

const IconWrap = styled.div`
  font-size: 16px;
  margin-right: 5px;
`;

const CityListWrap = styled.ul`
  @media (max-width: 500px) {
    display: flex;
    overflow-x: auto;
    padding: 15px 10px;
    gap: 10px;
    width: 85vw;
  }
  display: grid;
  background: ${(props) => props.theme.bgColor};
  grid-template-columns: repeat(6, 1fr);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  gap: 25px;
  padding: 40px 30px;
  border-radius: 0 3px 3px 3px;
  border-top: 1px solid #ababab80;
  opacity: 0.9;
`;

const City = styled.li`
  @media (max-width: 500px) {
    width: 50px;
  }
  background: ${(props) => props.theme.menuColor};
  width: 70px;
  cursor: pointer;
`;

const CityName = styled.div`
  @media (max-width: 500px) {
    font-size: 12px;
    padding: 7px 10px;
  }
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  border: 1px solid #ababab80;
  border-radius: 3px;
  :hover {
    background: #16a085;
    color: white;
  }
`;

const CityList = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <CityListContainer>
      <CityListHeader>
        <CityMenu>
          <Menu theme={theme}>
            <IconWrap>
              <FiMapPin size={'20'} />
            </IconWrap>
            <span>도시</span>
          </Menu>
        </CityMenu>
      </CityListHeader>
      <CityListWrap theme={theme}>
        <Link to={'/city/전체'}>
          <City theme={theme}>
            <CityName theme={theme}>전체</CityName>
          </City>
        </Link>
        {cityArray.map((city, index) => (
          <Link key={index} to={`/city/${city.name}`}>
            <City theme={theme}>
              <CityName theme={theme}>{city.name}</CityName>
            </City>
          </Link>
        ))}
      </CityListWrap>
    </CityListContainer>
  );
};

export default CityList;
