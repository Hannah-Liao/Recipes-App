import express from "express";
import { register, login, getUser } from "../controllers/users.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.post("/user", verifyToken, getUser);

export { router as userRouter };
