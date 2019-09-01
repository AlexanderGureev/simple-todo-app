import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "easy-peasy";

import "react-virtualized/styles.css";
import "antd/dist/antd.css";
import "./index.css";

import store from "./store";
import App from "./components/App";

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <StoreProvider store={store}>
      <Component />
    </StoreProvider>,
    document.getElementById("root")
  );

render(App);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./components/App.js", () => {
      render(App);
    });
  }
}
