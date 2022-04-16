import React, { memo } from "react";
import Item from "./Item";
import { Item as ItemType, ItemCheckTable, ShowingMode } from "../types/item";

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
};

const ItemList: React.FC<ItemListProps> = ({
  items,
  checkTable,
  showingMode,
  moveItem,
  onCheckItem,
  onClearItem,
}) => {
  return (
    <ul>
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
