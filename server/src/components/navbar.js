import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { MediumLogo } from "../assets/logos";
import Dropdown from "./dropdown";
import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const userCtx = useContext(UserContext);
  const history = useHistory();
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between w-full h-20 px-6 bg-white">
        <div className="flex">
          <Link to="/">
            <MediumLogo />
          </Link>
        </div>
        <div className="hidden text-4xl font-extrabold md:flex">
          <h1>Make the world better</h1>
        </div>
        {!userCtx.state.userId ? (
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
            <Dropdown className="mr-20" />
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;
