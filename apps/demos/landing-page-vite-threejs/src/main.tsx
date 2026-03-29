import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="page">
      <p className="eyebrow">Draft demo</p>
      <h1>Landing Page Vite Threejs</h1>
      <p>This starter was generated with the react template.</p>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
