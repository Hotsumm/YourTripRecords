import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../Context';

const HashtagContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  padding: 10px 0;
`;
const HashtagWrap = styled.ul`
  @media (max-width: 500px) {
    justify-content: center;
  }
  overflow-x: auto;
  width: 100vw;
  display: flex;
  padding: 0 10px;
  gap: 0 20px;
`;

const HashtagLink = styled(Link)`
  width: auto;
`;

const HashTagLI = styled.li`
  width: 100%;
  white-space: nowrap;
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
`;

interface HashtagProps {
  postObj: IPost;
}

const Hashtag: React.FC<HashtagProps> = ({ postObj }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <HashtagContainer>
      <HashtagWrap>
        {postObj.hashtags &&
          postObj.hashtags.map((hashtag, index) => (
            <HashtagLink
              key={index}
              to={{ pathname: '/city/전체', state: { hashtags: [hashtag] } }}
            >
              <HashTagLI theme={theme}>{hashtag}</HashTagLI>
            </HashtagLink>
          ))}
      </HashtagWrap>
    </HashtagContainer>
  );
};
export default Hashtag;
