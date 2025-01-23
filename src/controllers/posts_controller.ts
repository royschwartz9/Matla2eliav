import { Request, Response } from 'express';
import PostModel from '../models/posts_model';

//get all posts
const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  const filter = req.query.Sender as string | undefined;
  try {
    const posts = filter ? await PostModel.find({ Sender: filter }) : await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

//get post by id
const getPostById = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

//get post by sender
const getPostBySender = async (req: Request, res: Response): Promise<void> => {
  const Sender = req.params.Sender;
  try {
    const posts = await PostModel.find({ Sender });
    if (posts.length > 0) {
      res.status(200).send(posts);
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

//create a new post
const createPost = async (req: Request, res: Response): Promise<void> => {
  const postBody = req.body;
  try {
    const newPost = new PostModel(postBody);
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

//update a post
const updatePost = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  const updateData = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, { new: true });
    if (updatedPost) {
      res.status(200).send(updatedPost);
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

//delete a post
const deletePost = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findByIdAndDelete(postId);
    if (post) {
      res.status(200).send({ message: 'Post deleted successfully' });
    } else {
      res.status(404).send('No result');
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export { getAllPosts, getPostById, getPostBySender, createPost, updatePost, deletePost };