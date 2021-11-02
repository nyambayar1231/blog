import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserStore } from "./contexts/UserContext";
import { BlogStore } from "./contexts/BlogContext";
import { CookiesProvider } from "react-cookie";
ReactDOM.render(
  <BrowserRouter>
    <UserStore>
      <BlogStore>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BlogStore>
    </UserStore>
  </BrowserRouter>,
  document.getElementById("root")
);
