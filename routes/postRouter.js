import { Router } from "express";
import { createPost, deletePost, getPosts, searchPosts, updatePost } from "../controllers/postController.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = Router()

router.get('/', getPosts)
router.post('/', createPost)
router.put('/:id', verifyAuth, updatePost)
router.delete('/:id', verifyAuth, deletePost)

router.get('/search', searchPosts)

export default router