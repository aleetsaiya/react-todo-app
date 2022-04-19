import React from "react";
import { render } from "react-dom";
import App from "./App";
import { initFirebase } from "./firebase";
import { BrowserRouter } from "react-router-dom";

initFirebase();
render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
