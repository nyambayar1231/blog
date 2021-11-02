import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import BlogContext from "../../contexts/BlogContext";

const AdminDetail = () => {
  const history = useHistory();
  const [publish, setPublish] = useState(false);
  const [unpublish, setUnpublish] = useState(false);

  const blogCtx = useContext(BlogContext);
  const _id = useParams().id;
  useEffect(() => {
    blogCtx.getPendingBlog(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const publishBlog = () => {
    blogCtx.createBlog(
      blogCtx?.state?.blog?.data.title,
      blogCtx?.state?.blog?.data.content,
      blogCtx?.state?.blog?.data.authorId,
      blogCtx?.state?.blog?.data.authorName
    );
    if (!blogCtx.state.error) {
      blogCtx.deletePendingBlog(blogCtx?.state?.blog?.data?._id);
      setPublish(true);
      setTimeout(() => {
        history.push("/admin/posts");
      }, 5000);
    }
  };
  const unpublishBlog = () => {
    let unpublishBlog = "unpublish";
    blogCtx.createBlog(
      blogCtx?.state?.blog?.data.title,
      blogCtx?.state?.blog?.data.content,
      blogCtx?.state?.blog?.data.authorId,
      blogCtx?.state?.blog?.data.authorName,
      unpublishBlog
    );
    if (!blogCtx.state.error) {
      blogCtx.deletePendingBlog(blogCtx?.state?.blog?.data?._id);
      setUnpublish(true);
      setTimeout(() => {
        history.push("/admin/posts");
      }, 3000);
    }
  };
  if (publish) {
    return (
      <div
        className="flex items-center px-4 py-3 text-sm font-bold text-white bg-green-500"
        role="alert"
      >
        <svg
          className="w-4 h-4 mr-2 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>
          with id number {blogCtx?.state?.blog?.data?._id}, blog published
          successfully
        </p>
      </div>
    );
  } else if (unpublish) {
    return (
      <div
        className="flex items-center px-4 py-3 text-sm font-bold text-white bg-yellow-500"
        role="alert"
      >
        <svg
          className="w-4 h-4 mr-2 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>
          with id number {blogCtx?.state?.blog?.data._id}, blog unpublished.
          <span>goback</span>
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-center h-screen px-5 pt-5 bg-gray-200">
      <div className="px-2 xl:max-w-4xl lg:max-w-2xl md:max-w-xl">
        <div className="flex items-center justify-end">
          <div className="flex items-center">
            <button
              className="px-2 mr-4 text-lg text-gray-900 bg-green-400 rounded-xl"
              onClick={publishBlog}
            >
              PUBLISH
            </button>
            <button
              className="px-2 text-lg text-gray-200 bg-red-500 rounded-xl"
              onClick={unpublishBlog}
            >
              UNPUBLISH
            </button>
          </div>
        </div>
        <div>
          <p className="mt-5 text-lg leading-8 text-gray-900 ">
            By
            <span className="text-2xl underline uppercase cursor-pointer">
              {" " + blogCtx?.state?.blog?.data.authorName + " "}
            </span>
            <span className="text-sm text-indigo-400">
              {"#" + blogCtx?.state?.blog?.data?.authorId}
            </span>
            <span className="block">
              Published on {" " + blogCtx?.state?.blog?.data.createdAt}
            </span>
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-900"></p>
          <p className="font-sans text-3xl font-semibold leading-8 text-center text-gray-900">
            {blogCtx?.state?.blog?.data.title}
          </p>
          <div
            className="leading-9"
            dangerouslySetInnerHTML={{
              __html: blogCtx?.state?.blog?.data.content ?? "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDetail;
