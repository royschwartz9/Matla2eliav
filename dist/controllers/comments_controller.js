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
const comments_model_1 = __importDefault(require("../models/comments_model"));
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.postId;
    try {
        if (filter) {
            const comments = yield comments_model_1.default.find({ postId: filter });
            res.send(comments);
        }
        else {
            const comments = yield comments_model_1.default.find();
            res.send(comments);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getCommentbypostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const comment = yield comments_model_1.default.find({ postId: postId });
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("No result");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentBody = req.body;
    try {
        const comment = yield comments_model_1.default.create(commentBody);
        res.status(201).send(comment);
    }
    catch (error) {
        console.error("Failed to create comment:", error); // Log the error
        res.status(400).send(error.message);
    }
});
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const commentBody = req.body;
    try {
        const comment = yield comments_model_1.default.findByIdAndUpdate(commentId, commentBody, { new: true, runValidators: true });
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("No result");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    try {
        const comment = yield comments_model_1.default.findByIdAndDelete(commentId);
        if (comment) {
            res.send({ message: "Comment deleted successfully" });
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
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
    getCommentbypostId,
};
//# sourceMappingURL=comments_controller.js.map