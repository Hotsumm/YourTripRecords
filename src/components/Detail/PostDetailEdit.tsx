import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

import { useOutsideClick } from '@hooks/useOutsideClick';
import { ThemeContext } from '@src/Context';

const PostDetailEditContainer = styled.div`
  width: 30px;
  height: 30px;
`;

const IconWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 2px 3px;
  :hover {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
  cursor: pointer;
`;

const EditWrap = styled.div`
  background: ${(props) => props.theme.menuColor};
  position: absolute;
  z-index: 99;
  border-radius: 5px;
  top: 35px;
  right: 0px;
  padding: 5px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  li {
    font-size: 12px;
    padding: 5px 10px;
    cursor: pointer;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

interface PostDetailEditProps {
  postObj: IPost;
  handleDeletePost(): void;
}

const PostDetailEdit: React.FC<PostDetailEditProps> = ({
  postObj,
  handleDeletePost,
}) => {
  const { theme } = useContext(ThemeContext);

  const [isEditClick, setIsEditClick] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsEditClick(false));

  const handleEdit = (): void => setIsEditClick(!isEditClick);

  return (
    <PostDetailEditContainer>
      <IconWrap onClick={handleEdit} ref={ref}>
        <BsThreeDots size={26} />
      </IconWrap>
      {isEditClick && (
        <EditWrap theme={theme}>
          <ul>
            <Link to={`/postEdit/${postObj.postId}`} state={{ postObj }}>
              <li>게시물 수정하기</li>
            </Link>
            <li onClick={handleDeletePost}>게시물 삭제하기</li>
            <li onClick={handleEdit} style={{ color: 'red' }}>
              취소
            </li>
          </ul>
        </EditWrap>
      )}
    </PostDetailEditContainer>
  );
};

export default PostDetailEdit;
