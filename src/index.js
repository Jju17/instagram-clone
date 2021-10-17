import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { app } from "./lib/firebase";
import FirebaseContext from "./context/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={{ app }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
