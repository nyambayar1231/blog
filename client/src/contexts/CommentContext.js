import React, { useState } from "react";
import axios from "../utils/axios";

const CommentContext = React.createContext();

const initialState = {
  saving: true,
  error: null,
  errorCode: null,
  comment: null,
  authorId: null,
  authorName: null,
  createdAt: null,
  comments: null,
  commentWriter: null,
};

export const CommentStore = (props) => {
  const [state, setState] = useState(initialState);

  const createComment = (comment, _id, commentWriter) => {
    setState({ ...state, saving: true });
    if (commentWriter === null) {
      commentWriter = "guest";
    }
    axios
      .post("/comments", {
        comment,
        blogId: _id,
        commentWriter,
      })
      .then((result) => {
        console.log("========>", result);
        setState((state) =>
          setState({
            ...state,
            comment: result.data.data.comment,
            commentWriter: result.data.data.commentWriter,
            saving: false,
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
        setState({
          ...state,
          error: err.response.data.error.message,
          errorCode: err.response.data.error.statusCode,
          saving: false,
        });
      });
  };

  const getComments = (_id) => {
    setState({ ...state, saving: true });
    axios
      .get(`/comments/${_id}`)
      .then((result) => {
        console.log("========>", result.data.data);
        setState((state) =>
          setState({
            ...state,
            comments: result.data.data,
            saving: false,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.response.data.error.message,
          errorCode: err.response.data.error.statusCode,
          saving: false,
        });
      });
  };

  return (
    <CommentContext.Provider
      value={{
        state,
        createComment,
        getComments,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
