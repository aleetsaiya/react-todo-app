import React, { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";

// components
import Todo from "./components/Todo";
import InputBox from "./components/InputBox";
import Header from "./components/Header";

// style
import GlobalStyle from "./styles/Global";
import styled, { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./styles/themes";
import "react-toastify/dist/ReactToastify.css";

import { Item, ItemCheckTable, ShowingMode } from "./types/item";
import { setStorageItems, updateStorageCheckTable } from "./utils/localStorage";
import getDefaultData, { defaultTheme } from "./defaultData";

const Main = styled.main`
  position: absolute;
  top: 6.5rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 58rem;
  width: 90%;
`;

const Footer = styled.footer`
  margin: 5rem;
  text-align: center;
  color: ${(props) => props.theme.secondColor};
  font-size: 1.2rem;
`;

const [defaultItems, defaultItemsTable] = getDefaultData();

const App: React.FC = () => {
  const [showingMode, setShowingMode] = useState<ShowingMode>("All");
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Item[]>(defaultItems);
  const [itemCheckTable, setItemCheckTable] =
    useState<ItemCheckTable>(defaultItemsTable);

  // items
  function createItem(content: string) {
    if (content.trim() === "") {
      toast.error("Cannot create empty item.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

    setStorageItems(newItems, newItemCheckTable);
  }

  const handleCheckItem = useCallback(
    (id: string) => {
      const newItemCheckTable = { ...itemCheckTable };
      newItemCheckTable[id] = !newItemCheckTable[id];
      setItemCheckTable(newItemCheckTable);

      updateStorageCheckTable(newItemCheckTable);
    },
    [itemCheckTable]
  );

  const handleClearItem = useCallback(
    (id: string) => {
      const newItems = [...items];
      const index = newItems.findIndex((item) => item.id === id);
      newItems.splice(index, 1);
      setItems(newItems);

      const newItemCheckTable = { ...itemCheckTable };
      delete newItemCheckTable[id];
      setItemCheckTable(newItemCheckTable);

      setStorageItems(newItems, newItemCheckTable);
    },
    [items, itemCheckTable]
  );

  const handleClearCompleteItems = useCallback(() => {
    const newItems = items.filter((item) => itemCheckTable[item.id] === false);
    setItems(newItems);

    const newItemCheckTable = {} as ItemCheckTable;
    for (const key in itemCheckTable) {
      if (itemCheckTable[key] === false)
        newItemCheckTable[key] = itemCheckTable[key];
    }
    setItemCheckTable(newItemCheckTable);

    setStorageItems(newItems, newItemCheckTable);
  }, [items, itemCheckTable]);

  const handleShowingModeChange = useCallback(
    (mode: ShowingMode) => {
      setShowingMode(mode);
    },
    [showingMode]
  );

  // input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    createItem(inputValue);
    setInputValue("");
  }

  // theme
  const toggleTheme = useCallback(() => {
    if (currentTheme === LightTheme) setCurrentTheme(DarkTheme);
    else setCurrentTheme(LightTheme);
  }, [currentTheme]);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Main>
          <Header title="TODO" toggleTheme={toggleTheme} />
          <InputBox
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Todo
            items={items}
            showingMode={showingMode}
            itemCheckTable={itemCheckTable}
            onClearItem={handleClearItem}
            onCheckItem={handleCheckItem}
            onShowingModeChange={handleShowingModeChange}
            onClearCompletedItems={handleClearCompleteItems}
          />
          <Footer>Drag and drop to reorder list</Footer>
        </Main>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={currentTheme === LightTheme ? "light" : "dark"}
      />
    </>
  );
};

export default App;
