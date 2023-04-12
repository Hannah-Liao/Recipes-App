import express from "express";
import jwt from "jsonwebtoken";
import { register, login, getUser } from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.post("/user", getUser);

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.headers)
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
            if (err) { return res.sendStatus(403) }
            next();
        })
    } else {
        res.sendStatus(401)
    }
}