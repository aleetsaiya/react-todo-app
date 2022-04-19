import { Item, ItemCheckTable } from "./types/Item";
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

export function getSampleItems() {
  return [sampleItems, sampleCheckTable] as const;
}
