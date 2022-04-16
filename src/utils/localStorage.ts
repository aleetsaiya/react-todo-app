import { Item, ItemCheckTable } from "../types/item";

export function getStorageItems() {
  const items = window.localStorage.getItem("items");
  const itemCheckTable = window.localStorage.getItem("itemCheckTable");
  if (!items || !itemCheckTable) {
    return [null, null];
  } else {
    const itemsObj = JSON.parse(items) as Item[];
    const itemCheckTableObj = JSON.parse(itemCheckTable) as ItemCheckTable;
    return [itemsObj, itemCheckTableObj];
  }
}

export function setStorageItems(items: Item[], itemCheckTable: ItemCheckTable) {
  window.localStorage.setItem("items", JSON.stringify(items));
  window.localStorage.setItem("itemCheckTable", JSON.stringify(itemCheckTable));
}

export function updateStorageCheckTable(itemCheckTable: ItemCheckTable) {
  window.localStorage.setItem("itemCheckTable", JSON.stringify(itemCheckTable));
}

export function updateStorageItems(items: Item[]) {
  window.localStorage.setItem("items", JSON.stringify(items));
}
