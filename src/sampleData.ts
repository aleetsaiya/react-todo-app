import { Item, ItemCheckTable } from "./types/item";

// Sample Data
export const sampleItems: Item[] = [
  { id: "Taking exercise!-1650041675479", content: "Taking exercise!" },
  {
    id: "Try to add something :)-1650041890864",
    content: "Try to add something :)",
  },
];

export const sampleCheckTable: ItemCheckTable = {
  "Taking exercise!-1650041675479": true,
  "Try to add something :)-1650041890864": false,
};
