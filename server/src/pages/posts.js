import React, { useEffect, useContext } from "react";
import Post from "./post";
import Hero from "./hero";
import BlogContext from "../contexts/BlogContext";

const Posts = () => {
  const blogCtx = useContext(BlogContext);
  useEffect(() => {
    blogCtx.getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Hero />
      <div className="flex justify-center px-5 py-5 bg-gray-50">
        <div className="xl:max-w-3xl lg:max-w-2xl md:max-w-xl">
          <div className="flex md:justify-center">
            <span className="mr-8 text-lg text-gray-700 "> 3886 Posts </span>
            <span className="text-lg font-extrabold text-gray-700 underline">
              Most Recent
            </span>
          </div>

          {blogCtx?.state?.blogs?.data &&
            blogCtx.state.blogs.data.map((el, index) => (
              <Post
                title={el.title}
                key={index}
                _id={el._id}
                contentSummary={el.contentSummary}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
