import React, { useState } from "react";
import axios from "../utils/axios";

const BlogContext = React.createContext();

const initialState = {
  saving: true,
  uploadinIn: false,
  error: null,
  errorCode: null,
  title: null,
  content: null,
  blogs: null,
  blog: null,
  authorId: null,
  authorName: null,
  createdAt: null,
  contentSummary: null,
};

export const BlogStore = (props) => {
  const [state, setState] = useState(initialState);

  const createBlog = (title, content, authorId, authorName) => {
    setState({ ...state, saving: true });

    axios
      .post("/blogs", {
        title,
        content,
        authorId,
        authorName,
      })
      .then((result) => {
        setState({ ...state, saving: true });
        const { title, content, authorId, authorName, createdAt } =
          result.data.blog;
        setState({
          ...state,
          title,
          content,
          authorId,
          authorName,
          createdAt,
          saving: false,
        });
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

  const getBlogs = () => {
    setState({ ...state, saving: true });

    axios
      .get("/blogs")
      .then((result) => {
        setState({
          ...state,
          blogs: result.data,
          saving: false,
        });
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

  const getBlog = (_id) => {
    setState({ ...state, saving: true });
    axios
      .get(`/blogs/${_id}`)
      .then((result) => {
        const { content, title, authorId, authorName, createdAt } =
          result.data.data;
        setState({
          ...state,
          content,
          title,
          authorId,
          authorName,
          createdAt,
          saving: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: err?.response?.data?.error?.message ?? "",
          errorCode: err?.response?.data?.error?.statusCode ?? "",
          saving: false,
        });
      });
  };

  return (
    <BlogContext.Provider value={{ state, createBlog, getBlogs, getBlog }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
