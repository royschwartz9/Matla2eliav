const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  content: String,
  User: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model("comments", commentSchema);

module.exports = commentsModel;