import { Router } from "express";
import { getAllComments, postComment } from "../controllers/commentController.js";

const router = Router()

router.get('/:postId/', getAllComments)
router.get('/:postId/:comId', )
router.post('/:postId', postComment)
export default router