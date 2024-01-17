import "./styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";

addEventListener("load", () =>
  ReactDOM.createRoot(document.getElementById("app")!).render(<App />)
);
