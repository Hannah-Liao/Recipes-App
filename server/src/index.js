import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import * as path from 'path';

import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const __dirname = path.dirname("")
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/buildindex.html'));
});


app.use("/api/v1/auth", userRouter);
app.use("/api/v1/recipes", recipeRouter);

mongoose.connect(process.env.MONGODB_URI);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))