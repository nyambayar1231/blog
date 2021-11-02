const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blogiin garchigiig oruulna uu "],
  },
  pictureUrl: {
    type: String,
  },
  headline: {
    type: String,
  },
  content: {
    required: [true, "Blogiin contentiig zavaal oruulna uu"],
    type: String,
    minlength: [5, "Contentiin urt zaaval 50 aas deesh baih heregtei"],
  },
  contentSummary: {
    type: String,
    minlength: [5, "Contentiin urt zaaval 50 aas deesh baih heregtei"],
  },
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  authorName: {
    type: String,
    required: [true, "Author neriig zaaval oruulna uu"],
  },
  readTime: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PendingBlog", BlogSchema);
