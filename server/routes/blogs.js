const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  postBlog,
  getPendingBlogs,
  deleteBlog,
  getPendingBlog,
  unpublishBlog,
} = require("../controllers/blogs");
const router = express.Router();

router.route("/admin/posts/:id").delete(deleteBlog).get(getPendingBlog);

router.route("/admin/posts").get(getPendingBlogs).post(createBlog);

router.route("/:id").get(getBlog);
router.route("/").post(postBlog).get(getBlogs);

module.exports = router;
