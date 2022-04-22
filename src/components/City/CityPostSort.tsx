import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { HiSortDescending } from 'react-icons/hi';

import { ThemeContext } from '@src/Context';

const CityPostSortContainer = styled.div`
  @media (max-width: 1024px) {
    padding: 0 30px;
  }
  padding: 0 40px;
  width: 100%;
  margin-bottom: 10px;
`;

const CityPostSortWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SortBox = styled.div`
  width: 100px;
  height: 40px;
  position: relative;
  display: flex;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 0 5px;
  & span {
    white-space: pre;
    font-size: 14px;
  }
  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const SortIconWrap = styled.div`
  padding: 3px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const SortMenuWrap = styled.ul`
  background: ${(props) => props.theme.menuColor};
  position: absolute;
  z-index: 999;
  padding: 5px 0;
  top: 40px;
  right: 0px;
  width: 130px;
  border: 1px solid grey;
  border-radius: 5px;
`;

const SortMenu = styled.li`
  white-space: pre;
  font-size: 16px;
  padding: 10px 15px;
  :hover {
    background: rgba(0, 0, 0, 0.1);
    text-decoration: underline;
  }
`;

interface CityPostSortProps {
  handleCurrentSort(sortName: string): void;
}

const CityPostSort: React.FC<CityPostSortProps> = ({ handleCurrentSort }) => {
  const [isSort, setIsSort] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>('최신순');
  const { theme } = useContext(ThemeContext);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.nodeName !== 'LI') return;

    const selectedSortName = target.innerText;

    setCurrentSort(selectedSortName);
    handleCurrentSort(selectedSortName);
  };

  return (
    <CityPostSortContainer>
      <CityPostSortWrap>
        <SortBox onClick={() => setIsSort((prev) => !prev)}>
          <span>{currentSort}</span>
          <SortIconWrap>
            <HiSortDescending size={20} />
          </SortIconWrap>
          {isSort && (
            <SortMenuWrap onClick={onClick} theme={theme}>
              <SortMenu>인기순</SortMenu>
              <SortMenu>최신순</SortMenu>
              <SortMenu>오래된순</SortMenu>
            </SortMenuWrap>
          )}
        </SortBox>
      </CityPostSortWrap>
    </CityPostSortContainer>
  );
};

export default React.memo(CityPostSort);
