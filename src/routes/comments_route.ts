import express from 'express';
import { getAllComments, getCommentbypostId, createComment, updateComment, deleteComment,getCommentById } from '../controllers/comments_controller';
import { authMiddleware } from '../controllers/auth_controller';

const router = express.Router();

/**
* @swagger
* tags:
*   name: Comments
*   description: The Comments API
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - postId
 *         - content
 *         - Sender
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         postId:
 *           type: string
 *           description: The ID of the post
 *         content:
 *           type: string
 *           description: The content of the comment
 *         Sender:
 *           type: string
 *           description: The Sender of the comment
 *       example:
 *         postId: 60f790f3b3b3b40015f1b1b1
 *         content: This is the content of my first comment.
 *         Sender: roy
 */
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error
 */

router.get("/", getAllComments);
/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: 
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getCommentbypostId);
/**
 * @swagger
 * /comments/commentid/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: 
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get("/commentid/:id", getCommentById);
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               Sender:
 *                 type: string
 *                 description: The Sender of the comment
 *             required:
 *               - postId
 *               - content
 *               - Sender
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the comment
 *                 postId:
 *                   type: string
 *                   description: The ID of the post
 *                 sender:
 *                   type: string
 *                   description: The sender of the comment
 *                 content:
 *                   type: string
 *                   description: The content of the comment
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/",authMiddleware, createComment);
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: The sender of the comment
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *             required:
 *               - content
 *               - Sender
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.put("/:id",authMiddleware, updateComment);
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: 
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",authMiddleware, deleteComment);

export default router;