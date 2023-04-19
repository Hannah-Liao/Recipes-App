import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";

export const getRecipes = async (req, res) => {

    const page = parseInt(req.query.page);

    try {
        const recipes = await Recipe.find({}).sort({ createdAt: -1 }).skip(page * 12).limit(12);
        res.status(200).json({ success: true, count: recipes.length, message: "Successful", recipes });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
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

        user.savedRecipes.unshift(recipe);
        await user.save();
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
};

export const getSavedRecipes = async (req, res) => {

    const page = parseInt(req.query.page);
    console.log(page)
    const start = (page - 1) * 12;
    const end = page * 12;


    try {
        const user = await User.findById(req.params.userID).populate("savedRecipes");
        const savedRecipes = user.savedRecipes

        res.status(200).json({ success: true, count: savedRecipes.length, savedRecipes: savedRecipes.slice(start, end) });
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

export const getSingleRecipe = async (req, res) => {
    const id = req.params.id;

    try {
        const recipe = await Recipe.findById(id);

        res.status(200).json({ success: true, message: "Successfully get a recipe", recipe })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" })
    }
}

export const deleteRecipe = async (req, res) => {
    const id = req.params.id;

    try {
        await Recipe.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Successfully deteled" })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to detele. Try again" })
    }
}

//get recipe counts
export const getRecipeCount = async (req, res) => {

    try {
        const recipeCount = await Recipe.estimatedDocumentCount();

        res.status(200).json({ success: true, data: recipeCount })
    } catch (err) {
        res.status(404).json({ success: false, message: "failed to fetch" })
    }
}