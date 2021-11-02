import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { MediumLogo } from "../assets/logos";
import Dropdown from "./dropdown";
import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const userCtx = useContext(UserContext);
  const history = useHistory();
  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between w-full h-20 px-6 bg-white">
        <div className="flex">
          <a href="/">
            <MediumLogo />
          </a>
        </div>
        <div className="hidden text-4xl font-extrabold lg:flex">
          <h1>Make the world better</h1>
        </div>
        {!localStorage.getItem("token") ? (
          <div>
            <button
              className="px-4 py-2 font-serif text-sm font-bold text-green-500 opacity-60 hover:text-green-800 rounded-2xl md:text-xl"
              onClick={() => history.push("/login")}
            >
              Sign in
            </button>
            <button
              className="px-4 py-2 text-sm font-bold text-purple-500 underline hover:text-purple-800 rounded-2xl md:text-xl"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="mr-5">
            <Dropdown className="mr-20" email={email} token={token} />
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;
