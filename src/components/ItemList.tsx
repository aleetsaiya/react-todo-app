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
  onCheckItem: (id: string) => void;
  onClearItem: (id: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({
  items,
  checkTable,
  showingMode,
  onCheckItem,
  onClearItem,
}) => {
  return (
    <ul>
      {items.map((item) => {
        if (filter(checkTable[item.id], showingMode))
          return (
            <Item
              key={item.id}
              id={item.id}
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
