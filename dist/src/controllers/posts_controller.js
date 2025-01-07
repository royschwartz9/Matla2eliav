"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostBySender = exports.getPostById = exports.getAllPosts = void 0;
const posts_model_1 = __importDefault(require("../models/posts_model"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.Sender;
    try {
        const posts = filter ? yield posts_model_1.default.find({ Sender: filter }) : yield posts_model_1.default.find();
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const post = yield posts_model_1.default.findById(postId);
        if (post) {
            res.status(200).send(post);
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.getPostById = getPostById;
const getPostBySender = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Sender = req.params.Sender;
    try {
        const posts = yield posts_model_1.default.find({ Sender });
        if (posts.length > 0) {
            res.status(200).send(posts);
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.getPostBySender = getPostBySender;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postBody = req.body;
    try {
        const newPost = new posts_model_1.default(postBody);
        yield newPost.save();
        res.status(201).send(newPost);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const updateData = req.body;
    try {
        const updatedPost = yield posts_model_1.default.findByIdAndUpdate(postId, updateData, { new: true });
        if (updatedPost) {
            res.status(200).send(updatedPost);
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const post = yield posts_model_1.default.findByIdAndDelete(postId);
        if (post) {
            res.status(200).send({ message: 'Post deleted successfully' });
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=posts_controller.js.map