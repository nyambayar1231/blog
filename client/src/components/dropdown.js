import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../contexts/UserContext";
import { Redirect } from "react-router-dom";

const Dropdown = ({ email, token }) => {
  const userCtx = useContext(UserContext);
  function useOutsideClicker(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropBox(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function OutsideClickCatcher(props) {
    const wrapperRef = useRef(null);
    useOutsideClicker(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
  }

  OutsideClickCatcher.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const logout = () => {
    setShowDropBox(!showDropBox);
    localStorage.removeItem("userId");
    userCtx.logout();
  };
  const [showDropBox, setShowDropBox] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center ">
      {!token && <Redirect to="/" />}
      <OutsideClickCatcher>
        <>
          <div
            className="flex -space-x-1 overflow-hidden cursor-pointer select-none "
            onClick={() => setShowDropBox(!showDropBox)}
          >
            <img
              className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          {showDropBox && (
            <div className="absolute z-50 flex flex-col w-48 bg-white border border-gray-400 rounded shadow-lg cursor-pointer top-11 right-12">
              <div
                className="px-4 py-2 hover:bg-gray-200"
                onClick={() => {
                  setShowDropBox(!showDropBox);
                }}
              >
                <span> {email}</span>
              </div>
              <Link to="write-post">
                <div
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setShowDropBox(!showDropBox);
                  }}
                >
                  <span>Write post </span>
                </div>
              </Link>
              <div
                className="flex px-4 py-2 text-gray-900 hover:bg-gray-200"
                onClick={logout}
              >
                <span>Log out</span>
              </div>
            </div>
          )}
        </>
      </OutsideClickCatcher>
    </div>
  );
};

export default Dropdown;
