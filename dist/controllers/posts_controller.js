var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const PostModel = require("../models/posts_model");
const getAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const filter = req.query.Sender;
    try {
        if (filter) {
            const posts = yield PostModel.find({ Sender: filter });
            res.send(posts);
        }
        else {
            const posts = yield PostModel.find();
            res.send(posts);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const post = yield PostModel.findById(postId);
        if (post) {
            res.send(post);
        }
        else {
            res.status(404).send("No result");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getPostBySender = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const Sender = req.params.Sender; // Correctly access Sender from req.params
    try {
        const posts = yield PostModel.find({ Sender: Sender }); // Query by Sender
        if (posts.length > 0) {
            res.send(posts);
        }
        else {
            res.status(404).send("No posts found for this owner");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postBody = req.body;
    try {
        const post = yield PostModel.create(postBody);
        res.status(201).send(post);
    }
    catch (error) {
        console.error("Failed to create post:", error); // Log the error
        res.status(400).send(error.message);
    }
});
const updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const postId = req.params.id;
    const postBody = req.body;
    try {
        const post = yield PostModel.findByIdAndUpdate(postId, postBody, { new: true, runValidators: true });
        if (post) {
            res.send(post);
        }
        else {
            res.status(404).send("No result");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    getPostById,
    getPostBySender,
};
//# sourceMappingURL=posts_controller.js.map