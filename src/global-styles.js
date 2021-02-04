import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}
    a {
        text-decoration:none;
        color:inherit;
    }
    * {
        box-sizing : border-box
    }body{
        font-family: 'Noto Sans KR', sans-serif;
        font-size:12px;
        background-color:white;
    }
    ol, ul, li {
        list-style: none;
    }
    button { 
        cursor: pointer;
        border: none;
        outline: none;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;
