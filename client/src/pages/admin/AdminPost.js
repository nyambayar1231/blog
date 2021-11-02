import React, { useContext, useEffect } from "react";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { Link, useHistory } from "react-router-dom";
import BlogContext from "../../contexts/BlogContext";

const AdminPost = ({
  authorId,
  authorName,
  contentSummary,
  createdAt,
  title,
  content,
  _id,
  setIsPublished,
  setBlogId,
  ...props
}) => {
  const blogCtx = useContext(BlogContext);

  const createBlog = () => {
    blogCtx.createBlog(title, content, authorId, authorName);
    if (!blogCtx.state.error) {
      blogCtx.deletePendingBlog(_id);
      //   window.location.reload();
      setIsPublished(true);
      setBlogId(_id);
    }
  };

  const unpublishBlog = () => {
    let unpublishBlog = "unpublish";
    blogCtx.createBlog(title, content, authorId, authorName, unpublishBlog);
    if (!blogCtx.state.error) {
      blogCtx.deletePendingBlog(_id);
      setIsPublished(true);
      setBlogId(_id);
    }
  };

  if (contentSummary) contentSummary = contentSummary.substring(0, 160);

  if (createdAt)
    createdAt = createdAt.slice(0, 10) + " " + createdAt.substring(11, 20);

  return (
    <div className="z-10 w-full max-w-4xl px-4 mb-5 bg-indigo-300 rounded-lg ">
      <ul className="text-xl text-gray-900">
        <li className="leading-8 ">
          <div className="flex items-center justify-between">
            <h1 className="font-sans text-lg font-bold wrap">
              {createdAt}
              <span className="font-normal">
                By <span className="font-sans underline">{authorName}</span>
              </span>
            </h1>
            <div className="z-50 items-start justify-end hidden sm:flex no-wrap">
              <button
                className="text-2xl text-green-900 hover:text-green-300"
                onClick={createBlog}
              >
                <HiOutlineCheck />
              </button>
              <button
                className="text-2xl text-red-500 hover:text-red-200 "
                onClick={unpublishBlog}
              >
                <HiOutlineX />
              </button>
            </div>
          </div>
          <Link to={`/admin/detail/${_id}`}>
            <p className="text-base font-bold cursor-pointer text-gray">
              <span className="text-2xl">Title </span>: {title}
            </p>
            <p className="hidden overflow-hidden text-sm leading-8 cursor-pointer md:block">
              {contentSummary}
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPost;
