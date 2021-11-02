import React, { useState } from "react";
import axios from "../utils/axios";

const BlogContext = React.createContext();

const initialState = {
  saving: false,
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
  readTime: null,
};

export const BlogStore = (props) => {
  const [state, setState] = useState(initialState);

  const createBlog = (title, content, authorId, authorName, unpublishBlog) => {
    setState({ ...state, saving: true });
    axios
      .post("/blogs/admin/posts", {
        title,
        content,
        authorId,
        authorName,
        unpublishBlog,
      })
      .then((result) => {
        const { title, content, authorId, authorName, createdAt } =
          result.data.blog;
        setState((state) =>
          setState({
            ...state,
            title,
            content,
            authorId,
            authorName,
            createdAt,
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
        setState((state) =>
          setState({
            ...state,
            error: err.response.data.error.message,
            errorCode: err.response.data.error.statusCode,
            saving: false,
          })
        );
      });
  };

  const getBlog = (_id) => {
    setState({ ...state, saving: true });
    axios
      .get(`/blogs/${_id}`)
      .then((result) => {
        const { content, title, authorId, authorName, createdAt, visitedTime } =
          result.data.data;
        setState((state) =>
          setState({
            ...state,
            content,
            title,
            authorId,
            authorName,
            createdAt,
            saving: false,
            visitedTime,
          })
        );
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

  const postBlog = (title, content, authorId, authorName) => {
    setState({ ...state, saving: true });
    axios
      .post("/blogs", {
        title,
        content,
        authorId,
        authorName,
      })
      .then((result) => {
        const { title, content, authorId, authorName, createdAt, readTime } =
          result.data.blog;
        setState((state) =>
          setState({
            ...state,
            title,
            content,
            authorId,
            authorName,
            createdAt,
            readTime,
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

  const getPendingBlogs = () => {
    setState({ ...state, saving: true });
    axios
      .get("/blogs/admin/posts")
      .then((result) => {
        setState(() =>
          setState({
            ...state,
            blogs: result.data,
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

  const getPendingBlog = (_id) => {
    setState({ ...state, saving: true });
    axios
      .get(`/blogs/admin/posts/${_id}`)
      .then((result) => {
        // console.log("============>", result.data.data.authorName);
        setState((state) =>
          setState({
            ...state,
            blog: result.data,
            saving: false,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.response.data.error.message ?? "",
          errorCode: err.response.data.error.statusCode ?? "",
          saving: false,
        });
      });
  };

  const deletePendingBlog = (_id) => {
    setState({ ...state, saving: true });
    axios
      .delete(`/blogs/admin/posts/${_id}`)
      .then((result) => {
        console.log("delete", result);
        setState((state) =>
          setState({
            ...state,
            blog: null,
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

  const unpublishBlog = (
    title,
    content,
    authorId,
    authorName,
    unpublishBlog
  ) => {
    setState({ ...state, saving: true });
    axios
      .post("/blogs/admin/posts", {
        title,
        content,
        authorId,
        authorName,
        unpublishBlog,
      })
      .then((result) => {
        const { title, content, authorId, authorName, createdAt } =
          result.data.blog;
        setState((state) =>
          setState({
            ...state,
            title,
            content,
            authorId,
            authorName,
            createdAt,
            saving: false,
          })
        );
      })
      .catch((err) => {
        setState({
          ...state,
          error: err?.response?.data?.error?.message,
          errorCode: err?.response?.dat?.error?.statusCode,
          saving: false,
        });
      });
  };

  return (
    <BlogContext.Provider
      value={{
        state,
        createBlog,
        getBlogs,
        getBlog,
        postBlog,
        getPendingBlogs,
        deletePendingBlog,
        getPendingBlog,
        unpublishBlog,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
