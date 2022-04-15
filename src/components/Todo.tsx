import React, { memo } from "react";
import styled from "styled-components";
import { Item, ItemCheckTable, ShowingMode } from "../types/item";
import ItemList from "./ItemList";
import ItemListInfo from "./ItemListInfo";
import ModeBox from "./ModeBox";

type TodoProps = {
  items: Array<Item>;
  itemCheckTable: ItemCheckTable;
  showingMode: ShowingMode;
  onCheckItem: (id: string) => void;
  onClearItem: (id: string) => void;
  onShowingModeChange: (mode: ShowingMode) => void;
  onClearCompletedItems: () => void;
};

function getItemLeft(itemTabel: ItemCheckTable) {
  let left = 0;
  for (const key in itemTabel) {
    if (!itemTabel[key]) left++;
  }
  return left;
}

const MobileOnlyBlock = styled.section`
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.itemBkColor};
  font-size: 1.8rem;
  text-align: center;

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Todo: React.FC<TodoProps> = ({
  items,
  onCheckItem,
  onClearItem,
  onShowingModeChange,
  onClearCompletedItems,
  showingMode,
  itemCheckTable,
}) => {
  return (
    <>
      <section>
        <ItemList
          items={items}
          showingMode={showingMode}
          onCheckItem={onCheckItem}
          onClearItem={onClearItem}
          checkTable={itemCheckTable}
        />
        <ItemListInfo
          itemLeft={getItemLeft(itemCheckTable)}
          showingMode={showingMode}
          onShowingModeChange={onShowingModeChange}
          onClearCompletedItems={onClearCompletedItems}
        />
      </section>
      <MobileOnlyBlock>
        <ModeBox
          showOnMobile={true}
          showingMode={showingMode}
          onShowingModeChange={onShowingModeChange}
        />
      </MobileOnlyBlock>
    </>
  );
};

export default memo(Todo);
