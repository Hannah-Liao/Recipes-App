import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/Users.js";

export const register = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hash })
    await newUser.save();

    res.json({ message: "User registered successfully!" });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.json({ message: "User do not exists!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "User Name or Password is Incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.json({ token, userID: user._id })
};

export const getUser = async (req, res) => {
    try {
        const response = await User.findOne({ _id: req.body.userID });
        res.json(response);
    } catch (err) {
        res.json(err);
    }
};