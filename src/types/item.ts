export type Item = {
  id: string;
  content: string;
};

export type ItemCheckTable = {
  [id: string]: boolean;
};

export type ShowingMode = "All" | "Active" | "Completed";
