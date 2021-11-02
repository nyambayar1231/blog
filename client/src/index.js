import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserStore } from "./contexts/UserContext";
import { BlogStore } from "./contexts/BlogContext";
import { CookiesProvider } from "react-cookie";
import { CommentStore } from "./contexts/CommentContext";
ReactDOM.render(
  <BrowserRouter>
    <UserStore>
      <BlogStore>
        <CommentStore>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </CommentStore>
      </BlogStore>
    </UserStore>
  </BrowserRouter>,
  document.getElementById("root")
);
