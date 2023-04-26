import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
    instructions: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
    imageUrl: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    source: { type: String },
    userOwner: { type: String, required: true }
}, { timestamps: true });

export const Recipe = mongoose.model("Recipe", recipeSchema)