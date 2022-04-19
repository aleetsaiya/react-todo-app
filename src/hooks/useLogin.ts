import React, { useState } from "react";
import { loginWithEmail, loginWithGoogle, createUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function validate() {
    if (email.trim() === "") {
      toast.error("Please enter your email.");
      return false;
    }
    if (password.trim() === "") {
      toast.error("Please enter your password.");
      return false;
    }
    return true;
  }

  function submit() {
    if (!validate()) {
      return;
    }
    setLoading(true);
    loginWithEmail(email, password)
      .then((uid) => {
        toast.success("Login Success!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err, err.message.split("/")[1].slice(0, -2));
        toast.error(err.message.split("/")[1].slice(0, -2));
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
        toast.success("Login Success!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCreateAccount() {
    if (!validate()) {
      return;
    }
    setLoading(true);
    createUser(email, password)
      .then((uid) => {
        toast.success("Create Success!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err, err.message.split("/")[1].slice(0, -2));
        toast.error(err.message.split("/")[1].slice(0, -2));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {
    email,
    submit,
    password,
    loading,
    handleCreateAccount,
    handleGoogleSignin,
    handlePressEnter,
    handlePasswordChanged,
    handleEmailChanged,
  };
}
