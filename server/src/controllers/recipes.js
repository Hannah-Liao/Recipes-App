import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";

export const getRecipes = async (req, res) => {
    try {
        const response = await Recipe.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
};

export const createRecipe = async (req, res) => {
    const recipe = new Recipe(req.body)

    try {
        const recipes = await recipe.save();
        res.status(200).json({ success: true, message: "Recipe created successfully", data: recipes })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" })
    }
};

export const saveRecipe = async (req, res) => {

    try {
        const recipe = await Recipe.findById(req.body.recipeID)
        const user = await User.findById(req.body.userID)

        user.savedRecipes.push(recipe);
        await user.save();
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
};

export const getSavedRecipes = async (req, res) => {

    try {
        const user = await User.findById(req.params.userID);
        const savedRecipes = await Recipe.find({ _id: { $in: user.savedRecipes } })
        res.status(200).json({ success: true, savedRecipes });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" })
    }
};

export const getSavedRecipeID = async (req, res) => {

    try {
        const user = await User.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.json(err);
    }
};

export const deleteSavedRecipeID = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userID },
            { $pull: { savedRecipes: req.body.savedRecipesID } }
        );
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.json(err);
    }
};