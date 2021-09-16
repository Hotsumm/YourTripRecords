import React, { useState } from 'react';
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
  & svg {
    font-size: 24px;
  }
`;

const FooterIcon = styled.div`
  display: block;
  cursor: pointer;
  :last-child {
    position: relative;
    cursor: default;
  }
`;

const MailWrap = styled.div`
  position: absolute;
  bottom: 30px;
  right: 0;
  width: 200px;
  padding: 10px 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-style: none;
  border-radius: 3px;
  text-align: center;
  display: ${(props) => (props.isMailHover ? 'block' : 'none')};
  & span {
    font-size: 14px;
    :last-child {
      font-weight: 700;
    }
  }
`;

const Footer = () => {
  const [isMailHover, setIsMailHover] = useState(false);
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterTitle>©YourTripRecords</FooterTitle>
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
          <FooterIcon
            onMouseEnter={() => setIsMailHover(true)}
            onMouseLeave={() => setIsMailHover(false)}
          >
            <MailWrap isMailHover={isMailHover ? 1 : 0}>
              <span>Gmail : </span>
              <span>tjddufgk@gmail.com</span>
            </MailWrap>
            <AiOutlineMail />
          </FooterIcon>
        </FooterIconWrap>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
