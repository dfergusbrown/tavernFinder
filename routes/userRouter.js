import { Router } from "express";
import { getUsers, register, login } from "../controllers/userController.js";
import { extractId, verifyAuth } from "../middleware/verifyAuth.js";
import { getPostsByUserId } from "../controllers/postController.js";

const router = Router()

router.get('/', getUsers)
router.get('/allposts', extractId, getPostsByUserId)
router.post('/register', register)
router.post('/login', login)
router.post('/verifyAuth', verifyAuth)

export default router