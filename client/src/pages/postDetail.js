import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogContext from "../contexts/BlogContext";
import UserContext from "../contexts/UserContext";
import CommentsPage from "./commentsPage";
import Spinner from "../components/spinner";
const PostDetail = (props) => {
  const _id = useParams().id;
  const blogCtx = useContext(BlogContext);
  const userCtx = useContext(UserContext);
  useEffect(() => {
    blogCtx.getBlog(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let { content, title, authorName, createdAt, authorId } = blogCtx.state;
  const { userId } = userCtx.state;

  createdAt = createdAt?.slice(0, 10);
  return (
    <>
      {blogCtx.state.saving ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-center px-5 pt-5 pb-20 bg-indigo-200 ">
            <div className="px-2 border-t-2 border-separate border-green-900 xl:max-w-4xl lg:max-w-2xl md:max-w-xl">
              <div className="flex items-center justify-between">
                <h1 className="mb-1 font-sans text-base font-bold text-gray-900">
                  CATEGORY
                </h1>
                {userId === authorId && (
                  <div className="flex items-center">
                    <button className="px-2 mr-4 text-lg text-gray-200 bg-gray-900 rounded-xl">
                      EDIT
                    </button>
                    <button className="px-2 text-lg text-gray-200 bg-red-900 rounded-xl">
                      DELETE
                    </button>
                  </div>
                )}
              </div>
              <p className="font-sans text-3xl font-semibold leading-8 text-center text-gray-900">
                {title}
              </p>
              <p className="mt-5">
                <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg">
                  Ubu
                </span>
                <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg ">
                  lorm
                </span>
                <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg">
                  windows
                </span>
                <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg">
                  microsoft
                </span>
              </p>
              <div>
                <p className="mt-5 text-lg leading-8 text-gray-900 ">
                  By
                  <span className="text-2xl underline uppercase cursor-pointer">
                    {" " + authorName}
                  </span>
                </p>
                <p className="text-lg leading-8 text-gray-900">
                  Published on <span className="underline"> {createdAt} </span>
                </p>
                <div
                  className="overflow-hidden leading-9 "
                  dangerouslySetInnerHTML={{
                    __html: content ?? "",
                  }}
                />
              </div>
            </div>
          </div>
          <CommentsPage _id={_id} />
        </>
      )}
    </>
  );
};

export default PostDetail;
