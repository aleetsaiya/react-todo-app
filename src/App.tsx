import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";

import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Header from "./components/Header";

import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/Global";
import useTheme from "./hooks/useTheme";
import { defaultTheme } from "./defaultData";

const Container = styled.div`
  position: absolute;
  top: 6.5rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 58rem;
  width: 90%;
`;

const App: React.FC = () => {
  const theme = useTheme(defaultTheme);
  const location = useLocation();

  function getTitle() {
    const url = location.pathname;
    if (url === "/") return "Todo";
    else if (url === "/todo") return "Todo";
    else if (url === "/login") return "Login";
    else if (url === "/signup") return "Sign Up";
    else return "Not Found";
  }

  return (
    <>
      <ThemeProvider theme={theme.currentTheme}>
        <GlobalStyle />
        <Container>
          <Header title={getTitle()} toggleTheme={theme.toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </Container>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme.isLightTheme() ? "light" : "dark"}
      />
    </>
  );
};

export default App;
