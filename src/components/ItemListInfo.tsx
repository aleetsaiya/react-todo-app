import React, { memo } from "react";
import { ShowingMode } from "../types/item";
import styled from "styled-components";
import ModeBox from "./ModeBox";

type ItemListInfoProps = {
  showingMode: ShowingMode;
  itemLeft: number;
  onShowingModeChange: (mode: ShowingMode) => void;
  onClearCompletedItems: () => void;
};

const Info = styled.span`
  display: inline-block;
`;

const ClearBtn = styled.button`
  color: inherit;
  font-family: inherit;
  transition: all ease 0.2s;

  &:hover {
    color: ${(props) => props.theme.color};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.itemBkColor};
  padding: 2rem 3.5rem;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-color: ${(props) => props.theme.itemBkColor};
  font-size: 1.4rem;
  color: ${(props) => props.theme.secondColor};
`;

const ItemListInfo: React.FC<ItemListInfoProps> = ({
  showingMode,
  itemLeft,
  onShowingModeChange,
  onClearCompletedItems,
}) => {
  return (
    <Row>
      <Info>{itemLeft} items left</Info>
      <ModeBox
        showingMode={showingMode}
        onShowingModeChange={onShowingModeChange}
      />
      <ClearBtn onClick={onClearCompletedItems}>Clear Completed</ClearBtn>
    </Row>
  );
};

export default memo(ItemListInfo);
