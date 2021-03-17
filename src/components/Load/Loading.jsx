import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 60px;
    height: 60px;
    margin: 8px;
    border: 6px solid #16a085;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #16a085 transparent transparent transparent;
    :nth-child(1) {
      animation-delay: -0.45s;
    }
    :nth-child(2) {
      animation-delay: -0.3s;
    }
    :nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const Loading = () => {
  return (
    <>
      <LoadingContainer>
        <LoadingWrap>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </LoadingWrap>
      </LoadingContainer>
    </>
  );
};

export default Loading;
