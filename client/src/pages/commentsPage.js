import React, { useContext, useState, useEffect } from "react";
import { useUpdate } from "react-use";
import CommentContext from "../contexts/CommentContext";
import UserContext from "../contexts/UserContext";
import Spinner from "../components/spinner";
const CommentsPage = ({ _id }) => {
  const commentCtx = useContext(CommentContext);
  const userCtx = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [trigger, setTrigger] = useState(false);
  const update = useUpdate();

  const postComment = () => {
    let commentWriter = localStorage.getItem("username");
    commentCtx.createComment(comment, _id, commentWriter);
    setTrigger(!trigger);
    update();
  };

  useEffect(() => {
    commentCtx.getComments(_id);
    return () => setTrigger(!trigger);
  }, [trigger]);
  return (
    <>
      {commentCtx?.sate?.saving ? (
        <Spinner className="text-gray-900" />
      ) : (
        <div className="flex justify-center bg-gray-400">
          <div className="w-full max-w-sm px-6 py-8 rounded-2xl xl:max-w-5xl lg:max-w-3xl md: sm:max-w-m">
            <div className="flex justify-center w-full mb-4 bg-gray-400 shadow-lg">
              <div className="w-full px-4 pt-2 bg-indigo-400 rounded-lg">
                <div className="flex flex-wrap mb-6 -mx-3">
                  <h2 className="px-4 pt-3 pb-2 text-lg text-gray-800">
                    Add a new comment
                  </h2>
                  <div className="w-full px-3 mt-2 mb-2 md:w-full">
                    <textarea
                      className="w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-700 bg-gray-100 border border-gray-400 rounded resize-none focus:outline-none focus:bg-white"
                      name="body"
                      placeholder="Type Your Comment"
                      required
                      disabled={false}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex items-start w-full px-3 md:w-full">
                    <div className="flex items-start w-1/2 px-2 mr-auto text-gray-700">
                      <svg
                        fill="none"
                        className="w-5 h-5 mr-1 text-gray-600"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="pt-px text-xs md:text-sm">
                        Some HTML is okay.
                      </p>
                    </div>
                    <div className="-mr-1">
                      <button
                        className="px-4 py-1 mr-1 font-medium tracking-wide text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-100"
                        value="Post Comment"
                        onClick={postComment}
                      >
                        POST COMMENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 leading-8 bg-gray-800 rounded-2xl">
              {commentCtx?.state?.comments?.map((el, index) => {
                return (
                  <div key={index} className="px-8 mb-8 leading-8 rounded-xl">
                    <h1 className="text-lg text-red-400">{el.commentWriter}</h1>
                    <p className="pt-4 font-sans text-base text-gray-200">
                      {el.comment}
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {el.createdAt.substring(0, 10) +
                        " " +
                        el.createdAt.substring(11, 19)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsPage;
