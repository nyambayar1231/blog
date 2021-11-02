const Blog = require("../models/blog");
const User = require("../models/user");
const PendingBlog = require("../models/pending-blog");
const Comment = require("../models/comments");
const UnpublishedBlog = require("../models/unpublished-blog");
const asyncHandler = require("express-async-handler");
const HTMLParser = require("node-html-parser");
const MyError = require("../utils/myError");
const readingTime = require("reading-time");

exports.createComment = asyncHandler(async (req, res, next) => {
  console.log("--------->", req.body);
  // username irne
  if (!req.body.comment || !req.body.blogId) {
    throw new MyError("content  esvel blogId aa zaaval дамжуулна уу", 400);
  }
  if (req.body.commentWriter) {
  }

  const comment = await Comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ blogId: req.params.id });
  res.status(200).json({
    success: true,
    data: comments,
  });
});
