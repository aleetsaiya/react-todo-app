import React from "react";
import Input from "./Input";
import styled from "styled-components";

const CheckBtn = styled.button`
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 1.2rem;
  padding: 1rem;
  border: solid 1px ${(props) => props.theme.borderColor};
  cursor: default;
`;

const InputBoxStyle = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2.5rem;
  padding: 2rem 3.5rem;
  background-color: ${(props) => props.theme.itemBkColor};
`;

type InputBoxProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputBox: React.FC<InputBoxProps> = ({ value, onChange, onKeyDown }) => {
  return (
    <InputBoxStyle>
      <CheckBtn />
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeHolder="Create a new todo..."
      />
    </InputBoxStyle>
  );
};

export default InputBox;
