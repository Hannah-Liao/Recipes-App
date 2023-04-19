import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { getRecipes, createRecipe, saveRecipe, getSavedRecipes, getSavedRecipeID, deleteSavedRecipeID, getSingleRecipe, deleteRecipe, getRecipeCount } from "../controllers/recipes.js";

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getSingleRecipe);
router.delete('/:id', deleteRecipe);
router.post('/', verifyToken, createRecipe);
router.put('/', saveRecipe);
router.get('/savedRecipes/:userID', getSavedRecipes);
router.get('/savedRecipes/ids/:userID', getSavedRecipeID);
router.patch('/savedRecipes/ids/:userID', deleteSavedRecipeID);
router.get("/search/getRecipeCount", getRecipeCount)

export { router as recipeRouter };