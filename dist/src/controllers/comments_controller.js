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
exports.getCommentById = exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentbypostId = exports.getAllComments = void 0;
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
exports.getAllComments = getAllComments;
const getCommentbypostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const comment = yield comments_model_1.default.find({ postId });
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.getCommentbypostId = getCommentbypostId;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    try {
        const comment = yield comments_model_1.default.findById(commentId);
        if (comment) {
            res.status(200).send(comment);
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.getCommentById = getCommentById;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentBody = req.body;
    try {
        const newComment = new comments_model_1.default(commentBody);
        yield newComment.save();
        res.status(201).send(newComment);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.createComment = createComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const updateData = req.body;
    try {
        const updatedComment = yield comments_model_1.default.findByIdAndUpdate(commentId, updateData, { new: true });
        if (updatedComment) {
            res.send(updatedComment);
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    try {
        const comment = yield comments_model_1.default.findByIdAndDelete(commentId);
        if (comment) {
            res.send({ message: 'Comment deleted successfully' });
        }
        else {
            res.status(404).send('No result');
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments_controller.js.map