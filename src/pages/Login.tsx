import React from "react";
import Input from "../components/Input";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import useLogin from "../hooks/useLogin";
import LoginBtns from "../components/LoginBtns";

const InputPage = styled.section`
  padding: 1.5rem;
`;

const Row = styled.div`
  padding: 2rem 6rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  & > span {
    display: block;
    font-weight: bold;
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  & > input {
    font-size: 1.8rem;
    border-bottom: solid 1.5px ${(props) => props.theme.secondColor};
    padding: 1rem 0;
    min-width: 23rem;
  }
`;

const LinkBox = styled.span`
  margin: 3rem 0;
  display: inline-block;

  & > a {
    display: inline-block;
    text-decoration: none;
    margin-left: 0.5rem;
    font-size: 1.2rem;
    color: ${(props) => props.theme.secondColor};

    &:hover {
      color: hsl(220, 98%, 61%);
    }
  }
`;

const Login: React.FC = () => {
  const {
    email,
    password,
    loading,
    submit,
    handleCreateAccount,
    handleGoogleSignin,
    handlePressEnter,
    handlePasswordChanged,
    handleEmailChanged,
  } = useLogin();

  return (
    <>
      <InputPage>
        {loading && <Loader />}
        <Row>
          <span>Email</span>
          <Input
            value={email}
            onChange={handleEmailChanged}
            placeHolder="Your email"
          />
        </Row>
        <Row>
          <span>Password</span>
          <Input
            value={password}
            onChange={handlePasswordChanged}
            type="password"
            onKeyDown={handlePressEnter}
            placeHolder="Password"
          />
        </Row>
        <LoginBtns
          submit={submit}
          handleCreateAccount={handleCreateAccount}
          handleGoogleSignin={handleGoogleSignin}
        />
      </InputPage>
      <LinkBox>
        <Link to="/">Back to List</Link>
      </LinkBox>
    </>
  );
};

export default Login;
