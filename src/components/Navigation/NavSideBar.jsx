import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavSideBarContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  > svg {
    margin-left: 10px;
  }
`;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuContentWrap = styled.ul`
  position: absolute;
  width: 250px;
  height: 450px;
  margin-left: 10px;
  border-radius: 10px;
  top: 0;
  left: 0;
  background: white;
  opacity: 0.7;
  margin-top: 15px;
  padding: 20px 10px;
`;

const MenuContent = styled.li`
  display: flex;
  align-items: center;
  color: black;
  padding: 15px;
  & span {
    font-size: 18px;
    margin-top: 5px;
    margin-left: 10px;
  }
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const NavSideBar = () => {
  const [isMenuClick, setIsMenuClick] = useState(false);

  const menuBtnClick = () => {
    if (isMenuClick) {
      setIsMenuClick(false);
      return;
    }
    setIsMenuClick(true);
  };

  return (
    <NavSideBarContainer>
      <FiMenu size={35} cursor={'pointer'} onClick={menuBtnClick} />
      {isMenuClick && (
        <MenuContainer>
          <MenuContentWrap>
            <Link to="/">
              <MenuContent>
                <AiFillHome size={25} />
                <span>홈</span>
              </MenuContent>
            </Link>
            <MenuContent>
              <AiFillHome size={25} />
              <span>Home</span>
            </MenuContent>
            <MenuContent>
              <AiFillHome size={25} />
              <span>Home</span>
            </MenuContent>
          </MenuContentWrap>
        </MenuContainer>
      )}
    </NavSideBarContainer>
  );
};

export default NavSideBar;
