import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import "./styles/fonts.css";
import { analytics } from "./firebase";

if (analytics) {
  import("firebase/analytics").then(({ logEvent }) => {
    logEvent(analytics, "app_loaded");
  });
}

ReactDOM.render(
  <NextUIProvider>
    <App />
  </NextUIProvider>,
  document.getElementById("root")
);
