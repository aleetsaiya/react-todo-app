import React, { useState } from "react";
import Input from "../components/Input";
import styled from "styled-components";
import { loginWithEmail, loginWithGoogle } from "../firebase";
import { toast } from "react-toastify";
import { setStorageUserID } from "../localStorage";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiLogIn } from "react-icons/bi";

const InputPage = styled.section`
  padding: 1.5rem;
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

const Submit = styled(Button)`
  background-color: #0e4d92;
  color: #fff;
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
    margin-bottom: 3rem;
  }

  & > input {
    font-size: 1.8rem;
    border-bottom: solid 1.5px ${(props) => props.theme.secondColor};
    padding-bottom: 1rem;
    min-width: 23rem;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function submit() {
    if (email.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }
    if (password.trim() === "") {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);
    loginWithEmail(email, password)
      .then((uid) => {
        setStorageUserID(uid);
        toast.success("Login Success!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setEmail(value);
  }

  function handlePasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setPassword(value);
  }

  function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    submit();
  }

  function handleGoogleSignin() {
    setLoading(true);
    loginWithGoogle()
      .then((uid) => {
        setStorageUserID(uid);
        toast.success("Login Success!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <InputPage>
      {loading && "Loading..."}
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
      <Submit onClick={submit}>
        <Icon>
          <BiLogIn size={18} />
        </Icon>
        Sign in
      </Submit>
      <Button onClick={handleGoogleSignin}>
        <Icon>
          <FcGoogle size={18} />
        </Icon>
        Sign in with Google
      </Button>
    </InputPage>
  );
};

export default Login;
