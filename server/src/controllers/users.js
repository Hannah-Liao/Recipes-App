import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/Users.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ message: "User already exists!" });
        }

        const newUser = new User({ username, email, password: hash })
        await newUser.save();

        res.status(200).json({ success: true, message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to register. Try again" });
    }
};

export const login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User do not exists!" });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "User Name or Password is Incorrect!" });
        }

        const { password, ...rest } = user._doc
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "15d" });

        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn
        })
            .status(200)
            .json({ token, data: { ...rest } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Failed to login" })
    }

};
