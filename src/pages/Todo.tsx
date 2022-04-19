import React, { useState, useEffect, memo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSampleItems } from "../defaultData";
import { getDataFromDb } from "../firebase";
import { getStorageUserID } from "../localStorage";
import { Link } from "react-router-dom";
import { GoSignIn } from "react-icons/go";

// components
import InputBox from "../components/InputBox";
import ItemList from "../components/ItemList";
import ItemListInfo from "../components/ItemListInfo";

// hooks
import useItems from "../hooks/useItems";

// style
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Hint = styled.div`
  position: relative;
  margin-top: 10rem;
  margin-bottom: 5rem;
  text-align: center;
  color: ${(props) => props.theme.secondColor};
  font-size: 1.2rem;

  & > *:first-child {
    display: flex;
    align-items: center;
    font-family: inherit;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    color: inherit;
    text-decoration: none;
    position: absolute;
    left: 1rem;
    transition: all ease 0.2s;

    &:hover {
      color: #3a7bfd;
    }

    & > * {
      margin-right: 0.2rem;
    }

    @media (max-width: 768px) {
      position: relative;
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    margin-top: 15rem;
    text-align: center;
  }
`;

const [sampleItems, sampleCheckTable] = getSampleItems();

const Todo: React.FC = () => {
  const uid = getStorageUserID();

  const [inputValue, setInputValue] = useState("");
  const items = useItems(uid ? [] : sampleItems, uid ? {} : sampleCheckTable);

  useEffect(() => {
    if (uid) {
      getDataFromDb(uid).then((res) => {
        const [resItems, resItemCheckTable] = res;
        if (resItems && resItemCheckTable) {
          items.updateState(resItems, resItemCheckTable);
        }
      });
    }
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    items.createItem(inputValue);
    setInputValue("");
  }

  function logout() {
    localStorage.clear();
    toast.success("Logout Success!");
    items.updateState(sampleItems, sampleCheckTable);
  }

  return (
    <>
      <InputBox
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <DndProvider backend={HTML5Backend}>
        <section>
          <ItemList
            items={items.items}
            showingMode={items.showingMode}
            onCheckItem={items.onCheckItem}
            onClearItem={items.onClearItem}
            checkTable={items.itemCheckTable}
            moveItem={items.moveItem}
          />
          <ItemListInfo
            itemLeft={items.getItemLeft()}
            showingMode={items.showingMode}
            onShowingModeChange={items.onShowingModeChange}
            onClearCompletedItems={items.onClearCompletedItems}
          />
        </section>
      </DndProvider>
      <Hint>
        {getStorageUserID() ? (
          <button onClick={logout}>
            <GoSignIn size={15} />
            Logout
          </button>
        ) : (
          <Link to="/login">
            <GoSignIn size={15} />
            Login
          </Link>
        )}
        <span>Drag and drop to reorder list</span>
      </Hint>
    </>
  );
};

export default memo(Todo);
