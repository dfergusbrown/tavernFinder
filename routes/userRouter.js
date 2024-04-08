import { Router } from "express";
import { getUsers, register, signin } from "../controllers/userController.js";

const router = Router()

router.get('/', getUsers)
router.post('/register', register)
router.post('/signin', signin)

export default router