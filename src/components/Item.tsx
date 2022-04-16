import React, { useState, useRef } from "react";
import checkIcon from "../assets/icon-check.svg";
import crossIcon from "../assets/icon-cross.svg";
import styled from "styled-components";

import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

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
  index: number;
  content: string;
  isCheck: boolean;
  onCheck: (id: string) => void;
  onClear: (id: string) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const DragItemTypes = {
  Item: "item",
};

const Item: React.FC<ItemProps> = ({
  id,
  index,
  content,
  isCheck,
  onCheck,
  onClear,
  moveItem,
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragItemTypes.Item,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DragItemTypes.Item,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function handleMouseEnter() {
    setMouseEnter(true);
  }

  function handleMosueLeave() {
    setMouseEnter(false);
  }

  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));

  return (
    <ItemStyle
      isCheck={isCheck}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMosueLeave}
    >
      <div ref={ref} data-handler-id={handlerId} style={{ opacity }}>
        <CheckBtn onClick={() => onCheck(id)} isCheck={isCheck}>
          <CheckIcon src={checkIcon} alt="check-icon" isCheck={isCheck} />
        </CheckBtn>
        {content}
        <CrossBtn onClick={() => onClear(id)} show={mouseEnter}>
          <CrossIcon src={crossIcon} alt="cross-icon" />
        </CrossBtn>
      </div>
    </ItemStyle>
  );
};

export default Item;
