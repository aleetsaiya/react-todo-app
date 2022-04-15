import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    font-size: 62.5%;  /* 10px */
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
    font-family: 'Josefin Sans', sans-serif;
    color: ${(props) => props.theme.color};
    background: url(${(porps) => porps.theme.bkImg}) no-repeat, ${(props) =>
  props.theme.bkColor};
    transition: all ease 0.3s;
  }

  section {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: transparent;
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  ul {
    padding-inline-start: 0px;
    margin: 0;
  }

  li {
    list-style: none;
  }

  input {
    font-size: inherit;
    font-family: inherit;
    padding: 0;
    width: 100%;
    border: none;
    outline: none;
    &::placeholder {
      color: ${(props) => props.theme.secondColor};
      font-family: "Josefin Sans", sans-serif;
    }
    /* Internet Explorer 10-11 */
    &:-ms-input-placeholder {
      color: ${(props) => props.theme.secondColor};
      font-family: "Josefin Sans", sans-serif;
    }
    /* Microsoft Edge */
    &::-ms-input-placeholder {
      color: ${(props) => props.theme.secondColor};
      font-family: "Josefin Sans", sans-serif;
    }
  }
`;
