import { Router } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/postController.js";

const router = Router()

router.get('/', getPosts)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

router.get('/search', )

export default router