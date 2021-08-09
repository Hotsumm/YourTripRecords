import React from 'react';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  border-top: 1px solid grey;
`;

const FooterWrap = styled.div`
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    gap: 15px 0;
  }
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
`;

const FooterTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: grey;
  cursor: default;
`;

const FooterIconWrap = styled.div`
  display: flex;
  gap: 20px;
  svg {
    font-size: 24px;
    cursor: pointer;
  }
`;

const FooterIcon = styled.div``;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterTitle>©YourTripRecord</FooterTitle>
        <FooterIconWrap>
          <FooterIcon>
            <AiFillGithub
              onClick={() => window.open('https://github.com/Hotsumm')}
            />
          </FooterIcon>
          <FooterIcon>
            <GrInstagram
              onClick={() => window.open('https://www.instagram.com/hotsumm/')}
            />
          </FooterIcon>
          <FooterIcon>
            <AiOutlineMail />
          </FooterIcon>
        </FooterIconWrap>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
