import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";//importing App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(//Render root
  <React.StrictMode>
    <App />
  </React.StrictMode>
);