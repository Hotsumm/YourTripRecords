import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { ThemeContext } from '@src/Context';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { cityArray } from '@utils/cityArray';

const CitySearchBar: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsFocus(false));

  const onFocus = () => setIsFocus((prev) => !prev);

  return (
    <>
      <CitySearchBarContainer ref={ref}>
        <CitySearchBarWrap
          onClick={onFocus}
          isFocus={isFocus ? 1 : 0}
          theme={theme}
        >
          <span>보고싶은 도시를 선택해보세요.</span>
        </CitySearchBarWrap>
        {isFocus && (
          <CitySearchListWrap theme={theme}>
            <Link to={'/city/전체'}>
              <li>
                <IConWrap>
                  <HiOutlineLocationMarker size={20} />
                </IConWrap>
                <h3>전체</h3>
              </li>
            </Link>
            {cityArray.map((city) => (
              <Link to={`/city/${city.name}`} key={city.id}>
                <li>
                  <IConWrap>
                    <HiOutlineLocationMarker size={20} />
                  </IConWrap>
                  <h3>{city.name}</h3>
                </li>
              </Link>
            ))}
          </CitySearchListWrap>
        )}
      </CitySearchBarContainer>
      {isFocus && <FocusBackground />}
    </>
  );
};

const CitySearchBarContainer = styled.div`
  width: 100%;
  position: relative;
`;

const CitySearchBarWrap = styled.div<{ isFocus: number }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-style: none;
  padding: 0px 20px;
  text-align: center;
  color: gray;
  background: ${(props) => props.theme.menuColor};
  border: ${(props) => (props.isFocus ? '1px solid #16a085' : 'none')};
  border-bottom-left-radius: ${(props) => (props.isFocus ? 0 : '20px')};
  border-bottom-right-radius: ${(props) => (props.isFocus ? 0 : '20px')};
  cursor: pointer;
  & span {
    font-size: 18px;
  }
`;

const CitySearchListWrap = styled.ul`
  position: absolute;
  z-index: 999;
  width: 100%;
  background: white;
  border: 1px solid #16a085;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top: none;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.menuColor};
  max-height: 500px;
  overflow-y: auto;
  & li {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 20px;
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    border-bottom: 1px solid #e6e6e6;
    line-height: 20px;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
    cursor: pointer;
    :last-child {
      border: none;
    }
  }
`;

const IConWrap = styled.div`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  &svg {
    width: 100%;
    height: 100%;
  }
`;

const FocusBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background: rgba(0, 0, 0, 0.4);
`;

export default CitySearchBar;
