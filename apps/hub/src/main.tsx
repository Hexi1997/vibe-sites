import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Hub root element was not found.");
}

createRoot(app).render(createElement(App));
