const express = require("express");
const { createComment, getComments } = require("../controllers/comments");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

router.route("/").post(createComment);
router.route("/:id").get(getComments);
module.exports = router;
