import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import styled from "styled-components";

const Button = styled.button`
  display: block;
  position: relative;
  font-size: 1.4rem;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.color};
  border: solid 1px ${(props) => props.theme.borderColor};
  padding: 0.9rem 2rem;
  width: 22rem;
  margin: 1rem auto;
  margin-top: 1.7rem;
  transition: all ease 0.2s;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(0.2rem);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 2rem;
  width: 2rem;
  margin-right: 0.3rem;
`;

const Submit = styled(Button)`
  background-color: #0e4d92;
  color: #fff;
`;

type LoginBtnsProps = {
  submit: () => void;
  handleCreateAccount: () => void;
  handleGoogleSignin: () => void;
};

const LoginBtns: React.FC<LoginBtnsProps> = ({
  submit,
  handleCreateAccount,
  handleGoogleSignin,
}) => {
  return (
    <>
      <Submit onClick={submit}>
        <Icon>
          <BiLogIn size={18} />
        </Icon>
        Sign in
      </Submit>
      <Button onClick={handleCreateAccount}>
        <Icon>
          <AiOutlineUserAdd size={18} />
        </Icon>
        Create account
      </Button>
      <Button onClick={handleGoogleSignin}>
        <Icon>
          <FcGoogle size={18} />
        </Icon>
        Sign in with Google
      </Button>
    </>
  );
};

export default LoginBtns;
