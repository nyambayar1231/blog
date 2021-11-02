const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    required: [true, "Comment hooson baij bolohgui"],
    type: String,
    minlength: [1, "Commentiin urt zaaval 50 aas deesh baih heregtei"],
  },
  commentWriter: {
    type: String,
    ref: "User",
    default: "Guest",
  },
  blogId: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
  },
  authorName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
