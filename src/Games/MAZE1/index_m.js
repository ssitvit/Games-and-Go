import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App_m";

const rootElement = document.getElementById("root");

export default function maze() {
  return (
    <StrictMode>
    <App />
  </StrictMode>,
  rootElement
  )
}