import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getRecipes, createRecipe, saveRecipe, getSavedRecipes, getSavedRecipeID, deleteSavedRecipeID } from "../controllers/recipes.js";

const router = express.Router();

router.get('/', getRecipes);
router.post('/', verifyToken, createRecipe);
router.put('/', verifyToken, saveRecipe);
router.get('/savedRecipes/:userID', getSavedRecipes);
router.get('/savedRecipes/ids/:userID', getSavedRecipeID);
router.patch('/savedRecipes/ids/:userID', deleteSavedRecipeID);

export { router as recipeRouter };