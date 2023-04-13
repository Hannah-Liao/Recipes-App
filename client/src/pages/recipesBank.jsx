import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

export const RecipesBank = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipesID, setSavedRecipesID] = useState([]);

    const { user } = useContext(AuthContext);
    const userID = user.data._id;
    const token = user.token

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/recipes`);
                setRecipes(response.data)
            } catch (err) {
                console.log(err)
            }
        };

        const fetchSavedRecipesID = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipesID(response.data.savedRecipes)

            } catch (err) {
                console.log(err)
            }
        };

        fetchRecipe();
        if (user) { fetchSavedRecipesID(); }

    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(`${BASE_URL}/recipes`,
                { recipeID, userID },
                { headers: { authorization: token } });

            setSavedRecipesID(response.data.savedRecipes)
        } catch (err) {
            console.log(err)
        }
    };

    const isRecipeSaved = (id) => savedRecipesID.includes(id);

    return (
        <div className="recipes-container">

            {recipes.map((recipe) => (
                <div key={recipe._id} className="recipes-row" >
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <div>
                        <h2><span className="underline-card-text">{recipe.name}</span></h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <p>Cooking time: {recipe.cookingTime} (mins)</p>
                    <p>Creator: {recipe.userOwner}</p>
                    <button className="btn" onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
                </div>
            ))}

        </div>
    );
}