import { Router } from "express";
import { deleteComment, editComment, getAllComments, postComment } from "../controllers/commentController.js";

const router = Router()

router.get('/:postId/', getAllComments)
// router.get('/:postId/:comId', )
router.post('/:postId', postComment)
router.put('/:postId/:comId', editComment)
router.delete('/:postId/:comId', deleteComment)


export default router