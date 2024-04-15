import { Router } from "express";
import { createPost, deletePost, getPosts, getPostsById, searchPosts, updatePost } from "../controllers/postController.js";
import { extractId, verifyAuth } from "../middleware/verifyAuth.js"

const router = Router()

router.get('/', getPosts)
router.get('/:id', getPostsById)
router.post('/', extractId, createPost)
router.put('/:id', verifyAuth, updatePost)
router.delete('/:id', verifyAuth, deletePost)

router.post('/search', searchPosts)

export default router