const Blog = require("../models/blog");
const User = require("../models/user");
const PendingBlog = require("../models/pending-blog");
const UnpublishedBlog = require("../models/unpublished-blog");
const asyncHandler = require("express-async-handler");
const HTMLParser = require("node-html-parser");
const MyError = require("../utils/myError");
const readingTime = require("reading-time");

exports.createBlog = asyncHandler(async (req, res, next) => {
  const { title, content, authorName, unpublishBlog } = req.body;
  if (!title | !authorName) {
    throw new MyError(
      "title,authorName bolon content oo zaaval дамжуулна уу",
      400
    );
  }
  if (content) {
    let contentSummary = HTMLParser.parse(content);
    req.body.contentSummary = contentSummary.text;
    let stats = readingTime(contentSummary.text);
    req.body.readTime = stats.text;
    req.body.visitedTime = 0;
  }

  let blog = await Blog.create(req.body);

  if (req.body.unpublishBlog) {
    blog = await UnpublishedBlog.create(req.body);
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

exports.getBlogs = asyncHandler(async (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies["my-blog-token"];
  const blogs = await Blog.find();
  res.status(200).json({
    success: true,
    data: blogs,
  });
});

exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  const authorId = blog.authorId;
  const user = await User.findById(authorId);
  let refPoint = user.refPoint;
  refPoint = refPoint + 10;

  await user.updateOne({ refPoint: refPoint });
  console.log(user);

  let visited = blog.visitedTime;
  visited++;
  await blog.updateOne({ visitedTime: visited });

  res.status(200).json({
    success: true,
    data: blog,
  });
});

exports.postBlog = asyncHandler(async (req, res, next) => {
  const { title, content, authorId, authorName } = req.body;
  let contentSummary = HTMLParser.parse(content);
  const stats = readingTime(contentSummary.text);
  if (!title | !content | !authorName) {
    throw new MyError(
      "title,authorName bolon content oo zaaval дамжуулна уу",
      400
    );
  }
  req.body.contentSummary = contentSummary.text;
  req.body.readTime = stats.text;

  const blog = await PendingBlog.create(req.body);
  res.status(200).json({
    success: true,
    blog,
  });
});

exports.getPendingBlogs = asyncHandler(async (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies["my-blog-token"];
  const blogs = await PendingBlog.find();
  res.status(200).json({
    success: true,
    data: blogs,
  });
});

exports.getPendingBlog = asyncHandler(async (req, res, next) => {
  const blog = await PendingBlog.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: blog,
  });
});

exports.deleteBlog = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  const blog = await PendingBlog.findById(req.params.id);
  if (!blog) {
    throw new MyError(req.params.id + " ID-тэй категори байхгүй.", 400);
  }

  blog.remove();

  res.status(200).json({
    success: true,
    data: blog,
  });
});
