import React, { useState } from "react";
import checkIcon from "../assets/icon-check.svg";
import crossIcon from "../assets/icon-cross.svg";
import styled from "styled-components";

type CheckingProps = {
  isCheck: boolean;
};

// check style
const CheckBtn = styled.button<CheckingProps>`
  border-radius: 50%;
  min-width: 2.2rem;
  min-height: 2.2rem;
  margin-right: 1.2rem;
  padding: 0.6rem;
  ${(props) =>
    props.isCheck &&
    "background: linear-gradient(to right bottom, hsl(192, 100%, 67%),hsl(280, 87%, 65%));"}

  ${(props) =>
    props.isCheck ? "" : `border: solid 1px ${props.theme.borderColor};`}
`;

const CheckIcon = styled.img<CheckingProps>`
  display: ${(props) => (props.isCheck ? "block" : "none")};
  width: 100%;
`;

// cross style
const CrossIcon = styled.img`
  width: 100%;
`;

const CrossBtn = styled.button<{ show: boolean }>`
  position: absolute;
  right: ${(props) => (props.show ? "2.5rem" : "-2.5rem")};
  min-width: 1.5rem;
  min-height: 1.5em;
  border-radius: 50%;
  transition: all ease 0.3s;
  opacity: ${(props) => (props.show ? 1 : 0)};

  @media (max-width: 768px) {
    opacity: 1;
    right: 2.5rem;
  }
`;

// item style
const ItemStyle = styled.li<CheckingProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.itemBkColor};
  text-decoration: ${(props) => (props.isCheck ? "line-through" : "none")};
  color: ${(props) => props.isCheck && props.theme.checkedColor};
  padding: 2rem 3.5rem;
  position: relative;
  overflow: hidden;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  transition: all ease 0.2s;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

type ItemProps = {
  id: string;
  content: string;
  isCheck: boolean;
  onCheck: (id: string) => void;
  onClear: (id: string) => void;
};

const Item: React.FC<ItemProps> = ({
  id,
  content,
  isCheck,
  onCheck,
  onClear,
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  function handleMouseEnter() {
    setMouseEnter(true);
  }

  function handleMosueLeave() {
    setMouseEnter(false);
  }

  return (
    <ItemStyle
      isCheck={isCheck}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMosueLeave}
    >
      <CheckBtn onClick={() => onCheck(id)} isCheck={isCheck}>
        <CheckIcon src={checkIcon} alt="check-icon" isCheck={isCheck} />
      </CheckBtn>
      {content}
      <CrossBtn onClick={() => onClear(id)} show={mouseEnter}>
        <CrossIcon src={crossIcon} alt="cross-icon" />
      </CrossBtn>
    </ItemStyle>
  );
};

export default Item;
