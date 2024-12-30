const commentsModel = require("../models/comments_model");

const getAllComments = async (req, res) => {
  const filter = req.query.postId;
  try {
    if (filter) {
      const comments = await commentsModel.find({ postId: filter });
      res.send(comments);
    } else {
      const comments = await commentsModel.find();
      res.send(comments);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentbypostId = async (req, res) => {
  const postId = req.params.id;

  try {
    const comment = await commentsModel.find({postId: postId});
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("No result");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req, res) => {
    const commentBody = req.body;
    try {
      const comment = await commentsModel.create(commentBody);
      res.status(201).send(comment);
    } catch (error) {
      console.error("Failed to create comment:", error); // Log the error
      res.status(400).send(error.message);
    }
  };

const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const commentBody = req.body;
    try {
        const comment = await commentsModel.findByIdAndUpdate(commentId, commentBody, { new: true, runValidators: true });
        if (comment) {
            res.send(comment);
        } else {
            res.status(404).send("No result");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
      const comment = await commentsModel.findByIdAndDelete(commentId);
      if (comment) {
        res.send({ message: "Comment deleted successfully" });
      } else {
        res.status(404).send("No result");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

module.exports = {
  getAllComments,
  createComment,
  deleteComment,
  updateComment,
  getCommentbypostId,
};