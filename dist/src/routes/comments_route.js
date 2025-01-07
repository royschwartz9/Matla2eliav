"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("../controllers/comments_controller");
const auth_controller_1 = require("../controllers/auth_controller");
const router = express_1.default.Router();
router.get("/", comments_controller_1.getAllComments);
router.get("/:id", comments_controller_1.getCommentbypostId);
router.get("/commentid/:id", comments_controller_1.getCommentById);
router.post("/", auth_controller_1.authMiddleware, comments_controller_1.createComment);
router.put("/:id", auth_controller_1.authMiddleware, comments_controller_1.updateComment);
router.delete("/:id", auth_controller_1.authMiddleware, comments_controller_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comments_route.js.map