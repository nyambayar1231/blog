import React from "react";
import { Link } from "react-router-dom";

const Post = ({ title, _id, contentSummary }) => {
  contentSummary = contentSummary.substring(0, 160);
  return (
    <div className="mt-10">
      <h1 className="mb-1 font-sans text-base font-medium text-purple-400">
        CATEGORY
      </h1>
      <Link to={`post-detail/${_id}`}>
        <p className="font-sans text-4xl font-semibold leading-8 text-gray-900">
          {title}
        </p>
      </Link>
      <div className="hidden my-2 select-none sm:block">
        <p className="text-lg font-thin leading-8 text-gray-700 ">
          {contentSummary + "..."}
        </p>
      </div>
      <p>
        <span>2 days ago * By Brian </span>
      </p>
      <p>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-sm">
          Ubu
        </span>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-sm">
          lorm
        </span>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-sm">
          windows
        </span>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-sm">
          microsoft
        </span>
      </p>
    </div>
  );
};

export default Post;
