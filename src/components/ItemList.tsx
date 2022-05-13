import React, { memo } from "react";
import Item from "./Item";
import Loader from "./Loader";
import { Item as ItemType, ItemCheckTable, ShowingMode } from "../types/Item";
import styled from "styled-components";

function filter(isCheck: boolean, mode: ShowingMode) {
  if (
    (isCheck && mode === "Completed") ||
    (!isCheck && mode === "Active") ||
    mode === "All"
  ) {
    return true;
  }
  return false;
}

type ItemListProps = {
  items: Array<ItemType>;
  checkTable: ItemCheckTable;
  showingMode: ShowingMode;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onCheckItem: (id: string) => void;
  onClearItem: (id: string) => void;
  isLoading: boolean;
};

const LoaderWrapper = styled.div`
  width: 100%;
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemList: React.FC<ItemListProps> = ({
  items,
  checkTable,
  showingMode,
  moveItem,
  onCheckItem,
  onClearItem,
  isLoading,
}) => {
  return (
    <ul>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {items.map((item, index) => {
        if (filter(checkTable[item.id], showingMode))
          return (
            <Item
              key={item.id}
              id={item.id}
              index={index}
              moveItem={moveItem}
              content={item.content}
              onCheck={onCheckItem}
              onClear={onClearItem}
              isCheck={checkTable[item.id]}
            />
          );
        else return null;
      })}
    </ul>
  );
};

export default memo(ItemList);
