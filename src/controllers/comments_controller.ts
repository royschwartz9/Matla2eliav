import { Request, Response } from 'express';
import commentsModel from '../models/comments_model';

const getAllComments = async (req: Request, res: Response): Promise<void> => {
  const filter = req.query.postId as string | undefined;
  try {
    if (filter) {
      const comments = await commentsModel.find({ postId: filter });
      res.send(comments);
    } else {
      const comments = await commentsModel.find();
      res.send(comments);
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const getCommentbypostId = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  try {
    const comment = await commentsModel.find({ postId });
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const getCommentById = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.id;
  try {
    const comment = await commentsModel.findById(commentId);
    if (comment) {
      res.status(200).send(comment); 
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  const commentBody = req.body;
  try {
    const newComment = new commentsModel(commentBody);
    await newComment.save();
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const updateComment = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.id;
  const updateData = req.body;
  try {
    const updatedComment = await commentsModel.findByIdAndUpdate(commentId, updateData, { new: true });
    if (updatedComment) {
      res.send(updatedComment);
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.id;
  try {
    const comment = await commentsModel.findByIdAndDelete(commentId);
    if (comment) {
      res.send({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export { getAllComments, getCommentbypostId, createComment, updateComment, deleteComment,getCommentById };