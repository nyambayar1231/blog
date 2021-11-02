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
};

export const UserStore = (props) => {
  const [state, setState] = useState(initialState);

  const logout = () => {
    setState({ ...state, loading: true });

    axios
      .get("users/logout")
      .then((result) => {
        console.log(result);
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        setState({
          ...state,
          username: null,
          userId: null,
          token: null,
          data: result.data,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.response.data.error.message,
          errorCode: err.response.data.error.statusCode,
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
        const { username, email, _id, token } = result.data.user;
        localStorage.setItem("userId", _id);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        setState({
          ...state,
          logginIn: false,
          error: null,
          errorCode: null,
          email,
          username,
          userId: _id,
          token,
        });
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

  const signupUser = (email, password, username) => {
    setState({ ...state, saving: true });
    axios
      .post("users/register", {
        email,
        password,
        username,
      })
      .then((result) => {
        const token = result.data.token;
        const { username, email, _id } = result.data.user;
        setState({
          ...state,
          saving: false,
          token,
          userId: _id,
          username,
          email,
          error: null,
          errorCode: null,
        });
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

  return (
    <UserContext.Provider value={{ state, signupUser, logout, loginUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
