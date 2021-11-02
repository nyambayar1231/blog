import React, { useState, useContext } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Spinner from "../components/spinner";

const SignupPage = () => {
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    userCtx.signupUser(email, password, username);
  };

  return (
    <>
      {userCtx.state.saving ? (
        <Spinner />
      ) : (
        <>
          {userCtx.state.token && <Redirect to="/" push />}
          <div className="flex items-start justify-center h-screen min-h-full px-4 py-12 bg-white sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="w-auto h-12 mx-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                  Sign Up and Be one of 1000 writers
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                  {userCtx.state.error && (
                    <div className="mb-4 text-lg font-medium text-center text-red-900">
                      {userCtx.state.error}
                    </div>
                  )}
                  <div>
                    <label className="sr-only">Username</label>
                    <input
                      type="text"
                      required
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="sr-only">Email</label>
                    <input
                      type="email"
                      required
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="sr-only">Password</label>
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={signup}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignupPage;
