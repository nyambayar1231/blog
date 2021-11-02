import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Posts from "./pages/posts";
import PostDetail from "./pages/postDetail";
import SigninPage from "./pages/signinPage";
import SignupPage from "./pages/signupPage";
import EditPage from "./pages/editPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminDetail from "./pages/admin/AdminDetail";
import AdminSigninPage from "./pages/admin/AdminSigninPage";

function App() {
  return (
    <div className="bg-gray-50">
      {/* {localStorage.getItem("role") !== "admin" && <Navbar />} */}
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/admin" component={AdminHomePage} />\
          <Route exact path="/admin/detail/:id" component={AdminDetail} />
          <Route path="/admin" component={AdminSigninPage} />
          <Route exact path="/post-detail/:id" component={PostDetail} />
          <Route exact path="/login" component={SigninPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/write-post" component={EditPage} />
          <Route exact path="/logout" component={Posts} />
          <Route exact path="/" component={Posts} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
