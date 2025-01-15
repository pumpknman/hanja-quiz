import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
  document.getElementById("root")
);
