import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> // Commented out to address issues with drag-and-drop usage
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
