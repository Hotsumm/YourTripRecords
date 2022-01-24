import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing : border-box
    }body{
        font-family: 'Noto Sans KR', sans-serif;
        font-size:12px;
        background : ${({ theme }) => theme.bgColor};
        color :  ${({ theme }) => theme.textColor};
        transition: all 0.25s linear;
    }
    a {
        text-decoration:none;
        color:inherit;
    }
    ol, ul, li {
        list-style: none;
    }
    button { 
        color :  ${({ theme }) => theme.textColor};
        background :  ${({ theme }) => theme.menuColor};
        cursor: pointer;
        border: none;
        outline: none;
    }

    img {
        width: 100%;
        height: 100%;
    }
    input {
        background:white;
    }
`;
