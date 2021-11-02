import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import AdminPostsPage from "./AdminPostsPage";
import AdminUsersPage from "./AdminUsersPage";

const AdminHomePage = () => {
  const userCtx = useContext(UserContext);
  const [showUsers, setShowUsers] = useState(false);
  console.log(localStorage.getItem("role"));
  return (
    <>
      <div>
        <div className="flex h-screen overflow-hidden bg-red-400 justify-evenly ">
          <div className="w-1/4 h-40 pl-5 mx-5 mt-5 bg-purple-400 border rounded-xl">
            <ul className="list-disc">
              <li>
                <span
                  className="text-2xl underline cursor-pointer"
                  onClick={() => setShowUsers(false)}
                >
                  posts
                </span>
              </li>
              <li>
                <span
                  className="text-2xl underline cursor-pointer"
                  onClick={() => setShowUsers(true)}
                >
                  users
                </span>
              </li>
            </ul>
          </div>
          {showUsers ? <AdminUsersPage /> : <AdminPostsPage />}
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
