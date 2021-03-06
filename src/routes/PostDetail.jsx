import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation/Navigation';
import Detail from '../components/Detail/Detail';

const DetailContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 80px;
`;
const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 100px;
`;

const PostDetail = ({ match, location }) => {
  return (
    <>
      <Navigation show={true} sideBar={false}></Navigation>
      <DetailContainer>
        <DetailWrap>
          <Detail postObj={location.state.post}></Detail>
        </DetailWrap>
      </DetailContainer>
    </>
  );
};

export default PostDetail;
