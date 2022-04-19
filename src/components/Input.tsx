import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.itemBkColor};
  height: 100%;
`;

type InputProps = {
  value: string;
  type?: string;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onKeyDown,
  type = "text",
  placeHolder = "",
}) => {
  return (
    <InputStyle
      value={value}
      type={type}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeHolder}
      autoComplete="off"
    />
  );
};

export default Input;
