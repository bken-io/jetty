import "./index.css";
import App from "./App";
import React from "react";
import theme from "./theme";
import ReactDOM from "react-dom";

import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
