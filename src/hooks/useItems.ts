import { useState, useCallback } from "react";
import { Item, ItemCheckTable, ShowingMode } from "../types/Item";
import { toast } from "react-toastify";
import { updateDbItems, updateDbItemCheckTable } from "../firebase";

export default function useItems(
  defaultItems: Item[],
  defaultItemsTable: ItemCheckTable
) {
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [itemCheckTable, setItemCheckTable] =
    useState<ItemCheckTable>(defaultItemsTable);
  const [showingMode, setShowingMode] = useState<ShowingMode>("All");

  function updateState(items: Item[], itemCheckTable: ItemCheckTable) {
    setItems(items);
    setItemCheckTable(itemCheckTable);
  }

  function createItem(content: string) {
    if (content.trim() === "") {
      toast.error("Cannot create empty item.");
      return;
    }
    const newItems = [...items];
    const newItem: Item = {
      id: content + "-" + Date.now().toString(),
      content: content,
    };
    newItems.push(newItem);
    setItems(newItems);

    const newItemCheckTable = { ...itemCheckTable };
    newItemCheckTable[newItem.id] = false;
    setItemCheckTable(newItemCheckTable);

    const uid = window.localStorage.getItem("uid");
    if (uid) {
      updateDbItems(uid, newItems);
      updateDbItemCheckTable(uid, newItemCheckTable);
    }
  }

  const onCheckItem = useCallback(
    (id: string) => {
      const newItemCheckTable = { ...itemCheckTable };
      newItemCheckTable[id] = !newItemCheckTable[id];
      setItemCheckTable(newItemCheckTable);

      const uid = window.localStorage.getItem("uid");
      if (uid) {
        updateDbItemCheckTable(uid, newItemCheckTable);
      }
    },
    [itemCheckTable]
  );

  const onClearItem = useCallback(
    (id: string) => {
      const newItems = [...items];
      const index = newItems.findIndex((item) => item.id === id);
      newItems.splice(index, 1);
      setItems(newItems);

      const newItemCheckTable = { ...itemCheckTable };
      delete newItemCheckTable[id];
      setItemCheckTable(newItemCheckTable);

      const uid = window.localStorage.getItem("uid");
      if (uid) {
        updateDbItems(uid, newItems);
        updateDbItemCheckTable(uid, newItemCheckTable);
      }
    },
    [items, itemCheckTable]
  );

  const onClearCompletedItems = useCallback(() => {
    const newItems = items.filter((item) => itemCheckTable[item.id] === false);
    setItems(newItems);

    const newItemCheckTable = {} as ItemCheckTable;
    for (const key in itemCheckTable) {
      if (itemCheckTable[key] === false)
        newItemCheckTable[key] = itemCheckTable[key];
    }
    setItemCheckTable(newItemCheckTable);

    const uid = window.localStorage.getItem("uid");
    if (uid) {
      updateDbItems(uid, newItems);
      updateDbItemCheckTable(uid, newItemCheckTable);
    }
  }, [items, itemCheckTable]);

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, prevItems[dragIndex]);

        const uid = window.localStorage.getItem("uid");
        if (uid) {
          updateDbItems(uid, newItems);
        }
        return newItems;
      });
    },
    [items]
  );

  const onShowingModeChange = useCallback(
    (mode: ShowingMode) => {
      setShowingMode(mode);
    },
    [showingMode]
  );

  function getItemLeft() {
    let left = 0;
    for (const key in itemCheckTable) {
      if (!itemCheckTable[key]) left++;
    }
    return left;
  }

  return {
    items,
    itemCheckTable,
    updateState,
    showingMode,
    createItem,
    onClearItem,
    onCheckItem,
    onClearCompletedItems,
    moveItem,
    onShowingModeChange,
    getItemLeft,
  };
}
