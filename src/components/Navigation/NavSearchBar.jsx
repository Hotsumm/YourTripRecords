import React from 'react';
import styled from 'styled-components';

const SearchBarWrap = styled.div`
  width: 100%;
`;

const SearchBar = styled.input`
  display: flex;
  width: 350px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-style: none;
  padding: 0px 20px;
  font-size: 16px;
  text-align: center;
  :focus {
    outline: none;
    border: 2px solid #16a085;
  }
  ::placeholder {
    display: flex;
    color: darkgray;
    font-size: 16px;
    text-align: center;
  }
`;

const NavSearchBar = () => {
  return (
    <SearchBarWrap>
      <SearchBar type="text" placeholder="보고싶은 도시를 입력해주세요." />
    </SearchBarWrap>
  );
};

export default NavSearchBar;
