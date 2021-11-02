import React from "react";
import { Link } from "react-router-dom";
import { HiEye } from "react-icons/hi";

const Post = ({
  title,
  _id,
  contentSummary,
  readTime,
  visitedTime,
  createdAt,
}) => {
  contentSummary = contentSummary.substring(0, 160);
  let date1 = new Date(createdAt);
  let date2 = new Date();

  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  let date = `${Difference_In_Days} days ago`;
  if (Difference_In_Days < 1) {
    if (Difference_In_Time / 1000 / 60 > 60) {
      Difference_In_Time = Difference_In_Time / 1000 / 60 / 60;
      date = `${parseInt(Difference_In_Time)}  hours ago `;
    } else {
      date = `${parseInt(Difference_In_Time / 1000 / 60)}  minutes ago `;
    }
  }

  return (
    <div className="px-2 py-2 mt-10 leading-8 bg-gray-200 rounded-lg">
      <h1 className="mb-1 font-sans text-base font-medium text-indigo-400">
        CATEGORY
      </h1>
      <Link to={`post-detail/${_id}`}>
        <p className="font-sans text-2xl font-semibold leading-8 text-gray-900">
          {title}
        </p>
      </Link>
      <div className="hidden w-full my-2 overflow-hidden select-none sm:block">
        <p className="text-lg font-thin leading-8 text-gray-700 ">
          {contentSummary + "..."}
        </p>
      </div>
      <p className="text-2xl text-gray-900">
        <HiEye className="inline text-sm" />{" "}
        <span className="text-xl"> {visitedTime} </span>
      </p>
      <p className="flex items-center">
        <span>{date} * By Brian </span>
      </p>
      <p>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg ">
          Ubu
        </span>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg">
          lorm
        </span>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg">
          windows
        </span>
        <span className="p-1 mr-4 text-gray-200 bg-gray-900 rounded-lg">
          microsoft
        </span>
        <span>{readTime}</span>
      </p>
    </div>
  );
};

export default Post;
