"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_controller_1 = require("../controllers/posts_controller");
const auth_controller_1 = require("../controllers/auth_controller");
const router = express_1.default.Router();
router.get("/", posts_controller_1.getAllPosts);
router.get("/:id", posts_controller_1.getPostById);
router.get("/sender/:Sender", posts_controller_1.getPostBySender);
router.post("/", auth_controller_1.authMiddleware, posts_controller_1.createPost);
router.put("/:id", auth_controller_1.authMiddleware, posts_controller_1.updatePost);
router.delete("/:id", auth_controller_1.authMiddleware, posts_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts_route.js.map