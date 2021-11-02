import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../../contexts/BlogContext";
import UserContext from "../../contexts/UserContext";
import AdminPost from "./AdminPost";
import Spinner from "../../components/spinner";
import { Redirect } from "react-router";

const AdminPostsPage = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [blogId, setBlogId] = useState("");
  const blogCtx = useContext(BlogContext);
  const userCtx = useContext(UserContext);
  console.log(userCtx);
  useEffect(() => {
    blogCtx.getPendingBlogs();
    setIsPublished(false);
  }, [isPublished]);

  return (
    <div className="mx-5 my-5">
      {userCtx.state.role !== "admin" && <Redirect to="/admin" />}
      {blogCtx.state.saving && <Spinner />}
      {isPublished && (
        <div className="flex items-center justify-between p-2 mb-2 text-red-700 bg-yellow-400 opacity-70">
          <h1 className="">Blog with id number #{blogId} is published</h1>
        </div>
      )}
      <div className="w-full ml-10">
        {blogCtx?.state?.blogs?.data?.map((el) => {
          const {
            authorId,
            authorName,
            contentSummary,
            createdAt,
            title,
            content,
            _id,
          } = el;
          return (
            <AdminPost
              authorId={authorId}
              key={createdAt}
              authorName={authorName}
              contentSummary={contentSummary}
              createdAt={createdAt}
              title={title}
              content={content}
              _id={_id}
              setIsPublished={setIsPublished}
              setBlogId={setBlogId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminPostsPage;
