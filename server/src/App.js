import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Posts from "./pages/posts";
import PostDetail from "./pages/postDetail";
import SigninPage from "./pages/signinPage";
import SignupPage from "./pages/signupPage";
import EditPage from "./pages/editPage";

function App() {
  return (
    <div className="bg-gray-400">
      <Navbar />
      <main>
        <Suspense fallback={<div>Түр хүлээнэ үү...</div>}>
          <Switch>
            <Route path="/post-detail/:id" children={<PostDetail />} />
            <Route path="/login" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/write-post" component={EditPage} />
            <Route path="/logout" component={Posts} />
            <Route path="/" component={Posts} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
