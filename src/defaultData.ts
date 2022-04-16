import { Item, ItemCheckTable } from "./types/item";
import { getStorageItems } from "./utils/localStorage";
import { DarkTheme } from "./styles/themes";

const sampleItems: Item[] = [
  { id: "Hello🌎-1650041675479", content: "Hello🌎" },
  {
    id: "Complete🎉-1650041890864",
    content: "Complete🎉",
  },
];

const sampleCheckTable: ItemCheckTable = {
  "Hello🌎-1650041675479": false,
  "Complete🎉-1650041890864": true,
};

export const defaultTheme = DarkTheme;

export default function getDefaultData() {
  // use local cache or sample data
  const [storageItems, storageItemsTable] = getStorageItems();
  let defaultItems, defaultItemsTable;

  if (storageItems && storageItemsTable) {
    console.log("use cache");
    defaultItems = storageItems as Item[];
    defaultItemsTable = storageItemsTable as ItemCheckTable;
  } else {
    console.log("use sample");
    defaultItems = sampleItems;
    defaultItemsTable = sampleCheckTable;
  }

  return [defaultItems, defaultItemsTable] as const;
}
