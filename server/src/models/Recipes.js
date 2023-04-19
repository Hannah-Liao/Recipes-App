import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    source: { type: String },
    userOwner: { type: String, required: true }
}, { timestamps: true });

export const Recipe = mongoose.model("Recipe", recipeSchema)