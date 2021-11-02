import React, { useState } from "react";
import axios from "../utils/axios";

const UserContext = React.createContext();

const initialState = {
  saving: false,
  logginIn: false,
  error: null,
  errorCode: null,
  token: null,
  userId: null,
  username: null,
  loading: false,
  data: null,
  createdAt: null,
  email: null,
  role: null,
  users: null,
  loggedOut: false,
};

export const UserStore = (props) => {
  const [state, setState] = useState(initialState);

  const logout = () => {
    setState({ ...state, loading: true });
    axios
      .get("users/logout")
      .then((result) => {
        console.log("result", result);
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setState((state) =>
          setState({
            ...state,
            username: null,
            userId: null,
            token: null,
            loggedOut: true,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          error: err?.response?.data?.error?.message,
          errorCode: err?.response?.data?.error?.statusCode,
        });
      });
  };

  const loginUser = (email, password) => {
    setState({ ...state, logginIn: true });
    axios
      .post("users/login", {
        email,
        password,
      })
      .then((result) => {
        const { username, email, _id, role } = result.data.user;
        const { token } = result.data;
        localStorage.setItem("userId", _id);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        setState((state) =>
          setState({
            ...state,
            logginIn: false,
            error: null,
            errorCode: null,
            email,
            username,
            userId: _id,
            token,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          logginIn: false,
          error: err?.response?.data?.error?.message,
          errorCode: err?.response?.data?.error?.statusCode,
          token: null,
          userId: null,
          email: null,
          username: null,
        });
      });
  };

  const signupUser = (email, password, username) => {
    setState({ ...state, saving: true });
    axios
      .post("users/register", {
        email,
        password,
        username,
      })
      .then((result) => {
        console.log("==============>", result);
        const { username, email, _id, role } = result.data.user;
        const { token } = result.data;
        localStorage.setItem("userId", _id);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        setState((state) =>
          setState({
            ...state,
            saving: false,
            token,
            userId: _id,
            username,
            email,
            error: null,
            errorCode: null,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          saving: false,
          token: null,
          userId: null,
          error: err.response.data.error.message,
          errorCode: err.response.data.error.statusCode,
        });
      });
  };

  const loginAdmin = (email, password) => {
    setState({ ...state, logginIn: true });
    axios
      .post("admins/login", {
        email,
        password,
      })
      .then((result) => {
        const { username, email, _id, token, role } = result.data.user;
        localStorage.setItem("userId", _id);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        setState((state) =>
          setState((state) =>
            setState({
              ...state,
              logginIn: false,
              error: null,
              errorCode: null,
              email,
              username,
              userId: _id,
              token,
              role,
            })
          )
        );
      })
      .catch((err) => {
        setState({
          ...state,
          logginIn: false,
          error: err.response.data.error.message,
          errorCode: err.response.data.error.statusCode,
          token: null,
          userId: null,
          email: null,
          username: null,
        });
      });
  };

  const getUsers = () => {
    setState({ ...state, logginIn: true });
    axios
      .get("admins/users")
      .then((result) => {
        setState((state) =>
          setState({
            ...state,
            logginIn: false,
            error: null,
            errorCode: null,
            users: result.data,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          logginIn: false,
          error: err.response.data.error.message,
          errorCode: err.response.data.error.statusCode,
          token: null,
          userId: null,
          email: null,
          username: null,
          users: null,
        });
      });
  };
  return (
    <UserContext.Provider
      value={{ state, signupUser, logout, loginUser, loginAdmin, getUsers }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
