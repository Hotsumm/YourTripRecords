import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../Context';

const HashtagContainer = styled.div`
  width: 100%;
  padding: 10px 0;
`;
const HashtagWrap = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 0 20px;

  & li {
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.menuColor};
    border: 1px solid #16a085;
    cursor: pointer;
    :hover {
      color: #16a085;
    }
  }
`;

const Hashtag = ({ postObj }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <HashtagContainer>
      <HashtagWrap>
        {postObj.hashtags &&
          postObj.hashtags.map((hashtag, index) => (
            <Link
              key={index}
              to={{ pathname: '/city/전체', hashtag: [hashtag] }}
            >
              <li theme={theme}>{hashtag}</li>
            </Link>
          ))}
      </HashtagWrap>
    </HashtagContainer>
  );
};
export default Hashtag;
