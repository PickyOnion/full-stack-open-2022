import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers/anecdoteToolkit";

const store = configureStore({
  reducer: {
    anecdotes: reducer,
  },
});

console.log(store.getState);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
